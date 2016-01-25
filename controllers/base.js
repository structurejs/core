import {chalk, logger} from '../lib/logger'
import PackageService  from '../services/package'

class BaseController {

  constructor() {
    var Model = null
    if(this.resource.model) Model = require(`../models/${this.resource.name}`)
    if(Model) this.Model = Model.default
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

  respondWithError(err, res, options = {}) {

    var packageService = new PackageService()
    let pkg = packageService.error(err, options)

    res.status(pkg.status || 400).send(pkg).end()
  }

  respondWithPkg(o, res, options = {}) {

    var packageService = new PackageService()
    let pkg = packageService.success(o, options)

    res.status(pkg.status || 200).send(pkg)
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
  model: true,
  name: 'base',
  slug: 'base'
}

module.exports = BaseController
