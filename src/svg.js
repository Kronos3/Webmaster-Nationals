import { ElementObject } from './element';
import { TSFile } from './file';
export class SVG extends ElementObject {
    constructor(file) {
        let temp_file = new TSFile(file);
        super($($.parseHTML(temp_file.read())), "SVG");
        this.file = temp_file;
    }
}
//# sourceMappingURL=svg.js.map