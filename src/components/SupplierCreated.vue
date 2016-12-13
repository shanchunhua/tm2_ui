<template>
  <div>
  <x-header>我是发品商</x-header>
    <div class="vux-demo">
    <img class="logo" src="../assets/vux_logo.png">
    <h1>xxxx</h1>
  </div>
    <group>
      <cell title="发品商名称" :value="supplier.name"></cell>
    </group>
    <group>
      <cell title="厂家地址" :value="regionName"></cell>
       <cell  :value="supplier.address" ></cell>
    </group>
     <group>
      <cell title="前台电话"  :value="supplier.tel" ></cell>
    </group>
     <group>
      <cell title="联系人" :value="supplier.contact"></cell>
    </group>
     <group>
      <cell title="手机" :value="supplier.cellphone"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Address, AddressChinaData, XButton, Cell, XInput } from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
import value2name from '../filters/value2name'
import {
  getSupplier
} from '../vuex/getters'
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
    getters: {
      supplier: getSupplier
    }
  },
  data () {
    return {
      addressData: AddressChinaData,
      regionName: value2name(this.supplier.region.split(','), AddressChinaData)
    }
  },
  methods: {
    changeData () {
    }
  }
}
</script>
<style>
</style>