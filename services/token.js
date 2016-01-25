import jwt from 'jsonwebtoken'

var cert = 'hello'

class TokenService {

  constructor() {

  }

  issue(s, cb) {

    if(typeof s == 'number') s = s.toString()
    if(typeof s != 'string') return false

    var token = jwt.sign(s, cert, {
      //expiresInMinutes: 1440 // 24 hours
    })

    if(typeof cb == 'function') {
      if(!token) return cb(false)

      return cb(null, token)
    }

    return token

  }

  /*issueToken(hash, cb) {

    var tokenService = new TokenService()

    var token = tokenService.issue(hash)

    if(!token) return cb(false)

    return cb(null, token)

  }*/

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
