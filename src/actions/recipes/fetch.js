// src/actions/recipes/fetch.js

import API from '../../api'
import { loading, loadError, loadSuccess } from '../loading'

export const FETCHED_RECIPES = 'FETCHED_RECIPES'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch(loading(true))

    const backend = api.service('recipes')
    backend.find()
    .then((result) => {
      dispatch(loadSuccess())

      dispatch({
        type: FETCHED_RECIPES,
        payload: result.data
      })

      dispatch(loading(false))
    })
    .catch((error) => {
      dispatch(loading(false))
      dispatch(loadError(error))
    })
  }
}
