import async           from 'async'
import {chalk, logger} from '../lib/logger'
import Model           from './base'

class OrganizationModel extends Model {

  constructor(options = {}) {
    super(options = {})
  }

  create() {
    super._create.apply(this, arguments)
  }

  get() {
    super._get.apply(this, arguments)
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
      q = q.orderBy(r.asc('title'))

      return q

    }

    this.query(query, function listCallback(err, res) {
      if(err) return cb(err)

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

OrganizationModel.prototype.table = 'organizations'

export default OrganizationModel
