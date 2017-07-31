// src/components/LikeButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import HeartGrey from '../images/heart-grey.svg'
import HeartRed from '../images/heart-red.svg'
import './LikeButton.css'

class LikeButton extends PureComponent {
  static propTypes = {
    liked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  classNames() {
    const { liked } = this.props

    let classes = 'LikeButton'

    if (liked) { classes += ' liked' }

    return classes
  }

  likeStatus() {
    const { liked, likes } = this.props
    const likesOtherThanYours = (likes || 0) - 1

    if (liked && likesOtherThanYours > 0) {
      return `You and ${likesOtherThanYours} others like this`
    }

    if (liked) return 'You like this'

    if (likes > 0) return `${likes} others like this`

    return null
  }

  render() {
    const { liked, onChange } = this.props

    return (
      <p className={ this.classNames() }>
        <button onClick={onChange}>
          <img className="heart" alt="liked" src={ liked ? HeartRed : HeartGrey } />
          <span className="copy">
            <img className="heart" alt="not liked" src={ liked ? HeartRed : HeartGrey } />
          </span>
        </button>
        <span className="likes">{ this.likeStatus() }</span>
      </p>
    )
  }
}

export default LikeButton
