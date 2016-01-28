import Template            from '../../../models/template'
import {TemplateGenerator} from 'structure-test-helpers'

describe('Integration: Models: Template', function() {

  it('should create a template', function(done) {

    var template = new Template()

    var pkg = new TemplateGenerator()

    template.create(pkg, function(err, res) {

      expect(res).to.be.an('object')

      done()

    })

  })

  it('should get by ID', function(done) {

    var template = new Template()

    var pkg = new TemplateGenerator()

    template.create(pkg, function(err, res) {

      template.get(res.id, (err2, res2) => {

        expect(res).to.be.an('object')
        expect(res.id).to.equal(res2.id)

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var template = new Template()

    var pkg = new TemplateGenerator()

    template.create(pkg, function(err, res) {

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

      template.update(res.id, pkg2, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.fields[1].type).to.equal('text-input')

        done()

      })

    })

  })

})
