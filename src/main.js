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

    readlines () {
        return this.text.split ("\n");
    }
}

class ElementObject {
    constructor (_str) {
        if (_str !== '') {
            this.element = $($.parseHTML (_str))
        }
    }

    static new_with_class (_str, _class) {
        return new ElementObject ("<div class=\"{0}\">{1}</div>".format (_class, _str));
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

    get_grey_mask () {
        return ElementObject.new_wrap($("#logo{0}-grey-mask".format (this.modifier)));
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
    constructor (preload_ar, end_callback) {
        this.preload = preload_ar;
        this.logo = new Logo ('../resources/logo.svg', 'name');
        this.end = end_callback;

        this.total_size = 0;
        this.size_checked = 0;
        this.loaded_size = 0;

        this.called_load = false;
    }

    start () {
        let _this = this;
        if (this.preload.length === 0) {
            this.end ();
            this.loaded_size = 1;
            this.total_size = 1;
            this.render ();
            return;
        }
        this.preload.forEach (function(file) {
            _this.add_file_size (file, function (size) {
                _this.total_size += size;
                _this.size_checked++;
                if (_this.size_checked >= _this.preload.length && !_this.called_load) {
                    _this.called_load = true;
                    _this.preload.forEach (function(file) {
                        _this.load (file);
                    });
                }
            });
        });
    }

    add_file_size (url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, true);

        let _this = this;
        xhr.onreadystatechange = function() {
            if (this.readyState === this.DONE) {
                callback(parseInt(xhr.getResponseHeader("Content-Length")));
            }
        };
        xhr.send();
    }

    load (url) {
        let img = new Image();
        let _this = this;
        img.load (url, function (toadd){
            _this.loaded_size += toadd;
            _this.render ();
        });
    }

    render () {
        this.logo.update_load (this.loaded_size / this.total_size * 100);
        if (this.loaded_size >= this.total_size) {
            if (this.end !== undefined) {
                this.end ();
            }
        }
    }
}

class Slideshow extends ElementObject {
    constructor (el) {
        super ('');
        this.element = el;
    }
    
    start () {
        var _this = this;
        var curr = 0;
        var len = this.child("ol").get().getElementsByTagName ("li").length
        setInterval (function () {
            curr = ++curr % len;
            $("#slideshow-hover").css ("top", "calc({0}00%/{1})".format (curr, len));
        }, 3000);
    }
}

var preload;
var slideshow;

$(document).ready (function (){
    preload = new Preload ([], function () {
        $(preload.logo.get()).addClass ("loaded");
        $(".content").addClass ("loaded");
    });
    preload.start ();
    slideshow = new Slideshow ($(".slideshow"));
    slideshow.start();
});
