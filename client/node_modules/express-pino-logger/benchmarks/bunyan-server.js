'use strict'

var app = require('express')()
var http = require('http')
var server = http.createServer(app)

app.use(require('express-bunyan-logger')())

app.get('/', function (req, res) {
  res.send('hello world')
})

server.listen(3000)
