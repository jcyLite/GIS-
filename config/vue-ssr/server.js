const fs = require('fs')
const path = require('path')
const koaSend = require("koa-send");
const Koa = require('koa')
const KoaRouter = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const LRU = require('lru-cache')

const resolve = file => path.resolve(__dirname, file)

const isDev = process.env.NODE_ENV === 'development'
const app = new Koa()
const router = new KoaRouter()

const template = fs.readFileSync(resolve('./index.template.html'),'utf-8')

function KoaServe(path, opt) {
    return function(ctx, next) {
        const pathUrl = ctx.path
        if ((ctx.method == "HEAD" || ctx.method == "GET") && pathUrl.startsWith(path)) {
            let newOpt = null
            let newPath = null
            if (pathUrl === path) {
                if (!path.endsWith('/')) {
                    const newRoot = opt.root.slice(0, -(path.length))
                    newOpt = Object.assign({}, opt, { root: newRoot })
                    newPath = pathUrl
                }
            } else {
                newPath = pathUrl.slice(path.length)
            }
            return koaSend(ctx, newPath || "/", newOpt || opt)
        }
        return next();
    }
};

function createRenderer (bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            template,
            cache: LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            }),
            basedir: resolve('../../dist-ssr'),
            runInNewContext: false
        })
    )
}

let renderer
let readyPromise
//if (!isDev) {
//  const bundle = require('../../dist-ssr/vue-ssr-server-bundle.json')
//  const clientManifest = require('../../dist-ssr/vue-ssr-client-manifest.json')
//  renderer = createRenderer(bundle, {
//      clientManifest
//  })
//} else {
    readyPromise = require('./setup-dev-server')(app, (bundle, options) => {
        renderer = createRenderer(bundle, options)
    })
//}

const serve = (url, path, cache) => KoaServe(url, {
    root: resolve(path),
    maxAge: cache && !isDev ? 60 * 60 * 24 * 30 : 0
})


// 加载和设置static
app.use(serve('/dist-ssr', '../../dist-ssr', true))

// 1-second microcache.
const microCache = LRU({
    max: 100,
    maxAge: 10000
})

function render (ctx, next) {
    ctx.set("Content-Type", "text/html")
    return new Promise (function (resolve, reject) {
        const s = Date.now()
        const handleError = err => {
            if (err && err.code === 404) {
                ctx.status = 404
                ctx.body = '404 | Page Not Found'
            } else {
                ctx.status = 500
                ctx.redirect('/')
                ctx.body = '500 | Internal Server Error,Are You Sure To Go This Page'
                console.error(`error during render : ${ctx.url}`)
                console.error(err.stack)
            }
            resolve()
        }
        const cacheable = true
        if (cacheable) {
            const hit = microCache.get(ctx.url)
            if (hit) {
                if (isDev) {
                    console.log('cache hit!')
                }
                ctx.body = hit
                resolve()
                return
            }
        }
        const context = {
            title: '第一志愿',
            url:ctx.url
        }
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return handleError(err)
            }
            ctx.body = html
            resolve()
            if (cacheable) {
                microCache.set(ctx.url, html)
            }
            if (isDev) {
                console.log(`whole request: ${Date.now() - s}ms`)
            }
        })
    })
}
// historyApiFallback and ssr
router.get('*', !isDev ? render: (ctx, next) => {
    return readyPromise.then(() => render(ctx, next))
})
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 8080
app.listen(port, '0.0.0.0', () => {
		var uri = 'http://localhost:' +port;
    console.log(`server started at ${uri}`)
    if(isDev){
    	const opn=require('opn');
    	opn(uri)
    }
})
