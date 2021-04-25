const webpack = require("webpack")
const webpackDevConfig = require("./webpack.dev.conf")
const webpackMiddleware = require("koa-webpack-dev-middleware")
const webpackHotMiddleware = require("koa-webpack-hot-middleware")
const convert = require("koa-convert")
const compiler = webpack(webpackDevConfig)

function devServer(app){
    app.use(webpackMiddleware(compiler, {
        // all options optional

        // display no info to console ( only warnings and errors )
        noInfo: true,

        // display nothing to the console
        quiet: false,

        watchOptions: { ignored: /node_modules/ },

        reload: true,
        hot: true,
        watchContentBase: true,
        publicPath: webpackDevConfig.output.publicPath,
        stats: { colors: true },

        historyApiFallback: { disableDotRule: true, }
    }))
    app.use(convert(webpackHotMiddleware(compiler)))
}

module.exports = devServer