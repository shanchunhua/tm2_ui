<template>
  <div id='ct'>
    <div style="overflow">
      <div class="flex-demo" style="width:47%;float:left;margin:5px 5px;" v-for="(item, index) in list" @click="$refs.previewer.show(index)">
        <img src="http://n.sinaimg.cn/sports/transform/20170207/rLPf-fyafcyx7396355.jpg" style="width:100%;" />
      </div>
      <infinite-loading :on-infinite="next" ref="infiniteLoading"></infinite-loading>
    </div>
    <previewer :list="list" v-ref:previewer :options="options"></previewer>
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
  Previewer,
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
    Previewer,
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
      this.$http.post(constants.serviceUrl + '/hairstyles?size=5&page=' + this.page, this.example).then(function(res) {
        console.log(res)
        var content = res.data.data.content
        content.map((item) => {
          item.src = item.image
          item.w = document.documentElement.clientWidth
          item.h = document.documentElement.clientHeight
        })
        self.list = self.list.concat(res.data.data.content)
        if (self.page > 1) {
          self.$broadcast('$InfiniteLoading:loaded')
          if (res.data.data.numberOfElements === 0) {
            self.$broadcast('$InfiniteLoading:complete')
          }
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
