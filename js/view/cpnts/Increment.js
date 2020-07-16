const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Increment';
const image = 'img/cpnt/Increment.png';

class IncrementInstance extends CpntInstance
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

class IncrementOriginal extends CpntOriginal
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
        return IncrementInstance;
    }
}

module.exports = IncrementOriginal;