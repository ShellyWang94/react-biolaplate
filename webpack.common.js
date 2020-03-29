const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        vendorcode: './src/vendor.js'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.html$/,
            use: ['html-loader']
        }, {
            test: /\.(svg|jpg|png|gif|jpeg)/,
            use: [{
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[hash].[ext]',
            //         outputPath: 'images/'
            //     }
            // }, {
                loader: 'url-loader',
                options: {
                    limit: 8194,
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            }]
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: false
    })]
}