const fs = require('fs');

class ModalLayer extends HTMLElement {
  constructor() {
    super();

    const modal = document.createElement('div');
    modal.classList.add('modal');
    this.append(modal);

    this._title = document.createElement('div');
    this._title.classList.add('modal-title');
    modal.append(this._title);

    this._content = document.createElement('div');
    this._content.classList.add('modal-content');
    modal.append(this._content);

    this._close = document.createElement('span');
    this._close.classList.add('modal-close');
    this._close.innerHTML = fs.readFileSync('img/modal/times.svg');
    modal.append(this._close);

    this._close.addEventListener('click', () =>
      this.classList.remove('show'));

    this.addEventListener('transitionend', () => {
      if (!this.classList.contains('show')) {
        this._title.textContent = '';
        this._content.removeChild(this._content.lastChild);
      }
    });
  }

  show(title, content) {
    this._title.textContent = title;
    this._content.append(content);
    this.classList.add('show');
  }
}

customElements.define('modal-layer', ModalLayer);

module.exports = ModalLayer;
