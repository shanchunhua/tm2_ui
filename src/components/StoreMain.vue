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
      <div v-link="{path:'/stafflist'}">
        <p><span class="number">{{summary.staffCount}}</span>名</p>本店员工</div>
    </tab-item>
    <tab-item class="vux-center menu">
      <div v-link="{path:'/hairstyle'}">
        <p><span class="number">{{summary.globalHairStyleCount}}</span>款</p>时尚发型</div>
    </tab-item>
    <tab-item class="vux-center menu">
      <div v-link="{path:'/storehairstyle'}">
        <p><span class="number">{{summary.storeHairStyleCount}}</span><span>款</span></p>本店发型</div>
    </tab-item>
    <tab-item class="vux-center menu">
      <div>
        <p><span class="number">{{summary.chainCount}}</span><span>家</span></p>连锁分店</div>
    </tab-item>
  </tab>
  <group>
    <div>今日特价</div>
    <div class="item" v-for="item in products" @click="gotoBuy(item.id)">
      <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
      <div>
        <h4 class="weui_media_title">{{item.name}}</h4>
        <p>￥{{item.price}}元<span style="padding-left:20px;">{{item.catalog.experienceMoneyRate}}%体验金</span><span class="right">已销售100件</span></p>
      </div>
    </div>
  </group>
  <group>
    <div>本店精选</div>
    <tab :line-width=2 active-color='#fc378c' :index.sync="menu">
      <tab-item class="vux-center  menu">
        <div>服务项目</div>
      </tab-item>
      <tab-item class="vux-center menu">
        <div>店内产品</div>
      </tab-item>
      <tab-item class="vux-center menu">
        <div>会员卡</div>
      </tab-item>
    </tab>
    <div v-show="menu===0">
      <div class="item" v-for="item in servicecatalogs"  v-link="{ path: '/servicelist', query: { id: item.id }}">
        <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
        <div>
          <h4 class="weui_media_title">{{item.name}}</h4>
          <p>￥{{item.price}}元<span style="padding-left:20px;">{{item.catalog.experienceMoneyRate}}%体验金</span><span class="right">已销售100件</span></p>
        </div>
      </div>
    </div>
    <div v-show="menu===1">
      <div class="item" v-for="item in servicecatalogs" @click="gotoBuy(item.id)">
        <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
        <div>
          <h4 class="weui_media_title">{{item.name}}</h4>
          <p>类别<span class="right">{{item.supplier.name}}</span></p>
          <p>￥{{item.price}}元<span style="padding-left:20px;">{{item.catalog.experienceMoneyRate}}%体验金</span><span class="right">已销售100件</span></p>
        </div>
      </div>
    </div>
    <div v-show="menu===2">
      <div class="item" v-link="{path:'/discountcardlist'}">
        <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
        <div>
          <h4 class="weui_media_title">分类折扣卡</h4>
        </div>
      </div>
      <div class="item"  v-link="{path:'/timescardlist'}">
        <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
        <div>
          <h4 class="weui_media_title">次卡</h4>
        </div>
      </div>
    </div>
  </group>
  <div>
    <tabbar>
      <tabbar-item selected v-link="{path:'storemain'}">
        <img slot="icon" src="../assets/vux_logo.png">
        <span slot="label">服务指南</span>
      </tabbar-item>
      <tabbar-item v-link="{path:'valueselection'}">
        <img slot="icon" src="../assets/vux_logo.png">
        <span slot="label">超值精选</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/vux_logo.png">
        <span slot="label">我的业绩</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/vux_logo.png">
        <span slot="label">二维码</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import {
  Group,
  Swiper,
  Tab,
  TabItem,
  Tabbar,
  TabbarItem
} from 'vux/src/components'
import constants from '../constants'
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
    Group,
    Swiper,
    Tab,
    TabItem,
    Tabbar,
    TabbarItem
  },
  ready: function() {
    this.loadProducts()
    this.loadServiceCatalog()
    this.loadStoreMain()
  },
  data() {
    return {
      demo03_list: demoList,
      index: 0,
      menu: 0,
      orders: null,
      servicecatalogs: null,
      products: null,
      summary: {}
    }
  },
  methods: {
    loadProducts: function() {
      var self = this
      this.$http.get(constants.serviceUrl + '/storeproducts').then(function(res) {
        console.log(res)
        self.products = res.data.data
        console.log(self.products)
      }, function(res) {
        console.log(res)
      })
    },
    loadServiceCatalog() {
      var self = this
      this.$http.get(constants.serviceUrl + '/servicecatalogs').then(function(res) {
        console.log(res)
        self.servicecatalogs = res.data.data
      }, function(res) {
        console.log(res)
      })
    },
    loadStoreMain() {
      var self = this
      this.$http.get(constants.serviceUrl + '/stores/main').then(function(res) {
        console.log(res)
        self.summary = res.data.data
      }, function(res) {
        console.log(res)
      })
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
