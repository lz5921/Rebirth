'use strict';

const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlFileNames = fs.readdirSync('./src/html/');

const getEntries = () => {
  return [
    './src/js/app.js',
    './src/scss/app.scss'
  ];
};

const getPlugins = () => {
  const plugins = [
    require('autoprefixer'),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/../src/assets/',
        to: __dirname + '/../dist/assets/'
      }
    ]),
    new ExtractTextPlugin({
      filename: './assets/css/styles.css',
      allChunks: true
    })
  ];
  htmlFileNames.forEach(filename => {
    if (filename.substr(0, 1) !== '_') {
      const splitted = filename.split('.');
      if (splitted[1] === 'html') {
        plugins.push(
          new HtmlWebpackPlugin({
            template: `./src/html/${filename}`,
            filename: `./${filename}`
          })
        );
      }
    }
  });

  return plugins;
};

module.exports = {
  entry: getEntries(),
  output: {
    filename: './assets/js/bundle.js'
  },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.(html)$/,
        loader: path.resolve(__dirname, 'loader/html-loader.js'),
        options: {
          html: htmlFileNames
        }
      },
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
                  require('cssnano')()
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
    extensions: ['.js', '.jpg', '.html', '.scss']
  }
};
