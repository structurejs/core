import {chalk, logger} from '../lib/logger'

class BaseController {

  constructor() {
    this.Model = require(`../models/${this.resource.name}`).default
  }

  create(req, res, next) {

    var _this = this

    var model = new this.Model(req.body)
    model.create(function baseControllerCreateCallback(err, resp) {


      if(err) {
        logger.error('err', err)
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(resp, res)

    })

  }

  delete(req, res, next) {

  }

  getDispatcher(req, res, next) {

    if(req.params.id) {
      this.get.apply(this, arguments)
    }

  }

  getAll(req, res, next) {

  }

  getMany(req, res, next) {

  }

  get(req, res, next) {
    var _this = this

    let id = req.params.id

    var model = new this.Model()
    model.get(id, function baseControllerGetCallback(err, resp) {


      if(err) {
        logger.error('err', err)
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(resp, res)

    })

  }

  pkg(o) {

    return {
      pkg: o,
      status: 200
    }

  }

  respondWithError(err, res, options = {}) {
    res.send(404).end()
  }

  respondWithPkg(o, res, options = {}) {
    let pkg = this.pkg(o)

    logger.debug('resp', pkg)
    res.send(pkg)

  }

  update(req, res, next) {
    var _this = this

    let id = req.params.id

    var model = new this.Model(req.body)
    model.update(id, function baseControllerUpdateCallback(err, resp) {


      if(err) {
        logger.error('err', err)
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(resp, res)

    })

  }

}

BaseController.prototype.resource = {
  name: 'base',
  slug: 'base'
}

module.exports = BaseController
