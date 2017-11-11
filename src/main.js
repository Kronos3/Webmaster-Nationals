import { Animatable } from './animation';
import { ElementObject } from './element';
class Main extends ElementObject {
    constructor(scroll) {
        super(null, "main");
        this.scroll = scroll;
        if (this.scroll == null) {
            this.scroll = this.default_scroll;
        }
        this.sections = new Array();
        this.addto(new ElementObject($("body")));
    }
    add_section(sec) {
        this.sections.push(sec);
        this.add(sec);
    }
    default_scroll(prev, current) {
    }
}
class Section extends ElementObject {
    /**
     * Creates a new section that can be added to Main
     * @param name Name of the new section (sets id to this)
     */
    constructor(name, next_to, back_to) {
        super($($.parseHTML("<div id=\"{0}\" class=\"section\"></div>".format(name))));
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
function parse_website(obj) {
    var out = new Main();
    obj.sections.forEach(el => {
        var SEC = new Section(el.name);
        el.objects.forEach(ob => {
            var OBJECT = new Animatable(ob.obj);
            ob.animations.forEach(anim => {
                OBJECT.add_animation(anim.name, anim.callback);
            });
            SEC.objadd(ob.name, OBJECT);
        });
        out.add_section(SEC);
    });
}
var nationals_site = {
    sections: [
        {
            name: "lander",
            objects: []
        }
    ]
};
function main() {
    parse_website(nationals_site);
    return 0;
}
var ret;
$(document).ready(() => {
    if ((ret = main()) != 0) {
        console.error("main() exited with code {0}".format(ret));
    }
});
//# sourceMappingURL=main.js.map