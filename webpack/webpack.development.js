const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 6, // or true
      }),
    ],
    splitChunks: {
      // chunks: "all",
      cacheGroups: {
        js: {
          test: /\.(js|jsx)$/i,
          name: "commonjs",
          chunks: "all",
          minChunks: 7,
        },
        css: {
          test: /\.(less|s[ac]ss|css)$/i,
          name: "commonsstyle",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  output: {
    filename: "[name].bundle.js",
    publicPath: "/",
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
