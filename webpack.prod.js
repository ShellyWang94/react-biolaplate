const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// extract css from bundlejs，not recommond for webpack v4
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// extract css from bundles
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// minify js
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    module: {
        rules: [{
            test: /\.less$/,
            exclude: /node_modules/,
            // loader: ExtractTextWebpackPlugin.extract({
            //     fallback: 'style-loader',
            //     use: ['css-loader', 'less-loader']
            // })
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader'
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        // new ExtractTextWebpackPlugin('style.css'),
        new CleanWebpackPlugin()
    ]
})