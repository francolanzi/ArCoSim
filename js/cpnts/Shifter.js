const Component = require('../Component');
const Config = require('../config/Shifter');

class Shifter extends Component {
  static get imageFile() {
    return 'img/cpnt/Shifter.png';
  }

  get config() {
    return new Config(this);
  }

  static get supported() {
    if (!this._supported) {
      this._supported = [];
      this._supported[0] = 'Nada';
      this._supported[1] = '<<';
      this._supported[2] = '>>';
      this._supported[3] = '>>>';
    }
    return [...this._supported];
  }

  get functions() {
    return this._functions.entries();
  }

  get functionCount() {
    return this._functions.size;
  }

  constructor(top, left) {
    super(top, left);

    this._functions = new Map();

    this._input = this.addInput('Input', 37.5, 0);
    this._function = this.addInput('Function', 75, 13.5);

    this._result = this.addOutput('Result', 37.5, 27);

    this.setFunction(0, 0, 0);
    this.setFunction(1, 2, 1);
    this.setFunction(2, 1, 1);
  }

  run() {
    const { func, value } = this._functions.get(this._function.value);

    switch(func) {
    case 0:
      this._result.value = this._input.value;
      break;
    case 1:
      this._result.value = this._input.value << value;
      break;
    case 2:
      this._result.value = this._input.value >> value;
      break;
    case 3:
      this._result.value = this._input.value >>> value;
      break;
    default:
      break;
    }

    return super.run();
  }

  getFunction(index) {
    return { ...this._functions.get(index) };
  }

  setFunction(index, func, value) {
    this._functions.set(index, { func, value });
  }

  removeFunction(index) {
    this._functions.delete(index);
  }
}

customElements.define('cpnt-shifter', Shifter);

module.exports = Shifter;
