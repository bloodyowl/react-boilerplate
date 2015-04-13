import React, {Component, PropTypes} from "react"
import styled from "bloody-react-styled"
import cx from "classnames"

import styles from "./styles"

class Button extends Component {

  static defaultProps = {
    modifier : "default",
  }

  static propTypes = {
    className : PropTypes.string,
    modifier : PropTypes.string,
  }

  static styles = styles

  render() {
    const classes = cx(
      `r-ResetButton`,
      `Button`,
      `Button--${ this.props.modifier }`,
      this.props.className
    )
    return (
      <button {...this.props} className={classes}>
        {this.props.children}
      </button>
    )
  }

}

export default styled(Button)
