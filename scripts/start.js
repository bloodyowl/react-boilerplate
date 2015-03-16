import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import opn from "opn"

import config from "../webpack.config"

import {version} from "../package.json"

const SERVER_PROTOCOL = "http://"
const SERVER_HOST = "0.0.0.0"
const SERVER_PORT = 3232

const devEntry = [
  `webpack-dev-server/client?` +
    `${ SERVER_PROTOCOL }${ SERVER_HOST }:${ SERVER_PORT }`,
  "webpack/hot/only-dev-server",
]

const devConfig = {
  ...config,
  debug : true,
  watch : true,
  colors: true,
  progress : true,
  entry : {
    ...Object.keys(config.entry).reduce((acc, key) => {
      acc[key] = devEntry.concat(config.entry[key])
      return acc
    }, {})
  },
  plugins : (config.plugins || []).concat([
    new webpack.DefinePlugin({
      __VERSION__ : `"${ version }"`,
      __DEV__ : true,
      __PROD__ : false,
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]),
  module : {
    ...config.module,
    loaders : (() => {
      const loaders = config.module.loaders
      loaders[0].loaders = ["react-hot"].concat(loaders[0].loaders)
      return loaders
    })()
  },
}


const protocol = {
  https : SERVER_PROTOCOL === "https://"
}

const devServer = new WebpackDevServer(
  webpack(devConfig),
  {
    ...protocol,
    publicPath : "/",
    hot : true,
    stats : {
      colors : true,
    },
    noInfo : true,
  }
)

devServer.listen(SERVER_PORT, SERVER_HOST, () => {
  opn(`${ SERVER_PROTOCOL }${ SERVER_HOST }:${ SERVER_PORT }`)
})

