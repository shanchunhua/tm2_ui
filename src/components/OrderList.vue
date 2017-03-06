<template>
  <div class="weui_search_bar" id="search_bar">
    <form class="weui_search_outer" ng-submit="ctrl.search()">
      <div class="weui_search_inner">
        <i class="weui_icon_search"></i>
        <input type="search" class="weui_search_input" id="search_input" placeholder="搜索" ng-model="ctrl.keywords" required/>
        <a href="javascript:" class="weui_icon_clear" id="search_clear" ng-click="ctrl.cancel();"></a>
      </div>
      <label for="search_input" class="weui_search_text" id="search_text">
        <i class="weui_icon_search"></i>
        <span>请输入订单尾号后四位搜索</span>
      </label>
      <input type="submit" style="display:none;" />
    </form>
    <a href="javascript:" class="weui_search_cancel" id="search_cancel" ng-click="ctrl.cancel();">取消</a>
  </div>
  <div class="weui_cells_title" ng-repeat-start="order in ctrl.orders">{{order.createdDate|date:'yyyy-MM-dd'}}</div>
  <div class="weui_cells" ng-repeat-end>
    <div class="weui_cell">
      <div class="weui_cell_bd" style="flex: 1;">
        <p>
          <span style="display: inline-block;">订单编号： {{order.orderNo}}</span><span style="display: inline-block; float: right;" class="gray">{{order.paymentStatus|paymentStatus}}</span>
        </p>
        <p class="gray">
          <span style="display: inline-block;">{{order.product.name}}({{order.product.price}}元*{{order.quantity}})</span><span style="display: inline-block; float: right;">{{order.total}}元</span>
        </p>
        <p class="gray">
          <span style="display: inline-block;">{{order.contact}}({{order.tel}})</span>
          <span style="display: inline-block; float: right;">{{order.consumeStatus|consumeStatus}}</span>
        </p>
        <input class="weui_btn weui_btn_primary js_grid" type="submit" ng-show="" ng-click="app.pay(order)" value="继续支付"></input>
        <input class="weui_btn weui_btn_primary js_grid" type="submit" ng-show="" ng-click="ctrl.confirm(order)" value="确认到店消费"></input>
      </div>
    </div>
  </div>
</template>
<script>
import constants from '../constants'
export default {

  ready: function() {
    this.load()
  },
  methods: {
    showDialog: function() {
      this.showWithdrawDlg = true
    },
    hideDialog() {
      this.showWithdrawDlg = false
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
      list: [],
      withdrawRequest: {
        amount: 1
      },
      showWithdrawDlg: false
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
