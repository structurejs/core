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

    passwordService.issue(pkg.password, function UserService_createIssueCallback(err, hash) {

      if(err) {
        logger.error(err)
        logger.debug('cb', typeof cb)
        return cb({
          message: 'Could not create password hash',
          resource: 'UserModel'
        })
      }

      delete pkg.password // dont want to store actual password

      pkg.hash   = hash

      async.parallel([
        userModel.create.bind(userModel, pkg),
        tokenService.issue.bind(_this, hash)
      ], function UserService_createParallelCallback(err, res) {

        var user = res[0]
        var sid  = shortidService.issue(user.id)

        _this.update(user.id, {sid}, function(err2, res2) {

          if(err) {
            logger.error(err)
            return cb({
              raw: err,
              resource: 'UserModel'
            })
          }

          user       = res2
          user.token = res[1]

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
