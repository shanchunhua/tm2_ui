<template>
  <div id="app">
    <loading :show="showLoading" text="处理中..."></loading>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="text/javascript">
import {
  Loading
} from 'vux/src/components'
import store from './vuex/store'
export default {
  components: {
    'loading': Loading
  },
  data () {
    return {
      showLoading: false
    }
  },
  store,
  methods: {
    showLoading: function () {
      this.showLoading = true
    }
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset';

body {
  background-color: #fbf9fe;
}
</style>

