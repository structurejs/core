import {chalk, logger} from './logger'
import path   from 'path'

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
  logger.debug('Controller loaded??', Controller.prototype)
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

  server.all('/api/v0.1/:controller/:id', getControllerActionByVerb)
  server.all('/api/v0.1/:controller',     getControllerActionByVerb)

  server.get(/^[^.]+$|\.(?!(css|gif|ico|jpg|js|map|mp4|png|tiff|woff|woff2)$)([^.]+$)/, (req, res) => {

    res.sendFile(path.join(__dirname, '../public/index.html'))

  })

}

module.exports = routes
