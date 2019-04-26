'use strict'

var app = require('express')()
var http = require('http')
var winston = require('winston')
var winstonExpress = require('express-winston')
var server = http.createServer(app)

app.use(winstonExpress.logger({
  transports: [
    new winston.transports.Console({
      json: true
    })
  ]
}))

app.get('/', function (req, res) {
  res.send('hello world')
})

server.listen(3000)
