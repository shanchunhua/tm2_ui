module.exports = {
  // serviceUrl: 'http://www.tengmei360.com/rest'
  serviceUrl: 'http://localhost:8080/rest',
  putObject: function (key, obj) {
    this[key] = obj
  },
  getObject: function (key) {
    return this[key]
  }
}
