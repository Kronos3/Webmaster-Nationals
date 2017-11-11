class Animatable<T extends ElementObject> extends ElementObject {
    child: T;
    animations: Map<string, (el: ElementObject, ..._args: any[]) => void>;
    
    constructor (child: T) {
        super (child.get()[0]);
        this.child = child;
        this.animations = new Map<string, (el: ElementObject, ..._args: any[]) => void>();
    }
    
    add_animation(name: string, callback: (el: ElementObject, ..._args: any[]) => void) {
        this.animations[name] = callback;
    }
    
    play (name: string, ..._args: any[]) {
        this.animations[name] (this.child, _args);
    }
}