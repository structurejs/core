import User            from '../../../models/user'
import {UserGenerator} from 'structure-test-helpers'

describe('Integration: Models: User', function() {

  it('should create a user', function(done) {
    //this.timeout(10000)

    var user = new User()

    var pkg = new UserGenerator()

    user.create(pkg, function(err, res) {

      expect(res).to.be.an('object')

      done()

    })

  })

  it('should get by ID', function(done) {

    var user = new User()

    var pkg = new UserGenerator()

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

    var pkg = new UserGenerator()

    user.create(pkg, function(err, res) {

      user.update(res.id, {firstName: 'Christopher'}, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.firstName).to.equal('Christopher')

        done()

      })

    })

  })

  it('should get by username', function(done) {

    var user = new User()

    var pkg = new UserGenerator()

    user.create(pkg, function(err, res) {

      user.getByUsername(pkg.username, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.id).to.equal(user.id)

        done()

      })

    })

  })

})
