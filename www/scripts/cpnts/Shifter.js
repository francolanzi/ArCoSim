import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Config from '../modal/Shifter/Config.js';

class Shifter extends Component {
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

  get count() {
    return this._functions.length;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._functions = [];

    this._input = this.addInput('Entrada', 37.5, 0);
    this._function = this.addInput('Función', 75, 13.5);

    this._result = this.addOutput('Resultado', 37.5, 27);

    this.addFunction(0, 0);
    this.addFunction(2, 1);
    this.addFunction(1, 1);
  }

  run() {
    const { func, value } = this._functions[this._function.value];

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

  serialize() {
    const cpnt = super.serialize();
    cpnt.functions = [...this._functions];
    return cpnt;
  }

  deserialize(obj) {
    if (obj.functions) {
      this._functions = [...obj.functions];
    }
  }

  addFunction(func, value) {
    this._functions.push({ func, value });
    return this._functions.length - 1;
  }

  getFunction(index) {
    const func = this._functions[index];
    if (func !== undefined) {
      return { ...func };
    } else {
      return undefined;
    }
  }

  setFunction(index, func, value) {
    if (index >= 0 && index < this._functions.length) {
      this._functions[index].func = func;
      this._functions[index].value = value;
    }
  }

  removeFunction() {
    if (this._functions.length > 1) {
      this._functions.pop();
    }
    return this._functions.length;
  }
}

class ShifterItem extends CpntItem {
  get type() {
    return 'Shifter';
  }

  get image() {
    return 'images/cpnt/Shifter.svg';
  }

  get width() {
    return 76;
  }

  get height() {
    return 28;
  }

  cpnt(top, left) {
    return new Shifter(this, top, left);
  }
}

customElements.define('cpnt-shifter', Shifter);
customElements.define('cpnt-item-shifter', ShifterItem);

export default ShifterItem;
