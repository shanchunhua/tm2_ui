<template>
  <swiper :list="demo03_list" auto style="width:98%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
    <tab :line-width=2 active-color='#fc378c' :index.sync="index" class="menuCt">
      <tab-item class="vux-center  menu"> <div><p><span  class="number">122</span>笔</p>我的订单</div></tab-item>
      <tab-item class="vux-center menu"> <div><p><span class="number">123</span>家</p>我的发品商</div></tab-item>
      <tab-item class="vux-center menu"> <div><p><span class="number">12345</span><span>元</span></p>我的金额</div></tab-item>
    </tab>
    <swiper :index.sync="index" :show-dots="false">
      <swiper-item >
        <div class="tab-swiper">
        <div>
        <p>2016-12-12 05:12</p>
        <div class="order-item">
        <p>类别<span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        </div>
        </div>
           <div>
        <p>2016-12-12 05:12</p>
        <div class="order-item">
        <p>类别<span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        </div>
        </div>
        <br style="clear:both;" />
   </div>
      </swiper-item>
            <swiper-item >
        <div class="tab-swiper">
        <p>发品商名称<span class="right">电话</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
   </div>
      </swiper-item>
            <swiper-item >
        <div class="tab-swiper">
        <p>类别<span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
                <p>类别<span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
                <p>类别<span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
        <p>￥12<span>发品商名称</span><span class="right">发品商名称</span></p>
   </div>
      </swiper-item>
    </swiper>

</template>
<script type="text/javascript">
import {
  Swiper,
  Group,
  Cell,
  Panel,
  Tab,
  TabItem,
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
    Tab,
    TabItem,
    SwiperItem
  },
  data () {
    return {
      demo03_list: demoList,
      index: 0
    }
  }
}
</script>
<style>
.menuCt{
  height:60px;
  margin-top: 10px;
}
.number{
  font-size: 20px;
  font-weight: 2;
}
.menu *{
 line-height: 25px;
 color:#000;
}
.right{
   float:right; 
}
.order-item{
  padding: 10px 5px;
  border: 1px solid #E5E5E5;
}
</style>
