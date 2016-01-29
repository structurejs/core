import {Res, next}         from '../../helpers/expressObjects'
import AppController  from '../../../controllers/apps'
import {AppGenerator} from 'structure-test-helpers'

describe('Integration: Controllers: App', function() {

  it('should create a app', function(done) {

    var appController = new AppController()

    var req = {
      body: new AppGenerator()
    }

    var res = new Res()
    res.send = function(o) {

      expect(o).to.be.an('object')
      expect(o.pkg).to.be.an('object')
      expect(o.pkg.sid).to.be.a('string')

      done()

      return this
    }

    appController.create(req, res, next)

  })

  it('should get a app by Short ID', function(done) {

    var appController = new AppController()

    var req = {
      body: new AppGenerator()
    }

    var res = new Res()
    res.send = function(o) {

      var req2 = {
        params: {
          sid: o.pkg.sid
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

      appController.get(req2, res2, next)

      return this
    }

    appController.create(req, res, next)

  })

  it('should update a app by Short ID', function(done) {

    var appController = new AppController()

    var req = {
      body: new AppGenerator()
    }

    var pkg2 = {
      title: 'TT2'
    }

    var res = new Res()
    res.send = function(o) {

      var req2 = {
        body: pkg2,
        params: {
          sid: o.pkg.sid
        }
      }

      var res2 = new Res()
      res2.send = function(o2) {

        expect(o2).to.be.an('object')
        expect(o2.pkg).to.be.an('object')
        expect(o2.pkg.title).to.equal('TT2')

        done()

        return this
      }

      appController.update(req2, res2, next)

      return this
    }

    appController.create(req, res, next)

  })

})
