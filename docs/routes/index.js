import React from "react"
import {Route, DefaultRoute} from "react-router"

import App from "../components/App"
import Home from "../components/Home"
import Doc from "../components/Doc"

const routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} />
    <Route path="/:component/:doc" handler={Doc} />
  </Route>
)

export default routes
