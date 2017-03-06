<template>
  <swiper :list="imageList" auto style="width:98%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
  <group>
    <div class="item" v-for="item in products" @click="gotoBuy(item.id)">
      <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
      <div>
        <h4 class="weui_media_title">{{item.name}}</h4>
        <p>类别<span class="right">{{item.supplier.name}}</span></p>
        <p>￥{{item.price}}元<span style="padding-left:20px;">{{item.catalog.experienceMoneyRate}}%体验金</span><span class="right">已销售100件</span></p>
      </div>
    </div>
  </group>
</template>
<script type="text/javascript">
import {
  Swiper,
  Group,
  Cell,
  Panel,
  SwiperItem,
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
    PopupPicker
  },
  vuex: {
    actions: {
      putStore
    }
  },
  ready: function() {
    this.loadProducts()
    this.showCatalogs()
    console.log(this.catalogs)
    this.loadUser()
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
    showCatalogs() {
      if (this.catalogs == null) {
        var self = this
        this.$http.get(constants.serviceUrl + '/catalogs').then(function(res) {
          self.catalogs = [res.data.data.map(function(o) {
            return {
              name: o.name,
              value: o.name
            }
          })]
          console.log(self.catalogs)
        }, function(res) {
          console.log(res)
        })
      }
    },
    loadProducts: function() {
      var self = this
      this.$http.get(constants.serviceUrl + '/products').then(function(res) {
        console.log(res)
        self.products = res.data.data
        console.log(self.products)
      }, function(res) {
        console.log(res)
      })
    },
    loadStore: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/stores/current').then(function(res) {
        self.store = res.data.data
        self.putStore(self.store)
        self.bannerList = [self.store.banner1, self.store.banner2, self.store.banner3]
        self.imageList = self.bannerList.map((one, index) => ({
          img: one,
          url: 'javascript:'
        }))
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
    },
    loadUser: function() {
      const self = this
      this.$http.get(constants.serviceUrl + '/users/current').then(function(res) {
        self.user = res.data.data
        if (self.user.type === 'SUPPLIER') {
          self.loadSupplier()
        } else {
          self.loadStore()
        }
      }, function(res) {
        console.log(res)
      })
    },
    gotoBuy: function(id) {
      console.log(id)
      this.$router.go({
        path: 'orderform',
        query: {
          id: id
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
