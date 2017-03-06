<template>
  <div>
    <x-header>我是店铺老板</x-header>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h4>您已成功注册为店铺</h4>
    </div>
    <group>
      <cell title="店铺名称" :value="store.name"></cell>
    </group>
    <group>
      <cell title="店铺地址" :value="store.region"></cell>
      <cell :value="store.address"></cell>
    </group>
    <group>
      <cell title="联系人" :value="store.contact"></cell>
    </group <group>
    <cell title="联系电话" :value="store.cellphone"></cell>
    </group>
    <a v-link="{path:'/storeindex'}">
      <button class="weui_btn weui_btn_primary" style="font-size:14px;"> 进入店铺 </button>
    </a>
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
import value2name from '../filters/value2name'
import {
  getStore
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
      store: getStore
    }
  },
  data() {
    return {
      addressData: AddressChinaData,
      regionName: value2name(this.store.region.split(','), AddressChinaData)
    }
  },
  methods: {
    goToMain() {

    }
  }
}
</script>
<style>
</style>
