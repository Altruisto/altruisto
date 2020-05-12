import * as webpack from "webpack"
import path from "path"
import autoprefixer from "autoprefixer"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { CUSTOM_PAGES_ASSETS_DIRECTORY, CUSTOM_PAGES_OUTPUT_DIRECTORY } from "../../settings"

const config: webpack.Configuration = {
  entry: [
    path.join(__dirname, "assets/index.js"),
    path.join(__dirname, "../../assets/scss/index.scss")
  ],
  output: {
    path: CUSTOM_PAGES_ASSETS_DIRECTORY,
    publicPath: "/assets/",
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "index.css"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader"
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
        query: {
          cacheDirectory: true,
          presets: ["@babel/preset-env"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(CUSTOM_PAGES_OUTPUT_DIRECTORY, "index", "covid.html"),
      template: path.join(__dirname, "covid.html"),
      minify: true
    }),
    new HtmlWebpackPlugin({
      filename: path.join(CUSTOM_PAGES_OUTPUT_DIRECTORY, "index", "extreme-poverty.html"),
      template: path.join(__dirname, "extreme-poverty.html"),
      minify: true
    }),
    new HtmlWebpackPlugin({
      filename: path.join(CUSTOM_PAGES_OUTPUT_DIRECTORY, "index", "gearbest.html"),
      template: path.join(__dirname, "gearbest.html"),
      minify: true
    })
  ]
}

export default config
