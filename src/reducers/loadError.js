import { LOAD_ERROR, LOAD_SUCCESS, AUTH_ERROR } from '../actions/loading'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case LOAD_ERROR :
      console.error(payload)
      return '' + payload.message

    case AUTH_ERROR :
      return 'You need to sign in to do that'

    case LOAD_SUCCESS :
      return null

    default :
      return state
  }
}
