const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//#region path url
var CONFIGS = "webpack";
var ASSET_PATH = "./../";
var APP_DIR = path.resolve(__dirname, ASSET_PATH, "src");
var BUILD_DIR = path.resolve(__dirname, ASSET_PATH, "build");
var PUBLIC_DIR = path.resolve(__dirname, ASSET_PATH, "public");
//#endregion

//#region convert less-vars-to-js
// const fs = require("fs");
// const lessToJs = require("less-vars-to-js");

// // Read the less file in as string
// const paletteLess = fs.readFileSync(
//   APP_DIR + "/assets/_variables.less",
//   "utf8"
// );
// // Pass in file contents
// const themeAntdPalette = lessToJs(paletteLess, {
//   resolveVariables: true,
//   stripPrefix: true,
// });
//#endregion

module.exports = (env, argv) => {
  const mode = argv.mode || "development";
  const isDev = mode === "development";

  const baseConfig = {
    entry: {
      index: APP_DIR + "/index.js",
    },
    module: {
      rules: [
        //#region Rules for js
        {
          test: /\.(js|jsx)$/i,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/react",
                {
                  plugins: ["@babel/plugin-transform-react-jsx"],
                },
              ],
            },
          },
        },
        //#endregion
        //#region Rules for css
        {
          test: /\.(less|s[ac]ss|css)$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: true,
                esModule: false,
              },
            },
            // {
            //   loader: "less-loader",
            //   options: {
            //     lessOptions: {
            //       paths: [path.resolve(__dirname, "node_modules")],
            //       javascriptEnabled: true, // important for less read scripts
            //       // modifyVars: themeAntdPalette,
            //     },
            //   },
            // },
            // {
            //   loader: "style-resources-loader",
            //   options: {
            //     patterns: require(path.join(
            //       process.cwd(),
            //       "./src/assets/_utils.js"
            //     )),
            //   },
            // },
            {
              loader: "sass-loader",
              options: { sourceMap: true },
            },
            {
              loader: "sass-resources-loader",
              options: {
                resources: require(path.join(
                  process.cwd(),
                  "./src/assets/_utils.js"
                )),
              },
            },
          ],
        },
        //#endregion
        //#region Rules for images
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico|pdf)$/,
          // use: [
          //   {
          //     loader: "file-loader",
          //     options: {
          //       name: "[path][name].[ext]",
          //     },
          //   },
          // ],
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
        //#endregion
        //#region Rules for fonts
        {
          // config for fonts
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
        //#endregion
      ],
    },
    resolve: {
      modules: [__dirname, "src", "node_modules"],
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
      alias: {
        "@": APP_DIR, // shortcut to reference src folder from anywhere
        "@@": path.resolve(),
        "@app": APP_DIR + "/app",
        "@routes": APP_DIR + "/_routes",
        "@assets": APP_DIR + "/assets",
        "@theme": APP_DIR + "/theme",
        "@utils": APP_DIR + "/utils",
        "@constants": APP_DIR + "/constants",
        "@dashboard": APP_DIR + "/views/dashboard",
        "@authentication": APP_DIR + "/views/authentication",
        "@components": APP_DIR + "/components",
        "@reduxproviders": APP_DIR + "/reduxproviders",
        "@services": APP_DIR + "/services",
        //#region ALIAS FOR APPS
        "@views": APP_DIR + "/views",
        "@clientapp": APP_DIR + "/views/clientapp",
        "@community": APP_DIR + "/views/clientapp/community",
        "@chatbox": APP_DIR + "/views/clientapp/community/chatbox",
        //#endregion
      },
      fallback: {
        crypto: false,
      },
    },
    output: {
      path: BUILD_DIR,
      assetModuleFilename: "assets/[hash][ext][query]",
    },
    devServer: {
      static: {
        directory: BUILD_DIR,
      },
      compress: true,
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new Dotenv({
        path: `./` + CONFIGS + `/.env.` + mode,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: APP_DIR + "/assets",
            to: BUILD_DIR + "/assets",
            toType: "dir",
          },
          {
            from: path.join(
              path.dirname(require.resolve("pdfjs-dist/package.json")),
              "cmaps"
            ),
            to: "cmaps/",
          },
        ],
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.HotModuleReplacementPlugin(), // renew components
      new webpack.ProgressPlugin(), // display % when run webpack
      new webpack.ProvidePlugin({
        // using anywhere
        $: "jquery",
        jQuery: "jquery",
        React: "react",
      }),
      new HtmlWebpackPlugin({
        // plugin for inserting scripts into html
        template: PUBLIC_DIR + "/index.html",
        filename: "index.html",
        // title: "Survey Management System",
        // favicon: path.resolve(__dirname, "./assets/favicons/dashboard/favicon.ico"), //them file favicon vào trang html
        hash: true, //them thẻ <script> với đường link đính kèm 1 mã hash
        showErrors: false, //neu co loi sẽ ghi vào file html
        minify: isDev
          ? {}
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
      }),
    ],
  };

  return merge(baseConfig, require("./webpack." + mode));
};
