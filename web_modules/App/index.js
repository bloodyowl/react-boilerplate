import React, {Component, PropTypes} from "react"

import styles from "./styles"

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

  componentWillMount() {
    styles.use()
  }

  componentWillUnmount() {
    styles.unuse()
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
