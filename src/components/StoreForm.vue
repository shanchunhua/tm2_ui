<template>
  <div>
  <x-header>我是店铺老板</x-header>
    <group>
      <x-input title="店铺名称" :value.sync="store.name" placeholder="请输入店铺名称"></x-input>
    </group>
    <group>
      <address title="厂家地址" :value.sync="regionArray" raw-value :list="addressData"></address>
       <x-input   :value.sync="store.address" placeholder="请输入详细地址"></x-input>
    </group>
     <group>
      <x-input title="联系人" :value.sync="store.contact" placeholder="请输入联系人姓名" is-type="china-name"></x-input>
    </group>
     <group>
      <x-input title="手机" :value.sync="store.cellphone" placeholder="请输入联系人电话" keyboard="number" is-type="china-mobile" :required="false"></x-input>
    </group>

     <x-button type="primary" @click="changeData">保存</x-button>
  </div>
</template>

<script>
import { Group, Address, AddressChinaData, XButton, Cell, XInput } from 'vux/src/components'
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
  data () {
    return {
      value: [],
      addressData: AddressChinaData,
      regionArray: [],
      store: {
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
      console.log(this.store)
      this.store.region = this.regionArray.join(',')
      var self = this
      this.$http.post(constants.serviceUrl + '/stores', this.store).then(function (res) {
        self.putStore(this.store)
        self.$router.go('storecreated')
      }, function (res) {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>