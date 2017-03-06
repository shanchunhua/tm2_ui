
<template>
  <div>
    <x-header back="false">选择身份</x-header>
   <div class="user-type">
     <img src="../assets/供应商.png" v-link="{path:'/supplierform'}"/>
     <p>我是发品商</p>
   </div>
   <div class="user-type">
         <img src="../assets/供应商.png" v-link="{path:'/storeform'}"/>
          <p>我是店家</p>
   </div>

  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider } from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    XHeader
  }
}
</script>
<style lang="less">
.user-type{
  text-align: center;
  color: #fff;
  height:50vh;
  width:100%;
  border-radius: 4px;
  background-clip: padding-box;
 

}
.user-type img{
  margin:0 auto;
  display:inline-block;
  width:150px;
  margin-top:15%;

}
.user-type p{
  width:100%;
  color:black;
}
</style>