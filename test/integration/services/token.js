import TokenService from '../../../services/token'

describe('Integration: Services: Token', function() {

  it('should issue a token', function(done) {

    var tokenService = new TokenService()

    let token = tokenService.issue(1)

    expect(token).to.be.a('string')

    done()

  })

  it('should verify a token', function(done) {

    var tokenService = new TokenService()

    let token = tokenService.issue(1)

    tokenService.verify(token, function(err, verified) {

      expect(verified).to.be.true

      done()

    })

  })

})
