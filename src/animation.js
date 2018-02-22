class AnimationHandler {
    constructor (frames, fps, parent) {
        this.currentFrame = 0;
        
        this.parent = parent;
        this.fps = fps;
        this.frames = frames;
        
        this.context = parent.getContext('2d');
        this.img = new Image();
        
        this.img.onload = () => {
            this.context.drawImage (this.img, 0, 0);
        }
        
        
    }
    
    render (frameNumber) {
        this.currentFrame = frameNumber;
        this.context.clearRect(0, 0, this.parent.width, this.parent.height);
        this.img.src = this.frames[frameNumber];
    }
    
    play (to) {
        let _this = this;
        let i = this.currentFrame;
        let anim = setInterval(function () {
            _this.render(i);
            i++;
            if (i >= to)
                clearInterval (anim);
        }, 1000 / this.fps);
    }
    
    rewind (to) {
        let _this = this;
        let i = this.currentFrame;
        let anim = setInterval(function () {
            _this.render(i);
            i--;
            if (i <= to)
                clearInterval (anim);
        }, 1000 / this.fps);
    }
}