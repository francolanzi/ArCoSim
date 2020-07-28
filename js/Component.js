const CpntItem = require('./CpntItem');
const Input = require('./io/Input');
const Output = require('./io/Output');

class Component extends HTMLElement {
  static get type() {
    return this.name;
  }

  static get imageFile() {
    throw new Error('imageFile static property must be overrided');
  }

  static getItem() {
    return new CpntItem(this, this.imageFile);
  }

  get id() {
    return this._id;
  }

  get top() {
    return this._top;
  }

  get left() {
    return this._left;
  }

  get trash() {
    return this._trash;
  }

  set trash(trash) {
    this._trash = trash;
  }

  get showIO() {
    return this._showIO;
  }

  set showIO(show) {
    this._showIO = show;
    this._inputs.forEach(input => input.show = show);
    this._outputs.forEach(input => input.show = show);
  }

  get inputs() {
    return this._inputs.values();
  }

  get outputs() {
    return this._outputs.values();
  }

  // eslint-disable-next-line class-methods-use-this
  get config() {
    throw new Error('config property must be overrided');
  }

  constructor(top, left) {
    super();

    if (this.constructor === Component) {
      throw new Error('Component class can not be instantiated');
    }

    if (!this.constructor._count) {
      this.constructor._count = new Map();
    }

    const count = this.constructor._count.get(this.constructor.name);
    this._id = count ? count + 1 : 1;
    this.constructor._count.set(this.constructor.name, this._id);

    this.classList.add('component');

    this.style.top = `${top}px`;
    this.style.left = `${left}px`;

    this._top = top;
    this._left = left;

    this._showIO = false;

    this._inputs = new Map();
    this._outputs = new Map();

    this._mouse = { x: 0, y: 0 };

    this._move = ev => this.move(ev);
    this._drop = ev => this.drop(ev);

    const image = new Image();
    image.src = this.constructor.imageFile;
    this.appendChild(image);

    image.addEventListener('mousedown', ev => this.drag(ev));
    image.addEventListener('dblclick', () => this.dispatchEvent(new Event('config')));
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  receive(name, value) {
    throw new Error('receive method must be overrided');
  }

  drag(ev) {
    const rect = this.getBoundingClientRect();

    this._mouse.x = ev.clientX - rect.left;
    this._mouse.y = ev.clientY - rect.top;

    document.addEventListener('mousemove', this._move);
    document.addEventListener('mouseup', this._drop);

    this.classList.add('dragging');

    this._inputs.forEach(input => input.show = false);
    this._outputs.forEach(input => input.show = false);

    this.dispatchEvent(new Event('drag'));
  }

  move(ev) {
    this._top = Math.max(ev.pageY - this._mouse.y, 0);
    this._left = Math.max(ev.pageX - this._mouse.x, 0);

    this.style.top = `${this.top}px`;
    this.style.left = `${this.left}px`;

    const trashed = this.trashed(ev);
    this.classList.toggle('trashed', trashed);
    this._trash.active = trashed;

    this.dispatchEvent(new Event('move'));
  }

  drop(ev) {
    document.removeEventListener('mousemove', this._move);
    document.removeEventListener('mouseup', this._drop);

    this.classList.remove('dragging');

    this._inputs.forEach(input => input.show = this._showIO);
    this._outputs.forEach(input => input.show = this._showIO);

    this._trash.active = false;

    this.dispatchEvent(new Event('drop'));

    if (this.trashed(ev)) {
      this.remove();
      this.dispatchEvent(new Event('remove'));
    }
  }

  trashed(ev) {
    if (!this.trash) {
      return false;
    }

    const rect = this.trash.getBoundingClientRect();

    return ev.clientY >= rect.top
        && ev.clientX >= rect.left
        && ev.clientY <= rect.bottom
        && ev.clientX <= rect.right;
  }

  addInput(name, x, y) {
    if (!this._inputs.has(name)) {
      const input = new Input(this, name, x, y);

      this._inputs.set(name, input);
      this.appendChild(input);

      input.addEventListener('link', ev =>
        this.dispatchEvent(new CustomEvent('link', {
          detail: { input, output: ev.detail },
        })));

      input.addEventListener('unlink', () =>
        this.dispatchEvent(new CustomEvent('unlink', { detail: input })));
    }
    return this.getInput(name);
  }

  addOutput(name, x, y) {
    if (!this._outputs.has(name)) {
      const output = new Output(this, name, x, y);

      this._outputs.set(name, output);
      this.appendChild(output);
    }
    return this.getOutput(name);
  }

  getInput(name) {
    return this._inputs.get(name);
  }

  getOutput(name) {
    return this._outputs.get(name);
  }

  removeInput(name) {
    return this._inputs.delete(name);
  }

  removeOutput(name) {
    return this._outputs.delete(name);
  }
}

module.exports = Component;
