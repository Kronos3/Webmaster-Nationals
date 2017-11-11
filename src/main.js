var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this, null, "main");
    }
    return Main;
})(ElementObject);
var Section = (function (_super) {
    __extends(Section, _super);
    /**
     * Creates a new section that can be added to Main
     * @param name Name of the new section (sets id to this)
     */
    function Section(name, next_to, back_to) {
        _super.call(this, $($.parseHTML("<div id=\"{0}\" class=\"section\"></div>")));
        this.next_to = next_to;
        this.back_to = back_to;
    }
    /**
     * Searched for object_name in objects and returns it
     * @param object_name The name of the object to search for
     * @return The object in the map
     */
    Section.prototype.objget = function (object_name) {
        return this.objects[object_name];
    };
    Section.prototype.objadd = function (object_name, obj) {
        this.add(obj);
        this.objects[object_name] = obj;
    };
    return Section;
})(ElementObject);
