/* eslint-disable */

var path = require('path');
var cooking = require('cooking');
var webpack = require('webpack');

cooking.set({
    entry: {
        app: './src/index.jsx',
        login: './src/login.jsx',
        vendor: [ 'react', 'react-addons-css-transition-group', 'react-dom', 'react-immutable-render-mixin', 'react-router-redux', 'react-redux', 'react-toastr', 'redux', 'redux-form', 'redux-immutablejs', 'immutable', './src/polyfill']
    },
    dist: './dist',
    template: [{
        filename: 'index.html',
        template: 'src/template/index.html',
        chunks: ['common', 'vendor', 'app']
    }, {
        filename: 'login.html',
        template: 'src/template/login.html',
        chunks: ['common', 'vendor', 'login']
    }],
    externals: {
        'jQuery': 'jquery'
    },
    devServer: {
        port: 8080,
        publicPath: '/',
        clean: false,
        proxy: {
            // '/api/**': {
            //     target: 'http://localhost:3000/',
            //     secure: false,
            //     changeOrigin: true
            // }
        }
    },

    // production
    clean: true,
    hash: true,
    sourceMap: false,
    publicPath: '/',
    assetsPath: 'images',
    urlLoaderLimit: 10000,
    extractCSS: 'css/[name].[contenthash:7].css',
    extends: ['react', 'es2016', 'eslint', 'less', ]
})

cooking.add('resolve.alias', {
    'src': path.join(__dirname, 'src'),
    "alias-store": path.join(__dirname, "src/store"),
    "alias-store-actions": path.join(__dirname, "src/store/actions"),
    "alias-store-reducers": path.join(__dirname, "src/store/reducers"),
    "alias-api": path.join(__dirname, "src/api")
})

if (process.env.NODE_ENV === 'production') {
    cooking.add('output.filename', 'js/[name].[chunkhash].js')
    cooking.add('output.chunkFilename', 'js/[id].[chunkhash].js')
    cooking.add('plugin.CommonsChunk', new webpack.optimize.CommonsChunkPlugin({
        names: ["common", "vendor"]
    }))
}

module.exports = cooking.resolve()
