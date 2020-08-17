import Component from '../Component.js';

class Increment extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Increment.svg',
      width: 68,
      height: 23,
    };
  }

  constructor(top, left) {
    super(top, left);

    this._current = this.addInput('Actual', 67, 11);
    this._clock = this.addInput('Clock', 0, 11);

    this._next = this.addOutput('Siguiente', 33.5, 0);
  }

  run() {
    if (this._clock.value) {
      this._next.value = this._current.value + 1;
    }

    return super.run();
  }
}

customElements.define('cpnt-increment', Increment);

export default Increment;
