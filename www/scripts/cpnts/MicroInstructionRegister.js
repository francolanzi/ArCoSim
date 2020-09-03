import Component from '../Component.js';
import Config from '../modal/MicroInstructionRegister/Config.js';

class MicroInstructionRegister extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/MicroInstructionRegister.svg',
      width: 330,
      height: 43,
    };
  }

  get config() {
    return new Config(this);
  }

  get count() {
    return this._masks.length;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._masks = [];

    this._instruction = this.addInput('Instrucción', 164.5, 0);
    this._clock = this.addInput('Clock', 0, 21);

    this._clock.default = 1;

    this.addMask('', 1);
  }

  run() {
    if (this._clock.value) {
      let bits = 0;

      this._masks.forEach(mask => {
        let value = -1 >>> (32 - mask.size);
        value &= this._instruction.value >>> bits;
        mask.output.value = value;
        bits += mask.size;
      });
    }

    return super.run();
  }

  serialize() {
    const cpnt = super.serialize();
    cpnt.masks = this._masks.map(mask => {
      return {
        name: mask.output.name,
        size: mask.size,
      };
    });
    return cpnt;
  }

  deserialize(obj) {
    if (obj.masks) {
      this._masks = [];
      obj.masks.forEach(({ name, size }) =>
        this.addMask(name, size));
    }
  }

  addMask(name, size) {
    const output = this.addOutput(name, 0, 42);
    this._masks.push({ output, size });
    this.makeMasks();
    return this._masks.length - 1;
  }

  getMask(index) {
    const mask = this._masks[index];
    if (!mask) {
      return undefined;
    } else {
      const name = mask.output.name;
      const size = mask.size;
      return { name, size };
    }
  }

  setMask(index, name, size) {
    if (index >= 0 && index < this._masks.length) {
      const mask = this._masks[index];
      mask.output.name = name;
      mask.size = size;
      this.makeMasks();
    }
  }

  removeMask() {
    if (this._masks.length > 1) {
      const mask = this._masks.pop();
      this.removeOutput(mask.output.id);
      this.makeMasks();
    }
    return this._masks.length;
  }

  makeMasks() {
    const space = 329 / (this._masks.length + 1);

    let x = 329;
    this._masks.forEach(mask => {
      x -= space;
      mask.output.x = x;
    });
  }
}

customElements.define('cpnt-mir', MicroInstructionRegister);

export default MicroInstructionRegister;
