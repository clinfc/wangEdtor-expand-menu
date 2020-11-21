const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmpWebpackPlugin = require("html-webpack-plugin")

// 当前环境是生成环境
const IS_PRO = process.env.NODE_ENV === "production"

const base = {
    entry: {
        index: path.resolve(__dirname, "src/index.js"),
        main: path.resolve(__dirname, "src/main.js"),
    },
    output: {
        filename: IS_PRO ? "[name].min.js" : "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-runtime"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    "style-loader",
                    // 将 CSS 转化成 CommonJS 模块
                    "css-loader",
                    // post css
                    "postcss-loader",
                    // 将 Sass 编译成 CSS
                    "sass-loader",
                ],
            },
        ],
    },
    externals: {
        wangeditor: "wangEditor",
    },
    resolve: {
        extensions: [".js", ".json", "scss"],
        alias: {
            "~": path.join(__dirname, "src"),
            assets: path.join(__dirname, "src/assets"),
        },
    },
    plugins: [new CleanWebpackPlugin()],
}

// development
const dev = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    // 开启 web 服务器（在 webpack-dev-server 中才会生效，即在开发环境中才会生效）
    devServer: {
        // contentBase: path.join(__dirname, "node_modules/wangeditor/dist"),
        // 开启错误提示弹出层
        overlay: true,
        // 服务器启动的根路径
        contentBase: "./dev",
        // 端口号
        port: 3000,
        // 在第一次启动服务时，自动打开浏览器并进行访问
        open: true,
        hot: true,
        // 即使热替换未生效，浏览器也不自动刷新
        hotOnly: true,
    },
    plugins: [
        new HtmpWebpackPlugin({
            template: "public/index.html",
        }),
        // 热模块替换插件：与热替换合用，方便调试 CSS 时 HTML 不会更改
        new webpack.HotModuleReplacementPlugin(),
    ],
}

// production
const pro = {
    mode: "production",
    devtool: "cheap-module-source-map",
}

module.exports = merge(base, IS_PRO ? pro : dev)
