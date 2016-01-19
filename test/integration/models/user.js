import UserModel from '../../../models/user'

describe('Integration: Model: User', function() {

  it('should create a user', function(done) {

    var user = new UserModel()

    user.create({
      firstName: 'Chris'
    }, function(err, res) {

      expect(res.firstName).to.equal('Chris')

      done()

    })

  })

  it('should find a user by id', function(done) {

    var user = new UserModel()

    user.create({
      firstName: 'Chris'
    }, function(err, res) {

      var user2 = new UserModel()
      user2.findOne(res.id, function(err2, res2) {

        expect(res2.firstName).to.equal('Chris')

        done()

      })

    })

  })

})
