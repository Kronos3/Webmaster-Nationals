class AnimationHandler {
    constructor (frames, fps, parent, renderSettings) {
        this.currentFrame = 0;
        
        this.parent = parent;
        this.fpms = 1000 / fps;
        this.frames = frames;
        this.anim = undefined;
        
        this.context = parent.getContext('2d');
        this.img = new Image();
        if (renderSettings === undefined)
            renderSettings = [0, 0];
        
        this.img.onload = () => {
            this.context.save ();
            this.context.clearRect(0, 0, this.parent.width, this.parent.height);
            this.context.drawImage (this.img, renderSettings[0], renderSettings[1]);
            this.context.restore();
        };
        
        this.render (0);
    }
    
    render (frameNumber) {
        this.currentFrame = frameNumber;
        this.img.src = this.frames[frameNumber];
    }
    
    play (to) {
        if (this.anim !== undefined)
            clearInterval(this.anim);
        let _this = this;
        let i = this.currentFrame;
    
        this.anim = setInterval(function () {
            _this.render(i);
            i++;
            if (i >= to) {
                clearInterval (_this.anim);
                _this.anim = undefined;
            }
        }, this.fpms);
    }
    
    rewind (to) {
        if (this.anim !== undefined)
            clearInterval(this.anim);
        let _this = this;
        let i = this.currentFrame;
        this.anim = setInterval(function () {
            _this.render(i);
            i--;
            if (i <= to) {
                clearInterval (_this.anim);
                _this.anim = undefined;
            }
        }, this.fpms);
    }
}