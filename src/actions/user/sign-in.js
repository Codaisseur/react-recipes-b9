import API from '../../api'
import { loading, loadError, loadSuccess } from '../loading'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const api = new API()

export default (user) => {
  return (dispatch) => {
    dispatch(loading(true))

    api.authenticate(user)
      .then((result) => {
        dispatch(loadSuccess())

        dispatch({
          type: USER_SIGNED_IN,
          payload: result
        })

        dispatch(loading(false))
      })
      .catch((error) => {
        dispatch(loading(false))
        dispatch(loadError(error))
      })
  }
}
