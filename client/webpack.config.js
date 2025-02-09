const path = require("path");
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = [
  'dist'
]

let cleanOptions = {
  root:     __dirname,
  exclude:  [],
  verbose:  true,
  dry:      false
}

module.exports = {
    context: __dirname,

    entry: './src/index.js',

    mode: 'development',

    output: {
        path: path.resolve('./dist/bundles'),
        filename: "[name]-[hash].js",
    },

    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

    module: {
        rules: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: [{
                    loader: "babel-loader"
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.exec\.js$/,
                use: ['script-loader']
            }]
    },
}