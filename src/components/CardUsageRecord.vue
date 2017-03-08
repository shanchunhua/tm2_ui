<template>
  <group>
    <div class="item" v-for="item in list" @click="gotoBuy(item)">
      <div>
        <h4 class="weui_media_title">{{item.timesCard.name}}</h4>
        <p>有效期<span class="right">{{item.name}}</span></p>
        <p>￥{{item.price}}元<span style="padding-left:20px;"></span><span class="right"></span></p>
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
    this.load()
  },
  data() {
    return {
      list: null,
      discountcards: null
    }
  },
  methods: {
    load: function() {
      var self = this
      this.$http.get(constants.serviceUrl + '/customer/cardrecord/' + this.$route.query.ctype + '/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.list = res.data.data
        console.log(self.list)
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
