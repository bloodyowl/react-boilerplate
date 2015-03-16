import React, {Component} from "react"

import styles from "./styles"

class Home extends Component {

  componentDidMount() {
    styles.use()
  }

  componentWillUnmount() {
    styles.unuse()
  }

  render() {
    return (
      <div className="Home">
        <div className="r-Grid u-Container">
          <div className="r-Grid-cell r-all--1of1">
            <h1 className="Home-title">helloworld</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
