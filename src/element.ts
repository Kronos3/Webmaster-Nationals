import './util';

export class ElementObject {
    private el: JQuery;
    
    constructor(el: JQuery, _class_str?: string) {
        this.el = el;
        _class_str == null ? _class_str = "element-object": _class_str = _class_str;
        if (el == null) {
            this.el = $($.parseHTML("<div class=\"{0}\"></div>".format(_class_str)));
        }
    }
    
    addto (target: ElementObject) {
        target.add (this);
    }
    
    add (target: ElementObject) {
        this.get().appendChild (target.get());
    }
    
    get(): HTMLElement {
        return this.el[0];
    }
}