
<template>
  <div>
    <tabbar>
      <tabbar-item>
        <span slot="label">Wechat</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item selected>
        <img slot="icon" src="../assets//logo.png">
        <span slot="label">Explore</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux/src/components'
export default {
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>