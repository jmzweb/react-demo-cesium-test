const webpack = require("webpack")
const merge = require("webpack-merge")
const MinCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const CONST = require("../config/const")
const {entriesDev} = require("./utils")
const baseWebpackConfig = require("./webpack.base.conf")

module.exports = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "#eval",
    entry: Object.assign({}, entriesDev, {}),
    performance: {
        hints: "warning",
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: "url-loader",
                query: {
                    name: '[name].[hash].[ext]'
                }
            },
            // {
            //     test: /\.(css)$/,
            //     use: [
            //         "style-loader",
            //         "css-loader?modules&localIdentName=[local]-[hash:base64:5]",
            //         "postcss-loader",
            //     ]
            // },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            // localIdentName: "[name]_[local]_[hash:base64]",
                        }
                    },
                    {
                        loader: "postcss-loader",
                    }
                ],
            },
            // {
            //     test: /\.less$/,
            //
            //     use: [
            //         "style-loader",
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true,
            //                 localIdentName: '[path][name]__[local]--[hash:base64:5]'
            //             }
            //         },
            //         "less-loader",
            //         "postcss-loader",
            //     ]
            // },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader:  "css-loader",
                        options: {
                            modules: true,
                        }
                    },
                    "less-loader",
                    "postcss-loader",
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              priority: 1, //????????????
              test: /node_modules/, //????????????????????????????????????????????????????????????
              chunks: 'initial', //?????????????????????
              minChunks: 2 //??????2????????????????????????????????????
            },
            common: {
              //???????????????
              chunks: 'initial',
              minChunks: 2
            }
          }
        }
    },
    plugins: [
        // ???????????????????????? HMR
        // ??????????????????????????? ??? ?????? HMR
        new webpack.HotModuleReplacementPlugin(),
        //
        new MinCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        //
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
})