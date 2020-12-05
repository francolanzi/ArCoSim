import ImgButton from '../ImgButton.js';

class SplitterCount extends HTMLElement {
  public constructor() {
    super();

    const add = new ImgButton('images/modal/plus.svg');
    const remove = new ImgButton('images/modal/minus.svg');

    this.append(add);
    this.append(remove);

    add.addEventListener('click', () =>
      this.dispatchEvent(new Event('add')));

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-splitter-count', SplitterCount);

export default SplitterCount;