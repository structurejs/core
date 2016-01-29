import Organization            from '../../../models/organization'
import {OrganizationGenerator} from 'structure-test-helpers'

describe('Integration: Models: Organization', function() {

  it('should create a organization', function(done) {

    var organization = new Organization()

    var pkg = new OrganizationGenerator()

    organization.create(pkg, function(err, res) {

      expect(res).to.be.an('object')

      done()

    })

  })

  it('should get by ID', function(done) {

    var organization = new Organization()

    var pkg = new OrganizationGenerator()

    organization.create(pkg, function(err, res) {

      organization.get(res.id, (err2, res2) => {

        expect(res).to.be.an('object')
        expect(res.id).to.equal(res2.id)

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var organization = new Organization()

    var pkg = new OrganizationGenerator()

    organization.create(pkg, function(err, res) {

      var pkg2 = {
        title: 'TT2'
      }

      organization.update(res.id, pkg2, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.title).to.equal('TT2')

        done()

      })

    })

  })

})
