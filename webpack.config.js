const path = require('path');
const Html = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'example/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx$/i,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new Html()],
};
