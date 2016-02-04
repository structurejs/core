import {chalk, logger} from '../lib/logger'
import Controller      from    './base'
import PackageService  from '../services/package'
import UserService     from    '../services/user'

class UsersController extends Controller {

  constructor() {
    super()
  }

  create(req, res, next) {
    var _this = this

    var userService = new UserService()

    userService.create(req.body, function(err, user) {

      if(err) {
        logger.error('Could not create user', err)
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(user, res)

    })

  }

  getDispatcher(req, res, next) {

    if(req.params.id) {
      return this.getById.apply(this, arguments)
    }

    if(req.params.sid) {
      return this.getByShortId.apply(this, arguments)
    }

    if(req.params.username) {
      return this.getByUsername.apply(this, arguments)
    }

  }

  getById(req, res, next) {
    var _this = this

    var userService = new UserService()

    userService.get(req.params.id, function(err, user) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(user, res)

    })

  }

  getByShortId(req, res, next) {
    var _this = this

    var userService = new UserService()

    userService.getByShortId(req.params.sid, function(err, user) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(user, res)

    })
  }

  getByUsername(req, res, next) {
    var _this = this

    var userService = new UserService()

    userService.getByUsername(req.params.username, function(err, user) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(user, res)

    })

  }

  list(req, res, next) {

    var _this = this

    var userService = new UserService()

    userService.list({
      limit: req.params.limit,
      organizationId: req.query.organizationId
    }, function(err, users) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(users, res)

    })

  }

  update(req, res, next) {
    var _this = this

    var userService = new UserService()

    userService.updateByShortId(req.params.sid, req.body, function(err, user) {

      if(err) {
        return _this.respondWithError(err, res)
      }

      _this.respondWithPkg(user, res)

    })
  }

}

UsersController.prototype.resource = {
  model: 'user',
  name:  'user',
  slug:  'users'
}

module.exports = UsersController
