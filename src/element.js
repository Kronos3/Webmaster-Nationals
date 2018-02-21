class JSFile {
    constructor (path) {
        this.path = path;
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", this.path, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    this.text = rawFile.responseText;
                }
            }
        };
        rawFile.send(null);
    }
    
    read () {
        return this.text;
    }
}

class ElementObject {
    constructor (_str) {
        if (_str !== '') {
            this.element = $($.parseHTML (_str))
        }
    }
    
    static new_wrap (el) {
        let out = new ElementObject ('');
        out.element = el;
        return out;
    }
    
    add (target) {
        if (target instanceof ElementObject) {
            target = target.get();
        }
        this.get().appendChild (target);
    }
    
    addto (target) {
        if (target instanceof ElementObject) {
            target = target.get();
        }
        target.appendChild (this.get());
    }
    
    get () {
        return this.element[0];
    }
    
    child (filter) {
        return ElementObject.new_wrap ($($(this.get()).children(filter).prevObject[0]));
    }
}