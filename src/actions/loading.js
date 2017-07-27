export const APP_LOADING = 'APP_LOADING'
export const APP_DONE_LOADING = 'APP_DONE_LOADING'

export default (loading) => ({
  type: loading ? APP_LOADING : APP_DONE_LOADING
})
