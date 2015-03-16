import React, {Component, PropTypes} from "react"
import {RouteHandler} from "react-router"

import styles from "./styles"

import Navigation from "../Navigation"
import Header from "../Header"

class App extends Component {

  static propTypes = {
    navigation : PropTypes.object,
  }

  static fetchData(state, data) {
    return {
      navigation : data,
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
      <div className="docs-App">
        <Header />
        <div className="r-Grid">
          <div className="r-Grid-cell r-all--1of4">
            <Navigation list={this.props.navigation} />
          </div>
          <div className="r-Grid-cell r-all--3of4">
            <RouteHandler component={this.props.component}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App
