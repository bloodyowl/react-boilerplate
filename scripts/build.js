import webpack from "webpack"
import config from "../webpack.config"

import AppCachePlugin from "appcache-webpack-plugin"

const shouldMinify = process.argv.indexOf("--minify") !== -1

import {version} from "../package.json"

const buildConfig = {
  ...config,
  output : {
    ...config.output,
    ...shouldMinify && {
      filename : "[name].min.js",
    },
  },
  plugins : (config.plugins || []).concat([
    new webpack.DefinePlugin({
      __VERSION__ : `"${ version }"`,
      __DEV__ : false,
      __PROD__ : true,
    }),
    new AppCachePlugin({
      cache : ["*"],
      network : [],
    }),
  ]).concat(
    shouldMinify ?
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }) :
        []
  ),
}

webpack(buildConfig, (err, stats) => {
  if(err) {
    throw err
  }
  console.log(stats.toString())
})
