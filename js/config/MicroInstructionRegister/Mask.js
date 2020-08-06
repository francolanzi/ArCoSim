const MaskName = require('./MaskName');
const UintInput = require('../UintInput');
const SVGButton = require('../SVGButton');

class MicroInstructionRegisterMask extends HTMLElement {
  get position() {
    const childs = [...this.parentNode.childNodes];
    return childs.length - childs.indexOf(this) - 1;
  }

  get name() {
    return this._maskName.value;
  }

  get size() {
    return parseInt(this._maskSize.value);
  }

  constructor(name, size) {
    super();

    this._maskName = new MaskName(name);
    this._maskSize = new UintInput(size, 1, 32, true);

    const addBefore = new SVGButton('img/modal/plus.svg');
    const addAfter = new SVGButton('img/modal/plus.svg');
    const remove = new SVGButton('img/modal/minus.svg');

    this.append(addBefore);
    this.append(this._maskName);
    this.append(this._maskSize);
    this.append(remove);
    this.append(addAfter);

    addBefore.addEventListener('click', () =>
      this.dispatchEvent(new Event('addbefore')));

    addAfter.addEventListener('click', () =>
      this.dispatchEvent(new Event('addafter')));

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-mir-mask', MicroInstructionRegisterMask);

module.exports = MicroInstructionRegisterMask;
