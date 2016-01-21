import cheerio from 'cheerio'

class Scrape {

  scrape(operations) {
    var _this = this

    this.use((next) => {

      var $ = cheerio.load(_this.body)
      _this.body = operations.call(_this, $)

      next()

    })

    return this

  }

}

Scrape.prototype.flowMethods = ['scrape']

export default Scrape
