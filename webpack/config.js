const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const GtagPlugin = require('./plugins/gtag');

const { GA_MEASUREMENT_ID, NODE_ENV } = process.env;

const env = NODE_ENV || 'development';
const isDev = env === 'development';

const ROOT = path.resolve(__dirname, '..');

module.exports = {
  mode: env,
  entry: {
    core: 'core-js/stable',
    regenerator: 'regenerator-runtime/runtime',
    bundle: path.join(ROOT, './src/index.js'),
  },
  output: {
    path: path.join(ROOT, './dist'),
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
        include: path.join(ROOT, './src'),
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.css$/,
        include: path.join(ROOT, './node_modules'),
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.less$/,
        include: path.join(ROOT, './src'),
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
                context: path.join(ROOT, './src'),
              },
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.ttf$/,
        include: path.join(ROOT, './fonts'),
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
        test: /\.gql$/,
        include: path.join(ROOT, './src'),
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT, './src/index.html'),
      cache: true,
      inject: 'body',
    }),
    ...(isDev ? [] : [new GtagPlugin(GA_MEASUREMENT_ID)]),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  devServer: {
    contentBase: path.join(ROOT, './dist'),
    hot: true,
    historyApiFallback: true,
    proxy: { '/graphql': { target: 'http://localhost:3000' } },
  },
};
