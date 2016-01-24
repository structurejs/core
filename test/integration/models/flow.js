import Model   from '../../../models/base'
import request from 'request'

describe('Integration: Models: Flow', function() {

  it('should save', function(done) {

    var model = new Model({table: 'foo'})

    model
      .flow({foo: 'bar'})
      .save()
      .on('end', function() {

        done()

      })

  })

  it('should get by id', function(done) {

    var model = new Model({table: 'foo'})

    model
      .flow({foo: 'bar'})
      .save()
      .get()
      .on('end', function(pkg) {

        expect(pkg.foo).to.equal('bar')

        done()

      })

  })

  it('should update by id', function(done) {

    var model = new Model({table: 'foo'})

    model
      .flow({foo: 'bar'})
      .save()

      // Just a random middlware to show that `body` changed value
      .use(function(pkg, next) {
        pkg.foo = 'baz'
        next(null, pkg)
      })
      .update()
      .on('end', function updateEndCallback(pkg) {

        expect(pkg.foo).to.equal('baz')

        done()

      })

  })

  it('should convert a stream to string', function(done) {
    this.timeout(10000)

    var model = new Model({table: 'foo'})

    model
      .flow()
      .streamToString(request.get('https://bitcoinwisdom.com'))
      .on('end', function(pkg) {

        expect(pkg).to.be.a('string')

        done()
      })

  })

  it('should scrape a string of HTML', function(done) {
    this.timeout(10000)

    var model = new Model({table: 'foo'})

    model
      .flow()
      .streamToString(request.get('https://bitcoinwisdom.com'))
      .scrape(function($) {

        return {
          price: {
            bitstamp: $('#market_bitstampbtcusd').text(),
            btce: $('#market_btcebtcusd').text(),
            bitfinex: $('#market_bitfinexbtcusd').text(),
            huobi: $('#market_huobibtccny .eprice').text().replace('/', ''),
            ltc: $('#market_btceltcusd').text()
          }
        }

      })
      .on('end', function(pkg) {

        expect(pkg).to.be.an('object')
        expect(pkg.price).to.be.an('object')

        done()
      })

  })

})
