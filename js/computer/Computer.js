const fs = require('fs');
const path = require('path');

class Computer
{
    static _cpntClasses = null;

    static init()
    {
        if (Computer._cpntClasses == null)
        {
            Computer._cpntClasses = new Map();

            var files = fs.readdirSync(__dirname + '/classes');
            files.forEach(file =>
            {
                file = path.parse(file);
                if (file.ext === '.js')
                {
                    var cpnt = require('./classes/' + file.name);
                    Computer._cpntClasses.set(cpnt.type, cpnt);
                }
            });
        }
    }
    
    static cpntTypes()
    {
        Computer.init();
        return Computer._cpntClasses.keys();
    }

    static getCpntImage(type)
    {
        Computer.init();
        return Computer._cpntClasses.get(type).image;
    }

    constructor()
    {
        Computer.init();
        this._cpnts = new Map();
    }

    addCpnt(type)
    {
        var cpnt = new (Computer._cpntClasses.get(type))();
        var key = cpnt.constructor.type + cpnt.id;
        this._cpnts.set(key, cpnt);
        return cpnt.id;
    }

    removeCpnt(type, id)
    {
        return this._cpnts.delete(type + id);
    }
}

module.exports = Computer;