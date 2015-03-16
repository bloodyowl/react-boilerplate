import "whatwg-fetch"

import React from "react"
import Router, {RouteHandler} from "react-router"

import routes from "./routes"

import "./index.html"

import styleVariables from "./styleVariables"

Router.run(routes, (Handler, state) => {
  React.render(
    <Handler
      RouteHandler={RouteHandler}
      styleVariables={styleVariables} />,
    document.getElementById("app")
  )
})
