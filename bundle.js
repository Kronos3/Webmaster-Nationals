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
        this.children = new Map();
        this.objnum = 0;
    }
    addto(target) {
        target.add(this);
    }
    add(target) {
        this.objnum++;
        this.objadd("{0}".format(this.objnum), target);
    }
    get() {
        return this.el[0];
    }
    /**
     * Searched for object_name in objects and returns it
     * @param object_name The name of the object to search for
     * @return The object in the map
     */
    objget(object_name) {
        return this.children[object_name];
    }
    objadd(object_name, obj) {
        this.get().appendChild(obj.get());
        this.children[object_name] = obj;
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
const section_1 = __webpack_require__(4);
const svg_1 = __webpack_require__(5);
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
        out.add_section(SEC);
        var INNER;
        if (el.inner) {
            INNER = new element_1.ElementObject(null, "section-inner");
            SEC.objadd("inner", INNER);
            SEC = INNER;
        }
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
    });
}
var nationals_site = {
    sections: [
        {
            name: "lander",
            inner: true,
            objects: [
                {
                    name: "lander-svg",
                    obj: new svg_1.SVG("resources/lander-temp.svg")
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


/***/ }),
/* 4 */
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
    }
}
exports.Section = Section;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __webpack_require__(0);
const file_1 = __webpack_require__(6);
class SVG extends element_1.ElementObject {
    constructor(file) {
        let temp_file = new file_1.TSFile(file);
        super($($.parseHTML(temp_file.read())));
        this.file = temp_file;
    }
}
exports.SVG = SVG;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class TSFile {
    constructor(path) {
        this.path = path;
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", this.path, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    this.text = rawFile.responseText;
                }
            }
        };
        rawFile.send(null);
    }
    read() {
        return this.text;
    }
    readlines() {
        return this.text.split("\n");
    }
    readobject() {
        $.parseHTML(this.read());
    }
}
exports.TSFile = TSFile;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmE1ODJhNGRlZTk2NjJjMjNiOTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3ZnLnRzIiwid2VicGFjazovLy8uL3NyYy9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSx1QkFBZ0I7QUFFaEI7SUFLSSxZQUFZLEVBQVUsRUFBRSxVQUFtQjtRQUN2QyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxnQkFBZ0IsRUFBQyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDNUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFD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Q0FBQyxZQUFZLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUk7UUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsU0FBUztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsVUFBVTtRQUNOLENBQUMsQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBN0JELHdCQTZCQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmYTU4MmE0ZGVlOTY2MmMyM2I5OCIsImltcG9ydCAnLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRPYmplY3Qge1xuICAgIHByaXZhdGUgZWw6IEpRdWVyeTtcbiAgICBwcml2YXRlIGNoaWxkcmVuOiBNYXA8c3RyaW5nLCBFbGVtZW50T2JqZWN0PjtcbiAgICBvYmpudW06IG51bWJlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihlbDogSlF1ZXJ5LCBfY2xhc3Nfc3RyPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZWwgPSBlbDtcbiAgICAgICAgX2NsYXNzX3N0ciA9PSBudWxsID8gX2NsYXNzX3N0ciA9IFwiZWxlbWVudC1vYmplY3RcIjogX2NsYXNzX3N0ciA9IF9jbGFzc19zdHI7XG4gICAgICAgIGlmIChlbCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsID0gJCgkLnBhcnNlSFRNTChcIjxkaXYgY2xhc3M9XFxcInswfVxcXCI+PC9kaXY+XCIuZm9ybWF0KF9jbGFzc19zdHIpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG5ldyBNYXA8c3RyaW5nLCBFbGVtZW50T2JqZWN0PigpO1xuICAgICAgICB0aGlzLm9iam51bSA9IDA7XG4gICAgfVxuICAgIFxuICAgIGFkZHRvICh0YXJnZXQ6IEVsZW1lbnRPYmplY3QpIHtcbiAgICAgICAgdGFyZ2V0LmFkZCAodGhpcyk7XG4gICAgfVxuICAgIFxuICAgIGFkZCAodGFyZ2V0OiBFbGVtZW50T2JqZWN0KSB7XG4gICAgICAgIHRoaXMub2JqbnVtKys7XG4gICAgICAgIHRoaXMub2JqYWRkKFwiezB9XCIuZm9ybWF0KHRoaXMub2JqbnVtKSwgdGFyZ2V0KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoZWQgZm9yIG9iamVjdF9uYW1lIGluIG9iamVjdHMgYW5kIHJldHVybnMgaXRcbiAgICAgKiBAcGFyYW0gb2JqZWN0X25hbWUgVGhlIG5hbWUgb2YgdGhlIG9iamVjdCB0byBzZWFyY2ggZm9yXG4gICAgICogQHJldHVybiBUaGUgb2JqZWN0IGluIHRoZSBtYXBcbiAgICAgKi9cbiAgICBvYmpnZXQob2JqZWN0X25hbWU6IHN0cmluZyk6IEVsZW1lbnRPYmplY3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltvYmplY3RfbmFtZV07XG4gICAgfVxuXG4gICAgb2JqYWRkKG9iamVjdF9uYW1lOiBzdHJpbmcsIG9iajogRWxlbWVudE9iamVjdCkge1xuICAgICAgICB0aGlzLmdldCgpLmFwcGVuZENoaWxkKG9iai5nZXQoKSk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW5bb2JqZWN0X25hbWVdID0gb2JqO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWxlbWVudC50cyIsImltcG9ydCB7IEFuaW1hdGFibGUgfSBmcm9tICcuL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBFbGVtZW50T2JqZWN0IH0gZnJvbSAnLi9lbGVtZW50JztcbmltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuL3NlY3Rpb24nO1xuaW1wb3J0IHsgU1ZHIH0gZnJvbSAnLi9zdmcnO1xuXG5jbGFzcyBNYWluIGV4dGVuZHMgRWxlbWVudE9iamVjdCB7XG4gICAgcGFnZV9uOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzZWN0aW9uczogU2VjdGlvbltdO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHNjcm9sbD86IChwcmV2OiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlcikgPT4gdm9pZCkge1xuICAgICAgICBzdXBlciAobnVsbCwgXCJtYWluXCIpO1xuICAgICAgICB0aGlzLnNjcm9sbCA9IHNjcm9sbDtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsID0gdGhpcy5kZWZhdWx0X3Njcm9sbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlY3Rpb25zID0gbmV3IEFycmF5PFNlY3Rpb24+KCk7XG4gICAgICAgIHRoaXMuYWRkdG8gKG5ldyBFbGVtZW50T2JqZWN0ICgkKFwiYm9keVwiKSkpO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICBhZGRfc2VjdGlvbiAoc2VjOiBTZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMucHVzaCAoc2VjKTtcbiAgICAgICAgdGhpcy5hZGQgKHNlYyk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2Nyb2xsOiAocHJldjogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpID0+IHZvaWQ7XG4gICAgXG4gICAgcHJpdmF0ZSBkZWZhdWx0X3Njcm9sbCAocHJldjogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgXG4gICAgfVxufVxuXG5pbnRlcmZhY2UgYW5pbWF0aW9uX2NhbGxiYWNrIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2FsbGJhY2s/OiAoZWw6IEVsZW1lbnRPYmplY3QsIC4uLl9hcmdzOiBhbnlbXSkgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIG9iaiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG9iajogRWxlbWVudE9iamVjdDtcbiAgICBhbmltYXRpb25zPzogYW5pbWF0aW9uX2NhbGxiYWNrW107XG59XG5cbmludGVyZmFjZSBzZWN0aW9uIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgb2JqZWN0czogb2JqW107XG4gICAgaW5uZXI6IGJvb2xlYW47XG4gICAgbmV4dF90bz86KCkgPT4gdm9pZDtcbiAgICBiYWNrX3RvPzooKSA9PiB2b2lkO1xufVxuXG5pbnRlcmZhY2Ugd2Vic2l0ZSB7XG4gICAgc2VjdGlvbnM6IHNlY3Rpb25bXTtcbiAgICBzY3JvbGw/OihwcmV2OiBudW1iZXIsIGN1cnJlbnQ6bnVtYmVyKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBwYXJzZV93ZWJzaXRlIChvYmo6IHdlYnNpdGUpIHtcbiAgICB2YXIgb3V0OiBNYWluID0gbmV3IE1haW4gKCk7XG4gICAgb2JqLnNlY3Rpb25zLmZvckVhY2goZWwgPT4ge1xuICAgICAgICB2YXIgU0VDOkVsZW1lbnRPYmplY3QgPSBuZXcgU2VjdGlvbihlbC5uYW1lKTtcbiAgICAgICAgb3V0LmFkZF9zZWN0aW9uKDxTZWN0aW9uPlNFQyk7XG4gICAgICAgIHZhciBJTk5FUjpFbGVtZW50T2JqZWN0O1xuICAgICAgICBpZiAoZWwuaW5uZXIpIHtcbiAgICAgICAgICAgIElOTkVSID0gbmV3IEVsZW1lbnRPYmplY3QgKG51bGwsIFwic2VjdGlvbi1pbm5lclwiKTtcbiAgICAgICAgICAgIFNFQy5vYmphZGQgKFwiaW5uZXJcIiwgSU5ORVIpO1xuICAgICAgICAgICAgU0VDID0gSU5ORVI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsLm9iamVjdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgZWwub2JqZWN0cy5mb3JFYWNoKG9iID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgT0JKRUNUID0gbmV3IEFuaW1hdGFibGUob2Iub2JqKTtcbiAgICAgICAgICAgICAgICBpZiAob2IuYW5pbWF0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9CSkVDVC5hZGRfYW5pbWF0aW9uKGFuaW0ubmFtZSwgYW5pbS5jYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBTRUMub2JqYWRkKG9iLm5hbWUsIE9CSkVDVCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9KTtcbn1cblxudmFyIG5hdGlvbmFsc19zaXRlOndlYnNpdGUgPSA8d2Vic2l0ZT57XG4gICAgc2VjdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJsYW5kZXJcIixcbiAgICAgICAgICAgIGlubmVyOiB0cnVlLFxuICAgICAgICAgICAgb2JqZWN0czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYW5kZXItc3ZnXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iajogbmV3IFNWRyhcInJlc291cmNlcy9sYW5kZXItdGVtcC5zdmdcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdXG59XG5cbmZ1bmN0aW9uIG1haW4oKTogbnVtYmVyIHtcbiAgICBwYXJzZV93ZWJzaXRlIChuYXRpb25hbHNfc2l0ZSk7XG4gICAgXG4gICAgcmV0dXJuIDA7XG59XG5cbnZhciByZXQ6IG51bWJlcjtcbiQoZG9jdW1lbnQpLnJlYWR5ICgoKSA9PiB7XG4gICAgaWYgKChyZXQgPSBtYWluKCkpICE9IDApIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIm1haW4oKSBleGl0ZWQgd2l0aCBjb2RlIHswfVwiLmZvcm1hdChyZXQpKTtcbiAgICB9XG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4udHMiLCJpbXBvcnQgeyBFbGVtZW50T2JqZWN0IH0gZnJvbSAnLi9lbGVtZW50JztcblxuZXhwb3J0IGNsYXNzIEFuaW1hdGFibGU8VCBleHRlbmRzIEVsZW1lbnRPYmplY3Q+IGV4dGVuZHMgRWxlbWVudE9iamVjdCB7XG4gICAgY2hpbGQ6IFQ7XG4gICAgYW5pbWF0aW9uczogTWFwPHN0cmluZywgKGVsOiBFbGVtZW50T2JqZWN0LCAuLi5fYXJnczogYW55W10pID0+IHZvaWQ+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yIChjaGlsZDogVCkge1xuICAgICAgICBzdXBlciAoJChjaGlsZC5nZXQoKSkpO1xuICAgICAgICB0aGlzLmNoaWxkID0gY2hpbGQ7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IG5ldyBNYXA8c3RyaW5nLCAoZWw6IEVsZW1lbnRPYmplY3QsIC4uLl9hcmdzOiBhbnlbXSkgPT4gdm9pZD4oKTtcbiAgICB9XG4gICAgXG4gICAgYWRkX2FuaW1hdGlvbihuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZWw6IEVsZW1lbnRPYmplY3QsIC4uLl9hcmdzOiBhbnlbXSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnNbbmFtZV0gPSBjYWxsYmFjaztcbiAgICB9XG4gICAgXG4gICAgcGxheSAobmFtZTogc3RyaW5nLCAuLi5fYXJnczogYW55W10pIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zW25hbWVdICh0aGlzLmNoaWxkLCBfYXJncyk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbmltYXRpb24udHMiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW5jbHVkZS91dGlsLmQudHNcIiAvPlxuXG5TdHJpbmcucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uICguLi5fYXJncykge1xuICAgIHZhciBhcmdzID0gX2FyZ3M7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgveyhcXGQrKX0vZywgKG1hdGNoLCBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmdzW251bWJlcl0gIT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gYXJnc1tudW1iZXJdIDogbWF0Y2g7XG4gICAgfSk7XG59XG5cblxuQXJyYXkucHJvdG90eXBlLmluZGV4T2YgfHwgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGQsIGUpIHtcbiAgICB2YXIgYTtcbiAgICBpZiAobnVsbCA9PSB0aGlzKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInRoaXNcIiBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gICAgdmFyIGMgPSBPYmplY3QodGhpcyksXG4gICAgICAgIGIgPSBjLmxlbmd0aCA+Pj4gMDtcbiAgICBpZiAoMCA9PT0gYikgcmV0dXJuIC0xO1xuICAgIGEgPSArZSB8fCAwO1xuICAgIEluZmluaXR5ID09PSBNYXRoLmFicyhhKSAmJiAoYSA9IDApO1xuICAgIGlmIChhID49IGIpIHJldHVybiAtMTtcbiAgICBmb3IgKGEgPSBNYXRoLm1heCgwIDw9IGEgPyBhIDogYiAtIE1hdGguYWJzKGEpLCAwKTsgYSA8IGI7KSB7XG4gICAgICAgIGlmIChhIGluIGMgJiYgY1thXSA9PT0gZCkgcmV0dXJuIGE7XG4gICAgICAgIGErK1xuICAgIH1cbiAgICByZXR1cm4gLTFcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsLnRzIiwiaW1wb3J0IHsgQW5pbWF0YWJsZSB9IGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCB7IEVsZW1lbnRPYmplY3QgfSBmcm9tICcuL2VsZW1lbnQnO1xuaW1wb3J0IHsgU1ZHIH0gZnJvbSAnLi9zdmcnO1xuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIEVsZW1lbnRPYmplY3Qge1xuICAgIG5hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFBsYXkgd2hlbiBnb2luZyBmcm9tIHByZXZpb3VzIHRvIGhlcmVcbiAgICAgKiBpZiBmaXJzdCBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgcGxheVxuICAgICAqL1xuICAgIG5leHRfdG86ICgpID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBQbGF5IHdoZW4gZ29pbmcgYmFja3dhcmRzIHRvIGhlcmVcbiAgICAgKi9cbiAgICBiYWNrX3RvOiAoKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzZWN0aW9uIHRoYXQgY2FuIGJlIGFkZGVkIHRvIE1haW5cbiAgICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBuZXcgc2VjdGlvbiAoc2V0cyBpZCB0byB0aGlzKVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbmV4dF90bz86ICgpID0+IHZvaWQsIGJhY2tfdG8/OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHN1cGVyKCQoJC5wYXJzZUhUTUwoXCI8ZGl2IGlkPVxcXCJ7MH1cXFwiIGNsYXNzPVxcXCJzZWN0aW9uXFxcIj48L2Rpdj5cIi5mb3JtYXQobmFtZSkpKSk7XG4gICAgICAgIHRoaXMubmV4dF90byA9IG5leHRfdG87XG4gICAgICAgIHRoaXMuYmFja190byA9IGJhY2tfdG87XG4gICAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VjdGlvbi50cyIsImltcG9ydCB7IEVsZW1lbnRPYmplY3QgfSBmcm9tICcuL2VsZW1lbnQnO1xuaW1wb3J0IHsgVFNGaWxlIH0gZnJvbSAnLi9maWxlJztcblxuZXhwb3J0IGNsYXNzIFNWRyBleHRlbmRzIEVsZW1lbnRPYmplY3Qge1xuICAgIGZpbGU6IFRTRmlsZTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvciAoZmlsZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCB0ZW1wX2ZpbGUgPSBuZXcgVFNGaWxlKGZpbGUpO1xuICAgICAgICBzdXBlcigkKCQucGFyc2VIVE1MKHRlbXBfZmlsZS5yZWFkKCkpKSk7XG4gICAgICAgIHRoaXMuZmlsZSA9IHRlbXBfZmlsZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N2Zy50cyIsImV4cG9ydCBjbGFzcyBUU0ZpbGUge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIHRleHQ6IHN0cmluZztcbiAgICBcbiAgICBjb25zdHJ1Y3RvciAocGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7IFxuICAgICAgICB2YXIgcmF3RmlsZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByYXdGaWxlLm9wZW4oXCJHRVRcIiwgdGhpcy5wYXRoLCBmYWxzZSk7XG4gICAgICAgIHJhd0ZpbGUub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJhd0ZpbGUucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGlmIChyYXdGaWxlLnN0YXR1cyA9PT0gMjAwIHx8IHJhd0ZpbGUuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gcmF3RmlsZS5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJhd0ZpbGUuc2VuZChudWxsKTtcbiAgICB9XG4gICAgXG4gICAgcmVhZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQ7XG4gICAgfVxuICAgIFxuICAgIHJlYWRsaW5lcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQuc3BsaXQgKFwiXFxuXCIpO1xuICAgIH1cbiAgICBcbiAgICByZWFkb2JqZWN0ICgpIHtcbiAgICAgICAgJC5wYXJzZUhUTUwgKHRoaXMucmVhZCgpKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2ZpbGUudHMiXSwic291cmNlUm9vdCI6IiJ9