abstract;
var ElementObject = (function () {
    function ElementObject(el, _class_str) {
        this.el = el;
        _class_str == null ? _class_str = "element-object" : _class_str = _class_str;
        if (el == null) {
            this.el = $($.parseHTML("<div class=\"{0}\"></div>".format(_class_str)));
        }
    }
    ElementObject.prototype.addto = function (target) {
        target.add(this);
    };
    ElementObject.prototype.add = function (target) {
        this.get().appendChild(target.get());
    };
    ElementObject.prototype.get = function () {
        return this.el[0];
    };
    return ElementObject;
})();
