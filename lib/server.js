import bodyParser  from 'body-parser'
import {chalk, logger} from './logger'
import express     from 'express'
import path        from 'path'
import serveStatic from 'serve-static'

function removePoweredBy(req, res, next) {
  res.removeHeader('X-Powered-By')
  next()
}

class StructureServer {

  constructor() {

    this.server = express()

    this.server.use(serveStatic(path.join(__dirname, '../public')))
    this.server.use(bodyParser.urlencoded({extended: true}))
    this.server.use(bodyParser.json({strict: false}))
    this.server.use(removePoweredBy)
    this.server.use(this.logRequestInfo)

    this.loadRoutes()

  }

  loadRoutes() {
    require('./routes')(this.server)
  }

  logRequestInfo(req, res, next) {

    logger.info(req.method, req.originalUrl)
    next()

  }

  start() {

    this.server = this.server.listen(process.env.EXPRESS_PORT)

  }

  stop() {

    this.server.close()

  }

  use() {

    this.server.use.apply(this.server, arguments)

  }

}

module.exports = StructureServer
