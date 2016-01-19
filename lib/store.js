import JSData             from 'js-data'
import DSRethinkDBAdaptor from 'js-data-rethinkdb'

var adapter = {
  rethinkdb: new DSRethinkDBAdaptor({
    authKey: process.env.RETHINK_DB_AUTH_KEY,
    db:      process.env.RETHINK_DB_NAME,
    host:    process.env.RETHINK_DB_HOST,
    port:    process.env.RETHINK_DB_PORT
  })
}

var store = new JSData.DS()

store.registerAdapter('rethinkdb', adapter.rethinkdb, {default: true})

export {
  adapter,
  store
}
