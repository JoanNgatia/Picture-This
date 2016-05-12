var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
module.exports = {
    context: __dirname,
    entry: [
      "./picturethis/static/js/app.jsx"
    ],
    devtool: 'eval',
    output: {
      path: __dirname + '/picturethis/static/js/build',
      filename: "bundle.js"
    },
    module: {
        loaders: [
            {
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel-loader', 'eslint-loader'],
            exclude: /node_modules/
            }, // to transform JSX into JS
        ]
    },
    plugins: [
      new BundleTracker({filename: './webpack-stats.json'}),
    ],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },
};