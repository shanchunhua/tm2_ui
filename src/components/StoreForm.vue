<template>
  <div>
  <x-header>我是店铺老板</x-header>
    <group>
      <x-input title="店铺名称" :value.sync="suppiler.name" placeholder="请输入店铺名称"</x-input>
    </group>
    <group>
      <address title="厂家地址" :value.sync="suppiler.region" raw-value :list="addressData"></address>
       <x-input   :value.sync="suppiler.address" placeholder="请输入详细地址"></x-input>
    </group>
     <group>
      <x-input title="联系人" :value.sync="suppiler.contact" placeholder="请输入联系人姓名" is-type="china-name"></x-input>
    </group>
     <group>
      <x-input title="手机" :value.sync="suppiler.cellphone" placeholder="请输入联系人电话" keyboard="number" is-type="china-mobile" :required="false"></x-input>
    </group>

     <x-button type="primary" @click="changeData">保存</x-button>
  </div>
</template>

<script>
import { Group, Address, AddressChinaData, XButton, Cell, XInput } from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
export default {
  components: {
    Group,
    Address,
    XButton,
    Cell,
    XInput,
    XHeader
  },
  data () {
    return {
      title: '默认为空',
      value: [],
      title2: '手动设定',
      value2: ['广东省', '深圳市', '南山区'],
      value3: ['海南省', '儋州市', '--'],
      addressData: AddressChinaData,
      value4: [],
      value5: ['广东省', '深圳 市', '南山区'],
      suppiler: {
        name: null,
        region: [],
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
    }
  }
}
</script>
<style>
</style>