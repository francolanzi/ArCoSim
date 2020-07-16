const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Latch';
const image = 'img/cpnt/Latch.png';

class LatchInstance extends CpntInstance
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

class LatchOriginal extends CpntOriginal
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
        return LatchInstance;
    }
}

module.exports = LatchOriginal;