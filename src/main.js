/* global wx */
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
import SupplierIndex from './components/SupplierIndex'
import OrderForm from './components/OrderForm'
import QRCode from './components/QRCode'
import ServiceForm from './components/ServiceForm'
import CardForm from './components/CardForm'
import StoreMain from './components/StoreMain'
import StaffList from './components/StaffList'
import StaffForm from './components/StaffForm'
import HairStyle from './components/HairStyle'
import StoreHairStyle from './components/StoreHairStyle'
import CustomerCenter from './components/CustomerCenter'
import StoreCenter from './components/StoreCenter'
import StaffCenter from './components/StaffCenter'
import CustomerList from './components/CustomerList'
import ValueSelection from './components/ValueSelection'
import ServiceList from './components/ServiceList'
import DiscountCardList from './components/DiscountCardList'
import TimesCardList from './components/TimesCardList'
import PickStaff from './components/PickStaff'
import StoreProductForm from './components/StoreProductForm'
import DiscountCardForm from './components/DiscountCardForm'
import TimesCardForm from './components/TimesCardForm'
import ServiceOrderForm from './components/ServiceOrderForm'
import CustomerCardList from './components/CustomerCardList'

import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Vuex from 'vuex'
import constants from './constants'
import './assets/css/weui.css'

const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(vueResource)
Vue.filter('level', function (v) {
  switch (v) {
    case 3:
      return '三星'
    case 4:
      return '四星'
    case 5:
      return '五星'
  }
})
Vue.filter('paymentStatus', function (v) {
  switch (v) {
    case 'NOT_PAID':
      return '未支付'
    case 'PAID':
      return '已支付'

  }
})
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
  '/serviceform': {
    component: ServiceForm
  },
  '/cardform': {
    component: CardForm
  },
  '/storecreated': {
    component: StoreCreated
  },
  '/productindex': {
    component: ProductIndex
  },
  '/storeindex': {
    component: StoreIndex
  },
  '/supplierindex': {
    component: SupplierIndex
  },
  '/qrcode': {
    component: QRCode
  },
  '/orderform': {
    component: OrderForm
  },
  '/storemain': {
    component: StoreMain
  },
  '/stafflist': {
    component: StaffList
  },
  '/staffform': {
    component: StaffForm
  },
  '/hairstyle': {
    component: HairStyle
  },
  '/storehairstyle': {
    component: StoreHairStyle
  },
  '/customercenter': {
    component: CustomerCenter
  },
  '/storecenter': {
    component: StoreCenter
  },
  '/staffcenter': {
    component: StaffCenter
  },
  '/customerlist': {
    component: CustomerList
  },
  '/valueselection': {
    component: ValueSelection
  },
  '/servicelist': {
    component: ServiceList
  },
  '/pickstaff': {
    component: PickStaff
  },
  '/storeproductform': {
    component: StoreProductForm
  },
  '/discountcardform': {
    component: DiscountCardForm
  },
  '/timescardform': {
    component: TimesCardForm
  },
  '/serviceorderform': {
    component: ServiceOrderForm
  },
  '/discountcardlist': {
    component: DiscountCardList
  },
  '/timescardlist': {
    component: TimesCardList
  },
  '/customercardlist': {
    component: CustomerCardList
  }
})

router.start(App, '#app')
Vue.http.get(constants.serviceUrl + '/wechat/payment/config').then(function (res) {
  console.log(res.data)
  var config = res.data
  config.debug = true
  config.jsApiList = ['checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'onVoicePlayEnd',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'
  ]
  wx.config(config)
  wx.ready(function () {
    console.log('ready')
  })
  wx.error(function () {
    console.error('error')
  })
}, function (res) {
  console.log(res)
})
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
