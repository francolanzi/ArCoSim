import UintInput from '../UintInput.js';
import ImgButton from '../ImgButton.js';
import CustomSelect from '../CustomSelect.js';

class ShifterFunc extends HTMLElement {
  get position() {
    const childs = this.parentNode.childNodes;
    return Array.prototype.indexOf.call(childs, this) - 1;
  }

  get index() {
    return parseInt(this._index.value);
  }

  set index(index) {
    this._index.value = index;
  }

  get func() {
    return parseInt(this._func.value);
  }

  get value() {
    return parseInt(this._value.value);
  }

  constructor(index, func, value, supported) {
    super();

    this._index = new UintInput(index, 0, 0xFFFFFFFF, false);
    this._func = new CustomSelect(func, supported);
    this._value = new UintInput(value, 0, 32, true);

    const remove = new ImgButton('images/modal/minus.svg');

    this.append(this._index);
    this.append(this._func);
    this.append(this._value);
    this.append(remove);

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-shifter-func', ShifterFunc);

export default ShifterFunc;
