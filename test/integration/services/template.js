import TemplateService     from '../../../services/template'
import {TemplateGenerator} from 'structure-test-helpers'

describe('Integration: Services: Template', function() {

  it('should create a template', function(done) {

    var templateService = new TemplateService()

    var pkg = new TemplateGenerator()

    templateService.create(pkg, function(err, res) {

      expect(res).to.be.an('object')
      expect(res.sid).to.be.a('string')

      done()

    })

  })

  it('should get by ID', function(done) {

    var templateService = new TemplateService()

    var pkg = new TemplateGenerator()

    templateService.create(pkg, function(err, res) {

      templateService.get(res.id, (err, res2) => {

        expect(res2).to.be.an('object')
        expect(res2.id).to.equal(res.id)

        done()

      })

    })

  })

  it('should get by Short ID', function(done) {

    var templateService = new TemplateService()

    var pkg = new TemplateGenerator()

    templateService.create(pkg, function(err, res) {

      templateService.getByShortId(res.sid, (err, res2) => {

        expect(res2).to.be.an('object')
        expect(res2.id).to.equal(res.id)

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var templateService = new TemplateService()

    var pkg = new TemplateGenerator()

    var pkg2 = {
      fields: [
        {
          title: 'Field 01',
          type: 'text-input'
        },
        {
          title: 'Field 02',
          type: 'text-input'
        },
      ]
    }

    templateService.create(pkg, function(err, res) {

      templateService.update(res.id, pkg2, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.fields[1].type).to.equal('text-input')

        done()

      })

    })

  })

  it('should update by Short ID', function(done) {

    var templateService = new TemplateService()

    var pkg = new TemplateGenerator()

    var pkg2 = {
      fields: [
        {
          title: 'Field 01',
          type: 'text-input'
        },
        {
          title: 'Field 02',
          type: 'text-input'
        },
      ]
    }

    templateService.create(pkg, function(err, res) {

      templateService.updateByShortId(res.sid, pkg2, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.fields[1].type).to.equal('text-input')

        done()

      })

    })

  })

})
