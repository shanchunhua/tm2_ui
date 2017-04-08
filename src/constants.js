module.exports = {
  // serviceUrl: 'http://www.tengmei360.com/rest'
  serviceUrl: 'http://fps.baizhuanmao.com/rest',
  putObject: function (key, obj) {
    this[key] = obj
  },
  getObject: function (key) {
    return this[key]
  }
}
