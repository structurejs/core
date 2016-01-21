import Controller from './base'

class UsersController extends Controller {

  constructor() {
    super()
  }

}

UsersController.prototype.resource = {
  name: 'user',
  slug: 'users'
}

module.exports = UsersController
