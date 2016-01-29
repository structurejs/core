import AppService     from '../../../services/app'
import {AppGenerator} from 'structure-test-helpers'

describe('Integration: Services: App', function() {

  it('should create a app', function(done) {

    var appService = new AppService()

    var pkg = new AppGenerator()

    appService.create(pkg, function(err, res) {

      expect(res).to.be.an('object')
      expect(res.sid).to.be.a('string')

      done()

    })

  })

  it('should get by ID', function(done) {

    var appService = new AppService()

    var pkg = new AppGenerator()

    appService.create(pkg, function(err, res) {

      appService.get(res.id, (err, res2) => {

        expect(res2).to.be.an('object')
        expect(res2.id).to.equal(res.id)

        done()

      })

    })

  })

  it('should get by Short ID', function(done) {

    var appService = new AppService()

    var pkg = new AppGenerator()

    appService.create(pkg, function(err, res) {

      appService.getByShortId(res.sid, (err, res2) => {

        expect(res2).to.be.an('object')
        expect(res2.id).to.equal(res.id)

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var appService = new AppService()

    var pkg = new AppGenerator()

    var pkg2 = {
      title: 'TT2'
    }

    appService.create(pkg, function(err, res) {

      appService.update(res.id, pkg2, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.title).to.equal('TT2')

        done()

      })

    })

  })

  it('should update by Short ID', function(done) {

    var appService = new AppService()

    var pkg = new AppGenerator()

    var pkg2 = {
      title: 'TT2'
    }

    appService.create(pkg, function(err, res) {

      appService.updateByShortId(res.sid, pkg2, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.title).to.equal('TT2')

        done()

      })

    })

  })

})
