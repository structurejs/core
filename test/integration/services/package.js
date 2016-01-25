import PackageService from '../../../services/package'

describe('Integration: Services: Package', function() {

  it('should package an object for response (200), using defaults', function(done) {

    const packageService = new PackageService()
    let res = packageService.success({foo: 'bar'})

    expect(res.pkg).to.be.an('object')
    expect(res.pkg.foo).to.equal('bar')
    expect(res.status).to.equal(200)

    done()

  })

  it('should package an object for response (201), using number argument', function(done) {

    const packageService = new PackageService()
    let res = packageService.success({foo: 'bar'}, 201)

    expect(res.pkg).to.be.an('object')
    expect(res.pkg.foo).to.equal('bar')
    expect(res.status).to.equal(201)

    done()

  })

  it('should package an object for response (400), using object argument', function(done) {

    const packageService = new PackageService()
    let res = packageService.error({foo: 'bar'}, 400)

    expect(res.err).to.be.an('object')
    expect(res.status).to.equal(400)

    done()

  })

})
