const fs = require('fs');
const path = require('path');

class View
{
    static _cpnts = null;

    static init()
    {
        if (View._cpnts == null)
        {
            View._cpnts = new Map();

            var files = fs.readdirSync(__dirname + '/cpnts');
            files.forEach(file =>
            {
                file = path.parse(file);
                if (file.ext === '.js')
                {
                    var cpnt = require('./cpnts/' + file.name);
                    View._cpnts.set(cpnt.type, cpnt);
                }
            });
        }
    }
    
    static cpntTypes()
    {
        View.init();
        return View._cpnts.keys();
    }

    static getCpntImage(type)
    {
        View.init();
        return View._cpnts.get(type).image;
    }

    constructor()
    {
        throw new Error('View class can not be instantiated');
    }
}

module.exports = View;