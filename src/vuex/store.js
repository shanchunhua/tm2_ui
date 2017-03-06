import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const state = {
  supplier: null,
  store: null
}

const mutations = {
  PUT_SUPPLIER (state, supplier) {
    state.supplier = supplier
  },
  PUT_STORE (state, store) {
    state.store = store
  }
}

export default new Vuex.Store({
  state,
  mutations
})
