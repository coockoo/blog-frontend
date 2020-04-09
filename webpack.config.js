const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

module.exports = {
  mode: env,
  entry: {
    polyfill: '@babel/polyfill',
    bundle: path.join(__dirname, './src/index.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, './src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, './src'),
        use: [
          isDev ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.join(__dirname, './src'),
              },
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.ttf$/,
        include: path.join(__dirname, './fonts'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.png$/,
        include: path.join(__dirname, './icons'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      cache: true,
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, './dist'),
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
