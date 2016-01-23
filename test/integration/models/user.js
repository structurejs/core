import User from '../../../models/user'

describe('Integration: Models: User', function() {

  it('should create a user', function(done) {
    //this.timeout(10000)

    var user = new User()

    var pkg = {
      firstName: 'Chris',
      password: 'foo'
    }

    user.create(pkg, function(err, res) {

      expect(res).to.be.an('object')
      expect(res.hash).to.be.a('string')
      expect(res.token).to.be.a('string')

      done()

    })

  })

  it('should get by ID', function(done) {

    var user = new User()

    var pkg = {
      firstName: 'Chris',
      password: 'foo'
    }

    user.create(pkg, function(err, res) {

      user.get(res.id, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.id).to.equal(user.id)

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var user = new User()

    var pkg = {
      firstName: 'Chris',
      password: 'foo'
    }

    user.create(pkg, function(err, res) {

      user.update(res.id, {firstName: 'Christopher'}, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.firstName).to.equal('Christopher')

        done()

      })

    })

  })

})
