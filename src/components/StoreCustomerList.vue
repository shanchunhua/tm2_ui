<template>
  <x-header>本店散客</x-header>
  <div class="weui_cells" infinite-scroll="ownerCtrl.loadMoreRelation()">
    <div class="weui_cell" v-for="o in list">
      <div style="width: 50px; height: 50px; margin-right: 10px;">
        <img alt="" src="{{o.headimgurl}}" style="width: 50px; height: 50px;">
      </div>
      <div class="weui_cell_bd" style="flex: 1;">
        <p>
          <span style="display: inline-block;"> {{o.nickname}}</span><span style="display: inline-block; float: right;" class="gray"><span am-time-ago="o.createdDate"></span>电话</span>
        </p>
        <p class="gray">
          <span style="display: inline-block;">最近交易时间{{o.wallet.modifiedTime}}元</span>
        </p>
        <p class="gray">
          <span style="display: inline-block;">共交易{{o.wallet.orderTotal}}元，剩余体验金{{o.wallet.experienceMoney}}元</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  XHeader
} from 'vux/src/components'
import constants from '../constants'
export default {
  components: {
    XHeader
  },
  ready: function() {
    this.load()
  },
  methods: {
    load() {
      const self = this
      this.$http.get(constants.serviceUrl + '/stores/users/CUSTOMER').then(function(res) {
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
