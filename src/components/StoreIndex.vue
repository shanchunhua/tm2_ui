<template>
  <swiper :list="demo03_list" auto style="width:98%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
  <div class="intro">
    <div class="avatar">
      <img src="http://wx.qlogo.cn/mmopen/lzRBkYgd0zCwQlNJMIHOEpUFuDp8pk3ZyWTWic27EQZapVibYExhXaqDbP0g0wM8cDOzIMiapyOicJUYqHYazFF5pE2XWhFIpypb/0" />
    </div>
    <div style="padding-top:30px;margin-left:10px;float:left;">
      <p>{{summary.store.name}}</p>
      <p>{{summary.store.address}}</p>
    </div>
  </div>
  <tab :line-width=2 active-color='#fc378c' :index.sync="index" class="menuCt">
    <tab-item class="vux-center  menu">
      <div>
        <p><span class="number">{{summary.orderCount}}</span>笔</p>我的订单</div>
    </tab-item>
    <tab-item class="vux-center menu">
      <div>
        <p><span class="number">{{summary.supplierCount}}</span>家</p>我的发品商</div>
    </tab-item>
    <tab-item class="vux-center menu">
      <div>
        <p><span class="number">{{summary.totalAmount}}</span><span>元</span></p>我的金额</div>
    </tab-item>
  </tab>
  <div style="overflow:auto;font-size:14px;margin:0px 5px;background-color:#fff" id="ct" v-show="index==0">
    <div v-for="order of orders">
      <p style="padding-top:10px;">2016-12-12 05:12</p>
      <div class="order-item">
        <p>订单编号：{{order.orderNo}}<span class="right">{{order.logisticsStatus=='UNFULFILLED'?'待':'已'}}发货</span></p>
        <p><span>产品名称</span><span class="right">{{order.product.name}}</span></p>
        <p><span>实付金额</span><span class="right">（{{order.quantity}}*{{order.price}}）{{order.quantity*order.price}}元</span></p>
        <p><span>产品体验金</span><span class="right">{{order.quantity*order.price*order.experienceMoneyRate/100}}元</span></p>
        <p><span>发品商</span><span class="right">{{order.product.supplier.name}}</span></p>
        <a href="tel:{{order.product.supplier.tel}}">
          <button class="weui_btn weui_btn_primary" style="font-size:14px;"> 电话 </button>
        </a>
      </div>
    </div>
  </div>
  <div style="overflow:auto;font-size:14px;margin:0px 5px;background-color:#fff" id="ct" v-show="index==1">
    <div v-for="supplier of suppliers">
      <div class="order-item">
        <p>{{supplier.name}}<span class="right"><a href="tel:{{supplier.tel}}">电话</a></span></p>
        <p><span>{{supplier.address}}</span></p>
        <p>{{supplier.productCount}}<span>款产品</span><span class="right">{{supplier.contact}}</span></p>
      </div>
    </div>
  </div>
  <div style="overflow:auto;font-size:14px;margin:0px 5px;background-color:#fff" id="ct" v-show="index==2">
    <div v-for="sum of sumbysuppliers">
      <div class="order-item">
        <p>{{sum.supplier.name}}</p>
        <p><span>累计支付{{sum.totalAmount}}元</span><span class="right">累计支付订单{{sum.orderCount}}笔</span></p>
        <p><span>累计体验金{{sum.totalExperienceMoney}}元</span><span class="right">当前剩余体验金{{sum.totalExperienceMoney}}元</span></p>
      </div>
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
  SwiperItem
} from 'vux/src/components'
import constants from '../constants'
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
    SwiperItem
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
      suppliers: null,
      sumbysuppliers: null,
      summary: {
        store: {
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
    loadSuppliers: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/stores/suppliers').then(function(res) {
        self.suppliers = res.data.data
        console.log(self.suppliers)
      }, function(res) {
        console.log(res)
      })
    },
    loadSummary: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/stores/summary').then(function(res) {
        self.summary = res.data.data
        self.putStore(res.data.data.store)
      }, function(res) {
        console.log(res)
      })
    },
    loadSummaryBySupplier: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/orders/sumbysupplier').then(function(res) {
        self.sumbysuppliers = res.data.data
      }, function(res) {
        console.log(res)
      })
    }
  },
  watch: {
    'index': {
      handler: function(val, oldVal) {
        if (val === 0) {
          this.loadOrders()
        } else if (val === 1) {
          this.loadSuppliers()
        } else if (val === 2) {
          this.loadSummaryBySupplier()
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
</style>
