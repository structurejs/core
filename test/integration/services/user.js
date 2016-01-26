import User            from '../../../models/user'
import {UserGenerator} from 'structure-test-helpers'
import UserService     from '../../../services/user'

describe('Integration: Services: User', function() {

  it('should create a user', function(done) {
    //this.timeout(10000)

    var userService = new UserService()

    var pkg = new UserGenerator()

    userService.create(pkg, function(err, res) {

      expect(res).to.be.an('object')
      expect(res.hash).to.be.a('string')
      expect(res.token).to.be.a('string')

      done()

    })

  })

  it('should get by ID', function(done) {

    var userService = new UserService()

    var pkg = new UserGenerator()

    userService.create(pkg, function(err, res) {

      userService.get(res.id, (err, res2) => {

        expect(res2).to.be.an('object')
        expect(res2.id).to.equal(res.id)
        expect(res2.hash).to.be.a('string')

        done()

      })

    })

  })

  it('should get by username', function(done) {

    var userService = new UserService()

    var pkg = new UserGenerator()

    userService.create(pkg, function(err, res) {

      userService.get(res.id, (err, res2) => {

        expect(res2).to.be.an('object')
        expect(res2.id).to.equal(res.id)
        expect(res2.hash).to.be.a('string')

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var userService = new UserService()

    var pkg = new UserGenerator()

    userService.create(pkg, function(err, res) {

      userService.update(res.id, {firstName: 'Christopher'}, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.firstName).to.equal('Christopher')

        done()

      })

    })

  })

})
