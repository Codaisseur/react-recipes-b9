// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import updateRecipe from '../actions/recipes/update'
import LikeButton from '../components/LikeButton'
import RecipeCategory from './RecipeCategory'
import './RecipeItem.css'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export class RecipeItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    vegan: PropTypes.bool,
    vegetarian: PropTypes.bool,
    pescatarian: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  toggleLike() {
    const { _id, liked } = this.props
    this.props.onChange(_id, { liked: !liked })
  }

  render() {
    const { _id, title, summary, vegan, vegetarian, pescatarian, liked, photo } = this.props

    const categories = { vegan, vegetarian, pescatarian }

    return(
      <article className="RecipeItem">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${photo || PLACEHOLDER })` }} />
          <h1>
            <Link to={`/recipes/${_id}`}>{ title }</Link>
          </h1>
          <ul className="categories">
            <RecipeCategory { ...categories } />
          </ul>
        </header>
        <div>
          <p>{ summary }</p>
        </div>
        <footer>
          <LikeButton onChange={this.toggleLike.bind(this)} liked={liked} />
        </footer>
      </article>
    )
  }
}

export default connect(null, { onChange: updateRecipe })(RecipeItem)
