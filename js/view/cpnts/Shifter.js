const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Shifter';
const imageFile = 'img/cpnt/Shifter.png';

class ShifterInstance extends CpntInstance {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  get cpnt() {
    return super.cpnt;
  }

  set cpnt(cpnt) {
    super.cpnt = cpnt;

    this.addInput('Input', 37.5, 0);
    this.addInput('Function', 75, 13.5);

    this.addOutput('Result', 37.5, 27);
  }
}

class ShifterOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return ShifterInstance;
  }
}

customElements.define('shifter-instance', ShifterInstance);
customElements.define('shifter-original', ShifterOriginal);

module.exports = ShifterOriginal;
