const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  optimization: {
    runtimeChunk: "single",
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4, // or true
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          filename: "vendors.[contenthash].js",
        },
      },
    },
  },
  output: {
    // filename: "[name].[contenthash].bundle.js",
    // chunkFilename: "[name].[contenthash].chunk.bundle.js",
    // publicPath: "/",
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    },
  },
  devServer: {
    // host: "cxstudio.vn",
    port: 2001,
  },
};
