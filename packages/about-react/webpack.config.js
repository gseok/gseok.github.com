const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEFAULT_MODE = 'development';
const PRODUCTION_MODE = 'production';

const outputBasePath = path.resolve(__dirname, '_site');
const publicPath = 'assets/js/about-react/';
const imageTargetPath = path.resolve(outputBasePath, 'assets/about-images/');
const outputPath = path.resolve(outputBasePath, publicPath);

const log = (...args) => console.log.apply(this, args);

module.exports = (env) => {
  const { NODE_ENV = DEFAULT_MODE } = env;
  log(`Webpack Run Mode: ${NODE_ENV}`);

  const defaultConf = {
    target: 'web',
    entry: `./src/about.js`,
    mode: NODE_ENV === DEFAULT_MODE || NODE_ENV === PRODUCTION_MODE ? NODE_ENV : DEFAULT_MODE,

    output: {
      path: outputPath,
      publicPath: publicPath, // TODO: es6 style, same name assign { public }
      filename: 'about.js',
      libraryTarget: 'umd',
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: './images/about', to: path.resolve(imageTargetPath, 'about') },
          { from: './images/ppt', to: path.resolve(imageTargetPath, 'ppt')},
          { from: './images/gseok.jpg', to: imageTargetPath },
          { from: './css', to: path.resolve(outputBasePath, 'assets/css') },
        ]
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.resolve(imageTargetPath),
          path.resolve(outputPath),
        ],
        dangerouslyAllowCleanPatternsOutsideProject: true,
      })
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        browsers: ['last 2 versions', 'ie >= 8'],
                      },
                      useBuiltIns: 'usage',
                      corejs: { version: 3, proposals: true },
                    },
                  ],
                  '@babel/preset-react',
                ],
              },
            }
          ]
        }
      ]
    }
  };

  // development
  if (NODE_ENV === DEFAULT_MODE) {
    const devServerPort = 4001;
    const devConf = {
      ...defaultConf,

      devtool: 'cheap-module-source-map',
      devServer: {
        contentBase: [outputBasePath],
        public: `http://localhost:${devServerPort}/about`,
        port: devServerPort,
        hot: true,
        open: true,
        inline: true,
        writeToDisk: true,
        disableHostCheck: true,
        historyApiFallback: true,
        compress: true,
      },
    }
    devConf.plugins.push(new CopyWebpackPlugin({
      patterns: [
        { from: './templates/index.html', to: path.resolve(outputBasePath, 'about') },
      ]
    }));

    return devConf;
  }

  // production
  if (NODE_ENV === PRODUCTION_MODE) {
    const prodConf = {
      ...defaultConf,

      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            extractComments: false,
          }),
        ],
      },
    };
    prodConf.plugins.push(new CompressionPlugin());
    return prodConf;
  }

  return defaultConf;
};