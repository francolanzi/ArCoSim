import Component from '../Component.js';
import Config from '../modal/ArithmeticLogicUnit/Config.js';

class ArithmeticLogicUnit extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/ArithmeticLogicUnit.svg',
      width: 81,
      height: 45,
    };
  }

  get config() {
    return new Config(this);
  }

  static get supported() {
    if (!this._supported) {
      this._supported = [];
      this._supported[0] = 'A + B';
      this._supported[1] = 'A - B';
      this._supported[2] = 'A * B';
      this._supported[3] = 'A / B';
      this._supported[4] = 'A & B';
      this._supported[5] = 'A | B';
      this._supported[6] = 'A ^ B';
      this._supported[7] = 'A';
      this._supported[8] = 'B';
      this._supported[9] = '~ A';
      this._supported[10] = '~ B';
    }
    return [...this._supported];
  }

  get functions() {
    return this._functions.entries();
  }

  get functionCount() {
    return this._functions.size;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._functions = new Map();

    this._inputA = this.addInput('A', 11.5, 0);
    this._inputB = this.addInput('B', 69, 0);
    this._function = this.addInput('Función', 70, 33);

    this._result = this.addOutput('Resultado', 40, 44);
    this._controlN = this.addOutput('N', 77, 11);
    this._controlZ = this.addOutput('Z', 74, 22);

    this.setFunction(0, 0);
    this.setFunction(1, 4);
    this.setFunction(2, 7);
    this.setFunction(3, 9);
  }

  run() {
    switch(this._functions.get(this._function.value)) {
    case 0:
      this._result.value = this._inputA.value + this._inputB.value;
      break;
    case 1:
      this._result.value = this._inputA.value - this._inputB.value;
      break;
    case 2:
      this._result.value = this._inputA.value * this._inputB.value;
      break;
    case 3:
      this._result.value = this._inputA.value / this._inputB.value;
      break;
    case 4:
      this._result.value = this._inputA.value & this._inputB.value;
      break;
    case 5:
      this._result.value = this._inputA.value | this._inputB.value;
      break;
    case 6:
      this._result.value = this._inputA.value ^ this._inputB.value;
      break;
    case 7:
      this._result.value = this._inputA.value;
      break;
    case 8:
      this._result.value = this._inputB.value;
      break;
    case 9:
      this._result.value = ~ this._inputA.value;
      break;
    case 10:
      this._result.value = ~ this._inputB.value;
      break;
    default:
      break;
    }

    this._controlN.value = (this._result.value < 0) ? 1 : 0;
    this._controlZ.value = (this._result.value === 0) ? 1 : 0;

    return super.run();
  }

  getFunction(index) {
    return this._functions.get(index);
  }

  setFunction(index, func) {
    this._functions.set(index, func);
  }

  removeFunction(index) {
    this._functions.delete(index);
  }
}

customElements.define('cpnt-alu', ArithmeticLogicUnit);

export default ArithmeticLogicUnit;
