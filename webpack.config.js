/* eslint-env node */

const path = require("path")

const PATHS = {
  src: path.join(__dirname, "src"),
  build: path.join(__dirname, "build")
}

const CopyWebpackPlugin = require("copy-webpack-plugin")
const ZipPlugin = require("zip-webpack-plugin")

module.exports = [
  {
    entry: {
      background: PATHS.src + "/background.js",
      content: PATHS.src + "/content.js"
    },
    output: {
      path: PATHS.build + "/chrome/",
      filename: "[name].js"
    },
    plugins: [
      new CopyWebpackPlugin(
        [
          { from: PATHS.src + "/manifest.json" },
          { from: PATHS.src + "/assets", to: PATHS.build + "/chrome/assets" },
          { from: PATHS.src + "/pages", to: PATHS.build + "/chrome/pages" },
          {
            from: PATHS.src + "/_locales",
            to: PATHS.build + "/chrome/_locales"
          }
        ],
        {
          copyUnmodified: true
        }
      ),
      new ZipPlugin({
        filename: "chrome.zip"
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: "css-loader"
        },
        {
          test: /\.html$/,
          loader: "mustache-loader?minify"
        }
      ]
    }
  },
  {
    entry: {
      background: PATHS.src + "/background.js",
      content: PATHS.src + "/content.js"
    },
    output: {
      path: PATHS.build + "/firefox/",
      filename: "[name].js"
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: PATHS.src + "/manifest.json",
          transform: function(content) {
            let newContent = content.toString()
            newContent = newContent.replace(
              "Altruisto.com Chrome Extension",
              "Altruisto.com"
            )
            newContent = newContent.replace(
              /"options_page":\s"(.*)"/i,
              '"options_ui": {\n    "page": "$1"\n  }'
            )
            newContent = newContent.replace(
              '"web_accessible_resources":',
              '"applications": {\n    "gecko": {\n      "id": "altruisto@altruisto.com"\n    }\n  },\n  "web_accessible_resources":'
            )
            return newContent
          }
        },
        { from: PATHS.src + "/assets", to: PATHS.build + "/firefox/assets" },
        {
          from: PATHS.src + "/_locales",
          to: PATHS.build + "/firefox/_locales"
        },
        {
          from: PATHS.src + "/pages",
          to: PATHS.build + "/firefox/pages"
        }
      ]),
      new ZipPlugin({
        filename: "firefox.zip"
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: "css-loader"
        },
        {
          test: /\.html$/,
          loader: "mustache-loader?minify"
        }
      ]
    }
  }
]
