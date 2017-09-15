const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const config = {
    entry: (() => {
        if (process.env.NODE_ENV === 'production') {
            return {
                'demo/main.js': ['./demo/main.js'],
            };
        }
        return {
            'demo/main.js': ['react-hot-loader/patch', './demo/main.js'],
        };
    })(),

    output: (() => {
        let output = {};

        if (process.env.NODE_ENV === 'production') {
            output = Object.assign({}, output, {
                path: path.resolve(__dirname, 'docs'),
                publicPath: '',
                filename: '[name][chunkhash].js',
            });
        } else {
            output = Object.assign({}, output, {
                path: '/',
                publicPath: 'http://localhost:3000/',
                filename: '[name]',
            });
        }

        return output;
    })(),

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    'react-hot-loader/webpack',
                    'babel-loader',
                    'eslint-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    autoprefixer({
                                        browsers: [
                                            'last 2 versions',
                                            'ie >= 10',
                                        ],
                                    }),
                                    cssnano,
                                ];
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ],
    },

    plugins: (() => {
        // Generate a root HTML file with a <script> appended to the <body> tag.
        let plugins = [
            new HtmlWebpackPlugin({
                template: 'demo/index.html',
                inject: 'body',
            }),
        ];

        if (process.env.NODE_ENV === 'production') {
            // When we're not in DEV mode set some vars so React knows we're in prod.
            plugins = plugins.concat([
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify('production'),
                    },
                }),
            ]);
        } else {
            // Add webpack HMR stuff when we're in DEV mode.
            plugins = plugins.concat([
                new webpack.HotModuleReplacementPlugin(),
            ]);
        }

        return plugins;
    })(),

    devtool: 'source-map',

    devServer: {
        port: 3000,
        hot: true,
    },
};

module.exports = config;
