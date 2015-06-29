import React, {Component} from "react"
import {Link} from "react-router"
import styled from "bloody-react-styled"

import styles from "./styles"

@styled(styles)
class Header extends Component {
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
