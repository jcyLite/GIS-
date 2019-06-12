const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.server.conf')
const clientConfig = require('../compiler.js')('src')
const fs = require('fs')
const path = require('path')
// 读取内存的文件
const Mfs = require('memory-fs')
const axios = require('axios')

module.exports = (cb) => {
    // 用来读取内存文件
    var mfs = new Mfs()
    const webpackComplier = webpack(baseWebpackConfig)
    webpackComplier.outputFileSystem = mfs
    const readFile = (fs, file) => {
        try {
          return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
        } catch (e) {}
    }


    webpackComplier.watch({},async (err,stats) => {
        if(err) {
            return console.log(err)
        }
        stats = stats.toJson();
        stats.errors.forEach(err => {console.log(err)});
        stats.warnings.forEach(err => {console.log(err)});
        // 获取vue-server-renderer/server-plugin生成的服务端bundle的json文件 默认名字为vue-ssr-server-bundle.json
        let serverBundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
        // 获取vue-server-renderer/client-plugin生成的客户端bundle的json文件，默认名字vue-ssr-client-manifest.json
        let clientBundle =  await axios.get('http://localhost:8080/vue-ssr-client-manifest.json')
        // 获取模板文件 注意模板文件里面加上<!--vue-ssr-outlet-->
        let template = fs.readFileSync(path.join(__dirname,'..','index.html'), 'utf-8')
        cb(serverBundle, clientBundle, template)
    })
}