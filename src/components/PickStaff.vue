<template>
  <group>
    <div class="item" v-for="item in staffs" @click="selectStaff(item)">
      <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
      <div>
        <h4 class="weui_media_title">{{item.name}}<span>{{item.level}}</span></h4>
        <p>{{item.description}}</p>
      </div>
    </div>
  </group>
</template>
<script type="text/javascript">
import {
  XButton,
  Group,
  Cell,
  Panel,
  Checker,
  CheckerItem,
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
    XButton,
    Group,
    Cell,
    Checker,
    CheckerItem,
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
    this.loadStaffs()
    console.log(constants.getObject('service'))
  },
  data() {
    return {
      type: '1',
      imageList: imageList,
      workingTime: [],
      catalogs: null,
      staffs: null
    }
  },
  methods: {
    loadStaffs: function() {
      var self = this
      this.$http.get(constants.serviceUrl + '/staffs/pickstaff/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.staffs = res.data.data
      }, function(res) {
        console.log(res)
      })
    },
    selectStaff(item) {
      constants.putObject('staff', item)
      this.$router.go({
        path: 'serviceorderform',
        query: {
          id: item.id
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

.demo5-item {
  width: 14%;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}

.demo5-item-selected {
  background-color: #fff;
  border-color: #ff4a00;
}
</style>
