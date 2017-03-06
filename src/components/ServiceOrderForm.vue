<template>
  <div>
    <x-header>我是店铺老板</x-header>
    <group>
      <cell title="产品名称" :value.sync="product.name">{{product.name}}</cell>
      <cell title="产品单价" :value.sync="product.price"></cell>
      <x-number title="购买数量" :min="1" :value.sync="order.quantity"></x-number>
      <cell title="实付金额" :value="product.price*order.quantity"></cell>
    </group>
    <group>
      <div class="weui_cells weui_cells_checkbox">
        <label class="weui_cell weui_check_label" for="s11">
          <div class="weui_cell_hd">
            <input type="checkbox" class="weui_check" name="checkbox1" id="s11" checked="checked">
            <i class="weui_icon_checked"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>烫发九折<span class="right">剩余金额1233元</span></p>
            <p>分类折扣卡</p>
          </div>
        </label>
        <label class="weui_cell weui_check_label" for="s12">
          <div class="weui_cell_hd">
            <input type="checkbox" name="checkbox1" class="weui_check" id="s12">
            <i class="weui_icon_checked"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>烫发次卡<span class="right">还剩13次</span></p>
            <p>烫发次卡</p>
          </div>
        </label>
        <cell title="微信支付" :value="product.name"></cell>
      </div>
    </group>
    <group>
      <div class="item">
        <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
        <div>
          <h4 class="weui_media_title">{{item.name}}<span>{{item.level}}</span></h4>
          <p>{{item.description}}</p>
        </div>
      </div>
    </group>
    <group>
      <x-input title="联系人" :value.sync="suppiler.contact" placeholder="请输入联系人姓名" is-type="china-name"></x-input>
      <x-input title="手机" :value.sync="suppiler.cellphone" placeholder="请输入联系人电话" keyboard="number" is-type="china-mobile" :required="false"></x-input>
      <flexbox>
        <flexbox-item :span="8">
          <x-input title="联系人" :value.sync="suppiler.contact" placeholder="请输入联系人姓名" is-type="china-name"></x-input>
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
    this.product = constants.getObject('service')
    console.log(this.product)
    this.staff = constants.getObject('staff')
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
