import React, {Component, PropTypes} from "react"
import {Link} from "react-router"
import styled from "bloody-react-styled"

import styles from "./styles"

@styled(styles)
class Navigation extends Component {

  static propTypes = {
    list : PropTypes.object,
  }

  render() {
    return (
      <nav className="docs-Navigation">
        {Object.keys(this.props.list).map((key) => {
          const examples = this.props.list[key]
          const examplesKeys = Object.keys(examples)
          return (
            <div className="docs-Navigation-group" key={key}>
              {examplesKeys.map((exampleKey) => {
                return (
                  <Link
                    to={`/${key}/${exampleKey}`}
                    key={exampleKey}
                    className="docs-Navigation-link">
                      <strong className="docs-Navigation-linkCategory">
                        {key}
                      </strong>
                      {": "}
                      {exampleKey}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </nav>
    )
  }

}

export default Navigation
