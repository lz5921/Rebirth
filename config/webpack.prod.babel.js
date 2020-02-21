'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getEntries = () => {
  return [
    './src/js/app.js',
    './src/scss/app.scss'
  ];
};

const getPlugins = () => {
  return [
    require('autoprefixer'),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/../src/assets/',
        to: __dirname + '/../dist/assets/'
      },
      {
        from: __dirname + '/../partials/',
        to: __dirname + '/../dist/partials/'
      },
      {
        from: __dirname + '/../*.hbs',
        to: __dirname + '/../dist/'
      },
      {
        from: __dirname + '/../package.json',
        to: __dirname + '/../dist/'
      },
      {
        from: __dirname + '/../robots.txt',
        to: __dirname + '/../dist/'
      },
      {
        from: __dirname + '/../LICENSE',
        to: __dirname + '/../dist/'
      }
    ]),
    new ExtractTextPlugin({
      filename: './assets/css/styles.css',
      allChunks: true
    })
  ];
};

module.exports = {
  entry: getEntries(),
  output: {
    filename: './assets/js/rebirth.js'
  },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            }, {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('cssnano'),
                  require('autoprefixer')
                ]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jpg', '.scss']
  }
};
