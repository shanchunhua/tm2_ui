<template>
  <x-header>我的会员</x-header>
  <div class="bd">
    <div class="weui_grids">
      <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==1?'selected':''" @click="showOrderList">
        <h3 style="text-align: center;">{{store.memberCount}}人</h3>
        <p class="weui_grid_label">会员数量</p>
      </a>
      <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==2?'selected':''" @click="showRelation">
        <h3 style="text-align: center;">{{store.memberCardTotal}}人</h3>
        <p class="weui_grid_label">充值总额</p>
      </a>
      <a href="javascript:;" class="weui_grid js_grid" ng-class="menu==3?'selected':''" @click="showWithdraw">
        <h3 style="text-align: center;">{{store.memberCardLeft}}元</h3>
        <p class="weui_grid_label">剩余总额</p>
      </a>
    </div>
  </div>
  <div v-for="o in list" infinite-scroll="ownerCtrl.loadMoreRelation()">
    <div class="weui_cells">
      <div class="weui_cell">
        <div style="width: 50px; height: 50px; margin-right: 10px;">
          <img alt="" src="{{o.headimgurl}}" style="width: 50px; height: 50px;">
        </div>
        <div class="weui_cell_bd" style="flex: 1;">
          <p>
            <span style="display: inline-block;"> {{o.nickname}}</span><span style="display: inline-block; float: right;" class="gray"><span am-time-ago="o.createdDate"></span>办卡</span>
          </p>
          <p class="gray">
            <span style="display: inline-block;">共充值{{o.wallet.orderTotal}}元，剩余{{o.wallet.experienceMoney}}元</span>
          </p>
        </div>
      </div>
      <cell title="查看消费记录" is-link  v-link="{path:'/storememberlist'}"></cell>
    </div>
  </div>
</template>
<script>
import {
  XHeader,
  Cell
} from 'vux/src/components'
import constants from '../constants'
export default {
  components: {
    XHeader,
    Cell
  },
  ready: function() {
    this.load()
  },
  methods: {
    load() {
      const self = this
      this.$http.get(constants.serviceUrl + '/stores/users/MEMBER').then(function(res) {
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
