export class PNGAnimation {
    constructor (arrayb, finish) {
        this.parent_buffer = arrayb;
        
        this.parent_data_view = new DataView(this.parent_buffer);
        
        this.finish = finish;
        this.img_n = this.parent_data_view.getInt32(0, true);
        this.images = [];
        this.images.length = this.img_n;
        
        this.read_png(4, 0);
    }
    
    read_png (offset, i) {
        if (i >= this.img_n) {
            this.finish ();
            return;
        }
        let img_size = this.parent_data_view.getInt32(offset, true);
        let b = new Uint8ClampedArray (this.parent_buffer, offset + 4, img_size);
        this.images[i] = new Blob([b], { type: "image/png" });
        this.read_png(offset + 4 + img_size, ++i);
    }
}