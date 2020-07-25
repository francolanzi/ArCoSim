const Component = require('../Component');

class ALU extends Component {
  static get imageFile() {
    return 'img/cpnt/ALU.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('InputA', 11.5, 0);
    this.addInput('InputB', 69, 0);
    this.addInput('Function', 70, 29.5);

    this.addOutput('Result', 39.5, 44);
    this.addOutput('Control', 75, 14.5);
  }
}

customElements.define('cpnt-alu', ALU);

module.exports = ALU;
