// prod config
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const outputBasePath = path.resolve(__dirname, '_site');
const publicPath = 'assets/js/reactComponents/';
const imageTargetPath = path.resolve(outputBasePath, 'about');
const outputPath = path.resolve(outputBasePath, publicPath);

console.log('output Path > ', outputPath)

module.exports = {
    entry: `./${publicPath}about.js`,

    output: {
        path: outputPath,
        filename: 'about.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CopyWebpackPlugin([
            { from: './images/about/*', to: imageTargetPath },
            { from: './images/ppt/*', to: imageTargetPath },
            { from: './images/gseok.jpg', to: imageTargetPath }
        ]),
        new CleanWebpackPlugin([
            path.resolve(outputBasePath, publicPath),
            path.resolve(outputBasePath, 'about/images')
        ])
    ],

    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            ]
        }
};