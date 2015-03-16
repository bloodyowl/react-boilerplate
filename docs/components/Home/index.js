import React, {Component} from "react"
import README from "raw!markdown!../../../README.md"

import styles from "./styles"

class Home extends Component {

  componentWillMount() {
    styles.use()
  }

  componentWillUnmount() {
    styles.unuse()
  }

  render() {
    return (
      <div className="docs-Home" dangerouslySetInnerHTML={{
        __html : README,
      }} />
    )
  }
}

export default Home
