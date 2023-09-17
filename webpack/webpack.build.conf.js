const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({
            template: './src/views/index.html',
            filename: 'index.html'
        }),
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
});