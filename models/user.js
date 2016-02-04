import async           from 'async'
import {chalk, logger} from '../lib/logger'
import Model           from './base'

class UserModel extends Model {

  constructor(options = {}) {
    super(options = {})
  }

  addToOrganization(id, orgId, cb) {

    pkg.dateCreated = r.now()
    pkg.dateUpdate  = r.now()

    async.parallel([
      this.addOrganizationToUser.bind(this, id, orgId),
      this.addToOrganizationTable.bind(this, id, orgId)
    ], function addToOrganizationCallback(err, res) {

      if(err) {
        logger.error('Could not add user to organization', err)
        return cb(err)
      }

      return cb(null, res[0])

    })

  }

  addOrganizationToUser(id, orgId, cb) {

    this.query((r) => r.db(this.config.db.name).table(this.name).get(id).update({
      organizations: r.row('organizations').append(orgId)
    }, {
      durability: 'hard',
      returnChanges: true
    }), function addOrganizationToUserCallback(err, res) {
      if(err) {
        logger.error('Could not add organization to user', err)
        return cb(err)
      }

      cb(null, res.changes[0].new_val)
    })

  }

  addToOrganizationTable(id, orgId, cb) {

    this.query((r) => r.db(this.config.db.name).table('organization_has_users').insert({
      dateCreated: r.now(),
      organizationId: orgId,
      userId: id
    }, {
      durability: 'hard',
      returnChanges: true
    }), function addToOrganizationTableCallback(err, res) {
      if(err) {
        logger.error('Could not create', err)
        return cb(err)
      }

      cb(null, res.changes[0].new_val)
    })

  }

  create(pkg, cb) {
    super._create.apply(this, arguments)
  }

  get() {
    super._get.apply(this, arguments)
  }

  getByEmail(email, cb) {

    this.query((r) => r.db(this.config.db.name).table(this.table).filter({email}).limit(1), function getCallback(err, res) {
      if(err) {
        return cb(err)
      }

      if(res.length == 0) {
        return cb({
          message: 'No users found',
          note: `Attempted to look up user user by email ${email}`,
          resource: 'UserModel'
        })
      }

      var user = res[0]

      cb(null, user)
    })

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

  list(options = {}, cb) {
    var _this          = this,
        limit          = options.limit,
        organizationId = options.organizationId

    if(arguments.length == 1) {
      cb    = arguments[0]
      limit = null
    }

    var query = function listQuery(r) {

      var q = r.db(_this.config.db.name).table(_this.table).getAll(organizationId, {index: 'organizations'})
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
