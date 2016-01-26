import {chalk, logger} from './logger'
import cors            from 'cors'
import path            from 'path'

import AuthController  from '../controllers/auth'

function getControllerActionByVerb(req, res, next) {

  var controllerName = req.params.controller,
      actionName     = null

  // Map HTTP verb to controller action
  switch(req.method) {

    case 'GET':    actionName = 'getDispatcher';  break;
    case 'POST':   actionName = 'update';         break;
    case 'PUT':    actionName = 'create';         break;
    case 'DELETE': actionName = 'delete';         break;

    default:

  }

  var Controller = require(path.join(__dirname, `../controllers/${controllerName}`))
  logger.debug('Controller loaded??', typeof Controller, Controller.prototype)
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

function routes(server) {

  var auth = new AuthController()

  server.use(cors())

  server.post('/api/v0.1/auth/login', auth.login.bind(auth))

  server.all('/api/v0.1/:controller/:id', getControllerActionByVerb)
  server.all('/api/v0.1/:controller',     getControllerActionByVerb)

}

module.exports = routes
