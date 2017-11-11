class SVG extends ElementObject {
    file: TSFile;
    
    constructor (file: string) {
        let temp_file = new TSFile(file);
        super($($.parseHTML(temp_file.read())), "SVG");
        this.file = temp_file;
    }
}