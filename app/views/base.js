import Dragon    from 'dragon.js'
import RefsMixin from './mixins/refs'

class BaseView extends Dragon.View {

  constructor(options = {}) {
    super(options)
  }

}

BaseView.prototype.mixin(RefsMixin)

export default BaseView
