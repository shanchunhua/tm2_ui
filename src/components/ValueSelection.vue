<template>
  <swiper :list="imageList" auto style="width:98%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
  <group>
    <div class="item" v-for="item in products" @click="gotoBuy(item)">
      <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
      <div>
        <h4 class="weui_media_title">{{item.name}}</h4>
        <p>类别<span class="right">{{item.supplier.name}}</span></p>
        <p>￥{{item.price}}元<span style="padding-left:20px;">{{item.catalog.experienceMoneyRate}}%体验金</span><span class="right">已销售100件</span></p>
      </div>
    </div>
  </group>
  <div>
    <tabbar>
      <tabbar-item v-link="{path:'storemain'}">
        <img slot="icon" src="../assets/vux_logo.png">
        <span slot="label">服务指南</span>
      </tabbar-item>
      <tabbar-item selected v-link="{path:'valueselection'}">
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
<script type="text/javascript">
import {
  Swiper,
  Group,
  Cell,
  Panel,
  SwiperItem,
  Tab,
  TabItem,
  Tabbar,
  TabbarItem,
  PopupPicker
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

const imageList = imgList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))
export default {
  components: {
    Swiper,
    Group,
    Cell,
    Panel,
    SwiperItem,
    Tab,
    TabItem,
    Tabbar,
    TabbarItem,
    PopupPicker
  },
  vuex: {
    actions: {
      putStore
    }
  },
  ready: function() {
    this.loadProducts()
  },
  data() {
    return {
      type: '1',
      imageList: imageList,
      catalog: [],
      catalogs: null,
      products: null
    }
  },
  methods: {
    loadProducts: function() {
      var self = this
      this.$http.get(constants.serviceUrl + '/platformproducts').then(function(res) {
        console.log(res)
        self.products = res.data.data.content
        console.log(self.products)
      }, function(res) {
        console.log(res)
      })
    },
    gotoBuy: function(item) {
      constants.putObject('platformproduct', item)
      this.$router.go({
        path: 'serviceorderform',
        query: {
          id: item.id,
          ptype: 4
        }
      })
    }
  },
  watch: {
    'catalog': function(val) {
      console.log('catalog changed')
      console.log(val)
    }
  }
}
</script>
<style>
.item {
  display: flex;
  padding: 10px 5px;
  border-top: 1px solid #E5E5E5;
}

.item img {
  width: 60px;
  height: 60px;
}

.item div {
  margin-left: 10px;
  flex: 1;
}

.right {
  float: right;
}

.item p {
  font-size: 13px;
  color: #999999;
}

.item h4 {
  font-weight: 400;
  font-size: 17px;
}
</style>
