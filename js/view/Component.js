const StyledElement = require('./StyledElement');
const InputElement = require('./io/Input');
const OutputElement = require('./io/Output');

class CpntElement extends StyledElement
{
    static get type()
    {
        throw new Error('type static property must be overrided');
    }

    static get image()
    {
        throw new Error('image static property must be overrided');
    }

    constructor()
    {
        super();

        if (this.constructor == CpntElement)
            throw new Error('CpntElement class can not be instantiated');

        this.addStyles('css/Component/CpntElement.css');
        
        var img = new Image();
        img.src = this.constructor.image;
        this.appendChild(img);
    }
}

class CpntOriginal extends CpntElement
{
    static get instance()
    {
        throw new Error('instance static property must be overrided');
    }

    constructor()
    {
        super();
    
        if (this.constructor == CpntOriginal)
            throw new Error('CpntOriginal class can not be instantiated');

        this.addStyles('css/Component/CpntOriginal.css');
        
        this.addEventListener('mousedown', ev =>
        {
            var rect = this.getBoundingClientRect();
            var ctor = this.constructor.instance;
            var cpnt = new ctor(rect);

            this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));

            cpnt.drag(ev);
        });
    }
}

class CpntInstance extends CpntElement
{
    get cpnt()
    {
        return this._cpnt;
    }

    set cpnt(cpnt)
    {
        this._cpnt = cpnt;

        this._inputs.clear();
        this._outputs.clear();
    }

    get trash()
    {
        return this._trash;
    }

    set trash(trash)
    {
        this._trash = trash;
    }

    constructor(rect)
    {
        super();

        if (this.constructor == CpntInstance)
            throw new Error('CpntInstance class can not be instantiated');

        this.addStyles('css/Component/CpntInstance.css');
    
        this.style.position = 'absolute';
        this.style.top = rect.top + window.scrollY + 'px';
        this.style.left = rect.left + window.scrollX + 'px';

        this._inputs = new Map();
        this._outputs = new Map();

        this._mouse = {};
        this._mouse.x = null;
        this._mouse.y = null;

        this._mousedown = this.drag.bind(this);
        this._mousemove = this.move.bind(this);
        this._mouseup = this.drop.bind(this);

        document.body.appendChild(this);
    
        this.addEventListener('mousedown', this._mousedown);
    }

    drag(ev)
    {
        var rect = this.getBoundingClientRect();

        this._mouse.x = ev.clientX - rect.left - window.scrollX;
        this._mouse.y = ev.clientY - rect.top - window.scrollY;

        document.addEventListener('mousemove', this._mousemove);
        document.addEventListener('mouseup', this._mouseup);

        this.classList.add('dragging');

        this.dispatchEvent(new Event('drag'));
    }

    move(ev)
    {
        var top = ev.clientY - this._mouse.y;
        var left = ev.clientX - this._mouse.x;

        this.style.top = (top > 0 ? top : 0) + 'px';
        this.style.left = (left > 0 ? left : 0) + 'px';

        if (this.trashed(ev))
            this.style.filter = 'invert(1)';
        else
            this.style.filter = 'none';
    }

    drop(ev)
    {
        document.removeEventListener('mousemove', this._mousemove);
        document.removeEventListener('mouseup', this._mouseup);

        this._mouse.x = null;
        this._mouse.y = null;

        this.classList.remove('dragging');

        this.dispatchEvent(new Event('drop'));

        if (this.trashed(ev))
        {
            this.remove();
            this.dispatchEvent(new Event('remove'));
        }
    }

    trashed(ev)
    {
        if (!this.trash)
            return false;

        var rect = this.trash.getBoundingClientRect();
        
        return ev.clientY >= rect.top
            && ev.clientX >= rect.left
            && ev.clientY <= rect.bottom
            && ev.clientX <= rect.right;
    }

    addInput(id, x, y)
    {
        if (!this._inputs.has(id))
        {
            var input = new InputElement(id, x, y);
            this._inputs.set(id, input);
            this.appendChild(input);
        }
        return this.getInput(id);
    }

    addOutput(id, x, y)
    {
        if (!this._outputs.has(id))
        {
            var output = new OutputElement(id, x, y);
            this._outputs.set(id, output);
            this.appendChild(output);
        }
        return this.getOutput(id);
    }

    getInput(id)
    {
        return this._inputs.get(id);
    }

    getOutput(id)
    {
        return this._outputs.get(id);
    }

    removeInput(id)
    {
        return this._inputs.delete(id);
    }

    removeOutput(id)
    {
        return this._outputs.delete(id);
    }
}

module.exports =
{
    CpntOriginal: CpntOriginal,
    CpntInstance: CpntInstance
};