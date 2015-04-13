import path from "path"
import webpack from "webpack"

import styleVariables from "./src/styleVariables"

const config = {
  entry : {
    index : [
      "./src/index.js",
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
  },
  module : {
    loaders : [
      {
        test : /\.js$/,
        loaders : [
          "babel?" + JSON.stringify({
            stage: 0,
          }),
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
        variables : styleVariables,
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
