import OrganizationService     from '../../../services/organization'
import {OrganizationGenerator} from 'structure-test-helpers'

describe('Integration: Services: Organization', function() {

  it('should create a organization', function(done) {

    var organizationService = new OrganizationService()

    var pkg = new OrganizationGenerator()

    organizationService.create(pkg, function(err, res) {

      expect(res).to.be.an('object')
      expect(res.sid).to.be.a('string')

      done()

    })

  })

  it('should get by ID', function(done) {

    var organizationService = new OrganizationService()

    var pkg = new OrganizationGenerator()

    organizationService.create(pkg, function(err, res) {

      organizationService.get(res.id, (err, res2) => {

        expect(res2).to.be.an('object')
        expect(res2.id).to.equal(res.id)

        done()

      })

    })

  })

  it('should get by Short ID', function(done) {

    var organizationService = new OrganizationService()

    var pkg = new OrganizationGenerator()

    organizationService.create(pkg, function(err, res) {

      organizationService.getByShortId(res.sid, (err, res2) => {

        expect(res2).to.be.an('object')
        expect(res2.id).to.equal(res.id)

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var organizationService = new OrganizationService()

    var pkg = new OrganizationGenerator()

    var pkg2 = {
      title: 'TT2'
    }

    organizationService.create(pkg, function(err, res) {

      organizationService.update(res.id, pkg2, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.title).to.equal('TT2')

        done()

      })

    })

  })

  it('should update by Short ID', function(done) {

    var organizationService = new OrganizationService()

    var pkg = new OrganizationGenerator()

    var pkg2 = {
      title: 'TT2'
    }

    organizationService.create(pkg, function(err, res) {

      organizationService.updateByShortId(res.sid, pkg2, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.title).to.equal('TT2')

        done()

      })

    })

  })

})
