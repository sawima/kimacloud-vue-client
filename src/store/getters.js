const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userContext: state => state.user.userContext,
  name: state => state.user.name,
  orgs: state => state.user.orgs
}
export default getters
