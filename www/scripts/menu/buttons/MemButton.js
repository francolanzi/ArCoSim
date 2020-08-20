import MenuButton from '../MenuButton.js';
import Config from '../../modal/Memory/Config.js';

class MemButton extends MenuButton {
  static get title() {
    return 'Memoria';
  }

  static get icon() {
    return 'images/menu/mem.svg';
  }

  constructor(memory) {
    super();

    this.addEventListener('click', () =>
      this.dispatchEvent(new CustomEvent('config', { detail: new Config(memory) })));
  }
}

customElements.define('mem-button', MemButton);

export default MemButton;
