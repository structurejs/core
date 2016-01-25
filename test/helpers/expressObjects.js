var req = {
  body: {},
  params: {}
}

class Res {

  end() {
    return this
  }

  send() {
    return this
  }

  status() {
    return this
  }

}

function next() {return this}

export {req}
export {Res}
export {next}
