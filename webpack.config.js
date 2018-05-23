const webpack = require('webpack');

const config = {
    target: 'electron-renderer',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: './build/build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'svg-url-loader'
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};

if (process.env.NODE_ENV !== 'dev') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, output: {ascii_only: true}}));
}

module.exports = config;