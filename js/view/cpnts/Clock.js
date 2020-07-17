const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Clock';
const image = 'img/cpnt/Clock.png';

class ClockInstance extends CpntInstance
{
    static get type()
    {
        return type;
    }
    
    static get image()
    {
        return image;
    }
}

class ClockOriginal extends CpntOriginal
{
    static get type()
    {
        return type;
    }
    
    static get image()
    {
        return image;
    }

    static get instance()
    {
        return ClockInstance;
    }
}

customElements.define('clock-instance', ClockInstance);
customElements.define('clock-original', ClockOriginal);

module.exports = ClockOriginal;