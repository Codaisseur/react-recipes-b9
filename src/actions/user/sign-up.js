import API from '../../api'
import { loading, loadError } from '../loading'
import signIn from './sign-in'

export const USER_SIGNED_UP = 'USER_SIGNED_UP'

const api = new API()

export default (user) => {
  return (dispatch) => {
    dispatch(loading(true))

    api.service('users')
      .create(user)
        .then((result) => {
          dispatch(signIn(user))
        })
        .catch((error) => {
          dispatch(loading(false))
          dispatch(loadError(error))
        })
  }
}
