var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Animatable = (function (_super) {
    __extends(Animatable, _super);
    function Animatable(child) {
        _super.call(this, child.get()[0]);
        this.child = child;
        this.animations = new Map();
    }
    Animatable.prototype.add_animation = function (name, callback) {
        this.animations[name] = callback;
    };
    Animatable.prototype.play = function (name) {
        var _args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _args[_i - 1] = arguments[_i];
        }
        this.animations[name](this.child, _args);
    };
    return Animatable;
})(ElementObject);
