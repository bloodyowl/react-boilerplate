import React from "react"
import {Route, DefaultRoute} from "react-router"

import App from "App"
import Home from "Home"

const routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home} />
  </Route>
)

export default routes
