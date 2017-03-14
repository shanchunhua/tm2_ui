<template>
  <div class="page">
    <user-center-header></user-center-header>
    <div class="bd">
      <div class="weui_grids">
        <a href="javascript:;" class="weui_grid js_grid selected" @click="showOrderList">
          <h3 style="text-align: center;">{{user.wallet.orderCount}}笔</h3>
          <p class="weui_grid_label">我的订单</p>
        </a>
        <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==2?'selected':''" @click="showRelation">
          <h3 style="text-align: center;">{{user.wallet.friendCount}}人</h3>
          <p class="weui_grid_label">我的朋友</p>
        </a>
        <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==3?'selected':''" @click="showWithdraw">
          <h3 style="text-align: center;">{{user.wallet.commission}}元</h3>
          <p class="weui_grid_label">我的钱包</p>
        </a>
      </div>
      <div class="bd">
        <div v-show="menu===1">
          <group>
            <cell title="我的体验金" value="还剩1233元"></cell>
            <cell title="我的卡包" is-link value="3" v-link="{path:'/customercardlist'}"></cell>
          </group>
          <order-list></order-list>
        </div>
        <div v-show="menu===3">
          <withdraw-record></withdraw-record>
        </div>
        <div v-show="menu===2">
          <user-list></user-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Group,
  Cell
} from 'vux/src/components'
import OrderList from './OrderList'
import WithdrawRecord from './WithdrawRecord'
import UserList from './_UserList'
import UserCenterHeader from './_UserCenterHeader'
import constants from '../constants'
export default {
  components: {
    Group,
    Cell,
    UserCenterHeader,
    OrderList,
    WithdrawRecord,
    UserList
  },

  ready: function() {},
  methods: {
    showRelation: function() {
      this.menu = 2
    },
    showWithdraw() {
      this.menu = 3
    },
    showOrderList() {
      this.menu = 1
    },
    withdraw() {
      var self = this
      this.$http.post(constants.serviceUrl + '/withdrawrequests', this.withdrawRequest).then(function(res) {
        self.hideDialog()
        self.load()
      }, function(res) {
        console.log(res)
      })
    }
  },
  data() {
    return {
      menu: 1
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../assets/css/weui.css';
@import '../assets/css/class3.css';
.center {
  margin-top: 15px;
  text-align: center;
}

body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
}

.firefox .weui_cells:after {
  transform-origin: 50% 50%;
}
</style>
