import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 兼容 ESM 的 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'wuxian-secret-key-12345';

// 中间件配置
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// 静态文件服务（生产环境）
app.use(express.static(path.join(__dirname, '../dist')));

// SQLite 数据库初始化
const dbPromise = open({
  filename: path.join(__dirname, 'db.sqlite'),
  driver: sqlite3.Database
});

async function initDb() {
  const db = await dbPromise;
  
  // 1. 创建咨询表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      email TEXT,
      company TEXT,
      inquiry_type TEXT,
      message TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT NOT NULL
    )
  `);

  // 2. 创建管理员用户表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  // 3. 创建客服会话表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS customer_conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id TEXT UNIQUE NOT NULL,
      visitor_name TEXT,
      status TEXT DEFAULT 'waiting',
      page_url TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL,
      last_message_at TEXT NOT NULL
    )
  `);

  // 4. 创建客服消息表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS customer_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL,
      sender_type TEXT NOT NULL, -- 'visitor', 'agent'
      sender_name TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      FOREIGN KEY(conversation_id) REFERENCES customer_conversations(id) ON DELETE CASCADE
    )
  `);

  // 5. 预留代理商伙伴计划相关表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      code TEXT UNIQUE NOT NULL,
      level TEXT DEFAULT 'silver',
      balance REAL DEFAULT 0.0,
      created_at TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS partner_earnings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      partner_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      source_order_id TEXT,
      description TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(partner_id) REFERENCES partners(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS payout_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      partner_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
      payment_method TEXT,
      payment_account TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(partner_id) REFERENCES partners(id) ON DELETE CASCADE
    );
  `);

  // 首次运行 Seeding 默认管理员账号
  const adminEmail = 'admin@wuxian.xyz';
  const adminUser = await db.get('SELECT * FROM users WHERE email = ?', [adminEmail]);
  if (!adminUser) {
    const hash = bcrypt.hashSync('admin123', 10);
    await db.run(
      'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)',
      [adminEmail, hash, new Date().toISOString()]
    );
    console.log('[DB] Default admin user initialized (admin@wuxian.xyz / admin123)');
  }
}

// 身份校验中间件
const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: '未登录授权' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: '登录会话失效' });
  }
};

// ================= REST API =================

// 1. 提交商务咨询（公开端点）
app.post('/api/inquiries', async (req, res) => {
  const { name, mobile, email, company, inquiry_type, message } = req.body;
  if (!name || !mobile) {
    return res.status(400).json({ error: '姓名与手机号为必填项' });
  }
  try {
    const db = await dbPromise;
    await db.run(
      `INSERT INTO inquiries (name, mobile, email, company, inquiry_type, message, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, mobile, email || null, company || null, inquiry_type || null, message || null, new Date().toISOString()]
    );
    res.json({ success: true, message: '咨询提交成功' });
  } catch (err) {
    console.error('Error insert inquiry:', err);
    res.status(500).json({ error: '数据库提交失败' });
  }
});

// 2. 身份认证模块
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: '邮箱与密码不能为空' });
  }
  try {
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: false // 本地非 HTTPS 环境
    });
    res.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: '登录失败' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.get('/api/auth/session', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ session: null });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ session: { user: { id: decoded.userId, email: decoded.email } } });
  } catch (err) {
    res.json({ session: null });
  }
});

// 3. 看板数据统计与咨询列表（管理员）
app.get('/api/admin/stats', requireAuth, async (req, res) => {
  try {
    const db = await dbPromise;
    const { count: totalCount } = await db.get('SELECT count(*) as count FROM inquiries');
    
    // 今天的新增咨询数
    const { count: todayCount } = await db.get(
      `SELECT count(*) as count FROM inquiries WHERE date(created_at) = date('now')`
    );
    
    // 最近 7 天的新增咨询数
    const { count: weekCount } = await db.get(
      `SELECT count(*) as count FROM inquiries WHERE datetime(created_at) >= datetime('now', '-7 days')`
    );

    res.json({ totalCount, todayCount, weekCount });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: '统计数据获取失败' });
  }
});

app.get('/api/admin/inquiries', requireAuth, async (req, res) => {
  try {
    const db = await dbPromise;
    const inquiries = await db.all('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(inquiries);
  } catch (err) {
    console.error('Fetch inquiries error:', err);
    res.status(500).json({ error: '列表获取失败' });
  }
});

// 4. 客服会话与消息
// 访客端：获取或创建会话
app.post('/api/conversations', async (req, res) => {
  const { visitor_id, visitor_name, page_url, user_agent } = req.body;
  if (!visitor_id) return res.status(400).json({ error: 'visitor_id 必填' });
  try {
    const db = await dbPromise;
    // 查找活跃会话
    let conv = await db.get(
      'SELECT * FROM customer_conversations WHERE visitor_id = ? ORDER BY last_message_at DESC LIMIT 1',
      [visitor_id]
    );
    
    if (!conv) {
      const now = new Date().toISOString();
      const result = await db.run(
        `INSERT INTO customer_conversations (visitor_id, visitor_name, status, page_url, user_agent, created_at, last_message_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [visitor_id, visitor_name || ('访客 ' + visitor_id.slice(-4)), 'waiting', page_url || null, user_agent || null, now, now]
      );
      conv = await db.get('SELECT * FROM customer_conversations WHERE id = ?', [result.lastID]);
      // 广播给管理员，有新会话创建了
      broadcastToAdmins({ type: 'conversation_created', conversation: conv });
    }
    res.json(conv);
  } catch (err) {
    console.error('Get or create conversation error:', err);
    res.status(500).json({ error: '会话管理错误' });
  }
});

// 加载指定会话
app.get('/api/conversations/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const conv = await db.get('SELECT * FROM customer_conversations WHERE id = ?', [req.params.id]);
    if (!conv) return res.status(404).json({ error: '会话不存在' });
    res.json(conv);
  } catch (err) {
    res.status(500).json({ error: '查询失败' });
  }
});

// 管理端：获取所有客服会话（分页）
app.get('/api/admin/conversations', requireAuth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;
  try {
    const db = await dbPromise;
    const { total } = await db.get('SELECT count(*) as total FROM customer_conversations');
    const list = await db.all(
      'SELECT * FROM customer_conversations ORDER BY last_message_at DESC LIMIT ? OFFSET ?',
      [pageSize, offset]
    );
    res.json({ list, total });
  } catch (err) {
    res.status(500).json({ error: '列表获取失败' });
  }
});

// 管理端：清理空会话
app.post('/api/admin/conversations/cleanup', requireAuth, async (req, res) => {
  try {
    const db = await dbPromise;
    const allConvs = await db.all('SELECT id FROM customer_conversations');
    const emptyConvIds = [];
    for (const conv of allConvs) {
      const { count } = await db.get(
        'SELECT count(*) as count FROM customer_messages WHERE conversation_id = ?',
        [conv.id]
      );
      if (count === 0) {
        emptyConvIds.push(conv.id);
      }
    }
    if (emptyConvIds.length > 0) {
      const placeholders = emptyConvIds.map(() => '?').join(',');
      await db.run(`DELETE FROM customer_conversations WHERE id IN (${placeholders})`, emptyConvIds);
    }
    res.json({ success: true, count: emptyConvIds.length, cleanedIds: emptyConvIds });
  } catch (err) {
    console.error('Cleanup error:', err);
    res.status(500).json({ error: '清理失败' });
  }
});

// 获取某会话的所有消息历史
app.get('/api/conversations/:id/messages', async (req, res) => {
  try {
    const db = await dbPromise;
    const messages = await db.all(
      'SELECT * FROM customer_messages WHERE conversation_id = ? ORDER BY created_at ASC',
      [req.params.id]
    );
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: '消息加载失败' });
  }
});

// 发送消息
app.post('/api/conversations/:id/messages', async (req, res) => {
  const { sender_type, sender_name, content } = req.body;
  const conversationId = Number(req.params.id);
  if (!content) return res.status(400).json({ error: '内容不能为空' });
  try {
    const db = await dbPromise;
    const now = new Date().toISOString();
    const result = await db.run(
      `INSERT INTO customer_messages (conversation_id, sender_type, sender_name, content, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [conversationId, sender_type, sender_name, content, now]
    );
    
    // 更新会话的最后活跃时间
    await db.run(
      'UPDATE customer_conversations SET last_message_at = ? WHERE id = ?',
      [now, conversationId]
    );

    const newMessage = await db.get('SELECT * FROM customer_messages WHERE id = ?', [result.lastID]);

    // WebSocket 实时广播
    broadcastToConversation(conversationId, { type: 'message', message: newMessage });

    res.json(newMessage);
  } catch (err) {
    console.error('Error insert message:', err);
    res.status(500).json({ error: '发送消息失败' });
  }
});

// 前端路由 fallback (单页应用)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/ws')) return next();
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// ================= WebSocket 广播 =================

const admins = new Set();
const visitors = new Map(); // conversationId (Number) -> Set of websockets

function broadcastToConversation(conversationId, message) {
  const payload = JSON.stringify(message);
  const sockets = visitors.get(conversationId);
  if (sockets) {
    for (const ws of sockets) {
      if (ws.readyState === 1) ws.send(payload);
    }
  }
  for (const ws of admins) {
    if (ws.readyState === 1) ws.send(payload);
  }
}

function broadcastToAdmins(message) {
  const payload = JSON.stringify(message);
  for (const ws of admins) {
    if (ws.readyState === 1) ws.send(payload);
  }
}

wss.on('connection', (ws) => {
  console.log('[WS] New socket connection established');

  ws.on('message', (messageStr) => {
    try {
      const data = JSON.parse(messageStr);
      if (data.type === 'register') {
        if (data.role === 'admin') {
          ws.role = 'admin';
          admins.add(ws);
          console.log('[WS] Admin registered successfully');
        } else if (data.role === 'visitor') {
          ws.role = 'visitor';
          ws.conversationId = Number(data.conversationId);
          if (!visitors.has(ws.conversationId)) {
            visitors.set(ws.conversationId, new Set());
          }
          visitors.get(ws.conversationId).add(ws);
          console.log(`[WS] Visitor registered for conversation ${ws.conversationId}`);
        }
      }
    } catch (err) {
      console.error('[WS] Message parsing error:', err);
    }
  });

  ws.on('close', () => {
    if (ws.role === 'admin') {
      admins.delete(ws);
      console.log('[WS] Admin socket disconnected');
    } else if (ws.role === 'visitor') {
      const sockets = visitors.get(ws.conversationId);
      if (sockets) {
        sockets.delete(ws);
        if (sockets.size === 0) {
          visitors.delete(ws.conversationId);
        }
      }
      console.log(`[WS] Visitor socket disconnected from conversation ${ws.conversationId}`);
    }
  });
});

// 数据库初始化并启动服务
initDb().then(() => {
  server.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`   wuxian-web backend running on port ${PORT}`);
    console.log(`=========================================`);
  });
}).catch(err => {
  console.error('Fatal: SQLite Database initialization failed', err);
});
