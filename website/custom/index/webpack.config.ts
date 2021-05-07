import * as webpack from "webpack"
import path from "path"
import autoprefixer from "autoprefixer"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CUSTOM_PAGES_ASSETS_DIRECTORY, CUSTOM_PAGES_OUTPUT_DIRECTORY } from "../../settings"

const config: webpack.Configuration = {
  entry: {
    index: [
      path.join(__dirname, "assets/js/index.js"),
      path.join(__dirname, "../../assets/scss/index.scss"),
    ],
    progress: [
      path.join(__dirname, "assets/js/progress.js"),
      path.join(__dirname, "assets/css/jquery.fullpage.css"),
      path.join(__dirname, "assets/css/bootstrap.min.css"),
      path.join(__dirname, "assets/css/progress.css"),

    ]
  },
  target: 'web',
  output: {
    path: CUSTOM_PAGES_ASSETS_DIRECTORY,
    publicPath: "/assets/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: (url) => {
                return !url.startsWith('/'); // don't try to process absolute paths
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          presets: ["@babel/preset-env"]
        }
      },
    ],
  },
  resolve: {
    alias: {
      jquery$: path.resolve(__dirname, "assets/js/jquery.min.js")
    }
  },
  amd: {
    jQuery: true
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: path.join(CUSTOM_PAGES_OUTPUT_DIRECTORY, "index", "covid.html"),
      template: path.join(__dirname, "covid.html"),
      minify: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: path.join(CUSTOM_PAGES_OUTPUT_DIRECTORY, "index", "extreme-poverty.html"),
      template: path.join(__dirname, "extreme-poverty.html"),
      minify: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: path.join(CUSTOM_PAGES_OUTPUT_DIRECTORY, "index", "gearbest.html"),
      template: path.join(__dirname, "gearbest.html"),
      minify: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: path.join(CUSTOM_PAGES_OUTPUT_DIRECTORY, "index", "axatravel.html"),
      template: path.join(__dirname, "axatravel.html"),
      minify: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: path.join(CUSTOM_PAGES_OUTPUT_DIRECTORY, "index", "animals.html"),
      template: path.join(__dirname, "animals.html"),
      minify: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: path.join(CUSTOM_PAGES_OUTPUT_DIRECTORY, "index", "progress.html"),
      template: path.join(__dirname, "progress.html"),
      minify: true,
      chunks: ['progress'],
    })
  ]
}

export default config
