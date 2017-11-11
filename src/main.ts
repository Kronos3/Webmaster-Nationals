import { Animatable } from './animation';
import { ElementObject } from './element';
import { Section } from './section';

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
    inner: boolean;
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
        var SEC:ElementObject = new Section(el.name);
        out.add_section(<Section>SEC);
        var INNER:ElementObject;
        if (el.inner) {
            INNER = new ElementObject (null, "section-inner");
            SEC.objadd ("inner", INNER);
            SEC = INNER;
        }
        if (el.objects != null) {
            el.objects.forEach(ob => {
                var OBJECT = new Animatable(ob.obj);
                if (ob.animations != null) {
                    ob.animations.forEach(anim => {
                        OBJECT.add_animation(anim.name, anim.callback);
                    });
                }
                SEC.objadd(ob.name, OBJECT);
            });
        }
        
    });
}

var nationals_site:website = <website>{
    sections: [
        {
            name: "lander",
            inner: true
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
