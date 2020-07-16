const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MAR';
const image = 'img/cpnt/MAR.png';

class MARInstance extends CpntInstance
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

class MAROriginal extends CpntOriginal
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
        return MARInstance;
    }
}

module.exports = MAROriginal;