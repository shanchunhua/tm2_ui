<template>
  <div>
    <x-header>我是发品商</x-header>
    <group>
      <x-input title="发品商名称" :value.sync="suppiler.name" placeholder="请输入发品商名称" </x-input>
    </group>
    <group>
      <address title="厂家地址" :value.sync="regionArray" raw-value :list="addressData"></address>
      <x-input :value.sync="suppiler.address" placeholder="请输入详细地址"></x-input>
    </group>
    <group>
      <x-input title="前台电话" :value.sync="suppiler.tel" placeholder="请输入前台电话"></x-input>
    </group>
    <group>
    <x-input title="联系人" :value.sync="suppiler.contact" placeholder="请输入联系人姓名" is-type="china-name"></x-input>
    </group>
     <group>
    <x-input title="手机" :value.sync="suppiler.cellphone" placeholder="请输入联系人电话" keyboard="number" is-type="china-mobile" :required="false"></x-input>
    </group>
     <group>    
    <x-button type="primary" @click="changeData">保存</x-button>
    </group>    
  </div>
</template>
<script>
import {
  Group,
  Address,
  AddressChinaData,
  XButton,
  Cell,
  XInput,
  Loading
} from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
import constants from '../constants'
import {
  putSupplier
} from '../vuex/actions'
export default {
  components: {
    Group,
    Address,
    XButton,
    Cell,
    XInput,
    XHeader,
    Loading
  },
  vuex: {
    actions: {
      putSupplier
    }
  },
  data () {
    return {
      addressData: AddressChinaData,
      regionArray: [],
      suppiler: {
        name: null,
        region: null,
        address: null,
        tel: null,
        contact: null,
        cellphone: null
      }
    }
  },
  methods: {
    changeData () {
      console.log(this.suppiler)
    //  console.log(this.$router.go('suppliercreated'))
      this.suppiler.region = this.regionArray.join(',')
      var self = this
      this.$http.post(constants.serviceUrl + '/suppliers', this.suppiler).then(function (res) {
        self.putSupplier(this.suppiler)
        self.$router.go('suppliercreated')
      }, function (res) {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>
