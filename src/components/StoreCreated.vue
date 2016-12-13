<template>
  <div>
  <x-header>我是发品商</x-header>
      <div class="vux-demo">
    <img class="logo" src="../assets/vux_logo.png">
    <h1>xxxx</h1>
  </div>
    <group>
      <cell title="发品商名称" :value="suppiler.name"></cell>
    </group>
    <group>
      <cell title="厂家地址" :value="suppiler.region"></cell>
       <cell  :value="suppiler.address" ></cell>
    </group>
     <group>
      <cell title="前台电话"  :value="suppiler.tel" ></cell>
    </group
     <group>
      <cell title="联系人" :value="suppiler.contact"></cell>
    </group
     <group>
      <cell title="手机" :value="suppiler.cellphone"></cell>
    </group>
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
        name: 'abc',
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
      this.$http.post('/', this.suppiler).then(function (res) {
        console.log(res)
      }, function (res) {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>