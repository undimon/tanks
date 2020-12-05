(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("PIXI"));
	else if(typeof define === 'function' && define.amd)
		define("typescript_intro", ["PIXI"], factory);
	else if(typeof exports === 'object')
		exports["typescript_intro"] = factory(require("PIXI"));
	else
		root["typescript_intro"] = factory(root["PIXI"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__5__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppManager = /** @class */ (function () {
    function AppManager() {
        this.sceneWidth = 900;
        this.sceneHeight = 720;
        this.keys = {};
        if (AppManager.instance) {
            throw new Error("Error - use AppManager.getInstance()");
        }
        this.initPixiApp();
    }
    AppManager.getInstance = function () {
        if (!AppManager.instance) {
            AppManager.instance = new AppManager();
        }
        return AppManager.instance;
    };
    AppManager.prototype.getSceneWidth = function () {
        return this.sceneWidth;
    };
    AppManager.prototype.getSceneHeight = function () {
        return this.sceneHeight;
    };
    AppManager.prototype.startAssetsLoading = function (assets, onComplete, onProgress) {
        var _this = this;
        var loader = new PIXI.Loader();
        Object.keys(assets).forEach(function (key) {
            loader.add(assets[key], assets[key]);
        });
        loader.onProgress.add(function (loader, resources) {
            onProgress.call(_this, loader.progress);
        });
        loader.onComplete.add(function (loader, resources) {
            _this.resources = resources;
            onComplete.call(_this);
        });
        loader.load();
    };
    AppManager.prototype.addLayerToScene = function (container) {
        this.app.stage.addChild(container);
    };
    AppManager.prototype.initPixiApp = function () {
        this.app = new PIXI.Application({
            width: this.sceneWidth,
            height: this.sceneHeight,
            backgroundColor: 0xFFFFFF
        });
        document.body.appendChild(this.app.view);
        window.addEventListener('keydown', AppManager.handleKeyDown);
        window.addEventListener('keyup', AppManager.handleKeyUp);
    };
    AppManager.prototype.getTexture = function (name) {
        return this.resources[name].texture;
    };
    AppManager.prototype.swapScenes = function () {
    };
    // public init(): void {
    //     window.addEventListener('resize', this.resize.bind(this));
    //     this.resize();
    // }
    AppManager.prototype.onAssetsLoadingComplete = function (loader, resources, onComplete) {
        this.resources = resources;
        onComplete();
        // this.gameScene = new GameScene();
        // this.app.stage.addChild(this.gameScene);
        // this.app.stage.scale.set(0.6, 0.6);
        // window.addEventListener('keydown', AppManager.handleKeyDown);
        // window.addEventListener('keyup', AppManager.handleKeyUp);
        // this.app.ticker.add(() => {
        //     this.gameScene.update();
        // });  
        //this.app.renderer.resize(500, 500);
    };
    AppManager.handleKeyDown = function (event) {
        //GameManager.instance.keys = {};
        AppManager.instance.keys[event.code] = true;
    };
    AppManager.handleKeyUp = function (event) {
        //GameManager.instance.keys = {};
        AppManager.instance.keys[event.code] = false;
    };
    // Resize function window
    AppManager.prototype.resize = function () {
        // this.app.renderer.resize(window.innerWidth, window.innerHeight);
        //this.gecko.x = this.app.renderer.width / 2;
        //this.gecko.y = this.app.renderer.height / 2;
    };
    return AppManager;
}());
exports.AppManager = AppManager;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __webpack_require__(4);
var MenuButtonsController = /** @class */ (function (_super) {
    __extends(MenuButtonsController, _super);
    function MenuButtonsController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuButtonsController.prototype.addNotifications = function () {
        //this.addNotification(GlobalNotifications.TRANSITION_TO_SCENE, this.showMenu.bind(this));
    };
    MenuButtonsController.prototype.execute = function (notification) {
        this.showMenu();
    };
    MenuButtonsController.prototype.showMenu = function () {
        this.view.drawScene();
    };
    return MenuButtonsController;
}(controller_1.Controller));
exports.MenuButtonsController = MenuButtonsController;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/gsap/gsap-core.js
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*!
 * GSAP 3.5.0
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isTypedArray = typeof ArrayBuffer === "function" ? ArrayBuffer.isView : function () {},
    _isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_relExp = /[+-]=-?[\.\d]+/,
    _delimitedValueExp = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property, v) {
  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _parseVars = function _parseVars(params, type, parent) {
  //reads the arguments passed to one of the key methods and figures out if the user is defining things with the OLD/legacy syntax where the duration is the 2nd parameter, and then it adjusts things accordingly and spits back the corrected vars object (with the duration added if necessary, as well as runBackwards or startAt or immediateRender). type 0 = to()/staggerTo(), 1 = from()/staggerFrom(), 2 = fromTo()/staggerFromTo()
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars;

  isLegacy && (vars.duration = params[1]);
  vars.parent = parent;

  if (type) {
    irVars = vars;

    while (parent && !("immediateRender" in irVars)) {
      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }

    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
  }

  return vars;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  _lazyTweens.length && _lazyRender();
  animation.render(time, suppressEvents, force);
  _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || p === "duration" || p === "ease" || (obj[p] = defaults[p]);
  }
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p];
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
  child._act = 0;
},
    _uncache = function _uncache(animation, child) {
  if (!child || child._end > animation._dur || child._start < 0) {
    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
    var a = animation;

    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
},
    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
_animationCycle = function _animationCycle(tTime, cycleDuration) {
  return (tTime /= cycleDuration) && ~~tTime === tTime ? ~~tTime - 1 : ~~tTime;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
},
    _setEnd = function _setEnd(animation) {
  return animation._end = _round(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
},
    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
  var parent = animation._dp;

  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _round(animation._dp._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

    _setEnd(animation);

    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
  }

  return animation;
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_postAddChecks = function _postAddChecks(timeline, child) {
  var t;

  if (child._time || child._initted && !child._dur) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    t = _parentToChildTotalTime(timeline.rawTime(), child);

    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
    //in case any of the ancestors had completed but should now be enabled...
    if (timeline._dur < timeline.duration()) {
      t = timeline;

      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

        t = t._dp;
      }
    }

    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
  }
},
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _round(position + child._delay);
  child._end = _round(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  timeline._recent = child;
  skipChecks || _postAddChecks(timeline, child);
  return timeline;
},
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
},
    _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
  _initTween(tween, totalTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);

    tween._lazy = [totalTime, suppressEvents];
    return 1;
  }
},
    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && prevRatio && !tween._start && tween._zTime > _tinyNum && !tween._dp._lock || (tween._ts < 0 || tween._dp._ts < 0) && tween.data !== "isFromStart" && tween.data !== "isStart" ? 0 : 1,
      // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0. Also, if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0.
  repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    // in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    prevIteration = _animationCycle(tween._tTime, repeatDelay);

    if (iteration !== prevIteration) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }

  if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
    // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
    return;
  }

  if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    suppressEvents || _callback(tween, "onStart");
    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);

      if (!suppressEvents) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (!child._dur && child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (!child._dur && child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat,
      dur = _round(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _round(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  i,
      offset;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    i = position.charAt(0);

    if (i === "<" || i === ">") {
      return (i === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0);
    }

    i = position.indexOf("=");

    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }

    offset = +(position.charAt(i - 1) + position.substr(i + 1));
    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1)) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position;
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value) {
  return (value + "").substr((parseFloat(value) + "").length);
},
    clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
toArray = function toArray(value, leaveStrings) {
  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call(_doc.querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    shuffle = function shuffle(a) {
  return a.sort(function () {
    return .5 - Math.random();
  });
},
    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }

      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _round(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()

  return function (raw) {
    return Math.floor(Math.round(parseFloat(raw) / v) * v * p) / p + (_isNumber(raw) ? 0 : getUnit(raw));
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;

    if (snapTo.values) {
      snapTo = toArray(snapTo.values);

      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min + Math.random() * (max - min)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total || 0;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + ((value - inMin) / inRange * outRange || 0);
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      params,
      scope;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

  return params ? callback.apply(scope, params) : callback.call(scope);
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
},
    _quickTween,
    _createPlugin = function _createPlugin(config) {
  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

  var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
    this._props = [];
  } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
  instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  },
      statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };

  _wake();

  if (config !== Plugin) {
    if (_plugins[name]) {
      return;
    }

    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


    _plugins[Plugin.prop = name] = Plugin;

    if (config.targetTest) {
      _harnessPlugins.push(Plugin);

      _reservedProps[name] = 1;
    }

    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
  }

  _addGlobal(name, Plugin);

  config.register && config.register(gsap, Plugin, PropTween);
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    _hue = function _hue(h, m1, m2) {
  h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length === 4) {
        //for shorthand like #9F0
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b;
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1); //cast as number

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = ~~(h + .5);
    a[1] = ~~(s * 100 + .5);
    a[2] = ~~(l * 100 + .5);
  }

  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
},
    _colorOrderData = function _colorOrderData(v) {
  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
  var values = [],
      c = [],
      i = -1;
  v.split(_colorExp).forEach(function (v) {
    var a = v.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
},
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
  var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;

  if (!colors) {
    return s;
  }

  colors = colors.map(function (color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });

  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;

    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }

  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;

    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }

  return result + shell[l];
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

    return true;
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch,
        time,
        frame;

    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;

    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1000;
      _self.time = time = time / 1000;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }

    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

    if (dispatch) {
      for (_i = 0; _i < _listeners.length; _i++) {
        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
      }
    }
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1000 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    },
    fps: function fps(_fps) {
      _gap = 1000 / (_fps || 240);
      _nextTime = _self.time * 1000 + _gap;
    },
    add: function add(callback) {
      _listeners.indexOf(callback) < 0 && _listeners.push(callback);

      _wake();
    },
    remove: function remove(callback) {
      var i;
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _valueInParentheses = function _valueInParentheses(value) {
  var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
  var child = timeline._first,
      ease;

  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }

    child = child._next;
  }
},
    _parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];

_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */


var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */

var Animation = /*#__PURE__*/function () {
  function Animation(vars, time) {
    var parent = vars.parent || _globalTimeline;
    this.vars = vars;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat || 0) {
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }

    this._ts = 1;

    _setDuration(this, +vars.duration, 1, 1);

    this.data = vars.data;
    _tickerActive || _ticker.wake();
    parent && _addToTimeline(parent, this, time || time === 0 ? time : parent._time, 1);
    vars.reversed && this.reverse();
    vars.paused && this.paused(true);
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this._dp;

    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime); //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.


      while (parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause

      _lazySafeRender(this, _totalTime, suppressEvents);
    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % this._dur || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }

    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    return _recacheAncestors(this.totalTime(_clamp(-this._delay, this._tDur, tTime), true));
  };

  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }

    if (this._ps !== value) {
      this._ps = value;

      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();

        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && (this._tTime -= _tinyNum) && Math.abs(this._zTime) !== _tinyNum); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detatched parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };

  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
        time = arguments.length ? rawTime : animation.rawTime();

    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }

    return time;
  };

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      this._rDelay = value;
      return _onUpdateTotalDuration(this);
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }

    return this._rts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = 0;
    this._zTime = -_tinyNum;
    return this;
  };

  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
        var _then = self.then;
        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };

      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, time) {
    var _this;

    if (vars === void 0) {
      vars = {};
    }

    _this = _Animation.call(this, vars, time) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _this.parent && _postAddChecks(_this.parent, _assertThisInitialized(_this));
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 0, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 1, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    new Tween(targets, _parseVars(arguments, 2, this), _parsePosition(this, _isNumber(fromVars) ? arguments[4] : position));
    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), _parsePosition(this, position));
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = this !== _globalTimeline && totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;

    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;

      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _round(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

          if (prevTime !== this._time || prevPaused !== !this._ts) {
            return this;
          }

          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur + 0.0001 : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


          _propagateYoyoEase(this, isYoyo);
        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _round(prevTime), _round(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
      }

      !prevTime && time && !suppressEvents && _callback(this, "onStart");

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);

          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this2 = this;

    if (!_isNumber(position)) {
      position = _parsePosition(this, position);
    }

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _round(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        isGlobalTime = _isNumber(onlyActive),
        // a number is interpreted as a global time. If the animation spans
    children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  };

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};

    var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        tween = Tween.to(tl, _setDefaults(vars, {
      ease: "none",
      lazy: false,
      time: endTime,
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        var duration = vars.duration || Math.abs((endTime - tl._time) / tl.timeScale());
        tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
      }
    }));

    return tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate() {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate();
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._time = this._tTime = this._pTime = 0;
    includeLabels && (this.labels = {});
    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        start,
        parent;

    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }

    if (self._dirty) {
      parent = self.parent;

      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;

        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }

        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;

          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }

          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }

        child._end > max && child._ts && (max = child._end);
        child = prev;
      }

      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

      self._dirty = 0;
    }

    return self._tDur;
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

      _lastRenderedFrame = _ticker.frame;
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        child || _ticker.sleep();
      }
    }
  };

  return Timeline;
}(Animation);

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      end = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);
    }
  }

  if (parsedStart !== end) {
    if (!isNaN(parsedStart * end)) {
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_initTween = function _initTween(tween, time) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
      autoOverwrite = tween._overwrite === "auto",
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  if (!tl) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    cleanVars = _copyExcluding(vars, _reservedProps);
    prevStartAt && prevStartAt.render(-1, true).kill();

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      if (immediateRender) {
        if (time > 0) {
          autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
        } else if (dur && !(time < 0 && prevStartAt)) {
          time && (tween._zTime = time);
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (prevStartAt) {
        !autoRevert && (tween._startAt = 0);
      } else {
        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

        p = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

        _removeFromParent(tween._startAt = Tween.set(targets, p));

        if (!immediateRender) {
          _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

        } else if (!time) {
          return;
        }
      }
    }

    tween._pt = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        plugin.priority && (hasPriority = 1);
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(0)); //Also make sure the overwriting doesn't overwrite THIS tween!!!


        overwritten = !tween.parent;
        _overwritingTween = 0;
      }

      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }

    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
    _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, time, skipInherit) {
    var _this3;

    if (typeof vars === "number") {
      time.duration = vars;
      vars = time;
      time = null;
    }

    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars), time) || this;
    var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = _this3.parent,
        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {}
      });
      tl.kill();
      tl.parent = _assertThisInitialized(_this3);

      if (keyframes) {
        _setDefaults(tl.vars.defaults, {
          ease: "none"
        });

        keyframes.forEach(function (frame) {
          return tl.to(parsedTargets, frame, ">");
        });
      } else {
        l = parsedTargets.length;
        staggerFunc = stagger ? distribute(stagger) : _emptyFunc;

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = {};

          for (p in vars) {
            if (_staggerPropsToSkip.indexOf(p) < 0) {
              copy[p] = vars[p];
            }
          }

          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
        }

        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true) {
      _overwritingTween = _assertThisInitialized(_this3);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    parent && _postAddChecks(parent, _assertThisInitialized(_this3));

    if (immediateRender || !duration && !keyframes && _this3._start === _round(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay)); //in case delay is negative

    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || this._startAt && this._zTime < 0 !== totalTime < 0) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;
        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);

        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          return this;
        }

        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_round(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted) {
        if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }

        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      time && !prevTime && !suppressEvents && _callback(this, "onStart");
      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }

      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate() {
    this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate();
    return _Animation2.prototype.invalidate.call(this);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (!targets && (!vars || vars === "all")) {
      this._lazy = 0;

      if (this.parent) {
        return _interrupt(this);
      }
    }

    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweenng, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }

            delete curLookup[p];
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return new Tween(targets, _parseVars(arguments, 1));
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return new Tween(targets, _parseVars(arguments, 2));
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = _slice.call(arguments, 0);

    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */

var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        // in case it's an alias, like "rotate" for "rotation".
    setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);

    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref) {
    var name = _ref.name,
        effect = _ref.effect,
        plugins = _ref.plugins,
        defaults = _ref.defaults,
        extendTimeline = _ref.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
  var pt = plugin._pt;

  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }

  return pt;
},
    _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          // is a plugin
          pt = _getPluginPropTween(pt, p);
        }

        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt;

    for (p in vars) {
      pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
      pt && (pt.op = p);

      this._props.push(p);
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i] || 0, value[i]);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

Tween.version = Timeline.version = gsap.version = "3.5.0";
_coreReady = 1;

if (_windowExists()) {
  _wake();
}

var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;

 //export some internal methods/orojects for use in CSSPlugin so that we can externalize that file and allow custom builds that exclude it.


// CONCATENATED MODULE: ./node_modules/gsap/CSSPlugin.js
/*!
 * CSSPlugin 3.5.0
 * https://greensock.com
 *
 * Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var CSSPlugin_win,
    CSSPlugin_doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    CSSPlugin_windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    CSSPlugin_bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = CSSPlugin_doc.createElementNS ? CSSPlugin_doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : CSSPlugin_doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : CSSPlugin_doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
},
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5;

  if (property in s && !preferPrefix) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(_prefixes[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
},
    _initCore = function _initCore() {
  if (CSSPlugin_windowExists() && window.document) {
    CSSPlugin_win = window;
    CSSPlugin_doc = CSSPlugin_win.document;
    _docElement = CSSPlugin_doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }

  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    CSSPlugin_addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
CSSPlugin_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
  style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);

  if (toPercent && (_transformProps[property] || ~property.indexOf("adius"))) {
    //transforms and borderRadius are relative to the size of the element itself!
    return _round(curValue / (isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty]) * amount);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === CSSPlugin_doc || !parent.appendChild) {
    parent = CSSPlugin_doc.body;
  }

  cache = parent._gsap;

  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
    return _round(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";

    if (horizontal && toPercent) {
      cache = _getCache(parent);
      cache.time = _ticker.time;
      cache.width = parent[measureProperty];
    }
  }

  return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
},
    CSSPlugin_get = function _get(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();

  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property] && property !== "transform") {
    value = CSSPlugin_parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
  }

  return unit && !~(value + "").indexOf(" ") ? CSSPlugin_convertToUnit(target, property, value, unit) + unit : value;
},
    CSSPlugin_tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  //note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  if (!start || start === "none") {
    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
    var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);

    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
  }

  var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      relative,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];

  _colorStringFilter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


  start = a[0];
  end = a[1];
  startValues = start.match(_numWithUnitExp) || [];
  endValues = end.match(_numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

        if (relative) {
          endValue = endValue.substr(2);
        }

        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _config.units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = CSSPlugin_convertToUnit(target, prop, startValue, endUnit) || 0;
        } //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: relative ? relative * endNum : endNum - startNum,
          m: color && color < 4 ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  if (_relExp.test(end)) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    value = x;
    x = y;
    y = value;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      if (cache) {
        cache.svg && target.removeAttribute("transform");

        CSSPlugin_parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


        cache.uncache = 1;
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;

      plugin._props.push(property);

      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    CSSPlugin_getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
},
    CSSPlugin_getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap || _getCache(target),
      style = target.style,
      matrix = CSSPlugin_getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !target.offsetParent) {
      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
      addedToDOM = 1; //flag

      nextSibling = target.nextSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = CSSPlugin_getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");

    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || CSSPlugin_getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

  if (pluginToAddPropTweensTo) {
    CSSPlugin_addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    CSSPlugin_addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    CSSPlugin_addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    CSSPlugin_addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }

  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
},
    CSSPlugin_parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new GSCache(target);

  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  matrix = CSSPlugin_getMatrix(target, cache.svg);

  if (cache.svg) {
    t1 = !cache.uncache && target.getAttribute("data-svg-origin");

    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.cos(skewX * _DEG2RAD));

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = _round(Math.sqrt(a * a + b * b + c * c));
      scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  cache.x = ((cache.xPercent = x && Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0) ? 0 : x) + px;
  cache.y = ((cache.yPercent = y && Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0) ? 0 : y) + px;
  cache.z = z + px;
  cache.scaleX = _round(scaleX);
  cache.scaleY = _round(scaleY);
  cache.rotation = _round(rotation) + deg;
  cache.rotationX = _round(rotationX) + deg;
  cache.rotationY = _round(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _config.force3D;
  cache.renderTransform = cache.svg ? CSSPlugin_renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
CSSPlugin_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = getUnit(start);
  return _round(parseFloat(start) + parseFloat(CSSPlugin_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = CSSPlugin_addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = CSSPlugin_addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = CSSPlugin_addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    CSSPlugin_renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = _round(a11);
    a21 = _round(a21);
    a12 = _round(a12);
    a22 = _round(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = CSSPlugin_convertToUnit(target, "x", x, "px");
    ty = CSSPlugin_convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = _round(tx + xPercent / 100 * temp.width);
    ty = _round(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);

  if (forceCSS) {
    //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
    target.style[_transformProp] = temp;
  }
},
    CSSPlugin_addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
  var cap = 360,
      isString = _isString(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = relative ? endNum * relative : endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    CSSPlugin_addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var style = _tempDivStyler.style,
      startCache = target._gsap,
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;
  style.cssText = getComputedStyle(target).cssText + ";position:absolute;display:block;"; //%-based translations will fail unless we set the width/height to match the original target (and padding/borders can affect it)

  style[_transformProp] = transforms;

  CSSPlugin_doc.body.appendChild(_tempDivStyler);

  endCache = CSSPlugin_parseTransform(_tempDivStyler, 1);

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = getUnit(startValue);
      endUnit = getUnit(endValue);
      startNum = startUnit !== endUnit ? CSSPlugin_convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new PropTween(plugin._pt, startCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;

      plugin._props.push(p);
    }
  }

  CSSPlugin_doc.body.removeChild(_tempDivStyler);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


_forEachName("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
    return index < 2 ? name + side : "border" + side + name;
  });

  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;

    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return CSSPlugin_get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }

    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});

var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority;
    _pluginInitted || _initCore();

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
        //plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = _replaceRandom(endValue);
      }

      if (specialProp) {
        if (specialProp(this, target, p, endValue, tween)) {
          hasPriority = 1;
        }
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        this.add(style, "setProperty", getComputedStyle(target).getPropertyValue(p) + "", endValue + "", index, targets, 0, 0, p);
      } else if (type !== "undefined") {
        startValue = CSSPlugin_get(target, p);
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

        if (relative) {
          endValue = endValue.substr(2);
        }

        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && CSSPlugin_get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            CSSPlugin_addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform || CSSPlugin_parseTransform(target); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, relative ? relative * endNum : endNum - cache.scaleY);
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && CSSPlugin_addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

              CSSPlugin_addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            CSSPlugin_addRotationalPropTween(this, cache, p, startNum, endValue, relative);

            continue;
          } else if (p === "smoothOrigin") {
            CSSPlugin_addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            CSSPlugin_addRawTransformPTs(this, endValue, target);

            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = (endValue + "").substr((endNum + "").length) || (p in _config.units ? _config.units[p] : startUnit);

          if (startUnit !== endUnit) {
            startNum = CSSPlugin_convertToUnit(target, p, startValue, endUnit);
          }

          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, endUnit === "px" && vars.autoRound !== false && !isTransformRelated ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit) {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, target[p], endValue, index, targets);
          } else {
            _missingPlugin(p, endValue);

            continue;
          }
        } else {
          CSSPlugin_tweenComplexCSSString.call(this, target, p, startValue, endValue);
        }

        props.push(p);
      }
    }

    hasPriority && _sortPropTweensByPriority(this);
  },
  get: CSSPlugin_get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || CSSPlugin_get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: CSSPlugin_getMatrix
  }
};
gsap.utils.checkPrefix = _checkPropPrefix;

(function (positionAndScale, rotation, others, aliases) {
  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });

  _forEachName(rotation, function (name) {
    _config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });

  _propertyAliases[all[13]] = positionAndScale + "," + rotation;

  _forEachName(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _config.units[name] = "px";
});

gsap.registerPlugin(CSSPlugin);

// CONCATENATED MODULE: ./node_modules/gsap/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gsap", function() { return gsapWithCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return gsapWithCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenMax", function() { return TweenMaxWithCSS; });
/* concated harmony reexport CSSPlugin */__webpack_require__.d(__webpack_exports__, "CSSPlugin", function() { return CSSPlugin; });
/* concated harmony reexport TweenLite */__webpack_require__.d(__webpack_exports__, "TweenLite", function() { return Tween; });
/* concated harmony reexport TimelineMax */__webpack_require__.d(__webpack_exports__, "TimelineMax", function() { return Timeline; });
/* concated harmony reexport TimelineLite */__webpack_require__.d(__webpack_exports__, "TimelineLite", function() { return Timeline; });
/* concated harmony reexport Power0 */__webpack_require__.d(__webpack_exports__, "Power0", function() { return Power0; });
/* concated harmony reexport Power1 */__webpack_require__.d(__webpack_exports__, "Power1", function() { return Power1; });
/* concated harmony reexport Power2 */__webpack_require__.d(__webpack_exports__, "Power2", function() { return Power2; });
/* concated harmony reexport Power3 */__webpack_require__.d(__webpack_exports__, "Power3", function() { return Power3; });
/* concated harmony reexport Power4 */__webpack_require__.d(__webpack_exports__, "Power4", function() { return Power4; });
/* concated harmony reexport Linear */__webpack_require__.d(__webpack_exports__, "Linear", function() { return Linear; });
/* concated harmony reexport Quad */__webpack_require__.d(__webpack_exports__, "Quad", function() { return Quad; });
/* concated harmony reexport Cubic */__webpack_require__.d(__webpack_exports__, "Cubic", function() { return Cubic; });
/* concated harmony reexport Quart */__webpack_require__.d(__webpack_exports__, "Quart", function() { return Quart; });
/* concated harmony reexport Quint */__webpack_require__.d(__webpack_exports__, "Quint", function() { return Quint; });
/* concated harmony reexport Strong */__webpack_require__.d(__webpack_exports__, "Strong", function() { return Strong; });
/* concated harmony reexport Elastic */__webpack_require__.d(__webpack_exports__, "Elastic", function() { return Elastic; });
/* concated harmony reexport Back */__webpack_require__.d(__webpack_exports__, "Back", function() { return Back; });
/* concated harmony reexport SteppedEase */__webpack_require__.d(__webpack_exports__, "SteppedEase", function() { return SteppedEase; });
/* concated harmony reexport Bounce */__webpack_require__.d(__webpack_exports__, "Bounce", function() { return Bounce; });
/* concated harmony reexport Sine */__webpack_require__.d(__webpack_exports__, "Sine", function() { return Sine; });
/* concated harmony reexport Expo */__webpack_require__.d(__webpack_exports__, "Expo", function() { return Expo; });
/* concated harmony reexport Circ */__webpack_require__.d(__webpack_exports__, "Circ", function() { return Circ; });


var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
    // to protect from tree shaking
TweenMaxWithCSS = gsapWithCSS.core.Tween;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mvc_1 = __webpack_require__(9);
var Module = /** @class */ (function () {
    function Module() {
        this.registerModels();
        this.registerControllers();
        this.registerScenes();
    }
    Object.defineProperty(Module.prototype, "mvc", {
        get: function () {
            return mvc_1.Mvc.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Module.prototype.registerModels = function () {
    };
    Module.prototype.registerControllers = function () {
    };
    Module.prototype.registerScenes = function () {
    };
    Module.prototype.addModel = function (modelName, modelClass) {
        this.mvc.registerModel(modelName, modelClass);
    };
    Module.prototype.addController = function (notificationName, controllerClass, viewClass) {
        this.mvc.registerController(notificationName, controllerClass, viewClass);
    };
    /**
     * Maps a notification to a set of controllers which will be called during scene transition
     */
    Module.prototype.addScene = function (sceneNotification, controllersNotifications) {
        this.mvc.registerScene(sceneNotification, controllersNotifications);
    };
    return Module;
}());
exports.Module = Module;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mvc_entity_1 = __webpack_require__(23);
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        var _this = _super.call(this) || this;
        _this.notificationHandlers = {};
        _this.addNotifications();
        return _this;
    }
    /**
     * Called when controller, view and model are initialized
     */
    Controller.prototype.postRegister = function () {
    };
    /**
     * Called on notification
     */
    Controller.prototype.execute = function (notification) {
    };
    /**
     * A place to add all notifications
     */
    Controller.prototype.addNotifications = function () {
    };
    /**
     * Subscribes to the notification and stores the handler function
     */
    Controller.prototype.addNotification = function (name, notificationHandler) {
        if (!this.notificationHandlers[name]) {
            this.notificationHandlers[name] = [];
        }
        this.notificationHandlers[name].push(notificationHandler);
        this.mvc.addNotification(name, this);
    };
    /**
     * Calls all handlers of a specific notification
     */
    Controller.prototype.handleNotification = function (notification) {
        var _this = this;
        if (!this.notificationHandlers[notification.name])
            return;
        this.notificationHandlers[notification.name].forEach(function (handler) {
            handler.call(_this, notification);
        });
    };
    /**
     * Gets the model by name
     */
    Controller.prototype.retrieveModel = function (modelName) {
        return this.mvc.retrieveModel(modelName);
    };
    Controller.prototype.layerTransitionInStart = function () {
        this.view.layerTransitionInStart();
    };
    Controller.prototype.layerTransitionOutStart = function () {
        this.view.layerTransitionOutStart();
    };
    return Controller;
}(mvc_entity_1.MVCEntity));
exports.Controller = Controller;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GraphicsEngineNotifications = /** @class */ (function () {
    function GraphicsEngineNotifications() {
    }
    GraphicsEngineNotifications.START_ASSETS_LOADING = "START_ASSETS_LOADING";
    GraphicsEngineNotifications.ASSETS_LOADING_ON_PROGRESS = "ASSETS_LOADING_ON_PROGRESS";
    GraphicsEngineNotifications.ASSETS_LOADING_COMPLETE = "ASSETS_LOADING_COMPLETE";
    return GraphicsEngineNotifications;
}());
exports.GraphicsEngineNotifications = GraphicsEngineNotifications;
var GraphicsEngineNames = /** @class */ (function () {
    function GraphicsEngineNames() {
    }
    GraphicsEngineNames.MODEL = "GRAPHIC_ENGINE_MODEL";
    return GraphicsEngineNames;
}());
exports.GraphicsEngineNames = GraphicsEngineNames;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gsap_1 = __importDefault(__webpack_require__(2));
var pixi_js_1 = __webpack_require__(5);
var app_manager_1 = __webpack_require__(0);
var View = /** @class */ (function () {
    function View() {
        this.display = new pixi_js_1.Container();
    }
    /**
     * Called when object is created
     */
    View.prototype.onRegister = function () {
        this.display.visible = false;
    };
    /**
     * Called when view is ready
     */
    View.prototype.postRegister = function () {
    };
    View.prototype.layerTransitionInStart = function () {
        this.display.visible = true;
        gsap_1.default.fromTo(this.display, { alpha: 0 }, { duration: 0.5, alpha: 1 });
    };
    View.prototype.layerTransitionOutStart = function () {
        var _this = this;
        if (!this.display.visible)
            return;
        gsap_1.default.to(this.display, {
            duration: 0.5,
            alpha: 0,
            onComplete: function () {
                _this.display.visible = false;
            }
        });
    };
    View.prototype.getTexture = function (name) {
        return app_manager_1.AppManager.getInstance().getTexture(name);
    };
    return View;
}());
exports.View = View;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = __webpack_require__(7);
var app_manager_1 = __webpack_require__(0);
var pixi_js_1 = __webpack_require__(5);
var MenuButtonsView = /** @class */ (function (_super) {
    __extends(MenuButtonsView, _super);
    function MenuButtonsView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuButtonsView.prototype.drawScene = function () {
        this.drawTitle();
    };
    MenuButtonsView.prototype.drawTitle = function () {
        var text = new pixi_js_1.Text('BUTTONS');
        text.anchor.set(0.5);
        text.x = app_manager_1.AppManager.getInstance().getSceneWidth() / 2;
        text.y = app_manager_1.AppManager.getInstance().getSceneHeight() / 2 + 50;
        this.display.addChild(text);
    };
    return MenuButtonsView;
}(view_1.View));
exports.MenuButtonsView = MenuButtonsView;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_manager_1 = __webpack_require__(0);
var global_notifications_1 = __webpack_require__(21);
var Mvc = /** @class */ (function () {
    function Mvc() {
        // Holds all controllers 
        this.controllers = {};
        // Holds all notifications and their subscribers 
        this.notifications = {};
        // Holds all models
        this.models = {};
        // Holds all scenes
        this.scenes = [];
        if (Mvc.instance) {
            throw new Error("Error - use Mvc.getInstance()");
        }
    }
    Mvc.getInstance = function () {
        if (!Mvc.instance) {
            Mvc.instance = new Mvc();
        }
        return Mvc.instance;
    };
    /**
     * Subsctibes a controller to a notification
     */
    Mvc.prototype.addNotification = function (name, controller) {
        if (!this.notifications[name]) {
            this.notifications[name] = [];
        }
        this.notifications[name].push(controller);
    };
    Mvc.prototype.sendNotification = function (name, body) {
        this.handleSceneTransitionNotification(name, body);
        this.handleNotification(name, body);
    };
    /**
     * Handle scene transition notifications.
     * Run through all controllers which were mapped to scenes
     * and call approprite methods: execute and show / hide layer
     */
    Mvc.prototype.handleSceneTransitionNotification = function (name, body) {
        var _this = this;
        if (name !== global_notifications_1.GlobalNotifications.TRANSITION_TO_SCENE)
            return;
        var sceneNotification = body;
        // Run through all scenese
        this.scenes.forEach(function (scene) {
            // Run through all controllers registered in the scene
            scene.controllersNotifications.forEach(function (notification) {
                // If the current scene is for transition - call its controllers
                if (scene.sceneNotification === sceneNotification) {
                    _this.controllers[notification].execute({ name: notification, body: null });
                    _this.controllers[notification].layerTransitionInStart();
                }
                else {
                    _this.controllers[notification].layerTransitionOutStart();
                }
            });
        });
    };
    /**
     * Run through all controllers which are subscribed to notification
     * and call their handler methods.
     */
    Mvc.prototype.handleNotification = function (name, body) {
        if (!this.notifications[name])
            return;
        var controllers = this.notifications[name];
        controllers.forEach(function (controller) {
            controller.handleNotification({ name: name, body: body });
        });
    };
    Mvc.prototype.registerController = function (notificationName, controllerClass, viewClass) {
        var controller = new controllerClass();
        controller.onRegister();
        if (viewClass) {
            controller.view = new viewClass();
            controller.view.onRegister();
            app_manager_1.AppManager.getInstance().addLayerToScene(controller.view.display);
            controller.view.postRegister();
        }
        this.controllers[notificationName] = controller;
        // Subscribe itself to notification
        controller.addNotification(notificationName, controller.execute.bind(controller));
        controller.postRegister();
    };
    Mvc.prototype.registerModel = function (modelName, modelClass) {
        var model = new modelClass();
        this.models[modelName] = model;
    };
    Mvc.prototype.retrieveModel = function (modelName) {
        return this.models[modelName];
    };
    Mvc.prototype.registerScene = function (sceneNotification, controllersNotifications) {
        this.scenes.push({ sceneNotification: sceneNotification, controllersNotifications: controllersNotifications });
    };
    return Mvc;
}());
exports.Mvc = Mvc;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PreloaderNotifications = /** @class */ (function () {
    function PreloaderNotifications() {
    }
    PreloaderNotifications.INIT = "PRELOADER_INIT";
    return PreloaderNotifications;
}());
exports.PreloaderNotifications = PreloaderNotifications;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MenuNotifications = /** @class */ (function () {
    function MenuNotifications() {
    }
    MenuNotifications.INIT = "MENU_INIT";
    MenuNotifications.BUTTONS = "MENU_BUTTONS";
    return MenuNotifications;
}());
exports.MenuNotifications = MenuNotifications;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.sceneWidth = 900;
    Config.sceneHeight = 720;
    Config.preloaderAassets = {
        loaderBg: "assets/loader-bar/loader-bg.png",
        loaderBar: "assets/loader-bar/loader-bar.png",
    };
    Config.assets = {
        tank: 'assets/tanks/tank.png',
        enemy: 'assets/tanks/enemy_red.png',
        wall: 'assets/board/wall.png',
        bullet: 'assets/board/small_wall_4.png'
    };
    return Config;
}());
exports.Config = Config;
;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameNotifications = /** @class */ (function () {
    function GameNotifications() {
    }
    GameNotifications.INIT = "GAME_INIT";
    return GameNotifications;
}());
exports.GameNotifications = GameNotifications;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FSM = /** @class */ (function () {
    function FSM(states) {
        this.currentState = null;
        this.states = states;
    }
    // Called in main update loop
    FSM.prototype.step = function () {
        if (this.currentState === null) {
            this.currentState = Object.keys(this.states)[0]; // Take the first state as initial   
            this.states[this.currentState].enter();
        }
        this.states[this.currentState].execute();
    };
    // Changes the state
    FSM.prototype.transition = function (newState) {
        this.currentState = newState;
        this.states[this.currentState].enter();
    };
    return FSM;
}());
exports.FSM = FSM;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var app_manager_1 = __webpack_require__(0);
var unit_state_1 = __webpack_require__(16);
var UnitIdleState = /** @class */ (function (_super) {
    __extends(UnitIdleState, _super);
    function UnitIdleState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnitIdleState.prototype.enter = function () {
        this.unit.scale.set(1);
    };
    UnitIdleState.prototype.execute = function () {
        var keys = app_manager_1.AppManager.getInstance().keys;
        if (keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight']) {
            this.unit.fsm.transition('move');
        }
    };
    return UnitIdleState;
}(unit_state_1.UnitState));
exports.UnitIdleState = UnitIdleState;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = __webpack_require__(39);
var UnitState = /** @class */ (function (_super) {
    __extends(UnitState, _super);
    function UnitState(args) {
        var _this = _super.call(this, args) || this;
        _this.unit = args;
        return _this;
    }
    UnitState.prototype.enter = function () {
    };
    UnitState.prototype.execute = function () {
    };
    return UnitState;
}(state_1.State));
exports.UnitState = UnitState;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var unit_state_1 = __webpack_require__(16);
var unit_1 = __webpack_require__(43);
var gsap_1 = __importDefault(__webpack_require__(2));
var app_manager_1 = __webpack_require__(0);
var UnitMoveState = /** @class */ (function (_super) {
    __extends(UnitMoveState, _super);
    function UnitMoveState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveDirection = unit_1.MoveDirections.Down;
        _this.speed = 2;
        return _this;
    }
    UnitMoveState.prototype.enter = function () {
        this.unit.scale.set(0.95);
    };
    UnitMoveState.prototype.execute = function () {
        _super.prototype.execute.call(this);
        var keys = app_manager_1.AppManager.getInstance().keys;
        if (!(keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight'])) {
            this.unit.fsm.transition('idle');
            return;
        }
        if (keys['ArrowUp'])
            this.moveDirection = unit_1.MoveDirections.Up;
        if (keys['ArrowDown'])
            this.moveDirection = unit_1.MoveDirections.Down;
        if (keys['ArrowLeft'])
            this.moveDirection = unit_1.MoveDirections.Left;
        if (keys['ArrowRight'])
            this.moveDirection = unit_1.MoveDirections.Right;
        this.move();
    };
    UnitMoveState.prototype.move = function () {
        this.turnTo();
        this.moveTo();
        if (this.unit.isHitTheWall())
            this.handleWallCollision();
        if (this.unit.isHitTheUnit())
            this.handleUnitCollision();
    };
    UnitMoveState.prototype.handleWallCollision = function () {
        // Bounce back
        this.moveDirection = this.moveDirection * -1;
        this.moveTo();
        this.moveDirection = this.moveDirection * -1;
    };
    UnitMoveState.prototype.handleUnitCollision = function () {
        // Bounce back
        this.moveDirection = this.moveDirection * -1;
        this.moveTo();
        this.moveDirection = this.moveDirection * -1;
    };
    UnitMoveState.prototype.turnTo = function () {
        var angle;
        if (this.moveDirection === unit_1.MoveDirections.Up) {
            angle = 0;
            if (this.unit.lookDirection === unit_1.MoveDirections.Left) {
                angle = 300;
            }
        }
        if (this.moveDirection === unit_1.MoveDirections.Down)
            angle = 180;
        if (this.moveDirection === unit_1.MoveDirections.Left)
            angle = 270;
        if (this.moveDirection === unit_1.MoveDirections.Right)
            angle = 90;
        gsap_1.default.to(this.unit.skin, { angle: angle, duration: 0.3 });
        this.unit.lookDirection = this.moveDirection;
    };
    UnitMoveState.prototype.moveTo = function () {
        if (this.moveDirection === unit_1.MoveDirections.Up)
            this.unit.y -= this.speed;
        if (this.moveDirection === unit_1.MoveDirections.Down)
            this.unit.y += this.speed;
        if (this.moveDirection === unit_1.MoveDirections.Left)
            this.unit.x -= this.speed;
        if (this.moveDirection === unit_1.MoveDirections.Right)
            this.unit.x += this.speed;
    };
    return UnitMoveState;
}(unit_state_1.UnitState));
exports.UnitMoveState = UnitMoveState;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var preloader_module_1 = __webpack_require__(20);
var entry_point_1 = __webpack_require__(25);
var menu_module_1 = __webpack_require__(28);
var game_module_1 = __webpack_require__(31);
var GameEntryPoint = /** @class */ (function (_super) {
    __extends(GameEntryPoint, _super);
    function GameEntryPoint() {
        var _this = _super.call(this) || this;
        new preloader_module_1.PreloaderModule();
        new menu_module_1.MenuModule();
        new game_module_1.GameModule();
        return _this;
    }
    return GameEntryPoint;
}(entry_point_1.EntryPoint));
exports.GameEntryPoint = GameEntryPoint;
window.onload = function () {
    new GameEntryPoint();
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __webpack_require__(3);
var preloader_names_1 = __webpack_require__(10);
var preloader_init_controller_1 = __webpack_require__(22);
var preloader_init_view_1 = __webpack_require__(24);
var PreloaderModule = /** @class */ (function (_super) {
    __extends(PreloaderModule, _super);
    function PreloaderModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreloaderModule.prototype.registerControllers = function () {
        this.addController(preloader_names_1.PreloaderNotifications.INIT, preloader_init_controller_1.PreloaderInitController, preloader_init_view_1.PreloaderInitView);
    };
    PreloaderModule.prototype.registerScenes = function () {
        this.addScene(preloader_names_1.PreloaderNotifications.INIT, [preloader_names_1.PreloaderNotifications.INIT]);
    };
    return PreloaderModule;
}(module_1.Module));
exports.PreloaderModule = PreloaderModule;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GlobalNotifications = /** @class */ (function () {
    function GlobalNotifications() {
    }
    GlobalNotifications.TRANSITION_TO_SCENE = "TRANSITION_TO_SCENE";
    return GlobalNotifications;
}());
exports.GlobalNotifications = GlobalNotifications;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gsap_1 = __webpack_require__(2);
var global_notifications_1 = __webpack_require__(21);
var controller_1 = __webpack_require__(4);
var graphics_engine_names_1 = __webpack_require__(6);
var menu_names_1 = __webpack_require__(11);
var config_1 = __webpack_require__(12);
var PreloaderInitController = /** @class */ (function (_super) {
    __extends(PreloaderInitController, _super);
    function PreloaderInitController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingInitialAssets = true;
        return _this;
    }
    PreloaderInitController.prototype.addNotifications = function () {
        this.addNotification(graphics_engine_names_1.GraphicsEngineNotifications.ASSETS_LOADING_COMPLETE, this.onAssetsLoadingComplete.bind(this));
        this.addNotification(graphics_engine_names_1.GraphicsEngineNotifications.ASSETS_LOADING_ON_PROGRESS, this.onAssetsLoadingProgress.bind(this));
    };
    PreloaderInitController.prototype.postRegister = function () {
        this.startAssetsLoading();
    };
    /**
     * There are two loading phases:
     * 1) Load the preloader assets in order to show the progress bar
     * 2) Load the rest of the assets
     */
    PreloaderInitController.prototype.startAssetsLoading = function () {
        var assets = config_1.Config.assets;
        if (this.loadingInitialAssets) {
            assets = config_1.Config.preloaderAassets;
        }
        this.sendNotification(graphics_engine_names_1.GraphicsEngineNotifications.START_ASSETS_LOADING, assets);
    };
    PreloaderInitController.prototype.onAssetsLoadingComplete = function (notification) {
        var _this = this;
        if (this.loadingInitialAssets) {
            // Have loaded the initial assets, so can draw the scene
            // and can start to load the rest of the game assets
            this.loadingInitialAssets = false;
            this.view.drawScene();
            this.startAssetsLoading();
            return;
        }
        gsap_1.gsap.delayedCall(1, function () {
            // Transition to menu scene
            _this.sendNotification(global_notifications_1.GlobalNotifications.TRANSITION_TO_SCENE, menu_names_1.MenuNotifications.INIT);
        });
    };
    PreloaderInitController.prototype.onAssetsLoadingProgress = function (notification) {
        // Cannot display a progrees if there is no progress bar yet :)
        if (this.loadingInitialAssets)
            return;
        this.view.updateProgressBar(notification.body);
    };
    return PreloaderInitController;
}(controller_1.Controller));
exports.PreloaderInitController = PreloaderInitController;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mvc_1 = __webpack_require__(9);
var MVCEntity = /** @class */ (function () {
    function MVCEntity() {
        this.onRegister();
    }
    Object.defineProperty(MVCEntity.prototype, "mvc", {
        get: function () {
            return mvc_1.Mvc.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called once when object is created
     */
    MVCEntity.prototype.onRegister = function () {
    };
    /**
     * Sends the notification to all subscribed entities
     */
    MVCEntity.prototype.sendNotification = function (name, body) {
        console.log('sendNotification: ', name);
        this.mvc.sendNotification(name, body);
    };
    return MVCEntity;
}());
exports.MVCEntity = MVCEntity;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = __webpack_require__(7);
var app_manager_1 = __webpack_require__(0);
var pixi_js_1 = __webpack_require__(5);
var config_1 = __webpack_require__(12);
var gsap_1 = __webpack_require__(2);
var PreloaderInitView = /** @class */ (function (_super) {
    __extends(PreloaderInitView, _super);
    function PreloaderInitView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreloaderInitView.prototype.drawScene = function () {
        this.display.visible = true;
        this.drawBg();
        this.drawTitle();
        this.drawProgressBar();
    };
    PreloaderInitView.prototype.drawTitle = function () {
        var text = new pixi_js_1.Text('Loading game...');
        text.anchor.set(0.5);
        text.x = app_manager_1.AppManager.getInstance().getSceneWidth() / 2;
        text.y = app_manager_1.AppManager.getInstance().getSceneHeight() / 2;
        this.display.addChild(text);
    };
    PreloaderInitView.prototype.drawBg = function () {
        var bg = new pixi_js_1.Graphics();
        bg.beginFill(0xDE3249);
        bg.drawRect(0, 0, app_manager_1.AppManager.getInstance().getSceneWidth(), app_manager_1.AppManager.getInstance().getSceneHeight());
        bg.endFill();
        this.display.addChild(bg);
    };
    PreloaderInitView.prototype.drawProgressBar = function () {
        var holder = new pixi_js_1.Container;
        var bg = new pixi_js_1.Sprite(this.getTexture(config_1.Config.preloaderAassets['loaderBg']));
        this.bar = new pixi_js_1.Sprite(this.getTexture(config_1.Config.preloaderAassets['loaderBar']));
        this.bar.x = this.bar.y = 5;
        this.bar.width;
        holder.addChild(bg, this.bar);
        holder.pivot.x = holder.width / 2;
        holder.x = app_manager_1.AppManager.getInstance().getSceneWidth() / 2;
        holder.y = app_manager_1.AppManager.getInstance().getSceneHeight() / 2 + 50;
        this.display.addChild(holder);
    };
    PreloaderInitView.prototype.updateProgressBar = function (progress) {
        // Emulating some throttling
        gsap_1.gsap.to(this.bar.scale, { duration: 1, x: progress / 100 });
        console.log(progress);
    };
    return PreloaderInitView;
}(view_1.View));
exports.PreloaderInitView = PreloaderInitView;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphics_engine_module_1 = __webpack_require__(26);
var EntryPoint = /** @class */ (function () {
    function EntryPoint() {
        new graphics_engine_module_1.GraphicsEngineModule();
    }
    return EntryPoint;
}());
exports.EntryPoint = EntryPoint;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __webpack_require__(3);
var graphics_engine_loader_controller_1 = __webpack_require__(27);
var graphics_engine_names_1 = __webpack_require__(6);
var GraphicsEngineModule = /** @class */ (function (_super) {
    __extends(GraphicsEngineModule, _super);
    function GraphicsEngineModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphicsEngineModule.prototype.registerControllers = function () {
        this.addController(graphics_engine_names_1.GraphicsEngineNotifications.START_ASSETS_LOADING, graphics_engine_loader_controller_1.GraphicsEngineLoaderController);
    };
    return GraphicsEngineModule;
}(module_1.Module));
exports.GraphicsEngineModule = GraphicsEngineModule;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var app_manager_1 = __webpack_require__(0);
var controller_1 = __webpack_require__(4);
var graphics_engine_names_1 = __webpack_require__(6);
var GraphicsEngineLoaderController = /** @class */ (function (_super) {
    __extends(GraphicsEngineLoaderController, _super);
    function GraphicsEngineLoaderController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphicsEngineLoaderController.prototype.execute = function (notification) {
        app_manager_1.AppManager.getInstance().startAssetsLoading(notification.body, this.onAssetsLoadingComplete.bind(this), this.onAssetsLoadingProgress.bind(this));
    };
    GraphicsEngineLoaderController.prototype.onAssetsLoadingComplete = function () {
        this.sendNotification(graphics_engine_names_1.GraphicsEngineNotifications.ASSETS_LOADING_COMPLETE);
    };
    GraphicsEngineLoaderController.prototype.onAssetsLoadingProgress = function (progress) {
        this.sendNotification(graphics_engine_names_1.GraphicsEngineNotifications.ASSETS_LOADING_ON_PROGRESS, progress);
    };
    return GraphicsEngineLoaderController;
}(controller_1.Controller));
exports.GraphicsEngineLoaderController = GraphicsEngineLoaderController;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __webpack_require__(3);
var menu_buttons_controller_1 = __webpack_require__(1);
var menu_init_controller_1 = __webpack_require__(29);
var menu_names_1 = __webpack_require__(11);
var menu_buttons_view_1 = __webpack_require__(8);
var menu_init_view_1 = __webpack_require__(30);
var MenuModule = /** @class */ (function (_super) {
    __extends(MenuModule, _super);
    function MenuModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuModule.prototype.registerControllers = function () {
        this.addController(menu_names_1.MenuNotifications.INIT, menu_init_controller_1.MenuInitController, menu_init_view_1.MenuInitView);
        this.addController(menu_names_1.MenuNotifications.BUTTONS, menu_buttons_controller_1.MenuButtonsController, menu_buttons_view_1.MenuButtonsView);
    };
    MenuModule.prototype.registerScenes = function () {
        //this.addScene(MenuNotifications.INIT, [ MenuNotifications.INIT ]);
        this.addScene(menu_names_1.MenuNotifications.INIT, [menu_names_1.MenuNotifications.INIT, menu_names_1.MenuNotifications.BUTTONS]);
    };
    return MenuModule;
}(module_1.Module));
exports.MenuModule = MenuModule;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __webpack_require__(4);
var game_names_1 = __webpack_require__(13);
var gsap_1 = __webpack_require__(2);
var global_notifications_1 = __webpack_require__(21);
var MenuInitController = /** @class */ (function (_super) {
    __extends(MenuInitController, _super);
    function MenuInitController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuInitController.prototype.execute = function (notification) {
        var _this = this;
        this.showMenu();
        gsap_1.gsap.delayedCall(5, function () {
            // Transition to game scene
            _this.sendNotification(global_notifications_1.GlobalNotifications.TRANSITION_TO_SCENE, game_names_1.GameNotifications.INIT);
        });
    };
    MenuInitController.prototype.showMenu = function () {
        this.view.drawScene();
    };
    return MenuInitController;
}(controller_1.Controller));
exports.MenuInitController = MenuInitController;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = __webpack_require__(7);
var app_manager_1 = __webpack_require__(0);
var pixi_js_1 = __webpack_require__(5);
var MenuInitView = /** @class */ (function (_super) {
    __extends(MenuInitView, _super);
    function MenuInitView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuInitView.prototype.drawScene = function () {
        this.display.visible = true;
        this.drawBg();
        this.drawTitle();
    };
    MenuInitView.prototype.drawTitle = function () {
        var text = new pixi_js_1.Text('MENU!');
        text.anchor.set(0.5);
        text.x = app_manager_1.AppManager.getInstance().getSceneWidth() / 2;
        text.y = app_manager_1.AppManager.getInstance().getSceneHeight() / 2;
        this.display.addChild(text);
    };
    MenuInitView.prototype.drawBg = function () {
        var bg = new pixi_js_1.Graphics();
        bg.beginFill(0xDE3249);
        bg.drawRect(0, 0, app_manager_1.AppManager.getInstance().getSceneWidth(), app_manager_1.AppManager.getInstance().getSceneHeight());
        bg.endFill();
        this.display.addChild(bg);
    };
    return MenuInitView;
}(view_1.View));
exports.MenuInitView = MenuInitView;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __webpack_require__(3);
var game_init_controller_1 = __webpack_require__(32);
var game_names_1 = __webpack_require__(13);
var game_init_view_1 = __webpack_require__(33);
var GameModule = /** @class */ (function (_super) {
    __extends(GameModule, _super);
    function GameModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameModule.prototype.registerControllers = function () {
        this.addController(game_names_1.GameNotifications.INIT, game_init_controller_1.GameInitController, game_init_view_1.GameInitView);
    };
    GameModule.prototype.registerScenes = function () {
        this.addScene(game_names_1.GameNotifications.INIT, [game_names_1.GameNotifications.INIT]);
    };
    return GameModule;
}(module_1.Module));
exports.GameModule = GameModule;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __webpack_require__(4);
var GameInitController = /** @class */ (function (_super) {
    __extends(GameInitController, _super);
    function GameInitController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameInitController.prototype.addNotifications = function () {
        //this.addNotification(MenuNotifications.SHOW, this.showMenu.bind(this));
    };
    GameInitController.prototype.execute = function (notification) {
        this.showMenu();
    };
    GameInitController.prototype.showMenu = function () {
        this.view.drawScene();
    };
    return GameInitController;
}(controller_1.Controller));
exports.GameInitController = GameInitController;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = __webpack_require__(7);
var app_manager_1 = __webpack_require__(0);
var pixi_js_1 = __webpack_require__(5);
var game_scene_1 = __webpack_require__(34);
var GameInitView = /** @class */ (function (_super) {
    __extends(GameInitView, _super);
    function GameInitView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameInitView.prototype.drawScene = function () {
        var _this = this;
        this.drawBg();
        this.drawTitle();
        this.gameScene = new game_scene_1.GameScene();
        this.display.addChild(this.gameScene);
        app_manager_1.AppManager.getInstance().app.ticker.add(function () {
            _this.gameScene.update();
        });
    };
    GameInitView.prototype.drawTitle = function () {
        var text = new pixi_js_1.Text('Game Scene');
        text.anchor.set(0.5);
        text.x = app_manager_1.AppManager.getInstance().getSceneWidth() / 2;
        text.y = app_manager_1.AppManager.getInstance().getSceneHeight() / 2;
        this.display.addChild(text);
    };
    GameInitView.prototype.drawBg = function () {
        var bg = new pixi_js_1.Graphics();
        bg.beginFill(0xDE3249);
        bg.drawRect(0, 0, app_manager_1.AppManager.getInstance().getSceneWidth(), app_manager_1.AppManager.getInstance().getSceneHeight());
        bg.endFill();
        this.display.addChild(bg);
    };
    return GameInitView;
}(view_1.View));
exports.GameInitView = GameInitView;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = __webpack_require__(35);
var utils_1 = __webpack_require__(44);
var enemy_1 = __webpack_require__(37);
var bullet_1 = __webpack_require__(41);
var player_1 = __webpack_require__(42);
var app_manager_1 = __webpack_require__(0);
var config_1 = __webpack_require__(12);
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.units = [];
        _this.bullets = [];
        _this.init();
        return _this;
    }
    GameScene.prototype.init = function () {
        this.createMap();
        this.createPlayer();
        this.createEnemy();
        this.startEnemiesGenerator();
    };
    GameScene.prototype.createMap = function () {
        this.map = new map_1.Map(app_manager_1.AppManager.getInstance().getTexture(config_1.Config.assets['wall']));
        this.map.x = 0;
        this.map.y = 0;
        this.addChild(this.map);
    };
    GameScene.prototype.startEnemiesGenerator = function () {
        var _this = this;
        //Todo need to clear interval on scene exit
        setInterval(function () {
            _this.createEnemy();
        }, 5000);
    };
    GameScene.prototype.createPlayer = function () {
        var unit = new player_1.Player(app_manager_1.AppManager.getInstance().getTexture(config_1.Config.assets['tank']));
        unit.x = this.map.width / 2;
        unit.y = this.map.height / 2;
        this.finishUnitCreation(unit);
    };
    GameScene.prototype.createEnemy = function () {
        var unit = new enemy_1.Enemy(app_manager_1.AppManager.getInstance().getTexture(config_1.Config.assets['enemy']));
        var spawnPoint = this.map.getRandomSpawnPoint();
        unit.x = spawnPoint.x;
        unit.y = spawnPoint.y;
        this.finishUnitCreation(unit);
    };
    GameScene.prototype.finishUnitCreation = function (unit) {
        var _this = this;
        unit.isHitTheWall = function () { return _this.map.checkCollisionUnitVsWall(unit); };
        unit.isHitTheUnit = function () { return _this.checkCollisionUnitVsUnit(unit); };
        unit.isHitTheBullet = function () { return _this.checkCollisionUnitVsBullet(unit); };
        unit.shoot = function () { return _this.createBullet(unit); };
        this.units.push(unit);
        this.addChild(unit);
    };
    GameScene.prototype.update = function () {
        this.units.forEach(function (unit) { return unit.update(); });
        this.bullets.forEach(function (bullet) { return bullet.update(); });
        //this.checkCollisionUnitsVsWalls();
        //this.checkCollisionUnitsVsUnits();
        //this.checkCollisionUnitsVsBullets();
    };
    GameScene.prototype.createBullet = function (unit) {
        var bullet = new bullet_1.Bullet(unit, app_manager_1.AppManager.getInstance().getTexture(config_1.Config.assets['bullet']));
        this.bullets.push(bullet);
        this.addChild(bullet);
    };
    GameScene.prototype.checkCollisionUnitVsUnit = function (unit) {
        var hasCollision = false;
        this.units.forEach(function (otherUnit) {
            if (unit === otherUnit)
                return;
            if (utils_1.Utils.checkForCollision(unit, otherUnit, 20))
                hasCollision = true;
        });
        return hasCollision;
    };
    GameScene.prototype.checkCollisionUnitVsBullet = function (unit) {
        var _this = this;
        var hasCollision = false;
        this.bullets.forEach(function (bullet) {
            if (bullet.unit === unit)
                return;
            if (utils_1.Utils.checkForCollision(unit, bullet, 20)) {
                hasCollision = true;
                _this.bullets = _this.bullets.filter(function (b) { return b !== bullet; });
                _this.removeChild(bullet);
                _this.units = _this.units.filter(function (u) { return u !== unit; });
                _this.removeChild(unit);
                //unit.handleBulletCollision();
                //unit.visible = false;
                //bullet.handleCollision();
            }
        });
        return hasCollision;
    };
    return GameScene;
}(PIXI.Container));
exports.GameScene = GameScene;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var map_item_1 = __webpack_require__(36);
var utils_1 = __webpack_require__(44);
var MapItemType;
(function (MapItemType) {
    MapItemType[MapItemType["StoneWall"] = 1] = "StoneWall";
    MapItemType[MapItemType["BrickWall"] = 2] = "BrickWall";
    MapItemType[MapItemType["EnemySpawnPoint"] = 9] = "EnemySpawnPoint";
})(MapItemType = exports.MapItemType || (exports.MapItemType = {}));
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(texture) {
        var _this = _super.call(this) || this;
        // 25x25
        _this.map = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 9, 1, , , , 1, 9, 1, , , , , , , , , , , , , , 1, 9, 1,
            1, , , , , , , , , , , , , 1, , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , 1, , , , , , 1, , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , , 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ];
        _this.items = [];
        _this.initView(texture);
        return _this;
    }
    Map.prototype.initView = function (texture) {
        for (var i = 0; i < 25 * 20; i++) {
            var blockY = Math.floor(i / 25);
            var blockX = i - 25 * blockY;
            if (this.map[i] === MapItemType.StoneWall) {
                var mapItem = new map_item_1.MapItem(texture, this.map[i]);
                mapItem.x = blockX * mapItem.virtualSize.width;
                mapItem.y = blockY * mapItem.virtualSize.height;
                this.items.push(mapItem);
                this.addChild(mapItem);
            }
            ;
            if (this.map[i] === MapItemType.EnemySpawnPoint) {
                var mapItem = new map_item_1.MapItem(null, this.map[i]);
                mapItem.x = blockX * mapItem.virtualSize.width;
                mapItem.y = blockY * mapItem.virtualSize.height;
                this.items.push(mapItem);
            }
            ;
        }
    };
    Map.prototype.getRandomSpawnPoint = function () {
        var points = [];
        this.items.forEach(function (item) {
            if (item.type === MapItemType.EnemySpawnPoint)
                points.push(new PIXI.Point(item.x, item.y));
        });
        return points[utils_1.Utils.randomInt(0, points.length - 1)];
    };
    Map.prototype.checkCollisionUnitVsWall = function (unit) {
        var hasCollision = false;
        this.items.forEach(function (wall) {
            if (wall.type === MapItemType.EnemySpawnPoint)
                return;
            if (utils_1.Utils.checkForCollision(wall, unit, 20))
                hasCollision = true;
        });
        return hasCollision;
    };
    return Map;
}(PIXI.Container));
exports.Map = Map;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MapItem = /** @class */ (function (_super) {
    __extends(MapItem, _super);
    function MapItem(texture, type) {
        var _this = _super.call(this, texture) || this;
        _this.virtualSize = {
            width: 36,
            height: 36
        };
        _this.type = type;
        return _this;
    }
    return MapItem;
}(PIXI.Sprite));
exports.MapItem = MapItem;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var unit_1 = __webpack_require__(43);
var fsm_1 = __webpack_require__(14);
var enemy_idle_state_1 = __webpack_require__(38);
var enemy_move_state_1 = __webpack_require__(40);
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(texture) {
        var _this = _super.call(this, texture) || this;
        _this.type = unit_1.UnitTypes.Enemy;
        _this.fsm = new fsm_1.FSM({
            idle: new enemy_idle_state_1.EnemyIdleState(_this),
            move: new enemy_move_state_1.EnemyMoveState(_this)
        });
        _this.shootingInterval = setInterval(function () {
            _this.shoot();
        }, 3000);
        return _this;
    }
    Enemy.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.isHitTheBullet()) {
            console.log('enemy died');
            clearInterval(this.shootingInterval);
        }
    };
    return Enemy;
}(unit_1.Unit));
exports.Enemy = Enemy;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var unit_idle_state_1 = __webpack_require__(15);
var EnemyIdleState = /** @class */ (function (_super) {
    __extends(EnemyIdleState, _super);
    function EnemyIdleState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyIdleState.prototype.execute = function () {
        this.unit.fsm.transition('move');
    };
    return EnemyIdleState;
}(unit_idle_state_1.UnitIdleState));
exports.EnemyIdleState = EnemyIdleState;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var State = /** @class */ (function () {
    function State(args) {
    }
    State.prototype.enter = function () {
    };
    State.prototype.execute = function () {
    };
    return State;
}());
exports.State = State;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var unit_1 = __webpack_require__(43);
var utils_1 = __webpack_require__(44);
var unit_move_state_1 = __webpack_require__(17);
var EnemyMoveState = /** @class */ (function (_super) {
    __extends(EnemyMoveState, _super);
    function EnemyMoveState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 2;
        _this.hitsByDirection = [
            { direction: unit_1.MoveDirections.Up, hits: 0 },
            { direction: unit_1.MoveDirections.Down, hits: 0 },
            { direction: unit_1.MoveDirections.Left, hits: 0 },
            { direction: unit_1.MoveDirections.Right, hits: 0 },
        ];
        return _this;
    }
    EnemyMoveState.prototype.enter = function () {
        _super.prototype.enter.call(this);
        // setInterval(() => {
        //     this.changeDirectionToRandom();
        // }, 3000);
    };
    EnemyMoveState.prototype.execute = function () {
        //super.execute();
        //console.log(this.hitsByDirection);
        this.move();
    };
    EnemyMoveState.prototype.updateHitsByDirection = function () {
        var _this = this;
        this.hitsByDirection.map(function (item) {
            if (item.direction === _this.moveDirection)
                item.hits++;
            return item;
        });
    };
    EnemyMoveState.prototype.handleWallCollision = function () {
        this.updateHitsByDirection();
        _super.prototype.handleWallCollision.call(this);
        this.changeDirectionToOpposite();
    };
    EnemyMoveState.prototype.handleUnitCollision = function () {
        this.updateHitsByDirection();
        _super.prototype.handleUnitCollision.call(this);
        this.changeDirectionToOpposite();
    };
    EnemyMoveState.prototype.changeDirectionToOpposite = function () {
        this.hitsByDirection.sort(function (a, b) { return a.hits - b.hits; });
        if (this.hitsByDirection[this.hitsByDirection.length - 1].hits > 2) {
            this.moveDirection = this.hitsByDirection[0].direction;
            this.hitsByDirection = this.hitsByDirection.map(function (item) { return (__assign(__assign({}, item), { hits: 0 })); });
        }
        else {
            this.moveDirection = this.moveDirection * -1;
        }
        //console.log(this.hitsByDirection);
        //this.moveDirection = this.moveDirection * -1;
    };
    EnemyMoveState.prototype.changeDirectionToRandom = function () {
        var key = utils_1.Utils.randomInt(0, 3);
        if (key === 0)
            this.moveDirection = unit_1.MoveDirections.Up;
        if (key === 1)
            this.moveDirection = unit_1.MoveDirections.Down;
        if (key === 2)
            this.moveDirection = unit_1.MoveDirections.Left;
        if (key === 3)
            this.moveDirection = unit_1.MoveDirections.Right;
    };
    return EnemyMoveState;
}(unit_move_state_1.UnitMoveState));
exports.EnemyMoveState = EnemyMoveState;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//import { UnitMovingState } from "./unit-move-state";
var unit_1 = __webpack_require__(43);
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(unit, texture) {
        var _this = _super.call(this) || this;
        _this.speed = 8;
        _this.virtualSize = {
            width: 5,
            height: 5
        };
        _this.unit = unit;
        _this.moveDirection = unit.lookDirection;
        _this.initView(texture);
        return _this;
    }
    Bullet.prototype.initView = function (texture) {
        this.skin = new PIXI.Sprite(texture);
        this.skin.anchor.set(0.5);
        this.skin.scale.set(0.5);
        this.addChild(this.skin);
        this.pivot.set(this.virtualSize.width / 2 * -1, this.virtualSize.height / 2 * -1);
        this.unit.setBulletInitialPosition(this);
    };
    Bullet.prototype.handleWallCollision = function () {
    };
    Bullet.prototype.handleUnitCollision = function () {
    };
    Bullet.prototype.update = function () {
        if (this.moveDirection === unit_1.MoveDirections.Up)
            this.y -= this.speed;
        if (this.moveDirection === unit_1.MoveDirections.Down)
            this.y += this.speed;
        if (this.moveDirection === unit_1.MoveDirections.Left)
            this.x -= this.speed;
        if (this.moveDirection === unit_1.MoveDirections.Right)
            this.x += this.speed;
    };
    return Bullet;
}(PIXI.Container));
exports.Bullet = Bullet;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var unit_idle_state_1 = __webpack_require__(15);
var unit_move_state_1 = __webpack_require__(17);
var fsm_1 = __webpack_require__(14);
var unit_1 = __webpack_require__(43);
var app_manager_1 = __webpack_require__(0);
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(texture) {
        var _this = _super.call(this, texture) || this;
        _this.type = unit_1.UnitTypes.Player;
        _this.fsm = new fsm_1.FSM({
            idle: new unit_idle_state_1.UnitIdleState(_this),
            move: new unit_move_state_1.UnitMoveState(_this)
        });
        return _this;
    }
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.isHitTheBullet()) {
            console.log('player died');
        }
        var keys = app_manager_1.AppManager.getInstance().keys;
        //console.log(keys);
        if (keys['Space']) {
            this.shoot();
            //this.unit.fsm.transition('idle');
            return;
        }
    };
    return Player;
}(unit_1.Unit));
exports.Player = Player;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UnitTypes;
(function (UnitTypes) {
    UnitTypes[UnitTypes["Player"] = 0] = "Player";
    UnitTypes[UnitTypes["Enemy"] = 1] = "Enemy";
})(UnitTypes = exports.UnitTypes || (exports.UnitTypes = {}));
var MoveDirections;
(function (MoveDirections) {
    MoveDirections[MoveDirections["Up"] = 1] = "Up";
    MoveDirections[MoveDirections["Down"] = -1] = "Down";
    MoveDirections[MoveDirections["Left"] = 2] = "Left";
    MoveDirections[MoveDirections["Right"] = -2] = "Right";
})(MoveDirections = exports.MoveDirections || (exports.MoveDirections = {}));
var Unit = /** @class */ (function (_super) {
    __extends(Unit, _super);
    function Unit(texture) {
        var _this = _super.call(this) || this;
        _this.virtualSize = {
            width: 36,
            height: 36
        };
        _this.lookDirection = MoveDirections.Up;
        _this.initView(texture);
        return _this;
    }
    Unit.prototype.initView = function (texture) {
        this.skin = new PIXI.Sprite(texture);
        this.skin.anchor.set(0.5);
        this.addChild(this.skin);
        this.pivot.set(this.virtualSize.width / 2 * -1, this.virtualSize.height / 2 * -1);
    };
    Unit.prototype.setBulletInitialPosition = function (bullet) {
        bullet.x = this.x + this.virtualSize.width / 2;
        bullet.y = this.y + this.virtualSize.height / 2;
        if (this.lookDirection === MoveDirections.Up)
            bullet.y = this.y;
        if (this.lookDirection === MoveDirections.Down)
            bullet.y = this.y + this.virtualSize.height;
        if (this.lookDirection === MoveDirections.Left)
            bullet.x = this.x;
        if (this.lookDirection === MoveDirections.Right)
            bullet.x = this.x + this.virtualSize.width;
    };
    // public handleWallCollision(): void {
    //     this.state.handleWallCollision();
    // }
    Unit.prototype.handleUnitCollision = function () {
        //this.state.handleUnitCollision();
    };
    Unit.prototype.handleBulletCollision = function () {
        //Need to clear interval for bullets
    };
    Unit.prototype.update = function () {
        this.fsm.step();
    };
    return Unit;
}(PIXI.Container));
exports.Unit = Unit;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    ;
    Utils.checkForCollision = function (a, b, size) {
        return (Math.abs(a.x - b.x) <= size && Math.abs(a.y - b.y) <= size);
    };
    return Utils;
}());
exports.Utils = Utils;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvYXBwLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvbWVudS1tb2R1bGUvY29udHJvbGxlcnMvbWVudS1idXR0b25zLWNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL25vZGVfbW9kdWxlcy9nc2FwL2dzYXAtY29yZS5qcyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vbm9kZV9tb2R1bGVzL2dzYXAvQ1NTUGx1Z2luLmpzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9ub2RlX21vZHVsZXMvZ3NhcC9pbmRleC5qcyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2ZyYW1ld29yay9jb3JlL21vZHVsZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2ZyYW1ld29yay9jb3JlL212Yy9jb250cm9sbGVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vZXh0ZXJuYWwgXCJQSVhJXCIiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9mcmFtZXdvcmsvbW9kdWxlcy9ncmFwaGljcy1lbmdpbmUtbW9kdWxlL21pc2MvZ3JhcGhpY3MtZW5naW5lLW5hbWVzLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvbXZjL3ZpZXcudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvbWVudS1tb2R1bGUvdmlld3MvbWVudS1idXR0b25zLXZpZXcudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9mcmFtZXdvcmsvY29yZS9tdmMvbXZjLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL3ByZWxvYWRlci1tb2R1bGUvbWlzYy9wcmVsb2FkZXItbmFtZXMudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvbWVudS1tb2R1bGUvbWlzYy9tZW51LW5hbWVzLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL21pc2MvY29uZmlnLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL21pc2MvZ2FtZS1uYW1lcy50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2ZyYW1ld29yay9jb3JlL2ZzbS9mc20udHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy91bml0LWlkbGUtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy91bml0LXN0YXRlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvdW5pdC1tb3ZlLXN0YXRlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvSW5kZXgudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvcHJlbG9hZGVyLW1vZHVsZS9wcmVsb2FkZXItbW9kdWxlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvZ2xvYmFsLW5vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvcHJlbG9hZGVyLW1vZHVsZS9jb250cm9sbGVycy9wcmVsb2FkZXItaW5pdC1jb250cm9sbGVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvbXZjL212Yy1lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvcHJlbG9hZGVyLW1vZHVsZS92aWV3cy9wcmVsb2FkZXItaW5pdC12aWV3LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvZW50cnktcG9pbnQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9mcmFtZXdvcmsvbW9kdWxlcy9ncmFwaGljcy1lbmdpbmUtbW9kdWxlL2dyYXBoaWNzLWVuZ2luZS1tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9mcmFtZXdvcmsvbW9kdWxlcy9ncmFwaGljcy1lbmdpbmUtbW9kdWxlL2NvbnRyb2xsZXJzL2dyYXBoaWNzLWVuZ2luZS1sb2FkZXItY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9tZW51LW1vZHVsZS9tZW51LW1vZHVsZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9tZW51LW1vZHVsZS9jb250cm9sbGVycy9tZW51LWluaXQtY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9tZW51LW1vZHVsZS92aWV3cy9tZW51LWluaXQtdmlldy50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS9nYW1lLW1vZHVsZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS9jb250cm9sbGVycy9nYW1lLWluaXQtY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS92aWV3cy9nYW1lLWluaXQtdmlldy50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUtc2NlbmUudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9tYXAudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9tYXAtaXRlbS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2VuZW15LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZW5lbXktaWRsZS1zdGF0ZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2ZyYW1ld29yay9jb3JlL2ZzbS9zdGF0ZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2VuZW15LW1vdmUtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9idWxsZXQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy91bml0LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJDQUEyQztBQUMzQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSw4SkFBOEo7QUFDOUo7QUFDQTs7QUFFQSxRQUFRLDRDQUE0Qzs7QUFFcEQ7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEVBQTRFO0FBQzVFOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QyxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxrREFBa0Q7QUFDbEQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGlEQUFpRDtBQUNqRDs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDO0FBQ2hDO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdFQUFnRTs7QUFFaEUscUVBQXFFOztBQUVyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0QsMkdBQTJHLEdBQUcsdUVBQXVFO0FBQ3JMLHNKQUFzSixtREFBbUQ7QUFD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ZUFBZTtBQUNmO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEZBQTBGOzs7QUFHMUYsd0ZBQXdGOzs7QUFHeEY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtGQUErRjtBQUMvRjs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztB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QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1Q0FBdUM7OztBQUd2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZDQUE2Qzs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0xBQXNMO0FBQ3RMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlHQUF5RztBQUN6Rzs7QUFFQTtBQUNBLCtEQUErRDs7QUFFL0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNEVBQTRFOztBQUU1RSxpQ0FBaUM7QUFDakMsT0FBTztBQUNQOztBQUVBLDZCQUE2Qjs7QUFFN0IsOE1BQThNO0FBQzlNO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkZBQTJGOztBQUUzRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3Qzs7QUFFeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLCtGQUErRjs7QUFFL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjs7QUFFMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXOzs7QUFHWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDs7QUFFekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSw0REFBNEQ7O0FBRTVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUY7O0FBRW5GO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0M7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0hBQXdIOztBQUV4SDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUEseUVBQXlFO0FBQ3pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFD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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4REFBOEQ7O0FBRTlEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsNEdBQTRHOztBQUU1RztBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUU7OztBQUdLO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQ0FBc0M7O0FBRXRDO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLEdBQUc7O0FBRUo7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBFQUEwRSxlQUFlO0FBQ3pGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsdURBQXVEOztBQUV2RCx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDLEdBQUc7QUFDSDtBQUNBLDBDQUEwQztBQUMxQyxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2REFBNkQ7QUFDN0Q7O0FBRUE7QUFDQTtBQUNBLGdHQUFnRztBQUNoRztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBLHlCQUF5QjtBQUN6QjtBQUNBLENBQUMsRUFBRTs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxFQUFFOzs7QUFHYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVB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eUIsdUJBQWM7SUE0Qm5DLGFBQVksT0FBcUI7UUFBakMsWUFDSSxpQkFBTyxTQUVWO1FBN0JELFFBQVE7UUFDQSxTQUFHLEdBQWE7WUFDcEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN6RSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN6RSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN6RSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUM7WUFDekUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3pFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN6RSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUM7WUFDekUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLENBQUMsRUFBRSxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN6RSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUM7WUFDekUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDekUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3pFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN6RSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUM7WUFDekUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3pFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN6RSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUM7WUFDekUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3pFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVB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RyxrQ0FBbUIsR0FBMUI7UUFDSSxtQ0FBbUM7SUFDdkMsQ0FBQztJQUVNLG9DQUFxQixHQUE1QjtRQUNJLG9DQUFvQztJQUN4QyxDQUFDO0lBRU0scUJBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLENBbkR5QixJQUFJLENBQUMsU0FBUyxHQW1EdkM7QUFuRFksb0JBQUk7Ozs7Ozs7Ozs7QUNmakI7SUFBQTtJQVFBLENBQUM7SUFQaUIsZUFBUyxHQUF2QixVQUF5QixHQUFXLEVBQUUsR0FBVztRQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQUEsQ0FBQztJQUVZLHVCQUFpQixHQUEvQixVQUFnQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLElBQVk7UUFDeEQsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDO0FBUlksc0JBQUsiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIlBJWElcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0eXBlc2NyaXB0X2ludHJvXCIsIFtcIlBJWElcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widHlwZXNjcmlwdF9pbnRyb1wiXSA9IGZhY3RvcnkocmVxdWlyZShcIlBJWElcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInR5cGVzY3JpcHRfaW50cm9cIl0gPSBmYWN0b3J5KHJvb3RbXCJQSVhJXCJdKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNV9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE4KTtcbiIsImltcG9ydCB7IENvbnRhaW5lciwgVGV4dHVyZSB9IGZyb20gXCJwaXhpLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcHBNYW5hZ2VyIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQXBwTWFuYWdlcjtcbiAgICBcbiAgICBwdWJsaWMgYXBwOiBQSVhJLkFwcGxpY2F0aW9uO1xuICAgIHB1YmxpYyByZXNvdXJjZXM6IFBJWEkuTG9hZGVyUmVzb3VyY2U7XG5cbiAgICBwcm90ZWN0ZWQgc2NlbmVXaWR0aDogbnVtYmVyID0gOTAwO1xuICAgIHByb3RlY3RlZCBzY2VuZUhlaWdodDogbnVtYmVyID0gNzIwO1xuXG4gICAgICAgcHVibGljIGtleXM6IGFueSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmIChBcHBNYW5hZ2VyLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciAtIHVzZSBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKClcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0UGl4aUFwcCgpOyAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQXBwTWFuYWdlciB7XG4gICAgICAgIGlmICghQXBwTWFuYWdlci5pbnN0YW5jZSkge1xuICAgICAgICAgICAgQXBwTWFuYWdlci5pbnN0YW5jZSA9IG5ldyBBcHBNYW5hZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFwcE1hbmFnZXIuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNjZW5lV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVXaWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2NlbmVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0QXNzZXRzTG9hZGluZyhhc3NldHM6IE9iamVjdCwgb25Db21wbGV0ZTogRnVuY3Rpb24sIG9uUHJvZ3Jlc3M/OiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICBjb25zdCBsb2FkZXI6IFBJWEkuTG9hZGVyID0gbmV3IFBJWEkuTG9hZGVyKCk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYXNzZXRzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbG9hZGVyLmFkZChhc3NldHNba2V5XSwgYXNzZXRzW2tleV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsb2FkZXIub25Qcm9ncmVzcy5hZGQoKGxvYWRlcjogUElYSS5Mb2FkZXIsIHJlc291cmNlczogUElYSS5Mb2FkZXJSZXNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgb25Qcm9ncmVzcy5jYWxsKHRoaXMsIGxvYWRlci5wcm9ncmVzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxvYWRlci5vbkNvbXBsZXRlLmFkZCgobG9hZGVyOiBQSVhJLkxvYWRlciwgcmVzb3VyY2VzOiBQSVhJLkxvYWRlclJlc291cmNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlcyA9IHJlc291cmNlcztcbiAgICAgICAgICAgIG9uQ29tcGxldGUuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9hZGVyLmxvYWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkTGF5ZXJUb1NjZW5lKGNvbnRhaW5lcjogQ29udGFpbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBwLnN0YWdlLmFkZENoaWxkKGNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRQaXhpQXBwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwcCA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uKHsgXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zY2VuZVdpZHRoLCBcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5zY2VuZUhlaWdodCwgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IDB4RkZGRkZGIFxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmFwcC52aWV3KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIEFwcE1hbmFnZXIuaGFuZGxlS2V5RG93bik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIEFwcE1hbmFnZXIuaGFuZGxlS2V5VXApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUZXh0dXJlKG5hbWU6IHN0cmluZyk6IFRleHR1cmUge1xuICAgICAgICByZXR1cm4gKHRoaXMucmVzb3VyY2VzW25hbWVdIGFzIFBJWEkuTG9hZGVyUmVzb3VyY2UpLnRleHR1cmU7XG4gICAgfVxuXG4gICAgcHVibGljIHN3YXBTY2VuZXMoKTogdm9pZCB7XG5cbiAgICB9XG4gICAgXG4gICAgLy8gcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgLy8gICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAvLyAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIG9uQXNzZXRzTG9hZGluZ0NvbXBsZXRlKGxvYWRlcjogUElYSS5Mb2FkZXIsIHJlc291cmNlczogUElYSS5Mb2FkZXJSZXNvdXJjZSwgb25Db21wbGV0ZTogRnVuY3Rpb24pe1xuICAgICAgICB0aGlzLnJlc291cmNlcyA9IHJlc291cmNlcztcbiAgICAgICAgb25Db21wbGV0ZSgpO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5nYW1lU2NlbmUgPSBuZXcgR2FtZVNjZW5lKCk7XG4gICAgICAgIC8vIHRoaXMuYXBwLnN0YWdlLmFkZENoaWxkKHRoaXMuZ2FtZVNjZW5lKTtcbiAgICAgICAgLy8gdGhpcy5hcHAuc3RhZ2Uuc2NhbGUuc2V0KDAuNiwgMC42KTtcblxuICAgICAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIEFwcE1hbmFnZXIuaGFuZGxlS2V5RG93bik7XG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIEFwcE1hbmFnZXIuaGFuZGxlS2V5VXApO1xuXG4gICAgICAgIC8vIHRoaXMuYXBwLnRpY2tlci5hZGQoKCkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5nYW1lU2NlbmUudXBkYXRlKCk7XG4gICAgICAgIC8vIH0pOyAgXG5cbiAgICAgICAgLy90aGlzLmFwcC5yZW5kZXJlci5yZXNpemUoNTAwLCA1MDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy9HYW1lTWFuYWdlci5pbnN0YW5jZS5rZXlzID0ge307XG4gICAgICAgIEFwcE1hbmFnZXIuaW5zdGFuY2Uua2V5c1tldmVudC5jb2RlXSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaGFuZGxlS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy9HYW1lTWFuYWdlci5pbnN0YW5jZS5rZXlzID0ge307XG4gICAgICAgIEFwcE1hbmFnZXIuaW5zdGFuY2Uua2V5c1tldmVudC5jb2RlXSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFJlc2l6ZSBmdW5jdGlvbiB3aW5kb3dcbiAgICBwcml2YXRlIHJlc2l6ZSgpIHtcbiAgICAgICAvLyB0aGlzLmFwcC5yZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgLy90aGlzLmdlY2tvLnggPSB0aGlzLmFwcC5yZW5kZXJlci53aWR0aCAvIDI7XG4gICAgICAgIC8vdGhpcy5nZWNrby55ID0gdGhpcy5hcHAucmVuZGVyZXIuaGVpZ2h0IC8gMjtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tdmMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgTWVudU5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiLi4vbWlzYy9tZW51LW5hbWVzXCI7XG5pbXBvcnQgeyBJTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL25vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBNZW51SW5pdFZpZXcgfSBmcm9tICcuLi92aWV3cy9tZW51LWluaXQtdmlldyc7XG5pbXBvcnQgeyBHYW1lTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi9nYW1lLW1vZHVsZS9taXNjL2dhbWUtbmFtZXNcIjtcbmltcG9ydCB7IGdzYXAgfSBmcm9tIFwiZ3NhcFwiO1xuaW1wb3J0IHsgR2xvYmFsTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9nbG9iYWwtbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgTWVudUJ1dHRvbnNWaWV3IH0gZnJvbSBcIi4uL3ZpZXdzL21lbnUtYnV0dG9ucy12aWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBNZW51QnV0dG9uc0NvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgICBcbiAgICBwdWJsaWMgYWRkTm90aWZpY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgLy90aGlzLmFkZE5vdGlmaWNhdGlvbihHbG9iYWxOb3RpZmljYXRpb25zLlRSQU5TSVRJT05fVE9fU0NFTkUsIHRoaXMuc2hvd01lbnUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUobm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd01lbnUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd01lbnUoKTogdm9pZCB7XG4gICAgICAgICh0aGlzLnZpZXcgYXMgTWVudUJ1dHRvbnNWaWV3KS5kcmF3U2NlbmUoKTtcbiAgICB9XG59IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKiFcbiAqIEdTQVAgMy41LjBcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIEBsaWNlbnNlIENvcHlyaWdodCAyMDA4LTIwMjAsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG52YXIgX2NvbmZpZyA9IHtcbiAgYXV0b1NsZWVwOiAxMjAsXG4gIGZvcmNlM0Q6IFwiYXV0b1wiLFxuICBudWxsVGFyZ2V0V2FybjogMSxcbiAgdW5pdHM6IHtcbiAgICBsaW5lSGVpZ2h0OiBcIlwiXG4gIH1cbn0sXG4gICAgX2RlZmF1bHRzID0ge1xuICBkdXJhdGlvbjogLjUsXG4gIG92ZXJ3cml0ZTogZmFsc2UsXG4gIGRlbGF5OiAwXG59LFxuICAgIF9iaWdOdW0gPSAxZTgsXG4gICAgX3RpbnlOdW0gPSAxIC8gX2JpZ051bSxcbiAgICBfMlBJID0gTWF0aC5QSSAqIDIsXG4gICAgX0hBTEZfUEkgPSBfMlBJIC8gNCxcbiAgICBfZ3NJRCA9IDAsXG4gICAgX3NxcnQgPSBNYXRoLnNxcnQsXG4gICAgX2NvcyA9IE1hdGguY29zLFxuICAgIF9zaW4gPSBNYXRoLnNpbixcbiAgICBfaXNTdHJpbmcgPSBmdW5jdGlvbiBfaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn0sXG4gICAgX2lzRnVuY3Rpb24gPSBmdW5jdGlvbiBfaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59LFxuICAgIF9pc051bWJlciA9IGZ1bmN0aW9uIF9pc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufSxcbiAgICBfaXNVbmRlZmluZWQgPSBmdW5jdGlvbiBfaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn0sXG4gICAgX2lzT2JqZWN0ID0gZnVuY3Rpb24gX2lzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59LFxuICAgIF9pc05vdEZhbHNlID0gZnVuY3Rpb24gX2lzTm90RmFsc2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZTtcbn0sXG4gICAgX3dpbmRvd0V4aXN0cyA9IGZ1bmN0aW9uIF93aW5kb3dFeGlzdHMoKSB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xufSxcbiAgICBfaXNGdW5jT3JTdHJpbmcgPSBmdW5jdGlvbiBfaXNGdW5jT3JTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIF9pc0Z1bmN0aW9uKHZhbHVlKSB8fCBfaXNTdHJpbmcodmFsdWUpO1xufSxcbiAgICBfaXNUeXBlZEFycmF5ID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCIgPyBBcnJheUJ1ZmZlci5pc1ZpZXcgOiBmdW5jdGlvbiAoKSB7fSxcbiAgICBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXksXG4gICAgX3N0cmljdE51bUV4cCA9IC8oPzotP1xcLj9cXGR8XFwuKSsvZ2ksXG4gICAgLy9vbmx5IG51bWJlcnMgKGluY2x1ZGluZyBuZWdhdGl2ZXMgYW5kIGRlY2ltYWxzKSBidXQgTk9UIHJlbGF0aXZlIHZhbHVlcy5cbl9udW1FeHAgPSAvWy0rPS5dKlxcZCtbLmVcXC0rXSpcXGQqW2VcXC1cXCtdKlxcZCovZyxcbiAgICAvL2ZpbmRzIGFueSBudW1iZXJzLCBpbmNsdWRpbmcgb25lcyB0aGF0IHN0YXJ0IHdpdGggKz0gb3IgLT0sIG5lZ2F0aXZlIG51bWJlcnMsIGFuZCBvbmVzIGluIHNjaWVudGlmaWMgbm90YXRpb24gbGlrZSAxZS04LlxuX251bVdpdGhVbml0RXhwID0gL1stKz0uXSpcXGQrWy5lLV0qXFxkKlthLXolXSovZyxcbiAgICBfY29tcGxleFN0cmluZ051bUV4cCA9IC9bLSs9Ll0qXFxkKyg/OlxcLnxlLXxlKSpcXGQqL2dpLFxuICAgIC8vZHVwbGljYXRlIHNvIHRoYXQgd2hpbGUgd2UncmUgbG9vcGluZyB0aHJvdWdoIG1hdGNoZXMgZnJvbSBleGVjKCksIGl0IGRvZXNuJ3QgY29udGFtaW5hdGUgdGhlIGxhc3RJbmRleCBvZiBfbnVtRXhwIHdoaWNoIHdlIHVzZSB0byBzZWFyY2ggZm9yIGNvbG9ycyB0b28uXG5fcmVsRXhwID0gL1srLV09LT9bXFwuXFxkXSsvLFxuICAgIF9kZWxpbWl0ZWRWYWx1ZUV4cCA9IC9bI1xcLSsuXSpcXGJbYS16XFxkLT0rJS5dKy9naSxcbiAgICBfZ2xvYmFsVGltZWxpbmUsXG4gICAgX3dpbixcbiAgICBfY29yZUluaXR0ZWQsXG4gICAgX2RvYyxcbiAgICBfZ2xvYmFscyA9IHt9LFxuICAgIF9pbnN0YWxsU2NvcGUgPSB7fSxcbiAgICBfY29yZVJlYWR5LFxuICAgIF9pbnN0YWxsID0gZnVuY3Rpb24gX2luc3RhbGwoc2NvcGUpIHtcbiAgcmV0dXJuIChfaW5zdGFsbFNjb3BlID0gX21lcmdlKHNjb3BlLCBfZ2xvYmFscykpICYmIGdzYXA7XG59LFxuICAgIF9taXNzaW5nUGx1Z2luID0gZnVuY3Rpb24gX21pc3NpbmdQbHVnaW4ocHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiBjb25zb2xlLndhcm4oXCJJbnZhbGlkIHByb3BlcnR5XCIsIHByb3BlcnR5LCBcInNldCB0b1wiLCB2YWx1ZSwgXCJNaXNzaW5nIHBsdWdpbj8gZ3NhcC5yZWdpc3RlclBsdWdpbigpXCIpO1xufSxcbiAgICBfd2FybiA9IGZ1bmN0aW9uIF93YXJuKG1lc3NhZ2UsIHN1cHByZXNzKSB7XG4gIHJldHVybiAhc3VwcHJlc3MgJiYgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xufSxcbiAgICBfYWRkR2xvYmFsID0gZnVuY3Rpb24gX2FkZEdsb2JhbChuYW1lLCBvYmopIHtcbiAgcmV0dXJuIG5hbWUgJiYgKF9nbG9iYWxzW25hbWVdID0gb2JqKSAmJiBfaW5zdGFsbFNjb3BlICYmIChfaW5zdGFsbFNjb3BlW25hbWVdID0gb2JqKSB8fCBfZ2xvYmFscztcbn0sXG4gICAgX2VtcHR5RnVuYyA9IGZ1bmN0aW9uIF9lbXB0eUZ1bmMoKSB7XG4gIHJldHVybiAwO1xufSxcbiAgICBfcmVzZXJ2ZWRQcm9wcyA9IHt9LFxuICAgIF9sYXp5VHdlZW5zID0gW10sXG4gICAgX2xhenlMb29rdXAgPSB7fSxcbiAgICBfbGFzdFJlbmRlcmVkRnJhbWUsXG4gICAgX3BsdWdpbnMgPSB7fSxcbiAgICBfZWZmZWN0cyA9IHt9LFxuICAgIF9uZXh0R0NGcmFtZSA9IDMwLFxuICAgIF9oYXJuZXNzUGx1Z2lucyA9IFtdLFxuICAgIF9jYWxsYmFja05hbWVzID0gXCJcIixcbiAgICBfaGFybmVzcyA9IGZ1bmN0aW9uIF9oYXJuZXNzKHRhcmdldHMpIHtcbiAgdmFyIHRhcmdldCA9IHRhcmdldHNbMF0sXG4gICAgICBoYXJuZXNzUGx1Z2luLFxuICAgICAgaTtcbiAgX2lzT2JqZWN0KHRhcmdldCkgfHwgX2lzRnVuY3Rpb24odGFyZ2V0KSB8fCAodGFyZ2V0cyA9IFt0YXJnZXRzXSk7XG5cbiAgaWYgKCEoaGFybmVzc1BsdWdpbiA9ICh0YXJnZXQuX2dzYXAgfHwge30pLmhhcm5lc3MpKSB7XG4gICAgaSA9IF9oYXJuZXNzUGx1Z2lucy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tICYmICFfaGFybmVzc1BsdWdpbnNbaV0udGFyZ2V0VGVzdCh0YXJnZXQpKSB7fVxuXG4gICAgaGFybmVzc1BsdWdpbiA9IF9oYXJuZXNzUGx1Z2luc1tpXTtcbiAgfVxuXG4gIGkgPSB0YXJnZXRzLmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgdGFyZ2V0c1tpXSAmJiAodGFyZ2V0c1tpXS5fZ3NhcCB8fCAodGFyZ2V0c1tpXS5fZ3NhcCA9IG5ldyBHU0NhY2hlKHRhcmdldHNbaV0sIGhhcm5lc3NQbHVnaW4pKSkgfHwgdGFyZ2V0cy5zcGxpY2UoaSwgMSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0cztcbn0sXG4gICAgX2dldENhY2hlID0gZnVuY3Rpb24gX2dldENhY2hlKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0Ll9nc2FwIHx8IF9oYXJuZXNzKHRvQXJyYXkodGFyZ2V0KSlbMF0uX2dzYXA7XG59LFxuICAgIF9nZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIF9nZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCB2KSB7XG4gIHJldHVybiAodiA9IHRhcmdldFtwcm9wZXJ0eV0pICYmIF9pc0Z1bmN0aW9uKHYpID8gdGFyZ2V0W3Byb3BlcnR5XSgpIDogX2lzVW5kZWZpbmVkKHYpICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShwcm9wZXJ0eSkgfHwgdjtcbn0sXG4gICAgX2ZvckVhY2hOYW1lID0gZnVuY3Rpb24gX2ZvckVhY2hOYW1lKG5hbWVzLCBmdW5jKSB7XG4gIHJldHVybiAobmFtZXMgPSBuYW1lcy5zcGxpdChcIixcIikpLmZvckVhY2goZnVuYykgfHwgbmFtZXM7XG59LFxuICAgIC8vc3BsaXQgYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCBvZiBuYW1lcyBpbnRvIGFuIGFycmF5LCB0aGVuIHJ1biBhIGZvckVhY2goKSBmdW5jdGlvbiBhbmQgcmV0dXJuIHRoZSBzcGxpdCBhcnJheSAodGhpcyBpcyBqdXN0IGEgd2F5IHRvIGNvbnNvbGlkYXRlL3Nob3J0ZW4gc29tZSBjb2RlKS5cbl9yb3VuZCA9IGZ1bmN0aW9uIF9yb3VuZCh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIDEwMDAwMCkgLyAxMDAwMDAgfHwgMDtcbn0sXG4gICAgX2FycmF5Q29udGFpbnNBbnkgPSBmdW5jdGlvbiBfYXJyYXlDb250YWluc0FueSh0b1NlYXJjaCwgdG9GaW5kKSB7XG4gIC8vc2VhcmNoZXMgb25lIGFycmF5IHRvIGZpbmQgbWF0Y2hlcyBmb3IgYW55IG9mIHRoZSBpdGVtcyBpbiB0aGUgdG9GaW5kIGFycmF5LiBBcyBzb29uIGFzIG9uZSBpcyBmb3VuZCwgaXQgcmV0dXJucyB0cnVlLiBJdCBkb2VzIE5PVCByZXR1cm4gYWxsIHRoZSBtYXRjaGVzOyBpdCdzIHNpbXBseSBhIGJvb2xlYW4gc2VhcmNoLlxuICB2YXIgbCA9IHRvRmluZC5sZW5ndGgsXG4gICAgICBpID0gMDtcblxuICBmb3IgKDsgdG9TZWFyY2guaW5kZXhPZih0b0ZpbmRbaV0pIDwgMCAmJiArK2kgPCBsOykge31cblxuICByZXR1cm4gaSA8IGw7XG59LFxuICAgIF9wYXJzZVZhcnMgPSBmdW5jdGlvbiBfcGFyc2VWYXJzKHBhcmFtcywgdHlwZSwgcGFyZW50KSB7XG4gIC8vcmVhZHMgdGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gb25lIG9mIHRoZSBrZXkgbWV0aG9kcyBhbmQgZmlndXJlcyBvdXQgaWYgdGhlIHVzZXIgaXMgZGVmaW5pbmcgdGhpbmdzIHdpdGggdGhlIE9MRC9sZWdhY3kgc3ludGF4IHdoZXJlIHRoZSBkdXJhdGlvbiBpcyB0aGUgMm5kIHBhcmFtZXRlciwgYW5kIHRoZW4gaXQgYWRqdXN0cyB0aGluZ3MgYWNjb3JkaW5nbHkgYW5kIHNwaXRzIGJhY2sgdGhlIGNvcnJlY3RlZCB2YXJzIG9iamVjdCAod2l0aCB0aGUgZHVyYXRpb24gYWRkZWQgaWYgbmVjZXNzYXJ5LCBhcyB3ZWxsIGFzIHJ1bkJhY2t3YXJkcyBvciBzdGFydEF0IG9yIGltbWVkaWF0ZVJlbmRlcikuIHR5cGUgMCA9IHRvKCkvc3RhZ2dlclRvKCksIDEgPSBmcm9tKCkvc3RhZ2dlckZyb20oKSwgMiA9IGZyb21UbygpL3N0YWdnZXJGcm9tVG8oKVxuICB2YXIgaXNMZWdhY3kgPSBfaXNOdW1iZXIocGFyYW1zWzFdKSxcbiAgICAgIHZhcnNJbmRleCA9IChpc0xlZ2FjeSA/IDIgOiAxKSArICh0eXBlIDwgMiA/IDAgOiAxKSxcbiAgICAgIHZhcnMgPSBwYXJhbXNbdmFyc0luZGV4XSxcbiAgICAgIGlyVmFycztcblxuICBpc0xlZ2FjeSAmJiAodmFycy5kdXJhdGlvbiA9IHBhcmFtc1sxXSk7XG4gIHZhcnMucGFyZW50ID0gcGFyZW50O1xuXG4gIGlmICh0eXBlKSB7XG4gICAgaXJWYXJzID0gdmFycztcblxuICAgIHdoaWxlIChwYXJlbnQgJiYgIShcImltbWVkaWF0ZVJlbmRlclwiIGluIGlyVmFycykpIHtcbiAgICAgIC8vIGluaGVyaXRhbmNlIGhhc24ndCBoYXBwZW5lZCB5ZXQsIGJ1dCBzb21lb25lIG1heSBoYXZlIHNldCBhIGRlZmF1bHQgaW4gYW4gYW5jZXN0b3IgdGltZWxpbmUuIFdlIGNvdWxkIGRvIHZhcnMuaW1tZWRpYXRlUmVuZGVyID0gX2lzTm90RmFsc2UoX2luaGVyaXREZWZhdWx0cyh2YXJzKS5pbW1lZGlhdGVSZW5kZXIpIGJ1dCB0aGF0J2QgZXhhY3QgYSBzbGlnaHQgcGVyZm9ybWFuY2UgcGVuYWx0eSBiZWNhdXNlIF9pbmhlcml0RGVmYXVsdHMoKSBhbHNvIHJ1bnMgaW4gdGhlIFR3ZWVuIGNvbnN0cnVjdG9yLiBXZSdyZSBwYXlpbmcgYSBzbWFsbCBrYiBwcmljZSBoZXJlIHRvIGdhaW4gc3BlZWQuXG4gICAgICBpclZhcnMgPSBwYXJlbnQudmFycy5kZWZhdWx0cyB8fCB7fTtcbiAgICAgIHBhcmVudCA9IF9pc05vdEZhbHNlKHBhcmVudC52YXJzLmluaGVyaXQpICYmIHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuXG4gICAgdmFycy5pbW1lZGlhdGVSZW5kZXIgPSBfaXNOb3RGYWxzZShpclZhcnMuaW1tZWRpYXRlUmVuZGVyKTtcbiAgICB0eXBlIDwgMiA/IHZhcnMucnVuQmFja3dhcmRzID0gMSA6IHZhcnMuc3RhcnRBdCA9IHBhcmFtc1t2YXJzSW5kZXggLSAxXTsgLy8gXCJmcm9tXCIgdmFyc1xuICB9XG5cbiAgcmV0dXJuIHZhcnM7XG59LFxuICAgIF9sYXp5UmVuZGVyID0gZnVuY3Rpb24gX2xhenlSZW5kZXIoKSB7XG4gIHZhciBsID0gX2xhenlUd2VlbnMubGVuZ3RoLFxuICAgICAgYSA9IF9sYXp5VHdlZW5zLnNsaWNlKDApLFxuICAgICAgaSxcbiAgICAgIHR3ZWVuO1xuXG4gIF9sYXp5TG9va3VwID0ge307XG4gIF9sYXp5VHdlZW5zLmxlbmd0aCA9IDA7XG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIHR3ZWVuID0gYVtpXTtcbiAgICB0d2VlbiAmJiB0d2Vlbi5fbGF6eSAmJiAodHdlZW4ucmVuZGVyKHR3ZWVuLl9sYXp5WzBdLCB0d2Vlbi5fbGF6eVsxXSwgdHJ1ZSkuX2xhenkgPSAwKTtcbiAgfVxufSxcbiAgICBfbGF6eVNhZmVSZW5kZXIgPSBmdW5jdGlvbiBfbGF6eVNhZmVSZW5kZXIoYW5pbWF0aW9uLCB0aW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcbiAgX2xhenlUd2VlbnMubGVuZ3RoICYmIF9sYXp5UmVuZGVyKCk7XG4gIGFuaW1hdGlvbi5yZW5kZXIodGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgX2xhenlUd2VlbnMubGVuZ3RoICYmIF9sYXp5UmVuZGVyKCk7IC8vaW4gY2FzZSByZW5kZXJpbmcgY2F1c2VkIGFueSB0d2VlbnMgdG8gbGF6eS1pbml0LCB3ZSBzaG91bGQgcmVuZGVyIHRoZW0gYmVjYXVzZSB0eXBpY2FsbHkgd2hlbiBzb21lb25lIGNhbGxzIHNlZWsoKSBvciB0aW1lKCkgb3IgcHJvZ3Jlc3MoKSwgdGhleSBleHBlY3QgYW4gaW1tZWRpYXRlIHJlbmRlci5cbn0sXG4gICAgX251bWVyaWNJZlBvc3NpYmxlID0gZnVuY3Rpb24gX251bWVyaWNJZlBvc3NpYmxlKHZhbHVlKSB7XG4gIHZhciBuID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIHJldHVybiAobiB8fCBuID09PSAwKSAmJiAodmFsdWUgKyBcIlwiKS5tYXRjaChfZGVsaW1pdGVkVmFsdWVFeHApLmxlbmd0aCA8IDIgPyBuIDogX2lzU3RyaW5nKHZhbHVlKSA/IHZhbHVlLnRyaW0oKSA6IHZhbHVlO1xufSxcbiAgICBfcGFzc1Rocm91Z2ggPSBmdW5jdGlvbiBfcGFzc1Rocm91Z2gocCkge1xuICByZXR1cm4gcDtcbn0sXG4gICAgX3NldERlZmF1bHRzID0gZnVuY3Rpb24gX3NldERlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHtcbiAgZm9yICh2YXIgcCBpbiBkZWZhdWx0cykge1xuICAgIHAgaW4gb2JqIHx8IChvYmpbcF0gPSBkZWZhdWx0c1twXSk7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSxcbiAgICBfc2V0S2V5ZnJhbWVEZWZhdWx0cyA9IGZ1bmN0aW9uIF9zZXRLZXlmcmFtZURlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHtcbiAgZm9yICh2YXIgcCBpbiBkZWZhdWx0cykge1xuICAgIHAgaW4gb2JqIHx8IHAgPT09IFwiZHVyYXRpb25cIiB8fCBwID09PSBcImVhc2VcIiB8fCAob2JqW3BdID0gZGVmYXVsdHNbcF0pO1xuICB9XG59LFxuICAgIF9tZXJnZSA9IGZ1bmN0aW9uIF9tZXJnZShiYXNlLCB0b01lcmdlKSB7XG4gIGZvciAodmFyIHAgaW4gdG9NZXJnZSkge1xuICAgIGJhc2VbcF0gPSB0b01lcmdlW3BdO1xuICB9XG5cbiAgcmV0dXJuIGJhc2U7XG59LFxuICAgIF9tZXJnZURlZXAgPSBmdW5jdGlvbiBfbWVyZ2VEZWVwKGJhc2UsIHRvTWVyZ2UpIHtcbiAgZm9yICh2YXIgcCBpbiB0b01lcmdlKSB7XG4gICAgYmFzZVtwXSA9IF9pc09iamVjdCh0b01lcmdlW3BdKSA/IF9tZXJnZURlZXAoYmFzZVtwXSB8fCAoYmFzZVtwXSA9IHt9KSwgdG9NZXJnZVtwXSkgOiB0b01lcmdlW3BdO1xuICB9XG5cbiAgcmV0dXJuIGJhc2U7XG59LFxuICAgIF9jb3B5RXhjbHVkaW5nID0gZnVuY3Rpb24gX2NvcHlFeGNsdWRpbmcob2JqLCBleGNsdWRpbmcpIHtcbiAgdmFyIGNvcHkgPSB7fSxcbiAgICAgIHA7XG5cbiAgZm9yIChwIGluIG9iaikge1xuICAgIHAgaW4gZXhjbHVkaW5nIHx8IChjb3B5W3BdID0gb2JqW3BdKTtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICBfaW5oZXJpdERlZmF1bHRzID0gZnVuY3Rpb24gX2luaGVyaXREZWZhdWx0cyh2YXJzKSB7XG4gIHZhciBwYXJlbnQgPSB2YXJzLnBhcmVudCB8fCBfZ2xvYmFsVGltZWxpbmUsXG4gICAgICBmdW5jID0gdmFycy5rZXlmcmFtZXMgPyBfc2V0S2V5ZnJhbWVEZWZhdWx0cyA6IF9zZXREZWZhdWx0cztcblxuICBpZiAoX2lzTm90RmFsc2UodmFycy5pbmhlcml0KSkge1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIGZ1bmModmFycywgcGFyZW50LnZhcnMuZGVmYXVsdHMpO1xuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudCB8fCBwYXJlbnQuX2RwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YXJzO1xufSxcbiAgICBfYXJyYXlzTWF0Y2ggPSBmdW5jdGlvbiBfYXJyYXlzTWF0Y2goYTEsIGEyKSB7XG4gIHZhciBpID0gYTEubGVuZ3RoLFxuICAgICAgbWF0Y2ggPSBpID09PSBhMi5sZW5ndGg7XG5cbiAgd2hpbGUgKG1hdGNoICYmIGktLSAmJiBhMVtpXSA9PT0gYTJbaV0pIHt9XG5cbiAgcmV0dXJuIGkgPCAwO1xufSxcbiAgICBfYWRkTGlua2VkTGlzdEl0ZW0gPSBmdW5jdGlvbiBfYWRkTGlua2VkTGlzdEl0ZW0ocGFyZW50LCBjaGlsZCwgZmlyc3RQcm9wLCBsYXN0UHJvcCwgc29ydEJ5KSB7XG4gIGlmIChmaXJzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGZpcnN0UHJvcCA9IFwiX2ZpcnN0XCI7XG4gIH1cblxuICBpZiAobGFzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGxhc3RQcm9wID0gXCJfbGFzdFwiO1xuICB9XG5cbiAgdmFyIHByZXYgPSBwYXJlbnRbbGFzdFByb3BdLFxuICAgICAgdDtcblxuICBpZiAoc29ydEJ5KSB7XG4gICAgdCA9IGNoaWxkW3NvcnRCeV07XG5cbiAgICB3aGlsZSAocHJldiAmJiBwcmV2W3NvcnRCeV0gPiB0KSB7XG4gICAgICBwcmV2ID0gcHJldi5fcHJldjtcbiAgICB9XG4gIH1cblxuICBpZiAocHJldikge1xuICAgIGNoaWxkLl9uZXh0ID0gcHJldi5fbmV4dDtcbiAgICBwcmV2Ll9uZXh0ID0gY2hpbGQ7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGQuX25leHQgPSBwYXJlbnRbZmlyc3RQcm9wXTtcbiAgICBwYXJlbnRbZmlyc3RQcm9wXSA9IGNoaWxkO1xuICB9XG5cbiAgaWYgKGNoaWxkLl9uZXh0KSB7XG4gICAgY2hpbGQuX25leHQuX3ByZXYgPSBjaGlsZDtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnRbbGFzdFByb3BdID0gY2hpbGQ7XG4gIH1cblxuICBjaGlsZC5fcHJldiA9IHByZXY7XG4gIGNoaWxkLnBhcmVudCA9IGNoaWxkLl9kcCA9IHBhcmVudDtcbiAgcmV0dXJuIGNoaWxkO1xufSxcbiAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0gPSBmdW5jdGlvbiBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0ocGFyZW50LCBjaGlsZCwgZmlyc3RQcm9wLCBsYXN0UHJvcCkge1xuICBpZiAoZmlyc3RQcm9wID09PSB2b2lkIDApIHtcbiAgICBmaXJzdFByb3AgPSBcIl9maXJzdFwiO1xuICB9XG5cbiAgaWYgKGxhc3RQcm9wID09PSB2b2lkIDApIHtcbiAgICBsYXN0UHJvcCA9IFwiX2xhc3RcIjtcbiAgfVxuXG4gIHZhciBwcmV2ID0gY2hpbGQuX3ByZXYsXG4gICAgICBuZXh0ID0gY2hpbGQuX25leHQ7XG5cbiAgaWYgKHByZXYpIHtcbiAgICBwcmV2Ll9uZXh0ID0gbmV4dDtcbiAgfSBlbHNlIGlmIChwYXJlbnRbZmlyc3RQcm9wXSA9PT0gY2hpbGQpIHtcbiAgICBwYXJlbnRbZmlyc3RQcm9wXSA9IG5leHQ7XG4gIH1cblxuICBpZiAobmV4dCkge1xuICAgIG5leHQuX3ByZXYgPSBwcmV2O1xuICB9IGVsc2UgaWYgKHBhcmVudFtsYXN0UHJvcF0gPT09IGNoaWxkKSB7XG4gICAgcGFyZW50W2xhc3RQcm9wXSA9IHByZXY7XG4gIH1cblxuICBjaGlsZC5fbmV4dCA9IGNoaWxkLl9wcmV2ID0gY2hpbGQucGFyZW50ID0gbnVsbDsgLy8gZG9uJ3QgZGVsZXRlIHRoZSBfZHAganVzdCBzbyB3ZSBjYW4gcmV2ZXJ0IGlmIG5lY2Vzc2FyeS4gQnV0IHBhcmVudCBzaG91bGQgYmUgbnVsbCB0byBpbmRpY2F0ZSB0aGUgaXRlbSBpc24ndCBpbiBhIGxpbmtlZCBsaXN0LlxufSxcbiAgICBfcmVtb3ZlRnJvbVBhcmVudCA9IGZ1bmN0aW9uIF9yZW1vdmVGcm9tUGFyZW50KGNoaWxkLCBvbmx5SWZQYXJlbnRIYXNBdXRvUmVtb3ZlKSB7XG4gIGNoaWxkLnBhcmVudCAmJiAoIW9ubHlJZlBhcmVudEhhc0F1dG9SZW1vdmUgfHwgY2hpbGQucGFyZW50LmF1dG9SZW1vdmVDaGlsZHJlbikgJiYgY2hpbGQucGFyZW50LnJlbW92ZShjaGlsZCk7XG4gIGNoaWxkLl9hY3QgPSAwO1xufSxcbiAgICBfdW5jYWNoZSA9IGZ1bmN0aW9uIF91bmNhY2hlKGFuaW1hdGlvbiwgY2hpbGQpIHtcbiAgaWYgKCFjaGlsZCB8fCBjaGlsZC5fZW5kID4gYW5pbWF0aW9uLl9kdXIgfHwgY2hpbGQuX3N0YXJ0IDwgMCkge1xuICAgIC8vIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbjogaWYgYSBjaGlsZCBhbmltYXRpb24gaXMgcGFzc2VkIGluIHdlIHNob3VsZCBvbmx5IHVuY2FjaGUgaWYgdGhhdCBjaGlsZCBFWFRFTkRTIHRoZSBhbmltYXRpb24gKGl0cyBlbmQgdGltZSBpcyBiZXlvbmQgdGhlIGVuZClcbiAgICB2YXIgYSA9IGFuaW1hdGlvbjtcblxuICAgIHdoaWxlIChhKSB7XG4gICAgICBhLl9kaXJ0eSA9IDE7XG4gICAgICBhID0gYS5wYXJlbnQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX3JlY2FjaGVBbmNlc3RvcnMgPSBmdW5jdGlvbiBfcmVjYWNoZUFuY2VzdG9ycyhhbmltYXRpb24pIHtcbiAgdmFyIHBhcmVudCA9IGFuaW1hdGlvbi5wYXJlbnQ7XG5cbiAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQucGFyZW50KSB7XG4gICAgLy9zb21ldGltZXMgd2UgbXVzdCBmb3JjZSBhIHJlLXNvcnQgb2YgYWxsIGNoaWxkcmVuIGFuZCB1cGRhdGUgdGhlIGR1cmF0aW9uL3RvdGFsRHVyYXRpb24gb2YgYWxsIGFuY2VzdG9yIHRpbWVsaW5lcyBpbW1lZGlhdGVseSBpbiBjYXNlLCBmb3IgZXhhbXBsZSwgaW4gdGhlIG1pZGRsZSBvZiBhIHJlbmRlciBsb29wLCBvbmUgdHdlZW4gYWx0ZXJzIGFub3RoZXIgdHdlZW4ncyB0aW1lU2NhbGUgd2hpY2ggc2hvdmVzIGl0cyBzdGFydFRpbWUgYmVmb3JlIDAsIGZvcmNpbmcgdGhlIHBhcmVudCB0aW1lbGluZSB0byBzaGlmdCBhcm91bmQgYW5kIHNoaWZ0Q2hpbGRyZW4oKSB3aGljaCBjb3VsZCBhZmZlY3QgdGhhdCBuZXh0IHR3ZWVuJ3MgcmVuZGVyIChzdGFydFRpbWUpLiBEb2Vzbid0IG1hdHRlciBmb3IgdGhlIHJvb3QgdGltZWxpbmUgdGhvdWdoLlxuICAgIHBhcmVudC5fZGlydHkgPSAxO1xuICAgIHBhcmVudC50b3RhbER1cmF0aW9uKCk7XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgfVxuXG4gIHJldHVybiBhbmltYXRpb247XG59LFxuICAgIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyA9IGZ1bmN0aW9uIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyhhbmltYXRpb24pIHtcbiAgcmV0dXJuICFhbmltYXRpb24gfHwgYW5pbWF0aW9uLl90cyAmJiBfaGFzTm9QYXVzZWRBbmNlc3RvcnMoYW5pbWF0aW9uLnBhcmVudCk7XG59LFxuICAgIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbiA9IGZ1bmN0aW9uIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbihhbmltYXRpb24pIHtcbiAgcmV0dXJuIGFuaW1hdGlvbi5fcmVwZWF0ID8gX2FuaW1hdGlvbkN5Y2xlKGFuaW1hdGlvbi5fdFRpbWUsIGFuaW1hdGlvbiA9IGFuaW1hdGlvbi5kdXJhdGlvbigpICsgYW5pbWF0aW9uLl9yRGVsYXkpICogYW5pbWF0aW9uIDogMDtcbn0sXG4gICAgLy8gZmVlZCBpbiB0aGUgdG90YWxUaW1lIGFuZCBjeWNsZUR1cmF0aW9uIGFuZCBpdCdsbCByZXR1cm4gdGhlIGN5Y2xlIChpdGVyYXRpb24gbWludXMgMSkgYW5kIGlmIHRoZSBwbGF5aGVhZCBpcyBleGFjdGx5IGF0IHRoZSB2ZXJ5IEVORCwgaXQgd2lsbCBOT1QgYnVtcCB1cCB0byB0aGUgbmV4dCBjeWNsZS5cbl9hbmltYXRpb25DeWNsZSA9IGZ1bmN0aW9uIF9hbmltYXRpb25DeWNsZSh0VGltZSwgY3ljbGVEdXJhdGlvbikge1xuICByZXR1cm4gKHRUaW1lIC89IGN5Y2xlRHVyYXRpb24pICYmIH5+dFRpbWUgPT09IHRUaW1lID8gfn50VGltZSAtIDEgOiB+fnRUaW1lO1xufSxcbiAgICBfcGFyZW50VG9DaGlsZFRvdGFsVGltZSA9IGZ1bmN0aW9uIF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHBhcmVudFRpbWUsIGNoaWxkKSB7XG4gIHJldHVybiAocGFyZW50VGltZSAtIGNoaWxkLl9zdGFydCkgKiBjaGlsZC5fdHMgKyAoY2hpbGQuX3RzID49IDAgPyAwIDogY2hpbGQuX2RpcnR5ID8gY2hpbGQudG90YWxEdXJhdGlvbigpIDogY2hpbGQuX3REdXIpO1xufSxcbiAgICBfc2V0RW5kID0gZnVuY3Rpb24gX3NldEVuZChhbmltYXRpb24pIHtcbiAgcmV0dXJuIGFuaW1hdGlvbi5fZW5kID0gX3JvdW5kKGFuaW1hdGlvbi5fc3RhcnQgKyAoYW5pbWF0aW9uLl90RHVyIC8gTWF0aC5hYnMoYW5pbWF0aW9uLl90cyB8fCBhbmltYXRpb24uX3J0cyB8fCBfdGlueU51bSkgfHwgMCkpO1xufSxcbiAgICBfYWxpZ25QbGF5aGVhZCA9IGZ1bmN0aW9uIF9hbGlnblBsYXloZWFkKGFuaW1hdGlvbiwgdG90YWxUaW1lKSB7XG4gIC8vIGFkanVzdHMgdGhlIGFuaW1hdGlvbidzIF9zdGFydCBhbmQgX2VuZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkIHRvdGFsVGltZSAob25seSBpZiB0aGUgcGFyZW50J3Mgc21vb3RoQ2hpbGRUaW1pbmcgaXMgdHJ1ZSBhbmQgdGhlIGFuaW1hdGlvbiBpc24ndCBwYXVzZWQpLiBJdCBkb2Vzbid0IGRvIGFueSByZW5kZXJpbmcgb3IgZm9yY2luZyB0aGluZ3MgYmFjayBpbnRvIHBhcmVudCB0aW1lbGluZXMsIGV0Yy4gLSB0aGF0J3Mgd2hhdCB0b3RhbFRpbWUoKSBpcyBmb3IuXG4gIHZhciBwYXJlbnQgPSBhbmltYXRpb24uX2RwO1xuXG4gIGlmIChwYXJlbnQgJiYgcGFyZW50LnNtb290aENoaWxkVGltaW5nICYmIGFuaW1hdGlvbi5fdHMpIHtcbiAgICBhbmltYXRpb24uX3N0YXJ0ID0gX3JvdW5kKGFuaW1hdGlvbi5fZHAuX3RpbWUgLSAoYW5pbWF0aW9uLl90cyA+IDAgPyB0b3RhbFRpbWUgLyBhbmltYXRpb24uX3RzIDogKChhbmltYXRpb24uX2RpcnR5ID8gYW5pbWF0aW9uLnRvdGFsRHVyYXRpb24oKSA6IGFuaW1hdGlvbi5fdER1cikgLSB0b3RhbFRpbWUpIC8gLWFuaW1hdGlvbi5fdHMpKTtcblxuICAgIF9zZXRFbmQoYW5pbWF0aW9uKTtcblxuICAgIHBhcmVudC5fZGlydHkgfHwgX3VuY2FjaGUocGFyZW50LCBhbmltYXRpb24pOyAvL2ZvciBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudC4gSWYgdGhlIHBhcmVudCdzIGNhY2hlIGlzIGFscmVhZHkgZGlydHksIGl0IGFscmVhZHkgdG9vayBjYXJlIG9mIG1hcmtpbmcgdGhlIGFuY2VzdG9ycyBhcyBkaXJ0eSB0b28sIHNvIHNraXAgdGhlIGZ1bmN0aW9uIGNhbGwgaGVyZS5cbiAgfVxuXG4gIHJldHVybiBhbmltYXRpb247XG59LFxuXG4vKlxuX3RvdGFsVGltZVRvVGltZSA9IChjbGFtcGVkVG90YWxUaW1lLCBkdXJhdGlvbiwgcmVwZWF0LCByZXBlYXREZWxheSwgeW95bykgPT4ge1xuXHRsZXQgY3ljbGVEdXJhdGlvbiA9IGR1cmF0aW9uICsgcmVwZWF0RGVsYXksXG5cdFx0dGltZSA9IF9yb3VuZChjbGFtcGVkVG90YWxUaW1lICUgY3ljbGVEdXJhdGlvbik7XG5cdGlmICh0aW1lID4gZHVyYXRpb24pIHtcblx0XHR0aW1lID0gZHVyYXRpb247XG5cdH1cblx0cmV0dXJuICh5b3lvICYmICh+fihjbGFtcGVkVG90YWxUaW1lIC8gY3ljbGVEdXJhdGlvbikgJiAxKSkgPyBkdXJhdGlvbiAtIHRpbWUgOiB0aW1lO1xufSxcbiovXG5fcG9zdEFkZENoZWNrcyA9IGZ1bmN0aW9uIF9wb3N0QWRkQ2hlY2tzKHRpbWVsaW5lLCBjaGlsZCkge1xuICB2YXIgdDtcblxuICBpZiAoY2hpbGQuX3RpbWUgfHwgY2hpbGQuX2luaXR0ZWQgJiYgIWNoaWxkLl9kdXIpIHtcbiAgICAvL2luIGNhc2UsIGZvciBleGFtcGxlLCB0aGUgX3N0YXJ0IGlzIG1vdmVkIG9uIGEgdHdlZW4gdGhhdCBoYXMgYWxyZWFkeSByZW5kZXJlZC4gSW1hZ2luZSBpdCdzIGF0IGl0cyBlbmQgc3RhdGUsIHRoZW4gdGhlIHN0YXJ0VGltZSBpcyBtb3ZlZCBXQVkgbGF0ZXIgKGFmdGVyIHRoZSBlbmQgb2YgdGhpcyB0aW1lbGluZSksIGl0IHNob3VsZCByZW5kZXIgYXQgaXRzIGJlZ2lubmluZy5cbiAgICB0ID0gX3BhcmVudFRvQ2hpbGRUb3RhbFRpbWUodGltZWxpbmUucmF3VGltZSgpLCBjaGlsZCk7XG5cbiAgICBpZiAoIWNoaWxkLl9kdXIgfHwgX2NsYW1wKDAsIGNoaWxkLnRvdGFsRHVyYXRpb24oKSwgdCkgLSBjaGlsZC5fdFRpbWUgPiBfdGlueU51bSkge1xuICAgICAgY2hpbGQucmVuZGVyKHQsIHRydWUpO1xuICAgIH1cbiAgfSAvL2lmIHRoZSB0aW1lbGluZSBoYXMgYWxyZWFkeSBlbmRlZCBidXQgdGhlIGluc2VydGVkIHR3ZWVuL3RpbWVsaW5lIGV4dGVuZHMgdGhlIGR1cmF0aW9uLCB3ZSBzaG91bGQgZW5hYmxlIHRoaXMgdGltZWxpbmUgYWdhaW4gc28gdGhhdCBpdCByZW5kZXJzIHByb3Blcmx5LiBXZSBzaG91bGQgYWxzbyBhbGlnbiB0aGUgcGxheWhlYWQgd2l0aCB0aGUgcGFyZW50IHRpbWVsaW5lJ3Mgd2hlbiBhcHByb3ByaWF0ZS5cblxuXG4gIGlmIChfdW5jYWNoZSh0aW1lbGluZSwgY2hpbGQpLl9kcCAmJiB0aW1lbGluZS5faW5pdHRlZCAmJiB0aW1lbGluZS5fdGltZSA+PSB0aW1lbGluZS5fZHVyICYmIHRpbWVsaW5lLl90cykge1xuICAgIC8vaW4gY2FzZSBhbnkgb2YgdGhlIGFuY2VzdG9ycyBoYWQgY29tcGxldGVkIGJ1dCBzaG91bGQgbm93IGJlIGVuYWJsZWQuLi5cbiAgICBpZiAodGltZWxpbmUuX2R1ciA8IHRpbWVsaW5lLmR1cmF0aW9uKCkpIHtcbiAgICAgIHQgPSB0aW1lbGluZTtcblxuICAgICAgd2hpbGUgKHQuX2RwKSB7XG4gICAgICAgIHQucmF3VGltZSgpID49IDAgJiYgdC50b3RhbFRpbWUodC5fdFRpbWUpOyAvL21vdmVzIHRoZSB0aW1lbGluZSAoc2hpZnRzIGl0cyBzdGFydFRpbWUpIGlmIG5lY2Vzc2FyeSwgYW5kIGFsc28gZW5hYmxlcyBpdC4gSWYgaXQncyBjdXJyZW50bHkgemVybywgdGhvdWdoLCBpdCBtYXkgbm90IGJlIHNjaGVkdWxlZCB0byByZW5kZXIgdW50aWwgbGF0ZXIgc28gdGhlcmUncyBubyBuZWVkIHRvIGZvcmNlIGl0IHRvIGFsaWduIHdpdGggdGhlIGN1cnJlbnQgcGxheWhlYWQgcG9zaXRpb24uIE9ubHkgbW92ZSB0byBjYXRjaCB1cCB3aXRoIHRoZSBwbGF5aGVhZC5cblxuICAgICAgICB0ID0gdC5fZHA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGltZWxpbmUuX3pUaW1lID0gLV90aW55TnVtOyAvLyBoZWxwcyBlbnN1cmUgdGhhdCB0aGUgbmV4dCByZW5kZXIoKSB3aWxsIGJlIGZvcmNlZCAoY3Jvc3NpbmdTdGFydCA9IHRydWUgaW4gcmVuZGVyKCkpLCBldmVuIGlmIHRoZSBkdXJhdGlvbiBoYXNuJ3QgY2hhbmdlZCAod2UncmUgYWRkaW5nIGEgY2hpbGQgd2hpY2ggd291bGQgbmVlZCB0byBnZXQgcmVuZGVyZWQpLiBEZWZpbml0ZWx5IGFuIGVkZ2UgY2FzZS4gTm90ZTogd2UgTVVTVCBkbyB0aGlzIEFGVEVSIHRoZSBsb29wIGFib3ZlIHdoZXJlIHRoZSB0b3RhbFRpbWUoKSBtaWdodCB0cmlnZ2VyIGEgcmVuZGVyKCkgYmVjYXVzZSB0aGlzIF9hZGRUb1RpbWVsaW5lKCkgbWV0aG9kIGdldHMgY2FsbGVkIGZyb20gdGhlIEFuaW1hdGlvbiBjb25zdHJ1Y3RvciwgQkVGT1JFIHR3ZWVucyBldmVuIHJlY29yZCB0aGVpciB0YXJnZXRzLCBldGMuIHNvIHdlIHdvdWxkbid0IHdhbnQgdGhpbmdzIHRvIGdldCB0cmlnZ2VyZWQgaW4gdGhlIHdyb25nIG9yZGVyLlxuICB9XG59LFxuICAgIF9hZGRUb1RpbWVsaW5lID0gZnVuY3Rpb24gX2FkZFRvVGltZWxpbmUodGltZWxpbmUsIGNoaWxkLCBwb3NpdGlvbiwgc2tpcENoZWNrcykge1xuICBjaGlsZC5wYXJlbnQgJiYgX3JlbW92ZUZyb21QYXJlbnQoY2hpbGQpO1xuICBjaGlsZC5fc3RhcnQgPSBfcm91bmQocG9zaXRpb24gKyBjaGlsZC5fZGVsYXkpO1xuICBjaGlsZC5fZW5kID0gX3JvdW5kKGNoaWxkLl9zdGFydCArIChjaGlsZC50b3RhbER1cmF0aW9uKCkgLyBNYXRoLmFicyhjaGlsZC50aW1lU2NhbGUoKSkgfHwgMCkpO1xuXG4gIF9hZGRMaW5rZWRMaXN0SXRlbSh0aW1lbGluZSwgY2hpbGQsIFwiX2ZpcnN0XCIsIFwiX2xhc3RcIiwgdGltZWxpbmUuX3NvcnQgPyBcIl9zdGFydFwiIDogMCk7XG5cbiAgdGltZWxpbmUuX3JlY2VudCA9IGNoaWxkO1xuICBza2lwQ2hlY2tzIHx8IF9wb3N0QWRkQ2hlY2tzKHRpbWVsaW5lLCBjaGlsZCk7XG4gIHJldHVybiB0aW1lbGluZTtcbn0sXG4gICAgX3Njcm9sbFRyaWdnZXIgPSBmdW5jdGlvbiBfc2Nyb2xsVHJpZ2dlcihhbmltYXRpb24sIHRyaWdnZXIpIHtcbiAgcmV0dXJuIChfZ2xvYmFscy5TY3JvbGxUcmlnZ2VyIHx8IF9taXNzaW5nUGx1Z2luKFwic2Nyb2xsVHJpZ2dlclwiLCB0cmlnZ2VyKSkgJiYgX2dsb2JhbHMuU2Nyb2xsVHJpZ2dlci5jcmVhdGUodHJpZ2dlciwgYW5pbWF0aW9uKTtcbn0sXG4gICAgX2F0dGVtcHRJbml0VHdlZW4gPSBmdW5jdGlvbiBfYXR0ZW1wdEluaXRUd2Vlbih0d2VlbiwgdG90YWxUaW1lLCBmb3JjZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgX2luaXRUd2Vlbih0d2VlbiwgdG90YWxUaW1lKTtcblxuICBpZiAoIXR3ZWVuLl9pbml0dGVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoIWZvcmNlICYmIHR3ZWVuLl9wdCAmJiAodHdlZW4uX2R1ciAmJiB0d2Vlbi52YXJzLmxhenkgIT09IGZhbHNlIHx8ICF0d2Vlbi5fZHVyICYmIHR3ZWVuLnZhcnMubGF6eSkgJiYgX2xhc3RSZW5kZXJlZEZyYW1lICE9PSBfdGlja2VyLmZyYW1lKSB7XG4gICAgX2xhenlUd2VlbnMucHVzaCh0d2Vlbik7XG5cbiAgICB0d2Vlbi5fbGF6eSA9IFt0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzXTtcbiAgICByZXR1cm4gMTtcbiAgfVxufSxcbiAgICBfcmVuZGVyWmVyb0R1cmF0aW9uVHdlZW4gPSBmdW5jdGlvbiBfcmVuZGVyWmVyb0R1cmF0aW9uVHdlZW4odHdlZW4sIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG4gIHZhciBwcmV2UmF0aW8gPSB0d2Vlbi5yYXRpbyxcbiAgICAgIHJhdGlvID0gdG90YWxUaW1lIDwgMCB8fCAhdG90YWxUaW1lICYmIHByZXZSYXRpbyAmJiAhdHdlZW4uX3N0YXJ0ICYmIHR3ZWVuLl96VGltZSA+IF90aW55TnVtICYmICF0d2Vlbi5fZHAuX2xvY2sgfHwgKHR3ZWVuLl90cyA8IDAgfHwgdHdlZW4uX2RwLl90cyA8IDApICYmIHR3ZWVuLmRhdGEgIT09IFwiaXNGcm9tU3RhcnRcIiAmJiB0d2Vlbi5kYXRhICE9PSBcImlzU3RhcnRcIiA/IDAgOiAxLFxuICAgICAgLy8gY2hlY2sgcGFyZW50J3MgX2xvY2sgYmVjYXVzZSB3aGVuIGEgdGltZWxpbmUgcmVwZWF0cy95b3lvcyBhbmQgZG9lcyBpdHMgYXJ0aWZpY2lhbCB3cmFwcGluZywgd2Ugc2hvdWxkbid0IGZvcmNlIHRoZSByYXRpbyBiYWNrIHRvIDAuIEFsc28sIGlmIHRoZSB0d2VlbiBvciBpdHMgcGFyZW50IGlzIHJldmVyc2VkIGFuZCB0aGUgdG90YWxUaW1lIGlzIDAsIHdlIHNob3VsZCBnbyB0byBhIHJhdGlvIG9mIDAuXG4gIHJlcGVhdERlbGF5ID0gdHdlZW4uX3JEZWxheSxcbiAgICAgIHRUaW1lID0gMCxcbiAgICAgIHB0LFxuICAgICAgaXRlcmF0aW9uLFxuICAgICAgcHJldkl0ZXJhdGlvbjtcblxuICBpZiAocmVwZWF0RGVsYXkgJiYgdHdlZW4uX3JlcGVhdCkge1xuICAgIC8vIGluIGNhc2UgdGhlcmUncyBhIHplcm8tZHVyYXRpb24gdHdlZW4gdGhhdCBoYXMgYSByZXBlYXQgd2l0aCBhIHJlcGVhdERlbGF5XG4gICAgdFRpbWUgPSBfY2xhbXAoMCwgdHdlZW4uX3REdXIsIHRvdGFsVGltZSk7XG4gICAgaXRlcmF0aW9uID0gX2FuaW1hdGlvbkN5Y2xlKHRUaW1lLCByZXBlYXREZWxheSk7XG4gICAgcHJldkl0ZXJhdGlvbiA9IF9hbmltYXRpb25DeWNsZSh0d2Vlbi5fdFRpbWUsIHJlcGVhdERlbGF5KTtcblxuICAgIGlmIChpdGVyYXRpb24gIT09IHByZXZJdGVyYXRpb24pIHtcbiAgICAgIHByZXZSYXRpbyA9IDEgLSByYXRpbztcbiAgICAgIHR3ZWVuLnZhcnMucmVwZWF0UmVmcmVzaCAmJiB0d2Vlbi5faW5pdHRlZCAmJiB0d2Vlbi5pbnZhbGlkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCF0d2Vlbi5faW5pdHRlZCAmJiBfYXR0ZW1wdEluaXRUd2Vlbih0d2VlbiwgdG90YWxUaW1lLCBmb3JjZSwgc3VwcHJlc3NFdmVudHMpKSB7XG4gICAgLy8gaWYgd2UgcmVuZGVyIHRoZSB2ZXJ5IGJlZ2lubmluZyAodGltZSA9PSAwKSBvZiBhIGZyb21UbygpLCB3ZSBtdXN0IGZvcmNlIHRoZSByZW5kZXIgKG5vcm1hbCB0d2VlbnMgd291bGRuJ3QgbmVlZCB0byByZW5kZXIgYXQgYSB0aW1lIG9mIDAgd2hlbiB0aGUgcHJldlRpbWUgd2FzIGFsc28gMCkuIFRoaXMgaXMgYWxzbyBtYW5kYXRvcnkgdG8gbWFrZSBzdXJlIG92ZXJ3cml0aW5nIGtpY2tzIGluIGltbWVkaWF0ZWx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChyYXRpbyAhPT0gcHJldlJhdGlvIHx8IGZvcmNlIHx8IHR3ZWVuLl96VGltZSA9PT0gX3RpbnlOdW0gfHwgIXRvdGFsVGltZSAmJiB0d2Vlbi5felRpbWUpIHtcbiAgICBwcmV2SXRlcmF0aW9uID0gdHdlZW4uX3pUaW1lO1xuICAgIHR3ZWVuLl96VGltZSA9IHRvdGFsVGltZSB8fCAoc3VwcHJlc3NFdmVudHMgPyBfdGlueU51bSA6IDApOyAvLyB3aGVuIHRoZSBwbGF5aGVhZCBhcnJpdmVzIGF0IEVYQUNUTFkgdGltZSAwIChyaWdodCBvbiB0b3ApIG9mIGEgemVyby1kdXJhdGlvbiB0d2Vlbiwgd2UgbmVlZCB0byBkaXNjZXJuIGlmIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBzbyB0aGF0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIGFnYWluIChuZXh0IHRpbWUpLCBpdCdsbCB0cmlnZ2VyIHRoZSBjYWxsYmFjay4gSWYgZXZlbnRzIGFyZSBOT1Qgc3VwcHJlc3NlZCwgb2J2aW91c2x5IHRoZSBjYWxsYmFjayB3b3VsZCBiZSB0cmlnZ2VyZWQgaW4gdGhpcyByZW5kZXIuIEJhc2ljYWxseSwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlIGVpdGhlciB3aGVuIHRoZSBwbGF5aGVhZCBBUlJJVkVTIG9yIExFQVZFUyB0aGlzIGV4YWN0IHNwb3QsIG5vdCBib3RoLiBJbWFnaW5lIGRvaW5nIGEgdGltZWxpbmUuc2VlaygwKSBhbmQgdGhlcmUncyBhIGNhbGxiYWNrIHRoYXQgc2l0cyBhdCAwLiBTaW5jZSBldmVudHMgYXJlIHN1cHByZXNzZWQgb24gdGhhdCBzZWVrKCkgYnkgZGVmYXVsdCwgbm90aGluZyB3aWxsIGZpcmUsIGJ1dCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBvZmYgb2YgdGhhdCBwb3NpdGlvbiwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlLiBUaGlzIGJlaGF2aW9yIGlzIHdoYXQgcGVvcGxlIGludHVpdGl2ZWx5IGV4cGVjdC5cblxuICAgIHN1cHByZXNzRXZlbnRzIHx8IChzdXBwcmVzc0V2ZW50cyA9IHRvdGFsVGltZSAmJiAhcHJldkl0ZXJhdGlvbik7IC8vIGlmIGl0IHdhcyByZW5kZXJlZCBwcmV2aW91c2x5IGF0IGV4YWN0bHkgMCAoX3pUaW1lKSBhbmQgbm93IHRoZSBwbGF5aGVhZCBpcyBtb3ZpbmcgYXdheSwgRE9OJ1QgZmlyZSBjYWxsYmFja3Mgb3RoZXJ3aXNlIHRoZXknbGwgc2VlbSBsaWtlIGR1cGxpY2F0ZXMuXG5cbiAgICB0d2Vlbi5yYXRpbyA9IHJhdGlvO1xuICAgIHR3ZWVuLl9mcm9tICYmIChyYXRpbyA9IDEgLSByYXRpbyk7XG4gICAgdHdlZW4uX3RpbWUgPSAwO1xuICAgIHR3ZWVuLl90VGltZSA9IHRUaW1lO1xuICAgIHN1cHByZXNzRXZlbnRzIHx8IF9jYWxsYmFjayh0d2VlbiwgXCJvblN0YXJ0XCIpO1xuICAgIHB0ID0gdHdlZW4uX3B0O1xuXG4gICAgd2hpbGUgKHB0KSB7XG4gICAgICBwdC5yKHJhdGlvLCBwdC5kKTtcbiAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgfVxuXG4gICAgdHdlZW4uX3N0YXJ0QXQgJiYgdG90YWxUaW1lIDwgMCAmJiB0d2Vlbi5fc3RhcnRBdC5yZW5kZXIodG90YWxUaW1lLCB0cnVlLCB0cnVlKTtcbiAgICB0d2Vlbi5fb25VcGRhdGUgJiYgIXN1cHByZXNzRXZlbnRzICYmIF9jYWxsYmFjayh0d2VlbiwgXCJvblVwZGF0ZVwiKTtcbiAgICB0VGltZSAmJiB0d2Vlbi5fcmVwZWF0ICYmICFzdXBwcmVzc0V2ZW50cyAmJiB0d2Vlbi5wYXJlbnQgJiYgX2NhbGxiYWNrKHR3ZWVuLCBcIm9uUmVwZWF0XCIpO1xuXG4gICAgaWYgKCh0b3RhbFRpbWUgPj0gdHdlZW4uX3REdXIgfHwgdG90YWxUaW1lIDwgMCkgJiYgdHdlZW4ucmF0aW8gPT09IHJhdGlvKSB7XG4gICAgICByYXRpbyAmJiBfcmVtb3ZlRnJvbVBhcmVudCh0d2VlbiwgMSk7XG5cbiAgICAgIGlmICghc3VwcHJlc3NFdmVudHMpIHtcbiAgICAgICAgX2NhbGxiYWNrKHR3ZWVuLCByYXRpbyA/IFwib25Db21wbGV0ZVwiIDogXCJvblJldmVyc2VDb21wbGV0ZVwiLCB0cnVlKTtcblxuICAgICAgICB0d2Vlbi5fcHJvbSAmJiB0d2Vlbi5fcHJvbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICghdHdlZW4uX3pUaW1lKSB7XG4gICAgdHdlZW4uX3pUaW1lID0gdG90YWxUaW1lO1xuICB9XG59LFxuICAgIF9maW5kTmV4dFBhdXNlVHdlZW4gPSBmdW5jdGlvbiBfZmluZE5leHRQYXVzZVR3ZWVuKGFuaW1hdGlvbiwgcHJldlRpbWUsIHRpbWUpIHtcbiAgdmFyIGNoaWxkO1xuXG4gIGlmICh0aW1lID4gcHJldlRpbWUpIHtcbiAgICBjaGlsZCA9IGFuaW1hdGlvbi5fZmlyc3Q7XG5cbiAgICB3aGlsZSAoY2hpbGQgJiYgY2hpbGQuX3N0YXJ0IDw9IHRpbWUpIHtcbiAgICAgIGlmICghY2hpbGQuX2R1ciAmJiBjaGlsZC5kYXRhID09PSBcImlzUGF1c2VcIiAmJiBjaGlsZC5fc3RhcnQgPiBwcmV2VGltZSkge1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNoaWxkID0gYW5pbWF0aW9uLl9sYXN0O1xuXG4gICAgd2hpbGUgKGNoaWxkICYmIGNoaWxkLl9zdGFydCA+PSB0aW1lKSB7XG4gICAgICBpZiAoIWNoaWxkLl9kdXIgJiYgY2hpbGQuZGF0YSA9PT0gXCJpc1BhdXNlXCIgJiYgY2hpbGQuX3N0YXJ0IDwgcHJldlRpbWUpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9wcmV2O1xuICAgIH1cbiAgfVxufSxcbiAgICBfc2V0RHVyYXRpb24gPSBmdW5jdGlvbiBfc2V0RHVyYXRpb24oYW5pbWF0aW9uLCBkdXJhdGlvbiwgc2tpcFVuY2FjaGUsIGxlYXZlUGxheWhlYWQpIHtcbiAgdmFyIHJlcGVhdCA9IGFuaW1hdGlvbi5fcmVwZWF0LFxuICAgICAgZHVyID0gX3JvdW5kKGR1cmF0aW9uKSB8fCAwLFxuICAgICAgdG90YWxQcm9ncmVzcyA9IGFuaW1hdGlvbi5fdFRpbWUgLyBhbmltYXRpb24uX3REdXI7XG4gIHRvdGFsUHJvZ3Jlc3MgJiYgIWxlYXZlUGxheWhlYWQgJiYgKGFuaW1hdGlvbi5fdGltZSAqPSBkdXIgLyBhbmltYXRpb24uX2R1cik7XG4gIGFuaW1hdGlvbi5fZHVyID0gZHVyO1xuICBhbmltYXRpb24uX3REdXIgPSAhcmVwZWF0ID8gZHVyIDogcmVwZWF0IDwgMCA/IDFlMTAgOiBfcm91bmQoZHVyICogKHJlcGVhdCArIDEpICsgYW5pbWF0aW9uLl9yRGVsYXkgKiByZXBlYXQpO1xuICB0b3RhbFByb2dyZXNzICYmICFsZWF2ZVBsYXloZWFkID8gX2FsaWduUGxheWhlYWQoYW5pbWF0aW9uLCBhbmltYXRpb24uX3RUaW1lID0gYW5pbWF0aW9uLl90RHVyICogdG90YWxQcm9ncmVzcykgOiBhbmltYXRpb24ucGFyZW50ICYmIF9zZXRFbmQoYW5pbWF0aW9uKTtcbiAgc2tpcFVuY2FjaGUgfHwgX3VuY2FjaGUoYW5pbWF0aW9uLnBhcmVudCwgYW5pbWF0aW9uKTtcbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX29uVXBkYXRlVG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uIF9vblVwZGF0ZVRvdGFsRHVyYXRpb24oYW5pbWF0aW9uKSB7XG4gIHJldHVybiBhbmltYXRpb24gaW5zdGFuY2VvZiBUaW1lbGluZSA/IF91bmNhY2hlKGFuaW1hdGlvbikgOiBfc2V0RHVyYXRpb24oYW5pbWF0aW9uLCBhbmltYXRpb24uX2R1cik7XG59LFxuICAgIF96ZXJvUG9zaXRpb24gPSB7XG4gIF9zdGFydDogMCxcbiAgZW5kVGltZTogX2VtcHR5RnVuY1xufSxcbiAgICBfcGFyc2VQb3NpdGlvbiA9IGZ1bmN0aW9uIF9wYXJzZVBvc2l0aW9uKGFuaW1hdGlvbiwgcG9zaXRpb24pIHtcbiAgdmFyIGxhYmVscyA9IGFuaW1hdGlvbi5sYWJlbHMsXG4gICAgICByZWNlbnQgPSBhbmltYXRpb24uX3JlY2VudCB8fCBfemVyb1Bvc2l0aW9uLFxuICAgICAgY2xpcHBlZER1cmF0aW9uID0gYW5pbWF0aW9uLmR1cmF0aW9uKCkgPj0gX2JpZ051bSA/IHJlY2VudC5lbmRUaW1lKGZhbHNlKSA6IGFuaW1hdGlvbi5fZHVyLFxuICAgICAgLy9pbiBjYXNlIHRoZXJlJ3MgYSBjaGlsZCB0aGF0IGluZmluaXRlbHkgcmVwZWF0cywgdXNlcnMgYWxtb3N0IG5ldmVyIGludGVuZCBmb3IgdGhlIGluc2VydGlvbiBwb2ludCBvZiBhIG5ldyBjaGlsZCB0byBiZSBiYXNlZCBvbiBhIFNVUEVSIGxvbmcgdmFsdWUgbGlrZSB0aGF0IHNvIHdlIGNsaXAgaXQgYW5kIGFzc3VtZSB0aGUgbW9zdCByZWNlbnRseS1hZGRlZCBjaGlsZCdzIGVuZFRpbWUgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cbiAgaSxcbiAgICAgIG9mZnNldDtcblxuICBpZiAoX2lzU3RyaW5nKHBvc2l0aW9uKSAmJiAoaXNOYU4ocG9zaXRpb24pIHx8IHBvc2l0aW9uIGluIGxhYmVscykpIHtcbiAgICAvL2lmIHRoZSBzdHJpbmcgaXMgYSBudW1iZXIgbGlrZSBcIjFcIiwgY2hlY2sgdG8gc2VlIGlmIHRoZXJlJ3MgYSBsYWJlbCB3aXRoIHRoYXQgbmFtZSwgb3RoZXJ3aXNlIGludGVycHJldCBpdCBhcyBhIG51bWJlciAoYWJzb2x1dGUgdmFsdWUpLlxuICAgIGkgPSBwb3NpdGlvbi5jaGFyQXQoMCk7XG5cbiAgICBpZiAoaSA9PT0gXCI8XCIgfHwgaSA9PT0gXCI+XCIpIHtcbiAgICAgIHJldHVybiAoaSA9PT0gXCI8XCIgPyByZWNlbnQuX3N0YXJ0IDogcmVjZW50LmVuZFRpbWUocmVjZW50Ll9yZXBlYXQgPj0gMCkpICsgKHBhcnNlRmxvYXQocG9zaXRpb24uc3Vic3RyKDEpKSB8fCAwKTtcbiAgICB9XG5cbiAgICBpID0gcG9zaXRpb24uaW5kZXhPZihcIj1cIik7XG5cbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIHBvc2l0aW9uIGluIGxhYmVscyB8fCAobGFiZWxzW3Bvc2l0aW9uXSA9IGNsaXBwZWREdXJhdGlvbik7XG4gICAgICByZXR1cm4gbGFiZWxzW3Bvc2l0aW9uXTtcbiAgICB9XG5cbiAgICBvZmZzZXQgPSArKHBvc2l0aW9uLmNoYXJBdChpIC0gMSkgKyBwb3NpdGlvbi5zdWJzdHIoaSArIDEpKTtcbiAgICByZXR1cm4gaSA+IDEgPyBfcGFyc2VQb3NpdGlvbihhbmltYXRpb24sIHBvc2l0aW9uLnN1YnN0cigwLCBpIC0gMSkpICsgb2Zmc2V0IDogY2xpcHBlZER1cmF0aW9uICsgb2Zmc2V0O1xuICB9XG5cbiAgcmV0dXJuIHBvc2l0aW9uID09IG51bGwgPyBjbGlwcGVkRHVyYXRpb24gOiArcG9zaXRpb247XG59LFxuICAgIF9jb25kaXRpb25hbFJldHVybiA9IGZ1bmN0aW9uIF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuYykge1xuICByZXR1cm4gdmFsdWUgfHwgdmFsdWUgPT09IDAgPyBmdW5jKHZhbHVlKSA6IGZ1bmM7XG59LFxuICAgIF9jbGFtcCA9IGZ1bmN0aW9uIF9jbGFtcChtaW4sIG1heCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIDwgbWluID8gbWluIDogdmFsdWUgPiBtYXggPyBtYXggOiB2YWx1ZTtcbn0sXG4gICAgZ2V0VW5pdCA9IGZ1bmN0aW9uIGdldFVuaXQodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSArIFwiXCIpLnN1YnN0cigocGFyc2VGbG9hdCh2YWx1ZSkgKyBcIlwiKS5sZW5ndGgpO1xufSxcbiAgICBjbGFtcCA9IGZ1bmN0aW9uIGNsYW1wKG1pbiwgbWF4LCB2YWx1ZSkge1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAodikge1xuICAgIHJldHVybiBfY2xhbXAobWluLCBtYXgsIHYpO1xuICB9KTtcbn0sXG4gICAgX3NsaWNlID0gW10uc2xpY2UsXG4gICAgX2lzQXJyYXlMaWtlID0gZnVuY3Rpb24gX2lzQXJyYXlMaWtlKHZhbHVlLCBub25FbXB0eSkge1xuICByZXR1cm4gdmFsdWUgJiYgX2lzT2JqZWN0KHZhbHVlKSAmJiBcImxlbmd0aFwiIGluIHZhbHVlICYmICghbm9uRW1wdHkgJiYgIXZhbHVlLmxlbmd0aCB8fCB2YWx1ZS5sZW5ndGggLSAxIGluIHZhbHVlICYmIF9pc09iamVjdCh2YWx1ZVswXSkpICYmICF2YWx1ZS5ub2RlVHlwZSAmJiB2YWx1ZSAhPT0gX3dpbjtcbn0sXG4gICAgX2ZsYXR0ZW4gPSBmdW5jdGlvbiBfZmxhdHRlbihhciwgbGVhdmVTdHJpbmdzLCBhY2N1bXVsYXRvcikge1xuICBpZiAoYWNjdW11bGF0b3IgPT09IHZvaWQgMCkge1xuICAgIGFjY3VtdWxhdG9yID0gW107XG4gIH1cblxuICByZXR1cm4gYXIuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgX2FjY3VtdWxhdG9yO1xuXG4gICAgcmV0dXJuIF9pc1N0cmluZyh2YWx1ZSkgJiYgIWxlYXZlU3RyaW5ncyB8fCBfaXNBcnJheUxpa2UodmFsdWUsIDEpID8gKF9hY2N1bXVsYXRvciA9IGFjY3VtdWxhdG9yKS5wdXNoLmFwcGx5KF9hY2N1bXVsYXRvciwgdG9BcnJheSh2YWx1ZSkpIDogYWNjdW11bGF0b3IucHVzaCh2YWx1ZSk7XG4gIH0pIHx8IGFjY3VtdWxhdG9yO1xufSxcbiAgICAvL3Rha2VzIGFueSB2YWx1ZSBhbmQgcmV0dXJucyBhbiBhcnJheS4gSWYgaXQncyBhIHN0cmluZyAoYW5kIGxlYXZlU3RyaW5ncyBpc24ndCB0cnVlKSwgaXQnbGwgdXNlIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoKSBhbmQgY29udmVydCB0aGF0IHRvIGFuIGFycmF5LiBJdCdsbCBhbHNvIGFjY2VwdCBpdGVyYWJsZXMgbGlrZSBqUXVlcnkgb2JqZWN0cy5cbnRvQXJyYXkgPSBmdW5jdGlvbiB0b0FycmF5KHZhbHVlLCBsZWF2ZVN0cmluZ3MpIHtcbiAgcmV0dXJuIF9pc1N0cmluZyh2YWx1ZSkgJiYgIWxlYXZlU3RyaW5ncyAmJiAoX2NvcmVJbml0dGVkIHx8ICFfd2FrZSgpKSA/IF9zbGljZS5jYWxsKF9kb2MucXVlcnlTZWxlY3RvckFsbCh2YWx1ZSksIDApIDogX2lzQXJyYXkodmFsdWUpID8gX2ZsYXR0ZW4odmFsdWUsIGxlYXZlU3RyaW5ncykgOiBfaXNBcnJheUxpa2UodmFsdWUpID8gX3NsaWNlLmNhbGwodmFsdWUsIDApIDogdmFsdWUgPyBbdmFsdWVdIDogW107XG59LFxuICAgIHNodWZmbGUgPSBmdW5jdGlvbiBzaHVmZmxlKGEpIHtcbiAgcmV0dXJuIGEuc29ydChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIC41IC0gTWF0aC5yYW5kb20oKTtcbiAgfSk7XG59LFxuICAgIC8vIGFsdGVybmF0aXZlIHRoYXQncyBhIGJpdCBmYXN0ZXIgYW5kIG1vcmUgcmVsaWFibHkgZGl2ZXJzZSBidXQgYmlnZ2VyOiAgIGZvciAobGV0IGosIHYsIGkgPSBhLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB2ID0gYVstLWldLCBhW2ldID0gYVtqXSwgYVtqXSA9IHYpOyByZXR1cm4gYTtcbi8vZm9yIGRpc3RyaWJ1dGluZyB2YWx1ZXMgYWNyb3NzIGFuIGFycmF5LiBDYW4gYWNjZXB0IGEgbnVtYmVyLCBhIGZ1bmN0aW9uIG9yIChtb3N0IGNvbW1vbmx5KSBhIGZ1bmN0aW9uIHdoaWNoIGNhbiBjb250YWluIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczoge2Jhc2UsIGFtb3VudCwgZnJvbSwgZWFzZSwgZ3JpZCwgYXhpcywgbGVuZ3RoLCBlYWNofS4gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZXhwZWN0cyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6IGluZGV4LCB0YXJnZXQsIGFycmF5LiBSZWNvZ25pemVzIHRoZSBmb2xsb3dpbmdcbmRpc3RyaWJ1dGUgPSBmdW5jdGlvbiBkaXN0cmlidXRlKHYpIHtcbiAgaWYgKF9pc0Z1bmN0aW9uKHYpKSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICB2YXIgdmFycyA9IF9pc09iamVjdCh2KSA/IHYgOiB7XG4gICAgZWFjaDogdlxuICB9LFxuICAgICAgLy9uOjEgaXMganVzdCB0byBpbmRpY2F0ZSB2IHdhcyBhIG51bWJlcjsgd2UgbGV2ZXJhZ2UgdGhhdCBsYXRlciB0byBzZXQgdiBhY2NvcmRpbmcgdG8gdGhlIGxlbmd0aCB3ZSBnZXQuIElmIGEgbnVtYmVyIGlzIHBhc3NlZCBpbiwgd2UgdHJlYXQgaXQgbGlrZSB0aGUgb2xkIHN0YWdnZXIgdmFsdWUgd2hlcmUgMC4xLCBmb3IgZXhhbXBsZSwgd291bGQgbWVhbiB0aGF0IHRoaW5ncyB3b3VsZCBiZSBkaXN0cmlidXRlZCB3aXRoIDAuMSBiZXR3ZWVuIGVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkgcmF0aGVyIHRoYW4gYSB0b3RhbCBcImFtb3VudFwiIHRoYXQncyBjaHVua2VkIG91dCBhbW9uZyB0aGVtIGFsbC5cbiAgZWFzZSA9IF9wYXJzZUVhc2UodmFycy5lYXNlKSxcbiAgICAgIGZyb20gPSB2YXJzLmZyb20gfHwgMCxcbiAgICAgIGJhc2UgPSBwYXJzZUZsb2F0KHZhcnMuYmFzZSkgfHwgMCxcbiAgICAgIGNhY2hlID0ge30sXG4gICAgICBpc0RlY2ltYWwgPSBmcm9tID4gMCAmJiBmcm9tIDwgMSxcbiAgICAgIHJhdGlvcyA9IGlzTmFOKGZyb20pIHx8IGlzRGVjaW1hbCxcbiAgICAgIGF4aXMgPSB2YXJzLmF4aXMsXG4gICAgICByYXRpb1ggPSBmcm9tLFxuICAgICAgcmF0aW9ZID0gZnJvbTtcblxuICBpZiAoX2lzU3RyaW5nKGZyb20pKSB7XG4gICAgcmF0aW9YID0gcmF0aW9ZID0ge1xuICAgICAgY2VudGVyOiAuNSxcbiAgICAgIGVkZ2VzOiAuNSxcbiAgICAgIGVuZDogMVxuICAgIH1bZnJvbV0gfHwgMDtcbiAgfSBlbHNlIGlmICghaXNEZWNpbWFsICYmIHJhdGlvcykge1xuICAgIHJhdGlvWCA9IGZyb21bMF07XG4gICAgcmF0aW9ZID0gZnJvbVsxXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaSwgdGFyZ2V0LCBhKSB7XG4gICAgdmFyIGwgPSAoYSB8fCB2YXJzKS5sZW5ndGgsXG4gICAgICAgIGRpc3RhbmNlcyA9IGNhY2hlW2xdLFxuICAgICAgICBvcmlnaW5YLFxuICAgICAgICBvcmlnaW5ZLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICBkLFxuICAgICAgICBqLFxuICAgICAgICBtYXgsXG4gICAgICAgIG1pbixcbiAgICAgICAgd3JhcEF0O1xuXG4gICAgaWYgKCFkaXN0YW5jZXMpIHtcbiAgICAgIHdyYXBBdCA9IHZhcnMuZ3JpZCA9PT0gXCJhdXRvXCIgPyAwIDogKHZhcnMuZ3JpZCB8fCBbMSwgX2JpZ051bV0pWzFdO1xuXG4gICAgICBpZiAoIXdyYXBBdCkge1xuICAgICAgICBtYXggPSAtX2JpZ051bTtcblxuICAgICAgICB3aGlsZSAobWF4IDwgKG1heCA9IGFbd3JhcEF0KytdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpICYmIHdyYXBBdCA8IGwpIHt9XG5cbiAgICAgICAgd3JhcEF0LS07XG4gICAgICB9XG5cbiAgICAgIGRpc3RhbmNlcyA9IGNhY2hlW2xdID0gW107XG4gICAgICBvcmlnaW5YID0gcmF0aW9zID8gTWF0aC5taW4od3JhcEF0LCBsKSAqIHJhdGlvWCAtIC41IDogZnJvbSAlIHdyYXBBdDtcbiAgICAgIG9yaWdpblkgPSByYXRpb3MgPyBsICogcmF0aW9ZIC8gd3JhcEF0IC0gLjUgOiBmcm9tIC8gd3JhcEF0IHwgMDtcbiAgICAgIG1heCA9IDA7XG4gICAgICBtaW4gPSBfYmlnTnVtO1xuXG4gICAgICBmb3IgKGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgIHggPSBqICUgd3JhcEF0IC0gb3JpZ2luWDtcbiAgICAgICAgeSA9IG9yaWdpblkgLSAoaiAvIHdyYXBBdCB8IDApO1xuICAgICAgICBkaXN0YW5jZXNbal0gPSBkID0gIWF4aXMgPyBfc3FydCh4ICogeCArIHkgKiB5KSA6IE1hdGguYWJzKGF4aXMgPT09IFwieVwiID8geSA6IHgpO1xuICAgICAgICBkID4gbWF4ICYmIChtYXggPSBkKTtcbiAgICAgICAgZCA8IG1pbiAmJiAobWluID0gZCk7XG4gICAgICB9XG5cbiAgICAgIGZyb20gPT09IFwicmFuZG9tXCIgJiYgc2h1ZmZsZShkaXN0YW5jZXMpO1xuICAgICAgZGlzdGFuY2VzLm1heCA9IG1heCAtIG1pbjtcbiAgICAgIGRpc3RhbmNlcy5taW4gPSBtaW47XG4gICAgICBkaXN0YW5jZXMudiA9IGwgPSAocGFyc2VGbG9hdCh2YXJzLmFtb3VudCkgfHwgcGFyc2VGbG9hdCh2YXJzLmVhY2gpICogKHdyYXBBdCA+IGwgPyBsIC0gMSA6ICFheGlzID8gTWF0aC5tYXgod3JhcEF0LCBsIC8gd3JhcEF0KSA6IGF4aXMgPT09IFwieVwiID8gbCAvIHdyYXBBdCA6IHdyYXBBdCkgfHwgMCkgKiAoZnJvbSA9PT0gXCJlZGdlc1wiID8gLTEgOiAxKTtcbiAgICAgIGRpc3RhbmNlcy5iID0gbCA8IDAgPyBiYXNlIC0gbCA6IGJhc2U7XG4gICAgICBkaXN0YW5jZXMudSA9IGdldFVuaXQodmFycy5hbW91bnQgfHwgdmFycy5lYWNoKSB8fCAwOyAvL3VuaXRcblxuICAgICAgZWFzZSA9IGVhc2UgJiYgbCA8IDAgPyBfaW52ZXJ0RWFzZShlYXNlKSA6IGVhc2U7XG4gICAgfVxuXG4gICAgbCA9IChkaXN0YW5jZXNbaV0gLSBkaXN0YW5jZXMubWluKSAvIGRpc3RhbmNlcy5tYXggfHwgMDtcbiAgICByZXR1cm4gX3JvdW5kKGRpc3RhbmNlcy5iICsgKGVhc2UgPyBlYXNlKGwpIDogbCkgKiBkaXN0YW5jZXMudikgKyBkaXN0YW5jZXMudTsgLy9yb3VuZCBpbiBvcmRlciB0byB3b3JrIGFyb3VuZCBmbG9hdGluZyBwb2ludCBlcnJvcnNcbiAgfTtcbn0sXG4gICAgX3JvdW5kTW9kaWZpZXIgPSBmdW5jdGlvbiBfcm91bmRNb2RpZmllcih2KSB7XG4gIC8vcGFzcyBpbiAwLjEgZ2V0IGEgZnVuY3Rpb24gdGhhdCdsbCByb3VuZCB0byB0aGUgbmVhcmVzdCB0ZW50aCwgb3IgNSB0byByb3VuZCB0byB0aGUgY2xvc2VzdCA1LCBvciAwLjAwMSB0byB0aGUgY2xvc2VzdCAxMDAwdGgsIGV0Yy5cbiAgdmFyIHAgPSB2IDwgMSA/IE1hdGgucG93KDEwLCAodiArIFwiXCIpLmxlbmd0aCAtIDIpIDogMTsgLy90byBhdm9pZCBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyAobGlrZSAyNCAqIDAuMSA9PSAyLjQwMDAwMDAwMDAwMDAwMDQpLCB3ZSBjaG9wIG9mZiBhdCBhIHNwZWNpZmljIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyAobXVjaCBmYXN0ZXIgdGhhbiB0b0ZpeGVkKClcblxuICByZXR1cm4gZnVuY3Rpb24gKHJhdykge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucm91bmQocGFyc2VGbG9hdChyYXcpIC8gdikgKiB2ICogcCkgLyBwICsgKF9pc051bWJlcihyYXcpID8gMCA6IGdldFVuaXQocmF3KSk7XG4gIH07XG59LFxuICAgIHNuYXAgPSBmdW5jdGlvbiBzbmFwKHNuYXBUbywgdmFsdWUpIHtcbiAgdmFyIGlzQXJyYXkgPSBfaXNBcnJheShzbmFwVG8pLFxuICAgICAgcmFkaXVzLFxuICAgICAgaXMyRDtcblxuICBpZiAoIWlzQXJyYXkgJiYgX2lzT2JqZWN0KHNuYXBUbykpIHtcbiAgICByYWRpdXMgPSBpc0FycmF5ID0gc25hcFRvLnJhZGl1cyB8fCBfYmlnTnVtO1xuXG4gICAgaWYgKHNuYXBUby52YWx1ZXMpIHtcbiAgICAgIHNuYXBUbyA9IHRvQXJyYXkoc25hcFRvLnZhbHVlcyk7XG5cbiAgICAgIGlmIChpczJEID0gIV9pc051bWJlcihzbmFwVG9bMF0pKSB7XG4gICAgICAgIHJhZGl1cyAqPSByYWRpdXM7IC8vcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIHNvIHdlIGRvbid0IGhhdmUgdG8gTWF0aC5zcXJ0KCkgaW4gdGhlIGxvb3AuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNuYXBUbyA9IF9yb3VuZE1vZGlmaWVyKHNuYXBUby5pbmNyZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsICFpc0FycmF5ID8gX3JvdW5kTW9kaWZpZXIoc25hcFRvKSA6IF9pc0Z1bmN0aW9uKHNuYXBUbykgPyBmdW5jdGlvbiAocmF3KSB7XG4gICAgaXMyRCA9IHNuYXBUbyhyYXcpO1xuICAgIHJldHVybiBNYXRoLmFicyhpczJEIC0gcmF3KSA8PSByYWRpdXMgPyBpczJEIDogcmF3O1xuICB9IDogZnVuY3Rpb24gKHJhdykge1xuICAgIHZhciB4ID0gcGFyc2VGbG9hdChpczJEID8gcmF3LnggOiByYXcpLFxuICAgICAgICB5ID0gcGFyc2VGbG9hdChpczJEID8gcmF3LnkgOiAwKSxcbiAgICAgICAgbWluID0gX2JpZ051bSxcbiAgICAgICAgY2xvc2VzdCA9IDAsXG4gICAgICAgIGkgPSBzbmFwVG8ubGVuZ3RoLFxuICAgICAgICBkeCxcbiAgICAgICAgZHk7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoaXMyRCkge1xuICAgICAgICBkeCA9IHNuYXBUb1tpXS54IC0geDtcbiAgICAgICAgZHkgPSBzbmFwVG9baV0ueSAtIHk7XG4gICAgICAgIGR4ID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkeCA9IE1hdGguYWJzKHNuYXBUb1tpXSAtIHgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHggPCBtaW4pIHtcbiAgICAgICAgbWluID0gZHg7XG4gICAgICAgIGNsb3Nlc3QgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNsb3Nlc3QgPSAhcmFkaXVzIHx8IG1pbiA8PSByYWRpdXMgPyBzbmFwVG9bY2xvc2VzdF0gOiByYXc7XG4gICAgcmV0dXJuIGlzMkQgfHwgY2xvc2VzdCA9PT0gcmF3IHx8IF9pc051bWJlcihyYXcpID8gY2xvc2VzdCA6IGNsb3Nlc3QgKyBnZXRVbml0KHJhdyk7XG4gIH0pO1xufSxcbiAgICByYW5kb20gPSBmdW5jdGlvbiByYW5kb20obWluLCBtYXgsIHJvdW5kaW5nSW5jcmVtZW50LCByZXR1cm5GdW5jdGlvbikge1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKF9pc0FycmF5KG1pbikgPyAhbWF4IDogcm91bmRpbmdJbmNyZW1lbnQgPT09IHRydWUgPyAhIShyb3VuZGluZ0luY3JlbWVudCA9IDApIDogIXJldHVybkZ1bmN0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9pc0FycmF5KG1pbikgPyBtaW5bfn4oTWF0aC5yYW5kb20oKSAqIG1pbi5sZW5ndGgpXSA6IChyb3VuZGluZ0luY3JlbWVudCA9IHJvdW5kaW5nSW5jcmVtZW50IHx8IDFlLTUpICYmIChyZXR1cm5GdW5jdGlvbiA9IHJvdW5kaW5nSW5jcmVtZW50IDwgMSA/IE1hdGgucG93KDEwLCAocm91bmRpbmdJbmNyZW1lbnQgKyBcIlwiKS5sZW5ndGggLSAyKSA6IDEpICYmIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSAvIHJvdW5kaW5nSW5jcmVtZW50KSAqIHJvdW5kaW5nSW5jcmVtZW50ICogcmV0dXJuRnVuY3Rpb24pIC8gcmV0dXJuRnVuY3Rpb247XG4gIH0pO1xufSxcbiAgICBwaXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmN0aW9ucyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jdGlvbnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKHYsIGYpIHtcbiAgICAgIHJldHVybiBmKHYpO1xuICAgIH0sIHZhbHVlKTtcbiAgfTtcbn0sXG4gICAgdW5pdGl6ZSA9IGZ1bmN0aW9uIHVuaXRpemUoZnVuYywgdW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmMocGFyc2VGbG9hdCh2YWx1ZSkpICsgKHVuaXQgfHwgZ2V0VW5pdCh2YWx1ZSkpO1xuICB9O1xufSxcbiAgICBub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUobWluLCBtYXgsIHZhbHVlKSB7XG4gIHJldHVybiBtYXBSYW5nZShtaW4sIG1heCwgMCwgMSwgdmFsdWUpO1xufSxcbiAgICBfd3JhcEFycmF5ID0gZnVuY3Rpb24gX3dyYXBBcnJheShhLCB3cmFwcGVyLCB2YWx1ZSkge1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4gYVt+fndyYXBwZXIoaW5kZXgpXTtcbiAgfSk7XG59LFxuICAgIHdyYXAgPSBmdW5jdGlvbiB3cmFwKG1pbiwgbWF4LCB2YWx1ZSkge1xuICAvLyBOT1RFOiB3cmFwKCkgQ0FOTk9UIGJlIGFuIGFycm93IGZ1bmN0aW9uISBBIHZlcnkgb2RkIGNvbXBpbGluZyBidWcgY2F1c2VzIHByb2JsZW1zICh1bnJlbGF0ZWQgdG8gR1NBUCkuXG4gIHZhciByYW5nZSA9IG1heCAtIG1pbjtcbiAgcmV0dXJuIF9pc0FycmF5KG1pbikgPyBfd3JhcEFycmF5KG1pbiwgd3JhcCgwLCBtaW4ubGVuZ3RoKSwgbWF4KSA6IF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIChyYW5nZSArICh2YWx1ZSAtIG1pbikgJSByYW5nZSkgJSByYW5nZSArIG1pbjtcbiAgfSk7XG59LFxuICAgIHdyYXBZb3lvID0gZnVuY3Rpb24gd3JhcFlveW8obWluLCBtYXgsIHZhbHVlKSB7XG4gIHZhciByYW5nZSA9IG1heCAtIG1pbixcbiAgICAgIHRvdGFsID0gcmFuZ2UgKiAyO1xuICByZXR1cm4gX2lzQXJyYXkobWluKSA/IF93cmFwQXJyYXkobWluLCB3cmFwWW95bygwLCBtaW4ubGVuZ3RoIC0gMSksIG1heCkgOiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhbHVlID0gKHRvdGFsICsgKHZhbHVlIC0gbWluKSAlIHRvdGFsKSAlIHRvdGFsIHx8IDA7XG4gICAgcmV0dXJuIG1pbiArICh2YWx1ZSA+IHJhbmdlID8gdG90YWwgLSB2YWx1ZSA6IHZhbHVlKTtcbiAgfSk7XG59LFxuICAgIF9yZXBsYWNlUmFuZG9tID0gZnVuY3Rpb24gX3JlcGxhY2VSYW5kb20odmFsdWUpIHtcbiAgLy9yZXBsYWNlcyBhbGwgb2NjdXJyZW5jZXMgb2YgcmFuZG9tKC4uLikgaW4gYSBzdHJpbmcgd2l0aCB0aGUgY2FsY3VsYXRlZCByYW5kb20gdmFsdWUuIGNhbiBiZSBhIHJhbmdlIGxpa2UgcmFuZG9tKC0xMDAsIDEwMCwgNSkgb3IgYW4gYXJyYXkgbGlrZSByYW5kb20oWzAsIDEwMCwgNTAwXSlcbiAgdmFyIHByZXYgPSAwLFxuICAgICAgcyA9IFwiXCIsXG4gICAgICBpLFxuICAgICAgbnVtcyxcbiAgICAgIGVuZCxcbiAgICAgIGlzQXJyYXk7XG5cbiAgd2hpbGUgKH4oaSA9IHZhbHVlLmluZGV4T2YoXCJyYW5kb20oXCIsIHByZXYpKSkge1xuICAgIGVuZCA9IHZhbHVlLmluZGV4T2YoXCIpXCIsIGkpO1xuICAgIGlzQXJyYXkgPSB2YWx1ZS5jaGFyQXQoaSArIDcpID09PSBcIltcIjtcbiAgICBudW1zID0gdmFsdWUuc3Vic3RyKGkgKyA3LCBlbmQgLSBpIC0gNykubWF0Y2goaXNBcnJheSA/IF9kZWxpbWl0ZWRWYWx1ZUV4cCA6IF9zdHJpY3ROdW1FeHApO1xuICAgIHMgKz0gdmFsdWUuc3Vic3RyKHByZXYsIGkgLSBwcmV2KSArIHJhbmRvbShpc0FycmF5ID8gbnVtcyA6ICtudW1zWzBdLCBpc0FycmF5ID8gMCA6ICtudW1zWzFdLCArbnVtc1syXSB8fCAxZS01KTtcbiAgICBwcmV2ID0gZW5kICsgMTtcbiAgfVxuXG4gIHJldHVybiBzICsgdmFsdWUuc3Vic3RyKHByZXYsIHZhbHVlLmxlbmd0aCAtIHByZXYpO1xufSxcbiAgICBtYXBSYW5nZSA9IGZ1bmN0aW9uIG1hcFJhbmdlKGluTWluLCBpbk1heCwgb3V0TWluLCBvdXRNYXgsIHZhbHVlKSB7XG4gIHZhciBpblJhbmdlID0gaW5NYXggLSBpbk1pbixcbiAgICAgIG91dFJhbmdlID0gb3V0TWF4IC0gb3V0TWluO1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gb3V0TWluICsgKCh2YWx1ZSAtIGluTWluKSAvIGluUmFuZ2UgKiBvdXRSYW5nZSB8fCAwKTtcbiAgfSk7XG59LFxuICAgIGludGVycG9sYXRlID0gZnVuY3Rpb24gaW50ZXJwb2xhdGUoc3RhcnQsIGVuZCwgcHJvZ3Jlc3MsIG11dGF0ZSkge1xuICB2YXIgZnVuYyA9IGlzTmFOKHN0YXJ0ICsgZW5kKSA/IDAgOiBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAoMSAtIHApICogc3RhcnQgKyBwICogZW5kO1xuICB9O1xuXG4gIGlmICghZnVuYykge1xuICAgIHZhciBpc1N0cmluZyA9IF9pc1N0cmluZyhzdGFydCksXG4gICAgICAgIG1hc3RlciA9IHt9LFxuICAgICAgICBwLFxuICAgICAgICBpLFxuICAgICAgICBpbnRlcnBvbGF0b3JzLFxuICAgICAgICBsLFxuICAgICAgICBpbDtcblxuICAgIHByb2dyZXNzID09PSB0cnVlICYmIChtdXRhdGUgPSAxKSAmJiAocHJvZ3Jlc3MgPSBudWxsKTtcblxuICAgIGlmIChpc1N0cmluZykge1xuICAgICAgc3RhcnQgPSB7XG4gICAgICAgIHA6IHN0YXJ0XG4gICAgICB9O1xuICAgICAgZW5kID0ge1xuICAgICAgICBwOiBlbmRcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChfaXNBcnJheShzdGFydCkgJiYgIV9pc0FycmF5KGVuZCkpIHtcbiAgICAgIGludGVycG9sYXRvcnMgPSBbXTtcbiAgICAgIGwgPSBzdGFydC5sZW5ndGg7XG4gICAgICBpbCA9IGwgLSAyO1xuXG4gICAgICBmb3IgKGkgPSAxOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGludGVycG9sYXRvcnMucHVzaChpbnRlcnBvbGF0ZShzdGFydFtpIC0gMV0sIHN0YXJ0W2ldKSk7IC8vYnVpbGQgdGhlIGludGVycG9sYXRvcnMgdXAgZnJvbnQgYXMgYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24gc28gdGhhdCB3aGVuIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgbWFueSB0aW1lcywgaXQgY2FuIGp1c3QgcmV1c2UgdGhlbS5cbiAgICAgIH1cblxuICAgICAgbC0tO1xuXG4gICAgICBmdW5jID0gZnVuY3Rpb24gZnVuYyhwKSB7XG4gICAgICAgIHAgKj0gbDtcbiAgICAgICAgdmFyIGkgPSBNYXRoLm1pbihpbCwgfn5wKTtcbiAgICAgICAgcmV0dXJuIGludGVycG9sYXRvcnNbaV0ocCAtIGkpO1xuICAgICAgfTtcblxuICAgICAgcHJvZ3Jlc3MgPSBlbmQ7XG4gICAgfSBlbHNlIGlmICghbXV0YXRlKSB7XG4gICAgICBzdGFydCA9IF9tZXJnZShfaXNBcnJheShzdGFydCkgPyBbXSA6IHt9LCBzdGFydCk7XG4gICAgfVxuXG4gICAgaWYgKCFpbnRlcnBvbGF0b3JzKSB7XG4gICAgICBmb3IgKHAgaW4gZW5kKSB7XG4gICAgICAgIF9hZGRQcm9wVHdlZW4uY2FsbChtYXN0ZXIsIHN0YXJ0LCBwLCBcImdldFwiLCBlbmRbcF0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jID0gZnVuY3Rpb24gZnVuYyhwKSB7XG4gICAgICAgIHJldHVybiBfcmVuZGVyUHJvcFR3ZWVucyhwLCBtYXN0ZXIpIHx8IChpc1N0cmluZyA/IHN0YXJ0LnAgOiBzdGFydCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4ocHJvZ3Jlc3MsIGZ1bmMpO1xufSxcbiAgICBfZ2V0TGFiZWxJbkRpcmVjdGlvbiA9IGZ1bmN0aW9uIF9nZXRMYWJlbEluRGlyZWN0aW9uKHRpbWVsaW5lLCBmcm9tVGltZSwgYmFja3dhcmQpIHtcbiAgLy91c2VkIGZvciBuZXh0TGFiZWwoKSBhbmQgcHJldmlvdXNMYWJlbCgpXG4gIHZhciBsYWJlbHMgPSB0aW1lbGluZS5sYWJlbHMsXG4gICAgICBtaW4gPSBfYmlnTnVtLFxuICAgICAgcCxcbiAgICAgIGRpc3RhbmNlLFxuICAgICAgbGFiZWw7XG5cbiAgZm9yIChwIGluIGxhYmVscykge1xuICAgIGRpc3RhbmNlID0gbGFiZWxzW3BdIC0gZnJvbVRpbWU7XG5cbiAgICBpZiAoZGlzdGFuY2UgPCAwID09PSAhIWJhY2t3YXJkICYmIGRpc3RhbmNlICYmIG1pbiA+IChkaXN0YW5jZSA9IE1hdGguYWJzKGRpc3RhbmNlKSkpIHtcbiAgICAgIGxhYmVsID0gcDtcbiAgICAgIG1pbiA9IGRpc3RhbmNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsYWJlbDtcbn0sXG4gICAgX2NhbGxiYWNrID0gZnVuY3Rpb24gX2NhbGxiYWNrKGFuaW1hdGlvbiwgdHlwZSwgZXhlY3V0ZUxhenlGaXJzdCkge1xuICB2YXIgdiA9IGFuaW1hdGlvbi52YXJzLFxuICAgICAgY2FsbGJhY2sgPSB2W3R5cGVdLFxuICAgICAgcGFyYW1zLFxuICAgICAgc2NvcGU7XG5cbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHBhcmFtcyA9IHZbdHlwZSArIFwiUGFyYW1zXCJdO1xuICBzY29wZSA9IHYuY2FsbGJhY2tTY29wZSB8fCBhbmltYXRpb247XG4gIGV4ZWN1dGVMYXp5Rmlyc3QgJiYgX2xhenlUd2VlbnMubGVuZ3RoICYmIF9sYXp5UmVuZGVyKCk7IC8vaW4gY2FzZSByZW5kZXJpbmcgY2F1c2VkIGFueSB0d2VlbnMgdG8gbGF6eS1pbml0LCB3ZSBzaG91bGQgcmVuZGVyIHRoZW0gYmVjYXVzZSB0eXBpY2FsbHkgd2hlbiBhIHRpbWVsaW5lIGZpbmlzaGVzLCB1c2VycyBleHBlY3QgdGhpbmdzIHRvIGhhdmUgcmVuZGVyZWQgZnVsbHkuIEltYWdpbmUgYW4gb25VcGRhdGUgb24gYSB0aW1lbGluZSB0aGF0IHJlcG9ydHMvY2hlY2tzIHR3ZWVuZWQgdmFsdWVzLlxuXG4gIHJldHVybiBwYXJhbXMgPyBjYWxsYmFjay5hcHBseShzY29wZSwgcGFyYW1zKSA6IGNhbGxiYWNrLmNhbGwoc2NvcGUpO1xufSxcbiAgICBfaW50ZXJydXB0ID0gZnVuY3Rpb24gX2ludGVycnVwdChhbmltYXRpb24pIHtcbiAgX3JlbW92ZUZyb21QYXJlbnQoYW5pbWF0aW9uKTtcblxuICBhbmltYXRpb24ucHJvZ3Jlc3MoKSA8IDEgJiYgX2NhbGxiYWNrKGFuaW1hdGlvbiwgXCJvbkludGVycnVwdFwiKTtcbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX3F1aWNrVHdlZW4sXG4gICAgX2NyZWF0ZVBsdWdpbiA9IGZ1bmN0aW9uIF9jcmVhdGVQbHVnaW4oY29uZmlnKSB7XG4gIGNvbmZpZyA9ICFjb25maWcubmFtZSAmJiBjb25maWdbXCJkZWZhdWx0XCJdIHx8IGNvbmZpZzsgLy9VTUQgcGFja2FnaW5nIHdyYXBzIHRoaW5ncyBvZGRseSwgc28gZm9yIGV4YW1wbGUgTW90aW9uUGF0aEhlbHBlciBiZWNvbWVzIHtNb3Rpb25QYXRoSGVscGVyOk1vdGlvblBhdGhIZWxwZXIsIGRlZmF1bHQ6TW90aW9uUGF0aEhlbHBlcn0uXG5cbiAgdmFyIG5hbWUgPSBjb25maWcubmFtZSxcbiAgICAgIGlzRnVuYyA9IF9pc0Z1bmN0aW9uKGNvbmZpZyksXG4gICAgICBQbHVnaW4gPSBuYW1lICYmICFpc0Z1bmMgJiYgY29uZmlnLmluaXQgPyBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fcHJvcHMgPSBbXTtcbiAgfSA6IGNvbmZpZyxcbiAgICAgIC8vaW4gY2FzZSBzb21lb25lIHBhc3NlcyBpbiBhbiBvYmplY3QgdGhhdCdzIG5vdCBhIHBsdWdpbiwgbGlrZSBDdXN0b21FYXNlXG4gIGluc3RhbmNlRGVmYXVsdHMgPSB7XG4gICAgaW5pdDogX2VtcHR5RnVuYyxcbiAgICByZW5kZXI6IF9yZW5kZXJQcm9wVHdlZW5zLFxuICAgIGFkZDogX2FkZFByb3BUd2VlbixcbiAgICBraWxsOiBfa2lsbFByb3BUd2VlbnNPZixcbiAgICBtb2RpZmllcjogX2FkZFBsdWdpbk1vZGlmaWVyLFxuICAgIHJhd1ZhcnM6IDBcbiAgfSxcbiAgICAgIHN0YXRpY3MgPSB7XG4gICAgdGFyZ2V0VGVzdDogMCxcbiAgICBnZXQ6IDAsXG4gICAgZ2V0U2V0dGVyOiBfZ2V0U2V0dGVyLFxuICAgIGFsaWFzZXM6IHt9LFxuICAgIHJlZ2lzdGVyOiAwXG4gIH07XG5cbiAgX3dha2UoKTtcblxuICBpZiAoY29uZmlnICE9PSBQbHVnaW4pIHtcbiAgICBpZiAoX3BsdWdpbnNbbmFtZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBfc2V0RGVmYXVsdHMoUGx1Z2luLCBfc2V0RGVmYXVsdHMoX2NvcHlFeGNsdWRpbmcoY29uZmlnLCBpbnN0YW5jZURlZmF1bHRzKSwgc3RhdGljcykpOyAvL3N0YXRpYyBtZXRob2RzXG5cblxuICAgIF9tZXJnZShQbHVnaW4ucHJvdG90eXBlLCBfbWVyZ2UoaW5zdGFuY2VEZWZhdWx0cywgX2NvcHlFeGNsdWRpbmcoY29uZmlnLCBzdGF0aWNzKSkpOyAvL2luc3RhbmNlIG1ldGhvZHNcblxuXG4gICAgX3BsdWdpbnNbUGx1Z2luLnByb3AgPSBuYW1lXSA9IFBsdWdpbjtcblxuICAgIGlmIChjb25maWcudGFyZ2V0VGVzdCkge1xuICAgICAgX2hhcm5lc3NQbHVnaW5zLnB1c2goUGx1Z2luKTtcblxuICAgICAgX3Jlc2VydmVkUHJvcHNbbmFtZV0gPSAxO1xuICAgIH1cblxuICAgIG5hbWUgPSAobmFtZSA9PT0gXCJjc3NcIiA/IFwiQ1NTXCIgOiBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zdWJzdHIoMSkpICsgXCJQbHVnaW5cIjsgLy9mb3IgdGhlIGdsb2JhbCBuYW1lLiBcIm1vdGlvblBhdGhcIiBzaG91bGQgYmVjb21lIE1vdGlvblBhdGhQbHVnaW5cbiAgfVxuXG4gIF9hZGRHbG9iYWwobmFtZSwgUGx1Z2luKTtcblxuICBjb25maWcucmVnaXN0ZXIgJiYgY29uZmlnLnJlZ2lzdGVyKGdzYXAsIFBsdWdpbiwgUHJvcFR3ZWVuKTtcbn0sXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ09MT1JTXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5fMjU1ID0gMjU1LFxuICAgIF9jb2xvckxvb2t1cCA9IHtcbiAgYXF1YTogWzAsIF8yNTUsIF8yNTVdLFxuICBsaW1lOiBbMCwgXzI1NSwgMF0sXG4gIHNpbHZlcjogWzE5MiwgMTkyLCAxOTJdLFxuICBibGFjazogWzAsIDAsIDBdLFxuICBtYXJvb246IFsxMjgsIDAsIDBdLFxuICB0ZWFsOiBbMCwgMTI4LCAxMjhdLFxuICBibHVlOiBbMCwgMCwgXzI1NV0sXG4gIG5hdnk6IFswLCAwLCAxMjhdLFxuICB3aGl0ZTogW18yNTUsIF8yNTUsIF8yNTVdLFxuICBvbGl2ZTogWzEyOCwgMTI4LCAwXSxcbiAgeWVsbG93OiBbXzI1NSwgXzI1NSwgMF0sXG4gIG9yYW5nZTogW18yNTUsIDE2NSwgMF0sXG4gIGdyYXk6IFsxMjgsIDEyOCwgMTI4XSxcbiAgcHVycGxlOiBbMTI4LCAwLCAxMjhdLFxuICBncmVlbjogWzAsIDEyOCwgMF0sXG4gIHJlZDogW18yNTUsIDAsIDBdLFxuICBwaW5rOiBbXzI1NSwgMTkyLCAyMDNdLFxuICBjeWFuOiBbMCwgXzI1NSwgXzI1NV0sXG4gIHRyYW5zcGFyZW50OiBbXzI1NSwgXzI1NSwgXzI1NSwgMF1cbn0sXG4gICAgX2h1ZSA9IGZ1bmN0aW9uIF9odWUoaCwgbTEsIG0yKSB7XG4gIGggPSBoIDwgMCA/IGggKyAxIDogaCA+IDEgPyBoIC0gMSA6IGg7XG4gIHJldHVybiAoaCAqIDYgPCAxID8gbTEgKyAobTIgLSBtMSkgKiBoICogNiA6IGggPCAuNSA/IG0yIDogaCAqIDMgPCAyID8gbTEgKyAobTIgLSBtMSkgKiAoMiAvIDMgLSBoKSAqIDYgOiBtMSkgKiBfMjU1ICsgLjUgfCAwO1xufSxcbiAgICBzcGxpdENvbG9yID0gZnVuY3Rpb24gc3BsaXRDb2xvcih2LCB0b0hTTCwgZm9yY2VBbHBoYSkge1xuICB2YXIgYSA9ICF2ID8gX2NvbG9yTG9va3VwLmJsYWNrIDogX2lzTnVtYmVyKHYpID8gW3YgPj4gMTYsIHYgPj4gOCAmIF8yNTUsIHYgJiBfMjU1XSA6IDAsXG4gICAgICByLFxuICAgICAgZyxcbiAgICAgIGIsXG4gICAgICBoLFxuICAgICAgcyxcbiAgICAgIGwsXG4gICAgICBtYXgsXG4gICAgICBtaW4sXG4gICAgICBkLFxuICAgICAgd2FzSFNMO1xuXG4gIGlmICghYSkge1xuICAgIGlmICh2LnN1YnN0cigtMSkgPT09IFwiLFwiKSB7XG4gICAgICAvL3NvbWV0aW1lcyBhIHRyYWlsaW5nIGNvbW1hIGlzIGluY2x1ZGVkIGFuZCB3ZSBzaG91bGQgY2hvcCBpdCBvZmYgKHR5cGljYWxseSBmcm9tIGEgY29tbWEtZGVsaW1pdGVkIGxpc3Qgb2YgdmFsdWVzIGxpa2UgYSB0ZXh0U2hhZG93OlwiMnB4IDJweCAycHggYmx1ZSwgNXB4IDVweCA1cHggcmdiKDI1NSwwLDApXCIgLSBpbiB0aGlzIGV4YW1wbGUgXCJibHVlLFwiIGhhcyBhIHRyYWlsaW5nIGNvbW1hLiBXZSBjb3VsZCBzdHJpcCBpdCBvdXQgaW5zaWRlIHBhcnNlQ29tcGxleCgpIGJ1dCB3ZSdkIG5lZWQgdG8gZG8gaXQgdG8gdGhlIGJlZ2lubmluZyBhbmQgZW5kaW5nIHZhbHVlcyBwbHVzIGl0IHdvdWxkbid0IHByb3ZpZGUgcHJvdGVjdGlvbiBmcm9tIG90aGVyIHBvdGVudGlhbCBzY2VuYXJpb3MgbGlrZSBpZiB0aGUgdXNlciBwYXNzZXMgaW4gYSBzaW1pbGFyIHZhbHVlLlxuICAgICAgdiA9IHYuc3Vic3RyKDAsIHYubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgaWYgKF9jb2xvckxvb2t1cFt2XSkge1xuICAgICAgYSA9IF9jb2xvckxvb2t1cFt2XTtcbiAgICB9IGVsc2UgaWYgKHYuY2hhckF0KDApID09PSBcIiNcIikge1xuICAgICAgaWYgKHYubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIC8vZm9yIHNob3J0aGFuZCBsaWtlICM5RjBcbiAgICAgICAgciA9IHYuY2hhckF0KDEpO1xuICAgICAgICBnID0gdi5jaGFyQXQoMik7XG4gICAgICAgIGIgPSB2LmNoYXJBdCgzKTtcbiAgICAgICAgdiA9IFwiI1wiICsgciArIHIgKyBnICsgZyArIGIgKyBiO1xuICAgICAgfVxuXG4gICAgICB2ID0gcGFyc2VJbnQodi5zdWJzdHIoMSksIDE2KTtcbiAgICAgIGEgPSBbdiA+PiAxNiwgdiA+PiA4ICYgXzI1NSwgdiAmIF8yNTVdO1xuICAgIH0gZWxzZSBpZiAodi5zdWJzdHIoMCwgMykgPT09IFwiaHNsXCIpIHtcbiAgICAgIGEgPSB3YXNIU0wgPSB2Lm1hdGNoKF9zdHJpY3ROdW1FeHApO1xuXG4gICAgICBpZiAoIXRvSFNMKSB7XG4gICAgICAgIGggPSArYVswXSAlIDM2MCAvIDM2MDtcbiAgICAgICAgcyA9ICthWzFdIC8gMTAwO1xuICAgICAgICBsID0gK2FbMl0gLyAxMDA7XG4gICAgICAgIGcgPSBsIDw9IC41ID8gbCAqIChzICsgMSkgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgICByID0gbCAqIDIgLSBnO1xuICAgICAgICBhLmxlbmd0aCA+IDMgJiYgKGFbM10gKj0gMSk7IC8vY2FzdCBhcyBudW1iZXJcblxuICAgICAgICBhWzBdID0gX2h1ZShoICsgMSAvIDMsIHIsIGcpO1xuICAgICAgICBhWzFdID0gX2h1ZShoLCByLCBnKTtcbiAgICAgICAgYVsyXSA9IF9odWUoaCAtIDEgLyAzLCByLCBnKTtcbiAgICAgIH0gZWxzZSBpZiAofnYuaW5kZXhPZihcIj1cIikpIHtcbiAgICAgICAgLy9pZiByZWxhdGl2ZSB2YWx1ZXMgYXJlIGZvdW5kLCBqdXN0IHJldHVybiB0aGUgcmF3IHN0cmluZ3Mgd2l0aCB0aGUgcmVsYXRpdmUgcHJlZml4ZXMgaW4gcGxhY2UuXG4gICAgICAgIGEgPSB2Lm1hdGNoKF9udW1FeHApO1xuICAgICAgICBmb3JjZUFscGhhICYmIGEubGVuZ3RoIDwgNCAmJiAoYVszXSA9IDEpO1xuICAgICAgICByZXR1cm4gYTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IHYubWF0Y2goX3N0cmljdE51bUV4cCkgfHwgX2NvbG9yTG9va3VwLnRyYW5zcGFyZW50O1xuICAgIH1cblxuICAgIGEgPSBhLm1hcChOdW1iZXIpO1xuICB9XG5cbiAgaWYgKHRvSFNMICYmICF3YXNIU0wpIHtcbiAgICByID0gYVswXSAvIF8yNTU7XG4gICAgZyA9IGFbMV0gLyBfMjU1O1xuICAgIGIgPSBhWzJdIC8gXzI1NTtcbiAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBsID0gKG1heCArIG1pbikgLyAyO1xuXG4gICAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgICBoID0gcyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGQgPSBtYXggLSBtaW47XG4gICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG4gICAgICBoID0gbWF4ID09PSByID8gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCkgOiBtYXggPT09IGcgPyAoYiAtIHIpIC8gZCArIDIgOiAociAtIGcpIC8gZCArIDQ7XG4gICAgICBoICo9IDYwO1xuICAgIH1cblxuICAgIGFbMF0gPSB+fihoICsgLjUpO1xuICAgIGFbMV0gPSB+fihzICogMTAwICsgLjUpO1xuICAgIGFbMl0gPSB+fihsICogMTAwICsgLjUpO1xuICB9XG5cbiAgZm9yY2VBbHBoYSAmJiBhLmxlbmd0aCA8IDQgJiYgKGFbM10gPSAxKTtcbiAgcmV0dXJuIGE7XG59LFxuICAgIF9jb2xvck9yZGVyRGF0YSA9IGZ1bmN0aW9uIF9jb2xvck9yZGVyRGF0YSh2KSB7XG4gIC8vIHN0cmlwcyBvdXQgdGhlIGNvbG9ycyBmcm9tIHRoZSBzdHJpbmcsIGZpbmRzIGFsbCB0aGUgbnVtZXJpYyBzbG90cyAod2l0aCB1bml0cykgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgdGhvc2UuIFRoZSBBcnJheSBhbHNvIGhhcyBhIFwiY1wiIHByb3BlcnR5IHdoaWNoIGlzIGFuIEFycmF5IG9mIHRoZSBpbmRleCB2YWx1ZXMgd2hlcmUgdGhlIGNvbG9ycyBiZWxvbmcuIFRoaXMgaXMgdG8gaGVscCB3b3JrIGFyb3VuZCBpc3N1ZXMgd2hlcmUgdGhlcmUncyBhIG1pcy1tYXRjaGVkIG9yZGVyIG9mIGNvbG9yL251bWVyaWMgZGF0YSBsaWtlIGRyb3Atc2hhZG93KCNmMDAgMHB4IDFweCAycHgpIGFuZCBkcm9wLXNoYWRvdygweCAxcHggMnB4ICNmMDApLiBUaGlzIGlzIGJhc2ljYWxseSBhIGhlbHBlciBmdW5jdGlvbiB1c2VkIGluIF9mb3JtYXRDb2xvcnMoKVxuICB2YXIgdmFsdWVzID0gW10sXG4gICAgICBjID0gW10sXG4gICAgICBpID0gLTE7XG4gIHYuc3BsaXQoX2NvbG9yRXhwKS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgdmFyIGEgPSB2Lm1hdGNoKF9udW1XaXRoVW5pdEV4cCkgfHwgW107XG4gICAgdmFsdWVzLnB1c2guYXBwbHkodmFsdWVzLCBhKTtcbiAgICBjLnB1c2goaSArPSBhLmxlbmd0aCArIDEpO1xuICB9KTtcbiAgdmFsdWVzLmMgPSBjO1xuICByZXR1cm4gdmFsdWVzO1xufSxcbiAgICBfZm9ybWF0Q29sb3JzID0gZnVuY3Rpb24gX2Zvcm1hdENvbG9ycyhzLCB0b0hTTCwgb3JkZXJNYXRjaERhdGEpIHtcbiAgdmFyIHJlc3VsdCA9IFwiXCIsXG4gICAgICBjb2xvcnMgPSAocyArIHJlc3VsdCkubWF0Y2goX2NvbG9yRXhwKSxcbiAgICAgIHR5cGUgPSB0b0hTTCA/IFwiaHNsYShcIiA6IFwicmdiYShcIixcbiAgICAgIGkgPSAwLFxuICAgICAgYyxcbiAgICAgIHNoZWxsLFxuICAgICAgZCxcbiAgICAgIGw7XG5cbiAgaWYgKCFjb2xvcnMpIHtcbiAgICByZXR1cm4gcztcbiAgfVxuXG4gIGNvbG9ycyA9IGNvbG9ycy5tYXAoZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgcmV0dXJuIChjb2xvciA9IHNwbGl0Q29sb3IoY29sb3IsIHRvSFNMLCAxKSkgJiYgdHlwZSArICh0b0hTTCA/IGNvbG9yWzBdICsgXCIsXCIgKyBjb2xvclsxXSArIFwiJSxcIiArIGNvbG9yWzJdICsgXCIlLFwiICsgY29sb3JbM10gOiBjb2xvci5qb2luKFwiLFwiKSkgKyBcIilcIjtcbiAgfSk7XG5cbiAgaWYgKG9yZGVyTWF0Y2hEYXRhKSB7XG4gICAgZCA9IF9jb2xvck9yZGVyRGF0YShzKTtcbiAgICBjID0gb3JkZXJNYXRjaERhdGEuYztcblxuICAgIGlmIChjLmpvaW4ocmVzdWx0KSAhPT0gZC5jLmpvaW4ocmVzdWx0KSkge1xuICAgICAgc2hlbGwgPSBzLnJlcGxhY2UoX2NvbG9yRXhwLCBcIjFcIikuc3BsaXQoX251bVdpdGhVbml0RXhwKTtcbiAgICAgIGwgPSBzaGVsbC5sZW5ndGggLSAxO1xuXG4gICAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gc2hlbGxbaV0gKyAofmMuaW5kZXhPZihpKSA/IGNvbG9ycy5zaGlmdCgpIHx8IHR5cGUgKyBcIjAsMCwwLDApXCIgOiAoZC5sZW5ndGggPyBkIDogY29sb3JzLmxlbmd0aCA/IGNvbG9ycyA6IG9yZGVyTWF0Y2hEYXRhKS5zaGlmdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIXNoZWxsKSB7XG4gICAgc2hlbGwgPSBzLnNwbGl0KF9jb2xvckV4cCk7XG4gICAgbCA9IHNoZWxsLmxlbmd0aCAtIDE7XG5cbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgcmVzdWx0ICs9IHNoZWxsW2ldICsgY29sb3JzW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQgKyBzaGVsbFtsXTtcbn0sXG4gICAgX2NvbG9yRXhwID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcyA9IFwiKD86XFxcXGIoPzooPzpyZ2J8cmdiYXxoc2x8aHNsYSlcXFxcKC4rP1xcXFwpKXxcXFxcQiMoPzpbMC05YS1mXXszfSl7MSwyfVxcXFxiXCIsXG4gICAgICAvL3dlJ2xsIGR5bmFtaWNhbGx5IGJ1aWxkIHRoaXMgUmVndWxhciBFeHByZXNzaW9uIHRvIGNvbnNlcnZlIGZpbGUgc2l6ZS4gQWZ0ZXIgYnVpbGRpbmcgaXQsIGl0IHdpbGwgYmUgYWJsZSB0byBmaW5kIHJnYigpLCByZ2JhKCksICMgKGhleGFkZWNpbWFsKSwgYW5kIG5hbWVkIGNvbG9yIHZhbHVlcyBsaWtlIHJlZCwgYmx1ZSwgcHVycGxlLCBldGMuLFxuICBwO1xuXG4gIGZvciAocCBpbiBfY29sb3JMb29rdXApIHtcbiAgICBzICs9IFwifFwiICsgcCArIFwiXFxcXGJcIjtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVnRXhwKHMgKyBcIilcIiwgXCJnaVwiKTtcbn0oKSxcbiAgICBfaHNsRXhwID0gL2hzbFthXT9cXCgvLFxuICAgIF9jb2xvclN0cmluZ0ZpbHRlciA9IGZ1bmN0aW9uIF9jb2xvclN0cmluZ0ZpbHRlcihhKSB7XG4gIHZhciBjb21iaW5lZCA9IGEuam9pbihcIiBcIiksXG4gICAgICB0b0hTTDtcbiAgX2NvbG9yRXhwLmxhc3RJbmRleCA9IDA7XG5cbiAgaWYgKF9jb2xvckV4cC50ZXN0KGNvbWJpbmVkKSkge1xuICAgIHRvSFNMID0gX2hzbEV4cC50ZXN0KGNvbWJpbmVkKTtcbiAgICBhWzFdID0gX2Zvcm1hdENvbG9ycyhhWzFdLCB0b0hTTCk7XG4gICAgYVswXSA9IF9mb3JtYXRDb2xvcnMoYVswXSwgdG9IU0wsIF9jb2xvck9yZGVyRGF0YShhWzFdKSk7IC8vIG1ha2Ugc3VyZSB0aGUgb3JkZXIgb2YgbnVtYmVycy9jb2xvcnMgbWF0Y2ggd2l0aCB0aGUgRU5EIHZhbHVlLlxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0sXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVElDS0VSXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5fdGlja2VyQWN0aXZlLFxuICAgIF90aWNrZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfZ2V0VGltZSA9IERhdGUubm93LFxuICAgICAgX2xhZ1RocmVzaG9sZCA9IDUwMCxcbiAgICAgIF9hZGp1c3RlZExhZyA9IDMzLFxuICAgICAgX3N0YXJ0VGltZSA9IF9nZXRUaW1lKCksXG4gICAgICBfbGFzdFVwZGF0ZSA9IF9zdGFydFRpbWUsXG4gICAgICBfZ2FwID0gMTAwMCAvIDI0MCxcbiAgICAgIF9uZXh0VGltZSA9IF9nYXAsXG4gICAgICBfbGlzdGVuZXJzID0gW10sXG4gICAgICBfaWQsXG4gICAgICBfcmVxLFxuICAgICAgX3JhZixcbiAgICAgIF9zZWxmLFxuICAgICAgX2RlbHRhLFxuICAgICAgX2ksXG4gICAgICBfdGljayA9IGZ1bmN0aW9uIF90aWNrKHYpIHtcbiAgICB2YXIgZWxhcHNlZCA9IF9nZXRUaW1lKCkgLSBfbGFzdFVwZGF0ZSxcbiAgICAgICAgbWFudWFsID0gdiA9PT0gdHJ1ZSxcbiAgICAgICAgb3ZlcmxhcCxcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGZyYW1lO1xuXG4gICAgZWxhcHNlZCA+IF9sYWdUaHJlc2hvbGQgJiYgKF9zdGFydFRpbWUgKz0gZWxhcHNlZCAtIF9hZGp1c3RlZExhZyk7XG4gICAgX2xhc3RVcGRhdGUgKz0gZWxhcHNlZDtcbiAgICB0aW1lID0gX2xhc3RVcGRhdGUgLSBfc3RhcnRUaW1lO1xuICAgIG92ZXJsYXAgPSB0aW1lIC0gX25leHRUaW1lO1xuXG4gICAgaWYgKG92ZXJsYXAgPiAwIHx8IG1hbnVhbCkge1xuICAgICAgZnJhbWUgPSArK19zZWxmLmZyYW1lO1xuICAgICAgX2RlbHRhID0gdGltZSAtIF9zZWxmLnRpbWUgKiAxMDAwO1xuICAgICAgX3NlbGYudGltZSA9IHRpbWUgPSB0aW1lIC8gMTAwMDtcbiAgICAgIF9uZXh0VGltZSArPSBvdmVybGFwICsgKG92ZXJsYXAgPj0gX2dhcCA/IDQgOiBfZ2FwIC0gb3ZlcmxhcCk7XG4gICAgICBkaXNwYXRjaCA9IDE7XG4gICAgfVxuXG4gICAgbWFudWFsIHx8IChfaWQgPSBfcmVxKF90aWNrKSk7IC8vbWFrZSBzdXJlIHRoZSByZXF1ZXN0IGlzIG1hZGUgYmVmb3JlIHdlIGRpc3BhdGNoIHRoZSBcInRpY2tcIiBldmVudCBzbyB0aGF0IHRpbWluZyBpcyBtYWludGFpbmVkLiBPdGhlcndpc2UsIGlmIHByb2Nlc3NpbmcgdGhlIFwidGlja1wiIHJlcXVpcmVzIGEgYnVuY2ggb2YgdGltZSAobGlrZSAxNW1zKSBhbmQgd2UncmUgdXNpbmcgYSBzZXRUaW1lb3V0KCkgdGhhdCdzIGJhc2VkIG9uIDE2LjdtcywgaXQnZCB0ZWNobmljYWxseSB0YWtlIDMxLjdtcyBiZXR3ZWVuIGZyYW1lcyBvdGhlcndpc2UuXG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IF9saXN0ZW5lcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIC8vIHVzZSBfaSBhbmQgY2hlY2sgX2xpc3RlbmVycy5sZW5ndGggaW5zdGVhZCBvZiBhIHZhcmlhYmxlIGJlY2F1c2UgYSBsaXN0ZW5lciBjb3VsZCBnZXQgcmVtb3ZlZCBkdXJpbmcgdGhlIGxvb3AsIGFuZCBpZiB0aGF0IGhhcHBlbnMgdG8gYW4gZWxlbWVudCBsZXNzIHRoYW4gdGhlIGN1cnJlbnQgaW5kZXgsIGl0J2QgdGhyb3cgdGhpbmdzIG9mZiBpbiB0aGUgbG9vcC5cbiAgICAgICAgX2xpc3RlbmVyc1tfaV0odGltZSwgX2RlbHRhLCBmcmFtZSwgdik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9zZWxmID0ge1xuICAgIHRpbWU6IDAsXG4gICAgZnJhbWU6IDAsXG4gICAgdGljazogZnVuY3Rpb24gdGljaygpIHtcbiAgICAgIF90aWNrKHRydWUpO1xuICAgIH0sXG4gICAgZGVsdGFSYXRpbzogZnVuY3Rpb24gZGVsdGFSYXRpbyhmcHMpIHtcbiAgICAgIHJldHVybiBfZGVsdGEgLyAoMTAwMCAvIChmcHMgfHwgNjApKTtcbiAgICB9LFxuICAgIHdha2U6IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgICBpZiAoX2NvcmVSZWFkeSkge1xuICAgICAgICBpZiAoIV9jb3JlSW5pdHRlZCAmJiBfd2luZG93RXhpc3RzKCkpIHtcbiAgICAgICAgICBfd2luID0gX2NvcmVJbml0dGVkID0gd2luZG93O1xuICAgICAgICAgIF9kb2MgPSBfd2luLmRvY3VtZW50IHx8IHt9O1xuICAgICAgICAgIF9nbG9iYWxzLmdzYXAgPSBnc2FwO1xuICAgICAgICAgIChfd2luLmdzYXBWZXJzaW9ucyB8fCAoX3dpbi5nc2FwVmVyc2lvbnMgPSBbXSkpLnB1c2goZ3NhcC52ZXJzaW9uKTtcblxuICAgICAgICAgIF9pbnN0YWxsKF9pbnN0YWxsU2NvcGUgfHwgX3dpbi5HcmVlblNvY2tHbG9iYWxzIHx8ICFfd2luLmdzYXAgJiYgX3dpbiB8fCB7fSk7XG5cbiAgICAgICAgICBfcmFmID0gX3dpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gICAgICAgIH1cblxuICAgICAgICBfaWQgJiYgX3NlbGYuc2xlZXAoKTtcblxuICAgICAgICBfcmVxID0gX3JhZiB8fCBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGYsIF9uZXh0VGltZSAtIF9zZWxmLnRpbWUgKiAxMDAwICsgMSB8IDApO1xuICAgICAgICB9O1xuXG4gICAgICAgIF90aWNrZXJBY3RpdmUgPSAxO1xuXG4gICAgICAgIF90aWNrKDIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2xlZXA6IGZ1bmN0aW9uIHNsZWVwKCkge1xuICAgICAgKF9yYWYgPyBfd2luLmNhbmNlbEFuaW1hdGlvbkZyYW1lIDogY2xlYXJUaW1lb3V0KShfaWQpO1xuICAgICAgX3RpY2tlckFjdGl2ZSA9IDA7XG4gICAgICBfcmVxID0gX2VtcHR5RnVuYztcbiAgICB9LFxuICAgIGxhZ1Ntb290aGluZzogZnVuY3Rpb24gbGFnU21vb3RoaW5nKHRocmVzaG9sZCwgYWRqdXN0ZWRMYWcpIHtcbiAgICAgIF9sYWdUaHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgMSAvIF90aW55TnVtOyAvL3plcm8gc2hvdWxkIGJlIGludGVycHJldGVkIGFzIGJhc2ljYWxseSB1bmxpbWl0ZWRcblxuICAgICAgX2FkanVzdGVkTGFnID0gTWF0aC5taW4oYWRqdXN0ZWRMYWcsIF9sYWdUaHJlc2hvbGQsIDApO1xuICAgIH0sXG4gICAgZnBzOiBmdW5jdGlvbiBmcHMoX2Zwcykge1xuICAgICAgX2dhcCA9IDEwMDAgLyAoX2ZwcyB8fCAyNDApO1xuICAgICAgX25leHRUaW1lID0gX3NlbGYudGltZSAqIDEwMDAgKyBfZ2FwO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbiBhZGQoY2FsbGJhY2spIHtcbiAgICAgIF9saXN0ZW5lcnMuaW5kZXhPZihjYWxsYmFjaykgPCAwICYmIF9saXN0ZW5lcnMucHVzaChjYWxsYmFjayk7XG5cbiAgICAgIF93YWtlKCk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShjYWxsYmFjaykge1xuICAgICAgdmFyIGk7XG4gICAgICB+KGkgPSBfbGlzdGVuZXJzLmluZGV4T2YoY2FsbGJhY2spKSAmJiBfbGlzdGVuZXJzLnNwbGljZShpLCAxKSAmJiBfaSA+PSBpICYmIF9pLS07XG4gICAgfSxcbiAgICBfbGlzdGVuZXJzOiBfbGlzdGVuZXJzXG4gIH07XG4gIHJldHVybiBfc2VsZjtcbn0oKSxcbiAgICBfd2FrZSA9IGZ1bmN0aW9uIF93YWtlKCkge1xuICByZXR1cm4gIV90aWNrZXJBY3RpdmUgJiYgX3RpY2tlci53YWtlKCk7XG59LFxuICAgIC8vYWxzbyBlbnN1cmVzIHRoZSBjb3JlIGNsYXNzZXMgYXJlIGluaXRpYWxpemVkLlxuXG4vKlxuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qIEVBU0lOR1xuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuX2Vhc2VNYXAgPSB7fSxcbiAgICBfY3VzdG9tRWFzZUV4cCA9IC9eW1xcZC5cXC1NXVtcXGQuXFwtLFxcc10vLFxuICAgIF9xdW90ZXNFeHAgPSAvW1wiJ10vZyxcbiAgICBfcGFyc2VPYmplY3RJblN0cmluZyA9IGZ1bmN0aW9uIF9wYXJzZU9iamVjdEluU3RyaW5nKHZhbHVlKSB7XG4gIC8vdGFrZXMgYSBzdHJpbmcgbGlrZSBcInt3aWdnbGVzOjEwLCB0eXBlOmFudGljaXBhdGV9KVwiIGFuZCB0dXJucyBpdCBpbnRvIGEgcmVhbCBvYmplY3QuIE5vdGljZSBpdCBlbmRzIGluIFwiKVwiIGFuZCBpbmNsdWRlcyB0aGUge30gd3JhcHBlcnMuIFRoaXMgaXMgYmVjYXVzZSB3ZSBvbmx5IHVzZSB0aGlzIGZ1bmN0aW9uIGZvciBwYXJzaW5nIGVhc2UgY29uZmlncyBhbmQgcHJpb3JpdGl6ZWQgb3B0aW1pemF0aW9uIHJhdGhlciB0aGFuIHJldXNhYmlsaXR5LlxuICB2YXIgb2JqID0ge30sXG4gICAgICBzcGxpdCA9IHZhbHVlLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGggLSAzKS5zcGxpdChcIjpcIiksXG4gICAgICBrZXkgPSBzcGxpdFswXSxcbiAgICAgIGkgPSAxLFxuICAgICAgbCA9IHNwbGl0Lmxlbmd0aCxcbiAgICAgIGluZGV4LFxuICAgICAgdmFsLFxuICAgICAgcGFyc2VkVmFsO1xuXG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFsID0gc3BsaXRbaV07XG4gICAgaW5kZXggPSBpICE9PSBsIC0gMSA/IHZhbC5sYXN0SW5kZXhPZihcIixcIikgOiB2YWwubGVuZ3RoO1xuICAgIHBhcnNlZFZhbCA9IHZhbC5zdWJzdHIoMCwgaW5kZXgpO1xuICAgIG9ialtrZXldID0gaXNOYU4ocGFyc2VkVmFsKSA/IHBhcnNlZFZhbC5yZXBsYWNlKF9xdW90ZXNFeHAsIFwiXCIpLnRyaW0oKSA6ICtwYXJzZWRWYWw7XG4gICAga2V5ID0gdmFsLnN1YnN0cihpbmRleCArIDEpLnRyaW0oKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59LFxuICAgIF92YWx1ZUluUGFyZW50aGVzZXMgPSBmdW5jdGlvbiBfdmFsdWVJblBhcmVudGhlc2VzKHZhbHVlKSB7XG4gIHZhciBvcGVuID0gdmFsdWUuaW5kZXhPZihcIihcIikgKyAxLFxuICAgICAgY2xvc2UgPSB2YWx1ZS5pbmRleE9mKFwiKVwiKSxcbiAgICAgIG5lc3RlZCA9IHZhbHVlLmluZGV4T2YoXCIoXCIsIG9wZW4pO1xuICByZXR1cm4gdmFsdWUuc3Vic3RyaW5nKG9wZW4sIH5uZXN0ZWQgJiYgbmVzdGVkIDwgY2xvc2UgPyB2YWx1ZS5pbmRleE9mKFwiKVwiLCBjbG9zZSArIDEpIDogY2xvc2UpO1xufSxcbiAgICBfY29uZmlnRWFzZUZyb21TdHJpbmcgPSBmdW5jdGlvbiBfY29uZmlnRWFzZUZyb21TdHJpbmcobmFtZSkge1xuICAvL25hbWUgY2FuIGJlIGEgc3RyaW5nIGxpa2UgXCJlbGFzdGljLm91dCgxLDAuNSlcIiwgYW5kIHBhc3MgaW4gX2Vhc2VNYXAgYXMgb2JqIGFuZCBpdCdsbCBwYXJzZSBpdCBvdXQgYW5kIGNhbGwgdGhlIGFjdHVhbCBmdW5jdGlvbiBsaWtlIF9lYXNlTWFwLkVsYXN0aWMuZWFzZU91dC5jb25maWcoMSwwLjUpLiBJdCB3aWxsIGFsc28gcGFyc2UgY3VzdG9tIGVhc2Ugc3RyaW5ncyBhcyBsb25nIGFzIEN1c3RvbUVhc2UgaXMgbG9hZGVkIGFuZCByZWdpc3RlcmVkIChpbnRlcm5hbGx5IGFzIF9lYXNlTWFwLl9DRSkuXG4gIHZhciBzcGxpdCA9IChuYW1lICsgXCJcIikuc3BsaXQoXCIoXCIpLFxuICAgICAgZWFzZSA9IF9lYXNlTWFwW3NwbGl0WzBdXTtcbiAgcmV0dXJuIGVhc2UgJiYgc3BsaXQubGVuZ3RoID4gMSAmJiBlYXNlLmNvbmZpZyA/IGVhc2UuY29uZmlnLmFwcGx5KG51bGwsIH5uYW1lLmluZGV4T2YoXCJ7XCIpID8gW19wYXJzZU9iamVjdEluU3RyaW5nKHNwbGl0WzFdKV0gOiBfdmFsdWVJblBhcmVudGhlc2VzKG5hbWUpLnNwbGl0KFwiLFwiKS5tYXAoX251bWVyaWNJZlBvc3NpYmxlKSkgOiBfZWFzZU1hcC5fQ0UgJiYgX2N1c3RvbUVhc2VFeHAudGVzdChuYW1lKSA/IF9lYXNlTWFwLl9DRShcIlwiLCBuYW1lKSA6IGVhc2U7XG59LFxuICAgIF9pbnZlcnRFYXNlID0gZnVuY3Rpb24gX2ludmVydEVhc2UoZWFzZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIGVhc2UoMSAtIHApO1xuICB9O1xufSxcbiAgICAvLyBhbGxvdyB5b3lvRWFzZSB0byBiZSBzZXQgaW4gY2hpbGRyZW4gYW5kIGhhdmUgdGhvc2UgYWZmZWN0ZWQgd2hlbiB0aGUgcGFyZW50L2FuY2VzdG9yIHRpbWVsaW5lIHlveW9zLlxuX3Byb3BhZ2F0ZVlveW9FYXNlID0gZnVuY3Rpb24gX3Byb3BhZ2F0ZVlveW9FYXNlKHRpbWVsaW5lLCBpc1lveW8pIHtcbiAgdmFyIGNoaWxkID0gdGltZWxpbmUuX2ZpcnN0LFxuICAgICAgZWFzZTtcblxuICB3aGlsZSAoY2hpbGQpIHtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUaW1lbGluZSkge1xuICAgICAgX3Byb3BhZ2F0ZVlveW9FYXNlKGNoaWxkLCBpc1lveW8pO1xuICAgIH0gZWxzZSBpZiAoY2hpbGQudmFycy55b3lvRWFzZSAmJiAoIWNoaWxkLl95b3lvIHx8ICFjaGlsZC5fcmVwZWF0KSAmJiBjaGlsZC5feW95byAhPT0gaXNZb3lvKSB7XG4gICAgICBpZiAoY2hpbGQudGltZWxpbmUpIHtcbiAgICAgICAgX3Byb3BhZ2F0ZVlveW9FYXNlKGNoaWxkLnRpbWVsaW5lLCBpc1lveW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWFzZSA9IGNoaWxkLl9lYXNlO1xuICAgICAgICBjaGlsZC5fZWFzZSA9IGNoaWxkLl95RWFzZTtcbiAgICAgICAgY2hpbGQuX3lFYXNlID0gZWFzZTtcbiAgICAgICAgY2hpbGQuX3lveW8gPSBpc1lveW87XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgfVxufSxcbiAgICBfcGFyc2VFYXNlID0gZnVuY3Rpb24gX3BhcnNlRWFzZShlYXNlLCBkZWZhdWx0RWFzZSkge1xuICByZXR1cm4gIWVhc2UgPyBkZWZhdWx0RWFzZSA6IChfaXNGdW5jdGlvbihlYXNlKSA/IGVhc2UgOiBfZWFzZU1hcFtlYXNlXSB8fCBfY29uZmlnRWFzZUZyb21TdHJpbmcoZWFzZSkpIHx8IGRlZmF1bHRFYXNlO1xufSxcbiAgICBfaW5zZXJ0RWFzZSA9IGZ1bmN0aW9uIF9pbnNlcnRFYXNlKG5hbWVzLCBlYXNlSW4sIGVhc2VPdXQsIGVhc2VJbk91dCkge1xuICBpZiAoZWFzZU91dCA9PT0gdm9pZCAwKSB7XG4gICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgICAgcmV0dXJuIDEgLSBlYXNlSW4oMSAtIHApO1xuICAgIH07XG4gIH1cblxuICBpZiAoZWFzZUluT3V0ID09PSB2b2lkIDApIHtcbiAgICBlYXNlSW5PdXQgPSBmdW5jdGlvbiBlYXNlSW5PdXQocCkge1xuICAgICAgcmV0dXJuIHAgPCAuNSA/IGVhc2VJbihwICogMikgLyAyIDogMSAtIGVhc2VJbigoMSAtIHApICogMikgLyAyO1xuICAgIH07XG4gIH1cblxuICB2YXIgZWFzZSA9IHtcbiAgICBlYXNlSW46IGVhc2VJbixcbiAgICBlYXNlT3V0OiBlYXNlT3V0LFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0XG4gIH0sXG4gICAgICBsb3dlcmNhc2VOYW1lO1xuXG4gIF9mb3JFYWNoTmFtZShuYW1lcywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBfZWFzZU1hcFtuYW1lXSA9IF9nbG9iYWxzW25hbWVdID0gZWFzZTtcbiAgICBfZWFzZU1hcFtsb3dlcmNhc2VOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGVhc2VPdXQ7XG5cbiAgICBmb3IgKHZhciBwIGluIGVhc2UpIHtcbiAgICAgIF9lYXNlTWFwW2xvd2VyY2FzZU5hbWUgKyAocCA9PT0gXCJlYXNlSW5cIiA/IFwiLmluXCIgOiBwID09PSBcImVhc2VPdXRcIiA/IFwiLm91dFwiIDogXCIuaW5PdXRcIildID0gX2Vhc2VNYXBbbmFtZSArIFwiLlwiICsgcF0gPSBlYXNlW3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVhc2U7XG59LFxuICAgIF9lYXNlSW5PdXRGcm9tT3V0ID0gZnVuY3Rpb24gX2Vhc2VJbk91dEZyb21PdXQoZWFzZU91dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gcCA8IC41ID8gKDEgLSBlYXNlT3V0KDEgLSBwICogMikpIC8gMiA6IC41ICsgZWFzZU91dCgocCAtIC41KSAqIDIpIC8gMjtcbiAgfTtcbn0sXG4gICAgX2NvbmZpZ0VsYXN0aWMgPSBmdW5jdGlvbiBfY29uZmlnRWxhc3RpYyh0eXBlLCBhbXBsaXR1ZGUsIHBlcmlvZCkge1xuICB2YXIgcDEgPSBhbXBsaXR1ZGUgPj0gMSA/IGFtcGxpdHVkZSA6IDEsXG4gICAgICAvL25vdGU6IGlmIGFtcGxpdHVkZSBpcyA8IDEsIHdlIHNpbXBseSBhZGp1c3QgdGhlIHBlcmlvZCBmb3IgYSBtb3JlIG5hdHVyYWwgZmVlbC4gT3RoZXJ3aXNlIHRoZSBtYXRoIGRvZXNuJ3Qgd29yayByaWdodCBhbmQgdGhlIGN1cnZlIHN0YXJ0cyBhdCAxLlxuICBwMiA9IChwZXJpb2QgfHwgKHR5cGUgPyAuMyA6IC40NSkpIC8gKGFtcGxpdHVkZSA8IDEgPyBhbXBsaXR1ZGUgOiAxKSxcbiAgICAgIHAzID0gcDIgLyBfMlBJICogKE1hdGguYXNpbigxIC8gcDEpIHx8IDApLFxuICAgICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgIHJldHVybiBwID09PSAxID8gMSA6IHAxICogTWF0aC5wb3coMiwgLTEwICogcCkgKiBfc2luKChwIC0gcDMpICogcDIpICsgMTtcbiAgfSxcbiAgICAgIGVhc2UgPSB0eXBlID09PSBcIm91dFwiID8gZWFzZU91dCA6IHR5cGUgPT09IFwiaW5cIiA/IGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIDEgLSBlYXNlT3V0KDEgLSBwKTtcbiAgfSA6IF9lYXNlSW5PdXRGcm9tT3V0KGVhc2VPdXQpO1xuXG4gIHAyID0gXzJQSSAvIHAyOyAvL3ByZWNhbGN1bGF0ZSB0byBvcHRpbWl6ZVxuXG4gIGVhc2UuY29uZmlnID0gZnVuY3Rpb24gKGFtcGxpdHVkZSwgcGVyaW9kKSB7XG4gICAgcmV0dXJuIF9jb25maWdFbGFzdGljKHR5cGUsIGFtcGxpdHVkZSwgcGVyaW9kKTtcbiAgfTtcblxuICByZXR1cm4gZWFzZTtcbn0sXG4gICAgX2NvbmZpZ0JhY2sgPSBmdW5jdGlvbiBfY29uZmlnQmFjayh0eXBlLCBvdmVyc2hvb3QpIHtcbiAgaWYgKG92ZXJzaG9vdCA9PT0gdm9pZCAwKSB7XG4gICAgb3ZlcnNob290ID0gMS43MDE1ODtcbiAgfVxuXG4gIHZhciBlYXNlT3V0ID0gZnVuY3Rpb24gZWFzZU91dChwKSB7XG4gICAgcmV0dXJuIHAgPyAtLXAgKiBwICogKChvdmVyc2hvb3QgKyAxKSAqIHAgKyBvdmVyc2hvb3QpICsgMSA6IDA7XG4gIH0sXG4gICAgICBlYXNlID0gdHlwZSA9PT0gXCJvdXRcIiA/IGVhc2VPdXQgOiB0eXBlID09PSBcImluXCIgPyBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAxIC0gZWFzZU91dCgxIC0gcCk7XG4gIH0gOiBfZWFzZUluT3V0RnJvbU91dChlYXNlT3V0KTtcblxuICBlYXNlLmNvbmZpZyA9IGZ1bmN0aW9uIChvdmVyc2hvb3QpIHtcbiAgICByZXR1cm4gX2NvbmZpZ0JhY2sodHlwZSwgb3ZlcnNob290KTtcbiAgfTtcblxuICByZXR1cm4gZWFzZTtcbn07IC8vIGEgY2hlYXBlciAoa2IgYW5kIGNwdSkgYnV0IG1vcmUgbWlsZCB3YXkgdG8gZ2V0IGEgcGFyYW1ldGVyaXplZCB3ZWlnaHRlZCBlYXNlIGJ5IGZlZWRpbmcgaW4gYSB2YWx1ZSBiZXR3ZWVuIC0xIChlYXNlSW4pIGFuZCAxIChlYXNlT3V0KSB3aGVyZSAwIGlzIGxpbmVhci5cbi8vIF93ZWlnaHRlZEVhc2UgPSByYXRpbyA9PiB7XG4vLyBcdGxldCB5ID0gMC41ICsgcmF0aW8gLyAyO1xuLy8gXHRyZXR1cm4gcCA9PiAoMiAqICgxIC0gcCkgKiBwICogeSArIHAgKiBwKTtcbi8vIH0sXG4vLyBhIHN0cm9uZ2VyIChidXQgbW9yZSBleHBlbnNpdmUga2IvY3B1KSBwYXJhbWV0ZXJpemVkIHdlaWdodGVkIGVhc2UgdGhhdCBsZXRzIHlvdSBmZWVkIGluIGEgdmFsdWUgYmV0d2VlbiAtMSAoZWFzZUluKSBhbmQgMSAoZWFzZU91dCkgd2hlcmUgMCBpcyBsaW5lYXIuXG4vLyBfd2VpZ2h0ZWRFYXNlU3Ryb25nID0gcmF0aW8gPT4ge1xuLy8gXHRyYXRpbyA9IC41ICsgcmF0aW8gLyAyO1xuLy8gXHRsZXQgbyA9IDEgLyAzICogKHJhdGlvIDwgLjUgPyByYXRpbyA6IDEgLSByYXRpbyksXG4vLyBcdFx0YiA9IHJhdGlvIC0gbyxcbi8vIFx0XHRjID0gcmF0aW8gKyBvO1xuLy8gXHRyZXR1cm4gcCA9PiBwID09PSAxID8gcCA6IDMgKiBiICogKDEgLSBwKSAqICgxIC0gcCkgKiBwICsgMyAqIGMgKiAoMSAtIHApICogcCAqIHAgKyBwICogcCAqIHA7XG4vLyB9O1xuXG5cbl9mb3JFYWNoTmFtZShcIkxpbmVhcixRdWFkLEN1YmljLFF1YXJ0LFF1aW50LFN0cm9uZ1wiLCBmdW5jdGlvbiAobmFtZSwgaSkge1xuICB2YXIgcG93ZXIgPSBpIDwgNSA/IGkgKyAxIDogaTtcblxuICBfaW5zZXJ0RWFzZShuYW1lICsgXCIsUG93ZXJcIiArIChwb3dlciAtIDEpLCBpID8gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gTWF0aC5wb3cocCwgcG93ZXIpO1xuICB9IDogZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gcDtcbiAgfSwgZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KDEgLSBwLCBwb3dlcik7XG4gIH0sIGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIHAgPCAuNSA/IE1hdGgucG93KHAgKiAyLCBwb3dlcikgLyAyIDogMSAtIE1hdGgucG93KCgxIC0gcCkgKiAyLCBwb3dlcikgLyAyO1xuICB9KTtcbn0pO1xuXG5fZWFzZU1hcC5MaW5lYXIuZWFzZU5vbmUgPSBfZWFzZU1hcC5ub25lID0gX2Vhc2VNYXAuTGluZWFyLmVhc2VJbjtcblxuX2luc2VydEVhc2UoXCJFbGFzdGljXCIsIF9jb25maWdFbGFzdGljKFwiaW5cIiksIF9jb25maWdFbGFzdGljKFwib3V0XCIpLCBfY29uZmlnRWxhc3RpYygpKTtcblxuKGZ1bmN0aW9uIChuLCBjKSB7XG4gIHZhciBuMSA9IDEgLyBjLFxuICAgICAgbjIgPSAyICogbjEsXG4gICAgICBuMyA9IDIuNSAqIG4xLFxuICAgICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgIHJldHVybiBwIDwgbjEgPyBuICogcCAqIHAgOiBwIDwgbjIgPyBuICogTWF0aC5wb3cocCAtIDEuNSAvIGMsIDIpICsgLjc1IDogcCA8IG4zID8gbiAqIChwIC09IDIuMjUgLyBjKSAqIHAgKyAuOTM3NSA6IG4gKiBNYXRoLnBvdyhwIC0gMi42MjUgLyBjLCAyKSArIC45ODQzNzU7XG4gIH07XG5cbiAgX2luc2VydEVhc2UoXCJCb3VuY2VcIiwgZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIGVhc2VPdXQoMSAtIHApO1xuICB9LCBlYXNlT3V0KTtcbn0pKDcuNTYyNSwgMi43NSk7XG5cbl9pbnNlcnRFYXNlKFwiRXhwb1wiLCBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gcCA/IE1hdGgucG93KDIsIDEwICogKHAgLSAxKSkgOiAwO1xufSk7XG5cbl9pbnNlcnRFYXNlKFwiQ2lyY1wiLCBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gLShfc3FydCgxIC0gcCAqIHApIC0gMSk7XG59KTtcblxuX2luc2VydEVhc2UoXCJTaW5lXCIsIGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiBwID09PSAxID8gMSA6IC1fY29zKHAgKiBfSEFMRl9QSSkgKyAxO1xufSk7XG5cbl9pbnNlcnRFYXNlKFwiQmFja1wiLCBfY29uZmlnQmFjayhcImluXCIpLCBfY29uZmlnQmFjayhcIm91dFwiKSwgX2NvbmZpZ0JhY2soKSk7XG5cbl9lYXNlTWFwLlN0ZXBwZWRFYXNlID0gX2Vhc2VNYXAuc3RlcHMgPSBfZ2xvYmFscy5TdGVwcGVkRWFzZSA9IHtcbiAgY29uZmlnOiBmdW5jdGlvbiBjb25maWcoc3RlcHMsIGltbWVkaWF0ZVN0YXJ0KSB7XG4gICAgaWYgKHN0ZXBzID09PSB2b2lkIDApIHtcbiAgICAgIHN0ZXBzID0gMTtcbiAgICB9XG5cbiAgICB2YXIgcDEgPSAxIC8gc3RlcHMsXG4gICAgICAgIHAyID0gc3RlcHMgKyAoaW1tZWRpYXRlU3RhcnQgPyAwIDogMSksXG4gICAgICAgIHAzID0gaW1tZWRpYXRlU3RhcnQgPyAxIDogMCxcbiAgICAgICAgbWF4ID0gMSAtIF90aW55TnVtO1xuICAgIHJldHVybiBmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuICgocDIgKiBfY2xhbXAoMCwgbWF4LCBwKSB8IDApICsgcDMpICogcDE7XG4gICAgfTtcbiAgfVxufTtcbl9kZWZhdWx0cy5lYXNlID0gX2Vhc2VNYXBbXCJxdWFkLm91dFwiXTtcblxuX2ZvckVhY2hOYW1lKFwib25Db21wbGV0ZSxvblVwZGF0ZSxvblN0YXJ0LG9uUmVwZWF0LG9uUmV2ZXJzZUNvbXBsZXRlLG9uSW50ZXJydXB0XCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBfY2FsbGJhY2tOYW1lcyArPSBuYW1lICsgXCIsXCIgKyBuYW1lICsgXCJQYXJhbXMsXCI7XG59KTtcbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ0FDSEVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG5leHBvcnQgdmFyIEdTQ2FjaGUgPSBmdW5jdGlvbiBHU0NhY2hlKHRhcmdldCwgaGFybmVzcykge1xuICB0aGlzLmlkID0gX2dzSUQrKztcbiAgdGFyZ2V0Ll9nc2FwID0gdGhpcztcbiAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIHRoaXMuaGFybmVzcyA9IGhhcm5lc3M7XG4gIHRoaXMuZ2V0ID0gaGFybmVzcyA/IGhhcm5lc3MuZ2V0IDogX2dldFByb3BlcnR5O1xuICB0aGlzLnNldCA9IGhhcm5lc3MgPyBoYXJuZXNzLmdldFNldHRlciA6IF9nZXRTZXR0ZXI7XG59O1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBTklNQVRJT05cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZXhwb3J0IHZhciBBbmltYXRpb24gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBbmltYXRpb24odmFycywgdGltZSkge1xuICAgIHZhciBwYXJlbnQgPSB2YXJzLnBhcmVudCB8fCBfZ2xvYmFsVGltZWxpbmU7XG4gICAgdGhpcy52YXJzID0gdmFycztcbiAgICB0aGlzLl9kZWxheSA9ICt2YXJzLmRlbGF5IHx8IDA7XG5cbiAgICBpZiAodGhpcy5fcmVwZWF0ID0gdmFycy5yZXBlYXQgfHwgMCkge1xuICAgICAgdGhpcy5fckRlbGF5ID0gdmFycy5yZXBlYXREZWxheSB8fCAwO1xuICAgICAgdGhpcy5feW95byA9ICEhdmFycy55b3lvIHx8ICEhdmFycy55b3lvRWFzZTtcbiAgICB9XG5cbiAgICB0aGlzLl90cyA9IDE7XG5cbiAgICBfc2V0RHVyYXRpb24odGhpcywgK3ZhcnMuZHVyYXRpb24sIDEsIDEpO1xuXG4gICAgdGhpcy5kYXRhID0gdmFycy5kYXRhO1xuICAgIF90aWNrZXJBY3RpdmUgfHwgX3RpY2tlci53YWtlKCk7XG4gICAgcGFyZW50ICYmIF9hZGRUb1RpbWVsaW5lKHBhcmVudCwgdGhpcywgdGltZSB8fCB0aW1lID09PSAwID8gdGltZSA6IHBhcmVudC5fdGltZSwgMSk7XG4gICAgdmFycy5yZXZlcnNlZCAmJiB0aGlzLnJldmVyc2UoKTtcbiAgICB2YXJzLnBhdXNlZCAmJiB0aGlzLnBhdXNlZCh0cnVlKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBBbmltYXRpb24ucHJvdG90eXBlO1xuXG4gIF9wcm90by5kZWxheSA9IGZ1bmN0aW9uIGRlbGF5KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5zbW9vdGhDaGlsZFRpbWluZyAmJiB0aGlzLnN0YXJ0VGltZSh0aGlzLl9zdGFydCArIHZhbHVlIC0gdGhpcy5fZGVsYXkpO1xuICAgICAgdGhpcy5fZGVsYXkgPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9kZWxheTtcbiAgfTtcblxuICBfcHJvdG8uZHVyYXRpb24gPSBmdW5jdGlvbiBkdXJhdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy50b3RhbER1cmF0aW9uKHRoaXMuX3JlcGVhdCA+IDAgPyB2YWx1ZSArICh2YWx1ZSArIHRoaXMuX3JEZWxheSkgKiB0aGlzLl9yZXBlYXQgOiB2YWx1ZSkgOiB0aGlzLnRvdGFsRHVyYXRpb24oKSAmJiB0aGlzLl9kdXI7XG4gIH07XG5cbiAgX3Byb3RvLnRvdGFsRHVyYXRpb24gPSBmdW5jdGlvbiB0b3RhbER1cmF0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdER1cjtcbiAgICB9XG5cbiAgICB0aGlzLl9kaXJ0eSA9IDA7XG4gICAgcmV0dXJuIF9zZXREdXJhdGlvbih0aGlzLCB0aGlzLl9yZXBlYXQgPCAwID8gdmFsdWUgOiAodmFsdWUgLSB0aGlzLl9yZXBlYXQgKiB0aGlzLl9yRGVsYXkpIC8gKHRoaXMuX3JlcGVhdCArIDEpKTtcbiAgfTtcblxuICBfcHJvdG8udG90YWxUaW1lID0gZnVuY3Rpb24gdG90YWxUaW1lKF90b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgX3dha2UoKTtcblxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RUaW1lO1xuICAgIH1cblxuICAgIHZhciBwYXJlbnQgPSB0aGlzLl9kcDtcblxuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LnNtb290aENoaWxkVGltaW5nICYmIHRoaXMuX3RzKSB7XG4gICAgICBfYWxpZ25QbGF5aGVhZCh0aGlzLCBfdG90YWxUaW1lKTsgLy9pbiBjYXNlIGFueSBvZiB0aGUgYW5jZXN0b3IgdGltZWxpbmVzIGhhZCBjb21wbGV0ZWQgYnV0IHNob3VsZCBub3cgYmUgZW5hYmxlZCwgd2Ugc2hvdWxkIHJlc2V0IHRoZWlyIHRvdGFsVGltZSgpIHdoaWNoIHdpbGwgYWxzbyBlbnN1cmUgdGhhdCB0aGV5J3JlIGxpbmVkIHVwIHByb3Blcmx5IGFuZCBlbmFibGVkLiBTa2lwIGZvciBhbmltYXRpb25zIHRoYXQgYXJlIG9uIHRoZSByb290ICh3YXN0ZWZ1bCkuIEV4YW1wbGU6IGEgVGltZWxpbmVMaXRlLmV4cG9ydFJvb3QoKSBpcyBwZXJmb3JtZWQgd2hlbiB0aGVyZSdzIGEgcGF1c2VkIHR3ZWVuIG9uIHRoZSByb290LCB0aGUgZXhwb3J0IHdpbGwgbm90IGNvbXBsZXRlIHVudGlsIHRoYXQgdHdlZW4gaXMgdW5wYXVzZWQsIGJ1dCBpbWFnaW5lIGEgY2hpbGQgZ2V0cyByZXN0YXJ0ZWQgbGF0ZXIsIGFmdGVyIGFsbCBbdW5wYXVzZWRdIHR3ZWVucyBoYXZlIGNvbXBsZXRlZC4gVGhlIHN0YXJ0IG9mIHRoYXQgY2hpbGQgd291bGQgZ2V0IHB1c2hlZCBvdXQsIGJ1dCBvbmUgb2YgdGhlIGFuY2VzdG9ycyBtYXkgaGF2ZSBjb21wbGV0ZWQuXG5cblxuICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudC5wYXJlbnQuX3RpbWUgIT09IHBhcmVudC5fc3RhcnQgKyAocGFyZW50Ll90cyA+PSAwID8gcGFyZW50Ll90VGltZSAvIHBhcmVudC5fdHMgOiAocGFyZW50LnRvdGFsRHVyYXRpb24oKSAtIHBhcmVudC5fdFRpbWUpIC8gLXBhcmVudC5fdHMpKSB7XG4gICAgICAgICAgcGFyZW50LnRvdGFsVGltZShwYXJlbnQuX3RUaW1lLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wYXJlbnQgJiYgdGhpcy5fZHAuYXV0b1JlbW92ZUNoaWxkcmVuICYmICh0aGlzLl90cyA+IDAgJiYgX3RvdGFsVGltZSA8IHRoaXMuX3REdXIgfHwgdGhpcy5fdHMgPCAwICYmIF90b3RhbFRpbWUgPiAwIHx8ICF0aGlzLl90RHVyICYmICFfdG90YWxUaW1lKSkge1xuICAgICAgICAvL2lmIHRoZSBhbmltYXRpb24gZG9lc24ndCBoYXZlIGEgcGFyZW50LCBwdXQgaXQgYmFjayBpbnRvIGl0cyBsYXN0IHBhcmVudCAocmVjb3JkZWQgYXMgX2RwIGZvciBleGFjdGx5IGNhc2VzIGxpa2UgdGhpcykuIExpbWl0IHRvIHBhcmVudHMgd2l0aCBhdXRvUmVtb3ZlQ2hpbGRyZW4gKGxpa2UgZ2xvYmFsVGltZWxpbmUpIHNvIHRoYXQgaWYgdGhlIHVzZXIgbWFudWFsbHkgcmVtb3ZlcyBhbiBhbmltYXRpb24gZnJvbSBhIHRpbWVsaW5lIGFuZCB0aGVuIGFsdGVycyBpdHMgcGxheWhlYWQsIGl0IGRvZXNuJ3QgZ2V0IGFkZGVkIGJhY2sgaW4uXG4gICAgICAgIF9hZGRUb1RpbWVsaW5lKHRoaXMuX2RwLCB0aGlzLCB0aGlzLl9zdGFydCAtIHRoaXMuX2RlbGF5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdFRpbWUgIT09IF90b3RhbFRpbWUgfHwgIXRoaXMuX2R1ciAmJiAhc3VwcHJlc3NFdmVudHMgfHwgdGhpcy5faW5pdHRlZCAmJiBNYXRoLmFicyh0aGlzLl96VGltZSkgPT09IF90aW55TnVtIHx8ICFfdG90YWxUaW1lICYmICF0aGlzLl9pbml0dGVkICYmICh0aGlzLmFkZCB8fCB0aGlzLl9wdExvb2t1cCkpIHtcbiAgICAgIC8vIGNoZWNrIGZvciBfcHRMb29rdXAgb24gYSBUd2VlbiBpbnN0YW5jZSB0byBlbnN1cmUgaXQgaGFzIGFjdHVhbGx5IGZpbmlzaGVkIGJlaW5nIGluc3RhbnRpYXRlZCwgb3RoZXJ3aXNlIGlmIHRoaXMucmV2ZXJzZSgpIGdldHMgY2FsbGVkIGluIHRoZSBBbmltYXRpb24gY29uc3RydWN0b3IsIGl0IGNvdWxkIHRyaWdnZXIgYSByZW5kZXIoKSBoZXJlIGV2ZW4gdGhvdWdoIHRoZSBfdGFyZ2V0cyB3ZXJlbid0IHBvcHVsYXRlZCwgdGh1cyB3aGVuIF9pbml0KCkgaXMgY2FsbGVkIHRoZXJlIHdvbid0IGJlIGFueSBQcm9wVHdlZW5zIChpdCdsbCBhY3QgbGlrZSB0aGUgdHdlZW4gaXMgbm9uLWZ1bmN0aW9uYWwpXG4gICAgICB0aGlzLl90cyB8fCAodGhpcy5fcFRpbWUgPSBfdG90YWxUaW1lKTsgLy8gb3RoZXJ3aXNlLCBpZiBhbiBhbmltYXRpb24gaXMgcGF1c2VkLCB0aGVuIHRoZSBwbGF5aGVhZCBpcyBtb3ZlZCBiYWNrIHRvIHplcm8sIHRoZW4gcmVzdW1lZCwgaXQnZCByZXZlcnQgYmFjayB0byB0aGUgb3JpZ2luYWwgdGltZSBhdCB0aGUgcGF1c2VcblxuICAgICAgX2xhenlTYWZlUmVuZGVyKHRoaXMsIF90b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8udGltZSA9IGZ1bmN0aW9uIHRpbWUodmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRvdGFsVGltZShNYXRoLm1pbih0aGlzLnRvdGFsRHVyYXRpb24oKSwgdmFsdWUgKyBfZWxhcHNlZEN5Y2xlRHVyYXRpb24odGhpcykpICUgdGhpcy5fZHVyIHx8ICh2YWx1ZSA/IHRoaXMuX2R1ciA6IDApLCBzdXBwcmVzc0V2ZW50cykgOiB0aGlzLl90aW1lOyAvLyBub3RlOiBpZiB0aGUgbW9kdWx1cyByZXN1bHRzIGluIDAsIHRoZSBwbGF5aGVhZCBjb3VsZCBiZSBleGFjdGx5IGF0IHRoZSBlbmQgb3IgdGhlIGJlZ2lubmluZywgYW5kIHdlIGFsd2F5cyBkZWZlciB0byB0aGUgRU5EIHdpdGggYSBub24temVybyB2YWx1ZSwgb3RoZXJ3aXNlIGlmIHlvdSBzZXQgdGhlIHRpbWUoKSB0byB0aGUgdmVyeSBlbmQgKGR1cmF0aW9uKCkpLCBpdCB3b3VsZCByZW5kZXIgYXQgdGhlIFNUQVJUIVxuICB9O1xuXG4gIF9wcm90by50b3RhbFByb2dyZXNzID0gZnVuY3Rpb24gdG90YWxQcm9ncmVzcyh2YWx1ZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxUaW1lKHRoaXMudG90YWxEdXJhdGlvbigpICogdmFsdWUsIHN1cHByZXNzRXZlbnRzKSA6IHRoaXMudG90YWxEdXJhdGlvbigpID8gTWF0aC5taW4oMSwgdGhpcy5fdFRpbWUgLyB0aGlzLl90RHVyKSA6IHRoaXMucmF0aW87XG4gIH07XG5cbiAgX3Byb3RvLnByb2dyZXNzID0gZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRvdGFsVGltZSh0aGlzLmR1cmF0aW9uKCkgKiAodGhpcy5feW95byAmJiAhKHRoaXMuaXRlcmF0aW9uKCkgJiAxKSA/IDEgLSB2YWx1ZSA6IHZhbHVlKSArIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbih0aGlzKSwgc3VwcHJlc3NFdmVudHMpIDogdGhpcy5kdXJhdGlvbigpID8gTWF0aC5taW4oMSwgdGhpcy5fdGltZSAvIHRoaXMuX2R1cikgOiB0aGlzLnJhdGlvO1xuICB9O1xuXG4gIF9wcm90by5pdGVyYXRpb24gPSBmdW5jdGlvbiBpdGVyYXRpb24odmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgdmFyIGN5Y2xlRHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uKCkgKyB0aGlzLl9yRGVsYXk7XG5cbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxUaW1lKHRoaXMuX3RpbWUgKyAodmFsdWUgLSAxKSAqIGN5Y2xlRHVyYXRpb24sIHN1cHByZXNzRXZlbnRzKSA6IHRoaXMuX3JlcGVhdCA/IF9hbmltYXRpb25DeWNsZSh0aGlzLl90VGltZSwgY3ljbGVEdXJhdGlvbikgKyAxIDogMTtcbiAgfSAvLyBwb3RlbnRpYWwgZnV0dXJlIGFkZGl0aW9uOlxuICAvLyBpc1BsYXlpbmdCYWNrd2FyZHMoKSB7XG4gIC8vIFx0bGV0IGFuaW1hdGlvbiA9IHRoaXMsXG4gIC8vIFx0XHRvcmllbnRhdGlvbiA9IDE7IC8vIDEgPSBmb3J3YXJkLCAtMSA9IGJhY2t3YXJkXG4gIC8vIFx0d2hpbGUgKGFuaW1hdGlvbikge1xuICAvLyBcdFx0b3JpZW50YXRpb24gKj0gYW5pbWF0aW9uLnJldmVyc2VkKCkgfHwgKGFuaW1hdGlvbi5yZXBlYXQoKSAmJiAhKGFuaW1hdGlvbi5pdGVyYXRpb24oKSAmIDEpKSA/IC0xIDogMTtcbiAgLy8gXHRcdGFuaW1hdGlvbiA9IGFuaW1hdGlvbi5wYXJlbnQ7XG4gIC8vIFx0fVxuICAvLyBcdHJldHVybiBvcmllbnRhdGlvbiA8IDA7XG4gIC8vIH1cbiAgO1xuXG4gIF9wcm90by50aW1lU2NhbGUgPSBmdW5jdGlvbiB0aW1lU2NhbGUodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydHMgPT09IC1fdGlueU51bSA/IDAgOiB0aGlzLl9ydHM7IC8vIHJlY29yZGVkIHRpbWVTY2FsZS4gU3BlY2lhbCBjYXNlOiBpZiBzb21lb25lIGNhbGxzIHJldmVyc2UoKSBvbiBhbiBhbmltYXRpb24gd2l0aCB0aW1lU2NhbGUgb2YgMCwgd2UgYXNzaWduIGl0IC1fdGlueU51bSB0byByZW1lbWJlciBpdCdzIHJldmVyc2VkLlxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ydHMgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgdFRpbWUgPSB0aGlzLnBhcmVudCAmJiB0aGlzLl90cyA/IF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHRoaXMucGFyZW50Ll90aW1lLCB0aGlzKSA6IHRoaXMuX3RUaW1lOyAvLyBtYWtlIHN1cmUgdG8gZG8gdGhlIHBhcmVudFRvQ2hpbGRUb3RhbFRpbWUoKSBCRUZPUkUgc2V0dGluZyB0aGUgbmV3IF90cyBiZWNhdXNlIHRoZSBvbGQgb25lIG11c3QgYmUgdXNlZCBpbiB0aGF0IGNhbGN1bGF0aW9uLlxuICAgIC8vIHByaW9yaXRpemUgcmVuZGVyaW5nIHdoZXJlIHRoZSBwYXJlbnQncyBwbGF5aGVhZCBsaW5lcyB1cCBpbnN0ZWFkIG9mIHRoaXMuX3RUaW1lIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgYSB0d2VlbiB0aGF0J3MgYW5pbWF0aW5nIGFub3RoZXIgdHdlZW4ncyB0aW1lU2NhbGUgaW4gdGhlIHNhbWUgcmVuZGVyaW5nIGxvb3AgKHNhbWUgcGFyZW50KSwgdGh1cyBpZiB0aGUgdGltZVNjYWxlIHR3ZWVuIHJlbmRlcnMgZmlyc3QsIGl0IHdvdWxkIGFsdGVyIF9zdGFydCBCRUZPUkUgX3RUaW1lIHdhcyBzZXQgb24gdGhhdCB0aWNrIChpbiB0aGUgcmVuZGVyaW5nIGxvb3ApLCBlZmZlY3RpdmVseSBmcmVlemluZyBpdCB1bnRpbCB0aGUgdGltZVNjYWxlIHR3ZWVuIGZpbmlzaGVzLlxuXG4gICAgdGhpcy5fcnRzID0gK3ZhbHVlIHx8IDA7XG4gICAgdGhpcy5fdHMgPSB0aGlzLl9wcyB8fCB2YWx1ZSA9PT0gLV90aW55TnVtID8gMCA6IHRoaXMuX3J0czsgLy8gX3RzIGlzIHRoZSBmdW5jdGlvbmFsIHRpbWVTY2FsZSB3aGljaCB3b3VsZCBiZSAwIGlmIHRoZSBhbmltYXRpb24gaXMgcGF1c2VkLlxuXG4gICAgcmV0dXJuIF9yZWNhY2hlQW5jZXN0b3JzKHRoaXMudG90YWxUaW1lKF9jbGFtcCgtdGhpcy5fZGVsYXksIHRoaXMuX3REdXIsIHRUaW1lKSwgdHJ1ZSkpO1xuICB9O1xuXG4gIF9wcm90by5wYXVzZWQgPSBmdW5jdGlvbiBwYXVzZWQodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcHMgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9wcyA9IHZhbHVlO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcFRpbWUgPSB0aGlzLl90VGltZSB8fCBNYXRoLm1heCgtdGhpcy5fZGVsYXksIHRoaXMucmF3VGltZSgpKTsgLy8gaWYgdGhlIHBhdXNlIG9jY3VycyBkdXJpbmcgdGhlIGRlbGF5IHBoYXNlLCBtYWtlIHN1cmUgdGhhdCdzIGZhY3RvcmVkIGluIHdoZW4gcmVzdW1pbmcuXG5cbiAgICAgICAgdGhpcy5fdHMgPSB0aGlzLl9hY3QgPSAwOyAvLyBfdHMgaXMgdGhlIGZ1bmN0aW9uYWwgdGltZVNjYWxlLCBzbyBhIHBhdXNlZCB0d2VlbiB3b3VsZCBlZmZlY3RpdmVseSBoYXZlIGEgdGltZVNjYWxlIG9mIDAuIFdlIHJlY29yZCB0aGUgXCJyZWFsXCIgdGltZVNjYWxlIGFzIF9ydHMgKHJlY29yZGVkIHRpbWUgc2NhbGUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfd2FrZSgpO1xuXG4gICAgICAgIHRoaXMuX3RzID0gdGhpcy5fcnRzOyAvL29ubHkgZGVmZXIgdG8gX3BUaW1lIChwYXVzZVRpbWUpIGlmIHRUaW1lIGlzIHplcm8uIFJlbWVtYmVyLCBzb21lb25lIGNvdWxkIHBhdXNlKCkgYW4gYW5pbWF0aW9uLCB0aGVuIHNjcnViIHRoZSBwbGF5aGVhZCBhbmQgcmVzdW1lKCkuIElmIHRoZSBwYXJlbnQgZG9lc24ndCBoYXZlIHNtb290aENoaWxkVGltaW5nLCB3ZSByZW5kZXIgYXQgdGhlIHJhd1RpbWUoKSBiZWNhdXNlIHRoZSBzdGFydFRpbWUgd29uJ3QgZ2V0IHVwZGF0ZWQuXG5cbiAgICAgICAgdGhpcy50b3RhbFRpbWUodGhpcy5wYXJlbnQgJiYgIXRoaXMucGFyZW50LnNtb290aENoaWxkVGltaW5nID8gdGhpcy5yYXdUaW1lKCkgOiB0aGlzLl90VGltZSB8fCB0aGlzLl9wVGltZSwgdGhpcy5wcm9ncmVzcygpID09PSAxICYmICh0aGlzLl90VGltZSAtPSBfdGlueU51bSkgJiYgTWF0aC5hYnModGhpcy5felRpbWUpICE9PSBfdGlueU51bSk7IC8vIGVkZ2UgY2FzZTogYW5pbWF0aW9uLnByb2dyZXNzKDEpLnBhdXNlKCkucGxheSgpIHdvdWxkbid0IHJlbmRlciBhZ2FpbiBiZWNhdXNlIHRoZSBwbGF5aGVhZCBpcyBhbHJlYWR5IGF0IHRoZSBlbmQsIGJ1dCB0aGUgY2FsbCB0byB0b3RhbFRpbWUoKSBiZWxvdyB3aWxsIGFkZCBpdCBiYWNrIHRvIGl0cyBwYXJlbnQuLi5hbmQgbm90IHJlbW92ZSBpdCBhZ2FpbiAoc2luY2UgcmVtb3Zpbmcgb25seSBoYXBwZW5zIHVwb24gcmVuZGVyaW5nIGF0IGEgbmV3IHRpbWUpLiBPZmZzZXR0aW5nIHRoZSBfdFRpbWUgc2xpZ2h0bHkgaXMgZG9uZSBzaW1wbHkgdG8gY2F1c2UgdGhlIGZpbmFsIHJlbmRlciBpbiB0b3RhbFRpbWUoKSB0aGF0J2xsIHBvcCBpdCBvZmYgaXRzIHRpbWVsaW5lIChpZiBhdXRvUmVtb3ZlQ2hpbGRyZW4gaXMgdHJ1ZSwgb2YgY291cnNlKS4gQ2hlY2sgdG8gbWFrZSBzdXJlIF96VGltZSBpc24ndCAtX3RpbnlOdW0gdG8gYXZvaWQgYW4gZWRnZSBjYXNlIHdoZXJlIHRoZSBwbGF5aGVhZCBpcyBwdXNoZWQgdG8gdGhlIGVuZCBidXQgSU5TSURFIGEgdHdlZW4vY2FsbGJhY2ssIHRoZSB0aW1lbGluZSBpdHNlbGYgaXMgcGF1c2VkIHRodXMgaGFsdGluZyByZW5kZXJpbmcgYW5kIGxlYXZpbmcgYSBmZXcgdW5yZW5kZXJlZC4gV2hlbiByZXN1bWluZywgaXQgd291bGRuJ3QgcmVuZGVyIHRob3NlIG90aGVyd2lzZS5cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uc3RhcnRUaW1lID0gZnVuY3Rpb24gc3RhcnRUaW1lKHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3N0YXJ0ID0gdmFsdWU7XG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHA7XG4gICAgICBwYXJlbnQgJiYgKHBhcmVudC5fc29ydCB8fCAhdGhpcy5wYXJlbnQpICYmIF9hZGRUb1RpbWVsaW5lKHBhcmVudCwgdGhpcywgdmFsdWUgLSB0aGlzLl9kZWxheSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XG4gIH07XG5cbiAgX3Byb3RvLmVuZFRpbWUgPSBmdW5jdGlvbiBlbmRUaW1lKGluY2x1ZGVSZXBlYXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0ICsgKF9pc05vdEZhbHNlKGluY2x1ZGVSZXBlYXRzKSA/IHRoaXMudG90YWxEdXJhdGlvbigpIDogdGhpcy5kdXJhdGlvbigpKSAvIE1hdGguYWJzKHRoaXMuX3RzKTtcbiAgfTtcblxuICBfcHJvdG8ucmF3VGltZSA9IGZ1bmN0aW9uIHJhd1RpbWUod3JhcFJlcGVhdHMpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHA7IC8vIF9kcCA9IGRldGF0Y2hlZCBwYXJlbnRcblxuICAgIHJldHVybiAhcGFyZW50ID8gdGhpcy5fdFRpbWUgOiB3cmFwUmVwZWF0cyAmJiAoIXRoaXMuX3RzIHx8IHRoaXMuX3JlcGVhdCAmJiB0aGlzLl90aW1lICYmIHRoaXMudG90YWxQcm9ncmVzcygpIDwgMSkgPyB0aGlzLl90VGltZSAlICh0aGlzLl9kdXIgKyB0aGlzLl9yRGVsYXkpIDogIXRoaXMuX3RzID8gdGhpcy5fdFRpbWUgOiBfcGFyZW50VG9DaGlsZFRvdGFsVGltZShwYXJlbnQucmF3VGltZSh3cmFwUmVwZWF0cyksIHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5nbG9iYWxUaW1lID0gZnVuY3Rpb24gZ2xvYmFsVGltZShyYXdUaW1lKSB7XG4gICAgdmFyIGFuaW1hdGlvbiA9IHRoaXMsXG4gICAgICAgIHRpbWUgPSBhcmd1bWVudHMubGVuZ3RoID8gcmF3VGltZSA6IGFuaW1hdGlvbi5yYXdUaW1lKCk7XG5cbiAgICB3aGlsZSAoYW5pbWF0aW9uKSB7XG4gICAgICB0aW1lID0gYW5pbWF0aW9uLl9zdGFydCArIHRpbWUgLyAoYW5pbWF0aW9uLl90cyB8fCAxKTtcbiAgICAgIGFuaW1hdGlvbiA9IGFuaW1hdGlvbi5fZHA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpbWU7XG4gIH07XG5cbiAgX3Byb3RvLnJlcGVhdCA9IGZ1bmN0aW9uIHJlcGVhdCh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9yZXBlYXQgPSB2YWx1ZTtcbiAgICAgIHJldHVybiBfb25VcGRhdGVUb3RhbER1cmF0aW9uKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZXBlYXQ7XG4gIH07XG5cbiAgX3Byb3RvLnJlcGVhdERlbGF5ID0gZnVuY3Rpb24gcmVwZWF0RGVsYXkodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fckRlbGF5ID0gdmFsdWU7XG4gICAgICByZXR1cm4gX29uVXBkYXRlVG90YWxEdXJhdGlvbih0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fckRlbGF5O1xuICB9O1xuXG4gIF9wcm90by55b3lvID0gZnVuY3Rpb24geW95byh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl95b3lvID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5feW95bztcbiAgfTtcblxuICBfcHJvdG8uc2VlayA9IGZ1bmN0aW9uIHNlZWsocG9zaXRpb24sIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIHRoaXMudG90YWxUaW1lKF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSwgX2lzTm90RmFsc2Uoc3VwcHJlc3NFdmVudHMpKTtcbiAgfTtcblxuICBfcHJvdG8ucmVzdGFydCA9IGZ1bmN0aW9uIHJlc3RhcnQoaW5jbHVkZURlbGF5LCBzdXBwcmVzc0V2ZW50cykge1xuICAgIHJldHVybiB0aGlzLnBsYXkoKS50b3RhbFRpbWUoaW5jbHVkZURlbGF5ID8gLXRoaXMuX2RlbGF5IDogMCwgX2lzTm90RmFsc2Uoc3VwcHJlc3NFdmVudHMpKTtcbiAgfTtcblxuICBfcHJvdG8ucGxheSA9IGZ1bmN0aW9uIHBsYXkoZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBmcm9tICE9IG51bGwgJiYgdGhpcy5zZWVrKGZyb20sIHN1cHByZXNzRXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlZChmYWxzZSkucGF1c2VkKGZhbHNlKTtcbiAgfTtcblxuICBfcHJvdG8ucmV2ZXJzZSA9IGZ1bmN0aW9uIHJldmVyc2UoZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBmcm9tICE9IG51bGwgJiYgdGhpcy5zZWVrKGZyb20gfHwgdGhpcy50b3RhbER1cmF0aW9uKCksIHN1cHByZXNzRXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlZCh0cnVlKS5wYXVzZWQoZmFsc2UpO1xuICB9O1xuXG4gIF9wcm90by5wYXVzZSA9IGZ1bmN0aW9uIHBhdXNlKGF0VGltZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBhdFRpbWUgIT0gbnVsbCAmJiB0aGlzLnNlZWsoYXRUaW1lLCBzdXBwcmVzc0V2ZW50cyk7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VkKHRydWUpO1xuICB9O1xuXG4gIF9wcm90by5yZXN1bWUgPSBmdW5jdGlvbiByZXN1bWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VkKGZhbHNlKTtcbiAgfTtcblxuICBfcHJvdG8ucmV2ZXJzZWQgPSBmdW5jdGlvbiByZXZlcnNlZCh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAhIXZhbHVlICE9PSB0aGlzLnJldmVyc2VkKCkgJiYgdGhpcy50aW1lU2NhbGUoLXRoaXMuX3J0cyB8fCAodmFsdWUgPyAtX3RpbnlOdW0gOiAwKSk7IC8vIGluIGNhc2UgdGltZVNjYWxlIGlzIHplcm8sIHJldmVyc2luZyB3b3VsZCBoYXZlIG5vIGVmZmVjdCBzbyB3ZSB1c2UgX3RpbnlOdW0uXG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9ydHMgPCAwO1xuICB9O1xuXG4gIF9wcm90by5pbnZhbGlkYXRlID0gZnVuY3Rpb24gaW52YWxpZGF0ZSgpIHtcbiAgICB0aGlzLl9pbml0dGVkID0gMDtcbiAgICB0aGlzLl96VGltZSA9IC1fdGlueU51bTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHAsXG4gICAgICAgIHN0YXJ0ID0gdGhpcy5fc3RhcnQsXG4gICAgICAgIHJhd1RpbWU7XG4gICAgcmV0dXJuICEhKCFwYXJlbnQgfHwgdGhpcy5fdHMgJiYgdGhpcy5faW5pdHRlZCAmJiBwYXJlbnQuaXNBY3RpdmUoKSAmJiAocmF3VGltZSA9IHBhcmVudC5yYXdUaW1lKHRydWUpKSA+PSBzdGFydCAmJiByYXdUaW1lIDwgdGhpcy5lbmRUaW1lKHRydWUpIC0gX3RpbnlOdW0pO1xuICB9O1xuXG4gIF9wcm90by5ldmVudENhbGxiYWNrID0gZnVuY3Rpb24gZXZlbnRDYWxsYmFjayh0eXBlLCBjYWxsYmFjaywgcGFyYW1zKSB7XG4gICAgdmFyIHZhcnMgPSB0aGlzLnZhcnM7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgZGVsZXRlIHZhcnNbdHlwZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXJzW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIHBhcmFtcyAmJiAodmFyc1t0eXBlICsgXCJQYXJhbXNcIl0gPSBwYXJhbXMpO1xuICAgICAgICB0eXBlID09PSBcIm9uVXBkYXRlXCIgJiYgKHRoaXMuX29uVXBkYXRlID0gY2FsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdmFyc1t0eXBlXTtcbiAgfTtcblxuICBfcHJvdG8udGhlbiA9IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICB2YXIgZiA9IF9pc0Z1bmN0aW9uKG9uRnVsZmlsbGVkKSA/IG9uRnVsZmlsbGVkIDogX3Bhc3NUaHJvdWdoLFxuICAgICAgICAgIF9yZXNvbHZlID0gZnVuY3Rpb24gX3Jlc29sdmUoKSB7XG4gICAgICAgIHZhciBfdGhlbiA9IHNlbGYudGhlbjtcbiAgICAgICAgc2VsZi50aGVuID0gbnVsbDsgLy8gdGVtcG9yYXJpbHkgbnVsbCB0aGUgdGhlbigpIG1ldGhvZCB0byBhdm9pZCBhbiBpbmZpbml0ZSBsb29wIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dyZWVuc29jay9HU0FQL2lzc3Vlcy8zMjIpXG5cbiAgICAgICAgX2lzRnVuY3Rpb24oZikgJiYgKGYgPSBmKHNlbGYpKSAmJiAoZi50aGVuIHx8IGYgPT09IHNlbGYpICYmIChzZWxmLnRoZW4gPSBfdGhlbik7XG4gICAgICAgIHJlc29sdmUoZik7XG4gICAgICAgIHNlbGYudGhlbiA9IF90aGVuO1xuICAgICAgfTtcblxuICAgICAgaWYgKHNlbGYuX2luaXR0ZWQgJiYgc2VsZi50b3RhbFByb2dyZXNzKCkgPT09IDEgJiYgc2VsZi5fdHMgPj0gMCB8fCAhc2VsZi5fdFRpbWUgJiYgc2VsZi5fdHMgPCAwKSB7XG4gICAgICAgIF9yZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLl9wcm9tID0gX3Jlc29sdmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmtpbGwgPSBmdW5jdGlvbiBraWxsKCkge1xuICAgIF9pbnRlcnJ1cHQodGhpcyk7XG4gIH07XG5cbiAgcmV0dXJuIEFuaW1hdGlvbjtcbn0oKTtcblxuX3NldERlZmF1bHRzKEFuaW1hdGlvbi5wcm90b3R5cGUsIHtcbiAgX3RpbWU6IDAsXG4gIF9zdGFydDogMCxcbiAgX2VuZDogMCxcbiAgX3RUaW1lOiAwLFxuICBfdER1cjogMCxcbiAgX2RpcnR5OiAwLFxuICBfcmVwZWF0OiAwLFxuICBfeW95bzogZmFsc2UsXG4gIHBhcmVudDogbnVsbCxcbiAgX2luaXR0ZWQ6IGZhbHNlLFxuICBfckRlbGF5OiAwLFxuICBfdHM6IDEsXG4gIF9kcDogMCxcbiAgcmF0aW86IDAsXG4gIF96VGltZTogLV90aW55TnVtLFxuICBfcHJvbTogMCxcbiAgX3BzOiBmYWxzZSxcbiAgX3J0czogMVxufSk7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVElNRUxJTkVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbmV4cG9ydCB2YXIgVGltZWxpbmUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9BbmltYXRpb24pIHtcbiAgX2luaGVyaXRzTG9vc2UoVGltZWxpbmUsIF9BbmltYXRpb24pO1xuXG4gIGZ1bmN0aW9uIFRpbWVsaW5lKHZhcnMsIHRpbWUpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBpZiAodmFycyA9PT0gdm9pZCAwKSB7XG4gICAgICB2YXJzID0ge307XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfQW5pbWF0aW9uLmNhbGwodGhpcywgdmFycywgdGltZSkgfHwgdGhpcztcbiAgICBfdGhpcy5sYWJlbHMgPSB7fTtcbiAgICBfdGhpcy5zbW9vdGhDaGlsZFRpbWluZyA9ICEhdmFycy5zbW9vdGhDaGlsZFRpbWluZztcbiAgICBfdGhpcy5hdXRvUmVtb3ZlQ2hpbGRyZW4gPSAhIXZhcnMuYXV0b1JlbW92ZUNoaWxkcmVuO1xuICAgIF90aGlzLl9zb3J0ID0gX2lzTm90RmFsc2UodmFycy5zb3J0Q2hpbGRyZW4pO1xuICAgIF90aGlzLnBhcmVudCAmJiBfcG9zdEFkZENoZWNrcyhfdGhpcy5wYXJlbnQsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICB2YXJzLnNjcm9sbFRyaWdnZXIgJiYgX3Njcm9sbFRyaWdnZXIoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIHZhcnMuc2Nyb2xsVHJpZ2dlcik7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBUaW1lbGluZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMi50byA9IGZ1bmN0aW9uIHRvKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgbmV3IFR3ZWVuKHRhcmdldHMsIF9wYXJzZVZhcnMoYXJndW1lbnRzLCAwLCB0aGlzKSwgX3BhcnNlUG9zaXRpb24odGhpcywgX2lzTnVtYmVyKHZhcnMpID8gYXJndW1lbnRzWzNdIDogcG9zaXRpb24pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmZyb20gPSBmdW5jdGlvbiBmcm9tKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgbmV3IFR3ZWVuKHRhcmdldHMsIF9wYXJzZVZhcnMoYXJndW1lbnRzLCAxLCB0aGlzKSwgX3BhcnNlUG9zaXRpb24odGhpcywgX2lzTnVtYmVyKHZhcnMpID8gYXJndW1lbnRzWzNdIDogcG9zaXRpb24pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmZyb21UbyA9IGZ1bmN0aW9uIGZyb21Ubyh0YXJnZXRzLCBmcm9tVmFycywgdG9WYXJzLCBwb3NpdGlvbikge1xuICAgIG5ldyBUd2Vlbih0YXJnZXRzLCBfcGFyc2VWYXJzKGFyZ3VtZW50cywgMiwgdGhpcyksIF9wYXJzZVBvc2l0aW9uKHRoaXMsIF9pc051bWJlcihmcm9tVmFycykgPyBhcmd1bWVudHNbNF0gOiBwb3NpdGlvbikpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuc2V0ID0gZnVuY3Rpb24gc2V0KHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgdmFycy5kdXJhdGlvbiA9IDA7XG4gICAgdmFycy5wYXJlbnQgPSB0aGlzO1xuICAgIF9pbmhlcml0RGVmYXVsdHModmFycykucmVwZWF0RGVsYXkgfHwgKHZhcnMucmVwZWF0ID0gMCk7XG4gICAgdmFycy5pbW1lZGlhdGVSZW5kZXIgPSAhIXZhcnMuaW1tZWRpYXRlUmVuZGVyO1xuICAgIG5ldyBUd2Vlbih0YXJnZXRzLCB2YXJzLCBfcGFyc2VQb3NpdGlvbih0aGlzLCBwb3NpdGlvbiksIDEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuY2FsbCA9IGZ1bmN0aW9uIGNhbGwoY2FsbGJhY2ssIHBhcmFtcywgcG9zaXRpb24pIHtcbiAgICByZXR1cm4gX2FkZFRvVGltZWxpbmUodGhpcywgVHdlZW4uZGVsYXllZENhbGwoMCwgY2FsbGJhY2ssIHBhcmFtcyksIF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSk7XG4gIH0gLy9PTkxZIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5ISBNYXliZSBkZWxldGU/XG4gIDtcblxuICBfcHJvdG8yLnN0YWdnZXJUbyA9IGZ1bmN0aW9uIHN0YWdnZXJUbyh0YXJnZXRzLCBkdXJhdGlvbiwgdmFycywgc3RhZ2dlciwgcG9zaXRpb24sIG9uQ29tcGxldGVBbGwsIG9uQ29tcGxldGVBbGxQYXJhbXMpIHtcbiAgICB2YXJzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgdmFycy5zdGFnZ2VyID0gdmFycy5zdGFnZ2VyIHx8IHN0YWdnZXI7XG4gICAgdmFycy5vbkNvbXBsZXRlID0gb25Db21wbGV0ZUFsbDtcbiAgICB2YXJzLm9uQ29tcGxldGVQYXJhbXMgPSBvbkNvbXBsZXRlQWxsUGFyYW1zO1xuICAgIHZhcnMucGFyZW50ID0gdGhpcztcbiAgICBuZXcgVHdlZW4odGFyZ2V0cywgdmFycywgX3BhcnNlUG9zaXRpb24odGhpcywgcG9zaXRpb24pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLnN0YWdnZXJGcm9tID0gZnVuY3Rpb24gc3RhZ2dlckZyb20odGFyZ2V0cywgZHVyYXRpb24sIHZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKSB7XG4gICAgdmFycy5ydW5CYWNrd2FyZHMgPSAxO1xuICAgIF9pbmhlcml0RGVmYXVsdHModmFycykuaW1tZWRpYXRlUmVuZGVyID0gX2lzTm90RmFsc2UodmFycy5pbW1lZGlhdGVSZW5kZXIpO1xuICAgIHJldHVybiB0aGlzLnN0YWdnZXJUbyh0YXJnZXRzLCBkdXJhdGlvbiwgdmFycywgc3RhZ2dlciwgcG9zaXRpb24sIG9uQ29tcGxldGVBbGwsIG9uQ29tcGxldGVBbGxQYXJhbXMpO1xuICB9O1xuXG4gIF9wcm90bzIuc3RhZ2dlckZyb21UbyA9IGZ1bmN0aW9uIHN0YWdnZXJGcm9tVG8odGFyZ2V0cywgZHVyYXRpb24sIGZyb21WYXJzLCB0b1ZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKSB7XG4gICAgdG9WYXJzLnN0YXJ0QXQgPSBmcm9tVmFycztcbiAgICBfaW5oZXJpdERlZmF1bHRzKHRvVmFycykuaW1tZWRpYXRlUmVuZGVyID0gX2lzTm90RmFsc2UodG9WYXJzLmltbWVkaWF0ZVJlbmRlcik7XG4gICAgcmV0dXJuIHRoaXMuc3RhZ2dlclRvKHRhcmdldHMsIGR1cmF0aW9uLCB0b1ZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKTtcbiAgfTtcblxuICBfcHJvdG8yLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSkge1xuICAgIHZhciBwcmV2VGltZSA9IHRoaXMuX3RpbWUsXG4gICAgICAgIHREdXIgPSB0aGlzLl9kaXJ0eSA/IHRoaXMudG90YWxEdXJhdGlvbigpIDogdGhpcy5fdER1cixcbiAgICAgICAgZHVyID0gdGhpcy5fZHVyLFxuICAgICAgICB0VGltZSA9IHRoaXMgIT09IF9nbG9iYWxUaW1lbGluZSAmJiB0b3RhbFRpbWUgPiB0RHVyIC0gX3RpbnlOdW0gJiYgdG90YWxUaW1lID49IDAgPyB0RHVyIDogdG90YWxUaW1lIDwgX3RpbnlOdW0gPyAwIDogdG90YWxUaW1lLFxuICAgICAgICBjcm9zc2luZ1N0YXJ0ID0gdGhpcy5felRpbWUgPCAwICE9PSB0b3RhbFRpbWUgPCAwICYmICh0aGlzLl9pbml0dGVkIHx8ICFkdXIpLFxuICAgICAgICB0aW1lLFxuICAgICAgICBjaGlsZCxcbiAgICAgICAgbmV4dCxcbiAgICAgICAgaXRlcmF0aW9uLFxuICAgICAgICBjeWNsZUR1cmF0aW9uLFxuICAgICAgICBwcmV2UGF1c2VkLFxuICAgICAgICBwYXVzZVR3ZWVuLFxuICAgICAgICB0aW1lU2NhbGUsXG4gICAgICAgIHByZXZTdGFydCxcbiAgICAgICAgcHJldkl0ZXJhdGlvbixcbiAgICAgICAgeW95byxcbiAgICAgICAgaXNZb3lvO1xuXG4gICAgaWYgKHRUaW1lICE9PSB0aGlzLl90VGltZSB8fCBmb3JjZSB8fCBjcm9zc2luZ1N0YXJ0KSB7XG4gICAgICBpZiAocHJldlRpbWUgIT09IHRoaXMuX3RpbWUgJiYgZHVyKSB7XG4gICAgICAgIC8vaWYgdG90YWxEdXJhdGlvbigpIGZpbmRzIGEgY2hpbGQgd2l0aCBhIG5lZ2F0aXZlIHN0YXJ0VGltZSBhbmQgc21vb3RoQ2hpbGRUaW1pbmcgaXMgdHJ1ZSwgdGhpbmdzIGdldCBzaGlmdGVkIGFyb3VuZCBpbnRlcm5hbGx5IHNvIHdlIG5lZWQgdG8gYWRqdXN0IHRoZSB0aW1lIGFjY29yZGluZ2x5LiBGb3IgZXhhbXBsZSwgaWYgYSB0d2VlbiBzdGFydHMgYXQgLTMwIHdlIG11c3Qgc2hpZnQgRVZFUllUSElORyBmb3J3YXJkIDMwIHNlY29uZHMgYW5kIG1vdmUgdGhpcyB0aW1lbGluZSdzIHN0YXJ0VGltZSBiYWNrd2FyZCBieSAzMCBzZWNvbmRzIHNvIHRoYXQgdGhpbmdzIGFsaWduIHdpdGggdGhlIHBsYXloZWFkIChubyBqdW1wKS5cbiAgICAgICAgdFRpbWUgKz0gdGhpcy5fdGltZSAtIHByZXZUaW1lO1xuICAgICAgICB0b3RhbFRpbWUgKz0gdGhpcy5fdGltZSAtIHByZXZUaW1lO1xuICAgICAgfVxuXG4gICAgICB0aW1lID0gdFRpbWU7XG4gICAgICBwcmV2U3RhcnQgPSB0aGlzLl9zdGFydDtcbiAgICAgIHRpbWVTY2FsZSA9IHRoaXMuX3RzO1xuICAgICAgcHJldlBhdXNlZCA9ICF0aW1lU2NhbGU7XG5cbiAgICAgIGlmIChjcm9zc2luZ1N0YXJ0KSB7XG4gICAgICAgIGR1ciB8fCAocHJldlRpbWUgPSB0aGlzLl96VGltZSk7IC8vd2hlbiB0aGUgcGxheWhlYWQgYXJyaXZlcyBhdCBFWEFDVExZIHRpbWUgMCAocmlnaHQgb24gdG9wKSBvZiBhIHplcm8tZHVyYXRpb24gdGltZWxpbmUsIHdlIG5lZWQgdG8gZGlzY2VybiBpZiBldmVudHMgYXJlIHN1cHByZXNzZWQgc28gdGhhdCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBhZ2FpbiAobmV4dCB0aW1lKSwgaXQnbGwgdHJpZ2dlciB0aGUgY2FsbGJhY2suIElmIGV2ZW50cyBhcmUgTk9UIHN1cHByZXNzZWQsIG9idmlvdXNseSB0aGUgY2FsbGJhY2sgd291bGQgYmUgdHJpZ2dlcmVkIGluIHRoaXMgcmVuZGVyLiBCYXNpY2FsbHksIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZSBlaXRoZXIgd2hlbiB0aGUgcGxheWhlYWQgQVJSSVZFUyBvciBMRUFWRVMgdGhpcyBleGFjdCBzcG90LCBub3QgYm90aC4gSW1hZ2luZSBkb2luZyBhIHRpbWVsaW5lLnNlZWsoMCkgYW5kIHRoZXJlJ3MgYSBjYWxsYmFjayB0aGF0IHNpdHMgYXQgMC4gU2luY2UgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIG9uIHRoYXQgc2VlaygpIGJ5IGRlZmF1bHQsIG5vdGhpbmcgd2lsbCBmaXJlLCBidXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgb2ZmIG9mIHRoYXQgcG9zaXRpb24sIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZS4gVGhpcyBiZWhhdmlvciBpcyB3aGF0IHBlb3BsZSBpbnR1aXRpdmVseSBleHBlY3QuXG5cbiAgICAgICAgKHRvdGFsVGltZSB8fCAhc3VwcHJlc3NFdmVudHMpICYmICh0aGlzLl96VGltZSA9IHRvdGFsVGltZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9yZXBlYXQpIHtcbiAgICAgICAgLy9hZGp1c3QgdGhlIHRpbWUgZm9yIHJlcGVhdHMgYW5kIHlveW9zXG4gICAgICAgIHlveW8gPSB0aGlzLl95b3lvO1xuICAgICAgICBjeWNsZUR1cmF0aW9uID0gZHVyICsgdGhpcy5fckRlbGF5O1xuICAgICAgICB0aW1lID0gX3JvdW5kKHRUaW1lICUgY3ljbGVEdXJhdGlvbik7IC8vcm91bmQgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgZXJyb3JzLiAoNCAlIDAuOCBzaG91bGQgYmUgMCBidXQgc29tZSBicm93c2VycyByZXBvcnQgaXQgYXMgMC43OTk5OTk5OSEpXG5cbiAgICAgICAgaWYgKHRUaW1lID09PSB0RHVyKSB7XG4gICAgICAgICAgLy8gdGhlIHREdXIgPT09IHRUaW1lIGlzIGZvciBlZGdlIGNhc2VzIHdoZXJlIHRoZXJlJ3MgYSBsZW5ndGh5IGRlY2ltYWwgb24gdGhlIGR1cmF0aW9uIGFuZCBpdCBtYXkgcmVhY2ggdGhlIHZlcnkgZW5kIGJ1dCB0aGUgdGltZSBpcyByZW5kZXJlZCBhcyBub3QtcXVpdGUtdGhlcmUgKHJlbWVtYmVyLCB0RHVyIGlzIHJvdW5kZWQgdG8gNCBkZWNpbWFscyB3aGVyZWFzIGR1ciBpc24ndClcbiAgICAgICAgICBpdGVyYXRpb24gPSB0aGlzLl9yZXBlYXQ7XG4gICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVyYXRpb24gPSB+fih0VGltZSAvIGN5Y2xlRHVyYXRpb24pO1xuXG4gICAgICAgICAgaWYgKGl0ZXJhdGlvbiAmJiBpdGVyYXRpb24gPT09IHRUaW1lIC8gY3ljbGVEdXJhdGlvbikge1xuICAgICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgICAgIGl0ZXJhdGlvbi0tO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRpbWUgPiBkdXIgJiYgKHRpbWUgPSBkdXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldkl0ZXJhdGlvbiA9IF9hbmltYXRpb25DeWNsZSh0aGlzLl90VGltZSwgY3ljbGVEdXJhdGlvbik7XG4gICAgICAgICFwcmV2VGltZSAmJiB0aGlzLl90VGltZSAmJiBwcmV2SXRlcmF0aW9uICE9PSBpdGVyYXRpb24gJiYgKHByZXZJdGVyYXRpb24gPSBpdGVyYXRpb24pOyAvLyBlZGdlIGNhc2UgLSBpZiBzb21lb25lIGRvZXMgYWRkUGF1c2UoKSBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgb2YgYSByZXBlYXRpbmcgdGltZWxpbmUsIHRoYXQgcGF1c2UgaXMgdGVjaG5pY2FsbHkgYXQgdGhlIHNhbWUgc3BvdCBhcyB0aGUgZW5kIHdoaWNoIGNhdXNlcyB0aGlzLl90aW1lIHRvIGdldCBzZXQgdG8gMCB3aGVuIHRoZSB0b3RhbFRpbWUgd291bGQgbm9ybWFsbHkgcGxhY2UgdGhlIHBsYXloZWFkIGF0IHRoZSBlbmQuIFNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIzODIzLWNsb3NpbmctbmF2LWFuaW1hdGlvbi1ub3Qtd29ya2luZy1vbi1pZS1hbmQtaXBob25lLTYtbWF5YmUtb3RoZXItb2xkZXItYnJvd3Nlci8/dGFiPWNvbW1lbnRzI2NvbW1lbnQtMTEzMDA1XG5cbiAgICAgICAgaWYgKHlveW8gJiYgaXRlcmF0aW9uICYgMSkge1xuICAgICAgICAgIHRpbWUgPSBkdXIgLSB0aW1lO1xuICAgICAgICAgIGlzWW95byA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgbWFrZSBzdXJlIGNoaWxkcmVuIGF0IHRoZSBlbmQvYmVnaW5uaW5nIG9mIHRoZSB0aW1lbGluZSBhcmUgcmVuZGVyZWQgcHJvcGVybHkuIElmLCBmb3IgZXhhbXBsZSxcbiAgICAgICAgYSAzLXNlY29uZCBsb25nIHRpbWVsaW5lIHJlbmRlcmVkIGF0IDIuOSBzZWNvbmRzIHByZXZpb3VzbHksIGFuZCBub3cgcmVuZGVycyBhdCAzLjIgc2Vjb25kcyAod2hpY2hcbiAgICAgICAgd291bGQgZ2V0IHRyYW5zbGF0ZWQgdG8gMi44IHNlY29uZHMgaWYgdGhlIHRpbWVsaW5lIHlveW9zIG9yIDAuMiBzZWNvbmRzIGlmIGl0IGp1c3QgcmVwZWF0cyksIHRoZXJlXG4gICAgICAgIGNvdWxkIGJlIGEgY2FsbGJhY2sgb3IgYSBzaG9ydCB0d2VlbiB0aGF0J3MgYXQgMi45NSBvciAzIHNlY29uZHMgaW4gd2hpY2ggd291bGRuJ3QgcmVuZGVyLiBTb1xuICAgICAgICB3ZSBuZWVkIHRvIHB1c2ggdGhlIHRpbWVsaW5lIHRvIHRoZSBlbmQgKGFuZC9vciBiZWdpbm5pbmcgZGVwZW5kaW5nIG9uIGl0cyB5b3lvIHZhbHVlKS4gQWxzbyB3ZSBtdXN0XG4gICAgICAgIGVuc3VyZSB0aGF0IHplcm8tZHVyYXRpb24gdHdlZW5zIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyBvciBlbmQgb2YgdGhlIFRpbWVsaW5lIHdvcmsuXG4gICAgICAgICovXG5cblxuICAgICAgICBpZiAoaXRlcmF0aW9uICE9PSBwcmV2SXRlcmF0aW9uICYmICF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgdmFyIHJld2luZGluZyA9IHlveW8gJiYgcHJldkl0ZXJhdGlvbiAmIDEsXG4gICAgICAgICAgICAgIGRvZXNXcmFwID0gcmV3aW5kaW5nID09PSAoeW95byAmJiBpdGVyYXRpb24gJiAxKTtcbiAgICAgICAgICBpdGVyYXRpb24gPCBwcmV2SXRlcmF0aW9uICYmIChyZXdpbmRpbmcgPSAhcmV3aW5kaW5nKTtcbiAgICAgICAgICBwcmV2VGltZSA9IHJld2luZGluZyA/IDAgOiBkdXI7XG4gICAgICAgICAgdGhpcy5fbG9jayA9IDE7XG4gICAgICAgICAgdGhpcy5yZW5kZXIocHJldlRpbWUgfHwgKGlzWW95byA/IDAgOiBfcm91bmQoaXRlcmF0aW9uICogY3ljbGVEdXJhdGlvbikpLCBzdXBwcmVzc0V2ZW50cywgIWR1cikuX2xvY2sgPSAwO1xuICAgICAgICAgICFzdXBwcmVzc0V2ZW50cyAmJiB0aGlzLnBhcmVudCAmJiBfY2FsbGJhY2sodGhpcywgXCJvblJlcGVhdFwiKTtcbiAgICAgICAgICB0aGlzLnZhcnMucmVwZWF0UmVmcmVzaCAmJiAhaXNZb3lvICYmICh0aGlzLmludmFsaWRhdGUoKS5fbG9jayA9IDEpO1xuXG4gICAgICAgICAgaWYgKHByZXZUaW1lICE9PSB0aGlzLl90aW1lIHx8IHByZXZQYXVzZWQgIT09ICF0aGlzLl90cykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZHVyID0gdGhpcy5fZHVyOyAvLyBpbiBjYXNlIHRoZSBkdXJhdGlvbiBjaGFuZ2VkIGluIHRoZSBvblJlcGVhdFxuXG4gICAgICAgICAgdER1ciA9IHRoaXMuX3REdXI7XG5cbiAgICAgICAgICBpZiAoZG9lc1dyYXApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2sgPSAyO1xuICAgICAgICAgICAgcHJldlRpbWUgPSByZXdpbmRpbmcgPyBkdXIgKyAwLjAwMDEgOiAtMC4wMDAxO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIocHJldlRpbWUsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy52YXJzLnJlcGVhdFJlZnJlc2ggJiYgIWlzWW95byAmJiB0aGlzLmludmFsaWRhdGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9sb2NrID0gMDtcblxuICAgICAgICAgIGlmICghdGhpcy5fdHMgJiYgIXByZXZQYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH0gLy9pbiBvcmRlciBmb3IgeW95b0Vhc2UgdG8gd29yayBwcm9wZXJseSB3aGVuIHRoZXJlJ3MgYSBzdGFnZ2VyLCB3ZSBtdXN0IHN3YXAgb3V0IHRoZSBlYXNlIGluIGVhY2ggc3ViLXR3ZWVuLlxuXG5cbiAgICAgICAgICBfcHJvcGFnYXRlWW95b0Vhc2UodGhpcywgaXNZb3lvKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faGFzUGF1c2UgJiYgIXRoaXMuX2ZvcmNpbmcgJiYgdGhpcy5fbG9jayA8IDIpIHtcbiAgICAgICAgcGF1c2VUd2VlbiA9IF9maW5kTmV4dFBhdXNlVHdlZW4odGhpcywgX3JvdW5kKHByZXZUaW1lKSwgX3JvdW5kKHRpbWUpKTtcblxuICAgICAgICBpZiAocGF1c2VUd2Vlbikge1xuICAgICAgICAgIHRUaW1lIC09IHRpbWUgLSAodGltZSA9IHBhdXNlVHdlZW4uX3N0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl90VGltZSA9IHRUaW1lO1xuICAgICAgdGhpcy5fdGltZSA9IHRpbWU7XG4gICAgICB0aGlzLl9hY3QgPSAhdGltZVNjYWxlOyAvL2FzIGxvbmcgYXMgaXQncyBub3QgcGF1c2VkLCBmb3JjZSBpdCB0byBiZSBhY3RpdmUgc28gdGhhdCBpZiB0aGUgdXNlciByZW5kZXJzIGluZGVwZW5kZW50IG9mIHRoZSBwYXJlbnQgdGltZWxpbmUsIGl0J2xsIGJlIGZvcmNlZCB0byByZS1yZW5kZXIgb24gdGhlIG5leHQgdGljay5cblxuICAgICAgaWYgKCF0aGlzLl9pbml0dGVkKSB7XG4gICAgICAgIHRoaXMuX29uVXBkYXRlID0gdGhpcy52YXJzLm9uVXBkYXRlO1xuICAgICAgICB0aGlzLl9pbml0dGVkID0gMTtcbiAgICAgICAgdGhpcy5felRpbWUgPSB0b3RhbFRpbWU7XG4gICAgICB9XG5cbiAgICAgICFwcmV2VGltZSAmJiB0aW1lICYmICFzdXBwcmVzc0V2ZW50cyAmJiBfY2FsbGJhY2sodGhpcywgXCJvblN0YXJ0XCIpO1xuXG4gICAgICBpZiAodGltZSA+PSBwcmV2VGltZSAmJiB0b3RhbFRpbWUgPj0gMCkge1xuICAgICAgICBjaGlsZCA9IHRoaXMuX2ZpcnN0O1xuXG4gICAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcblxuICAgICAgICAgIGlmICgoY2hpbGQuX2FjdCB8fCB0aW1lID49IGNoaWxkLl9zdGFydCkgJiYgY2hpbGQuX3RzICYmIHBhdXNlVHdlZW4gIT09IGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIC8vIGFuIGV4dHJlbWUgZWRnZSBjYXNlIC0gdGhlIGNoaWxkJ3MgcmVuZGVyIGNvdWxkIGRvIHNvbWV0aGluZyBsaWtlIGtpbGwoKSB0aGUgXCJuZXh0XCIgb25lIGluIHRoZSBsaW5rZWQgbGlzdCwgb3IgcmVwYXJlbnQgaXQuIEluIHRoYXQgY2FzZSB3ZSBtdXN0IHJlLWluaXRpYXRlIHRoZSB3aG9sZSByZW5kZXIgdG8gYmUgc2FmZS5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNoaWxkLl90cyA+IDAgPyAodGltZSAtIGNoaWxkLl9zdGFydCkgKiBjaGlsZC5fdHMgOiAoY2hpbGQuX2RpcnR5ID8gY2hpbGQudG90YWxEdXJhdGlvbigpIDogY2hpbGQuX3REdXIpICsgKHRpbWUgLSBjaGlsZC5fc3RhcnQpICogY2hpbGQuX3RzLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXG4gICAgICAgICAgICBpZiAodGltZSAhPT0gdGhpcy5fdGltZSB8fCAhdGhpcy5fdHMgJiYgIXByZXZQYXVzZWQpIHtcbiAgICAgICAgICAgICAgLy9pbiBjYXNlIGEgdHdlZW4gcGF1c2VzIG9yIHNlZWtzIHRoZSB0aW1lbGluZSB3aGVuIHJlbmRlcmluZywgbGlrZSBpbnNpZGUgb2YgYW4gb25VcGRhdGUvb25Db21wbGV0ZVxuICAgICAgICAgICAgICBwYXVzZVR3ZWVuID0gMDtcbiAgICAgICAgICAgICAgbmV4dCAmJiAodFRpbWUgKz0gdGhpcy5felRpbWUgPSAtX3RpbnlOdW0pOyAvLyBpdCBkaWRuJ3QgZmluaXNoIHJlbmRlcmluZywgc28gZmxhZyB6VGltZSBhcyBuZWdhdGl2ZSBzbyB0aGF0IHNvIHRoYXQgdGhlIG5leHQgdGltZSByZW5kZXIoKSBpcyBjYWxsZWQgaXQnbGwgYmUgZm9yY2VkICh0byByZW5kZXIgYW55IHJlbWFpbmluZyBjaGlsZHJlbilcblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGlsZCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkID0gdGhpcy5fbGFzdDtcbiAgICAgICAgdmFyIGFkanVzdGVkVGltZSA9IHRvdGFsVGltZSA8IDAgPyB0b3RhbFRpbWUgOiB0aW1lOyAvL3doZW4gdGhlIHBsYXloZWFkIGdvZXMgYmFja3dhcmQgYmV5b25kIHRoZSBzdGFydCBvZiB0aGlzIHRpbWVsaW5lLCB3ZSBtdXN0IHBhc3MgdGhhdCBpbmZvcm1hdGlvbiBkb3duIHRvIHRoZSBjaGlsZCBhbmltYXRpb25zIHNvIHRoYXQgemVyby1kdXJhdGlvbiB0d2VlbnMga25vdyB3aGV0aGVyIHRvIHJlbmRlciB0aGVpciBzdGFydGluZyBvciBlbmRpbmcgdmFsdWVzLlxuXG4gICAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICAgIG5leHQgPSBjaGlsZC5fcHJldjtcblxuICAgICAgICAgIGlmICgoY2hpbGQuX2FjdCB8fCBhZGp1c3RlZFRpbWUgPD0gY2hpbGQuX2VuZCkgJiYgY2hpbGQuX3RzICYmIHBhdXNlVHdlZW4gIT09IGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIC8vIGFuIGV4dHJlbWUgZWRnZSBjYXNlIC0gdGhlIGNoaWxkJ3MgcmVuZGVyIGNvdWxkIGRvIHNvbWV0aGluZyBsaWtlIGtpbGwoKSB0aGUgXCJuZXh0XCIgb25lIGluIHRoZSBsaW5rZWQgbGlzdCwgb3IgcmVwYXJlbnQgaXQuIEluIHRoYXQgY2FzZSB3ZSBtdXN0IHJlLWluaXRpYXRlIHRoZSB3aG9sZSByZW5kZXIgdG8gYmUgc2FmZS5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNoaWxkLl90cyA+IDAgPyAoYWRqdXN0ZWRUaW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cyA6IChjaGlsZC5fZGlydHkgPyBjaGlsZC50b3RhbER1cmF0aW9uKCkgOiBjaGlsZC5fdER1cikgKyAoYWRqdXN0ZWRUaW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cywgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcblxuICAgICAgICAgICAgaWYgKHRpbWUgIT09IHRoaXMuX3RpbWUgfHwgIXRoaXMuX3RzICYmICFwcmV2UGF1c2VkKSB7XG4gICAgICAgICAgICAgIC8vaW4gY2FzZSBhIHR3ZWVuIHBhdXNlcyBvciBzZWVrcyB0aGUgdGltZWxpbmUgd2hlbiByZW5kZXJpbmcsIGxpa2UgaW5zaWRlIG9mIGFuIG9uVXBkYXRlL29uQ29tcGxldGVcbiAgICAgICAgICAgICAgcGF1c2VUd2VlbiA9IDA7XG4gICAgICAgICAgICAgIG5leHQgJiYgKHRUaW1lICs9IHRoaXMuX3pUaW1lID0gYWRqdXN0ZWRUaW1lID8gLV90aW55TnVtIDogX3RpbnlOdW0pOyAvLyBpdCBkaWRuJ3QgZmluaXNoIHJlbmRlcmluZywgc28gYWRqdXN0IHpUaW1lIHNvIHRoYXQgc28gdGhhdCB0aGUgbmV4dCB0aW1lIHJlbmRlcigpIGlzIGNhbGxlZCBpdCdsbCBiZSBmb3JjZWQgKHRvIHJlbmRlciBhbnkgcmVtYWluaW5nIGNoaWxkcmVuKVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoaWxkID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGF1c2VUd2VlbiAmJiAhc3VwcHJlc3NFdmVudHMpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICBwYXVzZVR3ZWVuLnJlbmRlcih0aW1lID49IHByZXZUaW1lID8gMCA6IC1fdGlueU51bSkuX3pUaW1lID0gdGltZSA+PSBwcmV2VGltZSA/IDEgOiAtMTtcblxuICAgICAgICBpZiAodGhpcy5fdHMpIHtcbiAgICAgICAgICAvL3RoZSBjYWxsYmFjayByZXN1bWVkIHBsYXliYWNrISBTbyBzaW5jZSB3ZSBtYXkgaGF2ZSBoZWxkIGJhY2sgdGhlIHBsYXloZWFkIGR1ZSB0byB3aGVyZSB0aGUgcGF1c2UgaXMgcG9zaXRpb25lZCwgZ28gYWhlYWQgYW5kIGp1bXAgdG8gd2hlcmUgaXQncyBTVVBQT1NFRCB0byBiZSAoaWYgbm8gcGF1c2UgaGFwcGVuZWQpLlxuICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gcHJldlN0YXJ0OyAvL2lmIHRoZSBwYXVzZSB3YXMgYXQgYW4gZWFybGllciB0aW1lIGFuZCB0aGUgdXNlciByZXN1bWVkIGluIHRoZSBjYWxsYmFjaywgaXQgY291bGQgcmVwb3NpdGlvbiB0aGUgdGltZWxpbmUgKGNoYW5naW5nIGl0cyBzdGFydFRpbWUpLCB0aHJvd2luZyB0aGluZ3Mgb2ZmIHNsaWdodGx5LCBzbyB3ZSBtYWtlIHN1cmUgdGhlIF9zdGFydCBkb2Vzbid0IHNoaWZ0LlxuXG4gICAgICAgICAgX3NldEVuZCh0aGlzKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fb25VcGRhdGUgJiYgIXN1cHByZXNzRXZlbnRzICYmIF9jYWxsYmFjayh0aGlzLCBcIm9uVXBkYXRlXCIsIHRydWUpO1xuICAgICAgaWYgKHRUaW1lID09PSB0RHVyICYmIHREdXIgPj0gdGhpcy50b3RhbER1cmF0aW9uKCkgfHwgIXRUaW1lICYmIHByZXZUaW1lKSBpZiAocHJldlN0YXJ0ID09PSB0aGlzLl9zdGFydCB8fCBNYXRoLmFicyh0aW1lU2NhbGUpICE9PSBNYXRoLmFicyh0aGlzLl90cykpIGlmICghdGhpcy5fbG9jaykge1xuICAgICAgICAodG90YWxUaW1lIHx8ICFkdXIpICYmICh0VGltZSA9PT0gdER1ciAmJiB0aGlzLl90cyA+IDAgfHwgIXRUaW1lICYmIHRoaXMuX3RzIDwgMCkgJiYgX3JlbW92ZUZyb21QYXJlbnQodGhpcywgMSk7IC8vIGRvbid0IHJlbW92ZSBpZiB0aGUgdGltZWxpbmUgaXMgcmV2ZXJzZWQgYW5kIHRoZSBwbGF5aGVhZCBpc24ndCBhdCAwLCBvdGhlcndpc2UgdGwucHJvZ3Jlc3MoMSkucmV2ZXJzZSgpIHdvbid0IHdvcmsuIE9ubHkgcmVtb3ZlIGlmIHRoZSBwbGF5aGVhZCBpcyBhdCB0aGUgZW5kIGFuZCB0aW1lU2NhbGUgaXMgcG9zaXRpdmUsIG9yIGlmIHRoZSBwbGF5aGVhZCBpcyBhdCAwIGFuZCB0aGUgdGltZVNjYWxlIGlzIG5lZ2F0aXZlLlxuXG4gICAgICAgIGlmICghc3VwcHJlc3NFdmVudHMgJiYgISh0b3RhbFRpbWUgPCAwICYmICFwcmV2VGltZSkgJiYgKHRUaW1lIHx8IHByZXZUaW1lKSkge1xuICAgICAgICAgIF9jYWxsYmFjayh0aGlzLCB0VGltZSA9PT0gdER1ciA/IFwib25Db21wbGV0ZVwiIDogXCJvblJldmVyc2VDb21wbGV0ZVwiLCB0cnVlKTtcblxuICAgICAgICAgIHRoaXMuX3Byb20gJiYgISh0VGltZSA8IHREdXIgJiYgdGhpcy50aW1lU2NhbGUoKSA+IDApICYmIHRoaXMuX3Byb20oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuYWRkID0gZnVuY3Rpb24gYWRkKGNoaWxkLCBwb3NpdGlvbikge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaWYgKCFfaXNOdW1iZXIocG9zaXRpb24pKSB7XG4gICAgICBwb3NpdGlvbiA9IF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIEFuaW1hdGlvbikpIHtcbiAgICAgIGlmIChfaXNBcnJheShjaGlsZCkpIHtcbiAgICAgICAgY2hpbGQuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5hZGQob2JqLCBwb3NpdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKF9pc1N0cmluZyhjaGlsZCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGFiZWwoY2hpbGQsIHBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9pc0Z1bmN0aW9uKGNoaWxkKSkge1xuICAgICAgICBjaGlsZCA9IFR3ZWVuLmRlbGF5ZWRDYWxsKDAsIGNoaWxkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzICE9PSBjaGlsZCA/IF9hZGRUb1RpbWVsaW5lKHRoaXMsIGNoaWxkLCBwb3NpdGlvbikgOiB0aGlzOyAvL2Rvbid0IGFsbG93IGEgdGltZWxpbmUgdG8gYmUgYWRkZWQgdG8gaXRzZWxmIGFzIGEgY2hpbGQhXG4gIH07XG5cbiAgX3Byb3RvMi5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uIGdldENoaWxkcmVuKG5lc3RlZCwgdHdlZW5zLCB0aW1lbGluZXMsIGlnbm9yZUJlZm9yZVRpbWUpIHtcbiAgICBpZiAobmVzdGVkID09PSB2b2lkIDApIHtcbiAgICAgIG5lc3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR3ZWVucyA9PT0gdm9pZCAwKSB7XG4gICAgICB0d2VlbnMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aW1lbGluZXMgPT09IHZvaWQgMCkge1xuICAgICAgdGltZWxpbmVzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoaWdub3JlQmVmb3JlVGltZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZ25vcmVCZWZvcmVUaW1lID0gLV9iaWdOdW07XG4gICAgfVxuXG4gICAgdmFyIGEgPSBbXSxcbiAgICAgICAgY2hpbGQgPSB0aGlzLl9maXJzdDtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLl9zdGFydCA+PSBpZ25vcmVCZWZvcmVUaW1lKSB7XG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFR3ZWVuKSB7XG4gICAgICAgICAgdHdlZW5zICYmIGEucHVzaChjaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGltZWxpbmVzICYmIGEucHVzaChjaGlsZCk7XG4gICAgICAgICAgbmVzdGVkICYmIGEucHVzaC5hcHBseShhLCBjaGlsZC5nZXRDaGlsZHJlbih0cnVlLCB0d2VlbnMsIHRpbWVsaW5lcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH07XG5cbiAgX3Byb3RvMi5nZXRCeUlkID0gZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIHZhciBhbmltYXRpb25zID0gdGhpcy5nZXRDaGlsZHJlbigxLCAxLCAxKSxcbiAgICAgICAgaSA9IGFuaW1hdGlvbnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGFuaW1hdGlvbnNbaV0udmFycy5pZCA9PT0gaWQpIHtcbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbnNbaV07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzIucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGNoaWxkKSB7XG4gICAgaWYgKF9pc1N0cmluZyhjaGlsZCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbW92ZUxhYmVsKGNoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAoX2lzRnVuY3Rpb24oY2hpbGQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5raWxsVHdlZW5zT2YoY2hpbGQpO1xuICAgIH1cblxuICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSh0aGlzLCBjaGlsZCk7XG5cbiAgICBpZiAoY2hpbGQgPT09IHRoaXMuX3JlY2VudCkge1xuICAgICAgdGhpcy5fcmVjZW50ID0gdGhpcy5fbGFzdDtcbiAgICB9XG5cbiAgICByZXR1cm4gX3VuY2FjaGUodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvMi50b3RhbFRpbWUgPSBmdW5jdGlvbiB0b3RhbFRpbWUoX3RvdGFsVGltZTIsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdFRpbWU7XG4gICAgfVxuXG4gICAgdGhpcy5fZm9yY2luZyA9IDE7XG5cbiAgICBpZiAoIXRoaXMuX2RwICYmIHRoaXMuX3RzKSB7XG4gICAgICAvL3NwZWNpYWwgY2FzZSBmb3IgdGhlIGdsb2JhbCB0aW1lbGluZSAob3IgYW55IG90aGVyIHRoYXQgaGFzIG5vIHBhcmVudCBvciBkZXRhY2hlZCBwYXJlbnQpLlxuICAgICAgdGhpcy5fc3RhcnQgPSBfcm91bmQoX3RpY2tlci50aW1lIC0gKHRoaXMuX3RzID4gMCA/IF90b3RhbFRpbWUyIC8gdGhpcy5fdHMgOiAodGhpcy50b3RhbER1cmF0aW9uKCkgLSBfdG90YWxUaW1lMikgLyAtdGhpcy5fdHMpKTtcbiAgICB9XG5cbiAgICBfQW5pbWF0aW9uLnByb3RvdHlwZS50b3RhbFRpbWUuY2FsbCh0aGlzLCBfdG90YWxUaW1lMiwgc3VwcHJlc3NFdmVudHMpO1xuXG4gICAgdGhpcy5fZm9yY2luZyA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5hZGRMYWJlbCA9IGZ1bmN0aW9uIGFkZExhYmVsKGxhYmVsLCBwb3NpdGlvbikge1xuICAgIHRoaXMubGFiZWxzW2xhYmVsXSA9IF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLnJlbW92ZUxhYmVsID0gZnVuY3Rpb24gcmVtb3ZlTGFiZWwobGFiZWwpIHtcbiAgICBkZWxldGUgdGhpcy5sYWJlbHNbbGFiZWxdO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuYWRkUGF1c2UgPSBmdW5jdGlvbiBhZGRQYXVzZShwb3NpdGlvbiwgY2FsbGJhY2ssIHBhcmFtcykge1xuICAgIHZhciB0ID0gVHdlZW4uZGVsYXllZENhbGwoMCwgY2FsbGJhY2sgfHwgX2VtcHR5RnVuYywgcGFyYW1zKTtcbiAgICB0LmRhdGEgPSBcImlzUGF1c2VcIjtcbiAgICB0aGlzLl9oYXNQYXVzZSA9IDE7XG4gICAgcmV0dXJuIF9hZGRUb1RpbWVsaW5lKHRoaXMsIHQsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSk7XG4gIH07XG5cbiAgX3Byb3RvMi5yZW1vdmVQYXVzZSA9IGZ1bmN0aW9uIHJlbW92ZVBhdXNlKHBvc2l0aW9uKSB7XG4gICAgdmFyIGNoaWxkID0gdGhpcy5fZmlyc3Q7XG4gICAgcG9zaXRpb24gPSBfcGFyc2VQb3NpdGlvbih0aGlzLCBwb3NpdGlvbik7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5fc3RhcnQgPT09IHBvc2l0aW9uICYmIGNoaWxkLmRhdGEgPT09IFwiaXNQYXVzZVwiKSB7XG4gICAgICAgIF9yZW1vdmVGcm9tUGFyZW50KGNoaWxkKTtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMi5raWxsVHdlZW5zT2YgPSBmdW5jdGlvbiBraWxsVHdlZW5zT2YodGFyZ2V0cywgcHJvcHMsIG9ubHlBY3RpdmUpIHtcbiAgICB2YXIgdHdlZW5zID0gdGhpcy5nZXRUd2VlbnNPZih0YXJnZXRzLCBvbmx5QWN0aXZlKSxcbiAgICAgICAgaSA9IHR3ZWVucy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBfb3ZlcndyaXRpbmdUd2VlbiAhPT0gdHdlZW5zW2ldICYmIHR3ZWVuc1tpXS5raWxsKHRhcmdldHMsIHByb3BzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmdldFR3ZWVuc09mID0gZnVuY3Rpb24gZ2V0VHdlZW5zT2YodGFyZ2V0cywgb25seUFjdGl2ZSkge1xuICAgIHZhciBhID0gW10sXG4gICAgICAgIHBhcnNlZFRhcmdldHMgPSB0b0FycmF5KHRhcmdldHMpLFxuICAgICAgICBjaGlsZCA9IHRoaXMuX2ZpcnN0LFxuICAgICAgICBpc0dsb2JhbFRpbWUgPSBfaXNOdW1iZXIob25seUFjdGl2ZSksXG4gICAgICAgIC8vIGEgbnVtYmVyIGlzIGludGVycHJldGVkIGFzIGEgZ2xvYmFsIHRpbWUuIElmIHRoZSBhbmltYXRpb24gc3BhbnNcbiAgICBjaGlsZHJlbjtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVHdlZW4pIHtcbiAgICAgICAgaWYgKF9hcnJheUNvbnRhaW5zQW55KGNoaWxkLl90YXJnZXRzLCBwYXJzZWRUYXJnZXRzKSAmJiAoaXNHbG9iYWxUaW1lID8gKCFfb3ZlcndyaXRpbmdUd2VlbiB8fCBjaGlsZC5faW5pdHRlZCAmJiBjaGlsZC5fdHMpICYmIGNoaWxkLmdsb2JhbFRpbWUoMCkgPD0gb25seUFjdGl2ZSAmJiBjaGlsZC5nbG9iYWxUaW1lKGNoaWxkLnRvdGFsRHVyYXRpb24oKSkgPiBvbmx5QWN0aXZlIDogIW9ubHlBY3RpdmUgfHwgY2hpbGQuaXNBY3RpdmUoKSkpIHtcbiAgICAgICAgICAvLyBub3RlOiBpZiB0aGlzIGlzIGZvciBvdmVyd3JpdGluZywgaXQgc2hvdWxkIG9ubHkgYmUgZm9yIHR3ZWVucyB0aGF0IGFyZW4ndCBwYXVzZWQgYW5kIGFyZSBpbml0dGVkLlxuICAgICAgICAgIGEucHVzaChjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoKGNoaWxkcmVuID0gY2hpbGQuZ2V0VHdlZW5zT2YocGFyc2VkVGFyZ2V0cywgb25seUFjdGl2ZSkpLmxlbmd0aCkge1xuICAgICAgICBhLnB1c2guYXBwbHkoYSwgY2hpbGRyZW4pO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9O1xuXG4gIF9wcm90bzIudHdlZW5UbyA9IGZ1bmN0aW9uIHR3ZWVuVG8ocG9zaXRpb24sIHZhcnMpIHtcbiAgICB2YXJzID0gdmFycyB8fCB7fTtcblxuICAgIHZhciB0bCA9IHRoaXMsXG4gICAgICAgIGVuZFRpbWUgPSBfcGFyc2VQb3NpdGlvbih0bCwgcG9zaXRpb24pLFxuICAgICAgICBfdmFycyA9IHZhcnMsXG4gICAgICAgIHN0YXJ0QXQgPSBfdmFycy5zdGFydEF0LFxuICAgICAgICBfb25TdGFydCA9IF92YXJzLm9uU3RhcnQsXG4gICAgICAgIG9uU3RhcnRQYXJhbXMgPSBfdmFycy5vblN0YXJ0UGFyYW1zLFxuICAgICAgICB0d2VlbiA9IFR3ZWVuLnRvKHRsLCBfc2V0RGVmYXVsdHModmFycywge1xuICAgICAgZWFzZTogXCJub25lXCIsXG4gICAgICBsYXp5OiBmYWxzZSxcbiAgICAgIHRpbWU6IGVuZFRpbWUsXG4gICAgICBkdXJhdGlvbjogdmFycy5kdXJhdGlvbiB8fCBNYXRoLmFicygoZW5kVGltZSAtIChzdGFydEF0ICYmIFwidGltZVwiIGluIHN0YXJ0QXQgPyBzdGFydEF0LnRpbWUgOiB0bC5fdGltZSkpIC8gdGwudGltZVNjYWxlKCkpIHx8IF90aW55TnVtLFxuICAgICAgb25TdGFydDogZnVuY3Rpb24gb25TdGFydCgpIHtcbiAgICAgICAgdGwucGF1c2UoKTtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gdmFycy5kdXJhdGlvbiB8fCBNYXRoLmFicygoZW5kVGltZSAtIHRsLl90aW1lKSAvIHRsLnRpbWVTY2FsZSgpKTtcbiAgICAgICAgdHdlZW4uX2R1ciAhPT0gZHVyYXRpb24gJiYgX3NldER1cmF0aW9uKHR3ZWVuLCBkdXJhdGlvbiwgMCwgMSkucmVuZGVyKHR3ZWVuLl90aW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgX29uU3RhcnQgJiYgX29uU3RhcnQuYXBwbHkodHdlZW4sIG9uU3RhcnRQYXJhbXMgfHwgW10pOyAvL2luIGNhc2UgdGhlIHVzZXIgaGFkIGFuIG9uU3RhcnQgaW4gdGhlIHZhcnMgLSB3ZSBkb24ndCB3YW50IHRvIG92ZXJ3cml0ZSBpdC5cbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICByZXR1cm4gdHdlZW47XG4gIH07XG5cbiAgX3Byb3RvMi50d2VlbkZyb21UbyA9IGZ1bmN0aW9uIHR3ZWVuRnJvbVRvKGZyb21Qb3NpdGlvbiwgdG9Qb3NpdGlvbiwgdmFycykge1xuICAgIHJldHVybiB0aGlzLnR3ZWVuVG8odG9Qb3NpdGlvbiwgX3NldERlZmF1bHRzKHtcbiAgICAgIHN0YXJ0QXQ6IHtcbiAgICAgICAgdGltZTogX3BhcnNlUG9zaXRpb24odGhpcywgZnJvbVBvc2l0aW9uKVxuICAgICAgfVxuICAgIH0sIHZhcnMpKTtcbiAgfTtcblxuICBfcHJvdG8yLnJlY2VudCA9IGZ1bmN0aW9uIHJlY2VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjZW50O1xuICB9O1xuXG4gIF9wcm90bzIubmV4dExhYmVsID0gZnVuY3Rpb24gbmV4dExhYmVsKGFmdGVyVGltZSkge1xuICAgIGlmIChhZnRlclRpbWUgPT09IHZvaWQgMCkge1xuICAgICAgYWZ0ZXJUaW1lID0gdGhpcy5fdGltZTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2dldExhYmVsSW5EaXJlY3Rpb24odGhpcywgX3BhcnNlUG9zaXRpb24odGhpcywgYWZ0ZXJUaW1lKSk7XG4gIH07XG5cbiAgX3Byb3RvMi5wcmV2aW91c0xhYmVsID0gZnVuY3Rpb24gcHJldmlvdXNMYWJlbChiZWZvcmVUaW1lKSB7XG4gICAgaWYgKGJlZm9yZVRpbWUgPT09IHZvaWQgMCkge1xuICAgICAgYmVmb3JlVGltZSA9IHRoaXMuX3RpbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9nZXRMYWJlbEluRGlyZWN0aW9uKHRoaXMsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIGJlZm9yZVRpbWUpLCAxKTtcbiAgfTtcblxuICBfcHJvdG8yLmN1cnJlbnRMYWJlbCA9IGZ1bmN0aW9uIGN1cnJlbnRMYWJlbCh2YWx1ZSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy5zZWVrKHZhbHVlLCB0cnVlKSA6IHRoaXMucHJldmlvdXNMYWJlbCh0aGlzLl90aW1lICsgX3RpbnlOdW0pO1xuICB9O1xuXG4gIF9wcm90bzIuc2hpZnRDaGlsZHJlbiA9IGZ1bmN0aW9uIHNoaWZ0Q2hpbGRyZW4oYW1vdW50LCBhZGp1c3RMYWJlbHMsIGlnbm9yZUJlZm9yZVRpbWUpIHtcbiAgICBpZiAoaWdub3JlQmVmb3JlVGltZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZ25vcmVCZWZvcmVUaW1lID0gMDtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGQgPSB0aGlzLl9maXJzdCxcbiAgICAgICAgbGFiZWxzID0gdGhpcy5sYWJlbHMsXG4gICAgICAgIHA7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5fc3RhcnQgPj0gaWdub3JlQmVmb3JlVGltZSkge1xuICAgICAgICBjaGlsZC5fc3RhcnQgKz0gYW1vdW50O1xuICAgICAgICBjaGlsZC5fZW5kICs9IGFtb3VudDtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICBpZiAoYWRqdXN0TGFiZWxzKSB7XG4gICAgICBmb3IgKHAgaW4gbGFiZWxzKSB7XG4gICAgICAgIGlmIChsYWJlbHNbcF0gPj0gaWdub3JlQmVmb3JlVGltZSkge1xuICAgICAgICAgIGxhYmVsc1twXSArPSBhbW91bnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX3VuY2FjaGUodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvMi5pbnZhbGlkYXRlID0gZnVuY3Rpb24gaW52YWxpZGF0ZSgpIHtcbiAgICB2YXIgY2hpbGQgPSB0aGlzLl9maXJzdDtcbiAgICB0aGlzLl9sb2NrID0gMDtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgY2hpbGQuaW52YWxpZGF0ZSgpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gX0FuaW1hdGlvbi5wcm90b3R5cGUuaW52YWxpZGF0ZS5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90bzIuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcihpbmNsdWRlTGFiZWxzKSB7XG4gICAgaWYgKGluY2x1ZGVMYWJlbHMgPT09IHZvaWQgMCkge1xuICAgICAgaW5jbHVkZUxhYmVscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkID0gdGhpcy5fZmlyc3QsXG4gICAgICAgIG5leHQ7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcbiAgICAgIHRoaXMucmVtb3ZlKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gbmV4dDtcbiAgICB9XG5cbiAgICB0aGlzLl90aW1lID0gdGhpcy5fdFRpbWUgPSB0aGlzLl9wVGltZSA9IDA7XG4gICAgaW5jbHVkZUxhYmVscyAmJiAodGhpcy5sYWJlbHMgPSB7fSk7XG4gICAgcmV0dXJuIF91bmNhY2hlKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90bzIudG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uIHRvdGFsRHVyYXRpb24odmFsdWUpIHtcbiAgICB2YXIgbWF4ID0gMCxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNoaWxkID0gc2VsZi5fbGFzdCxcbiAgICAgICAgcHJldlN0YXJ0ID0gX2JpZ051bSxcbiAgICAgICAgcHJldixcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHBhcmVudDtcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gc2VsZi50aW1lU2NhbGUoKHNlbGYuX3JlcGVhdCA8IDAgPyBzZWxmLmR1cmF0aW9uKCkgOiBzZWxmLnRvdGFsRHVyYXRpb24oKSkgLyAoc2VsZi5yZXZlcnNlZCgpID8gLXZhbHVlIDogdmFsdWUpKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5fZGlydHkpIHtcbiAgICAgIHBhcmVudCA9IHNlbGYucGFyZW50O1xuXG4gICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgcHJldiA9IGNoaWxkLl9wcmV2OyAvL3JlY29yZCBpdCBoZXJlIGluIGNhc2UgdGhlIHR3ZWVuIGNoYW5nZXMgcG9zaXRpb24gaW4gdGhlIHNlcXVlbmNlLi4uXG5cbiAgICAgICAgY2hpbGQuX2RpcnR5ICYmIGNoaWxkLnRvdGFsRHVyYXRpb24oKTsgLy9jb3VsZCBjaGFuZ2UgdGhlIHR3ZWVuLl9zdGFydFRpbWUsIHNvIG1ha2Ugc3VyZSB0aGUgYW5pbWF0aW9uJ3MgY2FjaGUgaXMgY2xlYW4gYmVmb3JlIGFuYWx5emluZyBpdC5cblxuICAgICAgICBzdGFydCA9IGNoaWxkLl9zdGFydDtcblxuICAgICAgICBpZiAoc3RhcnQgPiBwcmV2U3RhcnQgJiYgc2VsZi5fc29ydCAmJiBjaGlsZC5fdHMgJiYgIXNlbGYuX2xvY2spIHtcbiAgICAgICAgICAvL2luIGNhc2Ugb25lIG9mIHRoZSB0d2VlbnMgc2hpZnRlZCBvdXQgb2Ygb3JkZXIsIGl0IG5lZWRzIHRvIGJlIHJlLWluc2VydGVkIGludG8gdGhlIGNvcnJlY3QgcG9zaXRpb24gaW4gdGhlIHNlcXVlbmNlXG4gICAgICAgICAgc2VsZi5fbG9jayA9IDE7IC8vcHJldmVudCBlbmRsZXNzIHJlY3Vyc2l2ZSBjYWxscyAtIHRoZXJlIGFyZSBtZXRob2RzIHRoYXQgZ2V0IHRyaWdnZXJlZCB0aGF0IGNoZWNrIGR1cmF0aW9uL3RvdGFsRHVyYXRpb24gd2hlbiB3ZSBhZGQoKS5cblxuICAgICAgICAgIF9hZGRUb1RpbWVsaW5lKHNlbGYsIGNoaWxkLCBzdGFydCAtIGNoaWxkLl9kZWxheSwgMSkuX2xvY2sgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByZXZTdGFydCA9IHN0YXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXJ0IDwgMCAmJiBjaGlsZC5fdHMpIHtcbiAgICAgICAgICAvL2NoaWxkcmVuIGFyZW4ndCBhbGxvd2VkIHRvIGhhdmUgbmVnYXRpdmUgc3RhcnRUaW1lcyB1bmxlc3Mgc21vb3RoQ2hpbGRUaW1pbmcgaXMgdHJ1ZSwgc28gYWRqdXN0IGhlcmUgaWYgb25lIGlzIGZvdW5kLlxuICAgICAgICAgIG1heCAtPSBzdGFydDtcblxuICAgICAgICAgIGlmICghcGFyZW50ICYmICFzZWxmLl9kcCB8fCBwYXJlbnQgJiYgcGFyZW50LnNtb290aENoaWxkVGltaW5nKSB7XG4gICAgICAgICAgICBzZWxmLl9zdGFydCArPSBzdGFydCAvIHNlbGYuX3RzO1xuICAgICAgICAgICAgc2VsZi5fdGltZSAtPSBzdGFydDtcbiAgICAgICAgICAgIHNlbGYuX3RUaW1lIC09IHN0YXJ0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlbGYuc2hpZnRDaGlsZHJlbigtc3RhcnQsIGZhbHNlLCAtMWU5OTkpO1xuICAgICAgICAgIHByZXZTdGFydCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZC5fZW5kID4gbWF4ICYmIGNoaWxkLl90cyAmJiAobWF4ID0gY2hpbGQuX2VuZCk7XG4gICAgICAgIGNoaWxkID0gcHJldjtcbiAgICAgIH1cblxuICAgICAgX3NldER1cmF0aW9uKHNlbGYsIHNlbGYgPT09IF9nbG9iYWxUaW1lbGluZSAmJiBzZWxmLl90aW1lID4gbWF4ID8gc2VsZi5fdGltZSA6IG1heCwgMSwgMSk7XG5cbiAgICAgIHNlbGYuX2RpcnR5ID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZi5fdER1cjtcbiAgfTtcblxuICBUaW1lbGluZS51cGRhdGVSb290ID0gZnVuY3Rpb24gdXBkYXRlUm9vdCh0aW1lKSB7XG4gICAgaWYgKF9nbG9iYWxUaW1lbGluZS5fdHMpIHtcbiAgICAgIF9sYXp5U2FmZVJlbmRlcihfZ2xvYmFsVGltZWxpbmUsIF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHRpbWUsIF9nbG9iYWxUaW1lbGluZSkpO1xuXG4gICAgICBfbGFzdFJlbmRlcmVkRnJhbWUgPSBfdGlja2VyLmZyYW1lO1xuICAgIH1cblxuICAgIGlmIChfdGlja2VyLmZyYW1lID49IF9uZXh0R0NGcmFtZSkge1xuICAgICAgX25leHRHQ0ZyYW1lICs9IF9jb25maWcuYXV0b1NsZWVwIHx8IDEyMDtcbiAgICAgIHZhciBjaGlsZCA9IF9nbG9iYWxUaW1lbGluZS5fZmlyc3Q7XG4gICAgICBpZiAoIWNoaWxkIHx8ICFjaGlsZC5fdHMpIGlmIChfY29uZmlnLmF1dG9TbGVlcCAmJiBfdGlja2VyLl9saXN0ZW5lcnMubGVuZ3RoIDwgMikge1xuICAgICAgICB3aGlsZSAoY2hpbGQgJiYgIWNoaWxkLl90cykge1xuICAgICAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZCB8fCBfdGlja2VyLnNsZWVwKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBUaW1lbGluZTtcbn0oQW5pbWF0aW9uKTtcblxuX3NldERlZmF1bHRzKFRpbWVsaW5lLnByb3RvdHlwZSwge1xuICBfbG9jazogMCxcbiAgX2hhc1BhdXNlOiAwLFxuICBfZm9yY2luZzogMFxufSk7XG5cbnZhciBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2VlbiA9IGZ1bmN0aW9uIF9hZGRDb21wbGV4U3RyaW5nUHJvcFR3ZWVuKHRhcmdldCwgcHJvcCwgc3RhcnQsIGVuZCwgc2V0dGVyLCBzdHJpbmdGaWx0ZXIsIGZ1bmNQYXJhbSkge1xuICAvL25vdGU6IHdlIGNhbGwgX2FkZENvbXBsZXhTdHJpbmdQcm9wVHdlZW4uY2FsbCh0d2Vlbkluc3RhbmNlLi4uKSB0byBlbnN1cmUgdGhhdCBpdCdzIHNjb3BlZCBwcm9wZXJseS4gV2UgbWF5IGNhbGwgaXQgZnJvbSB3aXRoaW4gYSBwbHVnaW4gdG9vLCB0aHVzIFwidGhpc1wiIHdvdWxkIHJlZmVyIHRvIHRoZSBwbHVnaW4uXG4gIHZhciBwdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHRhcmdldCwgcHJvcCwgMCwgMSwgX3JlbmRlckNvbXBsZXhTdHJpbmcsIG51bGwsIHNldHRlciksXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBtYXRjaEluZGV4ID0gMCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHN0YXJ0TnVtcyxcbiAgICAgIGNvbG9yLFxuICAgICAgZW5kTnVtLFxuICAgICAgY2h1bmssXG4gICAgICBzdGFydE51bSxcbiAgICAgIGhhc1JhbmRvbSxcbiAgICAgIGE7XG4gIHB0LmIgPSBzdGFydDtcbiAgcHQuZSA9IGVuZDtcbiAgc3RhcnQgKz0gXCJcIjsgLy9lbnN1cmUgdmFsdWVzIGFyZSBzdHJpbmdzXG5cbiAgZW5kICs9IFwiXCI7XG5cbiAgaWYgKGhhc1JhbmRvbSA9IH5lbmQuaW5kZXhPZihcInJhbmRvbShcIikpIHtcbiAgICBlbmQgPSBfcmVwbGFjZVJhbmRvbShlbmQpO1xuICB9XG5cbiAgaWYgKHN0cmluZ0ZpbHRlcikge1xuICAgIGEgPSBbc3RhcnQsIGVuZF07XG4gICAgc3RyaW5nRmlsdGVyKGEsIHRhcmdldCwgcHJvcCk7IC8vcGFzcyBhbiBhcnJheSB3aXRoIHRoZSBzdGFydGluZyBhbmQgZW5kaW5nIHZhbHVlcyBhbmQgbGV0IHRoZSBmaWx0ZXIgZG8gd2hhdGV2ZXIgaXQgbmVlZHMgdG8gdGhlIHZhbHVlcy5cblxuICAgIHN0YXJ0ID0gYVswXTtcbiAgICBlbmQgPSBhWzFdO1xuICB9XG5cbiAgc3RhcnROdW1zID0gc3RhcnQubWF0Y2goX2NvbXBsZXhTdHJpbmdOdW1FeHApIHx8IFtdO1xuXG4gIHdoaWxlIChyZXN1bHQgPSBfY29tcGxleFN0cmluZ051bUV4cC5leGVjKGVuZCkpIHtcbiAgICBlbmROdW0gPSByZXN1bHRbMF07XG4gICAgY2h1bmsgPSBlbmQuc3Vic3RyaW5nKGluZGV4LCByZXN1bHQuaW5kZXgpO1xuXG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICBjb2xvciA9IChjb2xvciArIDEpICUgNTtcbiAgICB9IGVsc2UgaWYgKGNodW5rLnN1YnN0cigtNSkgPT09IFwicmdiYShcIikge1xuICAgICAgY29sb3IgPSAxO1xuICAgIH1cblxuICAgIGlmIChlbmROdW0gIT09IHN0YXJ0TnVtc1ttYXRjaEluZGV4KytdKSB7XG4gICAgICBzdGFydE51bSA9IHBhcnNlRmxvYXQoc3RhcnROdW1zW21hdGNoSW5kZXggLSAxXSkgfHwgMDsgLy90aGVzZSBuZXN0ZWQgUHJvcFR3ZWVucyBhcmUgaGFuZGxlZCBpbiBhIHNwZWNpYWwgd2F5IC0gd2UnbGwgbmV2ZXIgYWN0dWFsbHkgY2FsbCBhIHJlbmRlciBvciBzZXR0ZXIgbWV0aG9kIG9uIHRoZW0uIFdlJ2xsIGp1c3QgbG9vcCB0aHJvdWdoIHRoZW0gaW4gdGhlIHBhcmVudCBjb21wbGV4IHN0cmluZyBQcm9wVHdlZW4ncyByZW5kZXIgbWV0aG9kLlxuXG4gICAgICBwdC5fcHQgPSB7XG4gICAgICAgIF9uZXh0OiBwdC5fcHQsXG4gICAgICAgIHA6IGNodW5rIHx8IG1hdGNoSW5kZXggPT09IDEgPyBjaHVuayA6IFwiLFwiLFxuICAgICAgICAvL25vdGU6IFNWRyBzcGVjIGFsbG93cyBvbWlzc2lvbiBvZiBjb21tYS9zcGFjZSB3aGVuIGEgbmVnYXRpdmUgc2lnbiBpcyB3ZWRnZWQgYmV0d2VlbiB0d28gbnVtYmVycywgbGlrZSAyLjUtNS4zIGluc3RlYWQgb2YgMi41LC01LjMgYnV0IHdoZW4gdHdlZW5pbmcsIHRoZSBuZWdhdGl2ZSB2YWx1ZSBtYXkgc3dpdGNoIHRvIHBvc2l0aXZlLCBzbyB3ZSBpbnNlcnQgdGhlIGNvbW1hIGp1c3QgaW4gY2FzZS5cbiAgICAgICAgczogc3RhcnROdW0sXG4gICAgICAgIGM6IGVuZE51bS5jaGFyQXQoMSkgPT09IFwiPVwiID8gcGFyc2VGbG9hdChlbmROdW0uc3Vic3RyKDIpKSAqIChlbmROdW0uY2hhckF0KDApID09PSBcIi1cIiA/IC0xIDogMSkgOiBwYXJzZUZsb2F0KGVuZE51bSkgLSBzdGFydE51bSxcbiAgICAgICAgbTogY29sb3IgJiYgY29sb3IgPCA0ID8gTWF0aC5yb3VuZCA6IDBcbiAgICAgIH07XG4gICAgICBpbmRleCA9IF9jb21wbGV4U3RyaW5nTnVtRXhwLmxhc3RJbmRleDtcbiAgICB9XG4gIH1cblxuICBwdC5jID0gaW5kZXggPCBlbmQubGVuZ3RoID8gZW5kLnN1YnN0cmluZyhpbmRleCwgZW5kLmxlbmd0aCkgOiBcIlwiOyAvL3dlIHVzZSB0aGUgXCJjXCIgb2YgdGhlIFByb3BUd2VlbiB0byBzdG9yZSB0aGUgZmluYWwgcGFydCBvZiB0aGUgc3RyaW5nIChhZnRlciB0aGUgbGFzdCBudW1iZXIpXG5cbiAgcHQuZnAgPSBmdW5jUGFyYW07XG5cbiAgaWYgKF9yZWxFeHAudGVzdChlbmQpIHx8IGhhc1JhbmRvbSkge1xuICAgIHB0LmUgPSAwOyAvL2lmIHRoZSBlbmQgc3RyaW5nIGNvbnRhaW5zIHJlbGF0aXZlIHZhbHVlcyBvciBkeW5hbWljIHJhbmRvbSguLi4pIHZhbHVlcywgZGVsZXRlIHRoZSBlbmQgaXQgc28gdGhhdCBvbiB0aGUgZmluYWwgcmVuZGVyIHdlIGRvbid0IGFjdHVhbGx5IHNldCBpdCB0byB0aGUgc3RyaW5nIHdpdGggKz0gb3IgLT0gY2hhcmFjdGVycyAoZm9yY2VzIGl0IHRvIHVzZSB0aGUgY2FsY3VsYXRlZCB2YWx1ZSkuXG4gIH1cblxuICB0aGlzLl9wdCA9IHB0OyAvL3N0YXJ0IHRoZSBsaW5rZWQgbGlzdCB3aXRoIHRoaXMgbmV3IFByb3BUd2Vlbi4gUmVtZW1iZXIsIHdlIGNhbGwgX2FkZENvbXBsZXhTdHJpbmdQcm9wVHdlZW4uY2FsbCh0d2Vlbkluc3RhbmNlLi4uKSB0byBlbnN1cmUgdGhhdCBpdCdzIHNjb3BlZCBwcm9wZXJseS4gV2UgbWF5IGNhbGwgaXQgZnJvbSB3aXRoaW4gYSBwbHVnaW4gdG9vLCB0aHVzIFwidGhpc1wiIHdvdWxkIHJlZmVyIHRvIHRoZSBwbHVnaW4uXG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfYWRkUHJvcFR3ZWVuID0gZnVuY3Rpb24gX2FkZFByb3BUd2Vlbih0YXJnZXQsIHByb3AsIHN0YXJ0LCBlbmQsIGluZGV4LCB0YXJnZXRzLCBtb2RpZmllciwgc3RyaW5nRmlsdGVyLCBmdW5jUGFyYW0pIHtcbiAgX2lzRnVuY3Rpb24oZW5kKSAmJiAoZW5kID0gZW5kKGluZGV4IHx8IDAsIHRhcmdldCwgdGFyZ2V0cykpO1xuICB2YXIgY3VycmVudFZhbHVlID0gdGFyZ2V0W3Byb3BdLFxuICAgICAgcGFyc2VkU3RhcnQgPSBzdGFydCAhPT0gXCJnZXRcIiA/IHN0YXJ0IDogIV9pc0Z1bmN0aW9uKGN1cnJlbnRWYWx1ZSkgPyBjdXJyZW50VmFsdWUgOiBmdW5jUGFyYW0gPyB0YXJnZXRbcHJvcC5pbmRleE9mKFwic2V0XCIpIHx8ICFfaXNGdW5jdGlvbih0YXJnZXRbXCJnZXRcIiArIHByb3Auc3Vic3RyKDMpXSkgPyBwcm9wIDogXCJnZXRcIiArIHByb3Auc3Vic3RyKDMpXShmdW5jUGFyYW0pIDogdGFyZ2V0W3Byb3BdKCksXG4gICAgICBzZXR0ZXIgPSAhX2lzRnVuY3Rpb24oY3VycmVudFZhbHVlKSA/IF9zZXR0ZXJQbGFpbiA6IGZ1bmNQYXJhbSA/IF9zZXR0ZXJGdW5jV2l0aFBhcmFtIDogX3NldHRlckZ1bmMsXG4gICAgICBwdDtcblxuICBpZiAoX2lzU3RyaW5nKGVuZCkpIHtcbiAgICBpZiAofmVuZC5pbmRleE9mKFwicmFuZG9tKFwiKSkge1xuICAgICAgZW5kID0gX3JlcGxhY2VSYW5kb20oZW5kKTtcbiAgICB9XG5cbiAgICBpZiAoZW5kLmNoYXJBdCgxKSA9PT0gXCI9XCIpIHtcbiAgICAgIGVuZCA9IHBhcnNlRmxvYXQocGFyc2VkU3RhcnQpICsgcGFyc2VGbG9hdChlbmQuc3Vic3RyKDIpKSAqIChlbmQuY2hhckF0KDApID09PSBcIi1cIiA/IC0xIDogMSkgKyAoZ2V0VW5pdChwYXJzZWRTdGFydCkgfHwgMCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnNlZFN0YXJ0ICE9PSBlbmQpIHtcbiAgICBpZiAoIWlzTmFOKHBhcnNlZFN0YXJ0ICogZW5kKSkge1xuICAgICAgcHQgPSBuZXcgUHJvcFR3ZWVuKHRoaXMuX3B0LCB0YXJnZXQsIHByb3AsICtwYXJzZWRTdGFydCB8fCAwLCBlbmQgLSAocGFyc2VkU3RhcnQgfHwgMCksIHR5cGVvZiBjdXJyZW50VmFsdWUgPT09IFwiYm9vbGVhblwiID8gX3JlbmRlckJvb2xlYW4gOiBfcmVuZGVyUGxhaW4sIDAsIHNldHRlcik7XG4gICAgICBmdW5jUGFyYW0gJiYgKHB0LmZwID0gZnVuY1BhcmFtKTtcbiAgICAgIG1vZGlmaWVyICYmIHB0Lm1vZGlmaWVyKG1vZGlmaWVyLCB0aGlzLCB0YXJnZXQpO1xuICAgICAgcmV0dXJuIHRoaXMuX3B0ID0gcHQ7XG4gICAgfVxuXG4gICAgIWN1cnJlbnRWYWx1ZSAmJiAhKHByb3AgaW4gdGFyZ2V0KSAmJiBfbWlzc2luZ1BsdWdpbihwcm9wLCBlbmQpO1xuICAgIHJldHVybiBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2Vlbi5jYWxsKHRoaXMsIHRhcmdldCwgcHJvcCwgcGFyc2VkU3RhcnQsIGVuZCwgc2V0dGVyLCBzdHJpbmdGaWx0ZXIgfHwgX2NvbmZpZy5zdHJpbmdGaWx0ZXIsIGZ1bmNQYXJhbSk7XG4gIH1cbn0sXG4gICAgLy9jcmVhdGVzIGEgY29weSBvZiB0aGUgdmFycyBvYmplY3QgYW5kIHByb2Nlc3NlcyBhbnkgZnVuY3Rpb24tYmFzZWQgdmFsdWVzIChwdXR0aW5nIHRoZSByZXN1bHRpbmcgdmFsdWVzIGRpcmVjdGx5IGludG8gdGhlIGNvcHkpIGFzIHdlbGwgYXMgc3RyaW5ncyB3aXRoIFwicmFuZG9tKClcIiBpbiB0aGVtLiBJdCBkb2VzIE5PVCBwcm9jZXNzIHJlbGF0aXZlIHZhbHVlcy5cbl9wcm9jZXNzVmFycyA9IGZ1bmN0aW9uIF9wcm9jZXNzVmFycyh2YXJzLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzLCB0d2Vlbikge1xuICBfaXNGdW5jdGlvbih2YXJzKSAmJiAodmFycyA9IF9wYXJzZUZ1bmNPclN0cmluZyh2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykpO1xuXG4gIGlmICghX2lzT2JqZWN0KHZhcnMpIHx8IHZhcnMuc3R5bGUgJiYgdmFycy5ub2RlVHlwZSB8fCBfaXNBcnJheSh2YXJzKSB8fCBfaXNUeXBlZEFycmF5KHZhcnMpKSB7XG4gICAgcmV0dXJuIF9pc1N0cmluZyh2YXJzKSA/IF9wYXJzZUZ1bmNPclN0cmluZyh2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykgOiB2YXJzO1xuICB9XG5cbiAgdmFyIGNvcHkgPSB7fSxcbiAgICAgIHA7XG5cbiAgZm9yIChwIGluIHZhcnMpIHtcbiAgICBjb3B5W3BdID0gX3BhcnNlRnVuY09yU3RyaW5nKHZhcnNbcF0sIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKTtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICBfY2hlY2tQbHVnaW4gPSBmdW5jdGlvbiBfY2hlY2tQbHVnaW4ocHJvcGVydHksIHZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKSB7XG4gIHZhciBwbHVnaW4sIHB0LCBwdExvb2t1cCwgaTtcblxuICBpZiAoX3BsdWdpbnNbcHJvcGVydHldICYmIChwbHVnaW4gPSBuZXcgX3BsdWdpbnNbcHJvcGVydHldKCkpLmluaXQodGFyZ2V0LCBwbHVnaW4ucmF3VmFycyA/IHZhcnNbcHJvcGVydHldIDogX3Byb2Nlc3NWYXJzKHZhcnNbcHJvcGVydHldLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzLCB0d2VlbiksIHR3ZWVuLCBpbmRleCwgdGFyZ2V0cykgIT09IGZhbHNlKSB7XG4gICAgdHdlZW4uX3B0ID0gcHQgPSBuZXcgUHJvcFR3ZWVuKHR3ZWVuLl9wdCwgdGFyZ2V0LCBwcm9wZXJ0eSwgMCwgMSwgcGx1Z2luLnJlbmRlciwgcGx1Z2luLCAwLCBwbHVnaW4ucHJpb3JpdHkpO1xuXG4gICAgaWYgKHR3ZWVuICE9PSBfcXVpY2tUd2Vlbikge1xuICAgICAgcHRMb29rdXAgPSB0d2Vlbi5fcHRMb29rdXBbdHdlZW4uX3RhcmdldHMuaW5kZXhPZih0YXJnZXQpXTsgLy9ub3RlOiB3ZSBjYW4ndCB1c2UgdHdlZW4uX3B0TG9va3VwW2luZGV4XSBiZWNhdXNlIGZvciBzdGFnZ2VyZWQgdHdlZW5zLCB0aGUgaW5kZXggZnJvbSB0aGUgZnVsbFRhcmdldHMgYXJyYXkgd29uJ3QgbWF0Y2ggd2hhdCBpdCBpcyBpbiBlYWNoIGluZGl2aWR1YWwgdHdlZW4gdGhhdCBzcGF3bnMgZnJvbSB0aGUgc3RhZ2dlci5cblxuICAgICAgaSA9IHBsdWdpbi5fcHJvcHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHB0TG9va3VwW3BsdWdpbi5fcHJvcHNbaV1dID0gcHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBsdWdpbjtcbn0sXG4gICAgX292ZXJ3cml0aW5nVHdlZW4sXG4gICAgLy9zdG9yZSBhIHJlZmVyZW5jZSB0ZW1wb3JhcmlseSBzbyB3ZSBjYW4gYXZvaWQgb3ZlcndyaXRpbmcgaXRzZWxmLlxuX2luaXRUd2VlbiA9IGZ1bmN0aW9uIF9pbml0VHdlZW4odHdlZW4sIHRpbWUpIHtcbiAgdmFyIHZhcnMgPSB0d2Vlbi52YXJzLFxuICAgICAgZWFzZSA9IHZhcnMuZWFzZSxcbiAgICAgIHN0YXJ0QXQgPSB2YXJzLnN0YXJ0QXQsXG4gICAgICBpbW1lZGlhdGVSZW5kZXIgPSB2YXJzLmltbWVkaWF0ZVJlbmRlcixcbiAgICAgIGxhenkgPSB2YXJzLmxhenksXG4gICAgICBvblVwZGF0ZSA9IHZhcnMub25VcGRhdGUsXG4gICAgICBvblVwZGF0ZVBhcmFtcyA9IHZhcnMub25VcGRhdGVQYXJhbXMsXG4gICAgICBjYWxsYmFja1Njb3BlID0gdmFycy5jYWxsYmFja1Njb3BlLFxuICAgICAgcnVuQmFja3dhcmRzID0gdmFycy5ydW5CYWNrd2FyZHMsXG4gICAgICB5b3lvRWFzZSA9IHZhcnMueW95b0Vhc2UsXG4gICAgICBrZXlmcmFtZXMgPSB2YXJzLmtleWZyYW1lcyxcbiAgICAgIGF1dG9SZXZlcnQgPSB2YXJzLmF1dG9SZXZlcnQsXG4gICAgICBkdXIgPSB0d2Vlbi5fZHVyLFxuICAgICAgcHJldlN0YXJ0QXQgPSB0d2Vlbi5fc3RhcnRBdCxcbiAgICAgIHRhcmdldHMgPSB0d2Vlbi5fdGFyZ2V0cyxcbiAgICAgIHBhcmVudCA9IHR3ZWVuLnBhcmVudCxcbiAgICAgIGZ1bGxUYXJnZXRzID0gcGFyZW50ICYmIHBhcmVudC5kYXRhID09PSBcIm5lc3RlZFwiID8gcGFyZW50LnBhcmVudC5fdGFyZ2V0cyA6IHRhcmdldHMsXG4gICAgICBhdXRvT3ZlcndyaXRlID0gdHdlZW4uX292ZXJ3cml0ZSA9PT0gXCJhdXRvXCIsXG4gICAgICB0bCA9IHR3ZWVuLnRpbWVsaW5lLFxuICAgICAgY2xlYW5WYXJzLFxuICAgICAgaSxcbiAgICAgIHAsXG4gICAgICBwdCxcbiAgICAgIHRhcmdldCxcbiAgICAgIGhhc1ByaW9yaXR5LFxuICAgICAgZ3NEYXRhLFxuICAgICAgaGFybmVzcyxcbiAgICAgIHBsdWdpbixcbiAgICAgIHB0TG9va3VwLFxuICAgICAgaW5kZXgsXG4gICAgICBoYXJuZXNzVmFycyxcbiAgICAgIG92ZXJ3cml0dGVuO1xuICB0bCAmJiAoIWtleWZyYW1lcyB8fCAhZWFzZSkgJiYgKGVhc2UgPSBcIm5vbmVcIik7XG4gIHR3ZWVuLl9lYXNlID0gX3BhcnNlRWFzZShlYXNlLCBfZGVmYXVsdHMuZWFzZSk7XG4gIHR3ZWVuLl95RWFzZSA9IHlveW9FYXNlID8gX2ludmVydEVhc2UoX3BhcnNlRWFzZSh5b3lvRWFzZSA9PT0gdHJ1ZSA/IGVhc2UgOiB5b3lvRWFzZSwgX2RlZmF1bHRzLmVhc2UpKSA6IDA7XG5cbiAgaWYgKHlveW9FYXNlICYmIHR3ZWVuLl95b3lvICYmICF0d2Vlbi5fcmVwZWF0KSB7XG4gICAgLy90aGVyZSBtdXN0IGhhdmUgYmVlbiBhIHBhcmVudCB0aW1lbGluZSB3aXRoIHlveW86dHJ1ZSB0aGF0IGlzIGN1cnJlbnRseSBpbiBpdHMgeW95byBwaGFzZSwgc28gZmxpcCB0aGUgZWFzZXMuXG4gICAgeW95b0Vhc2UgPSB0d2Vlbi5feUVhc2U7XG4gICAgdHdlZW4uX3lFYXNlID0gdHdlZW4uX2Vhc2U7XG4gICAgdHdlZW4uX2Vhc2UgPSB5b3lvRWFzZTtcbiAgfVxuXG4gIGlmICghdGwpIHtcbiAgICAvL2lmIHRoZXJlJ3MgYW4gaW50ZXJuYWwgdGltZWxpbmUsIHNraXAgYWxsIHRoZSBwYXJzaW5nIGJlY2F1c2Ugd2UgcGFzc2VkIHRoYXQgdGFzayBkb3duIHRoZSBjaGFpbi5cbiAgICBoYXJuZXNzID0gdGFyZ2V0c1swXSA/IF9nZXRDYWNoZSh0YXJnZXRzWzBdKS5oYXJuZXNzIDogMDtcbiAgICBoYXJuZXNzVmFycyA9IGhhcm5lc3MgJiYgdmFyc1toYXJuZXNzLnByb3BdOyAvL3NvbWVvbmUgbWF5IG5lZWQgdG8gc3BlY2lmeSBDU1Mtc3BlY2lmaWMgdmFsdWVzIEFORCBub24tQ1NTIHZhbHVlcywgbGlrZSBpZiB0aGUgZWxlbWVudCBoYXMgYW4gXCJ4XCIgcHJvcGVydHkgcGx1cyBpdCdzIGEgc3RhbmRhcmQgRE9NIGVsZW1lbnQuIFdlIGFsbG93IHBlb3BsZSB0byBkaXN0aW5ndWlzaCBieSB3cmFwcGluZyBwbHVnaW4tc3BlY2lmaWMgc3R1ZmYgaW4gYSBjc3M6e30gb2JqZWN0IGZvciBleGFtcGxlLlxuXG4gICAgY2xlYW5WYXJzID0gX2NvcHlFeGNsdWRpbmcodmFycywgX3Jlc2VydmVkUHJvcHMpO1xuICAgIHByZXZTdGFydEF0ICYmIHByZXZTdGFydEF0LnJlbmRlcigtMSwgdHJ1ZSkua2lsbCgpO1xuXG4gICAgaWYgKHN0YXJ0QXQpIHtcbiAgICAgIF9yZW1vdmVGcm9tUGFyZW50KHR3ZWVuLl9zdGFydEF0ID0gVHdlZW4uc2V0KHRhcmdldHMsIF9zZXREZWZhdWx0cyh7XG4gICAgICAgIGRhdGE6IFwiaXNTdGFydFwiLFxuICAgICAgICBvdmVyd3JpdGU6IGZhbHNlLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiB0cnVlLFxuICAgICAgICBsYXp5OiBfaXNOb3RGYWxzZShsYXp5KSxcbiAgICAgICAgc3RhcnRBdDogbnVsbCxcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIG9uVXBkYXRlOiBvblVwZGF0ZSxcbiAgICAgICAgb25VcGRhdGVQYXJhbXM6IG9uVXBkYXRlUGFyYW1zLFxuICAgICAgICBjYWxsYmFja1Njb3BlOiBjYWxsYmFja1Njb3BlLFxuICAgICAgICBzdGFnZ2VyOiAwXG4gICAgICB9LCBzdGFydEF0KSkpOyAvL2NvcHkgdGhlIHByb3BlcnRpZXMvdmFsdWVzIGludG8gYSBuZXcgb2JqZWN0IHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgdmFyIHRvID0ge3g6MH0sIGZyb20gPSB7eDo1MDB9OyB0aW1lbGluZS5mcm9tVG8oZSwgZnJvbSwgdG8pLmZyb21UbyhlLCB0bywgZnJvbSk7XG5cblxuICAgICAgaWYgKGltbWVkaWF0ZVJlbmRlcikge1xuICAgICAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgICBhdXRvUmV2ZXJ0IHx8ICh0d2Vlbi5fc3RhcnRBdCA9IDApOyAvL3R3ZWVucyB0aGF0IHJlbmRlciBpbW1lZGlhdGVseSAobGlrZSBtb3N0IGZyb20oKSBhbmQgZnJvbVRvKCkgdHdlZW5zKSBzaG91bGRuJ3QgcmV2ZXJ0IHdoZW4gdGhlaXIgcGFyZW50IHRpbWVsaW5lJ3MgcGxheWhlYWQgZ29lcyBiYWNrd2FyZCBwYXN0IHRoZSBzdGFydFRpbWUgYmVjYXVzZSB0aGUgaW5pdGlhbCByZW5kZXIgY291bGQgaGF2ZSBoYXBwZW5lZCBhbnl0aW1lIGFuZCBpdCBzaG91bGRuJ3QgYmUgZGlyZWN0bHkgY29ycmVsYXRlZCB0byB0aGlzIHR3ZWVuJ3Mgc3RhcnRUaW1lLiBJbWFnaW5lIHNldHRpbmcgdXAgYSBjb21wbGV4IGFuaW1hdGlvbiB3aGVyZSB0aGUgYmVnaW5uaW5nIHN0YXRlcyBvZiB2YXJpb3VzIG9iamVjdHMgYXJlIHJlbmRlcmVkIGltbWVkaWF0ZWx5IGJ1dCB0aGUgdHdlZW4gZG9lc24ndCBoYXBwZW4gZm9yIHF1aXRlIHNvbWUgdGltZSAtIGlmIHdlIHJldmVydCB0byB0aGUgc3RhcnRpbmcgdmFsdWVzIGFzIHNvb24gYXMgdGhlIHBsYXloZWFkIGdvZXMgYmFja3dhcmQgcGFzdCB0aGUgdHdlZW4ncyBzdGFydFRpbWUsIGl0IHdpbGwgdGhyb3cgdGhpbmdzIG9mZiB2aXN1YWxseS4gUmV2ZXJzaW9uIHNob3VsZCBvbmx5IGhhcHBlbiBpbiBUaW1lbGluZSBpbnN0YW5jZXMgd2hlcmUgaW1tZWRpYXRlUmVuZGVyIHdhcyBmYWxzZSBvciB3aGVuIGF1dG9SZXZlcnQgaXMgZXhwbGljaXRseSBzZXQgdG8gdHJ1ZS5cbiAgICAgICAgfSBlbHNlIGlmIChkdXIgJiYgISh0aW1lIDwgMCAmJiBwcmV2U3RhcnRBdCkpIHtcbiAgICAgICAgICB0aW1lICYmICh0d2Vlbi5felRpbWUgPSB0aW1lKTtcbiAgICAgICAgICByZXR1cm47IC8vd2Ugc2tpcCBpbml0aWFsaXphdGlvbiBoZXJlIHNvIHRoYXQgb3ZlcndyaXRpbmcgZG9lc24ndCBvY2N1ciB1bnRpbCB0aGUgdHdlZW4gYWN0dWFsbHkgYmVnaW5zLiBPdGhlcndpc2UsIGlmIHlvdSBjcmVhdGUgc2V2ZXJhbCBpbW1lZGlhdGVSZW5kZXI6dHJ1ZSB0d2VlbnMgb2YgdGhlIHNhbWUgdGFyZ2V0L3Byb3BlcnRpZXMgdG8gZHJvcCBpbnRvIGEgVGltZWxpbmUsIHRoZSBsYXN0IG9uZSBjcmVhdGVkIHdvdWxkIG92ZXJ3cml0ZSB0aGUgZmlyc3Qgb25lcyBiZWNhdXNlIHRoZXkgZGlkbid0IGdldCBwbGFjZWQgaW50byB0aGUgdGltZWxpbmUgeWV0IGJlZm9yZSB0aGUgZmlyc3QgcmVuZGVyIG9jY3VycyBhbmQga2lja3MgaW4gb3ZlcndyaXRpbmcuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ1bkJhY2t3YXJkcyAmJiBkdXIpIHtcbiAgICAgIC8vZnJvbSgpIHR3ZWVucyBtdXN0IGJlIGhhbmRsZWQgdW5pcXVlbHk6IHRoZWlyIGJlZ2lubmluZyB2YWx1ZXMgbXVzdCBiZSByZW5kZXJlZCBidXQgd2UgZG9uJ3Qgd2FudCBvdmVyd3JpdGluZyB0byBvY2N1ciB5ZXQgKHdoZW4gdGltZSBpcyBzdGlsbCAwKS4gV2FpdCB1bnRpbCB0aGUgdHdlZW4gYWN0dWFsbHkgYmVnaW5zIGJlZm9yZSBkb2luZyBhbGwgdGhlIHJvdXRpbmVzIGxpa2Ugb3ZlcndyaXRpbmcuIEF0IHRoYXQgdGltZSwgd2Ugc2hvdWxkIHJlbmRlciBhdCB0aGUgRU5EIG9mIHRoZSB0d2VlbiB0byBlbnN1cmUgdGhhdCB0aGluZ3MgaW5pdGlhbGl6ZSBjb3JyZWN0bHkgKHJlbWVtYmVyLCBmcm9tKCkgdHdlZW5zIGdvIGJhY2t3YXJkcylcbiAgICAgIGlmIChwcmV2U3RhcnRBdCkge1xuICAgICAgICAhYXV0b1JldmVydCAmJiAodHdlZW4uX3N0YXJ0QXQgPSAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWUgJiYgKGltbWVkaWF0ZVJlbmRlciA9IGZhbHNlKTsgLy9pbiByYXJlIGNhc2VzIChsaWtlIGlmIGEgZnJvbSgpIHR3ZWVuIHJ1bnMgYW5kIHRoZW4gaXMgaW52YWxpZGF0ZSgpLWVkKSwgaW1tZWRpYXRlUmVuZGVyIGNvdWxkIGJlIHRydWUgYnV0IHRoZSBpbml0aWFsIGZvcmNlZC1yZW5kZXIgZ2V0cyBza2lwcGVkLCBzbyB0aGVyZSdzIG5vIG5lZWQgdG8gZm9yY2UgdGhlIHJlbmRlciBpbiB0aGlzIGNvbnRleHQgd2hlbiB0aGUgX3RpbWUgaXMgZ3JlYXRlciB0aGFuIDBcblxuICAgICAgICBwID0gX3NldERlZmF1bHRzKHtcbiAgICAgICAgICBvdmVyd3JpdGU6IGZhbHNlLFxuICAgICAgICAgIGRhdGE6IFwiaXNGcm9tU3RhcnRcIixcbiAgICAgICAgICAvL3dlIHRhZyB0aGUgdHdlZW4gd2l0aCBhcyBcImlzRnJvbVN0YXJ0XCIgc28gdGhhdCBpZiBbaW5zaWRlIGEgcGx1Z2luXSB3ZSBuZWVkIHRvIG9ubHkgZG8gc29tZXRoaW5nIGF0IHRoZSB2ZXJ5IEVORCBvZiBhIHR3ZWVuLCB3ZSBoYXZlIGEgd2F5IG9mIGlkZW50aWZ5aW5nIHRoaXMgdHdlZW4gYXMgbWVyZWx5IHRoZSBvbmUgdGhhdCdzIHNldHRpbmcgdGhlIGJlZ2lubmluZyB2YWx1ZXMgZm9yIGEgXCJmcm9tKClcIiB0d2Vlbi4gRm9yIGV4YW1wbGUsIGNsZWFyUHJvcHMgaW4gQ1NTUGx1Z2luIHNob3VsZCBvbmx5IGdldCBhcHBsaWVkIGF0IHRoZSB2ZXJ5IEVORCBvZiBhIHR3ZWVuIGFuZCB3aXRob3V0IHRoaXMgdGFnLCBmcm9tKC4uLntoZWlnaHQ6MTAwLCBjbGVhclByb3BzOlwiaGVpZ2h0XCIsIGRlbGF5OjF9KSB3b3VsZCB3aXBlIHRoZSBoZWlnaHQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgdHdlZW4gYW5kIGFmdGVyIDEgc2Vjb25kLCBpdCdkIGtpY2sgYmFjayBpbi5cbiAgICAgICAgICBsYXp5OiBpbW1lZGlhdGVSZW5kZXIgJiYgX2lzTm90RmFsc2UobGF6eSksXG4gICAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiBpbW1lZGlhdGVSZW5kZXIsXG4gICAgICAgICAgLy96ZXJvLWR1cmF0aW9uIHR3ZWVucyByZW5kZXIgaW1tZWRpYXRlbHkgYnkgZGVmYXVsdCwgYnV0IGlmIHdlJ3JlIG5vdCBzcGVjaWZpY2FsbHkgaW5zdHJ1Y3RlZCB0byByZW5kZXIgdGhpcyB0d2VlbiBpbW1lZGlhdGVseSwgd2Ugc2hvdWxkIHNraXAgdGhpcyBhbmQgbWVyZWx5IF9pbml0KCkgdG8gcmVjb3JkIHRoZSBzdGFydGluZyB2YWx1ZXMgKHJlbmRlcmluZyB0aGVtIGltbWVkaWF0ZWx5IHdvdWxkIHB1c2ggdGhlbSB0byBjb21wbGV0aW9uIHdoaWNoIGlzIHdhc3RlZnVsIGluIHRoYXQgY2FzZSAtIHdlJ2QgaGF2ZSB0byByZW5kZXIoLTEpIGltbWVkaWF0ZWx5IGFmdGVyKVxuICAgICAgICAgIHN0YWdnZXI6IDAsXG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQgLy9lbnN1cmVzIHRoYXQgbmVzdGVkIHR3ZWVucyB0aGF0IGhhZCBhIHN0YWdnZXIgYXJlIGhhbmRsZWQgcHJvcGVybHksIGxpa2UgZ3NhcC5mcm9tKFwiLmNsYXNzXCIsIHt5OmdzYXAudXRpbHMud3JhcChbLTEwMCwxMDBdKX0pXG5cbiAgICAgICAgfSwgY2xlYW5WYXJzKTtcbiAgICAgICAgaGFybmVzc1ZhcnMgJiYgKHBbaGFybmVzcy5wcm9wXSA9IGhhcm5lc3NWYXJzKTsgLy8gaW4gY2FzZSBzb21lb25lIGRvZXMgc29tZXRoaW5nIGxpa2UgLmZyb20oLi4uLCB7Y3NzOnt9fSlcblxuICAgICAgICBfcmVtb3ZlRnJvbVBhcmVudCh0d2Vlbi5fc3RhcnRBdCA9IFR3ZWVuLnNldCh0YXJnZXRzLCBwKSk7XG5cbiAgICAgICAgaWYgKCFpbW1lZGlhdGVSZW5kZXIpIHtcbiAgICAgICAgICBfaW5pdFR3ZWVuKHR3ZWVuLl9zdGFydEF0LCBfdGlueU51bSk7IC8vZW5zdXJlcyB0aGF0IHRoZSBpbml0aWFsIHZhbHVlcyBhcmUgcmVjb3JkZWRcblxuICAgICAgICB9IGVsc2UgaWYgKCF0aW1lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHdlZW4uX3B0ID0gMDtcbiAgICBsYXp5ID0gZHVyICYmIF9pc05vdEZhbHNlKGxhenkpIHx8IGxhenkgJiYgIWR1cjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgZ3NEYXRhID0gdGFyZ2V0Ll9nc2FwIHx8IF9oYXJuZXNzKHRhcmdldHMpW2ldLl9nc2FwO1xuICAgICAgdHdlZW4uX3B0TG9va3VwW2ldID0gcHRMb29rdXAgPSB7fTtcbiAgICAgIF9sYXp5TG9va3VwW2dzRGF0YS5pZF0gJiYgX2xhenlSZW5kZXIoKTsgLy9pZiBvdGhlciB0d2VlbnMgb2YgdGhlIHNhbWUgdGFyZ2V0IGhhdmUgcmVjZW50bHkgaW5pdHRlZCBidXQgaGF2ZW4ndCByZW5kZXJlZCB5ZXQsIHdlJ3ZlIGdvdCB0byBmb3JjZSB0aGUgcmVuZGVyIHNvIHRoYXQgdGhlIHN0YXJ0aW5nIHZhbHVlcyBhcmUgY29ycmVjdCAoaW1hZ2luZSBwb3B1bGF0aW5nIGEgdGltZWxpbmUgd2l0aCBhIGJ1bmNoIG9mIHNlcXVlbnRpYWwgdHdlZW5zIGFuZCB0aGVuIGp1bXBpbmcgdG8gdGhlIGVuZClcblxuICAgICAgaW5kZXggPSBmdWxsVGFyZ2V0cyA9PT0gdGFyZ2V0cyA/IGkgOiBmdWxsVGFyZ2V0cy5pbmRleE9mKHRhcmdldCk7XG5cbiAgICAgIGlmIChoYXJuZXNzICYmIChwbHVnaW4gPSBuZXcgaGFybmVzcygpKS5pbml0KHRhcmdldCwgaGFybmVzc1ZhcnMgfHwgY2xlYW5WYXJzLCB0d2VlbiwgaW5kZXgsIGZ1bGxUYXJnZXRzKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdHdlZW4uX3B0ID0gcHQgPSBuZXcgUHJvcFR3ZWVuKHR3ZWVuLl9wdCwgdGFyZ2V0LCBwbHVnaW4ubmFtZSwgMCwgMSwgcGx1Z2luLnJlbmRlciwgcGx1Z2luLCAwLCBwbHVnaW4ucHJpb3JpdHkpO1xuXG4gICAgICAgIHBsdWdpbi5fcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIHB0TG9va3VwW25hbWVdID0gcHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBsdWdpbi5wcmlvcml0eSAmJiAoaGFzUHJpb3JpdHkgPSAxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFoYXJuZXNzIHx8IGhhcm5lc3NWYXJzKSB7XG4gICAgICAgIGZvciAocCBpbiBjbGVhblZhcnMpIHtcbiAgICAgICAgICBpZiAoX3BsdWdpbnNbcF0gJiYgKHBsdWdpbiA9IF9jaGVja1BsdWdpbihwLCBjbGVhblZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCBmdWxsVGFyZ2V0cykpKSB7XG4gICAgICAgICAgICBwbHVnaW4ucHJpb3JpdHkgJiYgKGhhc1ByaW9yaXR5ID0gMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB0TG9va3VwW3BdID0gcHQgPSBfYWRkUHJvcFR3ZWVuLmNhbGwodHdlZW4sIHRhcmdldCwgcCwgXCJnZXRcIiwgY2xlYW5WYXJzW3BdLCBpbmRleCwgZnVsbFRhcmdldHMsIDAsIHZhcnMuc3RyaW5nRmlsdGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdHdlZW4uX29wICYmIHR3ZWVuLl9vcFtpXSAmJiB0d2Vlbi5raWxsKHRhcmdldCwgdHdlZW4uX29wW2ldKTtcblxuICAgICAgaWYgKGF1dG9PdmVyd3JpdGUgJiYgdHdlZW4uX3B0KSB7XG4gICAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gdHdlZW47XG5cbiAgICAgICAgX2dsb2JhbFRpbWVsaW5lLmtpbGxUd2VlbnNPZih0YXJnZXQsIHB0TG9va3VwLCB0d2Vlbi5nbG9iYWxUaW1lKDApKTsgLy9BbHNvIG1ha2Ugc3VyZSB0aGUgb3ZlcndyaXRpbmcgZG9lc24ndCBvdmVyd3JpdGUgVEhJUyB0d2VlbiEhIVxuXG5cbiAgICAgICAgb3ZlcndyaXR0ZW4gPSAhdHdlZW4ucGFyZW50O1xuICAgICAgICBfb3ZlcndyaXRpbmdUd2VlbiA9IDA7XG4gICAgICB9XG5cbiAgICAgIHR3ZWVuLl9wdCAmJiBsYXp5ICYmIChfbGF6eUxvb2t1cFtnc0RhdGEuaWRdID0gMSk7XG4gICAgfVxuXG4gICAgaGFzUHJpb3JpdHkgJiYgX3NvcnRQcm9wVHdlZW5zQnlQcmlvcml0eSh0d2Vlbik7XG4gICAgdHdlZW4uX29uSW5pdCAmJiB0d2Vlbi5fb25Jbml0KHR3ZWVuKTsgLy9wbHVnaW5zIGxpa2UgUm91bmRQcm9wcyBtdXN0IHdhaXQgdW50aWwgQUxMIG9mIHRoZSBQcm9wVHdlZW5zIGFyZSBpbnN0YW50aWF0ZWQuIEluIHRoZSBwbHVnaW4ncyBpbml0KCkgZnVuY3Rpb24sIGl0IHNldHMgdGhlIF9vbkluaXQgb24gdGhlIHR3ZWVuIGluc3RhbmNlLiBNYXkgbm90IGJlIHByZXR0eS9pbnR1aXRpdmUsIGJ1dCBpdCdzIGZhc3QgYW5kIGtlZXBzIGZpbGUgc2l6ZSBkb3duLlxuICB9XG5cbiAgdHdlZW4uX2Zyb20gPSAhdGwgJiYgISF2YXJzLnJ1bkJhY2t3YXJkczsgLy9uZXN0ZWQgdGltZWxpbmVzIHNob3VsZCBuZXZlciBydW4gYmFja3dhcmRzIC0gdGhlIGJhY2t3YXJkcy1uZXNzIGlzIGluIHRoZSBjaGlsZCB0d2VlbnMuXG5cbiAgdHdlZW4uX29uVXBkYXRlID0gb25VcGRhdGU7XG4gIHR3ZWVuLl9pbml0dGVkID0gKCF0d2Vlbi5fb3AgfHwgdHdlZW4uX3B0KSAmJiAhb3ZlcndyaXR0ZW47IC8vIGlmIG92ZXJ3cml0dGVuUHJvcHMgcmVzdWx0ZWQgaW4gdGhlIGVudGlyZSB0d2VlbiBiZWluZyBraWxsZWQsIGRvIE5PVCBmbGFnIGl0IGFzIGluaXR0ZWQgb3IgZWxzZSBpdCBtYXkgcmVuZGVyIGZvciBvbmUgdGljay5cbn0sXG4gICAgX2FkZEFsaWFzZXNUb1ZhcnMgPSBmdW5jdGlvbiBfYWRkQWxpYXNlc1RvVmFycyh0YXJnZXRzLCB2YXJzKSB7XG4gIHZhciBoYXJuZXNzID0gdGFyZ2V0c1swXSA/IF9nZXRDYWNoZSh0YXJnZXRzWzBdKS5oYXJuZXNzIDogMCxcbiAgICAgIHByb3BlcnR5QWxpYXNlcyA9IGhhcm5lc3MgJiYgaGFybmVzcy5hbGlhc2VzLFxuICAgICAgY29weSxcbiAgICAgIHAsXG4gICAgICBpLFxuICAgICAgYWxpYXNlcztcblxuICBpZiAoIXByb3BlcnR5QWxpYXNlcykge1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbiAgY29weSA9IF9tZXJnZSh7fSwgdmFycyk7XG5cbiAgZm9yIChwIGluIHByb3BlcnR5QWxpYXNlcykge1xuICAgIGlmIChwIGluIGNvcHkpIHtcbiAgICAgIGFsaWFzZXMgPSBwcm9wZXJ0eUFsaWFzZXNbcF0uc3BsaXQoXCIsXCIpO1xuICAgICAgaSA9IGFsaWFzZXMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvcHlbYWxpYXNlc1tpXV0gPSBjb3B5W3BdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICBfcGFyc2VGdW5jT3JTdHJpbmcgPSBmdW5jdGlvbiBfcGFyc2VGdW5jT3JTdHJpbmcodmFsdWUsIHR3ZWVuLCBpLCB0YXJnZXQsIHRhcmdldHMpIHtcbiAgcmV0dXJuIF9pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwodHdlZW4sIGksIHRhcmdldCwgdGFyZ2V0cykgOiBfaXNTdHJpbmcodmFsdWUpICYmIH52YWx1ZS5pbmRleE9mKFwicmFuZG9tKFwiKSA/IF9yZXBsYWNlUmFuZG9tKHZhbHVlKSA6IHZhbHVlO1xufSxcbiAgICBfc3RhZ2dlclR3ZWVuUHJvcHMgPSBfY2FsbGJhY2tOYW1lcyArIFwicmVwZWF0LHJlcGVhdERlbGF5LHlveW8scmVwZWF0UmVmcmVzaCx5b3lvRWFzZVwiLFxuICAgIF9zdGFnZ2VyUHJvcHNUb1NraXAgPSAoX3N0YWdnZXJUd2VlblByb3BzICsgXCIsaWQsc3RhZ2dlcixkZWxheSxkdXJhdGlvbixwYXVzZWQsc2Nyb2xsVHJpZ2dlclwiKS5zcGxpdChcIixcIik7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRXRUVOXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxuZXhwb3J0IHZhciBUd2VlbiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0FuaW1hdGlvbjIpIHtcbiAgX2luaGVyaXRzTG9vc2UoVHdlZW4sIF9BbmltYXRpb24yKTtcblxuICBmdW5jdGlvbiBUd2Vlbih0YXJnZXRzLCB2YXJzLCB0aW1lLCBza2lwSW5oZXJpdCkge1xuICAgIHZhciBfdGhpczM7XG5cbiAgICBpZiAodHlwZW9mIHZhcnMgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRpbWUuZHVyYXRpb24gPSB2YXJzO1xuICAgICAgdmFycyA9IHRpbWU7XG4gICAgICB0aW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICBfdGhpczMgPSBfQW5pbWF0aW9uMi5jYWxsKHRoaXMsIHNraXBJbmhlcml0ID8gdmFycyA6IF9pbmhlcml0RGVmYXVsdHModmFycyksIHRpbWUpIHx8IHRoaXM7XG4gICAgdmFyIF90aGlzMyR2YXJzID0gX3RoaXMzLnZhcnMsXG4gICAgICAgIGR1cmF0aW9uID0gX3RoaXMzJHZhcnMuZHVyYXRpb24sXG4gICAgICAgIGRlbGF5ID0gX3RoaXMzJHZhcnMuZGVsYXksXG4gICAgICAgIGltbWVkaWF0ZVJlbmRlciA9IF90aGlzMyR2YXJzLmltbWVkaWF0ZVJlbmRlcixcbiAgICAgICAgc3RhZ2dlciA9IF90aGlzMyR2YXJzLnN0YWdnZXIsXG4gICAgICAgIG92ZXJ3cml0ZSA9IF90aGlzMyR2YXJzLm92ZXJ3cml0ZSxcbiAgICAgICAga2V5ZnJhbWVzID0gX3RoaXMzJHZhcnMua2V5ZnJhbWVzLFxuICAgICAgICBkZWZhdWx0cyA9IF90aGlzMyR2YXJzLmRlZmF1bHRzLFxuICAgICAgICBzY3JvbGxUcmlnZ2VyID0gX3RoaXMzJHZhcnMuc2Nyb2xsVHJpZ2dlcixcbiAgICAgICAgeW95b0Vhc2UgPSBfdGhpczMkdmFycy55b3lvRWFzZSxcbiAgICAgICAgcGFyZW50ID0gX3RoaXMzLnBhcmVudCxcbiAgICAgICAgcGFyc2VkVGFyZ2V0cyA9IChfaXNBcnJheSh0YXJnZXRzKSB8fCBfaXNUeXBlZEFycmF5KHRhcmdldHMpID8gX2lzTnVtYmVyKHRhcmdldHNbMF0pIDogXCJsZW5ndGhcIiBpbiB2YXJzKSA/IFt0YXJnZXRzXSA6IHRvQXJyYXkodGFyZ2V0cyksXG4gICAgICAgIHRsLFxuICAgICAgICBpLFxuICAgICAgICBjb3B5LFxuICAgICAgICBsLFxuICAgICAgICBwLFxuICAgICAgICBjdXJUYXJnZXQsXG4gICAgICAgIHN0YWdnZXJGdW5jLFxuICAgICAgICBzdGFnZ2VyVmFyc1RvTWVyZ2U7XG4gICAgX3RoaXMzLl90YXJnZXRzID0gcGFyc2VkVGFyZ2V0cy5sZW5ndGggPyBfaGFybmVzcyhwYXJzZWRUYXJnZXRzKSA6IF93YXJuKFwiR1NBUCB0YXJnZXQgXCIgKyB0YXJnZXRzICsgXCIgbm90IGZvdW5kLiBodHRwczovL2dyZWVuc29jay5jb21cIiwgIV9jb25maWcubnVsbFRhcmdldFdhcm4pIHx8IFtdO1xuICAgIF90aGlzMy5fcHRMb29rdXAgPSBbXTsgLy9Qcm9wVHdlZW4gbG9va3VwLiBBbiBhcnJheSBjb250YWluaW5nIGFuIG9iamVjdCBmb3IgZWFjaCB0YXJnZXQsIGhhdmluZyBrZXlzIGZvciBlYWNoIHR3ZWVuaW5nIHByb3BlcnR5XG5cbiAgICBfdGhpczMuX292ZXJ3cml0ZSA9IG92ZXJ3cml0ZTtcblxuICAgIGlmIChrZXlmcmFtZXMgfHwgc3RhZ2dlciB8fCBfaXNGdW5jT3JTdHJpbmcoZHVyYXRpb24pIHx8IF9pc0Z1bmNPclN0cmluZyhkZWxheSkpIHtcbiAgICAgIHZhcnMgPSBfdGhpczMudmFycztcbiAgICAgIHRsID0gX3RoaXMzLnRpbWVsaW5lID0gbmV3IFRpbWVsaW5lKHtcbiAgICAgICAgZGF0YTogXCJuZXN0ZWRcIixcbiAgICAgICAgZGVmYXVsdHM6IGRlZmF1bHRzIHx8IHt9XG4gICAgICB9KTtcbiAgICAgIHRsLmtpbGwoKTtcbiAgICAgIHRsLnBhcmVudCA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKTtcblxuICAgICAgaWYgKGtleWZyYW1lcykge1xuICAgICAgICBfc2V0RGVmYXVsdHModGwudmFycy5kZWZhdWx0cywge1xuICAgICAgICAgIGVhc2U6IFwibm9uZVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGtleWZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChmcmFtZSkge1xuICAgICAgICAgIHJldHVybiB0bC50byhwYXJzZWRUYXJnZXRzLCBmcmFtZSwgXCI+XCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGwgPSBwYXJzZWRUYXJnZXRzLmxlbmd0aDtcbiAgICAgICAgc3RhZ2dlckZ1bmMgPSBzdGFnZ2VyID8gZGlzdHJpYnV0ZShzdGFnZ2VyKSA6IF9lbXB0eUZ1bmM7XG5cbiAgICAgICAgaWYgKF9pc09iamVjdChzdGFnZ2VyKSkge1xuICAgICAgICAgIC8vdXNlcnMgY2FuIHBhc3MgaW4gY2FsbGJhY2tzIGxpa2Ugb25TdGFydC9vbkNvbXBsZXRlIGluIHRoZSBzdGFnZ2VyIG9iamVjdC4gVGhlc2Ugc2hvdWxkIGZpcmUgd2l0aCBlYWNoIGluZGl2aWR1YWwgdHdlZW4uXG4gICAgICAgICAgZm9yIChwIGluIHN0YWdnZXIpIHtcbiAgICAgICAgICAgIGlmICh+X3N0YWdnZXJUd2VlblByb3BzLmluZGV4T2YocCkpIHtcbiAgICAgICAgICAgICAgc3RhZ2dlclZhcnNUb01lcmdlIHx8IChzdGFnZ2VyVmFyc1RvTWVyZ2UgPSB7fSk7XG4gICAgICAgICAgICAgIHN0YWdnZXJWYXJzVG9NZXJnZVtwXSA9IHN0YWdnZXJbcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGNvcHkgPSB7fTtcblxuICAgICAgICAgIGZvciAocCBpbiB2YXJzKSB7XG4gICAgICAgICAgICBpZiAoX3N0YWdnZXJQcm9wc1RvU2tpcC5pbmRleE9mKHApIDwgMCkge1xuICAgICAgICAgICAgICBjb3B5W3BdID0gdmFyc1twXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb3B5LnN0YWdnZXIgPSAwO1xuICAgICAgICAgIHlveW9FYXNlICYmIChjb3B5LnlveW9FYXNlID0geW95b0Vhc2UpO1xuICAgICAgICAgIHN0YWdnZXJWYXJzVG9NZXJnZSAmJiBfbWVyZ2UoY29weSwgc3RhZ2dlclZhcnNUb01lcmdlKTtcbiAgICAgICAgICBjdXJUYXJnZXQgPSBwYXJzZWRUYXJnZXRzW2ldOyAvL2Rvbid0IGp1c3QgY29weSBkdXJhdGlvbiBvciBkZWxheSBiZWNhdXNlIGlmIHRoZXkncmUgYSBzdHJpbmcgb3IgZnVuY3Rpb24sIHdlJ2QgZW5kIHVwIGluIGFuIGluZmluaXRlIGxvb3AgYmVjYXVzZSBfaXNGdW5jT3JTdHJpbmcoKSB3b3VsZCBldmFsdWF0ZSBhcyB0cnVlIGluIHRoZSBjaGlsZCB0d2VlbnMsIGVudGVyaW5nIHRoaXMgbG9vcCwgZXRjLiBTbyB3ZSBwYXJzZSB0aGUgdmFsdWUgc3RyYWlnaHQgZnJvbSB2YXJzIGFuZCBkZWZhdWx0IHRvIDAuXG5cbiAgICAgICAgICBjb3B5LmR1cmF0aW9uID0gK19wYXJzZUZ1bmNPclN0cmluZyhkdXJhdGlvbiwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczMpLCBpLCBjdXJUYXJnZXQsIHBhcnNlZFRhcmdldHMpO1xuICAgICAgICAgIGNvcHkuZGVsYXkgPSAoK19wYXJzZUZ1bmNPclN0cmluZyhkZWxheSwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczMpLCBpLCBjdXJUYXJnZXQsIHBhcnNlZFRhcmdldHMpIHx8IDApIC0gX3RoaXMzLl9kZWxheTtcblxuICAgICAgICAgIGlmICghc3RhZ2dlciAmJiBsID09PSAxICYmIGNvcHkuZGVsYXkpIHtcbiAgICAgICAgICAgIC8vIGlmIHNvbWVvbmUgZG9lcyBkZWxheTpcInJhbmRvbSgxLCA1KVwiLCByZXBlYXQ6LTEsIGZvciBleGFtcGxlLCB0aGUgZGVsYXkgc2hvdWxkbid0IGJlIGluc2lkZSB0aGUgcmVwZWF0LlxuICAgICAgICAgICAgX3RoaXMzLl9kZWxheSA9IGRlbGF5ID0gY29weS5kZWxheTtcbiAgICAgICAgICAgIF90aGlzMy5fc3RhcnQgKz0gZGVsYXk7XG4gICAgICAgICAgICBjb3B5LmRlbGF5ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0bC50byhjdXJUYXJnZXQsIGNvcHksIHN0YWdnZXJGdW5jKGksIGN1clRhcmdldCwgcGFyc2VkVGFyZ2V0cykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGwuZHVyYXRpb24oKSA/IGR1cmF0aW9uID0gZGVsYXkgPSAwIDogX3RoaXMzLnRpbWVsaW5lID0gMDsgLy8gaWYgdGhlIHRpbWVsaW5lJ3MgZHVyYXRpb24gaXMgMCwgd2UgZG9uJ3QgbmVlZCBhIHRpbWVsaW5lIGludGVybmFsbHkhXG4gICAgICB9XG5cbiAgICAgIGR1cmF0aW9uIHx8IF90aGlzMy5kdXJhdGlvbihkdXJhdGlvbiA9IHRsLmR1cmF0aW9uKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpczMudGltZWxpbmUgPSAwOyAvL3NwZWVkIG9wdGltaXphdGlvbiwgZmFzdGVyIGxvb2t1cHMgKG5vIGdvaW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4pXG4gICAgfVxuXG4gICAgaWYgKG92ZXJ3cml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgX292ZXJ3cml0aW5nVHdlZW4gPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMyk7XG5cbiAgICAgIF9nbG9iYWxUaW1lbGluZS5raWxsVHdlZW5zT2YocGFyc2VkVGFyZ2V0cyk7XG5cbiAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gMDtcbiAgICB9XG5cbiAgICBwYXJlbnQgJiYgX3Bvc3RBZGRDaGVja3MocGFyZW50LCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMykpO1xuXG4gICAgaWYgKGltbWVkaWF0ZVJlbmRlciB8fCAhZHVyYXRpb24gJiYgIWtleWZyYW1lcyAmJiBfdGhpczMuX3N0YXJ0ID09PSBfcm91bmQocGFyZW50Ll90aW1lKSAmJiBfaXNOb3RGYWxzZShpbW1lZGlhdGVSZW5kZXIpICYmIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyhfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMykpICYmIHBhcmVudC5kYXRhICE9PSBcIm5lc3RlZFwiKSB7XG4gICAgICBfdGhpczMuX3RUaW1lID0gLV90aW55TnVtOyAvL2ZvcmNlcyBhIHJlbmRlciB3aXRob3V0IGhhdmluZyB0byBzZXQgdGhlIHJlbmRlcigpIFwiZm9yY2VcIiBwYXJhbWV0ZXIgdG8gdHJ1ZSBiZWNhdXNlIHdlIHdhbnQgdG8gYWxsb3cgbGF6eWluZyBieSBkZWZhdWx0ICh1c2luZyB0aGUgXCJmb3JjZVwiIHBhcmFtZXRlciBhbHdheXMgZm9yY2VzIGFuIGltbWVkaWF0ZSBmdWxsIHJlbmRlcilcblxuICAgICAgX3RoaXMzLnJlbmRlcihNYXRoLm1heCgwLCAtZGVsYXkpKTsgLy9pbiBjYXNlIGRlbGF5IGlzIG5lZ2F0aXZlXG5cbiAgICB9XG5cbiAgICBzY3JvbGxUcmlnZ2VyICYmIF9zY3JvbGxUcmlnZ2VyKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKSwgc2Nyb2xsVHJpZ2dlcik7XG4gICAgcmV0dXJuIF90aGlzMztcbiAgfVxuXG4gIHZhciBfcHJvdG8zID0gVHdlZW4ucHJvdG90eXBlO1xuXG4gIF9wcm90bzMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG4gICAgdmFyIHByZXZUaW1lID0gdGhpcy5fdGltZSxcbiAgICAgICAgdER1ciA9IHRoaXMuX3REdXIsXG4gICAgICAgIGR1ciA9IHRoaXMuX2R1cixcbiAgICAgICAgdFRpbWUgPSB0b3RhbFRpbWUgPiB0RHVyIC0gX3RpbnlOdW0gJiYgdG90YWxUaW1lID49IDAgPyB0RHVyIDogdG90YWxUaW1lIDwgX3RpbnlOdW0gPyAwIDogdG90YWxUaW1lLFxuICAgICAgICB0aW1lLFxuICAgICAgICBwdCxcbiAgICAgICAgaXRlcmF0aW9uLFxuICAgICAgICBjeWNsZUR1cmF0aW9uLFxuICAgICAgICBwcmV2SXRlcmF0aW9uLFxuICAgICAgICBpc1lveW8sXG4gICAgICAgIHJhdGlvLFxuICAgICAgICB0aW1lbGluZSxcbiAgICAgICAgeW95b0Vhc2U7XG5cbiAgICBpZiAoIWR1cikge1xuICAgICAgX3JlbmRlclplcm9EdXJhdGlvblR3ZWVuKHRoaXMsIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICB9IGVsc2UgaWYgKHRUaW1lICE9PSB0aGlzLl90VGltZSB8fCAhdG90YWxUaW1lIHx8IGZvcmNlIHx8IHRoaXMuX3N0YXJ0QXQgJiYgdGhpcy5felRpbWUgPCAwICE9PSB0b3RhbFRpbWUgPCAwKSB7XG4gICAgICAvL3RoaXMgc2Vuc2VzIGlmIHdlJ3JlIGNyb3NzaW5nIG92ZXIgdGhlIHN0YXJ0IHRpbWUsIGluIHdoaWNoIGNhc2Ugd2UgbXVzdCByZWNvcmQgX3pUaW1lIGFuZCBmb3JjZSB0aGUgcmVuZGVyLCBidXQgd2UgZG8gaXQgaW4gdGhpcyBsZW5ndGh5IGNvbmRpdGlvbmFsIHdheSBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAodXN1YWxseSB3ZSBjYW4gc2tpcCB0aGUgY2FsY3VsYXRpb25zKTogdGhpcy5faW5pdHRlZCAmJiAodGhpcy5felRpbWUgPCAwKSAhPT0gKHRvdGFsVGltZSA8IDApXG4gICAgICB0aW1lID0gdFRpbWU7XG4gICAgICB0aW1lbGluZSA9IHRoaXMudGltZWxpbmU7XG5cbiAgICAgIGlmICh0aGlzLl9yZXBlYXQpIHtcbiAgICAgICAgLy9hZGp1c3QgdGhlIHRpbWUgZm9yIHJlcGVhdHMgYW5kIHlveW9zXG4gICAgICAgIGN5Y2xlRHVyYXRpb24gPSBkdXIgKyB0aGlzLl9yRGVsYXk7XG4gICAgICAgIHRpbWUgPSBfcm91bmQodFRpbWUgJSBjeWNsZUR1cmF0aW9uKTsgLy9yb3VuZCB0byBhdm9pZCBmbG9hdGluZyBwb2ludCBlcnJvcnMuICg0ICUgMC44IHNob3VsZCBiZSAwIGJ1dCBzb21lIGJyb3dzZXJzIHJlcG9ydCBpdCBhcyAwLjc5OTk5OTk5ISlcblxuICAgICAgICBpZiAodFRpbWUgPT09IHREdXIpIHtcbiAgICAgICAgICAvLyB0aGUgdER1ciA9PT0gdFRpbWUgaXMgZm9yIGVkZ2UgY2FzZXMgd2hlcmUgdGhlcmUncyBhIGxlbmd0aHkgZGVjaW1hbCBvbiB0aGUgZHVyYXRpb24gYW5kIGl0IG1heSByZWFjaCB0aGUgdmVyeSBlbmQgYnV0IHRoZSB0aW1lIGlzIHJlbmRlcmVkIGFzIG5vdC1xdWl0ZS10aGVyZSAocmVtZW1iZXIsIHREdXIgaXMgcm91bmRlZCB0byA0IGRlY2ltYWxzIHdoZXJlYXMgZHVyIGlzbid0KVxuICAgICAgICAgIGl0ZXJhdGlvbiA9IHRoaXMuX3JlcGVhdDtcbiAgICAgICAgICB0aW1lID0gZHVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZXJhdGlvbiA9IH5+KHRUaW1lIC8gY3ljbGVEdXJhdGlvbik7XG5cbiAgICAgICAgICBpZiAoaXRlcmF0aW9uICYmIGl0ZXJhdGlvbiA9PT0gdFRpbWUgLyBjeWNsZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aW1lID0gZHVyO1xuICAgICAgICAgICAgaXRlcmF0aW9uLS07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGltZSA+IGR1ciAmJiAodGltZSA9IGR1cik7XG4gICAgICAgIH1cblxuICAgICAgICBpc1lveW8gPSB0aGlzLl95b3lvICYmIGl0ZXJhdGlvbiAmIDE7XG5cbiAgICAgICAgaWYgKGlzWW95bykge1xuICAgICAgICAgIHlveW9FYXNlID0gdGhpcy5feUVhc2U7XG4gICAgICAgICAgdGltZSA9IGR1ciAtIHRpbWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2SXRlcmF0aW9uID0gX2FuaW1hdGlvbkN5Y2xlKHRoaXMuX3RUaW1lLCBjeWNsZUR1cmF0aW9uKTtcblxuICAgICAgICBpZiAodGltZSA9PT0gcHJldlRpbWUgJiYgIWZvcmNlICYmIHRoaXMuX2luaXR0ZWQpIHtcbiAgICAgICAgICAvL2NvdWxkIGJlIGR1cmluZyB0aGUgcmVwZWF0RGVsYXkgcGFydC4gTm8gbmVlZCB0byByZW5kZXIgYW5kIGZpcmUgY2FsbGJhY2tzLlxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZXJhdGlvbiAhPT0gcHJldkl0ZXJhdGlvbikge1xuICAgICAgICAgIHRpbWVsaW5lICYmIHRoaXMuX3lFYXNlICYmIF9wcm9wYWdhdGVZb3lvRWFzZSh0aW1lbGluZSwgaXNZb3lvKTsgLy9yZXBlYXRSZWZyZXNoIGZ1bmN0aW9uYWxpdHlcblxuICAgICAgICAgIGlmICh0aGlzLnZhcnMucmVwZWF0UmVmcmVzaCAmJiAhaXNZb3lvICYmICF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrID0gZm9yY2UgPSAxOyAvL2ZvcmNlLCBvdGhlcndpc2UgaWYgbGF6eSBpcyB0cnVlLCB0aGUgX2F0dGVtcHRJbml0VHdlZW4oKSB3aWxsIHJldHVybiBhbmQgd2UnbGwganVtcCBvdXQgYW5kIGdldCBjYXVnaHQgYm91bmNpbmcgb24gZWFjaCB0aWNrLlxuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcihfcm91bmQoY3ljbGVEdXJhdGlvbiAqIGl0ZXJhdGlvbiksIHRydWUpLmludmFsaWRhdGUoKS5fbG9jayA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5faW5pdHRlZCkge1xuICAgICAgICBpZiAoX2F0dGVtcHRJbml0VHdlZW4odGhpcywgdG90YWxUaW1lIDwgMCA/IHRvdGFsVGltZSA6IHRpbWUsIGZvcmNlLCBzdXBwcmVzc0V2ZW50cykpIHtcbiAgICAgICAgICB0aGlzLl90VGltZSA9IDA7IC8vIGluIGNvbnN0cnVjdG9yIGlmIGltbWVkaWF0ZVJlbmRlciBpcyB0cnVlLCB3ZSBzZXQgX3RUaW1lIHRvIC1fdGlueU51bSB0byBoYXZlIHRoZSBwbGF5aGVhZCBjcm9zcyB0aGUgc3RhcnRpbmcgcG9pbnQgYnV0IHdlIGNhbid0IGxlYXZlIF90VGltZSBhcyBhIG5lZ2F0aXZlIG51bWJlci5cblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGR1ciAhPT0gdGhpcy5fZHVyKSB7XG4gICAgICAgICAgLy8gd2hpbGUgaW5pdHRpbmcsIGEgcGx1Z2luIGxpa2UgSW5lcnRpYVBsdWdpbiBtaWdodCBhbHRlciB0aGUgZHVyYXRpb24sIHNvIHJlcnVuIGZyb20gdGhlIHN0YXJ0IHRvIGVuc3VyZSBldmVyeXRoaW5nIHJlbmRlcnMgYXMgaXQgc2hvdWxkLlxuICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fdFRpbWUgPSB0VGltZTtcbiAgICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuXG4gICAgICBpZiAoIXRoaXMuX2FjdCAmJiB0aGlzLl90cykge1xuICAgICAgICB0aGlzLl9hY3QgPSAxOyAvL2FzIGxvbmcgYXMgaXQncyBub3QgcGF1c2VkLCBmb3JjZSBpdCB0byBiZSBhY3RpdmUgc28gdGhhdCBpZiB0aGUgdXNlciByZW5kZXJzIGluZGVwZW5kZW50IG9mIHRoZSBwYXJlbnQgdGltZWxpbmUsIGl0J2xsIGJlIGZvcmNlZCB0byByZS1yZW5kZXIgb24gdGhlIG5leHQgdGljay5cblxuICAgICAgICB0aGlzLl9sYXp5ID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yYXRpbyA9IHJhdGlvID0gKHlveW9FYXNlIHx8IHRoaXMuX2Vhc2UpKHRpbWUgLyBkdXIpO1xuXG4gICAgICBpZiAodGhpcy5fZnJvbSkge1xuICAgICAgICB0aGlzLnJhdGlvID0gcmF0aW8gPSAxIC0gcmF0aW87XG4gICAgICB9XG5cbiAgICAgIHRpbWUgJiYgIXByZXZUaW1lICYmICFzdXBwcmVzc0V2ZW50cyAmJiBfY2FsbGJhY2sodGhpcywgXCJvblN0YXJ0XCIpO1xuICAgICAgcHQgPSB0aGlzLl9wdDtcblxuICAgICAgd2hpbGUgKHB0KSB7XG4gICAgICAgIHB0LnIocmF0aW8sIHB0LmQpO1xuICAgICAgICBwdCA9IHB0Ll9uZXh0O1xuICAgICAgfVxuXG4gICAgICB0aW1lbGluZSAmJiB0aW1lbGluZS5yZW5kZXIodG90YWxUaW1lIDwgMCA/IHRvdGFsVGltZSA6ICF0aW1lICYmIGlzWW95byA/IC1fdGlueU51bSA6IHRpbWVsaW5lLl9kdXIgKiByYXRpbywgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB8fCB0aGlzLl9zdGFydEF0ICYmICh0aGlzLl96VGltZSA9IHRvdGFsVGltZSk7XG5cbiAgICAgIGlmICh0aGlzLl9vblVwZGF0ZSAmJiAhc3VwcHJlc3NFdmVudHMpIHtcbiAgICAgICAgdG90YWxUaW1lIDwgMCAmJiB0aGlzLl9zdGFydEF0ICYmIHRoaXMuX3N0YXJ0QXQucmVuZGVyKHRvdGFsVGltZSwgdHJ1ZSwgZm9yY2UpOyAvL25vdGU6IGZvciBwZXJmb3JtYW5jZSByZWFzb25zLCB3ZSB0dWNrIHRoaXMgY29uZGl0aW9uYWwgbG9naWMgaW5zaWRlIGxlc3MgdHJhdmVsZWQgYXJlYXMgKG1vc3QgdHdlZW5zIGRvbid0IGhhdmUgYW4gb25VcGRhdGUpLiBXZSdkIGp1c3QgaGF2ZSBpdCBhdCB0aGUgZW5kIGJlZm9yZSB0aGUgb25Db21wbGV0ZSwgYnV0IHRoZSB2YWx1ZXMgc2hvdWxkIGJlIHVwZGF0ZWQgYmVmb3JlIGFueSBvblVwZGF0ZSBpcyBjYWxsZWQsIHNvIHdlIEFMU08gcHV0IGl0IGhlcmUgYW5kIHRoZW4gaWYgaXQncyBub3QgY2FsbGVkLCB3ZSBkbyBzbyBsYXRlciBuZWFyIHRoZSBvbkNvbXBsZXRlLlxuXG4gICAgICAgIF9jYWxsYmFjayh0aGlzLCBcIm9uVXBkYXRlXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZXBlYXQgJiYgaXRlcmF0aW9uICE9PSBwcmV2SXRlcmF0aW9uICYmIHRoaXMudmFycy5vblJlcGVhdCAmJiAhc3VwcHJlc3NFdmVudHMgJiYgdGhpcy5wYXJlbnQgJiYgX2NhbGxiYWNrKHRoaXMsIFwib25SZXBlYXRcIik7XG5cbiAgICAgIGlmICgodFRpbWUgPT09IHRoaXMuX3REdXIgfHwgIXRUaW1lKSAmJiB0aGlzLl90VGltZSA9PT0gdFRpbWUpIHtcbiAgICAgICAgdG90YWxUaW1lIDwgMCAmJiB0aGlzLl9zdGFydEF0ICYmICF0aGlzLl9vblVwZGF0ZSAmJiB0aGlzLl9zdGFydEF0LnJlbmRlcih0b3RhbFRpbWUsIHRydWUsIHRydWUpO1xuICAgICAgICAodG90YWxUaW1lIHx8ICFkdXIpICYmICh0VGltZSA9PT0gdGhpcy5fdER1ciAmJiB0aGlzLl90cyA+IDAgfHwgIXRUaW1lICYmIHRoaXMuX3RzIDwgMCkgJiYgX3JlbW92ZUZyb21QYXJlbnQodGhpcywgMSk7IC8vIGRvbid0IHJlbW92ZSBpZiB3ZSdyZSByZW5kZXJpbmcgYXQgZXhhY3RseSBhIHRpbWUgb2YgMCwgYXMgdGhlcmUgY291bGQgYmUgYXV0b1JldmVydCB2YWx1ZXMgdGhhdCBzaG91bGQgZ2V0IHNldCBvbiB0aGUgbmV4dCB0aWNrIChpZiB0aGUgcGxheWhlYWQgZ29lcyBiYWNrd2FyZCBiZXlvbmQgdGhlIHN0YXJ0VGltZSwgbmVnYXRpdmUgdG90YWxUaW1lKS4gRG9uJ3QgcmVtb3ZlIGlmIHRoZSB0aW1lbGluZSBpcyByZXZlcnNlZCBhbmQgdGhlIHBsYXloZWFkIGlzbid0IGF0IDAsIG90aGVyd2lzZSB0bC5wcm9ncmVzcygxKS5yZXZlcnNlKCkgd29uJ3Qgd29yay4gT25seSByZW1vdmUgaWYgdGhlIHBsYXloZWFkIGlzIGF0IHRoZSBlbmQgYW5kIHRpbWVTY2FsZSBpcyBwb3NpdGl2ZSwgb3IgaWYgdGhlIHBsYXloZWFkIGlzIGF0IDAgYW5kIHRoZSB0aW1lU2NhbGUgaXMgbmVnYXRpdmUuXG5cbiAgICAgICAgaWYgKCFzdXBwcmVzc0V2ZW50cyAmJiAhKHRvdGFsVGltZSA8IDAgJiYgIXByZXZUaW1lKSAmJiAodFRpbWUgfHwgcHJldlRpbWUpKSB7XG4gICAgICAgICAgLy8gaWYgcHJldlRpbWUgYW5kIHRUaW1lIGFyZSB6ZXJvLCB3ZSBzaG91bGRuJ3QgZmlyZSB0aGUgb25SZXZlcnNlQ29tcGxldGUuIFRoaXMgY291bGQgaGFwcGVuIGlmIHlvdSBnc2FwLnRvKC4uLiB7cGF1c2VkOnRydWV9KS5wbGF5KCk7XG4gICAgICAgICAgX2NhbGxiYWNrKHRoaXMsIHRUaW1lID09PSB0RHVyID8gXCJvbkNvbXBsZXRlXCIgOiBcIm9uUmV2ZXJzZUNvbXBsZXRlXCIsIHRydWUpO1xuXG4gICAgICAgICAgdGhpcy5fcHJvbSAmJiAhKHRUaW1lIDwgdER1ciAmJiB0aGlzLnRpbWVTY2FsZSgpID4gMCkgJiYgdGhpcy5fcHJvbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMy50YXJnZXRzID0gZnVuY3Rpb24gdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfTtcblxuICBfcHJvdG8zLmludmFsaWRhdGUgPSBmdW5jdGlvbiBpbnZhbGlkYXRlKCkge1xuICAgIHRoaXMuX3B0ID0gdGhpcy5fb3AgPSB0aGlzLl9zdGFydEF0ID0gdGhpcy5fb25VcGRhdGUgPSB0aGlzLl9hY3QgPSB0aGlzLl9sYXp5ID0gMDtcbiAgICB0aGlzLl9wdExvb2t1cCA9IFtdO1xuICAgIHRoaXMudGltZWxpbmUgJiYgdGhpcy50aW1lbGluZS5pbnZhbGlkYXRlKCk7XG4gICAgcmV0dXJuIF9BbmltYXRpb24yLnByb3RvdHlwZS5pbnZhbGlkYXRlLmNhbGwodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvMy5raWxsID0gZnVuY3Rpb24ga2lsbCh0YXJnZXRzLCB2YXJzKSB7XG4gICAgaWYgKHZhcnMgPT09IHZvaWQgMCkge1xuICAgICAgdmFycyA9IFwiYWxsXCI7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRzICYmICghdmFycyB8fCB2YXJzID09PSBcImFsbFwiKSkge1xuICAgICAgdGhpcy5fbGF6eSA9IDA7XG5cbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICByZXR1cm4gX2ludGVycnVwdCh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy50aW1lbGluZSkge1xuICAgICAgdmFyIHREdXIgPSB0aGlzLnRpbWVsaW5lLnRvdGFsRHVyYXRpb24oKTtcbiAgICAgIHRoaXMudGltZWxpbmUua2lsbFR3ZWVuc09mKHRhcmdldHMsIHZhcnMsIF9vdmVyd3JpdGluZ1R3ZWVuICYmIF9vdmVyd3JpdGluZ1R3ZWVuLnZhcnMub3ZlcndyaXRlICE9PSB0cnVlKS5fZmlyc3QgfHwgX2ludGVycnVwdCh0aGlzKTsgLy8gaWYgbm90aGluZyBpcyBsZWZ0IHR3ZWVubmcsIGludGVycnVwdC5cblxuICAgICAgdGhpcy5wYXJlbnQgJiYgdER1ciAhPT0gdGhpcy50aW1lbGluZS50b3RhbER1cmF0aW9uKCkgJiYgX3NldER1cmF0aW9uKHRoaXMsIHRoaXMuX2R1ciAqIHRoaXMudGltZWxpbmUuX3REdXIgLyB0RHVyLCAwLCAxKTsgLy8gaWYgYSBuZXN0ZWQgdHdlZW4gaXMga2lsbGVkIHRoYXQgY2hhbmdlcyB0aGUgZHVyYXRpb24sIGl0IHNob3VsZCBhZmZlY3QgdGhpcyB0d2VlbidzIGR1cmF0aW9uLiBXZSBtdXN0IHVzZSB0aGUgcmF0aW8sIHRob3VnaCwgYmVjYXVzZSBzb21ldGltZXMgdGhlIGludGVybmFsIHRpbWVsaW5lIGlzIHN0cmV0Y2hlZCBsaWtlIGZvciBrZXlmcmFtZXMgd2hlcmUgdGhleSBkb24ndCBhbGwgYWRkIHVwIHRvIHdoYXRldmVyIHRoZSBwYXJlbnQgdHdlZW4ncyBkdXJhdGlvbiB3YXMgc2V0IHRvLlxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgcGFyc2VkVGFyZ2V0cyA9IHRoaXMuX3RhcmdldHMsXG4gICAgICAgIGtpbGxpbmdUYXJnZXRzID0gdGFyZ2V0cyA/IHRvQXJyYXkodGFyZ2V0cykgOiBwYXJzZWRUYXJnZXRzLFxuICAgICAgICBwcm9wVHdlZW5Mb29rdXAgPSB0aGlzLl9wdExvb2t1cCxcbiAgICAgICAgZmlyc3RQVCA9IHRoaXMuX3B0LFxuICAgICAgICBvdmVyd3JpdHRlblByb3BzLFxuICAgICAgICBjdXJMb29rdXAsXG4gICAgICAgIGN1ck92ZXJ3cml0ZVByb3BzLFxuICAgICAgICBwcm9wcyxcbiAgICAgICAgcCxcbiAgICAgICAgcHQsXG4gICAgICAgIGk7XG5cbiAgICBpZiAoKCF2YXJzIHx8IHZhcnMgPT09IFwiYWxsXCIpICYmIF9hcnJheXNNYXRjaChwYXJzZWRUYXJnZXRzLCBraWxsaW5nVGFyZ2V0cykpIHtcbiAgICAgIHZhcnMgPT09IFwiYWxsXCIgJiYgKHRoaXMuX3B0ID0gMCk7XG4gICAgICByZXR1cm4gX2ludGVycnVwdCh0aGlzKTtcbiAgICB9XG5cbiAgICBvdmVyd3JpdHRlblByb3BzID0gdGhpcy5fb3AgPSB0aGlzLl9vcCB8fCBbXTtcblxuICAgIGlmICh2YXJzICE9PSBcImFsbFwiKSB7XG4gICAgICAvL3NvIHBlb3BsZSBjYW4gcGFzcyBpbiBhIGNvbW1hLWRlbGltaXRlZCBsaXN0IG9mIHByb3BlcnR5IG5hbWVzXG4gICAgICBpZiAoX2lzU3RyaW5nKHZhcnMpKSB7XG4gICAgICAgIHAgPSB7fTtcblxuICAgICAgICBfZm9yRWFjaE5hbWUodmFycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gcFtuYW1lXSA9IDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhcnMgPSBwO1xuICAgICAgfVxuXG4gICAgICB2YXJzID0gX2FkZEFsaWFzZXNUb1ZhcnMocGFyc2VkVGFyZ2V0cywgdmFycyk7XG4gICAgfVxuXG4gICAgaSA9IHBhcnNlZFRhcmdldHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKH5raWxsaW5nVGFyZ2V0cy5pbmRleE9mKHBhcnNlZFRhcmdldHNbaV0pKSB7XG4gICAgICAgIGN1ckxvb2t1cCA9IHByb3BUd2Vlbkxvb2t1cFtpXTtcblxuICAgICAgICBpZiAodmFycyA9PT0gXCJhbGxcIikge1xuICAgICAgICAgIG92ZXJ3cml0dGVuUHJvcHNbaV0gPSB2YXJzO1xuICAgICAgICAgIHByb3BzID0gY3VyTG9va3VwO1xuICAgICAgICAgIGN1ck92ZXJ3cml0ZVByb3BzID0ge307XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHMgPSBvdmVyd3JpdHRlblByb3BzW2ldID0gb3ZlcndyaXR0ZW5Qcm9wc1tpXSB8fCB7fTtcbiAgICAgICAgICBwcm9wcyA9IHZhcnM7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHAgaW4gcHJvcHMpIHtcbiAgICAgICAgICBwdCA9IGN1ckxvb2t1cCAmJiBjdXJMb29rdXBbcF07XG5cbiAgICAgICAgICBpZiAocHQpIHtcbiAgICAgICAgICAgIGlmICghKFwia2lsbFwiIGluIHB0LmQpIHx8IHB0LmQua2lsbChwKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0odGhpcywgcHQsIFwiX3B0XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgY3VyTG9va3VwW3BdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjdXJPdmVyd3JpdGVQcm9wcyAhPT0gXCJhbGxcIikge1xuICAgICAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHNbcF0gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2luaXR0ZWQgJiYgIXRoaXMuX3B0ICYmIGZpcnN0UFQgJiYgX2ludGVycnVwdCh0aGlzKTsgLy9pZiBhbGwgdHdlZW5pbmcgcHJvcGVydGllcyBhcmUga2lsbGVkLCBraWxsIHRoZSB0d2Vlbi4gV2l0aG91dCB0aGlzIGxpbmUsIGlmIHRoZXJlJ3MgYSB0d2VlbiB3aXRoIG11bHRpcGxlIHRhcmdldHMgYW5kIHRoZW4geW91IGtpbGxUd2VlbnNPZigpIGVhY2ggdGFyZ2V0IGluZGl2aWR1YWxseSwgdGhlIHR3ZWVuIHdvdWxkIHRlY2huaWNhbGx5IHN0aWxsIHJlbWFpbiBhY3RpdmUgYW5kIGZpcmUgaXRzIG9uQ29tcGxldGUgZXZlbiB0aG91Z2ggdGhlcmUgYXJlbid0IGFueSBtb3JlIHByb3BlcnRpZXMgdHdlZW5pbmcuXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBUd2Vlbi50byA9IGZ1bmN0aW9uIHRvKHRhcmdldHMsIHZhcnMpIHtcbiAgICByZXR1cm4gbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMsIGFyZ3VtZW50c1syXSk7XG4gIH07XG5cbiAgVHdlZW4uZnJvbSA9IGZ1bmN0aW9uIGZyb20odGFyZ2V0cywgdmFycykge1xuICAgIHJldHVybiBuZXcgVHdlZW4odGFyZ2V0cywgX3BhcnNlVmFycyhhcmd1bWVudHMsIDEpKTtcbiAgfTtcblxuICBUd2Vlbi5kZWxheWVkQ2FsbCA9IGZ1bmN0aW9uIGRlbGF5ZWRDYWxsKGRlbGF5LCBjYWxsYmFjaywgcGFyYW1zLCBzY29wZSkge1xuICAgIHJldHVybiBuZXcgVHdlZW4oY2FsbGJhY2ssIDAsIHtcbiAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICBsYXp5OiBmYWxzZSxcbiAgICAgIG92ZXJ3cml0ZTogZmFsc2UsXG4gICAgICBkZWxheTogZGVsYXksXG4gICAgICBvbkNvbXBsZXRlOiBjYWxsYmFjayxcbiAgICAgIG9uUmV2ZXJzZUNvbXBsZXRlOiBjYWxsYmFjayxcbiAgICAgIG9uQ29tcGxldGVQYXJhbXM6IHBhcmFtcyxcbiAgICAgIG9uUmV2ZXJzZUNvbXBsZXRlUGFyYW1zOiBwYXJhbXMsXG4gICAgICBjYWxsYmFja1Njb3BlOiBzY29wZVxuICAgIH0pO1xuICB9O1xuXG4gIFR3ZWVuLmZyb21UbyA9IGZ1bmN0aW9uIGZyb21Ubyh0YXJnZXRzLCBmcm9tVmFycywgdG9WYXJzKSB7XG4gICAgcmV0dXJuIG5ldyBUd2Vlbih0YXJnZXRzLCBfcGFyc2VWYXJzKGFyZ3VtZW50cywgMikpO1xuICB9O1xuXG4gIFR3ZWVuLnNldCA9IGZ1bmN0aW9uIHNldCh0YXJnZXRzLCB2YXJzKSB7XG4gICAgdmFycy5kdXJhdGlvbiA9IDA7XG4gICAgdmFycy5yZXBlYXREZWxheSB8fCAodmFycy5yZXBlYXQgPSAwKTtcbiAgICByZXR1cm4gbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMpO1xuICB9O1xuXG4gIFR3ZWVuLmtpbGxUd2VlbnNPZiA9IGZ1bmN0aW9uIGtpbGxUd2VlbnNPZih0YXJnZXRzLCBwcm9wcywgb25seUFjdGl2ZSkge1xuICAgIHJldHVybiBfZ2xvYmFsVGltZWxpbmUua2lsbFR3ZWVuc09mKHRhcmdldHMsIHByb3BzLCBvbmx5QWN0aXZlKTtcbiAgfTtcblxuICByZXR1cm4gVHdlZW47XG59KEFuaW1hdGlvbik7XG5cbl9zZXREZWZhdWx0cyhUd2Vlbi5wcm90b3R5cGUsIHtcbiAgX3RhcmdldHM6IFtdLFxuICBfbGF6eTogMCxcbiAgX3N0YXJ0QXQ6IDAsXG4gIF9vcDogMCxcbiAgX29uSW5pdDogMFxufSk7IC8vYWRkIHRoZSBwZXJ0aW5lbnQgdGltZWxpbmUgbWV0aG9kcyB0byBUd2VlbiBpbnN0YW5jZXMgc28gdGhhdCB1c2VycyBjYW4gY2hhaW4gY29udmVuaWVudGx5IGFuZCBjcmVhdGUgYSB0aW1lbGluZSBhdXRvbWF0aWNhbGx5LiAocmVtb3ZlZCBkdWUgdG8gY29uY2VybnMgdGhhdCBpdCdkIHVsdGltYXRlbHkgYWRkIHRvIG1vcmUgY29uZnVzaW9uIGVzcGVjaWFsbHkgZm9yIGJlZ2lubmVycylcbi8vIF9mb3JFYWNoTmFtZShcInRvLGZyb20sZnJvbVRvLHNldCxjYWxsLGFkZCxhZGRMYWJlbCxhZGRQYXVzZVwiLCBuYW1lID0+IHtcbi8vIFx0VHdlZW4ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4vLyBcdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lKCk7XG4vLyBcdFx0cmV0dXJuIF9hZGRUb1RpbWVsaW5lKHRsLCB0aGlzKVtuYW1lXS5hcHBseSh0bCwgdG9BcnJheShhcmd1bWVudHMpKTtcbi8vIFx0fVxuLy8gfSk7XG4vL2ZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LiBMZXZlcmFnZSB0aGUgdGltZWxpbmUgY2FsbHMuXG5cblxuX2ZvckVhY2hOYW1lKFwic3RhZ2dlclRvLHN0YWdnZXJGcm9tLHN0YWdnZXJGcm9tVG9cIiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgVHdlZW5bbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRsID0gbmV3IFRpbWVsaW5lKCksXG4gICAgICAgIHBhcmFtcyA9IF9zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICBwYXJhbXMuc3BsaWNlKG5hbWUgPT09IFwic3RhZ2dlckZyb21Ub1wiID8gNSA6IDQsIDAsIDApO1xuICAgIHJldHVybiB0bFtuYW1lXS5hcHBseSh0bCwgcGFyYW1zKTtcbiAgfTtcbn0pO1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQUk9QVFdFRU5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG52YXIgX3NldHRlclBsYWluID0gZnVuY3Rpb24gX3NldHRlclBsYWluKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG59LFxuICAgIF9zZXR0ZXJGdW5jID0gZnVuY3Rpb24gX3NldHRlckZ1bmModGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldFtwcm9wZXJ0eV0odmFsdWUpO1xufSxcbiAgICBfc2V0dGVyRnVuY1dpdGhQYXJhbSA9IGZ1bmN0aW9uIF9zZXR0ZXJGdW5jV2l0aFBhcmFtKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCBkYXRhKSB7XG4gIHJldHVybiB0YXJnZXRbcHJvcGVydHldKGRhdGEuZnAsIHZhbHVlKTtcbn0sXG4gICAgX3NldHRlckF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9zZXR0ZXJBdHRyaWJ1dGUodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5zZXRBdHRyaWJ1dGUocHJvcGVydHksIHZhbHVlKTtcbn0sXG4gICAgX2dldFNldHRlciA9IGZ1bmN0aW9uIF9nZXRTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICByZXR1cm4gX2lzRnVuY3Rpb24odGFyZ2V0W3Byb3BlcnR5XSkgPyBfc2V0dGVyRnVuYyA6IF9pc1VuZGVmaW5lZCh0YXJnZXRbcHJvcGVydHldKSAmJiB0YXJnZXQuc2V0QXR0cmlidXRlID8gX3NldHRlckF0dHJpYnV0ZSA6IF9zZXR0ZXJQbGFpbjtcbn0sXG4gICAgX3JlbmRlclBsYWluID0gZnVuY3Rpb24gX3JlbmRlclBsYWluKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgTWF0aC5yb3VuZCgoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pICogMTAwMDApIC8gMTAwMDAsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyQm9vbGVhbiA9IGZ1bmN0aW9uIF9yZW5kZXJCb29sZWFuKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgISEoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pLCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlckNvbXBsZXhTdHJpbmcgPSBmdW5jdGlvbiBfcmVuZGVyQ29tcGxleFN0cmluZyhyYXRpbywgZGF0YSkge1xuICB2YXIgcHQgPSBkYXRhLl9wdCxcbiAgICAgIHMgPSBcIlwiO1xuXG4gIGlmICghcmF0aW8gJiYgZGF0YS5iKSB7XG4gICAgLy9iID0gYmVnaW5uaW5nIHN0cmluZ1xuICAgIHMgPSBkYXRhLmI7XG4gIH0gZWxzZSBpZiAocmF0aW8gPT09IDEgJiYgZGF0YS5lKSB7XG4gICAgLy9lID0gZW5kaW5nIHN0cmluZ1xuICAgIHMgPSBkYXRhLmU7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHB0KSB7XG4gICAgICBzID0gcHQucCArIChwdC5tID8gcHQubShwdC5zICsgcHQuYyAqIHJhdGlvKSA6IE1hdGgucm91bmQoKHB0LnMgKyBwdC5jICogcmF0aW8pICogMTAwMDApIC8gMTAwMDApICsgczsgLy93ZSB1c2UgdGhlIFwicFwiIHByb3BlcnR5IGZvciB0aGUgdGV4dCBpbmJldHdlZW4gKGxpa2UgYSBzdWZmaXgpLiBBbmQgaW4gdGhlIGNvbnRleHQgb2YgYSBjb21wbGV4IHN0cmluZywgdGhlIG1vZGlmaWVyIChtKSBpcyB0eXBpY2FsbHkganVzdCBNYXRoLnJvdW5kKCksIGxpa2UgZm9yIFJHQiBjb2xvcnMuXG5cbiAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgfVxuXG4gICAgcyArPSBkYXRhLmM7IC8vd2UgdXNlIHRoZSBcImNcIiBvZiB0aGUgUHJvcFR3ZWVuIHRvIHN0b3JlIHRoZSBmaW5hbCBjaHVuayBvZiBub24tbnVtZXJpYyB0ZXh0LlxuICB9XG5cbiAgZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIHMsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyUHJvcFR3ZWVucyA9IGZ1bmN0aW9uIF9yZW5kZXJQcm9wVHdlZW5zKHJhdGlvLCBkYXRhKSB7XG4gIHZhciBwdCA9IGRhdGEuX3B0O1xuXG4gIHdoaWxlIChwdCkge1xuICAgIHB0LnIocmF0aW8sIHB0LmQpO1xuICAgIHB0ID0gcHQuX25leHQ7XG4gIH1cbn0sXG4gICAgX2FkZFBsdWdpbk1vZGlmaWVyID0gZnVuY3Rpb24gX2FkZFBsdWdpbk1vZGlmaWVyKG1vZGlmaWVyLCB0d2VlbiwgdGFyZ2V0LCBwcm9wZXJ0eSkge1xuICB2YXIgcHQgPSB0aGlzLl9wdCxcbiAgICAgIG5leHQ7XG5cbiAgd2hpbGUgKHB0KSB7XG4gICAgbmV4dCA9IHB0Ll9uZXh0O1xuICAgIHB0LnAgPT09IHByb3BlcnR5ICYmIHB0Lm1vZGlmaWVyKG1vZGlmaWVyLCB0d2VlbiwgdGFyZ2V0KTtcbiAgICBwdCA9IG5leHQ7XG4gIH1cbn0sXG4gICAgX2tpbGxQcm9wVHdlZW5zT2YgPSBmdW5jdGlvbiBfa2lsbFByb3BUd2VlbnNPZihwcm9wZXJ0eSkge1xuICB2YXIgcHQgPSB0aGlzLl9wdCxcbiAgICAgIGhhc05vbkRlcGVuZGVudFJlbWFpbmluZyxcbiAgICAgIG5leHQ7XG5cbiAgd2hpbGUgKHB0KSB7XG4gICAgbmV4dCA9IHB0Ll9uZXh0O1xuXG4gICAgaWYgKHB0LnAgPT09IHByb3BlcnR5ICYmICFwdC5vcCB8fCBwdC5vcCA9PT0gcHJvcGVydHkpIHtcbiAgICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSh0aGlzLCBwdCwgXCJfcHRcIik7XG4gICAgfSBlbHNlIGlmICghcHQuZGVwKSB7XG4gICAgICBoYXNOb25EZXBlbmRlbnRSZW1haW5pbmcgPSAxO1xuICAgIH1cblxuICAgIHB0ID0gbmV4dDtcbiAgfVxuXG4gIHJldHVybiAhaGFzTm9uRGVwZW5kZW50UmVtYWluaW5nO1xufSxcbiAgICBfc2V0dGVyV2l0aE1vZGlmaWVyID0gZnVuY3Rpb24gX3NldHRlcldpdGhNb2RpZmllcih0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgZGF0YSkge1xuICBkYXRhLm1TZXQodGFyZ2V0LCBwcm9wZXJ0eSwgZGF0YS5tLmNhbGwoZGF0YS50d2VlbiwgdmFsdWUsIGRhdGEubXQpLCBkYXRhKTtcbn0sXG4gICAgX3NvcnRQcm9wVHdlZW5zQnlQcmlvcml0eSA9IGZ1bmN0aW9uIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHkocGFyZW50KSB7XG4gIHZhciBwdCA9IHBhcmVudC5fcHQsXG4gICAgICBuZXh0LFxuICAgICAgcHQyLFxuICAgICAgZmlyc3QsXG4gICAgICBsYXN0OyAvL3NvcnRzIHRoZSBQcm9wVHdlZW4gbGlua2VkIGxpc3QgaW4gb3JkZXIgb2YgcHJpb3JpdHkgYmVjYXVzZSBzb21lIHBsdWdpbnMgbmVlZCB0byBkbyB0aGVpciB3b3JrIGFmdGVyIEFMTCBvZiB0aGUgUHJvcFR3ZWVucyB3ZXJlIGNyZWF0ZWQgKGxpa2UgUm91bmRQcm9wc1BsdWdpbiBhbmQgTW9kaWZpZXJzUGx1Z2luKVxuXG4gIHdoaWxlIChwdCkge1xuICAgIG5leHQgPSBwdC5fbmV4dDtcbiAgICBwdDIgPSBmaXJzdDtcblxuICAgIHdoaWxlIChwdDIgJiYgcHQyLnByID4gcHQucHIpIHtcbiAgICAgIHB0MiA9IHB0Mi5fbmV4dDtcbiAgICB9XG5cbiAgICBpZiAocHQuX3ByZXYgPSBwdDIgPyBwdDIuX3ByZXYgOiBsYXN0KSB7XG4gICAgICBwdC5fcHJldi5fbmV4dCA9IHB0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdCA9IHB0O1xuICAgIH1cblxuICAgIGlmIChwdC5fbmV4dCA9IHB0Mikge1xuICAgICAgcHQyLl9wcmV2ID0gcHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3QgPSBwdDtcbiAgICB9XG5cbiAgICBwdCA9IG5leHQ7XG4gIH1cblxuICBwYXJlbnQuX3B0ID0gZmlyc3Q7XG59OyAvL1Byb3BUd2VlbiBrZXk6IHQgPSB0YXJnZXQsIHAgPSBwcm9wLCByID0gcmVuZGVyZXIsIGQgPSBkYXRhLCBzID0gc3RhcnQsIGMgPSBjaGFuZ2UsIG9wID0gb3ZlcndyaXRlUHJvcGVydHkgKE9OTFkgcG9wdWxhdGVkIHdoZW4gaXQncyBkaWZmZXJlbnQgdGhhbiBwKSwgcHIgPSBwcmlvcml0eSwgX25leHQvX3ByZXYgZm9yIHRoZSBsaW5rZWQgbGlzdCBzaWJsaW5ncywgc2V0ID0gc2V0dGVyLCBtID0gbW9kaWZpZXIsIG1TZXQgPSBtb2RpZmllclNldHRlciAodGhlIG9yaWdpbmFsIHNldHRlciwgYmVmb3JlIGEgbW9kaWZpZXIgd2FzIGFkZGVkKVxuXG5cbmV4cG9ydCB2YXIgUHJvcFR3ZWVuID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUHJvcFR3ZWVuKG5leHQsIHRhcmdldCwgcHJvcCwgc3RhcnQsIGNoYW5nZSwgcmVuZGVyZXIsIGRhdGEsIHNldHRlciwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgdGhpcy5zID0gc3RhcnQ7XG4gICAgdGhpcy5jID0gY2hhbmdlO1xuICAgIHRoaXMucCA9IHByb3A7XG4gICAgdGhpcy5yID0gcmVuZGVyZXIgfHwgX3JlbmRlclBsYWluO1xuICAgIHRoaXMuZCA9IGRhdGEgfHwgdGhpcztcbiAgICB0aGlzLnNldCA9IHNldHRlciB8fCBfc2V0dGVyUGxhaW47XG4gICAgdGhpcy5wciA9IHByaW9yaXR5IHx8IDA7XG4gICAgdGhpcy5fbmV4dCA9IG5leHQ7XG5cbiAgICBpZiAobmV4dCkge1xuICAgICAgbmV4dC5fcHJldiA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgdmFyIF9wcm90bzQgPSBQcm9wVHdlZW4ucHJvdG90eXBlO1xuXG4gIF9wcm90bzQubW9kaWZpZXIgPSBmdW5jdGlvbiBtb2RpZmllcihmdW5jLCB0d2VlbiwgdGFyZ2V0KSB7XG4gICAgdGhpcy5tU2V0ID0gdGhpcy5tU2V0IHx8IHRoaXMuc2V0OyAvL2luIGNhc2UgaXQgd2FzIGFscmVhZHkgc2V0IChhIFByb3BUd2VlbiBjYW4gb25seSBoYXZlIG9uZSBtb2RpZmllcilcblxuICAgIHRoaXMuc2V0ID0gX3NldHRlcldpdGhNb2RpZmllcjtcbiAgICB0aGlzLm0gPSBmdW5jO1xuICAgIHRoaXMubXQgPSB0YXJnZXQ7IC8vbW9kaWZpZXIgdGFyZ2V0XG5cbiAgICB0aGlzLnR3ZWVuID0gdHdlZW47XG4gIH07XG5cbiAgcmV0dXJuIFByb3BUd2Vlbjtcbn0oKTsgLy9Jbml0aWFsaXphdGlvbiB0YXNrc1xuXG5fZm9yRWFjaE5hbWUoX2NhbGxiYWNrTmFtZXMgKyBcInBhcmVudCxkdXJhdGlvbixlYXNlLGRlbGF5LG92ZXJ3cml0ZSxydW5CYWNrd2FyZHMsc3RhcnRBdCx5b3lvLGltbWVkaWF0ZVJlbmRlcixyZXBlYXQscmVwZWF0RGVsYXksZGF0YSxwYXVzZWQscmV2ZXJzZWQsbGF6eSxjYWxsYmFja1Njb3BlLHN0cmluZ0ZpbHRlcixpZCx5b3lvRWFzZSxzdGFnZ2VyLGluaGVyaXQscmVwZWF0UmVmcmVzaCxrZXlmcmFtZXMsYXV0b1JldmVydCxzY3JvbGxUcmlnZ2VyXCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBfcmVzZXJ2ZWRQcm9wc1tuYW1lXSA9IDE7XG59KTtcblxuX2dsb2JhbHMuVHdlZW5NYXggPSBfZ2xvYmFscy5Ud2VlbkxpdGUgPSBUd2Vlbjtcbl9nbG9iYWxzLlRpbWVsaW5lTGl0ZSA9IF9nbG9iYWxzLlRpbWVsaW5lTWF4ID0gVGltZWxpbmU7XG5fZ2xvYmFsVGltZWxpbmUgPSBuZXcgVGltZWxpbmUoe1xuICBzb3J0Q2hpbGRyZW46IGZhbHNlLFxuICBkZWZhdWx0czogX2RlZmF1bHRzLFxuICBhdXRvUmVtb3ZlQ2hpbGRyZW46IHRydWUsXG4gIGlkOiBcInJvb3RcIixcbiAgc21vb3RoQ2hpbGRUaW1pbmc6IHRydWVcbn0pO1xuX2NvbmZpZy5zdHJpbmdGaWx0ZXIgPSBfY29sb3JTdHJpbmdGaWx0ZXI7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEdTQVBcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIF9nc2FwID0ge1xuICByZWdpc3RlclBsdWdpbjogZnVuY3Rpb24gcmVnaXN0ZXJQbHVnaW4oKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgIHJldHVybiBfY3JlYXRlUGx1Z2luKGNvbmZpZyk7XG4gICAgfSk7XG4gIH0sXG4gIHRpbWVsaW5lOiBmdW5jdGlvbiB0aW1lbGluZSh2YXJzKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lbGluZSh2YXJzKTtcbiAgfSxcbiAgZ2V0VHdlZW5zT2Y6IGZ1bmN0aW9uIGdldFR3ZWVuc09mKHRhcmdldHMsIG9ubHlBY3RpdmUpIHtcbiAgICByZXR1cm4gX2dsb2JhbFRpbWVsaW5lLmdldFR3ZWVuc09mKHRhcmdldHMsIG9ubHlBY3RpdmUpO1xuICB9LFxuICBnZXRQcm9wZXJ0eTogZnVuY3Rpb24gZ2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkge1xuICAgIF9pc1N0cmluZyh0YXJnZXQpICYmICh0YXJnZXQgPSB0b0FycmF5KHRhcmdldClbMF0pOyAvL2luIGNhc2Ugc2VsZWN0b3IgdGV4dCBvciBhbiBhcnJheSBpcyBwYXNzZWQgaW5cblxuICAgIHZhciBnZXR0ZXIgPSBfZ2V0Q2FjaGUodGFyZ2V0IHx8IHt9KS5nZXQsXG4gICAgICAgIGZvcm1hdCA9IHVuaXQgPyBfcGFzc1Rocm91Z2ggOiBfbnVtZXJpY0lmUG9zc2libGU7XG5cbiAgICB1bml0ID09PSBcIm5hdGl2ZVwiICYmICh1bml0ID0gXCJcIik7XG4gICAgcmV0dXJuICF0YXJnZXQgPyB0YXJnZXQgOiAhcHJvcGVydHkgPyBmdW5jdGlvbiAocHJvcGVydHksIHVuaXQsIHVuY2FjaGUpIHtcbiAgICAgIHJldHVybiBmb3JtYXQoKF9wbHVnaW5zW3Byb3BlcnR5XSAmJiBfcGx1Z2luc1twcm9wZXJ0eV0uZ2V0IHx8IGdldHRlcikodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkpO1xuICAgIH0gOiBmb3JtYXQoKF9wbHVnaW5zW3Byb3BlcnR5XSAmJiBfcGx1Z2luc1twcm9wZXJ0eV0uZ2V0IHx8IGdldHRlcikodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkpO1xuICB9LFxuICBxdWlja1NldHRlcjogZnVuY3Rpb24gcXVpY2tTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCkge1xuICAgIHRhcmdldCA9IHRvQXJyYXkodGFyZ2V0KTtcblxuICAgIGlmICh0YXJnZXQubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIHNldHRlcnMgPSB0YXJnZXQubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiBnc2FwLnF1aWNrU2V0dGVyKHQsIHByb3BlcnR5LCB1bml0KTtcbiAgICAgIH0pLFxuICAgICAgICAgIGwgPSBzZXR0ZXJzLmxlbmd0aDtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGkgPSBsO1xuXG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBzZXR0ZXJzW2ldKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0YXJnZXQgPSB0YXJnZXRbMF0gfHwge307XG5cbiAgICB2YXIgUGx1Z2luID0gX3BsdWdpbnNbcHJvcGVydHldLFxuICAgICAgICBjYWNoZSA9IF9nZXRDYWNoZSh0YXJnZXQpLFxuICAgICAgICBwID0gY2FjaGUuaGFybmVzcyAmJiAoY2FjaGUuaGFybmVzcy5hbGlhc2VzIHx8IHt9KVtwcm9wZXJ0eV0gfHwgcHJvcGVydHksXG4gICAgICAgIC8vIGluIGNhc2UgaXQncyBhbiBhbGlhcywgbGlrZSBcInJvdGF0ZVwiIGZvciBcInJvdGF0aW9uXCIuXG4gICAgc2V0dGVyID0gUGx1Z2luID8gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB2YXIgcCA9IG5ldyBQbHVnaW4oKTtcbiAgICAgIF9xdWlja1R3ZWVuLl9wdCA9IDA7XG4gICAgICBwLmluaXQodGFyZ2V0LCB1bml0ID8gdmFsdWUgKyB1bml0IDogdmFsdWUsIF9xdWlja1R3ZWVuLCAwLCBbdGFyZ2V0XSk7XG4gICAgICBwLnJlbmRlcigxLCBwKTtcbiAgICAgIF9xdWlja1R3ZWVuLl9wdCAmJiBfcmVuZGVyUHJvcFR3ZWVucygxLCBfcXVpY2tUd2Vlbik7XG4gICAgfSA6IGNhY2hlLnNldCh0YXJnZXQsIHApO1xuXG4gICAgcmV0dXJuIFBsdWdpbiA/IHNldHRlciA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHNldHRlcih0YXJnZXQsIHAsIHVuaXQgPyB2YWx1ZSArIHVuaXQgOiB2YWx1ZSwgY2FjaGUsIDEpO1xuICAgIH07XG4gIH0sXG4gIGlzVHdlZW5pbmc6IGZ1bmN0aW9uIGlzVHdlZW5pbmcodGFyZ2V0cykge1xuICAgIHJldHVybiBfZ2xvYmFsVGltZWxpbmUuZ2V0VHdlZW5zT2YodGFyZ2V0cywgdHJ1ZSkubGVuZ3RoID4gMDtcbiAgfSxcbiAgZGVmYXVsdHM6IGZ1bmN0aW9uIGRlZmF1bHRzKHZhbHVlKSB7XG4gICAgdmFsdWUgJiYgdmFsdWUuZWFzZSAmJiAodmFsdWUuZWFzZSA9IF9wYXJzZUVhc2UodmFsdWUuZWFzZSwgX2RlZmF1bHRzLmVhc2UpKTtcbiAgICByZXR1cm4gX21lcmdlRGVlcChfZGVmYXVsdHMsIHZhbHVlIHx8IHt9KTtcbiAgfSxcbiAgY29uZmlnOiBmdW5jdGlvbiBjb25maWcodmFsdWUpIHtcbiAgICByZXR1cm4gX21lcmdlRGVlcChfY29uZmlnLCB2YWx1ZSB8fCB7fSk7XG4gIH0sXG4gIHJlZ2lzdGVyRWZmZWN0OiBmdW5jdGlvbiByZWdpc3RlckVmZmVjdChfcmVmKSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICAgIGVmZmVjdCA9IF9yZWYuZWZmZWN0LFxuICAgICAgICBwbHVnaW5zID0gX3JlZi5wbHVnaW5zLFxuICAgICAgICBkZWZhdWx0cyA9IF9yZWYuZGVmYXVsdHMsXG4gICAgICAgIGV4dGVuZFRpbWVsaW5lID0gX3JlZi5leHRlbmRUaW1lbGluZTtcbiAgICAocGx1Z2lucyB8fCBcIlwiKS5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luTmFtZSkge1xuICAgICAgcmV0dXJuIHBsdWdpbk5hbWUgJiYgIV9wbHVnaW5zW3BsdWdpbk5hbWVdICYmICFfZ2xvYmFsc1twbHVnaW5OYW1lXSAmJiBfd2FybihuYW1lICsgXCIgZWZmZWN0IHJlcXVpcmVzIFwiICsgcGx1Z2luTmFtZSArIFwiIHBsdWdpbi5cIik7XG4gICAgfSk7XG5cbiAgICBfZWZmZWN0c1tuYW1lXSA9IGZ1bmN0aW9uICh0YXJnZXRzLCB2YXJzLCB0bCkge1xuICAgICAgcmV0dXJuIGVmZmVjdCh0b0FycmF5KHRhcmdldHMpLCBfc2V0RGVmYXVsdHModmFycyB8fCB7fSwgZGVmYXVsdHMpLCB0bCk7XG4gICAgfTtcblxuICAgIGlmIChleHRlbmRUaW1lbGluZSkge1xuICAgICAgVGltZWxpbmUucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChfZWZmZWN0c1tuYW1lXSh0YXJnZXRzLCBfaXNPYmplY3QodmFycykgPyB2YXJzIDogKHBvc2l0aW9uID0gdmFycykgJiYge30sIHRoaXMpLCBwb3NpdGlvbik7XG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgcmVnaXN0ZXJFYXNlOiBmdW5jdGlvbiByZWdpc3RlckVhc2UobmFtZSwgZWFzZSkge1xuICAgIF9lYXNlTWFwW25hbWVdID0gX3BhcnNlRWFzZShlYXNlKTtcbiAgfSxcbiAgcGFyc2VFYXNlOiBmdW5jdGlvbiBwYXJzZUVhc2UoZWFzZSwgZGVmYXVsdEVhc2UpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IF9wYXJzZUVhc2UoZWFzZSwgZGVmYXVsdEVhc2UpIDogX2Vhc2VNYXA7XG4gIH0sXG4gIGdldEJ5SWQ6IGZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX2dsb2JhbFRpbWVsaW5lLmdldEJ5SWQoaWQpO1xuICB9LFxuICBleHBvcnRSb290OiBmdW5jdGlvbiBleHBvcnRSb290KHZhcnMsIGluY2x1ZGVEZWxheWVkQ2FsbHMpIHtcbiAgICBpZiAodmFycyA9PT0gdm9pZCAwKSB7XG4gICAgICB2YXJzID0ge307XG4gICAgfVxuXG4gICAgdmFyIHRsID0gbmV3IFRpbWVsaW5lKHZhcnMpLFxuICAgICAgICBjaGlsZCxcbiAgICAgICAgbmV4dDtcbiAgICB0bC5zbW9vdGhDaGlsZFRpbWluZyA9IF9pc05vdEZhbHNlKHZhcnMuc21vb3RoQ2hpbGRUaW1pbmcpO1xuXG4gICAgX2dsb2JhbFRpbWVsaW5lLnJlbW92ZSh0bCk7XG5cbiAgICB0bC5fZHAgPSAwOyAvL290aGVyd2lzZSBpdCdsbCBnZXQgcmUtYWN0aXZhdGVkIHdoZW4gYWRkaW5nIGNoaWxkcmVuIGFuZCBiZSByZS1pbnRyb2R1Y2VkIGludG8gX2dsb2JhbFRpbWVsaW5lJ3MgbGlua2VkIGxpc3QgKHRoZW4gYWRkZWQgdG8gaXRzZWxmKS5cblxuICAgIHRsLl90aW1lID0gdGwuX3RUaW1lID0gX2dsb2JhbFRpbWVsaW5lLl90aW1lO1xuICAgIGNoaWxkID0gX2dsb2JhbFRpbWVsaW5lLl9maXJzdDtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgbmV4dCA9IGNoaWxkLl9uZXh0O1xuXG4gICAgICBpZiAoaW5jbHVkZURlbGF5ZWRDYWxscyB8fCAhKCFjaGlsZC5fZHVyICYmIGNoaWxkIGluc3RhbmNlb2YgVHdlZW4gJiYgY2hpbGQudmFycy5vbkNvbXBsZXRlID09PSBjaGlsZC5fdGFyZ2V0c1swXSkpIHtcbiAgICAgICAgX2FkZFRvVGltZWxpbmUodGwsIGNoaWxkLCBjaGlsZC5fc3RhcnQgLSBjaGlsZC5fZGVsYXkpO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IG5leHQ7XG4gICAgfVxuXG4gICAgX2FkZFRvVGltZWxpbmUoX2dsb2JhbFRpbWVsaW5lLCB0bCwgMCk7XG5cbiAgICByZXR1cm4gdGw7XG4gIH0sXG4gIHV0aWxzOiB7XG4gICAgd3JhcDogd3JhcCxcbiAgICB3cmFwWW95bzogd3JhcFlveW8sXG4gICAgZGlzdHJpYnV0ZTogZGlzdHJpYnV0ZSxcbiAgICByYW5kb206IHJhbmRvbSxcbiAgICBzbmFwOiBzbmFwLFxuICAgIG5vcm1hbGl6ZTogbm9ybWFsaXplLFxuICAgIGdldFVuaXQ6IGdldFVuaXQsXG4gICAgY2xhbXA6IGNsYW1wLFxuICAgIHNwbGl0Q29sb3I6IHNwbGl0Q29sb3IsXG4gICAgdG9BcnJheTogdG9BcnJheSxcbiAgICBtYXBSYW5nZTogbWFwUmFuZ2UsXG4gICAgcGlwZTogcGlwZSxcbiAgICB1bml0aXplOiB1bml0aXplLFxuICAgIGludGVycG9sYXRlOiBpbnRlcnBvbGF0ZSxcbiAgICBzaHVmZmxlOiBzaHVmZmxlXG4gIH0sXG4gIGluc3RhbGw6IF9pbnN0YWxsLFxuICBlZmZlY3RzOiBfZWZmZWN0cyxcbiAgdGlja2VyOiBfdGlja2VyLFxuICB1cGRhdGVSb290OiBUaW1lbGluZS51cGRhdGVSb290LFxuICBwbHVnaW5zOiBfcGx1Z2lucyxcbiAgZ2xvYmFsVGltZWxpbmU6IF9nbG9iYWxUaW1lbGluZSxcbiAgY29yZToge1xuICAgIFByb3BUd2VlbjogUHJvcFR3ZWVuLFxuICAgIGdsb2JhbHM6IF9hZGRHbG9iYWwsXG4gICAgVHdlZW46IFR3ZWVuLFxuICAgIFRpbWVsaW5lOiBUaW1lbGluZSxcbiAgICBBbmltYXRpb246IEFuaW1hdGlvbixcbiAgICBnZXRDYWNoZTogX2dldENhY2hlLFxuICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbTogX3JlbW92ZUxpbmtlZExpc3RJdGVtXG4gIH1cbn07XG5cbl9mb3JFYWNoTmFtZShcInRvLGZyb20sZnJvbVRvLGRlbGF5ZWRDYWxsLHNldCxraWxsVHdlZW5zT2ZcIiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIF9nc2FwW25hbWVdID0gVHdlZW5bbmFtZV07XG59KTtcblxuX3RpY2tlci5hZGQoVGltZWxpbmUudXBkYXRlUm9vdCk7XG5cbl9xdWlja1R3ZWVuID0gX2dzYXAudG8oe30sIHtcbiAgZHVyYXRpb246IDBcbn0pOyAvLyAtLS0tIEVYVFJBIFBMVUdJTlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIF9nZXRQbHVnaW5Qcm9wVHdlZW4gPSBmdW5jdGlvbiBfZ2V0UGx1Z2luUHJvcFR3ZWVuKHBsdWdpbiwgcHJvcCkge1xuICB2YXIgcHQgPSBwbHVnaW4uX3B0O1xuXG4gIHdoaWxlIChwdCAmJiBwdC5wICE9PSBwcm9wICYmIHB0Lm9wICE9PSBwcm9wICYmIHB0LmZwICE9PSBwcm9wKSB7XG4gICAgcHQgPSBwdC5fbmV4dDtcbiAgfVxuXG4gIHJldHVybiBwdDtcbn0sXG4gICAgX2FkZE1vZGlmaWVycyA9IGZ1bmN0aW9uIF9hZGRNb2RpZmllcnModHdlZW4sIG1vZGlmaWVycykge1xuICB2YXIgdGFyZ2V0cyA9IHR3ZWVuLl90YXJnZXRzLFxuICAgICAgcCxcbiAgICAgIGksXG4gICAgICBwdDtcblxuICBmb3IgKHAgaW4gbW9kaWZpZXJzKSB7XG4gICAgaSA9IHRhcmdldHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgcHQgPSB0d2Vlbi5fcHRMb29rdXBbaV1bcF07XG5cbiAgICAgIGlmIChwdCAmJiAocHQgPSBwdC5kKSkge1xuICAgICAgICBpZiAocHQuX3B0KSB7XG4gICAgICAgICAgLy8gaXMgYSBwbHVnaW5cbiAgICAgICAgICBwdCA9IF9nZXRQbHVnaW5Qcm9wVHdlZW4ocHQsIHApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHQgJiYgcHQubW9kaWZpZXIgJiYgcHQubW9kaWZpZXIobW9kaWZpZXJzW3BdLCB0d2VlbiwgdGFyZ2V0c1tpXSwgcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59LFxuICAgIF9idWlsZE1vZGlmaWVyUGx1Z2luID0gZnVuY3Rpb24gX2J1aWxkTW9kaWZpZXJQbHVnaW4obmFtZSwgbW9kaWZpZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIHJhd1ZhcnM6IDEsXG4gICAgLy9kb24ndCBwcmUtcHJvY2VzcyBmdW5jdGlvbi1iYXNlZCB2YWx1ZXMgb3IgXCJyYW5kb20oKVwiIHN0cmluZ3MuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuKSB7XG4gICAgICB0d2Vlbi5fb25Jbml0ID0gZnVuY3Rpb24gKHR3ZWVuKSB7XG4gICAgICAgIHZhciB0ZW1wLCBwO1xuXG4gICAgICAgIGlmIChfaXNTdHJpbmcodmFycykpIHtcbiAgICAgICAgICB0ZW1wID0ge307XG5cbiAgICAgICAgICBfZm9yRWFjaE5hbWUodmFycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wW25hbWVdID0gMTtcbiAgICAgICAgICB9KTsgLy9pZiB0aGUgdXNlciBwYXNzZXMgaW4gYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcyB0byByb3VuZFByb3BzLCBsaWtlIFwieCx5XCIsIHdlIHJvdW5kIHRvIHdob2xlIG51bWJlcnMuXG5cblxuICAgICAgICAgIHZhcnMgPSB0ZW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGlmaWVyKSB7XG4gICAgICAgICAgdGVtcCA9IHt9O1xuXG4gICAgICAgICAgZm9yIChwIGluIHZhcnMpIHtcbiAgICAgICAgICAgIHRlbXBbcF0gPSBtb2RpZmllcih2YXJzW3BdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXJzID0gdGVtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIF9hZGRNb2RpZmllcnModHdlZW4sIHZhcnMpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59OyAvL3JlZ2lzdGVyIGNvcmUgcGx1Z2luc1xuXG5cbmV4cG9ydCB2YXIgZ3NhcCA9IF9nc2FwLnJlZ2lzdGVyUGx1Z2luKHtcbiAgbmFtZTogXCJhdHRyXCIsXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQodGFyZ2V0LCB2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldHMpIHtcbiAgICB2YXIgcCwgcHQ7XG5cbiAgICBmb3IgKHAgaW4gdmFycykge1xuICAgICAgcHQgPSB0aGlzLmFkZCh0YXJnZXQsIFwic2V0QXR0cmlidXRlXCIsICh0YXJnZXQuZ2V0QXR0cmlidXRlKHApIHx8IDApICsgXCJcIiwgdmFyc1twXSwgaW5kZXgsIHRhcmdldHMsIDAsIDAsIHApO1xuICAgICAgcHQgJiYgKHB0Lm9wID0gcCk7XG5cbiAgICAgIHRoaXMuX3Byb3BzLnB1c2gocCk7XG4gICAgfVxuICB9XG59LCB7XG4gIG5hbWU6IFwiZW5kQXJyYXlcIixcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhbHVlKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmFkZCh0YXJnZXQsIGksIHRhcmdldFtpXSB8fCAwLCB2YWx1ZVtpXSk7XG4gICAgfVxuICB9XG59LCBfYnVpbGRNb2RpZmllclBsdWdpbihcInJvdW5kUHJvcHNcIiwgX3JvdW5kTW9kaWZpZXIpLCBfYnVpbGRNb2RpZmllclBsdWdpbihcIm1vZGlmaWVyc1wiKSwgX2J1aWxkTW9kaWZpZXJQbHVnaW4oXCJzbmFwXCIsIHNuYXApKSB8fCBfZ3NhcDsgLy90byBwcmV2ZW50IHRoZSBjb3JlIHBsdWdpbnMgZnJvbSBiZWluZyBkcm9wcGVkIHZpYSBhZ2dyZXNzaXZlIHRyZWUgc2hha2luZywgd2UgbXVzdCBpbmNsdWRlIHRoZW0gaW4gdGhlIHZhcmlhYmxlIGRlY2xhcmF0aW9uIGluIHRoaXMgd2F5LlxuXG5Ud2Vlbi52ZXJzaW9uID0gVGltZWxpbmUudmVyc2lvbiA9IGdzYXAudmVyc2lvbiA9IFwiMy41LjBcIjtcbl9jb3JlUmVhZHkgPSAxO1xuXG5pZiAoX3dpbmRvd0V4aXN0cygpKSB7XG4gIF93YWtlKCk7XG59XG5cbnZhciBQb3dlcjAgPSBfZWFzZU1hcC5Qb3dlcjAsXG4gICAgUG93ZXIxID0gX2Vhc2VNYXAuUG93ZXIxLFxuICAgIFBvd2VyMiA9IF9lYXNlTWFwLlBvd2VyMixcbiAgICBQb3dlcjMgPSBfZWFzZU1hcC5Qb3dlcjMsXG4gICAgUG93ZXI0ID0gX2Vhc2VNYXAuUG93ZXI0LFxuICAgIExpbmVhciA9IF9lYXNlTWFwLkxpbmVhcixcbiAgICBRdWFkID0gX2Vhc2VNYXAuUXVhZCxcbiAgICBDdWJpYyA9IF9lYXNlTWFwLkN1YmljLFxuICAgIFF1YXJ0ID0gX2Vhc2VNYXAuUXVhcnQsXG4gICAgUXVpbnQgPSBfZWFzZU1hcC5RdWludCxcbiAgICBTdHJvbmcgPSBfZWFzZU1hcC5TdHJvbmcsXG4gICAgRWxhc3RpYyA9IF9lYXNlTWFwLkVsYXN0aWMsXG4gICAgQmFjayA9IF9lYXNlTWFwLkJhY2ssXG4gICAgU3RlcHBlZEVhc2UgPSBfZWFzZU1hcC5TdGVwcGVkRWFzZSxcbiAgICBCb3VuY2UgPSBfZWFzZU1hcC5Cb3VuY2UsXG4gICAgU2luZSA9IF9lYXNlTWFwLlNpbmUsXG4gICAgRXhwbyA9IF9lYXNlTWFwLkV4cG8sXG4gICAgQ2lyYyA9IF9lYXNlTWFwLkNpcmM7XG5leHBvcnQgeyBQb3dlcjAsIFBvd2VyMSwgUG93ZXIyLCBQb3dlcjMsIFBvd2VyNCwgTGluZWFyLCBRdWFkLCBDdWJpYywgUXVhcnQsIFF1aW50LCBTdHJvbmcsIEVsYXN0aWMsIEJhY2ssIFN0ZXBwZWRFYXNlLCBCb3VuY2UsIFNpbmUsIEV4cG8sIENpcmMgfTtcbmV4cG9ydCB7IFR3ZWVuIGFzIFR3ZWVuTWF4LCBUd2VlbiBhcyBUd2VlbkxpdGUsIFRpbWVsaW5lIGFzIFRpbWVsaW5lTWF4LCBUaW1lbGluZSBhcyBUaW1lbGluZUxpdGUsIGdzYXAgYXMgZGVmYXVsdCwgd3JhcCwgd3JhcFlveW8sIGRpc3RyaWJ1dGUsIHJhbmRvbSwgc25hcCwgbm9ybWFsaXplLCBnZXRVbml0LCBjbGFtcCwgc3BsaXRDb2xvciwgdG9BcnJheSwgbWFwUmFuZ2UsIHBpcGUsIHVuaXRpemUsIGludGVycG9sYXRlLCBzaHVmZmxlIH07IC8vZXhwb3J0IHNvbWUgaW50ZXJuYWwgbWV0aG9kcy9vcm9qZWN0cyBmb3IgdXNlIGluIENTU1BsdWdpbiBzbyB0aGF0IHdlIGNhbiBleHRlcm5hbGl6ZSB0aGF0IGZpbGUgYW5kIGFsbG93IGN1c3RvbSBidWlsZHMgdGhhdCBleGNsdWRlIGl0LlxuXG5leHBvcnQgeyBfZ2V0UHJvcGVydHksIF9udW1FeHAsIF9udW1XaXRoVW5pdEV4cCwgX2lzU3RyaW5nLCBfaXNVbmRlZmluZWQsIF9yZW5kZXJDb21wbGV4U3RyaW5nLCBfcmVsRXhwLCBfc2V0RGVmYXVsdHMsIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSwgX2ZvckVhY2hOYW1lLCBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5LCBfY29sb3JTdHJpbmdGaWx0ZXIsIF9yZXBsYWNlUmFuZG9tLCBfY2hlY2tQbHVnaW4sIF9wbHVnaW5zLCBfdGlja2VyLCBfY29uZmlnLCBfcm91bmRNb2RpZmllciwgX3JvdW5kLCBfbWlzc2luZ1BsdWdpbiwgX2dldFNldHRlciwgX2dldENhY2hlIH07IiwiLyohXG4gKiBDU1NQbHVnaW4gMy41LjBcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDA4LTIwMjAsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBnc2FwLCBfZ2V0UHJvcGVydHksIF9udW1FeHAsIF9udW1XaXRoVW5pdEV4cCwgZ2V0VW5pdCwgX2lzU3RyaW5nLCBfaXNVbmRlZmluZWQsIF9yZW5kZXJDb21wbGV4U3RyaW5nLCBfcmVsRXhwLCBfZm9yRWFjaE5hbWUsIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHksIF9jb2xvclN0cmluZ0ZpbHRlciwgX2NoZWNrUGx1Z2luLCBfcmVwbGFjZVJhbmRvbSwgX3BsdWdpbnMsIEdTQ2FjaGUsIFByb3BUd2VlbiwgX2NvbmZpZywgX3RpY2tlciwgX3JvdW5kLCBfbWlzc2luZ1BsdWdpbiwgX2dldFNldHRlciwgX2dldENhY2hlLCBfc2V0RGVmYXVsdHMsIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSAvL2ZvciB0aGUgY29tbWVudGVkLW91dCBjbGFzc05hbWUgZmVhdHVyZS5cbn0gZnJvbSBcIi4vZ3NhcC1jb3JlLmpzXCI7XG5cbnZhciBfd2luLFxuICAgIF9kb2MsXG4gICAgX2RvY0VsZW1lbnQsXG4gICAgX3BsdWdpbkluaXR0ZWQsXG4gICAgX3RlbXBEaXYsXG4gICAgX3RlbXBEaXZTdHlsZXIsXG4gICAgX3JlY2VudFNldHRlclBsdWdpbixcbiAgICBfd2luZG93RXhpc3RzID0gZnVuY3Rpb24gX3dpbmRvd0V4aXN0cygpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG59LFxuICAgIF90cmFuc2Zvcm1Qcm9wcyA9IHt9LFxuICAgIF9SQUQyREVHID0gMTgwIC8gTWF0aC5QSSxcbiAgICBfREVHMlJBRCA9IE1hdGguUEkgLyAxODAsXG4gICAgX2F0YW4yID0gTWF0aC5hdGFuMixcbiAgICBfYmlnTnVtID0gMWU4LFxuICAgIF9jYXBzRXhwID0gLyhbQS1aXSkvZyxcbiAgICBfaG9yaXpvbnRhbEV4cCA9IC8oPzpsZWZ0fHJpZ2h0fHdpZHRofG1hcmdpbnxwYWRkaW5nfHgpL2ksXG4gICAgX2NvbXBsZXhFeHAgPSAvW1xccyxcXChdXFxTLyxcbiAgICBfcHJvcGVydHlBbGlhc2VzID0ge1xuICBhdXRvQWxwaGE6IFwib3BhY2l0eSx2aXNpYmlsaXR5XCIsXG4gIHNjYWxlOiBcInNjYWxlWCxzY2FsZVlcIixcbiAgYWxwaGE6IFwib3BhY2l0eVwiXG59LFxuICAgIF9yZW5kZXJDU1NQcm9wID0gZnVuY3Rpb24gX3JlbmRlckNTU1Byb3AocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCBNYXRoLnJvdW5kKChkYXRhLnMgKyBkYXRhLmMgKiByYXRpbykgKiAxMDAwMCkgLyAxMDAwMCArIGRhdGEudSwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJQcm9wV2l0aEVuZCA9IGZ1bmN0aW9uIF9yZW5kZXJQcm9wV2l0aEVuZChyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIHJhdGlvID09PSAxID8gZGF0YS5lIDogTWF0aC5yb3VuZCgoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pICogMTAwMDApIC8gMTAwMDAgKyBkYXRhLnUsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyQ1NTUHJvcFdpdGhCZWdpbm5pbmcgPSBmdW5jdGlvbiBfcmVuZGVyQ1NTUHJvcFdpdGhCZWdpbm5pbmcocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyA/IE1hdGgucm91bmQoKGRhdGEucyArIGRhdGEuYyAqIHJhdGlvKSAqIDEwMDAwKSAvIDEwMDAwICsgZGF0YS51IDogZGF0YS5iLCBkYXRhKTtcbn0sXG4gICAgLy9pZiB1bml0cyBjaGFuZ2UsIHdlIG5lZWQgYSB3YXkgdG8gcmVuZGVyIHRoZSBvcmlnaW5hbCB1bml0L3ZhbHVlIHdoZW4gdGhlIHR3ZWVuIGdvZXMgYWxsIHRoZSB3YXkgYmFjayB0byB0aGUgYmVnaW5uaW5nIChyYXRpbzowKVxuX3JlbmRlclJvdW5kZWRDU1NQcm9wID0gZnVuY3Rpb24gX3JlbmRlclJvdW5kZWRDU1NQcm9wKHJhdGlvLCBkYXRhKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGEucyArIGRhdGEuYyAqIHJhdGlvO1xuICBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgfn4odmFsdWUgKyAodmFsdWUgPCAwID8gLS41IDogLjUpKSArIGRhdGEudSwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlID0gZnVuY3Rpb24gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWUocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyA/IGRhdGEuZSA6IGRhdGEuYiwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlT25seUF0RW5kID0gZnVuY3Rpb24gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWVPbmx5QXRFbmQocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyAhPT0gMSA/IGRhdGEuYiA6IGRhdGEuZSwgZGF0YSk7XG59LFxuICAgIF9zZXR0ZXJDU1NTdHlsZSA9IGZ1bmN0aW9uIF9zZXR0ZXJDU1NTdHlsZSh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gdGFyZ2V0LnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xufSxcbiAgICBfc2V0dGVyQ1NTUHJvcCA9IGZ1bmN0aW9uIF9zZXR0ZXJDU1NQcm9wKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbn0sXG4gICAgX3NldHRlclRyYW5zZm9ybSA9IGZ1bmN0aW9uIF9zZXR0ZXJUcmFuc2Zvcm0odGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5fZ3NhcFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbn0sXG4gICAgX3NldHRlclNjYWxlID0gZnVuY3Rpb24gX3NldHRlclNjYWxlKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXQuX2dzYXAuc2NhbGVYID0gdGFyZ2V0Ll9nc2FwLnNjYWxlWSA9IHZhbHVlO1xufSxcbiAgICBfc2V0dGVyU2NhbGVXaXRoUmVuZGVyID0gZnVuY3Rpb24gX3NldHRlclNjYWxlV2l0aFJlbmRlcih0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgZGF0YSwgcmF0aW8pIHtcbiAgdmFyIGNhY2hlID0gdGFyZ2V0Ll9nc2FwO1xuICBjYWNoZS5zY2FsZVggPSBjYWNoZS5zY2FsZVkgPSB2YWx1ZTtcbiAgY2FjaGUucmVuZGVyVHJhbnNmb3JtKHJhdGlvLCBjYWNoZSk7XG59LFxuICAgIF9zZXR0ZXJUcmFuc2Zvcm1XaXRoUmVuZGVyID0gZnVuY3Rpb24gX3NldHRlclRyYW5zZm9ybVdpdGhSZW5kZXIodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIGRhdGEsIHJhdGlvKSB7XG4gIHZhciBjYWNoZSA9IHRhcmdldC5fZ3NhcDtcbiAgY2FjaGVbcHJvcGVydHldID0gdmFsdWU7XG4gIGNhY2hlLnJlbmRlclRyYW5zZm9ybShyYXRpbywgY2FjaGUpO1xufSxcbiAgICBfdHJhbnNmb3JtUHJvcCA9IFwidHJhbnNmb3JtXCIsXG4gICAgX3RyYW5zZm9ybU9yaWdpblByb3AgPSBfdHJhbnNmb3JtUHJvcCArIFwiT3JpZ2luXCIsXG4gICAgX3N1cHBvcnRzM0QsXG4gICAgX2NyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCh0eXBlLCBucykge1xuICB2YXIgZSA9IF9kb2MuY3JlYXRlRWxlbWVudE5TID8gX2RvYy5jcmVhdGVFbGVtZW50TlMoKG5zIHx8IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKS5yZXBsYWNlKC9eaHR0cHMvLCBcImh0dHBcIiksIHR5cGUpIDogX2RvYy5jcmVhdGVFbGVtZW50KHR5cGUpOyAvL3NvbWUgc2VydmVycyBzd2FwIGluIGh0dHBzIGZvciBodHRwIGluIHRoZSBuYW1lc3BhY2Ugd2hpY2ggY2FuIGJyZWFrIHRoaW5ncywgbWFraW5nIFwic3R5bGVcIiBpbmFjY2Vzc2libGUuXG5cbiAgcmV0dXJuIGUuc3R5bGUgPyBlIDogX2RvYy5jcmVhdGVFbGVtZW50KHR5cGUpOyAvL3NvbWUgZW52aXJvbm1lbnRzIHdvbid0IGFsbG93IGFjY2VzcyB0byB0aGUgZWxlbWVudCdzIHN0eWxlIHdoZW4gY3JlYXRlZCB3aXRoIGEgbmFtZXNwYWNlIGluIHdoaWNoIGNhc2Ugd2UgZGVmYXVsdCB0byB0aGUgc3RhbmRhcmQgY3JlYXRlRWxlbWVudCgpIHRvIHdvcmsgYXJvdW5kIHRoZSBpc3N1ZS4gQWxzbyBub3RlIHRoYXQgd2hlbiBHU0FQIGlzIGVtYmVkZGVkIGRpcmVjdGx5IGluc2lkZSBhbiBTVkcgZmlsZSwgY3JlYXRlRWxlbWVudCgpIHdvbid0IGFsbG93IGFjY2VzcyB0byB0aGUgc3R5bGUgb2JqZWN0IGluIEZpcmVmb3ggKHNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIwMjE1LXByb2JsZW0tdXNpbmctdHdlZW5tYXgtaW4tc3RhbmRhbG9uZS1zZWxmLWNvbnRhaW5pbmctc3ZnLWZpbGUtZXJyLWNhbm5vdC1zZXQtcHJvcGVydHktY3NzdGV4dC1vZi11bmRlZmluZWQvKS5cbn0sXG4gICAgX2dldENvbXB1dGVkUHJvcGVydHkgPSBmdW5jdGlvbiBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCBza2lwUHJlZml4RmFsbGJhY2spIHtcbiAgdmFyIGNzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xuICByZXR1cm4gY3NbcHJvcGVydHldIHx8IGNzLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkucmVwbGFjZShfY2Fwc0V4cCwgXCItJDFcIikudG9Mb3dlckNhc2UoKSkgfHwgY3MuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkgfHwgIXNraXBQcmVmaXhGYWxsYmFjayAmJiBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF9jaGVja1Byb3BQcmVmaXgocHJvcGVydHkpIHx8IHByb3BlcnR5LCAxKSB8fCBcIlwiOyAvL2NzcyB2YXJpYWJsZXMgbWF5IG5vdCBuZWVkIGNhcHMgc3dhcHBlZCBvdXQgZm9yIGRhc2hlcyBhbmQgbG93ZXJjYXNlLlxufSxcbiAgICBfcHJlZml4ZXMgPSBcIk8sTW96LG1zLE1zLFdlYmtpdFwiLnNwbGl0KFwiLFwiKSxcbiAgICBfY2hlY2tQcm9wUHJlZml4ID0gZnVuY3Rpb24gX2NoZWNrUHJvcFByZWZpeChwcm9wZXJ0eSwgZWxlbWVudCwgcHJlZmVyUHJlZml4KSB7XG4gIHZhciBlID0gZWxlbWVudCB8fCBfdGVtcERpdixcbiAgICAgIHMgPSBlLnN0eWxlLFxuICAgICAgaSA9IDU7XG5cbiAgaWYgKHByb3BlcnR5IGluIHMgJiYgIXByZWZlclByZWZpeCkge1xuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfVxuXG4gIHByb3BlcnR5ID0gcHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zdWJzdHIoMSk7XG5cbiAgd2hpbGUgKGktLSAmJiAhKF9wcmVmaXhlc1tpXSArIHByb3BlcnR5IGluIHMpKSB7fVxuXG4gIHJldHVybiBpIDwgMCA/IG51bGwgOiAoaSA9PT0gMyA/IFwibXNcIiA6IGkgPj0gMCA/IF9wcmVmaXhlc1tpXSA6IFwiXCIpICsgcHJvcGVydHk7XG59LFxuICAgIF9pbml0Q29yZSA9IGZ1bmN0aW9uIF9pbml0Q29yZSgpIHtcbiAgaWYgKF93aW5kb3dFeGlzdHMoKSAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICBfd2luID0gd2luZG93O1xuICAgIF9kb2MgPSBfd2luLmRvY3VtZW50O1xuICAgIF9kb2NFbGVtZW50ID0gX2RvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgX3RlbXBEaXYgPSBfY3JlYXRlRWxlbWVudChcImRpdlwiKSB8fCB7XG4gICAgICBzdHlsZToge31cbiAgICB9O1xuICAgIF90ZW1wRGl2U3R5bGVyID0gX2NyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgX3RyYW5zZm9ybVByb3AgPSBfY2hlY2tQcm9wUHJlZml4KF90cmFuc2Zvcm1Qcm9wKTtcbiAgICBfdHJhbnNmb3JtT3JpZ2luUHJvcCA9IF90cmFuc2Zvcm1Qcm9wICsgXCJPcmlnaW5cIjtcbiAgICBfdGVtcERpdi5zdHlsZS5jc3NUZXh0ID0gXCJib3JkZXItd2lkdGg6MDtsaW5lLWhlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmc6MFwiOyAvL21ha2Ugc3VyZSB0byBvdmVycmlkZSBjZXJ0YWluIHByb3BlcnRpZXMgdGhhdCBtYXkgY29udGFtaW5hdGUgbWVhc3VyZW1lbnRzLCBpbiBjYXNlIHRoZSB1c2VyIGhhcyBvdmVycmVhY2hpbmcgc3R5bGUgc2hlZXRzLlxuXG4gICAgX3N1cHBvcnRzM0QgPSAhIV9jaGVja1Byb3BQcmVmaXgoXCJwZXJzcGVjdGl2ZVwiKTtcbiAgICBfcGx1Z2luSW5pdHRlZCA9IDE7XG4gIH1cbn0sXG4gICAgX2dldEJCb3hIYWNrID0gZnVuY3Rpb24gX2dldEJCb3hIYWNrKHN3YXBJZlBvc3NpYmxlKSB7XG4gIC8vd29ya3MgYXJvdW5kIGlzc3VlcyBpbiBzb21lIGJyb3dzZXJzIChsaWtlIEZpcmVmb3gpIHRoYXQgZG9uJ3QgY29ycmVjdGx5IHJlcG9ydCBnZXRCQm94KCkgb24gU1ZHIGVsZW1lbnRzIGluc2lkZSBhIDxkZWZzPiBlbGVtZW50IGFuZC9vciA8bWFzaz4uIFdlIHRyeSBjcmVhdGluZyBhbiBTVkcsIGFkZGluZyBpdCB0byB0aGUgZG9jdW1lbnRFbGVtZW50IGFuZCB0b3NzIHRoZSBlbGVtZW50IGluIHRoZXJlIHNvIHRoYXQgaXQncyBkZWZpbml0ZWx5IHBhcnQgb2YgdGhlIHJlbmRlcmluZyB0cmVlLCB0aGVuIGdyYWIgdGhlIGJib3ggYW5kIGlmIGl0IHdvcmtzLCB3ZSBhY3R1YWxseSBzd2FwIG91dCB0aGUgb3JpZ2luYWwgZ2V0QkJveCgpIG1ldGhvZCBmb3Igb3VyIG93biB0aGF0IGRvZXMgdGhlc2UgZXh0cmEgc3RlcHMgd2hlbmV2ZXIgZ2V0QkJveCBpcyBuZWVkZWQuIFRoaXMgaGVscHMgZW5zdXJlIHRoYXQgcGVyZm9ybWFuY2UgaXMgb3B0aW1hbCAob25seSBkbyBhbGwgdGhlc2UgZXh0cmEgc3RlcHMgd2hlbiBhYnNvbHV0ZWx5IG5lY2Vzc2FyeS4uLm1vc3QgZWxlbWVudHMgZG9uJ3QgbmVlZCBpdCkuXG4gIHZhciBzdmcgPSBfY3JlYXRlRWxlbWVudChcInN2Z1wiLCB0aGlzLm93bmVyU1ZHRWxlbWVudCAmJiB0aGlzLm93bmVyU1ZHRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ4bWxuc1wiKSB8fCBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIpLFxuICAgICAgb2xkUGFyZW50ID0gdGhpcy5wYXJlbnROb2RlLFxuICAgICAgb2xkU2libGluZyA9IHRoaXMubmV4dFNpYmxpbmcsXG4gICAgICBvbGRDU1MgPSB0aGlzLnN0eWxlLmNzc1RleHQsXG4gICAgICBiYm94O1xuXG4gIF9kb2NFbGVtZW50LmFwcGVuZENoaWxkKHN2Zyk7XG5cbiAgc3ZnLmFwcGVuZENoaWxkKHRoaXMpO1xuICB0aGlzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgaWYgKHN3YXBJZlBvc3NpYmxlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGJib3ggPSB0aGlzLmdldEJCb3goKTtcbiAgICAgIHRoaXMuX2dzYXBCQm94ID0gdGhpcy5nZXRCQm94OyAvL3N0b3JlIHRoZSBvcmlnaW5hbFxuXG4gICAgICB0aGlzLmdldEJCb3ggPSBfZ2V0QkJveEhhY2s7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSBlbHNlIGlmICh0aGlzLl9nc2FwQkJveCkge1xuICAgIGJib3ggPSB0aGlzLl9nc2FwQkJveCgpO1xuICB9XG5cbiAgaWYgKG9sZFBhcmVudCkge1xuICAgIGlmIChvbGRTaWJsaW5nKSB7XG4gICAgICBvbGRQYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIG9sZFNpYmxpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbGRQYXJlbnQuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX2RvY0VsZW1lbnQucmVtb3ZlQ2hpbGQoc3ZnKTtcblxuICB0aGlzLnN0eWxlLmNzc1RleHQgPSBvbGRDU1M7XG4gIHJldHVybiBiYm94O1xufSxcbiAgICBfZ2V0QXR0cmlidXRlRmFsbGJhY2tzID0gZnVuY3Rpb24gX2dldEF0dHJpYnV0ZUZhbGxiYWNrcyh0YXJnZXQsIGF0dHJpYnV0ZXNBcnJheSkge1xuICB2YXIgaSA9IGF0dHJpYnV0ZXNBcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIGlmICh0YXJnZXQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZXNBcnJheVtpXSkpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZXNBcnJheVtpXSk7XG4gICAgfVxuICB9XG59LFxuICAgIF9nZXRCQm94ID0gZnVuY3Rpb24gX2dldEJCb3godGFyZ2V0KSB7XG4gIHZhciBib3VuZHM7XG5cbiAgdHJ5IHtcbiAgICBib3VuZHMgPSB0YXJnZXQuZ2V0QkJveCgpOyAvL0ZpcmVmb3ggdGhyb3dzIGVycm9ycyBpZiB5b3UgdHJ5IGNhbGxpbmcgZ2V0QkJveCgpIG9uIGFuIFNWRyBlbGVtZW50IHRoYXQncyBub3QgcmVuZGVyZWQgKGxpa2UgaW4gYSA8c3ltYm9sPiBvciA8ZGVmcz4pLiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02MTIxMThcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBib3VuZHMgPSBfZ2V0QkJveEhhY2suY2FsbCh0YXJnZXQsIHRydWUpO1xuICB9XG5cbiAgYm91bmRzICYmIChib3VuZHMud2lkdGggfHwgYm91bmRzLmhlaWdodCkgfHwgdGFyZ2V0LmdldEJCb3ggPT09IF9nZXRCQm94SGFjayB8fCAoYm91bmRzID0gX2dldEJCb3hIYWNrLmNhbGwodGFyZ2V0LCB0cnVlKSk7IC8vc29tZSBicm93c2VycyAobGlrZSBGaXJlZm94KSBtaXNyZXBvcnQgdGhlIGJvdW5kcyBpZiB0aGUgZWxlbWVudCBoYXMgemVybyB3aWR0aCBhbmQgaGVpZ2h0IChpdCBqdXN0IGFzc3VtZXMgaXQncyBhdCB4OjAsIHk6MCksIHRodXMgd2UgbmVlZCB0byBtYW51YWxseSBncmFiIHRoZSBwb3NpdGlvbiBpbiB0aGF0IGNhc2UuXG5cbiAgcmV0dXJuIGJvdW5kcyAmJiAhYm91bmRzLndpZHRoICYmICFib3VuZHMueCAmJiAhYm91bmRzLnkgPyB7XG4gICAgeDogK19nZXRBdHRyaWJ1dGVGYWxsYmFja3ModGFyZ2V0LCBbXCJ4XCIsIFwiY3hcIiwgXCJ4MVwiXSkgfHwgMCxcbiAgICB5OiArX2dldEF0dHJpYnV0ZUZhbGxiYWNrcyh0YXJnZXQsIFtcInlcIiwgXCJjeVwiLCBcInkxXCJdKSB8fCAwLFxuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMFxuICB9IDogYm91bmRzO1xufSxcbiAgICBfaXNTVkcgPSBmdW5jdGlvbiBfaXNTVkcoZSkge1xuICByZXR1cm4gISEoZS5nZXRDVE0gJiYgKCFlLnBhcmVudE5vZGUgfHwgZS5vd25lclNWR0VsZW1lbnQpICYmIF9nZXRCQm94KGUpKTtcbn0sXG4gICAgLy9yZXBvcnRzIGlmIHRoZSBlbGVtZW50IGlzIGFuIFNWRyBvbiB3aGljaCBnZXRCQm94KCkgYWN0dWFsbHkgd29ya3Ncbl9yZW1vdmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB7XG4gIGlmIChwcm9wZXJ0eSkge1xuICAgIHZhciBzdHlsZSA9IHRhcmdldC5zdHlsZTtcblxuICAgIGlmIChwcm9wZXJ0eSBpbiBfdHJhbnNmb3JtUHJvcHMgJiYgcHJvcGVydHkgIT09IF90cmFuc2Zvcm1PcmlnaW5Qcm9wKSB7XG4gICAgICBwcm9wZXJ0eSA9IF90cmFuc2Zvcm1Qcm9wO1xuICAgIH1cblxuICAgIGlmIChzdHlsZS5yZW1vdmVQcm9wZXJ0eSkge1xuICAgICAgaWYgKHByb3BlcnR5LnN1YnN0cigwLCAyKSA9PT0gXCJtc1wiIHx8IHByb3BlcnR5LnN1YnN0cigwLCA2KSA9PT0gXCJ3ZWJraXRcIikge1xuICAgICAgICAvL01pY3Jvc29mdCBhbmQgc29tZSBXZWJraXQgYnJvd3NlcnMgZG9uJ3QgY29uZm9ybSB0byB0aGUgc3RhbmRhcmQgb2YgY2FwaXRhbGl6aW5nIHRoZSBmaXJzdCBwcmVmaXggY2hhcmFjdGVyLCBzbyB3ZSBhZGp1c3Qgc28gdGhhdCB3aGVuIHdlIHByZWZpeCB0aGUgY2FwcyB3aXRoIGEgZGFzaCwgaXQncyBjb3JyZWN0IChvdGhlcndpc2UgaXQnZCBiZSBcIm1zLXRyYW5zZm9ybVwiIGluc3RlYWQgb2YgXCItbXMtdHJhbnNmb3JtXCIgZm9yIElFOSwgZm9yIGV4YW1wbGUpXG4gICAgICAgIHByb3BlcnR5ID0gXCItXCIgKyBwcm9wZXJ0eTtcbiAgICAgIH1cblxuICAgICAgc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkucmVwbGFjZShfY2Fwc0V4cCwgXCItJDFcIikudG9Mb3dlckNhc2UoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vbm90ZTogb2xkIHZlcnNpb25zIG9mIElFIHVzZSBcInJlbW92ZUF0dHJpYnV0ZSgpXCIgaW5zdGVhZCBvZiBcInJlbW92ZVByb3BlcnR5KClcIlxuICAgICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKHByb3BlcnR5KTtcbiAgICB9XG4gIH1cbn0sXG4gICAgX2FkZE5vblR3ZWVuaW5nUFQgPSBmdW5jdGlvbiBfYWRkTm9uVHdlZW5pbmdQVChwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIGJlZ2lubmluZywgZW5kLCBvbmx5U2V0QXRFbmQpIHtcbiAgdmFyIHB0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIHByb3BlcnR5LCAwLCAxLCBvbmx5U2V0QXRFbmQgPyBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZU9ubHlBdEVuZCA6IF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlKTtcbiAgcGx1Z2luLl9wdCA9IHB0O1xuICBwdC5iID0gYmVnaW5uaW5nO1xuICBwdC5lID0gZW5kO1xuXG4gIHBsdWdpbi5fcHJvcHMucHVzaChwcm9wZXJ0eSk7XG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfbm9uQ29udmVydGlibGVVbml0cyA9IHtcbiAgZGVnOiAxLFxuICByYWQ6IDEsXG4gIHR1cm46IDFcbn0sXG4gICAgLy90YWtlcyBhIHNpbmdsZSB2YWx1ZSBsaWtlIDIwcHggYW5kIGNvbnZlcnRzIGl0IHRvIHRoZSB1bml0IHNwZWNpZmllZCwgbGlrZSBcIiVcIiwgcmV0dXJuaW5nIG9ubHkgdGhlIG51bWVyaWMgYW1vdW50LlxuX2NvbnZlcnRUb1VuaXQgPSBmdW5jdGlvbiBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgdW5pdCkge1xuICB2YXIgY3VyVmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwLFxuICAgICAgY3VyVW5pdCA9ICh2YWx1ZSArIFwiXCIpLnRyaW0oKS5zdWJzdHIoKGN1clZhbHVlICsgXCJcIikubGVuZ3RoKSB8fCBcInB4XCIsXG4gICAgICAvLyBzb21lIGJyb3dzZXJzIGxlYXZlIGV4dHJhIHdoaXRlc3BhY2UgYXQgdGhlIGJlZ2lubmluZyBvZiBDU1MgdmFyaWFibGVzLCBoZW5jZSB0aGUgbmVlZCB0byB0cmltKClcbiAgc3R5bGUgPSBfdGVtcERpdi5zdHlsZSxcbiAgICAgIGhvcml6b250YWwgPSBfaG9yaXpvbnRhbEV4cC50ZXN0KHByb3BlcnR5KSxcbiAgICAgIGlzUm9vdFNWRyA9IHRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwic3ZnXCIsXG4gICAgICBtZWFzdXJlUHJvcGVydHkgPSAoaXNSb290U1ZHID8gXCJjbGllbnRcIiA6IFwib2Zmc2V0XCIpICsgKGhvcml6b250YWwgPyBcIldpZHRoXCIgOiBcIkhlaWdodFwiKSxcbiAgICAgIGFtb3VudCA9IDEwMCxcbiAgICAgIHRvUGl4ZWxzID0gdW5pdCA9PT0gXCJweFwiLFxuICAgICAgdG9QZXJjZW50ID0gdW5pdCA9PT0gXCIlXCIsXG4gICAgICBweCxcbiAgICAgIHBhcmVudCxcbiAgICAgIGNhY2hlLFxuICAgICAgaXNTVkc7XG5cbiAgaWYgKHVuaXQgPT09IGN1clVuaXQgfHwgIWN1clZhbHVlIHx8IF9ub25Db252ZXJ0aWJsZVVuaXRzW3VuaXRdIHx8IF9ub25Db252ZXJ0aWJsZVVuaXRzW2N1clVuaXRdKSB7XG4gICAgcmV0dXJuIGN1clZhbHVlO1xuICB9XG5cbiAgY3VyVW5pdCAhPT0gXCJweFwiICYmICF0b1BpeGVscyAmJiAoY3VyVmFsdWUgPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgXCJweFwiKSk7XG4gIGlzU1ZHID0gdGFyZ2V0LmdldENUTSAmJiBfaXNTVkcodGFyZ2V0KTtcblxuICBpZiAodG9QZXJjZW50ICYmIChfdHJhbnNmb3JtUHJvcHNbcHJvcGVydHldIHx8IH5wcm9wZXJ0eS5pbmRleE9mKFwiYWRpdXNcIikpKSB7XG4gICAgLy90cmFuc2Zvcm1zIGFuZCBib3JkZXJSYWRpdXMgYXJlIHJlbGF0aXZlIHRvIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50IGl0c2VsZiFcbiAgICByZXR1cm4gX3JvdW5kKGN1clZhbHVlIC8gKGlzU1ZHID8gdGFyZ2V0LmdldEJCb3goKVtob3Jpem9udGFsID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIl0gOiB0YXJnZXRbbWVhc3VyZVByb3BlcnR5XSkgKiBhbW91bnQpO1xuICB9XG5cbiAgc3R5bGVbaG9yaXpvbnRhbCA/IFwid2lkdGhcIiA6IFwiaGVpZ2h0XCJdID0gYW1vdW50ICsgKHRvUGl4ZWxzID8gY3VyVW5pdCA6IHVuaXQpO1xuICBwYXJlbnQgPSB+cHJvcGVydHkuaW5kZXhPZihcImFkaXVzXCIpIHx8IHVuaXQgPT09IFwiZW1cIiAmJiB0YXJnZXQuYXBwZW5kQ2hpbGQgJiYgIWlzUm9vdFNWRyA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnROb2RlO1xuXG4gIGlmIChpc1NWRykge1xuICAgIHBhcmVudCA9ICh0YXJnZXQub3duZXJTVkdFbGVtZW50IHx8IHt9KS5wYXJlbnROb2RlO1xuICB9XG5cbiAgaWYgKCFwYXJlbnQgfHwgcGFyZW50ID09PSBfZG9jIHx8ICFwYXJlbnQuYXBwZW5kQ2hpbGQpIHtcbiAgICBwYXJlbnQgPSBfZG9jLmJvZHk7XG4gIH1cblxuICBjYWNoZSA9IHBhcmVudC5fZ3NhcDtcblxuICBpZiAoY2FjaGUgJiYgdG9QZXJjZW50ICYmIGNhY2hlLndpZHRoICYmIGhvcml6b250YWwgJiYgY2FjaGUudGltZSA9PT0gX3RpY2tlci50aW1lKSB7XG4gICAgcmV0dXJuIF9yb3VuZChjdXJWYWx1ZSAvIGNhY2hlLndpZHRoICogYW1vdW50KTtcbiAgfSBlbHNlIHtcbiAgICAodG9QZXJjZW50IHx8IGN1clVuaXQgPT09IFwiJVwiKSAmJiAoc3R5bGUucG9zaXRpb24gPSBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIFwicG9zaXRpb25cIikpO1xuICAgIHBhcmVudCA9PT0gdGFyZ2V0ICYmIChzdHlsZS5wb3NpdGlvbiA9IFwic3RhdGljXCIpOyAvLyBsaWtlIGZvciBib3JkZXJSYWRpdXMsIGlmIGl0J3MgYSAlIHdlIG11c3QgaGF2ZSBpdCByZWxhdGl2ZSB0byB0aGUgdGFyZ2V0IGl0c2VsZiBidXQgdGhhdCBtYXkgbm90IGhhdmUgcG9zaXRpb246IHJlbGF0aXZlIG9yIHBvc2l0aW9uOiBhYnNvbHV0ZSBpbiB3aGljaCBjYXNlIGl0J2QgZ28gdXAgdGhlIGNoYWluIHVudGlsIGl0IGZpbmRzIGl0cyBvZmZzZXRQYXJlbnQgKGJhZCkuIHBvc2l0aW9uOiBzdGF0aWMgcHJvdGVjdHMgYWdhaW5zdCB0aGF0LlxuXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKF90ZW1wRGl2KTtcbiAgICBweCA9IF90ZW1wRGl2W21lYXN1cmVQcm9wZXJ0eV07XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKF90ZW1wRGl2KTtcbiAgICBzdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblxuICAgIGlmIChob3Jpem9udGFsICYmIHRvUGVyY2VudCkge1xuICAgICAgY2FjaGUgPSBfZ2V0Q2FjaGUocGFyZW50KTtcbiAgICAgIGNhY2hlLnRpbWUgPSBfdGlja2VyLnRpbWU7XG4gICAgICBjYWNoZS53aWR0aCA9IHBhcmVudFttZWFzdXJlUHJvcGVydHldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfcm91bmQodG9QaXhlbHMgPyBweCAqIGN1clZhbHVlIC8gYW1vdW50IDogcHggJiYgY3VyVmFsdWUgPyBhbW91bnQgLyBweCAqIGN1clZhbHVlIDogMCk7XG59LFxuICAgIF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHVuaXQsIHVuY2FjaGUpIHtcbiAgdmFyIHZhbHVlO1xuICBfcGx1Z2luSW5pdHRlZCB8fCBfaW5pdENvcmUoKTtcblxuICBpZiAocHJvcGVydHkgaW4gX3Byb3BlcnR5QWxpYXNlcyAmJiBwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgIHByb3BlcnR5ID0gX3Byb3BlcnR5QWxpYXNlc1twcm9wZXJ0eV07XG5cbiAgICBpZiAofnByb3BlcnR5LmluZGV4T2YoXCIsXCIpKSB7XG4gICAgICBwcm9wZXJ0eSA9IHByb3BlcnR5LnNwbGl0KFwiLFwiKVswXTtcbiAgICB9XG4gIH1cblxuICBpZiAoX3RyYW5zZm9ybVByb3BzW3Byb3BlcnR5XSAmJiBwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgIHZhbHVlID0gX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgdW5jYWNoZSk7XG4gICAgdmFsdWUgPSBwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1PcmlnaW5cIiA/IHZhbHVlW3Byb3BlcnR5XSA6IF9maXJzdFR3b09ubHkoX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBfdHJhbnNmb3JtT3JpZ2luUHJvcCkpICsgXCIgXCIgKyB2YWx1ZS56T3JpZ2luICsgXCJweFwiO1xuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gdGFyZ2V0LnN0eWxlW3Byb3BlcnR5XTtcblxuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT09IFwiYXV0b1wiIHx8IHVuY2FjaGUgfHwgfih2YWx1ZSArIFwiXCIpLmluZGV4T2YoXCJjYWxjKFwiKSkge1xuICAgICAgdmFsdWUgPSBfc3BlY2lhbFByb3BzW3Byb3BlcnR5XSAmJiBfc3BlY2lhbFByb3BzW3Byb3BlcnR5XSh0YXJnZXQsIHByb3BlcnR5LCB1bml0KSB8fCBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB8fCBfZ2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkgfHwgKHByb3BlcnR5ID09PSBcIm9wYWNpdHlcIiA/IDEgOiAwKTsgLy8gbm90ZTogc29tZSBicm93c2VycywgbGlrZSBGaXJlZm94LCBkb24ndCByZXBvcnQgYm9yZGVyUmFkaXVzIGNvcnJlY3RseSEgSW5zdGVhZCwgaXQgb25seSByZXBvcnRzIGV2ZXJ5IGNvcm5lciBsaWtlICBib3JkZXJUb3BMZWZ0UmFkaXVzXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuaXQgJiYgIX4odmFsdWUgKyBcIlwiKS5pbmRleE9mKFwiIFwiKSA/IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCB1bml0KSArIHVuaXQgOiB2YWx1ZTtcbn0sXG4gICAgX3R3ZWVuQ29tcGxleENTU1N0cmluZyA9IGZ1bmN0aW9uIF90d2VlbkNvbXBsZXhDU1NTdHJpbmcodGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kKSB7XG4gIC8vbm90ZTogd2UgY2FsbCBfdHdlZW5Db21wbGV4Q1NTU3RyaW5nLmNhbGwocGx1Z2luSW5zdGFuY2UuLi4pIHRvIGVuc3VyZSB0aGF0IGl0J3Mgc2NvcGVkIHByb3Blcmx5LiBXZSBtYXkgY2FsbCBpdCBmcm9tIHdpdGhpbiBhIHBsdWdpbiB0b28sIHRodXMgXCJ0aGlzXCIgd291bGQgcmVmZXIgdG8gdGhlIHBsdWdpbi5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA9PT0gXCJub25lXCIpIHtcbiAgICAvLyBzb21lIGJyb3dzZXJzIGxpa2UgU2FmYXJpIGFjdHVhbGx5IFBSRUZFUiB0aGUgcHJlZml4ZWQgcHJvcGVydHkgYW5kIG1pcy1yZXBvcnQgdGhlIHVucHJlZml4ZWQgdmFsdWUgbGlrZSBjbGlwUGF0aCAoQlVHKS4gSW4gb3RoZXIgd29yZHMsIGV2ZW4gdGhvdWdoIGNsaXBQYXRoIGV4aXN0cyBpbiB0aGUgc3R5bGUgKFwiY2xpcFBhdGhcIiBpbiB0YXJnZXQuc3R5bGUpIGFuZCBpdCdzIHNldCBpbiB0aGUgQ1NTIHByb3Blcmx5IChhbG9uZyB3aXRoIC13ZWJraXQtY2xpcC1wYXRoKSwgU2FmYXJpIHJlcG9ydHMgY2xpcFBhdGggYXMgXCJub25lXCIgd2hlcmVhcyBXZWJraXRDbGlwUGF0aCByZXBvcnRzIGFjY3VyYXRlbHkgbGlrZSBcImVsbGlwc2UoMTAwJSAwJSBhdCA1MCUgMCUpXCIsIHNvIGluIHRoaXMgY2FzZSB3ZSBtdXN0IFNXSVRDSCB0byB1c2luZyB0aGUgcHJlZml4ZWQgcHJvcGVydHkgaW5zdGVhZC4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMTgzMTAtY2xpcHBhdGgtZG9lc250LXdvcmstb24taW9zL1xuICAgIHZhciBwID0gX2NoZWNrUHJvcFByZWZpeChwcm9wLCB0YXJnZXQsIDEpLFxuICAgICAgICBzID0gcCAmJiBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHAsIDEpO1xuXG4gICAgaWYgKHMgJiYgcyAhPT0gc3RhcnQpIHtcbiAgICAgIHByb3AgPSBwO1xuICAgICAgc3RhcnQgPSBzO1xuICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gXCJib3JkZXJDb2xvclwiKSB7XG4gICAgICBzdGFydCA9IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgXCJib3JkZXJUb3BDb2xvclwiKTsgLy8gRmlyZWZveCBidWc6IGFsd2F5cyByZXBvcnRzIFwiYm9yZGVyQ29sb3JcIiBhcyBcIlwiLCBzbyB3ZSBtdXN0IGZhbGwgYmFjayB0byBib3JkZXJUb3BDb2xvci4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjQ1ODMtaG93LXRvLXJldHVybi1jb2xvcnMtdGhhdC1pLWhhZC1hZnRlci1yZXZlcnNlL1xuICAgIH1cbiAgfVxuXG4gIHZhciBwdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHRhcmdldC5zdHlsZSwgcHJvcCwgMCwgMSwgX3JlbmRlckNvbXBsZXhTdHJpbmcpLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgbWF0Y2hJbmRleCA9IDAsXG4gICAgICBhLFxuICAgICAgcmVzdWx0LFxuICAgICAgc3RhcnRWYWx1ZXMsXG4gICAgICBzdGFydE51bSxcbiAgICAgIGNvbG9yLFxuICAgICAgc3RhcnRWYWx1ZSxcbiAgICAgIGVuZFZhbHVlLFxuICAgICAgZW5kTnVtLFxuICAgICAgY2h1bmssXG4gICAgICBlbmRVbml0LFxuICAgICAgc3RhcnRVbml0LFxuICAgICAgcmVsYXRpdmUsXG4gICAgICBlbmRWYWx1ZXM7XG4gIHB0LmIgPSBzdGFydDtcbiAgcHQuZSA9IGVuZDtcbiAgc3RhcnQgKz0gXCJcIjsgLy9lbnN1cmUgdmFsdWVzIGFyZSBzdHJpbmdzXG5cbiAgZW5kICs9IFwiXCI7XG5cbiAgaWYgKGVuZCA9PT0gXCJhdXRvXCIpIHtcbiAgICB0YXJnZXQuc3R5bGVbcHJvcF0gPSBlbmQ7XG4gICAgZW5kID0gX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBwcm9wKSB8fCBlbmQ7XG4gICAgdGFyZ2V0LnN0eWxlW3Byb3BdID0gc3RhcnQ7XG4gIH1cblxuICBhID0gW3N0YXJ0LCBlbmRdO1xuXG4gIF9jb2xvclN0cmluZ0ZpbHRlcihhKTsgLy9wYXNzIGFuIGFycmF5IHdpdGggdGhlIHN0YXJ0aW5nIGFuZCBlbmRpbmcgdmFsdWVzIGFuZCBsZXQgdGhlIGZpbHRlciBkbyB3aGF0ZXZlciBpdCBuZWVkcyB0byB0aGUgdmFsdWVzLiBJZiBjb2xvcnMgYXJlIGZvdW5kLCBpdCByZXR1cm5zIHRydWUgYW5kIHRoZW4gd2UgbXVzdCBtYXRjaCB3aGVyZSB0aGUgY29sb3Igc2hvd3MgdXAgb3JkZXItd2lzZSBiZWNhdXNlIGZvciB0aGluZ3MgbGlrZSBib3hTaGFkb3csIHNvbWV0aW1lcyB0aGUgYnJvd3NlciBwcm92aWRlcyB0aGUgY29tcHV0ZWQgdmFsdWVzIHdpdGggdGhlIGNvbG9yIEZJUlNULCBidXQgdGhlIHVzZXIgcHJvdmlkZXMgaXQgd2l0aCB0aGUgY29sb3IgTEFTVCwgc28gZmxpcCB0aGVtIGlmIG5lY2Vzc2FyeS4gU2FtZSBmb3IgZHJvcC1zaGFkb3coKS5cblxuXG4gIHN0YXJ0ID0gYVswXTtcbiAgZW5kID0gYVsxXTtcbiAgc3RhcnRWYWx1ZXMgPSBzdGFydC5tYXRjaChfbnVtV2l0aFVuaXRFeHApIHx8IFtdO1xuICBlbmRWYWx1ZXMgPSBlbmQubWF0Y2goX251bVdpdGhVbml0RXhwKSB8fCBbXTtcblxuICBpZiAoZW5kVmFsdWVzLmxlbmd0aCkge1xuICAgIHdoaWxlIChyZXN1bHQgPSBfbnVtV2l0aFVuaXRFeHAuZXhlYyhlbmQpKSB7XG4gICAgICBlbmRWYWx1ZSA9IHJlc3VsdFswXTtcbiAgICAgIGNodW5rID0gZW5kLnN1YnN0cmluZyhpbmRleCwgcmVzdWx0LmluZGV4KTtcblxuICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIGNvbG9yID0gKGNvbG9yICsgMSkgJSA1O1xuICAgICAgfSBlbHNlIGlmIChjaHVuay5zdWJzdHIoLTUpID09PSBcInJnYmEoXCIgfHwgY2h1bmsuc3Vic3RyKC01KSA9PT0gXCJoc2xhKFwiKSB7XG4gICAgICAgIGNvbG9yID0gMTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVuZFZhbHVlICE9PSAoc3RhcnRWYWx1ZSA9IHN0YXJ0VmFsdWVzW21hdGNoSW5kZXgrK10gfHwgXCJcIikpIHtcbiAgICAgICAgc3RhcnROdW0gPSBwYXJzZUZsb2F0KHN0YXJ0VmFsdWUpIHx8IDA7XG4gICAgICAgIHN0YXJ0VW5pdCA9IHN0YXJ0VmFsdWUuc3Vic3RyKChzdGFydE51bSArIFwiXCIpLmxlbmd0aCk7XG4gICAgICAgIHJlbGF0aXZlID0gZW5kVmFsdWUuY2hhckF0KDEpID09PSBcIj1cIiA/ICsoZW5kVmFsdWUuY2hhckF0KDApICsgXCIxXCIpIDogMDtcblxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgICBlbmRWYWx1ZSA9IGVuZFZhbHVlLnN1YnN0cigyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVuZE51bSA9IHBhcnNlRmxvYXQoZW5kVmFsdWUpO1xuICAgICAgICBlbmRVbml0ID0gZW5kVmFsdWUuc3Vic3RyKChlbmROdW0gKyBcIlwiKS5sZW5ndGgpO1xuICAgICAgICBpbmRleCA9IF9udW1XaXRoVW5pdEV4cC5sYXN0SW5kZXggLSBlbmRVbml0Lmxlbmd0aDtcblxuICAgICAgICBpZiAoIWVuZFVuaXQpIHtcbiAgICAgICAgICAvL2lmIHNvbWV0aGluZyBsaWtlIFwicGVyc3BlY3RpdmU6MzAwXCIgaXMgcGFzc2VkIGluIGFuZCB3ZSBtdXN0IGFkZCBhIHVuaXQgdG8gdGhlIGVuZFxuICAgICAgICAgIGVuZFVuaXQgPSBlbmRVbml0IHx8IF9jb25maWcudW5pdHNbcHJvcF0gfHwgc3RhcnRVbml0O1xuXG4gICAgICAgICAgaWYgKGluZGV4ID09PSBlbmQubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbmQgKz0gZW5kVW5pdDtcbiAgICAgICAgICAgIHB0LmUgKz0gZW5kVW5pdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnRVbml0ICE9PSBlbmRVbml0KSB7XG4gICAgICAgICAgc3RhcnROdW0gPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3AsIHN0YXJ0VmFsdWUsIGVuZFVuaXQpIHx8IDA7XG4gICAgICAgIH0gLy90aGVzZSBuZXN0ZWQgUHJvcFR3ZWVucyBhcmUgaGFuZGxlZCBpbiBhIHNwZWNpYWwgd2F5IC0gd2UnbGwgbmV2ZXIgYWN0dWFsbHkgY2FsbCBhIHJlbmRlciBvciBzZXR0ZXIgbWV0aG9kIG9uIHRoZW0uIFdlJ2xsIGp1c3QgbG9vcCB0aHJvdWdoIHRoZW0gaW4gdGhlIHBhcmVudCBjb21wbGV4IHN0cmluZyBQcm9wVHdlZW4ncyByZW5kZXIgbWV0aG9kLlxuXG5cbiAgICAgICAgcHQuX3B0ID0ge1xuICAgICAgICAgIF9uZXh0OiBwdC5fcHQsXG4gICAgICAgICAgcDogY2h1bmsgfHwgbWF0Y2hJbmRleCA9PT0gMSA/IGNodW5rIDogXCIsXCIsXG4gICAgICAgICAgLy9ub3RlOiBTVkcgc3BlYyBhbGxvd3Mgb21pc3Npb24gb2YgY29tbWEvc3BhY2Ugd2hlbiBhIG5lZ2F0aXZlIHNpZ24gaXMgd2VkZ2VkIGJldHdlZW4gdHdvIG51bWJlcnMsIGxpa2UgMi41LTUuMyBpbnN0ZWFkIG9mIDIuNSwtNS4zIGJ1dCB3aGVuIHR3ZWVuaW5nLCB0aGUgbmVnYXRpdmUgdmFsdWUgbWF5IHN3aXRjaCB0byBwb3NpdGl2ZSwgc28gd2UgaW5zZXJ0IHRoZSBjb21tYSBqdXN0IGluIGNhc2UuXG4gICAgICAgICAgczogc3RhcnROdW0sXG4gICAgICAgICAgYzogcmVsYXRpdmUgPyByZWxhdGl2ZSAqIGVuZE51bSA6IGVuZE51bSAtIHN0YXJ0TnVtLFxuICAgICAgICAgIG06IGNvbG9yICYmIGNvbG9yIDwgNCA/IE1hdGgucm91bmQgOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHQuYyA9IGluZGV4IDwgZW5kLmxlbmd0aCA/IGVuZC5zdWJzdHJpbmcoaW5kZXgsIGVuZC5sZW5ndGgpIDogXCJcIjsgLy93ZSB1c2UgdGhlIFwiY1wiIG9mIHRoZSBQcm9wVHdlZW4gdG8gc3RvcmUgdGhlIGZpbmFsIHBhcnQgb2YgdGhlIHN0cmluZyAoYWZ0ZXIgdGhlIGxhc3QgbnVtYmVyKVxuICB9IGVsc2Uge1xuICAgIHB0LnIgPSBwcm9wID09PSBcImRpc3BsYXlcIiAmJiBlbmQgPT09IFwibm9uZVwiID8gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWVPbmx5QXRFbmQgOiBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZTtcbiAgfVxuXG4gIGlmIChfcmVsRXhwLnRlc3QoZW5kKSkge1xuICAgIHB0LmUgPSAwOyAvL2lmIHRoZSBlbmQgc3RyaW5nIGNvbnRhaW5zIHJlbGF0aXZlIHZhbHVlcyBvciBkeW5hbWljIHJhbmRvbSguLi4pIHZhbHVlcywgZGVsZXRlIHRoZSBlbmQgaXQgc28gdGhhdCBvbiB0aGUgZmluYWwgcmVuZGVyIHdlIGRvbid0IGFjdHVhbGx5IHNldCBpdCB0byB0aGUgc3RyaW5nIHdpdGggKz0gb3IgLT0gY2hhcmFjdGVycyAoZm9yY2VzIGl0IHRvIHVzZSB0aGUgY2FsY3VsYXRlZCB2YWx1ZSkuXG4gIH1cblxuICB0aGlzLl9wdCA9IHB0OyAvL3N0YXJ0IHRoZSBsaW5rZWQgbGlzdCB3aXRoIHRoaXMgbmV3IFByb3BUd2Vlbi4gUmVtZW1iZXIsIHdlIGNhbGwgX3R3ZWVuQ29tcGxleENTU1N0cmluZy5jYWxsKHBsdWdpbkluc3RhbmNlLi4uKSB0byBlbnN1cmUgdGhhdCBpdCdzIHNjb3BlZCBwcm9wZXJseS4gV2UgbWF5IGNhbGwgaXQgZnJvbSB3aXRoaW4gYW5vdGhlciBwbHVnaW4gdG9vLCB0aHVzIFwidGhpc1wiIHdvdWxkIHJlZmVyIHRvIHRoZSBwbHVnaW4uXG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfa2V5d29yZFRvUGVyY2VudCA9IHtcbiAgdG9wOiBcIjAlXCIsXG4gIGJvdHRvbTogXCIxMDAlXCIsXG4gIGxlZnQ6IFwiMCVcIixcbiAgcmlnaHQ6IFwiMTAwJVwiLFxuICBjZW50ZXI6IFwiNTAlXCJcbn0sXG4gICAgX2NvbnZlcnRLZXl3b3Jkc1RvUGVyY2VudGFnZXMgPSBmdW5jdGlvbiBfY29udmVydEtleXdvcmRzVG9QZXJjZW50YWdlcyh2YWx1ZSkge1xuICB2YXIgc3BsaXQgPSB2YWx1ZS5zcGxpdChcIiBcIiksXG4gICAgICB4ID0gc3BsaXRbMF0sXG4gICAgICB5ID0gc3BsaXRbMV0gfHwgXCI1MCVcIjtcblxuICBpZiAoeCA9PT0gXCJ0b3BcIiB8fCB4ID09PSBcImJvdHRvbVwiIHx8IHkgPT09IFwibGVmdFwiIHx8IHkgPT09IFwicmlnaHRcIikge1xuICAgIC8vdGhlIHVzZXIgcHJvdmlkZWQgdGhlbSBpbiB0aGUgd3Jvbmcgb3JkZXIsIHNvIGZsaXAgdGhlbVxuICAgIHZhbHVlID0geDtcbiAgICB4ID0geTtcbiAgICB5ID0gdmFsdWU7XG4gIH1cblxuICBzcGxpdFswXSA9IF9rZXl3b3JkVG9QZXJjZW50W3hdIHx8IHg7XG4gIHNwbGl0WzFdID0gX2tleXdvcmRUb1BlcmNlbnRbeV0gfHwgeTtcbiAgcmV0dXJuIHNwbGl0LmpvaW4oXCIgXCIpO1xufSxcbiAgICBfcmVuZGVyQ2xlYXJQcm9wcyA9IGZ1bmN0aW9uIF9yZW5kZXJDbGVhclByb3BzKHJhdGlvLCBkYXRhKSB7XG4gIGlmIChkYXRhLnR3ZWVuICYmIGRhdGEudHdlZW4uX3RpbWUgPT09IGRhdGEudHdlZW4uX2R1cikge1xuICAgIHZhciB0YXJnZXQgPSBkYXRhLnQsXG4gICAgICAgIHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICAgICAgICBwcm9wcyA9IGRhdGEudSxcbiAgICAgICAgY2FjaGUgPSB0YXJnZXQuX2dzYXAsXG4gICAgICAgIHByb3AsXG4gICAgICAgIGNsZWFyVHJhbnNmb3JtcyxcbiAgICAgICAgaTtcblxuICAgIGlmIChwcm9wcyA9PT0gXCJhbGxcIiB8fCBwcm9wcyA9PT0gdHJ1ZSkge1xuICAgICAgc3R5bGUuY3NzVGV4dCA9IFwiXCI7XG4gICAgICBjbGVhclRyYW5zZm9ybXMgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcyA9IHByb3BzLnNwbGl0KFwiLFwiKTtcbiAgICAgIGkgPSBwcm9wcy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xuICAgICAgICBwcm9wID0gcHJvcHNbaV07XG5cbiAgICAgICAgaWYgKF90cmFuc2Zvcm1Qcm9wc1twcm9wXSkge1xuICAgICAgICAgIGNsZWFyVHJhbnNmb3JtcyA9IDE7XG4gICAgICAgICAgcHJvcCA9IHByb3AgPT09IFwidHJhbnNmb3JtT3JpZ2luXCIgPyBfdHJhbnNmb3JtT3JpZ2luUHJvcCA6IF90cmFuc2Zvcm1Qcm9wO1xuICAgICAgICB9XG5cbiAgICAgICAgX3JlbW92ZVByb3BlcnR5KHRhcmdldCwgcHJvcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNsZWFyVHJhbnNmb3Jtcykge1xuICAgICAgX3JlbW92ZVByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybVByb3ApO1xuXG4gICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgY2FjaGUuc3ZnICYmIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIik7XG5cbiAgICAgICAgX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgMSk7IC8vIGZvcmNlIGFsbCB0aGUgY2FjaGVkIHZhbHVlcyBiYWNrIHRvIFwibm9ybWFsXCIvaWRlbnRpdHksIG90aGVyd2lzZSBpZiB0aGVyZSdzIGFub3RoZXIgdHdlZW4gdGhhdCdzIGFscmVhZHkgc2V0IHRvIHJlbmRlciB0cmFuc2Zvcm1zIG9uIHRoaXMgZWxlbWVudCwgaXQgY291bGQgZGlzcGxheSB0aGUgd3JvbmcgdmFsdWVzLlxuXG5cbiAgICAgICAgY2FjaGUudW5jYWNoZSA9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG59LFxuICAgIC8vIG5vdGU6IHNwZWNpYWxQcm9wcyBzaG91bGQgcmV0dXJuIDEgaWYgKGFuZCBvbmx5IGlmKSB0aGV5IGhhdmUgYSBub24temVybyBwcmlvcml0eS4gSXQgaW5kaWNhdGVzIHdlIG5lZWQgdG8gc29ydCB0aGUgbGlua2VkIGxpc3QuXG5fc3BlY2lhbFByb3BzID0ge1xuICBjbGVhclByb3BzOiBmdW5jdGlvbiBjbGVhclByb3BzKHBsdWdpbiwgdGFyZ2V0LCBwcm9wZXJ0eSwgZW5kVmFsdWUsIHR3ZWVuKSB7XG4gICAgaWYgKHR3ZWVuLmRhdGEgIT09IFwiaXNGcm9tU3RhcnRcIikge1xuICAgICAgdmFyIHB0ID0gcGx1Z2luLl9wdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgdGFyZ2V0LCBwcm9wZXJ0eSwgMCwgMCwgX3JlbmRlckNsZWFyUHJvcHMpO1xuICAgICAgcHQudSA9IGVuZFZhbHVlO1xuICAgICAgcHQucHIgPSAtMTA7XG4gICAgICBwdC50d2VlbiA9IHR3ZWVuO1xuXG4gICAgICBwbHVnaW4uX3Byb3BzLnB1c2gocHJvcGVydHkpO1xuXG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cbiAgLyogY2xhc3NOYW1lIGZlYXR1cmUgKGFib3V0IDAuNGtiIGd6aXBwZWQpLlxuICAsIGNsYXNzTmFtZShwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIGVuZFZhbHVlLCB0d2Vlbikge1xuICBcdGxldCBfcmVuZGVyQ2xhc3NOYW1lID0gKHJhdGlvLCBkYXRhKSA9PiB7XG4gIFx0XHRcdGRhdGEuY3NzLnJlbmRlcihyYXRpbywgZGF0YS5jc3MpO1xuICBcdFx0XHRpZiAoIXJhdGlvIHx8IHJhdGlvID09PSAxKSB7XG4gIFx0XHRcdFx0bGV0IGlubGluZSA9IGRhdGEucm12LFxuICBcdFx0XHRcdFx0dGFyZ2V0ID0gZGF0YS50LFxuICBcdFx0XHRcdFx0cDtcbiAgXHRcdFx0XHR0YXJnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgcmF0aW8gPyBkYXRhLmUgOiBkYXRhLmIpO1xuICBcdFx0XHRcdGZvciAocCBpbiBpbmxpbmUpIHtcbiAgXHRcdFx0XHRcdF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIHApO1xuICBcdFx0XHRcdH1cbiAgXHRcdFx0fVxuICBcdFx0fSxcbiAgXHRcdF9nZXRBbGxTdHlsZXMgPSAodGFyZ2V0KSA9PiB7XG4gIFx0XHRcdGxldCBzdHlsZXMgPSB7fSxcbiAgXHRcdFx0XHRjb21wdXRlZCA9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KSxcbiAgXHRcdFx0XHRwO1xuICBcdFx0XHRmb3IgKHAgaW4gY29tcHV0ZWQpIHtcbiAgXHRcdFx0XHRpZiAoaXNOYU4ocCkgJiYgcCAhPT0gXCJjc3NUZXh0XCIgJiYgcCAhPT0gXCJsZW5ndGhcIikge1xuICBcdFx0XHRcdFx0c3R5bGVzW3BdID0gY29tcHV0ZWRbcF07XG4gIFx0XHRcdFx0fVxuICBcdFx0XHR9XG4gIFx0XHRcdF9zZXREZWZhdWx0cyhzdHlsZXMsIF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIDEpKTtcbiAgXHRcdFx0cmV0dXJuIHN0eWxlcztcbiAgXHRcdH0sXG4gIFx0XHRzdGFydENsYXNzTGlzdCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSxcbiAgXHRcdHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICBcdFx0Y3NzVGV4dCA9IHN0eWxlLmNzc1RleHQsXG4gIFx0XHRjYWNoZSA9IHRhcmdldC5fZ3NhcCxcbiAgXHRcdGNsYXNzUFQgPSBjYWNoZS5jbGFzc1BULFxuICBcdFx0aW5saW5lVG9SZW1vdmVBdEVuZCA9IHt9LFxuICBcdFx0ZGF0YSA9IHt0OnRhcmdldCwgcGx1Z2luOnBsdWdpbiwgcm12OmlubGluZVRvUmVtb3ZlQXRFbmQsIGI6c3RhcnRDbGFzc0xpc3QsIGU6KGVuZFZhbHVlLmNoYXJBdCgxKSAhPT0gXCI9XCIpID8gZW5kVmFsdWUgOiBzdGFydENsYXNzTGlzdC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoPzpcXFxcc3xeKVwiICsgZW5kVmFsdWUuc3Vic3RyKDIpICsgXCIoPyFbXFxcXHctXSlcIiksIFwiXCIpICsgKChlbmRWYWx1ZS5jaGFyQXQoMCkgPT09IFwiK1wiKSA/IFwiIFwiICsgZW5kVmFsdWUuc3Vic3RyKDIpIDogXCJcIil9LFxuICBcdFx0Y2hhbmdpbmdWYXJzID0ge30sXG4gIFx0XHRzdGFydFZhcnMgPSBfZ2V0QWxsU3R5bGVzKHRhcmdldCksXG4gIFx0XHR0cmFuc2Zvcm1SZWxhdGVkID0gLyh0cmFuc2Zvcm18cGVyc3BlY3RpdmUpL2ksXG4gIFx0XHRlbmRWYXJzLCBwO1xuICBcdGlmIChjbGFzc1BUKSB7XG4gIFx0XHRjbGFzc1BULnIoMSwgY2xhc3NQVC5kKTtcbiAgXHRcdF9yZW1vdmVMaW5rZWRMaXN0SXRlbShjbGFzc1BULmQucGx1Z2luLCBjbGFzc1BULCBcIl9wdFwiKTtcbiAgXHR9XG4gIFx0dGFyZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGRhdGEuZSk7XG4gIFx0ZW5kVmFycyA9IF9nZXRBbGxTdHlsZXModGFyZ2V0LCB0cnVlKTtcbiAgXHR0YXJnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgc3RhcnRDbGFzc0xpc3QpO1xuICBcdGZvciAocCBpbiBlbmRWYXJzKSB7XG4gIFx0XHRpZiAoZW5kVmFyc1twXSAhPT0gc3RhcnRWYXJzW3BdICYmICF0cmFuc2Zvcm1SZWxhdGVkLnRlc3QocCkpIHtcbiAgXHRcdFx0Y2hhbmdpbmdWYXJzW3BdID0gZW5kVmFyc1twXTtcbiAgXHRcdFx0aWYgKCFzdHlsZVtwXSAmJiBzdHlsZVtwXSAhPT0gXCIwXCIpIHtcbiAgXHRcdFx0XHRpbmxpbmVUb1JlbW92ZUF0RW5kW3BdID0gMTtcbiAgXHRcdFx0fVxuICBcdFx0fVxuICBcdH1cbiAgXHRjYWNoZS5jbGFzc1BUID0gcGx1Z2luLl9wdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgdGFyZ2V0LCBcImNsYXNzTmFtZVwiLCAwLCAwLCBfcmVuZGVyQ2xhc3NOYW1lLCBkYXRhLCAwLCAtMTEpO1xuICBcdGlmIChzdHlsZS5jc3NUZXh0ICE9PSBjc3NUZXh0KSB7IC8vb25seSBhcHBseSBpZiB0aGluZ3MgY2hhbmdlLiBPdGhlcndpc2UsIGluIGNhc2VzIGxpa2UgYSBiYWNrZ3JvdW5kLWltYWdlIHRoYXQncyBwdWxsZWQgZHluYW1pY2FsbHksIGl0IGNvdWxkIGNhdXNlIGEgcmVmcmVzaC4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjAzNjgtcG9zc2libGUtZ3NhcC1idWctc3dpdGNoaW5nLWNsYXNzbmFtZXMtaW4tY2hyb21lLy5cbiAgXHRcdHN0eWxlLmNzc1RleHQgPSBjc3NUZXh0OyAvL3dlIHJlY29yZGVkIGNzc1RleHQgYmVmb3JlIHdlIHN3YXBwZWQgY2xhc3NlcyBhbmQgcmFuIF9nZXRBbGxTdHlsZXMoKSBiZWNhdXNlIGluIGNhc2VzIHdoZW4gYSBjbGFzc05hbWUgdHdlZW4gaXMgb3ZlcndyaXR0ZW4sIHdlIHJlbW92ZSBhbGwgdGhlIHJlbGF0ZWQgdHdlZW5pbmcgcHJvcGVydGllcyBmcm9tIHRoYXQgY2xhc3MgY2hhbmdlIChvdGhlcndpc2UgY2xhc3Mtc3BlY2lmaWMgc3R1ZmYgY2FuJ3Qgb3ZlcnJpZGUgcHJvcGVydGllcyB3ZSd2ZSBkaXJlY3RseSBzZXQgb24gdGhlIHRhcmdldCdzIHN0eWxlIG9iamVjdCBkdWUgdG8gc3BlY2lmaWNpdHkpLlxuICBcdH1cbiAgXHRfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCB0cnVlKTsgLy90byBjbGVhciB0aGUgY2FjaGluZyBvZiB0cmFuc2Zvcm1zXG4gIFx0ZGF0YS5jc3MgPSBuZXcgZ3NhcC5wbHVnaW5zLmNzcygpO1xuICBcdGRhdGEuY3NzLmluaXQodGFyZ2V0LCBjaGFuZ2luZ1ZhcnMsIHR3ZWVuKTtcbiAgXHRwbHVnaW4uX3Byb3BzLnB1c2goLi4uZGF0YS5jc3MuX3Byb3BzKTtcbiAgXHRyZXR1cm4gMTtcbiAgfVxuICAqL1xuXG59LFxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRSQU5TRk9STVNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cbl9pZGVudGl0eTJETWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdLFxuICAgIF9yb3RhdGlvbmFsUHJvcGVydGllcyA9IHt9LFxuICAgIF9pc051bGxUcmFuc2Zvcm0gPSBmdW5jdGlvbiBfaXNOdWxsVHJhbnNmb3JtKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gXCJtYXRyaXgoMSwgMCwgMCwgMSwgMCwgMClcIiB8fCB2YWx1ZSA9PT0gXCJub25lXCIgfHwgIXZhbHVlO1xufSxcbiAgICBfZ2V0Q29tcHV0ZWRUcmFuc2Zvcm1NYXRyaXhBc0FycmF5ID0gZnVuY3Rpb24gX2dldENvbXB1dGVkVHJhbnNmb3JtTWF0cml4QXNBcnJheSh0YXJnZXQpIHtcbiAgdmFyIG1hdHJpeFN0cmluZyA9IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybVByb3ApO1xuXG4gIHJldHVybiBfaXNOdWxsVHJhbnNmb3JtKG1hdHJpeFN0cmluZykgPyBfaWRlbnRpdHkyRE1hdHJpeCA6IG1hdHJpeFN0cmluZy5zdWJzdHIoNykubWF0Y2goX251bUV4cCkubWFwKF9yb3VuZCk7XG59LFxuICAgIF9nZXRNYXRyaXggPSBmdW5jdGlvbiBfZ2V0TWF0cml4KHRhcmdldCwgZm9yY2UyRCkge1xuICB2YXIgY2FjaGUgPSB0YXJnZXQuX2dzYXAgfHwgX2dldENhY2hlKHRhcmdldCksXG4gICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgIG1hdHJpeCA9IF9nZXRDb21wdXRlZFRyYW5zZm9ybU1hdHJpeEFzQXJyYXkodGFyZ2V0KSxcbiAgICAgIHBhcmVudCxcbiAgICAgIG5leHRTaWJsaW5nLFxuICAgICAgdGVtcCxcbiAgICAgIGFkZGVkVG9ET007XG5cbiAgaWYgKGNhY2hlLnN2ZyAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIpKSB7XG4gICAgdGVtcCA9IHRhcmdldC50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpLm1hdHJpeDsgLy9lbnN1cmVzIHRoYXQgZXZlbiBjb21wbGV4IHZhbHVlcyBsaWtlIFwidHJhbnNsYXRlKDUwLDYwKSByb3RhdGUoMTM1LDAsMClcIiBhcmUgcGFyc2VkIGJlY2F1c2UgaXQgbWFzaGVzIGl0IGludG8gYSBtYXRyaXguXG5cbiAgICBtYXRyaXggPSBbdGVtcC5hLCB0ZW1wLmIsIHRlbXAuYywgdGVtcC5kLCB0ZW1wLmUsIHRlbXAuZl07XG4gICAgcmV0dXJuIG1hdHJpeC5qb2luKFwiLFwiKSA9PT0gXCIxLDAsMCwxLDAsMFwiID8gX2lkZW50aXR5MkRNYXRyaXggOiBtYXRyaXg7XG4gIH0gZWxzZSBpZiAobWF0cml4ID09PSBfaWRlbnRpdHkyRE1hdHJpeCAmJiAhdGFyZ2V0Lm9mZnNldFBhcmVudCAmJiB0YXJnZXQgIT09IF9kb2NFbGVtZW50ICYmICFjYWNoZS5zdmcpIHtcbiAgICAvL25vdGU6IGlmIG9mZnNldFBhcmVudCBpcyBudWxsLCB0aGF0IG1lYW5zIHRoZSBlbGVtZW50IGlzbid0IGluIHRoZSBub3JtYWwgZG9jdW1lbnQgZmxvdywgbGlrZSBpZiBpdCBoYXMgZGlzcGxheTpub25lIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyBkaXNwbGF5Om5vbmUpLiBGaXJlZm94IHJldHVybnMgbnVsbCBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSgpIGlmIHRoZSBlbGVtZW50IGlzIGluIGFuIGlmcmFtZSB0aGF0IGhhcyBkaXNwbGF5Om5vbmUuIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICAgIC8vYnJvd3NlcnMgZG9uJ3QgcmVwb3J0IHRyYW5zZm9ybXMgYWNjdXJhdGVseSB1bmxlc3MgdGhlIGVsZW1lbnQgaXMgaW4gdGhlIERPTSBhbmQgaGFzIGEgZGlzcGxheSB2YWx1ZSB0aGF0J3Mgbm90IFwibm9uZVwiLiBGaXJlZm94IGFuZCBNaWNyb3NvZnQgYnJvd3NlcnMgaGF2ZSBhIHBhcnRpYWwgYnVnIHdoZXJlIHRoZXknbGwgcmVwb3J0IHRyYW5zZm9ybXMgZXZlbiBpZiBkaXNwbGF5Om5vbmUgQlVUIG5vdCBhbnkgcGVyY2VudGFnZS1iYXNlZCB2YWx1ZXMgbGlrZSB0cmFuc2xhdGUoLTUwJSwgOHB4KSB3aWxsIGJlIHJlcG9ydGVkIGFzIGlmIGl0J3MgdHJhbnNsYXRlKDAsIDhweCkuXG4gICAgdGVtcCA9IHN0eWxlLmRpc3BsYXk7XG4gICAgc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcblxuICAgIGlmICghcGFyZW50IHx8ICF0YXJnZXQub2Zmc2V0UGFyZW50KSB7XG4gICAgICAvLyBub3RlOiBpbiAzLjMuMCB3ZSBzd2l0Y2hlZCB0YXJnZXQub2Zmc2V0UGFyZW50IHRvIF9kb2MuYm9keS5jb250YWlucyh0YXJnZXQpIHRvIGF2b2lkIFtzb21ldGltZXMgdW5uZWNlc3NhcnldIE11dGF0aW9uT2JzZXJ2ZXIgY2FsbHMgYnV0IHRoYXQgd2Fzbid0IGFkZXF1YXRlIGJlY2F1c2UgdGhlcmUgYXJlIGVkZ2UgY2FzZXMgd2hlcmUgbmVzdGVkIHBvc2l0aW9uOiBmaXhlZCBlbGVtZW50cyBuZWVkIHRvIGdldCByZXBhcmVudGVkIHRvIGFjY3VyYXRlbHkgc2Vuc2UgdHJhbnNmb3Jtcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmVlbnNvY2svR1NBUC9pc3N1ZXMvMzg4IGFuZCBodHRwczovL2dpdGh1Yi5jb20vZ3JlZW5zb2NrL0dTQVAvaXNzdWVzLzM3NVxuICAgICAgYWRkZWRUb0RPTSA9IDE7IC8vZmxhZ1xuXG4gICAgICBuZXh0U2libGluZyA9IHRhcmdldC5uZXh0U2libGluZztcblxuICAgICAgX2RvY0VsZW1lbnQuYXBwZW5kQ2hpbGQodGFyZ2V0KTsgLy93ZSBtdXN0IGFkZCBpdCB0byB0aGUgRE9NIGluIG9yZGVyIHRvIGdldCB2YWx1ZXMgcHJvcGVybHlcblxuICAgIH1cblxuICAgIG1hdHJpeCA9IF9nZXRDb21wdXRlZFRyYW5zZm9ybU1hdHJpeEFzQXJyYXkodGFyZ2V0KTtcbiAgICB0ZW1wID8gc3R5bGUuZGlzcGxheSA9IHRlbXAgOiBfcmVtb3ZlUHJvcGVydHkodGFyZ2V0LCBcImRpc3BsYXlcIik7XG5cbiAgICBpZiAoYWRkZWRUb0RPTSkge1xuICAgICAgbmV4dFNpYmxpbmcgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKHRhcmdldCwgbmV4dFNpYmxpbmcpIDogcGFyZW50ID8gcGFyZW50LmFwcGVuZENoaWxkKHRhcmdldCkgOiBfZG9jRWxlbWVudC5yZW1vdmVDaGlsZCh0YXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmb3JjZTJEICYmIG1hdHJpeC5sZW5ndGggPiA2ID8gW21hdHJpeFswXSwgbWF0cml4WzFdLCBtYXRyaXhbNF0sIG1hdHJpeFs1XSwgbWF0cml4WzEyXSwgbWF0cml4WzEzXV0gOiBtYXRyaXg7XG59LFxuICAgIF9hcHBseVNWR09yaWdpbiA9IGZ1bmN0aW9uIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIG9yaWdpbiwgb3JpZ2luSXNBYnNvbHV0ZSwgc21vb3RoLCBtYXRyaXhBcnJheSwgcGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8pIHtcbiAgdmFyIGNhY2hlID0gdGFyZ2V0Ll9nc2FwLFxuICAgICAgbWF0cml4ID0gbWF0cml4QXJyYXkgfHwgX2dldE1hdHJpeCh0YXJnZXQsIHRydWUpLFxuICAgICAgeE9yaWdpbk9sZCA9IGNhY2hlLnhPcmlnaW4gfHwgMCxcbiAgICAgIHlPcmlnaW5PbGQgPSBjYWNoZS55T3JpZ2luIHx8IDAsXG4gICAgICB4T2Zmc2V0T2xkID0gY2FjaGUueE9mZnNldCB8fCAwLFxuICAgICAgeU9mZnNldE9sZCA9IGNhY2hlLnlPZmZzZXQgfHwgMCxcbiAgICAgIGEgPSBtYXRyaXhbMF0sXG4gICAgICBiID0gbWF0cml4WzFdLFxuICAgICAgYyA9IG1hdHJpeFsyXSxcbiAgICAgIGQgPSBtYXRyaXhbM10sXG4gICAgICB0eCA9IG1hdHJpeFs0XSxcbiAgICAgIHR5ID0gbWF0cml4WzVdLFxuICAgICAgb3JpZ2luU3BsaXQgPSBvcmlnaW4uc3BsaXQoXCIgXCIpLFxuICAgICAgeE9yaWdpbiA9IHBhcnNlRmxvYXQob3JpZ2luU3BsaXRbMF0pIHx8IDAsXG4gICAgICB5T3JpZ2luID0gcGFyc2VGbG9hdChvcmlnaW5TcGxpdFsxXSkgfHwgMCxcbiAgICAgIGJvdW5kcyxcbiAgICAgIGRldGVybWluYW50LFxuICAgICAgeCxcbiAgICAgIHk7XG5cbiAgaWYgKCFvcmlnaW5Jc0Fic29sdXRlKSB7XG4gICAgYm91bmRzID0gX2dldEJCb3godGFyZ2V0KTtcbiAgICB4T3JpZ2luID0gYm91bmRzLnggKyAofm9yaWdpblNwbGl0WzBdLmluZGV4T2YoXCIlXCIpID8geE9yaWdpbiAvIDEwMCAqIGJvdW5kcy53aWR0aCA6IHhPcmlnaW4pO1xuICAgIHlPcmlnaW4gPSBib3VuZHMueSArICh+KG9yaWdpblNwbGl0WzFdIHx8IG9yaWdpblNwbGl0WzBdKS5pbmRleE9mKFwiJVwiKSA/IHlPcmlnaW4gLyAxMDAgKiBib3VuZHMuaGVpZ2h0IDogeU9yaWdpbik7XG4gIH0gZWxzZSBpZiAobWF0cml4ICE9PSBfaWRlbnRpdHkyRE1hdHJpeCAmJiAoZGV0ZXJtaW5hbnQgPSBhICogZCAtIGIgKiBjKSkge1xuICAgIC8vaWYgaXQncyB6ZXJvIChsaWtlIGlmIHNjYWxlWCBhbmQgc2NhbGVZIGFyZSB6ZXJvKSwgc2tpcCBpdCB0byBhdm9pZCBlcnJvcnMgd2l0aCBkaXZpZGluZyBieSB6ZXJvLlxuICAgIHggPSB4T3JpZ2luICogKGQgLyBkZXRlcm1pbmFudCkgKyB5T3JpZ2luICogKC1jIC8gZGV0ZXJtaW5hbnQpICsgKGMgKiB0eSAtIGQgKiB0eCkgLyBkZXRlcm1pbmFudDtcbiAgICB5ID0geE9yaWdpbiAqICgtYiAvIGRldGVybWluYW50KSArIHlPcmlnaW4gKiAoYSAvIGRldGVybWluYW50KSAtIChhICogdHkgLSBiICogdHgpIC8gZGV0ZXJtaW5hbnQ7XG4gICAgeE9yaWdpbiA9IHg7XG4gICAgeU9yaWdpbiA9IHk7XG4gIH1cblxuICBpZiAoc21vb3RoIHx8IHNtb290aCAhPT0gZmFsc2UgJiYgY2FjaGUuc21vb3RoKSB7XG4gICAgdHggPSB4T3JpZ2luIC0geE9yaWdpbk9sZDtcbiAgICB0eSA9IHlPcmlnaW4gLSB5T3JpZ2luT2xkO1xuICAgIGNhY2hlLnhPZmZzZXQgPSB4T2Zmc2V0T2xkICsgKHR4ICogYSArIHR5ICogYykgLSB0eDtcbiAgICBjYWNoZS55T2Zmc2V0ID0geU9mZnNldE9sZCArICh0eCAqIGIgKyB0eSAqIGQpIC0gdHk7XG4gIH0gZWxzZSB7XG4gICAgY2FjaGUueE9mZnNldCA9IGNhY2hlLnlPZmZzZXQgPSAwO1xuICB9XG5cbiAgY2FjaGUueE9yaWdpbiA9IHhPcmlnaW47XG4gIGNhY2hlLnlPcmlnaW4gPSB5T3JpZ2luO1xuICBjYWNoZS5zbW9vdGggPSAhIXNtb290aDtcbiAgY2FjaGUub3JpZ2luID0gb3JpZ2luO1xuICBjYWNoZS5vcmlnaW5Jc0Fic29sdXRlID0gISFvcmlnaW5Jc0Fic29sdXRlO1xuICB0YXJnZXQuc3R5bGVbX3RyYW5zZm9ybU9yaWdpblByb3BdID0gXCIwcHggMHB4XCI7IC8vb3RoZXJ3aXNlLCBpZiBzb21lb25lIHNldHMgIGFuIG9yaWdpbiB2aWEgQ1NTLCBpdCB3aWxsIGxpa2VseSBpbnRlcmZlcmUgd2l0aCB0aGUgU1ZHIHRyYW5zZm9ybSBhdHRyaWJ1dGUgb25lcyAoYmVjYXVzZSByZW1lbWJlciwgd2UncmUgYmFraW5nIHRoZSBvcmlnaW4gaW50byB0aGUgbWF0cml4KCkgdmFsdWUpLlxuXG4gIGlmIChwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbykge1xuICAgIF9hZGROb25Ud2VlbmluZ1BUKHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvLCBjYWNoZSwgXCJ4T3JpZ2luXCIsIHhPcmlnaW5PbGQsIHhPcmlnaW4pO1xuXG4gICAgX2FkZE5vblR3ZWVuaW5nUFQocGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8sIGNhY2hlLCBcInlPcmlnaW5cIiwgeU9yaWdpbk9sZCwgeU9yaWdpbik7XG5cbiAgICBfYWRkTm9uVHdlZW5pbmdQVChwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbywgY2FjaGUsIFwieE9mZnNldFwiLCB4T2Zmc2V0T2xkLCBjYWNoZS54T2Zmc2V0KTtcblxuICAgIF9hZGROb25Ud2VlbmluZ1BUKHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvLCBjYWNoZSwgXCJ5T2Zmc2V0XCIsIHlPZmZzZXRPbGQsIGNhY2hlLnlPZmZzZXQpO1xuICB9XG5cbiAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcImRhdGEtc3ZnLW9yaWdpblwiLCB4T3JpZ2luICsgXCIgXCIgKyB5T3JpZ2luKTtcbn0sXG4gICAgX3BhcnNlVHJhbnNmb3JtID0gZnVuY3Rpb24gX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgdW5jYWNoZSkge1xuICB2YXIgY2FjaGUgPSB0YXJnZXQuX2dzYXAgfHwgbmV3IEdTQ2FjaGUodGFyZ2V0KTtcblxuICBpZiAoXCJ4XCIgaW4gY2FjaGUgJiYgIXVuY2FjaGUgJiYgIWNhY2hlLnVuY2FjaGUpIHtcbiAgICByZXR1cm4gY2FjaGU7XG4gIH1cblxuICB2YXIgc3R5bGUgPSB0YXJnZXQuc3R5bGUsXG4gICAgICBpbnZlcnRlZFNjYWxlWCA9IGNhY2hlLnNjYWxlWCA8IDAsXG4gICAgICBweCA9IFwicHhcIixcbiAgICAgIGRlZyA9IFwiZGVnXCIsXG4gICAgICBvcmlnaW4gPSBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1PcmlnaW5Qcm9wKSB8fCBcIjBcIixcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgeixcbiAgICAgIHNjYWxlWCxcbiAgICAgIHNjYWxlWSxcbiAgICAgIHJvdGF0aW9uLFxuICAgICAgcm90YXRpb25YLFxuICAgICAgcm90YXRpb25ZLFxuICAgICAgc2tld1gsXG4gICAgICBza2V3WSxcbiAgICAgIHBlcnNwZWN0aXZlLFxuICAgICAgeE9yaWdpbixcbiAgICAgIHlPcmlnaW4sXG4gICAgICBtYXRyaXgsXG4gICAgICBhbmdsZSxcbiAgICAgIGNvcyxcbiAgICAgIHNpbixcbiAgICAgIGEsXG4gICAgICBiLFxuICAgICAgYyxcbiAgICAgIGQsXG4gICAgICBhMTIsXG4gICAgICBhMjIsXG4gICAgICB0MSxcbiAgICAgIHQyLFxuICAgICAgdDMsXG4gICAgICBhMTMsXG4gICAgICBhMjMsXG4gICAgICBhMzMsXG4gICAgICBhNDIsXG4gICAgICBhNDMsXG4gICAgICBhMzI7XG4gIHggPSB5ID0geiA9IHJvdGF0aW9uID0gcm90YXRpb25YID0gcm90YXRpb25ZID0gc2tld1ggPSBza2V3WSA9IHBlcnNwZWN0aXZlID0gMDtcbiAgc2NhbGVYID0gc2NhbGVZID0gMTtcbiAgY2FjaGUuc3ZnID0gISEodGFyZ2V0LmdldENUTSAmJiBfaXNTVkcodGFyZ2V0KSk7XG4gIG1hdHJpeCA9IF9nZXRNYXRyaXgodGFyZ2V0LCBjYWNoZS5zdmcpO1xuXG4gIGlmIChjYWNoZS5zdmcpIHtcbiAgICB0MSA9ICFjYWNoZS51bmNhY2hlICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN2Zy1vcmlnaW5cIik7XG5cbiAgICBfYXBwbHlTVkdPcmlnaW4odGFyZ2V0LCB0MSB8fCBvcmlnaW4sICEhdDEgfHwgY2FjaGUub3JpZ2luSXNBYnNvbHV0ZSwgY2FjaGUuc21vb3RoICE9PSBmYWxzZSwgbWF0cml4KTtcbiAgfVxuXG4gIHhPcmlnaW4gPSBjYWNoZS54T3JpZ2luIHx8IDA7XG4gIHlPcmlnaW4gPSBjYWNoZS55T3JpZ2luIHx8IDA7XG5cbiAgaWYgKG1hdHJpeCAhPT0gX2lkZW50aXR5MkRNYXRyaXgpIHtcbiAgICBhID0gbWF0cml4WzBdOyAvL2ExMVxuXG4gICAgYiA9IG1hdHJpeFsxXTsgLy9hMjFcblxuICAgIGMgPSBtYXRyaXhbMl07IC8vYTMxXG5cbiAgICBkID0gbWF0cml4WzNdOyAvL2E0MVxuXG4gICAgeCA9IGExMiA9IG1hdHJpeFs0XTtcbiAgICB5ID0gYTIyID0gbWF0cml4WzVdOyAvLzJEIG1hdHJpeFxuXG4gICAgaWYgKG1hdHJpeC5sZW5ndGggPT09IDYpIHtcbiAgICAgIHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcbiAgICAgIHNjYWxlWSA9IE1hdGguc3FydChkICogZCArIGMgKiBjKTtcbiAgICAgIHJvdGF0aW9uID0gYSB8fCBiID8gX2F0YW4yKGIsIGEpICogX1JBRDJERUcgOiAwOyAvL25vdGU6IGlmIHNjYWxlWCBpcyAwLCB3ZSBjYW5ub3QgYWNjdXJhdGVseSBtZWFzdXJlIHJvdGF0aW9uLiBTYW1lIGZvciBza2V3WCB3aXRoIGEgc2NhbGVZIG9mIDAuIFRoZXJlZm9yZSwgd2UgZGVmYXVsdCB0byB0aGUgcHJldmlvdXNseSByZWNvcmRlZCB2YWx1ZSAob3IgemVybyBpZiB0aGF0IGRvZXNuJ3QgZXhpc3QpLlxuXG4gICAgICBza2V3WCA9IGMgfHwgZCA/IF9hdGFuMihjLCBkKSAqIF9SQUQyREVHICsgcm90YXRpb24gOiAwO1xuICAgICAgc2tld1ggJiYgKHNjYWxlWSAqPSBNYXRoLmNvcyhza2V3WCAqIF9ERUcyUkFEKSk7XG5cbiAgICAgIGlmIChjYWNoZS5zdmcpIHtcbiAgICAgICAgeCAtPSB4T3JpZ2luIC0gKHhPcmlnaW4gKiBhICsgeU9yaWdpbiAqIGMpO1xuICAgICAgICB5IC09IHlPcmlnaW4gLSAoeE9yaWdpbiAqIGIgKyB5T3JpZ2luICogZCk7XG4gICAgICB9IC8vM0QgbWF0cml4XG5cbiAgICB9IGVsc2Uge1xuICAgICAgYTMyID0gbWF0cml4WzZdO1xuICAgICAgYTQyID0gbWF0cml4WzddO1xuICAgICAgYTEzID0gbWF0cml4WzhdO1xuICAgICAgYTIzID0gbWF0cml4WzldO1xuICAgICAgYTMzID0gbWF0cml4WzEwXTtcbiAgICAgIGE0MyA9IG1hdHJpeFsxMV07XG4gICAgICB4ID0gbWF0cml4WzEyXTtcbiAgICAgIHkgPSBtYXRyaXhbMTNdO1xuICAgICAgeiA9IG1hdHJpeFsxNF07XG4gICAgICBhbmdsZSA9IF9hdGFuMihhMzIsIGEzMyk7XG4gICAgICByb3RhdGlvblggPSBhbmdsZSAqIF9SQUQyREVHOyAvL3JvdGF0aW9uWFxuXG4gICAgICBpZiAoYW5nbGUpIHtcbiAgICAgICAgY29zID0gTWF0aC5jb3MoLWFuZ2xlKTtcbiAgICAgICAgc2luID0gTWF0aC5zaW4oLWFuZ2xlKTtcbiAgICAgICAgdDEgPSBhMTIgKiBjb3MgKyBhMTMgKiBzaW47XG4gICAgICAgIHQyID0gYTIyICogY29zICsgYTIzICogc2luO1xuICAgICAgICB0MyA9IGEzMiAqIGNvcyArIGEzMyAqIHNpbjtcbiAgICAgICAgYTEzID0gYTEyICogLXNpbiArIGExMyAqIGNvcztcbiAgICAgICAgYTIzID0gYTIyICogLXNpbiArIGEyMyAqIGNvcztcbiAgICAgICAgYTMzID0gYTMyICogLXNpbiArIGEzMyAqIGNvcztcbiAgICAgICAgYTQzID0gYTQyICogLXNpbiArIGE0MyAqIGNvcztcbiAgICAgICAgYTEyID0gdDE7XG4gICAgICAgIGEyMiA9IHQyO1xuICAgICAgICBhMzIgPSB0MztcbiAgICAgIH0gLy9yb3RhdGlvbllcblxuXG4gICAgICBhbmdsZSA9IF9hdGFuMigtYywgYTMzKTtcbiAgICAgIHJvdGF0aW9uWSA9IGFuZ2xlICogX1JBRDJERUc7XG5cbiAgICAgIGlmIChhbmdsZSkge1xuICAgICAgICBjb3MgPSBNYXRoLmNvcygtYW5nbGUpO1xuICAgICAgICBzaW4gPSBNYXRoLnNpbigtYW5nbGUpO1xuICAgICAgICB0MSA9IGEgKiBjb3MgLSBhMTMgKiBzaW47XG4gICAgICAgIHQyID0gYiAqIGNvcyAtIGEyMyAqIHNpbjtcbiAgICAgICAgdDMgPSBjICogY29zIC0gYTMzICogc2luO1xuICAgICAgICBhNDMgPSBkICogc2luICsgYTQzICogY29zO1xuICAgICAgICBhID0gdDE7XG4gICAgICAgIGIgPSB0MjtcbiAgICAgICAgYyA9IHQzO1xuICAgICAgfSAvL3JvdGF0aW9uWlxuXG5cbiAgICAgIGFuZ2xlID0gX2F0YW4yKGIsIGEpO1xuICAgICAgcm90YXRpb24gPSBhbmdsZSAqIF9SQUQyREVHO1xuXG4gICAgICBpZiAoYW5nbGUpIHtcbiAgICAgICAgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgIHQxID0gYSAqIGNvcyArIGIgKiBzaW47XG4gICAgICAgIHQyID0gYTEyICogY29zICsgYTIyICogc2luO1xuICAgICAgICBiID0gYiAqIGNvcyAtIGEgKiBzaW47XG4gICAgICAgIGEyMiA9IGEyMiAqIGNvcyAtIGExMiAqIHNpbjtcbiAgICAgICAgYSA9IHQxO1xuICAgICAgICBhMTIgPSB0MjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvdGF0aW9uWCAmJiBNYXRoLmFicyhyb3RhdGlvblgpICsgTWF0aC5hYnMocm90YXRpb24pID4gMzU5LjkpIHtcbiAgICAgICAgLy93aGVuIHJvdGF0aW9uWSBpcyBzZXQsIGl0IHdpbGwgb2Z0ZW4gYmUgcGFyc2VkIGFzIDE4MCBkZWdyZWVzIGRpZmZlcmVudCB0aGFuIGl0IHNob3VsZCBiZSwgYW5kIHJvdGF0aW9uWCBhbmQgcm90YXRpb24gYm90aCBiZWluZyAxODAgKGl0IGxvb2tzIHRoZSBzYW1lKSwgc28gd2UgYWRqdXN0IGZvciB0aGF0IGhlcmUuXG4gICAgICAgIHJvdGF0aW9uWCA9IHJvdGF0aW9uID0gMDtcbiAgICAgICAgcm90YXRpb25ZID0gMTgwIC0gcm90YXRpb25ZO1xuICAgICAgfVxuXG4gICAgICBzY2FsZVggPSBfcm91bmQoTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIgKyBjICogYykpO1xuICAgICAgc2NhbGVZID0gX3JvdW5kKE1hdGguc3FydChhMjIgKiBhMjIgKyBhMzIgKiBhMzIpKTtcbiAgICAgIGFuZ2xlID0gX2F0YW4yKGExMiwgYTIyKTtcbiAgICAgIHNrZXdYID0gTWF0aC5hYnMoYW5nbGUpID4gMC4wMDAyID8gYW5nbGUgKiBfUkFEMkRFRyA6IDA7XG4gICAgICBwZXJzcGVjdGl2ZSA9IGE0MyA/IDEgLyAoYTQzIDwgMCA/IC1hNDMgOiBhNDMpIDogMDtcbiAgICB9XG5cbiAgICBpZiAoY2FjaGUuc3ZnKSB7XG4gICAgICAvL3NlbnNlIGlmIHRoZXJlIGFyZSBDU1MgdHJhbnNmb3JtcyBhcHBsaWVkIG9uIGFuIFNWRyBlbGVtZW50IGluIHdoaWNoIGNhc2Ugd2UgbXVzdCBvdmVyd3JpdGUgdGhlbSB3aGVuIHJlbmRlcmluZy4gVGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUgaXMgbW9yZSByZWxpYWJsZSBjcm9zcy1icm93c2VyLCBidXQgd2UgY2FuJ3QganVzdCByZW1vdmUgdGhlIENTUyBvbmVzIGJlY2F1c2UgdGhleSBtYXkgYmUgYXBwbGllZCBpbiBhIENTUyBydWxlIHNvbWV3aGVyZSAobm90IGp1c3QgaW5saW5lKS5cbiAgICAgIHQxID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKTtcbiAgICAgIGNhY2hlLmZvcmNlQ1NTID0gdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBcIlwiKSB8fCAhX2lzTnVsbFRyYW5zZm9ybShfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1Qcm9wKSk7XG4gICAgICB0MSAmJiB0YXJnZXQuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHQxKTtcbiAgICB9XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoc2tld1gpID4gOTAgJiYgTWF0aC5hYnMoc2tld1gpIDwgMjcwKSB7XG4gICAgaWYgKGludmVydGVkU2NhbGVYKSB7XG4gICAgICBzY2FsZVggKj0gLTE7XG4gICAgICBza2V3WCArPSByb3RhdGlvbiA8PSAwID8gMTgwIDogLTE4MDtcbiAgICAgIHJvdGF0aW9uICs9IHJvdGF0aW9uIDw9IDAgPyAxODAgOiAtMTgwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2FsZVkgKj0gLTE7XG4gICAgICBza2V3WCArPSBza2V3WCA8PSAwID8gMTgwIDogLTE4MDtcbiAgICB9XG4gIH1cblxuICBjYWNoZS54ID0gKChjYWNoZS54UGVyY2VudCA9IHggJiYgTWF0aC5yb3VuZCh0YXJnZXQub2Zmc2V0V2lkdGggLyAyKSA9PT0gTWF0aC5yb3VuZCgteCkgPyAtNTAgOiAwKSA/IDAgOiB4KSArIHB4O1xuICBjYWNoZS55ID0gKChjYWNoZS55UGVyY2VudCA9IHkgJiYgTWF0aC5yb3VuZCh0YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMikgPT09IE1hdGgucm91bmQoLXkpID8gLTUwIDogMCkgPyAwIDogeSkgKyBweDtcbiAgY2FjaGUueiA9IHogKyBweDtcbiAgY2FjaGUuc2NhbGVYID0gX3JvdW5kKHNjYWxlWCk7XG4gIGNhY2hlLnNjYWxlWSA9IF9yb3VuZChzY2FsZVkpO1xuICBjYWNoZS5yb3RhdGlvbiA9IF9yb3VuZChyb3RhdGlvbikgKyBkZWc7XG4gIGNhY2hlLnJvdGF0aW9uWCA9IF9yb3VuZChyb3RhdGlvblgpICsgZGVnO1xuICBjYWNoZS5yb3RhdGlvblkgPSBfcm91bmQocm90YXRpb25ZKSArIGRlZztcbiAgY2FjaGUuc2tld1ggPSBza2V3WCArIGRlZztcbiAgY2FjaGUuc2tld1kgPSBza2V3WSArIGRlZztcbiAgY2FjaGUudHJhbnNmb3JtUGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZSArIHB4O1xuXG4gIGlmIChjYWNoZS56T3JpZ2luID0gcGFyc2VGbG9hdChvcmlnaW4uc3BsaXQoXCIgXCIpWzJdKSB8fCAwKSB7XG4gICAgc3R5bGVbX3RyYW5zZm9ybU9yaWdpblByb3BdID0gX2ZpcnN0VHdvT25seShvcmlnaW4pO1xuICB9XG5cbiAgY2FjaGUueE9mZnNldCA9IGNhY2hlLnlPZmZzZXQgPSAwO1xuICBjYWNoZS5mb3JjZTNEID0gX2NvbmZpZy5mb3JjZTNEO1xuICBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0gPSBjYWNoZS5zdmcgPyBfcmVuZGVyU1ZHVHJhbnNmb3JtcyA6IF9zdXBwb3J0czNEID8gX3JlbmRlckNTU1RyYW5zZm9ybXMgOiBfcmVuZGVyTm9uM0RUcmFuc2Zvcm1zO1xuICBjYWNoZS51bmNhY2hlID0gMDtcbiAgcmV0dXJuIGNhY2hlO1xufSxcbiAgICBfZmlyc3RUd29Pbmx5ID0gZnVuY3Rpb24gX2ZpcnN0VHdvT25seSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpKVswXSArIFwiIFwiICsgdmFsdWVbMV07XG59LFxuICAgIC8vZm9yIGhhbmRsaW5nIHRyYW5zZm9ybU9yaWdpbiB2YWx1ZXMsIHN0cmlwcGluZyBvdXQgdGhlIDNyZCBkaW1lbnNpb25cbl9hZGRQeFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIF9hZGRQeFRyYW5zbGF0ZSh0YXJnZXQsIHN0YXJ0LCB2YWx1ZSkge1xuICB2YXIgdW5pdCA9IGdldFVuaXQoc3RhcnQpO1xuICByZXR1cm4gX3JvdW5kKHBhcnNlRmxvYXQoc3RhcnQpICsgcGFyc2VGbG9hdChfY29udmVydFRvVW5pdCh0YXJnZXQsIFwieFwiLCB2YWx1ZSArIFwicHhcIiwgdW5pdCkpKSArIHVuaXQ7XG59LFxuICAgIF9yZW5kZXJOb24zRFRyYW5zZm9ybXMgPSBmdW5jdGlvbiBfcmVuZGVyTm9uM0RUcmFuc2Zvcm1zKHJhdGlvLCBjYWNoZSkge1xuICBjYWNoZS56ID0gXCIwcHhcIjtcbiAgY2FjaGUucm90YXRpb25ZID0gY2FjaGUucm90YXRpb25YID0gXCIwZGVnXCI7XG4gIGNhY2hlLmZvcmNlM0QgPSAwO1xuXG4gIF9yZW5kZXJDU1NUcmFuc2Zvcm1zKHJhdGlvLCBjYWNoZSk7XG59LFxuICAgIF96ZXJvRGVnID0gXCIwZGVnXCIsXG4gICAgX3plcm9QeCA9IFwiMHB4XCIsXG4gICAgX2VuZFBhcmVudGhlc2lzID0gXCIpIFwiLFxuICAgIF9yZW5kZXJDU1NUcmFuc2Zvcm1zID0gZnVuY3Rpb24gX3JlbmRlckNTU1RyYW5zZm9ybXMocmF0aW8sIGNhY2hlKSB7XG4gIHZhciBfcmVmID0gY2FjaGUgfHwgdGhpcyxcbiAgICAgIHhQZXJjZW50ID0gX3JlZi54UGVyY2VudCxcbiAgICAgIHlQZXJjZW50ID0gX3JlZi55UGVyY2VudCxcbiAgICAgIHggPSBfcmVmLngsXG4gICAgICB5ID0gX3JlZi55LFxuICAgICAgeiA9IF9yZWYueixcbiAgICAgIHJvdGF0aW9uID0gX3JlZi5yb3RhdGlvbixcbiAgICAgIHJvdGF0aW9uWSA9IF9yZWYucm90YXRpb25ZLFxuICAgICAgcm90YXRpb25YID0gX3JlZi5yb3RhdGlvblgsXG4gICAgICBza2V3WCA9IF9yZWYuc2tld1gsXG4gICAgICBza2V3WSA9IF9yZWYuc2tld1ksXG4gICAgICBzY2FsZVggPSBfcmVmLnNjYWxlWCxcbiAgICAgIHNjYWxlWSA9IF9yZWYuc2NhbGVZLFxuICAgICAgdHJhbnNmb3JtUGVyc3BlY3RpdmUgPSBfcmVmLnRyYW5zZm9ybVBlcnNwZWN0aXZlLFxuICAgICAgZm9yY2UzRCA9IF9yZWYuZm9yY2UzRCxcbiAgICAgIHRhcmdldCA9IF9yZWYudGFyZ2V0LFxuICAgICAgek9yaWdpbiA9IF9yZWYuek9yaWdpbixcbiAgICAgIHRyYW5zZm9ybXMgPSBcIlwiLFxuICAgICAgdXNlM0QgPSBmb3JjZTNEID09PSBcImF1dG9cIiAmJiByYXRpbyAmJiByYXRpbyAhPT0gMSB8fCBmb3JjZTNEID09PSB0cnVlOyAvLyBTYWZhcmkgaGFzIGEgYnVnIHRoYXQgY2F1c2VzIGl0IG5vdCB0byByZW5kZXIgM0QgdHJhbnNmb3JtLW9yaWdpbiB2YWx1ZXMgcHJvcGVybHksIHNvIHdlIGZvcmNlIHRoZSB6IG9yaWdpbiB0byAwLCByZWNvcmQgaXQgaW4gdGhlIGNhY2hlLCBhbmQgdGhlbiBkbyB0aGUgbWF0aCBoZXJlIHRvIG9mZnNldCB0aGUgdHJhbnNsYXRlIHZhbHVlcyBhY2NvcmRpbmdseSAoYmFzaWNhbGx5IGRvIHRoZSAzRCB0cmFuc2Zvcm0tb3JpZ2luIHBhcnQgbWFudWFsbHkpXG5cblxuICBpZiAoek9yaWdpbiAmJiAocm90YXRpb25YICE9PSBfemVyb0RlZyB8fCByb3RhdGlvblkgIT09IF96ZXJvRGVnKSkge1xuICAgIHZhciBhbmdsZSA9IHBhcnNlRmxvYXQocm90YXRpb25ZKSAqIF9ERUcyUkFELFxuICAgICAgICBhMTMgPSBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIGEzMyA9IE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgY29zO1xuXG4gICAgYW5nbGUgPSBwYXJzZUZsb2F0KHJvdGF0aW9uWCkgKiBfREVHMlJBRDtcbiAgICBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgeCA9IF9hZGRQeFRyYW5zbGF0ZSh0YXJnZXQsIHgsIGExMyAqIGNvcyAqIC16T3JpZ2luKTtcbiAgICB5ID0gX2FkZFB4VHJhbnNsYXRlKHRhcmdldCwgeSwgLU1hdGguc2luKGFuZ2xlKSAqIC16T3JpZ2luKTtcbiAgICB6ID0gX2FkZFB4VHJhbnNsYXRlKHRhcmdldCwgeiwgYTMzICogY29zICogLXpPcmlnaW4gKyB6T3JpZ2luKTtcbiAgfVxuXG4gIGlmICh0cmFuc2Zvcm1QZXJzcGVjdGl2ZSAhPT0gX3plcm9QeCkge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJwZXJzcGVjdGl2ZShcIiArIHRyYW5zZm9ybVBlcnNwZWN0aXZlICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHhQZXJjZW50IHx8IHlQZXJjZW50KSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInRyYW5zbGF0ZShcIiArIHhQZXJjZW50ICsgXCIlLCBcIiArIHlQZXJjZW50ICsgXCIlKSBcIjtcbiAgfVxuXG4gIGlmICh1c2UzRCB8fCB4ICE9PSBfemVyb1B4IHx8IHkgIT09IF96ZXJvUHggfHwgeiAhPT0gX3plcm9QeCkge1xuICAgIHRyYW5zZm9ybXMgKz0geiAhPT0gX3plcm9QeCB8fCB1c2UzRCA/IFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCIsIFwiICsgeSArIFwiLCBcIiArIHogKyBcIikgXCIgOiBcInRyYW5zbGF0ZShcIiArIHggKyBcIiwgXCIgKyB5ICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHJvdGF0aW9uICE9PSBfemVyb0RlZykge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJyb3RhdGUoXCIgKyByb3RhdGlvbiArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIGlmIChyb3RhdGlvblkgIT09IF96ZXJvRGVnKSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInJvdGF0ZVkoXCIgKyByb3RhdGlvblkgKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAocm90YXRpb25YICE9PSBfemVyb0RlZykge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJyb3RhdGVYKFwiICsgcm90YXRpb25YICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHNrZXdYICE9PSBfemVyb0RlZyB8fCBza2V3WSAhPT0gX3plcm9EZWcpIHtcbiAgICB0cmFuc2Zvcm1zICs9IFwic2tldyhcIiArIHNrZXdYICsgXCIsIFwiICsgc2tld1kgKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAoc2NhbGVYICE9PSAxIHx8IHNjYWxlWSAhPT0gMSkge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJzY2FsZShcIiArIHNjYWxlWCArIFwiLCBcIiArIHNjYWxlWSArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIHRhcmdldC5zdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2Zvcm1zIHx8IFwidHJhbnNsYXRlKDAsIDApXCI7XG59LFxuICAgIF9yZW5kZXJTVkdUcmFuc2Zvcm1zID0gZnVuY3Rpb24gX3JlbmRlclNWR1RyYW5zZm9ybXMocmF0aW8sIGNhY2hlKSB7XG4gIHZhciBfcmVmMiA9IGNhY2hlIHx8IHRoaXMsXG4gICAgICB4UGVyY2VudCA9IF9yZWYyLnhQZXJjZW50LFxuICAgICAgeVBlcmNlbnQgPSBfcmVmMi55UGVyY2VudCxcbiAgICAgIHggPSBfcmVmMi54LFxuICAgICAgeSA9IF9yZWYyLnksXG4gICAgICByb3RhdGlvbiA9IF9yZWYyLnJvdGF0aW9uLFxuICAgICAgc2tld1ggPSBfcmVmMi5za2V3WCxcbiAgICAgIHNrZXdZID0gX3JlZjIuc2tld1ksXG4gICAgICBzY2FsZVggPSBfcmVmMi5zY2FsZVgsXG4gICAgICBzY2FsZVkgPSBfcmVmMi5zY2FsZVksXG4gICAgICB0YXJnZXQgPSBfcmVmMi50YXJnZXQsXG4gICAgICB4T3JpZ2luID0gX3JlZjIueE9yaWdpbixcbiAgICAgIHlPcmlnaW4gPSBfcmVmMi55T3JpZ2luLFxuICAgICAgeE9mZnNldCA9IF9yZWYyLnhPZmZzZXQsXG4gICAgICB5T2Zmc2V0ID0gX3JlZjIueU9mZnNldCxcbiAgICAgIGZvcmNlQ1NTID0gX3JlZjIuZm9yY2VDU1MsXG4gICAgICB0eCA9IHBhcnNlRmxvYXQoeCksXG4gICAgICB0eSA9IHBhcnNlRmxvYXQoeSksXG4gICAgICBhMTEsXG4gICAgICBhMjEsXG4gICAgICBhMTIsXG4gICAgICBhMjIsXG4gICAgICB0ZW1wO1xuXG4gIHJvdGF0aW9uID0gcGFyc2VGbG9hdChyb3RhdGlvbik7XG4gIHNrZXdYID0gcGFyc2VGbG9hdChza2V3WCk7XG4gIHNrZXdZID0gcGFyc2VGbG9hdChza2V3WSk7XG5cbiAgaWYgKHNrZXdZKSB7XG4gICAgLy9mb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgd2UgY29tYmluZSBhbGwgc2tld2luZyBpbnRvIHRoZSBza2V3WCBhbmQgcm90YXRpb24gdmFsdWVzLiBSZW1lbWJlciwgYSBza2V3WSBvZiAxMCBkZWdyZWVzIGxvb2tzIHRoZSBzYW1lIGFzIGEgcm90YXRpb24gb2YgMTAgZGVncmVlcyBwbHVzIGEgc2tld1ggb2YgMTAgZGVncmVlcy5cbiAgICBza2V3WSA9IHBhcnNlRmxvYXQoc2tld1kpO1xuICAgIHNrZXdYICs9IHNrZXdZO1xuICAgIHJvdGF0aW9uICs9IHNrZXdZO1xuICB9XG5cbiAgaWYgKHJvdGF0aW9uIHx8IHNrZXdYKSB7XG4gICAgcm90YXRpb24gKj0gX0RFRzJSQUQ7XG4gICAgc2tld1ggKj0gX0RFRzJSQUQ7XG4gICAgYTExID0gTWF0aC5jb3Mocm90YXRpb24pICogc2NhbGVYO1xuICAgIGEyMSA9IE1hdGguc2luKHJvdGF0aW9uKSAqIHNjYWxlWDtcbiAgICBhMTIgPSBNYXRoLnNpbihyb3RhdGlvbiAtIHNrZXdYKSAqIC1zY2FsZVk7XG4gICAgYTIyID0gTWF0aC5jb3Mocm90YXRpb24gLSBza2V3WCkgKiBzY2FsZVk7XG5cbiAgICBpZiAoc2tld1gpIHtcbiAgICAgIHNrZXdZICo9IF9ERUcyUkFEO1xuICAgICAgdGVtcCA9IE1hdGgudGFuKHNrZXdYIC0gc2tld1kpO1xuICAgICAgdGVtcCA9IE1hdGguc3FydCgxICsgdGVtcCAqIHRlbXApO1xuICAgICAgYTEyICo9IHRlbXA7XG4gICAgICBhMjIgKj0gdGVtcDtcblxuICAgICAgaWYgKHNrZXdZKSB7XG4gICAgICAgIHRlbXAgPSBNYXRoLnRhbihza2V3WSk7XG4gICAgICAgIHRlbXAgPSBNYXRoLnNxcnQoMSArIHRlbXAgKiB0ZW1wKTtcbiAgICAgICAgYTExICo9IHRlbXA7XG4gICAgICAgIGEyMSAqPSB0ZW1wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGExMSA9IF9yb3VuZChhMTEpO1xuICAgIGEyMSA9IF9yb3VuZChhMjEpO1xuICAgIGExMiA9IF9yb3VuZChhMTIpO1xuICAgIGEyMiA9IF9yb3VuZChhMjIpO1xuICB9IGVsc2Uge1xuICAgIGExMSA9IHNjYWxlWDtcbiAgICBhMjIgPSBzY2FsZVk7XG4gICAgYTIxID0gYTEyID0gMDtcbiAgfVxuXG4gIGlmICh0eCAmJiAhfih4ICsgXCJcIikuaW5kZXhPZihcInB4XCIpIHx8IHR5ICYmICF+KHkgKyBcIlwiKS5pbmRleE9mKFwicHhcIikpIHtcbiAgICB0eCA9IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgXCJ4XCIsIHgsIFwicHhcIik7XG4gICAgdHkgPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIFwieVwiLCB5LCBcInB4XCIpO1xuICB9XG5cbiAgaWYgKHhPcmlnaW4gfHwgeU9yaWdpbiB8fCB4T2Zmc2V0IHx8IHlPZmZzZXQpIHtcbiAgICB0eCA9IF9yb3VuZCh0eCArIHhPcmlnaW4gLSAoeE9yaWdpbiAqIGExMSArIHlPcmlnaW4gKiBhMTIpICsgeE9mZnNldCk7XG4gICAgdHkgPSBfcm91bmQodHkgKyB5T3JpZ2luIC0gKHhPcmlnaW4gKiBhMjEgKyB5T3JpZ2luICogYTIyKSArIHlPZmZzZXQpO1xuICB9XG5cbiAgaWYgKHhQZXJjZW50IHx8IHlQZXJjZW50KSB7XG4gICAgLy9UaGUgU1ZHIHNwZWMgZG9lc24ndCBzdXBwb3J0IHBlcmNlbnRhZ2UtYmFzZWQgdHJhbnNsYXRpb24gaW4gdGhlIFwidHJhbnNmb3JtXCIgYXR0cmlidXRlLCBzbyB3ZSBtZXJnZSBpdCBpbnRvIHRoZSB0cmFuc2xhdGlvbiB0byBzaW11bGF0ZSBpdC5cbiAgICB0ZW1wID0gdGFyZ2V0LmdldEJCb3goKTtcbiAgICB0eCA9IF9yb3VuZCh0eCArIHhQZXJjZW50IC8gMTAwICogdGVtcC53aWR0aCk7XG4gICAgdHkgPSBfcm91bmQodHkgKyB5UGVyY2VudCAvIDEwMCAqIHRlbXAuaGVpZ2h0KTtcbiAgfVxuXG4gIHRlbXAgPSBcIm1hdHJpeChcIiArIGExMSArIFwiLFwiICsgYTIxICsgXCIsXCIgKyBhMTIgKyBcIixcIiArIGEyMiArIFwiLFwiICsgdHggKyBcIixcIiArIHR5ICsgXCIpXCI7XG4gIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdGVtcCk7XG5cbiAgaWYgKGZvcmNlQ1NTKSB7XG4gICAgLy9zb21lIGJyb3dzZXJzIHByaW9yaXRpemUgQ1NTIHRyYW5zZm9ybXMgb3ZlciB0aGUgdHJhbnNmb3JtIGF0dHJpYnV0ZS4gV2hlbiB3ZSBzZW5zZSB0aGF0IHRoZSB1c2VyIGhhcyBDU1MgdHJhbnNmb3JtcyBhcHBsaWVkLCB3ZSBtdXN0IG92ZXJ3cml0ZSB0aGVtIHRoaXMgd2F5IChvdGhlcndpc2Ugc29tZSBicm93c2VyIHNpbXBseSB3b24ndCByZW5kZXIgdGhlICB0cmFuc2Zvcm0gYXR0cmlidXRlIGNoYW5nZXMhKVxuICAgIHRhcmdldC5zdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSB0ZW1wO1xuICB9XG59LFxuICAgIF9hZGRSb3RhdGlvbmFsUHJvcFR3ZWVuID0gZnVuY3Rpb24gX2FkZFJvdGF0aW9uYWxQcm9wVHdlZW4ocGx1Z2luLCB0YXJnZXQsIHByb3BlcnR5LCBzdGFydE51bSwgZW5kVmFsdWUsIHJlbGF0aXZlKSB7XG4gIHZhciBjYXAgPSAzNjAsXG4gICAgICBpc1N0cmluZyA9IF9pc1N0cmluZyhlbmRWYWx1ZSksXG4gICAgICBlbmROdW0gPSBwYXJzZUZsb2F0KGVuZFZhbHVlKSAqIChpc1N0cmluZyAmJiB+ZW5kVmFsdWUuaW5kZXhPZihcInJhZFwiKSA/IF9SQUQyREVHIDogMSksXG4gICAgICBjaGFuZ2UgPSByZWxhdGl2ZSA/IGVuZE51bSAqIHJlbGF0aXZlIDogZW5kTnVtIC0gc3RhcnROdW0sXG4gICAgICBmaW5hbFZhbHVlID0gc3RhcnROdW0gKyBjaGFuZ2UgKyBcImRlZ1wiLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgcHQ7XG5cbiAgaWYgKGlzU3RyaW5nKSB7XG4gICAgZGlyZWN0aW9uID0gZW5kVmFsdWUuc3BsaXQoXCJfXCIpWzFdO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJzaG9ydFwiKSB7XG4gICAgICBjaGFuZ2UgJT0gY2FwO1xuXG4gICAgICBpZiAoY2hhbmdlICE9PSBjaGFuZ2UgJSAoY2FwIC8gMikpIHtcbiAgICAgICAgY2hhbmdlICs9IGNoYW5nZSA8IDAgPyBjYXAgOiAtY2FwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiY3dcIiAmJiBjaGFuZ2UgPCAwKSB7XG4gICAgICBjaGFuZ2UgPSAoY2hhbmdlICsgY2FwICogX2JpZ051bSkgJSBjYXAgLSB+fihjaGFuZ2UgLyBjYXApICogY2FwO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNjd1wiICYmIGNoYW5nZSA+IDApIHtcbiAgICAgIGNoYW5nZSA9IChjaGFuZ2UgLSBjYXAgKiBfYmlnTnVtKSAlIGNhcCAtIH5+KGNoYW5nZSAvIGNhcCkgKiBjYXA7XG4gICAgfVxuICB9XG5cbiAgcGx1Z2luLl9wdCA9IHB0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIHByb3BlcnR5LCBzdGFydE51bSwgY2hhbmdlLCBfcmVuZGVyUHJvcFdpdGhFbmQpO1xuICBwdC5lID0gZmluYWxWYWx1ZTtcbiAgcHQudSA9IFwiZGVnXCI7XG5cbiAgcGx1Z2luLl9wcm9wcy5wdXNoKHByb3BlcnR5KTtcblxuICByZXR1cm4gcHQ7XG59LFxuICAgIF9hZGRSYXdUcmFuc2Zvcm1QVHMgPSBmdW5jdGlvbiBfYWRkUmF3VHJhbnNmb3JtUFRzKHBsdWdpbiwgdHJhbnNmb3JtcywgdGFyZ2V0KSB7XG4gIC8vZm9yIGhhbmRsaW5nIGNhc2VzIHdoZXJlIHNvbWVvbmUgcGFzc2VzIGluIGEgd2hvbGUgdHJhbnNmb3JtIHN0cmluZywgbGlrZSB0cmFuc2Zvcm06IFwic2NhbGUoMiwgMykgcm90YXRlKDIwZGVnKSB0cmFuc2xhdGVZKDMwZW0pXCJcbiAgdmFyIHN0eWxlID0gX3RlbXBEaXZTdHlsZXIuc3R5bGUsXG4gICAgICBzdGFydENhY2hlID0gdGFyZ2V0Ll9nc2FwLFxuICAgICAgZXhjbHVkZSA9IFwicGVyc3BlY3RpdmUsZm9yY2UzRCx0cmFuc2Zvcm1PcmlnaW4sc3ZnT3JpZ2luXCIsXG4gICAgICBlbmRDYWNoZSxcbiAgICAgIHAsXG4gICAgICBzdGFydFZhbHVlLFxuICAgICAgZW5kVmFsdWUsXG4gICAgICBzdGFydE51bSxcbiAgICAgIGVuZE51bSxcbiAgICAgIHN0YXJ0VW5pdCxcbiAgICAgIGVuZFVuaXQ7XG4gIHN0eWxlLmNzc1RleHQgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuY3NzVGV4dCArIFwiO3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7XCI7IC8vJS1iYXNlZCB0cmFuc2xhdGlvbnMgd2lsbCBmYWlsIHVubGVzcyB3ZSBzZXQgdGhlIHdpZHRoL2hlaWdodCB0byBtYXRjaCB0aGUgb3JpZ2luYWwgdGFyZ2V0IChhbmQgcGFkZGluZy9ib3JkZXJzIGNhbiBhZmZlY3QgaXQpXG5cbiAgc3R5bGVbX3RyYW5zZm9ybVByb3BdID0gdHJhbnNmb3JtcztcblxuICBfZG9jLmJvZHkuYXBwZW5kQ2hpbGQoX3RlbXBEaXZTdHlsZXIpO1xuXG4gIGVuZENhY2hlID0gX3BhcnNlVHJhbnNmb3JtKF90ZW1wRGl2U3R5bGVyLCAxKTtcblxuICBmb3IgKHAgaW4gX3RyYW5zZm9ybVByb3BzKSB7XG4gICAgc3RhcnRWYWx1ZSA9IHN0YXJ0Q2FjaGVbcF07XG4gICAgZW5kVmFsdWUgPSBlbmRDYWNoZVtwXTtcblxuICAgIGlmIChzdGFydFZhbHVlICE9PSBlbmRWYWx1ZSAmJiBleGNsdWRlLmluZGV4T2YocCkgPCAwKSB7XG4gICAgICAvL3R3ZWVuaW5nIHRvIG5vIHBlcnNwZWN0aXZlIGdpdmVzIHZlcnkgdW5pbnR1aXRpdmUgcmVzdWx0cyAtIGp1c3Qga2VlcCB0aGUgc2FtZSBwZXJzcGVjdGl2ZSBpbiB0aGF0IGNhc2UuXG4gICAgICBzdGFydFVuaXQgPSBnZXRVbml0KHN0YXJ0VmFsdWUpO1xuICAgICAgZW5kVW5pdCA9IGdldFVuaXQoZW5kVmFsdWUpO1xuICAgICAgc3RhcnROdW0gPSBzdGFydFVuaXQgIT09IGVuZFVuaXQgPyBfY29udmVydFRvVW5pdCh0YXJnZXQsIHAsIHN0YXJ0VmFsdWUsIGVuZFVuaXQpIDogcGFyc2VGbG9hdChzdGFydFZhbHVlKTtcbiAgICAgIGVuZE51bSA9IHBhcnNlRmxvYXQoZW5kVmFsdWUpO1xuICAgICAgcGx1Z2luLl9wdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgc3RhcnRDYWNoZSwgcCwgc3RhcnROdW0sIGVuZE51bSAtIHN0YXJ0TnVtLCBfcmVuZGVyQ1NTUHJvcCk7XG4gICAgICBwbHVnaW4uX3B0LnUgPSBlbmRVbml0IHx8IDA7XG5cbiAgICAgIHBsdWdpbi5fcHJvcHMucHVzaChwKTtcbiAgICB9XG4gIH1cblxuICBfZG9jLmJvZHkucmVtb3ZlQ2hpbGQoX3RlbXBEaXZTdHlsZXIpO1xufTsgLy8gaGFuZGxlIHNwbGl0dGluZyBhcGFydCBwYWRkaW5nLCBtYXJnaW4sIGJvcmRlcldpZHRoLCBhbmQgYm9yZGVyUmFkaXVzIGludG8gdGhlaXIgNCBjb21wb25lbnRzLiBGaXJlZm94LCBmb3IgZXhhbXBsZSwgd29uJ3QgcmVwb3J0IGJvcmRlclJhZGl1cyBjb3JyZWN0bHkgLSBpdCB3aWxsIG9ubHkgZG8gYm9yZGVyVG9wTGVmdFJhZGl1cyBhbmQgdGhlIG90aGVyIGNvcm5lcnMuIFdlIGFsc28gd2FudCB0byBoYW5kbGUgcGFkZGluZ1RvcCwgbWFyZ2luTGVmdCwgYm9yZGVyUmlnaHRXaWR0aCwgZXRjLlxuXG5cbl9mb3JFYWNoTmFtZShcInBhZGRpbmcsbWFyZ2luLFdpZHRoLFJhZGl1c1wiLCBmdW5jdGlvbiAobmFtZSwgaW5kZXgpIHtcbiAgdmFyIHQgPSBcIlRvcFwiLFxuICAgICAgciA9IFwiUmlnaHRcIixcbiAgICAgIGIgPSBcIkJvdHRvbVwiLFxuICAgICAgbCA9IFwiTGVmdFwiLFxuICAgICAgcHJvcHMgPSAoaW5kZXggPCAzID8gW3QsIHIsIGIsIGxdIDogW3QgKyBsLCB0ICsgciwgYiArIHIsIGIgKyBsXSkubWFwKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgcmV0dXJuIGluZGV4IDwgMiA/IG5hbWUgKyBzaWRlIDogXCJib3JkZXJcIiArIHNpZGUgKyBuYW1lO1xuICB9KTtcblxuICBfc3BlY2lhbFByb3BzW2luZGV4ID4gMSA/IFwiYm9yZGVyXCIgKyBuYW1lIDogbmFtZV0gPSBmdW5jdGlvbiAocGx1Z2luLCB0YXJnZXQsIHByb3BlcnR5LCBlbmRWYWx1ZSwgdHdlZW4pIHtcbiAgICB2YXIgYSwgdmFycztcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgNCkge1xuICAgICAgLy8gZ2V0dGVyLCBwYXNzZWQgdGFyZ2V0LCBwcm9wZXJ0eSwgYW5kIHVuaXQgKGZyb20gX2dldCgpKVxuICAgICAgYSA9IHByb3BzLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICByZXR1cm4gX2dldChwbHVnaW4sIHByb3AsIHByb3BlcnR5KTtcbiAgICAgIH0pO1xuICAgICAgdmFycyA9IGEuam9pbihcIiBcIik7XG4gICAgICByZXR1cm4gdmFycy5zcGxpdChhWzBdKS5sZW5ndGggPT09IDUgPyBhWzBdIDogdmFycztcbiAgICB9XG5cbiAgICBhID0gKGVuZFZhbHVlICsgXCJcIikuc3BsaXQoXCIgXCIpO1xuICAgIHZhcnMgPSB7fTtcbiAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wLCBpKSB7XG4gICAgICByZXR1cm4gdmFyc1twcm9wXSA9IGFbaV0gPSBhW2ldIHx8IGFbKGkgLSAxKSAvIDIgfCAwXTtcbiAgICB9KTtcbiAgICBwbHVnaW4uaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuKTtcbiAgfTtcbn0pO1xuXG5leHBvcnQgdmFyIENTU1BsdWdpbiA9IHtcbiAgbmFtZTogXCJjc3NcIixcbiAgcmVnaXN0ZXI6IF9pbml0Q29yZSxcbiAgdGFyZ2V0VGVzdDogZnVuY3Rpb24gdGFyZ2V0VGVzdCh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGFyZ2V0LnN0eWxlICYmIHRhcmdldC5ub2RlVHlwZTtcbiAgfSxcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0cykge1xuICAgIHZhciBwcm9wcyA9IHRoaXMuX3Byb3BzLFxuICAgICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgICAgc3RhcnRWYWx1ZSxcbiAgICAgICAgZW5kVmFsdWUsXG4gICAgICAgIGVuZE51bSxcbiAgICAgICAgc3RhcnROdW0sXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHNwZWNpYWxQcm9wLFxuICAgICAgICBwLFxuICAgICAgICBzdGFydFVuaXQsXG4gICAgICAgIGVuZFVuaXQsXG4gICAgICAgIHJlbGF0aXZlLFxuICAgICAgICBpc1RyYW5zZm9ybVJlbGF0ZWQsXG4gICAgICAgIHRyYW5zZm9ybVByb3BUd2VlbixcbiAgICAgICAgY2FjaGUsXG4gICAgICAgIHNtb290aCxcbiAgICAgICAgaGFzUHJpb3JpdHk7XG4gICAgX3BsdWdpbkluaXR0ZWQgfHwgX2luaXRDb3JlKCk7XG5cbiAgICBmb3IgKHAgaW4gdmFycykge1xuICAgICAgaWYgKHAgPT09IFwiYXV0b1JvdW5kXCIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGVuZFZhbHVlID0gdmFyc1twXTtcblxuICAgICAgaWYgKF9wbHVnaW5zW3BdICYmIF9jaGVja1BsdWdpbihwLCB2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykpIHtcbiAgICAgICAgLy9wbHVnaW5zXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB0eXBlID0gdHlwZW9mIGVuZFZhbHVlO1xuICAgICAgc3BlY2lhbFByb3AgPSBfc3BlY2lhbFByb3BzW3BdO1xuXG4gICAgICBpZiAodHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGVuZFZhbHVlID0gZW5kVmFsdWUuY2FsbCh0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cyk7XG4gICAgICAgIHR5cGUgPSB0eXBlb2YgZW5kVmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiICYmIH5lbmRWYWx1ZS5pbmRleE9mKFwicmFuZG9tKFwiKSkge1xuICAgICAgICBlbmRWYWx1ZSA9IF9yZXBsYWNlUmFuZG9tKGVuZFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNwZWNpYWxQcm9wKSB7XG4gICAgICAgIGlmIChzcGVjaWFsUHJvcCh0aGlzLCB0YXJnZXQsIHAsIGVuZFZhbHVlLCB0d2VlbikpIHtcbiAgICAgICAgICBoYXNQcmlvcml0eSA9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocC5zdWJzdHIoMCwgMikgPT09IFwiLS1cIikge1xuICAgICAgICAvL0NTUyB2YXJpYWJsZVxuICAgICAgICB0aGlzLmFkZChzdHlsZSwgXCJzZXRQcm9wZXJ0eVwiLCBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZ2V0UHJvcGVydHlWYWx1ZShwKSArIFwiXCIsIGVuZFZhbHVlICsgXCJcIiwgaW5kZXgsIHRhcmdldHMsIDAsIDAsIHApO1xuICAgICAgfSBlbHNlIGlmICh0eXBlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHN0YXJ0VmFsdWUgPSBfZ2V0KHRhcmdldCwgcCk7XG4gICAgICAgIHN0YXJ0TnVtID0gcGFyc2VGbG9hdChzdGFydFZhbHVlKTtcbiAgICAgICAgcmVsYXRpdmUgPSB0eXBlID09PSBcInN0cmluZ1wiICYmIGVuZFZhbHVlLmNoYXJBdCgxKSA9PT0gXCI9XCIgPyArKGVuZFZhbHVlLmNoYXJBdCgwKSArIFwiMVwiKSA6IDA7XG5cbiAgICAgICAgaWYgKHJlbGF0aXZlKSB7XG4gICAgICAgICAgZW5kVmFsdWUgPSBlbmRWYWx1ZS5zdWJzdHIoMik7XG4gICAgICAgIH1cblxuICAgICAgICBlbmROdW0gPSBwYXJzZUZsb2F0KGVuZFZhbHVlKTtcblxuICAgICAgICBpZiAocCBpbiBfcHJvcGVydHlBbGlhc2VzKSB7XG4gICAgICAgICAgaWYgKHAgPT09IFwiYXV0b0FscGhhXCIpIHtcbiAgICAgICAgICAgIC8vc3BlY2lhbCBjYXNlIHdoZXJlIHdlIGNvbnRyb2wgdGhlIHZpc2liaWxpdHkgYWxvbmcgd2l0aCBvcGFjaXR5LiBXZSBzdGlsbCBhbGxvdyB0aGUgb3BhY2l0eSB2YWx1ZSB0byBwYXNzIHRocm91Z2ggYW5kIGdldCB0d2VlbmVkLlxuICAgICAgICAgICAgaWYgKHN0YXJ0TnVtID09PSAxICYmIF9nZXQodGFyZ2V0LCBcInZpc2liaWxpdHlcIikgPT09IFwiaGlkZGVuXCIgJiYgZW5kTnVtKSB7XG4gICAgICAgICAgICAgIC8vaWYgdmlzaWJpbGl0eSBpcyBpbml0aWFsbHkgc2V0IHRvIFwiaGlkZGVuXCIsIHdlIHNob3VsZCBpbnRlcnByZXQgdGhhdCBhcyBpbnRlbnQgdG8gbWFrZSBvcGFjaXR5IDAgKGEgY29udmVuaWVuY2UpXG4gICAgICAgICAgICAgIHN0YXJ0TnVtID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgc3R5bGUsIFwidmlzaWJpbGl0eVwiLCBzdGFydE51bSA/IFwiaW5oZXJpdFwiIDogXCJoaWRkZW5cIiwgZW5kTnVtID8gXCJpbmhlcml0XCIgOiBcImhpZGRlblwiLCAhZW5kTnVtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocCAhPT0gXCJzY2FsZVwiICYmIHAgIT09IFwidHJhbnNmb3JtXCIpIHtcbiAgICAgICAgICAgIHAgPSBfcHJvcGVydHlBbGlhc2VzW3BdO1xuICAgICAgICAgICAgfnAuaW5kZXhPZihcIixcIikgJiYgKHAgPSBwLnNwbGl0KFwiLFwiKVswXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXNUcmFuc2Zvcm1SZWxhdGVkID0gcCBpbiBfdHJhbnNmb3JtUHJvcHM7IC8vLS0tIFRSQU5TRk9STS1SRUxBVEVEIC0tLVxuXG4gICAgICAgIGlmIChpc1RyYW5zZm9ybVJlbGF0ZWQpIHtcbiAgICAgICAgICBpZiAoIXRyYW5zZm9ybVByb3BUd2Vlbikge1xuICAgICAgICAgICAgY2FjaGUgPSB0YXJnZXQuX2dzYXA7XG4gICAgICAgICAgICBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0gfHwgX3BhcnNlVHJhbnNmb3JtKHRhcmdldCk7IC8vIGlmLCBmb3IgZXhhbXBsZSwgZ3NhcC5zZXQoLi4uIHt0cmFuc2Zvcm06XCJ0cmFuc2xhdGVYKDUwdncpXCJ9KSwgdGhlIF9nZXQoKSBjYWxsIGRvZXNuJ3QgcGFyc2UgdGhlIHRyYW5zZm9ybSwgdGh1cyBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0gd29uJ3QgYmUgc2V0IHlldCBzbyBmb3JjZSB0aGUgcGFyc2luZyBvZiB0aGUgdHJhbnNmb3JtIGhlcmUuXG5cbiAgICAgICAgICAgIHNtb290aCA9IHZhcnMuc21vb3RoT3JpZ2luICE9PSBmYWxzZSAmJiBjYWNoZS5zbW9vdGg7XG4gICAgICAgICAgICB0cmFuc2Zvcm1Qcm9wVHdlZW4gPSB0aGlzLl9wdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHN0eWxlLCBfdHJhbnNmb3JtUHJvcCwgMCwgMSwgY2FjaGUucmVuZGVyVHJhbnNmb3JtLCBjYWNoZSwgMCwgLTEpOyAvL3RoZSBmaXJzdCB0aW1lIHRocm91Z2gsIGNyZWF0ZSB0aGUgcmVuZGVyaW5nIFByb3BUd2VlbiBzbyB0aGF0IGl0IHJ1bnMgTEFTVCAoaW4gdGhlIGxpbmtlZCBsaXN0LCB3ZSBrZWVwIGFkZGluZyB0byB0aGUgYmVnaW5uaW5nKVxuXG4gICAgICAgICAgICB0cmFuc2Zvcm1Qcm9wVHdlZW4uZGVwID0gMTsgLy9mbGFnIGl0IGFzIGRlcGVuZGVudCBzbyB0aGF0IGlmIHRoaW5ncyBnZXQga2lsbGVkL292ZXJ3cml0dGVuIGFuZCB0aGlzIGlzIHRoZSBvbmx5IFByb3BUd2VlbiBsZWZ0LCB3ZSBjYW4gc2FmZWx5IGtpbGwgdGhlIHdob2xlIHR3ZWVuLlxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwID09PSBcInNjYWxlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3B0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgY2FjaGUsIFwic2NhbGVZXCIsIGNhY2hlLnNjYWxlWSwgcmVsYXRpdmUgPyByZWxhdGl2ZSAqIGVuZE51bSA6IGVuZE51bSAtIGNhY2hlLnNjYWxlWSk7XG4gICAgICAgICAgICBwcm9wcy5wdXNoKFwic2NhbGVZXCIsIHApO1xuICAgICAgICAgICAgcCArPSBcIlhcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwidHJhbnNmb3JtT3JpZ2luXCIpIHtcbiAgICAgICAgICAgIGVuZFZhbHVlID0gX2NvbnZlcnRLZXl3b3Jkc1RvUGVyY2VudGFnZXMoZW5kVmFsdWUpOyAvL2luIGNhc2Ugc29tZXRoaW5nIGxpa2UgXCJsZWZ0IHRvcFwiIG9yIFwiYm90dG9tIHJpZ2h0XCIgaXMgcGFzc2VkIGluLiBDb252ZXJ0IHRvIHBlcmNlbnRhZ2VzLlxuXG4gICAgICAgICAgICBpZiAoY2FjaGUuc3ZnKSB7XG4gICAgICAgICAgICAgIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIGVuZFZhbHVlLCAwLCBzbW9vdGgsIDAsIHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZW5kVW5pdCA9IHBhcnNlRmxvYXQoZW5kVmFsdWUuc3BsaXQoXCIgXCIpWzJdKSB8fCAwOyAvL2hhbmRsZSB0aGUgek9yaWdpbiBzZXBhcmF0ZWx5IVxuXG4gICAgICAgICAgICAgIGVuZFVuaXQgIT09IGNhY2hlLnpPcmlnaW4gJiYgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgY2FjaGUsIFwiek9yaWdpblwiLCBjYWNoZS56T3JpZ2luLCBlbmRVbml0KTtcblxuICAgICAgICAgICAgICBfYWRkTm9uVHdlZW5pbmdQVCh0aGlzLCBzdHlsZSwgcCwgX2ZpcnN0VHdvT25seShzdGFydFZhbHVlKSwgX2ZpcnN0VHdvT25seShlbmRWYWx1ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwic3ZnT3JpZ2luXCIpIHtcbiAgICAgICAgICAgIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIGVuZFZhbHVlLCAxLCBzbW9vdGgsIDAsIHRoaXMpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgaW4gX3JvdGF0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBfYWRkUm90YXRpb25hbFByb3BUd2Vlbih0aGlzLCBjYWNoZSwgcCwgc3RhcnROdW0sIGVuZFZhbHVlLCByZWxhdGl2ZSk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJzbW9vdGhPcmlnaW5cIikge1xuICAgICAgICAgICAgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgY2FjaGUsIFwic21vb3RoXCIsIGNhY2hlLnNtb290aCwgZW5kVmFsdWUpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwiZm9yY2UzRFwiKSB7XG4gICAgICAgICAgICBjYWNoZVtwXSA9IGVuZFZhbHVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgICAgICAgICBfYWRkUmF3VHJhbnNmb3JtUFRzKHRoaXMsIGVuZFZhbHVlLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIShwIGluIHN0eWxlKSkge1xuICAgICAgICAgIHAgPSBfY2hlY2tQcm9wUHJlZml4KHApIHx8IHA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNUcmFuc2Zvcm1SZWxhdGVkIHx8IChlbmROdW0gfHwgZW5kTnVtID09PSAwKSAmJiAoc3RhcnROdW0gfHwgc3RhcnROdW0gPT09IDApICYmICFfY29tcGxleEV4cC50ZXN0KGVuZFZhbHVlKSAmJiBwIGluIHN0eWxlKSB7XG4gICAgICAgICAgc3RhcnRVbml0ID0gKHN0YXJ0VmFsdWUgKyBcIlwiKS5zdWJzdHIoKHN0YXJ0TnVtICsgXCJcIikubGVuZ3RoKTtcbiAgICAgICAgICBlbmROdW0gfHwgKGVuZE51bSA9IDApOyAvLyBwcm90ZWN0IGFnYWluc3QgTmFOXG5cbiAgICAgICAgICBlbmRVbml0ID0gKGVuZFZhbHVlICsgXCJcIikuc3Vic3RyKChlbmROdW0gKyBcIlwiKS5sZW5ndGgpIHx8IChwIGluIF9jb25maWcudW5pdHMgPyBfY29uZmlnLnVuaXRzW3BdIDogc3RhcnRVbml0KTtcblxuICAgICAgICAgIGlmIChzdGFydFVuaXQgIT09IGVuZFVuaXQpIHtcbiAgICAgICAgICAgIHN0YXJ0TnVtID0gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBwLCBzdGFydFZhbHVlLCBlbmRVbml0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9wdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIGlzVHJhbnNmb3JtUmVsYXRlZCA/IGNhY2hlIDogc3R5bGUsIHAsIHN0YXJ0TnVtLCByZWxhdGl2ZSA/IHJlbGF0aXZlICogZW5kTnVtIDogZW5kTnVtIC0gc3RhcnROdW0sIGVuZFVuaXQgPT09IFwicHhcIiAmJiB2YXJzLmF1dG9Sb3VuZCAhPT0gZmFsc2UgJiYgIWlzVHJhbnNmb3JtUmVsYXRlZCA/IF9yZW5kZXJSb3VuZGVkQ1NTUHJvcCA6IF9yZW5kZXJDU1NQcm9wKTtcbiAgICAgICAgICB0aGlzLl9wdC51ID0gZW5kVW5pdCB8fCAwO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0VW5pdCAhPT0gZW5kVW5pdCkge1xuICAgICAgICAgICAgLy93aGVuIHRoZSB0d2VlbiBnb2VzIGFsbCB0aGUgd2F5IGJhY2sgdG8gdGhlIGJlZ2lubmluZywgd2UgbmVlZCB0byByZXZlcnQgaXQgdG8gdGhlIE9MRC9PUklHSU5BTCB2YWx1ZSAod2l0aCB0aG9zZSB1bml0cykuIFdlIHJlY29yZCB0aGF0IGFzIGEgXCJiXCIgKGJlZ2lubmluZykgcHJvcGVydHkgYW5kIHBvaW50IHRvIGEgcmVuZGVyIG1ldGhvZCB0aGF0IGhhbmRsZXMgdGhhdC4gKHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbilcbiAgICAgICAgICAgIHRoaXMuX3B0LmIgPSBzdGFydFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcHQuciA9IF9yZW5kZXJDU1NQcm9wV2l0aEJlZ2lubmluZztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIShwIGluIHN0eWxlKSkge1xuICAgICAgICAgIGlmIChwIGluIHRhcmdldCkge1xuICAgICAgICAgICAgLy9tYXliZSBpdCdzIG5vdCBhIHN0eWxlIC0gaXQgY291bGQgYmUgYSBwcm9wZXJ0eSBhZGRlZCBkaXJlY3RseSB0byBhbiBlbGVtZW50IGluIHdoaWNoIGNhc2Ugd2UnbGwgdHJ5IHRvIGFuaW1hdGUgdGhhdC5cbiAgICAgICAgICAgIHRoaXMuYWRkKHRhcmdldCwgcCwgdGFyZ2V0W3BdLCBlbmRWYWx1ZSwgaW5kZXgsIHRhcmdldHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfbWlzc2luZ1BsdWdpbihwLCBlbmRWYWx1ZSk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdHdlZW5Db21wbGV4Q1NTU3RyaW5nLmNhbGwodGhpcywgdGFyZ2V0LCBwLCBzdGFydFZhbHVlLCBlbmRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wcy5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhc1ByaW9yaXR5ICYmIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHkodGhpcyk7XG4gIH0sXG4gIGdldDogX2dldCxcbiAgYWxpYXNlczogX3Byb3BlcnR5QWxpYXNlcyxcbiAgZ2V0U2V0dGVyOiBmdW5jdGlvbiBnZXRTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSwgcGx1Z2luKSB7XG4gICAgLy9yZXR1cm5zIGEgc2V0dGVyIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyB0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSBhbmQgYXBwbGllcyBpdCBhY2NvcmRpbmdseS4gUmVtZW1iZXIsIHByb3BlcnRpZXMgbGlrZSBcInhcIiBhcmVuJ3QgYXMgc2ltcGxlIGFzIHRhcmdldC5zdHlsZS5wcm9wZXJ0eSA9IHZhbHVlIGJlY2F1c2UgdGhleSd2ZSBnb3QgdG8gYmUgYXBwbGllZCB0byBhIHByb3h5IG9iamVjdCBhbmQgdGhlbiBtZXJnZWQgaW50byBhIHRyYW5zZm9ybSBzdHJpbmcgaW4gYSByZW5kZXJlci5cbiAgICB2YXIgcCA9IF9wcm9wZXJ0eUFsaWFzZXNbcHJvcGVydHldO1xuICAgIHAgJiYgcC5pbmRleE9mKFwiLFwiKSA8IDAgJiYgKHByb3BlcnR5ID0gcCk7XG4gICAgcmV0dXJuIHByb3BlcnR5IGluIF90cmFuc2Zvcm1Qcm9wcyAmJiBwcm9wZXJ0eSAhPT0gX3RyYW5zZm9ybU9yaWdpblByb3AgJiYgKHRhcmdldC5fZ3NhcC54IHx8IF9nZXQodGFyZ2V0LCBcInhcIikpID8gcGx1Z2luICYmIF9yZWNlbnRTZXR0ZXJQbHVnaW4gPT09IHBsdWdpbiA/IHByb3BlcnR5ID09PSBcInNjYWxlXCIgPyBfc2V0dGVyU2NhbGUgOiBfc2V0dGVyVHJhbnNmb3JtIDogKF9yZWNlbnRTZXR0ZXJQbHVnaW4gPSBwbHVnaW4gfHwge30pICYmIChwcm9wZXJ0eSA9PT0gXCJzY2FsZVwiID8gX3NldHRlclNjYWxlV2l0aFJlbmRlciA6IF9zZXR0ZXJUcmFuc2Zvcm1XaXRoUmVuZGVyKSA6IHRhcmdldC5zdHlsZSAmJiAhX2lzVW5kZWZpbmVkKHRhcmdldC5zdHlsZVtwcm9wZXJ0eV0pID8gX3NldHRlckNTU1N0eWxlIDogfnByb3BlcnR5LmluZGV4T2YoXCItXCIpID8gX3NldHRlckNTU1Byb3AgOiBfZ2V0U2V0dGVyKHRhcmdldCwgcHJvcGVydHkpO1xuICB9LFxuICBjb3JlOiB7XG4gICAgX3JlbW92ZVByb3BlcnR5OiBfcmVtb3ZlUHJvcGVydHksXG4gICAgX2dldE1hdHJpeDogX2dldE1hdHJpeFxuICB9XG59O1xuZ3NhcC51dGlscy5jaGVja1ByZWZpeCA9IF9jaGVja1Byb3BQcmVmaXg7XG5cbihmdW5jdGlvbiAocG9zaXRpb25BbmRTY2FsZSwgcm90YXRpb24sIG90aGVycywgYWxpYXNlcykge1xuICB2YXIgYWxsID0gX2ZvckVhY2hOYW1lKHBvc2l0aW9uQW5kU2NhbGUgKyBcIixcIiArIHJvdGF0aW9uICsgXCIsXCIgKyBvdGhlcnMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgX3RyYW5zZm9ybVByb3BzW25hbWVdID0gMTtcbiAgfSk7XG5cbiAgX2ZvckVhY2hOYW1lKHJvdGF0aW9uLCBmdW5jdGlvbiAobmFtZSkge1xuICAgIF9jb25maWcudW5pdHNbbmFtZV0gPSBcImRlZ1wiO1xuICAgIF9yb3RhdGlvbmFsUHJvcGVydGllc1tuYW1lXSA9IDE7XG4gIH0pO1xuXG4gIF9wcm9wZXJ0eUFsaWFzZXNbYWxsWzEzXV0gPSBwb3NpdGlvbkFuZFNjYWxlICsgXCIsXCIgKyByb3RhdGlvbjtcblxuICBfZm9yRWFjaE5hbWUoYWxpYXNlcywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgc3BsaXQgPSBuYW1lLnNwbGl0KFwiOlwiKTtcbiAgICBfcHJvcGVydHlBbGlhc2VzW3NwbGl0WzFdXSA9IGFsbFtzcGxpdFswXV07XG4gIH0pO1xufSkoXCJ4LHkseixzY2FsZSxzY2FsZVgsc2NhbGVZLHhQZXJjZW50LHlQZXJjZW50XCIsIFwicm90YXRpb24scm90YXRpb25YLHJvdGF0aW9uWSxza2V3WCxza2V3WVwiLCBcInRyYW5zZm9ybSx0cmFuc2Zvcm1PcmlnaW4sc3ZnT3JpZ2luLGZvcmNlM0Qsc21vb3RoT3JpZ2luLHRyYW5zZm9ybVBlcnNwZWN0aXZlXCIsIFwiMDp0cmFuc2xhdGVYLDE6dHJhbnNsYXRlWSwyOnRyYW5zbGF0ZVosODpyb3RhdGUsODpyb3RhdGlvblosODpyb3RhdGVaLDk6cm90YXRlWCwxMDpyb3RhdGVZXCIpO1xuXG5fZm9yRWFjaE5hbWUoXCJ4LHkseix0b3AscmlnaHQsYm90dG9tLGxlZnQsd2lkdGgsaGVpZ2h0LGZvbnRTaXplLHBhZGRpbmcsbWFyZ2luLHBlcnNwZWN0aXZlXCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIF9jb25maWcudW5pdHNbbmFtZV0gPSBcInB4XCI7XG59KTtcblxuZ3NhcC5yZWdpc3RlclBsdWdpbihDU1NQbHVnaW4pO1xuZXhwb3J0IHsgQ1NTUGx1Z2luIGFzIGRlZmF1bHQsIF9nZXRCQm94LCBfY3JlYXRlRWxlbWVudCwgX2NoZWNrUHJvcFByZWZpeCBhcyBjaGVja1ByZWZpeCB9OyIsImltcG9ydCB7IGdzYXAsIFBvd2VyMCwgUG93ZXIxLCBQb3dlcjIsIFBvd2VyMywgUG93ZXI0LCBMaW5lYXIsIFF1YWQsIEN1YmljLCBRdWFydCwgUXVpbnQsIFN0cm9uZywgRWxhc3RpYywgQmFjaywgU3RlcHBlZEVhc2UsIEJvdW5jZSwgU2luZSwgRXhwbywgQ2lyYywgVHdlZW5MaXRlLCBUaW1lbGluZUxpdGUsIFRpbWVsaW5lTWF4IH0gZnJvbSBcIi4vZ3NhcC1jb3JlLmpzXCI7XG5pbXBvcnQgeyBDU1NQbHVnaW4gfSBmcm9tIFwiLi9DU1NQbHVnaW4uanNcIjtcbnZhciBnc2FwV2l0aENTUyA9IGdzYXAucmVnaXN0ZXJQbHVnaW4oQ1NTUGx1Z2luKSB8fCBnc2FwLFxuICAgIC8vIHRvIHByb3RlY3QgZnJvbSB0cmVlIHNoYWtpbmdcblR3ZWVuTWF4V2l0aENTUyA9IGdzYXBXaXRoQ1NTLmNvcmUuVHdlZW47XG5leHBvcnQgeyBnc2FwV2l0aENTUyBhcyBnc2FwLCBnc2FwV2l0aENTUyBhcyBkZWZhdWx0LCBDU1NQbHVnaW4sIFR3ZWVuTWF4V2l0aENTUyBhcyBUd2Vlbk1heCwgVHdlZW5MaXRlLCBUaW1lbGluZU1heCwgVGltZWxpbmVMaXRlLCBQb3dlcjAsIFBvd2VyMSwgUG93ZXIyLCBQb3dlcjMsIFBvd2VyNCwgTGluZWFyLCBRdWFkLCBDdWJpYywgUXVhcnQsIFF1aW50LCBTdHJvbmcsIEVsYXN0aWMsIEJhY2ssIFN0ZXBwZWRFYXNlLCBCb3VuY2UsIFNpbmUsIEV4cG8sIENpcmMgfTsiLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIi4vbXZjL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vbXZjL21vZGVsXCI7XG5pbXBvcnQgeyBNdmMgfSBmcm9tIFwiLi9tdmMvbXZjXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vbXZjL3ZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZWdpc3Rlck1vZGVscygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyQ29udHJvbGxlcnMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclNjZW5lcygpO1xuXHR9XG5cbiAgICBnZXQgbXZjKCk6IE12YyB7XG5cdFx0cmV0dXJuIE12Yy5nZXRJbnN0YW5jZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZWdpc3Rlck1vZGVscygpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVnaXN0ZXJDb250cm9sbGVycygpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVnaXN0ZXJTY2VuZXMoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZE1vZGVsKG1vZGVsTmFtZTogc3RyaW5nLCBtb2RlbENsYXNzOiB0eXBlb2YgTW9kZWwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tdmMucmVnaXN0ZXJNb2RlbChtb2RlbE5hbWUsIG1vZGVsQ2xhc3MpO1xuICAgIH0gICBcblxuICAgIHB1YmxpYyBhZGRDb250cm9sbGVyKG5vdGlmaWNhdGlvbk5hbWU6IHN0cmluZywgY29udHJvbGxlckNsYXNzOiB0eXBlb2YgQ29udHJvbGxlciwgdmlld0NsYXNzPzogdHlwZW9mIFZpZXcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tdmMucmVnaXN0ZXJDb250cm9sbGVyKG5vdGlmaWNhdGlvbk5hbWUsIGNvbnRyb2xsZXJDbGFzcywgdmlld0NsYXNzKTtcbiAgICB9ICBcbiAgICBcbiAgICAvKipcbiAgICAgKiBNYXBzIGEgbm90aWZpY2F0aW9uIHRvIGEgc2V0IG9mIGNvbnRyb2xsZXJzIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGR1cmluZyBzY2VuZSB0cmFuc2l0aW9uXG4gICAgICovXG4gICAgcHVibGljIGFkZFNjZW5lKHNjZW5lTm90aWZpY2F0aW9uOiBzdHJpbmcsIGNvbnRyb2xsZXJzTm90aWZpY2F0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tdmMucmVnaXN0ZXJTY2VuZShzY2VuZU5vdGlmaWNhdGlvbiwgY29udHJvbGxlcnNOb3RpZmljYXRpb25zKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgTVZDRW50aXR5IH0gZnJvbSBcIi4vbXZjLWVudGl0eVwiO1xuaW1wb3J0IHsgSU5vdGlmaWNhdGlvbiB9IGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNVkNFbnRpdHkge1xuXG4gICAgcHVibGljIG1vZGVsOiBNb2RlbDtcbiAgICBwdWJsaWMgdmlldzogVmlldztcbiAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uSGFuZGxlcnM6IElOb3RpZmljYXRpb25IYW5kbGVyID0ge307XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkTm90aWZpY2F0aW9ucygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGNvbnRyb2xsZXIsIHZpZXcgYW5kIG1vZGVsIGFyZSBpbml0aWFsaXplZFxuICAgICAqL1xuICAgIHB1YmxpYyBwb3N0UmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIG9uIG5vdGlmaWNhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBleGVjdXRlKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbik6IHZvaWQge1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBBIHBsYWNlIHRvIGFkZCBhbGwgbm90aWZpY2F0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBhZGROb3RpZmljYXRpb25zKCk6IHZvaWQge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgdG8gdGhlIG5vdGlmaWNhdGlvbiBhbmQgc3RvcmVzIHRoZSBoYW5kbGVyIGZ1bmN0aW9uXG4gICAgICovXG4gICAgcHVibGljIGFkZE5vdGlmaWNhdGlvbihuYW1lOiBzdHJpbmcsIG5vdGlmaWNhdGlvbkhhbmRsZXI6IChub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vdGlmaWNhdGlvbkhhbmRsZXJzW25hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbkhhbmRsZXJzW25hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25IYW5kbGVyc1tuYW1lXS5wdXNoKG5vdGlmaWNhdGlvbkhhbmRsZXIpO1xuXHRcdHRoaXMubXZjLmFkZE5vdGlmaWNhdGlvbihuYW1lLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBhbGwgaGFuZGxlcnMgb2YgYSBzcGVjaWZpYyBub3RpZmljYXRpb25cbiAgICAgKi8gICAgXG4gICAgcHVibGljIGhhbmRsZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vdGlmaWNhdGlvbkhhbmRsZXJzW25vdGlmaWNhdGlvbi5uYW1lXSkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25IYW5kbGVyc1tub3RpZmljYXRpb24ubmFtZV0uZm9yRWFjaChoYW5kbGVyID0+IHtcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBub3RpZmljYXRpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbW9kZWwgYnkgbmFtZVxuICAgICAqLyAgICBcbiAgICBwdWJsaWMgcmV0cmlldmVNb2RlbChtb2RlbE5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLm12Yy5yZXRyaWV2ZU1vZGVsKG1vZGVsTmFtZSk7XG4gICAgfSBcbiAgICBcblx0cHVibGljIGxheWVyVHJhbnNpdGlvbkluU3RhcnQoKTogdm9pZCB7XG5cdFx0dGhpcy52aWV3LmxheWVyVHJhbnNpdGlvbkluU3RhcnQoKTtcblx0fVxuXG5cdHB1YmxpYyBsYXllclRyYW5zaXRpb25PdXRTdGFydCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52aWV3LmxheWVyVHJhbnNpdGlvbk91dFN0YXJ0KCk7XG5cdH0gICAgXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvbkhhbmRsZXIge1xuXHRbbmFtZTogc3RyaW5nXTogRnVuY3Rpb25bXTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzVfXzsiLCJleHBvcnQgY2xhc3MgR3JhcGhpY3NFbmdpbmVOb3RpZmljYXRpb25zIHsgIFxuICAgIHB1YmxpYyBzdGF0aWMgU1RBUlRfQVNTRVRTX0xPQURJTkc6IHN0cmluZyA9IFwiU1RBUlRfQVNTRVRTX0xPQURJTkdcIjtcbiAgICBwdWJsaWMgc3RhdGljIEFTU0VUU19MT0FESU5HX09OX1BST0dSRVNTOiBzdHJpbmcgPSBcIkFTU0VUU19MT0FESU5HX09OX1BST0dSRVNTXCI7XG4gICAgcHVibGljIHN0YXRpYyBBU1NFVFNfTE9BRElOR19DT01QTEVURTogc3RyaW5nID0gXCJBU1NFVFNfTE9BRElOR19DT01QTEVURVwiO1xufVxuXG5leHBvcnQgY2xhc3MgR3JhcGhpY3NFbmdpbmVOYW1lcyB7ICBcbiAgICBwdWJsaWMgc3RhdGljIE1PREVMOiBzdHJpbmcgPSBcIkdSQVBISUNfRU5HSU5FX01PREVMXCJcbn0iLCJpbXBvcnQgZ3NhcCBmcm9tIFwiZ3NhcFwiO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi4vYXBwLW1hbmFnZXJcIjtcbmltcG9ydCB7IE1WQ0VudGl0eSB9IGZyb20gXCIuL212Yy1lbnRpdHlcIjtcblxuZXhwb3J0IGNsYXNzIFZpZXcge1xuICAgIHB1YmxpYyBkaXNwbGF5OiBDb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCk7XG5cbiAgICAvKipcblx0ICogQ2FsbGVkIHdoZW4gb2JqZWN0IGlzIGNyZWF0ZWRcblx0ICovXG5cdHB1YmxpYyBvblJlZ2lzdGVyKCk6IHZvaWQge1x0XG5cdFx0dGhpcy5kaXNwbGF5LnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG5cdCAqIENhbGxlZCB3aGVuIHZpZXcgaXMgcmVhZHlcblx0ICovXG5cdHB1YmxpYyBwb3N0UmVnaXN0ZXIoKTogdm9pZCB7XHRcblx0fVxuXG5cdHB1YmxpYyBsYXllclRyYW5zaXRpb25JblN0YXJ0KCk6IHZvaWQge1xuXHRcdHRoaXMuZGlzcGxheS52aXNpYmxlID0gdHJ1ZTtcblx0XHRnc2FwLmZyb21Ubyh0aGlzLmRpc3BsYXksIHsgYWxwaGE6IDAgfSwgeyBkdXJhdGlvbjogMC41LCBhbHBoYTogMSB9KTtcblx0fVxuXG5cdHB1YmxpYyBsYXllclRyYW5zaXRpb25PdXRTdGFydCgpOiB2b2lkIHtcblx0XHRpZiAoIXRoaXMuZGlzcGxheS52aXNpYmxlKSByZXR1cm47XG5cdFx0XG5cdFx0Z3NhcC50byh0aGlzLmRpc3BsYXksIHsgXG5cdFx0XHRkdXJhdGlvbjogMC41LCBcblx0XHRcdGFscGhhOiAwLCBcblx0XHRcdG9uQ29tcGxldGU6ICgpID0+IHsgXG5cdFx0XHRcdHRoaXMuZGlzcGxheS52aXNpYmxlID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VGV4dHVyZShuYW1lOiBzdHJpbmcpOiBQSVhJLlRleHR1cmUge1xuXHRcdHJldHVybiBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGV4dHVyZShuYW1lKTtcblx0fVxufSIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL3ZpZXdcIjtcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvYXBwLW1hbmFnZXJcIjtcbmltcG9ydCB7IENvbnRhaW5lciwgR3JhcGhpY3MsIFNwcml0ZSwgVGV4dCB9IGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vbWlzYy9jb25maWdcIjtcbmltcG9ydCB7IGdzYXAgfSBmcm9tICdnc2FwJztcblxuZXhwb3J0IGNsYXNzIE1lbnVCdXR0b25zVmlldyBleHRlbmRzIFZpZXcge1xuICAgIHByb3RlY3RlZCBiYXI6IFNwcml0ZTtcblxuICAgIHB1YmxpYyBkcmF3U2NlbmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd1RpdGxlKCk7XG4gICAgfVxuIFxuICAgIHByb3RlY3RlZCBkcmF3VGl0bGUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRleHQ6IFRleHQgPSBuZXcgVGV4dCgnQlVUVE9OUycpO1xuICAgICAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGV4dC54ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lV2lkdGgoKSAvIDI7XG4gICAgICAgIHRleHQueSA9IEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2VuZUhlaWdodCgpIC8gMiArIDUwO1xuICAgICAgICB0aGlzLmRpc3BsYXkuYWRkQ2hpbGQodGV4dCk7XG4gICAgfVxufSIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXInO1xuaW1wb3J0IHsgTVZDRW50aXR5IH0gZnJvbSAnLi9tdmMtZW50aXR5JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tICcuLi9hcHAtbWFuYWdlcic7XG5pbXBvcnQgeyBGU00gfSBmcm9tICcuLi9mc20vZnNtJztcbmltcG9ydCB7IEdsb2JhbE5vdGlmaWNhdGlvbnMgfSBmcm9tICcuLi9nbG9iYWwtbm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBNdmMge1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBNdmM7XG4gICAgLy8gSG9sZHMgYWxsIGNvbnRyb2xsZXJzIFxuICAgIHByb3RlY3RlZCBjb250cm9sbGVyczogSUNvbnRyb2xsZXJzSW5kZXggPSB7fTtcbiAgICAvLyBIb2xkcyBhbGwgbm90aWZpY2F0aW9ucyBhbmQgdGhlaXIgc3Vic2NyaWJlcnMgXG4gICAgcHJvdGVjdGVkIG5vdGlmaWNhdGlvbnM6IElOb3RpZmljYXRpb25JbmRleCA9IHt9O1xuICAgIC8vIEhvbGRzIGFsbCBtb2RlbHNcbiAgICBwcm90ZWN0ZWQgbW9kZWxzOiBJTW9kZWxJbmRleCA9IHt9O1xuICAgIC8vIEhvbGRzIGFsbCBzY2VuZXNcbiAgICBwcm90ZWN0ZWQgc2NlbmVzOiBJU2NlbmVFbnRpdHlbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmIChNdmMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIC0gdXNlIE12Yy5nZXRJbnN0YW5jZSgpXCIpO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE12YyB7XG4gICAgICAgIGlmICghTXZjLmluc3RhbmNlKSB7XG4gICAgICAgICAgICBNdmMuaW5zdGFuY2UgPSBuZXcgTXZjKCk7XG4gICAgICAgIH1cblx0XHRyZXR1cm4gTXZjLmluc3RhbmNlO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3RpYmVzIGEgY29udHJvbGxlciB0byBhIG5vdGlmaWNhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBhZGROb3RpZmljYXRpb24obmFtZSwgY29udHJvbGxlcjogQ29udHJvbGxlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubm90aWZpY2F0aW9uc1tuYW1lXSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zW25hbWVdID0gW107XG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnNbbmFtZV0ucHVzaChjb250cm9sbGVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VuZE5vdGlmaWNhdGlvbihuYW1lOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oYW5kbGVTY2VuZVRyYW5zaXRpb25Ob3RpZmljYXRpb24obmFtZSwgYm9keSk7XG4gICAgICAgIHRoaXMuaGFuZGxlTm90aWZpY2F0aW9uKG5hbWUsIGJvZHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBzY2VuZSB0cmFuc2l0aW9uIG5vdGlmaWNhdGlvbnMuXG4gICAgICogUnVuIHRocm91Z2ggYWxsIGNvbnRyb2xsZXJzIHdoaWNoIHdlcmUgbWFwcGVkIHRvIHNjZW5lc1xuICAgICAqIGFuZCBjYWxsIGFwcHJvcHJpdGUgbWV0aG9kczogZXhlY3V0ZSBhbmQgc2hvdyAvIGhpZGUgbGF5ZXJcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlU2NlbmVUcmFuc2l0aW9uTm90aWZpY2F0aW9uKG5hbWU6IHN0cmluZywgYm9keT86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAobmFtZSAhPT0gR2xvYmFsTm90aWZpY2F0aW9ucy5UUkFOU0lUSU9OX1RPX1NDRU5FKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzY2VuZU5vdGlmaWNhdGlvbjogc3RyaW5nID0gYm9keTsgXG4gICAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBzY2VuZXNlXG4gICAgICAgIHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lOiBJU2NlbmVFbnRpdHkpID0+IHtcbiAgICAgICAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBjb250cm9sbGVycyByZWdpc3RlcmVkIGluIHRoZSBzY2VuZVxuICAgICAgICAgICAgc2NlbmUuY29udHJvbGxlcnNOb3RpZmljYXRpb25zLmZvckVhY2goKG5vdGlmaWNhdGlvbjogc3RyaW5nKSA9PiB7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgc2NlbmUgaXMgZm9yIHRyYW5zaXRpb24gLSBjYWxsIGl0cyBjb250cm9sbGVyc1xuICAgICAgICAgICAgICAgIGlmIChzY2VuZS5zY2VuZU5vdGlmaWNhdGlvbiA9PT0gc2NlbmVOb3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyc1tub3RpZmljYXRpb25dLmV4ZWN1dGUoeyBuYW1lOiBub3RpZmljYXRpb24sIGJvZHk6IG51bGwgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcnNbbm90aWZpY2F0aW9uXS5sYXllclRyYW5zaXRpb25JblN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJzW25vdGlmaWNhdGlvbl0ubGF5ZXJUcmFuc2l0aW9uT3V0U3RhcnQoKTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1biB0aHJvdWdoIGFsbCBjb250cm9sbGVycyB3aGljaCBhcmUgc3Vic2NyaWJlZCB0byBub3RpZmljYXRpb25cbiAgICAgKiBhbmQgY2FsbCB0aGVpciBoYW5kbGVyIG1ldGhvZHMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZU5vdGlmaWNhdGlvbihuYW1lOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vdGlmaWNhdGlvbnNbbmFtZV0pIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb250cm9sbGVyczogQ29udHJvbGxlcltdID0gdGhpcy5ub3RpZmljYXRpb25zW25hbWVdO1xuICAgICAgICBjb250cm9sbGVycy5mb3JFYWNoKChjb250cm9sbGVyOiBDb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICBjb250cm9sbGVyLmhhbmRsZU5vdGlmaWNhdGlvbih7IG5hbWUsIGJvZHkgfSk7XG4gICAgICAgIH0pOyAgICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlckNvbnRyb2xsZXIobm90aWZpY2F0aW9uTmFtZTogc3RyaW5nLCBjb250cm9sbGVyQ2xhc3M6IHR5cGVvZiBDb250cm9sbGVyLCB2aWV3Q2xhc3M/OiB0eXBlb2YgVmlldyk6IHZvaWQge1xuICAgICAgICBsZXQgY29udHJvbGxlcjogQ29udHJvbGxlciA9IG5ldyBjb250cm9sbGVyQ2xhc3MoKTtcbiAgICAgICAgY29udHJvbGxlci5vblJlZ2lzdGVyKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAodmlld0NsYXNzKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLnZpZXcgPSBuZXcgdmlld0NsYXNzKCk7XG4gICAgICAgICAgICBjb250cm9sbGVyLnZpZXcub25SZWdpc3RlcigpO1xuICAgICAgICAgICAgQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZExheWVyVG9TY2VuZShjb250cm9sbGVyLnZpZXcuZGlzcGxheSk7XG4gICAgICAgICAgICBjb250cm9sbGVyLnZpZXcucG9zdFJlZ2lzdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzW25vdGlmaWNhdGlvbk5hbWVdID0gY29udHJvbGxlcjtcbiAgICAgICAgXG4gICAgICAgIC8vIFN1YnNjcmliZSBpdHNlbGYgdG8gbm90aWZpY2F0aW9uXG4gICAgICAgIGNvbnRyb2xsZXIuYWRkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGNvbnRyb2xsZXIuZXhlY3V0ZS5iaW5kKGNvbnRyb2xsZXIpKTtcbiAgICAgICAgY29udHJvbGxlci5wb3N0UmVnaXN0ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJNb2RlbChtb2RlbE5hbWU6IHN0cmluZywgbW9kZWxDbGFzczogdHlwZW9mIE1vZGVsKTogdm9pZCB7XG4gICAgICAgIGxldCBtb2RlbDogYW55ID0gbmV3IG1vZGVsQ2xhc3MoKTtcbiAgICAgICAgdGhpcy5tb2RlbHNbbW9kZWxOYW1lXSA9IG1vZGVsO1x0XG4gICAgfSAgXG5cbiAgICBwdWJsaWMgcmV0cmlldmVNb2RlbChtb2RlbE5hbWU6IHN0cmluZyk6IE1vZGVsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW21vZGVsTmFtZV07XHRcbiAgICB9ICAgIFxuICAgIFxuICAgIHB1YmxpYyByZWdpc3RlclNjZW5lKHNjZW5lTm90aWZpY2F0aW9uOiBzdHJpbmcsIGNvbnRyb2xsZXJzTm90aWZpY2F0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZXMucHVzaChcbiAgICAgICAgICAgIHsgc2NlbmVOb3RpZmljYXRpb24sIGNvbnRyb2xsZXJzTm90aWZpY2F0aW9ucyB9XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyc0luZGV4IHtcblx0W25vdGlmaWNhdGlvbk5hbWU6IHN0cmluZ106IENvbnRyb2xsZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvbkluZGV4IHtcblx0W25hbWU6IHN0cmluZ106IENvbnRyb2xsZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTW9kZWxJbmRleCB7XG5cdFttb2RlbE5hbWU6IHN0cmluZ106IE1vZGVsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTY2VuZUVudGl0eSB7XG4gICAgc2NlbmVOb3RpZmljYXRpb246IHN0cmluZzsgXG4gICAgY29udHJvbGxlcnNOb3RpZmljYXRpb25zOiBzdHJpbmdbXTtcbn0iLCJleHBvcnQgY2xhc3MgUHJlbG9hZGVyTm90aWZpY2F0aW9ucyB7XG4gICAgcHVibGljIHN0YXRpYyBJTklUOiBzdHJpbmcgPSBcIlBSRUxPQURFUl9JTklUXCI7XG59IiwiZXhwb3J0IGNsYXNzIE1lbnVOb3RpZmljYXRpb25zIHsgIFxuICAgIHB1YmxpYyBzdGF0aWMgSU5JVDogc3RyaW5nID0gXCJNRU5VX0lOSVRcIjtcbiAgICBwdWJsaWMgc3RhdGljIEJVVFRPTlM6IHN0cmluZyA9IFwiTUVOVV9CVVRUT05TXCI7XG59IiwiZXhwb3J0IGNsYXNzIENvbmZpZyB7XG4gICAgcHVibGljIHN0YXRpYyBzY2VuZVdpZHRoOiBudW1iZXIgPSA5MDA7XG4gICAgcHVibGljIHN0YXRpYyBzY2VuZUhlaWdodDogbnVtYmVyID0gNzIwO1xuXG4gICAgcHVibGljIHN0YXRpYyBwcmVsb2FkZXJBYXNzZXRzOiBhbnkgPSB7XG4gICAgICAgIGxvYWRlckJnOiBcImFzc2V0cy9sb2FkZXItYmFyL2xvYWRlci1iZy5wbmdcIixcbiAgICAgICAgbG9hZGVyQmFyOiBcImFzc2V0cy9sb2FkZXItYmFyL2xvYWRlci1iYXIucG5nXCIsXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3NldHM6IGFueSA9IHtcbiAgICAgICAgdGFuazogJ2Fzc2V0cy90YW5rcy90YW5rLnBuZycsXG4gICAgICAgIGVuZW15OiAnYXNzZXRzL3RhbmtzL2VuZW15X3JlZC5wbmcnLFxuICAgICAgICB3YWxsOiAnYXNzZXRzL2JvYXJkL3dhbGwucG5nJyxcbiAgICAgICAgYnVsbGV0OiAnYXNzZXRzL2JvYXJkL3NtYWxsX3dhbGxfNC5wbmcnXG4gICAgfVxufTsiLCJleHBvcnQgY2xhc3MgR2FtZU5vdGlmaWNhdGlvbnMgeyAgXG4gICAgcHVibGljIHN0YXRpYyBJTklUOiBzdHJpbmcgPSBcIkdBTUVfSU5JVFwiO1xufSIsImltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4vc3RhdGVcIjtcblxuZXhwb3J0IGNsYXNzIEZTTSB7XG4gICAgcHJpdmF0ZSBzdGF0ZXM6IFN0YXRlW107XG4gICAgcHJpdmF0ZSBjdXJyZW50U3RhdGU6IHN0cmluZyA9IG51bGw7XG4gICAgXG4gICAgY29uc3RydWN0b3Ioc3RhdGVzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSBzdGF0ZXM7XG4gICAgfVxuXG4gICAgLy8gQ2FsbGVkIGluIG1haW4gdXBkYXRlIGxvb3BcbiAgICBwdWJsaWMgc3RlcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IE9iamVjdC5rZXlzKHRoaXMuc3RhdGVzKVswXTsgLy8gVGFrZSB0aGUgZmlyc3Qgc3RhdGUgYXMgaW5pdGlhbCAgIFxuICAgICAgICAgICAgdGhpcy5zdGF0ZXNbdGhpcy5jdXJyZW50U3RhdGVdLmVudGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZXNbdGhpcy5jdXJyZW50U3RhdGVdLmV4ZWN1dGUoKTtcbiAgICB9XG5cbiAgICAvLyBDaGFuZ2VzIHRoZSBzdGF0ZVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uKG5ld1N0YXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZXNbdGhpcy5jdXJyZW50U3RhdGVdLmVudGVyKCk7XG4gICAgfVxufSIsImltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi9mcmFtZXdvcmsvY29yZS9hcHAtbWFuYWdlclwiO1xuaW1wb3J0IHsgVW5pdFN0YXRlIH0gZnJvbSBcIi4vdW5pdC1zdGF0ZVwiO1xuXG5leHBvcnQgY2xhc3MgVW5pdElkbGVTdGF0ZSBleHRlbmRzIFVuaXRTdGF0ZSB7XG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVuaXQuc2NhbGUuc2V0KDEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBleGVjdXRlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBrZXlzID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtleXM7XG4gICAgICAgXG4gICAgICAgIGlmIChrZXlzWydBcnJvd1VwJ10gfHwga2V5c1snQXJyb3dEb3duJ10gfHwga2V5c1snQXJyb3dMZWZ0J10gfHwga2V5c1snQXJyb3dSaWdodCddKSB7XG4gICAgICAgICAgICB0aGlzLnVuaXQuZnNtLnRyYW5zaXRpb24oJ21vdmUnKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBVbml0LCBNb3ZlRGlyZWN0aW9ucyB9IGZyb20gXCIuL3VuaXRcIjtcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4vZnJhbWV3b3JrL2NvcmUvZnNtL3N0YXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBVbml0U3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gICAgcHVibGljIHVuaXQ6IFVuaXQ7XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoYXJncyk7XG4gICAgICAgIHRoaXMudW5pdCA9IGFyZ3M7XG4gICAgfVxuXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBleGVjdXRlKCk6IHZvaWQge1xuXG4gICAgfVxufSIsImltcG9ydCB7IFVuaXRTdGF0ZSB9IGZyb20gXCIuL3VuaXQtc3RhdGVcIjtcbmltcG9ydCB7IE1vdmVEaXJlY3Rpb25zIH0gZnJvbSBcIi4vdW5pdFwiO1xuaW1wb3J0IGdzYXAgZnJvbSBcImdzYXBcIjsgXG5pbXBvcnQgeyBBcHBNYW5hZ2VyIH0gZnJvbSBcIi4vZnJhbWV3b3JrL2NvcmUvYXBwLW1hbmFnZXJcIjtcblxuZXhwb3J0IGNsYXNzIFVuaXRNb3ZlU3RhdGUgZXh0ZW5kcyBVbml0U3RhdGUge1xuICAgIHB1YmxpYyBtb3ZlRGlyZWN0aW9uOiBNb3ZlRGlyZWN0aW9ucyA9IE1vdmVEaXJlY3Rpb25zLkRvd247XG4gICAgcHVibGljIHNwZWVkID0gMjtcblxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bml0LnNjYWxlLnNldCgwLjk1KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuZXhlY3V0ZSgpO1xuICAgICAgICBjb25zdCBrZXlzID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtleXM7XG4gICAgICAgIGlmICghKGtleXNbJ0Fycm93VXAnXSB8fCBrZXlzWydBcnJvd0Rvd24nXSB8fCBrZXlzWydBcnJvd0xlZnQnXSB8fCBrZXlzWydBcnJvd1JpZ2h0J10pKSB7XG4gICAgICAgICAgICB0aGlzLnVuaXQuZnNtLnRyYW5zaXRpb24oJ2lkbGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlzWydBcnJvd1VwJ10pIHRoaXMubW92ZURpcmVjdGlvbiA9IE1vdmVEaXJlY3Rpb25zLlVwO1xuICAgICAgICBpZiAoa2V5c1snQXJyb3dEb3duJ10pIHRoaXMubW92ZURpcmVjdGlvbiA9IE1vdmVEaXJlY3Rpb25zLkRvd247XG4gICAgICAgIGlmIChrZXlzWydBcnJvd0xlZnQnXSkgdGhpcy5tb3ZlRGlyZWN0aW9uID0gTW92ZURpcmVjdGlvbnMuTGVmdDtcbiAgICAgICAgaWYgKGtleXNbJ0Fycm93UmlnaHQnXSkgdGhpcy5tb3ZlRGlyZWN0aW9uID0gTW92ZURpcmVjdGlvbnMuUmlnaHQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vdmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50dXJuVG8oKTtcbiAgICAgICAgdGhpcy5tb3ZlVG8oKTtcbiAgICAgICAgaWYgKHRoaXMudW5pdC5pc0hpdFRoZVdhbGwoKSkgdGhpcy5oYW5kbGVXYWxsQ29sbGlzaW9uKCk7ICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudW5pdC5pc0hpdFRoZVVuaXQoKSkgdGhpcy5oYW5kbGVVbml0Q29sbGlzaW9uKCk7ICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlV2FsbENvbGxpc2lvbigpOiB2b2lkIHtcbiAgICAgICAgLy8gQm91bmNlIGJhY2tcbiAgICAgICAgdGhpcy5tb3ZlRGlyZWN0aW9uID0gdGhpcy5tb3ZlRGlyZWN0aW9uICogLTE7XG4gICAgICAgIHRoaXMubW92ZVRvKCk7XG4gICAgICAgIHRoaXMubW92ZURpcmVjdGlvbiA9IHRoaXMubW92ZURpcmVjdGlvbiAqIC0xO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVVbml0Q29sbGlzaW9uKCk6IHZvaWQge1xuICAgICAgICAvLyBCb3VuY2UgYmFja1xuICAgICAgICB0aGlzLm1vdmVEaXJlY3Rpb24gPSB0aGlzLm1vdmVEaXJlY3Rpb24gKiAtMTtcbiAgICAgICAgdGhpcy5tb3ZlVG8oKTtcbiAgICAgICAgdGhpcy5tb3ZlRGlyZWN0aW9uID0gdGhpcy5tb3ZlRGlyZWN0aW9uICogLTE7XG4gICAgfVxuXG4gICAgcHVibGljIHR1cm5UbygpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFuZ2xlOiBudW1iZXI7XG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJlY3Rpb24gPT09IE1vdmVEaXJlY3Rpb25zLlVwKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy51bml0Lmxvb2tEaXJlY3Rpb24gPT09IE1vdmVEaXJlY3Rpb25zLkxlZnQpIHtcbiAgICAgICAgICAgICAgICBhbmdsZSA9IDMwMDtcbiAgICAgICAgICAgIH0gICAgIFxuICAgICAgICB9ICAgIFxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5Eb3duKSBhbmdsZSA9IDE4MDtcbiAgICAgICAgaWYgKHRoaXMubW92ZURpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuTGVmdCkgYW5nbGUgPSAyNzA7ICAgXG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJlY3Rpb24gPT09IE1vdmVEaXJlY3Rpb25zLlJpZ2h0KSBhbmdsZSA9IDkwOyAgIFxuICAgICAgICBnc2FwLnRvKHRoaXMudW5pdC5za2luLCB7IGFuZ2xlLCBkdXJhdGlvbjogMC4zIH0pO1xuXG4gICAgICAgIHRoaXMudW5pdC5sb29rRGlyZWN0aW9uID0gdGhpcy5tb3ZlRGlyZWN0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlVG8oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJlY3Rpb24gPT09IE1vdmVEaXJlY3Rpb25zLlVwKSB0aGlzLnVuaXQueSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5Eb3duKSB0aGlzLnVuaXQueSArPSB0aGlzLnNwZWVkO1xuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5MZWZ0KSB0aGlzLnVuaXQueCAtPSB0aGlzLnNwZWVkO1xuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5SaWdodCkgdGhpcy51bml0LnggKz0gdGhpcy5zcGVlZDtcbiAgICB9XG59IiwiaW1wb3J0IHsgUHJlbG9hZGVyTW9kdWxlIH0gZnJvbSAnLi9nYW1lL21vZHVsZXMvcHJlbG9hZGVyLW1vZHVsZS9wcmVsb2FkZXItbW9kdWxlJztcbmltcG9ydCB7IEVudHJ5UG9pbnQgfSBmcm9tICcuL2ZyYW1ld29yay9jb3JlL2VudHJ5LXBvaW50JztcbmltcG9ydCB7IE1lbnVNb2R1bGUgfSBmcm9tICcuL2dhbWUvbW9kdWxlcy9tZW51LW1vZHVsZS9tZW51LW1vZHVsZSc7XG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi9nYW1lL21vZHVsZXMvZ2FtZS1tb2R1bGUvZ2FtZS1tb2R1bGUnO1xuZXhwb3J0IGNsYXNzIEdhbWVFbnRyeVBvaW50IGV4dGVuZHMgRW50cnlQb2ludCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIG5ldyBQcmVsb2FkZXJNb2R1bGUoKTtcbiAgICAgICAgbmV3IE1lbnVNb2R1bGUoKTtcbiAgICAgICAgbmV3IEdhbWVNb2R1bGUoKTtcbiAgICB9XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbmV3IEdhbWVFbnRyeVBvaW50KCk7XG59IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL21vZHVsZVwiO1xuaW1wb3J0IHsgUHJlbG9hZGVyTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuL21pc2MvcHJlbG9hZGVyLW5hbWVzXCI7XG5pbXBvcnQgeyBQcmVsb2FkZXJJbml0Q29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL3ByZWxvYWRlci1pbml0LWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IFByZWxvYWRlckluaXRWaWV3IH0gZnJvbSBcIi4vdmlld3MvcHJlbG9hZGVyLWluaXQtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgUHJlbG9hZGVyTW9kdWxlIGV4dGVuZHMgTW9kdWxlIHtcbiAgICBwdWJsaWMgcmVnaXN0ZXJDb250cm9sbGVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sbGVyKFByZWxvYWRlck5vdGlmaWNhdGlvbnMuSU5JVCwgUHJlbG9hZGVySW5pdENvbnRyb2xsZXIsIFByZWxvYWRlckluaXRWaWV3KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJTY2VuZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRkU2NlbmUoUHJlbG9hZGVyTm90aWZpY2F0aW9ucy5JTklULCBbIFByZWxvYWRlck5vdGlmaWNhdGlvbnMuSU5JVCBdKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEdsb2JhbE5vdGlmaWNhdGlvbnMgeyAgXG4gICAgcHVibGljIHN0YXRpYyBUUkFOU0lUSU9OX1RPX1NDRU5FOiBzdHJpbmcgPSBcIlRSQU5TSVRJT05fVE9fU0NFTkVcIjtcbn0iLCJpbXBvcnQgeyBnc2FwIH0gZnJvbSBcImdzYXBcIjtcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvYXBwLW1hbmFnZXJcIjtcbmltcG9ydCB7IEdsb2JhbE5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvZ2xvYmFsLW5vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IElOb3RpZmljYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tdmMvbm90aWZpY2F0aW9uJztcbmltcG9ydCB7IEdyYXBoaWNzRW5naW5lTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvbW9kdWxlcy9ncmFwaGljcy1lbmdpbmUtbW9kdWxlL21pc2MvZ3JhcGhpY3MtZW5naW5lLW5hbWVzXCI7XG5pbXBvcnQgeyBNZW51Tm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi9tZW51LW1vZHVsZS9taXNjL21lbnUtbmFtZXNcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9taXNjL2NvbmZpZ1wiO1xuaW1wb3J0IHsgUHJlbG9hZGVyTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi9taXNjL3ByZWxvYWRlci1uYW1lc1wiO1xuaW1wb3J0IHsgUHJlbG9hZGVySW5pdFZpZXcgfSBmcm9tIFwiLi4vdmlld3MvcHJlbG9hZGVyLWluaXQtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgUHJlbG9hZGVySW5pdENvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgICBwcm90ZWN0ZWQgbG9hZGluZ0luaXRpYWxBc3NldHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHVibGljIGFkZE5vdGlmaWNhdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRkTm90aWZpY2F0aW9uKEdyYXBoaWNzRW5naW5lTm90aWZpY2F0aW9ucy5BU1NFVFNfTE9BRElOR19DT01QTEVURSwgdGhpcy5vbkFzc2V0c0xvYWRpbmdDb21wbGV0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5hZGROb3RpZmljYXRpb24oR3JhcGhpY3NFbmdpbmVOb3RpZmljYXRpb25zLkFTU0VUU19MT0FESU5HX09OX1BST0dSRVNTLCB0aGlzLm9uQXNzZXRzTG9hZGluZ1Byb2dyZXNzLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3N0UmVnaXN0ZXIoKTogdm9pZCB7XHRcbiAgICAgICAgdGhpcy5zdGFydEFzc2V0c0xvYWRpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGVyZSBhcmUgdHdvIGxvYWRpbmcgcGhhc2VzOiBcbiAgICAgKiAxKSBMb2FkIHRoZSBwcmVsb2FkZXIgYXNzZXRzIGluIG9yZGVyIHRvIHNob3cgdGhlIHByb2dyZXNzIGJhclxuICAgICAqIDIpIExvYWQgdGhlIHJlc3Qgb2YgdGhlIGFzc2V0c1xuICAgICAqLyAgICBcbiAgICBwcm90ZWN0ZWQgc3RhcnRBc3NldHNMb2FkaW5nKCk6IHZvaWQge1xuICAgICAgICBsZXQgYXNzZXRzOiBhbnkgPSBDb25maWcuYXNzZXRzO1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nSW5pdGlhbEFzc2V0cykge1xuICAgICAgICAgICAgYXNzZXRzID0gQ29uZmlnLnByZWxvYWRlckFhc3NldHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKEdyYXBoaWNzRW5naW5lTm90aWZpY2F0aW9ucy5TVEFSVF9BU1NFVFNfTE9BRElORywgYXNzZXRzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Bc3NldHNMb2FkaW5nQ29tcGxldGUobm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdJbml0aWFsQXNzZXRzKSB7XG4gICAgICAgICAgICAvLyBIYXZlIGxvYWRlZCB0aGUgaW5pdGlhbCBhc3NldHMsIHNvIGNhbiBkcmF3IHRoZSBzY2VuZVxuICAgICAgICAgICAgLy8gYW5kIGNhbiBzdGFydCB0byBsb2FkIHRoZSByZXN0IG9mIHRoZSBnYW1lIGFzc2V0c1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nSW5pdGlhbEFzc2V0cyA9IGZhbHNlO1xuICAgICAgICAgICAgKHRoaXMudmlldyBhcyBQcmVsb2FkZXJJbml0VmlldykuZHJhd1NjZW5lKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXNzZXRzTG9hZGluZygpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGdzYXAuZGVsYXllZENhbGwoMSwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gVHJhbnNpdGlvbiB0byBtZW51IHNjZW5lXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oR2xvYmFsTm90aWZpY2F0aW9ucy5UUkFOU0lUSU9OX1RPX1NDRU5FLCBNZW51Tm90aWZpY2F0aW9ucy5JTklUKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQXNzZXRzTG9hZGluZ1Byb2dyZXNzKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbik6IHZvaWQge1xuICAgICAgICAvLyBDYW5ub3QgZGlzcGxheSBhIHByb2dyZWVzIGlmIHRoZXJlIGlzIG5vIHByb2dyZXNzIGJhciB5ZXQgOilcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0luaXRpYWxBc3NldHMpIHJldHVybjtcbiAgICAgICAgKHRoaXMudmlldyBhcyBQcmVsb2FkZXJJbml0VmlldykudXBkYXRlUHJvZ3Jlc3NCYXIobm90aWZpY2F0aW9uLmJvZHkpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNdmMgfSBmcm9tIFwiLi9tdmNcIjtcblxuZXhwb3J0IGNsYXNzIE1WQ0VudGl0eSB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5vblJlZ2lzdGVyKCk7XG5cdH1cblxuICAgIGdldCBtdmMoKTogTXZjIHtcblx0XHRyZXR1cm4gTXZjLmdldEluc3RhbmNlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIG9uY2Ugd2hlbiBvYmplY3QgaXMgY3JlYXRlZFxuXHQgKi9cblx0cHVibGljIG9uUmVnaXN0ZXIoKTogdm9pZCB7XHRcblx0fVxuXG5cdC8qKlxuXHQgKiBTZW5kcyB0aGUgbm90aWZpY2F0aW9uIHRvIGFsbCBzdWJzY3JpYmVkIGVudGl0aWVzXG5cdCAqL1xuXHRwdWJsaWMgc2VuZE5vdGlmaWNhdGlvbihuYW1lOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiB2b2lkIHtcblx0XHRjb25zb2xlLmxvZygnc2VuZE5vdGlmaWNhdGlvbjogJywgbmFtZSk7XG5cdFx0XG5cdFx0dGhpcy5tdmMuc2VuZE5vdGlmaWNhdGlvbihuYW1lLCBib2R5KTtcblx0fVxufSIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL3ZpZXdcIjtcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvYXBwLW1hbmFnZXJcIjtcbmltcG9ydCB7IENvbnRhaW5lciwgR3JhcGhpY3MsIFNwcml0ZSwgVGV4dCB9IGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vbWlzYy9jb25maWdcIjtcbmltcG9ydCB7IGdzYXAgfSBmcm9tICdnc2FwJztcblxuZXhwb3J0IGNsYXNzIFByZWxvYWRlckluaXRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgcHJvdGVjdGVkIGJhcjogU3ByaXRlO1xuXG4gICAgcHVibGljIGRyYXdTY2VuZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYXdCZygpO1xuICAgICAgICB0aGlzLmRyYXdUaXRsZSgpO1xuICAgICAgICB0aGlzLmRyYXdQcm9ncmVzc0JhcigpO1xuICAgIH1cbiBcbiAgICBwcm90ZWN0ZWQgZHJhd1RpdGxlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0ZXh0OiBUZXh0ID0gbmV3IFRleHQoJ0xvYWRpbmcgZ2FtZS4uLicpO1xuICAgICAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGV4dC54ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lV2lkdGgoKSAvIDI7XG4gICAgICAgIHRleHQueSA9IEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2VuZUhlaWdodCgpIC8gMjtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKHRleHQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkcmF3QmcoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGJnOiBHcmFwaGljcyA9IG5ldyBHcmFwaGljcygpO1xuICAgICAgICBiZy5iZWdpbkZpbGwoMHhERTMyNDkpO1xuICAgICAgICBiZy5kcmF3UmVjdCgwLCAwLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVXaWR0aCgpLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVIZWlnaHQoKSk7XG4gICAgICAgIGJnLmVuZEZpbGwoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKGJnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJhd1Byb2dyZXNzQmFyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBob2xkZXI6IENvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG4gICAgICAgIGNvbnN0IGJnOiBTcHJpdGUgPSBuZXcgU3ByaXRlKHRoaXMuZ2V0VGV4dHVyZShDb25maWcucHJlbG9hZGVyQWFzc2V0c1snbG9hZGVyQmcnXSkpO1xuICAgICAgICB0aGlzLmJhciA9IG5ldyBTcHJpdGUodGhpcy5nZXRUZXh0dXJlKENvbmZpZy5wcmVsb2FkZXJBYXNzZXRzWydsb2FkZXJCYXInXSkpO1xuICAgICAgICB0aGlzLmJhci54ID0gdGhpcy5iYXIueSA9IDU7XG4gICAgICAgIHRoaXMuYmFyLndpZHRoXG4gICAgICAgIGhvbGRlci5hZGRDaGlsZChiZywgdGhpcy5iYXIpO1xuICAgICAgICBob2xkZXIucGl2b3QueCA9IGhvbGRlci53aWR0aCAvIDI7XG4gICAgICAgIGhvbGRlci54ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lV2lkdGgoKSAvIDI7XG4gICAgICAgIGhvbGRlci55ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lSGVpZ2h0KCkgLyAyICsgNTA7XG4gICAgICAgIHRoaXMuZGlzcGxheS5hZGRDaGlsZChob2xkZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVQcm9ncmVzc0Jhcihwcm9ncmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIEVtdWxhdGluZyBzb21lIHRocm90dGxpbmdcbiAgICAgICAgZ3NhcC50byh0aGlzLmJhci5zY2FsZSwgeyBkdXJhdGlvbjogMSwgeDogcHJvZ3Jlc3MgLyAxMDAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2dyZXNzKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgR3JhcGhpY3NFbmdpbmVNb2R1bGUgfSBmcm9tIFwiLi4vbW9kdWxlcy9ncmFwaGljcy1lbmdpbmUtbW9kdWxlL2dyYXBoaWNzLWVuZ2luZS1tb2R1bGVcIjtcblxuZXhwb3J0IGNsYXNzIEVudHJ5UG9pbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBuZXcgR3JhcGhpY3NFbmdpbmVNb2R1bGUoKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4uLy4uL2NvcmUvbW9kdWxlXCI7XG5pbXBvcnQgeyBHcmFwaGljc0VuZ2luZUxvYWRlckNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9ncmFwaGljcy1lbmdpbmUtbG9hZGVyLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IEdyYXBoaWNzRW5naW5lTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuL21pc2MvZ3JhcGhpY3MtZW5naW5lLW5hbWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBHcmFwaGljc0VuZ2luZU1vZHVsZSBleHRlbmRzIE1vZHVsZSB7ICBcbiAgICBwdWJsaWMgcmVnaXN0ZXJDb250cm9sbGVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sbGVyKEdyYXBoaWNzRW5naW5lTm90aWZpY2F0aW9ucy5TVEFSVF9BU1NFVFNfTE9BRElORywgR3JhcGhpY3NFbmdpbmVMb2FkZXJDb250cm9sbGVyKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQXBwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2FwcC1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvbXZjL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IElOb3RpZmljYXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9tdmMvbm90aWZpY2F0aW9uXCI7XG5pbXBvcnQgeyBHcmFwaGljc0VuZ2luZU5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiLi4vbWlzYy9ncmFwaGljcy1lbmdpbmUtbmFtZXNcIjtcblxuZXhwb3J0IGNsYXNzIEdyYXBoaWNzRW5naW5lTG9hZGVyQ29udHJvbGxlciBleHRlbmRzIENvbnRyb2xsZXIge1xuXG4gICAgcHVibGljIGV4ZWN1dGUobm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydEFzc2V0c0xvYWRpbmcobm90aWZpY2F0aW9uLmJvZHksIHRoaXMub25Bc3NldHNMb2FkaW5nQ29tcGxldGUuYmluZCh0aGlzKSwgdGhpcy5vbkFzc2V0c0xvYWRpbmdQcm9ncmVzcy5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Bc3NldHNMb2FkaW5nQ29tcGxldGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihHcmFwaGljc0VuZ2luZU5vdGlmaWNhdGlvbnMuQVNTRVRTX0xPQURJTkdfQ09NUExFVEUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkFzc2V0c0xvYWRpbmdQcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihHcmFwaGljc0VuZ2luZU5vdGlmaWNhdGlvbnMuQVNTRVRTX0xPQURJTkdfT05fUFJPR1JFU1MsIHByb2dyZXNzKTtcbiAgICB9ICAgIFxufSIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tb2R1bGVcIjtcbmltcG9ydCB7IE1lbnVCdXR0b25zQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL21lbnUtYnV0dG9ucy1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBNZW51SW5pdENvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9tZW51LWluaXQtY29udHJvbGxlclwiO1xuaW1wb3J0IHsgTWVudU5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiLi9taXNjL21lbnUtbmFtZXNcIjtcbmltcG9ydCB7IE1lbnVCdXR0b25zVmlldyB9IGZyb20gXCIuL3ZpZXdzL21lbnUtYnV0dG9ucy12aWV3XCI7XG5pbXBvcnQgeyBNZW51SW5pdFZpZXcgfSBmcm9tIFwiLi92aWV3cy9tZW51LWluaXQtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgTWVudU1vZHVsZSBleHRlbmRzIE1vZHVsZSB7XG4gICAgcHVibGljIHJlZ2lzdGVyQ29udHJvbGxlcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRkQ29udHJvbGxlcihNZW51Tm90aWZpY2F0aW9ucy5JTklULCBNZW51SW5pdENvbnRyb2xsZXIsIE1lbnVJbml0Vmlldyk7XG4gICAgICAgIHRoaXMuYWRkQ29udHJvbGxlcihNZW51Tm90aWZpY2F0aW9ucy5CVVRUT05TLCBNZW51QnV0dG9uc0NvbnRyb2xsZXIsIE1lbnVCdXR0b25zVmlldyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyU2NlbmVzKCk6IHZvaWQge1xuICAgICAgICAvL3RoaXMuYWRkU2NlbmUoTWVudU5vdGlmaWNhdGlvbnMuSU5JVCwgWyBNZW51Tm90aWZpY2F0aW9ucy5JTklUIF0pO1xuICAgICAgICB0aGlzLmFkZFNjZW5lKE1lbnVOb3RpZmljYXRpb25zLklOSVQsIFsgTWVudU5vdGlmaWNhdGlvbnMuSU5JVCwgTWVudU5vdGlmaWNhdGlvbnMuQlVUVE9OUyBdKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tdmMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgTWVudU5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiLi4vbWlzYy9tZW51LW5hbWVzXCI7XG5pbXBvcnQgeyBJTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL25vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBNZW51SW5pdFZpZXcgfSBmcm9tICcuLi92aWV3cy9tZW51LWluaXQtdmlldyc7XG5pbXBvcnQgeyBHYW1lTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi9nYW1lLW1vZHVsZS9taXNjL2dhbWUtbmFtZXNcIjtcbmltcG9ydCB7IGdzYXAgfSBmcm9tIFwiZ3NhcFwiO1xuaW1wb3J0IHsgR2xvYmFsTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9nbG9iYWwtbm90aWZpY2F0aW9uc1wiO1xuXG5leHBvcnQgY2xhc3MgTWVudUluaXRDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgXG4gICAgcHVibGljIGV4ZWN1dGUobm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd01lbnUoKTtcblxuICAgICAgICBnc2FwLmRlbGF5ZWRDYWxsKDUsICgpID0+IHtcbiAgICAgICAgICAgIC8vIFRyYW5zaXRpb24gdG8gZ2FtZSBzY2VuZVxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKEdsb2JhbE5vdGlmaWNhdGlvbnMuVFJBTlNJVElPTl9UT19TQ0VORSwgR2FtZU5vdGlmaWNhdGlvbnMuSU5JVCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dNZW51KCk6IHZvaWQge1xuICAgICAgICAodGhpcy52aWV3IGFzIE1lbnVJbml0VmlldykuZHJhd1NjZW5lKCk7XG4gICAgfVxufSIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL3ZpZXdcIjtcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvYXBwLW1hbmFnZXJcIjtcbmltcG9ydCB7IENvbnRhaW5lciwgR3JhcGhpY3MsIFNwcml0ZSwgVGV4dCB9IGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vbWlzYy9jb25maWdcIjtcbmltcG9ydCB7IGdzYXAgfSBmcm9tICdnc2FwJztcblxuZXhwb3J0IGNsYXNzIE1lbnVJbml0VmlldyBleHRlbmRzIFZpZXcge1xuICAgIHByb3RlY3RlZCBiYXI6IFNwcml0ZTtcblxuICAgIHB1YmxpYyBkcmF3U2NlbmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGxheS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmF3QmcoKTtcbiAgICAgICAgdGhpcy5kcmF3VGl0bGUoKTtcbiAgICB9XG4gXG4gICAgcHJvdGVjdGVkIGRyYXdUaXRsZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGV4dDogVGV4dCA9IG5ldyBUZXh0KCdNRU5VIScpO1xuICAgICAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGV4dC54ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lV2lkdGgoKSAvIDI7XG4gICAgICAgIHRleHQueSA9IEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2VuZUhlaWdodCgpIC8gMjtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKHRleHQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkcmF3QmcoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGJnOiBHcmFwaGljcyA9IG5ldyBHcmFwaGljcygpO1xuICAgICAgICBiZy5iZWdpbkZpbGwoMHhERTMyNDkpO1xuICAgICAgICBiZy5kcmF3UmVjdCgwLCAwLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVXaWR0aCgpLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVIZWlnaHQoKSk7XG4gICAgICAgIGJnLmVuZEZpbGwoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKGJnKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL21vZHVsZVwiO1xuaW1wb3J0IHsgR2FtZUluaXRDb250cm9sbGVyIH0gZnJvbSBcIi4vY29udHJvbGxlcnMvZ2FtZS1pbml0LWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IEdhbWVOb3RpZmljYXRpb25zIH0gZnJvbSBcIi4vbWlzYy9nYW1lLW5hbWVzXCI7XG5pbXBvcnQgeyBHYW1lSW5pdFZpZXcgfSBmcm9tIFwiLi92aWV3cy9nYW1lLWluaXQtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgR2FtZU1vZHVsZSBleHRlbmRzIE1vZHVsZSB7XG4gICAgcHVibGljIHJlZ2lzdGVyQ29udHJvbGxlcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRkQ29udHJvbGxlcihHYW1lTm90aWZpY2F0aW9ucy5JTklULCBHYW1lSW5pdENvbnRyb2xsZXIsIEdhbWVJbml0Vmlldyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyU2NlbmVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZFNjZW5lKEdhbWVOb3RpZmljYXRpb25zLklOSVQsIFsgR2FtZU5vdGlmaWNhdGlvbnMuSU5JVCBdKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tdmMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgSU5vdGlmaWNhdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL212Yy9ub3RpZmljYXRpb24nO1xuaW1wb3J0IHsgR2FtZUluaXRWaWV3IH0gZnJvbSBcIi4uL3ZpZXdzL2dhbWUtaW5pdC12aWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBHYW1lSW5pdENvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgICBcbiAgICBwdWJsaWMgYWRkTm90aWZpY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgLy90aGlzLmFkZE5vdGlmaWNhdGlvbihNZW51Tm90aWZpY2F0aW9ucy5TSE9XLCB0aGlzLnNob3dNZW51LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBleGVjdXRlKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dNZW51KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dNZW51KCk6IHZvaWQge1xuICAgICAgICAodGhpcy52aWV3IGFzIEdhbWVJbml0VmlldykuZHJhd1NjZW5lKCk7XG4gICAgfVxufSIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL3ZpZXdcIjtcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvYXBwLW1hbmFnZXJcIjtcbmltcG9ydCB7IENvbnRhaW5lciwgR3JhcGhpY3MsIFNwcml0ZSwgVGV4dCB9IGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBHYW1lU2NlbmUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ2FtZS1zY2VuZVwiO1xuXG5leHBvcnQgY2xhc3MgR2FtZUluaXRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgcHJvdGVjdGVkIGdhbWVTY2VuZTogR2FtZVNjZW5lO1xuXG4gICAgcHVibGljIGRyYXdTY2VuZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3QmcoKTtcbiAgICAgICAgdGhpcy5kcmF3VGl0bGUoKTtcblxuICAgICAgICB0aGlzLmdhbWVTY2VuZSA9IG5ldyBHYW1lU2NlbmUoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKHRoaXMuZ2FtZVNjZW5lKTtcblxuICAgICAgICBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuYXBwLnRpY2tlci5hZGQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nYW1lU2NlbmUudXBkYXRlKCk7XG4gICAgICAgIH0pOyAgXG4gICAgfVxuIFxuICAgIHByb3RlY3RlZCBkcmF3VGl0bGUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRleHQ6IFRleHQgPSBuZXcgVGV4dCgnR2FtZSBTY2VuZScpO1xuICAgICAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGV4dC54ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lV2lkdGgoKSAvIDI7XG4gICAgICAgIHRleHQueSA9IEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2VuZUhlaWdodCgpIC8gMjtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKHRleHQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkcmF3QmcoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGJnOiBHcmFwaGljcyA9IG5ldyBHcmFwaGljcygpO1xuICAgICAgICBiZy5iZWdpbkZpbGwoMHhERTMyNDkpO1xuICAgICAgICBiZy5kcmF3UmVjdCgwLCAwLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVXaWR0aCgpLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVIZWlnaHQoKSk7XG4gICAgICAgIGJnLmVuZEZpbGwoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKGJnKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTWFwLCBNYXBJdGVtVHlwZSB9IGZyb20gXCIuL21hcFwiO1xuaW1wb3J0IHsgTWFwSXRlbSB9IGZyb20gXCIuL21hcC1pdGVtXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBVbml0LCBVbml0VHlwZXMgfSBmcm9tIFwiLi91bml0XCI7XG5pbXBvcnQgeyBFbmVteSB9IGZyb20gXCIuL2VuZW15XCI7XG5pbXBvcnQgeyBCdWxsZXQgfSBmcm9tIFwiLi9idWxsZXRcIjtcbmltcG9ydCB7IHJlc291cmNlcyB9IGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi9mcmFtZXdvcmsvY29yZS9hcHAtbWFuYWdlclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vZ2FtZS9tb2R1bGVzL21pc2MvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBtYXA6IE1hcDtcbiAgICBwdWJsaWMgcGxheWVyOiBVbml0O1xuICAgIHByaXZhdGUgdW5pdHM6IFVuaXRbXSA9IFtdO1xuICAgIHByaXZhdGUgYnVsbGV0czogQnVsbGV0W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3JlYXRlTWFwKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlRW5lbXkoKTtcbiAgICAgICAgdGhpcy5zdGFydEVuZW1pZXNHZW5lcmF0b3IoKTsgIFxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTWFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRleHR1cmUoQ29uZmlnLmFzc2V0c1snd2FsbCddKSlcbiAgICAgICAgdGhpcy5tYXAueCA9IDA7XG4gICAgICAgIHRoaXMubWFwLnkgPSAwO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMubWFwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0RW5lbWllc0dlbmVyYXRvcigpOiB2b2lkIHtcbiAgICAgICAgLy9Ub2RvIG5lZWQgdG8gY2xlYXIgaW50ZXJ2YWwgb24gc2NlbmUgZXhpdFxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUVuZW15KCk7XG4gICAgICAgIH0sIDUwMDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUGxheWVyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB1bml0OiBQbGF5ZXIgPSBuZXcgUGxheWVyKEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZXh0dXJlKENvbmZpZy5hc3NldHNbJ3RhbmsnXSkpO1xuICAgICAgICB1bml0LnggPSB0aGlzLm1hcC53aWR0aCAvIDI7XG4gICAgICAgIHVuaXQueSA9IHRoaXMubWFwLmhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMuZmluaXNoVW5pdENyZWF0aW9uKHVuaXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRW5lbXkoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHVuaXQ6IEVuZW15ID0gbmV3IEVuZW15KEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZXh0dXJlKENvbmZpZy5hc3NldHNbJ2VuZW15J10pKTtcbiAgICAgICAgY29uc3Qgc3Bhd25Qb2ludDogUElYSS5Qb2ludCA9IHRoaXMubWFwLmdldFJhbmRvbVNwYXduUG9pbnQoKTtcbiAgICAgICAgdW5pdC54ID0gc3Bhd25Qb2ludC54O1xuICAgICAgICB1bml0LnkgPSBzcGF3blBvaW50Lnk7XG4gICAgICAgIHRoaXMuZmluaXNoVW5pdENyZWF0aW9uKHVuaXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluaXNoVW5pdENyZWF0aW9uKHVuaXQ6IFVuaXQpOiB2b2lkIHtcbiAgICAgICAgdW5pdC5pc0hpdFRoZVdhbGwgPSAoKSA9PiB0aGlzLm1hcC5jaGVja0NvbGxpc2lvblVuaXRWc1dhbGwodW5pdCk7XG4gICAgICAgIHVuaXQuaXNIaXRUaGVVbml0ID0gKCkgPT4gdGhpcy5jaGVja0NvbGxpc2lvblVuaXRWc1VuaXQodW5pdCk7XG4gICAgICAgIHVuaXQuaXNIaXRUaGVCdWxsZXQgPSAoKSA9PiB0aGlzLmNoZWNrQ29sbGlzaW9uVW5pdFZzQnVsbGV0KHVuaXQpO1xuICAgICAgICB1bml0LnNob290ID0gKCkgPT4gdGhpcy5jcmVhdGVCdWxsZXQodW5pdCk7XG4gICAgICAgIHRoaXMudW5pdHMucHVzaCh1bml0KTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh1bml0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVuaXRzLmZvckVhY2godW5pdCA9PiB1bml0LnVwZGF0ZSgpKTtcbiAgICAgICAgdGhpcy5idWxsZXRzLmZvckVhY2goYnVsbGV0ID0+IGJ1bGxldC51cGRhdGUoKSk7XG4gICAgICAgIC8vdGhpcy5jaGVja0NvbGxpc2lvblVuaXRzVnNXYWxscygpO1xuICAgICAgICAvL3RoaXMuY2hlY2tDb2xsaXNpb25Vbml0c1ZzVW5pdHMoKTtcbiAgICAgICAgLy90aGlzLmNoZWNrQ29sbGlzaW9uVW5pdHNWc0J1bGxldHMoKTtcbiAgICB9ICBcblxuICAgIHB1YmxpYyBjcmVhdGVCdWxsZXQodW5pdDogVW5pdCkge1xuICAgICAgICBjb25zdCBidWxsZXQ6IEJ1bGxldCA9IG5ldyBCdWxsZXQodW5pdCwgQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRleHR1cmUoQ29uZmlnLmFzc2V0c1snYnVsbGV0J10pKTtcbiAgICAgICAgdGhpcy5idWxsZXRzLnB1c2goYnVsbGV0KTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZChidWxsZXQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGVja0NvbGxpc2lvblVuaXRWc1VuaXQodW5pdDogVW5pdCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaGFzQ29sbGlzaW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHRoaXMudW5pdHMuZm9yRWFjaChvdGhlclVuaXQgPT4ge1xuICAgICAgICAgICAgaWYgKHVuaXQgPT09IG90aGVyVW5pdCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKFV0aWxzLmNoZWNrRm9yQ29sbGlzaW9uKHVuaXQsIG90aGVyVW5pdCwgMjApKSBoYXNDb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhhc0NvbGxpc2lvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tDb2xsaXNpb25Vbml0VnNCdWxsZXQodW5pdDogVW5pdCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaGFzQ29sbGlzaW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYnVsbGV0cy5mb3JFYWNoKGJ1bGxldCA9PiB7XG4gICAgICAgICAgICBpZiAoYnVsbGV0LnVuaXQgPT09IHVuaXQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChVdGlscy5jaGVja0ZvckNvbGxpc2lvbih1bml0LCBidWxsZXQsIDIwKSkge1xuICAgICAgICAgICAgICAgIGhhc0NvbGxpc2lvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXRzID0gdGhpcy5idWxsZXRzLmZpbHRlcihiID0+IGIgIT09IGJ1bGxldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZChidWxsZXQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51bml0cyA9IHRoaXMudW5pdHMuZmlsdGVyKHUgPT4gdSAhPT0gdW5pdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh1bml0KTtcbiAgICAgICAgICAgICAgICAvL3VuaXQuaGFuZGxlQnVsbGV0Q29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgLy91bml0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvL2J1bGxldC5oYW5kbGVDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBoYXNDb2xsaXNpb247XG4gICAgfVxufSIsImltcG9ydCB7IE1hcEl0ZW0gfSBmcm9tIFwiLi9tYXAtaXRlbVwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgVW5pdCB9IGZyb20gXCIuL3VuaXRcIjtcblxuZXhwb3J0IGVudW0gTWFwSXRlbVR5cGUge1xuICAgIFN0b25lV2FsbCA9IDEsXG4gICAgQnJpY2tXYWxsID0gMixcbiAgICBFbmVteVNwYXduUG9pbnQgPSA5LFxufVxuXG5leHBvcnQgY2xhc3MgTWFwIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xuICAgIFxuICAgIC8vIDI1eDI1XG4gICAgcHJpdmF0ZSBtYXA6IG51bWJlcltdID0gW1xuICAgICAgICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuICAgICAgICAxLCA5LCAxLCAgLCAgLCAgLCAxLCA5LCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLCA5LCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgMSwgLCAgLCAgLCAgLCAgLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAxLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLCAxLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuICAgIF1cblxuICAgIHB1YmxpYyBpdGVtczogTWFwSXRlbVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZXh0dXJlOiBQSVhJLlRleHR1cmUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pbml0Vmlldyh0ZXh0dXJlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KHRleHR1cmU6IFBJWEkuVGV4dHVyZSk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1ICogMjA7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBibG9ja1kgPSBNYXRoLmZsb29yKGkgLyAyNSk7IFxuICAgICAgICAgICAgY29uc3QgYmxvY2tYID0gaSAtIDI1ICogYmxvY2tZO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5tYXBbaV0gPT09IE1hcEl0ZW1UeXBlLlN0b25lV2FsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcEl0ZW06IE1hcEl0ZW0gPSBuZXcgTWFwSXRlbSh0ZXh0dXJlLCB0aGlzLm1hcFtpXSk7ICAgIFxuICAgICAgICAgICAgICAgIG1hcEl0ZW0ueCA9IGJsb2NrWCAqIG1hcEl0ZW0udmlydHVhbFNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgbWFwSXRlbS55ID0gYmxvY2tZICogbWFwSXRlbS52aXJ0dWFsU2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG1hcEl0ZW0pXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChtYXBJdGVtKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1hcFtpXSA9PT0gTWFwSXRlbVR5cGUuRW5lbXlTcGF3blBvaW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwSXRlbTogTWFwSXRlbSA9IG5ldyBNYXBJdGVtKG51bGwsIHRoaXMubWFwW2ldKTsgICAgXG4gICAgICAgICAgICAgICAgbWFwSXRlbS54ID0gYmxvY2tYICogbWFwSXRlbS52aXJ0dWFsU2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICBtYXBJdGVtLnkgPSBibG9ja1kgKiBtYXBJdGVtLnZpcnR1YWxTaXplLmhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobWFwSXRlbSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmFuZG9tU3Bhd25Qb2ludCgpOiBQSVhJLlBvaW50IHtcbiAgICAgICAgY29uc3QgcG9pbnRzOiBQSVhJLlBvaW50W10gPSBbXTtcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gTWFwSXRlbVR5cGUuRW5lbXlTcGF3blBvaW50KSBwb2ludHMucHVzaChuZXcgUElYSS5Qb2ludChpdGVtLngsIGl0ZW0ueSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcG9pbnRzW1V0aWxzLnJhbmRvbUludCgwLCBwb2ludHMubGVuZ3RoIC0xKV07XG4gICAgfVxuXG4gICAgcHVibGljIGNoZWNrQ29sbGlzaW9uVW5pdFZzV2FsbCh1bml0OiBVbml0KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBoYXNDb2xsaXNpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKHdhbGwgPT4ge1xuICAgICAgICAgICAgaWYgKHdhbGwudHlwZSA9PT0gTWFwSXRlbVR5cGUuRW5lbXlTcGF3blBvaW50KSByZXR1cm47XG4gICAgICAgICAgICBpZiAoVXRpbHMuY2hlY2tGb3JDb2xsaXNpb24od2FsbCwgdW5pdCwgMjApKSBoYXNDb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhhc0NvbGxpc2lvbjtcbiAgICB9XG59IiwiaW1wb3J0IHsgTWFwSXRlbVR5cGUgfSBmcm9tIFwiLi9tYXBcIjtcblxuZXhwb3J0IGNsYXNzIE1hcEl0ZW0gZXh0ZW5kcyBQSVhJLlNwcml0ZSB7XG4gICAgcHVibGljIHR5cGU6IE1hcEl0ZW1UeXBlO1xuICAgIHB1YmxpYyB2aXJ0dWFsU2l6ZTogYW55ID0ge1xuICAgICAgICB3aWR0aDogMzYsXG4gICAgICAgIGhlaWdodDogMzZcbiAgICB9OyBcblxuICAgIGNvbnN0cnVjdG9yKHRleHR1cmU6IFBJWEkuVGV4dHVyZSwgdHlwZTogTWFwSXRlbVR5cGUpIHtcbiAgICAgICAgc3VwZXIodGV4dHVyZSk7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgfVxufSIsImltcG9ydCB7IFVuaXRTdGF0ZSB9IGZyb20gXCIuL3VuaXQtc3RhdGVcIjtcbmltcG9ydCB7IFVuaXQsIFVuaXRUeXBlcyB9IGZyb20gXCIuL3VuaXRcIjtcbmltcG9ydCB7IEZTTSB9IGZyb20gXCIuL2ZyYW1ld29yay9jb3JlL2ZzbS9mc21cIjtcbmltcG9ydCB7IEVuZW15SWRsZVN0YXRlIH0gZnJvbSBcIi4vZW5lbXktaWRsZS1zdGF0ZVwiO1xuaW1wb3J0IHsgRW5lbXlNb3ZlU3RhdGUgfSBmcm9tIFwiLi9lbmVteS1tb3ZlLXN0YXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBFbmVteSBleHRlbmRzIFVuaXQge1xuICAgIHByaXZhdGUgc2hvb3RpbmdJbnRlcnZhbDogYW55O1xuXG4gICAgY29uc3RydWN0b3IodGV4dHVyZTogUElYSS5UZXh0dXJlKSB7XG4gICAgICAgIHN1cGVyKHRleHR1cmUpO1xuICAgICAgICB0aGlzLnR5cGUgPSBVbml0VHlwZXMuRW5lbXk7XG4gICAgICAgIHRoaXMuZnNtID0gbmV3IEZTTSh7XG4gICAgICAgICAgICBpZGxlOiBuZXcgRW5lbXlJZGxlU3RhdGUodGhpcyksXG4gICAgICAgICAgICBtb3ZlOiBuZXcgRW5lbXlNb3ZlU3RhdGUodGhpcylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zaG9vdGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICB9XG5cbiAgICBcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBzdXBlci51cGRhdGUoKTtcblxuICAgICAgICBpZiAodGhpcy5pc0hpdFRoZUJ1bGxldCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZW5lbXkgZGllZCcpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnNob290aW5nSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IFVuaXRJZGxlU3RhdGUgfSBmcm9tIFwiLi91bml0LWlkbGUtc3RhdGVcIjtcblxuZXhwb3J0IGNsYXNzIEVuZW15SWRsZVN0YXRlIGV4dGVuZHMgVW5pdElkbGVTdGF0ZSB7XG4gICAgcHVibGljIGV4ZWN1dGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5pdC5mc20udHJhbnNpdGlvbignbW92ZScpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZSgpOiB2b2lkIHtcbiAgICB9XG59IiwiaW1wb3J0IHsgVW5pdFN0YXRlIH0gZnJvbSBcIi4vdW5pdC1zdGF0ZVwiO1xuaW1wb3J0IHsgVW5pdCwgTW92ZURpcmVjdGlvbnMgfSBmcm9tIFwiLi91bml0XCI7XG5pbXBvcnQgeyBVbml0SWRsZVN0YXRlIH0gZnJvbSBcIi4vdW5pdC1pZGxlLXN0YXRlXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBVbml0TW92ZVN0YXRlIH0gZnJvbSBcIi4vdW5pdC1tb3ZlLXN0YXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBFbmVteU1vdmVTdGF0ZSBleHRlbmRzIFVuaXRNb3ZlU3RhdGUge1xuICAgIHB1YmxpYyBzcGVlZCA9IDI7XG4gICAgcHJpdmF0ZSBoaXRzQnlEaXJlY3Rpb246IGFueVtdID0gW1xuICAgICAgICB7IGRpcmVjdGlvbjogTW92ZURpcmVjdGlvbnMuVXAsIGhpdHM6IDAgfSxcbiAgICAgICAgeyBkaXJlY3Rpb246IE1vdmVEaXJlY3Rpb25zLkRvd24sIGhpdHM6IDAgfSxcbiAgICAgICAgeyBkaXJlY3Rpb246IE1vdmVEaXJlY3Rpb25zLkxlZnQsIGhpdHM6IDAgfSxcbiAgICAgICAgeyBkaXJlY3Rpb246IE1vdmVEaXJlY3Rpb25zLlJpZ2h0LCBoaXRzOiAwIH0sXG4gICAgXTtcblxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcblxuICAgICAgICAvLyBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmNoYW5nZURpcmVjdGlvblRvUmFuZG9tKCk7XG4gICAgICAgIC8vIH0sIDMwMDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBleGVjdXRlKCk6IHZvaWQge1xuICAgICAgICAvL3N1cGVyLmV4ZWN1dGUoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmhpdHNCeURpcmVjdGlvbik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vdmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUhpdHNCeURpcmVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oaXRzQnlEaXJlY3Rpb24ubWFwKGl0ZW0gPT4geyBcbiAgICAgICAgICAgIGlmIChpdGVtLmRpcmVjdGlvbiA9PT0gdGhpcy5tb3ZlRGlyZWN0aW9uKSBpdGVtLmhpdHMrK1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVXYWxsQ29sbGlzaW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZUhpdHNCeURpcmVjdGlvbigpO1xuICAgICAgICBzdXBlci5oYW5kbGVXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uVG9PcHBvc2l0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVVbml0Q29sbGlzaW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZUhpdHNCeURpcmVjdGlvbigpO1xuICAgICAgICBzdXBlci5oYW5kbGVVbml0Q29sbGlzaW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uVG9PcHBvc2l0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGFuZ2VEaXJlY3Rpb25Ub09wcG9zaXRlKCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuaGl0c0J5RGlyZWN0aW9uLnNvcnQoKGEsIGIpID0+IGEuaGl0cyAtIGIuaGl0cyk7XG4gICAgICAgIGlmICh0aGlzLmhpdHNCeURpcmVjdGlvblt0aGlzLmhpdHNCeURpcmVjdGlvbi5sZW5ndGggLSAxXS5oaXRzID4gMikge1xuICAgICAgICAgICAgdGhpcy5tb3ZlRGlyZWN0aW9uID0gdGhpcy5oaXRzQnlEaXJlY3Rpb25bMF0uZGlyZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5oaXRzQnlEaXJlY3Rpb24gPSB0aGlzLmhpdHNCeURpcmVjdGlvbi5tYXAoaXRlbSA9PiAoeyAuLi5pdGVtLCBoaXRzOiAwIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW92ZURpcmVjdGlvbiA9IHRoaXMubW92ZURpcmVjdGlvbiAqIC0xO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuaGl0c0J5RGlyZWN0aW9uKTtcbiAgICAgICBcbiAgICAgICAgLy90aGlzLm1vdmVEaXJlY3Rpb24gPSB0aGlzLm1vdmVEaXJlY3Rpb24gKiAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hhbmdlRGlyZWN0aW9uVG9SYW5kb20oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGtleSA9IFV0aWxzLnJhbmRvbUludCgwLCAzKTtcbiAgICAgICAgaWYgKGtleSA9PT0gMCkgdGhpcy5tb3ZlRGlyZWN0aW9uID0gTW92ZURpcmVjdGlvbnMuVXA7XG4gICAgICAgIGlmIChrZXkgPT09IDEpIHRoaXMubW92ZURpcmVjdGlvbiA9IE1vdmVEaXJlY3Rpb25zLkRvd247XG4gICAgICAgIGlmIChrZXkgPT09IDIpIHRoaXMubW92ZURpcmVjdGlvbiA9IE1vdmVEaXJlY3Rpb25zLkxlZnQ7XG4gICAgICAgIGlmIChrZXkgPT09IDMpIHRoaXMubW92ZURpcmVjdGlvbiA9IE1vdmVEaXJlY3Rpb25zLlJpZ2h0O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBVbml0U3RhdGUgfSBmcm9tIFwiLi91bml0LXN0YXRlXCI7XG5pbXBvcnQgeyBVbml0SWRsZVN0YXRlIH0gZnJvbSBcIi4vdW5pdC1pZGxlLXN0YXRlXCI7XG5pbXBvcnQgeyBNYXAgfSBmcm9tIFwiLi9tYXBcIjtcbi8vaW1wb3J0IHsgVW5pdE1vdmluZ1N0YXRlIH0gZnJvbSBcIi4vdW5pdC1tb3ZlLXN0YXRlXCI7XG5pbXBvcnQgeyBVbml0LCBVbml0VHlwZXMsIE1vdmVEaXJlY3Rpb25zIH0gZnJvbSBcIi4vdW5pdFwiO1xuXG5leHBvcnQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgUElYSS5Db250YWluZXIge1xuICAgIHB1YmxpYyB1bml0OiBVbml0O1xuICAgIHB1YmxpYyBtb3ZlRGlyZWN0aW9uOiBNb3ZlRGlyZWN0aW9ucztcbiAgICBwdWJsaWMgc3BlZWQgPSA4O1xuICAgIHB1YmxpYyB2aXJ0dWFsU2l6ZTogYW55ID0ge1xuICAgICAgICB3aWR0aDogNSxcbiAgICAgICAgaGVpZ2h0OiA1XG4gICAgfTsgXG5cbiAgICBwdWJsaWMgc2tpbjogUElYSS5TcHJpdGU7XG5cbiAgICBjb25zdHJ1Y3Rvcih1bml0OiBVbml0LCB0ZXh0dXJlOiBQSVhJLlRleHR1cmUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy51bml0ID0gdW5pdDtcbiAgICAgICAgdGhpcy5tb3ZlRGlyZWN0aW9uID0gdW5pdC5sb29rRGlyZWN0aW9uO1xuICAgICAgICB0aGlzLmluaXRWaWV3KHRleHR1cmUpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Vmlldyh0ZXh0dXJlOiBQSVhJLlRleHR1cmUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5za2luID0gbmV3IFBJWEkuU3ByaXRlKHRleHR1cmUpO1xuICAgICAgICB0aGlzLnNraW4uYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICB0aGlzLnNraW4uc2NhbGUuc2V0KDAuNSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5za2luKTtcbiAgICAgICAgdGhpcy5waXZvdC5zZXQodGhpcy52aXJ0dWFsU2l6ZS53aWR0aCAvIDIgKiAtMSwgdGhpcy52aXJ0dWFsU2l6ZS5oZWlnaHQgLyAyICogLTEpO1xuICAgICAgICB0aGlzLnVuaXQuc2V0QnVsbGV0SW5pdGlhbFBvc2l0aW9uKHRoaXMpOyAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVXYWxsQ29sbGlzaW9uKCk6IHZvaWQge1xuICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVVbml0Q29sbGlzaW9uKCk6IHZvaWQge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5VcCkgdGhpcy55IC09IHRoaXMuc3BlZWQ7XG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJlY3Rpb24gPT09IE1vdmVEaXJlY3Rpb25zLkRvd24pIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5MZWZ0KSB0aGlzLnggLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgaWYgKHRoaXMubW92ZURpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuUmlnaHQpIHRoaXMueCArPSB0aGlzLnNwZWVkO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBVbml0U3RhdGUgfSBmcm9tIFwiLi91bml0LXN0YXRlXCI7XG5pbXBvcnQgeyBVbml0SWRsZVN0YXRlIH0gZnJvbSBcIi4vdW5pdC1pZGxlLXN0YXRlXCI7XG5pbXBvcnQgeyBNYXAgfSBmcm9tIFwiLi9tYXBcIjtcbmltcG9ydCB7IFVuaXRNb3ZlU3RhdGUgfSBmcm9tIFwiLi91bml0LW1vdmUtc3RhdGVcIjtcbmltcG9ydCB7IEZTTSB9IGZyb20gXCIuL2ZyYW1ld29yay9jb3JlL2ZzbS9mc21cIjtcbmltcG9ydCB7IEJ1bGxldCB9IGZyb20gXCIuL2J1bGxldFwiO1xuaW1wb3J0IHsgVW5pdFR5cGVzLCBVbml0IH0gZnJvbSBcIi4vdW5pdFwiO1xuaW1wb3J0IHsgQXBwTWFuYWdlciB9IGZyb20gXCIuL2ZyYW1ld29yay9jb3JlL2FwcC1tYW5hZ2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBVbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHRleHR1cmU6IFBJWEkuVGV4dHVyZSkge1xuICAgICAgICBzdXBlcih0ZXh0dXJlKTtcbiAgICAgICAgdGhpcy50eXBlID0gVW5pdFR5cGVzLlBsYXllcjtcbiAgICAgICAgdGhpcy5mc20gPSBuZXcgRlNNKHtcbiAgICAgICAgICAgIGlkbGU6IG5ldyBVbml0SWRsZVN0YXRlKHRoaXMpLFxuICAgICAgICAgICAgbW92ZTogbmV3IFVuaXRNb3ZlU3RhdGUodGhpcylcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNIaXRUaGVCdWxsZXQoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BsYXllciBkaWVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBrZXlzID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtleXM7XG4gICAgICAgIC8vY29uc29sZS5sb2coa2V5cyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoa2V5c1snU3BhY2UnXSkge1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICAgICAgLy90aGlzLnVuaXQuZnNtLnRyYW5zaXRpb24oJ2lkbGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwiaW1wb3J0IHsgRlNNIH0gZnJvbSBcIi4vZnJhbWV3b3JrL2NvcmUvZnNtL2ZzbVwiO1xuaW1wb3J0IHsgQnVsbGV0IH0gZnJvbSBcIi4vYnVsbGV0XCI7XG5cbmV4cG9ydCBlbnVtIFVuaXRUeXBlcyB7XG4gICAgUGxheWVyLFxuICAgIEVuZW15XG59XG5cbmV4cG9ydCBlbnVtIE1vdmVEaXJlY3Rpb25zIHtcbiAgICBVcCA9IDEsXG4gICAgRG93biA9IC0xLFxuICAgIExlZnQgPSAyLFxuICAgIFJpZ2h0ID0gLTJcbiAgfVxuXG5leHBvcnQgY2xhc3MgVW5pdCBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcbiAgICBwdWJsaWMgdHlwZTogVW5pdFR5cGVzO1xuICAgIHB1YmxpYyBmc206IEZTTTtcbiAgICBwdWJsaWMgdmlydHVhbFNpemU6IGFueSA9IHtcbiAgICAgICAgd2lkdGg6IDM2LFxuICAgICAgICBoZWlnaHQ6IDM2XG4gICAgfTsgXG5cbiAgICBwdWJsaWMgbG9va0RpcmVjdGlvbjogTW92ZURpcmVjdGlvbnMgPSBNb3ZlRGlyZWN0aW9ucy5VcDtcbiAgICBwdWJsaWMgaXNIaXRUaGVXYWxsOiBGdW5jdGlvbjtcbiAgICBwdWJsaWMgaXNIaXRUaGVVbml0OiBGdW5jdGlvbjtcbiAgICBwdWJsaWMgaXNIaXRUaGVCdWxsZXQ6IEZ1bmN0aW9uO1xuICAgIHB1YmxpYyBzaG9vdDogRnVuY3Rpb247XG4gICAgcHVibGljIHNraW46IFBJWEkuU3ByaXRlO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHRleHR1cmU6IFBJWEkuVGV4dHVyZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmluaXRWaWV3KHRleHR1cmUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcodGV4dHVyZTogUElYSS5UZXh0dXJlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2tpbiA9IG5ldyBQSVhJLlNwcml0ZSh0ZXh0dXJlKTtcbiAgICAgICAgdGhpcy5za2luLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNraW4pO1xuICAgICAgICB0aGlzLnBpdm90LnNldCh0aGlzLnZpcnR1YWxTaXplLndpZHRoIC8gMiAqIC0xLCB0aGlzLnZpcnR1YWxTaXplLmhlaWdodCAvIDIgKiAtMSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEJ1bGxldEluaXRpYWxQb3NpdGlvbihidWxsZXQ6IEJ1bGxldCk6IHZvaWQge1xuICAgICAgICBidWxsZXQueCA9IHRoaXMueCArIHRoaXMudmlydHVhbFNpemUud2lkdGggLyAyO1xuICAgICAgICBidWxsZXQueSA9IHRoaXMueSArIHRoaXMudmlydHVhbFNpemUuaGVpZ2h0IC8gMjtcbiAgICAgICAgaWYgKHRoaXMubG9va0RpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuVXApIGJ1bGxldC55ID0gdGhpcy55OyAgICBcbiAgICAgICAgaWYgKHRoaXMubG9va0RpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuRG93bikgYnVsbGV0LnkgPSB0aGlzLnkgKyB0aGlzLnZpcnR1YWxTaXplLmhlaWdodDtcbiAgICAgICAgaWYgKHRoaXMubG9va0RpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuTGVmdCkgYnVsbGV0LnggPSB0aGlzLng7ICBcbiAgICAgICAgaWYgKHRoaXMubG9va0RpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuUmlnaHQpIGJ1bGxldC54ID0gdGhpcy54ICsgdGhpcy52aXJ0dWFsU2l6ZS53aWR0aDtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgaGFuZGxlV2FsbENvbGxpc2lvbigpOiB2b2lkIHtcbiAgICAvLyAgICAgdGhpcy5zdGF0ZS5oYW5kbGVXYWxsQ29sbGlzaW9uKCk7XG4gICAgLy8gfVxuXG4gICAgcHVibGljIGhhbmRsZVVuaXRDb2xsaXNpb24oKTogdm9pZCB7XG4gICAgICAgIC8vdGhpcy5zdGF0ZS5oYW5kbGVVbml0Q29sbGlzaW9uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUJ1bGxldENvbGxpc2lvbigpOiB2b2lkIHtcbiAgICAgICAgLy9OZWVkIHRvIGNsZWFyIGludGVydmFsIGZvciBidWxsZXRzXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mc20uc3RlcCgpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tSW50IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgICB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0ZvckNvbGxpc2lvbihhOiBhbnksIGI6IGFueSwgc2l6ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoTWF0aC5hYnMoYS54IC0gYi54KSA8PSBzaXplICYmIE1hdGguYWJzKGEueSAtIGIueSkgPD0gc2l6ZSk7XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=