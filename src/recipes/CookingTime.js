import React, { PureComponent } from 'react'
import Timer from 'material-ui/svg-icons/image/timer'
import './CookingTime.css'

export default class CookingTime extends PureComponent {
  render() {
    if (!this.props.time) return null

    return (
      <p className="CookingTime">
        <Timer color="#ccc" />
        {`${this.props.time} minutes`}
      </p>
    )
  }
}
