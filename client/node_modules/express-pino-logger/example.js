'use strict'

var app = require('express')()
var pino = require('./')()

app.use(pino)

app.get('/', function (req, res) {
  req.log.info('something else')
  res.send('hello world')
})

app.get('/error', function (req, res, next) {
  next(new Error('kaboom'))
})

app.use(function (err, req, res, next) {
  req.log.error(err)
  res.statusCode = 500
  res.end('error')
})

app.listen(3000)
