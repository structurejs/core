import {Res, next}         from '../../helpers/expressObjects'
import OrganizationController  from '../../../controllers/organizations'
import {OrganizationGenerator} from 'structure-test-helpers'

describe('Integration: Controllers: Organization', function() {

  it('should create a organization', function(done) {

    var organizationController = new OrganizationController()

    var req = {
      body: new OrganizationGenerator()
    }

    var res = new Res()
    res.send = function(o) {

      expect(o).to.be.an('object')
      expect(o.pkg).to.be.an('object')
      expect(o.pkg.sid).to.be.a('string')

      done()

      return this
    }

    organizationController.create(req, res, next)

  })

  it('should get a organization by Short ID', function(done) {

    var organizationController = new OrganizationController()

    var req = {
      body: new OrganizationGenerator()
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

      organizationController.get(req2, res2, next)

      return this
    }

    organizationController.create(req, res, next)

  })

  it('should update a organization by Short ID', function(done) {

    var organizationController = new OrganizationController()

    var req = {
      body: new OrganizationGenerator()
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

      organizationController.update(req2, res2, next)

      return this
    }

    organizationController.create(req, res, next)

  })

})
