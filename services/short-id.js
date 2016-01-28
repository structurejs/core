import {chalk, logger} from '../lib/logger'
import shorthash       from 'shorthash'

class ShortIdService {

  constructor(options = {}) {
    this.options = options
  }

  issue(id, cb) {

    var sid = shorthash.unique(id)

    if(cb) return cb(null, sid)

    return sid

  }

}

export default ShortIdService
