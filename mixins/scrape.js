import cheerio from 'cheerio'

class Scrape {

  scrape(operations) {
    var _this = this

    this.use((pkg, next) => {

      try {
        var $ = cheerio.load(pkg)
        pkg = operations.call(_this, $)

        next(null, pkg)
      }
      catch(e) {
        next(e)
      }

    })

    return this

  }

}

Scrape.prototype.flowMethods = ['scrape']

export default Scrape
