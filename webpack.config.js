/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: 0 */

const path = require("path")

const PATHS = {
  src: path.join(__dirname, "src"),
  build: path.join(__dirname, "build")
}

const CopyWebpackPlugin = require("copy-webpack-plugin")
const ZipPlugin = require("zip-webpack-plugin")
const ExtensionReloader = require("webpack-extension-reloader")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WaitForFilePlugin = require("./webpack/WaitForFilePlugin")

module.exports = (env, argv) => [
  // build react app for panel and output it to temporary location: /build/.panel
  {
    name: "panel",
    entry: PATHS.src + "/panel/index.tsx",
    output: {
      path: PATHS.build + "/.panel/",
      filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader"
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: PATHS.src + "/panel/index.html"
      })
    ]
  },
  {
    name: "chrome",
    entry: {
      background: PATHS.src + "/background.js",
      content: PATHS.src + "/content.js"
    },
    output: {
      path: PATHS.build + "/chrome/",
      filename: "[name].js"
    },
    plugins: [
      new WaitForFilePlugin(PATHS.build + "/.panel/index.html"),
      new CopyWebpackPlugin(
        [
          {
            from: PATHS.src + "/manifest.json",
            transform: content => {
              // for extension reloader we need to inject specific content security policies
              if (argv.mode === "development") {
                let newContent = content.toString()
                newContent =
                  newContent.substr(0, newContent.lastIndexOf("}")) +
                  `,"content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'" }`
                return newContent
              }

              return content
            }
          },
          { from: PATHS.src + "/assets", to: PATHS.build + "/chrome/assets" },
          { from: PATHS.src + "/options", to: PATHS.build + "/chrome/options" },
          {
            from: PATHS.src + "/_locales",
            to: PATHS.build + "/chrome/_locales"
          },
          {
            from: PATHS.build + "/.panel",
            to: PATHS.build + "/chrome/panel"
          }
        ],
        // for extension reloader we need to inject specific content security policies
        argv.mode === "production"
          ? {
              copyUnmodified: true
            }
          : {}
      ),
      new ExtensionReloader({
        port: 9000
      }),
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
    name: "firefox",
    entry: {
      background: PATHS.src + "/background.js",
      content: PATHS.src + "/content.js"
    },
    output: {
      path: PATHS.build + "/firefox/",
      filename: "[name].js"
    },
    plugins: [
      new WaitForFilePlugin(PATHS.build + "/.panel/index.html"),
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
            if (argv.mode === "development") {
              newContent =
                newContent.substr(0, newContent.lastIndexOf("}")) +
                `,"content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'" }`
            }
            return newContent
          }
        },
        { from: PATHS.src + "/assets", to: PATHS.build + "/firefox/assets" },
        {
          from: PATHS.src + "/_locales",
          to: PATHS.build + "/firefox/_locales"
        },
        {
          from: PATHS.src + "/options",
          to: PATHS.build + "/firefox/options"
        },
        {
          from: PATHS.build + "/.panel",
          to: PATHS.build + "/firefox/panel"
        }
      ]),
      new ExtensionReloader({
        port: 9001
      }),
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
