import "es5-shim"
import "es5-shim/es5-sham"
import "babel/polyfill"

import "whatwg-fetch"

import assign from "object-assign"

if(typeof Object.assign !== "function") {
  Object.assign = assign
}

import React from "react"
import Router from "react-router"

import routes from "./routes"
import fetchData from "./utils/fetchData"

import "./docs.html"

const webModulesReq = require.context(
  "../web_modules",
  true,
  /__examples__\/\S+\.js$/
)

const data = webModulesReq.keys()
  .map((key) => {
    const match = key.match(/\S+\/(\S+)\/__examples__\/?(\S+)\.js$/)
    return {
      key : key,
      component : match[1],
      example : match[2],
    }
  })
  .reduce((acc, item) => {
    acc[item.component] = {
      ...acc[item.component],
      [item.example] : webModulesReq(item.key),
    }
    return acc
  }, {})

Router.run(routes, (Handler, state) => {
  fetchData(state, data)
    .then((requestedData) => {
      const reducedData = requestedData
        .reduce((acc, item) => {
          return {
            ...acc,
            ...item,
          }
        }, {})
      requestAnimationFrame(() => {
        React.render(
          <Handler {...reducedData}/>,
          document.getElementById("app")
        )
      })
    })
})
