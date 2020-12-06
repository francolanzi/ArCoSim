import Computer from '../../Computer.js';
import MenuButton from '../MenuButton.js';

const { remote } = window.require('electron');

class SaveButton extends MenuButton {
  public constructor(computer: Computer) {
    const title = 'Guardar';
    const icon = 'images/menu/save.svg';

    super(title, icon);

    const window = remote.getCurrentWindow();

    this.addEventListener('click', () => {
      const path = remote.dialog.showSaveDialogSync(window, {
        filters: [{ name: 'Arcosim', extensions: ['arcosim'] }],
      });

      computer.serializeFile(path);
    });
  }
}

customElements.define('save-button', SaveButton);

export default SaveButton;
