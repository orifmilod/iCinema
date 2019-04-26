'use strict'

var app = require('express')()
var http = require('http')
var server = http.createServer(app)

app.use(require('../')())

app.get('/', function (req, res) {
  res.send('hello world')
})

server.listen(3000)
