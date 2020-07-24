const IO = require('./IO');

class Output extends IO {
  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }

  constructor(name) {
    super(name);

    if (!this.constructor._count) {
      this.constructor._count = 0;
    }
    this._id = ++this.constructor._count;

    this._value = null;
  }

  send(value) {
    if (!this._sending) {
      this._value = value;
      this.dispatchEvent(new Event('send'));
    }
  }

  stop() {
    if (this._sending) {
      this._value = null;
      this.dispatchEvent(new Event('stop'));
    }
  }
}

module.exports = Output;
