import {chalk, logger} from '../lib/logger'
import Model           from './base'
import PasswordService from '../services/password'
import TokenService    from '../services/token'

class UserModel extends Model {

  constructor(options = {}) {
    super(options = {})
  }

  authenticate(id, cb) {

    var tokenService = new TokenService()

    var token = tokenService.issue(id)

    if(!token) return cb(false)

    return cb(null, token)

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
      pkg.hash = hash

      _this._create(pkg, cb)

    })

  }

  get() {
    super._get.apply(this, arguments)
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
