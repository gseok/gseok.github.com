// prod config

module.exports = {
    entry: './assets/js/reactComponents/about.js',

    output: {
        path: __dirname + '/_site/assets/js/reactComponents/',
        filename: 'about.js'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ],

    devServer: {
        inline: true,
        hot: true,
        port: 4000,
        contentBase: __dirname + '/_site'
    },

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