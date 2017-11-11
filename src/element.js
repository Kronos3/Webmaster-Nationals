import './util';
export class ElementObject {
    constructor(el, _class_str) {
        this.el = el;
        _class_str == null ? _class_str = "element-object" : _class_str = _class_str;
        if (el == null) {
            this.el = $($.parseHTML("<div class=\"{0}\"></div>".format(_class_str)));
        }
    }
    addto(target) {
        target.add(this);
    }
    add(target) {
        this.get().appendChild(target.get());
    }
    get() {
        return this.el[0];
    }
}
//# sourceMappingURL=element.js.map