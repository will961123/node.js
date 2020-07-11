import Vue from 'vue'
import Vuex from 'vuex'
import city from './modules/city'
import navbar from './modules/navbar'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    city,
    navbar
  },
  actions: {
        //   服务端渲的某些数据传递给客户端 客户端无需再次发起请求
    nuxtServerInit({ commit }, { req }) {
      if (true) {
        commit('city/nowSeconds', new Date().getSeconds())
      }
    }
  }
})

export default store
