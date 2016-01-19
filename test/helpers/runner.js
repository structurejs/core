require('babel-core/register')
require('babel-polyfill')

var path = require('path')
require('dotenv').config({path: path.join(__dirname, '../../.env')})

global.expect = require('chai').expect
