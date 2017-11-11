/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(4);
class ElementObject {
    constructor(el, _class_str) {
        this.el = el;
        _class_str == null ? _class_str = "element-object" : _class_str = _class_str;
        if (el == null) {
            this.el = $($.parseHTML("<div class=\"{0}\"></div>".format(_class_str)));
        }
    }
    addto(target) {
        target.add(this);
    }
    add(target) {
        this.get().appendChild(target.get());
    }
    get() {
        return this.el[0];
    }
}
exports.ElementObject = ElementObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __webpack_require__(0);
class Section extends element_1.ElementObject {
    /**
     * Creates a new section that can be added to Main
     * @param name Name of the new section (sets id to this)
     */
    constructor(name, next_to, back_to) {
        super($($.parseHTML("<div id=\"{0}\" class=\"section\"></div>".format(name))));
        this.next_to = next_to;
        this.back_to = back_to;
        this.objects = new Map();
    }
    /**
     * Searched for object_name in objects and returns it
     * @param object_name The name of the object to search for
     * @return The object in the map
     */
    objget(object_name) {
        return this.objects[object_name];
    }
    objadd(object_name, obj) {
        this.add(obj);
        this.objects[object_name] = obj;
    }
}
exports.Section = Section;
class SectionInner extends element_1.ElementObject {
}
exports.SectionInner = SectionInner;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const animation_1 = __webpack_require__(3);
const element_1 = __webpack_require__(0);
const section_1 = __webpack_require__(1);
const section_2 = __webpack_require__(1);
class Main extends element_1.ElementObject {
    constructor(scroll) {
        super(null, "main");
        this.scroll = scroll;
        if (this.scroll == null) {
            this.scroll = this.default_scroll;
        }
        this.sections = new Array();
        this.addto(new element_1.ElementObject($("body")));
    }
    add_section(sec) {
        this.sections.push(sec);
        this.add(sec);
    }
    default_scroll(prev, current) {
    }
}
function parse_website(obj) {
    var out = new Main();
    obj.sections.forEach(el => {
        var SEC = new section_1.Section(el.name);
        if (el.objects != null) {
            el.objects.forEach(ob => {
                var OBJECT = new animation_1.Animatable(ob.obj);
                if (ob.animations != null) {
                    ob.animations.forEach(anim => {
                        OBJECT.add_animation(anim.name, anim.callback);
                    });
                }
                SEC.objadd(ob.name, OBJECT);
            });
        }
        out.add_section(SEC);
    });
}
var nationals_site = {
    sections: [
        {
            name: "lander",
            objects: [
                {
                    name: "inner",
                    obj: new section_2.SectionInner(null, "section-inner")
                }
            ]
        }
    ]
};
function main() {
    parse_website(nationals_site);
    return 0;
}
var ret;
$(document).ready(() => {
    if ((ret = main()) != 0) {
        console.error("main() exited with code {0}".format(ret));
    }
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __webpack_require__(0);
class Animatable extends element_1.ElementObject {
    constructor(child) {
        super($(child.get()));
        this.child = child;
        this.animations = new Map();
    }
    add_animation(name, callback) {
        this.animations[name] = callback;
    }
    play(name, ..._args) {
        this.animations[name](this.child, _args);
    }
}
exports.Animatable = Animatable;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/// <reference path="../include/util.d.ts" />
String.prototype.format = function (..._args) {
    var args = _args;
    return this.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined'
            ? args[number] : match;
    });
};
Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) {
    var a;
    if (null == this)
        throw new TypeError('"this" is null or not defined');
    var c = Object(this), b = c.length >>> 0;
    if (0 === b)
        return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b)
        return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === d)
            return a;
        a++;
    }
    return -1;
});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjA1Mjc2ZDAyMWYwNzI2NzgxZTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsdUJBQWdCO0FBRWhCO0lBR0ksWUFBWSxFQUFVLEVBQUUsVUFBbUI7UUFDdkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLEVBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLENBQUM7SUFDTCxD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QyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFDaEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNaLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQUU7SUFDUCxDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYwNTI3NmQwMjFmMDcyNjc4MWU4IiwiaW1wb3J0ICcuL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgRWxlbWVudE9iamVjdCB7XG4gICAgcHJpdmF0ZSBlbDogSlF1ZXJ5O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGVsOiBKUXVlcnksIF9jbGFzc19zdHI/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICBfY2xhc3Nfc3RyID09IG51bGwgPyBfY2xhc3Nfc3RyID0gXCJlbGVtZW50LW9iamVjdFwiOiBfY2xhc3Nfc3RyID0gX2NsYXNzX3N0cjtcbiAgICAgICAgaWYgKGVsID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwgPSAkKCQucGFyc2VIVE1MKFwiPGRpdiBjbGFzcz1cXFwiezB9XFxcIj48L2Rpdj5cIi5mb3JtYXQoX2NsYXNzX3N0cikpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBhZGR0byAodGFyZ2V0OiBFbGVtZW50T2JqZWN0KSB7XG4gICAgICAgIHRhcmdldC5hZGQgKHRoaXMpO1xuICAgIH1cbiAgICBcbiAgICBhZGQgKHRhcmdldDogRWxlbWVudE9iamVjdCkge1xuICAgICAgICB0aGlzLmdldCgpLmFwcGVuZENoaWxkICh0YXJnZXQuZ2V0KCkpO1xuICAgIH1cbiAgICBcbiAgICBnZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbFswXTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VsZW1lbnQudHMiLCJpbXBvcnQgeyBBbmltYXRhYmxlIH0gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IHsgRWxlbWVudE9iamVjdCB9IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQgeyBTVkcgfSBmcm9tICcuL3N2Zyc7XG5cbmV4cG9ydCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgRWxlbWVudE9iamVjdCB7XG4gICAgcHJpdmF0ZSBvYmplY3RzOiBNYXA8c3RyaW5nLCBBbmltYXRhYmxlPGFueT4gfCBFbGVtZW50T2JqZWN0PjtcbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBQbGF5IHdoZW4gZ29pbmcgZnJvbSBwcmV2aW91cyB0byBoZXJlXG4gICAgICogaWYgZmlyc3QgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IHBsYXlcbiAgICAgKi9cbiAgICBuZXh0X3RvOiAoKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogUGxheSB3aGVuIGdvaW5nIGJhY2t3YXJkcyB0byBoZXJlXG4gICAgICovXG4gICAgYmFja190bzogKCkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc2VjdGlvbiB0aGF0IGNhbiBiZSBhZGRlZCB0byBNYWluXG4gICAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgbmV3IHNlY3Rpb24gKHNldHMgaWQgdG8gdGhpcylcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG5leHRfdG8/OiAoKSA9PiB2b2lkLCBiYWNrX3RvPzogKCkgPT4gdm9pZCkge1xuICAgICAgICBzdXBlcigkKCQucGFyc2VIVE1MKFwiPGRpdiBpZD1cXFwiezB9XFxcIiBjbGFzcz1cXFwic2VjdGlvblxcXCI+PC9kaXY+XCIuZm9ybWF0KG5hbWUpKSkpO1xuICAgICAgICB0aGlzLm5leHRfdG8gPSBuZXh0X3RvO1xuICAgICAgICB0aGlzLmJhY2tfdG8gPSBiYWNrX3RvO1xuICAgICAgICB0aGlzLm9iamVjdHMgPSBuZXcgTWFwPHN0cmluZywgQW5pbWF0YWJsZTxhbnk+IHwgRWxlbWVudE9iamVjdD4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlZCBmb3Igb2JqZWN0X25hbWUgaW4gb2JqZWN0cyBhbmQgcmV0dXJucyBpdFxuICAgICAqIEBwYXJhbSBvYmplY3RfbmFtZSBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRvIHNlYXJjaCBmb3JcbiAgICAgKiBAcmV0dXJuIFRoZSBvYmplY3QgaW4gdGhlIG1hcFxuICAgICAqL1xuICAgIG9iamdldChvYmplY3RfbmFtZTogc3RyaW5nKTogQW5pbWF0YWJsZTxhbnk+IHwgRWxlbWVudE9iamVjdCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdHNbb2JqZWN0X25hbWVdO1xuICAgIH1cblxuICAgIG9iamFkZChvYmplY3RfbmFtZTogc3RyaW5nLCBvYmo6IEFuaW1hdGFibGU8YW55PiB8IEVsZW1lbnRPYmplY3QpIHtcbiAgICAgICAgdGhpcy5hZGQob2JqKTtcbiAgICAgICAgdGhpcy5vYmplY3RzW29iamVjdF9uYW1lXSA9IG9iajtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZWN0aW9uSW5uZXIgZXh0ZW5kcyBFbGVtZW50T2JqZWN0IHtcbiAgICBcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlY3Rpb24udHMiLCJpbXBvcnQgeyBBbmltYXRhYmxlIH0gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IHsgRWxlbWVudE9iamVjdCB9IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQgeyBTZWN0aW9uIH0gZnJvbSAnLi9zZWN0aW9uJztcbmltcG9ydCB7IFNlY3Rpb25Jbm5lciB9IGZyb20gJy4vc2VjdGlvbic7XG5cbmNsYXNzIE1haW4gZXh0ZW5kcyBFbGVtZW50T2JqZWN0IHtcbiAgICBwYWdlX246IG51bWJlcjtcbiAgICBwcml2YXRlIHNlY3Rpb25zOiBTZWN0aW9uW107XG4gICAgXG4gICAgY29uc3RydWN0b3Ioc2Nyb2xsPzogKHByZXY6IG51bWJlciwgY3VycmVudDogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgICAgIHN1cGVyIChudWxsLCBcIm1haW5cIik7XG4gICAgICAgIHRoaXMuc2Nyb2xsID0gc2Nyb2xsO1xuICAgICAgICBpZiAodGhpcy5zY3JvbGwgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGwgPSB0aGlzLmRlZmF1bHRfc2Nyb2xsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VjdGlvbnMgPSBuZXcgQXJyYXk8U2VjdGlvbj4oKTtcbiAgICAgICAgdGhpcy5hZGR0byAobmV3IEVsZW1lbnRPYmplY3QgKCQoXCJib2R5XCIpKSk7XG4gICAgfVxuICAgIFxuICAgIFxuICAgIGFkZF9zZWN0aW9uIChzZWM6IFNlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5zZWN0aW9ucy5wdXNoIChzZWMpO1xuICAgICAgICB0aGlzLmFkZCAoc2VjKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzY3JvbGw6IChwcmV2OiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlcikgPT4gdm9pZDtcbiAgICBcbiAgICBwcml2YXRlIGRlZmF1bHRfc2Nyb2xsIChwcmV2OiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBcbiAgICB9XG59XG5cbmludGVyZmFjZSBhbmltYXRpb25fY2FsbGJhY2sge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjYWxsYmFjaz86IChlbDogRWxlbWVudE9iamVjdCwgLi4uX2FyZ3M6IGFueVtdKSA9PiB2b2lkO1xufVxuXG5pbnRlcmZhY2Ugb2JqIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgb2JqOiBFbGVtZW50T2JqZWN0O1xuICAgIGFuaW1hdGlvbnM6IGFuaW1hdGlvbl9jYWxsYmFja1tdO1xufVxuXG5pbnRlcmZhY2Ugc2VjdGlvbiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG9iamVjdHM6IG9ialtdO1xuICAgIG5leHRfdG8/OigpID0+IHZvaWQ7XG4gICAgYmFja190bz86KCkgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIHdlYnNpdGUge1xuICAgIHNlY3Rpb25zOiBzZWN0aW9uW107XG4gICAgc2Nyb2xsPzoocHJldjogbnVtYmVyLCBjdXJyZW50Om51bWJlcikgPT4gdm9pZDtcbn1cblxuZnVuY3Rpb24gcGFyc2Vfd2Vic2l0ZSAob2JqOiB3ZWJzaXRlKSB7XG4gICAgdmFyIG91dDogTWFpbiA9IG5ldyBNYWluICgpO1xuICAgIG9iai5zZWN0aW9ucy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgdmFyIFNFQyA9IG5ldyBTZWN0aW9uIChlbC5uYW1lKTtcbiAgICAgICAgaWYgKGVsLm9iamVjdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgZWwub2JqZWN0cy5mb3JFYWNoKG9iID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgT0JKRUNUID0gbmV3IEFuaW1hdGFibGUob2Iub2JqKTtcbiAgICAgICAgICAgICAgICBpZiAob2IuYW5pbWF0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9CSkVDVC5hZGRfYW5pbWF0aW9uKGFuaW0ubmFtZSwgYW5pbS5jYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBTRUMub2JqYWRkKG9iLm5hbWUsIE9CSkVDVCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgb3V0LmFkZF9zZWN0aW9uKFNFQyk7XG4gICAgfSk7XG59XG5cbnZhciBuYXRpb25hbHNfc2l0ZTp3ZWJzaXRlID0gPHdlYnNpdGU+e1xuICAgIHNlY3Rpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibGFuZGVyXCIsXG4gICAgICAgICAgICBvYmplY3RzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlubmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iajogbmV3IFNlY3Rpb25Jbm5lciAobnVsbCwgXCJzZWN0aW9uLWlubmVyXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgXVxufVxuXG5mdW5jdGlvbiBtYWluKCk6IG51bWJlciB7XG4gICAgcGFyc2Vfd2Vic2l0ZSAobmF0aW9uYWxzX3NpdGUpO1xuICAgIFxuICAgIHJldHVybiAwO1xufVxuXG52YXIgcmV0OiBudW1iZXI7XG4kKGRvY3VtZW50KS5yZWFkeSAoKCkgPT4ge1xuICAgIGlmICgocmV0ID0gbWFpbigpKSAhPSAwKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJtYWluKCkgZXhpdGVkIHdpdGggY29kZSB7MH1cIi5mb3JtYXQocmV0KSk7XG4gICAgfVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLnRzIiwiaW1wb3J0IHsgRWxlbWVudE9iamVjdCB9IGZyb20gJy4vZWxlbWVudCc7XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRhYmxlPFQgZXh0ZW5kcyBFbGVtZW50T2JqZWN0PiBleHRlbmRzIEVsZW1lbnRPYmplY3Qge1xuICAgIGNoaWxkOiBUO1xuICAgIGFuaW1hdGlvbnM6IE1hcDxzdHJpbmcsIChlbDogRWxlbWVudE9iamVjdCwgLi4uX2FyZ3M6IGFueVtdKSA9PiB2b2lkPjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvciAoY2hpbGQ6IFQpIHtcbiAgICAgICAgc3VwZXIgKCQoY2hpbGQuZ2V0KCkpKTtcbiAgICAgICAgdGhpcy5jaGlsZCA9IGNoaWxkO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBuZXcgTWFwPHN0cmluZywgKGVsOiBFbGVtZW50T2JqZWN0LCAuLi5fYXJnczogYW55W10pID0+IHZvaWQ+KCk7XG4gICAgfVxuICAgIFxuICAgIGFkZF9hbmltYXRpb24obmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGVsOiBFbGVtZW50T2JqZWN0LCAuLi5fYXJnczogYW55W10pID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zW25hbWVdID0gY2FsbGJhY2s7XG4gICAgfVxuICAgIFxuICAgIHBsYXkgKG5hbWU6IHN0cmluZywgLi4uX2FyZ3M6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uc1tuYW1lXSAodGhpcy5jaGlsZCwgX2FyZ3MpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYW5pbWF0aW9uLnRzIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2luY2x1ZGUvdXRpbC5kLnRzXCIgLz5cblxuU3RyaW5nLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiAoLi4uX2FyZ3MpIHtcbiAgICB2YXIgYXJncyA9IF9hcmdzO1xuICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL3soXFxkKyl9L2csIChtYXRjaCwgbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJnc1tudW1iZXJdICE9ICd1bmRlZmluZWQnXG4gICAgICAgICAgICA/IGFyZ3NbbnVtYmVyXSA6IG1hdGNoO1xuICAgIH0pO1xufVxuXG5cbkFycmF5LnByb3RvdHlwZS5pbmRleE9mIHx8IChBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChkLCBlKSB7XG4gICAgdmFyIGE7XG4gICAgaWYgKG51bGwgPT0gdGhpcykgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ0aGlzXCIgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIHZhciBjID0gT2JqZWN0KHRoaXMpLFxuICAgICAgICBiID0gYy5sZW5ndGggPj4+IDA7XG4gICAgaWYgKDAgPT09IGIpIHJldHVybiAtMTtcbiAgICBhID0gK2UgfHwgMDtcbiAgICBJbmZpbml0eSA9PT0gTWF0aC5hYnMoYSkgJiYgKGEgPSAwKTtcbiAgICBpZiAoYSA+PSBiKSByZXR1cm4gLTE7XG4gICAgZm9yIChhID0gTWF0aC5tYXgoMCA8PSBhID8gYSA6IGIgLSBNYXRoLmFicyhhKSwgMCk7IGEgPCBiOykge1xuICAgICAgICBpZiAoYSBpbiBjICYmIGNbYV0gPT09IGQpIHJldHVybiBhO1xuICAgICAgICBhKytcbiAgICB9XG4gICAgcmV0dXJuIC0xXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC50cyJdLCJzb3VyY2VSb290IjoiIn0=