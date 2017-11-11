import './util';

export class ElementObject {
    private el: JQuery;
    private children: Map<string, ElementObject>;
    objnum: number;
    
    constructor(el: JQuery, _class_str?: string) {
        this.el = el;
        _class_str == null ? _class_str = "element-object": _class_str = _class_str;
        if (el == null) {
            this.el = $($.parseHTML("<div class=\"{0}\"></div>".format(_class_str)));
        }
        this.children = new Map<string, ElementObject>();
        this.objnum = 0;
    }
    
    addto (target: ElementObject) {
        target.add (this);
    }
    
    add (target: ElementObject) {
        this.objnum++;
        this.objadd("{0}".format(this.objnum), target);
    }
    
    get(): HTMLElement {
        return this.el[0];
    }

    /**
     * Searched for object_name in objects and returns it
     * @param object_name The name of the object to search for
     * @return The object in the map
     */
    objget(object_name: string): ElementObject {
        return this.children[object_name];
    }

    objadd(object_name: string, obj: ElementObject) {
        this.get().appendChild(obj.get());
        this.children[object_name] = obj;
    }
}