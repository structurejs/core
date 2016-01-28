import {Res, next}         from '../../helpers/expressObjects'
import TemplateController  from '../../../controllers/templates'
import {TemplateGenerator} from 'structure-test-helpers'

describe.only('Integration: Controllers: Template', function() {

  it('should create a template', function(done) {

    var templateController = new TemplateController()

    var req = {
      body: new TemplateGenerator()
    }

    var res = new Res()
    res.send = function(o) {

      expect(o).to.be.an('object')
      expect(o.pkg).to.be.an('object')
      expect(o.pkg.sid).to.be.a('string')

      done()

      return this
    }

    templateController.create(req, res, next)

  })

  it('should get a template by Short ID', function(done) {

    var templateController = new TemplateController()

    var req = {
      body: new TemplateGenerator()
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

      templateController.get(req2, res2, next)

      return this
    }

    templateController.create(req, res, next)

  })

  it('should update a template by Short ID', function(done) {

    var templateController = new TemplateController()

    var req = {
      body: new TemplateGenerator()
    }

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
        expect(o2.pkg.fields[1].type).to.equal('text-input')

        done()

        return this
      }

      templateController.update(req2, res2, next)

      return this
    }

    templateController.create(req, res, next)

  })

})
