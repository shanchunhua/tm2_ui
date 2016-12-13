import Vue from 'vue'
import App from './App'
import Home from './components/HelloFromVux'
import StoreHome from './components/StoreHome'
import ChooseType from './components/ChooseType'
import SupplierForm from './components/SupplierForm'
import SupplierCreated from './components/SupplierCreated'
import StoreForm from './components/StoreForm'
import StoreCreated from './components/StoreCreated'
import ProductIndex from './components/ProductIndex'
import StoreIndex from './components/StoreIndex'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Vuex from 'vuex'

const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(vueResource)

const router = new VueRouter()
router.map({
  '/': {
    component: Home
  },
  '/store': {
    component: StoreHome
  },
  '/choosetype': {
    component: ChooseType
  },
  '/supplierform': {
    component: SupplierForm
  },
  '/suppliercreated': {
    component: SupplierCreated
  },
  '/storeform': {
    component: StoreForm
  },
  '/storecreated': {
    component: StoreCreated
  },
  '/productindex': {
    component: ProductIndex
  },
  '/storeindex': {
    component: StoreIndex
  }
})

router.start(App, '#app')
Vue.http.interceptors.push(function (request, next) {
  // modify request
  console.log('before request')
  this.$root.showLoading = true
  // continue to next interceptor
  next(function (response) {
    console.log(response)
    this.$root.showLoading = false
    return response
  })
})
