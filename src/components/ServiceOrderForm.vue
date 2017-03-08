<template>
  <div>
    <x-header>我是店铺老板</x-header>
    <group>
      <cell title="产品名称" :value.sync="product.name"></cell>
      <cell title="产品单价" :value.sync="product.price"></cell>
      <x-number title="购买数量" :min="1" :value.sync="order.quantity"></x-number>
      <cell title="实付金额" :value="product.price*order.quantity"></cell>
    </group>
    <group v-show="order.ptype==1">
      <div class="weui_cells weui_cells_checkbox">
        <label class="weui_cell weui_check_label" v-for="discountcard in discountcards">
          <div class="weui_cell_hd">
            <input type="checkbox" class="weui_check" name="checkbox1" v-model="useDiscountCard">
            <i class="weui_icon_checked"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{discountcard.card.name}}<span class="right">剩余金额{{discountcard.leftAmount}}元</span></p>
            <p>分类折扣卡</p>
          </div>
        </label>
        <label class="weui_cell weui_check_label" v-for="timescard in timescards">
          <div class="weui_cell_hd">
            <input type="checkbox" class="weui_check" v-model="useTimesCard">
            <i class="weui_icon_checked"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{timescard.card.name}}<span class="right">还剩{{timescard.times}}次</span></p>
            <p>次卡</p>
          </div>
        </label>
      </div>
    </group>
    <div class="weui_cells weui_cells_checkbox" v-show="order.ptype!=4">
      <label class="weui_cell weui_check_label">
        <div class="weui_cell_hd">
          <input type="checkbox" name="checkbox1" class="weui_check" v-model="useExperienceMoney">
          <i class="weui_icon_checked"></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>体验金<span class="right">还剩{{totalExperienceMoney}}元</span></p>
        </div>
      </label>
    </div>
    <group>
      <cell title="微信支付" :value.sync="wechatPay"></cell>
    </group>
    <group>
      <div class="item" v-if="order.ptype==='1'">
        <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
        <div>
          <h4 class="weui_media_title">{{order.staff.name}}<span>{{order.staff.level}}</span></h4>
          <p>{{order.staff.description}}</p>
        </div>
      </div>
    </group>
    <group>
      <x-input title="联系人" :value.sync="order.customerName" placeholder="请输入联系人姓名" is-type="china-name"></x-input>
      <x-input title="手机" :value.sync="order.cellphone" placeholder="请输入联系人电话" keyboard="number" is-type="china-mobile" :required="false"></x-input>
      <flexbox>
        <flexbox-item :span="8">
          <x-input title="验证码" :value.sync="code" placeholder="请输入验证码"></x-input>
        </flexbox-item>
        <flexbox-item :span="4">
          <button>发送验证码</button>
        </flexbox-item>
      </flexbox>
    </group>
    <x-button type="primary" @click="saveOrder()">保存信息并支付</x-button>
  </div>
</template>
<script>
/* global wx */
import {
  Group,
  Address,
  XButton,
  Cell,
  Flexbox,
  FlexboxItem,
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
    Flexbox,
    FlexboxItem,
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
    console.log('here')
    this.setProduct()
    this.order.ptype = this.$route.query.ptype
    console.log(this.product)
    this.order.staff = constants.getObject('staff')
  },
  data() {
    return {
      discountcards: null,
      timescards: null,
      product: {
        name: null,
        price: null,
        catalog: {
          name: null
        }
      },
      useExperienceMoney: false,
      totalExperienceMoney: 100,
      useDiscountCard: false,
      useTimesCard: false,
      order: {
        ptype: null,
        discount: 1,
        quantity: 1,
        timesCard: null,
        discountCard: null,
        service: null,
        storeProduct: null,
        platformProduct: null,
        customerName: null,
        cellphone: null,
        staff: null
      }
    }
  },
  computed: {
    wechatPay: function() {
      var needToPay = this.product.price * this.order.quantity * this.order.discount
      if (this.useExperienceMoney) {
        if (needToPay < this.totalExperienceMoney) {
          this.order.experienceMoney = needToPay
          this.order.actualPay = 0
        } else {
          this.order.experienceMoney = this.totalExperienceMoney
          this.order.actualPay = needToPay - this.totalExperienceMoney
        }
      } else {
        this.order.experienceMoney = 0
        this.order.actualPay = needToPay
      }
      return this.order.actualPay
    }
  },
  methods: {
    setProduct() {
      this.order.ptype = this.$route.query.ptype
      if (this.order.ptype === '1') {
        this.product = constants.getObject('service')
        this.order.service = constants.getObject('service')
        this.loadDiscountCards()
        this.loadTimesCards()
      }
      if (this.order.ptype === '2') {
        this.product = constants.getObject('storeproduct')
        this.order.storeProduct = constants.getObject('storeproduct')
      }
      if (this.order.ptype === '3') {
        if (constants.getObject('timescard')) {
          this.order.timesCard = constants.getObject('timescard')
          this.product = constants.getObject('timescard')
        } else {
          this.order.discountCard = constants.getObject('discountcard')
          this.product = constants.getObject('discountcard')
        }
      }
      if (this.order.ptype === '4') {
        this.product = constants.getObject('platformproduct')
        this.order.platformProduct = constants.getObject('platformproduct')
      }
      this.order.productName = this.product.name
      this.order.price = this.product.price
    },
    saveOrder: function() {
      var self = this
      console.log(this.order)
      this.$http.post(constants.serviceUrl + '/storeorders', this.order).then(function(res) {
        console.log(res)
        self.order = res.data.data
        window.alert(self.order.id)
        self.$http.get(constants.serviceUrl + '/wechat/payment/unifiedorder', {
          params: {
            id: self.order.id,
            type: 2
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
    loadDiscountCards: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/storeorders/discountcard/' + this.order.service.id).then(function(res) {
        self.discountcards = res.data.data
        console.log(self.discountcards)
      }, function(res) {
        console.log(res)
      })
    },
    loadTimesCards: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/storeorders/timescard/' + this.order.service.id).then(function(res) {
        self.timescards = res.data.data
        console.log(self.timescards)
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
