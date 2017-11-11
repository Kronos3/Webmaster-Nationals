import { Animatable } from './animation';
import { ElementObject } from './element';
import { SVG } from './svg';

class Main extends ElementObject {
    page_n: number;
    private sections: Section[];
    
    constructor(scroll?: (prev: number, current: number) => void) {
        super (null, "main");
        this.scroll = scroll;
        if (this.scroll == null) {
            this.scroll = this.default_scroll;
        }
        this.sections = new Array<Section>();
        this.addto (new ElementObject ($("body")));
    }
    
    
    add_section (sec: Section) {
        this.sections.push (sec);
        this.add (sec);
    }
    
    private scroll: (prev: number, current: number) => void;
    
    private default_scroll (prev: number, current: number): void {
        
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
        super($($.parseHTML("<div id=\"{0}\" class=\"section\"></div>".format (name))));
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

interface animation_callback {
    name: string;
    callback?: (el: ElementObject, ..._args: any[]) => void;
}

interface obj {
    name: string;
    obj: ElementObject;
    animations: animation_callback[];
}

interface section {
    name: string;
    objects: obj[];
    next_to?:() => void;
    back_to?:() => void;
}

interface website {
    sections: section[];
    scroll?:(prev: number, current:number) => void;
}

function parse_website (obj: website) {
    var out: Main = new Main ();
    obj.sections.forEach(el => {
        var SEC = new Section (el.name);
        el.objects.forEach(ob => {
            var OBJECT = new Animatable (ob.obj);
            ob.animations.forEach(anim => {
                OBJECT.add_animation (anim.name, anim.callback);
            });
            SEC.objadd (ob.name, OBJECT);
        });
        out.add_section(SEC);
    });
}

var nationals_site:website = <website>{
    sections: [
        {
            name: "lander",
            objects: []
        }
    ]
}

function main(): number {
    parse_website (nationals_site);
    
    return 0;
}

var ret: number;
$(document).ready (() => {
    if ((ret = main()) != 0) {
        console.error("main() exited with code {0}".format(ret));
    }
})
