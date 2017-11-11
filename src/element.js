import './util';
export class ElementObject {
    constructor(el, _class_str) {
        this.el = el;
        _class_str == null ? _class_str = "element-object" : _class_str = _class_str;
        if (el == null) {
            this.el = $($.parseHTML("<div class=\"{0}\"></div>".format(_class_str)));
        }
        this.children = new Map();
        this.objnum = 0;
    }
    addto(target) {
        target.add(this);
    }
    add(target) {
        this.objnum++;
        this.objadd("{0}".format(this.objnum), target);
    }
    get() {
        return this.el[0];
    }
    /**
     * Searched for object_name in objects and returns it
     * @param object_name The name of the object to search for
     * @return The object in the map
     */
    objget(object_name) {
        return this.children[object_name];
    }
    objadd(object_name, obj) {
        this.get().appendChild(obj.get());
        this.children[object_name] = obj;
    }
}
//# sourceMappingURL=element.js.map