class Middleware {

  next(err, pkg) {

    if(err) {
      return this.emit('error', err)
    }

    // Have all the middleware run?
    if(this.middlewareLayers.length == this.currentMiddlewareLayer) {

      if(this.emit) this.emit('end', pkg)

      // Reset so middleware can make another run if need be
      this.currentMiddlewareLayer = 0
      this.middlewareLayers = []

      return

    }

    // There are more middleware, go to next one
    this.currentMiddlewareLayer++

    var nextMiddleware = this.middlewareLayers[this.currentMiddlewareLayer - 1]

    // The next middleware was found
    if(nextMiddleware) {

      nextMiddleware.call(this, pkg, this.next.bind(this))

    }

    // The next middleware was not found; this is a developer error
    else {
      return this.emit('error', err)
    }

  }

  use(fn) {

    // These need to be set here because we can't set them in the constructor and if we set them on the prototype, then all models would share the same middleware
    if(!this.currentMiddlewareLayer) this.currentMiddlewareLayer = 0
    if(!this.middlewareLayers)       this.middlewareLayers = []

    this.middlewareLayers.push(fn)

    return this

  }

}

export default Middleware
