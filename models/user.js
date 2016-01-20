import Model from './base'

class UserModel extends Model {

  beforeCreate(User, user, cb) {
    user.created_at = new Date()
    user.status     = 'active'
    user.updated_at = new Date()

    return cb(null, user)
  }

  beforeUpdate(User, user, cb) {
    user.updated_at = new Date()

    return cb(null, user)
  }

  create(pkg, cb) {

    this.resource.create(pkg)
      .then(
        function(data) {cb(null, data)},
        function(err)  {cb(err)}
      )
  }

  defineResource() {

    return {
      name: this.resourceName,
      table: this.table,
      relations: {

      },
      beforeCreate: this.beforeCreate,
      beforeUpdate: this.beforeUpdate
    }

  }

  delete(id, cb) {

    this.resource.update(id, {status: 'deleted'})
      .then(
        function(data) {cb(null, data)},
        function(err)  {cb(err)}
      )

  }

  findOne(id, cb) {

    this.resource.find(id)
      .then(
        function(data) {cb(null, data)},
        function(err)  {cb(err)}
      )

  }

  findAll(options = {}, cb) {

    if(!options.status) options.status = 'active'

    this.resource.findAll(options)
      .then(
        function(data) {cb(null, data)},
        function(err)  {cb(err)}
      )

  }

  update(id, pkg, cb) {

    this.resource.update(id, pkg)
      .then(
        function(data) {cb(null, data)},
        function(err)  {cb(err)}
      )

  }

}

UserModel.prototype.resourceName = 'user'
UserModel.prototype.table = 'users'

export default UserModel
