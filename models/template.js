import async           from 'async'
import {chalk, logger} from '../lib/logger'
import Model           from './base'

class TemplateModel extends Model {

  constructor(options = {}) {
    super(options = {})
  }

  create() {
    super._create.apply(this, arguments)
  }

  get() {
    super._get.apply(this, arguments)
  }

  update() {
    super._update.apply(this, arguments)
  }

}

TemplateModel.prototype.table = 'templates'

export default TemplateModel
