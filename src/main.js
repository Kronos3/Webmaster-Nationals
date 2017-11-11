class Main extends ElementObject {
    constructor() {
        super(null, "main");
    }
}
class Section extends ElementObject {
    /**
     * Creates a new section that can be added to Main
     * @param name Name of the new section (sets id to this)
     */
    constructor(name, next_to, back_to) {
        super($($.parseHTML("<div id=\"{0}\" class=\"section\"></div>")));
        this.next_to = next_to;
        this.back_to = back_to;
    }
    /**
     * Searched for object_name in objects and returns it
     * @param object_name The name of the object to search for
     * @return The object in the map
     */
    objget(object_name) {
        return this.objects[object_name];
    }
    objadd(object_name, obj) {
        this.add(obj);
        this.objects[object_name] = obj;
    }
}
//function (obj: ) 
//# sourceMappingURL=main.js.map