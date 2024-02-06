const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "",
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
  devServer: {
    compress: true,
  },
  plugins: [new CleanWebpackPlugin()],
};
