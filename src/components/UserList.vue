<template>
  <div class="weui_cells" infinite-scroll="ownerCtrl.loadMoreRelation()">
    <div class="weui_cell" v-for="o in list">
      <div style="width: 50px; height: 50px; margin-right: 10px;">
        <img alt="" ng-src="{{o.user.headimgurl}}" style="width: 50px; height: 50px;">
      </div>
      <div class="weui_cell_bd" style="flex: 1;">
        <p>
          <span style="display: inline-block;"> {{o.user.nickname}}</span><span style="display: inline-block; float: right;" class="gray"><span am-time-ago="o.user.createdDate"></span>关注</span>
        </p>
        <p class="gray">
          <span style="display: inline-block;">共交易{{o.totalAmount}}元</span>
          <span style="display: inline-block; float: right;" class="gray"><span am-time-ago="o.latestOrderDate"></span>交易</span>
        </p>
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
      this.$http.get(constants.serviceUrl + '/users/relations').then(function(res) {
        self.list = res.data.data.content
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
