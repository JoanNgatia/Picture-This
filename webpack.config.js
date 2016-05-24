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
        // ensure linting occurs before babel transpilation
        preLoaders: [
          {
            test: /\.jsx$|\.js$/,
            loader: 'eslint-loader',
            include: __dirname + '/assets',
            exclude: /bundle\.js$/
          }
        ],
        loaders: [
          {
            test: /\.jsx$|\.js$/,
            loaders: ['babel-loader', 'eslint-loader'],
            exclude: /node_modules/
          }
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