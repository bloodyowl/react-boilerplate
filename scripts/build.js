import webpack from "webpack"
import config from "../webpack.config"

import AppCachePlugin from "appcache-webpack-plugin"

import {version} from "../package.json"

const buildConfig = {
  ...config,
  plugins : (config.plugins || []).concat([
    new webpack.DefinePlugin({
      __VERSION__ : `"${ version }"`,
      __DEV__ : false,
      __PROD__ : true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new AppCachePlugin(),
  ])
}

webpack(config, (err, stats) => {
  if(err) {
    throw err
  }
  console.log(stats.toString())
})
