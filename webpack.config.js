import path from "path"
import webpack from "webpack"

import styleVariables from "./src/styleVariables"
import toCSSVariables from "./src/utils/toCSSVariables"

const config = {
  entry : {
    index : [
      "./src/index.js",
    ],
    tests : [
      "./webpack.tests.js",
    ],
    docs : [
      "./docs/docs.js",
    ],
  },
  output : {
    path : path.resolve(__dirname, "dist"),
    filename : "[name].js",
  },
  resolve : {
    extensions : [
      "",
      ".js",
      ".css",
    ],
    alias : {
      "react-router" : path.resolve(
        __dirname,
        "node_modules/react-router/build/npm"
      ),
    },
  },
  module : {
    loaders : [
      {
        test : /\.js$/,
        loaders : [
          "babel?experimental&playground",
        ],
        exclude : /node_modules/,
      },
      {
        test : /\.css$/,
        loaders : [
          "style/useable",
          "css",
          "cssnext",
        ],
      },
      {
        test : /\.(jpe?g|png|gif)$/i,
        loaders : [
          "file?name=assets/[path][name].[ext]&context=./assets",
        ],
      },
      {
        test : /\.svg$/,
        loaders : [
          "raw",
          "svgo?useConfig=svg",
        ],
      },
      {
        test : /\.(html|ico)$/,
        loaders : [
          "file?name=[name].[ext]",
        ],
      },
    ],
  },
  cssnext : {
    compress : true,
    features : {
      customProperties : {
        variables : toCSSVariables(styleVariables),
      }
    }
  },
  svg : {
    plugins: [
      {removeTitle: true, removeDesc: true},
      {convertColors: {shorthex: false}},
      {convertPathData: false},
    ],
  },
  node : {
    fs : "empty",
  },
}

export default config
