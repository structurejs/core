import async           from 'async'
import {chalk, logger} from '../lib/logger'
import PasswordService from './password'
import TokenService    from './token'
import UserModel       from '../models/user'

class AuthService {

  authenticateById(id, password, cb) {

    var passwordService = new PasswordService(),
        userModel       = new UserModel()

    userModel.get(id, function AuthService_authenticateGetCallback(err, user) {

      if(err) {
        return cb({
          message: 'Could not get user: ' + id,
          resource: 'AuthService'
        })
      }

      passwordService.verify(password, user.hash, function(err, verified) {

        if(err) {
          return cb({
            message: 'Could not verify password for user: ' + id,
            resource: 'AuthService'
          })
        }

        cb(null, user)

      })

    })

  }

  authenticateByUsername(username, password, cb) {

    var passwordService = new PasswordService(),
        userModel       = new UserModel()

    userModel.getByUsername(username, function AuthService_authenticateGetCallback(err, user) {
      logger.debug('USERE HERE 1', user)
      if(err) {
        return cb({
          message: 'Could not get user: ' + username,
          resource: 'AuthService'
        })
      }

      passwordService.verify(password, user.hash, function(err, verified) {

        if(err) {
          return cb({
            message: 'Could not verify password for user: ' + username,
            resource: 'AuthService'
          })
        }
        logger.debug('USERE HERE 2', user)
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
          resource: 'AuthService'
        })
      }

      cb(null, token)

    })

  }

  loginById(id, pkg = {}, cb) {
    var _this = this

    if(arguments.length == 2) {
      pkg = arguments[0]
      id  = pkg.id
      cb  = arguments[1]
    }

    var tokenService = new TokenService()

    async.parallel([
      this.authenticateById.bind(this, id, pkg.password),
      tokenService.issue.bind(tokenService, pkg.hash)
    ], function AuthService_loginByIdCallBack(err, res) {

      if(err) {
        logger.error('Could not log in user', id)
        logger.error(err)

        return cb({
          message: 'Could not log in user',
          resource: 'AuthService'
        })
      }

      var user = res[0]
      user.token = res[1]

      cb(null, user)

    })

  }

  loginByUsername(username, pkg = {}, cb) {
    var _this = this

    if(arguments.length == 2) {
      pkg       = arguments[0]
      username  = pkg.username
      cb        = arguments[1]
    }

    var tokenService = new TokenService()

    async.parallel([
      this.authenticateByUsername.bind(this, username, pkg.password),
      tokenService.issue.bind(tokenService, pkg.hash)
    ], function AuthService_loginByUsernameCallBack(err, res) {

      if(err) {
        logger.error('Could not log in user', username)
        logger.error(err)

        return cb({
          message: 'Could not log in user',
          resource: 'AuthService'
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

}

export default AuthService
