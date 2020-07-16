const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MPC';
const image = 'img/cpnt/MPC.png';

class MPCInstance extends CpntInstance
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

class MPCOriginal extends CpntOriginal
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
        return MPCInstance;
    }
}

module.exports = MPCOriginal;