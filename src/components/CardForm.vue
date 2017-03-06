<template>
  <div>
    <x-header>服务项目</x-header>
    <group>
      <x-input title="名称" :value.sync="card.name" placeholder="请输入服务项目名称"></x-input>
      <x-input title="所属类型" :value.sync="type" placeholder="请选择卡片类型"></x-input>
      <x-input title="服务项目" :value.sync="service.catalog.id" placeholder="请选择服务项目" v-show="type>1"></x-input>
      <x-input title="次数" :value.sync="service.catalog.id" placeholder="请输入次数" v-show="type==3"></x-input>
      <x-input title="价格（元）" :value.sync="service.levelOnePrice" placeholder="请输入价格"></x-input>
    </group>
    <x-button type="primary" @click="saveService">保存</x-button>
    <x-button type="primary" @click="deleteService">删除</x-button>
  </div>
</template>
<script>
import {
  Group,
  Address,
  AddressChinaData,
  XButton,
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
    Address,
    XButton,
    Cell,
    XInput,
    XHeader
  },
  vuex: {
    actions: {
      putStore
    }
  },
  data() {
    return {
      type: 1,
      value: [],
      addressData: AddressChinaData,
      regionArray: [],
      service: {
        name: null,
        catalog: {
          id: null
        }
      }
    }
  },
  methods: {
    saveService() {
      console.log(this.service)
      var self = this
      this.$http.post(constants.serviceUrl + '/stores', this.store).then(function(res) {
        self.$router.go('storecreated')
      }, function(res) {
        console.log(res)
      })
    },
    deleteService: function() {

    }
  }
}
</script>
<style>
</style>
