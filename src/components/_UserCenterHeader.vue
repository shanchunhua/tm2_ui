<template>
    <div class="hd">
      <div class="page_title">
        <img alt="" class="avatar" src="{{user.headimgurl}}">
      </div>
      <p class="page_desc">{{user.nickname}}</p>
    </div>
</template>
<script>
import constants from '../constants'
export default {
  ready: function() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      const self = this
      this.$http.get(constants.serviceUrl + '/users/current').then(function(res) {
        self.user = res.data.data
      }, function(res) {
        console.log(res)
      })
    }
  },
  data() {
    return {
      user: null
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/weui.css';
@import '../assets/css/class3.css';
</style>
