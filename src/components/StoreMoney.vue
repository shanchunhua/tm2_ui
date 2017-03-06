<template>
  <div class="weui_cells">
    <div class="weui_cell">
      <div class="weui_cell_bd" style="flex: 1;">
        <p>
          <span style="display: inline-block;"> 当前剩余现金 </span>
        </p>
        <p>
          <h1 style="display: inline-block;">{{ownerCtrl.summary.store.commission.leftAmount}}</h1> 元
        </p>
      </div>
      <div class="weui_cell_bd">
        <p style="float: right;">
          <a href="javascript:;" ng-click="app.showWithdrawDlg=true;" class="weui_btn weui_btn_primary">提现到微信</a>
        </p>
      </div>
    </div>
  </div>
  <div class="weui_cells">
    <div class="weui_cell">
      <div class="weui_cell_bd" style="flex: 1;">
        <p>
          <span style="display: inline-block;"> 当前剩余体验金金 </span>
        </p>
        <p>
          <h1 style="display: inline-block;">{{ownerCtrl.summary.store.commission.leftAmount}}</h1> 元
        </p>
      </div>
      <div class="weui_cell_bd">
        <p style="float: right;">
          <a href="javascript:;" ng-click="app.showWithdrawDlg=true;" class="weui_btn weui_btn_primary">查看记录&nbsp;</a>
        </p>
      </div>
    </div>
  </div>
  <div class="weui_cells_title">本店数据</div>
  <div class="bd">
    <div class="weui_grids">
      <a href="javascript:;" class="weui_grid">
        <h3 style="text-align: center;">{{ownerCtrl.storeIncome.orderCountToday}}笔</h3>
        <p class="weui_grid_label">今日订单/笔</p>
      </a>
      <a href="javascript:;" class="weui_grid">
        <h3 style="text-align: center;">{{ownerCtrl.storeIncome.orderAmountToday}}元</h3>
        <p class="weui_grid_label">订单总额</p>
      </a>
      <a href="javascript:;" class="weui_grid">
        <h3 style="text-align: center;">{{ownerCtrl.storeIncome.netIncomeToday}}元</h3>
        <p class="weui_grid_label">今日收益</p>
      </a>
    </div>
  </div>
  <div class="bd">
    <div class="weui_grids">
      <a href="javascript:;" class="weui_grid">
        <h3 style="text-align: center;">{{ownerCtrl.storeIncome.orderCountThisWeek}}笔</h3>
        <p class="weui_grid_label">本周订单/笔</p>
      </a>
      <a href="javascript:;" class="weui_grid">
        <h3 style="text-align: center;">{{ownerCtrl.storeIncome.orderAmountThisWeek}}元</h3>
        <p class="weui_grid_label">订单总额</p>
      </a>
      <a href="javascript:;" class="weui_grid">
        <h3 style="text-align: center;">{{ownerCtrl.storeIncome.netIncomeThisWeek}}元</h3>
        <p class="weui_grid_label">本周收益</p>
      </a>
    </div>
  </div>
  <div class="bd">
    <div class="weui_grids">
      <a href="javascript:;" class="weui_grid">
        <h3 style="text-align: center;">{{ownerCtrl.storeIncome.orderCountThisMonth}}笔</h3>
        <p class="weui_grid_label">本月订单/笔</p>
      </a>
      <a href="javascript:;" class="weui_grid">
        <h3 style="text-align: center;">{{ownerCtrl.storeIncome.orderAmountThisMonth}}元</h3>
        <p class="weui_grid_label">订单总额</p>
      </a>
      <a href="javascript:;" class="weui_grid">
        <h3 style="text-align: center;">{{ownerCtrl.storeIncome.netIncomeThisMonth}}元</h3>
        <p class="weui_grid_label">本月收益</p>
      </a>
    </div>
  </div>
  <div class="weui_dialog_confirm" id="dialog1" style="display: block;" v-show="showWithdrawDlg">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd">
        <strong class="weui_dialog_title">请输入提现金额</strong>
      </div>
      <div class="weui_dialog_bd">
        <input class="weui_input" placeholder="最小为1元" name="uName" type="number" v-model="withdrawRequest.amount" required="" />
      </div>
      <div class="weui_dialog_ft">
        <a href="javascript:;" @click="this.showWithdrawDlg=false" class="weui_btn_dialog default">取消</a> <a href="javascript:;" @click="withdraw" class="weui_btn_dialog primary">确定</a>
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
