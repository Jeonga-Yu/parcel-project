import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 'is test'
  },
  getters: {
    test: state => state.test
  }
})

export default store