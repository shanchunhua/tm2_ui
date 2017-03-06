<template>
  <div id='ct'>
    <div class="hello">
      <flexbox>
        <flexbox-item>
          <div class="flex-demo">
            <select style="width:100%;height:30px;" @change="query()" v-model="example.length">
              <option value="LONG">长发</option>
              <option value="MEDIUM">中发</option>
              <option value="SHORT">短发</option>
            </select>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <select style="width:100%;height:30px;" v-model="example.gender">
              <option value='MALE'>男士</option>
              <option value='FEMALE'>女士</option>
            </select>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <select style="width:100%;height:30px;" v-model="example.style">
              <option value="STRAIGHT">直发</option>
              <option value="CURVE">卷发</option>
            </select>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <div>
      <div class="flex-demo" style="width:47%;float:left;margin:5px 5px;" v-for="(item, index) in list">
        <img src="http://n.sinaimg.cn/sports/transform/20170207/rLPf-fyafcyx7396355.jpg" style="width:100%;" />
      </div>
      <infinite-loading :on-infinite="next" ref="infiniteLoading"></infinite-loading>
    </div>
  </div>
</template>
<script>
import {
  Group,
  Flexbox,
  FlexboxItem,
  XButton,
  Cell,
  Scroller,
  Divider,
  Spinner,
  XInput
} from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
import constants from '../constants'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  components: {
    Group,
    Flexbox,
    FlexboxItem,
    XButton,
    Cell,
    Scroller,
    Divider,
    Spinner,
    XInput,
    XHeader,
    InfiniteLoading
  },
  ready: function() {
    this.query()
  },
  data() {
    return {
      list: [],
      page: 1,
      example: {
        length: 'LONG',
        gender: 'MALE',
        style: 'STRAIGHT'
      }
    }
  },
  methods: {
    onInfinite() {
      setTimeout(() => {
        const temp = []
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i)
        }
        this.list = this.list.concat(temp)
        this.$broadcast('$InfiniteLoading:loaded')
      }, 1000)
    },
    next() {
      this.page = this.page + 1
      this.request()
    },
    query() {
      this.page = 1
      this.list = []
      this.request()
    },
    request() {
      console.log(this.example)
      var self = this
      this.$http.post(constants.serviceUrl + '/hairstyles?page=' + this.page, this.example).then(function(res) {
        console.log(res)
        self.list = self.list.concat(res.data.data.content)
        if (self.page > 1) {
          self.$nextTick(function() {
            self.$broadcast('$InfiniteLoading:loaded')
          })
        }
      }, function(res) {
        console.log(res)
      })
    },
    deleteService: function() {

    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
