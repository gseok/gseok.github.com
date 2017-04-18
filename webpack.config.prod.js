// prod config
const webpack = require('webpack');

module.exports = {
    entry: './assets/js/reactComponents/about.js',

    output: {
        path: __dirname + '/_site/assets/js/reactComponents/',
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
        new webpack.optimize.OccurrenceOrderPlugin()
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