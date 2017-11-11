class Main extends ElementObject {
    constructor() {
        super (null, "main");
        
    }
    
}

class Section extends ElementObject {
    private objects: Map<string, Animatable<any> | ElementObject>;
    name: string;
    
    /**
     * Play when going from previous to here
     * if first it will automatically play
     */
    next_to: () => void;
    
    /**
     * Play when going backwards to here
     */
    back_to: () => void;
    
    /**
     * Creates a new section that can be added to Main
     * @param name Name of the new section (sets id to this)
     */
    constructor(name: string, next_to?: () => void, back_to?: () => void) {
        super($($.parseHTML("<div id=\"{0}\" class=\"section\"></div>")));
        this.next_to = next_to;
        this.back_to = back_to;
    }
    
    /**
     * Searched for object_name in objects and returns it
     * @param object_name The name of the object to search for
     * @return The object in the map
     */
    objget(object_name: string): Animatable<any> | ElementObject {
        return this.objects[object_name];
    }
    
    objadd (object_name:string, obj: Animatable<any> | ElementObject) {
        this.add (obj);
        this.objects[object_name] = obj;
    }
}

//function (obj: )