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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(3);
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
        console.log(this.get());
        console.log(target.get());
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
const animation_1 = __webpack_require__(2);
const element_1 = __webpack_require__(0);
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
class Section extends element_1.ElementObject {
    /**
     * Creates a new section that can be added to Main
     * @param name Name of the new section (sets id to this)
     */
    constructor(name, next_to, back_to) {
        super($($.parseHTML("<div id=\"{0}\" class=\"section\"></div>".format(name))));
        this.next_to = next_to;
        this.back_to = back_to;
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
function parse_website(obj) {
    var out = new Main();
    obj.sections.forEach(el => {
        var SEC = new Section(el.name);
        el.objects.forEach(ob => {
            var OBJECT = new animation_1.Animatable(ob.obj);
            ob.animations.forEach(anim => {
                OBJECT.add_animation(anim.name, anim.callback);
            });
            SEC.objadd(ob.name, OBJECT);
        });
        out.add_section(SEC);
    });
}
var nationals_site = {
    sections: [
        {
            name: "lander",
            objects: []
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
/* 2 */
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
/* 3 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjA1ZDMzZGE3NmJkYTJjNmY5NzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsdUJBQWdCO0FBRWhCO0lBR0ksWUFBWSxFQUFVLEVBQUUsVUFBbUI7UUFDdkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLEVBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFFLE1BQXFCO1FBQ3hC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Q0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQUU7SUFDUCxDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYwNWQzM2RhNzZiZGEyYzZmOTc4IiwiaW1wb3J0ICcuL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgRWxlbWVudE9iamVjdCB7XG4gICAgcHJpdmF0ZSBlbDogSlF1ZXJ5O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGVsOiBKUXVlcnksIF9jbGFzc19zdHI/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICBfY2xhc3Nfc3RyID09IG51bGwgPyBfY2xhc3Nfc3RyID0gXCJlbGVtZW50LW9iamVjdFwiOiBfY2xhc3Nfc3RyID0gX2NsYXNzX3N0cjtcbiAgICAgICAgaWYgKGVsID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwgPSAkKCQucGFyc2VIVE1MKFwiPGRpdiBjbGFzcz1cXFwiezB9XFxcIj48L2Rpdj5cIi5mb3JtYXQoX2NsYXNzX3N0cikpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBhZGR0byAodGFyZ2V0OiBFbGVtZW50T2JqZWN0KSB7XG4gICAgICAgIHRhcmdldC5hZGQgKHRoaXMpO1xuICAgIH1cbiAgICBcbiAgICBhZGQgKHRhcmdldDogRWxlbWVudE9iamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldCgpKTtcbiAgICAgICAgY29uc29sZS5sb2codGFyZ2V0LmdldCgpKTtcbiAgICAgICAgdGhpcy5nZXQoKS5hcHBlbmRDaGlsZCAodGFyZ2V0LmdldCgpKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxbMF07XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbGVtZW50LnRzIiwiaW1wb3J0IHsgQW5pbWF0YWJsZSB9IGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCB7IEVsZW1lbnRPYmplY3QgfSBmcm9tICcuL2VsZW1lbnQnO1xuaW1wb3J0IHsgU1ZHIH0gZnJvbSAnLi9zdmcnO1xuXG5jbGFzcyBNYWluIGV4dGVuZHMgRWxlbWVudE9iamVjdCB7XG4gICAgcGFnZV9uOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzZWN0aW9uczogU2VjdGlvbltdO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHNjcm9sbD86IChwcmV2OiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlcikgPT4gdm9pZCkge1xuICAgICAgICBzdXBlciAobnVsbCwgXCJtYWluXCIpO1xuICAgICAgICB0aGlzLnNjcm9sbCA9IHNjcm9sbDtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsID0gdGhpcy5kZWZhdWx0X3Njcm9sbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlY3Rpb25zID0gbmV3IEFycmF5PFNlY3Rpb24+KCk7XG4gICAgICAgIHRoaXMuYWRkdG8gKG5ldyBFbGVtZW50T2JqZWN0ICgkKFwiYm9keVwiKSkpO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICBhZGRfc2VjdGlvbiAoc2VjOiBTZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMucHVzaCAoc2VjKTtcbiAgICAgICAgdGhpcy5hZGQgKHNlYyk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2Nyb2xsOiAocHJldjogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpID0+IHZvaWQ7XG4gICAgXG4gICAgcHJpdmF0ZSBkZWZhdWx0X3Njcm9sbCAocHJldjogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgXG4gICAgfVxufVxuXG5jbGFzcyBTZWN0aW9uIGV4dGVuZHMgRWxlbWVudE9iamVjdCB7XG4gICAgcHJpdmF0ZSBvYmplY3RzOiBNYXA8c3RyaW5nLCBBbmltYXRhYmxlPGFueT4gfCBFbGVtZW50T2JqZWN0PjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgXG4gICAgLyoqXG4gICAgICogUGxheSB3aGVuIGdvaW5nIGZyb20gcHJldmlvdXMgdG8gaGVyZVxuICAgICAqIGlmIGZpcnN0IGl0IHdpbGwgYXV0b21hdGljYWxseSBwbGF5XG4gICAgICovXG4gICAgbmV4dF90bzogKCkgPT4gdm9pZDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBQbGF5IHdoZW4gZ29pbmcgYmFja3dhcmRzIHRvIGhlcmVcbiAgICAgKi9cbiAgICBiYWNrX3RvOiAoKSA9PiB2b2lkO1xuICAgIFxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc2VjdGlvbiB0aGF0IGNhbiBiZSBhZGRlZCB0byBNYWluXG4gICAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgbmV3IHNlY3Rpb24gKHNldHMgaWQgdG8gdGhpcylcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG5leHRfdG8/OiAoKSA9PiB2b2lkLCBiYWNrX3RvPzogKCkgPT4gdm9pZCkge1xuICAgICAgICBzdXBlcigkKCQucGFyc2VIVE1MKFwiPGRpdiBpZD1cXFwiezB9XFxcIiBjbGFzcz1cXFwic2VjdGlvblxcXCI+PC9kaXY+XCIuZm9ybWF0IChuYW1lKSkpKTtcbiAgICAgICAgdGhpcy5uZXh0X3RvID0gbmV4dF90bztcbiAgICAgICAgdGhpcy5iYWNrX3RvID0gYmFja190bztcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogU2VhcmNoZWQgZm9yIG9iamVjdF9uYW1lIGluIG9iamVjdHMgYW5kIHJldHVybnMgaXRcbiAgICAgKiBAcGFyYW0gb2JqZWN0X25hbWUgVGhlIG5hbWUgb2YgdGhlIG9iamVjdCB0byBzZWFyY2ggZm9yXG4gICAgICogQHJldHVybiBUaGUgb2JqZWN0IGluIHRoZSBtYXBcbiAgICAgKi9cbiAgICBvYmpnZXQob2JqZWN0X25hbWU6IHN0cmluZyk6IEFuaW1hdGFibGU8YW55PiB8IEVsZW1lbnRPYmplY3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzW29iamVjdF9uYW1lXTtcbiAgICB9XG4gICAgXG4gICAgb2JqYWRkIChvYmplY3RfbmFtZTpzdHJpbmcsIG9iajogQW5pbWF0YWJsZTxhbnk+IHwgRWxlbWVudE9iamVjdCkge1xuICAgICAgICB0aGlzLmFkZCAob2JqKTtcbiAgICAgICAgdGhpcy5vYmplY3RzW29iamVjdF9uYW1lXSA9IG9iajtcbiAgICB9XG59XG5cbmludGVyZmFjZSBhbmltYXRpb25fY2FsbGJhY2sge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjYWxsYmFjaz86IChlbDogRWxlbWVudE9iamVjdCwgLi4uX2FyZ3M6IGFueVtdKSA9PiB2b2lkO1xufVxuXG5pbnRlcmZhY2Ugb2JqIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgb2JqOiBFbGVtZW50T2JqZWN0O1xuICAgIGFuaW1hdGlvbnM6IGFuaW1hdGlvbl9jYWxsYmFja1tdO1xufVxuXG5pbnRlcmZhY2Ugc2VjdGlvbiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG9iamVjdHM6IG9ialtdO1xuICAgIG5leHRfdG8/OigpID0+IHZvaWQ7XG4gICAgYmFja190bz86KCkgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIHdlYnNpdGUge1xuICAgIHNlY3Rpb25zOiBzZWN0aW9uW107XG4gICAgc2Nyb2xsPzoocHJldjogbnVtYmVyLCBjdXJyZW50Om51bWJlcikgPT4gdm9pZDtcbn1cblxuZnVuY3Rpb24gcGFyc2Vfd2Vic2l0ZSAob2JqOiB3ZWJzaXRlKSB7XG4gICAgdmFyIG91dDogTWFpbiA9IG5ldyBNYWluICgpO1xuICAgIG9iai5zZWN0aW9ucy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgdmFyIFNFQyA9IG5ldyBTZWN0aW9uIChlbC5uYW1lKTtcbiAgICAgICAgZWwub2JqZWN0cy5mb3JFYWNoKG9iID0+IHtcbiAgICAgICAgICAgIHZhciBPQkpFQ1QgPSBuZXcgQW5pbWF0YWJsZSAob2Iub2JqKTtcbiAgICAgICAgICAgIG9iLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltID0+IHtcbiAgICAgICAgICAgICAgICBPQkpFQ1QuYWRkX2FuaW1hdGlvbiAoYW5pbS5uYW1lLCBhbmltLmNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgU0VDLm9iamFkZCAob2IubmFtZSwgT0JKRUNUKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG91dC5hZGRfc2VjdGlvbihTRUMpO1xuICAgIH0pO1xufVxuXG52YXIgbmF0aW9uYWxzX3NpdGU6d2Vic2l0ZSA9IDx3ZWJzaXRlPntcbiAgICBzZWN0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImxhbmRlclwiLFxuICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgfVxuICAgIF1cbn1cblxuZnVuY3Rpb24gbWFpbigpOiBudW1iZXIge1xuICAgIHBhcnNlX3dlYnNpdGUgKG5hdGlvbmFsc19zaXRlKTtcbiAgICBcbiAgICByZXR1cm4gMDtcbn1cblxudmFyIHJldDogbnVtYmVyO1xuJChkb2N1bWVudCkucmVhZHkgKCgpID0+IHtcbiAgICBpZiAoKHJldCA9IG1haW4oKSkgIT0gMCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwibWFpbigpIGV4aXRlZCB3aXRoIGNvZGUgezB9XCIuZm9ybWF0KHJldCkpO1xuICAgIH1cbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi50cyIsImltcG9ydCB7IEVsZW1lbnRPYmplY3QgfSBmcm9tICcuL2VsZW1lbnQnO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0YWJsZTxUIGV4dGVuZHMgRWxlbWVudE9iamVjdD4gZXh0ZW5kcyBFbGVtZW50T2JqZWN0IHtcbiAgICBjaGlsZDogVDtcbiAgICBhbmltYXRpb25zOiBNYXA8c3RyaW5nLCAoZWw6IEVsZW1lbnRPYmplY3QsIC4uLl9hcmdzOiBhbnlbXSkgPT4gdm9pZD47XG4gICAgXG4gICAgY29uc3RydWN0b3IgKGNoaWxkOiBUKSB7XG4gICAgICAgIHN1cGVyICgkKGNoaWxkLmdldCgpKSk7XG4gICAgICAgIHRoaXMuY2hpbGQgPSBjaGlsZDtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gbmV3IE1hcDxzdHJpbmcsIChlbDogRWxlbWVudE9iamVjdCwgLi4uX2FyZ3M6IGFueVtdKSA9PiB2b2lkPigpO1xuICAgIH1cbiAgICBcbiAgICBhZGRfYW5pbWF0aW9uKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChlbDogRWxlbWVudE9iamVjdCwgLi4uX2FyZ3M6IGFueVtdKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uc1tuYW1lXSA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBcbiAgICBwbGF5IChuYW1lOiBzdHJpbmcsIC4uLl9hcmdzOiBhbnlbXSkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnNbbmFtZV0gKHRoaXMuY2hpbGQsIF9hcmdzKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FuaW1hdGlvbi50cyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbmNsdWRlL3V0aWwuZC50c1wiIC8+XG5cblN0cmluZy5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKC4uLl9hcmdzKSB7XG4gICAgdmFyIGFyZ3MgPSBfYXJncztcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC97KFxcZCspfS9nLCAobWF0Y2gsIG51bWJlcikgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3NbbnVtYmVyXSAhPSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgPyBhcmdzW251bWJlcl0gOiBtYXRjaDtcbiAgICB9KTtcbn1cblxuXG5BcnJheS5wcm90b3R5cGUuaW5kZXhPZiB8fCAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoZCwgZSkge1xuICAgIHZhciBhO1xuICAgIGlmIChudWxsID09IHRoaXMpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widGhpc1wiIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcbiAgICB2YXIgYyA9IE9iamVjdCh0aGlzKSxcbiAgICAgICAgYiA9IGMubGVuZ3RoID4+PiAwO1xuICAgIGlmICgwID09PSBiKSByZXR1cm4gLTE7XG4gICAgYSA9ICtlIHx8IDA7XG4gICAgSW5maW5pdHkgPT09IE1hdGguYWJzKGEpICYmIChhID0gMCk7XG4gICAgaWYgKGEgPj0gYikgcmV0dXJuIC0xO1xuICAgIGZvciAoYSA9IE1hdGgubWF4KDAgPD0gYSA/IGEgOiBiIC0gTWF0aC5hYnMoYSksIDApOyBhIDwgYjspIHtcbiAgICAgICAgaWYgKGEgaW4gYyAmJiBjW2FdID09PSBkKSByZXR1cm4gYTtcbiAgICAgICAgYSsrXG4gICAgfVxuICAgIHJldHVybiAtMVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwudHMiXSwic291cmNlUm9vdCI6IiJ9