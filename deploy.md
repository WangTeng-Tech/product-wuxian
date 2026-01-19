08:39:19.130 
    ╷
08:39:19.130 
151 │ }
08:39:19.131 
    │  ^
08:39:19.131 
    ╵
08:39:19.131 
  src/views/Contact.vue 151:2  root stylesheet
08:39:19.131 
08:39:19.131 
Error: expected "}".
08:39:19.131 
    ╷
08:39:19.131 
151 │ }
08:39:19.131 
    │  ^
08:39:19.131 
    ╵
08:39:19.131 
  src/views/Contact.vue 151:2  root stylesheet
08:39:19.132 
    at Object.wrapException (/vercel/path1/node_modules/sass/sass.dart.js:2316:47)
08:39:19.132 
    at SpanScanner.error$3$length$position (/vercel/path1/node_modules/sass/sass.dart.js:85182:15)
08:39:19.132 
    at SpanScanner.error$1 (/vercel/path1/node_modules/sass/sass.dart.js:85185:19)
08:39:19.132 
    at ScssParser0._stylesheet0$_styleRule$2 (/vercel/path1/node_modules/sass/sass.dart.js:120567:25)
08:39:19.132 
    at ScssParser0._stylesheet0$_declarationOrStyleRule$0 (/vercel/path1/node_modules/sass/sass.dart.js:120406:88)
08:39:19.132 
    at ScssParser0._stylesheet0$_statement$1$root (/vercel/path1/node_modules/sass/sass.dart.js:120321:162)
08:39:19.132 
    at ScssParser0._stylesheet0$_statement$0 (/vercel/path1/node_modules/sass/sass.dart.js:120324:19)
08:39:19.132 
    at tear_off.call$0 (/vercel/path1/node_modules/sass/sass.dart.js:2669:45)
08:39:19.132 
    at ScssParser0.children$1 (/vercel/path1/node_modules/sass/sass.dart.js:115927:33)
08:39:19.136 
    at ScssParser0._stylesheet0$_withChildren$1$3 (/vercel/path1/node_modules/sass/sass.dart.js:123866:39)
08:39:19.156 
Error: Command "npm run build" exited with 1


08:39:07.766
Running build
08:39:10.305
08:39:10.307
builder version 20251215
08:39:10.326
08:39:10.326
Cloning github.com/wt-wx/wuxian-official-website (Branch: main, Commit: 3e0e464)
08:39:12.389
Cloning completed: 2021ms
08:39:12.570
08:39:12.570
Switching node version
08:39:13.529
Now, we're on node version v22.17.1 (npm 10.9.2)
08:39:18.414
08:39:18.415
Running "edgeone pages build"
08:39:20.538
[builder] InstallCommand: npm install
08:39:20.538
[builder] Using shell: sh with args: -c npm install
08:39:35.750
added 235 packages, and audited 236 packages in 15s
08:39:35.751
53 packages are looking for funding
08:39:35.813
6 vulnerabilities (3 low, 3 moderate)
08:39:35.813
To address all issues (including breaking changes), run:
08:39:35.814
  npm audit fix --force
08:39:35.814
Run `npm audit` for details.
08:39:35.917
[builder] "npm install" execute time: 15379ms
08:39:35.918
[builder] "npm install" executed successfully
08:39:35.919
> Start validating the configuration file:
08:39:35.921
End validating!
08:39:35.921
getTefConfigMeta time 2
08:39:35.945
[plugins]Loaded internal plugin
08:39:35.946
resolvePlugins time 25ms
08:39:35.947
🔍 [Logger Plugin] Pre-build hook triggered
08:39:35.947
📂 Working directory: /dev/shm/repo/wuxian-official-website-h2ee7ywyuf
08:39:35.949
decideBuilders time 1ms
08:39:35.949
[StaticAssetsBuilder] Start to execute...
08:39:35.951
[StaticAssetsBuilder] DescribeFramework time: 2ms
08:39:35.952
[StaticAssetsBuilder] BuildScript: npm run build
08:39:35.952
[builder] Using shell: sh with args: -c npm run build
08:39:36.451
> wuxian-official-website@2.0.0 build
08:39:36.452
> vue-tsc && vite build
08:39:43.900
vite v5.4.21 building for production...
08:39:44.045
transforming...
08:39:44.486
Deprecation Warning [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
08:39:44.486
More info: https://sass-lang.com/d/legacy-js-api
08:39:44.623
08:39:44.624
08:39:44.808
08:39:44.990
08:39:45.006
08:39:45.008
08:39:45.012
08:39:45.013
08:39:45.056
08:39:45.066
08:39:45.067
08:39:45.076
08:39:45.077
08:39:45.088
08:39:45.089
08:39:45.094
✓ 31 modules transformed.
08:39:45.106
08:39:45.511
08:39:45.513
08:39:45.524
08:39:45.528
08:39:45.533
08:39:45.663
x Build failed in 1.73s
08:39:45.663
error during build:
08:39:45.665
[vite:css] [sass] expected "}".
08:39:45.665
151 │ }
08:39:45.665
  src/views/Contact.vue 151:2  root stylesheet
08:39:45.665
file: /dev/shm/repo/wuxian-official-website-h2ee7ywyuf/src/views/Contact.vue?vue&type=style&index=0&scoped=e9100c00&lang.scss
08:39:45.665
08:39:45.665
Error: expected "}".
08:39:45.666
08:39:45.666
  src/views/Contact.vue 151:2  root stylesheet
08:39:45.666
08:39:45.666
    at Object.wrapException (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:2316:47)
08:39:45.666
    at SpanScanner.error$3$length$position (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:85182:15)
08:39:45.666
    at SpanScanner.error$1 (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:85185:19)
08:39:45.666
    at ScssParser0._stylesheet0$_styleRule$2 (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:120567:25)
08:39:45.666
    at ScssParser0._stylesheet0$_declarationOrStyleRule$0 (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:120406:88)
08:39:45.666
    at ScssParser0._stylesheet0$_statement$1$root (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:120321:162)
08:39:45.666
    at ScssParser0._stylesheet0$_statement$0 (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:120324:19)
08:39:45.666
    at tear_off.call$0 (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:2669:45)
08:39:45.666
    at ScssParser0.children$1 (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:115927:33)
08:39:45.666
    at ScssParser0._stylesheet0$_withChildren$1$3 (/dev/shm/repo/wuxian-official-website-h2ee7ywyuf/node_modules/sass/sass.dart.js:123866:39)
08:39:45.719
[builder] "npm run build" execute time: 9764ms
08:39:45.719
[builder] "npm run build" failed, exit code: 1
08:39:45.723
[StaticAssetsBuilder][✘] Command failed with code 1
08:39:47.929
08:39:47.931
08:39:47.931
Build error


8:39:21 AM: Netlify Build                                                 
8:39:21 AM: ────────────────────────────────────────────────────────────────
8:39:21 AM: ​
8:39:21 AM: ❯ Version
8:39:21 AM:   @netlify/build 35.5.10
8:39:21 AM: ​
8:39:21 AM: ❯ Flags
8:39:22 AM:   accountId: 6925047bd4a1d929c0a5940e
8:39:22 AM:   baseRelDir: true
8:39:22 AM:   buildId: 696d7d26d1485600084b82d7
8:39:22 AM:   deployId: 696d7d26d1485600084b82d9
8:39:22 AM: ​
8:39:22 AM: ❯ Current directory
8:39:22 AM:   /opt/build/repo
8:39:22 AM: ​
8:39:22 AM: ❯ Config file
8:39:22 AM:   /opt/build/repo/netlify.toml
8:39:22 AM: ​
8:39:22 AM: ❯ Context
8:39:22 AM:   production
8:39:22 AM: ​
8:39:22 AM: ❯ Installing extensions
8:39:22 AM:    - neon
8:39:36 AM: ​
8:39:36 AM: ❯ Loading extensions
8:39:36 AM:    - neon
8:39:37 AM: ​
8:39:37 AM: build.command from netlify.toml                               
8:39:37 AM: ────────────────────────────────────────────────────────────────
8:39:37 AM: ​
8:39:37 AM: $ npm run build
8:39:37 AM: > wuxian-official-website@2.0.0 build
8:39:37 AM: > vue-tsc && vite build
8:39:41 AM: vite v5.4.21 building for production...
8:39:41 AM: transforming...
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: ✓ 28 modules transformed.
8:39:42 AM: DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
8:39:42 AM: More info: https://sass-lang.com/d/legacy-js-api
8:39:42 AM: x Build failed in 859ms
8:39:42 AM: error during build:
8:39:42 AM: [vite:css] [sass] expected "}".
8:39:42 AM:     ╷
8:39:42 AM: 151 │ }
8:39:42 AM:     │  ^
8:39:42 AM:     ╵
8:39:42 AM:   src/views/Contact.vue 151:2  root stylesheet
8:39:42 AM: file: /opt/build/repo/src/views/Contact.vue?vue&type=style&index=0&scoped=e9100c00&lang.scss
8:39:42 AM: 
8:39:42 AM: Error: expected "}".
8:39:42 AM:     ╷
8:39:42 AM: 151 │ }
8:39:42 AM:     │  ^
8:39:42 AM:     ╵
8:39:42 AM:   src/views/Contact.vue 151:2  root stylesheet
8:39:42 AM: 
8:39:42 AM: Error: expected "}".
8:39:42 AM:     ╷
8:39:42 AM: 151 │ }
8:39:42 AM:     │  ^
8:39:42 AM:     ╵
8:39:42 AM:   src/views/Contact.vue 151:2  root stylesheet
8:39:42 AM:     at Object.wrapException (/opt/build/repo/node_modules/sass/sass.dart.js:2316:47)
8:39:42 AM:     at SpanScanner.error$3$length$position (/opt/build/repo/node_modules/sass/sass.dart.js:85182:15)
8:39:42 AM:     at SpanScanner.error$1 (/opt/build/repo/node_modules/sass/sass.dart.js:85185:19)
8:39:42 AM:     at ScssParser0._stylesheet0$_styleRule$2 (/opt/build/repo/node_modules/sass/sass.dart.js:120567:25)
8:39:42 AM:     at ScssParser0._stylesheet0$_declarationOrStyleRule$0 (/opt/build/repo/node_modules/sass/sass.dart.js:120406:88)
8:39:42 AM:     at ScssParser0._stylesheet0$_statement$1$root (/opt/build/repo/node_modules/sass/sass.dart.js:120321:162)
8:39:42 AM:     at ScssParser0._stylesheet0$_statement$0 (/opt/build/repo/node_modules/sass/sass.dart.js:120324:19)
8:39:42 AM:     at tear_off.call$0 (/opt/build/repo/node_modules/sass/sass.dart.js:2669:45)
8:39:42 AM:     at ScssParser0.children$1 (/opt/build/repo/node_modules/sass/sass.dart.js:115927:33)
8:39:42 AM:     at ScssParser0._stylesheet0$_withChildren$1$3 (/opt/build/repo/node_modules/sass/sass.dart.js:123866:39)
8:39:42 AM: ​
8:39:42 AM: "build.command" failed                                        
8:39:42 AM: ────────────────────────────────────────────────────────────────
8:39:42 AM: ​
8:39:42 AM:   Error message
8:39:42 AM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
8:39:42 AM: ​
8:39:42 AM:   Error location
8:39:42 AM:   In build.command from netlify.toml:
8:39:42 AM:   npm run build
8:39:42 AM: ​
8:39:42 AM:   Resolved config
8:39:42 AM:   build:
8:39:42 AM:     command: npm run build
8:39:42 AM:     commandOrigin: config
8:39:42 AM:     environment:
8:39:42 AM:       - VITE_SUPABASE_ANON_KEY
8:39:42 AM:       - VITE_SUPABASE_URL
8:39:42 AM:     publish: /opt/build/repo/dist
8:39:42 AM:     publishOrigin: config
8:39:42 AM:   redirects:
8:39:43 AM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
8:39:43 AM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
8:39:43 AM: Build failed due to a user error: Build script returned non-zero exit code: 2
8:39:43 AM: Failing build: Failed to build site
8:39:43 AM: Finished processing build request in 39.189s


More info: https://sass-lang.com/d/legacy-js-api
DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
More info: https://sass-lang.com/d/legacy-js-api
DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
More info: https://sass-lang.com/d/legacy-js-api
✓ 39 modules transformed.
DEPRECATION WARNING [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
More info: https://sass-lang.com/d/legacy-js-api
x Build failed in 1.27s
error during build:
[vite:css] [sass] expected "}".
    ╷
151 │ }
    │  ^
    ╵
  src/views/Contact.vue 151:2  root stylesheet
file: /opt/render/project/src/src/views/Contact.vue?vue&type=style&index=0&scoped=e9100c00&lang.scss
Error: expected "}".
    ╷
151 │ }
    │  ^
    ╵
  src/views/Contact.vue 151:2  root stylesheet
Error: expected "}".
    ╷
151 │ }
    │  ^
    ╵
  src/views/Contact.vue 151:2  root stylesheet
    at Object.wrapException (/opt/render/project/src/node_modules/sass/sass.dart.js:2316:47)
    at SpanScanner.error$3$length$position (/opt/render/project/src/node_modules/sass/sass.dart.js:85182:15)
    at SpanScanner.error$1 (/opt/render/project/src/node_modules/sass/sass.dart.js:85185:19)
    at ScssParser0._stylesheet0$_styleRule$2 (/opt/render/project/src/node_modules/sass/sass.dart.js:120567:25)
    at ScssParser0._stylesheet0$_declarationOrStyleRule$0 (/opt/render/project/src/node_modules/sass/sass.dart.js:120406:88)
    at ScssParser0._stylesheet0$_statement$1$root (/opt/render/project/src/node_modules/sass/sass.dart.js:120321:162)
    at ScssParser0._stylesheet0$_statement$0 (/opt/render/project/src/node_modules/sass/sass.dart.js:120324:19)
    at tear_off.call$0 (/opt/render/project/src/node_modules/sass/sass.dart.js:2669:45)
    at ScssParser0.children$1 (/opt/render/project/src/node_modules/sass/sass.dart.js:115927:33)
    at ScssParser0._stylesheet0$_withChildren$1$3 (/opt/render/project/src/node_modules/sass/sass.dart.js:123866:39)
==> Build failed 😞
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys