module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-custom-media'),
        require('cssnano')({
            preset: 'default',
        })
    ]
};