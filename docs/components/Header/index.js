import React, {Component} from "react"
import {Link} from "react-router"

import styles from "./styles"

class Header extends Component {

  componentWillMount() {
    styles.use()
  }

  componentWillUnmount() {
    styles.unuse()
  }

  render() {
    return (
      <header className="docs-Header">
        <Link to="/" className="docs-Header-link">
          <strong>React Boilerplate</strong>: Documentation
        </Link>
      </header>
    )
  }
}

export default Header
