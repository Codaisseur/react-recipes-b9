import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loadSuccess as clearError } from '../actions/loading'
import './LoadError.css'

export class LoadError extends PureComponent {
  componentWillReceiveProps({ loadError }) {
    const currentError = this.props.loadError
    if (!currentError && loadError) {
      setTimeout(
        this.props.clearError,
        5000
      )
    }
  }

  render() {
    const { loadError } = this.props
    if (!loadError) return null

    return (
      <div className="LoadError">
        <h3>You're doing it wrong!</h3>
        <p>{loadError}</p>
      </div>
    )
  }
}

const mapStateToProps = ({ loadError }) => ({ loadError })
const mapDispatchToProps = { clearError }

export default connect(mapStateToProps, mapDispatchToProps)(LoadError)
