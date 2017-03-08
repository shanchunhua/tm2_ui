<template>
  <div class="page">
    <div class="hd">
      <div class="page_title">
        <img alt="" class="avatar" ng-src="{{::app.curUser.headimgurl}}">
      </div>
      <p class="page_desc">{{::app.curUser.nickname}}</p>
    </div>
    <div class="bd">
      <div class="weui_grids">
        <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==1?'selected':''" @click="showOrderList">
          <h3 style="text-align: center;">{{ctrl.orders.length}}笔</h3>
          <p class="weui_grid_label">本店订单</p>
        </a>
        <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==2?'selected':''" @click="showRelation">
          <h3 style="text-align: center;">{{ctrl.summary.totalRelations}}人</h3>
          <p class="weui_grid_label">本店人脉</p>
        </a>
        <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==3?'selected':''" @click="showWithdraw">
          <h3 style="text-align: center;">{{app.curUser.commission.total}}元</h3>
          <p class="weui_grid_label">本店收益</p>
        </a>
      </div>
    </div>
    <div class="bd">
      <div v-show="menu===1">
        <order-list></order-list>
      </div>
      <div v-show="menu===3">
        <store-money></store-money>
      </div>
      <div v-show="menu===2">
        <group>
          <cell title="本店会员" is-link value="300人" v-link="{path:'/storememberlist'}"></cell>
          <cell title="本店散客" is-link value="3" v-link="{path:'/storecustomerlist'}"></cell>
          <cell title="仅关注用户" is-link value="3" v-link="{path:'/storesubscriberlist'}"></cell>
        </group>
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
import StoreMoney from './StoreMoney'
import UserList from './UserList'
import constants from '../constants'
export default {
  components: {
    OrderList,
    StoreMoney,
    UserList,
    Group,
    Cell
  },

  ready: function() {
    this.load()
  },
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
    load() {
      const self = this
      this.$http.get(constants.serviceUrl + '/withdrawrequests').then(function(res) {
        self.list = res.data.data.content
      }, function(res) {
        console.log(res)
      })
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
      menu: 3
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
