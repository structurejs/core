import Model from './base'

class UserModel extends Model {

  beforeCreate(User, user, cb) {
    user.created_at = new Date()
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
    this.name  = 'user'
    this.table = 'users'

    return {
      name: this.name,
      table: this.table,
      relations: {

      },
      beforeCreate: this.beforeCreate,
      beforeUpdate: this.beforeUpdate
    }

  }

  delete() {

  }

  findOne(id, cb) {

    this.resource.find(id)
      .then(
        function(data) {cb(null, data)},
        function(err)  {cb(err)}
      )

  }

  findAll() {

  }

  update() {

  }

}

export default UserModel
