import Dragon    from 'dragon.js'
import routes    from './routes'

var app = new Dragon.Application({
  dispatcher: {
    getController: function getController(name) {
      return require(`./controllers/${name}`).default
    }
  },
  router: {
    routes
  }
})

app.start()
