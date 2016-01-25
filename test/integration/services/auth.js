import AuthService from '../../../services/auth'
import UserService from '../../../services/user'

describe('Integration: Services: Auth', function() {

  it('should authenticate a user ID + password', function(done) {

    var auth = new AuthService(),
        user = new UserService()

    var pkg = {
      firstName: 'Chris',
      password: 'foo'
    }

    user.create(pkg, function(err, res) {

      auth.authenticateById(res.id, pkg.password, function(err, res2) {

        expect(res2).to.be.an('object')
        expect(res2.hash).to.be.a('string')

        done()

      })

    })

  })

  it('should authenticate a username + password', function(done) {

    var auth = new AuthService(),
        user = new UserService()

    var pkg = {
      firstName: 'Chris',
      password: 'foo',
      username: 'chris' + new Date()
    }

    user.create(pkg, function(err, res) {

      auth.authenticateByUsername(pkg.username, pkg.password, function(err, res2) {

        expect(res2).to.be.an('object')
        expect(res2.hash).to.be.a('string')

        done()

      })

    })

  })

  it('should log in a user ID + pass', function(done) {

    var auth = new AuthService(),
        user = new UserService()

    var pkg = {
      firstName: 'Chris',
      password: 'foo'
    }

    user.create(pkg, function(err, res) {

      res.password = pkg.password
      auth.loginById(res, function(err, res2) {

        expect(res2).to.be.an('object')
        expect(res2.hash).to.be.a('string')
        expect(res2.token).to.be.a('string')

        done()

      })

    })

  })

  it('should log in a username + pass', function(done) {

    var auth = new AuthService(),
        user = new UserService()

    var pkg = {
      firstName: 'Chris',
      password: 'foo',
      username: 'chris' + new Date()
    }

    user.create(pkg, function(err, res) {

      res.password = pkg.password
      auth.loginByUsername(res, function(err, res2) {

        expect(res2).to.be.an('object')
        expect(res2.hash).to.be.a('string')
        expect(res2.token).to.be.a('string')

        done()

      })

    })

  })

  it('should authorize a user', function(done) {

    var auth = new AuthService(),
        user = new UserService()

    var pkg = {
      firstName: 'Chris',
      password: 'foo'
    }

    user.create(pkg, function(err, res) {

      auth.authorize(res.id, res.token, function(err, res2) {

        expect(res2).to.be.a('string')

        done()

      })

    })

  })

})
