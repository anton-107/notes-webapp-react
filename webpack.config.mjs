import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";
import { fileURLToPath } from "url";

export default (env) => {
  return {
    entry: "./src/main.ts",
    mode: "production",
    output: {
      filename: "main.js",
      path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: process.env.WEBPACK_COVERAGE
            ? ["@jsdevtools/coverage-istanbul-loader", "ts-loader"]
            : "ts-loader",
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
      hints: process.env.WEBPACK_COVERAGE ? false : "error",
      maxEntrypointSize: 705_000,
      maxAssetSize: 705_000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Notes Web App (development)",
        filename: "dist/index.html",
        template: "html/index.html",
      }),
      new Dotenv({
        path: `./${env.file}`,
        prefix: "import.meta.env.",
      }),
    ],
    devServer: {
      historyApiFallback: {
        index: "/dist/index.html",
      },
    },
  };
};
