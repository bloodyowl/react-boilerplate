import React, {Component} from "react"
import styled from "bloody-react-styled"

import styles from "./styles"

class Home extends Component {

  static styles = styles

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

export default styled(Home)
