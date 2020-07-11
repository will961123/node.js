const state = () => {
  return { list: ['a', 'b'], nowSeconds: false}
}

const mutations = {
  add(state, str) {
    state.list.push(str)
  },
  nowSeconds: (state, nowSeconds) => {
    state.nowSeconds = nowSeconds
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
