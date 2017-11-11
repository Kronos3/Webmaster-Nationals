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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjYyNGU4ODkzOTBhZWU5MGUzOGEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsdUJBQWdCO0FBRWhCO0lBS0ksWUFBWSxFQUFVLEVBQUUsVUFBbUI7UUFDdkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLEVBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUUsTUFBcUI7UUFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsR0FBRyxDQUFFLE1BQXFCO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELEdBQUc7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxXQUFtQjtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQW1CLEVBQUUsR0FBa0I7UUFDMUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUF6Q0Qsc0NBeUNDOzs7Ozs7Ozs7O0FDM0NELDJDQUF5QztBQUN6Qyx5Q0FBMEM7QUFDMUMseUNBQW9DO0FBRXBDLFVBQVcsU0FBUSx1QkFBYTtJQUk1QixZQUFZLE1BQWdEO1FBQ3hELEtBQUssQ0FBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSx1QkFBYSxDQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUdELFdBQVcsQ0FBRSxHQUFZO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUlPLGNBQWMsQ0FBRSxJQUFZLEVBQUUsT0FBZTtJQUVyRCxDQUFDO0NBQ0o7QUEwQkQsdUJBQXdCLEdBQVk7SUFDaEMsSUFBSSxHQUFHLEdBQVMsSUFBSSxJQUFJLEVBQUcsQ0FBQztJQUM1QixHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUN0QixJQUFJLEdBQUcsR0FBaUIsSUFBSSxpQkFBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsV0FBVyxDQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksS0FBbUIsQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNYLEtBQUssR0FBRyxJQUFJLHVCQUFhLENBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVCLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDaEIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQixFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN4QixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDekIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbkQsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsSUFBSSxjQUFjLEdBQW9CO0lBQ2xDLFFBQVEsRUFBRTtRQUNOO1lBQ0ksSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNkO0tBQ0o7Q0FDSjtBQUVEO0lBQ0ksYUFBYSxDQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDYixDQUFDO0FBRUQsSUFBSSxHQUFXLENBQUM7QUFDaEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBRSxHQUFHLEVBQUU7SUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztBQUNMLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ3JHRix5Q0FBMEM7QUFFMUMsZ0JBQWlELFNBQVEsdUJBQWE7SUFJbEUsWUFBYSxLQUFRO1FBQ2pCLEtBQUssQ0FBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUF3RCxDQUFDO0lBQ3RGLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBWSxFQUFFLFFBQXNEO1FBQzlFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJLENBQUUsSUFBWSxFQUFFLEdBQUcsS0FBWTtRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNKO0FBakJELGdDQWlCQzs7Ozs7OztBQ25CRCw2Q0FBNkM7QUFFN0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLEtBQUs7SUFDeEMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM5QyxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksV0FBVztZQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBR0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDO0lBQ2hFLElBQUksQ0FBQyxDQUFDO0lBQ04sRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUN2RSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQ2hCLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDWixRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3pELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxFQUFFO0lBQ1AsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ3hCSCx5Q0FBMEM7QUFHMUMsYUFBcUIsU0FBUSx1QkFBYTtJQWN0Qzs7O09BR0c7SUFDSCxZQUFZLElBQVksRUFBRSxPQUFvQixFQUFFLE9BQW9CO1FBQ2hFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztDQUNKO0FBdkJELDBCQXVCQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNjI0ZTg4OTM5MGFlZTkwZTM4YSIsImltcG9ydCAnLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRPYmplY3Qge1xuICAgIHByaXZhdGUgZWw6IEpRdWVyeTtcbiAgICBwcml2YXRlIGNoaWxkcmVuOiBNYXA8c3RyaW5nLCBFbGVtZW50T2JqZWN0PjtcbiAgICBvYmpudW06IG51bWJlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihlbDogSlF1ZXJ5LCBfY2xhc3Nfc3RyPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZWwgPSBlbDtcbiAgICAgICAgX2NsYXNzX3N0ciA9PSBudWxsID8gX2NsYXNzX3N0ciA9IFwiZWxlbWVudC1vYmplY3RcIjogX2NsYXNzX3N0ciA9IF9jbGFzc19zdHI7XG4gICAgICAgIGlmIChlbCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsID0gJCgkLnBhcnNlSFRNTChcIjxkaXYgY2xhc3M9XFxcInswfVxcXCI+PC9kaXY+XCIuZm9ybWF0KF9jbGFzc19zdHIpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG5ldyBNYXA8c3RyaW5nLCBFbGVtZW50T2JqZWN0PigpO1xuICAgICAgICB0aGlzLm9iam51bSA9IDA7XG4gICAgfVxuICAgIFxuICAgIGFkZHRvICh0YXJnZXQ6IEVsZW1lbnRPYmplY3QpIHtcbiAgICAgICAgdGFyZ2V0LmFkZCAodGhpcyk7XG4gICAgfVxuICAgIFxuICAgIGFkZCAodGFyZ2V0OiBFbGVtZW50T2JqZWN0KSB7XG4gICAgICAgIHRoaXMub2JqbnVtKys7XG4gICAgICAgIHRoaXMub2JqYWRkKFwiezB9XCIuZm9ybWF0KHRoaXMub2JqbnVtKSwgdGFyZ2V0KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoZWQgZm9yIG9iamVjdF9uYW1lIGluIG9iamVjdHMgYW5kIHJldHVybnMgaXRcbiAgICAgKiBAcGFyYW0gb2JqZWN0X25hbWUgVGhlIG5hbWUgb2YgdGhlIG9iamVjdCB0byBzZWFyY2ggZm9yXG4gICAgICogQHJldHVybiBUaGUgb2JqZWN0IGluIHRoZSBtYXBcbiAgICAgKi9cbiAgICBvYmpnZXQob2JqZWN0X25hbWU6IHN0cmluZyk6IEVsZW1lbnRPYmplY3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltvYmplY3RfbmFtZV07XG4gICAgfVxuXG4gICAgb2JqYWRkKG9iamVjdF9uYW1lOiBzdHJpbmcsIG9iajogRWxlbWVudE9iamVjdCkge1xuICAgICAgICB0aGlzLmdldCgpLmFwcGVuZENoaWxkKG9iai5nZXQoKSk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW5bb2JqZWN0X25hbWVdID0gb2JqO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWxlbWVudC50cyIsImltcG9ydCB7IEFuaW1hdGFibGUgfSBmcm9tICcuL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBFbGVtZW50T2JqZWN0IH0gZnJvbSAnLi9lbGVtZW50JztcbmltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuL3NlY3Rpb24nO1xuXG5jbGFzcyBNYWluIGV4dGVuZHMgRWxlbWVudE9iamVjdCB7XG4gICAgcGFnZV9uOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzZWN0aW9uczogU2VjdGlvbltdO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHNjcm9sbD86IChwcmV2OiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlcikgPT4gdm9pZCkge1xuICAgICAgICBzdXBlciAobnVsbCwgXCJtYWluXCIpO1xuICAgICAgICB0aGlzLnNjcm9sbCA9IHNjcm9sbDtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsID0gdGhpcy5kZWZhdWx0X3Njcm9sbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlY3Rpb25zID0gbmV3IEFycmF5PFNlY3Rpb24+KCk7XG4gICAgICAgIHRoaXMuYWRkdG8gKG5ldyBFbGVtZW50T2JqZWN0ICgkKFwiYm9keVwiKSkpO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICBhZGRfc2VjdGlvbiAoc2VjOiBTZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMucHVzaCAoc2VjKTtcbiAgICAgICAgdGhpcy5hZGQgKHNlYyk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2Nyb2xsOiAocHJldjogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpID0+IHZvaWQ7XG4gICAgXG4gICAgcHJpdmF0ZSBkZWZhdWx0X3Njcm9sbCAocHJldjogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgXG4gICAgfVxufVxuXG5pbnRlcmZhY2UgYW5pbWF0aW9uX2NhbGxiYWNrIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2FsbGJhY2s/OiAoZWw6IEVsZW1lbnRPYmplY3QsIC4uLl9hcmdzOiBhbnlbXSkgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIG9iaiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG9iajogRWxlbWVudE9iamVjdDtcbiAgICBhbmltYXRpb25zOiBhbmltYXRpb25fY2FsbGJhY2tbXTtcbn1cblxuaW50ZXJmYWNlIHNlY3Rpb24ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBvYmplY3RzOiBvYmpbXTtcbiAgICBpbm5lcjogYm9vbGVhbjtcbiAgICBuZXh0X3RvPzooKSA9PiB2b2lkO1xuICAgIGJhY2tfdG8/OigpID0+IHZvaWQ7XG59XG5cbmludGVyZmFjZSB3ZWJzaXRlIHtcbiAgICBzZWN0aW9uczogc2VjdGlvbltdO1xuICAgIHNjcm9sbD86KHByZXY6IG51bWJlciwgY3VycmVudDpudW1iZXIpID0+IHZvaWQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlX3dlYnNpdGUgKG9iajogd2Vic2l0ZSkge1xuICAgIHZhciBvdXQ6IE1haW4gPSBuZXcgTWFpbiAoKTtcbiAgICBvYmouc2VjdGlvbnMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIHZhciBTRUM6RWxlbWVudE9iamVjdCA9IG5ldyBTZWN0aW9uKGVsLm5hbWUpO1xuICAgICAgICBvdXQuYWRkX3NlY3Rpb24oPFNlY3Rpb24+U0VDKTtcbiAgICAgICAgdmFyIElOTkVSOkVsZW1lbnRPYmplY3Q7XG4gICAgICAgIGlmIChlbC5pbm5lcikge1xuICAgICAgICAgICAgSU5ORVIgPSBuZXcgRWxlbWVudE9iamVjdCAobnVsbCwgXCJzZWN0aW9uLWlubmVyXCIpO1xuICAgICAgICAgICAgU0VDLm9iamFkZCAoXCJpbm5lclwiLCBJTk5FUik7XG4gICAgICAgICAgICBTRUMgPSBJTk5FUjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWwub2JqZWN0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICBlbC5vYmplY3RzLmZvckVhY2gob2IgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBPQkpFQ1QgPSBuZXcgQW5pbWF0YWJsZShvYi5vYmopO1xuICAgICAgICAgICAgICAgIGlmIChvYi5hbmltYXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgb2IuYW5pbWF0aW9ucy5mb3JFYWNoKGFuaW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgT0JKRUNULmFkZF9hbmltYXRpb24oYW5pbS5uYW1lLCBhbmltLmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFNFQy5vYmphZGQob2IubmFtZSwgT0JKRUNUKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0pO1xufVxuXG52YXIgbmF0aW9uYWxzX3NpdGU6d2Vic2l0ZSA9IDx3ZWJzaXRlPntcbiAgICBzZWN0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImxhbmRlclwiLFxuICAgICAgICAgICAgaW5uZXI6IHRydWVcbiAgICAgICAgfVxuICAgIF1cbn1cblxuZnVuY3Rpb24gbWFpbigpOiBudW1iZXIge1xuICAgIHBhcnNlX3dlYnNpdGUgKG5hdGlvbmFsc19zaXRlKTtcbiAgICBcbiAgICByZXR1cm4gMDtcbn1cblxudmFyIHJldDogbnVtYmVyO1xuJChkb2N1bWVudCkucmVhZHkgKCgpID0+IHtcbiAgICBpZiAoKHJldCA9IG1haW4oKSkgIT0gMCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwibWFpbigpIGV4aXRlZCB3aXRoIGNvZGUgezB9XCIuZm9ybWF0KHJldCkpO1xuICAgIH1cbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi50cyIsImltcG9ydCB7IEVsZW1lbnRPYmplY3QgfSBmcm9tICcuL2VsZW1lbnQnO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0YWJsZTxUIGV4dGVuZHMgRWxlbWVudE9iamVjdD4gZXh0ZW5kcyBFbGVtZW50T2JqZWN0IHtcbiAgICBjaGlsZDogVDtcbiAgICBhbmltYXRpb25zOiBNYXA8c3RyaW5nLCAoZWw6IEVsZW1lbnRPYmplY3QsIC4uLl9hcmdzOiBhbnlbXSkgPT4gdm9pZD47XG4gICAgXG4gICAgY29uc3RydWN0b3IgKGNoaWxkOiBUKSB7XG4gICAgICAgIHN1cGVyICgkKGNoaWxkLmdldCgpKSk7XG4gICAgICAgIHRoaXMuY2hpbGQgPSBjaGlsZDtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gbmV3IE1hcDxzdHJpbmcsIChlbDogRWxlbWVudE9iamVjdCwgLi4uX2FyZ3M6IGFueVtdKSA9PiB2b2lkPigpO1xuICAgIH1cbiAgICBcbiAgICBhZGRfYW5pbWF0aW9uKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChlbDogRWxlbWVudE9iamVjdCwgLi4uX2FyZ3M6IGFueVtdKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uc1tuYW1lXSA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBcbiAgICBwbGF5IChuYW1lOiBzdHJpbmcsIC4uLl9hcmdzOiBhbnlbXSkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnNbbmFtZV0gKHRoaXMuY2hpbGQsIF9hcmdzKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FuaW1hdGlvbi50cyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbmNsdWRlL3V0aWwuZC50c1wiIC8+XG5cblN0cmluZy5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKC4uLl9hcmdzKSB7XG4gICAgdmFyIGFyZ3MgPSBfYXJncztcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC97KFxcZCspfS9nLCAobWF0Y2gsIG51bWJlcikgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3NbbnVtYmVyXSAhPSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgPyBhcmdzW251bWJlcl0gOiBtYXRjaDtcbiAgICB9KTtcbn1cblxuXG5BcnJheS5wcm90b3R5cGUuaW5kZXhPZiB8fCAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoZCwgZSkge1xuICAgIHZhciBhO1xuICAgIGlmIChudWxsID09IHRoaXMpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widGhpc1wiIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcbiAgICB2YXIgYyA9IE9iamVjdCh0aGlzKSxcbiAgICAgICAgYiA9IGMubGVuZ3RoID4+PiAwO1xuICAgIGlmICgwID09PSBiKSByZXR1cm4gLTE7XG4gICAgYSA9ICtlIHx8IDA7XG4gICAgSW5maW5pdHkgPT09IE1hdGguYWJzKGEpICYmIChhID0gMCk7XG4gICAgaWYgKGEgPj0gYikgcmV0dXJuIC0xO1xuICAgIGZvciAoYSA9IE1hdGgubWF4KDAgPD0gYSA/IGEgOiBiIC0gTWF0aC5hYnMoYSksIDApOyBhIDwgYjspIHtcbiAgICAgICAgaWYgKGEgaW4gYyAmJiBjW2FdID09PSBkKSByZXR1cm4gYTtcbiAgICAgICAgYSsrXG4gICAgfVxuICAgIHJldHVybiAtMVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwudHMiLCJpbXBvcnQgeyBBbmltYXRhYmxlIH0gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IHsgRWxlbWVudE9iamVjdCB9IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQgeyBTVkcgfSBmcm9tICcuL3N2Zyc7XG5cbmV4cG9ydCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgRWxlbWVudE9iamVjdCB7XG4gICAgbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUGxheSB3aGVuIGdvaW5nIGZyb20gcHJldmlvdXMgdG8gaGVyZVxuICAgICAqIGlmIGZpcnN0IGl0IHdpbGwgYXV0b21hdGljYWxseSBwbGF5XG4gICAgICovXG4gICAgbmV4dF90bzogKCkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFBsYXkgd2hlbiBnb2luZyBiYWNrd2FyZHMgdG8gaGVyZVxuICAgICAqL1xuICAgIGJhY2tfdG86ICgpID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNlY3Rpb24gdGhhdCBjYW4gYmUgYWRkZWQgdG8gTWFpblxuICAgICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIG5ldyBzZWN0aW9uIChzZXRzIGlkIHRvIHRoaXMpXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBuZXh0X3RvPzogKCkgPT4gdm9pZCwgYmFja190bz86ICgpID0+IHZvaWQpIHtcbiAgICAgICAgc3VwZXIoJCgkLnBhcnNlSFRNTChcIjxkaXYgaWQ9XFxcInswfVxcXCIgY2xhc3M9XFxcInNlY3Rpb25cXFwiPjwvZGl2PlwiLmZvcm1hdChuYW1lKSkpKTtcbiAgICAgICAgdGhpcy5uZXh0X3RvID0gbmV4dF90bztcbiAgICAgICAgdGhpcy5iYWNrX3RvID0gYmFja190bztcbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZWN0aW9uLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==