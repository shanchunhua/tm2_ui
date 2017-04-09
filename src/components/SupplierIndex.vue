<template>
  <swiper :list="demo03_list" auto style="width:98%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
  <div class="intro">
    <div class="avatar">
      <img src="http://wx.qlogo.cn/mmopen/lzRBkYgd0zCwQlNJMIHOEpUFuDp8pk3ZyWTWic27EQZapVibYExhXaqDbP0g0wM8cDOzIMiapyOicJUYqHYazFF5pE2XWhFIpypb/0" />
    </div>
    <div style="padding-top:30px;margin-left:10px;float:right;">
      <p>{{summary.supplier.name}}</p>
      <p>{{summary.supplier.address}}</p>
    </div>
  </div>
  <tab :line-width=2 active-color='#fc378c' :index.sync="index" class="menuCt">
    <tab-item class="vux-center  menu">
      <div>
        <p><span class="number">{{summary.orderCount}}</span>笔</p>我的订单</div>
    </tab-item>
    <tab-item class="vux-center menu">
      <div>
        <p><span class="number">{{summary.storeCount}}</span>家</p>我的店铺</div>
    </tab-item>
    <tab-item class="vux-center menu">
      <div>
        <p><span class="number">{{summary.supplier.wallet.total}}</span><span>元</span></p>我的业绩</div>
    </tab-item>
  </tab>
  <swiper :index.sync="index" :show-dots="false" height="1px">
    <swiper-item>
    </swiper-item>
    <swiper-item>
    </swiper-item>
  </swiper>
  </div>
  <div style="overflow:auto;font-size:14px;margin:0px 5px;background-color:#fff" id="ct" v-show="index==0">
    <div v-for="order of orders">
      <p style="padding-top:10px;">2016-12-12 05:12</p>
      <div class="order-item">
        <p>订单编号：{{order.orderNo}}<span class="right">{{order.logisticsStatus=='UNFULFILLED'?'待':'已'}}发货</span></p>
        <p><span>产品名称</span><span class="right">{{order.product.name}}</span></p>
        <p><span>实付金额</span><span class="right">（{{order.quantity}}*{{order.price}}）{{order.quantity*order.price}}元</span></p>
        <p><span>产品体验金</span><span class="right">{{order.quantity*order.price*order.experienceMoneyRate/100}}元</span></p>
        <p><span>店铺名称</span><span class="right">{{order.store.name}}</span></p>
        <p><span>店铺地址</span><span class="right">{{order.store.address}}</span></p>
        <flexbox>
          <flexbox-item>
            <a href="tel:{{order.store.cellphone}}">
              <button class="weui_btn weui_btn_primary" style="font-size:14px;"> 电话 </button>
            </a>
          </flexbox-item>
          <flexbox-item v-if="order.logisticsStatus==='UNFULFILLED'">
            <button class="weui_btn weui_btn_primary" style="font-size:14px;" @click="fulfillOrder(order.id)"> 确认发货 </button>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
  <div style="overflow:auto;font-size:14px;margin:0px 5px;background-color:#fff" id="ct" v-show="index==1">
    <div v-for="sum of sumbystores">
      <div class="order-item">
        <p>{{sum.store.name}}<span class="right"><a href="tel:{{sum.store.cellphone}}">电话</a></span></p>
        <p><span>累计订单{{sum.orderCount}}笔，累计金额{{sum.totalAmount}}</span></p>
        <p><span>累计发放体验金{{sum.totalExperienceMoney}}元，当前剩余体验金{{sum.totalExperienceMoney}}</span></p>
        <p>张三<span class="right">三分钟前</span></p>
      </div>
    </div>
  </div>
  <div style="overflow:auto;font-size:14px;margin:0px 5px;background-color:#fff" id="ct" v-show="index==2">
    <div>
      <div style="height:100px;margin-top:30px;">
        <div style="float:left;height:100px">
          <p>当前剩余金额</p>
          <p><span style="font-size:22px;">{{summary.supplier.wallet.left}}</span>元</p>
        </div>
        <div style="float:right;padding-top:10px;">
          <x-button mini type="primary" style="width:90px;">提现</x-button>
          <p>已提现{{summary.supplier.wallet.withdrawed}}元</p>
        </div>
      </div>
      <p style="margin-bottom:10px;">提现记录</p>
      <p style="border-bottom:1px dotted #000;height:25px; " v-for="req of withdrawrequests"><span>提现{{req.amount}}元</span><span class="right">{{req.createdTime|moment}}</span></p>
    </div>
  </div>
</template>
<script type="text/javascript">
import {
  Swiper,
  Group,
  Cell,
  Panel,
  Tab,
  TabItem,
  SwiperItem,
  Flexbox,
  FlexboxItem,
  XButton
} from 'vux/src/components'
import constants from '../constants'
import moment from 'moment'
import {
  putStore
} from '../vuex/actions'
const imgList = [
  'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]

const demoList = imgList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))
export default {
  components: {
    Swiper,
    Group,
    Cell,
    Panel,
    Tab,
    TabItem,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    XButton
  },
  vuex: {
    actions: {
      putStore
    }
  },
  ready: function() {
    var height = document.documentElement.clientHeight
    console.log(height)
    document.getElementById('ct').style.height = (height - 260) + 'px'
    this.loadSummary()
    this.loadOrders()
  },

  data() {
    return {
      demo03_list: demoList,
      index: 0,
      orders: null,
      sumbystores: null,
      withdrawrequests: null,
      summary: {
        supplier: {
          name: null
        }
      }
    }
  },
  methods: {
    loadOrders: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/orders/current').then(function(res) {
        self.orders = res.data.data
      }, function(res) {
        console.log(res)
      })
    },
    fulfillOrder: function(id) {
      const self = this
      this.$http.get(constants.serviceUrl + '/orders/' + id + '/fulfill').then(function(res) {
        if (res.data.success) {
          self.loadOrders()
        }
      }, function(res) {
        console.log(res)
      })
    },
    loadSummaryByStore: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/orders/sumbystore').then(function(res) {
        self.sumbystores = res.data.data
      }, function(res) {
        console.log(res)
      })
    },
    loadWithdrawRequests: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/withdrawrequests').then(function(res) {
        self.withdrawrequests = res.data.data.content
      }, function(res) {
        console.log(res)
      })
    },
    loadSummary: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/suppliers/summary').then(function(res) {
        self.summary = res.data.data
      }, function(res) {
        console.log(res)
      })
    },
    loadSupplier: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/suppliers/current').then(function(res) {
        self.supplier = res.data.data
        self.bannerList = [self.suppier.banner1, self.suppier.banner2, self.suppier.banner3]
        self.imageList = self.bannerList.map((one, index) => ({
          img: one,
          url: 'javascript:'
        }))
      }, function(res) {
        console.log(res)
      })
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  watch: {
    'index': {
      handler: function(val, oldVal) {
        if (val === 0) {
          this.loadOrders()
        } else if (val === 1) {
          this.loadSummaryByStore()
        } else if (val === 2) {
          this.loadWithdrawRequests()
        }
      }
    }
  }
}
</script>
<style>
.menuCt {
  height: 60px;
  margin-top: 10px;
}

.number {
  font-size: 20px;
  font-weight: 2;
}

.menu * {
  line-height: 25px;
  color: #000;
}

.right {
  float: right;
}

.order-item {
  padding: 10px 5px;
  font-size: 14px;
  border: 1px solid #E5E5E5;
  border-radius: 2px;
}

.intro {
  position: absolute;
  left: 50px;
  top: 30px;
  width: 100%;
}

.intro img {
  width: 100px;
  border-radius: 50px;
  float: left;
}

.order-item span {
  color: gray;
}

.Absolute-Center {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
