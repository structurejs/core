import async           from 'async'
import {chalk, logger} from '../lib/logger'
import Model           from './base'
import PasswordService from '../services/password'
import TokenService    from '../services/token'

class UserModel extends Model {

  constructor(options = {}) {
    super(options = {})
  }

  authenticate(id, password, cb) {

    var passwordService = new PasswordService()

    this.get(id, function UserModel_authenticateGetCallback(err, user) {

      if(err) {
        return cb({
          message: 'Could not get user: ' + id,
          resource: 'UserModel'
        })
      }

      passwordService.verify(password, user.hash, function(err, verified) {

        if(err) {
          return cb({
            message: 'Could not verify password for user: ' + id,
            resource: 'UserModel'
          })
        }

        cb(null, user)

      })

    })

  }

  authorize(id, token, cb) {

    var tokenService = new TokenService()

    tokenService.verify(token, function(err, verified) {

      if(err) {
        return cb({
          message: 'Could not authorize user: ' + id,
          resource: 'UserModel'
        })
      }

      cb(null, token)

    })

  }

  create(o = {}, cb) {
    var _this = this

    var pkg = Object.assign({}, o)

    // validation

    var passwordService = new PasswordService

    passwordService.issue(pkg.password, function UserModel_createIssueCallback(err, hash) {

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
        _this._create.bind(_this, pkg),
        _this.issueToken.bind(_this, hash)
      ], function UserModel_createParallelCallback(err, res) {

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
    super._get.apply(this, arguments)
  }

  issueToken(hash, cb) {

    var tokenService = new TokenService()

    var token = tokenService.issue(hash)

    if(!token) return cb(false)

    return cb(null, token)

  }

  login(pkg = {}, cb) {
    var _this = this

    async.parallel([
      this.authenticate.bind(this, pkg.id, pkg.password),
      this.issueToken.bind(this, pkg.hash)
    ], function UserModel_loginCallBack(err, res) {

      if(err) {
        logger.error('Could not log in user', pkg.id)
        logger.error(err)

        return cb({
          message: 'Could not log in user',
          resource: 'UserModel'
        })
      }

      var user = res[0]
      user.token = res[1]

      cb(null, user)

    })

  }

  logout() {

  }

  unauthenticate() {

  }

  update() {
    super._update.apply(this, arguments)
  }

}

UserModel.prototype.table = 'users'

export default UserModel
