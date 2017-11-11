var TSFile = (function () {
    function TSFile(path) {
        var _this = this;
        this.readonly = path;
        this.path = path;
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", this.path, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    _this.text = rawFile.responseText;
                }
            }
        };
        rawFile.send(null);
    }
    TSFile.prototype.read = function () {
        return this.text;
    };
    TSFile.prototype.readlines = function () {
        return this.text.split("\n");
    };
    TSFile.prototype.readobject = function () {
        $.parseHTML(this.read());
    };
    return TSFile;
})();
