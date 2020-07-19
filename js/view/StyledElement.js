class StyledElement extends HTMLElement
{
    constructor()
    {
        super();

        this._shadow = this.attachShadow({ mode: 'closed' });
        this._styles = new Map();
    }

    addStyles(href)
    {
        if (!this._styles.has(href))
        {
            var styles = document.createElement('link');
            this._shadow.appendChild(styles);
            this._styles.set(href, styles);
            styles.rel = 'stylesheet';
            styles.href = href;
        }
    }

    removeStyles(href)
    {
        var styles = this._styles.get(href);
        if (styles)
            styles.remove();
        return this._styles.delete(href);
    }
}

module.exports = StyledElement;