const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const DEFAULT_MODE = 'development';
const PRODUCTION_MODE = 'production';

const outputBasePath = path.resolve(__dirname, '_site');
const publicPath = 'assets/js/reactComponents/';
const imageTargetPath = path.resolve(outputBasePath, 'about');
const outputPath = path.resolve(outputBasePath, publicPath);

const log = (...args) => console.log.apply(this, args);

module.exports = (env) => {
  const { NODE_ENV = DEFAULT_MODE } = env;
  log(`Webpack Run Mode: ${NODE_ENV}`)

  const defaultConf = {
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
          { from: './images/about/*', to: imageTargetPath },
          { from: './images/ppt/*', to: imageTargetPath },
          { from: './images/gseok.jpg', to: imageTargetPath }
        ]
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.resolve(outputBasePath, publicPath),
          path.resolve(outputBasePath, 'about/images')
        ]
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
    const devConf = {
      ...defaultConf,

      devtool: 'inline-source-map',
      devServer: {
        hot: true,
        port: 4000,
        contentBase: outputBasePath
      },
    }
    devConf.plugins.push(new webpack.HotModuleReplacementPlugin());

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
              removeComments: true,
            },
            sourceMap: false,
          }),
        ],
      },
    };
    prodConf.plugins.push(new CompressionPlugin());
    prodConf.plugins.push(
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg|txt)$/,
        compressionOptions: {
          // zlib’s `level` option matches Brotli’s `BROTLI_PARAM_QUALITY` option.
          level: 11,
        },
      }),
    );
    return prodConf;
  }

  return defaultConf;
};