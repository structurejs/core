class PackageService {

  constructor() {

  }

  error(o = {}, options) {
    var status = 400

    if(typeof options == 'number') status = options
    if(typeof options == 'object') {
      status = options.status || status
    }

    return {
      err: {},
      status
    }

  }

  success(o = {}, options) {
    var status = 200

    if(typeof options == 'number') status = options
    if(typeof options == 'object') {
      status = options.status || status
    }

    return {
      pkg: o,
      status
    }

  }

}

export default PackageService
