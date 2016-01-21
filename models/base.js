import Dragon       from 'dragon.js'
import Log          from '../mixins/log'
import {chalk, logger} from '../lib/logger'
import Middleware   from '../mixins/middleware'
import mixin        from '../mixins/mixin'
import r            from 'rethinkdb'
import Scrape       from '../mixins/scrape'
import StreamExtras from '../mixins/stream-extras'

class BaseModel {

  constructor(pkg, options = {}) {
    this.flowMethods = [
      'create',
      'get',
      'save',
      'update'
    ]

    var eventEmitter = new Dragon.EventEmitter()
    this.emit        = eventEmitter.emitEvent.bind(eventEmitter)
    this.on          = eventEmitter.addListener.bind(eventEmitter)
    this.once        = eventEmitter.addOnceListener.bind(eventEmitter)
    this.off         = eventEmitter.removeListener.bind(eventEmitter)

    this.mixin(Middleware)
    this.mixin(Log)
    this.mixin(Scrape)
    this.mixin(StreamExtras)

    if(typeof pkg == 'object') {
      this.body = Object.assign({}, pkg)
    }
    else {
      this.body = pkg
    }

    this.config = {
      db: {
        authKey: process.env.RETHINK_DB_AUTH_KEY,
        host:    process.env.RETHINK_DB_HOST,
        name:    process.env.RETHINK_DB_NAME,
        port:    process.env.RETHINK_DB_PORT
      }
    }

    this.r = r
    this.schema = options.schema || this.schema || null
    this.table  = options.table  || this.table

    if(this.table) this.createTable()
  }

  connect(cb) {

    r.connect(this.config.db, function modelConnectionCallback(err, connection) {
      if(err) return cb(err)

      cb(null, connection)
    })

  }

  /**
   *
   * @desc Will attempt to create a table with the name from `this.table` if that table name does not already exist
   * @note RethinkDB table creation is not 'instant' - if this function fires multiple times too quickly, there is no guarantee of the table list check will be accurate
   */
  createTable(cb) {
    var _this = this
    // TODO: should a model require a table?
    //if(!this.table) return console.error('Model requires a table')

    this.query((r) => r.db(_this.config.db.name).tableList(), function tableListCallback(err, tables) {

      if(tables.indexOf(_this.table) == -1) {
        _this.query((r) => r.db(_this.config.db.name).tableCreate(_this.table), function createTableCallback(err, res) {

          if(cb) {
            if(err) return cb(err)

            cb(null, res)
          }

        })
      }

    })

  }

  create(cb) {
    var _this = this

    this.query((r) => r.db(this.config.db.name).table(this.table).insert(this.body, {
      durability: 'hard',
      returnChanges: true
    }), function saveCallback(err, res) {
      if(err) return cb(err)

      _this.id = res.generated_keys[0]

      cb(null, res.changes[0].new_val)
    })

  }

  flow() {
    var _this = this

    /*
    Methods in `flowMethods` are wrapped with `use` to enable chaining.
    */
    function flowClosure() {

      this.emit = _this.emit.bind(_this)
      this.off  = _this.off.bind(_this)
      this.on   = _this.on.bind(_this)
      this.once = _this.once.bind(_this)
      //this.use  = _this.use.bind(_this)

      // In order to retain flow scope, the correct scope needs to be returned
      this.use = function flowUse() {
        _this.use.apply(_this, arguments)

        return this
      }

      _this.flowMethods.forEach((method, i) => {

        /*
        Flow methods wrap `use` - they're shortcuts vs `use(function(next) { model.save(function() { next() }) })`
        They also enable chaining of asynchronus methods, which is the main point of the middleware
        */
        this[method] = function flowMethod() {

          /*
          TODO: how to resolve core vs non-core flow methods? This if/else statement is janky
          */
          if(method == 'get' || method == 'save' || method == 'update') {
            _this.use(function middlewareUseCallback(next) {

              _this[method].call(_this, function middlewareMethodCallback(err, res) {
                if(err) return _this.emit('error', err)

                next()
              })
            })
          }

          else {
            _this[method].apply(_this, arguments)
          }

          // If this is the first method in the series, start the series
          // TODO: would be nice to find another way to kick things off
          if(_this.currentMiddlewareLayer == 0) _this.next()

          return this

        }
      })

      // TODO: look into making `flow` itself middleware to kick things off
      //_this.next()

    }

    return new flowClosure()

  }

  get(id, cb) {

    if(arguments.length == 1) {
      id = this.id
      cb = arguments[0]
    }

    this.query((r) => r.db(this.config.db.name).table(this.table).get(id), function getCallback(err, res) {
      if(err) return cb(err)

      cb(null, res)
    })

  }

  getAll(cb) {

    this.query((r) => r.db(this.config.db.name).table(this.table), function getAllCallback(err, res) {
      if(err) return cb(err)

      cb(null, res)
    })

  }

  mixin(source) {

    /*
    TODO: make adding flowMethods smarter - for now this works
    */
    var flowMethods = source.prototype.flowMethods || []

    flowMethods.forEach( (method) => {
      if(this.flowMethods.indexOf(method) == -1) this.flowMethods.push(method)
    })

    mixin.apply(this, arguments)

  }

  /*
  TODO: this is a part of an ES7 path which is currently difficult because of how promise exceptions are handled.
  Until there is a way to debug promises besides the janky try/catch approach, leaving this here as is.
  */
  asyncQuery(query) {
    var _this = this

    async function q() {

      return new Promise((resolve, reject) => {

        _this.connect(async function queryConnectCallback(err, connection) {

          var qRes = await query(r).run(connection)

          resolve(qRes)

        })

      })

    }

    return q()

  }

  query(query, cb) {

    this.connect(function queryConnectCallback(err, connection) {
      if(err) return cb(err)

      // Pass r so developer has access to it for writing a query
      query(r).run(connection, function modelQueryCallback(err, cursor) {
        if(err) return cb(err)

        connection.close()

        /*
        Sometimes RethinkDB returns a cursor, with way more information than needed.
        Sometimes RethinkDB returns just the relevant information.
        */
        // Too much info
        if(cursor._conn) {
          // Break info down to what is needed
          cursor.toArray(function queryCursorToArray(err, res) {
            if(err) return cb(err)

            cb(null, res)

          })
        }
        // Just enough info
        else {
          if(err) return cb(err)

          cb(null, cursor)
        }

      })

    })

  }

  save(cb) {
    var _this = this

    this.query((r) => r.db(this.config.db.name).table(this.table).insert(this.body, {
      durability: 'hard',
      returnChanges: true
    }), function saveCallback(err, res) {
      if(err) return cb(err)

      _this.id = res.generated_keys[0]

      cb(null, res)
    })

  }

  update(id, cb) {
    var _this = this

    if(arguments.length == 1) {
      id = this.id
      cb = arguments[0]
    }

    this.query((r) => r.db(this.config.db.name).table(this.table).get(id).update(this.body, {
      durability: 'hard',
      returnChanges: true
    }), function updateCallback(err, res) {
      if(err) return cb(err)

      // On successful updates, RethinkDB returns the new and old value on the model change(s)
      if(res.changes.length > 0) {
        res = res.changes[0].new_val
      }

      cb(null, res)
    })

  }

  validate() {

    return this.schema.validate(this.body)

  }

}

module.exports = BaseModel
