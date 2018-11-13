var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    context: __dirname,

    entry: './assets/js/index.js',

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: "[name]-[hash].js",
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

    module: {
        rules: [{
              test: /\.js$/, // include .js files
              exclude: /node_modules/, // exclude any and all files in the node_modules folder
              use: [{
                loader: "babel-loader",
              }]
            }]
    },
}