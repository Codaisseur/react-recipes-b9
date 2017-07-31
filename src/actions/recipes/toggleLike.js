// src/actions/recipes/toggleLike.js

import API from '../../api'
import { loading, loadError, loadSuccess, authError } from '../loading'

const api = new API()

export default (recipeId) => {
  return (dispatch, getState) => {
    dispatch(loading(true))

    const { recipes, currentUser } = getState()

    const recipe = recipes.filter((recipe) => (recipe._id === recipeId))[0]

    const patchData = {
      like: recipe.likedBy.filter((likerId) => (likerId === currentUser._id)).length === 0
    }

    api.app.authenticate()
      .then(() => {
        api.service('recipes')
          .patch(recipeId, patchData)
          .then((result) => {
            dispatch(loadSuccess())
            dispatch(loading(false))
          })
          .catch((error) => {
            dispatch(loading(false))
            dispatch(loadError(error))
          })
      })
      .catch(() => {
        dispatch(loading(false))
        dispatch(authError())
      })
  }
}
