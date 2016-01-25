import async           from 'async'
import {chalk, logger} from '../lib/logger'
import Model           from './base'

class UserModel extends Model {

  constructor(options = {}) {
    super(options = {})
  }

  create() {
    super._create.apply(this, arguments)
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

  update() {
    super._update.apply(this, arguments)
  }

}

UserModel.prototype.table = 'users'

export default UserModel
