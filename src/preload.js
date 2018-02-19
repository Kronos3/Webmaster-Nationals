import {Logo} from 'logo';

/* The following will be obsolete after implementation
    PNG compression algorithm.
 */
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

export class Preload {
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