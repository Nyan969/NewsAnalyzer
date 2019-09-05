const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    entry: {
        main: './src/index.js',
        about: './src/about/about.js',
        analytics: './src/analytics/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (chunkData) => {
            return chunkData.chunk.name === 'main' ? '[name].[hash].js' : '[name]/[name].[hash].js';
        }
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                'browsers': ['> 1%', 'last 2 versions']
                            })],
                        }
                    },
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader:
                    'file-loader?name=./vendor/fonts/[name].[ext]'
            }
            ,
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/,
                use:
                    [
                        'file-loader?name=./images/[name].[ext]',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
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
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /.css$/,
            cssProcessor: require('cssnano'),
            cssProcessorPr: require('autoprefixer'),
            cssProcessorPluginOptions: {
                preset: ['default', {discardComments: {removeAll: true}}],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/about/about.html',
            filename: 'about/about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/analytics/analytics.html',
            filename: 'analytics/analytics.html'
        }),
        new WebpackMd5Hash()
    ]
}
;
