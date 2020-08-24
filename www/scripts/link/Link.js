import LinkCorner from './LinkCorner.js';

class Link {
  get input() {
    return this._input;
  }

  get output() {
    return this._output;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.input.value = value;
  }

  get width() {
    return this._width;
  }

  set width(width) {
    width = Math.min(Math.max(width, 1), 10);
    this._width = width;
    this._line.style.strokeWidth = `${width}px`;
  }

  get color() {
    return this._line.style.stroke;
  }

  set color(color) {
    this._line.style.stroke = color;
  }

  get dashed() {
    return this._line.style.strokeDasharray !== 'none';
  }

  set dashed(dashed) {
    this._line.style.strokeDasharray = dashed ? '10,10' : 'none';
  }

  constructor(layer, input, output) {
    this._layer = layer;
    this._input = input;
    this._output = output;

    this.value = 0;

    this._corners = [];

    this._line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    this._areas = [document.createElementNS('http://www.w3.org/2000/svg', 'line')];

    this._line.classList.add('cpnt-link');
    this._areas[0].classList.add('cpnt-link-area');

    this._layer.svg.append(this._line);
    this._layer.svg.append(this._areas[0]);

    this._areas[0].addEventListener('dblclick', ev => this.addCorner(ev));

    this._line.points.appendItem(this._layer.svg.createSVGPoint());
    this._line.points.appendItem(this._layer.svg.createSVGPoint());

    this.width = 1;
    this.color = 'black';
    this.dashed = false;

    output.addLink(this);

    this.moveInput();
    this.moveOutput();
  }

  moveInput() {
    const center = this.input.center;
    const point = this._line.points.getItem(0);

    point.x = center.x;
    point.y = center.y;

    this._areas[0].setAttribute('x1', center.x);
    this._areas[0].setAttribute('y1', center.y);
  }

  moveOutput() {
    const i = this._corners.length;
    const center = this.output.center;
    const point = this._line.points.getItem(i + 1);

    point.x = center.x;
    point.y = center.y;

    this._areas[i].setAttribute('x2', center.x);
    this._areas[i].setAttribute('y2', center.y);
  }

  moveCorner(corner) {
    const center = corner.center;
    const i = this._corners.indexOf(corner);

    const point = this._line.points.getItem(i + 1);

    point.x = center.x;
    point.y = center.y;

    this._areas[i].setAttribute('x2', center.x);
    this._areas[i].setAttribute('y2', center.y);

    this._areas[i + 1].setAttribute('x1', center.x);
    this._areas[i + 1].setAttribute('y1', center.y);
  }

  remove() {
    this._line.remove();
    this._input.unlink();
    this._output.removeLink(this);
    this._areas.forEach(area => area.remove());
    this._corners.forEach(corner => corner.remove());
  }

  addCorner(ev) {
    const i = this._areas.indexOf(ev.target);

    const corner = new LinkCorner(ev.pageX, ev.pageY);
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    area.classList.add('cpnt-link-area');

    area.addEventListener('dblclick', ev => this.addCorner(ev));
    corner.addEventListener('move', () => this.moveCorner(corner));
    corner.addEventListener('remove', () => this.removeCorner(corner));

    document.body.append(corner);
    this._layer.svg.append(area);

    this._corners.splice(i, 0, corner);
    this._areas.splice(i, 0, area);

    area.setAttribute('x1', ev.target.getAttribute('x1'));
    area.setAttribute('y1', ev.target.getAttribute('y1'));

    this._line.points.insertItemBefore(this._layer.svg.createSVGPoint(), i + 1);

    this.moveCorner(corner);
  }

  removeCorner(corner) {
    const i = this._corners.indexOf(corner);

    const area = this._areas[i];

    corner.remove();
    area.remove();

    this._corners.splice(i, 1);
    this._areas.splice(i, 1);

    this._line.points.removeItem(i + 1);

    if (i > 0) {
      this.moveCorner(this._corners[i - 1]);
    } else {
      this.moveInput();
    }
  }
}

export default Link;
