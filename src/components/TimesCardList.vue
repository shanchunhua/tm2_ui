<template>
  <group>
    <div class="item" v-for="item in cards" @click="gotoBuy(item)">
      <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
      <div>
        <h4 class="weui_media_title">{{item.name}}</h4>
        <p>有效期<span class="right">{{item.name}}</span></p>
        <p>￥{{item.price}}元<span style="padding-left:20px;"></span><span class="right"></span></p>
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
    this.loadCards()
  },
  data() {
    return {
      type: '1',
      catalog: [],
      catalogs: null,
      cards: [{
        showDetail: false,
        items: [{
          catalog: {
            name: null
          }
        }]
      }]
    }
  },
  methods: {
    toggleDetail(item) {
      item.name = 'xxx'
      console.log(item.show)
      console.log(item)
    },
    loadCards: function() {
      var self = this
      this.$http.get(constants.serviceUrl + '/card/timescard').then(function(res) {
        console.log(res)
        self.cards = res.data.data
        console.log(self.cards)
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
    gotoBuy: function(item) {
      constants.putObject('timescard', item)
      this.$router.go({
        path: 'serviceorderform',
        query: {
          id: item.id,
          ptype: 3
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
