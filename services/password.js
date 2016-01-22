import bcrypt from 'bcrypt'

class PasswordService {

  constructor(options = {}) {
    this.options = options
  }

  issue(s, cb) {

    if(typeof s != 'string') return cb({
      message: 'Password must be a string',
      resource: 'PasswordService'
    })

    bcrypt.genSalt(this.options.genSalt || process.env.SALT_FACTOR || 10, function PasswordService_genSaltCallback(err, salt) {
      if(err) {
        return cb(err)
      }

      bcrypt.hash(s, salt, function PasswordService_hashCallback(err, hash) {
        if(err) {
          return cb(err)
        }

        cb(null, hash)
      })

    })

  }

  verify(s, hash, cb) {

    bcrypt.compare(s, hash, function PasswordService_compareCallback(err, match) {

      if(err) {
        return cb(err)
      }

      return cb(null, true)

    })

  }

}

export default PasswordService
