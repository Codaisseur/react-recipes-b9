import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import LikeButton from '../components/LikeButton'
import RecipeCategory from './RecipeCategory'
import './RecipeItem.css'
import fetchRecipes from '../actions/recipes/fetch'
import Title from '../components/Title'
import CookingTime from './CookingTime'

export class RecipePage extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    vegan: PropTypes.bool,
    vegetarian: PropTypes.bool,
    pescatarian: PropTypes.bool,
    liked: PropTypes.bool,
    fetchRecipes: PropTypes.func.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  }

  componentWillMount() {
    this.props.fetchRecipes()
  }

  toggleLike() {
    const { _id } = this.props
    this.props.toggleLike(_id)
  }

  renderCookingStep(step, index) {
    console.log(step)
    return (
      <div key={index} className="cookingstep">
        {step.title && <h3>{step.title}</h3>}
        <CookingTime time={step.cookingTime} />
        <ReactMarkdown source={step.description} />
      </div>
    )
  }

  render() {
    const {
      _id,
      title,
      summary,
      vegan,
      vegetarian,
      pescatarian,
      photo,
      liked,
      cookingSteps,
      author,
      cookingTime,
    } = this.props

    const categories = { vegan, vegetarian, pescatarian }

    if (!_id) return null

    return(
      <article className="recipe page">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${photo})` }} />
          <Title content={ title } />
          <p className="author">By: { author.name }</p>
          <CookingTime time={cookingTime} />
          <ul className="categories">
            <RecipeCategory { ...categories } />
          </ul>
        </header>
        <main>
          <ReactMarkdown source={summary} />

          {cookingSteps.map(this.renderCookingStep)}
        </main>
        <footer>
          <LikeButton
            liked={liked}
            onChange={this.toggleLike.bind(this)} />
        </footer>
      </article>
    )
  }
}

const mapStateToProps = ({ recipes }, { params }) => {
  const recipe = recipes.reduce((prev, next) => {
    if (next._id === params.recipeId) {
      return next
    }
    return prev
  }, {})

  return {
    ...recipe
  }
}

export default connect(mapStateToProps, { fetchRecipes })(RecipePage)
