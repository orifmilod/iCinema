'use strict'

var http = require('http')
var server = http.createServer(handle)

var pino = require('pino')({
  extreme: true
})

function handle (req, res) {
  pino.info(req)
  res.end('hello world')
}

server.listen(3000)
