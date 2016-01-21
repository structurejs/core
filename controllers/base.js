import {chalk, logger} from '../lib/logger'

class BaseController {

  constructor() {
    this.Model = require(`../models/${this.resource.name}`).default
  }

  create(req, res, next) {

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
    logger.debug('Controller get id', id)
    var model = new this.Model()
    model.get(id, function baseControllerGetCallback(err, resp) {
      logger.error('err', err)
      logger.debug('resp', resp)
      if(err) return _this.respondWithError(err, res)

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

  }

  respondWithPkg(o, res, options = {}) {

    res.send(this.pkg(o))

  }

  update(req, res, next) {

  }

}

BaseController.prototype.resource = {
  name: 'base',
  slug: 'base'
}

module.exports = BaseController
