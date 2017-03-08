<template>
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
    this.loadProducts()
  },
  data() {
    return {
      type: '1',
      catalog: [],
      catalogs: null,
      products: null
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
    gotoBuy: function(item) {
      constants.putObject('storeproduct', item)
      this.$router.go({
        path: 'serviceorderform',
        query: {
          id: item.id,
          ptype: 2
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
