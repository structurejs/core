import async           from 'async'
import {chalk, logger} from '../lib/logger'
import Model           from './base'

class BootModel extends Model {

  constructor(options = {}) {
    super(options = {})
  }

  createTables(cb) {

    var tables = process.env.RETHINK_DB_TABLES.replace(/\s+/g, '').split(',')

    var processTables = []

    tables.forEach( (table) => {

      processTables.push(this.createTable.bind(this, table))

    })

    async.parallel(processTables, function(err, res) {

      if(err) {
        logger.error('Couldnt create tables on boot', err)
        return cb(err)
      }

      return cb(null, res)

    })

  }

}

BootModel.prototype.table = 'boot'

export default BootModel
