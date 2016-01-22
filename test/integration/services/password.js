import PasswordService from '../../../services/password'

describe('Integration: Services: Password', function() {

  it('should issue a password', function(done) {

    var passwordService = new PasswordService()

    let password = 'foo'
    passwordService.issue(password, function(err, hash) {

      expect(hash).to.be.a('string')
      done()

    })

  })

  it('should verify a password', function(done) {

    var passwordService = new PasswordService()

    let password = 'foo'
    passwordService.issue(password, function(err, hash) {

      passwordService.verify(password, hash, function(err, verified) {

        expect(verified).to.be.true

        done()

      })

    })

  })

})
