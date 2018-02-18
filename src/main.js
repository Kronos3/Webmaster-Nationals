String.prototype.format = function (..._args) {
    let args = _args;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined'
            ? args[number] : match;
    });
};

Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) {
    let a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    let c = Object(this),
        b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === d) return a;
        a++
    }
    return -1
});

class JSFile {
    constructor (path) {
        this.path = path;
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", this.path, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    this.text = rawFile.responseText;
                }
            }
        };
        rawFile.send(null);
    }

    read () {
        return this.text;
    }
}

class ElementObject {
    constructor (_str) {
        if (_str !== '') {
            this.element = $($.parseHTML (_str))
        }
    }

    static new_wrap (el) {
        let out = new ElementObject ('');
        out.element = el;
        return out;
    }

    add (target) {
        if (target instanceof ElementObject) {
            target = target.get();
        }
        this.get().appendChild (target);
    }

    addto (target) {
        if (target instanceof ElementObject) {
            target = target.get();
        }
        target.appendChild (this.get());
    }

    get () {
        return this.element[0];
    }

    child (filter) {
        return ElementObject.new_wrap ($($(this.get()).children(filter).prevObject[0]));
    }
}

class Logo extends ElementObject {
    constructor (path, modifier) {
        let _file = new JSFile (path);
        super (_file.read());
        this.addto (document.body);
        this.modifier = modifier;
        this.update_load (0);
        if (this.modifier === undefined) {
            this.modifier = '';
        }
    }

    get_blue_mask () {
        return ElementObject.new_wrap($("#logo{0}-blue-mask".format (this.modifier)));
    }

    update_load (percentage) {
        this.get_blue_mask().element.css ("clip-path", "polygon({0}% 0, {0}% 100%, 0 100%, 0 0)".format(percentage));
    }
}

Image.prototype.load = function (url, parent) {
    let thisImg = this;
    let xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        let blob = new Blob([this.response]);
        thisImg.src = window.URL.createObjectURL(blob);
    };

    xmlHTTP.onprogress = function(e) {
        let _new =  e.loaded - thisImg.already;
        thisImg.already = e.loaded;
        parent(_new);
    };
    xmlHTTP.onloadstart = function() {
        thisImg.already = 0;
        parent(0);
    };
    xmlHTTP.send();
};

class Preload {
    constructor (preload_ar_ar, end_callback) {
        this.preload_ar = preload_ar_ar;
        this.logo = new Logo ('../resources/logo.svg', 'name');
        this.end = end_callback;
        this.total_size = 0;
        this.loads = [];
    }

    start () {
        this.add_file_size(0, 0, () => {
            /*console.log (this.total_size);
            this.load (0, 0, () => {
                this.end ();
            });*/
            this.end ();
        });
    }

    add_file_size (ar_n, index, final_callback) {
        if (index >= this.preload_ar[ar_n].length) {
            ar_n++;
            index = 0;
        }
        
        if (ar_n >= this.preload_ar.length)
            return final_callback ();
    
        if (index === 0)
            this.loads.push ([]);
        
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => {
            this.total_size += parseInt(xhr.getResponseHeader("Content-Length"));
            this.add_file_size(ar_n, ++index, final_callback)
        });
        
        xhr.open("HEAD", this.preload_ar[ar_n][index]);
        xhr.send();
    }

    load (ar_n, index, final_callback) {
        if (index >= this.preload_ar[ar_n].length) {
            ar_n++;
            index = 0;
        }
        if (ar_n >= this.preload_ar.length)
            return final_callback ();
        
        let img = new Image();
        this.loads[ar_n].push (img);
        img.load (this.preload_ar[ar_n][index], (toadd) => {
            this.loaded_size += toadd;
            this.render();
            this.load (ar_n, ++index, final_callback);
        });
    }

    render () {
        this.logo.update_load (this.loaded_size / this.total_size * 100);
    }
}

class Slideshow extends ElementObject {
    constructor (el) {
        super ('');
        this.element = el;
    }
    
    start () {
        let curr = 0;
        let len = this.child("ol").get().getElementsByTagName("li").length;
        setInterval(function () {
            curr = ++curr % len;
            $("#slideshow-hover").css("top", "calc({0}00%/{1})".format(curr, len));
        }, 3000);
    }
}

function setTimeline (index) {
    let currActive = $(".timeline > ul > .active");
    $(currActive.get()).removeClass ("active");
    $(currActive.parent().children ().get(index)).addClass ("active");
}

let preload;
let slideshow;


let timeline = {
    current: 0,
    steps: [
        {
            in: function () {$.scrollify.current().children(".info").addClass ("first");},
            out: function () {$.scrollify.current().children(".info").removeClass ("first");}
        },
        {
            in: function () {$.scrollify.current().children(".info").addClass ("second");},
            out: function () {$.scrollify.current().children(".info").removeClass ("second");}
        }
    ],
    setTimeline (index) {
        let currActive = $.scrollify.current().children (".timeline-bottom").children ("ul").children (".active");
        $(currActive.get()).removeClass ("active");
        $(currActive.parent().children ().get(index)).addClass ("active");
    },
    next () {
        if ($.scrollify.current().children(".keyboard").children (".right").hasClass("disabled"))
            return;
        
        $.scrollify.current().children(".keyboard").children (".left").removeClass("disabled");
        timeline.steps[timeline.current].out();
        timeline.current++;
        timeline.steps[timeline.current].in();
        if (timeline.current + 1 === timeline.steps.length) {
            $.scrollify.current().children(".keyboard").children (".right").addClass("disabled");
        }
        timeline.setTimeline (timeline.current);
    },
    back () {
        if ($.scrollify.current().children(".keyboard").children (".left").hasClass("disabled"))
            return;
        $.scrollify.current().children(".keyboard").children (".right").removeClass("disabled");
        timeline.steps[timeline.current].out();
        timeline.current--;
        timeline.steps[timeline.current].in();
        if (timeline.current === 0) {
            $.scrollify.current().children(".keyboard").children (".left").addClass("disabled");
        }
        timeline.setTimeline (timeline.current);
    }
};

class AnimationHandler {
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

$(document).ready (function (){
    preload = new Preload ([
        AnimationHandler.genList ("resources/anim1/%04f.png", 125)
    ], function () {
        $(preload.logo.get()).addClass ("loaded");
        $(".content").addClass ("loaded");
        $(function() {
            $.scrollify({
                easing: "easeInOutCubic",
                section : ".content",
                scrollSpeed: 800,
                touchScroll: false,
                before:setTimeline,
            });
        });
    });
    
    preload.start ();
    slideshow = new Slideshow ($(".slideshow"));
    slideshow.start();
    
    $(".down-arrow").click ($.scrollify.next);
    $(".timeline > ul > li").click(function(){$.scrollify.move($(this).index());});
    $(".keyboard .left").click(timeline.back);
    $(".keyboard .right").click(timeline.next);
});

class productStep {
    constructor (parent, step_arr) {
        //this.current =
    }
    
    next () {
    
    }
}


$(document).keydown(function(e){
    if (e.keyCode === 37) {
        timeline.back ();
    }
    else if (e.keyCode === 39) {
        timeline.next();
    }
});