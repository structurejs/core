import through2 from 'through2'

class StreamExtras {

  streamToString(stream) {

    var chunks = '',
        _this  = this

    this.use((next) => {

      stream
        .pipe(through2({objectMode: true, allowHalfOpen: false}, function streamChunkCallback(chunk, enc, t2cb) {

          chunks += chunk.toString()

          t2cb(null, chunks)
        }))
        .on('data', function onDataCallback(data) {
          //console.log('do we have something?', data)
        })
        .on('end', function onEndCallback() {

          _this.body = chunks
          next()

        })

    })

    return this

  }

}

StreamExtras.prototype.flowMethods = ['streamToString']

export default StreamExtras
