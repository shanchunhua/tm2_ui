<template>
  <div>
    <x-header>服务项目</x-header>
    <group>
      <selector title="所属类型" placeholder="请选择服务类型" :options.sync="catalogList" :value.sync="service.cid"></selector>
      <x-input title="名称" :value.sync="service.name" placeholder="请输入服务项目名称"></x-input>
      <flexbox :gutter="0">
        <flexbox-item :span="7">
          <x-input title="三星发型师" :value.sync="service.level3Price" placeholder="请输入价格">元</x-input>
        </flexbox-item>
        <flexbox-item :span="5">
          <x-input title="分销佣金" :value.sync="service.level3Rate" keyboard="number">%</x-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
        <flexbox-item :span="7">
          <x-input title="四星发型师" :value.sync="service.level4Price" placeholder="请输入价格">元</x-input>
        </flexbox-item>
        <flexbox-item :span="5">
          <x-input title="分销佣金" :value.sync="service.level4Rate" keyboard="number">%</x-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
        <flexbox-item :span="7">
          <x-input title="五星发型师" :value.sync="service.level5Price" placeholder="请输入价格">元</x-input>
        </flexbox-item>
        <flexbox-item :span="5">
          <x-input title="分销佣金" :value.sync="service.level5Rate" keyboard="number">%</x-input>
        </flexbox-item>
      </flexbox>
    </group>
    <x-button type="primary" @click="saveService">保存</x-button>
    <x-button type="primary" @click="deleteService" v-show="service.id!=null">删除</x-button>
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
    this.loadServiceCatalog()
    if (this.$route.query.id) {
      this.load()
    }
  },
  data() {
    return {
      value: [],
      catalogList: [],
      service: {
        id: null,
        cid: null,
        name: null,
        level3Price: null,
        level3Rate: null,
        level4Price: null,
        level4Rate: null,
        level5Price: null,
        level5Rate: null
      }
    }
  },
  methods: {
    loadServiceCatalog() {
      var self = this
      this.$http.get(constants.serviceUrl + '/servicecatalogs').then(function(res) {
        console.log(res)
        self.catalogList = res.data.data.map(item => {
          return {
            key: item.id + '',
            value: item.name
          }
        })
        console.log(self.catalogList)
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
    saveService() {
      console.log(this.service)
      var self = this
      this.$http.post(constants.serviceUrl + '/services', this.service).then(function(res) {
        self.$router.go('storemain')
      }, function(res) {
        console.log(res)
      })
    },
    deleteService: function() {
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
