import {Res, next}    from '../../helpers/expressObjects'
import AuthController from '../../../controllers/auth'
import UserController from '../../../controllers/users'
import UserGenerator  from '../../helpers/userGenerator'

describe('Integration: Controllers: Auth', function() {

  it.only('should login a user', function(done) {

    var authController = new AuthController(),
        userController = new UserController()

    var req = {
      body: new UserGenerator()
    }

    var res = new Res()
    res.send = function(o) {

      var req2 = {
        body: {
          hash: o.pkg.hash,
          password: req.body.password,
          username: o.pkg.username
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

      authController.login(req2, res2, next)

      return this
    }

    userController.create(req, res, next)

  })

})
