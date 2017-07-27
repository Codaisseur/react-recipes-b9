// src/actions/recipes/fetch.js

import API from '../../api'

export const FETCHED_RECIPES = 'FETCHED_RECIPES'

const api = new API()

export default () => {
  return (dispatch) => {
    const backend = api.service('recipes')
    backend.find()
    .then((result) => {
      console.log(result)
      dispatch({
        type: FETCHED_RECIPES,
        payload: result.data
      })
    })
    .catch((error) => {
      // error handling!
    })
  }
}
