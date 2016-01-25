import async           from 'async'
import {chalk, logger} from '../lib/logger'
import PasswordService from './password'
import TokenService    from './token'
import UserModel       from '../models/user'

class UserService {

  create(o = {}, cb) {
    var _this = this

    var pkg = Object.assign({}, o)

    // validation

    var passwordService = new PasswordService(),
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
      pkg.status = 'active'

      async.parallel([
        userModel.create.bind(userModel, pkg),
        tokenService.issue.bind(_this, hash)
      ], function UserService_createParallelCallback(err, res) {

        if(err) {
          logger.error(err)
          return cb({
            raw: err,
            resource: 'UserModel'
          })
        }

        var user = res[0]
        user.token = res[1]

        cb(null, user)

      })

    })

  }

  get() {
    var userModel = new UserModel()

    userModel.get.apply(userModel, arguments)
  }

  getByUsername() {
    var userModel = new UserModel()

    userModel.getByUsername.apply(userModel, arguments)
  }

  update() {
    var userModel = new UserModel()

    userModel.update.apply(userModel, arguments)
  }

}

export default UserService
