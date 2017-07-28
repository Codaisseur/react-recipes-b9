// src/actions/recipes/create.js

import API from '../../api'
import { loading, loadError, loadSuccess, authError } from '../loading'

export const CREATE_RECIPE = 'CREATE_RECIPE'

const api = new API()

export default (newRecipe) => {
  return (dispatch) => {
    dispatch(loading(true))

    api.app.authenticate()
      .then(() => {
        api.service('recipes')
          .create(newRecipe)
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
