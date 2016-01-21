import Dragon   from 'dragon.js'
import FormView from '../../views/form'

class AuthView extends FormView {

  constructor(options = {}) {

    switch(options.type) {

      case 'create':
        options.template = require('./templates/create')

        break

      default:
        options.template = require('./templates/login')

    }

    super(Object.assign({}, {
      container: '#app-container',
      reducer: function AuthViewReducer(state = initialState, action) {
        //console.log('state', state)
        console.log('action', action)

        switch(action.type) {

          case 'ERROR':
            console.log('state: error', state)
            return Object.assign({}, state, {
              error: 'foo'
            })

          case 'SUBMITTING':
            console.log('state: submitting', state)
            return Object.assign({}, state, {
              spinning: 'abc'
            })

          default:
            console.log('state: default', state)
            console.log('what is idom', this.idom)
            return state
        }

      }
    }, options))

  }

  formSubmit(e) {
    e.preventDefault()

    console.log("create form submitted", this.model)
    this.state('submitting', {partials: {
      spinner: require('../../components/auth/templates/spinner')
    }})

    var pkg = {
      email: this.refs('email').value,
      password: this.refs('password').value,
      username: this.refs('username').value
    }
    return console.log('da pkg yo', pkg)
    var validate = this.validate(pkg)
    console.log("validate", validate)
    if(!validate.error) {

      this.state.set('submitting')

      this.model.create(pkg).then( (res) => {

        console.log("what dis res", res)

      }, this.formError)

    }

  }

  onAddedToDOM() {
    console.log('added to dom in auth view')

    this.model.on('change', () => {
      console.log('change', this.model.attr)
    })

    this.refs('form',     '.auth-form')
    this.refs('email',    '#auth-email')
    this.refs('password', '#auth-password')
    this.refs('username', '#auth-username')
  }

}

export default AuthView
