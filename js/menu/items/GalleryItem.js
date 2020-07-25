const MenuItem = require('../MenuItem');

class GalleryItem extends MenuItem {
  static get title() {
    return 'Componentes';
  }

  static get icon() {
    return 'img/menu/cpnt.svg';
  }

  get gallery() {
    return this._gallery;
  }

  set gallery(gallery) {
    this._gallery = gallery;
  }

  constructor() {
    super();

    this.addEventListener('click', () => {
      if (this.gallery) {
        this.gallery.open = !this.gallery.open;
      }
    });
  }
}

customElements.define('gallery-item', GalleryItem);

module.exports = GalleryItem;
