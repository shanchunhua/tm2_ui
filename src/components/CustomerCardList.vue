<template>
  <group>
    <div class="item" v-for="item in timescards">
      <div>
        <h4 class="weui_media_title">{{item.timesCard.name}}</h4>
        <p>有效期<span class="right">{{item.name}}</span></p>
        <p>￥{{item.price}}元<span style="padding-left:20px;"></span><span class="right"></span></p>
        <p>￥{{item.price}}元<span style="padding-left:20px;"></span><span class="right"></span></p>
      </div>
      <div>
        <button @click="viewUsageRecord(item,'TIMES_CARD')">划卡记录</button>
        <button>微信充值</button>
      </div>
    </div>
    <div class="item" v-for="item in discountcards">
      <div>
        <h4 class="weui_media_title">{{item.card.name}}</h4>
        <p>有效期<span class="right">{{item.name}}</span></p>
        <p>￥{{item.price}}元<span style="padding-left:20px;"></span><span class="right"></span></p>
        <p>￥{{item.price}}元<span style="padding-left:20px;"></span><span class="right"></span></p>
      </div>
      <div>
        <button @click="viewUsageRecord(item,'CATALOG_DISCOUNT_CARD')">划卡记录</button>
        <button>微信充值</button>
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
    viewUsageRecord(item, type) {
      this.$router.go({
        path: 'cardusagerecord',
        query: {
          id: item.id,
          ctype: type
        }
      })
    },
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
