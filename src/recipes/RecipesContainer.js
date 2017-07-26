// src/recipes/RecipesContainer.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import seedRecipes from '../actions/recipes/seed'
import Title from '../components/Title'
import RecipeItem from './RecipeItem'
import RecipeEditor from './RecipeEditor'
import './RecipesContainer.css'

export class RecipesContainer extends PureComponent {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    seedRecipes: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.seedRecipes()
  }

  renderRecipe(recipe, index) {
    return <RecipeItem
      key={index}
      { ...recipe } />
  }

  render() {
    return(
      <div className="recipes wrapper">
        <header>
          <Title content="Recipes" />
          <RecipeEditor />
        </header>

        <main>
          { this.props.recipes.map(this.renderRecipe.bind(this)) }
        </main>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    recipes: store.recipes
  }
}

export default connect(mapStateToProps, { seedRecipes })(RecipesContainer)
