<template>
  <div>
    <x-header>我是店铺老板</x-header>
    <group>
      <cell title="产品名称" :value="product.name"></cell>
      <cell title="产品单价" :value="product.price"></cell>
      <x-number title="购买数量" :min="1" :value.sync="order.quantity"></x-number>
      <cell title="实付金额" :value="product.price*order.quantity"></cell>
      <cell title="体验金比例" :value="product.catalog.experienceMoneyRate">%</cell>
      <cell title="体验金" :value="product.catalog.experienceMoneyRate/100*product.price*order.quantity"></cell>
    </group>
    <group>
      <cell title="店铺名称" :value="store.name"></cell>
      <cell title="店铺地址" :value="store.address"></cell>
      <cell title="联系人" :value="store.contact"></cell>
      <cell title="联系电话" :value="store.cellphone"></cell>
    </group>
    <x-button type="primary" @click="saveOrder()">保存信息并支付</x-button>
  </div>
</template>
<script>
import {
  Group,
  Address,
  XButton,
  Cell,
  XInput,
  XNumber
} from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
import constants from '../constants'
import {
  getStore
} from '../vuex/getters'
export default {
  components: {
    Group,
    Address,
    XButton,
    Cell,
    XInput,
    XNumber,
    XHeader
  },
  vuex: {
    getters: {
      store: getStore
    }
  },
  ready: function() {
    this.loadProduct()
  },
  data() {
    return {
      product: {
        name: null,
        price: null,
        catalog: {
          name: null
        }
      },
      order: {
        quantity: 1
      }
    }
  },
  methods: {
    saveOrder: function() {
      var self = this
      this.order.product = this.product
      this.order.store = this.store
      this.$http.post(constants.serviceUrl + '/orders', this.order).then(function(res) {
        console.log(res)
        self.order = res.data.data
        window.alert(self.order.id)
        self.$http.get(constants.serviceUrl + '/wechat/payment/unifiedorder', {
          params: {
            id: self.order.id
          }
        }).then(function(res) {
          console.log(res)
          var payconfig = res.data
          payconfig.success = function() {
            console.log('success')
          }
          payconfig.cancel = function() {
            console.log('cancel')
          }
          payconfig.error = function() {
            console.log('error')
          }
          /* global wx */
          wx.chooseWXPay(payconfig)
        }, function(res) {
          console.log(res)
        })
      }, function(res) {
        console.log(res)
      })
    },
    loadStore: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/stores/current').then(function(res) {
        self.store = res.data
      }, function(res) {
        console.log(res)
      })
    },
    loadProduct: function() {
      const self = this
      const id = this.$route.query.id
      this.$http.get(constants.serviceUrl + '/products/' + id).then(function(res) {
        self.product = res.data.data
      }, function(res) {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>
