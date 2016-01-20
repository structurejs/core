import UserModel from '../../../models/user'

describe('Integration: Model: User', function() {

  it('should create a user', function(done) {

    var user = new UserModel()

    user.create({
      firstName: 'Chris'
    }, function(err, res) {

      expect(res.firstName).to.equal('Chris')
      expect(res.status).to.equal('active')

      done()

    })

  })

  it('should find a user by id', function(done) {

    var user = new UserModel()

    user.create({
      firstName: 'Chris'
    }, function(err, res) {

      user.findOne(res.id, function(err2, res2) {

        expect(res2.firstName).to.equal('Chris')

        done()

      })

    })

  })

  it('should find user where..', function(done) {

    var user = new UserModel(),
        firstName = 'Chris' + new Date()

    user.create({
      firstName
    }, function(err, res) {

      user.findAll({firstName}, function(err2, res2) {

        expect(res2).to.be.an('array')
        expect(res2.length).to.equal(1)
        expect(res2[0].status).to.equal('active')

        done()

      })

    })

  })

  it.skip('should find all users', function(done) {
    this.timeout(10000)

    var user = new UserModel()

    user.create({
      firstName: 'Chris'
    }, function(err, res) {

      user.findAll(function(err2, res2) {

        expect(res2).to.be.an('array')

        done()

      })

    })

  })

  it('should update a user', function(done) {

    var user = new UserModel(),
        firstName = 'Chris' + new Date()

    user.create({
      firstName
    }, function(err, res) {

      var firstName2 = 'Foo' + new Date()
      user.update(res.id, {firstName: firstName2}, function(err2, res2) {

        expect(res2.firstName).to.equal(firstName2)

        done()

      })

    })

  })

  it('should delete a user', function(done) {

    var user = new UserModel(),
        firstName = 'Chris' + new Date()

        user.create({
          firstName
        }, function(err, res) {

          user.delete(res.id, function(err2, res2) {

            expect(res2.status).to.equal('deleted')

            done()

          })

        })

  })

})
