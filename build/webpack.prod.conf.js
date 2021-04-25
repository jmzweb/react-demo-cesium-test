const webpack = require("webpack")
const path = require("path")
const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.conf")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

const {entriesProv} = require("./utils")


module.exports = merge(baseWebpackConfig, {
    mode: "production",
    devtool: "#eval",
    entry: Object.assign({}, entriesProv, {}),
    /**
     * 性能 performance 这些选项可以控制 webpack 如何 通知
     * 资源 asset 和 入口 起点 超过 指定文化限制
     */
    performance: {
        /**
         * false | error | warning
         * 打开 / 关闭 提示。 此外， 当找到提示时， 告诉 webpack 抛出一个错误或警告。
         * 此属性默认 设置 为 warning
         * 给定一个创建后 超过 250kb 的资源
         * false => 不展示警告或错误提示。
         * warning => 将展示一条警告， 通知你这是体积大的资源 。推荐，开发环境使用
         * error => 将展示一条错误， 通知你这是体积大的资源。 在生产环境构建使用
         * */
        hints: "error",
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            publicPath: "",
                            name: "static/img/[name].[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            // localIdentName: "[name]_[local]_[hash:base64]",
                        }
                    },
                    "postcss-loader",
                ]
            },
            {
                test: /\.(less)$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            // localIdentName: "[name]_[local]_[hash:base64]",
                        }
                    },
                    "less-loader",
                    "postcss-loader",
                ]
            }
        ]
    },
    optimization: {
        /**
         * 优化
         * minimize: true => 在生产环境中  default  最小
         *
         * minimizer =>  new TerserWebpackPlugin() => npm i -D terser-webpack-plugin
         * minimizer:[ new TerserWebpackPlugin({}) ]
         *
         * splitChunks => out of box 开箱即用 // 影响按需块 // 根据以下条件自动分块
         * 1. 新块可以共享， 或者模块来自 node_modules 文件夹
         * 2. 新块将大于 30kb （在 min + gz 之前）
         * 3. 根据需要 加载块 时 的 最大并行请求数 将 小于或等于 5
         * 4. 初始页面加载时的 最大并行请求数 将 小于等于 3
         *
         * 选择默认配置以适应 web 性能 最佳实践， 但项目的最佳策略可能会 有所不同。 如果你要更改
         * 配置，则应衡量更改的影响， 以确保实现真正的好处。
         *
         * splitChunks.automaticNameDelimiter
         * 默认情况下， webpack将使用 块的名称 和 名称 生成 名称 //
         * 此选项允许您 指定用于 生成名称的分隔符。
         *
         * splitChunks.automaticNameMaxLength
         * 允许为 SplitChunksPlugin 生成的块名称 设置 最大字符数
         *
         * splitChunks.chunks  =>  all / async / initial
         * all => 意味着即使在异步 和 非异步 块之间 也可以共享块
         *
         * name => boolean: true | function (module, chunks, cacheGroupKey):string | string
         * 可以提供 更多 控制功能。 返回值 将 指示 是否包括每个块
         * 可以将此配置 与 HtmlWebpackPlugin 结合使用。
         * 它将为你 注入 所有生成的 供应商块
         *
         * splitChunks.maxAsyncRequests => 按需加载时的最大并行请求数
         *
         * splitChunks.maxInitialRequests =>
         * 入口点 处的 最大并行请求数
         *
         * splitChunks.minChunks => 分割前必须 共享 模块的 最小块数
         *
         * splitChunks.minSize => 要生成的块的最小大小 （byte）
         *
         * splitChunks.maxSize =>
         * 它增加了请求数以获得更好的缓存。 它还可用于减少文件大小以加快重建速度。
         *
         * splitChunks.cacheGroup =>
         * 为不同的 拆分块 分配 相同的名称时， 所有提供商 模块都 放在一个共享块中，
         * 但不建议这样做， 因为它 可以导致 更多的代码下载。
         *
         * splitChunks.cacheGroups.{cacheGroup}.priority => number
         * 模块可以属于 多个 缓存组。 优化将优先 选择具有 更高优先级的缓存组。
         * 默认组的优先级为负， 以允许自定义组 获得 更高的优先级。自定义组的默认值为0
         *
         * splitChunks.cacheGroups.{cacheGroup}.reuseExistingChunk => boolean
         * 如果当前块包含 从主拆分的模块， 则将重用它而不是生成新的块。
         * 这可能会 影响 块的结果 文件名。
         *
         * splitChunks.cacheGroups.{cacheGroup}.test => function(module, chunk):boolean | RegExp | string
         * Controls
         *
         * splitChunks.cacheGroups.{cacheGroup}.filename => string
         * Allows
         *
         * splitChunks.cacheGroups.{cacheGroup}.enforce => boolean: false
         * Tells
         *
         * */
        minimize: false,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            automaticNameMaxLength: 30,
            name: true,
            cacheGroup: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            },
        },

    },
    plugins: [
        new UglifyJSPlugin({ sourceMap: true }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[hash].css",
            chunkFilename: "static/css/[id].[hash].css"
        })
    ]
})
