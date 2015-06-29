import React, {Component, PropTypes} from "react"
import styled from "bloody-react-styled"

import styles from "./styles"

@styled(styles)
class App extends Component {

  static childContextTypes = {
    styleVariables : PropTypes.object,
    RouteHandler : PropTypes.func,
  }

  static propTypes = {
    styleVariables : PropTypes.object,
    RouteHandler : PropTypes.func,
  }

  getChildContext() {
    return {
      styleVariables : this.props.styleVariables,
      RouteHandler : this.props.RouteHandler,
    }
  }

  render() {
    return (
      <div className="App">
        <this.props.RouteHandler />
      </div>
    )
  }
}

export default App
