import {ElementObject, JSFile} from "./element.js";

export class Logo extends ElementObject {
    constructor (path, modifier) {
        let _file = new JSFile (path);
        super (_file.read());
        this.addto (document.body);
        this.modifier = modifier;
        this.update_load (0);
        if (this.modifier === undefined) {
            this.modifier = '';
        }
    }
    
    get_blue_mask () {
        return ElementObject.new_wrap($("#logo{0}-blue-mask".format (this.modifier)));
    }
    
    update_load (percentage) {
        this.get_blue_mask().element.css ("clip-path", "polygon({0}% 0, {0}% 100%, 0 100%, 0 0)".format(percentage));
    }
}