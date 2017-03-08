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
          <p class="weui_grid_label">我的订单</p>
        </a>
        <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==2?'selected':''" @click="showRelation">
          <h3 style="text-align: center;">{{ctrl.summary.totalRelations}}人</h3>
          <p class="weui_grid_label">我的朋友</p>
        </a>
        <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==3?'selected':''" @click="showWithdraw">
          <h3 style="text-align: center;">{{app.curUser.commission.total}}元</h3>
          <p class="weui_grid_label">我的钱包</p>
        </a>
      </div>
      <div class="bd">
        <div v-show="menu===1">
          <order-list></order-list>
        </div>
        <div v-show="menu===3">
          <withdraw-record></withdraw-record>
        </div>
        <div v-show="menu===2">
          <div class="weui_cells weui_cells_access">
            <a class="weui_cell" href="javascript:;">
              <div class="weui_cell_hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>
              <div class="weui_cell_bd weui_cell_primary" v-link="{path:'customerlist'}">
                <p>我服务的顾客</p>
              </div>
              <div class="weui_cell_ft"></div>
            </a>
          </div>
          <div class="weui_cells weui_cells_access">
            <a class="weui_cell" href="javascript:;">
              <div class="weui_cell_hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>
              <div class="weui_cell_bd weui_cell_primary" v-link="{path:'userlist'}">
                <p>我分销的用户</p>
              </div>
              <div class="weui_cell_ft"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderList from './_StaffOrderList'
import WithdrawRecord from './WithdrawRecord'
import constants from '../constants'
export default {
  components: {
    OrderList,
    WithdrawRecord
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
