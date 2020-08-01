const Subcycles = require('./Subcycles');

class ClockConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const subcycles = new Subcycles(cpnt.subcycles);
    this.appendChild(subcycles);

    subcycles.addEventListener('change', () => {
      while (subcycles.value > cpnt.subcycles) {
        cpnt.addSubcycle();
      }
      while (subcycles.value < cpnt.subcycles) {
        cpnt.removeSubcycle();
      }
    });
  }
}

customElements.define('cpnt-clock-config', ClockConfig);

module.exports = ClockConfig;
