import Boot from '../../models/boot'

describe('Integration: Models: Boot', function() {

  it('should create tables on boot', function(done) {

    var boot = new Boot()

    boot.createTables( () => {

      done()

    })

  })

})
