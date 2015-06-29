import React, {Component} from "react"
import README from "raw!markdown!../../../README.md"
import styled from "bloody-react-styled"

import styles from "./styles"

@styled(styles)
class Home extends Component {
  render() {
    return (
      <div className="docs-Home" dangerouslySetInnerHTML={{
        __html : README,
      }} />
    )
  }
}

export default Home
