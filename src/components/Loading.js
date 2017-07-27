import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import loadingImage from '../images/loading.gif'

export class Loading extends PureComponent {
  render() {
    const { loading } = this.props
    if (!loading) return null

    return (
      <img src={loadingImage} alt="loading..." />
    )
  }
}

const mapStateToProps = ({ loading }) => ({ loading })

export default connect(mapStateToProps)(Loading)
