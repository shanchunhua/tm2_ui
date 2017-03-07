<template>
  <group>
    <div class="item" v-for="item in timescards" @click="gotoBuy(item)">
      <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
      <div>
        <h4 class="weui_media_title">{{item.name}}</h4>
        <p>有效期<span class="right">{{item.name}}</span></p>
        <p>￥{{item.price}}元<span style="padding-left:20px;"></span><span class="right"></span></p>
      </div>
    </div>
    <div class="item" v-for="item in discountcards" @click="gotoBuy(item)">
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
      timescards: null,
      discountcards: null
    }
  },
  methods: {
    loadCards: function() {
      var self = this
      this.$http.get(constants.serviceUrl + '/customer/timescard').then(function(res) {
        console.log(res)
        self.timescards = res.data.data
        console.log(self.timescards)
      }, function(res) {
        console.log(res)
      })
      this.$http.get(constants.serviceUrl + '/customer/discountcard').then(function(res) {
        console.log(res)
        self.discountcards = res.data.data
        console.log(self.discountcards)
      }, function(res) {
        console.log(res)
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
