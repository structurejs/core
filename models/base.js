import {adapter, store} from '../lib/store'

class BaseModel {

  constructor() {
    this.adapter = adapter
    this.store   = store

    this.resource = this.createResource()
  }

  createResource() {
    return this.store.defineResource(this.defineResource())
  }

  defineResource() {}

}

export default BaseModel
