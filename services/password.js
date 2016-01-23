import bcrypt          from 'bcrypt'
import {chalk, logger} from '../lib/logger'

class PasswordService {

  constructor(options = {}) {
    this.options = options
  }

  issue(s, cb) {

    if(typeof s != 'string') return cb({
      message: 'Password must be a string',
      resource: 'PasswordService'
    })

    bcrypt.genSalt(
      parseInt(this.options.genSalt) ||
      parseInt(process.env.SALT_FACTOR) ||
      10,
    function PasswordService_genSaltCallback(err, salt) {
      if(err) {
        logger.error('Could not generate salt', err)
        return cb(err)
      }

      bcrypt.hash(s, salt, function PasswordService_hashCallback(err, hash) {
        if(err) {
          logger.error('Could not generate hash', err)
          return cb(err)
        }

        cb(null, hash)
      })

    })

  }

  verify(s, hash, cb) {

    bcrypt.compare(s, hash, function PasswordService_compareCallback(err, match) {

      if(err) {
        logger.error('Could not verify password', err)
        logger.debug('Password', s)
        logger.debug('Hash', hash)
        return cb(err)
      }

      return cb(null, true)

    })

  }

}

export default PasswordService
