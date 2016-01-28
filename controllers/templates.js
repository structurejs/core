import {chalk, logger} from '../lib/logger'
import Controller      from './base'
import TemplateService from '../services/template'

class TemplateController extends Controller {

  constructor() {
    super()
  }

  create(req, res, next) {
    var _this = this

    var templateService = new TemplateService()

    templateService.create(req.body, function(err, template) {

      if(err) {
        logger.error('Could not create template', err)
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(template, res)

    })

  }

  get(req, res, next) {
    var _this = this

    var templateService = new TemplateService()

    templateService.getByShortId(req.params.sid, function(err, template) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(template, res)

    })

  }

  update(req, res, next) {
    var _this = this

    var templateService = new TemplateService()

    templateService.updateByShortId(req.params.sid, req.body, function(err, template) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(template, res)

    })
  }

}

TemplateController.prototype.resource = {
  model: 'template',
  name:  'template',
  slug:  'templates'
}

module.exports = TemplateController
