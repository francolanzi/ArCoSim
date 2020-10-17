import Computer from './Computer.js';
import CpntItem from './CpntItem.js';
import Center from './ifaces/Center.js';
import CpntInfo from './ifaces/CpntInfo.js';
import Input from './io/Input.js';
import Output from './io/Output.js';
import TrashButton from './menu/buttons/TrashButton.js';

abstract class Component extends HTMLElement {
  private static readonly _count = new Map<string, number>();

  private _top: number;
  private _left: number;

  private readonly _item: CpntItem;
  private readonly _inputs: Map<number, Input>;
  private readonly _outputs: Map<number, Output>;
  private readonly _move: (ev: MouseEvent) => void;
  private readonly _drop: (ev: MouseEvent) => void;
  private readonly _mouse: Center;

  public trash: TrashButton | undefined;

  public readonly cpntId: number

  public get config(): Node | undefined {
    return undefined;
  }

  public get type(): string {
    return this._item.type;
  }

  public get computer(): Computer {
    return this._item.computer;
  }

  public get top(): number {
    return this._top;
  }

  public get left(): number {
    return this._left;
  }

  public get inputs(): IterableIterator<Input> {
    return this._inputs.values();
  }

  public get outputs(): IterableIterator<Output> {
    return this._outputs.values();
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super();

    this._item = item;

    const count = Component._count.get(this.type);
    this.cpntId = count ? count + 1 : 1;
    Component._count.set(this.type, this.cpntId);

    this.classList.add('component');

    this.style.top = `${top}px`;
    this.style.left = `${left}px`;

    this._top = top;
    this._left = left;

    this._inputs = new Map();
    this._outputs = new Map();

    this._mouse = { x: 0, y: 0 };

    this._move = ev => this.move(ev);
    this._drop = ev => this.drop(ev);

    const img = new Image(item.width, item.height);

    img.src = item.image;
    this.append(img);

    img.addEventListener('mousedown', ev => this.drag(ev));
    img.addEventListener('dblclick', () => {
      const ev = new Event('config');
      this.dispatchEvent(ev);
    });
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  public run(time: number): boolean {
    let changed = false;
    this._inputs.forEach(input =>
      changed = changed || input.changed);
    this._outputs.forEach(output =>
      changed = changed || output.changed);
    return changed;
  }

  public stop(): void {
    this.dispatchEvent(new Event('stop'));
  }

  public reset(): void {
    this._inputs.forEach(input => input.reset());
    this._outputs.forEach(output => output.reset());
  }

  public drag(ev: MouseEvent): void {
    const rect = this.getBoundingClientRect();

    this._mouse.x = ev.clientX - rect.left;
    this._mouse.y = ev.clientY - rect.top;

    document.addEventListener('mousemove', this._move);
    document.addEventListener('mouseup', this._drop);

    this.classList.add('dragging');

    this.dispatchEvent(new Event('drag'));
  }

  public move(ev: MouseEvent): void {
    this._top = Math.max(ev.pageY - this._mouse.y, 0);
    this._left = Math.max(ev.pageX - this._mouse.x, 0);

    this.style.top = `${this.top}px`;
    this.style.left = `${this.left}px`;

    const trashed = this.trashed(ev);
    this.classList.toggle('trashed', trashed);
    if (this.trash) {
      this.trash.active = trashed;
    }

    this.dispatchEvent(new Event('move'));
  }

  public drop(ev: MouseEvent): void {
    document.removeEventListener('mousemove', this._move);
    document.removeEventListener('mouseup', this._drop);

    this.classList.remove('dragging');

    if (this.trash) {
      this.trash.active = false;
    }

    this.dispatchEvent(new Event('drop'));

    if (this.trashed(ev)) {
      this.remove();
      this.dispatchEvent(new Event('remove'));
    }
  }

  public trashed(ev: MouseEvent): boolean {
    if (!this.trash) {
      return false;
    }

    const rect = this.trash.getBoundingClientRect();

    return ev.clientY >= rect.top
        && ev.clientX >= rect.left
        && ev.clientY <= rect.bottom
        && ev.clientX <= rect.right;
  }

  public addInput(name: string, x: number, y: number): Input {
    const input = new Input(this, name, x, y);

    this._inputs.set(input.inputId, input);
    this.append(input);

    input.addEventListener('link', ev => {
      const output: Output = (<CustomEvent> ev).detail;
      this.dispatchEvent(new CustomEvent('link', {
        detail: { input, output },
      }));
    });

    input.addEventListener('unlink', () =>
      this.dispatchEvent(new CustomEvent('unlink', { detail: input })));

    return input;
  }

  public addOutput(name: string, x: number, y: number): Output {
    const output = new Output(this, name, x, y);

    this._outputs.set(output.outputId, output);
    this.append(output);

    return output;
  }

  public getInput(id: number): Input | undefined {
    return this._inputs.get(id);
  }

  public getOutput(id: number): Output | undefined {
    return this._outputs.get(id);
  }

  public removeInput(id: number): void {
    const input = this._inputs.get(id);
    if (input) {
      this._inputs.delete(id);
      input.remove();
      this.dispatchEvent(new CustomEvent('removeinput', { detail: input }));
    }
  }

  public removeOutput(id: number): void {
    const output = this._outputs.get(id);
    if (output) {
      this._outputs.delete(id);
      output.remove();
      this.dispatchEvent(new CustomEvent('removeoutput', { detail: output }));
    }
  }

  public serialize(): CpntInfo {
    return {
      type: this.type,
      top: this.top,
      left: this.left,
    };
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public deserialize(obj: CpntInfo): void {}
}

export default Component;