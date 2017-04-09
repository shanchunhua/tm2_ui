module.exports = {
  // serviceUrl: 'http://www.tengmei360.com/rest'
  serviceUrl: 'http://fps.baizhuanmao.com/rest',
  entryUrl: 'http://fps.baizhuanmao.com',
  paymentAppID: 'wx39a317d588670285',
  putObject: function (key, obj) {
    this[key] = obj
  },
  getObject: function (key) {
    return this[key]
  }
}
