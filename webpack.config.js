const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackHotPollEntry = 'webpack/hot/poll?100';
const outputFileName = 'server.js';

const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
  target: 'node',
  entry: ['./src/server.ts', ...(isDevMode ? [webpackHotPollEntry] : [])],
  externals: [nodeExternals(isDevMode ? { allowlist: [webpackHotPollEntry] } : undefined)], // ignore all modules in node_modules folder
  module: {
    rules: [
      {
        test: /\.json$/,
        type: 'asset/source'
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
          transpileOnly: false,
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.mjs'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, './tsconfig.json') })],
  },
  output: {
    filename: outputFileName,
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    isDevMode ? new RunScriptWebpackPlugin({ name: outputFileName }) : undefined,
  ]
};