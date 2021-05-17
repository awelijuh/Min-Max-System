const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    entry: ['babel-polyfill', "./src/index.js"],
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, "/dist"),
        publicPath: '/Min-Max-System',
        // filename: 'static/[name].js',
    },
    // devtool: 'cheap-module-source-map',
    devtool: 'source-map',
    // mode: "production",
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        historyApiFallback: true,
        watchContentBase: true,
        progress: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ["babel-loader"],
            },
            {
                test: /\.html$/,
                use: ['raw-loader']
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(woff|woff2|svg|jpg|jpeg|png)$/,
                exclude: /node_modules/,
                loader: "file-loader",
                options: {
                    outputPath: 'assets',
                }
            },

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: 'public/favicon.ico'
        }),
    ],

};
