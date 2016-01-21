import Model from './base'

class UserModel extends Model {

  constructor(pkg, options = {}) {
    super(pkg, options = {})
  }

}

UserModel.prototype.table = 'users'

export default UserModel
