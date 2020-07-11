const state = () => {
  return { navList: [] }
}

const mutations = {
  add(state, str) {
    state.navList.push(str)
  }
}

const actions = {
  add: ({ commit }, str) => {
    commit('add', str)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
