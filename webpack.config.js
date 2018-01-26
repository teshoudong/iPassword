var webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/render/index.js'
    },
    output: {
        filename: './src/render/build.js'
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
        ],
        noParse: [/\bagent\b/]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({minimize: true, output: {ascii_only: true}})
        new webpack.IgnorePlugin(new RegExp('^(electron|fs|path)$'))
    ]
};