const webpack = require('webpack')
const path = require('path')
module.exports = {
    target: 'node',
    devtool: '#source-map',
    entry: ['webpack/hot/poll?1000', './server/index.js'],
    resolve: {
        alias: {
            'create-api': './create-api-server.js'
        }
    },
    output: {
        path: path.resolve(__dirname),
        libraryTarget: 'commonjs2',
        filename: 'server.js'
    },
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: [
                        "transform-object-rest-spread",
                        'syntax-dynamic-import',
                        'transform-async-to-generator',
                        'transform-regenerator',
                        'transform-runtime'
                    ],
                    "compact": false
                }
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}