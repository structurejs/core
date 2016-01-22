import jwt from 'jsonwebtoken'

var cert = 'hello'

class TokenService {

  constructor() {

  }

  issue(s) {

    if(typeof s == 'number') s = s.toString()
    if(typeof s != 'string') return false

    var token = jwt.sign(s, cert, {
      //expiresInMinutes: 1440 // 24 hours
    })

    return token

  }

  verify(token, cb) {

    jwt.verify(token, cert, function verifyAuthenticationJWTVerifyCallback(err, decoded) {

      if(err) {

        return cb(err)

      }

      return cb(null, true)

    })

  }

}

export default TokenService
