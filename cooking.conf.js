/* eslint-disable */

var path = require('path')
var cooking = require('cooking')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var config = {
    entry: {
        app: './src/index.jsx',
        login: './src/login.jsx',
        vendor: [ 'react', 'react-addons-css-transition-group', 'react-dom', 'react-immutable-render-mixin', 'react-router-redux', 'react-redux', 'react-toastr', 'redux', 'redux-form', 'redux-immutablejs', 'immutable', './src/polyfill']
    },
    dist: './dist/static',
    externals: {
        'jquery': 'jQuery'
    },
    devServer: {
        port: 8080,
        publicPath: '/',
        clean: false,
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            }
        }
    },

    // production
    clean: true,
    hash: true,
    sourceMap: false,
    publicPath: '/static/',
    assetsPath: 'images',
    urlLoaderLimit: 10000,
    extractCSS: 'css/[name].[contenthash:7].css',
    extends: ['react', 'eslint', 'less']
}

if (process.env.NODE_ENV === 'production') {
    config.template = [{
        filename: '../index.html',
        template: 'src/template/index.html',
        chunks: ['manifest', 'vendor', 'app']
    }, {
        filename: '../login.html',
        template: 'src/template/login.html',
        chunks: ['manifest', 'vendor', 'login']
    }]
} else {
    config.template = [{
        filename: 'index.html',
        template: 'src/template/index.html',
        chunks: ['vendor', 'app']
    }, {
        filename: 'login.html',
        template: 'src/template/login.html',
        chunks: ['vendor', 'login']
    }]
}

cooking.set(config)

cooking.add('resolve.extensions', ['.js', '.jsx'])
cooking.add('resolve.alias', {
    'src': path.join(__dirname, 'src'),
    "alias-store": path.join(__dirname, "src/store"),
    "alias-store-actions": path.join(__dirname, "src/store/actions"),
    "alias-store-reducers": path.join(__dirname, "src/store/reducers"),
    "alias-api": path.join(__dirname, "src/api")
})
cooking.add('plugin.ProvidePlugin', new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}))

if (process.env.NODE_ENV === 'production') {
    cooking.add('output.filename', 'js/[name].[chunkhash:7].js')
    cooking.add('output.chunkFilename', 'js/[id].[chunkhash:7].js')
    cooking.add('plugin.CommonsChunk1', new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module, count) {
            return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf('node_modules') > 0)
        }
    }))
    cooking.add('plugin.CommonsChunk2', new webpack.optimize.CommonsChunkPlugin({name: 'manifest', chunks: ['vendor']}))
    cooking.add('plugin.CopyWebpackPlugin', new CopyWebpackPlugin([{
        from: 'favicon.ico',
        to: path.join(__dirname, 'dist')
    }, {
        from: 'static/editor.md/**/*',
        to: path.join(__dirname, 'dist')
    }]))
} else {
    cooking.add('plugin.CommonsChunk', new webpack.optimize.CommonsChunkPlugin({
        names: ["vendor"]
    }))
}

module.exports = cooking.resolve()
