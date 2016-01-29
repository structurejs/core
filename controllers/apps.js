import {chalk, logger} from '../lib/logger'
import Controller      from './base'
import AppService from '../services/app'

class AppController extends Controller {

  constructor() {
    super()
  }

  create(req, res, next) {
    var _this = this

    var appService = new AppService()

    appService.create(req.body, function(err, app) {

      if(err) {
        logger.error('Could not create app', err)
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(app, res)

    })

  }

  get(req, res, next) {
    var _this = this

    var appService = new AppService()

    appService.getByShortId(req.params.sid, function(err, app) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(app, res)

    })

  }

  getDispatcher(req, res, next) {

    return this.get.apply(this, arguments)

  }

  update(req, res, next) {
    var _this = this

    var appService = new AppService()

    appService.updateByShortId(req.params.sid, req.body, function(err, app) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(app, res)

    })
  }

}

AppController.prototype.resource = {
  model: 'app',
  name:  'app',
  slug:  'apps'
}

module.exports = AppController
