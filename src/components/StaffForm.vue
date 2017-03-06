<template>
  <div>
    <x-header>编辑员工</x-header>
    <group>
      <x-input title="发型师ID" :value.sync="staff.no" placeholder="请输入发型师ID"></x-input>
      <x-input title="头像" :value.sync="staff.image" placeholder="请选择员工头像" type="file"></x-input>
      <x-input title="姓名" :value.sync="staff.name" placeholder="请输入员工姓名"></x-input>
      <selector title="性别" placeholder="请选择性别" :options="genderList" :value.sync="staff.gender"></selector>
      <datetime :value.sync="staff.birthday" format="YYYY-MM-DD" title="生日" :min-year="1940" :max-year="2016"></datetime>
      <selector title="级别" placeholder="请选择发型师级别" :options="levelList" :value.sync="staff.level"></selector>
    </group>
    <x-textarea :max="200" placeholder="请输入发型师个性签名，不少于5个字" :value.sync="staff.description"></x-textarea>
    <x-button type="primary" @click="save">保存</x-button>
    <x-button type="primary" @click="del" v-show="staff.id!=null">删除</x-button>
  </div>
</template>
<script>
/* global FormData*/
import {
  Group,
  Selector,
  Checker,
  CheckerItem,
  XButton,
  Datetime,
  XTextarea,
  XInput
} from 'vux/src/components'
import XHeader from 'vux/src/components/x-header'
import constants from '../constants'
import $ from 'jquery'
import {
  putStore
} from '../vuex/actions'
export default {
  components: {
    Group,
    Selector,
    Checker,
    CheckerItem,
    XButton,
    Datetime,
    XInput,
    XTextarea,
    XHeader
  },
  vuex: {
    actions: {
      putStore
    }
  },
  ready() {
    if (this.$route.query.id) {
      this.load()
    }
  },
  data() {
    return {
      staffs: [],
      genderList: [{
        key: 'MALE',
        value: '男'
      }, {
        key: 'FEMALE',
        value: '女'
      }],
      levelList: [{
        key: '3',
        value: '三星发型师'
      }, {
        key: '4',
        value: '四星发型师'
      }, {
        key: '5',
        value: '五星发型师'
      }],
      staff: {
        id: null,
        name: null,
        gender: null,
        image: null,
        birthday: null,
        level: '3',
        description: ''
      }
    }
  },
  methods: {
    load() {
      var self = this
      this.$http.get(constants.serviceUrl + '/staffs/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.staff = res.data.data
        const date = new Date(self.staff.birthday)
        const month = date.getMonth() + 1
        self.staff.birthday = date.getFullYear() + '-' + (month > 9 ? '' : '0') + (date.getMonth() + 1) + '-' + date.getDate()
        self.staff.level = self.staff.level + ''
      }, function(res) {
        console.log(res)
      })
    },
    del() {
      var self = this
      this.$http.delete(constants.serviceUrl + '/staffs/' + this.$route.query.id).then(function(res) {
        console.log(res)
        self.$router.go('stafflist')
      }, function(res) {
        console.log(res)
      })
    },
    save() {
      var file = $('input[type="file"]').get(0).files[0]
      var formData = new FormData()
      if (file) {
        formData.append('file', file)
      }
      for (var p in this.staff) {
        if (this.staff[p]) {
          formData.append(p, this.staff[p])
        }
      }
      console.log(this.staff)
      console.log(formData)
      var self = this
      this.$http.post(constants.serviceUrl + '/staffs', formData).then(function(res) {
        console.log(res)
        self.staff = res.data.data
        self.$router.go('stafflist')
      }, function(res) {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>
