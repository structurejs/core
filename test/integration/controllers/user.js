import {Res, next}     from '../../helpers/expressObjects'
import UserController  from '../../../controllers/users'
import {UserGenerator} from 'structure-test-helpers'

describe('Integration: Controllers: User', function() {

  it('should create a user', function(done) {

    var userController = new UserController()

    var req = {
      body: new UserGenerator()
    }

    var res = new Res()
    res.send = function(o) {
      expect(o).to.be.an('object')
      expect(o.pkg).to.be.an('object')

      done()

      return this
    }

    userController.create(req, res, next)

  })

  it('should get user by ID', function(done) {

    var userController = new UserController()

    var req = {
      body: new UserGenerator()
    }

    var res = new Res()
    res.send = function(o) {

      var req2 = {
        params: {
          id: o.pkg.id
        }
      }

      var res2 = new Res()
      res2.send = function(o2) {

        expect(o2).to.be.an('object')
        expect(o2.pkg).to.be.an('object')
        expect(o2.pkg.id).to.equal(o.pkg.id)

        done()

        return this
      }

      userController.get(req2, res2, next)

      return this
    }

    userController.create(req, res, next)

  })

  it('should update by ID', function(done) {

    var userController = new UserController()

    var req = {
      body: new UserGenerator()
    }

    var res = new Res()
    res.send = function(o) {

      var req2 = {
        body: {
          firstName: 'Christopher'
        },
        params: {
          id: o.pkg.id
        }
      }

      var res2 = new Res()
      res2.send = function(o2) {

        expect(o2).to.be.an('object')
        expect(o2.pkg).to.be.an('object')
        expect(o2.pkg.firstName).to.equal('Christopher')

        done()

        return this
      }

      userController.update(req2, res2, next)

      return this
    }

    userController.create(req, res, next)

  })

})
