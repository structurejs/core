import async           from 'async'
import {chalk, logger} from '../lib/logger'
import Model           from './base'
import PasswordService from '../services/password'
import TokenService    from '../services/token'

class UserModel extends Model {

  constructor(options = {}) {
    super(options = {})
  }

  authenticate(id, cb) {



  }

  authorize() {



  }

  create(pkg = {}, cb) {
    var _this = this

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

  login(id, pass, cb) {
    var _this = this

    this.authenticate(id, pass, function UserModel_loginAuthenticateCallBack(err, token) {



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
