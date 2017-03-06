<template>
  <div class="weui_cells">
    <div class="weui_cell">
      <div class="weui_cell_bd" style="flex: 1;">
        <p>
          <span style="display: inline-block;"> 当前剩余佣金 </span>
        </p>
        <p>
          <h1 style="display: inline-block;">{{app.curUser.commission.leftAmount}}</h1>元
        </p>
      </div>
      <div class="weui_cell_bd" style="flex: 1;">
        <p style="float:right;">
          <a href="javascript:;" class="weui_btn weui_btn_primary" @click="showDialog()">提现</a>
        </p>
      </div>
    </div>
  </div>
  <div class="weui_cells_title">提现记录</div>
  <div class="weui_cells" v-for="record in list">
    <div class="weui_cell">
      <div class="weui_cell_bd" style="flex: 1;">
        <p>
          <span style="display: inline-block;"> 提现{{record.amount}}元</span><span style="display: inline-block; float: right;" class="gray">{{record.createdTime|date:'yyyy-MM-dd hh:mm:ss'}}</span>
        </p>
      </div>
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
