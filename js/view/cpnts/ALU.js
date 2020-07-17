const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'ALU';
const image = 'img/cpnt/ALU.png';

class ALUInstance extends CpntInstance
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

class ALUOriginal extends CpntOriginal
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
        return ALUInstance;
    }
}

customElements.define('alu-instance', ALUInstance);
customElements.define('alu-original', ALUOriginal);

module.exports = ALUOriginal;