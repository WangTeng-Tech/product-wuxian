// === 配置区 ===
const BACKENDS = [
    {
        name: "vercel",
        url: "https://vercel.wuxian.xyz",
        weight: 5,  // 最快 (87.1ms),适中权重避免过度依赖
        region: "CN"
    },
    {
        name: "netlify",
        url: "https://netlify.wuxian.xyz",
        weight: 2,  // 资源较少，分配给非核心区域
        region: "Asia/Africa/LatAm"
    },
    {
        name: "render",
        url: "https://render.wuxian.xyz",
        weight: 3,  // 很快 (173.2ms),优质备选
        region: "GLOBAL"
    },
    {
        name: "qcloud",
        url: "https://qcloud.wuxian.xyz",
        weight: 3,  // EdgeOne 海外表现优异 (日本71%流量), 264ms 为国内测速
        region: "APAC"  // 亚太地区优势
    }
];

const TIMEOUT_MS = 3000;  // 超时切换到下一个源 (从1.8s增加到3s)
const HEALTHCHECK_PATH = "/"; // 健康检查路径
const USE_RACE = false; // 禁用竞速模式,节省带宽 (从 true 改为 false)
const USE_GEO_ROUTING = true; // 开启地理位置智能路由
const CACHE_STATIC = true; // 缓存静态资源
const CACHE_HTML = true; // 缓存 HTML 页面 (新增)
const HTML_CACHE_TTL = 600; // HTML 缓存时间增加到 10 分钟

// 地理位置路由映射 (基于 Cloudflare + EdgeOne 流量数据 2025-12-12 优化)
// Cloudflare 流量排名: US(27.6%) > JP(12.6%) > KR(10.8%) > SG(8.9%) > CN(8.1%)
// EdgeOne 流量排名: JP(71%) > AU(10%) > IT(6%) > US(6%) > IN(2%)
const GEO_ROUTING = {
    // 中国大陆 - Vercel (国内测速最快 87.1ms)
    'CN': 'vercel',      // 中国 (8.1%) → Vercel

    // 亚太地区 (高端) - QCloud/EdgeOne
    'JP': 'qcloud',      // 日本 (12.6%+71%) → QCloud
    'KR': 'qcloud',      // 韩国 (10.8%) → QCloud
    'SG': 'qcloud',      // 新加坡 (8.9%) → QCloud
    'HK': 'qcloud',      // 香港 → QCloud
    'TW': 'qcloud',      // 台湾 → QCloud
    'AU': 'render',      // 澳大利亚 (EdgeOne 10%) → Render

    // 亚洲 (其他) - Netlify
    'IN': 'netlify',     // 印度
    'ID': 'netlify',     // 印尼
    'PH': 'netlify',     // 菲律宾
    'TH': 'netlify',     // 泰国
    'VN': 'netlify',     // 越南
    'MY': 'netlify',     // 马来西亚

    // 非洲 - Netlify
    'ZA': 'netlify',     // 南非
    'EG': 'netlify',     // 埃及
    'NG': 'netlify',     // 尼日利亚

    // 拉丁美洲 - Netlify
    'BR': 'netlify',     // 巴西
    'MX': 'netlify',     // 墨西哥
    'AR': 'netlify',     // 阿根廷
    'CL': 'netlify',     // 智利
    'CO': 'netlify',     // 哥伦比亚
    'PE': 'netlify',     // 秘鲁

    // 美洲地区 (北美) - Vercel
    'US': 'vercel',      // 美国 (27.6%) → Vercel
    'CA': 'vercel',      // 加拿大 → Vercel

    // 欧洲地区 - Render/Netlify
    'GB': 'render',     // 英国
    'DE': 'render',     // 德国
    'FR': 'render',     // 法国
    'IT': 'render',     // 意大利
    'NL': 'render',     // 荷兰
    'RU': 'netlify',    // 俄罗斯

    // 默认 - Vercel (全球最优)
    'default': 'vercel'
};

// === 工具函数 ===

// 强制 HTTPS 重定向
function forceHttps(request) {
    const url = new URL(request.url);
    if (url.protocol === 'http:') {
        url.protocol = 'https:';
        return new Response(null, {
            status: 301,
            headers: { 'Location': url.toString() }
        });
    }
    return null;
}

// 注入安全响应头
function addSecurityHeaders(headers) {
    const newHeaders = new Headers(headers);
    // HSTS (1 year) - 强制 HTTPS
    newHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    // 防止被嵌入 iframe (避免点击劫持)
    newHeaders.set('X-Frame-Options', 'DENY');
    // 防止 MIME 类型嗅探 (用户特别要求的修复)
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    // 跨域策略
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // XSS 保护
    newHeaders.set('X-XSS-Protection', '1; mode=block');
    // 权限策略
    newHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    // 内容安全策略 (均衡安全性与功能性)
    newHeaders.set('Content-Security-Policy', "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.wuxian.xyz https://*.supabase.co; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://*.wuxian.xyz; frame-ancestors 'none';");
    
    return newHeaders;
}

// 移除条件请求头 (强制后端返回 200,确保能获取内容进行缓存)
function removeConditionalHeaders(headers) {
    const newHeaders = new Headers(headers);
    newHeaders.delete('if-modified-since');
    newHeaders.delete('if-none-match');
    newHeaders.delete('if-unmodified-since');
    newHeaders.delete('if-match');
    return newHeaders;
}

// 清理响应头 (避免 Content-Encoding 问题导致白屏，并移除后端指纹)
function cleanHeaders(headers) {
    let newHeaders = new Headers(headers);
    
    // 1. 移除可能导致解码问题的头
    newHeaders.delete('content-encoding');
    newHeaders.delete('content-length');
    newHeaders.delete('transfer-encoding');
    newHeaders.delete('connection');
    newHeaders.delete('keep-alive');
    
    // 2. 移除后端泄露信息 (Vercel/Netlify/Render 指纹)
    newHeaders.delete('x-vercel-id');
    newHeaders.delete('x-vercel-cache');
    newHeaders.delete('x-vercel-execution-region');
    newHeaders.delete('x-nf-request-id');
    newHeaders.delete('x-render-origin-server');
    newHeaders.delete('x-powered-by');
    newHeaders.delete('via');
    newHeaders.delete('server'); // 由 Cloudflare 重新设置或移除
    
    // 3. 统一注入安全头
    newHeaders = addSecurityHeaders(newHeaders);
    
    return newHeaders;
}

async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const startTime = Date.now();

    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeout);
        const latency = Date.now() - startTime;
        return { res, latency };
    } catch (e) {
        clearTimeout(timeout);
        return { res: null, latency: Date.now() - startTime, error: e.message };
    }
}

async function raceBackends(request) {
    const fetches = BACKENDS.map(b =>
        fetchWithTimeout(b.url + request.url.replace(/^https?:\/\/[^/]+/, ""), {
            method: request.method,
            headers: request.headers,
            body: request.method === "GET" ? undefined : request.body,
            redirect: "follow"
        }).then(({ res, latency }) => ({ backend: b, res, latency }))
    );

    try {
        const winner = await Promise.any(fetches.map(p => p.then(x => {
            if (x.res && x.res.ok) return x;
            throw new Error("Bad backend");
        })));

        // 添加响应头标识后端
        const headers = cleanHeaders(winner.res.headers);
        const response = new Response(winner.res.body, { ...winner.res, headers });
        response.headers.set('X-Backend-Used', winner.backend.name);
        response.headers.set('X-Backend-Latency', winner.latency + 'ms');
        return response;
    } catch (e) {
        return new Response("All backends failed in race mode", { status: 502 });
    }
}

function weightedSelect(backends) {
    const list = [];
    for (const b of backends) {
        for (let i = 0; i < b.weight; i++) {
            list.push(b);
        }
    }
    return list[Math.floor(Math.random() * list.length)];
}

function getPreferredBackend(request) {
    if (!USE_GEO_ROUTING) return null;

    const country = request.cf?.country || 'default';
    const preferred = GEO_ROUTING[country] || GEO_ROUTING.default;
    return BACKENDS.find(b => b.name === preferred);
}

async function sequentialFallback(request, preferredBackend = null, debug = false) {
    // 优先尝试地理位置推荐的后端,然后按权重排序
    const orderedBackends = preferredBackend
        ? [preferredBackend, ...BACKENDS.filter(b => b !== preferredBackend).sort((a, b) => b.weight - a.weight)]
        : BACKENDS.sort((a, b) => b.weight - a.weight);

    const debugLogs = [];

    // 准备请求头: 移除条件头,确保获取完整响应
    const reqHeaders = removeConditionalHeaders(request.headers);

    for (const backend of orderedBackends) {
        const target = backend.url + request.url.replace(/^https?:\/\/[^/]+/, "");

        if (debug) debugLogs.push(`Trying ${backend.name} (${target})...`);

        const { res, latency, error } = await fetchWithTimeout(target, {
            method: request.method,
            headers: reqHeaders, // 使用处理过的 headers
            body: request.method === "GET" ? undefined : request.body,
            redirect: "follow"
        });

        if (debug) {
            if (res) {
                debugLogs.push(`  Result: Status ${res.status}, OK=${res.ok}, Latency=${latency}ms`);
                debugLogs.push(`  Headers: ${JSON.stringify(Object.fromEntries(res.headers))}`);
            } else {
                debugLogs.push(`  Result: Failed (Error: ${error}), Latency=${latency}ms`);
            }
        }

        if (res && res.ok) {
            // 关键修复: 清理 headers,避免 gzip 解码错误
            const headers = cleanHeaders(res.headers);
            headers.set('X-Backend-Used', backend.name);
            headers.set('X-Backend-Latency', latency + 'ms');
            headers.set('X-Fallback-Mode', 'true');

            if (debug) {
                return new Response(JSON.stringify({
                    status: "success",
                    backend: backend.name,
                    latency: latency,
                    logs: debugLogs,
                    targetUrl: target,
                    responseHeaders: Object.fromEntries(headers)
                }, null, 2), { headers: { 'content-type': 'application/json' } });
            }

            return new Response(res.body, {
                status: res.status,
                statusText: res.statusText,
                headers: headers
            });
        }
    }

    if (debug) {
        return new Response(JSON.stringify({
            status: "failed",
            message: "All backends failed",
            logs: debugLogs
        }, null, 2), { status: 502, headers: { 'content-type': 'application/json' } });
    }

    return new Response("All backends failed", { status: 502 });
}

async function handleWithCache(request) {
    const url = new URL(request.url);
    const debug = url.searchParams.has('debug');

    // 调试模式: 跳过缓存,直接请求并返回诊断信息
    if (debug) {
        const preferredBackend = getPreferredBackend(request);
        return await sequentialFallback(request, preferredBackend, true);
    }

    // 缓存 GET 请求的静态资源和 HTML 页面
    if (request.method !== 'GET') {
        const preferredBackend = getPreferredBackend(request);
        return await sequentialFallback(request, preferredBackend);
    }

    const pathname = url.pathname;

    // 扩展缓存规则:静态资源 + HTML 页面
    const isStatic = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp)$/.test(pathname);
    const isHTML = CACHE_HTML && (pathname === '/' || pathname.endsWith('.html') || !pathname.includes('.'));
    const isAPI = pathname.startsWith('/api/');

    // API 请求不缓存,直接返回
    if (isAPI || (!isStatic && !isHTML)) {
        const preferredBackend = getPreferredBackend(request);
        return await sequentialFallback(request, preferredBackend);
    }

    // 使用 Cloudflare Cache API
    const cache = caches.default;
    // 修复: 只使用 URL 作为缓存键,忽略 headers (提高缓存命中率)
    const cacheKey = new Request(url.toString(), { method: 'GET' });

    let response = await cache.match(cacheKey);
    if (response) {
        // 缓存命中,也需要清理 headers
        const headers = cleanHeaders(response.headers);
        headers.set('X-Cache-Status', 'HIT');

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: headers
        });
    }

    // 缓存未命中，获取新响应
    const preferredBackend = getPreferredBackend(request);
    response = await sequentialFallback(request, preferredBackend);

    if (response.ok) {
        const headers = new Headers(response.headers);

        // 根据类型设置不同的缓存时间
        if (isStatic) {
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (isHTML) {
            headers.set('Cache-Control', `public, max-age=${HTML_CACHE_TTL}, s-maxage=${HTML_CACHE_TTL}`);  // HTML 缓存 10 分钟
        }

        headers.set('X-Cache-Status', 'MISS');

        const clonedResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: headers
        });

        // 异步写入缓存，不阻塞响应
        await cache.put(cacheKey, clonedResponse.clone());
        return clonedResponse;
    }

    return response;
}

// === 主入口 ===
export default {
    async fetch(request, env, ctx) {
        try {
            // 1. 强制 HTTPS 重定向
            const httpsRedirect = forceHttps(request);
            if (httpsRedirect) return httpsRedirect;

            // 2. 健康检查端点
            const url = new URL(request.url);
            if (url.pathname === '/_health') {
                return new Response(JSON.stringify({
                    status: 'healthy',
                    backends: BACKENDS.map(b => b.name),
                    timestamp: new Date().toISOString()
                }), {
                    headers: addSecurityHeaders({ 'Content-Type': 'application/json' })
                });
            }

            // 3. 智能竞速策略 (已禁用)
            if (USE_RACE) {
                return await handleWithCache(request);
            }

            // 4. 统一入口 (带缓存)
            return await handleWithCache(request);

        } catch (e) {
            return new Response(JSON.stringify({
                error: "Worker Error",
                message: e.message,
                timestamp: new Date().toISOString()
            }), {
                status: 500,
                headers: addSecurityHeaders({ 'Content-Type': 'application/json' })
            });
        }
    }
};
