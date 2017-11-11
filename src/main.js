import { Animatable } from './animation';
import { ElementObject } from './element';
import { Section } from './section';
import { SectionInner } from './section';
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
function parse_website(obj) {
    var out = new Main();
    obj.sections.forEach(el => {
        var SEC = new Section(el.name);
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
        out.add_section(SEC);
    });
}
var nationals_site = {
    sections: [
        {
            name: "lander",
            objects: [
                {
                    name: "inner",
                    obj: new SectionInner(null, "section-inner")
                }
            ]
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