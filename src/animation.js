export class AnimationHandler {
    static genList (format, number) {
        let frames = [];
        for (let i = 0; i <= number; i++)
            frames.push(sprintf (format, i));
        return frames;
    }
    constructor (parent, format, number, loaded) {
        this.currentFrame = 0;
        this.frames = [];
        this.parent = parent;
        for (let i = 0; i <= number; i++)
            this.frames.push(sprintf (format, i));
        
    }
    
    render (frameNumber) {
    
    }
    
    play (to, timeMS) {
        let playNumber = to - this.currentFrame;
        let interval = playNumber / timeMS;
        let _this = this;
        let i = this.currentFrame;
        let anim = setInterval(function () {
            _this.render(i);
            i++;
            if (i === to)
                clearInterval (anim);
        });
    }
    
    rewind (to) {
    
    }
}