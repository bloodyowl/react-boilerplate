import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import opn from "opn"

import config from "../webpack.config"

import {version} from "../package.json"

import tape from "tape-catch"
import jsdom from "jsdom"

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
  devtool : false,
  entry : {
    ...Object.keys(config.entry).reduce((acc, key) => {
      acc[key] = devEntry.concat(config.entry[key])
      return acc
    }, {}),
    ...{
      tests : [
        "./webpack.tests.js",
      ],
    },
  },
  plugins : (config.plugins || []).concat([
    new webpack.DefinePlugin({
      __VERSION__ : `"${ version }"`,
      __DEV__ : true,
      __PROD__ : false,
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    function() {
      let previousWindow = null
      this.plugin("invalid", () => {
        if(previousWindow) {
          previousWindow.close()
        }
        console.log("build is now INVALID")
      })
      this.plugin("done", (stats) => {
        console.log("build is now VALID")
        jsdom.env({
          url:
            `${ SERVER_PROTOCOL }${ SERVER_HOST }:${ SERVER_PORT }/` +
            `dev-test.html`,
          src: [
            // hacky-way to get the file, but actually doesn't
            // use any fs calls
            stats.compilation.assets["tests.js"]._cachedSource,
          ],
          done: (errors) => {
            if(errors) {
              errors.forEach((error) => {
                setTimeout(() => {
                  console.error(error)
                })
              })
            }
          },
          created(errors, window) {
            previousWindow = window
            if(errors) {
              console.error(errors)
            }
            window.tape = tape.createHarness()
            let ok = 0
            let notOk = 0
            let asserted = 0
            window.tape.createStream({ objectMode: true })
              .on("data", (chunk) => {
                if(chunk.type === "test") {
                  console.log(`# ${ chunk.name }`)
                }
                if(chunk.type === "assert") {
                  asserted++
                  if(chunk.ok) {
                    ok++
                  } else {
                    notOk++
                  }
                  console.log(
                    `${ chunk.ok ? "ok" : "not ok" } ${ asserted } ` +
                    `${ chunk.name }`
                  )
                  if(!chunk.ok) {
                    console.log(`  ---`)
                    console.log(`  operator: ${ chunk.operator }`)
                    console.log(
                      `  expected: ` +
                      JSON.stringify(chunk.expected)
                    )
                    console.log(
                      `  actual: ` +
                      JSON.stringify(chunk.actual)
                    )
                    console.log(`  ---`)
                  }
                }
              })
              .on("end", () => {
                console.log("")
                console.log(`1...${ asserted }`)
                console.log("")
                console.log(`# tests ${ asserted }`)
                console.log(`# pass ${ ok }`)
                console.log(`# fail ${ notOk }`)
                window.close()
                previousWindow = null
              })
          },
        })
      })
    },
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
