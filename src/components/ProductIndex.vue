<template>
  <swiper :list="demo03_list" auto style="width:98%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
  <group>
   <cell title="品质精选，物超所值">
   	 <img  width="20px"  src="../assets//logo.png">
   </cell>
</group>
<group>
 <panel header="图文组合列表"  :list="list" :type="type"></panel>
 </group>
 <group>
 <div class="item">
 <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff"/>
 <div>
   <h4 class="weui_media_title">产品名称</h4>
   <p>类别<span class="right">发品商名称</span></p>
   <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
 </div>
 </div>
  <div class="item">
 <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff"/>
 <div>
   <h4 class="weui_media_title">产品名称</h4>
   <p>类别<span class="right">发品商名称</span></p>
   <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
 </div>
 </div>
 </group>

</template>
<script type="text/javascript">
import {
  Swiper,
  Group,
  Cell,
  Panel,
  SwiperItem
} from 'vux/src/components'

const imgList = [
  'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]

const demoList = imgList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))
export default {
  components: {
    Swiper,
    Group,
    Cell,
    Panel,
    SwiperItem
  },
  data () {
    return {
      demo03_list: demoList,
      type: '1',
      list: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/component/cell'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        }
      }]
    }
  }
}
</script>
<style>
.item{
  display: flex;
  padding: 10px 5px;
  border-top: 1px solid #E5E5E5;
}
.item img{
   width: 60px;
   height:60px;
}
.item div{
  margin-left: 10px;	
  flex:1;
}
.right{
   float:right; 
}
.item p{
  font-size:13px;
    color: #999999;
}
.item h4{
  font-weight: 400;
  font-size: 17px;
}
</style>
