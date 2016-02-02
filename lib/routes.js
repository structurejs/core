import {chalk, logger} from './logger'
import cors            from 'cors'
import path            from 'path'

import AuthController  from '../controllers/auth'

class Dispatch {

  constructor(controllerName, actionName) {
    this.controllerName = controllerName
    this.actionName     = actionName

    return this.middle.bind(this)

  }

  middle(req, res, next) {
    var controllerName = this.controllerName || req.params.controller,
        actionName     = this.actionName     || null

    logger.debug('controllerName', controllerName)
    logger.debug('controllerAction', actionName)

    if(!actionName) {

      // Map HTTP verb to controller action
      switch(req.method) {

        case 'GET':    {actionName = 'getDispatcher';  break;}
        case 'POST':   {actionName = 'update';         break;}
        case 'PUT':    {actionName = 'create';         break;}
        case 'DELETE': {actionName = 'delete';         break;}

        default:

      }

    }

    var Controller = require(path.join(__dirname, `../controllers/${controllerName}`))
    logger.debug('Controller loaded??', controllerName, typeof Controller, Controller.prototype)
    logger.debug('Controller action', actionName)
    if(Controller) {
      var controller = new Controller()

      if(!Controller.prototype[actionName]) {
        logger.error(`Controller action not found`, actionName)
      }

      else {
        controller[actionName].call(controller, req, res, next)
      }

    }

    else {
      logger.error(`Controller not found`, controllerName)

      res.status(404).send().end()
    }

  }

}

function routes(server) {

  var auth = new AuthController()

  server.use(cors())

  server.post('/api/v0.1/auth/login',               new Dispatch('auth', 'login'))

  server.get('/api/v0.1/:controller/list/:limit',   new Dispatch(null, 'list'))
  server.get('/api/v0.1/:controller/list',          new Dispatch(null, 'list'))

  server.all('/api/v0.1/apps/:sid',                 new Dispatch('apps'))
  server.all('/api/v0.1/organizations/:sid',        new Dispatch('organizations'))
  server.all('/api/v0.1/templates/:sid',            new Dispatch('templates'))
  server.all('/api/v0.1/users/:sid',                new Dispatch('users'))

  server.all('/api/v0.1/:controller/:id',           new Dispatch())
  server.all('/api/v0.1/:controller',               new Dispatch())

}

module.exports = routes
