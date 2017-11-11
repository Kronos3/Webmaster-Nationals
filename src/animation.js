class Animatable extends ElementObject {
    constructor(child) {
        super(child.get()[0]);
        this.child = child;
        this.animations = new Map();
    }
    add_animation(name, callback) {
        this.animations[name] = callback;
    }
    play(name, ..._args) {
        this.animations[name](this.child, _args);
    }
}
//# sourceMappingURL=animation.js.map