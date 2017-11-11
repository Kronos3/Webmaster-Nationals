var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SVG = (function (_super) {
    __extends(SVG, _super);
    function SVG(file) {
        var temp_file = new TSFile(file);
        _super.call(this, $($.parseHTML(temp_file.read())), "SVG");
        this.file = temp_file;
    }
    return SVG;
})(ElementObject);
