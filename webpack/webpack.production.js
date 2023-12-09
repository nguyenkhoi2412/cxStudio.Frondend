const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  stats: {
    errorDetails: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    runtimeChunk: "single",
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4, // or true
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
          format: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        filename: "vendors.[contenthash].js",
        chunks: "all",
      },
    },
  },
  output: {
    // filename: "./[name].[contenthash].bundle.js",
    // filename: "[name].[contenthash].bundle.js",
    // chunkFilename: "[name].[contenthash].chunk.bundle.js",
    // publicPath: "/",
  },
  // devServer: {
  //   contentBase: BUILD_DIR,
  // },
  plugins: [new CleanWebpackPlugin()],
};
