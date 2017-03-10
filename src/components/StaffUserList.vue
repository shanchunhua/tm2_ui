<template>
  <x-header>我的顾客</x-header>
  <user-list></user-list>
</template>
<script>
import UserList from './_UserList'
import {
  XHeader
} from 'vux/src/components'
export default {
  components: {
    XHeader,
    UserList
  },
  ready: function() {

  },
  methods: {},
  data() {
    return {}
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
