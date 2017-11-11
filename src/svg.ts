import { ElementObject } from './element';
import { TSFile } from './file';

export class SVG extends ElementObject {
    file: TSFile;
    
    constructor (file: string) {
        let temp_file = new TSFile(file);
        super($($.parseHTML(temp_file.read())));
        this.file = temp_file;
    }
}