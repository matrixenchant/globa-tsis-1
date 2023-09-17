const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, '../public'),
        },
        compress: true,
        hot: true,
        port: 9000,
        client: {
            overlay: true,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/views/index.html',
            filename: 'index.html'
        }),
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
});

