const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

var data = [
    // {
    //     title: "618",
    //     fileHtmlUrl: "src/admin/public/active-618.html",
    //     fileJsUrl: "src/admin/active-618.js",
    //     favicon: "src/admin/public/favicon.ico",
    //     filename: "active-618.html",
    //     name: "active-618",
    //     chunks: ["active-618", "teemo"]
    // },
    {
        title: "index",
        cdnArr: [
            'https://lib.baomitu.com/react/17.0.1/umd/react.production.min.js', 
            'https://lib.baomitu.com/react-dom/17.0.1/umd/react-dom.production.min.js',
            'https://lib.baomitu.com/react-router-dom/6.0.0-beta.0/react-router-dom.production.min.js',
            'https://lib.baomitu.com/redux/4.0.5/redux.min.js',
            'https://lib.baomitu.com/react-redux/7.2.2/react-redux.min.js',
            'https://lib.baomitu.com/axios/0.21.1/axios.min.js',
            'https://lib.baomitu.com/lodash.js/4.17.21/lodash.min.js',
        ],
        fileHtmlUrl: "src/admin/public/index.html",
        fileJsUrl: "src/admin/main.js",
        favicon: "src/admin/public/favicon.ico",
        filename: "index.html",
        name: "index",
        chunks: ["index", "teemo"]
    }
]

const plugins = data.map(item =>
    new HtmlWebpackPlugin({
        title: item.title,
        cdnArr: item.cdnArr,
        template: path.resolve(path.join(__dirname, "../"), item.fileHtmlUrl),
        favicon: path.join(__dirname, "..", item.favicon),
        filename: item.filename,
        chunks: item.chunks,
    })
)

const entriesDev = {}
const entriesProv = {}

for(let i=0; i<data.length; i++) {

    entriesDev[data[i]["name"]] = [
        "webpack-hot-middleware/client?path=/__webpack_hmr&noInfo=true&reload=true&overlay=false",
        path.resolve(path.join(__dirname, "../"), data[i]["fileJsUrl"])
    ]

    entriesProv[data[i]["name"]] = `${path.resolve(path.join(__dirname, ".."), data[i]["fileJsUrl"])}`

}

module.exports = {
    plugins,
    entriesDev,
    entriesProv
}