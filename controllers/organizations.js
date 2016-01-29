import {chalk, logger} from '../lib/logger'
import Controller      from './base'
import OrganizationService from '../services/organization'

class OrganizationController extends Controller {

  constructor() {
    super()
  }

  create(req, res, next) {
    var _this = this

    var organizationService = new OrganizationService()

    organizationService.create(req.body, function(err, organization) {

      if(err) {
        logger.error('Could not create organization', err)
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(organization, res)

    })

  }

  get(req, res, next) {
    var _this = this

    var organizationService = new OrganizationService()

    organizationService.getByShortId(req.params.sid, function(err, organization) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(organization, res)

    })

  }

  getDispatcher(req, res, next) {

    return this.get.apply(this, arguments)

  }

  update(req, res, next) {
    var _this = this

    var organizationService = new OrganizationService()

    organizationService.updateByShortId(req.params.sid, req.body, function(err, organization) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(organization, res)

    })
  }

}

OrganizationController.prototype.resource = {
  model: 'organization',
  name:  'organization',
  slug:  'organizations'
}

module.exports = OrganizationController
