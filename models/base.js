import {adapter, store} from '../lib/store'

class BaseModel {

  constructor() {
    this.adapter = adapter
    this.store   = store

    // If the resource has not previously been created
    if(this.resourceName && !this.store.definitions[this.resourceName]) {
      this.resource = this.createResource()
    }

    else {
      this.resource = this.store.definitions[this.resourceName]
    }
  }

  createResource() {
    return this.store.defineResource(this.defineResource())
  }

  defineResource() {}

}

export default BaseModel
