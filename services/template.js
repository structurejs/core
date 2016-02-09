import async             from 'async'
import {chalk, logger}   from '../lib/logger'
import OrganizationModel from '../models/organization'
import ShortIdService    from '../services/short-id'
import TemplateModel     from '../models/template'

class TemplateService {

  create(o = {}, cb) {
    var _this = this

    var pkg = Object.assign({}, o)

    // validation

    var shortidService    = new ShortIdService(),
        templateModel     = new TemplateModel()

    templateModel.create(pkg, function(err, res) {

      if(err) {
        logger.error(err)

        return cb({
          message: 'Could not create template',
          resource: 'TemplateService'
        })
      }

      var sid = shortidService.issue(res.id)

      _this.update(res.id, {sid}, function(err2, res2) {

        if(err) {
          logger.error(err)

          return cb({
            message: 'Could not create short id for template',
            resource: 'TemplateService'
          })
        }

        return cb(null, res2)

      })

    })

  }

  get() {
    var templateModel = new TemplateModel()

    templateModel.get.apply(templateModel, arguments)
  }

  getByShortId() {
    var templateModel = new TemplateModel()

    templateModel.getByShortId.apply(templateModel, arguments)
  }

  update() {
    var templateModel = new TemplateModel()

    templateModel.update.apply(templateModel, arguments)
  }

  updateByShortId() {
    var templateModel = new TemplateModel()

    templateModel.updateByShortId.apply(templateModel, arguments)
  }

}

export default TemplateService
