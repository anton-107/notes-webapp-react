const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  performance: {
    hints: "error",
    maxEntrypointSize: 300_000,
    maxAssetSize: 300_000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Notes Web App (development)',
      filename: 'dist/index.html',
      template: 'html/index.html'
    })
  ]
};