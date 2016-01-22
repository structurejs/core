import Model from '../../../models/base'

describe('Integration: Models: Base', function() {

  it('should connect to the database', function(done) {

    var model = new Model()

    model.connect((err, connection) => {

      expect(connection).to.be.an('object')

      connection.close()

      done()

    })

  })

  it('should create a table (if non-existant)', function(done) {

    var model = new Model({table: 'foo'})

    done()

  })

  it.skip('should query the database', function(done) {

    var model = new Model()

    model.query( (r) => r.table('foo'), (err, res) => {

      expect(res).to.be.an('array')

      done()

    })

  })

  it('should create', function(done) {

    var model = new Model({table: 'foo'})

    model._create({foo: 'bar'}, function(err, res) {

      expect(res).to.be.an('object')

      done()

    })

  })

  it('should get by ID', function(done) {

    var model = new Model({table: 'foo'})

    model._create({foo: 'bar'}, function(err, res) {

      model._get(res.id, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.id).to.equal(model.id)

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var model = new Model({table: 'foo'})

    model._create({foo: 'bar'}, function(err, res) {

      model._update(res.id, {foo: 'baz'}, (err, res) => {

        expect(res).to.be.an('object')
        expect(res.foo).to.equal('baz')

        done()

      })

    })

  })

})
