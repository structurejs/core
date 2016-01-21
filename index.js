var path = require('path')
require('dotenv').config({path: path.join(__dirname, '.env')})

require('babel-core/register')
require('babel-polyfill')

var Server = require('./lib/server')

var server = new Server()

server.start()
