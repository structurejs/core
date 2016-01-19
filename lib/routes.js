import path from 'path'

function getControllerActionByVerb(req, res, next) {

  var controllerName = req.params.controller,
      actionName     = null

  // Map HTTP verb to controller action
  switch(req.method) {

    case 'GET':    actionName = 'findDispatcher'; break;
    case 'POST':   actionName = 'update';         break;
    case 'PUT':    actionName = 'create';         break;
    case 'DELETE': actionName = 'delete';         break;

    default:

  }

  var Controller = require(path.join(`../controllers/${controllerName}`))

  if(Controller && Controller.prototype[actionName]) {
    var controller = new Controller()
    controller[actionName].call(controller, req, res, next)
  }

  else {
    res.status(404).send().end()
  }

}

function routes = (server) {

  server.all('/v0.1/:controller/:id', getControllerActionByVerb)
  server.all('/v0.1/:controller',     getControllerActionByVerb)

}

module.exports = routes
