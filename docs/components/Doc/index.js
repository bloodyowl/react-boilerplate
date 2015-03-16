import React, {Component} from "react/addons"

class Doc extends Component {

  static fetchData(state, data) {
    const params = state.params
    return {
      component : data[params.component][params.doc],
    }
  }

  mapComponent() {
    const C = this.props.component
    return <C />
  }

  render() {
    return (
      <div>
        {React.addons.createFragment(this.mapComponent())}
      </div>
    )
  }

}

export default Doc
