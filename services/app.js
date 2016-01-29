import AppModel        from '../models/app'
import async           from 'async'
import {chalk, logger} from '../lib/logger'
import ShortIdService  from '../services/short-id'

class AppService {

  create(o = {}, cb) {
    var _this = this

    var pkg = Object.assign({}, o)

    // validation

    var shortidService  = new ShortIdService(),
        appModel   = new AppModel()

    appModel.create(pkg, function(err, res) {

      if(err) {
        logger.error(err)

        return cb({
          message: 'Could not create app',
          resource: 'AppService'
        })
      }

      var sid = shortidService.issue(res.id)

      _this.update(res.id, {sid}, function(err2, res2) {

        if(err) {
          logger.error(err)

          return cb({
            message: 'Could not create short id for app',
            resource: 'AppService'
          })
        }

        return cb(null, res2)

      })

    })

  }

  get() {
    var appModel = new AppModel()

    appModel.get.apply(appModel, arguments)
  }

  getByShortId() {
    var appModel = new AppModel()

    appModel.getByShortId.apply(appModel, arguments)
  }

  update() {
    var appModel = new AppModel()

    appModel.update.apply(appModel, arguments)
  }

  updateByShortId() {
    var appModel = new AppModel()

    appModel.updateByShortId.apply(appModel, arguments)
  }

}

export default AppService
