const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        src: './client/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.js',
        publicPath: '/',
    },
    mode : "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node.modules/,
                use: {
                    loader: 'babel-loader'
                },
                resolve: {
                    extensions: ["", ".js", ".jsx"]
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test : /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './client/index.html'
        }),
    ],
    devServer: {
        static: {
            publicPath: '/dist',
            directory: path.join(__dirname, 'dist')
        },
        proxy: {
            '/api': 'http://localhost:3000',
        },
        hot: true,
        open : true,
        historyApiFallback: true
    },
    devtool: 'eval-cheap-module-source-map'
};
