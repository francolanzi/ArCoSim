const CpntOriginal = require('../CpntOriginal');
const CpntInstance = require('../CpntInstance');

const type = 'MicroSequenceLogic';
const imageFile = 'img/cpnt/MicroSequenceLogic.png';

class MicroSequenceLogicInstance extends CpntInstance {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  get cpnt() {
    return super.cpnt;
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Condition', 61, 20.5);
    this.addInput('Control', 0, 20.5);

    this.addOutput('Jump', 30.5, 0);
  }
}

class MicroSequenceLogicOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return MicroSequenceLogicInstance;
  }
}

customElements.define('micro-sequence-logic-instance', MicroSequenceLogicInstance);
customElements.define('micro-sequence-logic-original', MicroSequenceLogicOriginal);

module.exports = MicroSequenceLogicOriginal;
