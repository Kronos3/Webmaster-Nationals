String.prototype.format = function (..._args) {
    var args = _args;
    return this.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined'
            ? args[number] : match;
    });
}

Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
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
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", this.path, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    this.text = rawFile.responseText;
                }
            }
        }
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
        if (_str != '') {
            this.element = $($.parseHTML (_str))
        }
    }
    
    static new_with_class (_str, _class) {
        return new ElementObject ("<div class=\"{0}\">{1}</div>".format (_class, _str));
    }
    
    static new_wrap (el) {
        var out = new ElementObject ('');
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
}

class Logo extends ElementObject {
    constructor (path) {
        var _file = new JSFile (path);
        super (_file.read());
        this.addto (document.body);
        this.update_load (0);
    }
    
    get_blue_mask () {
        return ElementObject.new_wrap ($("#logo-blue-mask"));
    }
    
    get_grey_mask () {
        return ElementObject.new_wrap ($("#logo-grey-mask"));
    }
    
    update_load (percentage) {
        this.get_blue_mask ().element.css ("clip-path", "polygon({0}% 0, {0}% 100%, 0 100%, 0 0)".format(percentage));
    }
}

Image.prototype.load = function (url, parent) {
    var thisImg = this;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        var blob = new Blob([this.response]);
        thisImg.src = window.URL.createObjectURL(blob);
    };
    
    xmlHTTP.onprogress = function(e) {
        var _new =  e.loaded - thisImg.already;
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
        this.logo = new Logo ('../resources/logo.svg');
        this.end = end_callback;
        
        this.total_size = 0;
        this.size_checked = 0;
        this.loaded_size = 0;
        
        this.called_load = false;
    }
    
    start () {
        var _this = this;
        console.log (this.preload);
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
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, true);
        
        var _this = this
        
        xhr.onreadystatechange = function() {
            if (this.readyState == this.DONE) {
                callback(parseInt(xhr.getResponseHeader("Content-Length")));
            }
        };
        xhr.send();
    }
    
    load (url) {
        var img = new Image();
        var _this = this;
        img.load (url, function (toadd){
            _this.loaded_size += toadd;
            _this.render ();
        });
    }
    
    render () {
        this.logo.update_load (this.loaded_size / this.total_size * 100);
    }
}

$(document).ready (function (){
    var preload = new Preload (["resources/yeshi-kangrang-338592.jpg"]);
    preload.start ();
});
