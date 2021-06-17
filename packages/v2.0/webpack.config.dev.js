// dev config
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
    devtool: 'inline-source-map',
    entry: `./${publicPath}about.js`,

    output: {
        path: outputPath,
        publicPath: publicPath, // TODO: es6 style, same name assign { public }
        filename: 'about.js'
    },

    plugins: [
        // webpack-dev-server enhancement plugins
        new webpack.HotModuleReplacementPlugin(),
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

    devServer: {
        hot: true,
        port: 4000,
        contentBase: outputBasePath
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }]
            }
        ]
    }
};