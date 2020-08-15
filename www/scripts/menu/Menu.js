const TrashButton = require('./buttons/TrashButton');
const CpntButton = require('./buttons/CpntButton');
const RunButton = require('./buttons/RunButton');
const StepButton = require('./buttons/StepButton');
const ResetButton = require('./buttons/ResetButton');

class Menu extends HTMLElement {
  constructor() {
    super();

    this._buttons = new Map();

    this.addButton('trash', new TrashButton());
    this.addButton('cpnt', new CpntButton());
    this.addButton('run', new RunButton());
    this.addButton('step', new StepButton());
    this.addButton('reset', new ResetButton());
  }

  addButton(name, button) {
    if (!this._buttons.has(name)) {
      this._buttons.set(name, button);
      this.append(button);
    }
    return this.getButton(name);
  }

  getButton(name) {
    return this._buttons.get(name);
  }

  removeButton(name) {
    return this._buttons.delete(name);
  }
}

customElements.define('main-menu', Menu);

module.exports = Menu;
