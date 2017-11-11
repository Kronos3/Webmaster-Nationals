import { Animatable } from './animation';
import { ElementObject } from './element';
import { SVG } from './svg';

export class Section extends ElementObject {
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
        super($($.parseHTML("<div id=\"{0}\" class=\"section\"></div>".format(name))));
        this.next_to = next_to;
        this.back_to = back_to;
    }
}

