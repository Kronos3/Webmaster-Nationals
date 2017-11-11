class TSFile {
    readonly path: string;
    private text: string;
    
    constructor (path: string) {
        this.path = path; 
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", this.path, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    this.text = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
    }
    
    read () {
        return this.text;
    }
    
    readlines () {
        return this.text.split ("\n");
    }
    
    readobject () {
        $.parseHTML (this.read());
    }
}