const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  return {
    entry: "./src/main.ts",
    mode: "production",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    performance: {
      hints: "error",
      maxEntrypointSize: 330_000,
      maxAssetSize: 330_000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Notes Web App (development)",
        filename: "dist/index.html",
        template: "html/index.html",
      }),
      new Dotenv({
        path: `./${env.file}`,
      }),
    ],
    devServer: {
      historyApiFallback: {
        index: "/dist/index.html",
      },
    },
  };
};
