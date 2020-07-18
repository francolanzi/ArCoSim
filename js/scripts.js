const $ = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');

const Computer = require('./js/computer');

const Menu = require('./js/view/menu/Menu');
const Gallery = require('./js/view/gallery/Gallery');
const TrashItem = require('./js/view/menu/items/TrashItem');
const LinkItem = require('./js/view/menu/items/LinkItem');
const CpntItem = require('./js/view/menu/items/CpntItem');

var computer = new Computer();

var trash = new TrashItem();
var link = new LinkItem();
var gallery = new Gallery(computer, trash);
var cpnt = new CpntItem(gallery);
var menu = new Menu();

menu.addItem('trash', trash);
menu.addItem('link', link);
menu.addItem('cpnt', cpnt);

board.appendChild(menu);
board.appendChild(gallery);

document.ondragstart = () => false;

var anchor = document.getElementsByTagName('a');

for (let i = 0; i < anchor.length; i++)
    anchor[i].addEventListener('mousedown', ev => ev.preventDefault());