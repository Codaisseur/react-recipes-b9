// src/reducers/recipes.js
import { FETCHED_RECIPES } from '../actions/recipes/fetch'
import { UPDATE_RECIPE } from '../actions/recipes/update'
import { CREATE_RECIPE } from '../actions/recipes/create'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_RECIPES :
      return [].concat(payload)

    case CREATE_RECIPE :
      return [Object.assign({}, payload)].concat(state)

    case UPDATE_RECIPE :
      const { _id, updates } = payload

      return state.map((recipe) => {
        if (recipe._id !== _id) return recipe
        return Object.assign({}, recipe, updates)
      })

    default :
      return state
  }
}
