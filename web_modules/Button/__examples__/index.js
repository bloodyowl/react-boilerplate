import React, {Component} from "react"
import Button from ".."

export default class extends Component {
  render() {
    return (
      <div>
        <h2>Basic button</h2>
        <Button>
          Basic button
        </Button>
        <h2>Basic disabled button</h2>
        <Button disabled={true}>
          Basic disabled button
        </Button>
        <h2>Primary button</h2>
        <Button modifier="primary">
          Primary button
        </Button>
        <h2>Primary disabled button</h2>
        <Button modifier="primary" disabled={true}>
          Primary disabled button
        </Button>
      </div>
    )
  }
}
