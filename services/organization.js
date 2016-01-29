import async           from 'async'
import {chalk, logger} from '../lib/logger'
import ShortIdService  from '../services/short-id'
import OrganizationModel   from '../models/organization'

class OrganizationService {

  create(o = {}, cb) {
    var _this = this

    var pkg = Object.assign({}, o)

    // validation

    var shortidService  = new ShortIdService(),
        organizationModel   = new OrganizationModel()

    organizationModel.create(pkg, function(err, res) {

      if(err) {
        logger.error(err)

        return cb({
          message: 'Could not create organization',
          resource: 'OrganizationService'
        })
      }

      var sid = shortidService.issue(res.id)

      _this.update(res.id, {sid}, function(err2, res2) {

        if(err) {
          logger.error(err)

          return cb({
            message: 'Could not create short id for organization',
            resource: 'OrganizationService'
          })
        }

        return cb(null, res2)

      })

    })

  }

  get() {
    var organizationModel = new OrganizationModel()

    organizationModel.get.apply(organizationModel, arguments)
  }

  getByShortId() {
    var organizationModel = new OrganizationModel()

    organizationModel.getByShortId.apply(organizationModel, arguments)
  }

  update() {
    var organizationModel = new OrganizationModel()

    organizationModel.update.apply(organizationModel, arguments)
  }

  updateByShortId() {
    var organizationModel = new OrganizationModel()

    organizationModel.updateByShortId.apply(organizationModel, arguments)
  }

}

export default OrganizationService
