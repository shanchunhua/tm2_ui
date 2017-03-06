<template>
  <x-header>{{catalog.name}}</x-header>
  <div v-for="item in serviceList" @click="selectService(item)">
    <div class="weui_panel">
      <div class="weui_panel_hd">{{item.name}}<span class="right" v-link="{ path: '/serviceform', query: { id: item.id }}">编辑</span></div>
      <p>{{item.level|level}}级￥{{item.price}}元</p>
    </div>
  </div>
  </div>
  </group>
</template>
<script type="text/javascript">
import {
  Group,
  Cell,
  Panel,
  SwiperItem,
  PopupPicker
} from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
import constants from '../constants'
import {
  putStore
} from '../vuex/actions'

export default {
  components: {
    XHeader,
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
    if (this.$route.query.id) {
      this.loadServices()
    }
    console.log(this.catalogs)
    this.loadUser()
  },
  data() {
    return {
      serviceList: [],
      catalogs: null,
      products: null
    }
  },
  methods: {
    selectService(item) {
      constants.putObject('service', item)
      this.$router.go({
        path: 'pickstaff',
        query: {
          id: item.id
        }
      })
    },
    loadServices() {
      var self = this
      this.$http.get(constants.serviceUrl + '/services/catalog/' + this.$route.query.id).then(function(res) {
        self.serviceList = res.data.data
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
@import '../assets/css/weui.css';
</style>
