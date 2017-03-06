<template>
  <div>
    <x-header>编辑分类折扣卡</x-header>
    <group>
      <x-input title="名称" :value.sync="card.name" placeholder="请输入名称"></x-input>
      <div class="weui_cells weui_cells_checkbox">
        <div class="weui_cell weui_check_label" v-for="catalog in catalogList">
          <label>
            <div class="weui_cell_hd">
              <input type="checkbox" class="weui_check" name="checkbox1" v-model="catalog.checked">
              <i class="weui_icon_checked"></i>
            </div>
          </label>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{catalog.name}}<span class="right"><input type="number" v-model="catalog.discount"/>%</span></p>
          </div>
        </div>
      </div>
      <x-input title="价格" :value.sync="card.price" placeholder="请输入价格"></x-input>
      <x-input title="有效期" :value.sync="card.period" placeholder="请输入有效期"></x-input>
    </group>
    <x-button type="primary" @click="save">保存</x-button>
    <x-button type="primary" @click="deleteService" v-show="service.id!=null">删除</x-button>
  </div>
</template>
<script>
import {
  Group,
  Flexbox,
  FlexboxItem,
  XButton,
  Selector,
  Cell,
  XInput
} from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
import constants from '../constants'
import {
  putStore
} from '../vuex/actions'
export default {
  components: {
    Group,
    Flexbox,
    FlexboxItem,
    XButton,
    Selector,
    Cell,
    XInput,
    XHeader
  },
  vuex: {
    actions: {
      putStore
    }
  },
  ready: function() {
    this.loadServiceCatalog()
    if (this.$route.query.id) {
      this.load()
    }
  },
  data() {
    return {
      value: [],
      catalogList: [],
      card: {
        id: null,
        name: null,
        price: 0,
        items: []
      }
    }
  },
  methods: {
    loadServiceCatalog() {
      var self = this
      this.$http.get(constants.serviceUrl + '/servicecatalogs').then(function(res) {
        console.log(res)
        self.catalogList = res.data.data
        console.log(self.catalogList)
      }, function(res) {
        console.log(res)
      })
    },
    load() {
      var self = this
      this.$http.get(constants.serviceUrl + '/services/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.service = res.data.data
        self.service.catalog.id = self.service.catalog.id + ''
        self.service.levelTwoPrice = self.service.levelTwoPrice + ''
        self.service.commissionRate3 = 10
      }, function(res) {
        console.log(res)
      })
    },
    save() {
      console.log(this.catalogList)
      var self = this
      this.catalogList.forEach(function(catalog) {
        if (catalog.checked) {
          self.card.items.push({
            catalog: catalog,
            discount: catalog.discount
          })
        }
      })
      this.$http.post(constants.serviceUrl + '/card/discountcard', this.card).then(function(res) {
        self.$router.go('storemain')
      }, function(res) {
        console.log(res)
      })
    },
    deleteService: function() {
      var self = this
      this.$http.delete(constants.serviceUrl + '/services/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.$router.go('servicelist')
      }, function(res) {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>
