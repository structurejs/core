import async           from 'async'
import {chalk, logger} from '../lib/logger'
import Model           from './base'

class UserModel extends Model {

  constructor(options = {}) {
    super(options = {})
  }

  create(pkg, cb) {
    pkg._status = 'active'
    super._create.call(this, pkg, cb)
  }

  get() {
    super._get.apply(this, arguments)
  }

  getByUsername(username, cb) {

    this.query((r) => r.db(this.config.db.name).table(this.table).filter({username}).limit(1), function getCallback(err, res) {
      if(err) {
        return cb(err)
      }

      if(res.length == 0) {
        return cb({
          message: 'No users found',
          note: `Attempted to look up user ${username}`,
          resource: 'UserModel'
        })
      }

      var user = res[0]

      cb(null, user)
    })

  }

  list(limit, cb) {
    var _this = this

    if(arguments.length == 1) {
      cb    = arguments[0]
      limit = null
    }

    var query = function listQuery(r) {

      var q = r.db(_this.config.db.name).table(_this.table)
      if(limit) q = q.limit(parseInt(limit))
      q = q.orderBy(r.asc('lastName'))

      return q

    }

    this.query(query, function listCallback(err, res) {
      if(err) return cb(err)
      //logger.debug('res', res)
      res = res.filter(function(item) {
        if(item.sid) return item
      })

      cb(null, res)
    })

  }

  update() {
    super._update.apply(this, arguments)
  }

}

UserModel.prototype.table = 'users'

export default UserModel
