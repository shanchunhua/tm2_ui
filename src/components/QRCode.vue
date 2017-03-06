<template>
  <div class="vertical-container">
    <div>
      <img :src="url" />
    </div>
  </div>
</template>
<script>
import constants from '../constants'
export default {

  ready: function() {
    const self = this
    this.$http.get(constants.serviceUrl + '/qrcode').then(function(res) {
      self.url = res.data.data
    }, function(res) {
      console.log(res)
    })
  },
  data() {
    return {
      url: null
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}

.vertical-container {
  height: 100%;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}
</style>
