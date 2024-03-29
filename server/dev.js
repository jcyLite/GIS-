const serverConfig = require('./config.js');
const webpack = require('webpack');
const serverCompiler = webpack(serverConfig);
const MFS = require('memory-fs')
const mfs = new MFS();
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    // read bundle generated by vue-ssr-webpack-plugin
    require('./server.js');
    //     update()
})