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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // or true
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      // chunks: "all",
      cacheGroups: {
        js: {
          test: /\.(js|jsx)$/i,
          name: "common",
          chunks: "all",
          minChunks: 7,
        },
        css: {
          test: /\.(less|s[ac]ss|css)$/i,
          name: "common",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  output: {
    filename: "./[name].[hash:8].bundle.js",
    publicPath: "/",
  },
  // devServer: {
  //   contentBase: BUILD_DIR,
  // },
  plugins: [new CleanWebpackPlugin()],
};
