const webpack = require("webpack")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const {plugins} = require("./utils")
const CONST = require("../config/const")
const path = require("path")
const config = require("../config/setting")

module.exports = {
    devtool: "#source-map",
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM",
        "redux": "Redux",
        "react-redux": "ReactRedux",
        "axios": "Axios",
        "lodash" : {
            "commonjs": "lodash",
            "amd": "lodash",
            "root": "_"
        }
    },
    output: {
        path: path.resolve(CONST.BASEPATH, "dist"),
        filename: "static/js/[name].[hash].js",
        chunkFilename: "static/js/[name].[hash].js",
        publicPath: "/"
    },
    performance: {
        /**
         * false | error | warning
         * 打开 / 关闭 提示。 此外， 当找到提示时， 告诉 webpack 抛出一个错误或警告。
         * 此属性默认 设置 为 warning
         * 给定一个创建后 超过 250kb 的资源
         * false => 不展示警告或错误提示。
         * warning => 将展示一条警告， 通知你这是体积大的资源 。推荐，开发环境使用
         * error => 将展示一条错误， 通知你这是体积大的资源。 在生产环境构建使用
         *
         * maxEntrypointSize: 40000,
         * 最大入口点 尺寸 bytes
         *
         * maxAssetSize: 100000
         * 最大资产大小 bytes
         *
         * assetFilter: function(assetFilename){ return !(/\.map$/.test(assetFilename)) }
         * 计算性能提示性能文件
         *
         * */
        hints: false,
    },
    resolve: {
        extensions: [".js", ".jsx", ".css", ".less"],
        alias: Object.assign({}, config.admin.alias)
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                include: path.resolve(CONST.BASEPATH, "src"),
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },
    plugins: [
        //
        // new CleanWebpackPlugin([path.resolve(CONST.BASEPATH, "dist")])
        new CleanWebpackPlugin()
    ].concat(plugins)
}