import async           from 'async'
import {chalk, logger} from '../lib/logger'
import PasswordService from './password'
import ShortIdService  from '../services/short-id'
import TokenService    from './token'
import UserModel       from '../models/user'

class UserService {

  create(o = {}, cb) {
    var _this = this

    var pkg = Object.assign({}, o)

    // validation

    var passwordService = new PasswordService(),
        shortidService  = new ShortIdService(),
        tokenService    = new TokenService(),
        userModel       = new UserModel()

    /*
    TODO: clean up this query, it could be optimized
    */
    passwordService.issue(pkg.password, function UserService_createIssueCallback(err, hash) {

      if(err) {
        logger.error(err)
        logger.debug('cb', typeof cb)
        return cb({
          message: 'Could not create password hash',
          resource: 'UserModel'
        })
      }

      if(pkg.password) delete pkg.password // dont want to store actual password
      if(pkg.organizationId) delete pkg.organizationId

      pkg.hash = hash
      pkg.organizations = pkg.organizations || []

      async.parallel([
        userModel.create.bind(userModel, pkg)
      ], function UserService_createParallelCallback(err, res) {

        if(err) {
          logger.error(err)
          return cb({
            raw: err,
            resource: 'UserModel'
          })
        }

        var user = res[0]
        var sid  = shortidService.issue(user.id)

        async.parallel([
          tokenService.issue.bind(tokenService, user.id),
          userModel.addToOrganizationTable.bind(userModel, user.id, o.organizations[0]),
          _this.update.bind(_this, user.id, {sid})
        ], function UserService_createParallelCallback2(err2, res2) {

          if(err2) {
            logger.error(err2)
            return cb({
              raw: err2,
              resource: 'UserModel'
            })
          }

          user               = res2[2]
          user.organizations = res2[1].organizations
          user.token         = res2[0]

          cb(null, user)

        })

      })

    })

  }

  get() {
    var userModel = new UserModel()

    userModel.get.apply(userModel, arguments)
  }

  getByShortId() {
    var userModel = new UserModel()

    userModel.getByShortId.apply(userModel, arguments)
  }

  getByUsername() {
    var userModel = new UserModel()

    userModel.getByUsername.apply(userModel, arguments)
  }

  list() {

    var userModel = new UserModel()

    userModel.list.apply(userModel, arguments)

  }

  update() {
    var userModel = new UserModel()

    userModel.update.apply(userModel, arguments)
  }

  updateByShortId() {
    var userModel = new UserModel()

    userModel.updateByShortId.apply(userModel, arguments)
  }

}

export default UserService
