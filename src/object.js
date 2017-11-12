/**
  Backend API for adding new object
*/

$.getScript('src/util.js');

class ElementObject {
    constructor (_str) {
        this.element = $($.parseHTML (_str))
    }
    
    static new_with_class (_str, _class) {
        return new ElementObject ("<div class=\"{0}\">{1}</div>".format (_class, _str));
    }
    
    add (target) {
        if (["ElementObject", "HTMLElement"].find (typeof target) == -1) {
            console.error ("Incorrect type in for ElementObject.add()");
            return null;
        }
        if (typeof target == "ElementObject") {
            target = target.get();
        }
        this.get().appendChild (target);
    }
    
    addto (target) {
        if (["ElementObject", "HTMLElement"].find (typeof target) == -1) {
            console.error ("Incorrect type in for ElementObject.add()");
            return null;
        }
        if (typeof target == "ElementObject") {
            target = target.get();
        }
        target.appendChild (this.get());
    }
    
    get () {
        return this.element[0];
    }
}
