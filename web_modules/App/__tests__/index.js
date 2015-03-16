import tape from "tape"
import React, {Component, PropTypes} from "react/addons"
const TestUtils = React.addons.TestUtils

import App from ".."

tape("App", (test) => {

  class TestRouteHandler extends Component {

    static contextTypes = {
      styleVariables : PropTypes.object,
      RouteHandler : PropTypes.func,
    }

    componentWillMount() {
      test.notEqual(
        this.context,
        null,
        "passes a context to its children"
      )
      test.equal(
        this.context.RouteHandler,
        TestRouteHandler,
        "`RouteHandler` is passed to children through context"
      )
      test.deepEqual(
        this.context.styleVariables,
        {
          mainColor : "#ff0",
        },
        "`styleVariables` is passed to children through context"
      )
      test.end()
    }

    render() {
      return null
    }
  }

  TestUtils.renderIntoDocument(
    <App
      RouteHandler={TestRouteHandler}
      styleVariables={{
        mainColor : "#ff0"
      }} />
  )
})
