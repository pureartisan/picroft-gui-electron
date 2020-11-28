const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  resolve: {
    alias: {
      '@electron': path.resolve(__dirname, './src/electron/app/')
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  entry: "./src/electron/main.ts",
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: "2",
                targets: {
                  'node': true
                }
              }],
              "@babel/preset-typescript"
            ]
          }
        },
      },
    ],
  },
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [],
  externals: [nodeExternals()]
};
