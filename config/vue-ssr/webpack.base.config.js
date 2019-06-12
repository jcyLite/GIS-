const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const base=require('../compiler.js')('src');
const merge=require('webpack-merge')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../../dist-ssr'),
        publicPath: '/dist-ssr/',
        filename: '[name]-[chunkhash].js'
    },
    resolve: base.resolve,
    module:base.module,
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd
        ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new ExtractTextPlugin({
                filename: 'common.[chunkhash].css'
            })
        ]
        : [
            new FriendlyErrorsPlugin()
        ]
}
