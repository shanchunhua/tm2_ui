<template>
  <div>
    <x-header>编辑次卡</x-header>
    <group>
      <x-input title="名称" :value.sync="card.name" placeholder="请输入次卡名称"></x-input>
      <selector title="服务项目" placeholder="请选择服务项目" :options.sync="serviceList" :value.sync="card.service.id"></selector>
      <x-input title="次数" :value.sync="card.times" placeholder="请输入次数"></x-input>
      <x-input title="价格" :value.sync="card.price" placeholder="请输入价格"></x-input>
      <x-input title="有效期" :value.sync="card.period" placeholder="请输入有效期"></x-input>
    </group>
    <x-button type="primary" @click="save">保存</x-button>
    <x-button type="primary" @click="del" v-show="service.id!=null">删除</x-button>
  </div>
</template>
<script>
import {
  Group,
  Flexbox,
  FlexboxItem,
  XButton,
  Selector,
  Cell,
  XInput
} from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
import constants from '../constants'
import {
  putStore
} from '../vuex/actions'
export default {
  components: {
    Group,
    Flexbox,
    FlexboxItem,
    XButton,
    Selector,
    Cell,
    XInput,
    XHeader
  },
  vuex: {
    actions: {
      putStore
    }
  },
  ready: function() {
    this.loadServices()
    if (this.$route.query.id) {
      this.load()
    }
  },
  data() {
    return {
      value: [],
      serviceList: [],
      card: {
        id: null,
        name: null,
        price: null,
        times: null,
        period: null,
        service: {
          id: null
        }
      }
    }
  },
  methods: {
    loadServices() {
      var self = this
      this.$http.get(constants.serviceUrl + '/services').then(function(res) {
        console.log(res)
        self.serviceList = res.data.data.map(item => {
          return {
            key: item.id + '',
            value: item.name
          }
        })
        console.log(self.serviceList)
      }, function(res) {
        console.log(res)
      })
    },
    load() {
      var self = this
      this.$http.get(constants.serviceUrl + '/services/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.service = res.data.data
        self.service.catalog.id = self.service.catalog.id + ''
        self.service.levelTwoPrice = self.service.levelTwoPrice + ''
        self.service.commissionRate3 = 10
      }, function(res) {
        console.log(res)
      })
    },
    save() {
      console.log(this.service)
      var self = this
      this.$http.post(constants.serviceUrl + '/card/timescard', this.card).then(function(res) {
        self.$router.go('storemain')
      }, function(res) {
        console.log(res)
      })
    },
    del: function() {
      var self = this
      this.$http.delete(constants.serviceUrl + '/services/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.$router.go('servicelist')
      }, function(res) {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>
