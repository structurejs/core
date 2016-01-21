import winston from 'winston'

class Log {

  log(str = '') {

    this.use((next) => {

      console.log(this.body)
      //winston.log('debug', this.body)
      next()

    })

    return this

  }

}

export default Log
