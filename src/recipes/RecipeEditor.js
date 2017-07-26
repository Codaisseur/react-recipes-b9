// src/recipes/RecipeEditor.js
import React, { PureComponent } from 'react'
import Editor from 'react-medium-editor'
import toMarkdown from 'to-markdown'
import { connect } from 'react-redux'
import createRecipe from '../actions/recipes/create'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import './RecipeEditor.css'

const TYPES = [
  'vegan',
  'vegetarian',
  'pescatarian'
]

class RecipeEditor extends PureComponent {
  constructor(props) {
    super()

    const { title, summary, vegan, vegetarian, pescatarian, photo } = props

    this.state = {
      title,
      summary,
      vegan,
      vegetarian,
      pescatarian,
      photo,
      errors: {}
    }
  }

  updateTitle(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      title: this.refs.title.value
    })
  }

  updatePhoto(event) {
    this.setState({
      photo: this.refs.photo.value
    })
  }

  updateIntro(text) {
    this.setState({
      summary: text
    })
  }


  setType(event) {
    this.setState({
      vegan: event.target.value === 'vegan',
      vegetarian: event.target.value === 'vegetarian',
      pescatarian: event.target.value === 'pescatarian'
    })
  }

  recipeState() {
    const {
      title,
      summary,
      vegetarian,
      vegan,
      pescatarian,
      photo,
    } = this.state

    return {
      title,
      summary,
      vegetarian,
      vegan,
      pescatarian,
      photo
    }
  }

  isValid() {
    const recipe = this.recipeState()

    let errors = {}

    if (!recipe.title) errors.title = 'Please provide a title!'
    if (!recipe.summary) errors.summary = 'Please provide a summary!'
    if (!recipe.photo) errors.photo = 'Please provide a photo!'

    this.setState({ errors })

    return Object.keys(errors).length === 0
  }

  saveRecipe() {
    if (!this.isValid()) return

    const recipe = this.recipeState()

    this.props.createRecipe(
      Object.assign({}, recipe, { summary: toMarkdown(recipe.summary)}))
  }

  render() {
    const { errors } = this.state

    return (
      <div className="editor">
        <input
          type="text"
          ref="title"
          className="title"
          placeholder="Title"
          defaultValue={this.state.title}
          onChange={this.updateTitle.bind(this)}
          onKeyDown={this.updateTitle.bind(this)} />
        <p>{errors.title}</p>

        <Editor
          ref="summary"
          options={{
            placeholder: {text: 'Write an Introduction...'}
          }}
          onChange={this.updateIntro.bind(this)}
          text={this.state.summary} />
        <p>{errors.summary}</p>

        <input
          type="text"
          ref="photo"
          className="photo"
          placeholder="Photo URL"
          defaultValue={this.state.photo}
          onChange={this.updatePhoto.bind(this)}
          onKeyDown={this.updatePhoto.bind(this)} />
        <p>{errors.photo}</p>

        {TYPES.map((type) => {
          return <label key={type} htmlFor={type}>
            <input id={type} type="radio" name="type" value={type} onChange={this.setType.bind(this)} />
            {type}
          </label>
        })}

        <div className="actions">
          <button className="primary" onClick={this.saveRecipe.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

export default connect(null, { createRecipe })(RecipeEditor)
