import App            from '../../../models/app'
import {AppGenerator} from 'structure-test-helpers'

describe('Integration: Models: App', function() {

  it('should create a app', function(done) {

    var app = new App()

    var pkg = new AppGenerator()

    app.create(pkg, function(err, res) {

      expect(res).to.be.an('object')

      done()

    })

  })

  it('should get by ID', function(done) {

    var app = new App()

    var pkg = new AppGenerator()

    app.create(pkg, function(err, res) {

      app.get(res.id, (err2, res2) => {

        expect(res).to.be.an('object')
        expect(res.id).to.equal(res2.id)

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var app = new App()

    var pkg = new AppGenerator()

    app.create(pkg, function(err, res) {

      var pkg2 = {
        title: 'TT2'
      }

      app.update(res.id, pkg2, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.title).to.equal('TT2')

        done()

      })

    })

  })

})
