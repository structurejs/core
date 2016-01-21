import Dragon              from 'dragon.js'
import View   from '../components/auth/view'

class AuthController extends Dragon.Controller {

  create(req, res, next) {
    this.model = new Dragon.Model({
      partials: {spinner: ''}
    })

    this.view = new View({
      model: this.model,
      type: 'create'
    })
  }

}

export default AuthController
