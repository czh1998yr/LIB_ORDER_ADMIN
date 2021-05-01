
const state={
  user: ''
}

export default {
  state,
  mutations: {
    updataUser(state, user) {
      state.user = user
    },
  },
  actions: {
    setUser(context,user) {
      context.commit("updataUser", user)
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
}