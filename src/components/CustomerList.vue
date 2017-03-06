<template>
  <div>
    <x-header>我的顾客</x-header>
    <tab :line-width=2 active-color='#fc378c' :index.sync="index" >
      <tab-item class="vux-center  menu">
        <div>顾客列表</div>
      </tab-item>
      <tab-item class="vux-center menu">
        <div>回访提醒</div>
      </tab-item>
    </tab>
  </div>
</template>
<script>
import {
  Group,
  Tab,
  TabItem,
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
    Tab,
    TabItem,
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
  data() {
    return {
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
    changeData() {
      console.log(this.suppiler)
        //  console.log(this.$router.go('suppliercreated'))
      this.suppiler.region = this.regionArray.join(',')
      var self = this
      this.$http.post(constants.serviceUrl + '/suppliers', this.suppiler).then(function(res) {
        self.putSupplier(this.suppiler)
        self.$router.go('suppliercreated')
      }, function(res) {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>
