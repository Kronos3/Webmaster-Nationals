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
    }
    addto(target) {
        target.add(this);
    }
    add(target) {
        ElementObject.objnum++;
        this.objadd("{0}".format(ElementObject.objnum), target);
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
ElementObject.objnum = 0;
exports.ElementObject = ElementObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const animation_1 = __webpack_require__(2);
const element_1 = __webpack_require__(0);
const section_1 = __webpack_require__(4);
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
            inner: true
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzg2YzU1MGEyYmRkZDI5YzRhMDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsdUJBQWdCO0FBRWhCO0lBS0ksWUFBWSxFQUFVLEVBQUUsVUFBbUI7UUFDdkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLEVBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxJ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LE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztDQUNKO0FBdkJELDBCQXVCQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjODZjNTUwYTJiZGRkMjljNGEwMSIsImltcG9ydCAnLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRPYmplY3Qge1xuICAgIHByaXZhdGUgZWw6IEpRdWVyeTtcbiAgICBwcml2YXRlIGNoaWxkcmVuOiBNYXA8c3RyaW5nLCBFbGVtZW50T2JqZWN0PjtcbiAgICBzdGF0aWMgb2JqbnVtOiBudW1iZXIgPSAwO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGVsOiBKUXVlcnksIF9jbGFzc19zdHI/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICBfY2xhc3Nfc3RyID09IG51bGwgPyBfY2xhc3Nfc3RyID0gXCJlbGVtZW50LW9iamVjdFwiOiBfY2xhc3Nfc3RyID0gX2NsYXNzX3N0cjtcbiAgICAgICAgaWYgKGVsID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwgPSAkKCQucGFyc2VIVE1MKFwiPGRpdiBjbGFzcz1cXFwiezB9XFxcIj48L2Rpdj5cIi5mb3JtYXQoX2NsYXNzX3N0cikpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbmV3IE1hcDxzdHJpbmcsIEVsZW1lbnRPYmplY3Q+KCk7XG4gICAgfVxuICAgIFxuICAgIGFkZHRvICh0YXJnZXQ6IEVsZW1lbnRPYmplY3QpIHtcbiAgICAgICAgdGFyZ2V0LmFkZCAodGhpcyk7XG4gICAgfVxuICAgIFxuICAgIGFkZCAodGFyZ2V0OiBFbGVtZW50T2JqZWN0KSB7XG4gICAgICAgIEVsZW1lbnRPYmplY3Qub2JqbnVtKys7XG4gICAgICAgIHRoaXMub2JqYWRkIChcInswfVwiLmZvcm1hdChFbGVtZW50T2JqZWN0Lm9iam51bSksIHRhcmdldCk7XG4gICAgfVxuICAgIFxuICAgIGdldCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaGVkIGZvciBvYmplY3RfbmFtZSBpbiBvYmplY3RzIGFuZCByZXR1cm5zIGl0XG4gICAgICogQHBhcmFtIG9iamVjdF9uYW1lIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QgdG8gc2VhcmNoIGZvclxuICAgICAqIEByZXR1cm4gVGhlIG9iamVjdCBpbiB0aGUgbWFwXG4gICAgICovXG4gICAgb2JqZ2V0KG9iamVjdF9uYW1lOiBzdHJpbmcpOiBFbGVtZW50T2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bb2JqZWN0X25hbWVdO1xuICAgIH1cblxuICAgIG9iamFkZChvYmplY3RfbmFtZTogc3RyaW5nLCBvYmo6IEVsZW1lbnRPYmplY3QpIHtcbiAgICAgICAgdGhpcy5nZXQoKS5hcHBlbmRDaGlsZChvYmouZ2V0KCkpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuW29iamVjdF9uYW1lXSA9IG9iajtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VsZW1lbnQudHMiLCJpbXBvcnQgeyBBbmltYXRhYmxlIH0gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IHsgRWxlbWVudE9iamVjdCB9IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQgeyBTZWN0aW9uIH0gZnJvbSAnLi9zZWN0aW9uJztcblxuY2xhc3MgTWFpbiBleHRlbmRzIEVsZW1lbnRPYmplY3Qge1xuICAgIHBhZ2VfbjogbnVtYmVyO1xuICAgIHByaXZhdGUgc2VjdGlvbnM6IFNlY3Rpb25bXTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihzY3JvbGw/OiAocHJldjogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICAgICAgc3VwZXIgKG51bGwsIFwibWFpblwiKTtcbiAgICAgICAgdGhpcy5zY3JvbGwgPSBzY3JvbGw7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbCA9IHRoaXMuZGVmYXVsdF9zY3JvbGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWN0aW9ucyA9IG5ldyBBcnJheTxTZWN0aW9uPigpO1xuICAgICAgICB0aGlzLmFkZHRvIChuZXcgRWxlbWVudE9iamVjdCAoJChcImJvZHlcIikpKTtcbiAgICB9XG4gICAgXG4gICAgXG4gICAgYWRkX3NlY3Rpb24gKHNlYzogU2VjdGlvbikge1xuICAgICAgICB0aGlzLnNlY3Rpb25zLnB1c2ggKHNlYyk7XG4gICAgICAgIHRoaXMuYWRkIChzZWMpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHNjcm9sbDogKHByZXY6IG51bWJlciwgY3VycmVudDogbnVtYmVyKSA9PiB2b2lkO1xuICAgIFxuICAgIHByaXZhdGUgZGVmYXVsdF9zY3JvbGwgKHByZXY6IG51bWJlciwgY3VycmVudDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIFxuICAgIH1cbn1cblxuaW50ZXJmYWNlIGFuaW1hdGlvbl9jYWxsYmFjayB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNhbGxiYWNrPzogKGVsOiBFbGVtZW50T2JqZWN0LCAuLi5fYXJnczogYW55W10pID0+IHZvaWQ7XG59XG5cbmludGVyZmFjZSBvYmoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBvYmo6IEVsZW1lbnRPYmplY3Q7XG4gICAgYW5pbWF0aW9uczogYW5pbWF0aW9uX2NhbGxiYWNrW107XG59XG5cbmludGVyZmFjZSBzZWN0aW9uIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgb2JqZWN0czogb2JqW107XG4gICAgaW5uZXI6IGJvb2xlYW47XG4gICAgbmV4dF90bz86KCkgPT4gdm9pZDtcbiAgICBiYWNrX3RvPzooKSA9PiB2b2lkO1xufVxuXG5pbnRlcmZhY2Ugd2Vic2l0ZSB7XG4gICAgc2VjdGlvbnM6IHNlY3Rpb25bXTtcbiAgICBzY3JvbGw/OihwcmV2OiBudW1iZXIsIGN1cnJlbnQ6bnVtYmVyKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBwYXJzZV93ZWJzaXRlIChvYmo6IHdlYnNpdGUpIHtcbiAgICB2YXIgb3V0OiBNYWluID0gbmV3IE1haW4gKCk7XG4gICAgb2JqLnNlY3Rpb25zLmZvckVhY2goZWwgPT4ge1xuICAgICAgICB2YXIgU0VDOkVsZW1lbnRPYmplY3QgPSBuZXcgU2VjdGlvbihlbC5uYW1lKTtcbiAgICAgICAgb3V0LmFkZF9zZWN0aW9uKDxTZWN0aW9uPlNFQyk7XG4gICAgICAgIHZhciBJTk5FUjpFbGVtZW50T2JqZWN0O1xuICAgICAgICBpZiAoZWwuaW5uZXIpIHtcbiAgICAgICAgICAgIElOTkVSID0gbmV3IEVsZW1lbnRPYmplY3QgKG51bGwsIFwic2VjdGlvbi1pbm5lclwiKTtcbiAgICAgICAgICAgIFNFQy5vYmphZGQgKFwiaW5uZXJcIiwgSU5ORVIpO1xuICAgICAgICAgICAgU0VDID0gSU5ORVI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsLm9iamVjdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgZWwub2JqZWN0cy5mb3JFYWNoKG9iID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgT0JKRUNUID0gbmV3IEFuaW1hdGFibGUob2Iub2JqKTtcbiAgICAgICAgICAgICAgICBpZiAob2IuYW5pbWF0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9CSkVDVC5hZGRfYW5pbWF0aW9uKGFuaW0ubmFtZSwgYW5pbS5jYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBTRUMub2JqYWRkKG9iLm5hbWUsIE9CSkVDVCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9KTtcbn1cblxudmFyIG5hdGlvbmFsc19zaXRlOndlYnNpdGUgPSA8d2Vic2l0ZT57XG4gICAgc2VjdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJsYW5kZXJcIixcbiAgICAgICAgICAgIGlubmVyOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59XG5cbmZ1bmN0aW9uIG1haW4oKTogbnVtYmVyIHtcbiAgICBwYXJzZV93ZWJzaXRlIChuYXRpb25hbHNfc2l0ZSk7XG4gICAgXG4gICAgcmV0dXJuIDA7XG59XG5cbnZhciByZXQ6IG51bWJlcjtcbiQoZG9jdW1lbnQpLnJlYWR5ICgoKSA9PiB7XG4gICAgaWYgKChyZXQgPSBtYWluKCkpICE9IDApIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIm1haW4oKSBleGl0ZWQgd2l0aCBjb2RlIHswfVwiLmZvcm1hdChyZXQpKTtcbiAgICB9XG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4udHMiLCJpbXBvcnQgeyBFbGVtZW50T2JqZWN0IH0gZnJvbSAnLi9lbGVtZW50JztcblxuZXhwb3J0IGNsYXNzIEFuaW1hdGFibGU8VCBleHRlbmRzIEVsZW1lbnRPYmplY3Q+IGV4dGVuZHMgRWxlbWVudE9iamVjdCB7XG4gICAgY2hpbGQ6IFQ7XG4gICAgYW5pbWF0aW9uczogTWFwPHN0cmluZywgKGVsOiBFbGVtZW50T2JqZWN0LCAuLi5fYXJnczogYW55W10pID0+IHZvaWQ+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yIChjaGlsZDogVCkge1xuICAgICAgICBzdXBlciAoJChjaGlsZC5nZXQoKSkpO1xuICAgICAgICB0aGlzLmNoaWxkID0gY2hpbGQ7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IG5ldyBNYXA8c3RyaW5nLCAoZWw6IEVsZW1lbnRPYmplY3QsIC4uLl9hcmdzOiBhbnlbXSkgPT4gdm9pZD4oKTtcbiAgICB9XG4gICAgXG4gICAgYWRkX2FuaW1hdGlvbihuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZWw6IEVsZW1lbnRPYmplY3QsIC4uLl9hcmdzOiBhbnlbXSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnNbbmFtZV0gPSBjYWxsYmFjaztcbiAgICB9XG4gICAgXG4gICAgcGxheSAobmFtZTogc3RyaW5nLCAuLi5fYXJnczogYW55W10pIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zW25hbWVdICh0aGlzLmNoaWxkLCBfYXJncyk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbmltYXRpb24udHMiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW5jbHVkZS91dGlsLmQudHNcIiAvPlxuXG5TdHJpbmcucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uICguLi5fYXJncykge1xuICAgIHZhciBhcmdzID0gX2FyZ3M7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgveyhcXGQrKX0vZywgKG1hdGNoLCBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmdzW251bWJlcl0gIT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gYXJnc1tudW1iZXJdIDogbWF0Y2g7XG4gICAgfSk7XG59XG5cblxuQXJyYXkucHJvdG90eXBlLmluZGV4T2YgfHwgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGQsIGUpIHtcbiAgICB2YXIgYTtcbiAgICBpZiAobnVsbCA9PSB0aGlzKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInRoaXNcIiBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gICAgdmFyIGMgPSBPYmplY3QodGhpcyksXG4gICAgICAgIGIgPSBjLmxlbmd0aCA+Pj4gMDtcbiAgICBpZiAoMCA9PT0gYikgcmV0dXJuIC0xO1xuICAgIGEgPSArZSB8fCAwO1xuICAgIEluZmluaXR5ID09PSBNYXRoLmFicyhhKSAmJiAoYSA9IDApO1xuICAgIGlmIChhID49IGIpIHJldHVybiAtMTtcbiAgICBmb3IgKGEgPSBNYXRoLm1heCgwIDw9IGEgPyBhIDogYiAtIE1hdGguYWJzKGEpLCAwKTsgYSA8IGI7KSB7XG4gICAgICAgIGlmIChhIGluIGMgJiYgY1thXSA9PT0gZCkgcmV0dXJuIGE7XG4gICAgICAgIGErK1xuICAgIH1cbiAgICByZXR1cm4gLTFcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsLnRzIiwiaW1wb3J0IHsgQW5pbWF0YWJsZSB9IGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCB7IEVsZW1lbnRPYmplY3QgfSBmcm9tICcuL2VsZW1lbnQnO1xuaW1wb3J0IHsgU1ZHIH0gZnJvbSAnLi9zdmcnO1xuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIEVsZW1lbnRPYmplY3Qge1xuICAgIG5hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFBsYXkgd2hlbiBnb2luZyBmcm9tIHByZXZpb3VzIHRvIGhlcmVcbiAgICAgKiBpZiBmaXJzdCBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgcGxheVxuICAgICAqL1xuICAgIG5leHRfdG86ICgpID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBQbGF5IHdoZW4gZ29pbmcgYmFja3dhcmRzIHRvIGhlcmVcbiAgICAgKi9cbiAgICBiYWNrX3RvOiAoKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzZWN0aW9uIHRoYXQgY2FuIGJlIGFkZGVkIHRvIE1haW5cbiAgICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBuZXcgc2VjdGlvbiAoc2V0cyBpZCB0byB0aGlzKVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbmV4dF90bz86ICgpID0+IHZvaWQsIGJhY2tfdG8/OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHN1cGVyKCQoJC5wYXJzZUhUTUwoXCI8ZGl2IGlkPVxcXCJ7MH1cXFwiIGNsYXNzPVxcXCJzZWN0aW9uXFxcIj48L2Rpdj5cIi5mb3JtYXQobmFtZSkpKSk7XG4gICAgICAgIHRoaXMubmV4dF90byA9IG5leHRfdG87XG4gICAgICAgIHRoaXMuYmFja190byA9IGJhY2tfdG87XG4gICAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VjdGlvbi50cyJdLCJzb3VyY2VSb290IjoiIn0=