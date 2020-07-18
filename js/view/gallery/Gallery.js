const fs = require('fs');
const path = require('path');

class Gallery extends HTMLElement
{
    get open()
    {
        return this.style.transform === 'scaleY(1)';
    }

    set open(open)
    {
        this.style.transform = 'scaleY(' + (open ? 1 : 0) + ')';
    }

    constructor(computer, trash)
    {
        super();

        this.classList.add('float-left');
        this.classList.add('border');
        this.classList.add('border-secondary');
        this.classList.add('rounded');
        this.classList.add('mt-2');
        this.classList.add('p-2');

        this.style.transform = 'scaleY(0)';
        this.style.transformOrigin = 'top';
        this.style.transitionProperty = 'transform';
        this.style.transitionDuration = '0.15s';
        this.style.transitionTimingFunction = 'linear';
        this.style.backgroundColor = 'rgba(226, 227, 229, 0.85)';
        this.style.position = 'relative';
        this.style.zIndex = 1;
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
        this.style.alignItems = 'center';

        fs.readdirSync(__dirname + '/../cpnts').forEach(file =>
        {
            file = path.parse(file);
            if (file.ext === '.js')
            {
                var ctor = require('../cpnts/' + file.name);
                var cpnt = new ctor(trash);
        
                cpnt.addEventListener('add', ev =>
                {
                    var instance = ev.detail;
                    board.appendChild(instance);
                    instance.cpnt = computer.addCpnt(instance.constructor.type);
                });
        
                cpnt.addEventListener('remove', ev =>
                {
                    var instance = ev.detail;
                    computer.removeCpnt(instance.constructor.type, instance.cpnt.id);
                });
            
                this.appendChild(cpnt);
            }
        });
    }
}

customElements.define('cpnt-gallery', Gallery);

module.exports = Gallery;