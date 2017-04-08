// dev config
const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',

    entry: [
        './assets/js/reactComponents/about.js'
    ],

    output: {
        path: path.join(__dirname + '/_site/assets/js/reactComponents/'),
        publicPath: '/assets/js/reactComponents/',
        filename: 'about.js'
    },

    plugins: [
        /*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        */

        // webpack-dev-server enhancement plugins
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        hot: true,
        port: 4000,
        contentBase: path.join(__dirname, '_site')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015', 'react'] }
                }],
            }
        ]
    }
};