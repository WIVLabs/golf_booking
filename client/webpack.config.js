const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,

    entry: './assets/js/app.js',

    mode: 'development',

    output: {
        path: path.resolve('./client/dist/bundles'),
        filename: "[name]-[hash].js",
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

    module: {
        rules: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: [{
                    loader: "babel-loader",
                }]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            }]
    },
}