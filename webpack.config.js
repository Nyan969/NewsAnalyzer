const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        main: './src/index.js',
        about: './src/index.js',
        analytics: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    'file-loader?name=./images/[name].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: { mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
            // ,
            // {
            //     test: /\.html$/,
            // // loader:'file-loader?name=./page/[name].[ext]'
            //      loader: 'html-loader'
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ //
            filename: 'style.[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['about'],
            hash: true,
            template: './pages/about.html',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['analytics'],
            hash: true,
            template: './pages/analytics.html',
            filename: 'analytics.html'
        }),
        new WebpackMd5Hash()
    ]
};