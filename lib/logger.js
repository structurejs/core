import chalk   from 'chalk'
import winston from 'winston'

var logger = new winston.Logger({

  transports:[
    new winston.transports.Console({
      colorize: true,
      level: process.env.LOG_LEVEL
    })
  ]

})

export {chalk}
export {logger}
