import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const state = {
  supplier: null
}

const mutations = {
  PUT_SUPPLIER (state, supplier) {
    state.supplier = supplier
  }
}

export default new Vuex.Store({
  state,
  mutations
})
