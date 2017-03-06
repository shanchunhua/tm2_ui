<template>
  <div>
    <x-header>编辑产品</x-header>
    <group>
      <x-input title="图片" :value.sync="storeProduct.image" placeholder="请选择产品图片" type="file"></x-input>
      <x-input title="名称" :value.sync="storeProduct.name" placeholder="请输入产品名称"></x-input>
      <x-input title="销售价格（元）" :value.sync="storeProduct.price" placeholder="请输入价格"></x-input>
      <x-input title="分销佣金（%）" :value.sync="storeProduct.commissionRate" placeholder="请输入分销佣金"></x-input>
    </group>
    <group>
      <x-button type="primary" @click="save">保存</x-button>
      <x-button type="primary" @click="del" v-show="storeProduct.id!=null">删除</x-button>
    </group>
  </div>
</template>
<script>
/* global FormData*/
import {
  Group,
  Selector,
  Checker,
  CheckerItem,
  XButton,
  Datetime,
  XTextarea,
  XInput
} from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
import constants from '../constants'
import $ from 'jquery'
import {
  putStore
} from '../vuex/actions'
export default {
  components: {
    Group,
    Selector,
    Checker,
    CheckerItem,
    XButton,
    Datetime,
    XInput,
    XTextarea,
    XHeader
  },
  vuex: {
    actions: {
      putStore
    }
  },
  ready() {
    if (this.$route.query.id) {
      this.load()
    }
  },
  data() {
    return {
      storeProduct: {
        id: null,
        name: null,
        price: null,
        image: null,
        commissionRate: null
      }
    }
  },
  methods: {
    load() {
      var self = this
      this.$http.get(constants.serviceUrl + '/storeproducts/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.storeProduct = res.data.data
        const date = new Date(self.staff.birthday)
        const month = date.getMonth() + 1
        self.staff.birthday = date.getFullYear() + '-' + (month > 9 ? '' : '0') + (date.getMonth() + 1) + '-' + date.getDate()
        self.staff.level = self.staff.level + ''
      }, function(res) {
        console.log(res)
      })
    },
    del() {
      var self = this
      this.$http.delete(constants.serviceUrl + '/storeproducts/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.$router.go('stafflist')
      }, function(res) {
        console.log(res)
      })
    },
    save() {
      var file = $('input[type="file"]').get(0).files[0]
      var formData = new FormData()
      if (file) {
        formData.append('file', file)
      }
      for (var p in this.storeProduct) {
        if (this.storeProduct[p] != null) {
          formData.append(p, this.storeProduct[p])
        }
      }
      console.log(this.storeProduct)
      console.log(formData)
      var self = this
      this.$http.post(constants.serviceUrl + '/storeproducts', formData).then(function(res) {
        console.log(res)
        self.storeProduct = res.data.data
        self.$router.go('storemain')
      }, function(res) {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>
