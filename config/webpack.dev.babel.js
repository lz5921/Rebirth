'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlFileNames = fs.readdirSync('./src/html/');

const getEntries = () => {
  const entries = {
    'rebirth': [
      './src/js/app.js',
      './src/scss/app.scss'
    ]
    // 'worker.highlightjs': './src/js/worker/highlightjs.js'
  };

  htmlFileNames.forEach((filename) => {
    entries['rebirth'].push(`./src/html/${filename}`);
  });

  return entries;
};

const getPlugins = () => {
  const plugins = [
    require('autoprefixer'),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    })
  ];
  htmlFileNames.forEach((filename) => {
    const splitted = filename.split('.');
    if (splitted[1] === 'html') {
      plugins.push(
        new HtmlWebpackPlugin({
          template: `./src/html/${filename}`,
          filename: `./${filename}`,
          chunks: ['rebirth']
        }),
      );
    }
  });

  return plugins;
};

module.exports = {
  entry: getEntries(),
  output: {
    filename: '[name].js'
  },
  devServer: {
    contentBase: './src/html',
    watchContentBase: true,
    hot: true,
    open: true,
    inline: true,
    quiet: true,
    historyApiFallback: true,
    before(app) {
      app.use('/assets', express.static('./src/assets'));
      app.use('/img', express.static('./src/assets/img'));
    }
  },
  plugins: getPlugins(),
  devtool: 'inline-source-map',
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
        use: ['babel-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                require('cssnano'),
                require('autoprefixer')
              ]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jpg', '.html', '.scss'],
  },
};
