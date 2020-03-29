const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.[hashContent].js',
        path: path.resolve(__dirname, 'dist')
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
            test: /\.less$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.html$/,
            use: ['html-loader']
        }, {
            test: /\.(svg|jpg|png|gif)/,
            use: [{
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[hash].[ext]',
            //         outputPath: 'images/'
            //     }
            // }, {
                loader: 'url-loader',
                options: {
                    limit: 8194
                }
            }]
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })]
}