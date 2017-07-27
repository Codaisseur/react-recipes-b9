import { LOAD_ERROR, LOAD_SUCCESS } from '../actions/loading'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case LOAD_ERROR :
      console.error(payload)
      return '' + payload.message

    case LOAD_SUCCESS :
      return null

    default :
      return state
  }
}
