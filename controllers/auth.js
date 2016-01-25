import AuthService     from    '../services/auth'
import {chalk, logger} from '../lib/logger'
import Controller      from    './base'
import PackageService  from '../services/package'

class AuthController extends Controller {

  constructor() {
    super()
  }

  login(req, res, next) {
    var _this = this

    var authService = new AuthService()

    authService.loginByUsername(req.body, function(err, user) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(user, res)

    })

  }

}

AuthController.prototype.resource = {
  name: 'auth',
  slug: 'auth'
}

export default AuthController
