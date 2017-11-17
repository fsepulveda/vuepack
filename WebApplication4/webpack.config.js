"use strict";

let path = require('path');
let webpack = require('webpack');

let entryPoint = {
    app: './wwwroot/js/src/app.js'
};
let outputPath = path.resolve(__dirname, './wwwroot/js/dist');
let fileName = '[name].js';

let plugins = [];

// Get the environment variable defined in the command (see package.json)
let env = process.env.WEBPACK_ENV;

// When compiling for production we want the app to be uglified.
if (env === 'production') {
    let DefinePlugin = webpack.DefinePlugin;
    let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
    let LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;

    // We also add it as a global, the Vue lib needs it to determine if Dev tool should be active or not.
    plugins.push(new DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));

    plugins.push(new UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));

    plugins.push(new LoaderOptionsPlugin({
        minimize: true
    }));

    // Change file name extension to min.js
    fileName = fileName.replace(/js/g, 'min.js');
}

// Main webpack config
module.exports = {
    entry: entryPoint,
    output: {
        path: outputPath,
        chunkFilename: '[name].js',
        filename: fileName,
        publicPath: '../wwwroot/js/dist/',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'], // Transpile the ES6 to es2015 standard,
                    plugins: ["syntax-dynamic-import"]
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'  // Resolving the vue var for standalone build
        }
    },
    plugins // set the previously defined plugins
};