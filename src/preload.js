import {Logo} from './logo.js';

export class Preload {
    constructor (preload_ar_ar, construtor_ar, end_callback) {
        this.preload_ar = preload_ar_ar;
        this.constructor_ar = construtor_ar;
        this.logo = new Logo ('../resources/logo.svg', 'name');
        this.end = end_callback;
        this.total_size = 0;
        this.loaded_size = 0;
        this.loads = [];
        this.loads.length = preload_ar_ar.length;
    }
    
    start () {
        this.add_file_size(0, 0, () => {
            this.load (0, 0, () => {
                this.end ();
            });
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
        if (index === 0) {
            this.loads[index] = [];
            this.loads[index].length = this.preload_ar[ar_n].length;
        }
    
        let xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open('GET', this.preload_ar[ar_n][index], true);
        xmlHTTP.responseType = 'arraybuffer';
        
        let _this = this;
        xmlHTTP.onload = function () {
            _this.loads[ar_n][index] = _this.constructor_ar[ar_n] (this.response, function () {
                _this.load (ar_n, ++index, final_callback);
            });
        };
    
        xmlHTTP.onprogress = function(e) {
            let _new =  e.loaded - this.already;
            this.already = e.loaded;
            _this.loaded_size += _new;
            console.log (_new);
            _this.render ();
        };
        
        xmlHTTP.onloadstart = function() {
            this.already = 0;
        };
        xmlHTTP.send();
    }
    
    render () {
        console.log (this.loaded_size);
        this.logo.update_load (this.loaded_size / this.total_size * 100);
    }
}