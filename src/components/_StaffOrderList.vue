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
  <div class="weui_cells_title" v-for="order in list">{{order.createdDate|date:'yyyy-MM-dd'}}
    <div class="weui_cells" ng-repeat-end>
      <div class="weui_cell">
        <div class="weui_cell_bd" style="flex: 1;">
          <p>
            <span style="display: inline-block;">订单编号： {{order.orderNo}}</span><span style="display: inline-block; float: right;" class="gray">{{order.paymentStatus|paymentStatus}}</span>
          </p>
          <p class="gray">
            <span style="display: inline-block;">{{order.productName}}({{order.price}}元*{{order.quantity}})</span><span style="display: inline-block; float: right;">{{order.total}}{{show}}元</span>
          </p>
          <p class="gray">
            <span style="display: inline-block;">{{order.customerName}}({{order.cellphone}})</span>
          </p>
          <input class="weui_btn weui_btn_primary js_grid" type="submit" @click="show=true" value="编辑暗档"></input>
        </div>
      </div>
    </div>
  </div>
  <popup :show.sync="show">
    <div class="popup0">
    <group><span @click="show=false">返回</span>完善资料<span>确认</span></group>
      <group>
        <datetime :value.sync="orderprofile.interviewDate" format="YYYY-MM-DD" title="回访时间"></datetime>
        <x-textarea :max="200" placeholder="消费备注" :value.sync="orderprofile.comments"></x-textarea>
        用户标签
        <checker :value.sync="orderprofile.selectedTags" type="checkbox" default-item-class="tag-item" selected-item-class="tag-item-selected">
          <checker-item :value="1">好说话</checker-item>
          <checker-item :value="2">好说话</checker-item>
          <checker-item :value="3">好说话</checker-item>
          <checker-item :value="4">好说话</checker-item>
          <checker-item :value="5">好说话</checker-item>
          <checker-item :value="6">好说话</checker-item>
          <checker-item :value="7">好说话</checker-item>
          <checker-item :value="8">好说话</checker-item>
          <checker-item :value="9">好说话</checker-item>
        </checker>
      </group>
    </div>
  </popup>
</template>
<script>
import {
  Popup,
  Checker,
  CheckerItem,
  XButton,
  Datetime,
  XTextarea,
  XInput
} from 'vux/src/components'
import constants from '../constants'
export default {
  components: {
    Popup,
    Checker,
    CheckerItem,
    XButton,
    Datetime,
    XTextarea,
    XInput
  },
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
      this.$http.get(constants.serviceUrl + '/storeorders/myserved').then(function(res) {
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
      show: false,
      orderprofile: {
        interviewDate: null,
        selectedTags: []
      },
      withdrawRequest: {
        amount: 1
      },
      showWithdrawDlg: false
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  color: #42b983;
}

.tag-item {
  border: 1px solid black;
  padding: 0px 10px;
  cursor: pointer;
  margin: 5px 0px;
  line-height: 40px;
  height: 40px;
}

.tag-item-selected {
  background-color: rgba(102, 153, 255, 1);
  border: 1px solid black;
}
</style>
