(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("PIXI"));
	else if(typeof define === 'function' && define.amd)
		define("typescript_intro", ["PIXI"], factory);
	else if(typeof exports === 'object')
		exports["typescript_intro"] = factory(require("PIXI"));
	else
		root["typescript_intro"] = factory(root["PIXI"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
            //resolution: window.devicePixelRatio,
            backgroundColor: 0xFFFFFF
        });
        document.body.appendChild(this.app.view);
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    };
    AppManager.prototype.getTexture = function (name) {
        return this.resources[name].texture;
    };
    AppManager.prototype.getSpriteTextures = function (spriteName, framesCount, frameWidth, frameHeight) {
        var frames = [];
        var spriteSheet = new PIXI.BaseTexture(this.resources[spriteName].url);
        for (var i = 0; i < framesCount; i++) {
            var texture = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight));
            frames.push(texture);
        }
        return frames;
    };
    AppManager.prototype.handleKeyDown = function (event) {
        this.keys[event.code] = true;
    };
    AppManager.prototype.handleKeyUp = function (event) {
        this.keys[event.code] = false;
    };
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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
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
var mvc_entity_1 = __webpack_require__(15);
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
     * Sends the notification to all subscribed entities
     */
    Controller.prototype.sendNotification = function (name, body) {
        console.log('sendNotification: ', name, body);
        this.mvc.sendNotification(name, body);
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
/* 3 */
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
var gsap_1 = __importDefault(__webpack_require__(7));
var pixi_js_1 = __webpack_require__(1);
var app_manager_1 = __webpack_require__(0);
var mvc_entity_1 = __webpack_require__(15);
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.display = new pixi_js_1.Container();
        return _this;
    }
    /**
     * Called when object is created
     */
    View.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
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
    View.prototype.getSpriteTextures = function (spriteName, framesCount, frameWidth, frameHeight) {
        return app_manager_1.AppManager.getInstance().getSpriteTextures(spriteName, framesCount, frameWidth, frameHeight);
    };
    return View;
}(mvc_entity_1.MVCEntity));
exports.View = View;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameObjectTypes;
(function (GameObjectTypes) {
    GameObjectTypes[GameObjectTypes["Player"] = 0] = "Player";
    GameObjectTypes[GameObjectTypes["Enemy"] = 1] = "Enemy";
    GameObjectTypes[GameObjectTypes["Eagle"] = 2] = "Eagle";
    GameObjectTypes[GameObjectTypes["Bullet"] = 3] = "Bullet";
    GameObjectTypes[GameObjectTypes["StoneWall"] = 4] = "StoneWall";
    GameObjectTypes[GameObjectTypes["BrickWall"] = 5] = "BrickWall";
    GameObjectTypes[GameObjectTypes["EnemySpawnPoint"] = 6] = "EnemySpawnPoint";
    GameObjectTypes[GameObjectTypes["PlayerSpawnPoint"] = 7] = "PlayerSpawnPoint";
    GameObjectTypes[GameObjectTypes["Water"] = 8] = "Water";
    GameObjectTypes[GameObjectTypes["Tree"] = 9] = "Tree";
    GameObjectTypes[GameObjectTypes["Bonus"] = 10] = "Bonus";
})(GameObjectTypes = exports.GameObjectTypes || (exports.GameObjectTypes = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameNotifications = /** @class */ (function () {
    function GameNotifications() {
    }
    GameNotifications.SCENE = "GAME_SCENE";
    GameNotifications.MAIN = "GAME_MAIN";
    GameNotifications.CREATE_BULLET = "GAME_MAIN_CREATE_BULLET";
    GameNotifications.UI_UPDATE = "GAME_UI_UPDATE";
    GameNotifications.UI = "GAME_UI";
    return GameNotifications;
}());
exports.GameNotifications = GameNotifications;
var GameModels = /** @class */ (function () {
    function GameModels() {
    }
    GameModels.GAME = "GAME_MODEL";
    return GameModels;
}());
exports.GameModels = GameModels;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_manager_1 = __webpack_require__(0);
var GameObject = /** @class */ (function () {
    function GameObject() {
        this.canCollide = true;
        this.isDestroyed = false;
    }
    /**
     * Place to initialize view and other properties
     */
    GameObject.prototype.init = function (args) {
    };
    GameObject.prototype.initView = function (viewClass, object) {
        this.view = new viewClass();
        this.view.init(object);
    };
    GameObject.prototype.destroy = function () {
        this.onDestroy();
        if (this.view) {
            this.view.destroy();
        }
        this.isDestroyed = true;
    };
    GameObject.prototype.update = function () {
    };
    Object.defineProperty(GameObject.prototype, "size", {
        get: function () {
            return this.view.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () {
            return this.view.x;
        },
        set: function (value) {
            this.view.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () {
            return this.view.y;
        },
        set: function (value) {
            this.view.y = value;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    GameObject.prototype.addToStage = function (holder) {
        holder.addChild(this.view.display);
    };
    GameObject.prototype.getInput = function () {
        return app_manager_1.AppManager.getInstance().keys;
    };
    /**
     * Checks for collision with other object. If true - calls both objects collision handler methods
     */
    GameObject.prototype.checkCollisionWith = function (object) {
        // Object can be destoryed but still present in current update list
        if (this.isDestroyed || object.isDestroyed)
            return;
        // Object can be in state when he is not collidable (dying, spawning etc)
        if (!this.canCollide || !object.canCollide)
            return;
        // No need to check collision btween the same object
        if (this === object)
            return;
        // Checks for collision, true means there is no collision 
        if (this.y > object.y + object.size.height || this.x + this.size.width < object.x || this.y + this.size.height < object.y || this.x > object.x + object.size.width) {
            return;
        }
        this.handleCollisionWith(object);
        object.handleCollisionWith(this);
    };
    /**
     * Called when there is a collision with other object
     */
    GameObject.prototype.handleCollisionWith = function (object) {
    };
    return GameObject;
}());
exports.GameObject = GameObject;
var MoveDirections;
(function (MoveDirections) {
    MoveDirections[MoveDirections["Up"] = 1] = "Up";
    MoveDirections[MoveDirections["Down"] = -1] = "Down";
    MoveDirections[MoveDirections["Left"] = 2] = "Left";
    MoveDirections[MoveDirections["Right"] = -2] = "Right";
})(MoveDirections = exports.MoveDirections || (exports.MoveDirections = {}));


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.sceneWidth = 1024;
    Config.sceneHeight = 768;
    Config.preloaderAassets = {
        loaderBg: "assets/loader-bar/loader-bg.png",
        loaderBar: "assets/loader-bar/loader-bar.png",
    };
    Config.assets = {
        tank: 'assets/tanks/tank.png',
        enemy1: 'assets/tanks/enemy_red.png',
        enemy2: 'assets/tanks/enemy_white.png',
        enemy3: 'assets/tanks/enemy_blue.png',
        eagle: 'assets/board/eagle.png',
        stoneWall: 'assets/board/wall.png',
        brickWall: 'assets/board/small_wall_1.png',
        tree: 'assets/board/leaves.png',
        water: 'assets/board/water.png',
        bullet: 'assets/bullet.png',
        enemyBullet: 'assets/enemy_bullet.png',
        explode: 'assets/explode.png',
        appear: 'assets/appear.png'
    };
    return Config;
}());
exports.Config = Config;
;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mvc_1 = __webpack_require__(14);
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
/* 10 */
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
var state_1 = __webpack_require__(46);
var unit_1 = __webpack_require__(11);
var UnitState = /** @class */ (function (_super) {
    __extends(UnitState, _super);
    function UnitState(args) {
        var _this = _super.call(this, args) || this;
        _this.unit = args;
        return _this;
    }
    Object.defineProperty(UnitState.prototype, "view", {
        get: function () {
            return this.unit.view;
        },
        enumerable: true,
        configurable: true
    });
    UnitState.prototype.enter = function () {
        this.unit.canCollide = true;
    };
    UnitState.prototype.stop = function () {
        this.unit.fsm.transition(unit_1.UnitStates.Idle);
    };
    UnitState.prototype.move = function (direction) {
        this.unit.fsm.transition(unit_1.UnitStates.Move);
    };
    UnitState.prototype.shoot = function () {
        this.unit.onShoot(this.view.getBulletParams());
    };
    UnitState.prototype.handleCollisionWithMapItem = function (object) {
    };
    UnitState.prototype.handleCollisionWithOtherUnit = function (object) {
    };
    UnitState.prototype.handleCollisionWithBullet = function (bullet) {
        // Prevent enemies from killing each other
        if (bullet.owner.type === this.unit.type)
            return;
        this.unit.fsm.transition(unit_1.UnitStates.Die);
    };
    return UnitState;
}(state_1.State));
exports.UnitState = UnitState;


/***/ }),
/* 11 */
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
var gsap_1 = __importDefault(__webpack_require__(7));
var fsm_1 = __webpack_require__(47);
var game_object_1 = __webpack_require__(6);
var game_object_types_1 = __webpack_require__(4);
var UnitStates;
(function (UnitStates) {
    UnitStates[UnitStates["Spawn"] = 0] = "Spawn";
    UnitStates[UnitStates["Idle"] = 1] = "Idle";
    UnitStates[UnitStates["Move"] = 2] = "Move";
    UnitStates[UnitStates["Die"] = 3] = "Die";
})(UnitStates = exports.UnitStates || (exports.UnitStates = {}));
var Unit = /** @class */ (function (_super) {
    __extends(Unit, _super);
    function Unit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canShoot = true;
        return _this;
    }
    Unit.prototype.init = function () {
        this.fsm = new fsm_1.FSM();
    };
    Object.defineProperty(Unit.prototype, "state", {
        get: function () {
            return this.fsm.state;
        },
        enumerable: true,
        configurable: true
    });
    Unit.prototype.shoot = function () {
        var _this = this;
        if (!this.canShoot)
            return;
        this.canShoot = false;
        this.state.shoot();
        if (this.shootingDelayTween) {
            this.shootingDelayTween.kill();
        }
        this.shootingDelayTween = gsap_1.default.delayedCall(this.shootingDelay, function () {
            _this.canShoot = true;
        });
    };
    Unit.prototype.move = function () {
        this.state.move();
    };
    Unit.prototype.handleCollisionWith = function (object) {
        if (this.type === game_object_types_1.GameObjectTypes.Player && object.type === game_object_types_1.GameObjectTypes.Enemy) {
            this.state.handleCollisionWithOtherUnit(object);
        }
        if (object.type === game_object_types_1.GameObjectTypes.Bullet) {
            this.state.handleCollisionWithBullet(object);
        }
        if (object.type === game_object_types_1.GameObjectTypes.BrickWall || object.type === game_object_types_1.GameObjectTypes.StoneWall) {
            this.state.handleCollisionWithMapItem(object);
        }
    };
    Unit.prototype.update = function () {
        this.fsm.step();
    };
    return Unit;
}(game_object_1.GameObject));
exports.Unit = Unit;


/***/ }),
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_manager_1 = __webpack_require__(0);
var global_notifications_1 = __webpack_require__(12);
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
    Mvc.prototype.createController = function (controllerClass, viewClass, layer) {
        var controller = new controllerClass();
        controller.onRegister();
        if (viewClass) {
            controller.view = new viewClass();
            controller.view.controller = controller;
            controller.view.onRegister();
            if (layer) {
                layer.addChild(controller.view.display);
            }
            else {
                app_manager_1.AppManager.getInstance().addLayerToScene(controller.view.display);
            }
            controller.view.postRegister();
        }
        controller.postRegister();
        return controller;
    };
    Mvc.prototype.registerController = function (notificationName, controllerClass, viewClass) {
        var controller = this.createController(controllerClass, viewClass);
        this.controllers[notificationName] = controller;
        // Subscribe itself to notification
        controller.addNotification(notificationName, controller.execute.bind(controller));
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mvc_1 = __webpack_require__(14);
var MVCEntity = /** @class */ (function () {
    function MVCEntity() {
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
    return MVCEntity;
}());
exports.MVCEntity = MVCEntity;


/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pixi_js_1 = __webpack_require__(1);
var app_manager_1 = __webpack_require__(0);
var GameObjectView = /** @class */ (function () {
    function GameObjectView() {
        this.display = new pixi_js_1.Container();
        this.speed = 0;
    }
    GameObjectView.prototype.init = function (object) {
        this.owner = object;
    };
    /**
     * Place to clean up when object is being destoryed
     */
    GameObjectView.prototype.destroy = function () {
        this.display.destroy({ children: true });
    };
    Object.defineProperty(GameObjectView.prototype, "x", {
        get: function () {
            return this.display.x;
        },
        set: function (value) {
            if (!this.display)
                return;
            this.display.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObjectView.prototype, "y", {
        get: function () {
            return this.display.y;
        },
        set: function (value) {
            this.display.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObjectView.prototype, "center", {
        get: function () {
            return new pixi_js_1.Point(this.size.width / 2, this.size.height / 2);
        },
        enumerable: true,
        configurable: true
    });
    GameObjectView.prototype.getTexture = function (name) {
        return app_manager_1.AppManager.getInstance().getTexture(name);
    };
    GameObjectView.prototype.getSpriteTextures = function (spriteName, framesCount, frameWidth, frameHeight) {
        return app_manager_1.AppManager.getInstance().getSpriteTextures(spriteName, framesCount, frameWidth, frameHeight);
    };
    return GameObjectView;
}());
exports.GameObjectView = GameObjectView;


/***/ }),
/* 18 */
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
var unit_state_1 = __webpack_require__(10);
var UnitIdleState = /** @class */ (function (_super) {
    __extends(UnitIdleState, _super);
    function UnitIdleState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnitIdleState.prototype.enter = function () {
        _super.prototype.enter.call(this);
        this.view.playIdleAnimation();
    };
    UnitIdleState.prototype.handleCollisionWithMapItem = function () {
    };
    UnitIdleState.prototype.handleCollisionWithOtherUnit = function () {
    };
    UnitIdleState.prototype.stop = function () {
    };
    return UnitIdleState;
}(unit_state_1.UnitState));
exports.UnitIdleState = UnitIdleState;


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
var unit_state_1 = __webpack_require__(10);
var UnitDieState = /** @class */ (function (_super) {
    __extends(UnitDieState, _super);
    function UnitDieState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnitDieState.prototype.enter = function () {
        var _this = this;
        _super.prototype.enter.call(this);
        this.unit.canCollide = false;
        this.view.playDeathAnimation(function () {
            _this.unit.destroy();
        });
    };
    // Ignoring these actions:
    UnitDieState.prototype.shoot = function () {
    };
    UnitDieState.prototype.handleCollisionWithOtherUnit = function () {
    };
    UnitDieState.prototype.handleCollisionWithBullet = function () {
    };
    UnitDieState.prototype.stop = function () {
    };
    UnitDieState.prototype.move = function (direction) {
    };
    return UnitDieState;
}(unit_state_1.UnitState));
exports.UnitDieState = UnitDieState;


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
var unit_state_1 = __webpack_require__(10);
var UnitMoveState = /** @class */ (function (_super) {
    __extends(UnitMoveState, _super);
    function UnitMoveState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnitMoveState.prototype.enter = function () {
        _super.prototype.enter.call(this);
        this.view.playTurnAnimation();
    };
    UnitMoveState.prototype.move = function (direction) {
        this.view.playTurnAnimation(direction);
        this.view.move();
    };
    UnitMoveState.prototype.handleCollisionWithMapItem = function () {
        this.handleCollision();
    };
    UnitMoveState.prototype.handleCollisionWithOtherUnit = function () {
        this.handleCollision();
    };
    // Bounce back
    UnitMoveState.prototype.handleCollision = function () {
        this.view.playBounceBack();
        this.stop();
    };
    return UnitMoveState;
}(unit_state_1.UnitState));
exports.UnitMoveState = UnitMoveState;


/***/ }),
/* 21 */
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
var unit_state_1 = __webpack_require__(10);
var UnitSpawnState = /** @class */ (function (_super) {
    __extends(UnitSpawnState, _super);
    function UnitSpawnState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnitSpawnState.prototype.enter = function () {
        var _this = this;
        _super.prototype.enter.call(this);
        this.unit.canCollide = false;
        this.view.playSpawnAnimation(function () {
            _this.stop();
        });
    };
    // Ignoring these actions:
    UnitSpawnState.prototype.shoot = function () {
    };
    UnitSpawnState.prototype.handle = function () {
    };
    UnitSpawnState.prototype.handleCollisionWithBullet = function () {
    };
    UnitSpawnState.prototype.move = function (direction) {
    };
    return UnitSpawnState;
}(unit_state_1.UnitState));
exports.UnitSpawnState = UnitSpawnState;


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gsap_1 = __importDefault(__webpack_require__(7));
var utils_1 = __webpack_require__(52);
var config_1 = __webpack_require__(8);
var game_object_1 = __webpack_require__(6);
var game_object_types_1 = __webpack_require__(4);
var game_object_view_1 = __webpack_require__(17);
var UnitView = /** @class */ (function (_super) {
    __extends(UnitView, _super);
    function UnitView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = {
            width: 20,
            height: 20
        };
        return _this;
    }
    UnitView.prototype.init = function (object) {
        _super.prototype.init.call(this, object);
        this.unit = object;
        this.initSkin();
        this.initExplosionAnimation();
        this.initSpawnAnimation();
        this.playTurnAnimation(game_object_1.MoveDirections.Up);
    };
    UnitView.prototype.initSkin = function () {
        var textureName = 'tank';
        if (this.unit.type === game_object_types_1.GameObjectTypes.Enemy) {
            textureName = "enemy" + utils_1.Utils.randomInt(1, 3);
        }
        this.skin = new PIXI.Sprite(this.getTexture(config_1.Config.assets[textureName]));
        this.skin.anchor.set(0.5);
        this.skin.position = this.center;
        this.skin.visible = false;
        this.display.addChild(this.skin);
    };
    UnitView.prototype.initExplosionAnimation = function () {
        this.explosion = new PIXI.AnimatedSprite(this.getSpriteTextures(config_1.Config.assets['explode'], 16, 68, 68));
        this.explosion.anchor.set(0.5);
        this.explosion.position = this.center;
        this.explosion.loop = false;
        this.explosion.visible = false;
        this.display.addChild(this.explosion);
    };
    UnitView.prototype.initSpawnAnimation = function () {
        this.spawn = new PIXI.AnimatedSprite(this.getSpriteTextures(config_1.Config.assets['appear'], 10, 68, 68));
        this.spawn.anchor.set(0.5);
        this.spawn.position = this.center;
        this.spawn.loop = false;
        this.spawn.visible = false;
        this.display.addChild(this.spawn);
    };
    UnitView.prototype.getBulletParams = function () {
        var offset = 25;
        var x = this.x + this.center.x;
        var y = this.y + this.center.y;
        if (this.moveDirection === game_object_1.MoveDirections.Up)
            y = this.y;
        if (this.moveDirection === game_object_1.MoveDirections.Down)
            y = this.y + offset;
        if (this.moveDirection === game_object_1.MoveDirections.Left)
            x = this.x;
        if (this.moveDirection === game_object_1.MoveDirections.Right)
            x = this.x + offset;
        return { owner: this.unit, x: x, y: y, moveDirection: this.moveDirection };
    };
    UnitView.prototype.playTurnAnimation = function (direction) {
        if (direction && direction !== this.moveDirection) {
            this.moveDirection = direction;
        }
        var angle;
        if (this.moveDirection === game_object_1.MoveDirections.Up) {
            if (this.skin.angle === 270)
                this.skin.angle = -90;
            angle = 0;
        }
        if (this.moveDirection === game_object_1.MoveDirections.Down) {
            angle = 180;
        }
        if (this.moveDirection === game_object_1.MoveDirections.Left) {
            if (this.skin.angle === 0)
                this.skin.angle = 360;
            angle = 270;
        }
        if (this.moveDirection === game_object_1.MoveDirections.Right) {
            angle = 90;
        }
        gsap_1.default.to(this.skin, { angle: angle, duration: 0.1 });
    };
    UnitView.prototype.playIdleAnimation = function () {
        gsap_1.default.to(this.skin.scale, { duration: 0.1, x: 1, y: 1 });
    };
    UnitView.prototype.playMoveAnimation = function () {
        gsap_1.default.to(this.skin.scale, { duration: 0.1, x: 0.95, y: 0.95 });
    };
    UnitView.prototype.move = function (extra) {
        if (extra === void 0) { extra = 0; }
        this.playMoveAnimation();
        if (this.moveDirection === game_object_1.MoveDirections.Up)
            this.display.y -= this.unit.speed + extra;
        if (this.moveDirection === game_object_1.MoveDirections.Down)
            this.display.y += this.unit.speed + extra;
        if (this.moveDirection === game_object_1.MoveDirections.Left)
            this.display.x -= this.unit.speed + extra;
        if (this.moveDirection === game_object_1.MoveDirections.Right)
            this.display.x += this.unit.speed + extra;
    };
    UnitView.prototype.changeMoveDirectionToOpposite = function () {
        this.moveDirection = this.moveDirection * -1;
    };
    UnitView.prototype.playBounceBack = function () {
        this.changeMoveDirectionToOpposite();
        this.move(2);
        this.changeMoveDirectionToOpposite();
    };
    UnitView.prototype.playDeathAnimation = function (onComplete) {
        this.explosion.visible = true;
        this.explosion.play();
        this.explosion.onComplete = function () { return onComplete(); };
    };
    UnitView.prototype.playSpawnAnimation = function (onComplete) {
        var _this = this;
        this.spawn.visible = true;
        this.spawn.play();
        this.spawn.onComplete = function () {
            _this.spawn.visible = false;
            _this.skin.visible = true;
            onComplete();
        };
    };
    UnitView.prototype.setPosition = function (x, y) {
        this.display.x = x;
        this.display.y = y;
    };
    return UnitView;
}(game_object_view_1.GameObjectView));
exports.UnitView = UnitView;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
exports.Model = Model;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);


/***/ }),
/* 25 */
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
var preloader_module_1 = __webpack_require__(26);
var entry_point_1 = __webpack_require__(30);
var menu_module_1 = __webpack_require__(33);
var game_module_1 = __webpack_require__(38);
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
var module_1 = __webpack_require__(9);
var preloader_names_1 = __webpack_require__(27);
var preloader_init_controller_1 = __webpack_require__(28);
var preloader_init_view_1 = __webpack_require__(29);
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
/* 27 */
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
var gsap_1 = __webpack_require__(7);
var global_notifications_1 = __webpack_require__(12);
var controller_1 = __webpack_require__(2);
var graphics_engine_names_1 = __webpack_require__(13);
var menu_names_1 = __webpack_require__(16);
var config_1 = __webpack_require__(8);
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
var view_1 = __webpack_require__(3);
var app_manager_1 = __webpack_require__(0);
var pixi_js_1 = __webpack_require__(1);
var config_1 = __webpack_require__(8);
var gsap_1 = __webpack_require__(7);
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphics_engine_module_1 = __webpack_require__(31);
var EntryPoint = /** @class */ (function () {
    function EntryPoint() {
        new graphics_engine_module_1.GraphicsEngineModule();
    }
    return EntryPoint;
}());
exports.EntryPoint = EntryPoint;


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
var module_1 = __webpack_require__(9);
var graphics_engine_loader_controller_1 = __webpack_require__(32);
var graphics_engine_names_1 = __webpack_require__(13);
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
var app_manager_1 = __webpack_require__(0);
var controller_1 = __webpack_require__(2);
var graphics_engine_names_1 = __webpack_require__(13);
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
var module_1 = __webpack_require__(9);
var menu_buttons_controller_1 = __webpack_require__(34);
var menu_init_controller_1 = __webpack_require__(35);
var menu_names_1 = __webpack_require__(16);
var menu_buttons_view_1 = __webpack_require__(36);
var menu_init_view_1 = __webpack_require__(37);
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
var controller_1 = __webpack_require__(2);
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
var controller_1 = __webpack_require__(2);
var game_names_1 = __webpack_require__(5);
var gsap_1 = __webpack_require__(7);
var global_notifications_1 = __webpack_require__(12);
var MenuInitController = /** @class */ (function (_super) {
    __extends(MenuInitController, _super);
    function MenuInitController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuInitController.prototype.execute = function (notification) {
        var _this = this;
        this.showMenu();
        gsap_1.gsap.delayedCall(1, function () {
            // Transition to game scene
            _this.sendNotification(global_notifications_1.GlobalNotifications.TRANSITION_TO_SCENE, game_names_1.GameNotifications.SCENE);
        });
    };
    MenuInitController.prototype.showMenu = function () {
        this.view.drawScene();
    };
    return MenuInitController;
}(controller_1.Controller));
exports.MenuInitController = MenuInitController;


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
var view_1 = __webpack_require__(3);
var app_manager_1 = __webpack_require__(0);
var pixi_js_1 = __webpack_require__(1);
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
var view_1 = __webpack_require__(3);
var app_manager_1 = __webpack_require__(0);
var pixi_js_1 = __webpack_require__(1);
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
var module_1 = __webpack_require__(9);
var game_main_controller_1 = __webpack_require__(43);
var game_names_1 = __webpack_require__(5);
var game_main_view_1 = __webpack_require__(56);
var game_ui_controller_1 = __webpack_require__(59);
var game_ui_view_1 = __webpack_require__(60);
var game_model_1 = __webpack_require__(50);
var GameModule = /** @class */ (function (_super) {
    __extends(GameModule, _super);
    function GameModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameModule.prototype.registerControllers = function () {
        this.addController(game_names_1.GameNotifications.MAIN, game_main_controller_1.GameMainController, game_main_view_1.GameMainView);
        this.addController(game_names_1.GameNotifications.UI, game_ui_controller_1.GameUiController, game_ui_view_1.GameUiView);
        //this.addController(GameNotifications.UNITS, GameUnitsController, GameUnitsView);
        //this.addController(GameNotifications.MAP, GameMapController, GameMapView);
        //this.addController(GameNotifications.BULLETS, GameBulletsController, GameBulletsView);
    };
    GameModule.prototype.registerModels = function () {
        this.addModel(game_names_1.GameModels.GAME, game_model_1.GameModel);
        //this.addModel(GameModels.MAP, GameMapModel);
        //this.addModel(GameModels.UNITS, GameUnitsModel);
        //this.addModel(GameModels.BULLETS, GameBulletsModel);
    };
    GameModule.prototype.registerScenes = function () {
        this.addScene(game_names_1.GameNotifications.SCENE, [
            game_names_1.GameNotifications.MAIN,
            game_names_1.GameNotifications.UI,
        ]);
    };
    return GameModule;
}(module_1.Module));
exports.GameModule = GameModule;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = __webpack_require__(45);
var enemy_1 = __webpack_require__(48);
var game_object_types_1 = __webpack_require__(4);
var UnitsFactory = /** @class */ (function () {
    function UnitsFactory() {
    }
    UnitsFactory.prototype.createPlayer = function () {
        var unit = new player_1.Player();
        unit.init();
        var spawnPoint = this.getSpawnPoint(game_object_types_1.GameObjectTypes.PlayerSpawnPoint);
        unit.setPosition(spawnPoint.x, spawnPoint.y);
        this.onUnitCreate(this.finishUnitCreation(unit));
    };
    UnitsFactory.prototype.createEnemy = function () {
        var unit = new enemy_1.Enemy();
        unit.init();
        var spawnPoint = this.getSpawnPoint(game_object_types_1.GameObjectTypes.EnemySpawnPoint);
        unit.setPosition(spawnPoint.x, spawnPoint.y);
        this.onUnitCreate(this.finishUnitCreation(unit));
    };
    UnitsFactory.prototype.finishUnitCreation = function (unit) {
        var _this = this;
        unit.onShoot = function (params) { return _this.onCreateBullet(params); };
        unit.onDestroy = function () { return _this.onUnitDestroy(unit); };
        return unit;
    };
    return UnitsFactory;
}());
exports.UnitsFactory = UnitsFactory;


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
Object.defineProperty(exports, "__esModule", { value: true });
var game_object_types_1 = __webpack_require__(4);
var game_object_1 = __webpack_require__(6);
var bullet_view_1 = __webpack_require__(41);
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bullet.prototype.init = function (params) {
        _super.prototype.init.call(this);
        this.type = game_object_types_1.GameObjectTypes.Bullet;
        this.owner = params.owner;
        this.initView(bullet_view_1.BulletView, this);
        this.view.createBullet(params);
    };
    Bullet.prototype.destroyBullet = function () {
        var _this = this;
        this.canCollide = false;
        this.view.playExplosionAnimation(function () {
            _this.destroy();
        });
    };
    Bullet.prototype.handleCollisionWith = function (object) {
        if (object.type === game_object_types_1.GameObjectTypes.BrickWall || object.type === game_object_types_1.GameObjectTypes.StoneWall || object.type === game_object_types_1.GameObjectTypes.Eagle) {
            this.destroyBullet();
        }
        if (object.type === game_object_types_1.GameObjectTypes.Bullet) {
            this.destroyBullet();
        }
        if (object.type === game_object_types_1.GameObjectTypes.Enemy && this.owner.type === game_object_types_1.GameObjectTypes.Player) {
            this.destroyBullet();
        }
    };
    Bullet.prototype.update = function () {
        if (this.isDestroyed)
            return;
        this.view.update();
    };
    return Bullet;
}(game_object_1.GameObject));
exports.Bullet = Bullet;


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
var pixi_js_1 = __webpack_require__(1);
var config_1 = __webpack_require__(8);
var app_manager_1 = __webpack_require__(0);
var game_object_1 = __webpack_require__(6);
var game_object_view_1 = __webpack_require__(17);
var BulletView = /** @class */ (function (_super) {
    __extends(BulletView, _super);
    function BulletView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 8;
        _this.size = {
            width: 5,
            height: 5
        };
        return _this;
    }
    BulletView.prototype.init = function (object) {
        _super.prototype.init.call(this, object);
    };
    BulletView.prototype.createBullet = function (params) {
        //const bulletName: string = this.unit.type === UnitTypes.Player ? Config.assets['bullet'] : Config.assets['enemyBullet'];
        var bulletName = config_1.Config.assets['bullet'];
        this.skin = new pixi_js_1.Sprite(app_manager_1.AppManager.getInstance().getTexture(bulletName));
        this.skin.anchor.set(0.5);
        this.skin.scale.set(0.5);
        this.display.addChild(this.skin);
        this.display.x = params.x;
        this.display.y = params.y;
        this.moveDirection = params.moveDirection;
        this.initExplosionAnimation();
    };
    BulletView.prototype.playExplosionAnimation = function (onComplete) {
        this.skin.visible = false;
        this.speed = 0;
        this.explosion.x = this.skin.x;
        this.explosion.y = this.skin.y;
        this.explosion.visible = true;
        this.explosion.play();
        this.explosion.onComplete = function () {
            onComplete();
        };
    };
    BulletView.prototype.initExplosionAnimation = function () {
        this.explosion = new PIXI.AnimatedSprite(app_manager_1.AppManager.getInstance().getSpriteTextures(config_1.Config.assets['explode'], 16, 68, 68));
        this.explosion.anchor.set(0.5);
        this.explosion.scale.set(0.5);
        this.explosion.loop = false;
        this.explosion.visible = false;
        this.display.addChild(this.explosion);
    };
    BulletView.prototype.move = function () {
        if (this.moveDirection === game_object_1.MoveDirections.Up)
            this.y -= this.speed;
        if (this.moveDirection === game_object_1.MoveDirections.Down)
            this.y += this.speed;
        if (this.moveDirection === game_object_1.MoveDirections.Left)
            this.x -= this.speed;
        if (this.moveDirection === game_object_1.MoveDirections.Right)
            this.x += this.speed;
    };
    BulletView.prototype.update = function () {
        this.move();
    };
    return BulletView;
}(game_object_view_1.GameObjectView));
exports.BulletView = BulletView;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_object_types_1 = __webpack_require__(4);
var map_item_1 = __webpack_require__(51);
var MapFactory = /** @class */ (function () {
    function MapFactory() {
        this.mapWidth = 24;
        this.mapHeight = 22;
        this.level = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 9, , , , , , , , , , 9, , , , , , , , , , , 9, 1,
            1, , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , , , , , , , , , , , , , , , , , , , , 1,
            1, , , , 2, 2, 1, 1, 1, 4, 1, 1, 1, 2, 2, 2, 2, 2, 2, , , , , 1,
            1, , , , 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, , , , , , , , 1,
            1, , , , , , , , , , , , , 2, 2, 2, , , , , , , 1, 1,
            1, 2, 2, 1, , , , , , , , , , , , , , , , , , , 1, 1,
            1, , , 1, , , , , , , , , , , , , , , , , , , 1, 1,
            1, , , 1, , , , , , , , , , , , , , , , , , , , 1,
            1, , , 1, , , , , , , , , , , , , , , , , , , , 1,
            1, 3, 3, 3, , , , , , , , , , , , , , , , , , , , 1,
            1, 3, 3, 3, , , , , , , , , , , , , , , , , , , , 1,
            1, , , 1, , , , , , , , , , , , , , , , , , , , 1,
            1, , , 1, , , , , , , , , , , , , , , , , , , , 1,
            1, , , 2, , , , , , , , , , , , , , , , , , , , 1,
            1, , , 1, , , , , , , , , , , , , , , , , , , , 1,
            1, , , 2, , , , , , , 2, 2, 2, , , , , , , , , , , 1,
            1, , , 2, , , , , , 8, 2, 7, 2, , , , , , , , , , , 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ];
    }
    MapFactory.prototype.createMapItems = function () {
        var _this = this;
        var _loop_1 = function (i) {
            if (this_1.level[i] === undefined)
                return "continue";
            var blockY = Math.floor(i / this_1.mapWidth);
            var blockX = i - this_1.mapWidth * blockY;
            var type = void 0;
            if (this_1.level[i] === 1)
                type = game_object_types_1.GameObjectTypes.StoneWall;
            if (this_1.level[i] === 2)
                type = game_object_types_1.GameObjectTypes.BrickWall;
            if (this_1.level[i] === 3)
                type = game_object_types_1.GameObjectTypes.Tree;
            if (this_1.level[i] === 4)
                type = game_object_types_1.GameObjectTypes.Water;
            if (this_1.level[i] === 7)
                type = game_object_types_1.GameObjectTypes.Eagle;
            if (this_1.level[i] === 8)
                type = game_object_types_1.GameObjectTypes.PlayerSpawnPoint;
            if (this_1.level[i] === 9)
                type = game_object_types_1.GameObjectTypes.EnemySpawnPoint;
            var item = new map_item_1.MapItem(type, blockX, blockY);
            item.onDestroy = function () { return _this.onMapItemDestroy(item); };
            this_1.onMapItemCreate(item);
        };
        var this_1 = this;
        for (var i = 0; i < this.mapWidth * this.mapHeight; i++) {
            _loop_1(i);
        }
    };
    return MapFactory;
}());
exports.MapFactory = MapFactory;


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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __webpack_require__(2);
var game_names_1 = __webpack_require__(5);
var app_manager_1 = __webpack_require__(0);
var game_object_types_1 = __webpack_require__(4);
var units_factory_1 = __webpack_require__(39);
var map_factory_1 = __webpack_require__(42);
var bullets_factory_1 = __webpack_require__(44);
var GameMainController = /** @class */ (function (_super) {
    __extends(GameMainController, _super);
    function GameMainController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameMainController.prototype.postRegister = function () {
        this.gameModel = this.retrieveModel(game_names_1.GameModels.GAME);
    };
    GameMainController.prototype.addNotifications = function () {
        this.addNotification(game_names_1.GameNotifications.CREATE_BULLET, this.createBullet.bind(this));
    };
    GameMainController.prototype.execute = function (notification) {
        var _this = this;
        this.view.initScene();
        this.initMap();
        this.initUnits();
        this.initBullets();
        app_manager_1.AppManager.getInstance().app.ticker.add(function () {
            _this.update();
        });
    };
    GameMainController.prototype.initUnits = function () {
        var _this = this;
        this.unitsFactory = new units_factory_1.UnitsFactory();
        this.unitsFactory.onCreateBullet = function (params) {
            _this.sendNotification(game_names_1.GameNotifications.CREATE_BULLET, params);
        };
        this.unitsFactory.onUnitCreate = function (unit) {
            _this.addToView(unit);
            _this.gameModel.addUnit(unit);
        };
        this.unitsFactory.onUnitDestroy = function (unit) {
            _this.gameModel.removeUnit(unit);
            if (unit.type === game_object_types_1.GameObjectTypes.Player) {
                _this.onPlayerDestroy();
            }
        };
        this.unitsFactory.getSpawnPoint = function (type) {
            return _this.gameModel.getSpawnPoint(type);
        };
        this.unitsFactory.createPlayer();
        setInterval(function () {
            if (_this.gameModel.enemiesLeft === 0)
                return;
            _this.unitsFactory.createEnemy();
            _this.sendNotification(game_names_1.GameNotifications.UI_UPDATE);
        }, 2000);
    };
    GameMainController.prototype.onPlayerDestroy = function () {
        this.sendNotification(game_names_1.GameNotifications.UI_UPDATE);
        if (this.gameModel.playerLives === 0) {
            this.gameOver();
            return;
        }
        this.unitsFactory.createPlayer();
    };
    GameMainController.prototype.gameOver = function () {
        console.log('game over');
    };
    GameMainController.prototype.initMap = function () {
        var _this = this;
        var mapFactory = new map_factory_1.MapFactory();
        mapFactory.onMapItemCreate = function (mapItem) {
            // Trees should be above
            if (mapItem.type === game_object_types_1.GameObjectTypes.Tree) {
                _this.addToView(mapItem, true);
            }
            else {
                _this.addToView(mapItem);
            }
            _this.gameModel.addMapItem(mapItem);
        };
        mapFactory.onMapItemDestroy = function (mapItem) {
            if (mapItem.type === game_object_types_1.GameObjectTypes.Eagle) {
                _this.gameOver();
            }
            _this.gameModel.removeMapItem(mapItem);
        };
        mapFactory.createMapItems();
    };
    GameMainController.prototype.initBullets = function () {
        var _this = this;
        this.bulletsFactory = new bullets_factory_1.BulletsFactory();
        this.bulletsFactory.onBulletCreate = function (bullet) {
            _this.addToView(bullet);
            _this.gameModel.addBullet(bullet);
        };
        this.bulletsFactory.onBulletDestroy = function (bullet) {
            _this.gameModel.removeBullet(bullet);
        };
    };
    GameMainController.prototype.createBullet = function (notification) {
        this.bulletsFactory.createBullet(notification.body);
    };
    GameMainController.prototype.update = function () {
        var objects = __spreadArrays(this.gameModel.mapItems, this.gameModel.units, this.gameModel.bullets);
        objects.forEach(function (object) {
            object.update();
            objects.forEach(function (otherObject) {
                object.checkCollisionWith(otherObject);
            });
        });
    };
    GameMainController.prototype.addToView = function (gameObject, placeInFront) {
        if (placeInFront === void 0) { placeInFront = false; }
        gameObject.addToStage(this.view.getDisplay(placeInFront));
    };
    return GameMainController;
}(controller_1.Controller));
exports.GameMainController = GameMainController;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bullet_1 = __webpack_require__(40);
var BulletsFactory = /** @class */ (function () {
    function BulletsFactory() {
    }
    BulletsFactory.prototype.createBullet = function (params) {
        var _this = this;
        var bullet = new bullet_1.Bullet();
        bullet.init(params);
        bullet.onDestroy = function () { return _this.onBulletDestroy(bullet); };
        this.onBulletCreate(bullet);
    };
    return BulletsFactory;
}());
exports.BulletsFactory = BulletsFactory;


/***/ }),
/* 45 */
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
var unit_idle_state_1 = __webpack_require__(18);
var unit_die_state_1 = __webpack_require__(19);
var unit_move_state_1 = __webpack_require__(20);
var unit_spawn_state_1 = __webpack_require__(21);
var unit_view_1 = __webpack_require__(22);
var game_object_types_1 = __webpack_require__(4);
var unit_1 = __webpack_require__(11);
var game_object_1 = __webpack_require__(6);
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Player.prototype.init = function () {
        var _a;
        _super.prototype.init.call(this);
        this.type = game_object_types_1.GameObjectTypes.Player;
        this.shootingDelay = 0.5;
        this.speed = 2;
        this.initView(unit_view_1.UnitView, this);
        this.fsm.registerStates((_a = {},
            _a[unit_1.UnitStates.Spawn] = new unit_spawn_state_1.UnitSpawnState(this),
            _a[unit_1.UnitStates.Idle] = new unit_idle_state_1.UnitIdleState(this),
            _a[unit_1.UnitStates.Move] = new unit_move_state_1.UnitMoveState(this),
            _a[unit_1.UnitStates.Die] = new unit_die_state_1.UnitDieState(this),
            _a));
    };
    Player.prototype.handleInput = function () {
        var keys = this.getInput();
        if (keys['Space']) {
            this.shoot();
        }
        else {
            this.canShoot = true;
        }
        if (!(keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight'])) {
            this.state.stop();
        }
        if (keys['ArrowUp']) {
            this.state.move(game_object_1.MoveDirections.Up);
        }
        else if (keys['ArrowDown']) {
            this.state.move(game_object_1.MoveDirections.Down);
        }
        else if (keys['ArrowLeft']) {
            this.state.move(game_object_1.MoveDirections.Left);
        }
        else if (keys['ArrowRight']) {
            this.state.move(game_object_1.MoveDirections.Right);
        }
    };
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
        this.handleInput();
    };
    return Player;
}(unit_1.Unit));
exports.Player = Player;


/***/ }),
/* 46 */
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FSM = /** @class */ (function () {
    function FSM() {
        this.currentStateId = null;
    }
    FSM.prototype.registerStates = function (states) {
        this.states = states;
        // Transition into the first state
        var stateId = Number(Object.keys(this.states)[0]); // Take the first state as initial 
        this.transition(stateId);
    };
    // Called in main update loop
    FSM.prototype.step = function () {
        this.states[this.currentStateId].execute();
    };
    // Changes the state
    FSM.prototype.transition = function (nextStateId) {
        this.currentStateId = nextStateId;
        this.states[this.currentStateId].enter();
    };
    Object.defineProperty(FSM.prototype, "state", {
        get: function () {
            return this.states[this.currentStateId];
        },
        enumerable: true,
        configurable: true
    });
    return FSM;
}());
exports.FSM = FSM;


/***/ }),
/* 48 */
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
var unit_1 = __webpack_require__(11);
var enemy_move_state_1 = __webpack_require__(49);
var unit_die_state_1 = __webpack_require__(19);
var unit_idle_state_1 = __webpack_require__(18);
var unit_spawn_state_1 = __webpack_require__(21);
var unit_view_1 = __webpack_require__(22);
var game_object_types_1 = __webpack_require__(4);
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Enemy.prototype.init = function () {
        var _a;
        _super.prototype.init.call(this);
        this.type = game_object_types_1.GameObjectTypes.Enemy;
        this.shootingDelay = 2;
        this.speed = 2;
        this.initView(unit_view_1.UnitView, this);
        this.fsm.registerStates((_a = {},
            _a[unit_1.UnitStates.Spawn] = new unit_spawn_state_1.UnitSpawnState(this),
            _a[unit_1.UnitStates.Idle] = new unit_idle_state_1.UnitIdleState(this),
            _a[unit_1.UnitStates.Move] = new enemy_move_state_1.EnemyMoveState(this),
            _a[unit_1.UnitStates.Die] = new unit_die_state_1.UnitDieState(this),
            _a));
    };
    Enemy.prototype.update = function () {
        _super.prototype.update.call(this);
        this.shoot();
        this.move();
    };
    return Enemy;
}(unit_1.Unit));
exports.Enemy = Enemy;


/***/ }),
/* 49 */
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
var game_object_1 = __webpack_require__(6);
var unit_move_state_1 = __webpack_require__(20);
var EnemyMoveState = /** @class */ (function (_super) {
    __extends(EnemyMoveState, _super);
    function EnemyMoveState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Collects the number of collisions with other objects for each direction
        _this.hitsByDirection = [
            { direction: game_object_1.MoveDirections.Up, hits: 0 },
            { direction: game_object_1.MoveDirections.Down, hits: 0 },
            { direction: game_object_1.MoveDirections.Left, hits: 0 },
            { direction: game_object_1.MoveDirections.Right, hits: 0 },
        ];
        return _this;
    }
    EnemyMoveState.prototype.handleCollision = function () {
        this.updateHitsByDirection();
        _super.prototype.handleCollision.call(this);
        this.changeDirectionToOpposite();
    };
    EnemyMoveState.prototype.updateHitsByDirection = function () {
        var _this = this;
        this.hitsByDirection.map(function (item) {
            if (item.direction === _this.view.moveDirection)
                item.hits++;
            return item;
        });
    };
    EnemyMoveState.prototype.changeDirectionToOpposite = function () {
        this.hitsByDirection.sort(function (a, b) { return a.hits - b.hits; });
        if (this.hitsByDirection[this.hitsByDirection.length - 1].hits > 2) {
            this.view.moveDirection = this.hitsByDirection[0].direction;
            this.hitsByDirection = this.hitsByDirection.map(function (item) { return (__assign(__assign({}, item), { hits: 0 })); });
        }
        else {
            this.view.changeMoveDirectionToOpposite();
        }
        this.view.playTurnAnimation();
    };
    return EnemyMoveState;
}(unit_move_state_1.UnitMoveState));
exports.EnemyMoveState = EnemyMoveState;


/***/ }),
/* 50 */
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
var pixi_js_1 = __webpack_require__(1);
var model_1 = __webpack_require__(23);
var utils_1 = __webpack_require__(52);
var game_object_types_1 = __webpack_require__(4);
var GameModel = /** @class */ (function (_super) {
    __extends(GameModel, _super);
    function GameModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.units = [];
        _this.mapItems = [];
        _this.bullets = [];
        _this.playerLives = 3;
        _this.enemiesLeft = 20;
        return _this;
    }
    GameModel.prototype.addUnit = function (unit) {
        if (unit.type === game_object_types_1.GameObjectTypes.Enemy) {
            this.enemiesLeft--;
        }
        this.units.push(unit);
    };
    GameModel.prototype.removeUnit = function (unit) {
        if (unit.type === game_object_types_1.GameObjectTypes.Player) {
            this.playerLives--;
        }
        this.units = this.units.filter(function (b) { return b !== unit; });
    };
    GameModel.prototype.getSpawnPoint = function (type) {
        var points = [];
        this.mapItems.forEach(function (item) {
            if (item.type === type) {
                points.push(new pixi_js_1.Point(item.x, item.y));
            }
        });
        return points[utils_1.Utils.randomInt(0, points.length - 1)];
    };
    GameModel.prototype.addMapItem = function (item) {
        this.mapItems.push(item);
    };
    GameModel.prototype.removeMapItem = function (item) {
        this.mapItems = this.mapItems.filter(function (i) { return i !== item; });
    };
    GameModel.prototype.addBullet = function (bullet) {
        this.bullets.push(bullet);
    };
    GameModel.prototype.removeBullet = function (bullet) {
        this.bullets = this.bullets.filter(function (b) { return b !== bullet; });
    };
    return GameModel;
}(model_1.Model));
exports.GameModel = GameModel;


/***/ }),
/* 51 */
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
var pixi_js_1 = __webpack_require__(1);
var app_manager_1 = __webpack_require__(0);
var config_1 = __webpack_require__(8);
var game_object_1 = __webpack_require__(6);
var game_object_types_1 = __webpack_require__(4);
var MapItem = /** @class */ (function (_super) {
    __extends(MapItem, _super);
    function MapItem(type, x, y) {
        var _this = _super.call(this) || this;
        _this.display = new pixi_js_1.Container();
        _this._size = {
            width: 32,
            height: 32
        };
        _this.type = type;
        _this.display.x = x * _this.size.width;
        _this.display.y = y * _this.size.height;
        if (type === game_object_types_1.GameObjectTypes.EnemySpawnPoint || type === game_object_types_1.GameObjectTypes.PlayerSpawnPoint) {
            return _this;
        }
        ;
        var texture;
        if (type === game_object_types_1.GameObjectTypes.BrickWall) {
            texture = 'brickWall';
        }
        if (type === game_object_types_1.GameObjectTypes.StoneWall) {
            texture = 'stoneWall';
        }
        if (type === game_object_types_1.GameObjectTypes.Tree) {
            texture = 'tree';
        }
        if (type === game_object_types_1.GameObjectTypes.Water) {
            texture = 'water';
        }
        if (type === game_object_types_1.GameObjectTypes.Eagle) {
            texture = 'eagle';
            _this.initEagleExplosionAnimation();
        }
        _this.skin = new pixi_js_1.Sprite(app_manager_1.AppManager.getInstance().getTexture(config_1.Config.assets[texture]));
        _this.skin.width = _this.size.width;
        _this.skin.height = _this.size.height;
        _this.display.addChildAt(_this.skin, 0);
        return _this;
    }
    MapItem.prototype.initEagleExplosionAnimation = function () {
        this.eagleExplosion = new PIXI.AnimatedSprite(app_manager_1.AppManager.getInstance().getSpriteTextures(config_1.Config.assets['explode'], 16, 68, 68));
        this.eagleExplosion.anchor.set(0.5);
        this.eagleExplosion.x = this.size.width / 2;
        this.eagleExplosion.y = this.size.height / 2;
        this.eagleExplosion.loop = false;
        this.eagleExplosion.visible = false;
        this.display.addChild(this.eagleExplosion);
    };
    MapItem.prototype.playEagleExposioAnimation = function (onComplete) {
        this.eagleExplosion.visible = true;
        this.eagleExplosion.play();
        this.eagleExplosion.onComplete = function () { return onComplete(); };
    };
    // Check collisions only with these types
    MapItem.prototype.checkCollisionWith = function (object) {
        if (object.type !== game_object_types_1.GameObjectTypes.Bullet && object.type !== game_object_types_1.GameObjectTypes.Player && object.type !== game_object_types_1.GameObjectTypes.Enemy)
            return;
        _super.prototype.checkCollisionWith.call(this, object);
    };
    MapItem.prototype.handleCollisionWith = function (object) {
        if (object.type === game_object_types_1.GameObjectTypes.Bullet && (this.type === game_object_types_1.GameObjectTypes.BrickWall || this.type === game_object_types_1.GameObjectTypes.Eagle)) {
            this.destroy();
        }
    };
    MapItem.prototype.destroy = function () {
        var _this = this;
        if (this.type === game_object_types_1.GameObjectTypes.Eagle) {
            this.playEagleExposioAnimation(function () {
                _super.prototype.destroy.call(_this);
                _this.display.destroy({ children: true });
            });
            return;
        }
        _super.prototype.destroy.call(this);
        this.display.destroy({ children: true });
    };
    MapItem.prototype.addToStage = function (holder) {
        holder.addChild(this.display);
    };
    Object.defineProperty(MapItem.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapItem.prototype, "x", {
        get: function () {
            return this.display.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapItem.prototype, "y", {
        get: function () {
            return this.display.y;
        },
        enumerable: true,
        configurable: true
    });
    return MapItem;
}(game_object_1.GameObject));
exports.MapItem = MapItem;


/***/ }),
/* 52 */
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


/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
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
var view_1 = __webpack_require__(3);
var app_manager_1 = __webpack_require__(0);
var pixi_js_1 = __webpack_require__(1);
var GameMainView = /** @class */ (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frontDisplay = new pixi_js_1.Container();
        _this.backDisplay = new pixi_js_1.Container();
        return _this;
    }
    GameMainView.prototype.initScene = function () {
        this.drawBg();
        this.drawTitle();
        this.display.addChild(this.backDisplay);
        this.display.addChild(this.frontDisplay);
    };
    GameMainView.prototype.drawTitle = function () {
        var text = new pixi_js_1.Text('Game Scene');
        text.anchor.set(0.5);
        text.x = app_manager_1.AppManager.getInstance().getSceneWidth() / 2;
        text.y = app_manager_1.AppManager.getInstance().getSceneHeight() / 2;
        this.backDisplay.addChild(text);
    };
    GameMainView.prototype.drawBg = function () {
        var bg = new pixi_js_1.Graphics();
        bg.name = "background";
        bg.beginFill(0xDE3249);
        bg.drawRect(0, 0, app_manager_1.AppManager.getInstance().getSceneWidth(), app_manager_1.AppManager.getInstance().getSceneHeight());
        bg.endFill();
        this.backDisplay.addChild(bg);
    };
    GameMainView.prototype.update = function () {
    };
    GameMainView.prototype.getDisplay = function (front) {
        if (front === void 0) { front = false; }
        if (front) {
            return this.frontDisplay;
        }
        return this.backDisplay;
    };
    return GameMainView;
}(view_1.View));
exports.GameMainView = GameMainView;


/***/ }),
/* 57 */,
/* 58 */,
/* 59 */
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
var controller_1 = __webpack_require__(2);
var game_names_1 = __webpack_require__(5);
var GameUiController = /** @class */ (function (_super) {
    __extends(GameUiController, _super);
    function GameUiController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameUiController.prototype.addNotifications = function () {
        this.addNotification(game_names_1.GameNotifications.UI_UPDATE, this.updateUi.bind(this));
    };
    GameUiController.prototype.postRegister = function () {
        this.gameModel = this.retrieveModel(game_names_1.GameModels.GAME);
    };
    GameUiController.prototype.execute = function (notification) {
        this.view.initUi();
        this.updateUi();
    };
    GameUiController.prototype.updateUi = function (notification) {
        this.view.updateLives(this.gameModel.playerLives);
        this.view.updateEnemies(this.gameModel.enemiesLeft);
    };
    return GameUiController;
}(controller_1.Controller));
exports.GameUiController = GameUiController;


/***/ }),
/* 60 */
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
var view_1 = __webpack_require__(3);
var pixi_js_1 = __webpack_require__(1);
var GameUiView = /** @class */ (function (_super) {
    __extends(GameUiView, _super);
    function GameUiView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameUiView.prototype.initUi = function () {
        this.initLives();
        this.initEnemies();
    };
    GameUiView.prototype.initLives = function () {
        this.livesText = new pixi_js_1.Text('Lives: 0');
        this.livesText.x = 750;
        this.livesText.y = 20;
        this.display.addChild(this.livesText);
    };
    GameUiView.prototype.updateLives = function (count) {
        this.livesText.text = "Lives: " + count;
    };
    GameUiView.prototype.initEnemies = function () {
        this.enemiesText = new pixi_js_1.Text('Enemies: 0');
        this.enemiesText.x = 750;
        this.enemiesText.y = 50;
        this.display.addChild(this.enemiesText);
    };
    GameUiView.prototype.updateEnemies = function (count) {
        this.enemiesText.text = "Enemies: " + count;
    };
    return GameUiView;
}(view_1.View));
exports.GameUiView = GameUiView;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvYXBwLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby9leHRlcm5hbCBcIlBJWElcIiIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2ZyYW1ld29yay9jb3JlL212Yy9jb250cm9sbGVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvbXZjL3ZpZXcudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvZ2FtZS1tb2R1bGUvbWlzYy9nYW1lLW9iamVjdC10eXBlcy50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS9taXNjL2dhbWUtbmFtZXMudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvZ2FtZS1tb2R1bGUvbWlzYy9nYW1lLW9iamVjdC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vbm9kZV9tb2R1bGVzL2dzYXAvZ3NhcC1jb3JlLmpzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9ub2RlX21vZHVsZXMvZ3NhcC9DU1NQbHVnaW4uanMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL25vZGVfbW9kdWxlcy9nc2FwL2luZGV4LmpzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL21pc2MvY29uZmlnLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvbW9kdWxlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL3ZpZXdzL2VsZW1lbnRzL3VuaXQvdW5pdC1zdGF0ZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS92aWV3cy9lbGVtZW50cy91bml0L3VuaXQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9mcmFtZXdvcmsvY29yZS9nbG9iYWwtbm90aWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2ZyYW1ld29yay9tb2R1bGVzL2dyYXBoaWNzLWVuZ2luZS1tb2R1bGUvbWlzYy9ncmFwaGljcy1lbmdpbmUtbmFtZXMudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9mcmFtZXdvcmsvY29yZS9tdmMvbXZjLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvbXZjL212Yy1lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvbWVudS1tb2R1bGUvbWlzYy9tZW51LW5hbWVzLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL21pc2MvZ2FtZS1vYmplY3Qtdmlldy50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS92aWV3cy9lbGVtZW50cy91bml0L3VuaXQtaWRsZS1zdGF0ZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS92aWV3cy9lbGVtZW50cy91bml0L3VuaXQtZGllLXN0YXRlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL3ZpZXdzL2VsZW1lbnRzL3VuaXQvdW5pdC1tb3ZlLXN0YXRlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL3ZpZXdzL2VsZW1lbnRzL3VuaXQvdW5pdC1zcGF3bi1zdGF0ZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS92aWV3cy9lbGVtZW50cy91bml0L3VuaXQtdmlldy50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2ZyYW1ld29yay9jb3JlL212Yy9tb2RlbC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL0luZGV4LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL3ByZWxvYWRlci1tb2R1bGUvcHJlbG9hZGVyLW1vZHVsZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9wcmVsb2FkZXItbW9kdWxlL21pc2MvcHJlbG9hZGVyLW5hbWVzLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL3ByZWxvYWRlci1tb2R1bGUvY29udHJvbGxlcnMvcHJlbG9hZGVyLWluaXQtY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9wcmVsb2FkZXItbW9kdWxlL3ZpZXdzL3ByZWxvYWRlci1pbml0LXZpZXcudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9mcmFtZXdvcmsvY29yZS9lbnRyeS1wb2ludC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2ZyYW1ld29yay9tb2R1bGVzL2dyYXBoaWNzLWVuZ2luZS1tb2R1bGUvZ3JhcGhpY3MtZW5naW5lLW1vZHVsZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2ZyYW1ld29yay9tb2R1bGVzL2dyYXBoaWNzLWVuZ2luZS1tb2R1bGUvY29udHJvbGxlcnMvZ3JhcGhpY3MtZW5naW5lLWxvYWRlci1jb250cm9sbGVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL21lbnUtbW9kdWxlL21lbnUtbW9kdWxlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL21lbnUtbW9kdWxlL2NvbnRyb2xsZXJzL21lbnUtYnV0dG9ucy1jb250cm9sbGVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL21lbnUtbW9kdWxlL2NvbnRyb2xsZXJzL21lbnUtaW5pdC1jb250cm9sbGVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL21lbnUtbW9kdWxlL3ZpZXdzL21lbnUtYnV0dG9ucy12aWV3LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL21lbnUtbW9kdWxlL3ZpZXdzL21lbnUtaW5pdC12aWV3LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL2dhbWUtbW9kdWxlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL2NvbnRyb2xsZXJzL2ZhY3Rvcmllcy91bml0cy1mYWN0b3J5LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL3ZpZXdzL2VsZW1lbnRzL2J1bGxldC9idWxsZXQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvZ2FtZS1tb2R1bGUvdmlld3MvZWxlbWVudHMvYnVsbGV0L2J1bGxldC12aWV3LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL2NvbnRyb2xsZXJzL2ZhY3Rvcmllcy9tYXAtZmFjdG9yeS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS9jb250cm9sbGVycy9nYW1lLW1haW4tY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS9jb250cm9sbGVycy9mYWN0b3JpZXMvYnVsbGV0cy1mYWN0b3J5LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL3ZpZXdzL2VsZW1lbnRzL3VuaXQvcGxheWVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvZnNtL3N0YXRlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZnJhbWV3b3JrL2NvcmUvZnNtL2ZzbS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS92aWV3cy9lbGVtZW50cy91bml0L2VuZW15LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfaW50cm8vLi9zcmMvZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL3ZpZXdzL2VsZW1lbnRzL3VuaXQvZW5lbXktbW92ZS1zdGF0ZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS9tb2RlbHMvZ2FtZS1tb2RlbC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS92aWV3cy9lbGVtZW50cy9tYXAvbWFwLWl0ZW0udHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS92aWV3cy9nYW1lLW1haW4tdmlldy50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0X2ludHJvLy4vc3JjL2dhbWUvbW9kdWxlcy9nYW1lLW1vZHVsZS9jb250cm9sbGVycy9nYW1lLXVpLWNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9pbnRyby8uL3NyYy9nYW1lL21vZHVsZXMvZ2FtZS1tb2R1bGUvdmlld3MvZ2FtZS11aS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7O0FDaEZBO0lB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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBLGtEQUFrRDtBQUNsRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsaURBQWlEO0FBQ2pEOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7O0FBRWxEO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0M7QUFDaEM7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0VBQWdFOztBQUVoRSxxRUFBcUU7O0FBRXJFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVDQUF1Qzs7O0FBR3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDOztBQUU3QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzTEFBc0w7QUFDdEw7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEseUdBQXlHO0FBQ3pHOztBQUVBO0FBQ0EsK0RBQStEOztBQUUvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw0RUFBNEU7O0FBRTVFLGlDQUFpQztBQUNqQyxPQUFPO0FBQ1A7O0FBRUEsNkJBQTZCOztBQUU3Qiw4TUFBOE07QUFDOU07QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyRkFBMkY7O0FBRTNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDOztBQUV4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsK0ZBQStGOztBQUUvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCOztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVc7OztBQUdYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLDREQUE0RDs7QUFFNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRjs7QUFFbkY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQzs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3SEFBd0g7O0FBRXhIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQSx5RUFBeUU7QUFDekU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjs7QUFFM0IsOENBQThDOztBQUU5Qzs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7QUFFZDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQzs7QUFFbEM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSw0REFBNEQ7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0VBQW9FOztBQUVwRTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQSxnQkFBZ0I7O0FBRWhCO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlFQUFpRTs7QUFFakU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsNk5BQTZOOztBQUU3UTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxhQUFhLG9GQUFvRixJQUFJLFVBQVUsT0FBTzs7O0FBRzdIO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0MsU0FBUztBQUNUO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0Esb1hBQW9YLHlDQUF5QztBQUM3WjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlIQUF5SCw4QkFBOEI7O0FBRXZKLFNBQVM7QUFDVCx1REFBdUQsb0RBQW9ELE9BQU87O0FBRWxIOztBQUVBO0FBQ0EsK0NBQStDOztBQUUvQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxlQUFlLG9CQUFvQjtBQUNuQztBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7O0FBRTlDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLDRFQUE0RTs7O0FBRzVFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBLDJDQUEyQzs7QUFFM0M7QUFDQSw2REFBNkQ7QUFDN0QsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7O0FBRTFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLE9BQU87QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUVBQW1FO0FBQ25FOztBQUVBO0FBQ0EsS0FBSztBQUNMLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQ0FBZ0M7O0FBRWhDLHlDQUF5Qzs7QUFFekM7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEVBQTBFOztBQUUxRTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1RkFBdUY7O0FBRXZGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDhIQUE4SDs7QUFFOUg7QUFDQSw0SEFBNEgsWUFBWTtBQUN4STs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMklBQTJJOztBQUUzSSxnSUFBZ0k7O0FBRWhJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhEQUE4RDs7QUFFOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUU7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSw0R0FBNEc7O0FBRTVHO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7O0FBR0s7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTs7QUFFQTtBQUNBLENBQUMsR0FBRzs7QUFFSjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEVBQTBFLGVBQWU7QUFDekY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx1REFBdUQ7O0FBRXZELHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFD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RUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN0RSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3RFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUM7WUFDdEUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN0RSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3RFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN0RSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdEUsQ0FBQyxFQUFHLEVBQUcsRUFBRSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdEUsQ0FBQyxFQUFHLEVBQUcsRUFBRSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3RFLENBQUMsRUFBRyxFQUFHLEVBQUUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN0RSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3RFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUM7WUFDdEUsQ0FBQyxFQUFHLEVBQUcsRUFBRSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3RFLENBQUMsRUFBRyxFQUFHLEVBQUUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN0RSxDQUFDLEVBQUcsRUFBRyxFQUFFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUM7WUFDdEUsQ0FBQyxFQUFHLEVBQUcsRUFBRSxDQUFDLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRSxDQUFDO1lBQ3RFLENBQUMsRUFBRyxFQUFHLEVBQUUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN0RSxDQUFDLEVBQUcsRUFBRyxFQUFFLENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUUsQ0FBQztZQUN0RSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENB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QUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxnQ0FBVyxHQUFsQixVQUFtQixLQUFhO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFlBQVUsS0FBTyxDQUFDO0lBQzVDLENBQUM7SUFFUyxnQ0FBVyxHQUFyQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxjQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLGtDQUFhLEdBQXBCLFVBQXFCLEtBQWE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsY0FBWSxLQUFPLENBQUM7SUFDaEQsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxDQS9CK0IsV0FBSSxHQStCbkM7QUEvQlksZ0NBQVUiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIlBJWElcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0eXBlc2NyaXB0X2ludHJvXCIsIFtcIlBJWElcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widHlwZXNjcmlwdF9pbnRyb1wiXSA9IGZhY3RvcnkocmVxdWlyZShcIlBJWElcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInR5cGVzY3JpcHRfaW50cm9cIl0gPSBmYWN0b3J5KHJvb3RbXCJQSVhJXCJdKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMV9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI0KTtcbiIsImltcG9ydCB7IENvbnRhaW5lciwgVGV4dHVyZSB9IGZyb20gXCJwaXhpLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcHBNYW5hZ2VyIHtcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBBcHBNYW5hZ2VyO1xuICAgIFxuICAgIHB1YmxpYyBhcHA6IFBJWEkuQXBwbGljYXRpb247XG4gICAgcHVibGljIHJlc291cmNlczogUElYSS5Mb2FkZXJSZXNvdXJjZTtcblxuICAgIHByb3RlY3RlZCBzY2VuZVdpZHRoOiBudW1iZXIgPSA5MDA7XG4gICAgcHJvdGVjdGVkIHNjZW5lSGVpZ2h0OiBudW1iZXIgPSA3MjA7XG5cbiAgICBwdWJsaWMga2V5czogYW55ID0ge307XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYgKEFwcE1hbmFnZXIuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIC0gdXNlIEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRQaXhpQXBwKCk7ICAgXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBBcHBNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCFBcHBNYW5hZ2VyLmluc3RhbmNlKSB7XG4gICAgICAgICAgICBBcHBNYW5hZ2VyLmluc3RhbmNlID0gbmV3IEFwcE1hbmFnZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXBwTWFuYWdlci5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2NlbmVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZVdpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTY2VuZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZUhlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnRBc3NldHNMb2FkaW5nKGFzc2V0czogT2JqZWN0LCBvbkNvbXBsZXRlOiBGdW5jdGlvbiwgb25Qcm9ncmVzcz86IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxvYWRlcjogUElYSS5Mb2FkZXIgPSBuZXcgUElYSS5Mb2FkZXIoKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhhc3NldHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsb2FkZXIuYWRkKGFzc2V0c1trZXldLCBhc3NldHNba2V5XSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxvYWRlci5vblByb2dyZXNzLmFkZCgobG9hZGVyOiBQSVhJLkxvYWRlciwgcmVzb3VyY2VzOiBQSVhJLkxvYWRlclJlc291cmNlKSA9PiB7XG4gICAgICAgICAgICBvblByb2dyZXNzLmNhbGwodGhpcywgbG9hZGVyLnByb2dyZXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9hZGVyLm9uQ29tcGxldGUuYWRkKChsb2FkZXI6IFBJWEkuTG9hZGVyLCByZXNvdXJjZXM6IFBJWEkuTG9hZGVyUmVzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuICAgICAgICAgICAgb25Db21wbGV0ZS5jYWxsKHRoaXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsb2FkZXIubG9hZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRMYXllclRvU2NlbmUoY29udGFpbmVyOiBDb250YWluZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hcHAuc3RhZ2UuYWRkQ2hpbGQoY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdFBpeGlBcHAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBwID0gbmV3IFBJWEkuQXBwbGljYXRpb24oeyBcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNjZW5lV2lkdGgsIFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNjZW5lSGVpZ2h0LCBcbiAgICAgICAgICAgIC8vcmVzb2x1dGlvbjogd2luZG93LmRldmljZVBpeGVsUmF0aW8sXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IDB4RkZGRkZGIFxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmFwcC52aWV3KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlVcC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGV4dHVyZShuYW1lOiBzdHJpbmcpOiBUZXh0dXJlIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnJlc291cmNlc1tuYW1lXSBhcyBQSVhJLkxvYWRlclJlc291cmNlKS50ZXh0dXJlO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZ2V0U3ByaXRlVGV4dHVyZXMoc3ByaXRlTmFtZTogc3RyaW5nLCBmcmFtZXNDb3VudDogbnVtYmVyLCBmcmFtZVdpZHRoOiBudW1iZXIsIGZyYW1lSGVpZ2h0OiBudW1iZXIpOiBUZXh0dXJlW10ge1xuICAgICAgICBjb25zdCBmcmFtZXM6IFBJWEkuVGV4dHVyZVtdID0gW107XG4gICAgICAgIGNvbnN0IHNwcml0ZVNoZWV0OiBQSVhJLkJhc2VUZXh0dXJlID0gbmV3IFBJWEkuQmFzZVRleHR1cmUoKHRoaXMucmVzb3VyY2VzW3Nwcml0ZU5hbWVdIGFzIFBJWEkuTG9hZGVyUmVzb3VyY2UpLnVybCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZXNDb3VudDsgaSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlOiBQSVhJLlRleHR1cmUgPSBuZXcgUElYSS5UZXh0dXJlKHNwcml0ZVNoZWV0LCBuZXcgUElYSS5SZWN0YW5nbGUoaSAqIGZyYW1lV2lkdGgsIDAsIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0KSk7XG4gICAgICAgICAgICBmcmFtZXMucHVzaCh0ZXh0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnJhbWVzOyAgICAgICAgXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5rZXlzW2V2ZW50LmNvZGVdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGFuZGxlS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5rZXlzW2V2ZW50LmNvZGVdID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlc2l6ZSgpIHtcbiAgICAgICAvLyB0aGlzLmFwcC5yZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgLy90aGlzLmdlY2tvLnggPSB0aGlzLmFwcC5yZW5kZXJlci53aWR0aCAvIDI7XG4gICAgICAgIC8vdGhpcy5nZWNrby55ID0gdGhpcy5hcHAucmVuZGVyZXIuaGVpZ2h0IC8gMjtcbiAgICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xX187IiwiaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vZ2FtZS9tb2R1bGVzL2dhbWUtbW9kdWxlL21pc2MvZ2FtZS1vYmplY3RcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IE1WQ0VudGl0eSB9IGZyb20gXCIuL212Yy1lbnRpdHlcIjtcbmltcG9ydCB7IElOb3RpZmljYXRpb24gfSBmcm9tIFwiLi9ub3RpZmljYXRpb25cIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTVZDRW50aXR5IHtcblxuICAgIHB1YmxpYyBtb2RlbDogTW9kZWw7XG4gICAgcHVibGljIHZpZXc6IFZpZXc7XG4gICAgcHJvdGVjdGVkIG5vdGlmaWNhdGlvbkhhbmRsZXJzOiBJTm90aWZpY2F0aW9uSGFuZGxlciA9IHt9O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZE5vdGlmaWNhdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBjb250cm9sbGVyLCB2aWV3IGFuZCBtb2RlbCBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgcG9zdFJlZ2lzdGVyKCk6IHZvaWQge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBvbiBub3RpZmljYXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgZXhlY3V0ZShub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pOiB2b2lkIHtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQSBwbGFjZSB0byBhZGQgYWxsIG5vdGlmaWNhdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkTm90aWZpY2F0aW9ucygpOiB2b2lkIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRvIHRoZSBub3RpZmljYXRpb24gYW5kIHN0b3JlcyB0aGUgaGFuZGxlciBmdW5jdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBhZGROb3RpZmljYXRpb24obmFtZTogc3RyaW5nLCBub3RpZmljYXRpb25IYW5kbGVyOiAobm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5ub3RpZmljYXRpb25IYW5kbGVyc1tuYW1lXSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25IYW5kbGVyc1tuYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uSGFuZGxlcnNbbmFtZV0ucHVzaChub3RpZmljYXRpb25IYW5kbGVyKTtcblx0XHR0aGlzLm12Yy5hZGROb3RpZmljYXRpb24obmFtZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgYWxsIGhhbmRsZXJzIG9mIGEgc3BlY2lmaWMgbm90aWZpY2F0aW9uXG4gICAgICovICAgIFxuICAgIHB1YmxpYyBoYW5kbGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5ub3RpZmljYXRpb25IYW5kbGVyc1tub3RpZmljYXRpb24ubmFtZV0pIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uSGFuZGxlcnNbbm90aWZpY2F0aW9uLm5hbWVdLmZvckVhY2goaGFuZGxlciA9PiB7XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgbm90aWZpY2F0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXHQvKipcblx0ICogU2VuZHMgdGhlIG5vdGlmaWNhdGlvbiB0byBhbGwgc3Vic2NyaWJlZCBlbnRpdGllc1xuXHQgKi9cblx0cHVibGljIHNlbmROb3RpZmljYXRpb24obmFtZTogc3RyaW5nLCBib2R5PzogYW55KTogdm9pZCB7XG5cdFx0Y29uc29sZS5sb2coJ3NlbmROb3RpZmljYXRpb246ICcsIG5hbWUsIGJvZHkpO1xuXHRcdHRoaXMubXZjLnNlbmROb3RpZmljYXRpb24obmFtZSwgYm9keSk7XG4gICAgfVxuICAgICAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtb2RlbCBieSBuYW1lXG4gICAgICovICAgIFxuICAgIHB1YmxpYyByZXRyaWV2ZU1vZGVsKG1vZGVsTmFtZTogc3RyaW5nKTogTW9kZWwge1xuICAgICAgICByZXR1cm4gdGhpcy5tdmMucmV0cmlldmVNb2RlbChtb2RlbE5hbWUpO1xuICAgIH0gXG4gICAgXG5cdHB1YmxpYyBsYXllclRyYW5zaXRpb25JblN0YXJ0KCk6IHZvaWQge1xuXHRcdHRoaXMudmlldy5sYXllclRyYW5zaXRpb25JblN0YXJ0KCk7XG5cdH1cblxuXHRwdWJsaWMgbGF5ZXJUcmFuc2l0aW9uT3V0U3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlldy5sYXllclRyYW5zaXRpb25PdXRTdGFydCgpO1xuICAgIH0gICAgICAgXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvbkhhbmRsZXIge1xuXHRbbmFtZTogc3RyaW5nXTogRnVuY3Rpb25bXTtcbn0iLCJpbXBvcnQgZ3NhcCBmcm9tIFwiZ3NhcFwiO1xuaW1wb3J0IHsgQ29udGFpbmVyLCBUZXh0dXJlIH0gZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi4vYXBwLW1hbmFnZXJcIjtcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXInO1xuaW1wb3J0IHsgTVZDRW50aXR5IH0gZnJvbSBcIi4vbXZjLWVudGl0eVwiO1xuXG5leHBvcnQgY2xhc3MgVmlldyBleHRlbmRzIE1WQ0VudGl0eSB7XG5cdHB1YmxpYyBjb250cm9sbGVyOiBDb250cm9sbGVyO1xuICAgIHB1YmxpYyBkaXNwbGF5OiBDb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCk7XG5cbiAgICAvKipcblx0ICogQ2FsbGVkIHdoZW4gb2JqZWN0IGlzIGNyZWF0ZWRcblx0ICovXG5cdHB1YmxpYyBvblJlZ2lzdGVyKCk6IHZvaWQge1x0XG5cdFx0c3VwZXIub25SZWdpc3RlcigpO1xuXHRcdHRoaXMuZGlzcGxheS52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuXHQgKiBDYWxsZWQgd2hlbiB2aWV3IGlzIHJlYWR5XG5cdCAqL1xuXHRwdWJsaWMgcG9zdFJlZ2lzdGVyKCk6IHZvaWQge1x0XG5cdH1cblxuXHRwdWJsaWMgbGF5ZXJUcmFuc2l0aW9uSW5TdGFydCgpOiB2b2lkIHtcblx0XHR0aGlzLmRpc3BsYXkudmlzaWJsZSA9IHRydWU7XG5cdFx0Z3NhcC5mcm9tVG8odGhpcy5kaXNwbGF5LCB7IGFscGhhOiAwIH0sIHsgZHVyYXRpb246IDAuNSwgYWxwaGE6IDEgfSk7XG5cdH1cblxuXHRwdWJsaWMgbGF5ZXJUcmFuc2l0aW9uT3V0U3RhcnQoKTogdm9pZCB7XG5cdFx0aWYgKCF0aGlzLmRpc3BsYXkudmlzaWJsZSkgcmV0dXJuO1xuXHRcdFxuXHRcdGdzYXAudG8odGhpcy5kaXNwbGF5LCB7IFxuXHRcdFx0ZHVyYXRpb246IDAuNSwgXG5cdFx0XHRhbHBoYTogMCwgXG5cdFx0XHRvbkNvbXBsZXRlOiAoKSA9PiB7IFxuXHRcdFx0XHR0aGlzLmRpc3BsYXkudmlzaWJsZSA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIGdldFRleHR1cmUobmFtZTogc3RyaW5nKTogVGV4dHVyZSB7XG5cdFx0cmV0dXJuIEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZXh0dXJlKG5hbWUpO1xuXHR9XG4gICAgXG4gICAgcHVibGljIGdldFNwcml0ZVRleHR1cmVzKHNwcml0ZU5hbWU6IHN0cmluZywgZnJhbWVzQ291bnQ6IG51bWJlciwgZnJhbWVXaWR0aDogbnVtYmVyLCBmcmFtZUhlaWdodDogbnVtYmVyKTogVGV4dHVyZVtdIHtcbiAgICAgICAgcmV0dXJuIEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVUZXh0dXJlcyhzcHJpdGVOYW1lLCBmcmFtZXNDb3VudCwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xuXHR9XHRcbn0iLCJleHBvcnQgZW51bSBHYW1lT2JqZWN0VHlwZXMge1xuICAgIFBsYXllcixcbiAgICBFbmVteSxcbiAgICBFYWdsZSxcbiAgICBCdWxsZXQsXG4gICAgU3RvbmVXYWxsLFxuICAgIEJyaWNrV2FsbCxcbiAgICBFbmVteVNwYXduUG9pbnQsXG4gICAgUGxheWVyU3Bhd25Qb2ludCxcbiAgICBXYXRlcixcbiAgICBUcmVlLFxuICAgIEJvbnVzXG59IiwiZXhwb3J0IGNsYXNzIEdhbWVOb3RpZmljYXRpb25zIHsgIFxuICAgIHB1YmxpYyBzdGF0aWMgU0NFTkU6IHN0cmluZyA9IFwiR0FNRV9TQ0VORVwiO1xuICAgIHB1YmxpYyBzdGF0aWMgTUFJTjogc3RyaW5nID0gXCJHQU1FX01BSU5cIjtcbiAgICBwdWJsaWMgc3RhdGljIENSRUFURV9CVUxMRVQ6IHN0cmluZyA9IFwiR0FNRV9NQUlOX0NSRUFURV9CVUxMRVRcIjtcbiAgICBwdWJsaWMgc3RhdGljIFVJX1VQREFURTogc3RyaW5nID0gXCJHQU1FX1VJX1VQREFURVwiO1xuICAgIHB1YmxpYyBzdGF0aWMgVUk6IHN0cmluZyA9IFwiR0FNRV9VSVwiO1xufVxuXG5leHBvcnQgY2xhc3MgR2FtZU1vZGVscyB7ICBcbiAgICBwdWJsaWMgc3RhdGljIEdBTUU6IHN0cmluZyA9IFwiR0FNRV9NT0RFTFwiO1xufSIsImltcG9ydCB7IENvbnRhaW5lciwgSVNpemUgfSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHsgQXBwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9hcHAtbWFuYWdlclwiO1xuaW1wb3J0IHsgRlNNIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL2ZzbS9mc21cIjtcbmltcG9ydCB7IEdhbWVPYmplY3RUeXBlcyB9IGZyb20gXCIuL2dhbWUtb2JqZWN0LXR5cGVzXCI7XG5pbXBvcnQgeyBHYW1lT2JqZWN0VmlldyB9IGZyb20gXCIuL2dhbWUtb2JqZWN0LXZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIEdhbWVPYmplY3Qge1xuICAgIHB1YmxpYyB0eXBlOiBHYW1lT2JqZWN0VHlwZXM7XG4gICAgcHVibGljIG93bmVyOiBHYW1lT2JqZWN0OyBcbiAgICBwdWJsaWMgZnNtOiBGU007XG4gICAgcHVibGljIHZpZXc6IEdhbWVPYmplY3RWaWV3O1xuXG4gICAgcHVibGljIGNhbkNvbGxpZGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc0Rlc3Ryb3llZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIG9uRGVzdHJveTogRnVuY3Rpb247XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZSB0byBpbml0aWFsaXplIHZpZXcgYW5kIG90aGVyIHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdChhcmdzPzogYW55KTogdm9pZCB7ICBcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdFZpZXcodmlld0NsYXNzOiB0eXBlb2YgR2FtZU9iamVjdFZpZXcsIG9iamVjdDogR2FtZU9iamVjdCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgdmlld0NsYXNzKCk7XG4gICAgICAgIHRoaXMudmlldy5pbml0KG9iamVjdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25EZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMudmlldy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGdldCBzaXplKCk6IElTaXplIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5zaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3Lng7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcueTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHgodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnZpZXcueCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgeSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudmlldy55ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFRvU3RhZ2UoaG9sZGVyOiBDb250YWluZXIpOiB2b2lkIHtcbiAgICAgICAgaG9sZGVyLmFkZENoaWxkKHRoaXMudmlldy5kaXNwbGF5KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0SW5wdXQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5rZXlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgY29sbGlzaW9uIHdpdGggb3RoZXIgb2JqZWN0LiBJZiB0cnVlIC0gY2FsbHMgYm90aCBvYmplY3RzIGNvbGxpc2lvbiBoYW5kbGVyIG1ldGhvZHNcbiAgICAgKi9cbiAgICBwdWJsaWMgY2hlY2tDb2xsaXNpb25XaXRoKG9iamVjdDogR2FtZU9iamVjdCk6IHZvaWQge1xuICAgICAgICAvLyBPYmplY3QgY2FuIGJlIGRlc3RvcnllZCBidXQgc3RpbGwgcHJlc2VudCBpbiBjdXJyZW50IHVwZGF0ZSBsaXN0XG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkIHx8IG9iamVjdC5pc0Rlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICAvLyBPYmplY3QgY2FuIGJlIGluIHN0YXRlIHdoZW4gaGUgaXMgbm90IGNvbGxpZGFibGUgKGR5aW5nLCBzcGF3bmluZyBldGMpXG4gICAgICAgIGlmICghdGhpcy5jYW5Db2xsaWRlIHx8ICFvYmplY3QuY2FuQ29sbGlkZSkgcmV0dXJuO1xuICAgICAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGNvbGxpc2lvbiBidHdlZW4gdGhlIHNhbWUgb2JqZWN0XG4gICAgICAgIGlmICh0aGlzID09PSBvYmplY3QpIHJldHVybjtcblxuICAgICAgICAvLyBDaGVja3MgZm9yIGNvbGxpc2lvbiwgdHJ1ZSBtZWFucyB0aGVyZSBpcyBubyBjb2xsaXNpb24gXG4gICAgICAgIGlmICh0aGlzLnkgPiBvYmplY3QueSArIG9iamVjdC5zaXplLmhlaWdodCB8fCB0aGlzLnggKyB0aGlzLnNpemUud2lkdGggPCBvYmplY3QueCB8fCB0aGlzLnkgKyB0aGlzLnNpemUuaGVpZ2h0IDwgb2JqZWN0LnkgfHwgdGhpcy54ID4gb2JqZWN0LnggKyBvYmplY3Quc2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmhhbmRsZUNvbGxpc2lvbldpdGgob2JqZWN0KTtcbiAgICAgICAgb2JqZWN0LmhhbmRsZUNvbGxpc2lvbldpdGgodGhpcyk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZXJlIGlzIGEgY29sbGlzaW9uIHdpdGggb3RoZXIgb2JqZWN0XG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZUNvbGxpc2lvbldpdGgob2JqZWN0OiBHYW1lT2JqZWN0KSB7XG4gICAgfVxufVxuXG5leHBvcnQgZW51bSBNb3ZlRGlyZWN0aW9ucyB7XG4gICAgVXAgPSAxLFxuICAgIERvd24gPSAtMSxcbiAgICBMZWZ0ID0gMixcbiAgICBSaWdodCA9IC0yXG59IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKiFcbiAqIEdTQVAgMy41LjBcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIEBsaWNlbnNlIENvcHlyaWdodCAyMDA4LTIwMjAsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG52YXIgX2NvbmZpZyA9IHtcbiAgYXV0b1NsZWVwOiAxMjAsXG4gIGZvcmNlM0Q6IFwiYXV0b1wiLFxuICBudWxsVGFyZ2V0V2FybjogMSxcbiAgdW5pdHM6IHtcbiAgICBsaW5lSGVpZ2h0OiBcIlwiXG4gIH1cbn0sXG4gICAgX2RlZmF1bHRzID0ge1xuICBkdXJhdGlvbjogLjUsXG4gIG92ZXJ3cml0ZTogZmFsc2UsXG4gIGRlbGF5OiAwXG59LFxuICAgIF9iaWdOdW0gPSAxZTgsXG4gICAgX3RpbnlOdW0gPSAxIC8gX2JpZ051bSxcbiAgICBfMlBJID0gTWF0aC5QSSAqIDIsXG4gICAgX0hBTEZfUEkgPSBfMlBJIC8gNCxcbiAgICBfZ3NJRCA9IDAsXG4gICAgX3NxcnQgPSBNYXRoLnNxcnQsXG4gICAgX2NvcyA9IE1hdGguY29zLFxuICAgIF9zaW4gPSBNYXRoLnNpbixcbiAgICBfaXNTdHJpbmcgPSBmdW5jdGlvbiBfaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn0sXG4gICAgX2lzRnVuY3Rpb24gPSBmdW5jdGlvbiBfaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59LFxuICAgIF9pc051bWJlciA9IGZ1bmN0aW9uIF9pc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufSxcbiAgICBfaXNVbmRlZmluZWQgPSBmdW5jdGlvbiBfaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn0sXG4gICAgX2lzT2JqZWN0ID0gZnVuY3Rpb24gX2lzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59LFxuICAgIF9pc05vdEZhbHNlID0gZnVuY3Rpb24gX2lzTm90RmFsc2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZTtcbn0sXG4gICAgX3dpbmRvd0V4aXN0cyA9IGZ1bmN0aW9uIF93aW5kb3dFeGlzdHMoKSB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xufSxcbiAgICBfaXNGdW5jT3JTdHJpbmcgPSBmdW5jdGlvbiBfaXNGdW5jT3JTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIF9pc0Z1bmN0aW9uKHZhbHVlKSB8fCBfaXNTdHJpbmcodmFsdWUpO1xufSxcbiAgICBfaXNUeXBlZEFycmF5ID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCIgPyBBcnJheUJ1ZmZlci5pc1ZpZXcgOiBmdW5jdGlvbiAoKSB7fSxcbiAgICBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXksXG4gICAgX3N0cmljdE51bUV4cCA9IC8oPzotP1xcLj9cXGR8XFwuKSsvZ2ksXG4gICAgLy9vbmx5IG51bWJlcnMgKGluY2x1ZGluZyBuZWdhdGl2ZXMgYW5kIGRlY2ltYWxzKSBidXQgTk9UIHJlbGF0aXZlIHZhbHVlcy5cbl9udW1FeHAgPSAvWy0rPS5dKlxcZCtbLmVcXC0rXSpcXGQqW2VcXC1cXCtdKlxcZCovZyxcbiAgICAvL2ZpbmRzIGFueSBudW1iZXJzLCBpbmNsdWRpbmcgb25lcyB0aGF0IHN0YXJ0IHdpdGggKz0gb3IgLT0sIG5lZ2F0aXZlIG51bWJlcnMsIGFuZCBvbmVzIGluIHNjaWVudGlmaWMgbm90YXRpb24gbGlrZSAxZS04LlxuX251bVdpdGhVbml0RXhwID0gL1stKz0uXSpcXGQrWy5lLV0qXFxkKlthLXolXSovZyxcbiAgICBfY29tcGxleFN0cmluZ051bUV4cCA9IC9bLSs9Ll0qXFxkKyg/OlxcLnxlLXxlKSpcXGQqL2dpLFxuICAgIC8vZHVwbGljYXRlIHNvIHRoYXQgd2hpbGUgd2UncmUgbG9vcGluZyB0aHJvdWdoIG1hdGNoZXMgZnJvbSBleGVjKCksIGl0IGRvZXNuJ3QgY29udGFtaW5hdGUgdGhlIGxhc3RJbmRleCBvZiBfbnVtRXhwIHdoaWNoIHdlIHVzZSB0byBzZWFyY2ggZm9yIGNvbG9ycyB0b28uXG5fcmVsRXhwID0gL1srLV09LT9bXFwuXFxkXSsvLFxuICAgIF9kZWxpbWl0ZWRWYWx1ZUV4cCA9IC9bI1xcLSsuXSpcXGJbYS16XFxkLT0rJS5dKy9naSxcbiAgICBfZ2xvYmFsVGltZWxpbmUsXG4gICAgX3dpbixcbiAgICBfY29yZUluaXR0ZWQsXG4gICAgX2RvYyxcbiAgICBfZ2xvYmFscyA9IHt9LFxuICAgIF9pbnN0YWxsU2NvcGUgPSB7fSxcbiAgICBfY29yZVJlYWR5LFxuICAgIF9pbnN0YWxsID0gZnVuY3Rpb24gX2luc3RhbGwoc2NvcGUpIHtcbiAgcmV0dXJuIChfaW5zdGFsbFNjb3BlID0gX21lcmdlKHNjb3BlLCBfZ2xvYmFscykpICYmIGdzYXA7XG59LFxuICAgIF9taXNzaW5nUGx1Z2luID0gZnVuY3Rpb24gX21pc3NpbmdQbHVnaW4ocHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiBjb25zb2xlLndhcm4oXCJJbnZhbGlkIHByb3BlcnR5XCIsIHByb3BlcnR5LCBcInNldCB0b1wiLCB2YWx1ZSwgXCJNaXNzaW5nIHBsdWdpbj8gZ3NhcC5yZWdpc3RlclBsdWdpbigpXCIpO1xufSxcbiAgICBfd2FybiA9IGZ1bmN0aW9uIF93YXJuKG1lc3NhZ2UsIHN1cHByZXNzKSB7XG4gIHJldHVybiAhc3VwcHJlc3MgJiYgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xufSxcbiAgICBfYWRkR2xvYmFsID0gZnVuY3Rpb24gX2FkZEdsb2JhbChuYW1lLCBvYmopIHtcbiAgcmV0dXJuIG5hbWUgJiYgKF9nbG9iYWxzW25hbWVdID0gb2JqKSAmJiBfaW5zdGFsbFNjb3BlICYmIChfaW5zdGFsbFNjb3BlW25hbWVdID0gb2JqKSB8fCBfZ2xvYmFscztcbn0sXG4gICAgX2VtcHR5RnVuYyA9IGZ1bmN0aW9uIF9lbXB0eUZ1bmMoKSB7XG4gIHJldHVybiAwO1xufSxcbiAgICBfcmVzZXJ2ZWRQcm9wcyA9IHt9LFxuICAgIF9sYXp5VHdlZW5zID0gW10sXG4gICAgX2xhenlMb29rdXAgPSB7fSxcbiAgICBfbGFzdFJlbmRlcmVkRnJhbWUsXG4gICAgX3BsdWdpbnMgPSB7fSxcbiAgICBfZWZmZWN0cyA9IHt9LFxuICAgIF9uZXh0R0NGcmFtZSA9IDMwLFxuICAgIF9oYXJuZXNzUGx1Z2lucyA9IFtdLFxuICAgIF9jYWxsYmFja05hbWVzID0gXCJcIixcbiAgICBfaGFybmVzcyA9IGZ1bmN0aW9uIF9oYXJuZXNzKHRhcmdldHMpIHtcbiAgdmFyIHRhcmdldCA9IHRhcmdldHNbMF0sXG4gICAgICBoYXJuZXNzUGx1Z2luLFxuICAgICAgaTtcbiAgX2lzT2JqZWN0KHRhcmdldCkgfHwgX2lzRnVuY3Rpb24odGFyZ2V0KSB8fCAodGFyZ2V0cyA9IFt0YXJnZXRzXSk7XG5cbiAgaWYgKCEoaGFybmVzc1BsdWdpbiA9ICh0YXJnZXQuX2dzYXAgfHwge30pLmhhcm5lc3MpKSB7XG4gICAgaSA9IF9oYXJuZXNzUGx1Z2lucy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tICYmICFfaGFybmVzc1BsdWdpbnNbaV0udGFyZ2V0VGVzdCh0YXJnZXQpKSB7fVxuXG4gICAgaGFybmVzc1BsdWdpbiA9IF9oYXJuZXNzUGx1Z2luc1tpXTtcbiAgfVxuXG4gIGkgPSB0YXJnZXRzLmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgdGFyZ2V0c1tpXSAmJiAodGFyZ2V0c1tpXS5fZ3NhcCB8fCAodGFyZ2V0c1tpXS5fZ3NhcCA9IG5ldyBHU0NhY2hlKHRhcmdldHNbaV0sIGhhcm5lc3NQbHVnaW4pKSkgfHwgdGFyZ2V0cy5zcGxpY2UoaSwgMSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0cztcbn0sXG4gICAgX2dldENhY2hlID0gZnVuY3Rpb24gX2dldENhY2hlKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0Ll9nc2FwIHx8IF9oYXJuZXNzKHRvQXJyYXkodGFyZ2V0KSlbMF0uX2dzYXA7XG59LFxuICAgIF9nZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIF9nZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCB2KSB7XG4gIHJldHVybiAodiA9IHRhcmdldFtwcm9wZXJ0eV0pICYmIF9pc0Z1bmN0aW9uKHYpID8gdGFyZ2V0W3Byb3BlcnR5XSgpIDogX2lzVW5kZWZpbmVkKHYpICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShwcm9wZXJ0eSkgfHwgdjtcbn0sXG4gICAgX2ZvckVhY2hOYW1lID0gZnVuY3Rpb24gX2ZvckVhY2hOYW1lKG5hbWVzLCBmdW5jKSB7XG4gIHJldHVybiAobmFtZXMgPSBuYW1lcy5zcGxpdChcIixcIikpLmZvckVhY2goZnVuYykgfHwgbmFtZXM7XG59LFxuICAgIC8vc3BsaXQgYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCBvZiBuYW1lcyBpbnRvIGFuIGFycmF5LCB0aGVuIHJ1biBhIGZvckVhY2goKSBmdW5jdGlvbiBhbmQgcmV0dXJuIHRoZSBzcGxpdCBhcnJheSAodGhpcyBpcyBqdXN0IGEgd2F5IHRvIGNvbnNvbGlkYXRlL3Nob3J0ZW4gc29tZSBjb2RlKS5cbl9yb3VuZCA9IGZ1bmN0aW9uIF9yb3VuZCh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIDEwMDAwMCkgLyAxMDAwMDAgfHwgMDtcbn0sXG4gICAgX2FycmF5Q29udGFpbnNBbnkgPSBmdW5jdGlvbiBfYXJyYXlDb250YWluc0FueSh0b1NlYXJjaCwgdG9GaW5kKSB7XG4gIC8vc2VhcmNoZXMgb25lIGFycmF5IHRvIGZpbmQgbWF0Y2hlcyBmb3IgYW55IG9mIHRoZSBpdGVtcyBpbiB0aGUgdG9GaW5kIGFycmF5LiBBcyBzb29uIGFzIG9uZSBpcyBmb3VuZCwgaXQgcmV0dXJucyB0cnVlLiBJdCBkb2VzIE5PVCByZXR1cm4gYWxsIHRoZSBtYXRjaGVzOyBpdCdzIHNpbXBseSBhIGJvb2xlYW4gc2VhcmNoLlxuICB2YXIgbCA9IHRvRmluZC5sZW5ndGgsXG4gICAgICBpID0gMDtcblxuICBmb3IgKDsgdG9TZWFyY2guaW5kZXhPZih0b0ZpbmRbaV0pIDwgMCAmJiArK2kgPCBsOykge31cblxuICByZXR1cm4gaSA8IGw7XG59LFxuICAgIF9wYXJzZVZhcnMgPSBmdW5jdGlvbiBfcGFyc2VWYXJzKHBhcmFtcywgdHlwZSwgcGFyZW50KSB7XG4gIC8vcmVhZHMgdGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gb25lIG9mIHRoZSBrZXkgbWV0aG9kcyBhbmQgZmlndXJlcyBvdXQgaWYgdGhlIHVzZXIgaXMgZGVmaW5pbmcgdGhpbmdzIHdpdGggdGhlIE9MRC9sZWdhY3kgc3ludGF4IHdoZXJlIHRoZSBkdXJhdGlvbiBpcyB0aGUgMm5kIHBhcmFtZXRlciwgYW5kIHRoZW4gaXQgYWRqdXN0cyB0aGluZ3MgYWNjb3JkaW5nbHkgYW5kIHNwaXRzIGJhY2sgdGhlIGNvcnJlY3RlZCB2YXJzIG9iamVjdCAod2l0aCB0aGUgZHVyYXRpb24gYWRkZWQgaWYgbmVjZXNzYXJ5LCBhcyB3ZWxsIGFzIHJ1bkJhY2t3YXJkcyBvciBzdGFydEF0IG9yIGltbWVkaWF0ZVJlbmRlcikuIHR5cGUgMCA9IHRvKCkvc3RhZ2dlclRvKCksIDEgPSBmcm9tKCkvc3RhZ2dlckZyb20oKSwgMiA9IGZyb21UbygpL3N0YWdnZXJGcm9tVG8oKVxuICB2YXIgaXNMZWdhY3kgPSBfaXNOdW1iZXIocGFyYW1zWzFdKSxcbiAgICAgIHZhcnNJbmRleCA9IChpc0xlZ2FjeSA/IDIgOiAxKSArICh0eXBlIDwgMiA/IDAgOiAxKSxcbiAgICAgIHZhcnMgPSBwYXJhbXNbdmFyc0luZGV4XSxcbiAgICAgIGlyVmFycztcblxuICBpc0xlZ2FjeSAmJiAodmFycy5kdXJhdGlvbiA9IHBhcmFtc1sxXSk7XG4gIHZhcnMucGFyZW50ID0gcGFyZW50O1xuXG4gIGlmICh0eXBlKSB7XG4gICAgaXJWYXJzID0gdmFycztcblxuICAgIHdoaWxlIChwYXJlbnQgJiYgIShcImltbWVkaWF0ZVJlbmRlclwiIGluIGlyVmFycykpIHtcbiAgICAgIC8vIGluaGVyaXRhbmNlIGhhc24ndCBoYXBwZW5lZCB5ZXQsIGJ1dCBzb21lb25lIG1heSBoYXZlIHNldCBhIGRlZmF1bHQgaW4gYW4gYW5jZXN0b3IgdGltZWxpbmUuIFdlIGNvdWxkIGRvIHZhcnMuaW1tZWRpYXRlUmVuZGVyID0gX2lzTm90RmFsc2UoX2luaGVyaXREZWZhdWx0cyh2YXJzKS5pbW1lZGlhdGVSZW5kZXIpIGJ1dCB0aGF0J2QgZXhhY3QgYSBzbGlnaHQgcGVyZm9ybWFuY2UgcGVuYWx0eSBiZWNhdXNlIF9pbmhlcml0RGVmYXVsdHMoKSBhbHNvIHJ1bnMgaW4gdGhlIFR3ZWVuIGNvbnN0cnVjdG9yLiBXZSdyZSBwYXlpbmcgYSBzbWFsbCBrYiBwcmljZSBoZXJlIHRvIGdhaW4gc3BlZWQuXG4gICAgICBpclZhcnMgPSBwYXJlbnQudmFycy5kZWZhdWx0cyB8fCB7fTtcbiAgICAgIHBhcmVudCA9IF9pc05vdEZhbHNlKHBhcmVudC52YXJzLmluaGVyaXQpICYmIHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuXG4gICAgdmFycy5pbW1lZGlhdGVSZW5kZXIgPSBfaXNOb3RGYWxzZShpclZhcnMuaW1tZWRpYXRlUmVuZGVyKTtcbiAgICB0eXBlIDwgMiA/IHZhcnMucnVuQmFja3dhcmRzID0gMSA6IHZhcnMuc3RhcnRBdCA9IHBhcmFtc1t2YXJzSW5kZXggLSAxXTsgLy8gXCJmcm9tXCIgdmFyc1xuICB9XG5cbiAgcmV0dXJuIHZhcnM7XG59LFxuICAgIF9sYXp5UmVuZGVyID0gZnVuY3Rpb24gX2xhenlSZW5kZXIoKSB7XG4gIHZhciBsID0gX2xhenlUd2VlbnMubGVuZ3RoLFxuICAgICAgYSA9IF9sYXp5VHdlZW5zLnNsaWNlKDApLFxuICAgICAgaSxcbiAgICAgIHR3ZWVuO1xuXG4gIF9sYXp5TG9va3VwID0ge307XG4gIF9sYXp5VHdlZW5zLmxlbmd0aCA9IDA7XG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIHR3ZWVuID0gYVtpXTtcbiAgICB0d2VlbiAmJiB0d2Vlbi5fbGF6eSAmJiAodHdlZW4ucmVuZGVyKHR3ZWVuLl9sYXp5WzBdLCB0d2Vlbi5fbGF6eVsxXSwgdHJ1ZSkuX2xhenkgPSAwKTtcbiAgfVxufSxcbiAgICBfbGF6eVNhZmVSZW5kZXIgPSBmdW5jdGlvbiBfbGF6eVNhZmVSZW5kZXIoYW5pbWF0aW9uLCB0aW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcbiAgX2xhenlUd2VlbnMubGVuZ3RoICYmIF9sYXp5UmVuZGVyKCk7XG4gIGFuaW1hdGlvbi5yZW5kZXIodGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgX2xhenlUd2VlbnMubGVuZ3RoICYmIF9sYXp5UmVuZGVyKCk7IC8vaW4gY2FzZSByZW5kZXJpbmcgY2F1c2VkIGFueSB0d2VlbnMgdG8gbGF6eS1pbml0LCB3ZSBzaG91bGQgcmVuZGVyIHRoZW0gYmVjYXVzZSB0eXBpY2FsbHkgd2hlbiBzb21lb25lIGNhbGxzIHNlZWsoKSBvciB0aW1lKCkgb3IgcHJvZ3Jlc3MoKSwgdGhleSBleHBlY3QgYW4gaW1tZWRpYXRlIHJlbmRlci5cbn0sXG4gICAgX251bWVyaWNJZlBvc3NpYmxlID0gZnVuY3Rpb24gX251bWVyaWNJZlBvc3NpYmxlKHZhbHVlKSB7XG4gIHZhciBuID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIHJldHVybiAobiB8fCBuID09PSAwKSAmJiAodmFsdWUgKyBcIlwiKS5tYXRjaChfZGVsaW1pdGVkVmFsdWVFeHApLmxlbmd0aCA8IDIgPyBuIDogX2lzU3RyaW5nKHZhbHVlKSA/IHZhbHVlLnRyaW0oKSA6IHZhbHVlO1xufSxcbiAgICBfcGFzc1Rocm91Z2ggPSBmdW5jdGlvbiBfcGFzc1Rocm91Z2gocCkge1xuICByZXR1cm4gcDtcbn0sXG4gICAgX3NldERlZmF1bHRzID0gZnVuY3Rpb24gX3NldERlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHtcbiAgZm9yICh2YXIgcCBpbiBkZWZhdWx0cykge1xuICAgIHAgaW4gb2JqIHx8IChvYmpbcF0gPSBkZWZhdWx0c1twXSk7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSxcbiAgICBfc2V0S2V5ZnJhbWVEZWZhdWx0cyA9IGZ1bmN0aW9uIF9zZXRLZXlmcmFtZURlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHtcbiAgZm9yICh2YXIgcCBpbiBkZWZhdWx0cykge1xuICAgIHAgaW4gb2JqIHx8IHAgPT09IFwiZHVyYXRpb25cIiB8fCBwID09PSBcImVhc2VcIiB8fCAob2JqW3BdID0gZGVmYXVsdHNbcF0pO1xuICB9XG59LFxuICAgIF9tZXJnZSA9IGZ1bmN0aW9uIF9tZXJnZShiYXNlLCB0b01lcmdlKSB7XG4gIGZvciAodmFyIHAgaW4gdG9NZXJnZSkge1xuICAgIGJhc2VbcF0gPSB0b01lcmdlW3BdO1xuICB9XG5cbiAgcmV0dXJuIGJhc2U7XG59LFxuICAgIF9tZXJnZURlZXAgPSBmdW5jdGlvbiBfbWVyZ2VEZWVwKGJhc2UsIHRvTWVyZ2UpIHtcbiAgZm9yICh2YXIgcCBpbiB0b01lcmdlKSB7XG4gICAgYmFzZVtwXSA9IF9pc09iamVjdCh0b01lcmdlW3BdKSA/IF9tZXJnZURlZXAoYmFzZVtwXSB8fCAoYmFzZVtwXSA9IHt9KSwgdG9NZXJnZVtwXSkgOiB0b01lcmdlW3BdO1xuICB9XG5cbiAgcmV0dXJuIGJhc2U7XG59LFxuICAgIF9jb3B5RXhjbHVkaW5nID0gZnVuY3Rpb24gX2NvcHlFeGNsdWRpbmcob2JqLCBleGNsdWRpbmcpIHtcbiAgdmFyIGNvcHkgPSB7fSxcbiAgICAgIHA7XG5cbiAgZm9yIChwIGluIG9iaikge1xuICAgIHAgaW4gZXhjbHVkaW5nIHx8IChjb3B5W3BdID0gb2JqW3BdKTtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICBfaW5oZXJpdERlZmF1bHRzID0gZnVuY3Rpb24gX2luaGVyaXREZWZhdWx0cyh2YXJzKSB7XG4gIHZhciBwYXJlbnQgPSB2YXJzLnBhcmVudCB8fCBfZ2xvYmFsVGltZWxpbmUsXG4gICAgICBmdW5jID0gdmFycy5rZXlmcmFtZXMgPyBfc2V0S2V5ZnJhbWVEZWZhdWx0cyA6IF9zZXREZWZhdWx0cztcblxuICBpZiAoX2lzTm90RmFsc2UodmFycy5pbmhlcml0KSkge1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIGZ1bmModmFycywgcGFyZW50LnZhcnMuZGVmYXVsdHMpO1xuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudCB8fCBwYXJlbnQuX2RwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YXJzO1xufSxcbiAgICBfYXJyYXlzTWF0Y2ggPSBmdW5jdGlvbiBfYXJyYXlzTWF0Y2goYTEsIGEyKSB7XG4gIHZhciBpID0gYTEubGVuZ3RoLFxuICAgICAgbWF0Y2ggPSBpID09PSBhMi5sZW5ndGg7XG5cbiAgd2hpbGUgKG1hdGNoICYmIGktLSAmJiBhMVtpXSA9PT0gYTJbaV0pIHt9XG5cbiAgcmV0dXJuIGkgPCAwO1xufSxcbiAgICBfYWRkTGlua2VkTGlzdEl0ZW0gPSBmdW5jdGlvbiBfYWRkTGlua2VkTGlzdEl0ZW0ocGFyZW50LCBjaGlsZCwgZmlyc3RQcm9wLCBsYXN0UHJvcCwgc29ydEJ5KSB7XG4gIGlmIChmaXJzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGZpcnN0UHJvcCA9IFwiX2ZpcnN0XCI7XG4gIH1cblxuICBpZiAobGFzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGxhc3RQcm9wID0gXCJfbGFzdFwiO1xuICB9XG5cbiAgdmFyIHByZXYgPSBwYXJlbnRbbGFzdFByb3BdLFxuICAgICAgdDtcblxuICBpZiAoc29ydEJ5KSB7XG4gICAgdCA9IGNoaWxkW3NvcnRCeV07XG5cbiAgICB3aGlsZSAocHJldiAmJiBwcmV2W3NvcnRCeV0gPiB0KSB7XG4gICAgICBwcmV2ID0gcHJldi5fcHJldjtcbiAgICB9XG4gIH1cblxuICBpZiAocHJldikge1xuICAgIGNoaWxkLl9uZXh0ID0gcHJldi5fbmV4dDtcbiAgICBwcmV2Ll9uZXh0ID0gY2hpbGQ7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGQuX25leHQgPSBwYXJlbnRbZmlyc3RQcm9wXTtcbiAgICBwYXJlbnRbZmlyc3RQcm9wXSA9IGNoaWxkO1xuICB9XG5cbiAgaWYgKGNoaWxkLl9uZXh0KSB7XG4gICAgY2hpbGQuX25leHQuX3ByZXYgPSBjaGlsZDtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnRbbGFzdFByb3BdID0gY2hpbGQ7XG4gIH1cblxuICBjaGlsZC5fcHJldiA9IHByZXY7XG4gIGNoaWxkLnBhcmVudCA9IGNoaWxkLl9kcCA9IHBhcmVudDtcbiAgcmV0dXJuIGNoaWxkO1xufSxcbiAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0gPSBmdW5jdGlvbiBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0ocGFyZW50LCBjaGlsZCwgZmlyc3RQcm9wLCBsYXN0UHJvcCkge1xuICBpZiAoZmlyc3RQcm9wID09PSB2b2lkIDApIHtcbiAgICBmaXJzdFByb3AgPSBcIl9maXJzdFwiO1xuICB9XG5cbiAgaWYgKGxhc3RQcm9wID09PSB2b2lkIDApIHtcbiAgICBsYXN0UHJvcCA9IFwiX2xhc3RcIjtcbiAgfVxuXG4gIHZhciBwcmV2ID0gY2hpbGQuX3ByZXYsXG4gICAgICBuZXh0ID0gY2hpbGQuX25leHQ7XG5cbiAgaWYgKHByZXYpIHtcbiAgICBwcmV2Ll9uZXh0ID0gbmV4dDtcbiAgfSBlbHNlIGlmIChwYXJlbnRbZmlyc3RQcm9wXSA9PT0gY2hpbGQpIHtcbiAgICBwYXJlbnRbZmlyc3RQcm9wXSA9IG5leHQ7XG4gIH1cblxuICBpZiAobmV4dCkge1xuICAgIG5leHQuX3ByZXYgPSBwcmV2O1xuICB9IGVsc2UgaWYgKHBhcmVudFtsYXN0UHJvcF0gPT09IGNoaWxkKSB7XG4gICAgcGFyZW50W2xhc3RQcm9wXSA9IHByZXY7XG4gIH1cblxuICBjaGlsZC5fbmV4dCA9IGNoaWxkLl9wcmV2ID0gY2hpbGQucGFyZW50ID0gbnVsbDsgLy8gZG9uJ3QgZGVsZXRlIHRoZSBfZHAganVzdCBzbyB3ZSBjYW4gcmV2ZXJ0IGlmIG5lY2Vzc2FyeS4gQnV0IHBhcmVudCBzaG91bGQgYmUgbnVsbCB0byBpbmRpY2F0ZSB0aGUgaXRlbSBpc24ndCBpbiBhIGxpbmtlZCBsaXN0LlxufSxcbiAgICBfcmVtb3ZlRnJvbVBhcmVudCA9IGZ1bmN0aW9uIF9yZW1vdmVGcm9tUGFyZW50KGNoaWxkLCBvbmx5SWZQYXJlbnRIYXNBdXRvUmVtb3ZlKSB7XG4gIGNoaWxkLnBhcmVudCAmJiAoIW9ubHlJZlBhcmVudEhhc0F1dG9SZW1vdmUgfHwgY2hpbGQucGFyZW50LmF1dG9SZW1vdmVDaGlsZHJlbikgJiYgY2hpbGQucGFyZW50LnJlbW92ZShjaGlsZCk7XG4gIGNoaWxkLl9hY3QgPSAwO1xufSxcbiAgICBfdW5jYWNoZSA9IGZ1bmN0aW9uIF91bmNhY2hlKGFuaW1hdGlvbiwgY2hpbGQpIHtcbiAgaWYgKCFjaGlsZCB8fCBjaGlsZC5fZW5kID4gYW5pbWF0aW9uLl9kdXIgfHwgY2hpbGQuX3N0YXJ0IDwgMCkge1xuICAgIC8vIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbjogaWYgYSBjaGlsZCBhbmltYXRpb24gaXMgcGFzc2VkIGluIHdlIHNob3VsZCBvbmx5IHVuY2FjaGUgaWYgdGhhdCBjaGlsZCBFWFRFTkRTIHRoZSBhbmltYXRpb24gKGl0cyBlbmQgdGltZSBpcyBiZXlvbmQgdGhlIGVuZClcbiAgICB2YXIgYSA9IGFuaW1hdGlvbjtcblxuICAgIHdoaWxlIChhKSB7XG4gICAgICBhLl9kaXJ0eSA9IDE7XG4gICAgICBhID0gYS5wYXJlbnQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX3JlY2FjaGVBbmNlc3RvcnMgPSBmdW5jdGlvbiBfcmVjYWNoZUFuY2VzdG9ycyhhbmltYXRpb24pIHtcbiAgdmFyIHBhcmVudCA9IGFuaW1hdGlvbi5wYXJlbnQ7XG5cbiAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQucGFyZW50KSB7XG4gICAgLy9zb21ldGltZXMgd2UgbXVzdCBmb3JjZSBhIHJlLXNvcnQgb2YgYWxsIGNoaWxkcmVuIGFuZCB1cGRhdGUgdGhlIGR1cmF0aW9uL3RvdGFsRHVyYXRpb24gb2YgYWxsIGFuY2VzdG9yIHRpbWVsaW5lcyBpbW1lZGlhdGVseSBpbiBjYXNlLCBmb3IgZXhhbXBsZSwgaW4gdGhlIG1pZGRsZSBvZiBhIHJlbmRlciBsb29wLCBvbmUgdHdlZW4gYWx0ZXJzIGFub3RoZXIgdHdlZW4ncyB0aW1lU2NhbGUgd2hpY2ggc2hvdmVzIGl0cyBzdGFydFRpbWUgYmVmb3JlIDAsIGZvcmNpbmcgdGhlIHBhcmVudCB0aW1lbGluZSB0byBzaGlmdCBhcm91bmQgYW5kIHNoaWZ0Q2hpbGRyZW4oKSB3aGljaCBjb3VsZCBhZmZlY3QgdGhhdCBuZXh0IHR3ZWVuJ3MgcmVuZGVyIChzdGFydFRpbWUpLiBEb2Vzbid0IG1hdHRlciBmb3IgdGhlIHJvb3QgdGltZWxpbmUgdGhvdWdoLlxuICAgIHBhcmVudC5fZGlydHkgPSAxO1xuICAgIHBhcmVudC50b3RhbER1cmF0aW9uKCk7XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgfVxuXG4gIHJldHVybiBhbmltYXRpb247XG59LFxuICAgIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyA9IGZ1bmN0aW9uIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyhhbmltYXRpb24pIHtcbiAgcmV0dXJuICFhbmltYXRpb24gfHwgYW5pbWF0aW9uLl90cyAmJiBfaGFzTm9QYXVzZWRBbmNlc3RvcnMoYW5pbWF0aW9uLnBhcmVudCk7XG59LFxuICAgIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbiA9IGZ1bmN0aW9uIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbihhbmltYXRpb24pIHtcbiAgcmV0dXJuIGFuaW1hdGlvbi5fcmVwZWF0ID8gX2FuaW1hdGlvbkN5Y2xlKGFuaW1hdGlvbi5fdFRpbWUsIGFuaW1hdGlvbiA9IGFuaW1hdGlvbi5kdXJhdGlvbigpICsgYW5pbWF0aW9uLl9yRGVsYXkpICogYW5pbWF0aW9uIDogMDtcbn0sXG4gICAgLy8gZmVlZCBpbiB0aGUgdG90YWxUaW1lIGFuZCBjeWNsZUR1cmF0aW9uIGFuZCBpdCdsbCByZXR1cm4gdGhlIGN5Y2xlIChpdGVyYXRpb24gbWludXMgMSkgYW5kIGlmIHRoZSBwbGF5aGVhZCBpcyBleGFjdGx5IGF0IHRoZSB2ZXJ5IEVORCwgaXQgd2lsbCBOT1QgYnVtcCB1cCB0byB0aGUgbmV4dCBjeWNsZS5cbl9hbmltYXRpb25DeWNsZSA9IGZ1bmN0aW9uIF9hbmltYXRpb25DeWNsZSh0VGltZSwgY3ljbGVEdXJhdGlvbikge1xuICByZXR1cm4gKHRUaW1lIC89IGN5Y2xlRHVyYXRpb24pICYmIH5+dFRpbWUgPT09IHRUaW1lID8gfn50VGltZSAtIDEgOiB+fnRUaW1lO1xufSxcbiAgICBfcGFyZW50VG9DaGlsZFRvdGFsVGltZSA9IGZ1bmN0aW9uIF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHBhcmVudFRpbWUsIGNoaWxkKSB7XG4gIHJldHVybiAocGFyZW50VGltZSAtIGNoaWxkLl9zdGFydCkgKiBjaGlsZC5fdHMgKyAoY2hpbGQuX3RzID49IDAgPyAwIDogY2hpbGQuX2RpcnR5ID8gY2hpbGQudG90YWxEdXJhdGlvbigpIDogY2hpbGQuX3REdXIpO1xufSxcbiAgICBfc2V0RW5kID0gZnVuY3Rpb24gX3NldEVuZChhbmltYXRpb24pIHtcbiAgcmV0dXJuIGFuaW1hdGlvbi5fZW5kID0gX3JvdW5kKGFuaW1hdGlvbi5fc3RhcnQgKyAoYW5pbWF0aW9uLl90RHVyIC8gTWF0aC5hYnMoYW5pbWF0aW9uLl90cyB8fCBhbmltYXRpb24uX3J0cyB8fCBfdGlueU51bSkgfHwgMCkpO1xufSxcbiAgICBfYWxpZ25QbGF5aGVhZCA9IGZ1bmN0aW9uIF9hbGlnblBsYXloZWFkKGFuaW1hdGlvbiwgdG90YWxUaW1lKSB7XG4gIC8vIGFkanVzdHMgdGhlIGFuaW1hdGlvbidzIF9zdGFydCBhbmQgX2VuZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkIHRvdGFsVGltZSAob25seSBpZiB0aGUgcGFyZW50J3Mgc21vb3RoQ2hpbGRUaW1pbmcgaXMgdHJ1ZSBhbmQgdGhlIGFuaW1hdGlvbiBpc24ndCBwYXVzZWQpLiBJdCBkb2Vzbid0IGRvIGFueSByZW5kZXJpbmcgb3IgZm9yY2luZyB0aGluZ3MgYmFjayBpbnRvIHBhcmVudCB0aW1lbGluZXMsIGV0Yy4gLSB0aGF0J3Mgd2hhdCB0b3RhbFRpbWUoKSBpcyBmb3IuXG4gIHZhciBwYXJlbnQgPSBhbmltYXRpb24uX2RwO1xuXG4gIGlmIChwYXJlbnQgJiYgcGFyZW50LnNtb290aENoaWxkVGltaW5nICYmIGFuaW1hdGlvbi5fdHMpIHtcbiAgICBhbmltYXRpb24uX3N0YXJ0ID0gX3JvdW5kKGFuaW1hdGlvbi5fZHAuX3RpbWUgLSAoYW5pbWF0aW9uLl90cyA+IDAgPyB0b3RhbFRpbWUgLyBhbmltYXRpb24uX3RzIDogKChhbmltYXRpb24uX2RpcnR5ID8gYW5pbWF0aW9uLnRvdGFsRHVyYXRpb24oKSA6IGFuaW1hdGlvbi5fdER1cikgLSB0b3RhbFRpbWUpIC8gLWFuaW1hdGlvbi5fdHMpKTtcblxuICAgIF9zZXRFbmQoYW5pbWF0aW9uKTtcblxuICAgIHBhcmVudC5fZGlydHkgfHwgX3VuY2FjaGUocGFyZW50LCBhbmltYXRpb24pOyAvL2ZvciBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudC4gSWYgdGhlIHBhcmVudCdzIGNhY2hlIGlzIGFscmVhZHkgZGlydHksIGl0IGFscmVhZHkgdG9vayBjYXJlIG9mIG1hcmtpbmcgdGhlIGFuY2VzdG9ycyBhcyBkaXJ0eSB0b28sIHNvIHNraXAgdGhlIGZ1bmN0aW9uIGNhbGwgaGVyZS5cbiAgfVxuXG4gIHJldHVybiBhbmltYXRpb247XG59LFxuXG4vKlxuX3RvdGFsVGltZVRvVGltZSA9IChjbGFtcGVkVG90YWxUaW1lLCBkdXJhdGlvbiwgcmVwZWF0LCByZXBlYXREZWxheSwgeW95bykgPT4ge1xuXHRsZXQgY3ljbGVEdXJhdGlvbiA9IGR1cmF0aW9uICsgcmVwZWF0RGVsYXksXG5cdFx0dGltZSA9IF9yb3VuZChjbGFtcGVkVG90YWxUaW1lICUgY3ljbGVEdXJhdGlvbik7XG5cdGlmICh0aW1lID4gZHVyYXRpb24pIHtcblx0XHR0aW1lID0gZHVyYXRpb247XG5cdH1cblx0cmV0dXJuICh5b3lvICYmICh+fihjbGFtcGVkVG90YWxUaW1lIC8gY3ljbGVEdXJhdGlvbikgJiAxKSkgPyBkdXJhdGlvbiAtIHRpbWUgOiB0aW1lO1xufSxcbiovXG5fcG9zdEFkZENoZWNrcyA9IGZ1bmN0aW9uIF9wb3N0QWRkQ2hlY2tzKHRpbWVsaW5lLCBjaGlsZCkge1xuICB2YXIgdDtcblxuICBpZiAoY2hpbGQuX3RpbWUgfHwgY2hpbGQuX2luaXR0ZWQgJiYgIWNoaWxkLl9kdXIpIHtcbiAgICAvL2luIGNhc2UsIGZvciBleGFtcGxlLCB0aGUgX3N0YXJ0IGlzIG1vdmVkIG9uIGEgdHdlZW4gdGhhdCBoYXMgYWxyZWFkeSByZW5kZXJlZC4gSW1hZ2luZSBpdCdzIGF0IGl0cyBlbmQgc3RhdGUsIHRoZW4gdGhlIHN0YXJ0VGltZSBpcyBtb3ZlZCBXQVkgbGF0ZXIgKGFmdGVyIHRoZSBlbmQgb2YgdGhpcyB0aW1lbGluZSksIGl0IHNob3VsZCByZW5kZXIgYXQgaXRzIGJlZ2lubmluZy5cbiAgICB0ID0gX3BhcmVudFRvQ2hpbGRUb3RhbFRpbWUodGltZWxpbmUucmF3VGltZSgpLCBjaGlsZCk7XG5cbiAgICBpZiAoIWNoaWxkLl9kdXIgfHwgX2NsYW1wKDAsIGNoaWxkLnRvdGFsRHVyYXRpb24oKSwgdCkgLSBjaGlsZC5fdFRpbWUgPiBfdGlueU51bSkge1xuICAgICAgY2hpbGQucmVuZGVyKHQsIHRydWUpO1xuICAgIH1cbiAgfSAvL2lmIHRoZSB0aW1lbGluZSBoYXMgYWxyZWFkeSBlbmRlZCBidXQgdGhlIGluc2VydGVkIHR3ZWVuL3RpbWVsaW5lIGV4dGVuZHMgdGhlIGR1cmF0aW9uLCB3ZSBzaG91bGQgZW5hYmxlIHRoaXMgdGltZWxpbmUgYWdhaW4gc28gdGhhdCBpdCByZW5kZXJzIHByb3Blcmx5LiBXZSBzaG91bGQgYWxzbyBhbGlnbiB0aGUgcGxheWhlYWQgd2l0aCB0aGUgcGFyZW50IHRpbWVsaW5lJ3Mgd2hlbiBhcHByb3ByaWF0ZS5cblxuXG4gIGlmIChfdW5jYWNoZSh0aW1lbGluZSwgY2hpbGQpLl9kcCAmJiB0aW1lbGluZS5faW5pdHRlZCAmJiB0aW1lbGluZS5fdGltZSA+PSB0aW1lbGluZS5fZHVyICYmIHRpbWVsaW5lLl90cykge1xuICAgIC8vaW4gY2FzZSBhbnkgb2YgdGhlIGFuY2VzdG9ycyBoYWQgY29tcGxldGVkIGJ1dCBzaG91bGQgbm93IGJlIGVuYWJsZWQuLi5cbiAgICBpZiAodGltZWxpbmUuX2R1ciA8IHRpbWVsaW5lLmR1cmF0aW9uKCkpIHtcbiAgICAgIHQgPSB0aW1lbGluZTtcblxuICAgICAgd2hpbGUgKHQuX2RwKSB7XG4gICAgICAgIHQucmF3VGltZSgpID49IDAgJiYgdC50b3RhbFRpbWUodC5fdFRpbWUpOyAvL21vdmVzIHRoZSB0aW1lbGluZSAoc2hpZnRzIGl0cyBzdGFydFRpbWUpIGlmIG5lY2Vzc2FyeSwgYW5kIGFsc28gZW5hYmxlcyBpdC4gSWYgaXQncyBjdXJyZW50bHkgemVybywgdGhvdWdoLCBpdCBtYXkgbm90IGJlIHNjaGVkdWxlZCB0byByZW5kZXIgdW50aWwgbGF0ZXIgc28gdGhlcmUncyBubyBuZWVkIHRvIGZvcmNlIGl0IHRvIGFsaWduIHdpdGggdGhlIGN1cnJlbnQgcGxheWhlYWQgcG9zaXRpb24uIE9ubHkgbW92ZSB0byBjYXRjaCB1cCB3aXRoIHRoZSBwbGF5aGVhZC5cblxuICAgICAgICB0ID0gdC5fZHA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGltZWxpbmUuX3pUaW1lID0gLV90aW55TnVtOyAvLyBoZWxwcyBlbnN1cmUgdGhhdCB0aGUgbmV4dCByZW5kZXIoKSB3aWxsIGJlIGZvcmNlZCAoY3Jvc3NpbmdTdGFydCA9IHRydWUgaW4gcmVuZGVyKCkpLCBldmVuIGlmIHRoZSBkdXJhdGlvbiBoYXNuJ3QgY2hhbmdlZCAod2UncmUgYWRkaW5nIGEgY2hpbGQgd2hpY2ggd291bGQgbmVlZCB0byBnZXQgcmVuZGVyZWQpLiBEZWZpbml0ZWx5IGFuIGVkZ2UgY2FzZS4gTm90ZTogd2UgTVVTVCBkbyB0aGlzIEFGVEVSIHRoZSBsb29wIGFib3ZlIHdoZXJlIHRoZSB0b3RhbFRpbWUoKSBtaWdodCB0cmlnZ2VyIGEgcmVuZGVyKCkgYmVjYXVzZSB0aGlzIF9hZGRUb1RpbWVsaW5lKCkgbWV0aG9kIGdldHMgY2FsbGVkIGZyb20gdGhlIEFuaW1hdGlvbiBjb25zdHJ1Y3RvciwgQkVGT1JFIHR3ZWVucyBldmVuIHJlY29yZCB0aGVpciB0YXJnZXRzLCBldGMuIHNvIHdlIHdvdWxkbid0IHdhbnQgdGhpbmdzIHRvIGdldCB0cmlnZ2VyZWQgaW4gdGhlIHdyb25nIG9yZGVyLlxuICB9XG59LFxuICAgIF9hZGRUb1RpbWVsaW5lID0gZnVuY3Rpb24gX2FkZFRvVGltZWxpbmUodGltZWxpbmUsIGNoaWxkLCBwb3NpdGlvbiwgc2tpcENoZWNrcykge1xuICBjaGlsZC5wYXJlbnQgJiYgX3JlbW92ZUZyb21QYXJlbnQoY2hpbGQpO1xuICBjaGlsZC5fc3RhcnQgPSBfcm91bmQocG9zaXRpb24gKyBjaGlsZC5fZGVsYXkpO1xuICBjaGlsZC5fZW5kID0gX3JvdW5kKGNoaWxkLl9zdGFydCArIChjaGlsZC50b3RhbER1cmF0aW9uKCkgLyBNYXRoLmFicyhjaGlsZC50aW1lU2NhbGUoKSkgfHwgMCkpO1xuXG4gIF9hZGRMaW5rZWRMaXN0SXRlbSh0aW1lbGluZSwgY2hpbGQsIFwiX2ZpcnN0XCIsIFwiX2xhc3RcIiwgdGltZWxpbmUuX3NvcnQgPyBcIl9zdGFydFwiIDogMCk7XG5cbiAgdGltZWxpbmUuX3JlY2VudCA9IGNoaWxkO1xuICBza2lwQ2hlY2tzIHx8IF9wb3N0QWRkQ2hlY2tzKHRpbWVsaW5lLCBjaGlsZCk7XG4gIHJldHVybiB0aW1lbGluZTtcbn0sXG4gICAgX3Njcm9sbFRyaWdnZXIgPSBmdW5jdGlvbiBfc2Nyb2xsVHJpZ2dlcihhbmltYXRpb24sIHRyaWdnZXIpIHtcbiAgcmV0dXJuIChfZ2xvYmFscy5TY3JvbGxUcmlnZ2VyIHx8IF9taXNzaW5nUGx1Z2luKFwic2Nyb2xsVHJpZ2dlclwiLCB0cmlnZ2VyKSkgJiYgX2dsb2JhbHMuU2Nyb2xsVHJpZ2dlci5jcmVhdGUodHJpZ2dlciwgYW5pbWF0aW9uKTtcbn0sXG4gICAgX2F0dGVtcHRJbml0VHdlZW4gPSBmdW5jdGlvbiBfYXR0ZW1wdEluaXRUd2Vlbih0d2VlbiwgdG90YWxUaW1lLCBmb3JjZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgX2luaXRUd2Vlbih0d2VlbiwgdG90YWxUaW1lKTtcblxuICBpZiAoIXR3ZWVuLl9pbml0dGVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoIWZvcmNlICYmIHR3ZWVuLl9wdCAmJiAodHdlZW4uX2R1ciAmJiB0d2Vlbi52YXJzLmxhenkgIT09IGZhbHNlIHx8ICF0d2Vlbi5fZHVyICYmIHR3ZWVuLnZhcnMubGF6eSkgJiYgX2xhc3RSZW5kZXJlZEZyYW1lICE9PSBfdGlja2VyLmZyYW1lKSB7XG4gICAgX2xhenlUd2VlbnMucHVzaCh0d2Vlbik7XG5cbiAgICB0d2Vlbi5fbGF6eSA9IFt0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzXTtcbiAgICByZXR1cm4gMTtcbiAgfVxufSxcbiAgICBfcmVuZGVyWmVyb0R1cmF0aW9uVHdlZW4gPSBmdW5jdGlvbiBfcmVuZGVyWmVyb0R1cmF0aW9uVHdlZW4odHdlZW4sIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG4gIHZhciBwcmV2UmF0aW8gPSB0d2Vlbi5yYXRpbyxcbiAgICAgIHJhdGlvID0gdG90YWxUaW1lIDwgMCB8fCAhdG90YWxUaW1lICYmIHByZXZSYXRpbyAmJiAhdHdlZW4uX3N0YXJ0ICYmIHR3ZWVuLl96VGltZSA+IF90aW55TnVtICYmICF0d2Vlbi5fZHAuX2xvY2sgfHwgKHR3ZWVuLl90cyA8IDAgfHwgdHdlZW4uX2RwLl90cyA8IDApICYmIHR3ZWVuLmRhdGEgIT09IFwiaXNGcm9tU3RhcnRcIiAmJiB0d2Vlbi5kYXRhICE9PSBcImlzU3RhcnRcIiA/IDAgOiAxLFxuICAgICAgLy8gY2hlY2sgcGFyZW50J3MgX2xvY2sgYmVjYXVzZSB3aGVuIGEgdGltZWxpbmUgcmVwZWF0cy95b3lvcyBhbmQgZG9lcyBpdHMgYXJ0aWZpY2lhbCB3cmFwcGluZywgd2Ugc2hvdWxkbid0IGZvcmNlIHRoZSByYXRpbyBiYWNrIHRvIDAuIEFsc28sIGlmIHRoZSB0d2VlbiBvciBpdHMgcGFyZW50IGlzIHJldmVyc2VkIGFuZCB0aGUgdG90YWxUaW1lIGlzIDAsIHdlIHNob3VsZCBnbyB0byBhIHJhdGlvIG9mIDAuXG4gIHJlcGVhdERlbGF5ID0gdHdlZW4uX3JEZWxheSxcbiAgICAgIHRUaW1lID0gMCxcbiAgICAgIHB0LFxuICAgICAgaXRlcmF0aW9uLFxuICAgICAgcHJldkl0ZXJhdGlvbjtcblxuICBpZiAocmVwZWF0RGVsYXkgJiYgdHdlZW4uX3JlcGVhdCkge1xuICAgIC8vIGluIGNhc2UgdGhlcmUncyBhIHplcm8tZHVyYXRpb24gdHdlZW4gdGhhdCBoYXMgYSByZXBlYXQgd2l0aCBhIHJlcGVhdERlbGF5XG4gICAgdFRpbWUgPSBfY2xhbXAoMCwgdHdlZW4uX3REdXIsIHRvdGFsVGltZSk7XG4gICAgaXRlcmF0aW9uID0gX2FuaW1hdGlvbkN5Y2xlKHRUaW1lLCByZXBlYXREZWxheSk7XG4gICAgcHJldkl0ZXJhdGlvbiA9IF9hbmltYXRpb25DeWNsZSh0d2Vlbi5fdFRpbWUsIHJlcGVhdERlbGF5KTtcblxuICAgIGlmIChpdGVyYXRpb24gIT09IHByZXZJdGVyYXRpb24pIHtcbiAgICAgIHByZXZSYXRpbyA9IDEgLSByYXRpbztcbiAgICAgIHR3ZWVuLnZhcnMucmVwZWF0UmVmcmVzaCAmJiB0d2Vlbi5faW5pdHRlZCAmJiB0d2Vlbi5pbnZhbGlkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCF0d2Vlbi5faW5pdHRlZCAmJiBfYXR0ZW1wdEluaXRUd2Vlbih0d2VlbiwgdG90YWxUaW1lLCBmb3JjZSwgc3VwcHJlc3NFdmVudHMpKSB7XG4gICAgLy8gaWYgd2UgcmVuZGVyIHRoZSB2ZXJ5IGJlZ2lubmluZyAodGltZSA9PSAwKSBvZiBhIGZyb21UbygpLCB3ZSBtdXN0IGZvcmNlIHRoZSByZW5kZXIgKG5vcm1hbCB0d2VlbnMgd291bGRuJ3QgbmVlZCB0byByZW5kZXIgYXQgYSB0aW1lIG9mIDAgd2hlbiB0aGUgcHJldlRpbWUgd2FzIGFsc28gMCkuIFRoaXMgaXMgYWxzbyBtYW5kYXRvcnkgdG8gbWFrZSBzdXJlIG92ZXJ3cml0aW5nIGtpY2tzIGluIGltbWVkaWF0ZWx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChyYXRpbyAhPT0gcHJldlJhdGlvIHx8IGZvcmNlIHx8IHR3ZWVuLl96VGltZSA9PT0gX3RpbnlOdW0gfHwgIXRvdGFsVGltZSAmJiB0d2Vlbi5felRpbWUpIHtcbiAgICBwcmV2SXRlcmF0aW9uID0gdHdlZW4uX3pUaW1lO1xuICAgIHR3ZWVuLl96VGltZSA9IHRvdGFsVGltZSB8fCAoc3VwcHJlc3NFdmVudHMgPyBfdGlueU51bSA6IDApOyAvLyB3aGVuIHRoZSBwbGF5aGVhZCBhcnJpdmVzIGF0IEVYQUNUTFkgdGltZSAwIChyaWdodCBvbiB0b3ApIG9mIGEgemVyby1kdXJhdGlvbiB0d2Vlbiwgd2UgbmVlZCB0byBkaXNjZXJuIGlmIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBzbyB0aGF0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIGFnYWluIChuZXh0IHRpbWUpLCBpdCdsbCB0cmlnZ2VyIHRoZSBjYWxsYmFjay4gSWYgZXZlbnRzIGFyZSBOT1Qgc3VwcHJlc3NlZCwgb2J2aW91c2x5IHRoZSBjYWxsYmFjayB3b3VsZCBiZSB0cmlnZ2VyZWQgaW4gdGhpcyByZW5kZXIuIEJhc2ljYWxseSwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlIGVpdGhlciB3aGVuIHRoZSBwbGF5aGVhZCBBUlJJVkVTIG9yIExFQVZFUyB0aGlzIGV4YWN0IHNwb3QsIG5vdCBib3RoLiBJbWFnaW5lIGRvaW5nIGEgdGltZWxpbmUuc2VlaygwKSBhbmQgdGhlcmUncyBhIGNhbGxiYWNrIHRoYXQgc2l0cyBhdCAwLiBTaW5jZSBldmVudHMgYXJlIHN1cHByZXNzZWQgb24gdGhhdCBzZWVrKCkgYnkgZGVmYXVsdCwgbm90aGluZyB3aWxsIGZpcmUsIGJ1dCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBvZmYgb2YgdGhhdCBwb3NpdGlvbiwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlLiBUaGlzIGJlaGF2aW9yIGlzIHdoYXQgcGVvcGxlIGludHVpdGl2ZWx5IGV4cGVjdC5cblxuICAgIHN1cHByZXNzRXZlbnRzIHx8IChzdXBwcmVzc0V2ZW50cyA9IHRvdGFsVGltZSAmJiAhcHJldkl0ZXJhdGlvbik7IC8vIGlmIGl0IHdhcyByZW5kZXJlZCBwcmV2aW91c2x5IGF0IGV4YWN0bHkgMCAoX3pUaW1lKSBhbmQgbm93IHRoZSBwbGF5aGVhZCBpcyBtb3ZpbmcgYXdheSwgRE9OJ1QgZmlyZSBjYWxsYmFja3Mgb3RoZXJ3aXNlIHRoZXknbGwgc2VlbSBsaWtlIGR1cGxpY2F0ZXMuXG5cbiAgICB0d2Vlbi5yYXRpbyA9IHJhdGlvO1xuICAgIHR3ZWVuLl9mcm9tICYmIChyYXRpbyA9IDEgLSByYXRpbyk7XG4gICAgdHdlZW4uX3RpbWUgPSAwO1xuICAgIHR3ZWVuLl90VGltZSA9IHRUaW1lO1xuICAgIHN1cHByZXNzRXZlbnRzIHx8IF9jYWxsYmFjayh0d2VlbiwgXCJvblN0YXJ0XCIpO1xuICAgIHB0ID0gdHdlZW4uX3B0O1xuXG4gICAgd2hpbGUgKHB0KSB7XG4gICAgICBwdC5yKHJhdGlvLCBwdC5kKTtcbiAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgfVxuXG4gICAgdHdlZW4uX3N0YXJ0QXQgJiYgdG90YWxUaW1lIDwgMCAmJiB0d2Vlbi5fc3RhcnRBdC5yZW5kZXIodG90YWxUaW1lLCB0cnVlLCB0cnVlKTtcbiAgICB0d2Vlbi5fb25VcGRhdGUgJiYgIXN1cHByZXNzRXZlbnRzICYmIF9jYWxsYmFjayh0d2VlbiwgXCJvblVwZGF0ZVwiKTtcbiAgICB0VGltZSAmJiB0d2Vlbi5fcmVwZWF0ICYmICFzdXBwcmVzc0V2ZW50cyAmJiB0d2Vlbi5wYXJlbnQgJiYgX2NhbGxiYWNrKHR3ZWVuLCBcIm9uUmVwZWF0XCIpO1xuXG4gICAgaWYgKCh0b3RhbFRpbWUgPj0gdHdlZW4uX3REdXIgfHwgdG90YWxUaW1lIDwgMCkgJiYgdHdlZW4ucmF0aW8gPT09IHJhdGlvKSB7XG4gICAgICByYXRpbyAmJiBfcmVtb3ZlRnJvbVBhcmVudCh0d2VlbiwgMSk7XG5cbiAgICAgIGlmICghc3VwcHJlc3NFdmVudHMpIHtcbiAgICAgICAgX2NhbGxiYWNrKHR3ZWVuLCByYXRpbyA/IFwib25Db21wbGV0ZVwiIDogXCJvblJldmVyc2VDb21wbGV0ZVwiLCB0cnVlKTtcblxuICAgICAgICB0d2Vlbi5fcHJvbSAmJiB0d2Vlbi5fcHJvbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICghdHdlZW4uX3pUaW1lKSB7XG4gICAgdHdlZW4uX3pUaW1lID0gdG90YWxUaW1lO1xuICB9XG59LFxuICAgIF9maW5kTmV4dFBhdXNlVHdlZW4gPSBmdW5jdGlvbiBfZmluZE5leHRQYXVzZVR3ZWVuKGFuaW1hdGlvbiwgcHJldlRpbWUsIHRpbWUpIHtcbiAgdmFyIGNoaWxkO1xuXG4gIGlmICh0aW1lID4gcHJldlRpbWUpIHtcbiAgICBjaGlsZCA9IGFuaW1hdGlvbi5fZmlyc3Q7XG5cbiAgICB3aGlsZSAoY2hpbGQgJiYgY2hpbGQuX3N0YXJ0IDw9IHRpbWUpIHtcbiAgICAgIGlmICghY2hpbGQuX2R1ciAmJiBjaGlsZC5kYXRhID09PSBcImlzUGF1c2VcIiAmJiBjaGlsZC5fc3RhcnQgPiBwcmV2VGltZSkge1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNoaWxkID0gYW5pbWF0aW9uLl9sYXN0O1xuXG4gICAgd2hpbGUgKGNoaWxkICYmIGNoaWxkLl9zdGFydCA+PSB0aW1lKSB7XG4gICAgICBpZiAoIWNoaWxkLl9kdXIgJiYgY2hpbGQuZGF0YSA9PT0gXCJpc1BhdXNlXCIgJiYgY2hpbGQuX3N0YXJ0IDwgcHJldlRpbWUpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9wcmV2O1xuICAgIH1cbiAgfVxufSxcbiAgICBfc2V0RHVyYXRpb24gPSBmdW5jdGlvbiBfc2V0RHVyYXRpb24oYW5pbWF0aW9uLCBkdXJhdGlvbiwgc2tpcFVuY2FjaGUsIGxlYXZlUGxheWhlYWQpIHtcbiAgdmFyIHJlcGVhdCA9IGFuaW1hdGlvbi5fcmVwZWF0LFxuICAgICAgZHVyID0gX3JvdW5kKGR1cmF0aW9uKSB8fCAwLFxuICAgICAgdG90YWxQcm9ncmVzcyA9IGFuaW1hdGlvbi5fdFRpbWUgLyBhbmltYXRpb24uX3REdXI7XG4gIHRvdGFsUHJvZ3Jlc3MgJiYgIWxlYXZlUGxheWhlYWQgJiYgKGFuaW1hdGlvbi5fdGltZSAqPSBkdXIgLyBhbmltYXRpb24uX2R1cik7XG4gIGFuaW1hdGlvbi5fZHVyID0gZHVyO1xuICBhbmltYXRpb24uX3REdXIgPSAhcmVwZWF0ID8gZHVyIDogcmVwZWF0IDwgMCA/IDFlMTAgOiBfcm91bmQoZHVyICogKHJlcGVhdCArIDEpICsgYW5pbWF0aW9uLl9yRGVsYXkgKiByZXBlYXQpO1xuICB0b3RhbFByb2dyZXNzICYmICFsZWF2ZVBsYXloZWFkID8gX2FsaWduUGxheWhlYWQoYW5pbWF0aW9uLCBhbmltYXRpb24uX3RUaW1lID0gYW5pbWF0aW9uLl90RHVyICogdG90YWxQcm9ncmVzcykgOiBhbmltYXRpb24ucGFyZW50ICYmIF9zZXRFbmQoYW5pbWF0aW9uKTtcbiAgc2tpcFVuY2FjaGUgfHwgX3VuY2FjaGUoYW5pbWF0aW9uLnBhcmVudCwgYW5pbWF0aW9uKTtcbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX29uVXBkYXRlVG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uIF9vblVwZGF0ZVRvdGFsRHVyYXRpb24oYW5pbWF0aW9uKSB7XG4gIHJldHVybiBhbmltYXRpb24gaW5zdGFuY2VvZiBUaW1lbGluZSA/IF91bmNhY2hlKGFuaW1hdGlvbikgOiBfc2V0RHVyYXRpb24oYW5pbWF0aW9uLCBhbmltYXRpb24uX2R1cik7XG59LFxuICAgIF96ZXJvUG9zaXRpb24gPSB7XG4gIF9zdGFydDogMCxcbiAgZW5kVGltZTogX2VtcHR5RnVuY1xufSxcbiAgICBfcGFyc2VQb3NpdGlvbiA9IGZ1bmN0aW9uIF9wYXJzZVBvc2l0aW9uKGFuaW1hdGlvbiwgcG9zaXRpb24pIHtcbiAgdmFyIGxhYmVscyA9IGFuaW1hdGlvbi5sYWJlbHMsXG4gICAgICByZWNlbnQgPSBhbmltYXRpb24uX3JlY2VudCB8fCBfemVyb1Bvc2l0aW9uLFxuICAgICAgY2xpcHBlZER1cmF0aW9uID0gYW5pbWF0aW9uLmR1cmF0aW9uKCkgPj0gX2JpZ051bSA/IHJlY2VudC5lbmRUaW1lKGZhbHNlKSA6IGFuaW1hdGlvbi5fZHVyLFxuICAgICAgLy9pbiBjYXNlIHRoZXJlJ3MgYSBjaGlsZCB0aGF0IGluZmluaXRlbHkgcmVwZWF0cywgdXNlcnMgYWxtb3N0IG5ldmVyIGludGVuZCBmb3IgdGhlIGluc2VydGlvbiBwb2ludCBvZiBhIG5ldyBjaGlsZCB0byBiZSBiYXNlZCBvbiBhIFNVUEVSIGxvbmcgdmFsdWUgbGlrZSB0aGF0IHNvIHdlIGNsaXAgaXQgYW5kIGFzc3VtZSB0aGUgbW9zdCByZWNlbnRseS1hZGRlZCBjaGlsZCdzIGVuZFRpbWUgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cbiAgaSxcbiAgICAgIG9mZnNldDtcblxuICBpZiAoX2lzU3RyaW5nKHBvc2l0aW9uKSAmJiAoaXNOYU4ocG9zaXRpb24pIHx8IHBvc2l0aW9uIGluIGxhYmVscykpIHtcbiAgICAvL2lmIHRoZSBzdHJpbmcgaXMgYSBudW1iZXIgbGlrZSBcIjFcIiwgY2hlY2sgdG8gc2VlIGlmIHRoZXJlJ3MgYSBsYWJlbCB3aXRoIHRoYXQgbmFtZSwgb3RoZXJ3aXNlIGludGVycHJldCBpdCBhcyBhIG51bWJlciAoYWJzb2x1dGUgdmFsdWUpLlxuICAgIGkgPSBwb3NpdGlvbi5jaGFyQXQoMCk7XG5cbiAgICBpZiAoaSA9PT0gXCI8XCIgfHwgaSA9PT0gXCI+XCIpIHtcbiAgICAgIHJldHVybiAoaSA9PT0gXCI8XCIgPyByZWNlbnQuX3N0YXJ0IDogcmVjZW50LmVuZFRpbWUocmVjZW50Ll9yZXBlYXQgPj0gMCkpICsgKHBhcnNlRmxvYXQocG9zaXRpb24uc3Vic3RyKDEpKSB8fCAwKTtcbiAgICB9XG5cbiAgICBpID0gcG9zaXRpb24uaW5kZXhPZihcIj1cIik7XG5cbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIHBvc2l0aW9uIGluIGxhYmVscyB8fCAobGFiZWxzW3Bvc2l0aW9uXSA9IGNsaXBwZWREdXJhdGlvbik7XG4gICAgICByZXR1cm4gbGFiZWxzW3Bvc2l0aW9uXTtcbiAgICB9XG5cbiAgICBvZmZzZXQgPSArKHBvc2l0aW9uLmNoYXJBdChpIC0gMSkgKyBwb3NpdGlvbi5zdWJzdHIoaSArIDEpKTtcbiAgICByZXR1cm4gaSA+IDEgPyBfcGFyc2VQb3NpdGlvbihhbmltYXRpb24sIHBvc2l0aW9uLnN1YnN0cigwLCBpIC0gMSkpICsgb2Zmc2V0IDogY2xpcHBlZER1cmF0aW9uICsgb2Zmc2V0O1xuICB9XG5cbiAgcmV0dXJuIHBvc2l0aW9uID09IG51bGwgPyBjbGlwcGVkRHVyYXRpb24gOiArcG9zaXRpb247XG59LFxuICAgIF9jb25kaXRpb25hbFJldHVybiA9IGZ1bmN0aW9uIF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuYykge1xuICByZXR1cm4gdmFsdWUgfHwgdmFsdWUgPT09IDAgPyBmdW5jKHZhbHVlKSA6IGZ1bmM7XG59LFxuICAgIF9jbGFtcCA9IGZ1bmN0aW9uIF9jbGFtcChtaW4sIG1heCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIDwgbWluID8gbWluIDogdmFsdWUgPiBtYXggPyBtYXggOiB2YWx1ZTtcbn0sXG4gICAgZ2V0VW5pdCA9IGZ1bmN0aW9uIGdldFVuaXQodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSArIFwiXCIpLnN1YnN0cigocGFyc2VGbG9hdCh2YWx1ZSkgKyBcIlwiKS5sZW5ndGgpO1xufSxcbiAgICBjbGFtcCA9IGZ1bmN0aW9uIGNsYW1wKG1pbiwgbWF4LCB2YWx1ZSkge1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAodikge1xuICAgIHJldHVybiBfY2xhbXAobWluLCBtYXgsIHYpO1xuICB9KTtcbn0sXG4gICAgX3NsaWNlID0gW10uc2xpY2UsXG4gICAgX2lzQXJyYXlMaWtlID0gZnVuY3Rpb24gX2lzQXJyYXlMaWtlKHZhbHVlLCBub25FbXB0eSkge1xuICByZXR1cm4gdmFsdWUgJiYgX2lzT2JqZWN0KHZhbHVlKSAmJiBcImxlbmd0aFwiIGluIHZhbHVlICYmICghbm9uRW1wdHkgJiYgIXZhbHVlLmxlbmd0aCB8fCB2YWx1ZS5sZW5ndGggLSAxIGluIHZhbHVlICYmIF9pc09iamVjdCh2YWx1ZVswXSkpICYmICF2YWx1ZS5ub2RlVHlwZSAmJiB2YWx1ZSAhPT0gX3dpbjtcbn0sXG4gICAgX2ZsYXR0ZW4gPSBmdW5jdGlvbiBfZmxhdHRlbihhciwgbGVhdmVTdHJpbmdzLCBhY2N1bXVsYXRvcikge1xuICBpZiAoYWNjdW11bGF0b3IgPT09IHZvaWQgMCkge1xuICAgIGFjY3VtdWxhdG9yID0gW107XG4gIH1cblxuICByZXR1cm4gYXIuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgX2FjY3VtdWxhdG9yO1xuXG4gICAgcmV0dXJuIF9pc1N0cmluZyh2YWx1ZSkgJiYgIWxlYXZlU3RyaW5ncyB8fCBfaXNBcnJheUxpa2UodmFsdWUsIDEpID8gKF9hY2N1bXVsYXRvciA9IGFjY3VtdWxhdG9yKS5wdXNoLmFwcGx5KF9hY2N1bXVsYXRvciwgdG9BcnJheSh2YWx1ZSkpIDogYWNjdW11bGF0b3IucHVzaCh2YWx1ZSk7XG4gIH0pIHx8IGFjY3VtdWxhdG9yO1xufSxcbiAgICAvL3Rha2VzIGFueSB2YWx1ZSBhbmQgcmV0dXJucyBhbiBhcnJheS4gSWYgaXQncyBhIHN0cmluZyAoYW5kIGxlYXZlU3RyaW5ncyBpc24ndCB0cnVlKSwgaXQnbGwgdXNlIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoKSBhbmQgY29udmVydCB0aGF0IHRvIGFuIGFycmF5LiBJdCdsbCBhbHNvIGFjY2VwdCBpdGVyYWJsZXMgbGlrZSBqUXVlcnkgb2JqZWN0cy5cbnRvQXJyYXkgPSBmdW5jdGlvbiB0b0FycmF5KHZhbHVlLCBsZWF2ZVN0cmluZ3MpIHtcbiAgcmV0dXJuIF9pc1N0cmluZyh2YWx1ZSkgJiYgIWxlYXZlU3RyaW5ncyAmJiAoX2NvcmVJbml0dGVkIHx8ICFfd2FrZSgpKSA/IF9zbGljZS5jYWxsKF9kb2MucXVlcnlTZWxlY3RvckFsbCh2YWx1ZSksIDApIDogX2lzQXJyYXkodmFsdWUpID8gX2ZsYXR0ZW4odmFsdWUsIGxlYXZlU3RyaW5ncykgOiBfaXNBcnJheUxpa2UodmFsdWUpID8gX3NsaWNlLmNhbGwodmFsdWUsIDApIDogdmFsdWUgPyBbdmFsdWVdIDogW107XG59LFxuICAgIHNodWZmbGUgPSBmdW5jdGlvbiBzaHVmZmxlKGEpIHtcbiAgcmV0dXJuIGEuc29ydChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIC41IC0gTWF0aC5yYW5kb20oKTtcbiAgfSk7XG59LFxuICAgIC8vIGFsdGVybmF0aXZlIHRoYXQncyBhIGJpdCBmYXN0ZXIgYW5kIG1vcmUgcmVsaWFibHkgZGl2ZXJzZSBidXQgYmlnZ2VyOiAgIGZvciAobGV0IGosIHYsIGkgPSBhLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB2ID0gYVstLWldLCBhW2ldID0gYVtqXSwgYVtqXSA9IHYpOyByZXR1cm4gYTtcbi8vZm9yIGRpc3RyaWJ1dGluZyB2YWx1ZXMgYWNyb3NzIGFuIGFycmF5LiBDYW4gYWNjZXB0IGEgbnVtYmVyLCBhIGZ1bmN0aW9uIG9yIChtb3N0IGNvbW1vbmx5KSBhIGZ1bmN0aW9uIHdoaWNoIGNhbiBjb250YWluIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczoge2Jhc2UsIGFtb3VudCwgZnJvbSwgZWFzZSwgZ3JpZCwgYXhpcywgbGVuZ3RoLCBlYWNofS4gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZXhwZWN0cyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6IGluZGV4LCB0YXJnZXQsIGFycmF5LiBSZWNvZ25pemVzIHRoZSBmb2xsb3dpbmdcbmRpc3RyaWJ1dGUgPSBmdW5jdGlvbiBkaXN0cmlidXRlKHYpIHtcbiAgaWYgKF9pc0Z1bmN0aW9uKHYpKSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICB2YXIgdmFycyA9IF9pc09iamVjdCh2KSA/IHYgOiB7XG4gICAgZWFjaDogdlxuICB9LFxuICAgICAgLy9uOjEgaXMganVzdCB0byBpbmRpY2F0ZSB2IHdhcyBhIG51bWJlcjsgd2UgbGV2ZXJhZ2UgdGhhdCBsYXRlciB0byBzZXQgdiBhY2NvcmRpbmcgdG8gdGhlIGxlbmd0aCB3ZSBnZXQuIElmIGEgbnVtYmVyIGlzIHBhc3NlZCBpbiwgd2UgdHJlYXQgaXQgbGlrZSB0aGUgb2xkIHN0YWdnZXIgdmFsdWUgd2hlcmUgMC4xLCBmb3IgZXhhbXBsZSwgd291bGQgbWVhbiB0aGF0IHRoaW5ncyB3b3VsZCBiZSBkaXN0cmlidXRlZCB3aXRoIDAuMSBiZXR3ZWVuIGVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkgcmF0aGVyIHRoYW4gYSB0b3RhbCBcImFtb3VudFwiIHRoYXQncyBjaHVua2VkIG91dCBhbW9uZyB0aGVtIGFsbC5cbiAgZWFzZSA9IF9wYXJzZUVhc2UodmFycy5lYXNlKSxcbiAgICAgIGZyb20gPSB2YXJzLmZyb20gfHwgMCxcbiAgICAgIGJhc2UgPSBwYXJzZUZsb2F0KHZhcnMuYmFzZSkgfHwgMCxcbiAgICAgIGNhY2hlID0ge30sXG4gICAgICBpc0RlY2ltYWwgPSBmcm9tID4gMCAmJiBmcm9tIDwgMSxcbiAgICAgIHJhdGlvcyA9IGlzTmFOKGZyb20pIHx8IGlzRGVjaW1hbCxcbiAgICAgIGF4aXMgPSB2YXJzLmF4aXMsXG4gICAgICByYXRpb1ggPSBmcm9tLFxuICAgICAgcmF0aW9ZID0gZnJvbTtcblxuICBpZiAoX2lzU3RyaW5nKGZyb20pKSB7XG4gICAgcmF0aW9YID0gcmF0aW9ZID0ge1xuICAgICAgY2VudGVyOiAuNSxcbiAgICAgIGVkZ2VzOiAuNSxcbiAgICAgIGVuZDogMVxuICAgIH1bZnJvbV0gfHwgMDtcbiAgfSBlbHNlIGlmICghaXNEZWNpbWFsICYmIHJhdGlvcykge1xuICAgIHJhdGlvWCA9IGZyb21bMF07XG4gICAgcmF0aW9ZID0gZnJvbVsxXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaSwgdGFyZ2V0LCBhKSB7XG4gICAgdmFyIGwgPSAoYSB8fCB2YXJzKS5sZW5ndGgsXG4gICAgICAgIGRpc3RhbmNlcyA9IGNhY2hlW2xdLFxuICAgICAgICBvcmlnaW5YLFxuICAgICAgICBvcmlnaW5ZLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICBkLFxuICAgICAgICBqLFxuICAgICAgICBtYXgsXG4gICAgICAgIG1pbixcbiAgICAgICAgd3JhcEF0O1xuXG4gICAgaWYgKCFkaXN0YW5jZXMpIHtcbiAgICAgIHdyYXBBdCA9IHZhcnMuZ3JpZCA9PT0gXCJhdXRvXCIgPyAwIDogKHZhcnMuZ3JpZCB8fCBbMSwgX2JpZ051bV0pWzFdO1xuXG4gICAgICBpZiAoIXdyYXBBdCkge1xuICAgICAgICBtYXggPSAtX2JpZ051bTtcblxuICAgICAgICB3aGlsZSAobWF4IDwgKG1heCA9IGFbd3JhcEF0KytdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpICYmIHdyYXBBdCA8IGwpIHt9XG5cbiAgICAgICAgd3JhcEF0LS07XG4gICAgICB9XG5cbiAgICAgIGRpc3RhbmNlcyA9IGNhY2hlW2xdID0gW107XG4gICAgICBvcmlnaW5YID0gcmF0aW9zID8gTWF0aC5taW4od3JhcEF0LCBsKSAqIHJhdGlvWCAtIC41IDogZnJvbSAlIHdyYXBBdDtcbiAgICAgIG9yaWdpblkgPSByYXRpb3MgPyBsICogcmF0aW9ZIC8gd3JhcEF0IC0gLjUgOiBmcm9tIC8gd3JhcEF0IHwgMDtcbiAgICAgIG1heCA9IDA7XG4gICAgICBtaW4gPSBfYmlnTnVtO1xuXG4gICAgICBmb3IgKGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgIHggPSBqICUgd3JhcEF0IC0gb3JpZ2luWDtcbiAgICAgICAgeSA9IG9yaWdpblkgLSAoaiAvIHdyYXBBdCB8IDApO1xuICAgICAgICBkaXN0YW5jZXNbal0gPSBkID0gIWF4aXMgPyBfc3FydCh4ICogeCArIHkgKiB5KSA6IE1hdGguYWJzKGF4aXMgPT09IFwieVwiID8geSA6IHgpO1xuICAgICAgICBkID4gbWF4ICYmIChtYXggPSBkKTtcbiAgICAgICAgZCA8IG1pbiAmJiAobWluID0gZCk7XG4gICAgICB9XG5cbiAgICAgIGZyb20gPT09IFwicmFuZG9tXCIgJiYgc2h1ZmZsZShkaXN0YW5jZXMpO1xuICAgICAgZGlzdGFuY2VzLm1heCA9IG1heCAtIG1pbjtcbiAgICAgIGRpc3RhbmNlcy5taW4gPSBtaW47XG4gICAgICBkaXN0YW5jZXMudiA9IGwgPSAocGFyc2VGbG9hdCh2YXJzLmFtb3VudCkgfHwgcGFyc2VGbG9hdCh2YXJzLmVhY2gpICogKHdyYXBBdCA+IGwgPyBsIC0gMSA6ICFheGlzID8gTWF0aC5tYXgod3JhcEF0LCBsIC8gd3JhcEF0KSA6IGF4aXMgPT09IFwieVwiID8gbCAvIHdyYXBBdCA6IHdyYXBBdCkgfHwgMCkgKiAoZnJvbSA9PT0gXCJlZGdlc1wiID8gLTEgOiAxKTtcbiAgICAgIGRpc3RhbmNlcy5iID0gbCA8IDAgPyBiYXNlIC0gbCA6IGJhc2U7XG4gICAgICBkaXN0YW5jZXMudSA9IGdldFVuaXQodmFycy5hbW91bnQgfHwgdmFycy5lYWNoKSB8fCAwOyAvL3VuaXRcblxuICAgICAgZWFzZSA9IGVhc2UgJiYgbCA8IDAgPyBfaW52ZXJ0RWFzZShlYXNlKSA6IGVhc2U7XG4gICAgfVxuXG4gICAgbCA9IChkaXN0YW5jZXNbaV0gLSBkaXN0YW5jZXMubWluKSAvIGRpc3RhbmNlcy5tYXggfHwgMDtcbiAgICByZXR1cm4gX3JvdW5kKGRpc3RhbmNlcy5iICsgKGVhc2UgPyBlYXNlKGwpIDogbCkgKiBkaXN0YW5jZXMudikgKyBkaXN0YW5jZXMudTsgLy9yb3VuZCBpbiBvcmRlciB0byB3b3JrIGFyb3VuZCBmbG9hdGluZyBwb2ludCBlcnJvcnNcbiAgfTtcbn0sXG4gICAgX3JvdW5kTW9kaWZpZXIgPSBmdW5jdGlvbiBfcm91bmRNb2RpZmllcih2KSB7XG4gIC8vcGFzcyBpbiAwLjEgZ2V0IGEgZnVuY3Rpb24gdGhhdCdsbCByb3VuZCB0byB0aGUgbmVhcmVzdCB0ZW50aCwgb3IgNSB0byByb3VuZCB0byB0aGUgY2xvc2VzdCA1LCBvciAwLjAwMSB0byB0aGUgY2xvc2VzdCAxMDAwdGgsIGV0Yy5cbiAgdmFyIHAgPSB2IDwgMSA/IE1hdGgucG93KDEwLCAodiArIFwiXCIpLmxlbmd0aCAtIDIpIDogMTsgLy90byBhdm9pZCBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyAobGlrZSAyNCAqIDAuMSA9PSAyLjQwMDAwMDAwMDAwMDAwMDQpLCB3ZSBjaG9wIG9mZiBhdCBhIHNwZWNpZmljIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyAobXVjaCBmYXN0ZXIgdGhhbiB0b0ZpeGVkKClcblxuICByZXR1cm4gZnVuY3Rpb24gKHJhdykge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucm91bmQocGFyc2VGbG9hdChyYXcpIC8gdikgKiB2ICogcCkgLyBwICsgKF9pc051bWJlcihyYXcpID8gMCA6IGdldFVuaXQocmF3KSk7XG4gIH07XG59LFxuICAgIHNuYXAgPSBmdW5jdGlvbiBzbmFwKHNuYXBUbywgdmFsdWUpIHtcbiAgdmFyIGlzQXJyYXkgPSBfaXNBcnJheShzbmFwVG8pLFxuICAgICAgcmFkaXVzLFxuICAgICAgaXMyRDtcblxuICBpZiAoIWlzQXJyYXkgJiYgX2lzT2JqZWN0KHNuYXBUbykpIHtcbiAgICByYWRpdXMgPSBpc0FycmF5ID0gc25hcFRvLnJhZGl1cyB8fCBfYmlnTnVtO1xuXG4gICAgaWYgKHNuYXBUby52YWx1ZXMpIHtcbiAgICAgIHNuYXBUbyA9IHRvQXJyYXkoc25hcFRvLnZhbHVlcyk7XG5cbiAgICAgIGlmIChpczJEID0gIV9pc051bWJlcihzbmFwVG9bMF0pKSB7XG4gICAgICAgIHJhZGl1cyAqPSByYWRpdXM7IC8vcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIHNvIHdlIGRvbid0IGhhdmUgdG8gTWF0aC5zcXJ0KCkgaW4gdGhlIGxvb3AuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNuYXBUbyA9IF9yb3VuZE1vZGlmaWVyKHNuYXBUby5pbmNyZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsICFpc0FycmF5ID8gX3JvdW5kTW9kaWZpZXIoc25hcFRvKSA6IF9pc0Z1bmN0aW9uKHNuYXBUbykgPyBmdW5jdGlvbiAocmF3KSB7XG4gICAgaXMyRCA9IHNuYXBUbyhyYXcpO1xuICAgIHJldHVybiBNYXRoLmFicyhpczJEIC0gcmF3KSA8PSByYWRpdXMgPyBpczJEIDogcmF3O1xuICB9IDogZnVuY3Rpb24gKHJhdykge1xuICAgIHZhciB4ID0gcGFyc2VGbG9hdChpczJEID8gcmF3LnggOiByYXcpLFxuICAgICAgICB5ID0gcGFyc2VGbG9hdChpczJEID8gcmF3LnkgOiAwKSxcbiAgICAgICAgbWluID0gX2JpZ051bSxcbiAgICAgICAgY2xvc2VzdCA9IDAsXG4gICAgICAgIGkgPSBzbmFwVG8ubGVuZ3RoLFxuICAgICAgICBkeCxcbiAgICAgICAgZHk7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoaXMyRCkge1xuICAgICAgICBkeCA9IHNuYXBUb1tpXS54IC0geDtcbiAgICAgICAgZHkgPSBzbmFwVG9baV0ueSAtIHk7XG4gICAgICAgIGR4ID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkeCA9IE1hdGguYWJzKHNuYXBUb1tpXSAtIHgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHggPCBtaW4pIHtcbiAgICAgICAgbWluID0gZHg7XG4gICAgICAgIGNsb3Nlc3QgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNsb3Nlc3QgPSAhcmFkaXVzIHx8IG1pbiA8PSByYWRpdXMgPyBzbmFwVG9bY2xvc2VzdF0gOiByYXc7XG4gICAgcmV0dXJuIGlzMkQgfHwgY2xvc2VzdCA9PT0gcmF3IHx8IF9pc051bWJlcihyYXcpID8gY2xvc2VzdCA6IGNsb3Nlc3QgKyBnZXRVbml0KHJhdyk7XG4gIH0pO1xufSxcbiAgICByYW5kb20gPSBmdW5jdGlvbiByYW5kb20obWluLCBtYXgsIHJvdW5kaW5nSW5jcmVtZW50LCByZXR1cm5GdW5jdGlvbikge1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKF9pc0FycmF5KG1pbikgPyAhbWF4IDogcm91bmRpbmdJbmNyZW1lbnQgPT09IHRydWUgPyAhIShyb3VuZGluZ0luY3JlbWVudCA9IDApIDogIXJldHVybkZ1bmN0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9pc0FycmF5KG1pbikgPyBtaW5bfn4oTWF0aC5yYW5kb20oKSAqIG1pbi5sZW5ndGgpXSA6IChyb3VuZGluZ0luY3JlbWVudCA9IHJvdW5kaW5nSW5jcmVtZW50IHx8IDFlLTUpICYmIChyZXR1cm5GdW5jdGlvbiA9IHJvdW5kaW5nSW5jcmVtZW50IDwgMSA/IE1hdGgucG93KDEwLCAocm91bmRpbmdJbmNyZW1lbnQgKyBcIlwiKS5sZW5ndGggLSAyKSA6IDEpICYmIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSAvIHJvdW5kaW5nSW5jcmVtZW50KSAqIHJvdW5kaW5nSW5jcmVtZW50ICogcmV0dXJuRnVuY3Rpb24pIC8gcmV0dXJuRnVuY3Rpb247XG4gIH0pO1xufSxcbiAgICBwaXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmN0aW9ucyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jdGlvbnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKHYsIGYpIHtcbiAgICAgIHJldHVybiBmKHYpO1xuICAgIH0sIHZhbHVlKTtcbiAgfTtcbn0sXG4gICAgdW5pdGl6ZSA9IGZ1bmN0aW9uIHVuaXRpemUoZnVuYywgdW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmMocGFyc2VGbG9hdCh2YWx1ZSkpICsgKHVuaXQgfHwgZ2V0VW5pdCh2YWx1ZSkpO1xuICB9O1xufSxcbiAgICBub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUobWluLCBtYXgsIHZhbHVlKSB7XG4gIHJldHVybiBtYXBSYW5nZShtaW4sIG1heCwgMCwgMSwgdmFsdWUpO1xufSxcbiAgICBfd3JhcEFycmF5ID0gZnVuY3Rpb24gX3dyYXBBcnJheShhLCB3cmFwcGVyLCB2YWx1ZSkge1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4gYVt+fndyYXBwZXIoaW5kZXgpXTtcbiAgfSk7XG59LFxuICAgIHdyYXAgPSBmdW5jdGlvbiB3cmFwKG1pbiwgbWF4LCB2YWx1ZSkge1xuICAvLyBOT1RFOiB3cmFwKCkgQ0FOTk9UIGJlIGFuIGFycm93IGZ1bmN0aW9uISBBIHZlcnkgb2RkIGNvbXBpbGluZyBidWcgY2F1c2VzIHByb2JsZW1zICh1bnJlbGF0ZWQgdG8gR1NBUCkuXG4gIHZhciByYW5nZSA9IG1heCAtIG1pbjtcbiAgcmV0dXJuIF9pc0FycmF5KG1pbikgPyBfd3JhcEFycmF5KG1pbiwgd3JhcCgwLCBtaW4ubGVuZ3RoKSwgbWF4KSA6IF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIChyYW5nZSArICh2YWx1ZSAtIG1pbikgJSByYW5nZSkgJSByYW5nZSArIG1pbjtcbiAgfSk7XG59LFxuICAgIHdyYXBZb3lvID0gZnVuY3Rpb24gd3JhcFlveW8obWluLCBtYXgsIHZhbHVlKSB7XG4gIHZhciByYW5nZSA9IG1heCAtIG1pbixcbiAgICAgIHRvdGFsID0gcmFuZ2UgKiAyO1xuICByZXR1cm4gX2lzQXJyYXkobWluKSA/IF93cmFwQXJyYXkobWluLCB3cmFwWW95bygwLCBtaW4ubGVuZ3RoIC0gMSksIG1heCkgOiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhbHVlID0gKHRvdGFsICsgKHZhbHVlIC0gbWluKSAlIHRvdGFsKSAlIHRvdGFsIHx8IDA7XG4gICAgcmV0dXJuIG1pbiArICh2YWx1ZSA+IHJhbmdlID8gdG90YWwgLSB2YWx1ZSA6IHZhbHVlKTtcbiAgfSk7XG59LFxuICAgIF9yZXBsYWNlUmFuZG9tID0gZnVuY3Rpb24gX3JlcGxhY2VSYW5kb20odmFsdWUpIHtcbiAgLy9yZXBsYWNlcyBhbGwgb2NjdXJyZW5jZXMgb2YgcmFuZG9tKC4uLikgaW4gYSBzdHJpbmcgd2l0aCB0aGUgY2FsY3VsYXRlZCByYW5kb20gdmFsdWUuIGNhbiBiZSBhIHJhbmdlIGxpa2UgcmFuZG9tKC0xMDAsIDEwMCwgNSkgb3IgYW4gYXJyYXkgbGlrZSByYW5kb20oWzAsIDEwMCwgNTAwXSlcbiAgdmFyIHByZXYgPSAwLFxuICAgICAgcyA9IFwiXCIsXG4gICAgICBpLFxuICAgICAgbnVtcyxcbiAgICAgIGVuZCxcbiAgICAgIGlzQXJyYXk7XG5cbiAgd2hpbGUgKH4oaSA9IHZhbHVlLmluZGV4T2YoXCJyYW5kb20oXCIsIHByZXYpKSkge1xuICAgIGVuZCA9IHZhbHVlLmluZGV4T2YoXCIpXCIsIGkpO1xuICAgIGlzQXJyYXkgPSB2YWx1ZS5jaGFyQXQoaSArIDcpID09PSBcIltcIjtcbiAgICBudW1zID0gdmFsdWUuc3Vic3RyKGkgKyA3LCBlbmQgLSBpIC0gNykubWF0Y2goaXNBcnJheSA/IF9kZWxpbWl0ZWRWYWx1ZUV4cCA6IF9zdHJpY3ROdW1FeHApO1xuICAgIHMgKz0gdmFsdWUuc3Vic3RyKHByZXYsIGkgLSBwcmV2KSArIHJhbmRvbShpc0FycmF5ID8gbnVtcyA6ICtudW1zWzBdLCBpc0FycmF5ID8gMCA6ICtudW1zWzFdLCArbnVtc1syXSB8fCAxZS01KTtcbiAgICBwcmV2ID0gZW5kICsgMTtcbiAgfVxuXG4gIHJldHVybiBzICsgdmFsdWUuc3Vic3RyKHByZXYsIHZhbHVlLmxlbmd0aCAtIHByZXYpO1xufSxcbiAgICBtYXBSYW5nZSA9IGZ1bmN0aW9uIG1hcFJhbmdlKGluTWluLCBpbk1heCwgb3V0TWluLCBvdXRNYXgsIHZhbHVlKSB7XG4gIHZhciBpblJhbmdlID0gaW5NYXggLSBpbk1pbixcbiAgICAgIG91dFJhbmdlID0gb3V0TWF4IC0gb3V0TWluO1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gb3V0TWluICsgKCh2YWx1ZSAtIGluTWluKSAvIGluUmFuZ2UgKiBvdXRSYW5nZSB8fCAwKTtcbiAgfSk7XG59LFxuICAgIGludGVycG9sYXRlID0gZnVuY3Rpb24gaW50ZXJwb2xhdGUoc3RhcnQsIGVuZCwgcHJvZ3Jlc3MsIG11dGF0ZSkge1xuICB2YXIgZnVuYyA9IGlzTmFOKHN0YXJ0ICsgZW5kKSA/IDAgOiBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAoMSAtIHApICogc3RhcnQgKyBwICogZW5kO1xuICB9O1xuXG4gIGlmICghZnVuYykge1xuICAgIHZhciBpc1N0cmluZyA9IF9pc1N0cmluZyhzdGFydCksXG4gICAgICAgIG1hc3RlciA9IHt9LFxuICAgICAgICBwLFxuICAgICAgICBpLFxuICAgICAgICBpbnRlcnBvbGF0b3JzLFxuICAgICAgICBsLFxuICAgICAgICBpbDtcblxuICAgIHByb2dyZXNzID09PSB0cnVlICYmIChtdXRhdGUgPSAxKSAmJiAocHJvZ3Jlc3MgPSBudWxsKTtcblxuICAgIGlmIChpc1N0cmluZykge1xuICAgICAgc3RhcnQgPSB7XG4gICAgICAgIHA6IHN0YXJ0XG4gICAgICB9O1xuICAgICAgZW5kID0ge1xuICAgICAgICBwOiBlbmRcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChfaXNBcnJheShzdGFydCkgJiYgIV9pc0FycmF5KGVuZCkpIHtcbiAgICAgIGludGVycG9sYXRvcnMgPSBbXTtcbiAgICAgIGwgPSBzdGFydC5sZW5ndGg7XG4gICAgICBpbCA9IGwgLSAyO1xuXG4gICAgICBmb3IgKGkgPSAxOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGludGVycG9sYXRvcnMucHVzaChpbnRlcnBvbGF0ZShzdGFydFtpIC0gMV0sIHN0YXJ0W2ldKSk7IC8vYnVpbGQgdGhlIGludGVycG9sYXRvcnMgdXAgZnJvbnQgYXMgYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24gc28gdGhhdCB3aGVuIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgbWFueSB0aW1lcywgaXQgY2FuIGp1c3QgcmV1c2UgdGhlbS5cbiAgICAgIH1cblxuICAgICAgbC0tO1xuXG4gICAgICBmdW5jID0gZnVuY3Rpb24gZnVuYyhwKSB7XG4gICAgICAgIHAgKj0gbDtcbiAgICAgICAgdmFyIGkgPSBNYXRoLm1pbihpbCwgfn5wKTtcbiAgICAgICAgcmV0dXJuIGludGVycG9sYXRvcnNbaV0ocCAtIGkpO1xuICAgICAgfTtcblxuICAgICAgcHJvZ3Jlc3MgPSBlbmQ7XG4gICAgfSBlbHNlIGlmICghbXV0YXRlKSB7XG4gICAgICBzdGFydCA9IF9tZXJnZShfaXNBcnJheShzdGFydCkgPyBbXSA6IHt9LCBzdGFydCk7XG4gICAgfVxuXG4gICAgaWYgKCFpbnRlcnBvbGF0b3JzKSB7XG4gICAgICBmb3IgKHAgaW4gZW5kKSB7XG4gICAgICAgIF9hZGRQcm9wVHdlZW4uY2FsbChtYXN0ZXIsIHN0YXJ0LCBwLCBcImdldFwiLCBlbmRbcF0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jID0gZnVuY3Rpb24gZnVuYyhwKSB7XG4gICAgICAgIHJldHVybiBfcmVuZGVyUHJvcFR3ZWVucyhwLCBtYXN0ZXIpIHx8IChpc1N0cmluZyA/IHN0YXJ0LnAgOiBzdGFydCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4ocHJvZ3Jlc3MsIGZ1bmMpO1xufSxcbiAgICBfZ2V0TGFiZWxJbkRpcmVjdGlvbiA9IGZ1bmN0aW9uIF9nZXRMYWJlbEluRGlyZWN0aW9uKHRpbWVsaW5lLCBmcm9tVGltZSwgYmFja3dhcmQpIHtcbiAgLy91c2VkIGZvciBuZXh0TGFiZWwoKSBhbmQgcHJldmlvdXNMYWJlbCgpXG4gIHZhciBsYWJlbHMgPSB0aW1lbGluZS5sYWJlbHMsXG4gICAgICBtaW4gPSBfYmlnTnVtLFxuICAgICAgcCxcbiAgICAgIGRpc3RhbmNlLFxuICAgICAgbGFiZWw7XG5cbiAgZm9yIChwIGluIGxhYmVscykge1xuICAgIGRpc3RhbmNlID0gbGFiZWxzW3BdIC0gZnJvbVRpbWU7XG5cbiAgICBpZiAoZGlzdGFuY2UgPCAwID09PSAhIWJhY2t3YXJkICYmIGRpc3RhbmNlICYmIG1pbiA+IChkaXN0YW5jZSA9IE1hdGguYWJzKGRpc3RhbmNlKSkpIHtcbiAgICAgIGxhYmVsID0gcDtcbiAgICAgIG1pbiA9IGRpc3RhbmNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsYWJlbDtcbn0sXG4gICAgX2NhbGxiYWNrID0gZnVuY3Rpb24gX2NhbGxiYWNrKGFuaW1hdGlvbiwgdHlwZSwgZXhlY3V0ZUxhenlGaXJzdCkge1xuICB2YXIgdiA9IGFuaW1hdGlvbi52YXJzLFxuICAgICAgY2FsbGJhY2sgPSB2W3R5cGVdLFxuICAgICAgcGFyYW1zLFxuICAgICAgc2NvcGU7XG5cbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHBhcmFtcyA9IHZbdHlwZSArIFwiUGFyYW1zXCJdO1xuICBzY29wZSA9IHYuY2FsbGJhY2tTY29wZSB8fCBhbmltYXRpb247XG4gIGV4ZWN1dGVMYXp5Rmlyc3QgJiYgX2xhenlUd2VlbnMubGVuZ3RoICYmIF9sYXp5UmVuZGVyKCk7IC8vaW4gY2FzZSByZW5kZXJpbmcgY2F1c2VkIGFueSB0d2VlbnMgdG8gbGF6eS1pbml0LCB3ZSBzaG91bGQgcmVuZGVyIHRoZW0gYmVjYXVzZSB0eXBpY2FsbHkgd2hlbiBhIHRpbWVsaW5lIGZpbmlzaGVzLCB1c2VycyBleHBlY3QgdGhpbmdzIHRvIGhhdmUgcmVuZGVyZWQgZnVsbHkuIEltYWdpbmUgYW4gb25VcGRhdGUgb24gYSB0aW1lbGluZSB0aGF0IHJlcG9ydHMvY2hlY2tzIHR3ZWVuZWQgdmFsdWVzLlxuXG4gIHJldHVybiBwYXJhbXMgPyBjYWxsYmFjay5hcHBseShzY29wZSwgcGFyYW1zKSA6IGNhbGxiYWNrLmNhbGwoc2NvcGUpO1xufSxcbiAgICBfaW50ZXJydXB0ID0gZnVuY3Rpb24gX2ludGVycnVwdChhbmltYXRpb24pIHtcbiAgX3JlbW92ZUZyb21QYXJlbnQoYW5pbWF0aW9uKTtcblxuICBhbmltYXRpb24ucHJvZ3Jlc3MoKSA8IDEgJiYgX2NhbGxiYWNrKGFuaW1hdGlvbiwgXCJvbkludGVycnVwdFwiKTtcbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX3F1aWNrVHdlZW4sXG4gICAgX2NyZWF0ZVBsdWdpbiA9IGZ1bmN0aW9uIF9jcmVhdGVQbHVnaW4oY29uZmlnKSB7XG4gIGNvbmZpZyA9ICFjb25maWcubmFtZSAmJiBjb25maWdbXCJkZWZhdWx0XCJdIHx8IGNvbmZpZzsgLy9VTUQgcGFja2FnaW5nIHdyYXBzIHRoaW5ncyBvZGRseSwgc28gZm9yIGV4YW1wbGUgTW90aW9uUGF0aEhlbHBlciBiZWNvbWVzIHtNb3Rpb25QYXRoSGVscGVyOk1vdGlvblBhdGhIZWxwZXIsIGRlZmF1bHQ6TW90aW9uUGF0aEhlbHBlcn0uXG5cbiAgdmFyIG5hbWUgPSBjb25maWcubmFtZSxcbiAgICAgIGlzRnVuYyA9IF9pc0Z1bmN0aW9uKGNvbmZpZyksXG4gICAgICBQbHVnaW4gPSBuYW1lICYmICFpc0Z1bmMgJiYgY29uZmlnLmluaXQgPyBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fcHJvcHMgPSBbXTtcbiAgfSA6IGNvbmZpZyxcbiAgICAgIC8vaW4gY2FzZSBzb21lb25lIHBhc3NlcyBpbiBhbiBvYmplY3QgdGhhdCdzIG5vdCBhIHBsdWdpbiwgbGlrZSBDdXN0b21FYXNlXG4gIGluc3RhbmNlRGVmYXVsdHMgPSB7XG4gICAgaW5pdDogX2VtcHR5RnVuYyxcbiAgICByZW5kZXI6IF9yZW5kZXJQcm9wVHdlZW5zLFxuICAgIGFkZDogX2FkZFByb3BUd2VlbixcbiAgICBraWxsOiBfa2lsbFByb3BUd2VlbnNPZixcbiAgICBtb2RpZmllcjogX2FkZFBsdWdpbk1vZGlmaWVyLFxuICAgIHJhd1ZhcnM6IDBcbiAgfSxcbiAgICAgIHN0YXRpY3MgPSB7XG4gICAgdGFyZ2V0VGVzdDogMCxcbiAgICBnZXQ6IDAsXG4gICAgZ2V0U2V0dGVyOiBfZ2V0U2V0dGVyLFxuICAgIGFsaWFzZXM6IHt9LFxuICAgIHJlZ2lzdGVyOiAwXG4gIH07XG5cbiAgX3dha2UoKTtcblxuICBpZiAoY29uZmlnICE9PSBQbHVnaW4pIHtcbiAgICBpZiAoX3BsdWdpbnNbbmFtZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBfc2V0RGVmYXVsdHMoUGx1Z2luLCBfc2V0RGVmYXVsdHMoX2NvcHlFeGNsdWRpbmcoY29uZmlnLCBpbnN0YW5jZURlZmF1bHRzKSwgc3RhdGljcykpOyAvL3N0YXRpYyBtZXRob2RzXG5cblxuICAgIF9tZXJnZShQbHVnaW4ucHJvdG90eXBlLCBfbWVyZ2UoaW5zdGFuY2VEZWZhdWx0cywgX2NvcHlFeGNsdWRpbmcoY29uZmlnLCBzdGF0aWNzKSkpOyAvL2luc3RhbmNlIG1ldGhvZHNcblxuXG4gICAgX3BsdWdpbnNbUGx1Z2luLnByb3AgPSBuYW1lXSA9IFBsdWdpbjtcblxuICAgIGlmIChjb25maWcudGFyZ2V0VGVzdCkge1xuICAgICAgX2hhcm5lc3NQbHVnaW5zLnB1c2goUGx1Z2luKTtcblxuICAgICAgX3Jlc2VydmVkUHJvcHNbbmFtZV0gPSAxO1xuICAgIH1cblxuICAgIG5hbWUgPSAobmFtZSA9PT0gXCJjc3NcIiA/IFwiQ1NTXCIgOiBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zdWJzdHIoMSkpICsgXCJQbHVnaW5cIjsgLy9mb3IgdGhlIGdsb2JhbCBuYW1lLiBcIm1vdGlvblBhdGhcIiBzaG91bGQgYmVjb21lIE1vdGlvblBhdGhQbHVnaW5cbiAgfVxuXG4gIF9hZGRHbG9iYWwobmFtZSwgUGx1Z2luKTtcblxuICBjb25maWcucmVnaXN0ZXIgJiYgY29uZmlnLnJlZ2lzdGVyKGdzYXAsIFBsdWdpbiwgUHJvcFR3ZWVuKTtcbn0sXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ09MT1JTXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5fMjU1ID0gMjU1LFxuICAgIF9jb2xvckxvb2t1cCA9IHtcbiAgYXF1YTogWzAsIF8yNTUsIF8yNTVdLFxuICBsaW1lOiBbMCwgXzI1NSwgMF0sXG4gIHNpbHZlcjogWzE5MiwgMTkyLCAxOTJdLFxuICBibGFjazogWzAsIDAsIDBdLFxuICBtYXJvb246IFsxMjgsIDAsIDBdLFxuICB0ZWFsOiBbMCwgMTI4LCAxMjhdLFxuICBibHVlOiBbMCwgMCwgXzI1NV0sXG4gIG5hdnk6IFswLCAwLCAxMjhdLFxuICB3aGl0ZTogW18yNTUsIF8yNTUsIF8yNTVdLFxuICBvbGl2ZTogWzEyOCwgMTI4LCAwXSxcbiAgeWVsbG93OiBbXzI1NSwgXzI1NSwgMF0sXG4gIG9yYW5nZTogW18yNTUsIDE2NSwgMF0sXG4gIGdyYXk6IFsxMjgsIDEyOCwgMTI4XSxcbiAgcHVycGxlOiBbMTI4LCAwLCAxMjhdLFxuICBncmVlbjogWzAsIDEyOCwgMF0sXG4gIHJlZDogW18yNTUsIDAsIDBdLFxuICBwaW5rOiBbXzI1NSwgMTkyLCAyMDNdLFxuICBjeWFuOiBbMCwgXzI1NSwgXzI1NV0sXG4gIHRyYW5zcGFyZW50OiBbXzI1NSwgXzI1NSwgXzI1NSwgMF1cbn0sXG4gICAgX2h1ZSA9IGZ1bmN0aW9uIF9odWUoaCwgbTEsIG0yKSB7XG4gIGggPSBoIDwgMCA/IGggKyAxIDogaCA+IDEgPyBoIC0gMSA6IGg7XG4gIHJldHVybiAoaCAqIDYgPCAxID8gbTEgKyAobTIgLSBtMSkgKiBoICogNiA6IGggPCAuNSA/IG0yIDogaCAqIDMgPCAyID8gbTEgKyAobTIgLSBtMSkgKiAoMiAvIDMgLSBoKSAqIDYgOiBtMSkgKiBfMjU1ICsgLjUgfCAwO1xufSxcbiAgICBzcGxpdENvbG9yID0gZnVuY3Rpb24gc3BsaXRDb2xvcih2LCB0b0hTTCwgZm9yY2VBbHBoYSkge1xuICB2YXIgYSA9ICF2ID8gX2NvbG9yTG9va3VwLmJsYWNrIDogX2lzTnVtYmVyKHYpID8gW3YgPj4gMTYsIHYgPj4gOCAmIF8yNTUsIHYgJiBfMjU1XSA6IDAsXG4gICAgICByLFxuICAgICAgZyxcbiAgICAgIGIsXG4gICAgICBoLFxuICAgICAgcyxcbiAgICAgIGwsXG4gICAgICBtYXgsXG4gICAgICBtaW4sXG4gICAgICBkLFxuICAgICAgd2FzSFNMO1xuXG4gIGlmICghYSkge1xuICAgIGlmICh2LnN1YnN0cigtMSkgPT09IFwiLFwiKSB7XG4gICAgICAvL3NvbWV0aW1lcyBhIHRyYWlsaW5nIGNvbW1hIGlzIGluY2x1ZGVkIGFuZCB3ZSBzaG91bGQgY2hvcCBpdCBvZmYgKHR5cGljYWxseSBmcm9tIGEgY29tbWEtZGVsaW1pdGVkIGxpc3Qgb2YgdmFsdWVzIGxpa2UgYSB0ZXh0U2hhZG93OlwiMnB4IDJweCAycHggYmx1ZSwgNXB4IDVweCA1cHggcmdiKDI1NSwwLDApXCIgLSBpbiB0aGlzIGV4YW1wbGUgXCJibHVlLFwiIGhhcyBhIHRyYWlsaW5nIGNvbW1hLiBXZSBjb3VsZCBzdHJpcCBpdCBvdXQgaW5zaWRlIHBhcnNlQ29tcGxleCgpIGJ1dCB3ZSdkIG5lZWQgdG8gZG8gaXQgdG8gdGhlIGJlZ2lubmluZyBhbmQgZW5kaW5nIHZhbHVlcyBwbHVzIGl0IHdvdWxkbid0IHByb3ZpZGUgcHJvdGVjdGlvbiBmcm9tIG90aGVyIHBvdGVudGlhbCBzY2VuYXJpb3MgbGlrZSBpZiB0aGUgdXNlciBwYXNzZXMgaW4gYSBzaW1pbGFyIHZhbHVlLlxuICAgICAgdiA9IHYuc3Vic3RyKDAsIHYubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgaWYgKF9jb2xvckxvb2t1cFt2XSkge1xuICAgICAgYSA9IF9jb2xvckxvb2t1cFt2XTtcbiAgICB9IGVsc2UgaWYgKHYuY2hhckF0KDApID09PSBcIiNcIikge1xuICAgICAgaWYgKHYubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIC8vZm9yIHNob3J0aGFuZCBsaWtlICM5RjBcbiAgICAgICAgciA9IHYuY2hhckF0KDEpO1xuICAgICAgICBnID0gdi5jaGFyQXQoMik7XG4gICAgICAgIGIgPSB2LmNoYXJBdCgzKTtcbiAgICAgICAgdiA9IFwiI1wiICsgciArIHIgKyBnICsgZyArIGIgKyBiO1xuICAgICAgfVxuXG4gICAgICB2ID0gcGFyc2VJbnQodi5zdWJzdHIoMSksIDE2KTtcbiAgICAgIGEgPSBbdiA+PiAxNiwgdiA+PiA4ICYgXzI1NSwgdiAmIF8yNTVdO1xuICAgIH0gZWxzZSBpZiAodi5zdWJzdHIoMCwgMykgPT09IFwiaHNsXCIpIHtcbiAgICAgIGEgPSB3YXNIU0wgPSB2Lm1hdGNoKF9zdHJpY3ROdW1FeHApO1xuXG4gICAgICBpZiAoIXRvSFNMKSB7XG4gICAgICAgIGggPSArYVswXSAlIDM2MCAvIDM2MDtcbiAgICAgICAgcyA9ICthWzFdIC8gMTAwO1xuICAgICAgICBsID0gK2FbMl0gLyAxMDA7XG4gICAgICAgIGcgPSBsIDw9IC41ID8gbCAqIChzICsgMSkgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgICByID0gbCAqIDIgLSBnO1xuICAgICAgICBhLmxlbmd0aCA+IDMgJiYgKGFbM10gKj0gMSk7IC8vY2FzdCBhcyBudW1iZXJcblxuICAgICAgICBhWzBdID0gX2h1ZShoICsgMSAvIDMsIHIsIGcpO1xuICAgICAgICBhWzFdID0gX2h1ZShoLCByLCBnKTtcbiAgICAgICAgYVsyXSA9IF9odWUoaCAtIDEgLyAzLCByLCBnKTtcbiAgICAgIH0gZWxzZSBpZiAofnYuaW5kZXhPZihcIj1cIikpIHtcbiAgICAgICAgLy9pZiByZWxhdGl2ZSB2YWx1ZXMgYXJlIGZvdW5kLCBqdXN0IHJldHVybiB0aGUgcmF3IHN0cmluZ3Mgd2l0aCB0aGUgcmVsYXRpdmUgcHJlZml4ZXMgaW4gcGxhY2UuXG4gICAgICAgIGEgPSB2Lm1hdGNoKF9udW1FeHApO1xuICAgICAgICBmb3JjZUFscGhhICYmIGEubGVuZ3RoIDwgNCAmJiAoYVszXSA9IDEpO1xuICAgICAgICByZXR1cm4gYTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IHYubWF0Y2goX3N0cmljdE51bUV4cCkgfHwgX2NvbG9yTG9va3VwLnRyYW5zcGFyZW50O1xuICAgIH1cblxuICAgIGEgPSBhLm1hcChOdW1iZXIpO1xuICB9XG5cbiAgaWYgKHRvSFNMICYmICF3YXNIU0wpIHtcbiAgICByID0gYVswXSAvIF8yNTU7XG4gICAgZyA9IGFbMV0gLyBfMjU1O1xuICAgIGIgPSBhWzJdIC8gXzI1NTtcbiAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBsID0gKG1heCArIG1pbikgLyAyO1xuXG4gICAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgICBoID0gcyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGQgPSBtYXggLSBtaW47XG4gICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG4gICAgICBoID0gbWF4ID09PSByID8gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCkgOiBtYXggPT09IGcgPyAoYiAtIHIpIC8gZCArIDIgOiAociAtIGcpIC8gZCArIDQ7XG4gICAgICBoICo9IDYwO1xuICAgIH1cblxuICAgIGFbMF0gPSB+fihoICsgLjUpO1xuICAgIGFbMV0gPSB+fihzICogMTAwICsgLjUpO1xuICAgIGFbMl0gPSB+fihsICogMTAwICsgLjUpO1xuICB9XG5cbiAgZm9yY2VBbHBoYSAmJiBhLmxlbmd0aCA8IDQgJiYgKGFbM10gPSAxKTtcbiAgcmV0dXJuIGE7XG59LFxuICAgIF9jb2xvck9yZGVyRGF0YSA9IGZ1bmN0aW9uIF9jb2xvck9yZGVyRGF0YSh2KSB7XG4gIC8vIHN0cmlwcyBvdXQgdGhlIGNvbG9ycyBmcm9tIHRoZSBzdHJpbmcsIGZpbmRzIGFsbCB0aGUgbnVtZXJpYyBzbG90cyAod2l0aCB1bml0cykgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgdGhvc2UuIFRoZSBBcnJheSBhbHNvIGhhcyBhIFwiY1wiIHByb3BlcnR5IHdoaWNoIGlzIGFuIEFycmF5IG9mIHRoZSBpbmRleCB2YWx1ZXMgd2hlcmUgdGhlIGNvbG9ycyBiZWxvbmcuIFRoaXMgaXMgdG8gaGVscCB3b3JrIGFyb3VuZCBpc3N1ZXMgd2hlcmUgdGhlcmUncyBhIG1pcy1tYXRjaGVkIG9yZGVyIG9mIGNvbG9yL251bWVyaWMgZGF0YSBsaWtlIGRyb3Atc2hhZG93KCNmMDAgMHB4IDFweCAycHgpIGFuZCBkcm9wLXNoYWRvdygweCAxcHggMnB4ICNmMDApLiBUaGlzIGlzIGJhc2ljYWxseSBhIGhlbHBlciBmdW5jdGlvbiB1c2VkIGluIF9mb3JtYXRDb2xvcnMoKVxuICB2YXIgdmFsdWVzID0gW10sXG4gICAgICBjID0gW10sXG4gICAgICBpID0gLTE7XG4gIHYuc3BsaXQoX2NvbG9yRXhwKS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgdmFyIGEgPSB2Lm1hdGNoKF9udW1XaXRoVW5pdEV4cCkgfHwgW107XG4gICAgdmFsdWVzLnB1c2guYXBwbHkodmFsdWVzLCBhKTtcbiAgICBjLnB1c2goaSArPSBhLmxlbmd0aCArIDEpO1xuICB9KTtcbiAgdmFsdWVzLmMgPSBjO1xuICByZXR1cm4gdmFsdWVzO1xufSxcbiAgICBfZm9ybWF0Q29sb3JzID0gZnVuY3Rpb24gX2Zvcm1hdENvbG9ycyhzLCB0b0hTTCwgb3JkZXJNYXRjaERhdGEpIHtcbiAgdmFyIHJlc3VsdCA9IFwiXCIsXG4gICAgICBjb2xvcnMgPSAocyArIHJlc3VsdCkubWF0Y2goX2NvbG9yRXhwKSxcbiAgICAgIHR5cGUgPSB0b0hTTCA/IFwiaHNsYShcIiA6IFwicmdiYShcIixcbiAgICAgIGkgPSAwLFxuICAgICAgYyxcbiAgICAgIHNoZWxsLFxuICAgICAgZCxcbiAgICAgIGw7XG5cbiAgaWYgKCFjb2xvcnMpIHtcbiAgICByZXR1cm4gcztcbiAgfVxuXG4gIGNvbG9ycyA9IGNvbG9ycy5tYXAoZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgcmV0dXJuIChjb2xvciA9IHNwbGl0Q29sb3IoY29sb3IsIHRvSFNMLCAxKSkgJiYgdHlwZSArICh0b0hTTCA/IGNvbG9yWzBdICsgXCIsXCIgKyBjb2xvclsxXSArIFwiJSxcIiArIGNvbG9yWzJdICsgXCIlLFwiICsgY29sb3JbM10gOiBjb2xvci5qb2luKFwiLFwiKSkgKyBcIilcIjtcbiAgfSk7XG5cbiAgaWYgKG9yZGVyTWF0Y2hEYXRhKSB7XG4gICAgZCA9IF9jb2xvck9yZGVyRGF0YShzKTtcbiAgICBjID0gb3JkZXJNYXRjaERhdGEuYztcblxuICAgIGlmIChjLmpvaW4ocmVzdWx0KSAhPT0gZC5jLmpvaW4ocmVzdWx0KSkge1xuICAgICAgc2hlbGwgPSBzLnJlcGxhY2UoX2NvbG9yRXhwLCBcIjFcIikuc3BsaXQoX251bVdpdGhVbml0RXhwKTtcbiAgICAgIGwgPSBzaGVsbC5sZW5ndGggLSAxO1xuXG4gICAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gc2hlbGxbaV0gKyAofmMuaW5kZXhPZihpKSA/IGNvbG9ycy5zaGlmdCgpIHx8IHR5cGUgKyBcIjAsMCwwLDApXCIgOiAoZC5sZW5ndGggPyBkIDogY29sb3JzLmxlbmd0aCA/IGNvbG9ycyA6IG9yZGVyTWF0Y2hEYXRhKS5zaGlmdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIXNoZWxsKSB7XG4gICAgc2hlbGwgPSBzLnNwbGl0KF9jb2xvckV4cCk7XG4gICAgbCA9IHNoZWxsLmxlbmd0aCAtIDE7XG5cbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgcmVzdWx0ICs9IHNoZWxsW2ldICsgY29sb3JzW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQgKyBzaGVsbFtsXTtcbn0sXG4gICAgX2NvbG9yRXhwID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcyA9IFwiKD86XFxcXGIoPzooPzpyZ2J8cmdiYXxoc2x8aHNsYSlcXFxcKC4rP1xcXFwpKXxcXFxcQiMoPzpbMC05YS1mXXszfSl7MSwyfVxcXFxiXCIsXG4gICAgICAvL3dlJ2xsIGR5bmFtaWNhbGx5IGJ1aWxkIHRoaXMgUmVndWxhciBFeHByZXNzaW9uIHRvIGNvbnNlcnZlIGZpbGUgc2l6ZS4gQWZ0ZXIgYnVpbGRpbmcgaXQsIGl0IHdpbGwgYmUgYWJsZSB0byBmaW5kIHJnYigpLCByZ2JhKCksICMgKGhleGFkZWNpbWFsKSwgYW5kIG5hbWVkIGNvbG9yIHZhbHVlcyBsaWtlIHJlZCwgYmx1ZSwgcHVycGxlLCBldGMuLFxuICBwO1xuXG4gIGZvciAocCBpbiBfY29sb3JMb29rdXApIHtcbiAgICBzICs9IFwifFwiICsgcCArIFwiXFxcXGJcIjtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVnRXhwKHMgKyBcIilcIiwgXCJnaVwiKTtcbn0oKSxcbiAgICBfaHNsRXhwID0gL2hzbFthXT9cXCgvLFxuICAgIF9jb2xvclN0cmluZ0ZpbHRlciA9IGZ1bmN0aW9uIF9jb2xvclN0cmluZ0ZpbHRlcihhKSB7XG4gIHZhciBjb21iaW5lZCA9IGEuam9pbihcIiBcIiksXG4gICAgICB0b0hTTDtcbiAgX2NvbG9yRXhwLmxhc3RJbmRleCA9IDA7XG5cbiAgaWYgKF9jb2xvckV4cC50ZXN0KGNvbWJpbmVkKSkge1xuICAgIHRvSFNMID0gX2hzbEV4cC50ZXN0KGNvbWJpbmVkKTtcbiAgICBhWzFdID0gX2Zvcm1hdENvbG9ycyhhWzFdLCB0b0hTTCk7XG4gICAgYVswXSA9IF9mb3JtYXRDb2xvcnMoYVswXSwgdG9IU0wsIF9jb2xvck9yZGVyRGF0YShhWzFdKSk7IC8vIG1ha2Ugc3VyZSB0aGUgb3JkZXIgb2YgbnVtYmVycy9jb2xvcnMgbWF0Y2ggd2l0aCB0aGUgRU5EIHZhbHVlLlxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0sXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVElDS0VSXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5fdGlja2VyQWN0aXZlLFxuICAgIF90aWNrZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfZ2V0VGltZSA9IERhdGUubm93LFxuICAgICAgX2xhZ1RocmVzaG9sZCA9IDUwMCxcbiAgICAgIF9hZGp1c3RlZExhZyA9IDMzLFxuICAgICAgX3N0YXJ0VGltZSA9IF9nZXRUaW1lKCksXG4gICAgICBfbGFzdFVwZGF0ZSA9IF9zdGFydFRpbWUsXG4gICAgICBfZ2FwID0gMTAwMCAvIDI0MCxcbiAgICAgIF9uZXh0VGltZSA9IF9nYXAsXG4gICAgICBfbGlzdGVuZXJzID0gW10sXG4gICAgICBfaWQsXG4gICAgICBfcmVxLFxuICAgICAgX3JhZixcbiAgICAgIF9zZWxmLFxuICAgICAgX2RlbHRhLFxuICAgICAgX2ksXG4gICAgICBfdGljayA9IGZ1bmN0aW9uIF90aWNrKHYpIHtcbiAgICB2YXIgZWxhcHNlZCA9IF9nZXRUaW1lKCkgLSBfbGFzdFVwZGF0ZSxcbiAgICAgICAgbWFudWFsID0gdiA9PT0gdHJ1ZSxcbiAgICAgICAgb3ZlcmxhcCxcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGZyYW1lO1xuXG4gICAgZWxhcHNlZCA+IF9sYWdUaHJlc2hvbGQgJiYgKF9zdGFydFRpbWUgKz0gZWxhcHNlZCAtIF9hZGp1c3RlZExhZyk7XG4gICAgX2xhc3RVcGRhdGUgKz0gZWxhcHNlZDtcbiAgICB0aW1lID0gX2xhc3RVcGRhdGUgLSBfc3RhcnRUaW1lO1xuICAgIG92ZXJsYXAgPSB0aW1lIC0gX25leHRUaW1lO1xuXG4gICAgaWYgKG92ZXJsYXAgPiAwIHx8IG1hbnVhbCkge1xuICAgICAgZnJhbWUgPSArK19zZWxmLmZyYW1lO1xuICAgICAgX2RlbHRhID0gdGltZSAtIF9zZWxmLnRpbWUgKiAxMDAwO1xuICAgICAgX3NlbGYudGltZSA9IHRpbWUgPSB0aW1lIC8gMTAwMDtcbiAgICAgIF9uZXh0VGltZSArPSBvdmVybGFwICsgKG92ZXJsYXAgPj0gX2dhcCA/IDQgOiBfZ2FwIC0gb3ZlcmxhcCk7XG4gICAgICBkaXNwYXRjaCA9IDE7XG4gICAgfVxuXG4gICAgbWFudWFsIHx8IChfaWQgPSBfcmVxKF90aWNrKSk7IC8vbWFrZSBzdXJlIHRoZSByZXF1ZXN0IGlzIG1hZGUgYmVmb3JlIHdlIGRpc3BhdGNoIHRoZSBcInRpY2tcIiBldmVudCBzbyB0aGF0IHRpbWluZyBpcyBtYWludGFpbmVkLiBPdGhlcndpc2UsIGlmIHByb2Nlc3NpbmcgdGhlIFwidGlja1wiIHJlcXVpcmVzIGEgYnVuY2ggb2YgdGltZSAobGlrZSAxNW1zKSBhbmQgd2UncmUgdXNpbmcgYSBzZXRUaW1lb3V0KCkgdGhhdCdzIGJhc2VkIG9uIDE2LjdtcywgaXQnZCB0ZWNobmljYWxseSB0YWtlIDMxLjdtcyBiZXR3ZWVuIGZyYW1lcyBvdGhlcndpc2UuXG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IF9saXN0ZW5lcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIC8vIHVzZSBfaSBhbmQgY2hlY2sgX2xpc3RlbmVycy5sZW5ndGggaW5zdGVhZCBvZiBhIHZhcmlhYmxlIGJlY2F1c2UgYSBsaXN0ZW5lciBjb3VsZCBnZXQgcmVtb3ZlZCBkdXJpbmcgdGhlIGxvb3AsIGFuZCBpZiB0aGF0IGhhcHBlbnMgdG8gYW4gZWxlbWVudCBsZXNzIHRoYW4gdGhlIGN1cnJlbnQgaW5kZXgsIGl0J2QgdGhyb3cgdGhpbmdzIG9mZiBpbiB0aGUgbG9vcC5cbiAgICAgICAgX2xpc3RlbmVyc1tfaV0odGltZSwgX2RlbHRhLCBmcmFtZSwgdik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9zZWxmID0ge1xuICAgIHRpbWU6IDAsXG4gICAgZnJhbWU6IDAsXG4gICAgdGljazogZnVuY3Rpb24gdGljaygpIHtcbiAgICAgIF90aWNrKHRydWUpO1xuICAgIH0sXG4gICAgZGVsdGFSYXRpbzogZnVuY3Rpb24gZGVsdGFSYXRpbyhmcHMpIHtcbiAgICAgIHJldHVybiBfZGVsdGEgLyAoMTAwMCAvIChmcHMgfHwgNjApKTtcbiAgICB9LFxuICAgIHdha2U6IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgICBpZiAoX2NvcmVSZWFkeSkge1xuICAgICAgICBpZiAoIV9jb3JlSW5pdHRlZCAmJiBfd2luZG93RXhpc3RzKCkpIHtcbiAgICAgICAgICBfd2luID0gX2NvcmVJbml0dGVkID0gd2luZG93O1xuICAgICAgICAgIF9kb2MgPSBfd2luLmRvY3VtZW50IHx8IHt9O1xuICAgICAgICAgIF9nbG9iYWxzLmdzYXAgPSBnc2FwO1xuICAgICAgICAgIChfd2luLmdzYXBWZXJzaW9ucyB8fCAoX3dpbi5nc2FwVmVyc2lvbnMgPSBbXSkpLnB1c2goZ3NhcC52ZXJzaW9uKTtcblxuICAgICAgICAgIF9pbnN0YWxsKF9pbnN0YWxsU2NvcGUgfHwgX3dpbi5HcmVlblNvY2tHbG9iYWxzIHx8ICFfd2luLmdzYXAgJiYgX3dpbiB8fCB7fSk7XG5cbiAgICAgICAgICBfcmFmID0gX3dpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gICAgICAgIH1cblxuICAgICAgICBfaWQgJiYgX3NlbGYuc2xlZXAoKTtcblxuICAgICAgICBfcmVxID0gX3JhZiB8fCBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGYsIF9uZXh0VGltZSAtIF9zZWxmLnRpbWUgKiAxMDAwICsgMSB8IDApO1xuICAgICAgICB9O1xuXG4gICAgICAgIF90aWNrZXJBY3RpdmUgPSAxO1xuXG4gICAgICAgIF90aWNrKDIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2xlZXA6IGZ1bmN0aW9uIHNsZWVwKCkge1xuICAgICAgKF9yYWYgPyBfd2luLmNhbmNlbEFuaW1hdGlvbkZyYW1lIDogY2xlYXJUaW1lb3V0KShfaWQpO1xuICAgICAgX3RpY2tlckFjdGl2ZSA9IDA7XG4gICAgICBfcmVxID0gX2VtcHR5RnVuYztcbiAgICB9LFxuICAgIGxhZ1Ntb290aGluZzogZnVuY3Rpb24gbGFnU21vb3RoaW5nKHRocmVzaG9sZCwgYWRqdXN0ZWRMYWcpIHtcbiAgICAgIF9sYWdUaHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgMSAvIF90aW55TnVtOyAvL3plcm8gc2hvdWxkIGJlIGludGVycHJldGVkIGFzIGJhc2ljYWxseSB1bmxpbWl0ZWRcblxuICAgICAgX2FkanVzdGVkTGFnID0gTWF0aC5taW4oYWRqdXN0ZWRMYWcsIF9sYWdUaHJlc2hvbGQsIDApO1xuICAgIH0sXG4gICAgZnBzOiBmdW5jdGlvbiBmcHMoX2Zwcykge1xuICAgICAgX2dhcCA9IDEwMDAgLyAoX2ZwcyB8fCAyNDApO1xuICAgICAgX25leHRUaW1lID0gX3NlbGYudGltZSAqIDEwMDAgKyBfZ2FwO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbiBhZGQoY2FsbGJhY2spIHtcbiAgICAgIF9saXN0ZW5lcnMuaW5kZXhPZihjYWxsYmFjaykgPCAwICYmIF9saXN0ZW5lcnMucHVzaChjYWxsYmFjayk7XG5cbiAgICAgIF93YWtlKCk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShjYWxsYmFjaykge1xuICAgICAgdmFyIGk7XG4gICAgICB+KGkgPSBfbGlzdGVuZXJzLmluZGV4T2YoY2FsbGJhY2spKSAmJiBfbGlzdGVuZXJzLnNwbGljZShpLCAxKSAmJiBfaSA+PSBpICYmIF9pLS07XG4gICAgfSxcbiAgICBfbGlzdGVuZXJzOiBfbGlzdGVuZXJzXG4gIH07XG4gIHJldHVybiBfc2VsZjtcbn0oKSxcbiAgICBfd2FrZSA9IGZ1bmN0aW9uIF93YWtlKCkge1xuICByZXR1cm4gIV90aWNrZXJBY3RpdmUgJiYgX3RpY2tlci53YWtlKCk7XG59LFxuICAgIC8vYWxzbyBlbnN1cmVzIHRoZSBjb3JlIGNsYXNzZXMgYXJlIGluaXRpYWxpemVkLlxuXG4vKlxuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qIEVBU0lOR1xuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuX2Vhc2VNYXAgPSB7fSxcbiAgICBfY3VzdG9tRWFzZUV4cCA9IC9eW1xcZC5cXC1NXVtcXGQuXFwtLFxcc10vLFxuICAgIF9xdW90ZXNFeHAgPSAvW1wiJ10vZyxcbiAgICBfcGFyc2VPYmplY3RJblN0cmluZyA9IGZ1bmN0aW9uIF9wYXJzZU9iamVjdEluU3RyaW5nKHZhbHVlKSB7XG4gIC8vdGFrZXMgYSBzdHJpbmcgbGlrZSBcInt3aWdnbGVzOjEwLCB0eXBlOmFudGljaXBhdGV9KVwiIGFuZCB0dXJucyBpdCBpbnRvIGEgcmVhbCBvYmplY3QuIE5vdGljZSBpdCBlbmRzIGluIFwiKVwiIGFuZCBpbmNsdWRlcyB0aGUge30gd3JhcHBlcnMuIFRoaXMgaXMgYmVjYXVzZSB3ZSBvbmx5IHVzZSB0aGlzIGZ1bmN0aW9uIGZvciBwYXJzaW5nIGVhc2UgY29uZmlncyBhbmQgcHJpb3JpdGl6ZWQgb3B0aW1pemF0aW9uIHJhdGhlciB0aGFuIHJldXNhYmlsaXR5LlxuICB2YXIgb2JqID0ge30sXG4gICAgICBzcGxpdCA9IHZhbHVlLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGggLSAzKS5zcGxpdChcIjpcIiksXG4gICAgICBrZXkgPSBzcGxpdFswXSxcbiAgICAgIGkgPSAxLFxuICAgICAgbCA9IHNwbGl0Lmxlbmd0aCxcbiAgICAgIGluZGV4LFxuICAgICAgdmFsLFxuICAgICAgcGFyc2VkVmFsO1xuXG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFsID0gc3BsaXRbaV07XG4gICAgaW5kZXggPSBpICE9PSBsIC0gMSA/IHZhbC5sYXN0SW5kZXhPZihcIixcIikgOiB2YWwubGVuZ3RoO1xuICAgIHBhcnNlZFZhbCA9IHZhbC5zdWJzdHIoMCwgaW5kZXgpO1xuICAgIG9ialtrZXldID0gaXNOYU4ocGFyc2VkVmFsKSA/IHBhcnNlZFZhbC5yZXBsYWNlKF9xdW90ZXNFeHAsIFwiXCIpLnRyaW0oKSA6ICtwYXJzZWRWYWw7XG4gICAga2V5ID0gdmFsLnN1YnN0cihpbmRleCArIDEpLnRyaW0oKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59LFxuICAgIF92YWx1ZUluUGFyZW50aGVzZXMgPSBmdW5jdGlvbiBfdmFsdWVJblBhcmVudGhlc2VzKHZhbHVlKSB7XG4gIHZhciBvcGVuID0gdmFsdWUuaW5kZXhPZihcIihcIikgKyAxLFxuICAgICAgY2xvc2UgPSB2YWx1ZS5pbmRleE9mKFwiKVwiKSxcbiAgICAgIG5lc3RlZCA9IHZhbHVlLmluZGV4T2YoXCIoXCIsIG9wZW4pO1xuICByZXR1cm4gdmFsdWUuc3Vic3RyaW5nKG9wZW4sIH5uZXN0ZWQgJiYgbmVzdGVkIDwgY2xvc2UgPyB2YWx1ZS5pbmRleE9mKFwiKVwiLCBjbG9zZSArIDEpIDogY2xvc2UpO1xufSxcbiAgICBfY29uZmlnRWFzZUZyb21TdHJpbmcgPSBmdW5jdGlvbiBfY29uZmlnRWFzZUZyb21TdHJpbmcobmFtZSkge1xuICAvL25hbWUgY2FuIGJlIGEgc3RyaW5nIGxpa2UgXCJlbGFzdGljLm91dCgxLDAuNSlcIiwgYW5kIHBhc3MgaW4gX2Vhc2VNYXAgYXMgb2JqIGFuZCBpdCdsbCBwYXJzZSBpdCBvdXQgYW5kIGNhbGwgdGhlIGFjdHVhbCBmdW5jdGlvbiBsaWtlIF9lYXNlTWFwLkVsYXN0aWMuZWFzZU91dC5jb25maWcoMSwwLjUpLiBJdCB3aWxsIGFsc28gcGFyc2UgY3VzdG9tIGVhc2Ugc3RyaW5ncyBhcyBsb25nIGFzIEN1c3RvbUVhc2UgaXMgbG9hZGVkIGFuZCByZWdpc3RlcmVkIChpbnRlcm5hbGx5IGFzIF9lYXNlTWFwLl9DRSkuXG4gIHZhciBzcGxpdCA9IChuYW1lICsgXCJcIikuc3BsaXQoXCIoXCIpLFxuICAgICAgZWFzZSA9IF9lYXNlTWFwW3NwbGl0WzBdXTtcbiAgcmV0dXJuIGVhc2UgJiYgc3BsaXQubGVuZ3RoID4gMSAmJiBlYXNlLmNvbmZpZyA/IGVhc2UuY29uZmlnLmFwcGx5KG51bGwsIH5uYW1lLmluZGV4T2YoXCJ7XCIpID8gW19wYXJzZU9iamVjdEluU3RyaW5nKHNwbGl0WzFdKV0gOiBfdmFsdWVJblBhcmVudGhlc2VzKG5hbWUpLnNwbGl0KFwiLFwiKS5tYXAoX251bWVyaWNJZlBvc3NpYmxlKSkgOiBfZWFzZU1hcC5fQ0UgJiYgX2N1c3RvbUVhc2VFeHAudGVzdChuYW1lKSA/IF9lYXNlTWFwLl9DRShcIlwiLCBuYW1lKSA6IGVhc2U7XG59LFxuICAgIF9pbnZlcnRFYXNlID0gZnVuY3Rpb24gX2ludmVydEVhc2UoZWFzZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIGVhc2UoMSAtIHApO1xuICB9O1xufSxcbiAgICAvLyBhbGxvdyB5b3lvRWFzZSB0byBiZSBzZXQgaW4gY2hpbGRyZW4gYW5kIGhhdmUgdGhvc2UgYWZmZWN0ZWQgd2hlbiB0aGUgcGFyZW50L2FuY2VzdG9yIHRpbWVsaW5lIHlveW9zLlxuX3Byb3BhZ2F0ZVlveW9FYXNlID0gZnVuY3Rpb24gX3Byb3BhZ2F0ZVlveW9FYXNlKHRpbWVsaW5lLCBpc1lveW8pIHtcbiAgdmFyIGNoaWxkID0gdGltZWxpbmUuX2ZpcnN0LFxuICAgICAgZWFzZTtcblxuICB3aGlsZSAoY2hpbGQpIHtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUaW1lbGluZSkge1xuICAgICAgX3Byb3BhZ2F0ZVlveW9FYXNlKGNoaWxkLCBpc1lveW8pO1xuICAgIH0gZWxzZSBpZiAoY2hpbGQudmFycy55b3lvRWFzZSAmJiAoIWNoaWxkLl95b3lvIHx8ICFjaGlsZC5fcmVwZWF0KSAmJiBjaGlsZC5feW95byAhPT0gaXNZb3lvKSB7XG4gICAgICBpZiAoY2hpbGQudGltZWxpbmUpIHtcbiAgICAgICAgX3Byb3BhZ2F0ZVlveW9FYXNlKGNoaWxkLnRpbWVsaW5lLCBpc1lveW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWFzZSA9IGNoaWxkLl9lYXNlO1xuICAgICAgICBjaGlsZC5fZWFzZSA9IGNoaWxkLl95RWFzZTtcbiAgICAgICAgY2hpbGQuX3lFYXNlID0gZWFzZTtcbiAgICAgICAgY2hpbGQuX3lveW8gPSBpc1lveW87XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgfVxufSxcbiAgICBfcGFyc2VFYXNlID0gZnVuY3Rpb24gX3BhcnNlRWFzZShlYXNlLCBkZWZhdWx0RWFzZSkge1xuICByZXR1cm4gIWVhc2UgPyBkZWZhdWx0RWFzZSA6IChfaXNGdW5jdGlvbihlYXNlKSA/IGVhc2UgOiBfZWFzZU1hcFtlYXNlXSB8fCBfY29uZmlnRWFzZUZyb21TdHJpbmcoZWFzZSkpIHx8IGRlZmF1bHRFYXNlO1xufSxcbiAgICBfaW5zZXJ0RWFzZSA9IGZ1bmN0aW9uIF9pbnNlcnRFYXNlKG5hbWVzLCBlYXNlSW4sIGVhc2VPdXQsIGVhc2VJbk91dCkge1xuICBpZiAoZWFzZU91dCA9PT0gdm9pZCAwKSB7XG4gICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgICAgcmV0dXJuIDEgLSBlYXNlSW4oMSAtIHApO1xuICAgIH07XG4gIH1cblxuICBpZiAoZWFzZUluT3V0ID09PSB2b2lkIDApIHtcbiAgICBlYXNlSW5PdXQgPSBmdW5jdGlvbiBlYXNlSW5PdXQocCkge1xuICAgICAgcmV0dXJuIHAgPCAuNSA/IGVhc2VJbihwICogMikgLyAyIDogMSAtIGVhc2VJbigoMSAtIHApICogMikgLyAyO1xuICAgIH07XG4gIH1cblxuICB2YXIgZWFzZSA9IHtcbiAgICBlYXNlSW46IGVhc2VJbixcbiAgICBlYXNlT3V0OiBlYXNlT3V0LFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0XG4gIH0sXG4gICAgICBsb3dlcmNhc2VOYW1lO1xuXG4gIF9mb3JFYWNoTmFtZShuYW1lcywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBfZWFzZU1hcFtuYW1lXSA9IF9nbG9iYWxzW25hbWVdID0gZWFzZTtcbiAgICBfZWFzZU1hcFtsb3dlcmNhc2VOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGVhc2VPdXQ7XG5cbiAgICBmb3IgKHZhciBwIGluIGVhc2UpIHtcbiAgICAgIF9lYXNlTWFwW2xvd2VyY2FzZU5hbWUgKyAocCA9PT0gXCJlYXNlSW5cIiA/IFwiLmluXCIgOiBwID09PSBcImVhc2VPdXRcIiA/IFwiLm91dFwiIDogXCIuaW5PdXRcIildID0gX2Vhc2VNYXBbbmFtZSArIFwiLlwiICsgcF0gPSBlYXNlW3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVhc2U7XG59LFxuICAgIF9lYXNlSW5PdXRGcm9tT3V0ID0gZnVuY3Rpb24gX2Vhc2VJbk91dEZyb21PdXQoZWFzZU91dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gcCA8IC41ID8gKDEgLSBlYXNlT3V0KDEgLSBwICogMikpIC8gMiA6IC41ICsgZWFzZU91dCgocCAtIC41KSAqIDIpIC8gMjtcbiAgfTtcbn0sXG4gICAgX2NvbmZpZ0VsYXN0aWMgPSBmdW5jdGlvbiBfY29uZmlnRWxhc3RpYyh0eXBlLCBhbXBsaXR1ZGUsIHBlcmlvZCkge1xuICB2YXIgcDEgPSBhbXBsaXR1ZGUgPj0gMSA/IGFtcGxpdHVkZSA6IDEsXG4gICAgICAvL25vdGU6IGlmIGFtcGxpdHVkZSBpcyA8IDEsIHdlIHNpbXBseSBhZGp1c3QgdGhlIHBlcmlvZCBmb3IgYSBtb3JlIG5hdHVyYWwgZmVlbC4gT3RoZXJ3aXNlIHRoZSBtYXRoIGRvZXNuJ3Qgd29yayByaWdodCBhbmQgdGhlIGN1cnZlIHN0YXJ0cyBhdCAxLlxuICBwMiA9IChwZXJpb2QgfHwgKHR5cGUgPyAuMyA6IC40NSkpIC8gKGFtcGxpdHVkZSA8IDEgPyBhbXBsaXR1ZGUgOiAxKSxcbiAgICAgIHAzID0gcDIgLyBfMlBJICogKE1hdGguYXNpbigxIC8gcDEpIHx8IDApLFxuICAgICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgIHJldHVybiBwID09PSAxID8gMSA6IHAxICogTWF0aC5wb3coMiwgLTEwICogcCkgKiBfc2luKChwIC0gcDMpICogcDIpICsgMTtcbiAgfSxcbiAgICAgIGVhc2UgPSB0eXBlID09PSBcIm91dFwiID8gZWFzZU91dCA6IHR5cGUgPT09IFwiaW5cIiA/IGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIDEgLSBlYXNlT3V0KDEgLSBwKTtcbiAgfSA6IF9lYXNlSW5PdXRGcm9tT3V0KGVhc2VPdXQpO1xuXG4gIHAyID0gXzJQSSAvIHAyOyAvL3ByZWNhbGN1bGF0ZSB0byBvcHRpbWl6ZVxuXG4gIGVhc2UuY29uZmlnID0gZnVuY3Rpb24gKGFtcGxpdHVkZSwgcGVyaW9kKSB7XG4gICAgcmV0dXJuIF9jb25maWdFbGFzdGljKHR5cGUsIGFtcGxpdHVkZSwgcGVyaW9kKTtcbiAgfTtcblxuICByZXR1cm4gZWFzZTtcbn0sXG4gICAgX2NvbmZpZ0JhY2sgPSBmdW5jdGlvbiBfY29uZmlnQmFjayh0eXBlLCBvdmVyc2hvb3QpIHtcbiAgaWYgKG92ZXJzaG9vdCA9PT0gdm9pZCAwKSB7XG4gICAgb3ZlcnNob290ID0gMS43MDE1ODtcbiAgfVxuXG4gIHZhciBlYXNlT3V0ID0gZnVuY3Rpb24gZWFzZU91dChwKSB7XG4gICAgcmV0dXJuIHAgPyAtLXAgKiBwICogKChvdmVyc2hvb3QgKyAxKSAqIHAgKyBvdmVyc2hvb3QpICsgMSA6IDA7XG4gIH0sXG4gICAgICBlYXNlID0gdHlwZSA9PT0gXCJvdXRcIiA/IGVhc2VPdXQgOiB0eXBlID09PSBcImluXCIgPyBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAxIC0gZWFzZU91dCgxIC0gcCk7XG4gIH0gOiBfZWFzZUluT3V0RnJvbU91dChlYXNlT3V0KTtcblxuICBlYXNlLmNvbmZpZyA9IGZ1bmN0aW9uIChvdmVyc2hvb3QpIHtcbiAgICByZXR1cm4gX2NvbmZpZ0JhY2sodHlwZSwgb3ZlcnNob290KTtcbiAgfTtcblxuICByZXR1cm4gZWFzZTtcbn07IC8vIGEgY2hlYXBlciAoa2IgYW5kIGNwdSkgYnV0IG1vcmUgbWlsZCB3YXkgdG8gZ2V0IGEgcGFyYW1ldGVyaXplZCB3ZWlnaHRlZCBlYXNlIGJ5IGZlZWRpbmcgaW4gYSB2YWx1ZSBiZXR3ZWVuIC0xIChlYXNlSW4pIGFuZCAxIChlYXNlT3V0KSB3aGVyZSAwIGlzIGxpbmVhci5cbi8vIF93ZWlnaHRlZEVhc2UgPSByYXRpbyA9PiB7XG4vLyBcdGxldCB5ID0gMC41ICsgcmF0aW8gLyAyO1xuLy8gXHRyZXR1cm4gcCA9PiAoMiAqICgxIC0gcCkgKiBwICogeSArIHAgKiBwKTtcbi8vIH0sXG4vLyBhIHN0cm9uZ2VyIChidXQgbW9yZSBleHBlbnNpdmUga2IvY3B1KSBwYXJhbWV0ZXJpemVkIHdlaWdodGVkIGVhc2UgdGhhdCBsZXRzIHlvdSBmZWVkIGluIGEgdmFsdWUgYmV0d2VlbiAtMSAoZWFzZUluKSBhbmQgMSAoZWFzZU91dCkgd2hlcmUgMCBpcyBsaW5lYXIuXG4vLyBfd2VpZ2h0ZWRFYXNlU3Ryb25nID0gcmF0aW8gPT4ge1xuLy8gXHRyYXRpbyA9IC41ICsgcmF0aW8gLyAyO1xuLy8gXHRsZXQgbyA9IDEgLyAzICogKHJhdGlvIDwgLjUgPyByYXRpbyA6IDEgLSByYXRpbyksXG4vLyBcdFx0YiA9IHJhdGlvIC0gbyxcbi8vIFx0XHRjID0gcmF0aW8gKyBvO1xuLy8gXHRyZXR1cm4gcCA9PiBwID09PSAxID8gcCA6IDMgKiBiICogKDEgLSBwKSAqICgxIC0gcCkgKiBwICsgMyAqIGMgKiAoMSAtIHApICogcCAqIHAgKyBwICogcCAqIHA7XG4vLyB9O1xuXG5cbl9mb3JFYWNoTmFtZShcIkxpbmVhcixRdWFkLEN1YmljLFF1YXJ0LFF1aW50LFN0cm9uZ1wiLCBmdW5jdGlvbiAobmFtZSwgaSkge1xuICB2YXIgcG93ZXIgPSBpIDwgNSA/IGkgKyAxIDogaTtcblxuICBfaW5zZXJ0RWFzZShuYW1lICsgXCIsUG93ZXJcIiArIChwb3dlciAtIDEpLCBpID8gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gTWF0aC5wb3cocCwgcG93ZXIpO1xuICB9IDogZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gcDtcbiAgfSwgZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KDEgLSBwLCBwb3dlcik7XG4gIH0sIGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIHAgPCAuNSA/IE1hdGgucG93KHAgKiAyLCBwb3dlcikgLyAyIDogMSAtIE1hdGgucG93KCgxIC0gcCkgKiAyLCBwb3dlcikgLyAyO1xuICB9KTtcbn0pO1xuXG5fZWFzZU1hcC5MaW5lYXIuZWFzZU5vbmUgPSBfZWFzZU1hcC5ub25lID0gX2Vhc2VNYXAuTGluZWFyLmVhc2VJbjtcblxuX2luc2VydEVhc2UoXCJFbGFzdGljXCIsIF9jb25maWdFbGFzdGljKFwiaW5cIiksIF9jb25maWdFbGFzdGljKFwib3V0XCIpLCBfY29uZmlnRWxhc3RpYygpKTtcblxuKGZ1bmN0aW9uIChuLCBjKSB7XG4gIHZhciBuMSA9IDEgLyBjLFxuICAgICAgbjIgPSAyICogbjEsXG4gICAgICBuMyA9IDIuNSAqIG4xLFxuICAgICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgIHJldHVybiBwIDwgbjEgPyBuICogcCAqIHAgOiBwIDwgbjIgPyBuICogTWF0aC5wb3cocCAtIDEuNSAvIGMsIDIpICsgLjc1IDogcCA8IG4zID8gbiAqIChwIC09IDIuMjUgLyBjKSAqIHAgKyAuOTM3NSA6IG4gKiBNYXRoLnBvdyhwIC0gMi42MjUgLyBjLCAyKSArIC45ODQzNzU7XG4gIH07XG5cbiAgX2luc2VydEVhc2UoXCJCb3VuY2VcIiwgZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIGVhc2VPdXQoMSAtIHApO1xuICB9LCBlYXNlT3V0KTtcbn0pKDcuNTYyNSwgMi43NSk7XG5cbl9pbnNlcnRFYXNlKFwiRXhwb1wiLCBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gcCA/IE1hdGgucG93KDIsIDEwICogKHAgLSAxKSkgOiAwO1xufSk7XG5cbl9pbnNlcnRFYXNlKFwiQ2lyY1wiLCBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gLShfc3FydCgxIC0gcCAqIHApIC0gMSk7XG59KTtcblxuX2luc2VydEVhc2UoXCJTaW5lXCIsIGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiBwID09PSAxID8gMSA6IC1fY29zKHAgKiBfSEFMRl9QSSkgKyAxO1xufSk7XG5cbl9pbnNlcnRFYXNlKFwiQmFja1wiLCBfY29uZmlnQmFjayhcImluXCIpLCBfY29uZmlnQmFjayhcIm91dFwiKSwgX2NvbmZpZ0JhY2soKSk7XG5cbl9lYXNlTWFwLlN0ZXBwZWRFYXNlID0gX2Vhc2VNYXAuc3RlcHMgPSBfZ2xvYmFscy5TdGVwcGVkRWFzZSA9IHtcbiAgY29uZmlnOiBmdW5jdGlvbiBjb25maWcoc3RlcHMsIGltbWVkaWF0ZVN0YXJ0KSB7XG4gICAgaWYgKHN0ZXBzID09PSB2b2lkIDApIHtcbiAgICAgIHN0ZXBzID0gMTtcbiAgICB9XG5cbiAgICB2YXIgcDEgPSAxIC8gc3RlcHMsXG4gICAgICAgIHAyID0gc3RlcHMgKyAoaW1tZWRpYXRlU3RhcnQgPyAwIDogMSksXG4gICAgICAgIHAzID0gaW1tZWRpYXRlU3RhcnQgPyAxIDogMCxcbiAgICAgICAgbWF4ID0gMSAtIF90aW55TnVtO1xuICAgIHJldHVybiBmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuICgocDIgKiBfY2xhbXAoMCwgbWF4LCBwKSB8IDApICsgcDMpICogcDE7XG4gICAgfTtcbiAgfVxufTtcbl9kZWZhdWx0cy5lYXNlID0gX2Vhc2VNYXBbXCJxdWFkLm91dFwiXTtcblxuX2ZvckVhY2hOYW1lKFwib25Db21wbGV0ZSxvblVwZGF0ZSxvblN0YXJ0LG9uUmVwZWF0LG9uUmV2ZXJzZUNvbXBsZXRlLG9uSW50ZXJydXB0XCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBfY2FsbGJhY2tOYW1lcyArPSBuYW1lICsgXCIsXCIgKyBuYW1lICsgXCJQYXJhbXMsXCI7XG59KTtcbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ0FDSEVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG5leHBvcnQgdmFyIEdTQ2FjaGUgPSBmdW5jdGlvbiBHU0NhY2hlKHRhcmdldCwgaGFybmVzcykge1xuICB0aGlzLmlkID0gX2dzSUQrKztcbiAgdGFyZ2V0Ll9nc2FwID0gdGhpcztcbiAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIHRoaXMuaGFybmVzcyA9IGhhcm5lc3M7XG4gIHRoaXMuZ2V0ID0gaGFybmVzcyA/IGhhcm5lc3MuZ2V0IDogX2dldFByb3BlcnR5O1xuICB0aGlzLnNldCA9IGhhcm5lc3MgPyBoYXJuZXNzLmdldFNldHRlciA6IF9nZXRTZXR0ZXI7XG59O1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBTklNQVRJT05cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZXhwb3J0IHZhciBBbmltYXRpb24gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBbmltYXRpb24odmFycywgdGltZSkge1xuICAgIHZhciBwYXJlbnQgPSB2YXJzLnBhcmVudCB8fCBfZ2xvYmFsVGltZWxpbmU7XG4gICAgdGhpcy52YXJzID0gdmFycztcbiAgICB0aGlzLl9kZWxheSA9ICt2YXJzLmRlbGF5IHx8IDA7XG5cbiAgICBpZiAodGhpcy5fcmVwZWF0ID0gdmFycy5yZXBlYXQgfHwgMCkge1xuICAgICAgdGhpcy5fckRlbGF5ID0gdmFycy5yZXBlYXREZWxheSB8fCAwO1xuICAgICAgdGhpcy5feW95byA9ICEhdmFycy55b3lvIHx8ICEhdmFycy55b3lvRWFzZTtcbiAgICB9XG5cbiAgICB0aGlzLl90cyA9IDE7XG5cbiAgICBfc2V0RHVyYXRpb24odGhpcywgK3ZhcnMuZHVyYXRpb24sIDEsIDEpO1xuXG4gICAgdGhpcy5kYXRhID0gdmFycy5kYXRhO1xuICAgIF90aWNrZXJBY3RpdmUgfHwgX3RpY2tlci53YWtlKCk7XG4gICAgcGFyZW50ICYmIF9hZGRUb1RpbWVsaW5lKHBhcmVudCwgdGhpcywgdGltZSB8fCB0aW1lID09PSAwID8gdGltZSA6IHBhcmVudC5fdGltZSwgMSk7XG4gICAgdmFycy5yZXZlcnNlZCAmJiB0aGlzLnJldmVyc2UoKTtcbiAgICB2YXJzLnBhdXNlZCAmJiB0aGlzLnBhdXNlZCh0cnVlKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBBbmltYXRpb24ucHJvdG90eXBlO1xuXG4gIF9wcm90by5kZWxheSA9IGZ1bmN0aW9uIGRlbGF5KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5zbW9vdGhDaGlsZFRpbWluZyAmJiB0aGlzLnN0YXJ0VGltZSh0aGlzLl9zdGFydCArIHZhbHVlIC0gdGhpcy5fZGVsYXkpO1xuICAgICAgdGhpcy5fZGVsYXkgPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9kZWxheTtcbiAgfTtcblxuICBfcHJvdG8uZHVyYXRpb24gPSBmdW5jdGlvbiBkdXJhdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy50b3RhbER1cmF0aW9uKHRoaXMuX3JlcGVhdCA+IDAgPyB2YWx1ZSArICh2YWx1ZSArIHRoaXMuX3JEZWxheSkgKiB0aGlzLl9yZXBlYXQgOiB2YWx1ZSkgOiB0aGlzLnRvdGFsRHVyYXRpb24oKSAmJiB0aGlzLl9kdXI7XG4gIH07XG5cbiAgX3Byb3RvLnRvdGFsRHVyYXRpb24gPSBmdW5jdGlvbiB0b3RhbER1cmF0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdER1cjtcbiAgICB9XG5cbiAgICB0aGlzLl9kaXJ0eSA9IDA7XG4gICAgcmV0dXJuIF9zZXREdXJhdGlvbih0aGlzLCB0aGlzLl9yZXBlYXQgPCAwID8gdmFsdWUgOiAodmFsdWUgLSB0aGlzLl9yZXBlYXQgKiB0aGlzLl9yRGVsYXkpIC8gKHRoaXMuX3JlcGVhdCArIDEpKTtcbiAgfTtcblxuICBfcHJvdG8udG90YWxUaW1lID0gZnVuY3Rpb24gdG90YWxUaW1lKF90b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgX3dha2UoKTtcblxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RUaW1lO1xuICAgIH1cblxuICAgIHZhciBwYXJlbnQgPSB0aGlzLl9kcDtcblxuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LnNtb290aENoaWxkVGltaW5nICYmIHRoaXMuX3RzKSB7XG4gICAgICBfYWxpZ25QbGF5aGVhZCh0aGlzLCBfdG90YWxUaW1lKTsgLy9pbiBjYXNlIGFueSBvZiB0aGUgYW5jZXN0b3IgdGltZWxpbmVzIGhhZCBjb21wbGV0ZWQgYnV0IHNob3VsZCBub3cgYmUgZW5hYmxlZCwgd2Ugc2hvdWxkIHJlc2V0IHRoZWlyIHRvdGFsVGltZSgpIHdoaWNoIHdpbGwgYWxzbyBlbnN1cmUgdGhhdCB0aGV5J3JlIGxpbmVkIHVwIHByb3Blcmx5IGFuZCBlbmFibGVkLiBTa2lwIGZvciBhbmltYXRpb25zIHRoYXQgYXJlIG9uIHRoZSByb290ICh3YXN0ZWZ1bCkuIEV4YW1wbGU6IGEgVGltZWxpbmVMaXRlLmV4cG9ydFJvb3QoKSBpcyBwZXJmb3JtZWQgd2hlbiB0aGVyZSdzIGEgcGF1c2VkIHR3ZWVuIG9uIHRoZSByb290LCB0aGUgZXhwb3J0IHdpbGwgbm90IGNvbXBsZXRlIHVudGlsIHRoYXQgdHdlZW4gaXMgdW5wYXVzZWQsIGJ1dCBpbWFnaW5lIGEgY2hpbGQgZ2V0cyByZXN0YXJ0ZWQgbGF0ZXIsIGFmdGVyIGFsbCBbdW5wYXVzZWRdIHR3ZWVucyBoYXZlIGNvbXBsZXRlZC4gVGhlIHN0YXJ0IG9mIHRoYXQgY2hpbGQgd291bGQgZ2V0IHB1c2hlZCBvdXQsIGJ1dCBvbmUgb2YgdGhlIGFuY2VzdG9ycyBtYXkgaGF2ZSBjb21wbGV0ZWQuXG5cblxuICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudC5wYXJlbnQuX3RpbWUgIT09IHBhcmVudC5fc3RhcnQgKyAocGFyZW50Ll90cyA+PSAwID8gcGFyZW50Ll90VGltZSAvIHBhcmVudC5fdHMgOiAocGFyZW50LnRvdGFsRHVyYXRpb24oKSAtIHBhcmVudC5fdFRpbWUpIC8gLXBhcmVudC5fdHMpKSB7XG4gICAgICAgICAgcGFyZW50LnRvdGFsVGltZShwYXJlbnQuX3RUaW1lLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wYXJlbnQgJiYgdGhpcy5fZHAuYXV0b1JlbW92ZUNoaWxkcmVuICYmICh0aGlzLl90cyA+IDAgJiYgX3RvdGFsVGltZSA8IHRoaXMuX3REdXIgfHwgdGhpcy5fdHMgPCAwICYmIF90b3RhbFRpbWUgPiAwIHx8ICF0aGlzLl90RHVyICYmICFfdG90YWxUaW1lKSkge1xuICAgICAgICAvL2lmIHRoZSBhbmltYXRpb24gZG9lc24ndCBoYXZlIGEgcGFyZW50LCBwdXQgaXQgYmFjayBpbnRvIGl0cyBsYXN0IHBhcmVudCAocmVjb3JkZWQgYXMgX2RwIGZvciBleGFjdGx5IGNhc2VzIGxpa2UgdGhpcykuIExpbWl0IHRvIHBhcmVudHMgd2l0aCBhdXRvUmVtb3ZlQ2hpbGRyZW4gKGxpa2UgZ2xvYmFsVGltZWxpbmUpIHNvIHRoYXQgaWYgdGhlIHVzZXIgbWFudWFsbHkgcmVtb3ZlcyBhbiBhbmltYXRpb24gZnJvbSBhIHRpbWVsaW5lIGFuZCB0aGVuIGFsdGVycyBpdHMgcGxheWhlYWQsIGl0IGRvZXNuJ3QgZ2V0IGFkZGVkIGJhY2sgaW4uXG4gICAgICAgIF9hZGRUb1RpbWVsaW5lKHRoaXMuX2RwLCB0aGlzLCB0aGlzLl9zdGFydCAtIHRoaXMuX2RlbGF5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdFRpbWUgIT09IF90b3RhbFRpbWUgfHwgIXRoaXMuX2R1ciAmJiAhc3VwcHJlc3NFdmVudHMgfHwgdGhpcy5faW5pdHRlZCAmJiBNYXRoLmFicyh0aGlzLl96VGltZSkgPT09IF90aW55TnVtIHx8ICFfdG90YWxUaW1lICYmICF0aGlzLl9pbml0dGVkICYmICh0aGlzLmFkZCB8fCB0aGlzLl9wdExvb2t1cCkpIHtcbiAgICAgIC8vIGNoZWNrIGZvciBfcHRMb29rdXAgb24gYSBUd2VlbiBpbnN0YW5jZSB0byBlbnN1cmUgaXQgaGFzIGFjdHVhbGx5IGZpbmlzaGVkIGJlaW5nIGluc3RhbnRpYXRlZCwgb3RoZXJ3aXNlIGlmIHRoaXMucmV2ZXJzZSgpIGdldHMgY2FsbGVkIGluIHRoZSBBbmltYXRpb24gY29uc3RydWN0b3IsIGl0IGNvdWxkIHRyaWdnZXIgYSByZW5kZXIoKSBoZXJlIGV2ZW4gdGhvdWdoIHRoZSBfdGFyZ2V0cyB3ZXJlbid0IHBvcHVsYXRlZCwgdGh1cyB3aGVuIF9pbml0KCkgaXMgY2FsbGVkIHRoZXJlIHdvbid0IGJlIGFueSBQcm9wVHdlZW5zIChpdCdsbCBhY3QgbGlrZSB0aGUgdHdlZW4gaXMgbm9uLWZ1bmN0aW9uYWwpXG4gICAgICB0aGlzLl90cyB8fCAodGhpcy5fcFRpbWUgPSBfdG90YWxUaW1lKTsgLy8gb3RoZXJ3aXNlLCBpZiBhbiBhbmltYXRpb24gaXMgcGF1c2VkLCB0aGVuIHRoZSBwbGF5aGVhZCBpcyBtb3ZlZCBiYWNrIHRvIHplcm8sIHRoZW4gcmVzdW1lZCwgaXQnZCByZXZlcnQgYmFjayB0byB0aGUgb3JpZ2luYWwgdGltZSBhdCB0aGUgcGF1c2VcblxuICAgICAgX2xhenlTYWZlUmVuZGVyKHRoaXMsIF90b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8udGltZSA9IGZ1bmN0aW9uIHRpbWUodmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRvdGFsVGltZShNYXRoLm1pbih0aGlzLnRvdGFsRHVyYXRpb24oKSwgdmFsdWUgKyBfZWxhcHNlZEN5Y2xlRHVyYXRpb24odGhpcykpICUgdGhpcy5fZHVyIHx8ICh2YWx1ZSA/IHRoaXMuX2R1ciA6IDApLCBzdXBwcmVzc0V2ZW50cykgOiB0aGlzLl90aW1lOyAvLyBub3RlOiBpZiB0aGUgbW9kdWx1cyByZXN1bHRzIGluIDAsIHRoZSBwbGF5aGVhZCBjb3VsZCBiZSBleGFjdGx5IGF0IHRoZSBlbmQgb3IgdGhlIGJlZ2lubmluZywgYW5kIHdlIGFsd2F5cyBkZWZlciB0byB0aGUgRU5EIHdpdGggYSBub24temVybyB2YWx1ZSwgb3RoZXJ3aXNlIGlmIHlvdSBzZXQgdGhlIHRpbWUoKSB0byB0aGUgdmVyeSBlbmQgKGR1cmF0aW9uKCkpLCBpdCB3b3VsZCByZW5kZXIgYXQgdGhlIFNUQVJUIVxuICB9O1xuXG4gIF9wcm90by50b3RhbFByb2dyZXNzID0gZnVuY3Rpb24gdG90YWxQcm9ncmVzcyh2YWx1ZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxUaW1lKHRoaXMudG90YWxEdXJhdGlvbigpICogdmFsdWUsIHN1cHByZXNzRXZlbnRzKSA6IHRoaXMudG90YWxEdXJhdGlvbigpID8gTWF0aC5taW4oMSwgdGhpcy5fdFRpbWUgLyB0aGlzLl90RHVyKSA6IHRoaXMucmF0aW87XG4gIH07XG5cbiAgX3Byb3RvLnByb2dyZXNzID0gZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRvdGFsVGltZSh0aGlzLmR1cmF0aW9uKCkgKiAodGhpcy5feW95byAmJiAhKHRoaXMuaXRlcmF0aW9uKCkgJiAxKSA/IDEgLSB2YWx1ZSA6IHZhbHVlKSArIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbih0aGlzKSwgc3VwcHJlc3NFdmVudHMpIDogdGhpcy5kdXJhdGlvbigpID8gTWF0aC5taW4oMSwgdGhpcy5fdGltZSAvIHRoaXMuX2R1cikgOiB0aGlzLnJhdGlvO1xuICB9O1xuXG4gIF9wcm90by5pdGVyYXRpb24gPSBmdW5jdGlvbiBpdGVyYXRpb24odmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgdmFyIGN5Y2xlRHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uKCkgKyB0aGlzLl9yRGVsYXk7XG5cbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxUaW1lKHRoaXMuX3RpbWUgKyAodmFsdWUgLSAxKSAqIGN5Y2xlRHVyYXRpb24sIHN1cHByZXNzRXZlbnRzKSA6IHRoaXMuX3JlcGVhdCA/IF9hbmltYXRpb25DeWNsZSh0aGlzLl90VGltZSwgY3ljbGVEdXJhdGlvbikgKyAxIDogMTtcbiAgfSAvLyBwb3RlbnRpYWwgZnV0dXJlIGFkZGl0aW9uOlxuICAvLyBpc1BsYXlpbmdCYWNrd2FyZHMoKSB7XG4gIC8vIFx0bGV0IGFuaW1hdGlvbiA9IHRoaXMsXG4gIC8vIFx0XHRvcmllbnRhdGlvbiA9IDE7IC8vIDEgPSBmb3J3YXJkLCAtMSA9IGJhY2t3YXJkXG4gIC8vIFx0d2hpbGUgKGFuaW1hdGlvbikge1xuICAvLyBcdFx0b3JpZW50YXRpb24gKj0gYW5pbWF0aW9uLnJldmVyc2VkKCkgfHwgKGFuaW1hdGlvbi5yZXBlYXQoKSAmJiAhKGFuaW1hdGlvbi5pdGVyYXRpb24oKSAmIDEpKSA/IC0xIDogMTtcbiAgLy8gXHRcdGFuaW1hdGlvbiA9IGFuaW1hdGlvbi5wYXJlbnQ7XG4gIC8vIFx0fVxuICAvLyBcdHJldHVybiBvcmllbnRhdGlvbiA8IDA7XG4gIC8vIH1cbiAgO1xuXG4gIF9wcm90by50aW1lU2NhbGUgPSBmdW5jdGlvbiB0aW1lU2NhbGUodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydHMgPT09IC1fdGlueU51bSA/IDAgOiB0aGlzLl9ydHM7IC8vIHJlY29yZGVkIHRpbWVTY2FsZS4gU3BlY2lhbCBjYXNlOiBpZiBzb21lb25lIGNhbGxzIHJldmVyc2UoKSBvbiBhbiBhbmltYXRpb24gd2l0aCB0aW1lU2NhbGUgb2YgMCwgd2UgYXNzaWduIGl0IC1fdGlueU51bSB0byByZW1lbWJlciBpdCdzIHJldmVyc2VkLlxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ydHMgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgdFRpbWUgPSB0aGlzLnBhcmVudCAmJiB0aGlzLl90cyA/IF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHRoaXMucGFyZW50Ll90aW1lLCB0aGlzKSA6IHRoaXMuX3RUaW1lOyAvLyBtYWtlIHN1cmUgdG8gZG8gdGhlIHBhcmVudFRvQ2hpbGRUb3RhbFRpbWUoKSBCRUZPUkUgc2V0dGluZyB0aGUgbmV3IF90cyBiZWNhdXNlIHRoZSBvbGQgb25lIG11c3QgYmUgdXNlZCBpbiB0aGF0IGNhbGN1bGF0aW9uLlxuICAgIC8vIHByaW9yaXRpemUgcmVuZGVyaW5nIHdoZXJlIHRoZSBwYXJlbnQncyBwbGF5aGVhZCBsaW5lcyB1cCBpbnN0ZWFkIG9mIHRoaXMuX3RUaW1lIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgYSB0d2VlbiB0aGF0J3MgYW5pbWF0aW5nIGFub3RoZXIgdHdlZW4ncyB0aW1lU2NhbGUgaW4gdGhlIHNhbWUgcmVuZGVyaW5nIGxvb3AgKHNhbWUgcGFyZW50KSwgdGh1cyBpZiB0aGUgdGltZVNjYWxlIHR3ZWVuIHJlbmRlcnMgZmlyc3QsIGl0IHdvdWxkIGFsdGVyIF9zdGFydCBCRUZPUkUgX3RUaW1lIHdhcyBzZXQgb24gdGhhdCB0aWNrIChpbiB0aGUgcmVuZGVyaW5nIGxvb3ApLCBlZmZlY3RpdmVseSBmcmVlemluZyBpdCB1bnRpbCB0aGUgdGltZVNjYWxlIHR3ZWVuIGZpbmlzaGVzLlxuXG4gICAgdGhpcy5fcnRzID0gK3ZhbHVlIHx8IDA7XG4gICAgdGhpcy5fdHMgPSB0aGlzLl9wcyB8fCB2YWx1ZSA9PT0gLV90aW55TnVtID8gMCA6IHRoaXMuX3J0czsgLy8gX3RzIGlzIHRoZSBmdW5jdGlvbmFsIHRpbWVTY2FsZSB3aGljaCB3b3VsZCBiZSAwIGlmIHRoZSBhbmltYXRpb24gaXMgcGF1c2VkLlxuXG4gICAgcmV0dXJuIF9yZWNhY2hlQW5jZXN0b3JzKHRoaXMudG90YWxUaW1lKF9jbGFtcCgtdGhpcy5fZGVsYXksIHRoaXMuX3REdXIsIHRUaW1lKSwgdHJ1ZSkpO1xuICB9O1xuXG4gIF9wcm90by5wYXVzZWQgPSBmdW5jdGlvbiBwYXVzZWQodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcHMgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9wcyA9IHZhbHVlO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcFRpbWUgPSB0aGlzLl90VGltZSB8fCBNYXRoLm1heCgtdGhpcy5fZGVsYXksIHRoaXMucmF3VGltZSgpKTsgLy8gaWYgdGhlIHBhdXNlIG9jY3VycyBkdXJpbmcgdGhlIGRlbGF5IHBoYXNlLCBtYWtlIHN1cmUgdGhhdCdzIGZhY3RvcmVkIGluIHdoZW4gcmVzdW1pbmcuXG5cbiAgICAgICAgdGhpcy5fdHMgPSB0aGlzLl9hY3QgPSAwOyAvLyBfdHMgaXMgdGhlIGZ1bmN0aW9uYWwgdGltZVNjYWxlLCBzbyBhIHBhdXNlZCB0d2VlbiB3b3VsZCBlZmZlY3RpdmVseSBoYXZlIGEgdGltZVNjYWxlIG9mIDAuIFdlIHJlY29yZCB0aGUgXCJyZWFsXCIgdGltZVNjYWxlIGFzIF9ydHMgKHJlY29yZGVkIHRpbWUgc2NhbGUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfd2FrZSgpO1xuXG4gICAgICAgIHRoaXMuX3RzID0gdGhpcy5fcnRzOyAvL29ubHkgZGVmZXIgdG8gX3BUaW1lIChwYXVzZVRpbWUpIGlmIHRUaW1lIGlzIHplcm8uIFJlbWVtYmVyLCBzb21lb25lIGNvdWxkIHBhdXNlKCkgYW4gYW5pbWF0aW9uLCB0aGVuIHNjcnViIHRoZSBwbGF5aGVhZCBhbmQgcmVzdW1lKCkuIElmIHRoZSBwYXJlbnQgZG9lc24ndCBoYXZlIHNtb290aENoaWxkVGltaW5nLCB3ZSByZW5kZXIgYXQgdGhlIHJhd1RpbWUoKSBiZWNhdXNlIHRoZSBzdGFydFRpbWUgd29uJ3QgZ2V0IHVwZGF0ZWQuXG5cbiAgICAgICAgdGhpcy50b3RhbFRpbWUodGhpcy5wYXJlbnQgJiYgIXRoaXMucGFyZW50LnNtb290aENoaWxkVGltaW5nID8gdGhpcy5yYXdUaW1lKCkgOiB0aGlzLl90VGltZSB8fCB0aGlzLl9wVGltZSwgdGhpcy5wcm9ncmVzcygpID09PSAxICYmICh0aGlzLl90VGltZSAtPSBfdGlueU51bSkgJiYgTWF0aC5hYnModGhpcy5felRpbWUpICE9PSBfdGlueU51bSk7IC8vIGVkZ2UgY2FzZTogYW5pbWF0aW9uLnByb2dyZXNzKDEpLnBhdXNlKCkucGxheSgpIHdvdWxkbid0IHJlbmRlciBhZ2FpbiBiZWNhdXNlIHRoZSBwbGF5aGVhZCBpcyBhbHJlYWR5IGF0IHRoZSBlbmQsIGJ1dCB0aGUgY2FsbCB0byB0b3RhbFRpbWUoKSBiZWxvdyB3aWxsIGFkZCBpdCBiYWNrIHRvIGl0cyBwYXJlbnQuLi5hbmQgbm90IHJlbW92ZSBpdCBhZ2FpbiAoc2luY2UgcmVtb3Zpbmcgb25seSBoYXBwZW5zIHVwb24gcmVuZGVyaW5nIGF0IGEgbmV3IHRpbWUpLiBPZmZzZXR0aW5nIHRoZSBfdFRpbWUgc2xpZ2h0bHkgaXMgZG9uZSBzaW1wbHkgdG8gY2F1c2UgdGhlIGZpbmFsIHJlbmRlciBpbiB0b3RhbFRpbWUoKSB0aGF0J2xsIHBvcCBpdCBvZmYgaXRzIHRpbWVsaW5lIChpZiBhdXRvUmVtb3ZlQ2hpbGRyZW4gaXMgdHJ1ZSwgb2YgY291cnNlKS4gQ2hlY2sgdG8gbWFrZSBzdXJlIF96VGltZSBpc24ndCAtX3RpbnlOdW0gdG8gYXZvaWQgYW4gZWRnZSBjYXNlIHdoZXJlIHRoZSBwbGF5aGVhZCBpcyBwdXNoZWQgdG8gdGhlIGVuZCBidXQgSU5TSURFIGEgdHdlZW4vY2FsbGJhY2ssIHRoZSB0aW1lbGluZSBpdHNlbGYgaXMgcGF1c2VkIHRodXMgaGFsdGluZyByZW5kZXJpbmcgYW5kIGxlYXZpbmcgYSBmZXcgdW5yZW5kZXJlZC4gV2hlbiByZXN1bWluZywgaXQgd291bGRuJ3QgcmVuZGVyIHRob3NlIG90aGVyd2lzZS5cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uc3RhcnRUaW1lID0gZnVuY3Rpb24gc3RhcnRUaW1lKHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3N0YXJ0ID0gdmFsdWU7XG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHA7XG4gICAgICBwYXJlbnQgJiYgKHBhcmVudC5fc29ydCB8fCAhdGhpcy5wYXJlbnQpICYmIF9hZGRUb1RpbWVsaW5lKHBhcmVudCwgdGhpcywgdmFsdWUgLSB0aGlzLl9kZWxheSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XG4gIH07XG5cbiAgX3Byb3RvLmVuZFRpbWUgPSBmdW5jdGlvbiBlbmRUaW1lKGluY2x1ZGVSZXBlYXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0ICsgKF9pc05vdEZhbHNlKGluY2x1ZGVSZXBlYXRzKSA/IHRoaXMudG90YWxEdXJhdGlvbigpIDogdGhpcy5kdXJhdGlvbigpKSAvIE1hdGguYWJzKHRoaXMuX3RzKTtcbiAgfTtcblxuICBfcHJvdG8ucmF3VGltZSA9IGZ1bmN0aW9uIHJhd1RpbWUod3JhcFJlcGVhdHMpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHA7IC8vIF9kcCA9IGRldGF0Y2hlZCBwYXJlbnRcblxuICAgIHJldHVybiAhcGFyZW50ID8gdGhpcy5fdFRpbWUgOiB3cmFwUmVwZWF0cyAmJiAoIXRoaXMuX3RzIHx8IHRoaXMuX3JlcGVhdCAmJiB0aGlzLl90aW1lICYmIHRoaXMudG90YWxQcm9ncmVzcygpIDwgMSkgPyB0aGlzLl90VGltZSAlICh0aGlzLl9kdXIgKyB0aGlzLl9yRGVsYXkpIDogIXRoaXMuX3RzID8gdGhpcy5fdFRpbWUgOiBfcGFyZW50VG9DaGlsZFRvdGFsVGltZShwYXJlbnQucmF3VGltZSh3cmFwUmVwZWF0cyksIHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5nbG9iYWxUaW1lID0gZnVuY3Rpb24gZ2xvYmFsVGltZShyYXdUaW1lKSB7XG4gICAgdmFyIGFuaW1hdGlvbiA9IHRoaXMsXG4gICAgICAgIHRpbWUgPSBhcmd1bWVudHMubGVuZ3RoID8gcmF3VGltZSA6IGFuaW1hdGlvbi5yYXdUaW1lKCk7XG5cbiAgICB3aGlsZSAoYW5pbWF0aW9uKSB7XG4gICAgICB0aW1lID0gYW5pbWF0aW9uLl9zdGFydCArIHRpbWUgLyAoYW5pbWF0aW9uLl90cyB8fCAxKTtcbiAgICAgIGFuaW1hdGlvbiA9IGFuaW1hdGlvbi5fZHA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpbWU7XG4gIH07XG5cbiAgX3Byb3RvLnJlcGVhdCA9IGZ1bmN0aW9uIHJlcGVhdCh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9yZXBlYXQgPSB2YWx1ZTtcbiAgICAgIHJldHVybiBfb25VcGRhdGVUb3RhbER1cmF0aW9uKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZXBlYXQ7XG4gIH07XG5cbiAgX3Byb3RvLnJlcGVhdERlbGF5ID0gZnVuY3Rpb24gcmVwZWF0RGVsYXkodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fckRlbGF5ID0gdmFsdWU7XG4gICAgICByZXR1cm4gX29uVXBkYXRlVG90YWxEdXJhdGlvbih0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fckRlbGF5O1xuICB9O1xuXG4gIF9wcm90by55b3lvID0gZnVuY3Rpb24geW95byh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl95b3lvID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5feW95bztcbiAgfTtcblxuICBfcHJvdG8uc2VlayA9IGZ1bmN0aW9uIHNlZWsocG9zaXRpb24sIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIHRoaXMudG90YWxUaW1lKF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSwgX2lzTm90RmFsc2Uoc3VwcHJlc3NFdmVudHMpKTtcbiAgfTtcblxuICBfcHJvdG8ucmVzdGFydCA9IGZ1bmN0aW9uIHJlc3RhcnQoaW5jbHVkZURlbGF5LCBzdXBwcmVzc0V2ZW50cykge1xuICAgIHJldHVybiB0aGlzLnBsYXkoKS50b3RhbFRpbWUoaW5jbHVkZURlbGF5ID8gLXRoaXMuX2RlbGF5IDogMCwgX2lzTm90RmFsc2Uoc3VwcHJlc3NFdmVudHMpKTtcbiAgfTtcblxuICBfcHJvdG8ucGxheSA9IGZ1bmN0aW9uIHBsYXkoZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBmcm9tICE9IG51bGwgJiYgdGhpcy5zZWVrKGZyb20sIHN1cHByZXNzRXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlZChmYWxzZSkucGF1c2VkKGZhbHNlKTtcbiAgfTtcblxuICBfcHJvdG8ucmV2ZXJzZSA9IGZ1bmN0aW9uIHJldmVyc2UoZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBmcm9tICE9IG51bGwgJiYgdGhpcy5zZWVrKGZyb20gfHwgdGhpcy50b3RhbER1cmF0aW9uKCksIHN1cHByZXNzRXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlZCh0cnVlKS5wYXVzZWQoZmFsc2UpO1xuICB9O1xuXG4gIF9wcm90by5wYXVzZSA9IGZ1bmN0aW9uIHBhdXNlKGF0VGltZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBhdFRpbWUgIT0gbnVsbCAmJiB0aGlzLnNlZWsoYXRUaW1lLCBzdXBwcmVzc0V2ZW50cyk7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VkKHRydWUpO1xuICB9O1xuXG4gIF9wcm90by5yZXN1bWUgPSBmdW5jdGlvbiByZXN1bWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VkKGZhbHNlKTtcbiAgfTtcblxuICBfcHJvdG8ucmV2ZXJzZWQgPSBmdW5jdGlvbiByZXZlcnNlZCh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAhIXZhbHVlICE9PSB0aGlzLnJldmVyc2VkKCkgJiYgdGhpcy50aW1lU2NhbGUoLXRoaXMuX3J0cyB8fCAodmFsdWUgPyAtX3RpbnlOdW0gOiAwKSk7IC8vIGluIGNhc2UgdGltZVNjYWxlIGlzIHplcm8sIHJldmVyc2luZyB3b3VsZCBoYXZlIG5vIGVmZmVjdCBzbyB3ZSB1c2UgX3RpbnlOdW0uXG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9ydHMgPCAwO1xuICB9O1xuXG4gIF9wcm90by5pbnZhbGlkYXRlID0gZnVuY3Rpb24gaW52YWxpZGF0ZSgpIHtcbiAgICB0aGlzLl9pbml0dGVkID0gMDtcbiAgICB0aGlzLl96VGltZSA9IC1fdGlueU51bTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHAsXG4gICAgICAgIHN0YXJ0ID0gdGhpcy5fc3RhcnQsXG4gICAgICAgIHJhd1RpbWU7XG4gICAgcmV0dXJuICEhKCFwYXJlbnQgfHwgdGhpcy5fdHMgJiYgdGhpcy5faW5pdHRlZCAmJiBwYXJlbnQuaXNBY3RpdmUoKSAmJiAocmF3VGltZSA9IHBhcmVudC5yYXdUaW1lKHRydWUpKSA+PSBzdGFydCAmJiByYXdUaW1lIDwgdGhpcy5lbmRUaW1lKHRydWUpIC0gX3RpbnlOdW0pO1xuICB9O1xuXG4gIF9wcm90by5ldmVudENhbGxiYWNrID0gZnVuY3Rpb24gZXZlbnRDYWxsYmFjayh0eXBlLCBjYWxsYmFjaywgcGFyYW1zKSB7XG4gICAgdmFyIHZhcnMgPSB0aGlzLnZhcnM7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgZGVsZXRlIHZhcnNbdHlwZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXJzW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIHBhcmFtcyAmJiAodmFyc1t0eXBlICsgXCJQYXJhbXNcIl0gPSBwYXJhbXMpO1xuICAgICAgICB0eXBlID09PSBcIm9uVXBkYXRlXCIgJiYgKHRoaXMuX29uVXBkYXRlID0gY2FsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdmFyc1t0eXBlXTtcbiAgfTtcblxuICBfcHJvdG8udGhlbiA9IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICB2YXIgZiA9IF9pc0Z1bmN0aW9uKG9uRnVsZmlsbGVkKSA/IG9uRnVsZmlsbGVkIDogX3Bhc3NUaHJvdWdoLFxuICAgICAgICAgIF9yZXNvbHZlID0gZnVuY3Rpb24gX3Jlc29sdmUoKSB7XG4gICAgICAgIHZhciBfdGhlbiA9IHNlbGYudGhlbjtcbiAgICAgICAgc2VsZi50aGVuID0gbnVsbDsgLy8gdGVtcG9yYXJpbHkgbnVsbCB0aGUgdGhlbigpIG1ldGhvZCB0byBhdm9pZCBhbiBpbmZpbml0ZSBsb29wIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dyZWVuc29jay9HU0FQL2lzc3Vlcy8zMjIpXG5cbiAgICAgICAgX2lzRnVuY3Rpb24oZikgJiYgKGYgPSBmKHNlbGYpKSAmJiAoZi50aGVuIHx8IGYgPT09IHNlbGYpICYmIChzZWxmLnRoZW4gPSBfdGhlbik7XG4gICAgICAgIHJlc29sdmUoZik7XG4gICAgICAgIHNlbGYudGhlbiA9IF90aGVuO1xuICAgICAgfTtcblxuICAgICAgaWYgKHNlbGYuX2luaXR0ZWQgJiYgc2VsZi50b3RhbFByb2dyZXNzKCkgPT09IDEgJiYgc2VsZi5fdHMgPj0gMCB8fCAhc2VsZi5fdFRpbWUgJiYgc2VsZi5fdHMgPCAwKSB7XG4gICAgICAgIF9yZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLl9wcm9tID0gX3Jlc29sdmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmtpbGwgPSBmdW5jdGlvbiBraWxsKCkge1xuICAgIF9pbnRlcnJ1cHQodGhpcyk7XG4gIH07XG5cbiAgcmV0dXJuIEFuaW1hdGlvbjtcbn0oKTtcblxuX3NldERlZmF1bHRzKEFuaW1hdGlvbi5wcm90b3R5cGUsIHtcbiAgX3RpbWU6IDAsXG4gIF9zdGFydDogMCxcbiAgX2VuZDogMCxcbiAgX3RUaW1lOiAwLFxuICBfdER1cjogMCxcbiAgX2RpcnR5OiAwLFxuICBfcmVwZWF0OiAwLFxuICBfeW95bzogZmFsc2UsXG4gIHBhcmVudDogbnVsbCxcbiAgX2luaXR0ZWQ6IGZhbHNlLFxuICBfckRlbGF5OiAwLFxuICBfdHM6IDEsXG4gIF9kcDogMCxcbiAgcmF0aW86IDAsXG4gIF96VGltZTogLV90aW55TnVtLFxuICBfcHJvbTogMCxcbiAgX3BzOiBmYWxzZSxcbiAgX3J0czogMVxufSk7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVElNRUxJTkVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbmV4cG9ydCB2YXIgVGltZWxpbmUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9BbmltYXRpb24pIHtcbiAgX2luaGVyaXRzTG9vc2UoVGltZWxpbmUsIF9BbmltYXRpb24pO1xuXG4gIGZ1bmN0aW9uIFRpbWVsaW5lKHZhcnMsIHRpbWUpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBpZiAodmFycyA9PT0gdm9pZCAwKSB7XG4gICAgICB2YXJzID0ge307XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfQW5pbWF0aW9uLmNhbGwodGhpcywgdmFycywgdGltZSkgfHwgdGhpcztcbiAgICBfdGhpcy5sYWJlbHMgPSB7fTtcbiAgICBfdGhpcy5zbW9vdGhDaGlsZFRpbWluZyA9ICEhdmFycy5zbW9vdGhDaGlsZFRpbWluZztcbiAgICBfdGhpcy5hdXRvUmVtb3ZlQ2hpbGRyZW4gPSAhIXZhcnMuYXV0b1JlbW92ZUNoaWxkcmVuO1xuICAgIF90aGlzLl9zb3J0ID0gX2lzTm90RmFsc2UodmFycy5zb3J0Q2hpbGRyZW4pO1xuICAgIF90aGlzLnBhcmVudCAmJiBfcG9zdEFkZENoZWNrcyhfdGhpcy5wYXJlbnQsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICB2YXJzLnNjcm9sbFRyaWdnZXIgJiYgX3Njcm9sbFRyaWdnZXIoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIHZhcnMuc2Nyb2xsVHJpZ2dlcik7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBUaW1lbGluZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMi50byA9IGZ1bmN0aW9uIHRvKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgbmV3IFR3ZWVuKHRhcmdldHMsIF9wYXJzZVZhcnMoYXJndW1lbnRzLCAwLCB0aGlzKSwgX3BhcnNlUG9zaXRpb24odGhpcywgX2lzTnVtYmVyKHZhcnMpID8gYXJndW1lbnRzWzNdIDogcG9zaXRpb24pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmZyb20gPSBmdW5jdGlvbiBmcm9tKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgbmV3IFR3ZWVuKHRhcmdldHMsIF9wYXJzZVZhcnMoYXJndW1lbnRzLCAxLCB0aGlzKSwgX3BhcnNlUG9zaXRpb24odGhpcywgX2lzTnVtYmVyKHZhcnMpID8gYXJndW1lbnRzWzNdIDogcG9zaXRpb24pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmZyb21UbyA9IGZ1bmN0aW9uIGZyb21Ubyh0YXJnZXRzLCBmcm9tVmFycywgdG9WYXJzLCBwb3NpdGlvbikge1xuICAgIG5ldyBUd2Vlbih0YXJnZXRzLCBfcGFyc2VWYXJzKGFyZ3VtZW50cywgMiwgdGhpcyksIF9wYXJzZVBvc2l0aW9uKHRoaXMsIF9pc051bWJlcihmcm9tVmFycykgPyBhcmd1bWVudHNbNF0gOiBwb3NpdGlvbikpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuc2V0ID0gZnVuY3Rpb24gc2V0KHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgdmFycy5kdXJhdGlvbiA9IDA7XG4gICAgdmFycy5wYXJlbnQgPSB0aGlzO1xuICAgIF9pbmhlcml0RGVmYXVsdHModmFycykucmVwZWF0RGVsYXkgfHwgKHZhcnMucmVwZWF0ID0gMCk7XG4gICAgdmFycy5pbW1lZGlhdGVSZW5kZXIgPSAhIXZhcnMuaW1tZWRpYXRlUmVuZGVyO1xuICAgIG5ldyBUd2Vlbih0YXJnZXRzLCB2YXJzLCBfcGFyc2VQb3NpdGlvbih0aGlzLCBwb3NpdGlvbiksIDEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuY2FsbCA9IGZ1bmN0aW9uIGNhbGwoY2FsbGJhY2ssIHBhcmFtcywgcG9zaXRpb24pIHtcbiAgICByZXR1cm4gX2FkZFRvVGltZWxpbmUodGhpcywgVHdlZW4uZGVsYXllZENhbGwoMCwgY2FsbGJhY2ssIHBhcmFtcyksIF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSk7XG4gIH0gLy9PTkxZIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5ISBNYXliZSBkZWxldGU/XG4gIDtcblxuICBfcHJvdG8yLnN0YWdnZXJUbyA9IGZ1bmN0aW9uIHN0YWdnZXJUbyh0YXJnZXRzLCBkdXJhdGlvbiwgdmFycywgc3RhZ2dlciwgcG9zaXRpb24sIG9uQ29tcGxldGVBbGwsIG9uQ29tcGxldGVBbGxQYXJhbXMpIHtcbiAgICB2YXJzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgdmFycy5zdGFnZ2VyID0gdmFycy5zdGFnZ2VyIHx8IHN0YWdnZXI7XG4gICAgdmFycy5vbkNvbXBsZXRlID0gb25Db21wbGV0ZUFsbDtcbiAgICB2YXJzLm9uQ29tcGxldGVQYXJhbXMgPSBvbkNvbXBsZXRlQWxsUGFyYW1zO1xuICAgIHZhcnMucGFyZW50ID0gdGhpcztcbiAgICBuZXcgVHdlZW4odGFyZ2V0cywgdmFycywgX3BhcnNlUG9zaXRpb24odGhpcywgcG9zaXRpb24pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLnN0YWdnZXJGcm9tID0gZnVuY3Rpb24gc3RhZ2dlckZyb20odGFyZ2V0cywgZHVyYXRpb24sIHZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKSB7XG4gICAgdmFycy5ydW5CYWNrd2FyZHMgPSAxO1xuICAgIF9pbmhlcml0RGVmYXVsdHModmFycykuaW1tZWRpYXRlUmVuZGVyID0gX2lzTm90RmFsc2UodmFycy5pbW1lZGlhdGVSZW5kZXIpO1xuICAgIHJldHVybiB0aGlzLnN0YWdnZXJUbyh0YXJnZXRzLCBkdXJhdGlvbiwgdmFycywgc3RhZ2dlciwgcG9zaXRpb24sIG9uQ29tcGxldGVBbGwsIG9uQ29tcGxldGVBbGxQYXJhbXMpO1xuICB9O1xuXG4gIF9wcm90bzIuc3RhZ2dlckZyb21UbyA9IGZ1bmN0aW9uIHN0YWdnZXJGcm9tVG8odGFyZ2V0cywgZHVyYXRpb24sIGZyb21WYXJzLCB0b1ZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKSB7XG4gICAgdG9WYXJzLnN0YXJ0QXQgPSBmcm9tVmFycztcbiAgICBfaW5oZXJpdERlZmF1bHRzKHRvVmFycykuaW1tZWRpYXRlUmVuZGVyID0gX2lzTm90RmFsc2UodG9WYXJzLmltbWVkaWF0ZVJlbmRlcik7XG4gICAgcmV0dXJuIHRoaXMuc3RhZ2dlclRvKHRhcmdldHMsIGR1cmF0aW9uLCB0b1ZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKTtcbiAgfTtcblxuICBfcHJvdG8yLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSkge1xuICAgIHZhciBwcmV2VGltZSA9IHRoaXMuX3RpbWUsXG4gICAgICAgIHREdXIgPSB0aGlzLl9kaXJ0eSA/IHRoaXMudG90YWxEdXJhdGlvbigpIDogdGhpcy5fdER1cixcbiAgICAgICAgZHVyID0gdGhpcy5fZHVyLFxuICAgICAgICB0VGltZSA9IHRoaXMgIT09IF9nbG9iYWxUaW1lbGluZSAmJiB0b3RhbFRpbWUgPiB0RHVyIC0gX3RpbnlOdW0gJiYgdG90YWxUaW1lID49IDAgPyB0RHVyIDogdG90YWxUaW1lIDwgX3RpbnlOdW0gPyAwIDogdG90YWxUaW1lLFxuICAgICAgICBjcm9zc2luZ1N0YXJ0ID0gdGhpcy5felRpbWUgPCAwICE9PSB0b3RhbFRpbWUgPCAwICYmICh0aGlzLl9pbml0dGVkIHx8ICFkdXIpLFxuICAgICAgICB0aW1lLFxuICAgICAgICBjaGlsZCxcbiAgICAgICAgbmV4dCxcbiAgICAgICAgaXRlcmF0aW9uLFxuICAgICAgICBjeWNsZUR1cmF0aW9uLFxuICAgICAgICBwcmV2UGF1c2VkLFxuICAgICAgICBwYXVzZVR3ZWVuLFxuICAgICAgICB0aW1lU2NhbGUsXG4gICAgICAgIHByZXZTdGFydCxcbiAgICAgICAgcHJldkl0ZXJhdGlvbixcbiAgICAgICAgeW95byxcbiAgICAgICAgaXNZb3lvO1xuXG4gICAgaWYgKHRUaW1lICE9PSB0aGlzLl90VGltZSB8fCBmb3JjZSB8fCBjcm9zc2luZ1N0YXJ0KSB7XG4gICAgICBpZiAocHJldlRpbWUgIT09IHRoaXMuX3RpbWUgJiYgZHVyKSB7XG4gICAgICAgIC8vaWYgdG90YWxEdXJhdGlvbigpIGZpbmRzIGEgY2hpbGQgd2l0aCBhIG5lZ2F0aXZlIHN0YXJ0VGltZSBhbmQgc21vb3RoQ2hpbGRUaW1pbmcgaXMgdHJ1ZSwgdGhpbmdzIGdldCBzaGlmdGVkIGFyb3VuZCBpbnRlcm5hbGx5IHNvIHdlIG5lZWQgdG8gYWRqdXN0IHRoZSB0aW1lIGFjY29yZGluZ2x5LiBGb3IgZXhhbXBsZSwgaWYgYSB0d2VlbiBzdGFydHMgYXQgLTMwIHdlIG11c3Qgc2hpZnQgRVZFUllUSElORyBmb3J3YXJkIDMwIHNlY29uZHMgYW5kIG1vdmUgdGhpcyB0aW1lbGluZSdzIHN0YXJ0VGltZSBiYWNrd2FyZCBieSAzMCBzZWNvbmRzIHNvIHRoYXQgdGhpbmdzIGFsaWduIHdpdGggdGhlIHBsYXloZWFkIChubyBqdW1wKS5cbiAgICAgICAgdFRpbWUgKz0gdGhpcy5fdGltZSAtIHByZXZUaW1lO1xuICAgICAgICB0b3RhbFRpbWUgKz0gdGhpcy5fdGltZSAtIHByZXZUaW1lO1xuICAgICAgfVxuXG4gICAgICB0aW1lID0gdFRpbWU7XG4gICAgICBwcmV2U3RhcnQgPSB0aGlzLl9zdGFydDtcbiAgICAgIHRpbWVTY2FsZSA9IHRoaXMuX3RzO1xuICAgICAgcHJldlBhdXNlZCA9ICF0aW1lU2NhbGU7XG5cbiAgICAgIGlmIChjcm9zc2luZ1N0YXJ0KSB7XG4gICAgICAgIGR1ciB8fCAocHJldlRpbWUgPSB0aGlzLl96VGltZSk7IC8vd2hlbiB0aGUgcGxheWhlYWQgYXJyaXZlcyBhdCBFWEFDVExZIHRpbWUgMCAocmlnaHQgb24gdG9wKSBvZiBhIHplcm8tZHVyYXRpb24gdGltZWxpbmUsIHdlIG5lZWQgdG8gZGlzY2VybiBpZiBldmVudHMgYXJlIHN1cHByZXNzZWQgc28gdGhhdCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBhZ2FpbiAobmV4dCB0aW1lKSwgaXQnbGwgdHJpZ2dlciB0aGUgY2FsbGJhY2suIElmIGV2ZW50cyBhcmUgTk9UIHN1cHByZXNzZWQsIG9idmlvdXNseSB0aGUgY2FsbGJhY2sgd291bGQgYmUgdHJpZ2dlcmVkIGluIHRoaXMgcmVuZGVyLiBCYXNpY2FsbHksIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZSBlaXRoZXIgd2hlbiB0aGUgcGxheWhlYWQgQVJSSVZFUyBvciBMRUFWRVMgdGhpcyBleGFjdCBzcG90LCBub3QgYm90aC4gSW1hZ2luZSBkb2luZyBhIHRpbWVsaW5lLnNlZWsoMCkgYW5kIHRoZXJlJ3MgYSBjYWxsYmFjayB0aGF0IHNpdHMgYXQgMC4gU2luY2UgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIG9uIHRoYXQgc2VlaygpIGJ5IGRlZmF1bHQsIG5vdGhpbmcgd2lsbCBmaXJlLCBidXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgb2ZmIG9mIHRoYXQgcG9zaXRpb24sIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZS4gVGhpcyBiZWhhdmlvciBpcyB3aGF0IHBlb3BsZSBpbnR1aXRpdmVseSBleHBlY3QuXG5cbiAgICAgICAgKHRvdGFsVGltZSB8fCAhc3VwcHJlc3NFdmVudHMpICYmICh0aGlzLl96VGltZSA9IHRvdGFsVGltZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9yZXBlYXQpIHtcbiAgICAgICAgLy9hZGp1c3QgdGhlIHRpbWUgZm9yIHJlcGVhdHMgYW5kIHlveW9zXG4gICAgICAgIHlveW8gPSB0aGlzLl95b3lvO1xuICAgICAgICBjeWNsZUR1cmF0aW9uID0gZHVyICsgdGhpcy5fckRlbGF5O1xuICAgICAgICB0aW1lID0gX3JvdW5kKHRUaW1lICUgY3ljbGVEdXJhdGlvbik7IC8vcm91bmQgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgZXJyb3JzLiAoNCAlIDAuOCBzaG91bGQgYmUgMCBidXQgc29tZSBicm93c2VycyByZXBvcnQgaXQgYXMgMC43OTk5OTk5OSEpXG5cbiAgICAgICAgaWYgKHRUaW1lID09PSB0RHVyKSB7XG4gICAgICAgICAgLy8gdGhlIHREdXIgPT09IHRUaW1lIGlzIGZvciBlZGdlIGNhc2VzIHdoZXJlIHRoZXJlJ3MgYSBsZW5ndGh5IGRlY2ltYWwgb24gdGhlIGR1cmF0aW9uIGFuZCBpdCBtYXkgcmVhY2ggdGhlIHZlcnkgZW5kIGJ1dCB0aGUgdGltZSBpcyByZW5kZXJlZCBhcyBub3QtcXVpdGUtdGhlcmUgKHJlbWVtYmVyLCB0RHVyIGlzIHJvdW5kZWQgdG8gNCBkZWNpbWFscyB3aGVyZWFzIGR1ciBpc24ndClcbiAgICAgICAgICBpdGVyYXRpb24gPSB0aGlzLl9yZXBlYXQ7XG4gICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVyYXRpb24gPSB+fih0VGltZSAvIGN5Y2xlRHVyYXRpb24pO1xuXG4gICAgICAgICAgaWYgKGl0ZXJhdGlvbiAmJiBpdGVyYXRpb24gPT09IHRUaW1lIC8gY3ljbGVEdXJhdGlvbikge1xuICAgICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgICAgIGl0ZXJhdGlvbi0tO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRpbWUgPiBkdXIgJiYgKHRpbWUgPSBkdXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldkl0ZXJhdGlvbiA9IF9hbmltYXRpb25DeWNsZSh0aGlzLl90VGltZSwgY3ljbGVEdXJhdGlvbik7XG4gICAgICAgICFwcmV2VGltZSAmJiB0aGlzLl90VGltZSAmJiBwcmV2SXRlcmF0aW9uICE9PSBpdGVyYXRpb24gJiYgKHByZXZJdGVyYXRpb24gPSBpdGVyYXRpb24pOyAvLyBlZGdlIGNhc2UgLSBpZiBzb21lb25lIGRvZXMgYWRkUGF1c2UoKSBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgb2YgYSByZXBlYXRpbmcgdGltZWxpbmUsIHRoYXQgcGF1c2UgaXMgdGVjaG5pY2FsbHkgYXQgdGhlIHNhbWUgc3BvdCBhcyB0aGUgZW5kIHdoaWNoIGNhdXNlcyB0aGlzLl90aW1lIHRvIGdldCBzZXQgdG8gMCB3aGVuIHRoZSB0b3RhbFRpbWUgd291bGQgbm9ybWFsbHkgcGxhY2UgdGhlIHBsYXloZWFkIGF0IHRoZSBlbmQuIFNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIzODIzLWNsb3NpbmctbmF2LWFuaW1hdGlvbi1ub3Qtd29ya2luZy1vbi1pZS1hbmQtaXBob25lLTYtbWF5YmUtb3RoZXItb2xkZXItYnJvd3Nlci8/dGFiPWNvbW1lbnRzI2NvbW1lbnQtMTEzMDA1XG5cbiAgICAgICAgaWYgKHlveW8gJiYgaXRlcmF0aW9uICYgMSkge1xuICAgICAgICAgIHRpbWUgPSBkdXIgLSB0aW1lO1xuICAgICAgICAgIGlzWW95byA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgbWFrZSBzdXJlIGNoaWxkcmVuIGF0IHRoZSBlbmQvYmVnaW5uaW5nIG9mIHRoZSB0aW1lbGluZSBhcmUgcmVuZGVyZWQgcHJvcGVybHkuIElmLCBmb3IgZXhhbXBsZSxcbiAgICAgICAgYSAzLXNlY29uZCBsb25nIHRpbWVsaW5lIHJlbmRlcmVkIGF0IDIuOSBzZWNvbmRzIHByZXZpb3VzbHksIGFuZCBub3cgcmVuZGVycyBhdCAzLjIgc2Vjb25kcyAod2hpY2hcbiAgICAgICAgd291bGQgZ2V0IHRyYW5zbGF0ZWQgdG8gMi44IHNlY29uZHMgaWYgdGhlIHRpbWVsaW5lIHlveW9zIG9yIDAuMiBzZWNvbmRzIGlmIGl0IGp1c3QgcmVwZWF0cyksIHRoZXJlXG4gICAgICAgIGNvdWxkIGJlIGEgY2FsbGJhY2sgb3IgYSBzaG9ydCB0d2VlbiB0aGF0J3MgYXQgMi45NSBvciAzIHNlY29uZHMgaW4gd2hpY2ggd291bGRuJ3QgcmVuZGVyLiBTb1xuICAgICAgICB3ZSBuZWVkIHRvIHB1c2ggdGhlIHRpbWVsaW5lIHRvIHRoZSBlbmQgKGFuZC9vciBiZWdpbm5pbmcgZGVwZW5kaW5nIG9uIGl0cyB5b3lvIHZhbHVlKS4gQWxzbyB3ZSBtdXN0XG4gICAgICAgIGVuc3VyZSB0aGF0IHplcm8tZHVyYXRpb24gdHdlZW5zIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyBvciBlbmQgb2YgdGhlIFRpbWVsaW5lIHdvcmsuXG4gICAgICAgICovXG5cblxuICAgICAgICBpZiAoaXRlcmF0aW9uICE9PSBwcmV2SXRlcmF0aW9uICYmICF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgdmFyIHJld2luZGluZyA9IHlveW8gJiYgcHJldkl0ZXJhdGlvbiAmIDEsXG4gICAgICAgICAgICAgIGRvZXNXcmFwID0gcmV3aW5kaW5nID09PSAoeW95byAmJiBpdGVyYXRpb24gJiAxKTtcbiAgICAgICAgICBpdGVyYXRpb24gPCBwcmV2SXRlcmF0aW9uICYmIChyZXdpbmRpbmcgPSAhcmV3aW5kaW5nKTtcbiAgICAgICAgICBwcmV2VGltZSA9IHJld2luZGluZyA/IDAgOiBkdXI7XG4gICAgICAgICAgdGhpcy5fbG9jayA9IDE7XG4gICAgICAgICAgdGhpcy5yZW5kZXIocHJldlRpbWUgfHwgKGlzWW95byA/IDAgOiBfcm91bmQoaXRlcmF0aW9uICogY3ljbGVEdXJhdGlvbikpLCBzdXBwcmVzc0V2ZW50cywgIWR1cikuX2xvY2sgPSAwO1xuICAgICAgICAgICFzdXBwcmVzc0V2ZW50cyAmJiB0aGlzLnBhcmVudCAmJiBfY2FsbGJhY2sodGhpcywgXCJvblJlcGVhdFwiKTtcbiAgICAgICAgICB0aGlzLnZhcnMucmVwZWF0UmVmcmVzaCAmJiAhaXNZb3lvICYmICh0aGlzLmludmFsaWRhdGUoKS5fbG9jayA9IDEpO1xuXG4gICAgICAgICAgaWYgKHByZXZUaW1lICE9PSB0aGlzLl90aW1lIHx8IHByZXZQYXVzZWQgIT09ICF0aGlzLl90cykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZHVyID0gdGhpcy5fZHVyOyAvLyBpbiBjYXNlIHRoZSBkdXJhdGlvbiBjaGFuZ2VkIGluIHRoZSBvblJlcGVhdFxuXG4gICAgICAgICAgdER1ciA9IHRoaXMuX3REdXI7XG5cbiAgICAgICAgICBpZiAoZG9lc1dyYXApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2sgPSAyO1xuICAgICAgICAgICAgcHJldlRpbWUgPSByZXdpbmRpbmcgPyBkdXIgKyAwLjAwMDEgOiAtMC4wMDAxO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIocHJldlRpbWUsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy52YXJzLnJlcGVhdFJlZnJlc2ggJiYgIWlzWW95byAmJiB0aGlzLmludmFsaWRhdGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9sb2NrID0gMDtcblxuICAgICAgICAgIGlmICghdGhpcy5fdHMgJiYgIXByZXZQYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH0gLy9pbiBvcmRlciBmb3IgeW95b0Vhc2UgdG8gd29yayBwcm9wZXJseSB3aGVuIHRoZXJlJ3MgYSBzdGFnZ2VyLCB3ZSBtdXN0IHN3YXAgb3V0IHRoZSBlYXNlIGluIGVhY2ggc3ViLXR3ZWVuLlxuXG5cbiAgICAgICAgICBfcHJvcGFnYXRlWW95b0Vhc2UodGhpcywgaXNZb3lvKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faGFzUGF1c2UgJiYgIXRoaXMuX2ZvcmNpbmcgJiYgdGhpcy5fbG9jayA8IDIpIHtcbiAgICAgICAgcGF1c2VUd2VlbiA9IF9maW5kTmV4dFBhdXNlVHdlZW4odGhpcywgX3JvdW5kKHByZXZUaW1lKSwgX3JvdW5kKHRpbWUpKTtcblxuICAgICAgICBpZiAocGF1c2VUd2Vlbikge1xuICAgICAgICAgIHRUaW1lIC09IHRpbWUgLSAodGltZSA9IHBhdXNlVHdlZW4uX3N0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl90VGltZSA9IHRUaW1lO1xuICAgICAgdGhpcy5fdGltZSA9IHRpbWU7XG4gICAgICB0aGlzLl9hY3QgPSAhdGltZVNjYWxlOyAvL2FzIGxvbmcgYXMgaXQncyBub3QgcGF1c2VkLCBmb3JjZSBpdCB0byBiZSBhY3RpdmUgc28gdGhhdCBpZiB0aGUgdXNlciByZW5kZXJzIGluZGVwZW5kZW50IG9mIHRoZSBwYXJlbnQgdGltZWxpbmUsIGl0J2xsIGJlIGZvcmNlZCB0byByZS1yZW5kZXIgb24gdGhlIG5leHQgdGljay5cblxuICAgICAgaWYgKCF0aGlzLl9pbml0dGVkKSB7XG4gICAgICAgIHRoaXMuX29uVXBkYXRlID0gdGhpcy52YXJzLm9uVXBkYXRlO1xuICAgICAgICB0aGlzLl9pbml0dGVkID0gMTtcbiAgICAgICAgdGhpcy5felRpbWUgPSB0b3RhbFRpbWU7XG4gICAgICB9XG5cbiAgICAgICFwcmV2VGltZSAmJiB0aW1lICYmICFzdXBwcmVzc0V2ZW50cyAmJiBfY2FsbGJhY2sodGhpcywgXCJvblN0YXJ0XCIpO1xuXG4gICAgICBpZiAodGltZSA+PSBwcmV2VGltZSAmJiB0b3RhbFRpbWUgPj0gMCkge1xuICAgICAgICBjaGlsZCA9IHRoaXMuX2ZpcnN0O1xuXG4gICAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcblxuICAgICAgICAgIGlmICgoY2hpbGQuX2FjdCB8fCB0aW1lID49IGNoaWxkLl9zdGFydCkgJiYgY2hpbGQuX3RzICYmIHBhdXNlVHdlZW4gIT09IGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIC8vIGFuIGV4dHJlbWUgZWRnZSBjYXNlIC0gdGhlIGNoaWxkJ3MgcmVuZGVyIGNvdWxkIGRvIHNvbWV0aGluZyBsaWtlIGtpbGwoKSB0aGUgXCJuZXh0XCIgb25lIGluIHRoZSBsaW5rZWQgbGlzdCwgb3IgcmVwYXJlbnQgaXQuIEluIHRoYXQgY2FzZSB3ZSBtdXN0IHJlLWluaXRpYXRlIHRoZSB3aG9sZSByZW5kZXIgdG8gYmUgc2FmZS5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNoaWxkLl90cyA+IDAgPyAodGltZSAtIGNoaWxkLl9zdGFydCkgKiBjaGlsZC5fdHMgOiAoY2hpbGQuX2RpcnR5ID8gY2hpbGQudG90YWxEdXJhdGlvbigpIDogY2hpbGQuX3REdXIpICsgKHRpbWUgLSBjaGlsZC5fc3RhcnQpICogY2hpbGQuX3RzLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXG4gICAgICAgICAgICBpZiAodGltZSAhPT0gdGhpcy5fdGltZSB8fCAhdGhpcy5fdHMgJiYgIXByZXZQYXVzZWQpIHtcbiAgICAgICAgICAgICAgLy9pbiBjYXNlIGEgdHdlZW4gcGF1c2VzIG9yIHNlZWtzIHRoZSB0aW1lbGluZSB3aGVuIHJlbmRlcmluZywgbGlrZSBpbnNpZGUgb2YgYW4gb25VcGRhdGUvb25Db21wbGV0ZVxuICAgICAgICAgICAgICBwYXVzZVR3ZWVuID0gMDtcbiAgICAgICAgICAgICAgbmV4dCAmJiAodFRpbWUgKz0gdGhpcy5felRpbWUgPSAtX3RpbnlOdW0pOyAvLyBpdCBkaWRuJ3QgZmluaXNoIHJlbmRlcmluZywgc28gZmxhZyB6VGltZSBhcyBuZWdhdGl2ZSBzbyB0aGF0IHNvIHRoYXQgdGhlIG5leHQgdGltZSByZW5kZXIoKSBpcyBjYWxsZWQgaXQnbGwgYmUgZm9yY2VkICh0byByZW5kZXIgYW55IHJlbWFpbmluZyBjaGlsZHJlbilcblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGlsZCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkID0gdGhpcy5fbGFzdDtcbiAgICAgICAgdmFyIGFkanVzdGVkVGltZSA9IHRvdGFsVGltZSA8IDAgPyB0b3RhbFRpbWUgOiB0aW1lOyAvL3doZW4gdGhlIHBsYXloZWFkIGdvZXMgYmFja3dhcmQgYmV5b25kIHRoZSBzdGFydCBvZiB0aGlzIHRpbWVsaW5lLCB3ZSBtdXN0IHBhc3MgdGhhdCBpbmZvcm1hdGlvbiBkb3duIHRvIHRoZSBjaGlsZCBhbmltYXRpb25zIHNvIHRoYXQgemVyby1kdXJhdGlvbiB0d2VlbnMga25vdyB3aGV0aGVyIHRvIHJlbmRlciB0aGVpciBzdGFydGluZyBvciBlbmRpbmcgdmFsdWVzLlxuXG4gICAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICAgIG5leHQgPSBjaGlsZC5fcHJldjtcblxuICAgICAgICAgIGlmICgoY2hpbGQuX2FjdCB8fCBhZGp1c3RlZFRpbWUgPD0gY2hpbGQuX2VuZCkgJiYgY2hpbGQuX3RzICYmIHBhdXNlVHdlZW4gIT09IGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIC8vIGFuIGV4dHJlbWUgZWRnZSBjYXNlIC0gdGhlIGNoaWxkJ3MgcmVuZGVyIGNvdWxkIGRvIHNvbWV0aGluZyBsaWtlIGtpbGwoKSB0aGUgXCJuZXh0XCIgb25lIGluIHRoZSBsaW5rZWQgbGlzdCwgb3IgcmVwYXJlbnQgaXQuIEluIHRoYXQgY2FzZSB3ZSBtdXN0IHJlLWluaXRpYXRlIHRoZSB3aG9sZSByZW5kZXIgdG8gYmUgc2FmZS5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNoaWxkLl90cyA+IDAgPyAoYWRqdXN0ZWRUaW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cyA6IChjaGlsZC5fZGlydHkgPyBjaGlsZC50b3RhbER1cmF0aW9uKCkgOiBjaGlsZC5fdER1cikgKyAoYWRqdXN0ZWRUaW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cywgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcblxuICAgICAgICAgICAgaWYgKHRpbWUgIT09IHRoaXMuX3RpbWUgfHwgIXRoaXMuX3RzICYmICFwcmV2UGF1c2VkKSB7XG4gICAgICAgICAgICAgIC8vaW4gY2FzZSBhIHR3ZWVuIHBhdXNlcyBvciBzZWVrcyB0aGUgdGltZWxpbmUgd2hlbiByZW5kZXJpbmcsIGxpa2UgaW5zaWRlIG9mIGFuIG9uVXBkYXRlL29uQ29tcGxldGVcbiAgICAgICAgICAgICAgcGF1c2VUd2VlbiA9IDA7XG4gICAgICAgICAgICAgIG5leHQgJiYgKHRUaW1lICs9IHRoaXMuX3pUaW1lID0gYWRqdXN0ZWRUaW1lID8gLV90aW55TnVtIDogX3RpbnlOdW0pOyAvLyBpdCBkaWRuJ3QgZmluaXNoIHJlbmRlcmluZywgc28gYWRqdXN0IHpUaW1lIHNvIHRoYXQgc28gdGhhdCB0aGUgbmV4dCB0aW1lIHJlbmRlcigpIGlzIGNhbGxlZCBpdCdsbCBiZSBmb3JjZWQgKHRvIHJlbmRlciBhbnkgcmVtYWluaW5nIGNoaWxkcmVuKVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoaWxkID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGF1c2VUd2VlbiAmJiAhc3VwcHJlc3NFdmVudHMpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICBwYXVzZVR3ZWVuLnJlbmRlcih0aW1lID49IHByZXZUaW1lID8gMCA6IC1fdGlueU51bSkuX3pUaW1lID0gdGltZSA+PSBwcmV2VGltZSA/IDEgOiAtMTtcblxuICAgICAgICBpZiAodGhpcy5fdHMpIHtcbiAgICAgICAgICAvL3RoZSBjYWxsYmFjayByZXN1bWVkIHBsYXliYWNrISBTbyBzaW5jZSB3ZSBtYXkgaGF2ZSBoZWxkIGJhY2sgdGhlIHBsYXloZWFkIGR1ZSB0byB3aGVyZSB0aGUgcGF1c2UgaXMgcG9zaXRpb25lZCwgZ28gYWhlYWQgYW5kIGp1bXAgdG8gd2hlcmUgaXQncyBTVVBQT1NFRCB0byBiZSAoaWYgbm8gcGF1c2UgaGFwcGVuZWQpLlxuICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gcHJldlN0YXJ0OyAvL2lmIHRoZSBwYXVzZSB3YXMgYXQgYW4gZWFybGllciB0aW1lIGFuZCB0aGUgdXNlciByZXN1bWVkIGluIHRoZSBjYWxsYmFjaywgaXQgY291bGQgcmVwb3NpdGlvbiB0aGUgdGltZWxpbmUgKGNoYW5naW5nIGl0cyBzdGFydFRpbWUpLCB0aHJvd2luZyB0aGluZ3Mgb2ZmIHNsaWdodGx5LCBzbyB3ZSBtYWtlIHN1cmUgdGhlIF9zdGFydCBkb2Vzbid0IHNoaWZ0LlxuXG4gICAgICAgICAgX3NldEVuZCh0aGlzKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fb25VcGRhdGUgJiYgIXN1cHByZXNzRXZlbnRzICYmIF9jYWxsYmFjayh0aGlzLCBcIm9uVXBkYXRlXCIsIHRydWUpO1xuICAgICAgaWYgKHRUaW1lID09PSB0RHVyICYmIHREdXIgPj0gdGhpcy50b3RhbER1cmF0aW9uKCkgfHwgIXRUaW1lICYmIHByZXZUaW1lKSBpZiAocHJldlN0YXJ0ID09PSB0aGlzLl9zdGFydCB8fCBNYXRoLmFicyh0aW1lU2NhbGUpICE9PSBNYXRoLmFicyh0aGlzLl90cykpIGlmICghdGhpcy5fbG9jaykge1xuICAgICAgICAodG90YWxUaW1lIHx8ICFkdXIpICYmICh0VGltZSA9PT0gdER1ciAmJiB0aGlzLl90cyA+IDAgfHwgIXRUaW1lICYmIHRoaXMuX3RzIDwgMCkgJiYgX3JlbW92ZUZyb21QYXJlbnQodGhpcywgMSk7IC8vIGRvbid0IHJlbW92ZSBpZiB0aGUgdGltZWxpbmUgaXMgcmV2ZXJzZWQgYW5kIHRoZSBwbGF5aGVhZCBpc24ndCBhdCAwLCBvdGhlcndpc2UgdGwucHJvZ3Jlc3MoMSkucmV2ZXJzZSgpIHdvbid0IHdvcmsuIE9ubHkgcmVtb3ZlIGlmIHRoZSBwbGF5aGVhZCBpcyBhdCB0aGUgZW5kIGFuZCB0aW1lU2NhbGUgaXMgcG9zaXRpdmUsIG9yIGlmIHRoZSBwbGF5aGVhZCBpcyBhdCAwIGFuZCB0aGUgdGltZVNjYWxlIGlzIG5lZ2F0aXZlLlxuXG4gICAgICAgIGlmICghc3VwcHJlc3NFdmVudHMgJiYgISh0b3RhbFRpbWUgPCAwICYmICFwcmV2VGltZSkgJiYgKHRUaW1lIHx8IHByZXZUaW1lKSkge1xuICAgICAgICAgIF9jYWxsYmFjayh0aGlzLCB0VGltZSA9PT0gdER1ciA/IFwib25Db21wbGV0ZVwiIDogXCJvblJldmVyc2VDb21wbGV0ZVwiLCB0cnVlKTtcblxuICAgICAgICAgIHRoaXMuX3Byb20gJiYgISh0VGltZSA8IHREdXIgJiYgdGhpcy50aW1lU2NhbGUoKSA+IDApICYmIHRoaXMuX3Byb20oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuYWRkID0gZnVuY3Rpb24gYWRkKGNoaWxkLCBwb3NpdGlvbikge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaWYgKCFfaXNOdW1iZXIocG9zaXRpb24pKSB7XG4gICAgICBwb3NpdGlvbiA9IF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIEFuaW1hdGlvbikpIHtcbiAgICAgIGlmIChfaXNBcnJheShjaGlsZCkpIHtcbiAgICAgICAgY2hpbGQuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5hZGQob2JqLCBwb3NpdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKF9pc1N0cmluZyhjaGlsZCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGFiZWwoY2hpbGQsIHBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9pc0Z1bmN0aW9uKGNoaWxkKSkge1xuICAgICAgICBjaGlsZCA9IFR3ZWVuLmRlbGF5ZWRDYWxsKDAsIGNoaWxkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzICE9PSBjaGlsZCA/IF9hZGRUb1RpbWVsaW5lKHRoaXMsIGNoaWxkLCBwb3NpdGlvbikgOiB0aGlzOyAvL2Rvbid0IGFsbG93IGEgdGltZWxpbmUgdG8gYmUgYWRkZWQgdG8gaXRzZWxmIGFzIGEgY2hpbGQhXG4gIH07XG5cbiAgX3Byb3RvMi5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uIGdldENoaWxkcmVuKG5lc3RlZCwgdHdlZW5zLCB0aW1lbGluZXMsIGlnbm9yZUJlZm9yZVRpbWUpIHtcbiAgICBpZiAobmVzdGVkID09PSB2b2lkIDApIHtcbiAgICAgIG5lc3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR3ZWVucyA9PT0gdm9pZCAwKSB7XG4gICAgICB0d2VlbnMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aW1lbGluZXMgPT09IHZvaWQgMCkge1xuICAgICAgdGltZWxpbmVzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoaWdub3JlQmVmb3JlVGltZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZ25vcmVCZWZvcmVUaW1lID0gLV9iaWdOdW07XG4gICAgfVxuXG4gICAgdmFyIGEgPSBbXSxcbiAgICAgICAgY2hpbGQgPSB0aGlzLl9maXJzdDtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLl9zdGFydCA+PSBpZ25vcmVCZWZvcmVUaW1lKSB7XG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFR3ZWVuKSB7XG4gICAgICAgICAgdHdlZW5zICYmIGEucHVzaChjaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGltZWxpbmVzICYmIGEucHVzaChjaGlsZCk7XG4gICAgICAgICAgbmVzdGVkICYmIGEucHVzaC5hcHBseShhLCBjaGlsZC5nZXRDaGlsZHJlbih0cnVlLCB0d2VlbnMsIHRpbWVsaW5lcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH07XG5cbiAgX3Byb3RvMi5nZXRCeUlkID0gZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIHZhciBhbmltYXRpb25zID0gdGhpcy5nZXRDaGlsZHJlbigxLCAxLCAxKSxcbiAgICAgICAgaSA9IGFuaW1hdGlvbnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGFuaW1hdGlvbnNbaV0udmFycy5pZCA9PT0gaWQpIHtcbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbnNbaV07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzIucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGNoaWxkKSB7XG4gICAgaWYgKF9pc1N0cmluZyhjaGlsZCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbW92ZUxhYmVsKGNoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAoX2lzRnVuY3Rpb24oY2hpbGQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5raWxsVHdlZW5zT2YoY2hpbGQpO1xuICAgIH1cblxuICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSh0aGlzLCBjaGlsZCk7XG5cbiAgICBpZiAoY2hpbGQgPT09IHRoaXMuX3JlY2VudCkge1xuICAgICAgdGhpcy5fcmVjZW50ID0gdGhpcy5fbGFzdDtcbiAgICB9XG5cbiAgICByZXR1cm4gX3VuY2FjaGUodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvMi50b3RhbFRpbWUgPSBmdW5jdGlvbiB0b3RhbFRpbWUoX3RvdGFsVGltZTIsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdFRpbWU7XG4gICAgfVxuXG4gICAgdGhpcy5fZm9yY2luZyA9IDE7XG5cbiAgICBpZiAoIXRoaXMuX2RwICYmIHRoaXMuX3RzKSB7XG4gICAgICAvL3NwZWNpYWwgY2FzZSBmb3IgdGhlIGdsb2JhbCB0aW1lbGluZSAob3IgYW55IG90aGVyIHRoYXQgaGFzIG5vIHBhcmVudCBvciBkZXRhY2hlZCBwYXJlbnQpLlxuICAgICAgdGhpcy5fc3RhcnQgPSBfcm91bmQoX3RpY2tlci50aW1lIC0gKHRoaXMuX3RzID4gMCA/IF90b3RhbFRpbWUyIC8gdGhpcy5fdHMgOiAodGhpcy50b3RhbER1cmF0aW9uKCkgLSBfdG90YWxUaW1lMikgLyAtdGhpcy5fdHMpKTtcbiAgICB9XG5cbiAgICBfQW5pbWF0aW9uLnByb3RvdHlwZS50b3RhbFRpbWUuY2FsbCh0aGlzLCBfdG90YWxUaW1lMiwgc3VwcHJlc3NFdmVudHMpO1xuXG4gICAgdGhpcy5fZm9yY2luZyA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5hZGRMYWJlbCA9IGZ1bmN0aW9uIGFkZExhYmVsKGxhYmVsLCBwb3NpdGlvbikge1xuICAgIHRoaXMubGFiZWxzW2xhYmVsXSA9IF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLnJlbW92ZUxhYmVsID0gZnVuY3Rpb24gcmVtb3ZlTGFiZWwobGFiZWwpIHtcbiAgICBkZWxldGUgdGhpcy5sYWJlbHNbbGFiZWxdO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuYWRkUGF1c2UgPSBmdW5jdGlvbiBhZGRQYXVzZShwb3NpdGlvbiwgY2FsbGJhY2ssIHBhcmFtcykge1xuICAgIHZhciB0ID0gVHdlZW4uZGVsYXllZENhbGwoMCwgY2FsbGJhY2sgfHwgX2VtcHR5RnVuYywgcGFyYW1zKTtcbiAgICB0LmRhdGEgPSBcImlzUGF1c2VcIjtcbiAgICB0aGlzLl9oYXNQYXVzZSA9IDE7XG4gICAgcmV0dXJuIF9hZGRUb1RpbWVsaW5lKHRoaXMsIHQsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSk7XG4gIH07XG5cbiAgX3Byb3RvMi5yZW1vdmVQYXVzZSA9IGZ1bmN0aW9uIHJlbW92ZVBhdXNlKHBvc2l0aW9uKSB7XG4gICAgdmFyIGNoaWxkID0gdGhpcy5fZmlyc3Q7XG4gICAgcG9zaXRpb24gPSBfcGFyc2VQb3NpdGlvbih0aGlzLCBwb3NpdGlvbik7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5fc3RhcnQgPT09IHBvc2l0aW9uICYmIGNoaWxkLmRhdGEgPT09IFwiaXNQYXVzZVwiKSB7XG4gICAgICAgIF9yZW1vdmVGcm9tUGFyZW50KGNoaWxkKTtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMi5raWxsVHdlZW5zT2YgPSBmdW5jdGlvbiBraWxsVHdlZW5zT2YodGFyZ2V0cywgcHJvcHMsIG9ubHlBY3RpdmUpIHtcbiAgICB2YXIgdHdlZW5zID0gdGhpcy5nZXRUd2VlbnNPZih0YXJnZXRzLCBvbmx5QWN0aXZlKSxcbiAgICAgICAgaSA9IHR3ZWVucy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBfb3ZlcndyaXRpbmdUd2VlbiAhPT0gdHdlZW5zW2ldICYmIHR3ZWVuc1tpXS5raWxsKHRhcmdldHMsIHByb3BzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmdldFR3ZWVuc09mID0gZnVuY3Rpb24gZ2V0VHdlZW5zT2YodGFyZ2V0cywgb25seUFjdGl2ZSkge1xuICAgIHZhciBhID0gW10sXG4gICAgICAgIHBhcnNlZFRhcmdldHMgPSB0b0FycmF5KHRhcmdldHMpLFxuICAgICAgICBjaGlsZCA9IHRoaXMuX2ZpcnN0LFxuICAgICAgICBpc0dsb2JhbFRpbWUgPSBfaXNOdW1iZXIob25seUFjdGl2ZSksXG4gICAgICAgIC8vIGEgbnVtYmVyIGlzIGludGVycHJldGVkIGFzIGEgZ2xvYmFsIHRpbWUuIElmIHRoZSBhbmltYXRpb24gc3BhbnNcbiAgICBjaGlsZHJlbjtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVHdlZW4pIHtcbiAgICAgICAgaWYgKF9hcnJheUNvbnRhaW5zQW55KGNoaWxkLl90YXJnZXRzLCBwYXJzZWRUYXJnZXRzKSAmJiAoaXNHbG9iYWxUaW1lID8gKCFfb3ZlcndyaXRpbmdUd2VlbiB8fCBjaGlsZC5faW5pdHRlZCAmJiBjaGlsZC5fdHMpICYmIGNoaWxkLmdsb2JhbFRpbWUoMCkgPD0gb25seUFjdGl2ZSAmJiBjaGlsZC5nbG9iYWxUaW1lKGNoaWxkLnRvdGFsRHVyYXRpb24oKSkgPiBvbmx5QWN0aXZlIDogIW9ubHlBY3RpdmUgfHwgY2hpbGQuaXNBY3RpdmUoKSkpIHtcbiAgICAgICAgICAvLyBub3RlOiBpZiB0aGlzIGlzIGZvciBvdmVyd3JpdGluZywgaXQgc2hvdWxkIG9ubHkgYmUgZm9yIHR3ZWVucyB0aGF0IGFyZW4ndCBwYXVzZWQgYW5kIGFyZSBpbml0dGVkLlxuICAgICAgICAgIGEucHVzaChjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoKGNoaWxkcmVuID0gY2hpbGQuZ2V0VHdlZW5zT2YocGFyc2VkVGFyZ2V0cywgb25seUFjdGl2ZSkpLmxlbmd0aCkge1xuICAgICAgICBhLnB1c2guYXBwbHkoYSwgY2hpbGRyZW4pO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9O1xuXG4gIF9wcm90bzIudHdlZW5UbyA9IGZ1bmN0aW9uIHR3ZWVuVG8ocG9zaXRpb24sIHZhcnMpIHtcbiAgICB2YXJzID0gdmFycyB8fCB7fTtcblxuICAgIHZhciB0bCA9IHRoaXMsXG4gICAgICAgIGVuZFRpbWUgPSBfcGFyc2VQb3NpdGlvbih0bCwgcG9zaXRpb24pLFxuICAgICAgICBfdmFycyA9IHZhcnMsXG4gICAgICAgIHN0YXJ0QXQgPSBfdmFycy5zdGFydEF0LFxuICAgICAgICBfb25TdGFydCA9IF92YXJzLm9uU3RhcnQsXG4gICAgICAgIG9uU3RhcnRQYXJhbXMgPSBfdmFycy5vblN0YXJ0UGFyYW1zLFxuICAgICAgICB0d2VlbiA9IFR3ZWVuLnRvKHRsLCBfc2V0RGVmYXVsdHModmFycywge1xuICAgICAgZWFzZTogXCJub25lXCIsXG4gICAgICBsYXp5OiBmYWxzZSxcbiAgICAgIHRpbWU6IGVuZFRpbWUsXG4gICAgICBkdXJhdGlvbjogdmFycy5kdXJhdGlvbiB8fCBNYXRoLmFicygoZW5kVGltZSAtIChzdGFydEF0ICYmIFwidGltZVwiIGluIHN0YXJ0QXQgPyBzdGFydEF0LnRpbWUgOiB0bC5fdGltZSkpIC8gdGwudGltZVNjYWxlKCkpIHx8IF90aW55TnVtLFxuICAgICAgb25TdGFydDogZnVuY3Rpb24gb25TdGFydCgpIHtcbiAgICAgICAgdGwucGF1c2UoKTtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gdmFycy5kdXJhdGlvbiB8fCBNYXRoLmFicygoZW5kVGltZSAtIHRsLl90aW1lKSAvIHRsLnRpbWVTY2FsZSgpKTtcbiAgICAgICAgdHdlZW4uX2R1ciAhPT0gZHVyYXRpb24gJiYgX3NldER1cmF0aW9uKHR3ZWVuLCBkdXJhdGlvbiwgMCwgMSkucmVuZGVyKHR3ZWVuLl90aW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgX29uU3RhcnQgJiYgX29uU3RhcnQuYXBwbHkodHdlZW4sIG9uU3RhcnRQYXJhbXMgfHwgW10pOyAvL2luIGNhc2UgdGhlIHVzZXIgaGFkIGFuIG9uU3RhcnQgaW4gdGhlIHZhcnMgLSB3ZSBkb24ndCB3YW50IHRvIG92ZXJ3cml0ZSBpdC5cbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICByZXR1cm4gdHdlZW47XG4gIH07XG5cbiAgX3Byb3RvMi50d2VlbkZyb21UbyA9IGZ1bmN0aW9uIHR3ZWVuRnJvbVRvKGZyb21Qb3NpdGlvbiwgdG9Qb3NpdGlvbiwgdmFycykge1xuICAgIHJldHVybiB0aGlzLnR3ZWVuVG8odG9Qb3NpdGlvbiwgX3NldERlZmF1bHRzKHtcbiAgICAgIHN0YXJ0QXQ6IHtcbiAgICAgICAgdGltZTogX3BhcnNlUG9zaXRpb24odGhpcywgZnJvbVBvc2l0aW9uKVxuICAgICAgfVxuICAgIH0sIHZhcnMpKTtcbiAgfTtcblxuICBfcHJvdG8yLnJlY2VudCA9IGZ1bmN0aW9uIHJlY2VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjZW50O1xuICB9O1xuXG4gIF9wcm90bzIubmV4dExhYmVsID0gZnVuY3Rpb24gbmV4dExhYmVsKGFmdGVyVGltZSkge1xuICAgIGlmIChhZnRlclRpbWUgPT09IHZvaWQgMCkge1xuICAgICAgYWZ0ZXJUaW1lID0gdGhpcy5fdGltZTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2dldExhYmVsSW5EaXJlY3Rpb24odGhpcywgX3BhcnNlUG9zaXRpb24odGhpcywgYWZ0ZXJUaW1lKSk7XG4gIH07XG5cbiAgX3Byb3RvMi5wcmV2aW91c0xhYmVsID0gZnVuY3Rpb24gcHJldmlvdXNMYWJlbChiZWZvcmVUaW1lKSB7XG4gICAgaWYgKGJlZm9yZVRpbWUgPT09IHZvaWQgMCkge1xuICAgICAgYmVmb3JlVGltZSA9IHRoaXMuX3RpbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9nZXRMYWJlbEluRGlyZWN0aW9uKHRoaXMsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIGJlZm9yZVRpbWUpLCAxKTtcbiAgfTtcblxuICBfcHJvdG8yLmN1cnJlbnRMYWJlbCA9IGZ1bmN0aW9uIGN1cnJlbnRMYWJlbCh2YWx1ZSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy5zZWVrKHZhbHVlLCB0cnVlKSA6IHRoaXMucHJldmlvdXNMYWJlbCh0aGlzLl90aW1lICsgX3RpbnlOdW0pO1xuICB9O1xuXG4gIF9wcm90bzIuc2hpZnRDaGlsZHJlbiA9IGZ1bmN0aW9uIHNoaWZ0Q2hpbGRyZW4oYW1vdW50LCBhZGp1c3RMYWJlbHMsIGlnbm9yZUJlZm9yZVRpbWUpIHtcbiAgICBpZiAoaWdub3JlQmVmb3JlVGltZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZ25vcmVCZWZvcmVUaW1lID0gMDtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGQgPSB0aGlzLl9maXJzdCxcbiAgICAgICAgbGFiZWxzID0gdGhpcy5sYWJlbHMsXG4gICAgICAgIHA7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5fc3RhcnQgPj0gaWdub3JlQmVmb3JlVGltZSkge1xuICAgICAgICBjaGlsZC5fc3RhcnQgKz0gYW1vdW50O1xuICAgICAgICBjaGlsZC5fZW5kICs9IGFtb3VudDtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICBpZiAoYWRqdXN0TGFiZWxzKSB7XG4gICAgICBmb3IgKHAgaW4gbGFiZWxzKSB7XG4gICAgICAgIGlmIChsYWJlbHNbcF0gPj0gaWdub3JlQmVmb3JlVGltZSkge1xuICAgICAgICAgIGxhYmVsc1twXSArPSBhbW91bnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX3VuY2FjaGUodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvMi5pbnZhbGlkYXRlID0gZnVuY3Rpb24gaW52YWxpZGF0ZSgpIHtcbiAgICB2YXIgY2hpbGQgPSB0aGlzLl9maXJzdDtcbiAgICB0aGlzLl9sb2NrID0gMDtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgY2hpbGQuaW52YWxpZGF0ZSgpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gX0FuaW1hdGlvbi5wcm90b3R5cGUuaW52YWxpZGF0ZS5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90bzIuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcihpbmNsdWRlTGFiZWxzKSB7XG4gICAgaWYgKGluY2x1ZGVMYWJlbHMgPT09IHZvaWQgMCkge1xuICAgICAgaW5jbHVkZUxhYmVscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkID0gdGhpcy5fZmlyc3QsXG4gICAgICAgIG5leHQ7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcbiAgICAgIHRoaXMucmVtb3ZlKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gbmV4dDtcbiAgICB9XG5cbiAgICB0aGlzLl90aW1lID0gdGhpcy5fdFRpbWUgPSB0aGlzLl9wVGltZSA9IDA7XG4gICAgaW5jbHVkZUxhYmVscyAmJiAodGhpcy5sYWJlbHMgPSB7fSk7XG4gICAgcmV0dXJuIF91bmNhY2hlKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90bzIudG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uIHRvdGFsRHVyYXRpb24odmFsdWUpIHtcbiAgICB2YXIgbWF4ID0gMCxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNoaWxkID0gc2VsZi5fbGFzdCxcbiAgICAgICAgcHJldlN0YXJ0ID0gX2JpZ051bSxcbiAgICAgICAgcHJldixcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHBhcmVudDtcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gc2VsZi50aW1lU2NhbGUoKHNlbGYuX3JlcGVhdCA8IDAgPyBzZWxmLmR1cmF0aW9uKCkgOiBzZWxmLnRvdGFsRHVyYXRpb24oKSkgLyAoc2VsZi5yZXZlcnNlZCgpID8gLXZhbHVlIDogdmFsdWUpKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5fZGlydHkpIHtcbiAgICAgIHBhcmVudCA9IHNlbGYucGFyZW50O1xuXG4gICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgcHJldiA9IGNoaWxkLl9wcmV2OyAvL3JlY29yZCBpdCBoZXJlIGluIGNhc2UgdGhlIHR3ZWVuIGNoYW5nZXMgcG9zaXRpb24gaW4gdGhlIHNlcXVlbmNlLi4uXG5cbiAgICAgICAgY2hpbGQuX2RpcnR5ICYmIGNoaWxkLnRvdGFsRHVyYXRpb24oKTsgLy9jb3VsZCBjaGFuZ2UgdGhlIHR3ZWVuLl9zdGFydFRpbWUsIHNvIG1ha2Ugc3VyZSB0aGUgYW5pbWF0aW9uJ3MgY2FjaGUgaXMgY2xlYW4gYmVmb3JlIGFuYWx5emluZyBpdC5cblxuICAgICAgICBzdGFydCA9IGNoaWxkLl9zdGFydDtcblxuICAgICAgICBpZiAoc3RhcnQgPiBwcmV2U3RhcnQgJiYgc2VsZi5fc29ydCAmJiBjaGlsZC5fdHMgJiYgIXNlbGYuX2xvY2spIHtcbiAgICAgICAgICAvL2luIGNhc2Ugb25lIG9mIHRoZSB0d2VlbnMgc2hpZnRlZCBvdXQgb2Ygb3JkZXIsIGl0IG5lZWRzIHRvIGJlIHJlLWluc2VydGVkIGludG8gdGhlIGNvcnJlY3QgcG9zaXRpb24gaW4gdGhlIHNlcXVlbmNlXG4gICAgICAgICAgc2VsZi5fbG9jayA9IDE7IC8vcHJldmVudCBlbmRsZXNzIHJlY3Vyc2l2ZSBjYWxscyAtIHRoZXJlIGFyZSBtZXRob2RzIHRoYXQgZ2V0IHRyaWdnZXJlZCB0aGF0IGNoZWNrIGR1cmF0aW9uL3RvdGFsRHVyYXRpb24gd2hlbiB3ZSBhZGQoKS5cblxuICAgICAgICAgIF9hZGRUb1RpbWVsaW5lKHNlbGYsIGNoaWxkLCBzdGFydCAtIGNoaWxkLl9kZWxheSwgMSkuX2xvY2sgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByZXZTdGFydCA9IHN0YXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXJ0IDwgMCAmJiBjaGlsZC5fdHMpIHtcbiAgICAgICAgICAvL2NoaWxkcmVuIGFyZW4ndCBhbGxvd2VkIHRvIGhhdmUgbmVnYXRpdmUgc3RhcnRUaW1lcyB1bmxlc3Mgc21vb3RoQ2hpbGRUaW1pbmcgaXMgdHJ1ZSwgc28gYWRqdXN0IGhlcmUgaWYgb25lIGlzIGZvdW5kLlxuICAgICAgICAgIG1heCAtPSBzdGFydDtcblxuICAgICAgICAgIGlmICghcGFyZW50ICYmICFzZWxmLl9kcCB8fCBwYXJlbnQgJiYgcGFyZW50LnNtb290aENoaWxkVGltaW5nKSB7XG4gICAgICAgICAgICBzZWxmLl9zdGFydCArPSBzdGFydCAvIHNlbGYuX3RzO1xuICAgICAgICAgICAgc2VsZi5fdGltZSAtPSBzdGFydDtcbiAgICAgICAgICAgIHNlbGYuX3RUaW1lIC09IHN0YXJ0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlbGYuc2hpZnRDaGlsZHJlbigtc3RhcnQsIGZhbHNlLCAtMWU5OTkpO1xuICAgICAgICAgIHByZXZTdGFydCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZC5fZW5kID4gbWF4ICYmIGNoaWxkLl90cyAmJiAobWF4ID0gY2hpbGQuX2VuZCk7XG4gICAgICAgIGNoaWxkID0gcHJldjtcbiAgICAgIH1cblxuICAgICAgX3NldER1cmF0aW9uKHNlbGYsIHNlbGYgPT09IF9nbG9iYWxUaW1lbGluZSAmJiBzZWxmLl90aW1lID4gbWF4ID8gc2VsZi5fdGltZSA6IG1heCwgMSwgMSk7XG5cbiAgICAgIHNlbGYuX2RpcnR5ID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZi5fdER1cjtcbiAgfTtcblxuICBUaW1lbGluZS51cGRhdGVSb290ID0gZnVuY3Rpb24gdXBkYXRlUm9vdCh0aW1lKSB7XG4gICAgaWYgKF9nbG9iYWxUaW1lbGluZS5fdHMpIHtcbiAgICAgIF9sYXp5U2FmZVJlbmRlcihfZ2xvYmFsVGltZWxpbmUsIF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHRpbWUsIF9nbG9iYWxUaW1lbGluZSkpO1xuXG4gICAgICBfbGFzdFJlbmRlcmVkRnJhbWUgPSBfdGlja2VyLmZyYW1lO1xuICAgIH1cblxuICAgIGlmIChfdGlja2VyLmZyYW1lID49IF9uZXh0R0NGcmFtZSkge1xuICAgICAgX25leHRHQ0ZyYW1lICs9IF9jb25maWcuYXV0b1NsZWVwIHx8IDEyMDtcbiAgICAgIHZhciBjaGlsZCA9IF9nbG9iYWxUaW1lbGluZS5fZmlyc3Q7XG4gICAgICBpZiAoIWNoaWxkIHx8ICFjaGlsZC5fdHMpIGlmIChfY29uZmlnLmF1dG9TbGVlcCAmJiBfdGlja2VyLl9saXN0ZW5lcnMubGVuZ3RoIDwgMikge1xuICAgICAgICB3aGlsZSAoY2hpbGQgJiYgIWNoaWxkLl90cykge1xuICAgICAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZCB8fCBfdGlja2VyLnNsZWVwKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBUaW1lbGluZTtcbn0oQW5pbWF0aW9uKTtcblxuX3NldERlZmF1bHRzKFRpbWVsaW5lLnByb3RvdHlwZSwge1xuICBfbG9jazogMCxcbiAgX2hhc1BhdXNlOiAwLFxuICBfZm9yY2luZzogMFxufSk7XG5cbnZhciBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2VlbiA9IGZ1bmN0aW9uIF9hZGRDb21wbGV4U3RyaW5nUHJvcFR3ZWVuKHRhcmdldCwgcHJvcCwgc3RhcnQsIGVuZCwgc2V0dGVyLCBzdHJpbmdGaWx0ZXIsIGZ1bmNQYXJhbSkge1xuICAvL25vdGU6IHdlIGNhbGwgX2FkZENvbXBsZXhTdHJpbmdQcm9wVHdlZW4uY2FsbCh0d2Vlbkluc3RhbmNlLi4uKSB0byBlbnN1cmUgdGhhdCBpdCdzIHNjb3BlZCBwcm9wZXJseS4gV2UgbWF5IGNhbGwgaXQgZnJvbSB3aXRoaW4gYSBwbHVnaW4gdG9vLCB0aHVzIFwidGhpc1wiIHdvdWxkIHJlZmVyIHRvIHRoZSBwbHVnaW4uXG4gIHZhciBwdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHRhcmdldCwgcHJvcCwgMCwgMSwgX3JlbmRlckNvbXBsZXhTdHJpbmcsIG51bGwsIHNldHRlciksXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBtYXRjaEluZGV4ID0gMCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHN0YXJ0TnVtcyxcbiAgICAgIGNvbG9yLFxuICAgICAgZW5kTnVtLFxuICAgICAgY2h1bmssXG4gICAgICBzdGFydE51bSxcbiAgICAgIGhhc1JhbmRvbSxcbiAgICAgIGE7XG4gIHB0LmIgPSBzdGFydDtcbiAgcHQuZSA9IGVuZDtcbiAgc3RhcnQgKz0gXCJcIjsgLy9lbnN1cmUgdmFsdWVzIGFyZSBzdHJpbmdzXG5cbiAgZW5kICs9IFwiXCI7XG5cbiAgaWYgKGhhc1JhbmRvbSA9IH5lbmQuaW5kZXhPZihcInJhbmRvbShcIikpIHtcbiAgICBlbmQgPSBfcmVwbGFjZVJhbmRvbShlbmQpO1xuICB9XG5cbiAgaWYgKHN0cmluZ0ZpbHRlcikge1xuICAgIGEgPSBbc3RhcnQsIGVuZF07XG4gICAgc3RyaW5nRmlsdGVyKGEsIHRhcmdldCwgcHJvcCk7IC8vcGFzcyBhbiBhcnJheSB3aXRoIHRoZSBzdGFydGluZyBhbmQgZW5kaW5nIHZhbHVlcyBhbmQgbGV0IHRoZSBmaWx0ZXIgZG8gd2hhdGV2ZXIgaXQgbmVlZHMgdG8gdGhlIHZhbHVlcy5cblxuICAgIHN0YXJ0ID0gYVswXTtcbiAgICBlbmQgPSBhWzFdO1xuICB9XG5cbiAgc3RhcnROdW1zID0gc3RhcnQubWF0Y2goX2NvbXBsZXhTdHJpbmdOdW1FeHApIHx8IFtdO1xuXG4gIHdoaWxlIChyZXN1bHQgPSBfY29tcGxleFN0cmluZ051bUV4cC5leGVjKGVuZCkpIHtcbiAgICBlbmROdW0gPSByZXN1bHRbMF07XG4gICAgY2h1bmsgPSBlbmQuc3Vic3RyaW5nKGluZGV4LCByZXN1bHQuaW5kZXgpO1xuXG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICBjb2xvciA9IChjb2xvciArIDEpICUgNTtcbiAgICB9IGVsc2UgaWYgKGNodW5rLnN1YnN0cigtNSkgPT09IFwicmdiYShcIikge1xuICAgICAgY29sb3IgPSAxO1xuICAgIH1cblxuICAgIGlmIChlbmROdW0gIT09IHN0YXJ0TnVtc1ttYXRjaEluZGV4KytdKSB7XG4gICAgICBzdGFydE51bSA9IHBhcnNlRmxvYXQoc3RhcnROdW1zW21hdGNoSW5kZXggLSAxXSkgfHwgMDsgLy90aGVzZSBuZXN0ZWQgUHJvcFR3ZWVucyBhcmUgaGFuZGxlZCBpbiBhIHNwZWNpYWwgd2F5IC0gd2UnbGwgbmV2ZXIgYWN0dWFsbHkgY2FsbCBhIHJlbmRlciBvciBzZXR0ZXIgbWV0aG9kIG9uIHRoZW0uIFdlJ2xsIGp1c3QgbG9vcCB0aHJvdWdoIHRoZW0gaW4gdGhlIHBhcmVudCBjb21wbGV4IHN0cmluZyBQcm9wVHdlZW4ncyByZW5kZXIgbWV0aG9kLlxuXG4gICAgICBwdC5fcHQgPSB7XG4gICAgICAgIF9uZXh0OiBwdC5fcHQsXG4gICAgICAgIHA6IGNodW5rIHx8IG1hdGNoSW5kZXggPT09IDEgPyBjaHVuayA6IFwiLFwiLFxuICAgICAgICAvL25vdGU6IFNWRyBzcGVjIGFsbG93cyBvbWlzc2lvbiBvZiBjb21tYS9zcGFjZSB3aGVuIGEgbmVnYXRpdmUgc2lnbiBpcyB3ZWRnZWQgYmV0d2VlbiB0d28gbnVtYmVycywgbGlrZSAyLjUtNS4zIGluc3RlYWQgb2YgMi41LC01LjMgYnV0IHdoZW4gdHdlZW5pbmcsIHRoZSBuZWdhdGl2ZSB2YWx1ZSBtYXkgc3dpdGNoIHRvIHBvc2l0aXZlLCBzbyB3ZSBpbnNlcnQgdGhlIGNvbW1hIGp1c3QgaW4gY2FzZS5cbiAgICAgICAgczogc3RhcnROdW0sXG4gICAgICAgIGM6IGVuZE51bS5jaGFyQXQoMSkgPT09IFwiPVwiID8gcGFyc2VGbG9hdChlbmROdW0uc3Vic3RyKDIpKSAqIChlbmROdW0uY2hhckF0KDApID09PSBcIi1cIiA/IC0xIDogMSkgOiBwYXJzZUZsb2F0KGVuZE51bSkgLSBzdGFydE51bSxcbiAgICAgICAgbTogY29sb3IgJiYgY29sb3IgPCA0ID8gTWF0aC5yb3VuZCA6IDBcbiAgICAgIH07XG4gICAgICBpbmRleCA9IF9jb21wbGV4U3RyaW5nTnVtRXhwLmxhc3RJbmRleDtcbiAgICB9XG4gIH1cblxuICBwdC5jID0gaW5kZXggPCBlbmQubGVuZ3RoID8gZW5kLnN1YnN0cmluZyhpbmRleCwgZW5kLmxlbmd0aCkgOiBcIlwiOyAvL3dlIHVzZSB0aGUgXCJjXCIgb2YgdGhlIFByb3BUd2VlbiB0byBzdG9yZSB0aGUgZmluYWwgcGFydCBvZiB0aGUgc3RyaW5nIChhZnRlciB0aGUgbGFzdCBudW1iZXIpXG5cbiAgcHQuZnAgPSBmdW5jUGFyYW07XG5cbiAgaWYgKF9yZWxFeHAudGVzdChlbmQpIHx8IGhhc1JhbmRvbSkge1xuICAgIHB0LmUgPSAwOyAvL2lmIHRoZSBlbmQgc3RyaW5nIGNvbnRhaW5zIHJlbGF0aXZlIHZhbHVlcyBvciBkeW5hbWljIHJhbmRvbSguLi4pIHZhbHVlcywgZGVsZXRlIHRoZSBlbmQgaXQgc28gdGhhdCBvbiB0aGUgZmluYWwgcmVuZGVyIHdlIGRvbid0IGFjdHVhbGx5IHNldCBpdCB0byB0aGUgc3RyaW5nIHdpdGggKz0gb3IgLT0gY2hhcmFjdGVycyAoZm9yY2VzIGl0IHRvIHVzZSB0aGUgY2FsY3VsYXRlZCB2YWx1ZSkuXG4gIH1cblxuICB0aGlzLl9wdCA9IHB0OyAvL3N0YXJ0IHRoZSBsaW5rZWQgbGlzdCB3aXRoIHRoaXMgbmV3IFByb3BUd2Vlbi4gUmVtZW1iZXIsIHdlIGNhbGwgX2FkZENvbXBsZXhTdHJpbmdQcm9wVHdlZW4uY2FsbCh0d2Vlbkluc3RhbmNlLi4uKSB0byBlbnN1cmUgdGhhdCBpdCdzIHNjb3BlZCBwcm9wZXJseS4gV2UgbWF5IGNhbGwgaXQgZnJvbSB3aXRoaW4gYSBwbHVnaW4gdG9vLCB0aHVzIFwidGhpc1wiIHdvdWxkIHJlZmVyIHRvIHRoZSBwbHVnaW4uXG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfYWRkUHJvcFR3ZWVuID0gZnVuY3Rpb24gX2FkZFByb3BUd2Vlbih0YXJnZXQsIHByb3AsIHN0YXJ0LCBlbmQsIGluZGV4LCB0YXJnZXRzLCBtb2RpZmllciwgc3RyaW5nRmlsdGVyLCBmdW5jUGFyYW0pIHtcbiAgX2lzRnVuY3Rpb24oZW5kKSAmJiAoZW5kID0gZW5kKGluZGV4IHx8IDAsIHRhcmdldCwgdGFyZ2V0cykpO1xuICB2YXIgY3VycmVudFZhbHVlID0gdGFyZ2V0W3Byb3BdLFxuICAgICAgcGFyc2VkU3RhcnQgPSBzdGFydCAhPT0gXCJnZXRcIiA/IHN0YXJ0IDogIV9pc0Z1bmN0aW9uKGN1cnJlbnRWYWx1ZSkgPyBjdXJyZW50VmFsdWUgOiBmdW5jUGFyYW0gPyB0YXJnZXRbcHJvcC5pbmRleE9mKFwic2V0XCIpIHx8ICFfaXNGdW5jdGlvbih0YXJnZXRbXCJnZXRcIiArIHByb3Auc3Vic3RyKDMpXSkgPyBwcm9wIDogXCJnZXRcIiArIHByb3Auc3Vic3RyKDMpXShmdW5jUGFyYW0pIDogdGFyZ2V0W3Byb3BdKCksXG4gICAgICBzZXR0ZXIgPSAhX2lzRnVuY3Rpb24oY3VycmVudFZhbHVlKSA/IF9zZXR0ZXJQbGFpbiA6IGZ1bmNQYXJhbSA/IF9zZXR0ZXJGdW5jV2l0aFBhcmFtIDogX3NldHRlckZ1bmMsXG4gICAgICBwdDtcblxuICBpZiAoX2lzU3RyaW5nKGVuZCkpIHtcbiAgICBpZiAofmVuZC5pbmRleE9mKFwicmFuZG9tKFwiKSkge1xuICAgICAgZW5kID0gX3JlcGxhY2VSYW5kb20oZW5kKTtcbiAgICB9XG5cbiAgICBpZiAoZW5kLmNoYXJBdCgxKSA9PT0gXCI9XCIpIHtcbiAgICAgIGVuZCA9IHBhcnNlRmxvYXQocGFyc2VkU3RhcnQpICsgcGFyc2VGbG9hdChlbmQuc3Vic3RyKDIpKSAqIChlbmQuY2hhckF0KDApID09PSBcIi1cIiA/IC0xIDogMSkgKyAoZ2V0VW5pdChwYXJzZWRTdGFydCkgfHwgMCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnNlZFN0YXJ0ICE9PSBlbmQpIHtcbiAgICBpZiAoIWlzTmFOKHBhcnNlZFN0YXJ0ICogZW5kKSkge1xuICAgICAgcHQgPSBuZXcgUHJvcFR3ZWVuKHRoaXMuX3B0LCB0YXJnZXQsIHByb3AsICtwYXJzZWRTdGFydCB8fCAwLCBlbmQgLSAocGFyc2VkU3RhcnQgfHwgMCksIHR5cGVvZiBjdXJyZW50VmFsdWUgPT09IFwiYm9vbGVhblwiID8gX3JlbmRlckJvb2xlYW4gOiBfcmVuZGVyUGxhaW4sIDAsIHNldHRlcik7XG4gICAgICBmdW5jUGFyYW0gJiYgKHB0LmZwID0gZnVuY1BhcmFtKTtcbiAgICAgIG1vZGlmaWVyICYmIHB0Lm1vZGlmaWVyKG1vZGlmaWVyLCB0aGlzLCB0YXJnZXQpO1xuICAgICAgcmV0dXJuIHRoaXMuX3B0ID0gcHQ7XG4gICAgfVxuXG4gICAgIWN1cnJlbnRWYWx1ZSAmJiAhKHByb3AgaW4gdGFyZ2V0KSAmJiBfbWlzc2luZ1BsdWdpbihwcm9wLCBlbmQpO1xuICAgIHJldHVybiBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2Vlbi5jYWxsKHRoaXMsIHRhcmdldCwgcHJvcCwgcGFyc2VkU3RhcnQsIGVuZCwgc2V0dGVyLCBzdHJpbmdGaWx0ZXIgfHwgX2NvbmZpZy5zdHJpbmdGaWx0ZXIsIGZ1bmNQYXJhbSk7XG4gIH1cbn0sXG4gICAgLy9jcmVhdGVzIGEgY29weSBvZiB0aGUgdmFycyBvYmplY3QgYW5kIHByb2Nlc3NlcyBhbnkgZnVuY3Rpb24tYmFzZWQgdmFsdWVzIChwdXR0aW5nIHRoZSByZXN1bHRpbmcgdmFsdWVzIGRpcmVjdGx5IGludG8gdGhlIGNvcHkpIGFzIHdlbGwgYXMgc3RyaW5ncyB3aXRoIFwicmFuZG9tKClcIiBpbiB0aGVtLiBJdCBkb2VzIE5PVCBwcm9jZXNzIHJlbGF0aXZlIHZhbHVlcy5cbl9wcm9jZXNzVmFycyA9IGZ1bmN0aW9uIF9wcm9jZXNzVmFycyh2YXJzLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzLCB0d2Vlbikge1xuICBfaXNGdW5jdGlvbih2YXJzKSAmJiAodmFycyA9IF9wYXJzZUZ1bmNPclN0cmluZyh2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykpO1xuXG4gIGlmICghX2lzT2JqZWN0KHZhcnMpIHx8IHZhcnMuc3R5bGUgJiYgdmFycy5ub2RlVHlwZSB8fCBfaXNBcnJheSh2YXJzKSB8fCBfaXNUeXBlZEFycmF5KHZhcnMpKSB7XG4gICAgcmV0dXJuIF9pc1N0cmluZyh2YXJzKSA/IF9wYXJzZUZ1bmNPclN0cmluZyh2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykgOiB2YXJzO1xuICB9XG5cbiAgdmFyIGNvcHkgPSB7fSxcbiAgICAgIHA7XG5cbiAgZm9yIChwIGluIHZhcnMpIHtcbiAgICBjb3B5W3BdID0gX3BhcnNlRnVuY09yU3RyaW5nKHZhcnNbcF0sIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKTtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICBfY2hlY2tQbHVnaW4gPSBmdW5jdGlvbiBfY2hlY2tQbHVnaW4ocHJvcGVydHksIHZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKSB7XG4gIHZhciBwbHVnaW4sIHB0LCBwdExvb2t1cCwgaTtcblxuICBpZiAoX3BsdWdpbnNbcHJvcGVydHldICYmIChwbHVnaW4gPSBuZXcgX3BsdWdpbnNbcHJvcGVydHldKCkpLmluaXQodGFyZ2V0LCBwbHVnaW4ucmF3VmFycyA/IHZhcnNbcHJvcGVydHldIDogX3Byb2Nlc3NWYXJzKHZhcnNbcHJvcGVydHldLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzLCB0d2VlbiksIHR3ZWVuLCBpbmRleCwgdGFyZ2V0cykgIT09IGZhbHNlKSB7XG4gICAgdHdlZW4uX3B0ID0gcHQgPSBuZXcgUHJvcFR3ZWVuKHR3ZWVuLl9wdCwgdGFyZ2V0LCBwcm9wZXJ0eSwgMCwgMSwgcGx1Z2luLnJlbmRlciwgcGx1Z2luLCAwLCBwbHVnaW4ucHJpb3JpdHkpO1xuXG4gICAgaWYgKHR3ZWVuICE9PSBfcXVpY2tUd2Vlbikge1xuICAgICAgcHRMb29rdXAgPSB0d2Vlbi5fcHRMb29rdXBbdHdlZW4uX3RhcmdldHMuaW5kZXhPZih0YXJnZXQpXTsgLy9ub3RlOiB3ZSBjYW4ndCB1c2UgdHdlZW4uX3B0TG9va3VwW2luZGV4XSBiZWNhdXNlIGZvciBzdGFnZ2VyZWQgdHdlZW5zLCB0aGUgaW5kZXggZnJvbSB0aGUgZnVsbFRhcmdldHMgYXJyYXkgd29uJ3QgbWF0Y2ggd2hhdCBpdCBpcyBpbiBlYWNoIGluZGl2aWR1YWwgdHdlZW4gdGhhdCBzcGF3bnMgZnJvbSB0aGUgc3RhZ2dlci5cblxuICAgICAgaSA9IHBsdWdpbi5fcHJvcHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHB0TG9va3VwW3BsdWdpbi5fcHJvcHNbaV1dID0gcHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBsdWdpbjtcbn0sXG4gICAgX292ZXJ3cml0aW5nVHdlZW4sXG4gICAgLy9zdG9yZSBhIHJlZmVyZW5jZSB0ZW1wb3JhcmlseSBzbyB3ZSBjYW4gYXZvaWQgb3ZlcndyaXRpbmcgaXRzZWxmLlxuX2luaXRUd2VlbiA9IGZ1bmN0aW9uIF9pbml0VHdlZW4odHdlZW4sIHRpbWUpIHtcbiAgdmFyIHZhcnMgPSB0d2Vlbi52YXJzLFxuICAgICAgZWFzZSA9IHZhcnMuZWFzZSxcbiAgICAgIHN0YXJ0QXQgPSB2YXJzLnN0YXJ0QXQsXG4gICAgICBpbW1lZGlhdGVSZW5kZXIgPSB2YXJzLmltbWVkaWF0ZVJlbmRlcixcbiAgICAgIGxhenkgPSB2YXJzLmxhenksXG4gICAgICBvblVwZGF0ZSA9IHZhcnMub25VcGRhdGUsXG4gICAgICBvblVwZGF0ZVBhcmFtcyA9IHZhcnMub25VcGRhdGVQYXJhbXMsXG4gICAgICBjYWxsYmFja1Njb3BlID0gdmFycy5jYWxsYmFja1Njb3BlLFxuICAgICAgcnVuQmFja3dhcmRzID0gdmFycy5ydW5CYWNrd2FyZHMsXG4gICAgICB5b3lvRWFzZSA9IHZhcnMueW95b0Vhc2UsXG4gICAgICBrZXlmcmFtZXMgPSB2YXJzLmtleWZyYW1lcyxcbiAgICAgIGF1dG9SZXZlcnQgPSB2YXJzLmF1dG9SZXZlcnQsXG4gICAgICBkdXIgPSB0d2Vlbi5fZHVyLFxuICAgICAgcHJldlN0YXJ0QXQgPSB0d2Vlbi5fc3RhcnRBdCxcbiAgICAgIHRhcmdldHMgPSB0d2Vlbi5fdGFyZ2V0cyxcbiAgICAgIHBhcmVudCA9IHR3ZWVuLnBhcmVudCxcbiAgICAgIGZ1bGxUYXJnZXRzID0gcGFyZW50ICYmIHBhcmVudC5kYXRhID09PSBcIm5lc3RlZFwiID8gcGFyZW50LnBhcmVudC5fdGFyZ2V0cyA6IHRhcmdldHMsXG4gICAgICBhdXRvT3ZlcndyaXRlID0gdHdlZW4uX292ZXJ3cml0ZSA9PT0gXCJhdXRvXCIsXG4gICAgICB0bCA9IHR3ZWVuLnRpbWVsaW5lLFxuICAgICAgY2xlYW5WYXJzLFxuICAgICAgaSxcbiAgICAgIHAsXG4gICAgICBwdCxcbiAgICAgIHRhcmdldCxcbiAgICAgIGhhc1ByaW9yaXR5LFxuICAgICAgZ3NEYXRhLFxuICAgICAgaGFybmVzcyxcbiAgICAgIHBsdWdpbixcbiAgICAgIHB0TG9va3VwLFxuICAgICAgaW5kZXgsXG4gICAgICBoYXJuZXNzVmFycyxcbiAgICAgIG92ZXJ3cml0dGVuO1xuICB0bCAmJiAoIWtleWZyYW1lcyB8fCAhZWFzZSkgJiYgKGVhc2UgPSBcIm5vbmVcIik7XG4gIHR3ZWVuLl9lYXNlID0gX3BhcnNlRWFzZShlYXNlLCBfZGVmYXVsdHMuZWFzZSk7XG4gIHR3ZWVuLl95RWFzZSA9IHlveW9FYXNlID8gX2ludmVydEVhc2UoX3BhcnNlRWFzZSh5b3lvRWFzZSA9PT0gdHJ1ZSA/IGVhc2UgOiB5b3lvRWFzZSwgX2RlZmF1bHRzLmVhc2UpKSA6IDA7XG5cbiAgaWYgKHlveW9FYXNlICYmIHR3ZWVuLl95b3lvICYmICF0d2Vlbi5fcmVwZWF0KSB7XG4gICAgLy90aGVyZSBtdXN0IGhhdmUgYmVlbiBhIHBhcmVudCB0aW1lbGluZSB3aXRoIHlveW86dHJ1ZSB0aGF0IGlzIGN1cnJlbnRseSBpbiBpdHMgeW95byBwaGFzZSwgc28gZmxpcCB0aGUgZWFzZXMuXG4gICAgeW95b0Vhc2UgPSB0d2Vlbi5feUVhc2U7XG4gICAgdHdlZW4uX3lFYXNlID0gdHdlZW4uX2Vhc2U7XG4gICAgdHdlZW4uX2Vhc2UgPSB5b3lvRWFzZTtcbiAgfVxuXG4gIGlmICghdGwpIHtcbiAgICAvL2lmIHRoZXJlJ3MgYW4gaW50ZXJuYWwgdGltZWxpbmUsIHNraXAgYWxsIHRoZSBwYXJzaW5nIGJlY2F1c2Ugd2UgcGFzc2VkIHRoYXQgdGFzayBkb3duIHRoZSBjaGFpbi5cbiAgICBoYXJuZXNzID0gdGFyZ2V0c1swXSA/IF9nZXRDYWNoZSh0YXJnZXRzWzBdKS5oYXJuZXNzIDogMDtcbiAgICBoYXJuZXNzVmFycyA9IGhhcm5lc3MgJiYgdmFyc1toYXJuZXNzLnByb3BdOyAvL3NvbWVvbmUgbWF5IG5lZWQgdG8gc3BlY2lmeSBDU1Mtc3BlY2lmaWMgdmFsdWVzIEFORCBub24tQ1NTIHZhbHVlcywgbGlrZSBpZiB0aGUgZWxlbWVudCBoYXMgYW4gXCJ4XCIgcHJvcGVydHkgcGx1cyBpdCdzIGEgc3RhbmRhcmQgRE9NIGVsZW1lbnQuIFdlIGFsbG93IHBlb3BsZSB0byBkaXN0aW5ndWlzaCBieSB3cmFwcGluZyBwbHVnaW4tc3BlY2lmaWMgc3R1ZmYgaW4gYSBjc3M6e30gb2JqZWN0IGZvciBleGFtcGxlLlxuXG4gICAgY2xlYW5WYXJzID0gX2NvcHlFeGNsdWRpbmcodmFycywgX3Jlc2VydmVkUHJvcHMpO1xuICAgIHByZXZTdGFydEF0ICYmIHByZXZTdGFydEF0LnJlbmRlcigtMSwgdHJ1ZSkua2lsbCgpO1xuXG4gICAgaWYgKHN0YXJ0QXQpIHtcbiAgICAgIF9yZW1vdmVGcm9tUGFyZW50KHR3ZWVuLl9zdGFydEF0ID0gVHdlZW4uc2V0KHRhcmdldHMsIF9zZXREZWZhdWx0cyh7XG4gICAgICAgIGRhdGE6IFwiaXNTdGFydFwiLFxuICAgICAgICBvdmVyd3JpdGU6IGZhbHNlLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiB0cnVlLFxuICAgICAgICBsYXp5OiBfaXNOb3RGYWxzZShsYXp5KSxcbiAgICAgICAgc3RhcnRBdDogbnVsbCxcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIG9uVXBkYXRlOiBvblVwZGF0ZSxcbiAgICAgICAgb25VcGRhdGVQYXJhbXM6IG9uVXBkYXRlUGFyYW1zLFxuICAgICAgICBjYWxsYmFja1Njb3BlOiBjYWxsYmFja1Njb3BlLFxuICAgICAgICBzdGFnZ2VyOiAwXG4gICAgICB9LCBzdGFydEF0KSkpOyAvL2NvcHkgdGhlIHByb3BlcnRpZXMvdmFsdWVzIGludG8gYSBuZXcgb2JqZWN0IHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgdmFyIHRvID0ge3g6MH0sIGZyb20gPSB7eDo1MDB9OyB0aW1lbGluZS5mcm9tVG8oZSwgZnJvbSwgdG8pLmZyb21UbyhlLCB0bywgZnJvbSk7XG5cblxuICAgICAgaWYgKGltbWVkaWF0ZVJlbmRlcikge1xuICAgICAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgICBhdXRvUmV2ZXJ0IHx8ICh0d2Vlbi5fc3RhcnRBdCA9IDApOyAvL3R3ZWVucyB0aGF0IHJlbmRlciBpbW1lZGlhdGVseSAobGlrZSBtb3N0IGZyb20oKSBhbmQgZnJvbVRvKCkgdHdlZW5zKSBzaG91bGRuJ3QgcmV2ZXJ0IHdoZW4gdGhlaXIgcGFyZW50IHRpbWVsaW5lJ3MgcGxheWhlYWQgZ29lcyBiYWNrd2FyZCBwYXN0IHRoZSBzdGFydFRpbWUgYmVjYXVzZSB0aGUgaW5pdGlhbCByZW5kZXIgY291bGQgaGF2ZSBoYXBwZW5lZCBhbnl0aW1lIGFuZCBpdCBzaG91bGRuJ3QgYmUgZGlyZWN0bHkgY29ycmVsYXRlZCB0byB0aGlzIHR3ZWVuJ3Mgc3RhcnRUaW1lLiBJbWFnaW5lIHNldHRpbmcgdXAgYSBjb21wbGV4IGFuaW1hdGlvbiB3aGVyZSB0aGUgYmVnaW5uaW5nIHN0YXRlcyBvZiB2YXJpb3VzIG9iamVjdHMgYXJlIHJlbmRlcmVkIGltbWVkaWF0ZWx5IGJ1dCB0aGUgdHdlZW4gZG9lc24ndCBoYXBwZW4gZm9yIHF1aXRlIHNvbWUgdGltZSAtIGlmIHdlIHJldmVydCB0byB0aGUgc3RhcnRpbmcgdmFsdWVzIGFzIHNvb24gYXMgdGhlIHBsYXloZWFkIGdvZXMgYmFja3dhcmQgcGFzdCB0aGUgdHdlZW4ncyBzdGFydFRpbWUsIGl0IHdpbGwgdGhyb3cgdGhpbmdzIG9mZiB2aXN1YWxseS4gUmV2ZXJzaW9uIHNob3VsZCBvbmx5IGhhcHBlbiBpbiBUaW1lbGluZSBpbnN0YW5jZXMgd2hlcmUgaW1tZWRpYXRlUmVuZGVyIHdhcyBmYWxzZSBvciB3aGVuIGF1dG9SZXZlcnQgaXMgZXhwbGljaXRseSBzZXQgdG8gdHJ1ZS5cbiAgICAgICAgfSBlbHNlIGlmIChkdXIgJiYgISh0aW1lIDwgMCAmJiBwcmV2U3RhcnRBdCkpIHtcbiAgICAgICAgICB0aW1lICYmICh0d2Vlbi5felRpbWUgPSB0aW1lKTtcbiAgICAgICAgICByZXR1cm47IC8vd2Ugc2tpcCBpbml0aWFsaXphdGlvbiBoZXJlIHNvIHRoYXQgb3ZlcndyaXRpbmcgZG9lc24ndCBvY2N1ciB1bnRpbCB0aGUgdHdlZW4gYWN0dWFsbHkgYmVnaW5zLiBPdGhlcndpc2UsIGlmIHlvdSBjcmVhdGUgc2V2ZXJhbCBpbW1lZGlhdGVSZW5kZXI6dHJ1ZSB0d2VlbnMgb2YgdGhlIHNhbWUgdGFyZ2V0L3Byb3BlcnRpZXMgdG8gZHJvcCBpbnRvIGEgVGltZWxpbmUsIHRoZSBsYXN0IG9uZSBjcmVhdGVkIHdvdWxkIG92ZXJ3cml0ZSB0aGUgZmlyc3Qgb25lcyBiZWNhdXNlIHRoZXkgZGlkbid0IGdldCBwbGFjZWQgaW50byB0aGUgdGltZWxpbmUgeWV0IGJlZm9yZSB0aGUgZmlyc3QgcmVuZGVyIG9jY3VycyBhbmQga2lja3MgaW4gb3ZlcndyaXRpbmcuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ1bkJhY2t3YXJkcyAmJiBkdXIpIHtcbiAgICAgIC8vZnJvbSgpIHR3ZWVucyBtdXN0IGJlIGhhbmRsZWQgdW5pcXVlbHk6IHRoZWlyIGJlZ2lubmluZyB2YWx1ZXMgbXVzdCBiZSByZW5kZXJlZCBidXQgd2UgZG9uJ3Qgd2FudCBvdmVyd3JpdGluZyB0byBvY2N1ciB5ZXQgKHdoZW4gdGltZSBpcyBzdGlsbCAwKS4gV2FpdCB1bnRpbCB0aGUgdHdlZW4gYWN0dWFsbHkgYmVnaW5zIGJlZm9yZSBkb2luZyBhbGwgdGhlIHJvdXRpbmVzIGxpa2Ugb3ZlcndyaXRpbmcuIEF0IHRoYXQgdGltZSwgd2Ugc2hvdWxkIHJlbmRlciBhdCB0aGUgRU5EIG9mIHRoZSB0d2VlbiB0byBlbnN1cmUgdGhhdCB0aGluZ3MgaW5pdGlhbGl6ZSBjb3JyZWN0bHkgKHJlbWVtYmVyLCBmcm9tKCkgdHdlZW5zIGdvIGJhY2t3YXJkcylcbiAgICAgIGlmIChwcmV2U3RhcnRBdCkge1xuICAgICAgICAhYXV0b1JldmVydCAmJiAodHdlZW4uX3N0YXJ0QXQgPSAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWUgJiYgKGltbWVkaWF0ZVJlbmRlciA9IGZhbHNlKTsgLy9pbiByYXJlIGNhc2VzIChsaWtlIGlmIGEgZnJvbSgpIHR3ZWVuIHJ1bnMgYW5kIHRoZW4gaXMgaW52YWxpZGF0ZSgpLWVkKSwgaW1tZWRpYXRlUmVuZGVyIGNvdWxkIGJlIHRydWUgYnV0IHRoZSBpbml0aWFsIGZvcmNlZC1yZW5kZXIgZ2V0cyBza2lwcGVkLCBzbyB0aGVyZSdzIG5vIG5lZWQgdG8gZm9yY2UgdGhlIHJlbmRlciBpbiB0aGlzIGNvbnRleHQgd2hlbiB0aGUgX3RpbWUgaXMgZ3JlYXRlciB0aGFuIDBcblxuICAgICAgICBwID0gX3NldERlZmF1bHRzKHtcbiAgICAgICAgICBvdmVyd3JpdGU6IGZhbHNlLFxuICAgICAgICAgIGRhdGE6IFwiaXNGcm9tU3RhcnRcIixcbiAgICAgICAgICAvL3dlIHRhZyB0aGUgdHdlZW4gd2l0aCBhcyBcImlzRnJvbVN0YXJ0XCIgc28gdGhhdCBpZiBbaW5zaWRlIGEgcGx1Z2luXSB3ZSBuZWVkIHRvIG9ubHkgZG8gc29tZXRoaW5nIGF0IHRoZSB2ZXJ5IEVORCBvZiBhIHR3ZWVuLCB3ZSBoYXZlIGEgd2F5IG9mIGlkZW50aWZ5aW5nIHRoaXMgdHdlZW4gYXMgbWVyZWx5IHRoZSBvbmUgdGhhdCdzIHNldHRpbmcgdGhlIGJlZ2lubmluZyB2YWx1ZXMgZm9yIGEgXCJmcm9tKClcIiB0d2Vlbi4gRm9yIGV4YW1wbGUsIGNsZWFyUHJvcHMgaW4gQ1NTUGx1Z2luIHNob3VsZCBvbmx5IGdldCBhcHBsaWVkIGF0IHRoZSB2ZXJ5IEVORCBvZiBhIHR3ZWVuIGFuZCB3aXRob3V0IHRoaXMgdGFnLCBmcm9tKC4uLntoZWlnaHQ6MTAwLCBjbGVhclByb3BzOlwiaGVpZ2h0XCIsIGRlbGF5OjF9KSB3b3VsZCB3aXBlIHRoZSBoZWlnaHQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgdHdlZW4gYW5kIGFmdGVyIDEgc2Vjb25kLCBpdCdkIGtpY2sgYmFjayBpbi5cbiAgICAgICAgICBsYXp5OiBpbW1lZGlhdGVSZW5kZXIgJiYgX2lzTm90RmFsc2UobGF6eSksXG4gICAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiBpbW1lZGlhdGVSZW5kZXIsXG4gICAgICAgICAgLy96ZXJvLWR1cmF0aW9uIHR3ZWVucyByZW5kZXIgaW1tZWRpYXRlbHkgYnkgZGVmYXVsdCwgYnV0IGlmIHdlJ3JlIG5vdCBzcGVjaWZpY2FsbHkgaW5zdHJ1Y3RlZCB0byByZW5kZXIgdGhpcyB0d2VlbiBpbW1lZGlhdGVseSwgd2Ugc2hvdWxkIHNraXAgdGhpcyBhbmQgbWVyZWx5IF9pbml0KCkgdG8gcmVjb3JkIHRoZSBzdGFydGluZyB2YWx1ZXMgKHJlbmRlcmluZyB0aGVtIGltbWVkaWF0ZWx5IHdvdWxkIHB1c2ggdGhlbSB0byBjb21wbGV0aW9uIHdoaWNoIGlzIHdhc3RlZnVsIGluIHRoYXQgY2FzZSAtIHdlJ2QgaGF2ZSB0byByZW5kZXIoLTEpIGltbWVkaWF0ZWx5IGFmdGVyKVxuICAgICAgICAgIHN0YWdnZXI6IDAsXG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQgLy9lbnN1cmVzIHRoYXQgbmVzdGVkIHR3ZWVucyB0aGF0IGhhZCBhIHN0YWdnZXIgYXJlIGhhbmRsZWQgcHJvcGVybHksIGxpa2UgZ3NhcC5mcm9tKFwiLmNsYXNzXCIsIHt5OmdzYXAudXRpbHMud3JhcChbLTEwMCwxMDBdKX0pXG5cbiAgICAgICAgfSwgY2xlYW5WYXJzKTtcbiAgICAgICAgaGFybmVzc1ZhcnMgJiYgKHBbaGFybmVzcy5wcm9wXSA9IGhhcm5lc3NWYXJzKTsgLy8gaW4gY2FzZSBzb21lb25lIGRvZXMgc29tZXRoaW5nIGxpa2UgLmZyb20oLi4uLCB7Y3NzOnt9fSlcblxuICAgICAgICBfcmVtb3ZlRnJvbVBhcmVudCh0d2Vlbi5fc3RhcnRBdCA9IFR3ZWVuLnNldCh0YXJnZXRzLCBwKSk7XG5cbiAgICAgICAgaWYgKCFpbW1lZGlhdGVSZW5kZXIpIHtcbiAgICAgICAgICBfaW5pdFR3ZWVuKHR3ZWVuLl9zdGFydEF0LCBfdGlueU51bSk7IC8vZW5zdXJlcyB0aGF0IHRoZSBpbml0aWFsIHZhbHVlcyBhcmUgcmVjb3JkZWRcblxuICAgICAgICB9IGVsc2UgaWYgKCF0aW1lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHdlZW4uX3B0ID0gMDtcbiAgICBsYXp5ID0gZHVyICYmIF9pc05vdEZhbHNlKGxhenkpIHx8IGxhenkgJiYgIWR1cjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgZ3NEYXRhID0gdGFyZ2V0Ll9nc2FwIHx8IF9oYXJuZXNzKHRhcmdldHMpW2ldLl9nc2FwO1xuICAgICAgdHdlZW4uX3B0TG9va3VwW2ldID0gcHRMb29rdXAgPSB7fTtcbiAgICAgIF9sYXp5TG9va3VwW2dzRGF0YS5pZF0gJiYgX2xhenlSZW5kZXIoKTsgLy9pZiBvdGhlciB0d2VlbnMgb2YgdGhlIHNhbWUgdGFyZ2V0IGhhdmUgcmVjZW50bHkgaW5pdHRlZCBidXQgaGF2ZW4ndCByZW5kZXJlZCB5ZXQsIHdlJ3ZlIGdvdCB0byBmb3JjZSB0aGUgcmVuZGVyIHNvIHRoYXQgdGhlIHN0YXJ0aW5nIHZhbHVlcyBhcmUgY29ycmVjdCAoaW1hZ2luZSBwb3B1bGF0aW5nIGEgdGltZWxpbmUgd2l0aCBhIGJ1bmNoIG9mIHNlcXVlbnRpYWwgdHdlZW5zIGFuZCB0aGVuIGp1bXBpbmcgdG8gdGhlIGVuZClcblxuICAgICAgaW5kZXggPSBmdWxsVGFyZ2V0cyA9PT0gdGFyZ2V0cyA/IGkgOiBmdWxsVGFyZ2V0cy5pbmRleE9mKHRhcmdldCk7XG5cbiAgICAgIGlmIChoYXJuZXNzICYmIChwbHVnaW4gPSBuZXcgaGFybmVzcygpKS5pbml0KHRhcmdldCwgaGFybmVzc1ZhcnMgfHwgY2xlYW5WYXJzLCB0d2VlbiwgaW5kZXgsIGZ1bGxUYXJnZXRzKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdHdlZW4uX3B0ID0gcHQgPSBuZXcgUHJvcFR3ZWVuKHR3ZWVuLl9wdCwgdGFyZ2V0LCBwbHVnaW4ubmFtZSwgMCwgMSwgcGx1Z2luLnJlbmRlciwgcGx1Z2luLCAwLCBwbHVnaW4ucHJpb3JpdHkpO1xuXG4gICAgICAgIHBsdWdpbi5fcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIHB0TG9va3VwW25hbWVdID0gcHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBsdWdpbi5wcmlvcml0eSAmJiAoaGFzUHJpb3JpdHkgPSAxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFoYXJuZXNzIHx8IGhhcm5lc3NWYXJzKSB7XG4gICAgICAgIGZvciAocCBpbiBjbGVhblZhcnMpIHtcbiAgICAgICAgICBpZiAoX3BsdWdpbnNbcF0gJiYgKHBsdWdpbiA9IF9jaGVja1BsdWdpbihwLCBjbGVhblZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCBmdWxsVGFyZ2V0cykpKSB7XG4gICAgICAgICAgICBwbHVnaW4ucHJpb3JpdHkgJiYgKGhhc1ByaW9yaXR5ID0gMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB0TG9va3VwW3BdID0gcHQgPSBfYWRkUHJvcFR3ZWVuLmNhbGwodHdlZW4sIHRhcmdldCwgcCwgXCJnZXRcIiwgY2xlYW5WYXJzW3BdLCBpbmRleCwgZnVsbFRhcmdldHMsIDAsIHZhcnMuc3RyaW5nRmlsdGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdHdlZW4uX29wICYmIHR3ZWVuLl9vcFtpXSAmJiB0d2Vlbi5raWxsKHRhcmdldCwgdHdlZW4uX29wW2ldKTtcblxuICAgICAgaWYgKGF1dG9PdmVyd3JpdGUgJiYgdHdlZW4uX3B0KSB7XG4gICAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gdHdlZW47XG5cbiAgICAgICAgX2dsb2JhbFRpbWVsaW5lLmtpbGxUd2VlbnNPZih0YXJnZXQsIHB0TG9va3VwLCB0d2Vlbi5nbG9iYWxUaW1lKDApKTsgLy9BbHNvIG1ha2Ugc3VyZSB0aGUgb3ZlcndyaXRpbmcgZG9lc24ndCBvdmVyd3JpdGUgVEhJUyB0d2VlbiEhIVxuXG5cbiAgICAgICAgb3ZlcndyaXR0ZW4gPSAhdHdlZW4ucGFyZW50O1xuICAgICAgICBfb3ZlcndyaXRpbmdUd2VlbiA9IDA7XG4gICAgICB9XG5cbiAgICAgIHR3ZWVuLl9wdCAmJiBsYXp5ICYmIChfbGF6eUxvb2t1cFtnc0RhdGEuaWRdID0gMSk7XG4gICAgfVxuXG4gICAgaGFzUHJpb3JpdHkgJiYgX3NvcnRQcm9wVHdlZW5zQnlQcmlvcml0eSh0d2Vlbik7XG4gICAgdHdlZW4uX29uSW5pdCAmJiB0d2Vlbi5fb25Jbml0KHR3ZWVuKTsgLy9wbHVnaW5zIGxpa2UgUm91bmRQcm9wcyBtdXN0IHdhaXQgdW50aWwgQUxMIG9mIHRoZSBQcm9wVHdlZW5zIGFyZSBpbnN0YW50aWF0ZWQuIEluIHRoZSBwbHVnaW4ncyBpbml0KCkgZnVuY3Rpb24sIGl0IHNldHMgdGhlIF9vbkluaXQgb24gdGhlIHR3ZWVuIGluc3RhbmNlLiBNYXkgbm90IGJlIHByZXR0eS9pbnR1aXRpdmUsIGJ1dCBpdCdzIGZhc3QgYW5kIGtlZXBzIGZpbGUgc2l6ZSBkb3duLlxuICB9XG5cbiAgdHdlZW4uX2Zyb20gPSAhdGwgJiYgISF2YXJzLnJ1bkJhY2t3YXJkczsgLy9uZXN0ZWQgdGltZWxpbmVzIHNob3VsZCBuZXZlciBydW4gYmFja3dhcmRzIC0gdGhlIGJhY2t3YXJkcy1uZXNzIGlzIGluIHRoZSBjaGlsZCB0d2VlbnMuXG5cbiAgdHdlZW4uX29uVXBkYXRlID0gb25VcGRhdGU7XG4gIHR3ZWVuLl9pbml0dGVkID0gKCF0d2Vlbi5fb3AgfHwgdHdlZW4uX3B0KSAmJiAhb3ZlcndyaXR0ZW47IC8vIGlmIG92ZXJ3cml0dGVuUHJvcHMgcmVzdWx0ZWQgaW4gdGhlIGVudGlyZSB0d2VlbiBiZWluZyBraWxsZWQsIGRvIE5PVCBmbGFnIGl0IGFzIGluaXR0ZWQgb3IgZWxzZSBpdCBtYXkgcmVuZGVyIGZvciBvbmUgdGljay5cbn0sXG4gICAgX2FkZEFsaWFzZXNUb1ZhcnMgPSBmdW5jdGlvbiBfYWRkQWxpYXNlc1RvVmFycyh0YXJnZXRzLCB2YXJzKSB7XG4gIHZhciBoYXJuZXNzID0gdGFyZ2V0c1swXSA/IF9nZXRDYWNoZSh0YXJnZXRzWzBdKS5oYXJuZXNzIDogMCxcbiAgICAgIHByb3BlcnR5QWxpYXNlcyA9IGhhcm5lc3MgJiYgaGFybmVzcy5hbGlhc2VzLFxuICAgICAgY29weSxcbiAgICAgIHAsXG4gICAgICBpLFxuICAgICAgYWxpYXNlcztcblxuICBpZiAoIXByb3BlcnR5QWxpYXNlcykge1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbiAgY29weSA9IF9tZXJnZSh7fSwgdmFycyk7XG5cbiAgZm9yIChwIGluIHByb3BlcnR5QWxpYXNlcykge1xuICAgIGlmIChwIGluIGNvcHkpIHtcbiAgICAgIGFsaWFzZXMgPSBwcm9wZXJ0eUFsaWFzZXNbcF0uc3BsaXQoXCIsXCIpO1xuICAgICAgaSA9IGFsaWFzZXMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvcHlbYWxpYXNlc1tpXV0gPSBjb3B5W3BdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICBfcGFyc2VGdW5jT3JTdHJpbmcgPSBmdW5jdGlvbiBfcGFyc2VGdW5jT3JTdHJpbmcodmFsdWUsIHR3ZWVuLCBpLCB0YXJnZXQsIHRhcmdldHMpIHtcbiAgcmV0dXJuIF9pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwodHdlZW4sIGksIHRhcmdldCwgdGFyZ2V0cykgOiBfaXNTdHJpbmcodmFsdWUpICYmIH52YWx1ZS5pbmRleE9mKFwicmFuZG9tKFwiKSA/IF9yZXBsYWNlUmFuZG9tKHZhbHVlKSA6IHZhbHVlO1xufSxcbiAgICBfc3RhZ2dlclR3ZWVuUHJvcHMgPSBfY2FsbGJhY2tOYW1lcyArIFwicmVwZWF0LHJlcGVhdERlbGF5LHlveW8scmVwZWF0UmVmcmVzaCx5b3lvRWFzZVwiLFxuICAgIF9zdGFnZ2VyUHJvcHNUb1NraXAgPSAoX3N0YWdnZXJUd2VlblByb3BzICsgXCIsaWQsc3RhZ2dlcixkZWxheSxkdXJhdGlvbixwYXVzZWQsc2Nyb2xsVHJpZ2dlclwiKS5zcGxpdChcIixcIik7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRXRUVOXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxuZXhwb3J0IHZhciBUd2VlbiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0FuaW1hdGlvbjIpIHtcbiAgX2luaGVyaXRzTG9vc2UoVHdlZW4sIF9BbmltYXRpb24yKTtcblxuICBmdW5jdGlvbiBUd2Vlbih0YXJnZXRzLCB2YXJzLCB0aW1lLCBza2lwSW5oZXJpdCkge1xuICAgIHZhciBfdGhpczM7XG5cbiAgICBpZiAodHlwZW9mIHZhcnMgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRpbWUuZHVyYXRpb24gPSB2YXJzO1xuICAgICAgdmFycyA9IHRpbWU7XG4gICAgICB0aW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICBfdGhpczMgPSBfQW5pbWF0aW9uMi5jYWxsKHRoaXMsIHNraXBJbmhlcml0ID8gdmFycyA6IF9pbmhlcml0RGVmYXVsdHModmFycyksIHRpbWUpIHx8IHRoaXM7XG4gICAgdmFyIF90aGlzMyR2YXJzID0gX3RoaXMzLnZhcnMsXG4gICAgICAgIGR1cmF0aW9uID0gX3RoaXMzJHZhcnMuZHVyYXRpb24sXG4gICAgICAgIGRlbGF5ID0gX3RoaXMzJHZhcnMuZGVsYXksXG4gICAgICAgIGltbWVkaWF0ZVJlbmRlciA9IF90aGlzMyR2YXJzLmltbWVkaWF0ZVJlbmRlcixcbiAgICAgICAgc3RhZ2dlciA9IF90aGlzMyR2YXJzLnN0YWdnZXIsXG4gICAgICAgIG92ZXJ3cml0ZSA9IF90aGlzMyR2YXJzLm92ZXJ3cml0ZSxcbiAgICAgICAga2V5ZnJhbWVzID0gX3RoaXMzJHZhcnMua2V5ZnJhbWVzLFxuICAgICAgICBkZWZhdWx0cyA9IF90aGlzMyR2YXJzLmRlZmF1bHRzLFxuICAgICAgICBzY3JvbGxUcmlnZ2VyID0gX3RoaXMzJHZhcnMuc2Nyb2xsVHJpZ2dlcixcbiAgICAgICAgeW95b0Vhc2UgPSBfdGhpczMkdmFycy55b3lvRWFzZSxcbiAgICAgICAgcGFyZW50ID0gX3RoaXMzLnBhcmVudCxcbiAgICAgICAgcGFyc2VkVGFyZ2V0cyA9IChfaXNBcnJheSh0YXJnZXRzKSB8fCBfaXNUeXBlZEFycmF5KHRhcmdldHMpID8gX2lzTnVtYmVyKHRhcmdldHNbMF0pIDogXCJsZW5ndGhcIiBpbiB2YXJzKSA/IFt0YXJnZXRzXSA6IHRvQXJyYXkodGFyZ2V0cyksXG4gICAgICAgIHRsLFxuICAgICAgICBpLFxuICAgICAgICBjb3B5LFxuICAgICAgICBsLFxuICAgICAgICBwLFxuICAgICAgICBjdXJUYXJnZXQsXG4gICAgICAgIHN0YWdnZXJGdW5jLFxuICAgICAgICBzdGFnZ2VyVmFyc1RvTWVyZ2U7XG4gICAgX3RoaXMzLl90YXJnZXRzID0gcGFyc2VkVGFyZ2V0cy5sZW5ndGggPyBfaGFybmVzcyhwYXJzZWRUYXJnZXRzKSA6IF93YXJuKFwiR1NBUCB0YXJnZXQgXCIgKyB0YXJnZXRzICsgXCIgbm90IGZvdW5kLiBodHRwczovL2dyZWVuc29jay5jb21cIiwgIV9jb25maWcubnVsbFRhcmdldFdhcm4pIHx8IFtdO1xuICAgIF90aGlzMy5fcHRMb29rdXAgPSBbXTsgLy9Qcm9wVHdlZW4gbG9va3VwLiBBbiBhcnJheSBjb250YWluaW5nIGFuIG9iamVjdCBmb3IgZWFjaCB0YXJnZXQsIGhhdmluZyBrZXlzIGZvciBlYWNoIHR3ZWVuaW5nIHByb3BlcnR5XG5cbiAgICBfdGhpczMuX292ZXJ3cml0ZSA9IG92ZXJ3cml0ZTtcblxuICAgIGlmIChrZXlmcmFtZXMgfHwgc3RhZ2dlciB8fCBfaXNGdW5jT3JTdHJpbmcoZHVyYXRpb24pIHx8IF9pc0Z1bmNPclN0cmluZyhkZWxheSkpIHtcbiAgICAgIHZhcnMgPSBfdGhpczMudmFycztcbiAgICAgIHRsID0gX3RoaXMzLnRpbWVsaW5lID0gbmV3IFRpbWVsaW5lKHtcbiAgICAgICAgZGF0YTogXCJuZXN0ZWRcIixcbiAgICAgICAgZGVmYXVsdHM6IGRlZmF1bHRzIHx8IHt9XG4gICAgICB9KTtcbiAgICAgIHRsLmtpbGwoKTtcbiAgICAgIHRsLnBhcmVudCA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKTtcblxuICAgICAgaWYgKGtleWZyYW1lcykge1xuICAgICAgICBfc2V0RGVmYXVsdHModGwudmFycy5kZWZhdWx0cywge1xuICAgICAgICAgIGVhc2U6IFwibm9uZVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGtleWZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChmcmFtZSkge1xuICAgICAgICAgIHJldHVybiB0bC50byhwYXJzZWRUYXJnZXRzLCBmcmFtZSwgXCI+XCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGwgPSBwYXJzZWRUYXJnZXRzLmxlbmd0aDtcbiAgICAgICAgc3RhZ2dlckZ1bmMgPSBzdGFnZ2VyID8gZGlzdHJpYnV0ZShzdGFnZ2VyKSA6IF9lbXB0eUZ1bmM7XG5cbiAgICAgICAgaWYgKF9pc09iamVjdChzdGFnZ2VyKSkge1xuICAgICAgICAgIC8vdXNlcnMgY2FuIHBhc3MgaW4gY2FsbGJhY2tzIGxpa2Ugb25TdGFydC9vbkNvbXBsZXRlIGluIHRoZSBzdGFnZ2VyIG9iamVjdC4gVGhlc2Ugc2hvdWxkIGZpcmUgd2l0aCBlYWNoIGluZGl2aWR1YWwgdHdlZW4uXG4gICAgICAgICAgZm9yIChwIGluIHN0YWdnZXIpIHtcbiAgICAgICAgICAgIGlmICh+X3N0YWdnZXJUd2VlblByb3BzLmluZGV4T2YocCkpIHtcbiAgICAgICAgICAgICAgc3RhZ2dlclZhcnNUb01lcmdlIHx8IChzdGFnZ2VyVmFyc1RvTWVyZ2UgPSB7fSk7XG4gICAgICAgICAgICAgIHN0YWdnZXJWYXJzVG9NZXJnZVtwXSA9IHN0YWdnZXJbcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGNvcHkgPSB7fTtcblxuICAgICAgICAgIGZvciAocCBpbiB2YXJzKSB7XG4gICAgICAgICAgICBpZiAoX3N0YWdnZXJQcm9wc1RvU2tpcC5pbmRleE9mKHApIDwgMCkge1xuICAgICAgICAgICAgICBjb3B5W3BdID0gdmFyc1twXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb3B5LnN0YWdnZXIgPSAwO1xuICAgICAgICAgIHlveW9FYXNlICYmIChjb3B5LnlveW9FYXNlID0geW95b0Vhc2UpO1xuICAgICAgICAgIHN0YWdnZXJWYXJzVG9NZXJnZSAmJiBfbWVyZ2UoY29weSwgc3RhZ2dlclZhcnNUb01lcmdlKTtcbiAgICAgICAgICBjdXJUYXJnZXQgPSBwYXJzZWRUYXJnZXRzW2ldOyAvL2Rvbid0IGp1c3QgY29weSBkdXJhdGlvbiBvciBkZWxheSBiZWNhdXNlIGlmIHRoZXkncmUgYSBzdHJpbmcgb3IgZnVuY3Rpb24sIHdlJ2QgZW5kIHVwIGluIGFuIGluZmluaXRlIGxvb3AgYmVjYXVzZSBfaXNGdW5jT3JTdHJpbmcoKSB3b3VsZCBldmFsdWF0ZSBhcyB0cnVlIGluIHRoZSBjaGlsZCB0d2VlbnMsIGVudGVyaW5nIHRoaXMgbG9vcCwgZXRjLiBTbyB3ZSBwYXJzZSB0aGUgdmFsdWUgc3RyYWlnaHQgZnJvbSB2YXJzIGFuZCBkZWZhdWx0IHRvIDAuXG5cbiAgICAgICAgICBjb3B5LmR1cmF0aW9uID0gK19wYXJzZUZ1bmNPclN0cmluZyhkdXJhdGlvbiwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczMpLCBpLCBjdXJUYXJnZXQsIHBhcnNlZFRhcmdldHMpO1xuICAgICAgICAgIGNvcHkuZGVsYXkgPSAoK19wYXJzZUZ1bmNPclN0cmluZyhkZWxheSwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczMpLCBpLCBjdXJUYXJnZXQsIHBhcnNlZFRhcmdldHMpIHx8IDApIC0gX3RoaXMzLl9kZWxheTtcblxuICAgICAgICAgIGlmICghc3RhZ2dlciAmJiBsID09PSAxICYmIGNvcHkuZGVsYXkpIHtcbiAgICAgICAgICAgIC8vIGlmIHNvbWVvbmUgZG9lcyBkZWxheTpcInJhbmRvbSgxLCA1KVwiLCByZXBlYXQ6LTEsIGZvciBleGFtcGxlLCB0aGUgZGVsYXkgc2hvdWxkbid0IGJlIGluc2lkZSB0aGUgcmVwZWF0LlxuICAgICAgICAgICAgX3RoaXMzLl9kZWxheSA9IGRlbGF5ID0gY29weS5kZWxheTtcbiAgICAgICAgICAgIF90aGlzMy5fc3RhcnQgKz0gZGVsYXk7XG4gICAgICAgICAgICBjb3B5LmRlbGF5ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0bC50byhjdXJUYXJnZXQsIGNvcHksIHN0YWdnZXJGdW5jKGksIGN1clRhcmdldCwgcGFyc2VkVGFyZ2V0cykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGwuZHVyYXRpb24oKSA/IGR1cmF0aW9uID0gZGVsYXkgPSAwIDogX3RoaXMzLnRpbWVsaW5lID0gMDsgLy8gaWYgdGhlIHRpbWVsaW5lJ3MgZHVyYXRpb24gaXMgMCwgd2UgZG9uJ3QgbmVlZCBhIHRpbWVsaW5lIGludGVybmFsbHkhXG4gICAgICB9XG5cbiAgICAgIGR1cmF0aW9uIHx8IF90aGlzMy5kdXJhdGlvbihkdXJhdGlvbiA9IHRsLmR1cmF0aW9uKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpczMudGltZWxpbmUgPSAwOyAvL3NwZWVkIG9wdGltaXphdGlvbiwgZmFzdGVyIGxvb2t1cHMgKG5vIGdvaW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4pXG4gICAgfVxuXG4gICAgaWYgKG92ZXJ3cml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgX292ZXJ3cml0aW5nVHdlZW4gPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMyk7XG5cbiAgICAgIF9nbG9iYWxUaW1lbGluZS5raWxsVHdlZW5zT2YocGFyc2VkVGFyZ2V0cyk7XG5cbiAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gMDtcbiAgICB9XG5cbiAgICBwYXJlbnQgJiYgX3Bvc3RBZGRDaGVja3MocGFyZW50LCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMykpO1xuXG4gICAgaWYgKGltbWVkaWF0ZVJlbmRlciB8fCAhZHVyYXRpb24gJiYgIWtleWZyYW1lcyAmJiBfdGhpczMuX3N0YXJ0ID09PSBfcm91bmQocGFyZW50Ll90aW1lKSAmJiBfaXNOb3RGYWxzZShpbW1lZGlhdGVSZW5kZXIpICYmIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyhfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMykpICYmIHBhcmVudC5kYXRhICE9PSBcIm5lc3RlZFwiKSB7XG4gICAgICBfdGhpczMuX3RUaW1lID0gLV90aW55TnVtOyAvL2ZvcmNlcyBhIHJlbmRlciB3aXRob3V0IGhhdmluZyB0byBzZXQgdGhlIHJlbmRlcigpIFwiZm9yY2VcIiBwYXJhbWV0ZXIgdG8gdHJ1ZSBiZWNhdXNlIHdlIHdhbnQgdG8gYWxsb3cgbGF6eWluZyBieSBkZWZhdWx0ICh1c2luZyB0aGUgXCJmb3JjZVwiIHBhcmFtZXRlciBhbHdheXMgZm9yY2VzIGFuIGltbWVkaWF0ZSBmdWxsIHJlbmRlcilcblxuICAgICAgX3RoaXMzLnJlbmRlcihNYXRoLm1heCgwLCAtZGVsYXkpKTsgLy9pbiBjYXNlIGRlbGF5IGlzIG5lZ2F0aXZlXG5cbiAgICB9XG5cbiAgICBzY3JvbGxUcmlnZ2VyICYmIF9zY3JvbGxUcmlnZ2VyKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKSwgc2Nyb2xsVHJpZ2dlcik7XG4gICAgcmV0dXJuIF90aGlzMztcbiAgfVxuXG4gIHZhciBfcHJvdG8zID0gVHdlZW4ucHJvdG90eXBlO1xuXG4gIF9wcm90bzMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG4gICAgdmFyIHByZXZUaW1lID0gdGhpcy5fdGltZSxcbiAgICAgICAgdER1ciA9IHRoaXMuX3REdXIsXG4gICAgICAgIGR1ciA9IHRoaXMuX2R1cixcbiAgICAgICAgdFRpbWUgPSB0b3RhbFRpbWUgPiB0RHVyIC0gX3RpbnlOdW0gJiYgdG90YWxUaW1lID49IDAgPyB0RHVyIDogdG90YWxUaW1lIDwgX3RpbnlOdW0gPyAwIDogdG90YWxUaW1lLFxuICAgICAgICB0aW1lLFxuICAgICAgICBwdCxcbiAgICAgICAgaXRlcmF0aW9uLFxuICAgICAgICBjeWNsZUR1cmF0aW9uLFxuICAgICAgICBwcmV2SXRlcmF0aW9uLFxuICAgICAgICBpc1lveW8sXG4gICAgICAgIHJhdGlvLFxuICAgICAgICB0aW1lbGluZSxcbiAgICAgICAgeW95b0Vhc2U7XG5cbiAgICBpZiAoIWR1cikge1xuICAgICAgX3JlbmRlclplcm9EdXJhdGlvblR3ZWVuKHRoaXMsIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICB9IGVsc2UgaWYgKHRUaW1lICE9PSB0aGlzLl90VGltZSB8fCAhdG90YWxUaW1lIHx8IGZvcmNlIHx8IHRoaXMuX3N0YXJ0QXQgJiYgdGhpcy5felRpbWUgPCAwICE9PSB0b3RhbFRpbWUgPCAwKSB7XG4gICAgICAvL3RoaXMgc2Vuc2VzIGlmIHdlJ3JlIGNyb3NzaW5nIG92ZXIgdGhlIHN0YXJ0IHRpbWUsIGluIHdoaWNoIGNhc2Ugd2UgbXVzdCByZWNvcmQgX3pUaW1lIGFuZCBmb3JjZSB0aGUgcmVuZGVyLCBidXQgd2UgZG8gaXQgaW4gdGhpcyBsZW5ndGh5IGNvbmRpdGlvbmFsIHdheSBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAodXN1YWxseSB3ZSBjYW4gc2tpcCB0aGUgY2FsY3VsYXRpb25zKTogdGhpcy5faW5pdHRlZCAmJiAodGhpcy5felRpbWUgPCAwKSAhPT0gKHRvdGFsVGltZSA8IDApXG4gICAgICB0aW1lID0gdFRpbWU7XG4gICAgICB0aW1lbGluZSA9IHRoaXMudGltZWxpbmU7XG5cbiAgICAgIGlmICh0aGlzLl9yZXBlYXQpIHtcbiAgICAgICAgLy9hZGp1c3QgdGhlIHRpbWUgZm9yIHJlcGVhdHMgYW5kIHlveW9zXG4gICAgICAgIGN5Y2xlRHVyYXRpb24gPSBkdXIgKyB0aGlzLl9yRGVsYXk7XG4gICAgICAgIHRpbWUgPSBfcm91bmQodFRpbWUgJSBjeWNsZUR1cmF0aW9uKTsgLy9yb3VuZCB0byBhdm9pZCBmbG9hdGluZyBwb2ludCBlcnJvcnMuICg0ICUgMC44IHNob3VsZCBiZSAwIGJ1dCBzb21lIGJyb3dzZXJzIHJlcG9ydCBpdCBhcyAwLjc5OTk5OTk5ISlcblxuICAgICAgICBpZiAodFRpbWUgPT09IHREdXIpIHtcbiAgICAgICAgICAvLyB0aGUgdER1ciA9PT0gdFRpbWUgaXMgZm9yIGVkZ2UgY2FzZXMgd2hlcmUgdGhlcmUncyBhIGxlbmd0aHkgZGVjaW1hbCBvbiB0aGUgZHVyYXRpb24gYW5kIGl0IG1heSByZWFjaCB0aGUgdmVyeSBlbmQgYnV0IHRoZSB0aW1lIGlzIHJlbmRlcmVkIGFzIG5vdC1xdWl0ZS10aGVyZSAocmVtZW1iZXIsIHREdXIgaXMgcm91bmRlZCB0byA0IGRlY2ltYWxzIHdoZXJlYXMgZHVyIGlzbid0KVxuICAgICAgICAgIGl0ZXJhdGlvbiA9IHRoaXMuX3JlcGVhdDtcbiAgICAgICAgICB0aW1lID0gZHVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZXJhdGlvbiA9IH5+KHRUaW1lIC8gY3ljbGVEdXJhdGlvbik7XG5cbiAgICAgICAgICBpZiAoaXRlcmF0aW9uICYmIGl0ZXJhdGlvbiA9PT0gdFRpbWUgLyBjeWNsZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aW1lID0gZHVyO1xuICAgICAgICAgICAgaXRlcmF0aW9uLS07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGltZSA+IGR1ciAmJiAodGltZSA9IGR1cik7XG4gICAgICAgIH1cblxuICAgICAgICBpc1lveW8gPSB0aGlzLl95b3lvICYmIGl0ZXJhdGlvbiAmIDE7XG5cbiAgICAgICAgaWYgKGlzWW95bykge1xuICAgICAgICAgIHlveW9FYXNlID0gdGhpcy5feUVhc2U7XG4gICAgICAgICAgdGltZSA9IGR1ciAtIHRpbWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2SXRlcmF0aW9uID0gX2FuaW1hdGlvbkN5Y2xlKHRoaXMuX3RUaW1lLCBjeWNsZUR1cmF0aW9uKTtcblxuICAgICAgICBpZiAodGltZSA9PT0gcHJldlRpbWUgJiYgIWZvcmNlICYmIHRoaXMuX2luaXR0ZWQpIHtcbiAgICAgICAgICAvL2NvdWxkIGJlIGR1cmluZyB0aGUgcmVwZWF0RGVsYXkgcGFydC4gTm8gbmVlZCB0byByZW5kZXIgYW5kIGZpcmUgY2FsbGJhY2tzLlxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZXJhdGlvbiAhPT0gcHJldkl0ZXJhdGlvbikge1xuICAgICAgICAgIHRpbWVsaW5lICYmIHRoaXMuX3lFYXNlICYmIF9wcm9wYWdhdGVZb3lvRWFzZSh0aW1lbGluZSwgaXNZb3lvKTsgLy9yZXBlYXRSZWZyZXNoIGZ1bmN0aW9uYWxpdHlcblxuICAgICAgICAgIGlmICh0aGlzLnZhcnMucmVwZWF0UmVmcmVzaCAmJiAhaXNZb3lvICYmICF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrID0gZm9yY2UgPSAxOyAvL2ZvcmNlLCBvdGhlcndpc2UgaWYgbGF6eSBpcyB0cnVlLCB0aGUgX2F0dGVtcHRJbml0VHdlZW4oKSB3aWxsIHJldHVybiBhbmQgd2UnbGwganVtcCBvdXQgYW5kIGdldCBjYXVnaHQgYm91bmNpbmcgb24gZWFjaCB0aWNrLlxuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcihfcm91bmQoY3ljbGVEdXJhdGlvbiAqIGl0ZXJhdGlvbiksIHRydWUpLmludmFsaWRhdGUoKS5fbG9jayA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5faW5pdHRlZCkge1xuICAgICAgICBpZiAoX2F0dGVtcHRJbml0VHdlZW4odGhpcywgdG90YWxUaW1lIDwgMCA/IHRvdGFsVGltZSA6IHRpbWUsIGZvcmNlLCBzdXBwcmVzc0V2ZW50cykpIHtcbiAgICAgICAgICB0aGlzLl90VGltZSA9IDA7IC8vIGluIGNvbnN0cnVjdG9yIGlmIGltbWVkaWF0ZVJlbmRlciBpcyB0cnVlLCB3ZSBzZXQgX3RUaW1lIHRvIC1fdGlueU51bSB0byBoYXZlIHRoZSBwbGF5aGVhZCBjcm9zcyB0aGUgc3RhcnRpbmcgcG9pbnQgYnV0IHdlIGNhbid0IGxlYXZlIF90VGltZSBhcyBhIG5lZ2F0aXZlIG51bWJlci5cblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGR1ciAhPT0gdGhpcy5fZHVyKSB7XG4gICAgICAgICAgLy8gd2hpbGUgaW5pdHRpbmcsIGEgcGx1Z2luIGxpa2UgSW5lcnRpYVBsdWdpbiBtaWdodCBhbHRlciB0aGUgZHVyYXRpb24sIHNvIHJlcnVuIGZyb20gdGhlIHN0YXJ0IHRvIGVuc3VyZSBldmVyeXRoaW5nIHJlbmRlcnMgYXMgaXQgc2hvdWxkLlxuICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fdFRpbWUgPSB0VGltZTtcbiAgICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuXG4gICAgICBpZiAoIXRoaXMuX2FjdCAmJiB0aGlzLl90cykge1xuICAgICAgICB0aGlzLl9hY3QgPSAxOyAvL2FzIGxvbmcgYXMgaXQncyBub3QgcGF1c2VkLCBmb3JjZSBpdCB0byBiZSBhY3RpdmUgc28gdGhhdCBpZiB0aGUgdXNlciByZW5kZXJzIGluZGVwZW5kZW50IG9mIHRoZSBwYXJlbnQgdGltZWxpbmUsIGl0J2xsIGJlIGZvcmNlZCB0byByZS1yZW5kZXIgb24gdGhlIG5leHQgdGljay5cblxuICAgICAgICB0aGlzLl9sYXp5ID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yYXRpbyA9IHJhdGlvID0gKHlveW9FYXNlIHx8IHRoaXMuX2Vhc2UpKHRpbWUgLyBkdXIpO1xuXG4gICAgICBpZiAodGhpcy5fZnJvbSkge1xuICAgICAgICB0aGlzLnJhdGlvID0gcmF0aW8gPSAxIC0gcmF0aW87XG4gICAgICB9XG5cbiAgICAgIHRpbWUgJiYgIXByZXZUaW1lICYmICFzdXBwcmVzc0V2ZW50cyAmJiBfY2FsbGJhY2sodGhpcywgXCJvblN0YXJ0XCIpO1xuICAgICAgcHQgPSB0aGlzLl9wdDtcblxuICAgICAgd2hpbGUgKHB0KSB7XG4gICAgICAgIHB0LnIocmF0aW8sIHB0LmQpO1xuICAgICAgICBwdCA9IHB0Ll9uZXh0O1xuICAgICAgfVxuXG4gICAgICB0aW1lbGluZSAmJiB0aW1lbGluZS5yZW5kZXIodG90YWxUaW1lIDwgMCA/IHRvdGFsVGltZSA6ICF0aW1lICYmIGlzWW95byA/IC1fdGlueU51bSA6IHRpbWVsaW5lLl9kdXIgKiByYXRpbywgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB8fCB0aGlzLl9zdGFydEF0ICYmICh0aGlzLl96VGltZSA9IHRvdGFsVGltZSk7XG5cbiAgICAgIGlmICh0aGlzLl9vblVwZGF0ZSAmJiAhc3VwcHJlc3NFdmVudHMpIHtcbiAgICAgICAgdG90YWxUaW1lIDwgMCAmJiB0aGlzLl9zdGFydEF0ICYmIHRoaXMuX3N0YXJ0QXQucmVuZGVyKHRvdGFsVGltZSwgdHJ1ZSwgZm9yY2UpOyAvL25vdGU6IGZvciBwZXJmb3JtYW5jZSByZWFzb25zLCB3ZSB0dWNrIHRoaXMgY29uZGl0aW9uYWwgbG9naWMgaW5zaWRlIGxlc3MgdHJhdmVsZWQgYXJlYXMgKG1vc3QgdHdlZW5zIGRvbid0IGhhdmUgYW4gb25VcGRhdGUpLiBXZSdkIGp1c3QgaGF2ZSBpdCBhdCB0aGUgZW5kIGJlZm9yZSB0aGUgb25Db21wbGV0ZSwgYnV0IHRoZSB2YWx1ZXMgc2hvdWxkIGJlIHVwZGF0ZWQgYmVmb3JlIGFueSBvblVwZGF0ZSBpcyBjYWxsZWQsIHNvIHdlIEFMU08gcHV0IGl0IGhlcmUgYW5kIHRoZW4gaWYgaXQncyBub3QgY2FsbGVkLCB3ZSBkbyBzbyBsYXRlciBuZWFyIHRoZSBvbkNvbXBsZXRlLlxuXG4gICAgICAgIF9jYWxsYmFjayh0aGlzLCBcIm9uVXBkYXRlXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZXBlYXQgJiYgaXRlcmF0aW9uICE9PSBwcmV2SXRlcmF0aW9uICYmIHRoaXMudmFycy5vblJlcGVhdCAmJiAhc3VwcHJlc3NFdmVudHMgJiYgdGhpcy5wYXJlbnQgJiYgX2NhbGxiYWNrKHRoaXMsIFwib25SZXBlYXRcIik7XG5cbiAgICAgIGlmICgodFRpbWUgPT09IHRoaXMuX3REdXIgfHwgIXRUaW1lKSAmJiB0aGlzLl90VGltZSA9PT0gdFRpbWUpIHtcbiAgICAgICAgdG90YWxUaW1lIDwgMCAmJiB0aGlzLl9zdGFydEF0ICYmICF0aGlzLl9vblVwZGF0ZSAmJiB0aGlzLl9zdGFydEF0LnJlbmRlcih0b3RhbFRpbWUsIHRydWUsIHRydWUpO1xuICAgICAgICAodG90YWxUaW1lIHx8ICFkdXIpICYmICh0VGltZSA9PT0gdGhpcy5fdER1ciAmJiB0aGlzLl90cyA+IDAgfHwgIXRUaW1lICYmIHRoaXMuX3RzIDwgMCkgJiYgX3JlbW92ZUZyb21QYXJlbnQodGhpcywgMSk7IC8vIGRvbid0IHJlbW92ZSBpZiB3ZSdyZSByZW5kZXJpbmcgYXQgZXhhY3RseSBhIHRpbWUgb2YgMCwgYXMgdGhlcmUgY291bGQgYmUgYXV0b1JldmVydCB2YWx1ZXMgdGhhdCBzaG91bGQgZ2V0IHNldCBvbiB0aGUgbmV4dCB0aWNrIChpZiB0aGUgcGxheWhlYWQgZ29lcyBiYWNrd2FyZCBiZXlvbmQgdGhlIHN0YXJ0VGltZSwgbmVnYXRpdmUgdG90YWxUaW1lKS4gRG9uJ3QgcmVtb3ZlIGlmIHRoZSB0aW1lbGluZSBpcyByZXZlcnNlZCBhbmQgdGhlIHBsYXloZWFkIGlzbid0IGF0IDAsIG90aGVyd2lzZSB0bC5wcm9ncmVzcygxKS5yZXZlcnNlKCkgd29uJ3Qgd29yay4gT25seSByZW1vdmUgaWYgdGhlIHBsYXloZWFkIGlzIGF0IHRoZSBlbmQgYW5kIHRpbWVTY2FsZSBpcyBwb3NpdGl2ZSwgb3IgaWYgdGhlIHBsYXloZWFkIGlzIGF0IDAgYW5kIHRoZSB0aW1lU2NhbGUgaXMgbmVnYXRpdmUuXG5cbiAgICAgICAgaWYgKCFzdXBwcmVzc0V2ZW50cyAmJiAhKHRvdGFsVGltZSA8IDAgJiYgIXByZXZUaW1lKSAmJiAodFRpbWUgfHwgcHJldlRpbWUpKSB7XG4gICAgICAgICAgLy8gaWYgcHJldlRpbWUgYW5kIHRUaW1lIGFyZSB6ZXJvLCB3ZSBzaG91bGRuJ3QgZmlyZSB0aGUgb25SZXZlcnNlQ29tcGxldGUuIFRoaXMgY291bGQgaGFwcGVuIGlmIHlvdSBnc2FwLnRvKC4uLiB7cGF1c2VkOnRydWV9KS5wbGF5KCk7XG4gICAgICAgICAgX2NhbGxiYWNrKHRoaXMsIHRUaW1lID09PSB0RHVyID8gXCJvbkNvbXBsZXRlXCIgOiBcIm9uUmV2ZXJzZUNvbXBsZXRlXCIsIHRydWUpO1xuXG4gICAgICAgICAgdGhpcy5fcHJvbSAmJiAhKHRUaW1lIDwgdER1ciAmJiB0aGlzLnRpbWVTY2FsZSgpID4gMCkgJiYgdGhpcy5fcHJvbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMy50YXJnZXRzID0gZnVuY3Rpb24gdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfTtcblxuICBfcHJvdG8zLmludmFsaWRhdGUgPSBmdW5jdGlvbiBpbnZhbGlkYXRlKCkge1xuICAgIHRoaXMuX3B0ID0gdGhpcy5fb3AgPSB0aGlzLl9zdGFydEF0ID0gdGhpcy5fb25VcGRhdGUgPSB0aGlzLl9hY3QgPSB0aGlzLl9sYXp5ID0gMDtcbiAgICB0aGlzLl9wdExvb2t1cCA9IFtdO1xuICAgIHRoaXMudGltZWxpbmUgJiYgdGhpcy50aW1lbGluZS5pbnZhbGlkYXRlKCk7XG4gICAgcmV0dXJuIF9BbmltYXRpb24yLnByb3RvdHlwZS5pbnZhbGlkYXRlLmNhbGwodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvMy5raWxsID0gZnVuY3Rpb24ga2lsbCh0YXJnZXRzLCB2YXJzKSB7XG4gICAgaWYgKHZhcnMgPT09IHZvaWQgMCkge1xuICAgICAgdmFycyA9IFwiYWxsXCI7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRzICYmICghdmFycyB8fCB2YXJzID09PSBcImFsbFwiKSkge1xuICAgICAgdGhpcy5fbGF6eSA9IDA7XG5cbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICByZXR1cm4gX2ludGVycnVwdCh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy50aW1lbGluZSkge1xuICAgICAgdmFyIHREdXIgPSB0aGlzLnRpbWVsaW5lLnRvdGFsRHVyYXRpb24oKTtcbiAgICAgIHRoaXMudGltZWxpbmUua2lsbFR3ZWVuc09mKHRhcmdldHMsIHZhcnMsIF9vdmVyd3JpdGluZ1R3ZWVuICYmIF9vdmVyd3JpdGluZ1R3ZWVuLnZhcnMub3ZlcndyaXRlICE9PSB0cnVlKS5fZmlyc3QgfHwgX2ludGVycnVwdCh0aGlzKTsgLy8gaWYgbm90aGluZyBpcyBsZWZ0IHR3ZWVubmcsIGludGVycnVwdC5cblxuICAgICAgdGhpcy5wYXJlbnQgJiYgdER1ciAhPT0gdGhpcy50aW1lbGluZS50b3RhbER1cmF0aW9uKCkgJiYgX3NldER1cmF0aW9uKHRoaXMsIHRoaXMuX2R1ciAqIHRoaXMudGltZWxpbmUuX3REdXIgLyB0RHVyLCAwLCAxKTsgLy8gaWYgYSBuZXN0ZWQgdHdlZW4gaXMga2lsbGVkIHRoYXQgY2hhbmdlcyB0aGUgZHVyYXRpb24sIGl0IHNob3VsZCBhZmZlY3QgdGhpcyB0d2VlbidzIGR1cmF0aW9uLiBXZSBtdXN0IHVzZSB0aGUgcmF0aW8sIHRob3VnaCwgYmVjYXVzZSBzb21ldGltZXMgdGhlIGludGVybmFsIHRpbWVsaW5lIGlzIHN0cmV0Y2hlZCBsaWtlIGZvciBrZXlmcmFtZXMgd2hlcmUgdGhleSBkb24ndCBhbGwgYWRkIHVwIHRvIHdoYXRldmVyIHRoZSBwYXJlbnQgdHdlZW4ncyBkdXJhdGlvbiB3YXMgc2V0IHRvLlxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgcGFyc2VkVGFyZ2V0cyA9IHRoaXMuX3RhcmdldHMsXG4gICAgICAgIGtpbGxpbmdUYXJnZXRzID0gdGFyZ2V0cyA/IHRvQXJyYXkodGFyZ2V0cykgOiBwYXJzZWRUYXJnZXRzLFxuICAgICAgICBwcm9wVHdlZW5Mb29rdXAgPSB0aGlzLl9wdExvb2t1cCxcbiAgICAgICAgZmlyc3RQVCA9IHRoaXMuX3B0LFxuICAgICAgICBvdmVyd3JpdHRlblByb3BzLFxuICAgICAgICBjdXJMb29rdXAsXG4gICAgICAgIGN1ck92ZXJ3cml0ZVByb3BzLFxuICAgICAgICBwcm9wcyxcbiAgICAgICAgcCxcbiAgICAgICAgcHQsXG4gICAgICAgIGk7XG5cbiAgICBpZiAoKCF2YXJzIHx8IHZhcnMgPT09IFwiYWxsXCIpICYmIF9hcnJheXNNYXRjaChwYXJzZWRUYXJnZXRzLCBraWxsaW5nVGFyZ2V0cykpIHtcbiAgICAgIHZhcnMgPT09IFwiYWxsXCIgJiYgKHRoaXMuX3B0ID0gMCk7XG4gICAgICByZXR1cm4gX2ludGVycnVwdCh0aGlzKTtcbiAgICB9XG5cbiAgICBvdmVyd3JpdHRlblByb3BzID0gdGhpcy5fb3AgPSB0aGlzLl9vcCB8fCBbXTtcblxuICAgIGlmICh2YXJzICE9PSBcImFsbFwiKSB7XG4gICAgICAvL3NvIHBlb3BsZSBjYW4gcGFzcyBpbiBhIGNvbW1hLWRlbGltaXRlZCBsaXN0IG9mIHByb3BlcnR5IG5hbWVzXG4gICAgICBpZiAoX2lzU3RyaW5nKHZhcnMpKSB7XG4gICAgICAgIHAgPSB7fTtcblxuICAgICAgICBfZm9yRWFjaE5hbWUodmFycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gcFtuYW1lXSA9IDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhcnMgPSBwO1xuICAgICAgfVxuXG4gICAgICB2YXJzID0gX2FkZEFsaWFzZXNUb1ZhcnMocGFyc2VkVGFyZ2V0cywgdmFycyk7XG4gICAgfVxuXG4gICAgaSA9IHBhcnNlZFRhcmdldHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKH5raWxsaW5nVGFyZ2V0cy5pbmRleE9mKHBhcnNlZFRhcmdldHNbaV0pKSB7XG4gICAgICAgIGN1ckxvb2t1cCA9IHByb3BUd2Vlbkxvb2t1cFtpXTtcblxuICAgICAgICBpZiAodmFycyA9PT0gXCJhbGxcIikge1xuICAgICAgICAgIG92ZXJ3cml0dGVuUHJvcHNbaV0gPSB2YXJzO1xuICAgICAgICAgIHByb3BzID0gY3VyTG9va3VwO1xuICAgICAgICAgIGN1ck92ZXJ3cml0ZVByb3BzID0ge307XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHMgPSBvdmVyd3JpdHRlblByb3BzW2ldID0gb3ZlcndyaXR0ZW5Qcm9wc1tpXSB8fCB7fTtcbiAgICAgICAgICBwcm9wcyA9IHZhcnM7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHAgaW4gcHJvcHMpIHtcbiAgICAgICAgICBwdCA9IGN1ckxvb2t1cCAmJiBjdXJMb29rdXBbcF07XG5cbiAgICAgICAgICBpZiAocHQpIHtcbiAgICAgICAgICAgIGlmICghKFwia2lsbFwiIGluIHB0LmQpIHx8IHB0LmQua2lsbChwKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0odGhpcywgcHQsIFwiX3B0XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgY3VyTG9va3VwW3BdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjdXJPdmVyd3JpdGVQcm9wcyAhPT0gXCJhbGxcIikge1xuICAgICAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHNbcF0gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2luaXR0ZWQgJiYgIXRoaXMuX3B0ICYmIGZpcnN0UFQgJiYgX2ludGVycnVwdCh0aGlzKTsgLy9pZiBhbGwgdHdlZW5pbmcgcHJvcGVydGllcyBhcmUga2lsbGVkLCBraWxsIHRoZSB0d2Vlbi4gV2l0aG91dCB0aGlzIGxpbmUsIGlmIHRoZXJlJ3MgYSB0d2VlbiB3aXRoIG11bHRpcGxlIHRhcmdldHMgYW5kIHRoZW4geW91IGtpbGxUd2VlbnNPZigpIGVhY2ggdGFyZ2V0IGluZGl2aWR1YWxseSwgdGhlIHR3ZWVuIHdvdWxkIHRlY2huaWNhbGx5IHN0aWxsIHJlbWFpbiBhY3RpdmUgYW5kIGZpcmUgaXRzIG9uQ29tcGxldGUgZXZlbiB0aG91Z2ggdGhlcmUgYXJlbid0IGFueSBtb3JlIHByb3BlcnRpZXMgdHdlZW5pbmcuXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBUd2Vlbi50byA9IGZ1bmN0aW9uIHRvKHRhcmdldHMsIHZhcnMpIHtcbiAgICByZXR1cm4gbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMsIGFyZ3VtZW50c1syXSk7XG4gIH07XG5cbiAgVHdlZW4uZnJvbSA9IGZ1bmN0aW9uIGZyb20odGFyZ2V0cywgdmFycykge1xuICAgIHJldHVybiBuZXcgVHdlZW4odGFyZ2V0cywgX3BhcnNlVmFycyhhcmd1bWVudHMsIDEpKTtcbiAgfTtcblxuICBUd2Vlbi5kZWxheWVkQ2FsbCA9IGZ1bmN0aW9uIGRlbGF5ZWRDYWxsKGRlbGF5LCBjYWxsYmFjaywgcGFyYW1zLCBzY29wZSkge1xuICAgIHJldHVybiBuZXcgVHdlZW4oY2FsbGJhY2ssIDAsIHtcbiAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICBsYXp5OiBmYWxzZSxcbiAgICAgIG92ZXJ3cml0ZTogZmFsc2UsXG4gICAgICBkZWxheTogZGVsYXksXG4gICAgICBvbkNvbXBsZXRlOiBjYWxsYmFjayxcbiAgICAgIG9uUmV2ZXJzZUNvbXBsZXRlOiBjYWxsYmFjayxcbiAgICAgIG9uQ29tcGxldGVQYXJhbXM6IHBhcmFtcyxcbiAgICAgIG9uUmV2ZXJzZUNvbXBsZXRlUGFyYW1zOiBwYXJhbXMsXG4gICAgICBjYWxsYmFja1Njb3BlOiBzY29wZVxuICAgIH0pO1xuICB9O1xuXG4gIFR3ZWVuLmZyb21UbyA9IGZ1bmN0aW9uIGZyb21Ubyh0YXJnZXRzLCBmcm9tVmFycywgdG9WYXJzKSB7XG4gICAgcmV0dXJuIG5ldyBUd2Vlbih0YXJnZXRzLCBfcGFyc2VWYXJzKGFyZ3VtZW50cywgMikpO1xuICB9O1xuXG4gIFR3ZWVuLnNldCA9IGZ1bmN0aW9uIHNldCh0YXJnZXRzLCB2YXJzKSB7XG4gICAgdmFycy5kdXJhdGlvbiA9IDA7XG4gICAgdmFycy5yZXBlYXREZWxheSB8fCAodmFycy5yZXBlYXQgPSAwKTtcbiAgICByZXR1cm4gbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMpO1xuICB9O1xuXG4gIFR3ZWVuLmtpbGxUd2VlbnNPZiA9IGZ1bmN0aW9uIGtpbGxUd2VlbnNPZih0YXJnZXRzLCBwcm9wcywgb25seUFjdGl2ZSkge1xuICAgIHJldHVybiBfZ2xvYmFsVGltZWxpbmUua2lsbFR3ZWVuc09mKHRhcmdldHMsIHByb3BzLCBvbmx5QWN0aXZlKTtcbiAgfTtcblxuICByZXR1cm4gVHdlZW47XG59KEFuaW1hdGlvbik7XG5cbl9zZXREZWZhdWx0cyhUd2Vlbi5wcm90b3R5cGUsIHtcbiAgX3RhcmdldHM6IFtdLFxuICBfbGF6eTogMCxcbiAgX3N0YXJ0QXQ6IDAsXG4gIF9vcDogMCxcbiAgX29uSW5pdDogMFxufSk7IC8vYWRkIHRoZSBwZXJ0aW5lbnQgdGltZWxpbmUgbWV0aG9kcyB0byBUd2VlbiBpbnN0YW5jZXMgc28gdGhhdCB1c2VycyBjYW4gY2hhaW4gY29udmVuaWVudGx5IGFuZCBjcmVhdGUgYSB0aW1lbGluZSBhdXRvbWF0aWNhbGx5LiAocmVtb3ZlZCBkdWUgdG8gY29uY2VybnMgdGhhdCBpdCdkIHVsdGltYXRlbHkgYWRkIHRvIG1vcmUgY29uZnVzaW9uIGVzcGVjaWFsbHkgZm9yIGJlZ2lubmVycylcbi8vIF9mb3JFYWNoTmFtZShcInRvLGZyb20sZnJvbVRvLHNldCxjYWxsLGFkZCxhZGRMYWJlbCxhZGRQYXVzZVwiLCBuYW1lID0+IHtcbi8vIFx0VHdlZW4ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4vLyBcdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lKCk7XG4vLyBcdFx0cmV0dXJuIF9hZGRUb1RpbWVsaW5lKHRsLCB0aGlzKVtuYW1lXS5hcHBseSh0bCwgdG9BcnJheShhcmd1bWVudHMpKTtcbi8vIFx0fVxuLy8gfSk7XG4vL2ZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LiBMZXZlcmFnZSB0aGUgdGltZWxpbmUgY2FsbHMuXG5cblxuX2ZvckVhY2hOYW1lKFwic3RhZ2dlclRvLHN0YWdnZXJGcm9tLHN0YWdnZXJGcm9tVG9cIiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgVHdlZW5bbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRsID0gbmV3IFRpbWVsaW5lKCksXG4gICAgICAgIHBhcmFtcyA9IF9zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICBwYXJhbXMuc3BsaWNlKG5hbWUgPT09IFwic3RhZ2dlckZyb21Ub1wiID8gNSA6IDQsIDAsIDApO1xuICAgIHJldHVybiB0bFtuYW1lXS5hcHBseSh0bCwgcGFyYW1zKTtcbiAgfTtcbn0pO1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQUk9QVFdFRU5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG52YXIgX3NldHRlclBsYWluID0gZnVuY3Rpb24gX3NldHRlclBsYWluKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG59LFxuICAgIF9zZXR0ZXJGdW5jID0gZnVuY3Rpb24gX3NldHRlckZ1bmModGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldFtwcm9wZXJ0eV0odmFsdWUpO1xufSxcbiAgICBfc2V0dGVyRnVuY1dpdGhQYXJhbSA9IGZ1bmN0aW9uIF9zZXR0ZXJGdW5jV2l0aFBhcmFtKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCBkYXRhKSB7XG4gIHJldHVybiB0YXJnZXRbcHJvcGVydHldKGRhdGEuZnAsIHZhbHVlKTtcbn0sXG4gICAgX3NldHRlckF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9zZXR0ZXJBdHRyaWJ1dGUodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5zZXRBdHRyaWJ1dGUocHJvcGVydHksIHZhbHVlKTtcbn0sXG4gICAgX2dldFNldHRlciA9IGZ1bmN0aW9uIF9nZXRTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICByZXR1cm4gX2lzRnVuY3Rpb24odGFyZ2V0W3Byb3BlcnR5XSkgPyBfc2V0dGVyRnVuYyA6IF9pc1VuZGVmaW5lZCh0YXJnZXRbcHJvcGVydHldKSAmJiB0YXJnZXQuc2V0QXR0cmlidXRlID8gX3NldHRlckF0dHJpYnV0ZSA6IF9zZXR0ZXJQbGFpbjtcbn0sXG4gICAgX3JlbmRlclBsYWluID0gZnVuY3Rpb24gX3JlbmRlclBsYWluKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgTWF0aC5yb3VuZCgoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pICogMTAwMDApIC8gMTAwMDAsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyQm9vbGVhbiA9IGZ1bmN0aW9uIF9yZW5kZXJCb29sZWFuKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgISEoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pLCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlckNvbXBsZXhTdHJpbmcgPSBmdW5jdGlvbiBfcmVuZGVyQ29tcGxleFN0cmluZyhyYXRpbywgZGF0YSkge1xuICB2YXIgcHQgPSBkYXRhLl9wdCxcbiAgICAgIHMgPSBcIlwiO1xuXG4gIGlmICghcmF0aW8gJiYgZGF0YS5iKSB7XG4gICAgLy9iID0gYmVnaW5uaW5nIHN0cmluZ1xuICAgIHMgPSBkYXRhLmI7XG4gIH0gZWxzZSBpZiAocmF0aW8gPT09IDEgJiYgZGF0YS5lKSB7XG4gICAgLy9lID0gZW5kaW5nIHN0cmluZ1xuICAgIHMgPSBkYXRhLmU7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHB0KSB7XG4gICAgICBzID0gcHQucCArIChwdC5tID8gcHQubShwdC5zICsgcHQuYyAqIHJhdGlvKSA6IE1hdGgucm91bmQoKHB0LnMgKyBwdC5jICogcmF0aW8pICogMTAwMDApIC8gMTAwMDApICsgczsgLy93ZSB1c2UgdGhlIFwicFwiIHByb3BlcnR5IGZvciB0aGUgdGV4dCBpbmJldHdlZW4gKGxpa2UgYSBzdWZmaXgpLiBBbmQgaW4gdGhlIGNvbnRleHQgb2YgYSBjb21wbGV4IHN0cmluZywgdGhlIG1vZGlmaWVyIChtKSBpcyB0eXBpY2FsbHkganVzdCBNYXRoLnJvdW5kKCksIGxpa2UgZm9yIFJHQiBjb2xvcnMuXG5cbiAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgfVxuXG4gICAgcyArPSBkYXRhLmM7IC8vd2UgdXNlIHRoZSBcImNcIiBvZiB0aGUgUHJvcFR3ZWVuIHRvIHN0b3JlIHRoZSBmaW5hbCBjaHVuayBvZiBub24tbnVtZXJpYyB0ZXh0LlxuICB9XG5cbiAgZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIHMsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyUHJvcFR3ZWVucyA9IGZ1bmN0aW9uIF9yZW5kZXJQcm9wVHdlZW5zKHJhdGlvLCBkYXRhKSB7XG4gIHZhciBwdCA9IGRhdGEuX3B0O1xuXG4gIHdoaWxlIChwdCkge1xuICAgIHB0LnIocmF0aW8sIHB0LmQpO1xuICAgIHB0ID0gcHQuX25leHQ7XG4gIH1cbn0sXG4gICAgX2FkZFBsdWdpbk1vZGlmaWVyID0gZnVuY3Rpb24gX2FkZFBsdWdpbk1vZGlmaWVyKG1vZGlmaWVyLCB0d2VlbiwgdGFyZ2V0LCBwcm9wZXJ0eSkge1xuICB2YXIgcHQgPSB0aGlzLl9wdCxcbiAgICAgIG5leHQ7XG5cbiAgd2hpbGUgKHB0KSB7XG4gICAgbmV4dCA9IHB0Ll9uZXh0O1xuICAgIHB0LnAgPT09IHByb3BlcnR5ICYmIHB0Lm1vZGlmaWVyKG1vZGlmaWVyLCB0d2VlbiwgdGFyZ2V0KTtcbiAgICBwdCA9IG5leHQ7XG4gIH1cbn0sXG4gICAgX2tpbGxQcm9wVHdlZW5zT2YgPSBmdW5jdGlvbiBfa2lsbFByb3BUd2VlbnNPZihwcm9wZXJ0eSkge1xuICB2YXIgcHQgPSB0aGlzLl9wdCxcbiAgICAgIGhhc05vbkRlcGVuZGVudFJlbWFpbmluZyxcbiAgICAgIG5leHQ7XG5cbiAgd2hpbGUgKHB0KSB7XG4gICAgbmV4dCA9IHB0Ll9uZXh0O1xuXG4gICAgaWYgKHB0LnAgPT09IHByb3BlcnR5ICYmICFwdC5vcCB8fCBwdC5vcCA9PT0gcHJvcGVydHkpIHtcbiAgICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSh0aGlzLCBwdCwgXCJfcHRcIik7XG4gICAgfSBlbHNlIGlmICghcHQuZGVwKSB7XG4gICAgICBoYXNOb25EZXBlbmRlbnRSZW1haW5pbmcgPSAxO1xuICAgIH1cblxuICAgIHB0ID0gbmV4dDtcbiAgfVxuXG4gIHJldHVybiAhaGFzTm9uRGVwZW5kZW50UmVtYWluaW5nO1xufSxcbiAgICBfc2V0dGVyV2l0aE1vZGlmaWVyID0gZnVuY3Rpb24gX3NldHRlcldpdGhNb2RpZmllcih0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgZGF0YSkge1xuICBkYXRhLm1TZXQodGFyZ2V0LCBwcm9wZXJ0eSwgZGF0YS5tLmNhbGwoZGF0YS50d2VlbiwgdmFsdWUsIGRhdGEubXQpLCBkYXRhKTtcbn0sXG4gICAgX3NvcnRQcm9wVHdlZW5zQnlQcmlvcml0eSA9IGZ1bmN0aW9uIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHkocGFyZW50KSB7XG4gIHZhciBwdCA9IHBhcmVudC5fcHQsXG4gICAgICBuZXh0LFxuICAgICAgcHQyLFxuICAgICAgZmlyc3QsXG4gICAgICBsYXN0OyAvL3NvcnRzIHRoZSBQcm9wVHdlZW4gbGlua2VkIGxpc3QgaW4gb3JkZXIgb2YgcHJpb3JpdHkgYmVjYXVzZSBzb21lIHBsdWdpbnMgbmVlZCB0byBkbyB0aGVpciB3b3JrIGFmdGVyIEFMTCBvZiB0aGUgUHJvcFR3ZWVucyB3ZXJlIGNyZWF0ZWQgKGxpa2UgUm91bmRQcm9wc1BsdWdpbiBhbmQgTW9kaWZpZXJzUGx1Z2luKVxuXG4gIHdoaWxlIChwdCkge1xuICAgIG5leHQgPSBwdC5fbmV4dDtcbiAgICBwdDIgPSBmaXJzdDtcblxuICAgIHdoaWxlIChwdDIgJiYgcHQyLnByID4gcHQucHIpIHtcbiAgICAgIHB0MiA9IHB0Mi5fbmV4dDtcbiAgICB9XG5cbiAgICBpZiAocHQuX3ByZXYgPSBwdDIgPyBwdDIuX3ByZXYgOiBsYXN0KSB7XG4gICAgICBwdC5fcHJldi5fbmV4dCA9IHB0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdCA9IHB0O1xuICAgIH1cblxuICAgIGlmIChwdC5fbmV4dCA9IHB0Mikge1xuICAgICAgcHQyLl9wcmV2ID0gcHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3QgPSBwdDtcbiAgICB9XG5cbiAgICBwdCA9IG5leHQ7XG4gIH1cblxuICBwYXJlbnQuX3B0ID0gZmlyc3Q7XG59OyAvL1Byb3BUd2VlbiBrZXk6IHQgPSB0YXJnZXQsIHAgPSBwcm9wLCByID0gcmVuZGVyZXIsIGQgPSBkYXRhLCBzID0gc3RhcnQsIGMgPSBjaGFuZ2UsIG9wID0gb3ZlcndyaXRlUHJvcGVydHkgKE9OTFkgcG9wdWxhdGVkIHdoZW4gaXQncyBkaWZmZXJlbnQgdGhhbiBwKSwgcHIgPSBwcmlvcml0eSwgX25leHQvX3ByZXYgZm9yIHRoZSBsaW5rZWQgbGlzdCBzaWJsaW5ncywgc2V0ID0gc2V0dGVyLCBtID0gbW9kaWZpZXIsIG1TZXQgPSBtb2RpZmllclNldHRlciAodGhlIG9yaWdpbmFsIHNldHRlciwgYmVmb3JlIGEgbW9kaWZpZXIgd2FzIGFkZGVkKVxuXG5cbmV4cG9ydCB2YXIgUHJvcFR3ZWVuID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUHJvcFR3ZWVuKG5leHQsIHRhcmdldCwgcHJvcCwgc3RhcnQsIGNoYW5nZSwgcmVuZGVyZXIsIGRhdGEsIHNldHRlciwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgdGhpcy5zID0gc3RhcnQ7XG4gICAgdGhpcy5jID0gY2hhbmdlO1xuICAgIHRoaXMucCA9IHByb3A7XG4gICAgdGhpcy5yID0gcmVuZGVyZXIgfHwgX3JlbmRlclBsYWluO1xuICAgIHRoaXMuZCA9IGRhdGEgfHwgdGhpcztcbiAgICB0aGlzLnNldCA9IHNldHRlciB8fCBfc2V0dGVyUGxhaW47XG4gICAgdGhpcy5wciA9IHByaW9yaXR5IHx8IDA7XG4gICAgdGhpcy5fbmV4dCA9IG5leHQ7XG5cbiAgICBpZiAobmV4dCkge1xuICAgICAgbmV4dC5fcHJldiA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgdmFyIF9wcm90bzQgPSBQcm9wVHdlZW4ucHJvdG90eXBlO1xuXG4gIF9wcm90bzQubW9kaWZpZXIgPSBmdW5jdGlvbiBtb2RpZmllcihmdW5jLCB0d2VlbiwgdGFyZ2V0KSB7XG4gICAgdGhpcy5tU2V0ID0gdGhpcy5tU2V0IHx8IHRoaXMuc2V0OyAvL2luIGNhc2UgaXQgd2FzIGFscmVhZHkgc2V0IChhIFByb3BUd2VlbiBjYW4gb25seSBoYXZlIG9uZSBtb2RpZmllcilcblxuICAgIHRoaXMuc2V0ID0gX3NldHRlcldpdGhNb2RpZmllcjtcbiAgICB0aGlzLm0gPSBmdW5jO1xuICAgIHRoaXMubXQgPSB0YXJnZXQ7IC8vbW9kaWZpZXIgdGFyZ2V0XG5cbiAgICB0aGlzLnR3ZWVuID0gdHdlZW47XG4gIH07XG5cbiAgcmV0dXJuIFByb3BUd2Vlbjtcbn0oKTsgLy9Jbml0aWFsaXphdGlvbiB0YXNrc1xuXG5fZm9yRWFjaE5hbWUoX2NhbGxiYWNrTmFtZXMgKyBcInBhcmVudCxkdXJhdGlvbixlYXNlLGRlbGF5LG92ZXJ3cml0ZSxydW5CYWNrd2FyZHMsc3RhcnRBdCx5b3lvLGltbWVkaWF0ZVJlbmRlcixyZXBlYXQscmVwZWF0RGVsYXksZGF0YSxwYXVzZWQscmV2ZXJzZWQsbGF6eSxjYWxsYmFja1Njb3BlLHN0cmluZ0ZpbHRlcixpZCx5b3lvRWFzZSxzdGFnZ2VyLGluaGVyaXQscmVwZWF0UmVmcmVzaCxrZXlmcmFtZXMsYXV0b1JldmVydCxzY3JvbGxUcmlnZ2VyXCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBfcmVzZXJ2ZWRQcm9wc1tuYW1lXSA9IDE7XG59KTtcblxuX2dsb2JhbHMuVHdlZW5NYXggPSBfZ2xvYmFscy5Ud2VlbkxpdGUgPSBUd2Vlbjtcbl9nbG9iYWxzLlRpbWVsaW5lTGl0ZSA9IF9nbG9iYWxzLlRpbWVsaW5lTWF4ID0gVGltZWxpbmU7XG5fZ2xvYmFsVGltZWxpbmUgPSBuZXcgVGltZWxpbmUoe1xuICBzb3J0Q2hpbGRyZW46IGZhbHNlLFxuICBkZWZhdWx0czogX2RlZmF1bHRzLFxuICBhdXRvUmVtb3ZlQ2hpbGRyZW46IHRydWUsXG4gIGlkOiBcInJvb3RcIixcbiAgc21vb3RoQ2hpbGRUaW1pbmc6IHRydWVcbn0pO1xuX2NvbmZpZy5zdHJpbmdGaWx0ZXIgPSBfY29sb3JTdHJpbmdGaWx0ZXI7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEdTQVBcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIF9nc2FwID0ge1xuICByZWdpc3RlclBsdWdpbjogZnVuY3Rpb24gcmVnaXN0ZXJQbHVnaW4oKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgIHJldHVybiBfY3JlYXRlUGx1Z2luKGNvbmZpZyk7XG4gICAgfSk7XG4gIH0sXG4gIHRpbWVsaW5lOiBmdW5jdGlvbiB0aW1lbGluZSh2YXJzKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lbGluZSh2YXJzKTtcbiAgfSxcbiAgZ2V0VHdlZW5zT2Y6IGZ1bmN0aW9uIGdldFR3ZWVuc09mKHRhcmdldHMsIG9ubHlBY3RpdmUpIHtcbiAgICByZXR1cm4gX2dsb2JhbFRpbWVsaW5lLmdldFR3ZWVuc09mKHRhcmdldHMsIG9ubHlBY3RpdmUpO1xuICB9LFxuICBnZXRQcm9wZXJ0eTogZnVuY3Rpb24gZ2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkge1xuICAgIF9pc1N0cmluZyh0YXJnZXQpICYmICh0YXJnZXQgPSB0b0FycmF5KHRhcmdldClbMF0pOyAvL2luIGNhc2Ugc2VsZWN0b3IgdGV4dCBvciBhbiBhcnJheSBpcyBwYXNzZWQgaW5cblxuICAgIHZhciBnZXR0ZXIgPSBfZ2V0Q2FjaGUodGFyZ2V0IHx8IHt9KS5nZXQsXG4gICAgICAgIGZvcm1hdCA9IHVuaXQgPyBfcGFzc1Rocm91Z2ggOiBfbnVtZXJpY0lmUG9zc2libGU7XG5cbiAgICB1bml0ID09PSBcIm5hdGl2ZVwiICYmICh1bml0ID0gXCJcIik7XG4gICAgcmV0dXJuICF0YXJnZXQgPyB0YXJnZXQgOiAhcHJvcGVydHkgPyBmdW5jdGlvbiAocHJvcGVydHksIHVuaXQsIHVuY2FjaGUpIHtcbiAgICAgIHJldHVybiBmb3JtYXQoKF9wbHVnaW5zW3Byb3BlcnR5XSAmJiBfcGx1Z2luc1twcm9wZXJ0eV0uZ2V0IHx8IGdldHRlcikodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkpO1xuICAgIH0gOiBmb3JtYXQoKF9wbHVnaW5zW3Byb3BlcnR5XSAmJiBfcGx1Z2luc1twcm9wZXJ0eV0uZ2V0IHx8IGdldHRlcikodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkpO1xuICB9LFxuICBxdWlja1NldHRlcjogZnVuY3Rpb24gcXVpY2tTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCkge1xuICAgIHRhcmdldCA9IHRvQXJyYXkodGFyZ2V0KTtcblxuICAgIGlmICh0YXJnZXQubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIHNldHRlcnMgPSB0YXJnZXQubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiBnc2FwLnF1aWNrU2V0dGVyKHQsIHByb3BlcnR5LCB1bml0KTtcbiAgICAgIH0pLFxuICAgICAgICAgIGwgPSBzZXR0ZXJzLmxlbmd0aDtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGkgPSBsO1xuXG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBzZXR0ZXJzW2ldKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0YXJnZXQgPSB0YXJnZXRbMF0gfHwge307XG5cbiAgICB2YXIgUGx1Z2luID0gX3BsdWdpbnNbcHJvcGVydHldLFxuICAgICAgICBjYWNoZSA9IF9nZXRDYWNoZSh0YXJnZXQpLFxuICAgICAgICBwID0gY2FjaGUuaGFybmVzcyAmJiAoY2FjaGUuaGFybmVzcy5hbGlhc2VzIHx8IHt9KVtwcm9wZXJ0eV0gfHwgcHJvcGVydHksXG4gICAgICAgIC8vIGluIGNhc2UgaXQncyBhbiBhbGlhcywgbGlrZSBcInJvdGF0ZVwiIGZvciBcInJvdGF0aW9uXCIuXG4gICAgc2V0dGVyID0gUGx1Z2luID8gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB2YXIgcCA9IG5ldyBQbHVnaW4oKTtcbiAgICAgIF9xdWlja1R3ZWVuLl9wdCA9IDA7XG4gICAgICBwLmluaXQodGFyZ2V0LCB1bml0ID8gdmFsdWUgKyB1bml0IDogdmFsdWUsIF9xdWlja1R3ZWVuLCAwLCBbdGFyZ2V0XSk7XG4gICAgICBwLnJlbmRlcigxLCBwKTtcbiAgICAgIF9xdWlja1R3ZWVuLl9wdCAmJiBfcmVuZGVyUHJvcFR3ZWVucygxLCBfcXVpY2tUd2Vlbik7XG4gICAgfSA6IGNhY2hlLnNldCh0YXJnZXQsIHApO1xuXG4gICAgcmV0dXJuIFBsdWdpbiA/IHNldHRlciA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHNldHRlcih0YXJnZXQsIHAsIHVuaXQgPyB2YWx1ZSArIHVuaXQgOiB2YWx1ZSwgY2FjaGUsIDEpO1xuICAgIH07XG4gIH0sXG4gIGlzVHdlZW5pbmc6IGZ1bmN0aW9uIGlzVHdlZW5pbmcodGFyZ2V0cykge1xuICAgIHJldHVybiBfZ2xvYmFsVGltZWxpbmUuZ2V0VHdlZW5zT2YodGFyZ2V0cywgdHJ1ZSkubGVuZ3RoID4gMDtcbiAgfSxcbiAgZGVmYXVsdHM6IGZ1bmN0aW9uIGRlZmF1bHRzKHZhbHVlKSB7XG4gICAgdmFsdWUgJiYgdmFsdWUuZWFzZSAmJiAodmFsdWUuZWFzZSA9IF9wYXJzZUVhc2UodmFsdWUuZWFzZSwgX2RlZmF1bHRzLmVhc2UpKTtcbiAgICByZXR1cm4gX21lcmdlRGVlcChfZGVmYXVsdHMsIHZhbHVlIHx8IHt9KTtcbiAgfSxcbiAgY29uZmlnOiBmdW5jdGlvbiBjb25maWcodmFsdWUpIHtcbiAgICByZXR1cm4gX21lcmdlRGVlcChfY29uZmlnLCB2YWx1ZSB8fCB7fSk7XG4gIH0sXG4gIHJlZ2lzdGVyRWZmZWN0OiBmdW5jdGlvbiByZWdpc3RlckVmZmVjdChfcmVmKSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICAgIGVmZmVjdCA9IF9yZWYuZWZmZWN0LFxuICAgICAgICBwbHVnaW5zID0gX3JlZi5wbHVnaW5zLFxuICAgICAgICBkZWZhdWx0cyA9IF9yZWYuZGVmYXVsdHMsXG4gICAgICAgIGV4dGVuZFRpbWVsaW5lID0gX3JlZi5leHRlbmRUaW1lbGluZTtcbiAgICAocGx1Z2lucyB8fCBcIlwiKS5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luTmFtZSkge1xuICAgICAgcmV0dXJuIHBsdWdpbk5hbWUgJiYgIV9wbHVnaW5zW3BsdWdpbk5hbWVdICYmICFfZ2xvYmFsc1twbHVnaW5OYW1lXSAmJiBfd2FybihuYW1lICsgXCIgZWZmZWN0IHJlcXVpcmVzIFwiICsgcGx1Z2luTmFtZSArIFwiIHBsdWdpbi5cIik7XG4gICAgfSk7XG5cbiAgICBfZWZmZWN0c1tuYW1lXSA9IGZ1bmN0aW9uICh0YXJnZXRzLCB2YXJzLCB0bCkge1xuICAgICAgcmV0dXJuIGVmZmVjdCh0b0FycmF5KHRhcmdldHMpLCBfc2V0RGVmYXVsdHModmFycyB8fCB7fSwgZGVmYXVsdHMpLCB0bCk7XG4gICAgfTtcblxuICAgIGlmIChleHRlbmRUaW1lbGluZSkge1xuICAgICAgVGltZWxpbmUucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChfZWZmZWN0c1tuYW1lXSh0YXJnZXRzLCBfaXNPYmplY3QodmFycykgPyB2YXJzIDogKHBvc2l0aW9uID0gdmFycykgJiYge30sIHRoaXMpLCBwb3NpdGlvbik7XG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgcmVnaXN0ZXJFYXNlOiBmdW5jdGlvbiByZWdpc3RlckVhc2UobmFtZSwgZWFzZSkge1xuICAgIF9lYXNlTWFwW25hbWVdID0gX3BhcnNlRWFzZShlYXNlKTtcbiAgfSxcbiAgcGFyc2VFYXNlOiBmdW5jdGlvbiBwYXJzZUVhc2UoZWFzZSwgZGVmYXVsdEVhc2UpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IF9wYXJzZUVhc2UoZWFzZSwgZGVmYXVsdEVhc2UpIDogX2Vhc2VNYXA7XG4gIH0sXG4gIGdldEJ5SWQ6IGZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX2dsb2JhbFRpbWVsaW5lLmdldEJ5SWQoaWQpO1xuICB9LFxuICBleHBvcnRSb290OiBmdW5jdGlvbiBleHBvcnRSb290KHZhcnMsIGluY2x1ZGVEZWxheWVkQ2FsbHMpIHtcbiAgICBpZiAodmFycyA9PT0gdm9pZCAwKSB7XG4gICAgICB2YXJzID0ge307XG4gICAgfVxuXG4gICAgdmFyIHRsID0gbmV3IFRpbWVsaW5lKHZhcnMpLFxuICAgICAgICBjaGlsZCxcbiAgICAgICAgbmV4dDtcbiAgICB0bC5zbW9vdGhDaGlsZFRpbWluZyA9IF9pc05vdEZhbHNlKHZhcnMuc21vb3RoQ2hpbGRUaW1pbmcpO1xuXG4gICAgX2dsb2JhbFRpbWVsaW5lLnJlbW92ZSh0bCk7XG5cbiAgICB0bC5fZHAgPSAwOyAvL290aGVyd2lzZSBpdCdsbCBnZXQgcmUtYWN0aXZhdGVkIHdoZW4gYWRkaW5nIGNoaWxkcmVuIGFuZCBiZSByZS1pbnRyb2R1Y2VkIGludG8gX2dsb2JhbFRpbWVsaW5lJ3MgbGlua2VkIGxpc3QgKHRoZW4gYWRkZWQgdG8gaXRzZWxmKS5cblxuICAgIHRsLl90aW1lID0gdGwuX3RUaW1lID0gX2dsb2JhbFRpbWVsaW5lLl90aW1lO1xuICAgIGNoaWxkID0gX2dsb2JhbFRpbWVsaW5lLl9maXJzdDtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgbmV4dCA9IGNoaWxkLl9uZXh0O1xuXG4gICAgICBpZiAoaW5jbHVkZURlbGF5ZWRDYWxscyB8fCAhKCFjaGlsZC5fZHVyICYmIGNoaWxkIGluc3RhbmNlb2YgVHdlZW4gJiYgY2hpbGQudmFycy5vbkNvbXBsZXRlID09PSBjaGlsZC5fdGFyZ2V0c1swXSkpIHtcbiAgICAgICAgX2FkZFRvVGltZWxpbmUodGwsIGNoaWxkLCBjaGlsZC5fc3RhcnQgLSBjaGlsZC5fZGVsYXkpO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IG5leHQ7XG4gICAgfVxuXG4gICAgX2FkZFRvVGltZWxpbmUoX2dsb2JhbFRpbWVsaW5lLCB0bCwgMCk7XG5cbiAgICByZXR1cm4gdGw7XG4gIH0sXG4gIHV0aWxzOiB7XG4gICAgd3JhcDogd3JhcCxcbiAgICB3cmFwWW95bzogd3JhcFlveW8sXG4gICAgZGlzdHJpYnV0ZTogZGlzdHJpYnV0ZSxcbiAgICByYW5kb206IHJhbmRvbSxcbiAgICBzbmFwOiBzbmFwLFxuICAgIG5vcm1hbGl6ZTogbm9ybWFsaXplLFxuICAgIGdldFVuaXQ6IGdldFVuaXQsXG4gICAgY2xhbXA6IGNsYW1wLFxuICAgIHNwbGl0Q29sb3I6IHNwbGl0Q29sb3IsXG4gICAgdG9BcnJheTogdG9BcnJheSxcbiAgICBtYXBSYW5nZTogbWFwUmFuZ2UsXG4gICAgcGlwZTogcGlwZSxcbiAgICB1bml0aXplOiB1bml0aXplLFxuICAgIGludGVycG9sYXRlOiBpbnRlcnBvbGF0ZSxcbiAgICBzaHVmZmxlOiBzaHVmZmxlXG4gIH0sXG4gIGluc3RhbGw6IF9pbnN0YWxsLFxuICBlZmZlY3RzOiBfZWZmZWN0cyxcbiAgdGlja2VyOiBfdGlja2VyLFxuICB1cGRhdGVSb290OiBUaW1lbGluZS51cGRhdGVSb290LFxuICBwbHVnaW5zOiBfcGx1Z2lucyxcbiAgZ2xvYmFsVGltZWxpbmU6IF9nbG9iYWxUaW1lbGluZSxcbiAgY29yZToge1xuICAgIFByb3BUd2VlbjogUHJvcFR3ZWVuLFxuICAgIGdsb2JhbHM6IF9hZGRHbG9iYWwsXG4gICAgVHdlZW46IFR3ZWVuLFxuICAgIFRpbWVsaW5lOiBUaW1lbGluZSxcbiAgICBBbmltYXRpb246IEFuaW1hdGlvbixcbiAgICBnZXRDYWNoZTogX2dldENhY2hlLFxuICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbTogX3JlbW92ZUxpbmtlZExpc3RJdGVtXG4gIH1cbn07XG5cbl9mb3JFYWNoTmFtZShcInRvLGZyb20sZnJvbVRvLGRlbGF5ZWRDYWxsLHNldCxraWxsVHdlZW5zT2ZcIiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIF9nc2FwW25hbWVdID0gVHdlZW5bbmFtZV07XG59KTtcblxuX3RpY2tlci5hZGQoVGltZWxpbmUudXBkYXRlUm9vdCk7XG5cbl9xdWlja1R3ZWVuID0gX2dzYXAudG8oe30sIHtcbiAgZHVyYXRpb246IDBcbn0pOyAvLyAtLS0tIEVYVFJBIFBMVUdJTlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIF9nZXRQbHVnaW5Qcm9wVHdlZW4gPSBmdW5jdGlvbiBfZ2V0UGx1Z2luUHJvcFR3ZWVuKHBsdWdpbiwgcHJvcCkge1xuICB2YXIgcHQgPSBwbHVnaW4uX3B0O1xuXG4gIHdoaWxlIChwdCAmJiBwdC5wICE9PSBwcm9wICYmIHB0Lm9wICE9PSBwcm9wICYmIHB0LmZwICE9PSBwcm9wKSB7XG4gICAgcHQgPSBwdC5fbmV4dDtcbiAgfVxuXG4gIHJldHVybiBwdDtcbn0sXG4gICAgX2FkZE1vZGlmaWVycyA9IGZ1bmN0aW9uIF9hZGRNb2RpZmllcnModHdlZW4sIG1vZGlmaWVycykge1xuICB2YXIgdGFyZ2V0cyA9IHR3ZWVuLl90YXJnZXRzLFxuICAgICAgcCxcbiAgICAgIGksXG4gICAgICBwdDtcblxuICBmb3IgKHAgaW4gbW9kaWZpZXJzKSB7XG4gICAgaSA9IHRhcmdldHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgcHQgPSB0d2Vlbi5fcHRMb29rdXBbaV1bcF07XG5cbiAgICAgIGlmIChwdCAmJiAocHQgPSBwdC5kKSkge1xuICAgICAgICBpZiAocHQuX3B0KSB7XG4gICAgICAgICAgLy8gaXMgYSBwbHVnaW5cbiAgICAgICAgICBwdCA9IF9nZXRQbHVnaW5Qcm9wVHdlZW4ocHQsIHApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHQgJiYgcHQubW9kaWZpZXIgJiYgcHQubW9kaWZpZXIobW9kaWZpZXJzW3BdLCB0d2VlbiwgdGFyZ2V0c1tpXSwgcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59LFxuICAgIF9idWlsZE1vZGlmaWVyUGx1Z2luID0gZnVuY3Rpb24gX2J1aWxkTW9kaWZpZXJQbHVnaW4obmFtZSwgbW9kaWZpZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIHJhd1ZhcnM6IDEsXG4gICAgLy9kb24ndCBwcmUtcHJvY2VzcyBmdW5jdGlvbi1iYXNlZCB2YWx1ZXMgb3IgXCJyYW5kb20oKVwiIHN0cmluZ3MuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuKSB7XG4gICAgICB0d2Vlbi5fb25Jbml0ID0gZnVuY3Rpb24gKHR3ZWVuKSB7XG4gICAgICAgIHZhciB0ZW1wLCBwO1xuXG4gICAgICAgIGlmIChfaXNTdHJpbmcodmFycykpIHtcbiAgICAgICAgICB0ZW1wID0ge307XG5cbiAgICAgICAgICBfZm9yRWFjaE5hbWUodmFycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wW25hbWVdID0gMTtcbiAgICAgICAgICB9KTsgLy9pZiB0aGUgdXNlciBwYXNzZXMgaW4gYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcyB0byByb3VuZFByb3BzLCBsaWtlIFwieCx5XCIsIHdlIHJvdW5kIHRvIHdob2xlIG51bWJlcnMuXG5cblxuICAgICAgICAgIHZhcnMgPSB0ZW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGlmaWVyKSB7XG4gICAgICAgICAgdGVtcCA9IHt9O1xuXG4gICAgICAgICAgZm9yIChwIGluIHZhcnMpIHtcbiAgICAgICAgICAgIHRlbXBbcF0gPSBtb2RpZmllcih2YXJzW3BdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXJzID0gdGVtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIF9hZGRNb2RpZmllcnModHdlZW4sIHZhcnMpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59OyAvL3JlZ2lzdGVyIGNvcmUgcGx1Z2luc1xuXG5cbmV4cG9ydCB2YXIgZ3NhcCA9IF9nc2FwLnJlZ2lzdGVyUGx1Z2luKHtcbiAgbmFtZTogXCJhdHRyXCIsXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQodGFyZ2V0LCB2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldHMpIHtcbiAgICB2YXIgcCwgcHQ7XG5cbiAgICBmb3IgKHAgaW4gdmFycykge1xuICAgICAgcHQgPSB0aGlzLmFkZCh0YXJnZXQsIFwic2V0QXR0cmlidXRlXCIsICh0YXJnZXQuZ2V0QXR0cmlidXRlKHApIHx8IDApICsgXCJcIiwgdmFyc1twXSwgaW5kZXgsIHRhcmdldHMsIDAsIDAsIHApO1xuICAgICAgcHQgJiYgKHB0Lm9wID0gcCk7XG5cbiAgICAgIHRoaXMuX3Byb3BzLnB1c2gocCk7XG4gICAgfVxuICB9XG59LCB7XG4gIG5hbWU6IFwiZW5kQXJyYXlcIixcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhbHVlKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmFkZCh0YXJnZXQsIGksIHRhcmdldFtpXSB8fCAwLCB2YWx1ZVtpXSk7XG4gICAgfVxuICB9XG59LCBfYnVpbGRNb2RpZmllclBsdWdpbihcInJvdW5kUHJvcHNcIiwgX3JvdW5kTW9kaWZpZXIpLCBfYnVpbGRNb2RpZmllclBsdWdpbihcIm1vZGlmaWVyc1wiKSwgX2J1aWxkTW9kaWZpZXJQbHVnaW4oXCJzbmFwXCIsIHNuYXApKSB8fCBfZ3NhcDsgLy90byBwcmV2ZW50IHRoZSBjb3JlIHBsdWdpbnMgZnJvbSBiZWluZyBkcm9wcGVkIHZpYSBhZ2dyZXNzaXZlIHRyZWUgc2hha2luZywgd2UgbXVzdCBpbmNsdWRlIHRoZW0gaW4gdGhlIHZhcmlhYmxlIGRlY2xhcmF0aW9uIGluIHRoaXMgd2F5LlxuXG5Ud2Vlbi52ZXJzaW9uID0gVGltZWxpbmUudmVyc2lvbiA9IGdzYXAudmVyc2lvbiA9IFwiMy41LjBcIjtcbl9jb3JlUmVhZHkgPSAxO1xuXG5pZiAoX3dpbmRvd0V4aXN0cygpKSB7XG4gIF93YWtlKCk7XG59XG5cbnZhciBQb3dlcjAgPSBfZWFzZU1hcC5Qb3dlcjAsXG4gICAgUG93ZXIxID0gX2Vhc2VNYXAuUG93ZXIxLFxuICAgIFBvd2VyMiA9IF9lYXNlTWFwLlBvd2VyMixcbiAgICBQb3dlcjMgPSBfZWFzZU1hcC5Qb3dlcjMsXG4gICAgUG93ZXI0ID0gX2Vhc2VNYXAuUG93ZXI0LFxuICAgIExpbmVhciA9IF9lYXNlTWFwLkxpbmVhcixcbiAgICBRdWFkID0gX2Vhc2VNYXAuUXVhZCxcbiAgICBDdWJpYyA9IF9lYXNlTWFwLkN1YmljLFxuICAgIFF1YXJ0ID0gX2Vhc2VNYXAuUXVhcnQsXG4gICAgUXVpbnQgPSBfZWFzZU1hcC5RdWludCxcbiAgICBTdHJvbmcgPSBfZWFzZU1hcC5TdHJvbmcsXG4gICAgRWxhc3RpYyA9IF9lYXNlTWFwLkVsYXN0aWMsXG4gICAgQmFjayA9IF9lYXNlTWFwLkJhY2ssXG4gICAgU3RlcHBlZEVhc2UgPSBfZWFzZU1hcC5TdGVwcGVkRWFzZSxcbiAgICBCb3VuY2UgPSBfZWFzZU1hcC5Cb3VuY2UsXG4gICAgU2luZSA9IF9lYXNlTWFwLlNpbmUsXG4gICAgRXhwbyA9IF9lYXNlTWFwLkV4cG8sXG4gICAgQ2lyYyA9IF9lYXNlTWFwLkNpcmM7XG5leHBvcnQgeyBQb3dlcjAsIFBvd2VyMSwgUG93ZXIyLCBQb3dlcjMsIFBvd2VyNCwgTGluZWFyLCBRdWFkLCBDdWJpYywgUXVhcnQsIFF1aW50LCBTdHJvbmcsIEVsYXN0aWMsIEJhY2ssIFN0ZXBwZWRFYXNlLCBCb3VuY2UsIFNpbmUsIEV4cG8sIENpcmMgfTtcbmV4cG9ydCB7IFR3ZWVuIGFzIFR3ZWVuTWF4LCBUd2VlbiBhcyBUd2VlbkxpdGUsIFRpbWVsaW5lIGFzIFRpbWVsaW5lTWF4LCBUaW1lbGluZSBhcyBUaW1lbGluZUxpdGUsIGdzYXAgYXMgZGVmYXVsdCwgd3JhcCwgd3JhcFlveW8sIGRpc3RyaWJ1dGUsIHJhbmRvbSwgc25hcCwgbm9ybWFsaXplLCBnZXRVbml0LCBjbGFtcCwgc3BsaXRDb2xvciwgdG9BcnJheSwgbWFwUmFuZ2UsIHBpcGUsIHVuaXRpemUsIGludGVycG9sYXRlLCBzaHVmZmxlIH07IC8vZXhwb3J0IHNvbWUgaW50ZXJuYWwgbWV0aG9kcy9vcm9qZWN0cyBmb3IgdXNlIGluIENTU1BsdWdpbiBzbyB0aGF0IHdlIGNhbiBleHRlcm5hbGl6ZSB0aGF0IGZpbGUgYW5kIGFsbG93IGN1c3RvbSBidWlsZHMgdGhhdCBleGNsdWRlIGl0LlxuXG5leHBvcnQgeyBfZ2V0UHJvcGVydHksIF9udW1FeHAsIF9udW1XaXRoVW5pdEV4cCwgX2lzU3RyaW5nLCBfaXNVbmRlZmluZWQsIF9yZW5kZXJDb21wbGV4U3RyaW5nLCBfcmVsRXhwLCBfc2V0RGVmYXVsdHMsIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSwgX2ZvckVhY2hOYW1lLCBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5LCBfY29sb3JTdHJpbmdGaWx0ZXIsIF9yZXBsYWNlUmFuZG9tLCBfY2hlY2tQbHVnaW4sIF9wbHVnaW5zLCBfdGlja2VyLCBfY29uZmlnLCBfcm91bmRNb2RpZmllciwgX3JvdW5kLCBfbWlzc2luZ1BsdWdpbiwgX2dldFNldHRlciwgX2dldENhY2hlIH07IiwiLyohXG4gKiBDU1NQbHVnaW4gMy41LjBcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDA4LTIwMjAsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBnc2FwLCBfZ2V0UHJvcGVydHksIF9udW1FeHAsIF9udW1XaXRoVW5pdEV4cCwgZ2V0VW5pdCwgX2lzU3RyaW5nLCBfaXNVbmRlZmluZWQsIF9yZW5kZXJDb21wbGV4U3RyaW5nLCBfcmVsRXhwLCBfZm9yRWFjaE5hbWUsIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHksIF9jb2xvclN0cmluZ0ZpbHRlciwgX2NoZWNrUGx1Z2luLCBfcmVwbGFjZVJhbmRvbSwgX3BsdWdpbnMsIEdTQ2FjaGUsIFByb3BUd2VlbiwgX2NvbmZpZywgX3RpY2tlciwgX3JvdW5kLCBfbWlzc2luZ1BsdWdpbiwgX2dldFNldHRlciwgX2dldENhY2hlLCBfc2V0RGVmYXVsdHMsIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSAvL2ZvciB0aGUgY29tbWVudGVkLW91dCBjbGFzc05hbWUgZmVhdHVyZS5cbn0gZnJvbSBcIi4vZ3NhcC1jb3JlLmpzXCI7XG5cbnZhciBfd2luLFxuICAgIF9kb2MsXG4gICAgX2RvY0VsZW1lbnQsXG4gICAgX3BsdWdpbkluaXR0ZWQsXG4gICAgX3RlbXBEaXYsXG4gICAgX3RlbXBEaXZTdHlsZXIsXG4gICAgX3JlY2VudFNldHRlclBsdWdpbixcbiAgICBfd2luZG93RXhpc3RzID0gZnVuY3Rpb24gX3dpbmRvd0V4aXN0cygpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG59LFxuICAgIF90cmFuc2Zvcm1Qcm9wcyA9IHt9LFxuICAgIF9SQUQyREVHID0gMTgwIC8gTWF0aC5QSSxcbiAgICBfREVHMlJBRCA9IE1hdGguUEkgLyAxODAsXG4gICAgX2F0YW4yID0gTWF0aC5hdGFuMixcbiAgICBfYmlnTnVtID0gMWU4LFxuICAgIF9jYXBzRXhwID0gLyhbQS1aXSkvZyxcbiAgICBfaG9yaXpvbnRhbEV4cCA9IC8oPzpsZWZ0fHJpZ2h0fHdpZHRofG1hcmdpbnxwYWRkaW5nfHgpL2ksXG4gICAgX2NvbXBsZXhFeHAgPSAvW1xccyxcXChdXFxTLyxcbiAgICBfcHJvcGVydHlBbGlhc2VzID0ge1xuICBhdXRvQWxwaGE6IFwib3BhY2l0eSx2aXNpYmlsaXR5XCIsXG4gIHNjYWxlOiBcInNjYWxlWCxzY2FsZVlcIixcbiAgYWxwaGE6IFwib3BhY2l0eVwiXG59LFxuICAgIF9yZW5kZXJDU1NQcm9wID0gZnVuY3Rpb24gX3JlbmRlckNTU1Byb3AocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCBNYXRoLnJvdW5kKChkYXRhLnMgKyBkYXRhLmMgKiByYXRpbykgKiAxMDAwMCkgLyAxMDAwMCArIGRhdGEudSwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJQcm9wV2l0aEVuZCA9IGZ1bmN0aW9uIF9yZW5kZXJQcm9wV2l0aEVuZChyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIHJhdGlvID09PSAxID8gZGF0YS5lIDogTWF0aC5yb3VuZCgoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pICogMTAwMDApIC8gMTAwMDAgKyBkYXRhLnUsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyQ1NTUHJvcFdpdGhCZWdpbm5pbmcgPSBmdW5jdGlvbiBfcmVuZGVyQ1NTUHJvcFdpdGhCZWdpbm5pbmcocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyA/IE1hdGgucm91bmQoKGRhdGEucyArIGRhdGEuYyAqIHJhdGlvKSAqIDEwMDAwKSAvIDEwMDAwICsgZGF0YS51IDogZGF0YS5iLCBkYXRhKTtcbn0sXG4gICAgLy9pZiB1bml0cyBjaGFuZ2UsIHdlIG5lZWQgYSB3YXkgdG8gcmVuZGVyIHRoZSBvcmlnaW5hbCB1bml0L3ZhbHVlIHdoZW4gdGhlIHR3ZWVuIGdvZXMgYWxsIHRoZSB3YXkgYmFjayB0byB0aGUgYmVnaW5uaW5nIChyYXRpbzowKVxuX3JlbmRlclJvdW5kZWRDU1NQcm9wID0gZnVuY3Rpb24gX3JlbmRlclJvdW5kZWRDU1NQcm9wKHJhdGlvLCBkYXRhKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGEucyArIGRhdGEuYyAqIHJhdGlvO1xuICBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgfn4odmFsdWUgKyAodmFsdWUgPCAwID8gLS41IDogLjUpKSArIGRhdGEudSwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlID0gZnVuY3Rpb24gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWUocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyA/IGRhdGEuZSA6IGRhdGEuYiwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlT25seUF0RW5kID0gZnVuY3Rpb24gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWVPbmx5QXRFbmQocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyAhPT0gMSA/IGRhdGEuYiA6IGRhdGEuZSwgZGF0YSk7XG59LFxuICAgIF9zZXR0ZXJDU1NTdHlsZSA9IGZ1bmN0aW9uIF9zZXR0ZXJDU1NTdHlsZSh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gdGFyZ2V0LnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xufSxcbiAgICBfc2V0dGVyQ1NTUHJvcCA9IGZ1bmN0aW9uIF9zZXR0ZXJDU1NQcm9wKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbn0sXG4gICAgX3NldHRlclRyYW5zZm9ybSA9IGZ1bmN0aW9uIF9zZXR0ZXJUcmFuc2Zvcm0odGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5fZ3NhcFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbn0sXG4gICAgX3NldHRlclNjYWxlID0gZnVuY3Rpb24gX3NldHRlclNjYWxlKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXQuX2dzYXAuc2NhbGVYID0gdGFyZ2V0Ll9nc2FwLnNjYWxlWSA9IHZhbHVlO1xufSxcbiAgICBfc2V0dGVyU2NhbGVXaXRoUmVuZGVyID0gZnVuY3Rpb24gX3NldHRlclNjYWxlV2l0aFJlbmRlcih0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgZGF0YSwgcmF0aW8pIHtcbiAgdmFyIGNhY2hlID0gdGFyZ2V0Ll9nc2FwO1xuICBjYWNoZS5zY2FsZVggPSBjYWNoZS5zY2FsZVkgPSB2YWx1ZTtcbiAgY2FjaGUucmVuZGVyVHJhbnNmb3JtKHJhdGlvLCBjYWNoZSk7XG59LFxuICAgIF9zZXR0ZXJUcmFuc2Zvcm1XaXRoUmVuZGVyID0gZnVuY3Rpb24gX3NldHRlclRyYW5zZm9ybVdpdGhSZW5kZXIodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIGRhdGEsIHJhdGlvKSB7XG4gIHZhciBjYWNoZSA9IHRhcmdldC5fZ3NhcDtcbiAgY2FjaGVbcHJvcGVydHldID0gdmFsdWU7XG4gIGNhY2hlLnJlbmRlclRyYW5zZm9ybShyYXRpbywgY2FjaGUpO1xufSxcbiAgICBfdHJhbnNmb3JtUHJvcCA9IFwidHJhbnNmb3JtXCIsXG4gICAgX3RyYW5zZm9ybU9yaWdpblByb3AgPSBfdHJhbnNmb3JtUHJvcCArIFwiT3JpZ2luXCIsXG4gICAgX3N1cHBvcnRzM0QsXG4gICAgX2NyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCh0eXBlLCBucykge1xuICB2YXIgZSA9IF9kb2MuY3JlYXRlRWxlbWVudE5TID8gX2RvYy5jcmVhdGVFbGVtZW50TlMoKG5zIHx8IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKS5yZXBsYWNlKC9eaHR0cHMvLCBcImh0dHBcIiksIHR5cGUpIDogX2RvYy5jcmVhdGVFbGVtZW50KHR5cGUpOyAvL3NvbWUgc2VydmVycyBzd2FwIGluIGh0dHBzIGZvciBodHRwIGluIHRoZSBuYW1lc3BhY2Ugd2hpY2ggY2FuIGJyZWFrIHRoaW5ncywgbWFraW5nIFwic3R5bGVcIiBpbmFjY2Vzc2libGUuXG5cbiAgcmV0dXJuIGUuc3R5bGUgPyBlIDogX2RvYy5jcmVhdGVFbGVtZW50KHR5cGUpOyAvL3NvbWUgZW52aXJvbm1lbnRzIHdvbid0IGFsbG93IGFjY2VzcyB0byB0aGUgZWxlbWVudCdzIHN0eWxlIHdoZW4gY3JlYXRlZCB3aXRoIGEgbmFtZXNwYWNlIGluIHdoaWNoIGNhc2Ugd2UgZGVmYXVsdCB0byB0aGUgc3RhbmRhcmQgY3JlYXRlRWxlbWVudCgpIHRvIHdvcmsgYXJvdW5kIHRoZSBpc3N1ZS4gQWxzbyBub3RlIHRoYXQgd2hlbiBHU0FQIGlzIGVtYmVkZGVkIGRpcmVjdGx5IGluc2lkZSBhbiBTVkcgZmlsZSwgY3JlYXRlRWxlbWVudCgpIHdvbid0IGFsbG93IGFjY2VzcyB0byB0aGUgc3R5bGUgb2JqZWN0IGluIEZpcmVmb3ggKHNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIwMjE1LXByb2JsZW0tdXNpbmctdHdlZW5tYXgtaW4tc3RhbmRhbG9uZS1zZWxmLWNvbnRhaW5pbmctc3ZnLWZpbGUtZXJyLWNhbm5vdC1zZXQtcHJvcGVydHktY3NzdGV4dC1vZi11bmRlZmluZWQvKS5cbn0sXG4gICAgX2dldENvbXB1dGVkUHJvcGVydHkgPSBmdW5jdGlvbiBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCBza2lwUHJlZml4RmFsbGJhY2spIHtcbiAgdmFyIGNzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xuICByZXR1cm4gY3NbcHJvcGVydHldIHx8IGNzLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkucmVwbGFjZShfY2Fwc0V4cCwgXCItJDFcIikudG9Mb3dlckNhc2UoKSkgfHwgY3MuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkgfHwgIXNraXBQcmVmaXhGYWxsYmFjayAmJiBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF9jaGVja1Byb3BQcmVmaXgocHJvcGVydHkpIHx8IHByb3BlcnR5LCAxKSB8fCBcIlwiOyAvL2NzcyB2YXJpYWJsZXMgbWF5IG5vdCBuZWVkIGNhcHMgc3dhcHBlZCBvdXQgZm9yIGRhc2hlcyBhbmQgbG93ZXJjYXNlLlxufSxcbiAgICBfcHJlZml4ZXMgPSBcIk8sTW96LG1zLE1zLFdlYmtpdFwiLnNwbGl0KFwiLFwiKSxcbiAgICBfY2hlY2tQcm9wUHJlZml4ID0gZnVuY3Rpb24gX2NoZWNrUHJvcFByZWZpeChwcm9wZXJ0eSwgZWxlbWVudCwgcHJlZmVyUHJlZml4KSB7XG4gIHZhciBlID0gZWxlbWVudCB8fCBfdGVtcERpdixcbiAgICAgIHMgPSBlLnN0eWxlLFxuICAgICAgaSA9IDU7XG5cbiAgaWYgKHByb3BlcnR5IGluIHMgJiYgIXByZWZlclByZWZpeCkge1xuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfVxuXG4gIHByb3BlcnR5ID0gcHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zdWJzdHIoMSk7XG5cbiAgd2hpbGUgKGktLSAmJiAhKF9wcmVmaXhlc1tpXSArIHByb3BlcnR5IGluIHMpKSB7fVxuXG4gIHJldHVybiBpIDwgMCA/IG51bGwgOiAoaSA9PT0gMyA/IFwibXNcIiA6IGkgPj0gMCA/IF9wcmVmaXhlc1tpXSA6IFwiXCIpICsgcHJvcGVydHk7XG59LFxuICAgIF9pbml0Q29yZSA9IGZ1bmN0aW9uIF9pbml0Q29yZSgpIHtcbiAgaWYgKF93aW5kb3dFeGlzdHMoKSAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICBfd2luID0gd2luZG93O1xuICAgIF9kb2MgPSBfd2luLmRvY3VtZW50O1xuICAgIF9kb2NFbGVtZW50ID0gX2RvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgX3RlbXBEaXYgPSBfY3JlYXRlRWxlbWVudChcImRpdlwiKSB8fCB7XG4gICAgICBzdHlsZToge31cbiAgICB9O1xuICAgIF90ZW1wRGl2U3R5bGVyID0gX2NyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgX3RyYW5zZm9ybVByb3AgPSBfY2hlY2tQcm9wUHJlZml4KF90cmFuc2Zvcm1Qcm9wKTtcbiAgICBfdHJhbnNmb3JtT3JpZ2luUHJvcCA9IF90cmFuc2Zvcm1Qcm9wICsgXCJPcmlnaW5cIjtcbiAgICBfdGVtcERpdi5zdHlsZS5jc3NUZXh0ID0gXCJib3JkZXItd2lkdGg6MDtsaW5lLWhlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmc6MFwiOyAvL21ha2Ugc3VyZSB0byBvdmVycmlkZSBjZXJ0YWluIHByb3BlcnRpZXMgdGhhdCBtYXkgY29udGFtaW5hdGUgbWVhc3VyZW1lbnRzLCBpbiBjYXNlIHRoZSB1c2VyIGhhcyBvdmVycmVhY2hpbmcgc3R5bGUgc2hlZXRzLlxuXG4gICAgX3N1cHBvcnRzM0QgPSAhIV9jaGVja1Byb3BQcmVmaXgoXCJwZXJzcGVjdGl2ZVwiKTtcbiAgICBfcGx1Z2luSW5pdHRlZCA9IDE7XG4gIH1cbn0sXG4gICAgX2dldEJCb3hIYWNrID0gZnVuY3Rpb24gX2dldEJCb3hIYWNrKHN3YXBJZlBvc3NpYmxlKSB7XG4gIC8vd29ya3MgYXJvdW5kIGlzc3VlcyBpbiBzb21lIGJyb3dzZXJzIChsaWtlIEZpcmVmb3gpIHRoYXQgZG9uJ3QgY29ycmVjdGx5IHJlcG9ydCBnZXRCQm94KCkgb24gU1ZHIGVsZW1lbnRzIGluc2lkZSBhIDxkZWZzPiBlbGVtZW50IGFuZC9vciA8bWFzaz4uIFdlIHRyeSBjcmVhdGluZyBhbiBTVkcsIGFkZGluZyBpdCB0byB0aGUgZG9jdW1lbnRFbGVtZW50IGFuZCB0b3NzIHRoZSBlbGVtZW50IGluIHRoZXJlIHNvIHRoYXQgaXQncyBkZWZpbml0ZWx5IHBhcnQgb2YgdGhlIHJlbmRlcmluZyB0cmVlLCB0aGVuIGdyYWIgdGhlIGJib3ggYW5kIGlmIGl0IHdvcmtzLCB3ZSBhY3R1YWxseSBzd2FwIG91dCB0aGUgb3JpZ2luYWwgZ2V0QkJveCgpIG1ldGhvZCBmb3Igb3VyIG93biB0aGF0IGRvZXMgdGhlc2UgZXh0cmEgc3RlcHMgd2hlbmV2ZXIgZ2V0QkJveCBpcyBuZWVkZWQuIFRoaXMgaGVscHMgZW5zdXJlIHRoYXQgcGVyZm9ybWFuY2UgaXMgb3B0aW1hbCAob25seSBkbyBhbGwgdGhlc2UgZXh0cmEgc3RlcHMgd2hlbiBhYnNvbHV0ZWx5IG5lY2Vzc2FyeS4uLm1vc3QgZWxlbWVudHMgZG9uJ3QgbmVlZCBpdCkuXG4gIHZhciBzdmcgPSBfY3JlYXRlRWxlbWVudChcInN2Z1wiLCB0aGlzLm93bmVyU1ZHRWxlbWVudCAmJiB0aGlzLm93bmVyU1ZHRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ4bWxuc1wiKSB8fCBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIpLFxuICAgICAgb2xkUGFyZW50ID0gdGhpcy5wYXJlbnROb2RlLFxuICAgICAgb2xkU2libGluZyA9IHRoaXMubmV4dFNpYmxpbmcsXG4gICAgICBvbGRDU1MgPSB0aGlzLnN0eWxlLmNzc1RleHQsXG4gICAgICBiYm94O1xuXG4gIF9kb2NFbGVtZW50LmFwcGVuZENoaWxkKHN2Zyk7XG5cbiAgc3ZnLmFwcGVuZENoaWxkKHRoaXMpO1xuICB0aGlzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgaWYgKHN3YXBJZlBvc3NpYmxlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGJib3ggPSB0aGlzLmdldEJCb3goKTtcbiAgICAgIHRoaXMuX2dzYXBCQm94ID0gdGhpcy5nZXRCQm94OyAvL3N0b3JlIHRoZSBvcmlnaW5hbFxuXG4gICAgICB0aGlzLmdldEJCb3ggPSBfZ2V0QkJveEhhY2s7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSBlbHNlIGlmICh0aGlzLl9nc2FwQkJveCkge1xuICAgIGJib3ggPSB0aGlzLl9nc2FwQkJveCgpO1xuICB9XG5cbiAgaWYgKG9sZFBhcmVudCkge1xuICAgIGlmIChvbGRTaWJsaW5nKSB7XG4gICAgICBvbGRQYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIG9sZFNpYmxpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbGRQYXJlbnQuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX2RvY0VsZW1lbnQucmVtb3ZlQ2hpbGQoc3ZnKTtcblxuICB0aGlzLnN0eWxlLmNzc1RleHQgPSBvbGRDU1M7XG4gIHJldHVybiBiYm94O1xufSxcbiAgICBfZ2V0QXR0cmlidXRlRmFsbGJhY2tzID0gZnVuY3Rpb24gX2dldEF0dHJpYnV0ZUZhbGxiYWNrcyh0YXJnZXQsIGF0dHJpYnV0ZXNBcnJheSkge1xuICB2YXIgaSA9IGF0dHJpYnV0ZXNBcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIGlmICh0YXJnZXQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZXNBcnJheVtpXSkpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZXNBcnJheVtpXSk7XG4gICAgfVxuICB9XG59LFxuICAgIF9nZXRCQm94ID0gZnVuY3Rpb24gX2dldEJCb3godGFyZ2V0KSB7XG4gIHZhciBib3VuZHM7XG5cbiAgdHJ5IHtcbiAgICBib3VuZHMgPSB0YXJnZXQuZ2V0QkJveCgpOyAvL0ZpcmVmb3ggdGhyb3dzIGVycm9ycyBpZiB5b3UgdHJ5IGNhbGxpbmcgZ2V0QkJveCgpIG9uIGFuIFNWRyBlbGVtZW50IHRoYXQncyBub3QgcmVuZGVyZWQgKGxpa2UgaW4gYSA8c3ltYm9sPiBvciA8ZGVmcz4pLiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02MTIxMThcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBib3VuZHMgPSBfZ2V0QkJveEhhY2suY2FsbCh0YXJnZXQsIHRydWUpO1xuICB9XG5cbiAgYm91bmRzICYmIChib3VuZHMud2lkdGggfHwgYm91bmRzLmhlaWdodCkgfHwgdGFyZ2V0LmdldEJCb3ggPT09IF9nZXRCQm94SGFjayB8fCAoYm91bmRzID0gX2dldEJCb3hIYWNrLmNhbGwodGFyZ2V0LCB0cnVlKSk7IC8vc29tZSBicm93c2VycyAobGlrZSBGaXJlZm94KSBtaXNyZXBvcnQgdGhlIGJvdW5kcyBpZiB0aGUgZWxlbWVudCBoYXMgemVybyB3aWR0aCBhbmQgaGVpZ2h0IChpdCBqdXN0IGFzc3VtZXMgaXQncyBhdCB4OjAsIHk6MCksIHRodXMgd2UgbmVlZCB0byBtYW51YWxseSBncmFiIHRoZSBwb3NpdGlvbiBpbiB0aGF0IGNhc2UuXG5cbiAgcmV0dXJuIGJvdW5kcyAmJiAhYm91bmRzLndpZHRoICYmICFib3VuZHMueCAmJiAhYm91bmRzLnkgPyB7XG4gICAgeDogK19nZXRBdHRyaWJ1dGVGYWxsYmFja3ModGFyZ2V0LCBbXCJ4XCIsIFwiY3hcIiwgXCJ4MVwiXSkgfHwgMCxcbiAgICB5OiArX2dldEF0dHJpYnV0ZUZhbGxiYWNrcyh0YXJnZXQsIFtcInlcIiwgXCJjeVwiLCBcInkxXCJdKSB8fCAwLFxuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMFxuICB9IDogYm91bmRzO1xufSxcbiAgICBfaXNTVkcgPSBmdW5jdGlvbiBfaXNTVkcoZSkge1xuICByZXR1cm4gISEoZS5nZXRDVE0gJiYgKCFlLnBhcmVudE5vZGUgfHwgZS5vd25lclNWR0VsZW1lbnQpICYmIF9nZXRCQm94KGUpKTtcbn0sXG4gICAgLy9yZXBvcnRzIGlmIHRoZSBlbGVtZW50IGlzIGFuIFNWRyBvbiB3aGljaCBnZXRCQm94KCkgYWN0dWFsbHkgd29ya3Ncbl9yZW1vdmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB7XG4gIGlmIChwcm9wZXJ0eSkge1xuICAgIHZhciBzdHlsZSA9IHRhcmdldC5zdHlsZTtcblxuICAgIGlmIChwcm9wZXJ0eSBpbiBfdHJhbnNmb3JtUHJvcHMgJiYgcHJvcGVydHkgIT09IF90cmFuc2Zvcm1PcmlnaW5Qcm9wKSB7XG4gICAgICBwcm9wZXJ0eSA9IF90cmFuc2Zvcm1Qcm9wO1xuICAgIH1cblxuICAgIGlmIChzdHlsZS5yZW1vdmVQcm9wZXJ0eSkge1xuICAgICAgaWYgKHByb3BlcnR5LnN1YnN0cigwLCAyKSA9PT0gXCJtc1wiIHx8IHByb3BlcnR5LnN1YnN0cigwLCA2KSA9PT0gXCJ3ZWJraXRcIikge1xuICAgICAgICAvL01pY3Jvc29mdCBhbmQgc29tZSBXZWJraXQgYnJvd3NlcnMgZG9uJ3QgY29uZm9ybSB0byB0aGUgc3RhbmRhcmQgb2YgY2FwaXRhbGl6aW5nIHRoZSBmaXJzdCBwcmVmaXggY2hhcmFjdGVyLCBzbyB3ZSBhZGp1c3Qgc28gdGhhdCB3aGVuIHdlIHByZWZpeCB0aGUgY2FwcyB3aXRoIGEgZGFzaCwgaXQncyBjb3JyZWN0IChvdGhlcndpc2UgaXQnZCBiZSBcIm1zLXRyYW5zZm9ybVwiIGluc3RlYWQgb2YgXCItbXMtdHJhbnNmb3JtXCIgZm9yIElFOSwgZm9yIGV4YW1wbGUpXG4gICAgICAgIHByb3BlcnR5ID0gXCItXCIgKyBwcm9wZXJ0eTtcbiAgICAgIH1cblxuICAgICAgc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkucmVwbGFjZShfY2Fwc0V4cCwgXCItJDFcIikudG9Mb3dlckNhc2UoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vbm90ZTogb2xkIHZlcnNpb25zIG9mIElFIHVzZSBcInJlbW92ZUF0dHJpYnV0ZSgpXCIgaW5zdGVhZCBvZiBcInJlbW92ZVByb3BlcnR5KClcIlxuICAgICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKHByb3BlcnR5KTtcbiAgICB9XG4gIH1cbn0sXG4gICAgX2FkZE5vblR3ZWVuaW5nUFQgPSBmdW5jdGlvbiBfYWRkTm9uVHdlZW5pbmdQVChwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIGJlZ2lubmluZywgZW5kLCBvbmx5U2V0QXRFbmQpIHtcbiAgdmFyIHB0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIHByb3BlcnR5LCAwLCAxLCBvbmx5U2V0QXRFbmQgPyBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZU9ubHlBdEVuZCA6IF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlKTtcbiAgcGx1Z2luLl9wdCA9IHB0O1xuICBwdC5iID0gYmVnaW5uaW5nO1xuICBwdC5lID0gZW5kO1xuXG4gIHBsdWdpbi5fcHJvcHMucHVzaChwcm9wZXJ0eSk7XG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfbm9uQ29udmVydGlibGVVbml0cyA9IHtcbiAgZGVnOiAxLFxuICByYWQ6IDEsXG4gIHR1cm46IDFcbn0sXG4gICAgLy90YWtlcyBhIHNpbmdsZSB2YWx1ZSBsaWtlIDIwcHggYW5kIGNvbnZlcnRzIGl0IHRvIHRoZSB1bml0IHNwZWNpZmllZCwgbGlrZSBcIiVcIiwgcmV0dXJuaW5nIG9ubHkgdGhlIG51bWVyaWMgYW1vdW50LlxuX2NvbnZlcnRUb1VuaXQgPSBmdW5jdGlvbiBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgdW5pdCkge1xuICB2YXIgY3VyVmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwLFxuICAgICAgY3VyVW5pdCA9ICh2YWx1ZSArIFwiXCIpLnRyaW0oKS5zdWJzdHIoKGN1clZhbHVlICsgXCJcIikubGVuZ3RoKSB8fCBcInB4XCIsXG4gICAgICAvLyBzb21lIGJyb3dzZXJzIGxlYXZlIGV4dHJhIHdoaXRlc3BhY2UgYXQgdGhlIGJlZ2lubmluZyBvZiBDU1MgdmFyaWFibGVzLCBoZW5jZSB0aGUgbmVlZCB0byB0cmltKClcbiAgc3R5bGUgPSBfdGVtcERpdi5zdHlsZSxcbiAgICAgIGhvcml6b250YWwgPSBfaG9yaXpvbnRhbEV4cC50ZXN0KHByb3BlcnR5KSxcbiAgICAgIGlzUm9vdFNWRyA9IHRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwic3ZnXCIsXG4gICAgICBtZWFzdXJlUHJvcGVydHkgPSAoaXNSb290U1ZHID8gXCJjbGllbnRcIiA6IFwib2Zmc2V0XCIpICsgKGhvcml6b250YWwgPyBcIldpZHRoXCIgOiBcIkhlaWdodFwiKSxcbiAgICAgIGFtb3VudCA9IDEwMCxcbiAgICAgIHRvUGl4ZWxzID0gdW5pdCA9PT0gXCJweFwiLFxuICAgICAgdG9QZXJjZW50ID0gdW5pdCA9PT0gXCIlXCIsXG4gICAgICBweCxcbiAgICAgIHBhcmVudCxcbiAgICAgIGNhY2hlLFxuICAgICAgaXNTVkc7XG5cbiAgaWYgKHVuaXQgPT09IGN1clVuaXQgfHwgIWN1clZhbHVlIHx8IF9ub25Db252ZXJ0aWJsZVVuaXRzW3VuaXRdIHx8IF9ub25Db252ZXJ0aWJsZVVuaXRzW2N1clVuaXRdKSB7XG4gICAgcmV0dXJuIGN1clZhbHVlO1xuICB9XG5cbiAgY3VyVW5pdCAhPT0gXCJweFwiICYmICF0b1BpeGVscyAmJiAoY3VyVmFsdWUgPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgXCJweFwiKSk7XG4gIGlzU1ZHID0gdGFyZ2V0LmdldENUTSAmJiBfaXNTVkcodGFyZ2V0KTtcblxuICBpZiAodG9QZXJjZW50ICYmIChfdHJhbnNmb3JtUHJvcHNbcHJvcGVydHldIHx8IH5wcm9wZXJ0eS5pbmRleE9mKFwiYWRpdXNcIikpKSB7XG4gICAgLy90cmFuc2Zvcm1zIGFuZCBib3JkZXJSYWRpdXMgYXJlIHJlbGF0aXZlIHRvIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50IGl0c2VsZiFcbiAgICByZXR1cm4gX3JvdW5kKGN1clZhbHVlIC8gKGlzU1ZHID8gdGFyZ2V0LmdldEJCb3goKVtob3Jpem9udGFsID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIl0gOiB0YXJnZXRbbWVhc3VyZVByb3BlcnR5XSkgKiBhbW91bnQpO1xuICB9XG5cbiAgc3R5bGVbaG9yaXpvbnRhbCA/IFwid2lkdGhcIiA6IFwiaGVpZ2h0XCJdID0gYW1vdW50ICsgKHRvUGl4ZWxzID8gY3VyVW5pdCA6IHVuaXQpO1xuICBwYXJlbnQgPSB+cHJvcGVydHkuaW5kZXhPZihcImFkaXVzXCIpIHx8IHVuaXQgPT09IFwiZW1cIiAmJiB0YXJnZXQuYXBwZW5kQ2hpbGQgJiYgIWlzUm9vdFNWRyA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnROb2RlO1xuXG4gIGlmIChpc1NWRykge1xuICAgIHBhcmVudCA9ICh0YXJnZXQub3duZXJTVkdFbGVtZW50IHx8IHt9KS5wYXJlbnROb2RlO1xuICB9XG5cbiAgaWYgKCFwYXJlbnQgfHwgcGFyZW50ID09PSBfZG9jIHx8ICFwYXJlbnQuYXBwZW5kQ2hpbGQpIHtcbiAgICBwYXJlbnQgPSBfZG9jLmJvZHk7XG4gIH1cblxuICBjYWNoZSA9IHBhcmVudC5fZ3NhcDtcblxuICBpZiAoY2FjaGUgJiYgdG9QZXJjZW50ICYmIGNhY2hlLndpZHRoICYmIGhvcml6b250YWwgJiYgY2FjaGUudGltZSA9PT0gX3RpY2tlci50aW1lKSB7XG4gICAgcmV0dXJuIF9yb3VuZChjdXJWYWx1ZSAvIGNhY2hlLndpZHRoICogYW1vdW50KTtcbiAgfSBlbHNlIHtcbiAgICAodG9QZXJjZW50IHx8IGN1clVuaXQgPT09IFwiJVwiKSAmJiAoc3R5bGUucG9zaXRpb24gPSBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIFwicG9zaXRpb25cIikpO1xuICAgIHBhcmVudCA9PT0gdGFyZ2V0ICYmIChzdHlsZS5wb3NpdGlvbiA9IFwic3RhdGljXCIpOyAvLyBsaWtlIGZvciBib3JkZXJSYWRpdXMsIGlmIGl0J3MgYSAlIHdlIG11c3QgaGF2ZSBpdCByZWxhdGl2ZSB0byB0aGUgdGFyZ2V0IGl0c2VsZiBidXQgdGhhdCBtYXkgbm90IGhhdmUgcG9zaXRpb246IHJlbGF0aXZlIG9yIHBvc2l0aW9uOiBhYnNvbHV0ZSBpbiB3aGljaCBjYXNlIGl0J2QgZ28gdXAgdGhlIGNoYWluIHVudGlsIGl0IGZpbmRzIGl0cyBvZmZzZXRQYXJlbnQgKGJhZCkuIHBvc2l0aW9uOiBzdGF0aWMgcHJvdGVjdHMgYWdhaW5zdCB0aGF0LlxuXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKF90ZW1wRGl2KTtcbiAgICBweCA9IF90ZW1wRGl2W21lYXN1cmVQcm9wZXJ0eV07XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKF90ZW1wRGl2KTtcbiAgICBzdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblxuICAgIGlmIChob3Jpem9udGFsICYmIHRvUGVyY2VudCkge1xuICAgICAgY2FjaGUgPSBfZ2V0Q2FjaGUocGFyZW50KTtcbiAgICAgIGNhY2hlLnRpbWUgPSBfdGlja2VyLnRpbWU7XG4gICAgICBjYWNoZS53aWR0aCA9IHBhcmVudFttZWFzdXJlUHJvcGVydHldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfcm91bmQodG9QaXhlbHMgPyBweCAqIGN1clZhbHVlIC8gYW1vdW50IDogcHggJiYgY3VyVmFsdWUgPyBhbW91bnQgLyBweCAqIGN1clZhbHVlIDogMCk7XG59LFxuICAgIF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHVuaXQsIHVuY2FjaGUpIHtcbiAgdmFyIHZhbHVlO1xuICBfcGx1Z2luSW5pdHRlZCB8fCBfaW5pdENvcmUoKTtcblxuICBpZiAocHJvcGVydHkgaW4gX3Byb3BlcnR5QWxpYXNlcyAmJiBwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgIHByb3BlcnR5ID0gX3Byb3BlcnR5QWxpYXNlc1twcm9wZXJ0eV07XG5cbiAgICBpZiAofnByb3BlcnR5LmluZGV4T2YoXCIsXCIpKSB7XG4gICAgICBwcm9wZXJ0eSA9IHByb3BlcnR5LnNwbGl0KFwiLFwiKVswXTtcbiAgICB9XG4gIH1cblxuICBpZiAoX3RyYW5zZm9ybVByb3BzW3Byb3BlcnR5XSAmJiBwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgIHZhbHVlID0gX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgdW5jYWNoZSk7XG4gICAgdmFsdWUgPSBwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1PcmlnaW5cIiA/IHZhbHVlW3Byb3BlcnR5XSA6IF9maXJzdFR3b09ubHkoX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBfdHJhbnNmb3JtT3JpZ2luUHJvcCkpICsgXCIgXCIgKyB2YWx1ZS56T3JpZ2luICsgXCJweFwiO1xuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gdGFyZ2V0LnN0eWxlW3Byb3BlcnR5XTtcblxuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT09IFwiYXV0b1wiIHx8IHVuY2FjaGUgfHwgfih2YWx1ZSArIFwiXCIpLmluZGV4T2YoXCJjYWxjKFwiKSkge1xuICAgICAgdmFsdWUgPSBfc3BlY2lhbFByb3BzW3Byb3BlcnR5XSAmJiBfc3BlY2lhbFByb3BzW3Byb3BlcnR5XSh0YXJnZXQsIHByb3BlcnR5LCB1bml0KSB8fCBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB8fCBfZ2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkgfHwgKHByb3BlcnR5ID09PSBcIm9wYWNpdHlcIiA/IDEgOiAwKTsgLy8gbm90ZTogc29tZSBicm93c2VycywgbGlrZSBGaXJlZm94LCBkb24ndCByZXBvcnQgYm9yZGVyUmFkaXVzIGNvcnJlY3RseSEgSW5zdGVhZCwgaXQgb25seSByZXBvcnRzIGV2ZXJ5IGNvcm5lciBsaWtlICBib3JkZXJUb3BMZWZ0UmFkaXVzXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuaXQgJiYgIX4odmFsdWUgKyBcIlwiKS5pbmRleE9mKFwiIFwiKSA/IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCB1bml0KSArIHVuaXQgOiB2YWx1ZTtcbn0sXG4gICAgX3R3ZWVuQ29tcGxleENTU1N0cmluZyA9IGZ1bmN0aW9uIF90d2VlbkNvbXBsZXhDU1NTdHJpbmcodGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kKSB7XG4gIC8vbm90ZTogd2UgY2FsbCBfdHdlZW5Db21wbGV4Q1NTU3RyaW5nLmNhbGwocGx1Z2luSW5zdGFuY2UuLi4pIHRvIGVuc3VyZSB0aGF0IGl0J3Mgc2NvcGVkIHByb3Blcmx5LiBXZSBtYXkgY2FsbCBpdCBmcm9tIHdpdGhpbiBhIHBsdWdpbiB0b28sIHRodXMgXCJ0aGlzXCIgd291bGQgcmVmZXIgdG8gdGhlIHBsdWdpbi5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA9PT0gXCJub25lXCIpIHtcbiAgICAvLyBzb21lIGJyb3dzZXJzIGxpa2UgU2FmYXJpIGFjdHVhbGx5IFBSRUZFUiB0aGUgcHJlZml4ZWQgcHJvcGVydHkgYW5kIG1pcy1yZXBvcnQgdGhlIHVucHJlZml4ZWQgdmFsdWUgbGlrZSBjbGlwUGF0aCAoQlVHKS4gSW4gb3RoZXIgd29yZHMsIGV2ZW4gdGhvdWdoIGNsaXBQYXRoIGV4aXN0cyBpbiB0aGUgc3R5bGUgKFwiY2xpcFBhdGhcIiBpbiB0YXJnZXQuc3R5bGUpIGFuZCBpdCdzIHNldCBpbiB0aGUgQ1NTIHByb3Blcmx5IChhbG9uZyB3aXRoIC13ZWJraXQtY2xpcC1wYXRoKSwgU2FmYXJpIHJlcG9ydHMgY2xpcFBhdGggYXMgXCJub25lXCIgd2hlcmVhcyBXZWJraXRDbGlwUGF0aCByZXBvcnRzIGFjY3VyYXRlbHkgbGlrZSBcImVsbGlwc2UoMTAwJSAwJSBhdCA1MCUgMCUpXCIsIHNvIGluIHRoaXMgY2FzZSB3ZSBtdXN0IFNXSVRDSCB0byB1c2luZyB0aGUgcHJlZml4ZWQgcHJvcGVydHkgaW5zdGVhZC4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMTgzMTAtY2xpcHBhdGgtZG9lc250LXdvcmstb24taW9zL1xuICAgIHZhciBwID0gX2NoZWNrUHJvcFByZWZpeChwcm9wLCB0YXJnZXQsIDEpLFxuICAgICAgICBzID0gcCAmJiBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHAsIDEpO1xuXG4gICAgaWYgKHMgJiYgcyAhPT0gc3RhcnQpIHtcbiAgICAgIHByb3AgPSBwO1xuICAgICAgc3RhcnQgPSBzO1xuICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gXCJib3JkZXJDb2xvclwiKSB7XG4gICAgICBzdGFydCA9IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgXCJib3JkZXJUb3BDb2xvclwiKTsgLy8gRmlyZWZveCBidWc6IGFsd2F5cyByZXBvcnRzIFwiYm9yZGVyQ29sb3JcIiBhcyBcIlwiLCBzbyB3ZSBtdXN0IGZhbGwgYmFjayB0byBib3JkZXJUb3BDb2xvci4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjQ1ODMtaG93LXRvLXJldHVybi1jb2xvcnMtdGhhdC1pLWhhZC1hZnRlci1yZXZlcnNlL1xuICAgIH1cbiAgfVxuXG4gIHZhciBwdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHRhcmdldC5zdHlsZSwgcHJvcCwgMCwgMSwgX3JlbmRlckNvbXBsZXhTdHJpbmcpLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgbWF0Y2hJbmRleCA9IDAsXG4gICAgICBhLFxuICAgICAgcmVzdWx0LFxuICAgICAgc3RhcnRWYWx1ZXMsXG4gICAgICBzdGFydE51bSxcbiAgICAgIGNvbG9yLFxuICAgICAgc3RhcnRWYWx1ZSxcbiAgICAgIGVuZFZhbHVlLFxuICAgICAgZW5kTnVtLFxuICAgICAgY2h1bmssXG4gICAgICBlbmRVbml0LFxuICAgICAgc3RhcnRVbml0LFxuICAgICAgcmVsYXRpdmUsXG4gICAgICBlbmRWYWx1ZXM7XG4gIHB0LmIgPSBzdGFydDtcbiAgcHQuZSA9IGVuZDtcbiAgc3RhcnQgKz0gXCJcIjsgLy9lbnN1cmUgdmFsdWVzIGFyZSBzdHJpbmdzXG5cbiAgZW5kICs9IFwiXCI7XG5cbiAgaWYgKGVuZCA9PT0gXCJhdXRvXCIpIHtcbiAgICB0YXJnZXQuc3R5bGVbcHJvcF0gPSBlbmQ7XG4gICAgZW5kID0gX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBwcm9wKSB8fCBlbmQ7XG4gICAgdGFyZ2V0LnN0eWxlW3Byb3BdID0gc3RhcnQ7XG4gIH1cblxuICBhID0gW3N0YXJ0LCBlbmRdO1xuXG4gIF9jb2xvclN0cmluZ0ZpbHRlcihhKTsgLy9wYXNzIGFuIGFycmF5IHdpdGggdGhlIHN0YXJ0aW5nIGFuZCBlbmRpbmcgdmFsdWVzIGFuZCBsZXQgdGhlIGZpbHRlciBkbyB3aGF0ZXZlciBpdCBuZWVkcyB0byB0aGUgdmFsdWVzLiBJZiBjb2xvcnMgYXJlIGZvdW5kLCBpdCByZXR1cm5zIHRydWUgYW5kIHRoZW4gd2UgbXVzdCBtYXRjaCB3aGVyZSB0aGUgY29sb3Igc2hvd3MgdXAgb3JkZXItd2lzZSBiZWNhdXNlIGZvciB0aGluZ3MgbGlrZSBib3hTaGFkb3csIHNvbWV0aW1lcyB0aGUgYnJvd3NlciBwcm92aWRlcyB0aGUgY29tcHV0ZWQgdmFsdWVzIHdpdGggdGhlIGNvbG9yIEZJUlNULCBidXQgdGhlIHVzZXIgcHJvdmlkZXMgaXQgd2l0aCB0aGUgY29sb3IgTEFTVCwgc28gZmxpcCB0aGVtIGlmIG5lY2Vzc2FyeS4gU2FtZSBmb3IgZHJvcC1zaGFkb3coKS5cblxuXG4gIHN0YXJ0ID0gYVswXTtcbiAgZW5kID0gYVsxXTtcbiAgc3RhcnRWYWx1ZXMgPSBzdGFydC5tYXRjaChfbnVtV2l0aFVuaXRFeHApIHx8IFtdO1xuICBlbmRWYWx1ZXMgPSBlbmQubWF0Y2goX251bVdpdGhVbml0RXhwKSB8fCBbXTtcblxuICBpZiAoZW5kVmFsdWVzLmxlbmd0aCkge1xuICAgIHdoaWxlIChyZXN1bHQgPSBfbnVtV2l0aFVuaXRFeHAuZXhlYyhlbmQpKSB7XG4gICAgICBlbmRWYWx1ZSA9IHJlc3VsdFswXTtcbiAgICAgIGNodW5rID0gZW5kLnN1YnN0cmluZyhpbmRleCwgcmVzdWx0LmluZGV4KTtcblxuICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIGNvbG9yID0gKGNvbG9yICsgMSkgJSA1O1xuICAgICAgfSBlbHNlIGlmIChjaHVuay5zdWJzdHIoLTUpID09PSBcInJnYmEoXCIgfHwgY2h1bmsuc3Vic3RyKC01KSA9PT0gXCJoc2xhKFwiKSB7XG4gICAgICAgIGNvbG9yID0gMTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVuZFZhbHVlICE9PSAoc3RhcnRWYWx1ZSA9IHN0YXJ0VmFsdWVzW21hdGNoSW5kZXgrK10gfHwgXCJcIikpIHtcbiAgICAgICAgc3RhcnROdW0gPSBwYXJzZUZsb2F0KHN0YXJ0VmFsdWUpIHx8IDA7XG4gICAgICAgIHN0YXJ0VW5pdCA9IHN0YXJ0VmFsdWUuc3Vic3RyKChzdGFydE51bSArIFwiXCIpLmxlbmd0aCk7XG4gICAgICAgIHJlbGF0aXZlID0gZW5kVmFsdWUuY2hhckF0KDEpID09PSBcIj1cIiA/ICsoZW5kVmFsdWUuY2hhckF0KDApICsgXCIxXCIpIDogMDtcblxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgICBlbmRWYWx1ZSA9IGVuZFZhbHVlLnN1YnN0cigyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVuZE51bSA9IHBhcnNlRmxvYXQoZW5kVmFsdWUpO1xuICAgICAgICBlbmRVbml0ID0gZW5kVmFsdWUuc3Vic3RyKChlbmROdW0gKyBcIlwiKS5sZW5ndGgpO1xuICAgICAgICBpbmRleCA9IF9udW1XaXRoVW5pdEV4cC5sYXN0SW5kZXggLSBlbmRVbml0Lmxlbmd0aDtcblxuICAgICAgICBpZiAoIWVuZFVuaXQpIHtcbiAgICAgICAgICAvL2lmIHNvbWV0aGluZyBsaWtlIFwicGVyc3BlY3RpdmU6MzAwXCIgaXMgcGFzc2VkIGluIGFuZCB3ZSBtdXN0IGFkZCBhIHVuaXQgdG8gdGhlIGVuZFxuICAgICAgICAgIGVuZFVuaXQgPSBlbmRVbml0IHx8IF9jb25maWcudW5pdHNbcHJvcF0gfHwgc3RhcnRVbml0O1xuXG4gICAgICAgICAgaWYgKGluZGV4ID09PSBlbmQubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbmQgKz0gZW5kVW5pdDtcbiAgICAgICAgICAgIHB0LmUgKz0gZW5kVW5pdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnRVbml0ICE9PSBlbmRVbml0KSB7XG4gICAgICAgICAgc3RhcnROdW0gPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3AsIHN0YXJ0VmFsdWUsIGVuZFVuaXQpIHx8IDA7XG4gICAgICAgIH0gLy90aGVzZSBuZXN0ZWQgUHJvcFR3ZWVucyBhcmUgaGFuZGxlZCBpbiBhIHNwZWNpYWwgd2F5IC0gd2UnbGwgbmV2ZXIgYWN0dWFsbHkgY2FsbCBhIHJlbmRlciBvciBzZXR0ZXIgbWV0aG9kIG9uIHRoZW0uIFdlJ2xsIGp1c3QgbG9vcCB0aHJvdWdoIHRoZW0gaW4gdGhlIHBhcmVudCBjb21wbGV4IHN0cmluZyBQcm9wVHdlZW4ncyByZW5kZXIgbWV0aG9kLlxuXG5cbiAgICAgICAgcHQuX3B0ID0ge1xuICAgICAgICAgIF9uZXh0OiBwdC5fcHQsXG4gICAgICAgICAgcDogY2h1bmsgfHwgbWF0Y2hJbmRleCA9PT0gMSA/IGNodW5rIDogXCIsXCIsXG4gICAgICAgICAgLy9ub3RlOiBTVkcgc3BlYyBhbGxvd3Mgb21pc3Npb24gb2YgY29tbWEvc3BhY2Ugd2hlbiBhIG5lZ2F0aXZlIHNpZ24gaXMgd2VkZ2VkIGJldHdlZW4gdHdvIG51bWJlcnMsIGxpa2UgMi41LTUuMyBpbnN0ZWFkIG9mIDIuNSwtNS4zIGJ1dCB3aGVuIHR3ZWVuaW5nLCB0aGUgbmVnYXRpdmUgdmFsdWUgbWF5IHN3aXRjaCB0byBwb3NpdGl2ZSwgc28gd2UgaW5zZXJ0IHRoZSBjb21tYSBqdXN0IGluIGNhc2UuXG4gICAgICAgICAgczogc3RhcnROdW0sXG4gICAgICAgICAgYzogcmVsYXRpdmUgPyByZWxhdGl2ZSAqIGVuZE51bSA6IGVuZE51bSAtIHN0YXJ0TnVtLFxuICAgICAgICAgIG06IGNvbG9yICYmIGNvbG9yIDwgNCA/IE1hdGgucm91bmQgOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHQuYyA9IGluZGV4IDwgZW5kLmxlbmd0aCA/IGVuZC5zdWJzdHJpbmcoaW5kZXgsIGVuZC5sZW5ndGgpIDogXCJcIjsgLy93ZSB1c2UgdGhlIFwiY1wiIG9mIHRoZSBQcm9wVHdlZW4gdG8gc3RvcmUgdGhlIGZpbmFsIHBhcnQgb2YgdGhlIHN0cmluZyAoYWZ0ZXIgdGhlIGxhc3QgbnVtYmVyKVxuICB9IGVsc2Uge1xuICAgIHB0LnIgPSBwcm9wID09PSBcImRpc3BsYXlcIiAmJiBlbmQgPT09IFwibm9uZVwiID8gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWVPbmx5QXRFbmQgOiBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZTtcbiAgfVxuXG4gIGlmIChfcmVsRXhwLnRlc3QoZW5kKSkge1xuICAgIHB0LmUgPSAwOyAvL2lmIHRoZSBlbmQgc3RyaW5nIGNvbnRhaW5zIHJlbGF0aXZlIHZhbHVlcyBvciBkeW5hbWljIHJhbmRvbSguLi4pIHZhbHVlcywgZGVsZXRlIHRoZSBlbmQgaXQgc28gdGhhdCBvbiB0aGUgZmluYWwgcmVuZGVyIHdlIGRvbid0IGFjdHVhbGx5IHNldCBpdCB0byB0aGUgc3RyaW5nIHdpdGggKz0gb3IgLT0gY2hhcmFjdGVycyAoZm9yY2VzIGl0IHRvIHVzZSB0aGUgY2FsY3VsYXRlZCB2YWx1ZSkuXG4gIH1cblxuICB0aGlzLl9wdCA9IHB0OyAvL3N0YXJ0IHRoZSBsaW5rZWQgbGlzdCB3aXRoIHRoaXMgbmV3IFByb3BUd2Vlbi4gUmVtZW1iZXIsIHdlIGNhbGwgX3R3ZWVuQ29tcGxleENTU1N0cmluZy5jYWxsKHBsdWdpbkluc3RhbmNlLi4uKSB0byBlbnN1cmUgdGhhdCBpdCdzIHNjb3BlZCBwcm9wZXJseS4gV2UgbWF5IGNhbGwgaXQgZnJvbSB3aXRoaW4gYW5vdGhlciBwbHVnaW4gdG9vLCB0aHVzIFwidGhpc1wiIHdvdWxkIHJlZmVyIHRvIHRoZSBwbHVnaW4uXG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfa2V5d29yZFRvUGVyY2VudCA9IHtcbiAgdG9wOiBcIjAlXCIsXG4gIGJvdHRvbTogXCIxMDAlXCIsXG4gIGxlZnQ6IFwiMCVcIixcbiAgcmlnaHQ6IFwiMTAwJVwiLFxuICBjZW50ZXI6IFwiNTAlXCJcbn0sXG4gICAgX2NvbnZlcnRLZXl3b3Jkc1RvUGVyY2VudGFnZXMgPSBmdW5jdGlvbiBfY29udmVydEtleXdvcmRzVG9QZXJjZW50YWdlcyh2YWx1ZSkge1xuICB2YXIgc3BsaXQgPSB2YWx1ZS5zcGxpdChcIiBcIiksXG4gICAgICB4ID0gc3BsaXRbMF0sXG4gICAgICB5ID0gc3BsaXRbMV0gfHwgXCI1MCVcIjtcblxuICBpZiAoeCA9PT0gXCJ0b3BcIiB8fCB4ID09PSBcImJvdHRvbVwiIHx8IHkgPT09IFwibGVmdFwiIHx8IHkgPT09IFwicmlnaHRcIikge1xuICAgIC8vdGhlIHVzZXIgcHJvdmlkZWQgdGhlbSBpbiB0aGUgd3Jvbmcgb3JkZXIsIHNvIGZsaXAgdGhlbVxuICAgIHZhbHVlID0geDtcbiAgICB4ID0geTtcbiAgICB5ID0gdmFsdWU7XG4gIH1cblxuICBzcGxpdFswXSA9IF9rZXl3b3JkVG9QZXJjZW50W3hdIHx8IHg7XG4gIHNwbGl0WzFdID0gX2tleXdvcmRUb1BlcmNlbnRbeV0gfHwgeTtcbiAgcmV0dXJuIHNwbGl0LmpvaW4oXCIgXCIpO1xufSxcbiAgICBfcmVuZGVyQ2xlYXJQcm9wcyA9IGZ1bmN0aW9uIF9yZW5kZXJDbGVhclByb3BzKHJhdGlvLCBkYXRhKSB7XG4gIGlmIChkYXRhLnR3ZWVuICYmIGRhdGEudHdlZW4uX3RpbWUgPT09IGRhdGEudHdlZW4uX2R1cikge1xuICAgIHZhciB0YXJnZXQgPSBkYXRhLnQsXG4gICAgICAgIHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICAgICAgICBwcm9wcyA9IGRhdGEudSxcbiAgICAgICAgY2FjaGUgPSB0YXJnZXQuX2dzYXAsXG4gICAgICAgIHByb3AsXG4gICAgICAgIGNsZWFyVHJhbnNmb3JtcyxcbiAgICAgICAgaTtcblxuICAgIGlmIChwcm9wcyA9PT0gXCJhbGxcIiB8fCBwcm9wcyA9PT0gdHJ1ZSkge1xuICAgICAgc3R5bGUuY3NzVGV4dCA9IFwiXCI7XG4gICAgICBjbGVhclRyYW5zZm9ybXMgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcyA9IHByb3BzLnNwbGl0KFwiLFwiKTtcbiAgICAgIGkgPSBwcm9wcy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xuICAgICAgICBwcm9wID0gcHJvcHNbaV07XG5cbiAgICAgICAgaWYgKF90cmFuc2Zvcm1Qcm9wc1twcm9wXSkge1xuICAgICAgICAgIGNsZWFyVHJhbnNmb3JtcyA9IDE7XG4gICAgICAgICAgcHJvcCA9IHByb3AgPT09IFwidHJhbnNmb3JtT3JpZ2luXCIgPyBfdHJhbnNmb3JtT3JpZ2luUHJvcCA6IF90cmFuc2Zvcm1Qcm9wO1xuICAgICAgICB9XG5cbiAgICAgICAgX3JlbW92ZVByb3BlcnR5KHRhcmdldCwgcHJvcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNsZWFyVHJhbnNmb3Jtcykge1xuICAgICAgX3JlbW92ZVByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybVByb3ApO1xuXG4gICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgY2FjaGUuc3ZnICYmIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIik7XG5cbiAgICAgICAgX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgMSk7IC8vIGZvcmNlIGFsbCB0aGUgY2FjaGVkIHZhbHVlcyBiYWNrIHRvIFwibm9ybWFsXCIvaWRlbnRpdHksIG90aGVyd2lzZSBpZiB0aGVyZSdzIGFub3RoZXIgdHdlZW4gdGhhdCdzIGFscmVhZHkgc2V0IHRvIHJlbmRlciB0cmFuc2Zvcm1zIG9uIHRoaXMgZWxlbWVudCwgaXQgY291bGQgZGlzcGxheSB0aGUgd3JvbmcgdmFsdWVzLlxuXG5cbiAgICAgICAgY2FjaGUudW5jYWNoZSA9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG59LFxuICAgIC8vIG5vdGU6IHNwZWNpYWxQcm9wcyBzaG91bGQgcmV0dXJuIDEgaWYgKGFuZCBvbmx5IGlmKSB0aGV5IGhhdmUgYSBub24temVybyBwcmlvcml0eS4gSXQgaW5kaWNhdGVzIHdlIG5lZWQgdG8gc29ydCB0aGUgbGlua2VkIGxpc3QuXG5fc3BlY2lhbFByb3BzID0ge1xuICBjbGVhclByb3BzOiBmdW5jdGlvbiBjbGVhclByb3BzKHBsdWdpbiwgdGFyZ2V0LCBwcm9wZXJ0eSwgZW5kVmFsdWUsIHR3ZWVuKSB7XG4gICAgaWYgKHR3ZWVuLmRhdGEgIT09IFwiaXNGcm9tU3RhcnRcIikge1xuICAgICAgdmFyIHB0ID0gcGx1Z2luLl9wdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgdGFyZ2V0LCBwcm9wZXJ0eSwgMCwgMCwgX3JlbmRlckNsZWFyUHJvcHMpO1xuICAgICAgcHQudSA9IGVuZFZhbHVlO1xuICAgICAgcHQucHIgPSAtMTA7XG4gICAgICBwdC50d2VlbiA9IHR3ZWVuO1xuXG4gICAgICBwbHVnaW4uX3Byb3BzLnB1c2gocHJvcGVydHkpO1xuXG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cbiAgLyogY2xhc3NOYW1lIGZlYXR1cmUgKGFib3V0IDAuNGtiIGd6aXBwZWQpLlxuICAsIGNsYXNzTmFtZShwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIGVuZFZhbHVlLCB0d2Vlbikge1xuICBcdGxldCBfcmVuZGVyQ2xhc3NOYW1lID0gKHJhdGlvLCBkYXRhKSA9PiB7XG4gIFx0XHRcdGRhdGEuY3NzLnJlbmRlcihyYXRpbywgZGF0YS5jc3MpO1xuICBcdFx0XHRpZiAoIXJhdGlvIHx8IHJhdGlvID09PSAxKSB7XG4gIFx0XHRcdFx0bGV0IGlubGluZSA9IGRhdGEucm12LFxuICBcdFx0XHRcdFx0dGFyZ2V0ID0gZGF0YS50LFxuICBcdFx0XHRcdFx0cDtcbiAgXHRcdFx0XHR0YXJnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgcmF0aW8gPyBkYXRhLmUgOiBkYXRhLmIpO1xuICBcdFx0XHRcdGZvciAocCBpbiBpbmxpbmUpIHtcbiAgXHRcdFx0XHRcdF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIHApO1xuICBcdFx0XHRcdH1cbiAgXHRcdFx0fVxuICBcdFx0fSxcbiAgXHRcdF9nZXRBbGxTdHlsZXMgPSAodGFyZ2V0KSA9PiB7XG4gIFx0XHRcdGxldCBzdHlsZXMgPSB7fSxcbiAgXHRcdFx0XHRjb21wdXRlZCA9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KSxcbiAgXHRcdFx0XHRwO1xuICBcdFx0XHRmb3IgKHAgaW4gY29tcHV0ZWQpIHtcbiAgXHRcdFx0XHRpZiAoaXNOYU4ocCkgJiYgcCAhPT0gXCJjc3NUZXh0XCIgJiYgcCAhPT0gXCJsZW5ndGhcIikge1xuICBcdFx0XHRcdFx0c3R5bGVzW3BdID0gY29tcHV0ZWRbcF07XG4gIFx0XHRcdFx0fVxuICBcdFx0XHR9XG4gIFx0XHRcdF9zZXREZWZhdWx0cyhzdHlsZXMsIF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIDEpKTtcbiAgXHRcdFx0cmV0dXJuIHN0eWxlcztcbiAgXHRcdH0sXG4gIFx0XHRzdGFydENsYXNzTGlzdCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSxcbiAgXHRcdHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICBcdFx0Y3NzVGV4dCA9IHN0eWxlLmNzc1RleHQsXG4gIFx0XHRjYWNoZSA9IHRhcmdldC5fZ3NhcCxcbiAgXHRcdGNsYXNzUFQgPSBjYWNoZS5jbGFzc1BULFxuICBcdFx0aW5saW5lVG9SZW1vdmVBdEVuZCA9IHt9LFxuICBcdFx0ZGF0YSA9IHt0OnRhcmdldCwgcGx1Z2luOnBsdWdpbiwgcm12OmlubGluZVRvUmVtb3ZlQXRFbmQsIGI6c3RhcnRDbGFzc0xpc3QsIGU6KGVuZFZhbHVlLmNoYXJBdCgxKSAhPT0gXCI9XCIpID8gZW5kVmFsdWUgOiBzdGFydENsYXNzTGlzdC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoPzpcXFxcc3xeKVwiICsgZW5kVmFsdWUuc3Vic3RyKDIpICsgXCIoPyFbXFxcXHctXSlcIiksIFwiXCIpICsgKChlbmRWYWx1ZS5jaGFyQXQoMCkgPT09IFwiK1wiKSA/IFwiIFwiICsgZW5kVmFsdWUuc3Vic3RyKDIpIDogXCJcIil9LFxuICBcdFx0Y2hhbmdpbmdWYXJzID0ge30sXG4gIFx0XHRzdGFydFZhcnMgPSBfZ2V0QWxsU3R5bGVzKHRhcmdldCksXG4gIFx0XHR0cmFuc2Zvcm1SZWxhdGVkID0gLyh0cmFuc2Zvcm18cGVyc3BlY3RpdmUpL2ksXG4gIFx0XHRlbmRWYXJzLCBwO1xuICBcdGlmIChjbGFzc1BUKSB7XG4gIFx0XHRjbGFzc1BULnIoMSwgY2xhc3NQVC5kKTtcbiAgXHRcdF9yZW1vdmVMaW5rZWRMaXN0SXRlbShjbGFzc1BULmQucGx1Z2luLCBjbGFzc1BULCBcIl9wdFwiKTtcbiAgXHR9XG4gIFx0dGFyZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGRhdGEuZSk7XG4gIFx0ZW5kVmFycyA9IF9nZXRBbGxTdHlsZXModGFyZ2V0LCB0cnVlKTtcbiAgXHR0YXJnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgc3RhcnRDbGFzc0xpc3QpO1xuICBcdGZvciAocCBpbiBlbmRWYXJzKSB7XG4gIFx0XHRpZiAoZW5kVmFyc1twXSAhPT0gc3RhcnRWYXJzW3BdICYmICF0cmFuc2Zvcm1SZWxhdGVkLnRlc3QocCkpIHtcbiAgXHRcdFx0Y2hhbmdpbmdWYXJzW3BdID0gZW5kVmFyc1twXTtcbiAgXHRcdFx0aWYgKCFzdHlsZVtwXSAmJiBzdHlsZVtwXSAhPT0gXCIwXCIpIHtcbiAgXHRcdFx0XHRpbmxpbmVUb1JlbW92ZUF0RW5kW3BdID0gMTtcbiAgXHRcdFx0fVxuICBcdFx0fVxuICBcdH1cbiAgXHRjYWNoZS5jbGFzc1BUID0gcGx1Z2luLl9wdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgdGFyZ2V0LCBcImNsYXNzTmFtZVwiLCAwLCAwLCBfcmVuZGVyQ2xhc3NOYW1lLCBkYXRhLCAwLCAtMTEpO1xuICBcdGlmIChzdHlsZS5jc3NUZXh0ICE9PSBjc3NUZXh0KSB7IC8vb25seSBhcHBseSBpZiB0aGluZ3MgY2hhbmdlLiBPdGhlcndpc2UsIGluIGNhc2VzIGxpa2UgYSBiYWNrZ3JvdW5kLWltYWdlIHRoYXQncyBwdWxsZWQgZHluYW1pY2FsbHksIGl0IGNvdWxkIGNhdXNlIGEgcmVmcmVzaC4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjAzNjgtcG9zc2libGUtZ3NhcC1idWctc3dpdGNoaW5nLWNsYXNzbmFtZXMtaW4tY2hyb21lLy5cbiAgXHRcdHN0eWxlLmNzc1RleHQgPSBjc3NUZXh0OyAvL3dlIHJlY29yZGVkIGNzc1RleHQgYmVmb3JlIHdlIHN3YXBwZWQgY2xhc3NlcyBhbmQgcmFuIF9nZXRBbGxTdHlsZXMoKSBiZWNhdXNlIGluIGNhc2VzIHdoZW4gYSBjbGFzc05hbWUgdHdlZW4gaXMgb3ZlcndyaXR0ZW4sIHdlIHJlbW92ZSBhbGwgdGhlIHJlbGF0ZWQgdHdlZW5pbmcgcHJvcGVydGllcyBmcm9tIHRoYXQgY2xhc3MgY2hhbmdlIChvdGhlcndpc2UgY2xhc3Mtc3BlY2lmaWMgc3R1ZmYgY2FuJ3Qgb3ZlcnJpZGUgcHJvcGVydGllcyB3ZSd2ZSBkaXJlY3RseSBzZXQgb24gdGhlIHRhcmdldCdzIHN0eWxlIG9iamVjdCBkdWUgdG8gc3BlY2lmaWNpdHkpLlxuICBcdH1cbiAgXHRfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCB0cnVlKTsgLy90byBjbGVhciB0aGUgY2FjaGluZyBvZiB0cmFuc2Zvcm1zXG4gIFx0ZGF0YS5jc3MgPSBuZXcgZ3NhcC5wbHVnaW5zLmNzcygpO1xuICBcdGRhdGEuY3NzLmluaXQodGFyZ2V0LCBjaGFuZ2luZ1ZhcnMsIHR3ZWVuKTtcbiAgXHRwbHVnaW4uX3Byb3BzLnB1c2goLi4uZGF0YS5jc3MuX3Byb3BzKTtcbiAgXHRyZXR1cm4gMTtcbiAgfVxuICAqL1xuXG59LFxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRSQU5TRk9STVNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cbl9pZGVudGl0eTJETWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdLFxuICAgIF9yb3RhdGlvbmFsUHJvcGVydGllcyA9IHt9LFxuICAgIF9pc051bGxUcmFuc2Zvcm0gPSBmdW5jdGlvbiBfaXNOdWxsVHJhbnNmb3JtKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gXCJtYXRyaXgoMSwgMCwgMCwgMSwgMCwgMClcIiB8fCB2YWx1ZSA9PT0gXCJub25lXCIgfHwgIXZhbHVlO1xufSxcbiAgICBfZ2V0Q29tcHV0ZWRUcmFuc2Zvcm1NYXRyaXhBc0FycmF5ID0gZnVuY3Rpb24gX2dldENvbXB1dGVkVHJhbnNmb3JtTWF0cml4QXNBcnJheSh0YXJnZXQpIHtcbiAgdmFyIG1hdHJpeFN0cmluZyA9IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybVByb3ApO1xuXG4gIHJldHVybiBfaXNOdWxsVHJhbnNmb3JtKG1hdHJpeFN0cmluZykgPyBfaWRlbnRpdHkyRE1hdHJpeCA6IG1hdHJpeFN0cmluZy5zdWJzdHIoNykubWF0Y2goX251bUV4cCkubWFwKF9yb3VuZCk7XG59LFxuICAgIF9nZXRNYXRyaXggPSBmdW5jdGlvbiBfZ2V0TWF0cml4KHRhcmdldCwgZm9yY2UyRCkge1xuICB2YXIgY2FjaGUgPSB0YXJnZXQuX2dzYXAgfHwgX2dldENhY2hlKHRhcmdldCksXG4gICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgIG1hdHJpeCA9IF9nZXRDb21wdXRlZFRyYW5zZm9ybU1hdHJpeEFzQXJyYXkodGFyZ2V0KSxcbiAgICAgIHBhcmVudCxcbiAgICAgIG5leHRTaWJsaW5nLFxuICAgICAgdGVtcCxcbiAgICAgIGFkZGVkVG9ET007XG5cbiAgaWYgKGNhY2hlLnN2ZyAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIpKSB7XG4gICAgdGVtcCA9IHRhcmdldC50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpLm1hdHJpeDsgLy9lbnN1cmVzIHRoYXQgZXZlbiBjb21wbGV4IHZhbHVlcyBsaWtlIFwidHJhbnNsYXRlKDUwLDYwKSByb3RhdGUoMTM1LDAsMClcIiBhcmUgcGFyc2VkIGJlY2F1c2UgaXQgbWFzaGVzIGl0IGludG8gYSBtYXRyaXguXG5cbiAgICBtYXRyaXggPSBbdGVtcC5hLCB0ZW1wLmIsIHRlbXAuYywgdGVtcC5kLCB0ZW1wLmUsIHRlbXAuZl07XG4gICAgcmV0dXJuIG1hdHJpeC5qb2luKFwiLFwiKSA9PT0gXCIxLDAsMCwxLDAsMFwiID8gX2lkZW50aXR5MkRNYXRyaXggOiBtYXRyaXg7XG4gIH0gZWxzZSBpZiAobWF0cml4ID09PSBfaWRlbnRpdHkyRE1hdHJpeCAmJiAhdGFyZ2V0Lm9mZnNldFBhcmVudCAmJiB0YXJnZXQgIT09IF9kb2NFbGVtZW50ICYmICFjYWNoZS5zdmcpIHtcbiAgICAvL25vdGU6IGlmIG9mZnNldFBhcmVudCBpcyBudWxsLCB0aGF0IG1lYW5zIHRoZSBlbGVtZW50IGlzbid0IGluIHRoZSBub3JtYWwgZG9jdW1lbnQgZmxvdywgbGlrZSBpZiBpdCBoYXMgZGlzcGxheTpub25lIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyBkaXNwbGF5Om5vbmUpLiBGaXJlZm94IHJldHVybnMgbnVsbCBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSgpIGlmIHRoZSBlbGVtZW50IGlzIGluIGFuIGlmcmFtZSB0aGF0IGhhcyBkaXNwbGF5Om5vbmUuIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICAgIC8vYnJvd3NlcnMgZG9uJ3QgcmVwb3J0IHRyYW5zZm9ybXMgYWNjdXJhdGVseSB1bmxlc3MgdGhlIGVsZW1lbnQgaXMgaW4gdGhlIERPTSBhbmQgaGFzIGEgZGlzcGxheSB2YWx1ZSB0aGF0J3Mgbm90IFwibm9uZVwiLiBGaXJlZm94IGFuZCBNaWNyb3NvZnQgYnJvd3NlcnMgaGF2ZSBhIHBhcnRpYWwgYnVnIHdoZXJlIHRoZXknbGwgcmVwb3J0IHRyYW5zZm9ybXMgZXZlbiBpZiBkaXNwbGF5Om5vbmUgQlVUIG5vdCBhbnkgcGVyY2VudGFnZS1iYXNlZCB2YWx1ZXMgbGlrZSB0cmFuc2xhdGUoLTUwJSwgOHB4KSB3aWxsIGJlIHJlcG9ydGVkIGFzIGlmIGl0J3MgdHJhbnNsYXRlKDAsIDhweCkuXG4gICAgdGVtcCA9IHN0eWxlLmRpc3BsYXk7XG4gICAgc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcblxuICAgIGlmICghcGFyZW50IHx8ICF0YXJnZXQub2Zmc2V0UGFyZW50KSB7XG4gICAgICAvLyBub3RlOiBpbiAzLjMuMCB3ZSBzd2l0Y2hlZCB0YXJnZXQub2Zmc2V0UGFyZW50IHRvIF9kb2MuYm9keS5jb250YWlucyh0YXJnZXQpIHRvIGF2b2lkIFtzb21ldGltZXMgdW5uZWNlc3NhcnldIE11dGF0aW9uT2JzZXJ2ZXIgY2FsbHMgYnV0IHRoYXQgd2Fzbid0IGFkZXF1YXRlIGJlY2F1c2UgdGhlcmUgYXJlIGVkZ2UgY2FzZXMgd2hlcmUgbmVzdGVkIHBvc2l0aW9uOiBmaXhlZCBlbGVtZW50cyBuZWVkIHRvIGdldCByZXBhcmVudGVkIHRvIGFjY3VyYXRlbHkgc2Vuc2UgdHJhbnNmb3Jtcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmVlbnNvY2svR1NBUC9pc3N1ZXMvMzg4IGFuZCBodHRwczovL2dpdGh1Yi5jb20vZ3JlZW5zb2NrL0dTQVAvaXNzdWVzLzM3NVxuICAgICAgYWRkZWRUb0RPTSA9IDE7IC8vZmxhZ1xuXG4gICAgICBuZXh0U2libGluZyA9IHRhcmdldC5uZXh0U2libGluZztcblxuICAgICAgX2RvY0VsZW1lbnQuYXBwZW5kQ2hpbGQodGFyZ2V0KTsgLy93ZSBtdXN0IGFkZCBpdCB0byB0aGUgRE9NIGluIG9yZGVyIHRvIGdldCB2YWx1ZXMgcHJvcGVybHlcblxuICAgIH1cblxuICAgIG1hdHJpeCA9IF9nZXRDb21wdXRlZFRyYW5zZm9ybU1hdHJpeEFzQXJyYXkodGFyZ2V0KTtcbiAgICB0ZW1wID8gc3R5bGUuZGlzcGxheSA9IHRlbXAgOiBfcmVtb3ZlUHJvcGVydHkodGFyZ2V0LCBcImRpc3BsYXlcIik7XG5cbiAgICBpZiAoYWRkZWRUb0RPTSkge1xuICAgICAgbmV4dFNpYmxpbmcgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKHRhcmdldCwgbmV4dFNpYmxpbmcpIDogcGFyZW50ID8gcGFyZW50LmFwcGVuZENoaWxkKHRhcmdldCkgOiBfZG9jRWxlbWVudC5yZW1vdmVDaGlsZCh0YXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmb3JjZTJEICYmIG1hdHJpeC5sZW5ndGggPiA2ID8gW21hdHJpeFswXSwgbWF0cml4WzFdLCBtYXRyaXhbNF0sIG1hdHJpeFs1XSwgbWF0cml4WzEyXSwgbWF0cml4WzEzXV0gOiBtYXRyaXg7XG59LFxuICAgIF9hcHBseVNWR09yaWdpbiA9IGZ1bmN0aW9uIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIG9yaWdpbiwgb3JpZ2luSXNBYnNvbHV0ZSwgc21vb3RoLCBtYXRyaXhBcnJheSwgcGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8pIHtcbiAgdmFyIGNhY2hlID0gdGFyZ2V0Ll9nc2FwLFxuICAgICAgbWF0cml4ID0gbWF0cml4QXJyYXkgfHwgX2dldE1hdHJpeCh0YXJnZXQsIHRydWUpLFxuICAgICAgeE9yaWdpbk9sZCA9IGNhY2hlLnhPcmlnaW4gfHwgMCxcbiAgICAgIHlPcmlnaW5PbGQgPSBjYWNoZS55T3JpZ2luIHx8IDAsXG4gICAgICB4T2Zmc2V0T2xkID0gY2FjaGUueE9mZnNldCB8fCAwLFxuICAgICAgeU9mZnNldE9sZCA9IGNhY2hlLnlPZmZzZXQgfHwgMCxcbiAgICAgIGEgPSBtYXRyaXhbMF0sXG4gICAgICBiID0gbWF0cml4WzFdLFxuICAgICAgYyA9IG1hdHJpeFsyXSxcbiAgICAgIGQgPSBtYXRyaXhbM10sXG4gICAgICB0eCA9IG1hdHJpeFs0XSxcbiAgICAgIHR5ID0gbWF0cml4WzVdLFxuICAgICAgb3JpZ2luU3BsaXQgPSBvcmlnaW4uc3BsaXQoXCIgXCIpLFxuICAgICAgeE9yaWdpbiA9IHBhcnNlRmxvYXQob3JpZ2luU3BsaXRbMF0pIHx8IDAsXG4gICAgICB5T3JpZ2luID0gcGFyc2VGbG9hdChvcmlnaW5TcGxpdFsxXSkgfHwgMCxcbiAgICAgIGJvdW5kcyxcbiAgICAgIGRldGVybWluYW50LFxuICAgICAgeCxcbiAgICAgIHk7XG5cbiAgaWYgKCFvcmlnaW5Jc0Fic29sdXRlKSB7XG4gICAgYm91bmRzID0gX2dldEJCb3godGFyZ2V0KTtcbiAgICB4T3JpZ2luID0gYm91bmRzLnggKyAofm9yaWdpblNwbGl0WzBdLmluZGV4T2YoXCIlXCIpID8geE9yaWdpbiAvIDEwMCAqIGJvdW5kcy53aWR0aCA6IHhPcmlnaW4pO1xuICAgIHlPcmlnaW4gPSBib3VuZHMueSArICh+KG9yaWdpblNwbGl0WzFdIHx8IG9yaWdpblNwbGl0WzBdKS5pbmRleE9mKFwiJVwiKSA/IHlPcmlnaW4gLyAxMDAgKiBib3VuZHMuaGVpZ2h0IDogeU9yaWdpbik7XG4gIH0gZWxzZSBpZiAobWF0cml4ICE9PSBfaWRlbnRpdHkyRE1hdHJpeCAmJiAoZGV0ZXJtaW5hbnQgPSBhICogZCAtIGIgKiBjKSkge1xuICAgIC8vaWYgaXQncyB6ZXJvIChsaWtlIGlmIHNjYWxlWCBhbmQgc2NhbGVZIGFyZSB6ZXJvKSwgc2tpcCBpdCB0byBhdm9pZCBlcnJvcnMgd2l0aCBkaXZpZGluZyBieSB6ZXJvLlxuICAgIHggPSB4T3JpZ2luICogKGQgLyBkZXRlcm1pbmFudCkgKyB5T3JpZ2luICogKC1jIC8gZGV0ZXJtaW5hbnQpICsgKGMgKiB0eSAtIGQgKiB0eCkgLyBkZXRlcm1pbmFudDtcbiAgICB5ID0geE9yaWdpbiAqICgtYiAvIGRldGVybWluYW50KSArIHlPcmlnaW4gKiAoYSAvIGRldGVybWluYW50KSAtIChhICogdHkgLSBiICogdHgpIC8gZGV0ZXJtaW5hbnQ7XG4gICAgeE9yaWdpbiA9IHg7XG4gICAgeU9yaWdpbiA9IHk7XG4gIH1cblxuICBpZiAoc21vb3RoIHx8IHNtb290aCAhPT0gZmFsc2UgJiYgY2FjaGUuc21vb3RoKSB7XG4gICAgdHggPSB4T3JpZ2luIC0geE9yaWdpbk9sZDtcbiAgICB0eSA9IHlPcmlnaW4gLSB5T3JpZ2luT2xkO1xuICAgIGNhY2hlLnhPZmZzZXQgPSB4T2Zmc2V0T2xkICsgKHR4ICogYSArIHR5ICogYykgLSB0eDtcbiAgICBjYWNoZS55T2Zmc2V0ID0geU9mZnNldE9sZCArICh0eCAqIGIgKyB0eSAqIGQpIC0gdHk7XG4gIH0gZWxzZSB7XG4gICAgY2FjaGUueE9mZnNldCA9IGNhY2hlLnlPZmZzZXQgPSAwO1xuICB9XG5cbiAgY2FjaGUueE9yaWdpbiA9IHhPcmlnaW47XG4gIGNhY2hlLnlPcmlnaW4gPSB5T3JpZ2luO1xuICBjYWNoZS5zbW9vdGggPSAhIXNtb290aDtcbiAgY2FjaGUub3JpZ2luID0gb3JpZ2luO1xuICBjYWNoZS5vcmlnaW5Jc0Fic29sdXRlID0gISFvcmlnaW5Jc0Fic29sdXRlO1xuICB0YXJnZXQuc3R5bGVbX3RyYW5zZm9ybU9yaWdpblByb3BdID0gXCIwcHggMHB4XCI7IC8vb3RoZXJ3aXNlLCBpZiBzb21lb25lIHNldHMgIGFuIG9yaWdpbiB2aWEgQ1NTLCBpdCB3aWxsIGxpa2VseSBpbnRlcmZlcmUgd2l0aCB0aGUgU1ZHIHRyYW5zZm9ybSBhdHRyaWJ1dGUgb25lcyAoYmVjYXVzZSByZW1lbWJlciwgd2UncmUgYmFraW5nIHRoZSBvcmlnaW4gaW50byB0aGUgbWF0cml4KCkgdmFsdWUpLlxuXG4gIGlmIChwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbykge1xuICAgIF9hZGROb25Ud2VlbmluZ1BUKHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvLCBjYWNoZSwgXCJ4T3JpZ2luXCIsIHhPcmlnaW5PbGQsIHhPcmlnaW4pO1xuXG4gICAgX2FkZE5vblR3ZWVuaW5nUFQocGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8sIGNhY2hlLCBcInlPcmlnaW5cIiwgeU9yaWdpbk9sZCwgeU9yaWdpbik7XG5cbiAgICBfYWRkTm9uVHdlZW5pbmdQVChwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbywgY2FjaGUsIFwieE9mZnNldFwiLCB4T2Zmc2V0T2xkLCBjYWNoZS54T2Zmc2V0KTtcblxuICAgIF9hZGROb25Ud2VlbmluZ1BUKHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvLCBjYWNoZSwgXCJ5T2Zmc2V0XCIsIHlPZmZzZXRPbGQsIGNhY2hlLnlPZmZzZXQpO1xuICB9XG5cbiAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcImRhdGEtc3ZnLW9yaWdpblwiLCB4T3JpZ2luICsgXCIgXCIgKyB5T3JpZ2luKTtcbn0sXG4gICAgX3BhcnNlVHJhbnNmb3JtID0gZnVuY3Rpb24gX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgdW5jYWNoZSkge1xuICB2YXIgY2FjaGUgPSB0YXJnZXQuX2dzYXAgfHwgbmV3IEdTQ2FjaGUodGFyZ2V0KTtcblxuICBpZiAoXCJ4XCIgaW4gY2FjaGUgJiYgIXVuY2FjaGUgJiYgIWNhY2hlLnVuY2FjaGUpIHtcbiAgICByZXR1cm4gY2FjaGU7XG4gIH1cblxuICB2YXIgc3R5bGUgPSB0YXJnZXQuc3R5bGUsXG4gICAgICBpbnZlcnRlZFNjYWxlWCA9IGNhY2hlLnNjYWxlWCA8IDAsXG4gICAgICBweCA9IFwicHhcIixcbiAgICAgIGRlZyA9IFwiZGVnXCIsXG4gICAgICBvcmlnaW4gPSBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1PcmlnaW5Qcm9wKSB8fCBcIjBcIixcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgeixcbiAgICAgIHNjYWxlWCxcbiAgICAgIHNjYWxlWSxcbiAgICAgIHJvdGF0aW9uLFxuICAgICAgcm90YXRpb25YLFxuICAgICAgcm90YXRpb25ZLFxuICAgICAgc2tld1gsXG4gICAgICBza2V3WSxcbiAgICAgIHBlcnNwZWN0aXZlLFxuICAgICAgeE9yaWdpbixcbiAgICAgIHlPcmlnaW4sXG4gICAgICBtYXRyaXgsXG4gICAgICBhbmdsZSxcbiAgICAgIGNvcyxcbiAgICAgIHNpbixcbiAgICAgIGEsXG4gICAgICBiLFxuICAgICAgYyxcbiAgICAgIGQsXG4gICAgICBhMTIsXG4gICAgICBhMjIsXG4gICAgICB0MSxcbiAgICAgIHQyLFxuICAgICAgdDMsXG4gICAgICBhMTMsXG4gICAgICBhMjMsXG4gICAgICBhMzMsXG4gICAgICBhNDIsXG4gICAgICBhNDMsXG4gICAgICBhMzI7XG4gIHggPSB5ID0geiA9IHJvdGF0aW9uID0gcm90YXRpb25YID0gcm90YXRpb25ZID0gc2tld1ggPSBza2V3WSA9IHBlcnNwZWN0aXZlID0gMDtcbiAgc2NhbGVYID0gc2NhbGVZID0gMTtcbiAgY2FjaGUuc3ZnID0gISEodGFyZ2V0LmdldENUTSAmJiBfaXNTVkcodGFyZ2V0KSk7XG4gIG1hdHJpeCA9IF9nZXRNYXRyaXgodGFyZ2V0LCBjYWNoZS5zdmcpO1xuXG4gIGlmIChjYWNoZS5zdmcpIHtcbiAgICB0MSA9ICFjYWNoZS51bmNhY2hlICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN2Zy1vcmlnaW5cIik7XG5cbiAgICBfYXBwbHlTVkdPcmlnaW4odGFyZ2V0LCB0MSB8fCBvcmlnaW4sICEhdDEgfHwgY2FjaGUub3JpZ2luSXNBYnNvbHV0ZSwgY2FjaGUuc21vb3RoICE9PSBmYWxzZSwgbWF0cml4KTtcbiAgfVxuXG4gIHhPcmlnaW4gPSBjYWNoZS54T3JpZ2luIHx8IDA7XG4gIHlPcmlnaW4gPSBjYWNoZS55T3JpZ2luIHx8IDA7XG5cbiAgaWYgKG1hdHJpeCAhPT0gX2lkZW50aXR5MkRNYXRyaXgpIHtcbiAgICBhID0gbWF0cml4WzBdOyAvL2ExMVxuXG4gICAgYiA9IG1hdHJpeFsxXTsgLy9hMjFcblxuICAgIGMgPSBtYXRyaXhbMl07IC8vYTMxXG5cbiAgICBkID0gbWF0cml4WzNdOyAvL2E0MVxuXG4gICAgeCA9IGExMiA9IG1hdHJpeFs0XTtcbiAgICB5ID0gYTIyID0gbWF0cml4WzVdOyAvLzJEIG1hdHJpeFxuXG4gICAgaWYgKG1hdHJpeC5sZW5ndGggPT09IDYpIHtcbiAgICAgIHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcbiAgICAgIHNjYWxlWSA9IE1hdGguc3FydChkICogZCArIGMgKiBjKTtcbiAgICAgIHJvdGF0aW9uID0gYSB8fCBiID8gX2F0YW4yKGIsIGEpICogX1JBRDJERUcgOiAwOyAvL25vdGU6IGlmIHNjYWxlWCBpcyAwLCB3ZSBjYW5ub3QgYWNjdXJhdGVseSBtZWFzdXJlIHJvdGF0aW9uLiBTYW1lIGZvciBza2V3WCB3aXRoIGEgc2NhbGVZIG9mIDAuIFRoZXJlZm9yZSwgd2UgZGVmYXVsdCB0byB0aGUgcHJldmlvdXNseSByZWNvcmRlZCB2YWx1ZSAob3IgemVybyBpZiB0aGF0IGRvZXNuJ3QgZXhpc3QpLlxuXG4gICAgICBza2V3WCA9IGMgfHwgZCA/IF9hdGFuMihjLCBkKSAqIF9SQUQyREVHICsgcm90YXRpb24gOiAwO1xuICAgICAgc2tld1ggJiYgKHNjYWxlWSAqPSBNYXRoLmNvcyhza2V3WCAqIF9ERUcyUkFEKSk7XG5cbiAgICAgIGlmIChjYWNoZS5zdmcpIHtcbiAgICAgICAgeCAtPSB4T3JpZ2luIC0gKHhPcmlnaW4gKiBhICsgeU9yaWdpbiAqIGMpO1xuICAgICAgICB5IC09IHlPcmlnaW4gLSAoeE9yaWdpbiAqIGIgKyB5T3JpZ2luICogZCk7XG4gICAgICB9IC8vM0QgbWF0cml4XG5cbiAgICB9IGVsc2Uge1xuICAgICAgYTMyID0gbWF0cml4WzZdO1xuICAgICAgYTQyID0gbWF0cml4WzddO1xuICAgICAgYTEzID0gbWF0cml4WzhdO1xuICAgICAgYTIzID0gbWF0cml4WzldO1xuICAgICAgYTMzID0gbWF0cml4WzEwXTtcbiAgICAgIGE0MyA9IG1hdHJpeFsxMV07XG4gICAgICB4ID0gbWF0cml4WzEyXTtcbiAgICAgIHkgPSBtYXRyaXhbMTNdO1xuICAgICAgeiA9IG1hdHJpeFsxNF07XG4gICAgICBhbmdsZSA9IF9hdGFuMihhMzIsIGEzMyk7XG4gICAgICByb3RhdGlvblggPSBhbmdsZSAqIF9SQUQyREVHOyAvL3JvdGF0aW9uWFxuXG4gICAgICBpZiAoYW5nbGUpIHtcbiAgICAgICAgY29zID0gTWF0aC5jb3MoLWFuZ2xlKTtcbiAgICAgICAgc2luID0gTWF0aC5zaW4oLWFuZ2xlKTtcbiAgICAgICAgdDEgPSBhMTIgKiBjb3MgKyBhMTMgKiBzaW47XG4gICAgICAgIHQyID0gYTIyICogY29zICsgYTIzICogc2luO1xuICAgICAgICB0MyA9IGEzMiAqIGNvcyArIGEzMyAqIHNpbjtcbiAgICAgICAgYTEzID0gYTEyICogLXNpbiArIGExMyAqIGNvcztcbiAgICAgICAgYTIzID0gYTIyICogLXNpbiArIGEyMyAqIGNvcztcbiAgICAgICAgYTMzID0gYTMyICogLXNpbiArIGEzMyAqIGNvcztcbiAgICAgICAgYTQzID0gYTQyICogLXNpbiArIGE0MyAqIGNvcztcbiAgICAgICAgYTEyID0gdDE7XG4gICAgICAgIGEyMiA9IHQyO1xuICAgICAgICBhMzIgPSB0MztcbiAgICAgIH0gLy9yb3RhdGlvbllcblxuXG4gICAgICBhbmdsZSA9IF9hdGFuMigtYywgYTMzKTtcbiAgICAgIHJvdGF0aW9uWSA9IGFuZ2xlICogX1JBRDJERUc7XG5cbiAgICAgIGlmIChhbmdsZSkge1xuICAgICAgICBjb3MgPSBNYXRoLmNvcygtYW5nbGUpO1xuICAgICAgICBzaW4gPSBNYXRoLnNpbigtYW5nbGUpO1xuICAgICAgICB0MSA9IGEgKiBjb3MgLSBhMTMgKiBzaW47XG4gICAgICAgIHQyID0gYiAqIGNvcyAtIGEyMyAqIHNpbjtcbiAgICAgICAgdDMgPSBjICogY29zIC0gYTMzICogc2luO1xuICAgICAgICBhNDMgPSBkICogc2luICsgYTQzICogY29zO1xuICAgICAgICBhID0gdDE7XG4gICAgICAgIGIgPSB0MjtcbiAgICAgICAgYyA9IHQzO1xuICAgICAgfSAvL3JvdGF0aW9uWlxuXG5cbiAgICAgIGFuZ2xlID0gX2F0YW4yKGIsIGEpO1xuICAgICAgcm90YXRpb24gPSBhbmdsZSAqIF9SQUQyREVHO1xuXG4gICAgICBpZiAoYW5nbGUpIHtcbiAgICAgICAgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgIHQxID0gYSAqIGNvcyArIGIgKiBzaW47XG4gICAgICAgIHQyID0gYTEyICogY29zICsgYTIyICogc2luO1xuICAgICAgICBiID0gYiAqIGNvcyAtIGEgKiBzaW47XG4gICAgICAgIGEyMiA9IGEyMiAqIGNvcyAtIGExMiAqIHNpbjtcbiAgICAgICAgYSA9IHQxO1xuICAgICAgICBhMTIgPSB0MjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvdGF0aW9uWCAmJiBNYXRoLmFicyhyb3RhdGlvblgpICsgTWF0aC5hYnMocm90YXRpb24pID4gMzU5LjkpIHtcbiAgICAgICAgLy93aGVuIHJvdGF0aW9uWSBpcyBzZXQsIGl0IHdpbGwgb2Z0ZW4gYmUgcGFyc2VkIGFzIDE4MCBkZWdyZWVzIGRpZmZlcmVudCB0aGFuIGl0IHNob3VsZCBiZSwgYW5kIHJvdGF0aW9uWCBhbmQgcm90YXRpb24gYm90aCBiZWluZyAxODAgKGl0IGxvb2tzIHRoZSBzYW1lKSwgc28gd2UgYWRqdXN0IGZvciB0aGF0IGhlcmUuXG4gICAgICAgIHJvdGF0aW9uWCA9IHJvdGF0aW9uID0gMDtcbiAgICAgICAgcm90YXRpb25ZID0gMTgwIC0gcm90YXRpb25ZO1xuICAgICAgfVxuXG4gICAgICBzY2FsZVggPSBfcm91bmQoTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIgKyBjICogYykpO1xuICAgICAgc2NhbGVZID0gX3JvdW5kKE1hdGguc3FydChhMjIgKiBhMjIgKyBhMzIgKiBhMzIpKTtcbiAgICAgIGFuZ2xlID0gX2F0YW4yKGExMiwgYTIyKTtcbiAgICAgIHNrZXdYID0gTWF0aC5hYnMoYW5nbGUpID4gMC4wMDAyID8gYW5nbGUgKiBfUkFEMkRFRyA6IDA7XG4gICAgICBwZXJzcGVjdGl2ZSA9IGE0MyA/IDEgLyAoYTQzIDwgMCA/IC1hNDMgOiBhNDMpIDogMDtcbiAgICB9XG5cbiAgICBpZiAoY2FjaGUuc3ZnKSB7XG4gICAgICAvL3NlbnNlIGlmIHRoZXJlIGFyZSBDU1MgdHJhbnNmb3JtcyBhcHBsaWVkIG9uIGFuIFNWRyBlbGVtZW50IGluIHdoaWNoIGNhc2Ugd2UgbXVzdCBvdmVyd3JpdGUgdGhlbSB3aGVuIHJlbmRlcmluZy4gVGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUgaXMgbW9yZSByZWxpYWJsZSBjcm9zcy1icm93c2VyLCBidXQgd2UgY2FuJ3QganVzdCByZW1vdmUgdGhlIENTUyBvbmVzIGJlY2F1c2UgdGhleSBtYXkgYmUgYXBwbGllZCBpbiBhIENTUyBydWxlIHNvbWV3aGVyZSAobm90IGp1c3QgaW5saW5lKS5cbiAgICAgIHQxID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKTtcbiAgICAgIGNhY2hlLmZvcmNlQ1NTID0gdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBcIlwiKSB8fCAhX2lzTnVsbFRyYW5zZm9ybShfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1Qcm9wKSk7XG4gICAgICB0MSAmJiB0YXJnZXQuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHQxKTtcbiAgICB9XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoc2tld1gpID4gOTAgJiYgTWF0aC5hYnMoc2tld1gpIDwgMjcwKSB7XG4gICAgaWYgKGludmVydGVkU2NhbGVYKSB7XG4gICAgICBzY2FsZVggKj0gLTE7XG4gICAgICBza2V3WCArPSByb3RhdGlvbiA8PSAwID8gMTgwIDogLTE4MDtcbiAgICAgIHJvdGF0aW9uICs9IHJvdGF0aW9uIDw9IDAgPyAxODAgOiAtMTgwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2FsZVkgKj0gLTE7XG4gICAgICBza2V3WCArPSBza2V3WCA8PSAwID8gMTgwIDogLTE4MDtcbiAgICB9XG4gIH1cblxuICBjYWNoZS54ID0gKChjYWNoZS54UGVyY2VudCA9IHggJiYgTWF0aC5yb3VuZCh0YXJnZXQub2Zmc2V0V2lkdGggLyAyKSA9PT0gTWF0aC5yb3VuZCgteCkgPyAtNTAgOiAwKSA/IDAgOiB4KSArIHB4O1xuICBjYWNoZS55ID0gKChjYWNoZS55UGVyY2VudCA9IHkgJiYgTWF0aC5yb3VuZCh0YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMikgPT09IE1hdGgucm91bmQoLXkpID8gLTUwIDogMCkgPyAwIDogeSkgKyBweDtcbiAgY2FjaGUueiA9IHogKyBweDtcbiAgY2FjaGUuc2NhbGVYID0gX3JvdW5kKHNjYWxlWCk7XG4gIGNhY2hlLnNjYWxlWSA9IF9yb3VuZChzY2FsZVkpO1xuICBjYWNoZS5yb3RhdGlvbiA9IF9yb3VuZChyb3RhdGlvbikgKyBkZWc7XG4gIGNhY2hlLnJvdGF0aW9uWCA9IF9yb3VuZChyb3RhdGlvblgpICsgZGVnO1xuICBjYWNoZS5yb3RhdGlvblkgPSBfcm91bmQocm90YXRpb25ZKSArIGRlZztcbiAgY2FjaGUuc2tld1ggPSBza2V3WCArIGRlZztcbiAgY2FjaGUuc2tld1kgPSBza2V3WSArIGRlZztcbiAgY2FjaGUudHJhbnNmb3JtUGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZSArIHB4O1xuXG4gIGlmIChjYWNoZS56T3JpZ2luID0gcGFyc2VGbG9hdChvcmlnaW4uc3BsaXQoXCIgXCIpWzJdKSB8fCAwKSB7XG4gICAgc3R5bGVbX3RyYW5zZm9ybU9yaWdpblByb3BdID0gX2ZpcnN0VHdvT25seShvcmlnaW4pO1xuICB9XG5cbiAgY2FjaGUueE9mZnNldCA9IGNhY2hlLnlPZmZzZXQgPSAwO1xuICBjYWNoZS5mb3JjZTNEID0gX2NvbmZpZy5mb3JjZTNEO1xuICBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0gPSBjYWNoZS5zdmcgPyBfcmVuZGVyU1ZHVHJhbnNmb3JtcyA6IF9zdXBwb3J0czNEID8gX3JlbmRlckNTU1RyYW5zZm9ybXMgOiBfcmVuZGVyTm9uM0RUcmFuc2Zvcm1zO1xuICBjYWNoZS51bmNhY2hlID0gMDtcbiAgcmV0dXJuIGNhY2hlO1xufSxcbiAgICBfZmlyc3RUd29Pbmx5ID0gZnVuY3Rpb24gX2ZpcnN0VHdvT25seSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpKVswXSArIFwiIFwiICsgdmFsdWVbMV07XG59LFxuICAgIC8vZm9yIGhhbmRsaW5nIHRyYW5zZm9ybU9yaWdpbiB2YWx1ZXMsIHN0cmlwcGluZyBvdXQgdGhlIDNyZCBkaW1lbnNpb25cbl9hZGRQeFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIF9hZGRQeFRyYW5zbGF0ZSh0YXJnZXQsIHN0YXJ0LCB2YWx1ZSkge1xuICB2YXIgdW5pdCA9IGdldFVuaXQoc3RhcnQpO1xuICByZXR1cm4gX3JvdW5kKHBhcnNlRmxvYXQoc3RhcnQpICsgcGFyc2VGbG9hdChfY29udmVydFRvVW5pdCh0YXJnZXQsIFwieFwiLCB2YWx1ZSArIFwicHhcIiwgdW5pdCkpKSArIHVuaXQ7XG59LFxuICAgIF9yZW5kZXJOb24zRFRyYW5zZm9ybXMgPSBmdW5jdGlvbiBfcmVuZGVyTm9uM0RUcmFuc2Zvcm1zKHJhdGlvLCBjYWNoZSkge1xuICBjYWNoZS56ID0gXCIwcHhcIjtcbiAgY2FjaGUucm90YXRpb25ZID0gY2FjaGUucm90YXRpb25YID0gXCIwZGVnXCI7XG4gIGNhY2hlLmZvcmNlM0QgPSAwO1xuXG4gIF9yZW5kZXJDU1NUcmFuc2Zvcm1zKHJhdGlvLCBjYWNoZSk7XG59LFxuICAgIF96ZXJvRGVnID0gXCIwZGVnXCIsXG4gICAgX3plcm9QeCA9IFwiMHB4XCIsXG4gICAgX2VuZFBhcmVudGhlc2lzID0gXCIpIFwiLFxuICAgIF9yZW5kZXJDU1NUcmFuc2Zvcm1zID0gZnVuY3Rpb24gX3JlbmRlckNTU1RyYW5zZm9ybXMocmF0aW8sIGNhY2hlKSB7XG4gIHZhciBfcmVmID0gY2FjaGUgfHwgdGhpcyxcbiAgICAgIHhQZXJjZW50ID0gX3JlZi54UGVyY2VudCxcbiAgICAgIHlQZXJjZW50ID0gX3JlZi55UGVyY2VudCxcbiAgICAgIHggPSBfcmVmLngsXG4gICAgICB5ID0gX3JlZi55LFxuICAgICAgeiA9IF9yZWYueixcbiAgICAgIHJvdGF0aW9uID0gX3JlZi5yb3RhdGlvbixcbiAgICAgIHJvdGF0aW9uWSA9IF9yZWYucm90YXRpb25ZLFxuICAgICAgcm90YXRpb25YID0gX3JlZi5yb3RhdGlvblgsXG4gICAgICBza2V3WCA9IF9yZWYuc2tld1gsXG4gICAgICBza2V3WSA9IF9yZWYuc2tld1ksXG4gICAgICBzY2FsZVggPSBfcmVmLnNjYWxlWCxcbiAgICAgIHNjYWxlWSA9IF9yZWYuc2NhbGVZLFxuICAgICAgdHJhbnNmb3JtUGVyc3BlY3RpdmUgPSBfcmVmLnRyYW5zZm9ybVBlcnNwZWN0aXZlLFxuICAgICAgZm9yY2UzRCA9IF9yZWYuZm9yY2UzRCxcbiAgICAgIHRhcmdldCA9IF9yZWYudGFyZ2V0LFxuICAgICAgek9yaWdpbiA9IF9yZWYuek9yaWdpbixcbiAgICAgIHRyYW5zZm9ybXMgPSBcIlwiLFxuICAgICAgdXNlM0QgPSBmb3JjZTNEID09PSBcImF1dG9cIiAmJiByYXRpbyAmJiByYXRpbyAhPT0gMSB8fCBmb3JjZTNEID09PSB0cnVlOyAvLyBTYWZhcmkgaGFzIGEgYnVnIHRoYXQgY2F1c2VzIGl0IG5vdCB0byByZW5kZXIgM0QgdHJhbnNmb3JtLW9yaWdpbiB2YWx1ZXMgcHJvcGVybHksIHNvIHdlIGZvcmNlIHRoZSB6IG9yaWdpbiB0byAwLCByZWNvcmQgaXQgaW4gdGhlIGNhY2hlLCBhbmQgdGhlbiBkbyB0aGUgbWF0aCBoZXJlIHRvIG9mZnNldCB0aGUgdHJhbnNsYXRlIHZhbHVlcyBhY2NvcmRpbmdseSAoYmFzaWNhbGx5IGRvIHRoZSAzRCB0cmFuc2Zvcm0tb3JpZ2luIHBhcnQgbWFudWFsbHkpXG5cblxuICBpZiAoek9yaWdpbiAmJiAocm90YXRpb25YICE9PSBfemVyb0RlZyB8fCByb3RhdGlvblkgIT09IF96ZXJvRGVnKSkge1xuICAgIHZhciBhbmdsZSA9IHBhcnNlRmxvYXQocm90YXRpb25ZKSAqIF9ERUcyUkFELFxuICAgICAgICBhMTMgPSBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIGEzMyA9IE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgY29zO1xuXG4gICAgYW5nbGUgPSBwYXJzZUZsb2F0KHJvdGF0aW9uWCkgKiBfREVHMlJBRDtcbiAgICBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgeCA9IF9hZGRQeFRyYW5zbGF0ZSh0YXJnZXQsIHgsIGExMyAqIGNvcyAqIC16T3JpZ2luKTtcbiAgICB5ID0gX2FkZFB4VHJhbnNsYXRlKHRhcmdldCwgeSwgLU1hdGguc2luKGFuZ2xlKSAqIC16T3JpZ2luKTtcbiAgICB6ID0gX2FkZFB4VHJhbnNsYXRlKHRhcmdldCwgeiwgYTMzICogY29zICogLXpPcmlnaW4gKyB6T3JpZ2luKTtcbiAgfVxuXG4gIGlmICh0cmFuc2Zvcm1QZXJzcGVjdGl2ZSAhPT0gX3plcm9QeCkge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJwZXJzcGVjdGl2ZShcIiArIHRyYW5zZm9ybVBlcnNwZWN0aXZlICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHhQZXJjZW50IHx8IHlQZXJjZW50KSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInRyYW5zbGF0ZShcIiArIHhQZXJjZW50ICsgXCIlLCBcIiArIHlQZXJjZW50ICsgXCIlKSBcIjtcbiAgfVxuXG4gIGlmICh1c2UzRCB8fCB4ICE9PSBfemVyb1B4IHx8IHkgIT09IF96ZXJvUHggfHwgeiAhPT0gX3plcm9QeCkge1xuICAgIHRyYW5zZm9ybXMgKz0geiAhPT0gX3plcm9QeCB8fCB1c2UzRCA/IFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCIsIFwiICsgeSArIFwiLCBcIiArIHogKyBcIikgXCIgOiBcInRyYW5zbGF0ZShcIiArIHggKyBcIiwgXCIgKyB5ICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHJvdGF0aW9uICE9PSBfemVyb0RlZykge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJyb3RhdGUoXCIgKyByb3RhdGlvbiArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIGlmIChyb3RhdGlvblkgIT09IF96ZXJvRGVnKSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInJvdGF0ZVkoXCIgKyByb3RhdGlvblkgKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAocm90YXRpb25YICE9PSBfemVyb0RlZykge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJyb3RhdGVYKFwiICsgcm90YXRpb25YICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHNrZXdYICE9PSBfemVyb0RlZyB8fCBza2V3WSAhPT0gX3plcm9EZWcpIHtcbiAgICB0cmFuc2Zvcm1zICs9IFwic2tldyhcIiArIHNrZXdYICsgXCIsIFwiICsgc2tld1kgKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAoc2NhbGVYICE9PSAxIHx8IHNjYWxlWSAhPT0gMSkge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJzY2FsZShcIiArIHNjYWxlWCArIFwiLCBcIiArIHNjYWxlWSArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIHRhcmdldC5zdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2Zvcm1zIHx8IFwidHJhbnNsYXRlKDAsIDApXCI7XG59LFxuICAgIF9yZW5kZXJTVkdUcmFuc2Zvcm1zID0gZnVuY3Rpb24gX3JlbmRlclNWR1RyYW5zZm9ybXMocmF0aW8sIGNhY2hlKSB7XG4gIHZhciBfcmVmMiA9IGNhY2hlIHx8IHRoaXMsXG4gICAgICB4UGVyY2VudCA9IF9yZWYyLnhQZXJjZW50LFxuICAgICAgeVBlcmNlbnQgPSBfcmVmMi55UGVyY2VudCxcbiAgICAgIHggPSBfcmVmMi54LFxuICAgICAgeSA9IF9yZWYyLnksXG4gICAgICByb3RhdGlvbiA9IF9yZWYyLnJvdGF0aW9uLFxuICAgICAgc2tld1ggPSBfcmVmMi5za2V3WCxcbiAgICAgIHNrZXdZID0gX3JlZjIuc2tld1ksXG4gICAgICBzY2FsZVggPSBfcmVmMi5zY2FsZVgsXG4gICAgICBzY2FsZVkgPSBfcmVmMi5zY2FsZVksXG4gICAgICB0YXJnZXQgPSBfcmVmMi50YXJnZXQsXG4gICAgICB4T3JpZ2luID0gX3JlZjIueE9yaWdpbixcbiAgICAgIHlPcmlnaW4gPSBfcmVmMi55T3JpZ2luLFxuICAgICAgeE9mZnNldCA9IF9yZWYyLnhPZmZzZXQsXG4gICAgICB5T2Zmc2V0ID0gX3JlZjIueU9mZnNldCxcbiAgICAgIGZvcmNlQ1NTID0gX3JlZjIuZm9yY2VDU1MsXG4gICAgICB0eCA9IHBhcnNlRmxvYXQoeCksXG4gICAgICB0eSA9IHBhcnNlRmxvYXQoeSksXG4gICAgICBhMTEsXG4gICAgICBhMjEsXG4gICAgICBhMTIsXG4gICAgICBhMjIsXG4gICAgICB0ZW1wO1xuXG4gIHJvdGF0aW9uID0gcGFyc2VGbG9hdChyb3RhdGlvbik7XG4gIHNrZXdYID0gcGFyc2VGbG9hdChza2V3WCk7XG4gIHNrZXdZID0gcGFyc2VGbG9hdChza2V3WSk7XG5cbiAgaWYgKHNrZXdZKSB7XG4gICAgLy9mb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgd2UgY29tYmluZSBhbGwgc2tld2luZyBpbnRvIHRoZSBza2V3WCBhbmQgcm90YXRpb24gdmFsdWVzLiBSZW1lbWJlciwgYSBza2V3WSBvZiAxMCBkZWdyZWVzIGxvb2tzIHRoZSBzYW1lIGFzIGEgcm90YXRpb24gb2YgMTAgZGVncmVlcyBwbHVzIGEgc2tld1ggb2YgMTAgZGVncmVlcy5cbiAgICBza2V3WSA9IHBhcnNlRmxvYXQoc2tld1kpO1xuICAgIHNrZXdYICs9IHNrZXdZO1xuICAgIHJvdGF0aW9uICs9IHNrZXdZO1xuICB9XG5cbiAgaWYgKHJvdGF0aW9uIHx8IHNrZXdYKSB7XG4gICAgcm90YXRpb24gKj0gX0RFRzJSQUQ7XG4gICAgc2tld1ggKj0gX0RFRzJSQUQ7XG4gICAgYTExID0gTWF0aC5jb3Mocm90YXRpb24pICogc2NhbGVYO1xuICAgIGEyMSA9IE1hdGguc2luKHJvdGF0aW9uKSAqIHNjYWxlWDtcbiAgICBhMTIgPSBNYXRoLnNpbihyb3RhdGlvbiAtIHNrZXdYKSAqIC1zY2FsZVk7XG4gICAgYTIyID0gTWF0aC5jb3Mocm90YXRpb24gLSBza2V3WCkgKiBzY2FsZVk7XG5cbiAgICBpZiAoc2tld1gpIHtcbiAgICAgIHNrZXdZICo9IF9ERUcyUkFEO1xuICAgICAgdGVtcCA9IE1hdGgudGFuKHNrZXdYIC0gc2tld1kpO1xuICAgICAgdGVtcCA9IE1hdGguc3FydCgxICsgdGVtcCAqIHRlbXApO1xuICAgICAgYTEyICo9IHRlbXA7XG4gICAgICBhMjIgKj0gdGVtcDtcblxuICAgICAgaWYgKHNrZXdZKSB7XG4gICAgICAgIHRlbXAgPSBNYXRoLnRhbihza2V3WSk7XG4gICAgICAgIHRlbXAgPSBNYXRoLnNxcnQoMSArIHRlbXAgKiB0ZW1wKTtcbiAgICAgICAgYTExICo9IHRlbXA7XG4gICAgICAgIGEyMSAqPSB0ZW1wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGExMSA9IF9yb3VuZChhMTEpO1xuICAgIGEyMSA9IF9yb3VuZChhMjEpO1xuICAgIGExMiA9IF9yb3VuZChhMTIpO1xuICAgIGEyMiA9IF9yb3VuZChhMjIpO1xuICB9IGVsc2Uge1xuICAgIGExMSA9IHNjYWxlWDtcbiAgICBhMjIgPSBzY2FsZVk7XG4gICAgYTIxID0gYTEyID0gMDtcbiAgfVxuXG4gIGlmICh0eCAmJiAhfih4ICsgXCJcIikuaW5kZXhPZihcInB4XCIpIHx8IHR5ICYmICF+KHkgKyBcIlwiKS5pbmRleE9mKFwicHhcIikpIHtcbiAgICB0eCA9IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgXCJ4XCIsIHgsIFwicHhcIik7XG4gICAgdHkgPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIFwieVwiLCB5LCBcInB4XCIpO1xuICB9XG5cbiAgaWYgKHhPcmlnaW4gfHwgeU9yaWdpbiB8fCB4T2Zmc2V0IHx8IHlPZmZzZXQpIHtcbiAgICB0eCA9IF9yb3VuZCh0eCArIHhPcmlnaW4gLSAoeE9yaWdpbiAqIGExMSArIHlPcmlnaW4gKiBhMTIpICsgeE9mZnNldCk7XG4gICAgdHkgPSBfcm91bmQodHkgKyB5T3JpZ2luIC0gKHhPcmlnaW4gKiBhMjEgKyB5T3JpZ2luICogYTIyKSArIHlPZmZzZXQpO1xuICB9XG5cbiAgaWYgKHhQZXJjZW50IHx8IHlQZXJjZW50KSB7XG4gICAgLy9UaGUgU1ZHIHNwZWMgZG9lc24ndCBzdXBwb3J0IHBlcmNlbnRhZ2UtYmFzZWQgdHJhbnNsYXRpb24gaW4gdGhlIFwidHJhbnNmb3JtXCIgYXR0cmlidXRlLCBzbyB3ZSBtZXJnZSBpdCBpbnRvIHRoZSB0cmFuc2xhdGlvbiB0byBzaW11bGF0ZSBpdC5cbiAgICB0ZW1wID0gdGFyZ2V0LmdldEJCb3goKTtcbiAgICB0eCA9IF9yb3VuZCh0eCArIHhQZXJjZW50IC8gMTAwICogdGVtcC53aWR0aCk7XG4gICAgdHkgPSBfcm91bmQodHkgKyB5UGVyY2VudCAvIDEwMCAqIHRlbXAuaGVpZ2h0KTtcbiAgfVxuXG4gIHRlbXAgPSBcIm1hdHJpeChcIiArIGExMSArIFwiLFwiICsgYTIxICsgXCIsXCIgKyBhMTIgKyBcIixcIiArIGEyMiArIFwiLFwiICsgdHggKyBcIixcIiArIHR5ICsgXCIpXCI7XG4gIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdGVtcCk7XG5cbiAgaWYgKGZvcmNlQ1NTKSB7XG4gICAgLy9zb21lIGJyb3dzZXJzIHByaW9yaXRpemUgQ1NTIHRyYW5zZm9ybXMgb3ZlciB0aGUgdHJhbnNmb3JtIGF0dHJpYnV0ZS4gV2hlbiB3ZSBzZW5zZSB0aGF0IHRoZSB1c2VyIGhhcyBDU1MgdHJhbnNmb3JtcyBhcHBsaWVkLCB3ZSBtdXN0IG92ZXJ3cml0ZSB0aGVtIHRoaXMgd2F5IChvdGhlcndpc2Ugc29tZSBicm93c2VyIHNpbXBseSB3b24ndCByZW5kZXIgdGhlICB0cmFuc2Zvcm0gYXR0cmlidXRlIGNoYW5nZXMhKVxuICAgIHRhcmdldC5zdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSB0ZW1wO1xuICB9XG59LFxuICAgIF9hZGRSb3RhdGlvbmFsUHJvcFR3ZWVuID0gZnVuY3Rpb24gX2FkZFJvdGF0aW9uYWxQcm9wVHdlZW4ocGx1Z2luLCB0YXJnZXQsIHByb3BlcnR5LCBzdGFydE51bSwgZW5kVmFsdWUsIHJlbGF0aXZlKSB7XG4gIHZhciBjYXAgPSAzNjAsXG4gICAgICBpc1N0cmluZyA9IF9pc1N0cmluZyhlbmRWYWx1ZSksXG4gICAgICBlbmROdW0gPSBwYXJzZUZsb2F0KGVuZFZhbHVlKSAqIChpc1N0cmluZyAmJiB+ZW5kVmFsdWUuaW5kZXhPZihcInJhZFwiKSA/IF9SQUQyREVHIDogMSksXG4gICAgICBjaGFuZ2UgPSByZWxhdGl2ZSA/IGVuZE51bSAqIHJlbGF0aXZlIDogZW5kTnVtIC0gc3RhcnROdW0sXG4gICAgICBmaW5hbFZhbHVlID0gc3RhcnROdW0gKyBjaGFuZ2UgKyBcImRlZ1wiLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgcHQ7XG5cbiAgaWYgKGlzU3RyaW5nKSB7XG4gICAgZGlyZWN0aW9uID0gZW5kVmFsdWUuc3BsaXQoXCJfXCIpWzFdO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJzaG9ydFwiKSB7XG4gICAgICBjaGFuZ2UgJT0gY2FwO1xuXG4gICAgICBpZiAoY2hhbmdlICE9PSBjaGFuZ2UgJSAoY2FwIC8gMikpIHtcbiAgICAgICAgY2hhbmdlICs9IGNoYW5nZSA8IDAgPyBjYXAgOiAtY2FwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiY3dcIiAmJiBjaGFuZ2UgPCAwKSB7XG4gICAgICBjaGFuZ2UgPSAoY2hhbmdlICsgY2FwICogX2JpZ051bSkgJSBjYXAgLSB+fihjaGFuZ2UgLyBjYXApICogY2FwO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNjd1wiICYmIGNoYW5nZSA+IDApIHtcbiAgICAgIGNoYW5nZSA9IChjaGFuZ2UgLSBjYXAgKiBfYmlnTnVtKSAlIGNhcCAtIH5+KGNoYW5nZSAvIGNhcCkgKiBjYXA7XG4gICAgfVxuICB9XG5cbiAgcGx1Z2luLl9wdCA9IHB0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIHByb3BlcnR5LCBzdGFydE51bSwgY2hhbmdlLCBfcmVuZGVyUHJvcFdpdGhFbmQpO1xuICBwdC5lID0gZmluYWxWYWx1ZTtcbiAgcHQudSA9IFwiZGVnXCI7XG5cbiAgcGx1Z2luLl9wcm9wcy5wdXNoKHByb3BlcnR5KTtcblxuICByZXR1cm4gcHQ7XG59LFxuICAgIF9hZGRSYXdUcmFuc2Zvcm1QVHMgPSBmdW5jdGlvbiBfYWRkUmF3VHJhbnNmb3JtUFRzKHBsdWdpbiwgdHJhbnNmb3JtcywgdGFyZ2V0KSB7XG4gIC8vZm9yIGhhbmRsaW5nIGNhc2VzIHdoZXJlIHNvbWVvbmUgcGFzc2VzIGluIGEgd2hvbGUgdHJhbnNmb3JtIHN0cmluZywgbGlrZSB0cmFuc2Zvcm06IFwic2NhbGUoMiwgMykgcm90YXRlKDIwZGVnKSB0cmFuc2xhdGVZKDMwZW0pXCJcbiAgdmFyIHN0eWxlID0gX3RlbXBEaXZTdHlsZXIuc3R5bGUsXG4gICAgICBzdGFydENhY2hlID0gdGFyZ2V0Ll9nc2FwLFxuICAgICAgZXhjbHVkZSA9IFwicGVyc3BlY3RpdmUsZm9yY2UzRCx0cmFuc2Zvcm1PcmlnaW4sc3ZnT3JpZ2luXCIsXG4gICAgICBlbmRDYWNoZSxcbiAgICAgIHAsXG4gICAgICBzdGFydFZhbHVlLFxuICAgICAgZW5kVmFsdWUsXG4gICAgICBzdGFydE51bSxcbiAgICAgIGVuZE51bSxcbiAgICAgIHN0YXJ0VW5pdCxcbiAgICAgIGVuZFVuaXQ7XG4gIHN0eWxlLmNzc1RleHQgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuY3NzVGV4dCArIFwiO3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7XCI7IC8vJS1iYXNlZCB0cmFuc2xhdGlvbnMgd2lsbCBmYWlsIHVubGVzcyB3ZSBzZXQgdGhlIHdpZHRoL2hlaWdodCB0byBtYXRjaCB0aGUgb3JpZ2luYWwgdGFyZ2V0IChhbmQgcGFkZGluZy9ib3JkZXJzIGNhbiBhZmZlY3QgaXQpXG5cbiAgc3R5bGVbX3RyYW5zZm9ybVByb3BdID0gdHJhbnNmb3JtcztcblxuICBfZG9jLmJvZHkuYXBwZW5kQ2hpbGQoX3RlbXBEaXZTdHlsZXIpO1xuXG4gIGVuZENhY2hlID0gX3BhcnNlVHJhbnNmb3JtKF90ZW1wRGl2U3R5bGVyLCAxKTtcblxuICBmb3IgKHAgaW4gX3RyYW5zZm9ybVByb3BzKSB7XG4gICAgc3RhcnRWYWx1ZSA9IHN0YXJ0Q2FjaGVbcF07XG4gICAgZW5kVmFsdWUgPSBlbmRDYWNoZVtwXTtcblxuICAgIGlmIChzdGFydFZhbHVlICE9PSBlbmRWYWx1ZSAmJiBleGNsdWRlLmluZGV4T2YocCkgPCAwKSB7XG4gICAgICAvL3R3ZWVuaW5nIHRvIG5vIHBlcnNwZWN0aXZlIGdpdmVzIHZlcnkgdW5pbnR1aXRpdmUgcmVzdWx0cyAtIGp1c3Qga2VlcCB0aGUgc2FtZSBwZXJzcGVjdGl2ZSBpbiB0aGF0IGNhc2UuXG4gICAgICBzdGFydFVuaXQgPSBnZXRVbml0KHN0YXJ0VmFsdWUpO1xuICAgICAgZW5kVW5pdCA9IGdldFVuaXQoZW5kVmFsdWUpO1xuICAgICAgc3RhcnROdW0gPSBzdGFydFVuaXQgIT09IGVuZFVuaXQgPyBfY29udmVydFRvVW5pdCh0YXJnZXQsIHAsIHN0YXJ0VmFsdWUsIGVuZFVuaXQpIDogcGFyc2VGbG9hdChzdGFydFZhbHVlKTtcbiAgICAgIGVuZE51bSA9IHBhcnNlRmxvYXQoZW5kVmFsdWUpO1xuICAgICAgcGx1Z2luLl9wdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgc3RhcnRDYWNoZSwgcCwgc3RhcnROdW0sIGVuZE51bSAtIHN0YXJ0TnVtLCBfcmVuZGVyQ1NTUHJvcCk7XG4gICAgICBwbHVnaW4uX3B0LnUgPSBlbmRVbml0IHx8IDA7XG5cbiAgICAgIHBsdWdpbi5fcHJvcHMucHVzaChwKTtcbiAgICB9XG4gIH1cblxuICBfZG9jLmJvZHkucmVtb3ZlQ2hpbGQoX3RlbXBEaXZTdHlsZXIpO1xufTsgLy8gaGFuZGxlIHNwbGl0dGluZyBhcGFydCBwYWRkaW5nLCBtYXJnaW4sIGJvcmRlcldpZHRoLCBhbmQgYm9yZGVyUmFkaXVzIGludG8gdGhlaXIgNCBjb21wb25lbnRzLiBGaXJlZm94LCBmb3IgZXhhbXBsZSwgd29uJ3QgcmVwb3J0IGJvcmRlclJhZGl1cyBjb3JyZWN0bHkgLSBpdCB3aWxsIG9ubHkgZG8gYm9yZGVyVG9wTGVmdFJhZGl1cyBhbmQgdGhlIG90aGVyIGNvcm5lcnMuIFdlIGFsc28gd2FudCB0byBoYW5kbGUgcGFkZGluZ1RvcCwgbWFyZ2luTGVmdCwgYm9yZGVyUmlnaHRXaWR0aCwgZXRjLlxuXG5cbl9mb3JFYWNoTmFtZShcInBhZGRpbmcsbWFyZ2luLFdpZHRoLFJhZGl1c1wiLCBmdW5jdGlvbiAobmFtZSwgaW5kZXgpIHtcbiAgdmFyIHQgPSBcIlRvcFwiLFxuICAgICAgciA9IFwiUmlnaHRcIixcbiAgICAgIGIgPSBcIkJvdHRvbVwiLFxuICAgICAgbCA9IFwiTGVmdFwiLFxuICAgICAgcHJvcHMgPSAoaW5kZXggPCAzID8gW3QsIHIsIGIsIGxdIDogW3QgKyBsLCB0ICsgciwgYiArIHIsIGIgKyBsXSkubWFwKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgcmV0dXJuIGluZGV4IDwgMiA/IG5hbWUgKyBzaWRlIDogXCJib3JkZXJcIiArIHNpZGUgKyBuYW1lO1xuICB9KTtcblxuICBfc3BlY2lhbFByb3BzW2luZGV4ID4gMSA/IFwiYm9yZGVyXCIgKyBuYW1lIDogbmFtZV0gPSBmdW5jdGlvbiAocGx1Z2luLCB0YXJnZXQsIHByb3BlcnR5LCBlbmRWYWx1ZSwgdHdlZW4pIHtcbiAgICB2YXIgYSwgdmFycztcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgNCkge1xuICAgICAgLy8gZ2V0dGVyLCBwYXNzZWQgdGFyZ2V0LCBwcm9wZXJ0eSwgYW5kIHVuaXQgKGZyb20gX2dldCgpKVxuICAgICAgYSA9IHByb3BzLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICByZXR1cm4gX2dldChwbHVnaW4sIHByb3AsIHByb3BlcnR5KTtcbiAgICAgIH0pO1xuICAgICAgdmFycyA9IGEuam9pbihcIiBcIik7XG4gICAgICByZXR1cm4gdmFycy5zcGxpdChhWzBdKS5sZW5ndGggPT09IDUgPyBhWzBdIDogdmFycztcbiAgICB9XG5cbiAgICBhID0gKGVuZFZhbHVlICsgXCJcIikuc3BsaXQoXCIgXCIpO1xuICAgIHZhcnMgPSB7fTtcbiAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wLCBpKSB7XG4gICAgICByZXR1cm4gdmFyc1twcm9wXSA9IGFbaV0gPSBhW2ldIHx8IGFbKGkgLSAxKSAvIDIgfCAwXTtcbiAgICB9KTtcbiAgICBwbHVnaW4uaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuKTtcbiAgfTtcbn0pO1xuXG5leHBvcnQgdmFyIENTU1BsdWdpbiA9IHtcbiAgbmFtZTogXCJjc3NcIixcbiAgcmVnaXN0ZXI6IF9pbml0Q29yZSxcbiAgdGFyZ2V0VGVzdDogZnVuY3Rpb24gdGFyZ2V0VGVzdCh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGFyZ2V0LnN0eWxlICYmIHRhcmdldC5ub2RlVHlwZTtcbiAgfSxcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0cykge1xuICAgIHZhciBwcm9wcyA9IHRoaXMuX3Byb3BzLFxuICAgICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgICAgc3RhcnRWYWx1ZSxcbiAgICAgICAgZW5kVmFsdWUsXG4gICAgICAgIGVuZE51bSxcbiAgICAgICAgc3RhcnROdW0sXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHNwZWNpYWxQcm9wLFxuICAgICAgICBwLFxuICAgICAgICBzdGFydFVuaXQsXG4gICAgICAgIGVuZFVuaXQsXG4gICAgICAgIHJlbGF0aXZlLFxuICAgICAgICBpc1RyYW5zZm9ybVJlbGF0ZWQsXG4gICAgICAgIHRyYW5zZm9ybVByb3BUd2VlbixcbiAgICAgICAgY2FjaGUsXG4gICAgICAgIHNtb290aCxcbiAgICAgICAgaGFzUHJpb3JpdHk7XG4gICAgX3BsdWdpbkluaXR0ZWQgfHwgX2luaXRDb3JlKCk7XG5cbiAgICBmb3IgKHAgaW4gdmFycykge1xuICAgICAgaWYgKHAgPT09IFwiYXV0b1JvdW5kXCIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGVuZFZhbHVlID0gdmFyc1twXTtcblxuICAgICAgaWYgKF9wbHVnaW5zW3BdICYmIF9jaGVja1BsdWdpbihwLCB2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykpIHtcbiAgICAgICAgLy9wbHVnaW5zXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB0eXBlID0gdHlwZW9mIGVuZFZhbHVlO1xuICAgICAgc3BlY2lhbFByb3AgPSBfc3BlY2lhbFByb3BzW3BdO1xuXG4gICAgICBpZiAodHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGVuZFZhbHVlID0gZW5kVmFsdWUuY2FsbCh0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cyk7XG4gICAgICAgIHR5cGUgPSB0eXBlb2YgZW5kVmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiICYmIH5lbmRWYWx1ZS5pbmRleE9mKFwicmFuZG9tKFwiKSkge1xuICAgICAgICBlbmRWYWx1ZSA9IF9yZXBsYWNlUmFuZG9tKGVuZFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNwZWNpYWxQcm9wKSB7XG4gICAgICAgIGlmIChzcGVjaWFsUHJvcCh0aGlzLCB0YXJnZXQsIHAsIGVuZFZhbHVlLCB0d2VlbikpIHtcbiAgICAgICAgICBoYXNQcmlvcml0eSA9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocC5zdWJzdHIoMCwgMikgPT09IFwiLS1cIikge1xuICAgICAgICAvL0NTUyB2YXJpYWJsZVxuICAgICAgICB0aGlzLmFkZChzdHlsZSwgXCJzZXRQcm9wZXJ0eVwiLCBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZ2V0UHJvcGVydHlWYWx1ZShwKSArIFwiXCIsIGVuZFZhbHVlICsgXCJcIiwgaW5kZXgsIHRhcmdldHMsIDAsIDAsIHApO1xuICAgICAgfSBlbHNlIGlmICh0eXBlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHN0YXJ0VmFsdWUgPSBfZ2V0KHRhcmdldCwgcCk7XG4gICAgICAgIHN0YXJ0TnVtID0gcGFyc2VGbG9hdChzdGFydFZhbHVlKTtcbiAgICAgICAgcmVsYXRpdmUgPSB0eXBlID09PSBcInN0cmluZ1wiICYmIGVuZFZhbHVlLmNoYXJBdCgxKSA9PT0gXCI9XCIgPyArKGVuZFZhbHVlLmNoYXJBdCgwKSArIFwiMVwiKSA6IDA7XG5cbiAgICAgICAgaWYgKHJlbGF0aXZlKSB7XG4gICAgICAgICAgZW5kVmFsdWUgPSBlbmRWYWx1ZS5zdWJzdHIoMik7XG4gICAgICAgIH1cblxuICAgICAgICBlbmROdW0gPSBwYXJzZUZsb2F0KGVuZFZhbHVlKTtcblxuICAgICAgICBpZiAocCBpbiBfcHJvcGVydHlBbGlhc2VzKSB7XG4gICAgICAgICAgaWYgKHAgPT09IFwiYXV0b0FscGhhXCIpIHtcbiAgICAgICAgICAgIC8vc3BlY2lhbCBjYXNlIHdoZXJlIHdlIGNvbnRyb2wgdGhlIHZpc2liaWxpdHkgYWxvbmcgd2l0aCBvcGFjaXR5LiBXZSBzdGlsbCBhbGxvdyB0aGUgb3BhY2l0eSB2YWx1ZSB0byBwYXNzIHRocm91Z2ggYW5kIGdldCB0d2VlbmVkLlxuICAgICAgICAgICAgaWYgKHN0YXJ0TnVtID09PSAxICYmIF9nZXQodGFyZ2V0LCBcInZpc2liaWxpdHlcIikgPT09IFwiaGlkZGVuXCIgJiYgZW5kTnVtKSB7XG4gICAgICAgICAgICAgIC8vaWYgdmlzaWJpbGl0eSBpcyBpbml0aWFsbHkgc2V0IHRvIFwiaGlkZGVuXCIsIHdlIHNob3VsZCBpbnRlcnByZXQgdGhhdCBhcyBpbnRlbnQgdG8gbWFrZSBvcGFjaXR5IDAgKGEgY29udmVuaWVuY2UpXG4gICAgICAgICAgICAgIHN0YXJ0TnVtID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgc3R5bGUsIFwidmlzaWJpbGl0eVwiLCBzdGFydE51bSA/IFwiaW5oZXJpdFwiIDogXCJoaWRkZW5cIiwgZW5kTnVtID8gXCJpbmhlcml0XCIgOiBcImhpZGRlblwiLCAhZW5kTnVtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocCAhPT0gXCJzY2FsZVwiICYmIHAgIT09IFwidHJhbnNmb3JtXCIpIHtcbiAgICAgICAgICAgIHAgPSBfcHJvcGVydHlBbGlhc2VzW3BdO1xuICAgICAgICAgICAgfnAuaW5kZXhPZihcIixcIikgJiYgKHAgPSBwLnNwbGl0KFwiLFwiKVswXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXNUcmFuc2Zvcm1SZWxhdGVkID0gcCBpbiBfdHJhbnNmb3JtUHJvcHM7IC8vLS0tIFRSQU5TRk9STS1SRUxBVEVEIC0tLVxuXG4gICAgICAgIGlmIChpc1RyYW5zZm9ybVJlbGF0ZWQpIHtcbiAgICAgICAgICBpZiAoIXRyYW5zZm9ybVByb3BUd2Vlbikge1xuICAgICAgICAgICAgY2FjaGUgPSB0YXJnZXQuX2dzYXA7XG4gICAgICAgICAgICBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0gfHwgX3BhcnNlVHJhbnNmb3JtKHRhcmdldCk7IC8vIGlmLCBmb3IgZXhhbXBsZSwgZ3NhcC5zZXQoLi4uIHt0cmFuc2Zvcm06XCJ0cmFuc2xhdGVYKDUwdncpXCJ9KSwgdGhlIF9nZXQoKSBjYWxsIGRvZXNuJ3QgcGFyc2UgdGhlIHRyYW5zZm9ybSwgdGh1cyBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0gd29uJ3QgYmUgc2V0IHlldCBzbyBmb3JjZSB0aGUgcGFyc2luZyBvZiB0aGUgdHJhbnNmb3JtIGhlcmUuXG5cbiAgICAgICAgICAgIHNtb290aCA9IHZhcnMuc21vb3RoT3JpZ2luICE9PSBmYWxzZSAmJiBjYWNoZS5zbW9vdGg7XG4gICAgICAgICAgICB0cmFuc2Zvcm1Qcm9wVHdlZW4gPSB0aGlzLl9wdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHN0eWxlLCBfdHJhbnNmb3JtUHJvcCwgMCwgMSwgY2FjaGUucmVuZGVyVHJhbnNmb3JtLCBjYWNoZSwgMCwgLTEpOyAvL3RoZSBmaXJzdCB0aW1lIHRocm91Z2gsIGNyZWF0ZSB0aGUgcmVuZGVyaW5nIFByb3BUd2VlbiBzbyB0aGF0IGl0IHJ1bnMgTEFTVCAoaW4gdGhlIGxpbmtlZCBsaXN0LCB3ZSBrZWVwIGFkZGluZyB0byB0aGUgYmVnaW5uaW5nKVxuXG4gICAgICAgICAgICB0cmFuc2Zvcm1Qcm9wVHdlZW4uZGVwID0gMTsgLy9mbGFnIGl0IGFzIGRlcGVuZGVudCBzbyB0aGF0IGlmIHRoaW5ncyBnZXQga2lsbGVkL292ZXJ3cml0dGVuIGFuZCB0aGlzIGlzIHRoZSBvbmx5IFByb3BUd2VlbiBsZWZ0LCB3ZSBjYW4gc2FmZWx5IGtpbGwgdGhlIHdob2xlIHR3ZWVuLlxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwID09PSBcInNjYWxlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3B0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgY2FjaGUsIFwic2NhbGVZXCIsIGNhY2hlLnNjYWxlWSwgcmVsYXRpdmUgPyByZWxhdGl2ZSAqIGVuZE51bSA6IGVuZE51bSAtIGNhY2hlLnNjYWxlWSk7XG4gICAgICAgICAgICBwcm9wcy5wdXNoKFwic2NhbGVZXCIsIHApO1xuICAgICAgICAgICAgcCArPSBcIlhcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwidHJhbnNmb3JtT3JpZ2luXCIpIHtcbiAgICAgICAgICAgIGVuZFZhbHVlID0gX2NvbnZlcnRLZXl3b3Jkc1RvUGVyY2VudGFnZXMoZW5kVmFsdWUpOyAvL2luIGNhc2Ugc29tZXRoaW5nIGxpa2UgXCJsZWZ0IHRvcFwiIG9yIFwiYm90dG9tIHJpZ2h0XCIgaXMgcGFzc2VkIGluLiBDb252ZXJ0IHRvIHBlcmNlbnRhZ2VzLlxuXG4gICAgICAgICAgICBpZiAoY2FjaGUuc3ZnKSB7XG4gICAgICAgICAgICAgIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIGVuZFZhbHVlLCAwLCBzbW9vdGgsIDAsIHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZW5kVW5pdCA9IHBhcnNlRmxvYXQoZW5kVmFsdWUuc3BsaXQoXCIgXCIpWzJdKSB8fCAwOyAvL2hhbmRsZSB0aGUgek9yaWdpbiBzZXBhcmF0ZWx5IVxuXG4gICAgICAgICAgICAgIGVuZFVuaXQgIT09IGNhY2hlLnpPcmlnaW4gJiYgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgY2FjaGUsIFwiek9yaWdpblwiLCBjYWNoZS56T3JpZ2luLCBlbmRVbml0KTtcblxuICAgICAgICAgICAgICBfYWRkTm9uVHdlZW5pbmdQVCh0aGlzLCBzdHlsZSwgcCwgX2ZpcnN0VHdvT25seShzdGFydFZhbHVlKSwgX2ZpcnN0VHdvT25seShlbmRWYWx1ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwic3ZnT3JpZ2luXCIpIHtcbiAgICAgICAgICAgIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIGVuZFZhbHVlLCAxLCBzbW9vdGgsIDAsIHRoaXMpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgaW4gX3JvdGF0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBfYWRkUm90YXRpb25hbFByb3BUd2Vlbih0aGlzLCBjYWNoZSwgcCwgc3RhcnROdW0sIGVuZFZhbHVlLCByZWxhdGl2ZSk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJzbW9vdGhPcmlnaW5cIikge1xuICAgICAgICAgICAgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgY2FjaGUsIFwic21vb3RoXCIsIGNhY2hlLnNtb290aCwgZW5kVmFsdWUpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwiZm9yY2UzRFwiKSB7XG4gICAgICAgICAgICBjYWNoZVtwXSA9IGVuZFZhbHVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgICAgICAgICBfYWRkUmF3VHJhbnNmb3JtUFRzKHRoaXMsIGVuZFZhbHVlLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIShwIGluIHN0eWxlKSkge1xuICAgICAgICAgIHAgPSBfY2hlY2tQcm9wUHJlZml4KHApIHx8IHA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNUcmFuc2Zvcm1SZWxhdGVkIHx8IChlbmROdW0gfHwgZW5kTnVtID09PSAwKSAmJiAoc3RhcnROdW0gfHwgc3RhcnROdW0gPT09IDApICYmICFfY29tcGxleEV4cC50ZXN0KGVuZFZhbHVlKSAmJiBwIGluIHN0eWxlKSB7XG4gICAgICAgICAgc3RhcnRVbml0ID0gKHN0YXJ0VmFsdWUgKyBcIlwiKS5zdWJzdHIoKHN0YXJ0TnVtICsgXCJcIikubGVuZ3RoKTtcbiAgICAgICAgICBlbmROdW0gfHwgKGVuZE51bSA9IDApOyAvLyBwcm90ZWN0IGFnYWluc3QgTmFOXG5cbiAgICAgICAgICBlbmRVbml0ID0gKGVuZFZhbHVlICsgXCJcIikuc3Vic3RyKChlbmROdW0gKyBcIlwiKS5sZW5ndGgpIHx8IChwIGluIF9jb25maWcudW5pdHMgPyBfY29uZmlnLnVuaXRzW3BdIDogc3RhcnRVbml0KTtcblxuICAgICAgICAgIGlmIChzdGFydFVuaXQgIT09IGVuZFVuaXQpIHtcbiAgICAgICAgICAgIHN0YXJ0TnVtID0gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBwLCBzdGFydFZhbHVlLCBlbmRVbml0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9wdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIGlzVHJhbnNmb3JtUmVsYXRlZCA/IGNhY2hlIDogc3R5bGUsIHAsIHN0YXJ0TnVtLCByZWxhdGl2ZSA/IHJlbGF0aXZlICogZW5kTnVtIDogZW5kTnVtIC0gc3RhcnROdW0sIGVuZFVuaXQgPT09IFwicHhcIiAmJiB2YXJzLmF1dG9Sb3VuZCAhPT0gZmFsc2UgJiYgIWlzVHJhbnNmb3JtUmVsYXRlZCA/IF9yZW5kZXJSb3VuZGVkQ1NTUHJvcCA6IF9yZW5kZXJDU1NQcm9wKTtcbiAgICAgICAgICB0aGlzLl9wdC51ID0gZW5kVW5pdCB8fCAwO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0VW5pdCAhPT0gZW5kVW5pdCkge1xuICAgICAgICAgICAgLy93aGVuIHRoZSB0d2VlbiBnb2VzIGFsbCB0aGUgd2F5IGJhY2sgdG8gdGhlIGJlZ2lubmluZywgd2UgbmVlZCB0byByZXZlcnQgaXQgdG8gdGhlIE9MRC9PUklHSU5BTCB2YWx1ZSAod2l0aCB0aG9zZSB1bml0cykuIFdlIHJlY29yZCB0aGF0IGFzIGEgXCJiXCIgKGJlZ2lubmluZykgcHJvcGVydHkgYW5kIHBvaW50IHRvIGEgcmVuZGVyIG1ldGhvZCB0aGF0IGhhbmRsZXMgdGhhdC4gKHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbilcbiAgICAgICAgICAgIHRoaXMuX3B0LmIgPSBzdGFydFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcHQuciA9IF9yZW5kZXJDU1NQcm9wV2l0aEJlZ2lubmluZztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIShwIGluIHN0eWxlKSkge1xuICAgICAgICAgIGlmIChwIGluIHRhcmdldCkge1xuICAgICAgICAgICAgLy9tYXliZSBpdCdzIG5vdCBhIHN0eWxlIC0gaXQgY291bGQgYmUgYSBwcm9wZXJ0eSBhZGRlZCBkaXJlY3RseSB0byBhbiBlbGVtZW50IGluIHdoaWNoIGNhc2Ugd2UnbGwgdHJ5IHRvIGFuaW1hdGUgdGhhdC5cbiAgICAgICAgICAgIHRoaXMuYWRkKHRhcmdldCwgcCwgdGFyZ2V0W3BdLCBlbmRWYWx1ZSwgaW5kZXgsIHRhcmdldHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfbWlzc2luZ1BsdWdpbihwLCBlbmRWYWx1ZSk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdHdlZW5Db21wbGV4Q1NTU3RyaW5nLmNhbGwodGhpcywgdGFyZ2V0LCBwLCBzdGFydFZhbHVlLCBlbmRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wcy5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhc1ByaW9yaXR5ICYmIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHkodGhpcyk7XG4gIH0sXG4gIGdldDogX2dldCxcbiAgYWxpYXNlczogX3Byb3BlcnR5QWxpYXNlcyxcbiAgZ2V0U2V0dGVyOiBmdW5jdGlvbiBnZXRTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSwgcGx1Z2luKSB7XG4gICAgLy9yZXR1cm5zIGEgc2V0dGVyIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyB0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSBhbmQgYXBwbGllcyBpdCBhY2NvcmRpbmdseS4gUmVtZW1iZXIsIHByb3BlcnRpZXMgbGlrZSBcInhcIiBhcmVuJ3QgYXMgc2ltcGxlIGFzIHRhcmdldC5zdHlsZS5wcm9wZXJ0eSA9IHZhbHVlIGJlY2F1c2UgdGhleSd2ZSBnb3QgdG8gYmUgYXBwbGllZCB0byBhIHByb3h5IG9iamVjdCBhbmQgdGhlbiBtZXJnZWQgaW50byBhIHRyYW5zZm9ybSBzdHJpbmcgaW4gYSByZW5kZXJlci5cbiAgICB2YXIgcCA9IF9wcm9wZXJ0eUFsaWFzZXNbcHJvcGVydHldO1xuICAgIHAgJiYgcC5pbmRleE9mKFwiLFwiKSA8IDAgJiYgKHByb3BlcnR5ID0gcCk7XG4gICAgcmV0dXJuIHByb3BlcnR5IGluIF90cmFuc2Zvcm1Qcm9wcyAmJiBwcm9wZXJ0eSAhPT0gX3RyYW5zZm9ybU9yaWdpblByb3AgJiYgKHRhcmdldC5fZ3NhcC54IHx8IF9nZXQodGFyZ2V0LCBcInhcIikpID8gcGx1Z2luICYmIF9yZWNlbnRTZXR0ZXJQbHVnaW4gPT09IHBsdWdpbiA/IHByb3BlcnR5ID09PSBcInNjYWxlXCIgPyBfc2V0dGVyU2NhbGUgOiBfc2V0dGVyVHJhbnNmb3JtIDogKF9yZWNlbnRTZXR0ZXJQbHVnaW4gPSBwbHVnaW4gfHwge30pICYmIChwcm9wZXJ0eSA9PT0gXCJzY2FsZVwiID8gX3NldHRlclNjYWxlV2l0aFJlbmRlciA6IF9zZXR0ZXJUcmFuc2Zvcm1XaXRoUmVuZGVyKSA6IHRhcmdldC5zdHlsZSAmJiAhX2lzVW5kZWZpbmVkKHRhcmdldC5zdHlsZVtwcm9wZXJ0eV0pID8gX3NldHRlckNTU1N0eWxlIDogfnByb3BlcnR5LmluZGV4T2YoXCItXCIpID8gX3NldHRlckNTU1Byb3AgOiBfZ2V0U2V0dGVyKHRhcmdldCwgcHJvcGVydHkpO1xuICB9LFxuICBjb3JlOiB7XG4gICAgX3JlbW92ZVByb3BlcnR5OiBfcmVtb3ZlUHJvcGVydHksXG4gICAgX2dldE1hdHJpeDogX2dldE1hdHJpeFxuICB9XG59O1xuZ3NhcC51dGlscy5jaGVja1ByZWZpeCA9IF9jaGVja1Byb3BQcmVmaXg7XG5cbihmdW5jdGlvbiAocG9zaXRpb25BbmRTY2FsZSwgcm90YXRpb24sIG90aGVycywgYWxpYXNlcykge1xuICB2YXIgYWxsID0gX2ZvckVhY2hOYW1lKHBvc2l0aW9uQW5kU2NhbGUgKyBcIixcIiArIHJvdGF0aW9uICsgXCIsXCIgKyBvdGhlcnMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgX3RyYW5zZm9ybVByb3BzW25hbWVdID0gMTtcbiAgfSk7XG5cbiAgX2ZvckVhY2hOYW1lKHJvdGF0aW9uLCBmdW5jdGlvbiAobmFtZSkge1xuICAgIF9jb25maWcudW5pdHNbbmFtZV0gPSBcImRlZ1wiO1xuICAgIF9yb3RhdGlvbmFsUHJvcGVydGllc1tuYW1lXSA9IDE7XG4gIH0pO1xuXG4gIF9wcm9wZXJ0eUFsaWFzZXNbYWxsWzEzXV0gPSBwb3NpdGlvbkFuZFNjYWxlICsgXCIsXCIgKyByb3RhdGlvbjtcblxuICBfZm9yRWFjaE5hbWUoYWxpYXNlcywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgc3BsaXQgPSBuYW1lLnNwbGl0KFwiOlwiKTtcbiAgICBfcHJvcGVydHlBbGlhc2VzW3NwbGl0WzFdXSA9IGFsbFtzcGxpdFswXV07XG4gIH0pO1xufSkoXCJ4LHkseixzY2FsZSxzY2FsZVgsc2NhbGVZLHhQZXJjZW50LHlQZXJjZW50XCIsIFwicm90YXRpb24scm90YXRpb25YLHJvdGF0aW9uWSxza2V3WCxza2V3WVwiLCBcInRyYW5zZm9ybSx0cmFuc2Zvcm1PcmlnaW4sc3ZnT3JpZ2luLGZvcmNlM0Qsc21vb3RoT3JpZ2luLHRyYW5zZm9ybVBlcnNwZWN0aXZlXCIsIFwiMDp0cmFuc2xhdGVYLDE6dHJhbnNsYXRlWSwyOnRyYW5zbGF0ZVosODpyb3RhdGUsODpyb3RhdGlvblosODpyb3RhdGVaLDk6cm90YXRlWCwxMDpyb3RhdGVZXCIpO1xuXG5fZm9yRWFjaE5hbWUoXCJ4LHkseix0b3AscmlnaHQsYm90dG9tLGxlZnQsd2lkdGgsaGVpZ2h0LGZvbnRTaXplLHBhZGRpbmcsbWFyZ2luLHBlcnNwZWN0aXZlXCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIF9jb25maWcudW5pdHNbbmFtZV0gPSBcInB4XCI7XG59KTtcblxuZ3NhcC5yZWdpc3RlclBsdWdpbihDU1NQbHVnaW4pO1xuZXhwb3J0IHsgQ1NTUGx1Z2luIGFzIGRlZmF1bHQsIF9nZXRCQm94LCBfY3JlYXRlRWxlbWVudCwgX2NoZWNrUHJvcFByZWZpeCBhcyBjaGVja1ByZWZpeCB9OyIsImltcG9ydCB7IGdzYXAsIFBvd2VyMCwgUG93ZXIxLCBQb3dlcjIsIFBvd2VyMywgUG93ZXI0LCBMaW5lYXIsIFF1YWQsIEN1YmljLCBRdWFydCwgUXVpbnQsIFN0cm9uZywgRWxhc3RpYywgQmFjaywgU3RlcHBlZEVhc2UsIEJvdW5jZSwgU2luZSwgRXhwbywgQ2lyYywgVHdlZW5MaXRlLCBUaW1lbGluZUxpdGUsIFRpbWVsaW5lTWF4IH0gZnJvbSBcIi4vZ3NhcC1jb3JlLmpzXCI7XG5pbXBvcnQgeyBDU1NQbHVnaW4gfSBmcm9tIFwiLi9DU1NQbHVnaW4uanNcIjtcbnZhciBnc2FwV2l0aENTUyA9IGdzYXAucmVnaXN0ZXJQbHVnaW4oQ1NTUGx1Z2luKSB8fCBnc2FwLFxuICAgIC8vIHRvIHByb3RlY3QgZnJvbSB0cmVlIHNoYWtpbmdcblR3ZWVuTWF4V2l0aENTUyA9IGdzYXBXaXRoQ1NTLmNvcmUuVHdlZW47XG5leHBvcnQgeyBnc2FwV2l0aENTUyBhcyBnc2FwLCBnc2FwV2l0aENTUyBhcyBkZWZhdWx0LCBDU1NQbHVnaW4sIFR3ZWVuTWF4V2l0aENTUyBhcyBUd2Vlbk1heCwgVHdlZW5MaXRlLCBUaW1lbGluZU1heCwgVGltZWxpbmVMaXRlLCBQb3dlcjAsIFBvd2VyMSwgUG93ZXIyLCBQb3dlcjMsIFBvd2VyNCwgTGluZWFyLCBRdWFkLCBDdWJpYywgUXVhcnQsIFF1aW50LCBTdHJvbmcsIEVsYXN0aWMsIEJhY2ssIFN0ZXBwZWRFYXNlLCBCb3VuY2UsIFNpbmUsIEV4cG8sIENpcmMgfTsiLCJleHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgICBwdWJsaWMgc3RhdGljIHNjZW5lV2lkdGg6IG51bWJlciA9IDEwMjQ7XG4gICAgcHVibGljIHN0YXRpYyBzY2VuZUhlaWdodDogbnVtYmVyID0gNzY4O1xuXG4gICAgcHVibGljIHN0YXRpYyBwcmVsb2FkZXJBYXNzZXRzOiBhbnkgPSB7XG4gICAgICAgIGxvYWRlckJnOiBcImFzc2V0cy9sb2FkZXItYmFyL2xvYWRlci1iZy5wbmdcIixcbiAgICAgICAgbG9hZGVyQmFyOiBcImFzc2V0cy9sb2FkZXItYmFyL2xvYWRlci1iYXIucG5nXCIsXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3NldHM6IGFueSA9IHtcbiAgICAgICAgdGFuazogJ2Fzc2V0cy90YW5rcy90YW5rLnBuZycsXG4gICAgICAgIGVuZW15MTogJ2Fzc2V0cy90YW5rcy9lbmVteV9yZWQucG5nJyxcbiAgICAgICAgZW5lbXkyOiAnYXNzZXRzL3RhbmtzL2VuZW15X3doaXRlLnBuZycsXG4gICAgICAgIGVuZW15MzogJ2Fzc2V0cy90YW5rcy9lbmVteV9ibHVlLnBuZycsXG4gICAgICAgIGVhZ2xlOiAnYXNzZXRzL2JvYXJkL2VhZ2xlLnBuZycsXG4gICAgICAgIHN0b25lV2FsbDogJ2Fzc2V0cy9ib2FyZC93YWxsLnBuZycsXG4gICAgICAgIGJyaWNrV2FsbDogJ2Fzc2V0cy9ib2FyZC9zbWFsbF93YWxsXzEucG5nJyxcbiAgICAgICAgdHJlZTogJ2Fzc2V0cy9ib2FyZC9sZWF2ZXMucG5nJyxcbiAgICAgICAgd2F0ZXI6ICdhc3NldHMvYm9hcmQvd2F0ZXIucG5nJyxcbiAgICAgICAgYnVsbGV0OiAnYXNzZXRzL2J1bGxldC5wbmcnLFxuICAgICAgICBlbmVteUJ1bGxldDogJ2Fzc2V0cy9lbmVteV9idWxsZXQucG5nJyxcbiAgICAgICAgZXhwbG9kZTogJ2Fzc2V0cy9leHBsb2RlLnBuZycsXG4gICAgICAgIGFwcGVhcjogJ2Fzc2V0cy9hcHBlYXIucG5nJ1xuICAgIH1cbn07IiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuL212Yy9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL212Yy9tb2RlbFwiO1xuaW1wb3J0IHsgTXZjIH0gZnJvbSBcIi4vbXZjL212Y1wiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL212Yy92aWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBNb2R1bGUge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJNb2RlbHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckNvbnRyb2xsZXJzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJTY2VuZXMoKTtcblx0fVxuXG4gICAgZ2V0IG12YygpOiBNdmMge1xuXHRcdHJldHVybiBNdmMuZ2V0SW5zdGFuY2UoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVnaXN0ZXJNb2RlbHMoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZ2lzdGVyQ29udHJvbGxlcnMoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZ2lzdGVyU2NlbmVzKCk6IHZvaWQge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRNb2RlbChtb2RlbE5hbWU6IHN0cmluZywgbW9kZWxDbGFzczogdHlwZW9mIE1vZGVsKTogdm9pZCB7XG4gICAgICAgIHRoaXMubXZjLnJlZ2lzdGVyTW9kZWwobW9kZWxOYW1lLCBtb2RlbENsYXNzKTtcbiAgICB9ICAgXG5cbiAgICBwcm90ZWN0ZWQgYWRkQ29udHJvbGxlcihub3RpZmljYXRpb25OYW1lOiBzdHJpbmcsIGNvbnRyb2xsZXJDbGFzczogdHlwZW9mIENvbnRyb2xsZXIsIHZpZXdDbGFzcz86IHR5cGVvZiBWaWV3KTogdm9pZCB7XG4gICAgICAgIHRoaXMubXZjLnJlZ2lzdGVyQ29udHJvbGxlcihub3RpZmljYXRpb25OYW1lLCBjb250cm9sbGVyQ2xhc3MsIHZpZXdDbGFzcyk7XG4gICAgfSAgXG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGEgbm90aWZpY2F0aW9uIHRvIGEgc2V0IG9mIGNvbnRyb2xsZXJzIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGR1cmluZyBzY2VuZSB0cmFuc2l0aW9uXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFkZFNjZW5lKHNjZW5lTm90aWZpY2F0aW9uOiBzdHJpbmcsIGNvbnRyb2xsZXJzTm90aWZpY2F0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tdmMucmVnaXN0ZXJTY2VuZShzY2VuZU5vdGlmaWNhdGlvbiwgY29udHJvbGxlcnNOb3RpZmljYXRpb25zKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvZnNtL3N0YXRlXCI7XG5pbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvZ2FtZS1vYmplY3RcIjtcbmltcG9ydCB7IFVuaXQsIFVuaXRTdGF0ZXMgfSBmcm9tIFwiLi91bml0XCI7XG5pbXBvcnQgeyBVbml0VmlldyB9IGZyb20gXCIuL3VuaXQtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgVW5pdFN0YXRlIGV4dGVuZHMgU3RhdGUge1xuICAgIHB1YmxpYyB1bml0OiBVbml0O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICBzdXBlcihhcmdzKTtcbiAgICAgICAgdGhpcy51bml0ID0gYXJncztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZpZXcoKTogVW5pdFZpZXcge1xuICAgICAgICByZXR1cm4gdGhpcy51bml0LnZpZXcgYXMgVW5pdFZpZXc7XG4gICAgfVxuXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVuaXQuY2FuQ29sbGlkZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5pdC5mc20udHJhbnNpdGlvbihVbml0U3RhdGVzLklkbGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKGRpcmVjdGlvbj86IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnVuaXQuZnNtLnRyYW5zaXRpb24oVW5pdFN0YXRlcy5Nb3ZlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvb3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5pdC5vblNob290KHRoaXMudmlldy5nZXRCdWxsZXRQYXJhbXMoKSk7XG4gICAgfSAgICBcblxuICAgIHB1YmxpYyBoYW5kbGVDb2xsaXNpb25XaXRoTWFwSXRlbShvYmplY3Q6IEdhbWVPYmplY3QpOiB2b2lkIHtcbiAgICB9IFxuXG4gICAgcHVibGljIGhhbmRsZUNvbGxpc2lvbldpdGhPdGhlclVuaXQob2JqZWN0OiBHYW1lT2JqZWN0KTogdm9pZCB7XG4gICAgfSBcblxuICAgIHB1YmxpYyBoYW5kbGVDb2xsaXNpb25XaXRoQnVsbGV0KGJ1bGxldDogR2FtZU9iamVjdCk6IHZvaWQge1xuICAgICAgICAvLyBQcmV2ZW50IGVuZW1pZXMgZnJvbSBraWxsaW5nIGVhY2ggb3RoZXJcbiAgICAgICAgaWYgKGJ1bGxldC5vd25lci50eXBlID09PSB0aGlzLnVuaXQudHlwZSkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgdGhpcy51bml0LmZzbS50cmFuc2l0aW9uKFVuaXRTdGF0ZXMuRGllKTtcbiAgICB9ICAgIFxufSIsImltcG9ydCBnc2FwIGZyb20gXCJnc2FwXCI7XG5pbXBvcnQgeyBGU00gfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvZnNtL2ZzbVwiO1xuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL2dhbWUtb2JqZWN0XCI7XG5pbXBvcnQgeyBHYW1lT2JqZWN0VHlwZXMgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy9nYW1lLW9iamVjdC10eXBlc1wiO1xuaW1wb3J0IHsgVW5pdFN0YXRlIH0gZnJvbSBcIi4vdW5pdC1zdGF0ZVwiO1xuXG5leHBvcnQgZW51bSBVbml0U3RhdGVzIHtcbiAgICBTcGF3bixcbiAgICBJZGxlLFxuICAgIE1vdmUsXG4gICAgRGllXG59XG5cbmV4cG9ydCBjbGFzcyBVbml0IGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gICAgcHJvdGVjdGVkIHNob290aW5nRGVsYXk6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgY2FuU2hvb3Q6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByb3RlY3RlZCBzaG9vdGluZ0RlbGF5VHdlZW46IEdTQVBUd2VlbjtcbiAgICBwdWJsaWMgc3BlZWQ6IG51bWJlcjtcblxuICAgIHB1YmxpYyBvblNob290OiBGdW5jdGlvbjtcblxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZzbSA9IG5ldyBGU00oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHN0YXRlKCk6IFVuaXRTdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZzbS5zdGF0ZSBhcyBVbml0U3RhdGU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob290KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvb3QpIHJldHVybjtcbiAgICAgICAgdGhpcy5jYW5TaG9vdCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc3RhdGUuc2hvb3QoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnNob290aW5nRGVsYXlUd2Vlbikge1xuICAgICAgICAgICAgdGhpcy5zaG9vdGluZ0RlbGF5VHdlZW4ua2lsbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvb3RpbmdEZWxheVR3ZWVuID0gZ3NhcC5kZWxheWVkQ2FsbCh0aGlzLnNob290aW5nRGVsYXksICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FuU2hvb3QgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5tb3ZlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUNvbGxpc2lvbldpdGgob2JqZWN0OiBHYW1lT2JqZWN0KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5QbGF5ZXIgJiYgb2JqZWN0LnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5FbmVteSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5oYW5kbGVDb2xsaXNpb25XaXRoT3RoZXJVbml0KG9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iamVjdC50eXBlID09PSBHYW1lT2JqZWN0VHlwZXMuQnVsbGV0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmhhbmRsZUNvbGxpc2lvbldpdGhCdWxsZXQob2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0LnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5Ccmlja1dhbGwgfHwgb2JqZWN0LnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5TdG9uZVdhbGwpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuaGFuZGxlQ29sbGlzaW9uV2l0aE1hcEl0ZW0ob2JqZWN0KTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mc20uc3RlcCgpO1xuICAgIH0gXG59IiwiZXhwb3J0IGNsYXNzIEdsb2JhbE5vdGlmaWNhdGlvbnMgeyAgXG4gICAgcHVibGljIHN0YXRpYyBUUkFOU0lUSU9OX1RPX1NDRU5FOiBzdHJpbmcgPSBcIlRSQU5TSVRJT05fVE9fU0NFTkVcIjtcbn0iLCJleHBvcnQgY2xhc3MgR3JhcGhpY3NFbmdpbmVOb3RpZmljYXRpb25zIHsgIFxuICAgIHB1YmxpYyBzdGF0aWMgU1RBUlRfQVNTRVRTX0xPQURJTkc6IHN0cmluZyA9IFwiU1RBUlRfQVNTRVRTX0xPQURJTkdcIjtcbiAgICBwdWJsaWMgc3RhdGljIEFTU0VUU19MT0FESU5HX09OX1BST0dSRVNTOiBzdHJpbmcgPSBcIkFTU0VUU19MT0FESU5HX09OX1BST0dSRVNTXCI7XG4gICAgcHVibGljIHN0YXRpYyBBU1NFVFNfTE9BRElOR19DT01QTEVURTogc3RyaW5nID0gXCJBU1NFVFNfTE9BRElOR19DT01QTEVURVwiO1xufVxuXG5leHBvcnQgY2xhc3MgR3JhcGhpY3NFbmdpbmVOYW1lcyB7ICBcbiAgICBwdWJsaWMgc3RhdGljIE1PREVMOiBzdHJpbmcgPSBcIkdSQVBISUNfRU5HSU5FX01PREVMXCJcbn0iLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tICcuLi9hcHAtbWFuYWdlcic7XG5pbXBvcnQgeyBHbG9iYWxOb3RpZmljYXRpb25zIH0gZnJvbSAnLi4vZ2xvYmFsLW5vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAncGl4aS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBNdmMge1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBNdmM7XG4gICAgLy8gSG9sZHMgYWxsIGNvbnRyb2xsZXJzIFxuICAgIHByb3RlY3RlZCBjb250cm9sbGVyczogSUNvbnRyb2xsZXJzSW5kZXggPSB7fTtcbiAgICAvLyBIb2xkcyBhbGwgbm90aWZpY2F0aW9ucyBhbmQgdGhlaXIgc3Vic2NyaWJlcnMgXG4gICAgcHJvdGVjdGVkIG5vdGlmaWNhdGlvbnM6IElOb3RpZmljYXRpb25JbmRleCA9IHt9O1xuICAgIC8vIEhvbGRzIGFsbCBtb2RlbHNcbiAgICBwcm90ZWN0ZWQgbW9kZWxzOiBJTW9kZWxJbmRleCA9IHt9O1xuICAgIC8vIEhvbGRzIGFsbCBzY2VuZXNcbiAgICBwcm90ZWN0ZWQgc2NlbmVzOiBJU2NlbmVFbnRpdHlbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmIChNdmMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIC0gdXNlIE12Yy5nZXRJbnN0YW5jZSgpXCIpO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE12YyB7XG4gICAgICAgIGlmICghTXZjLmluc3RhbmNlKSB7XG4gICAgICAgICAgICBNdmMuaW5zdGFuY2UgPSBuZXcgTXZjKCk7XG4gICAgICAgIH1cblx0XHRyZXR1cm4gTXZjLmluc3RhbmNlO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3RpYmVzIGEgY29udHJvbGxlciB0byBhIG5vdGlmaWNhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBhZGROb3RpZmljYXRpb24obmFtZSwgY29udHJvbGxlcjogQ29udHJvbGxlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubm90aWZpY2F0aW9uc1tuYW1lXSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zW25hbWVdID0gW107XG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnNbbmFtZV0ucHVzaChjb250cm9sbGVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VuZE5vdGlmaWNhdGlvbihuYW1lOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oYW5kbGVTY2VuZVRyYW5zaXRpb25Ob3RpZmljYXRpb24obmFtZSwgYm9keSk7XG4gICAgICAgIHRoaXMuaGFuZGxlTm90aWZpY2F0aW9uKG5hbWUsIGJvZHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBzY2VuZSB0cmFuc2l0aW9uIG5vdGlmaWNhdGlvbnMuXG4gICAgICogUnVuIHRocm91Z2ggYWxsIGNvbnRyb2xsZXJzIHdoaWNoIHdlcmUgbWFwcGVkIHRvIHNjZW5lc1xuICAgICAqIGFuZCBjYWxsIGFwcHJvcHJpdGUgbWV0aG9kczogZXhlY3V0ZSBhbmQgc2hvdyAvIGhpZGUgbGF5ZXJcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlU2NlbmVUcmFuc2l0aW9uTm90aWZpY2F0aW9uKG5hbWU6IHN0cmluZywgYm9keT86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAobmFtZSAhPT0gR2xvYmFsTm90aWZpY2F0aW9ucy5UUkFOU0lUSU9OX1RPX1NDRU5FKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzY2VuZU5vdGlmaWNhdGlvbjogc3RyaW5nID0gYm9keTsgXG4gICAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBzY2VuZXNlXG4gICAgICAgIHRoaXMuc2NlbmVzLmZvckVhY2goKHNjZW5lOiBJU2NlbmVFbnRpdHkpID0+IHtcbiAgICAgICAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBjb250cm9sbGVycyByZWdpc3RlcmVkIGluIHRoZSBzY2VuZVxuICAgICAgICAgICAgc2NlbmUuY29udHJvbGxlcnNOb3RpZmljYXRpb25zLmZvckVhY2goKG5vdGlmaWNhdGlvbjogc3RyaW5nKSA9PiB7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgc2NlbmUgaXMgZm9yIHRyYW5zaXRpb24gLSBjYWxsIGl0cyBjb250cm9sbGVyc1xuICAgICAgICAgICAgICAgIGlmIChzY2VuZS5zY2VuZU5vdGlmaWNhdGlvbiA9PT0gc2NlbmVOb3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyc1tub3RpZmljYXRpb25dLmV4ZWN1dGUoeyBuYW1lOiBub3RpZmljYXRpb24sIGJvZHk6IG51bGwgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcnNbbm90aWZpY2F0aW9uXS5sYXllclRyYW5zaXRpb25JblN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJzW25vdGlmaWNhdGlvbl0ubGF5ZXJUcmFuc2l0aW9uT3V0U3RhcnQoKTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1biB0aHJvdWdoIGFsbCBjb250cm9sbGVycyB3aGljaCBhcmUgc3Vic2NyaWJlZCB0byBub3RpZmljYXRpb25cbiAgICAgKiBhbmQgY2FsbCB0aGVpciBoYW5kbGVyIG1ldGhvZHMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZU5vdGlmaWNhdGlvbihuYW1lOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vdGlmaWNhdGlvbnNbbmFtZV0pIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb250cm9sbGVyczogQ29udHJvbGxlcltdID0gdGhpcy5ub3RpZmljYXRpb25zW25hbWVdO1xuICAgICAgICBjb250cm9sbGVycy5mb3JFYWNoKChjb250cm9sbGVyOiBDb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICBjb250cm9sbGVyLmhhbmRsZU5vdGlmaWNhdGlvbih7IG5hbWUsIGJvZHkgfSk7XG4gICAgICAgIH0pOyAgICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDb250cm9sbGVyKGNvbnRyb2xsZXJDbGFzczogdHlwZW9mIENvbnRyb2xsZXIsIHZpZXdDbGFzcz86IHR5cGVvZiBWaWV3LCBsYXllcj86IENvbnRhaW5lcik6IENvbnRyb2xsZXIge1xuICAgICAgICBsZXQgY29udHJvbGxlcjogQ29udHJvbGxlciA9IG5ldyBjb250cm9sbGVyQ2xhc3MoKTtcbiAgICAgICAgY29udHJvbGxlci5vblJlZ2lzdGVyKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAodmlld0NsYXNzKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLnZpZXcgPSBuZXcgdmlld0NsYXNzKCk7XG4gICAgICAgICAgICBjb250cm9sbGVyLnZpZXcuY29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG4gICAgICAgICAgICBjb250cm9sbGVyLnZpZXcub25SZWdpc3RlcigpO1xuICAgICAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIuYWRkQ2hpbGQoY29udHJvbGxlci52aWV3LmRpc3BsYXkpOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRMYXllclRvU2NlbmUoY29udHJvbGxlci52aWV3LmRpc3BsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udHJvbGxlci52aWV3LnBvc3RSZWdpc3RlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udHJvbGxlci5wb3N0UmVnaXN0ZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250cm9sbGVyOyAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyQ29udHJvbGxlcihub3RpZmljYXRpb25OYW1lOiBzdHJpbmcsIGNvbnRyb2xsZXJDbGFzczogdHlwZW9mIENvbnRyb2xsZXIsIHZpZXdDbGFzcz86IHR5cGVvZiBWaWV3KTogdm9pZCB7XG4gICAgICAgIGxldCBjb250cm9sbGVyOiBDb250cm9sbGVyID0gdGhpcy5jcmVhdGVDb250cm9sbGVyKGNvbnRyb2xsZXJDbGFzcywgdmlld0NsYXNzKTsgICAgICAgIFxuIFxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzW25vdGlmaWNhdGlvbk5hbWVdID0gY29udHJvbGxlcjtcbiAgICAgICAgXG4gICAgICAgIC8vIFN1YnNjcmliZSBpdHNlbGYgdG8gbm90aWZpY2F0aW9uXG4gICAgICAgIGNvbnRyb2xsZXIuYWRkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGNvbnRyb2xsZXIuZXhlY3V0ZS5iaW5kKGNvbnRyb2xsZXIpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJNb2RlbChtb2RlbE5hbWU6IHN0cmluZywgbW9kZWxDbGFzczogdHlwZW9mIE1vZGVsKTogdm9pZCB7XG4gICAgICAgIGxldCBtb2RlbDogYW55ID0gbmV3IG1vZGVsQ2xhc3MoKTtcbiAgICAgICAgdGhpcy5tb2RlbHNbbW9kZWxOYW1lXSA9IG1vZGVsO1x0XG4gICAgfSAgXG5cbiAgICBwdWJsaWMgcmV0cmlldmVNb2RlbChtb2RlbE5hbWU6IHN0cmluZyk6IE1vZGVsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW21vZGVsTmFtZV07XHRcbiAgICB9ICAgIFxuICAgIFxuICAgIHB1YmxpYyByZWdpc3RlclNjZW5lKHNjZW5lTm90aWZpY2F0aW9uOiBzdHJpbmcsIGNvbnRyb2xsZXJzTm90aWZpY2F0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZXMucHVzaChcbiAgICAgICAgICAgIHsgc2NlbmVOb3RpZmljYXRpb24sIGNvbnRyb2xsZXJzTm90aWZpY2F0aW9ucyB9XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyc0luZGV4IHtcblx0W25vdGlmaWNhdGlvbk5hbWU6IHN0cmluZ106IENvbnRyb2xsZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvbkluZGV4IHtcblx0W25hbWU6IHN0cmluZ106IENvbnRyb2xsZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTW9kZWxJbmRleCB7XG5cdFttb2RlbE5hbWU6IHN0cmluZ106IE1vZGVsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTY2VuZUVudGl0eSB7XG4gICAgc2NlbmVOb3RpZmljYXRpb246IHN0cmluZzsgXG4gICAgY29udHJvbGxlcnNOb3RpZmljYXRpb25zOiBzdHJpbmdbXTtcbn0iLCJpbXBvcnQgeyBNdmMgfSBmcm9tIFwiLi9tdmNcIjtcbmV4cG9ydCBjbGFzcyBNVkNFbnRpdHkge1xuXG4gICAgZ2V0IG12YygpOiBNdmMge1xuXHRcdHJldHVybiBNdmMuZ2V0SW5zdGFuY2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgb25jZSB3aGVuIG9iamVjdCBpcyBjcmVhdGVkXG5cdCAqL1xuXHRwdWJsaWMgb25SZWdpc3RlcigpOiB2b2lkIHtcdFxuXHR9XG59IiwiZXhwb3J0IGNsYXNzIE1lbnVOb3RpZmljYXRpb25zIHsgIFxuICAgIHB1YmxpYyBzdGF0aWMgSU5JVDogc3RyaW5nID0gXCJNRU5VX0lOSVRcIjtcbiAgICBwdWJsaWMgc3RhdGljIEJVVFRPTlM6IHN0cmluZyA9IFwiTUVOVV9CVVRUT05TXCI7XG59IiwiaW1wb3J0IHsgQ29udGFpbmVyLCBJU2l6ZSwgUG9pbnQsIFRleHR1cmUgfSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHsgQXBwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9hcHAtbWFuYWdlclwiO1xuaW1wb3J0IHsgR2FtZU9iamVjdCwgTW92ZURpcmVjdGlvbnMgfSBmcm9tICcuL2dhbWUtb2JqZWN0JztcblxuZXhwb3J0IGNsYXNzIEdhbWVPYmplY3RWaWV3IHtcbiAgICBwcm90ZWN0ZWQgb3duZXI6IEdhbWVPYmplY3Q7XG4gICAgcHVibGljIGRpc3BsYXk6IENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKTtcbiAgICBwdWJsaWMgc2l6ZTogSVNpemU7XG4gICAgcHVibGljIHNwZWVkID0gMDtcbiAgICBwdWJsaWMgbW92ZURpcmVjdGlvbjogTW92ZURpcmVjdGlvbnM7XG5cbiAgICBwdWJsaWMgaW5pdChvYmplY3Q6IEdhbWVPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG9iamVjdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZSB0byBjbGVhbiB1cCB3aGVuIG9iamVjdCBpcyBiZWluZyBkZXN0b3J5ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmRlc3Ryb3koeyBjaGlsZHJlbjp0cnVlIH0pO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZ2V0IHgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS54O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5Lnk7XG4gICAgfSAgICBcblxuICAgIHB1YmxpYyBzZXQgeCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNwbGF5KSByZXR1cm47XG4gICAgICAgIHRoaXMuZGlzcGxheS54ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnkgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNlbnRlcigpOiBQb2ludCB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5zaXplLndpZHRoIC8gMiwgdGhpcy5zaXplLmhlaWdodCAvIDIpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRUZXh0dXJlKG5hbWU6IHN0cmluZyk6IFRleHR1cmUge1xuXHRcdHJldHVybiBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGV4dHVyZShuYW1lKTtcbiAgICB9XG4gICAgXG4gICAgcHJvdGVjdGVkIGdldFNwcml0ZVRleHR1cmVzKHNwcml0ZU5hbWU6IHN0cmluZywgZnJhbWVzQ291bnQ6IG51bWJlciwgZnJhbWVXaWR0aDogbnVtYmVyLCBmcmFtZUhlaWdodDogbnVtYmVyKTogVGV4dHVyZVtdIHtcbiAgICAgICAgcmV0dXJuIEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVUZXh0dXJlcyhzcHJpdGVOYW1lLCBmcmFtZXNDb3VudCwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBVbml0U3RhdGUgfSBmcm9tIFwiLi91bml0LXN0YXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBVbml0SWRsZVN0YXRlIGV4dGVuZHMgVW5pdFN0YXRlIHtcbiAgICBcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmVudGVyKCk7XG4gICAgICAgIHRoaXMudmlldy5wbGF5SWRsZUFuaW1hdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDb2xsaXNpb25XaXRoTWFwSXRlbSgpOiB2b2lkIHtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGhhbmRsZUNvbGxpc2lvbldpdGhPdGhlclVuaXQoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgfVxufSIsImltcG9ydCB7IFVuaXRTdGF0ZSB9IGZyb20gXCIuL3VuaXQtc3RhdGVcIjtcblxuZXhwb3J0IGNsYXNzIFVuaXREaWVTdGF0ZSBleHRlbmRzIFVuaXRTdGF0ZSB7XG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQgeyBcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcbiAgICAgICAgdGhpcy51bml0LmNhbkNvbGxpZGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnZpZXcucGxheURlYXRoQW5pbWF0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudW5pdC5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIElnbm9yaW5nIHRoZXNlIGFjdGlvbnM6XG4gICAgcHVibGljIHNob290KCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDb2xsaXNpb25XaXRoT3RoZXJVbml0KCk6IHZvaWQge1xuICAgIH0gXG5cbiAgICBwdWJsaWMgaGFuZGxlQ29sbGlzaW9uV2l0aEJ1bGxldCgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICB9ICAgIFxuXG4gICAgcHVibGljIG1vdmUoZGlyZWN0aW9uPzogbnVtYmVyKTogdm9pZCB7XG4gICAgfVxufSIsImltcG9ydCB7IFVuaXRTdGF0ZSB9IGZyb20gXCIuL3VuaXQtc3RhdGVcIjtcbmltcG9ydCB7IFVuaXQgfSBmcm9tIFwiLi91bml0XCI7XG5leHBvcnQgY2xhc3MgVW5pdE1vdmVTdGF0ZSBleHRlbmRzIFVuaXRTdGF0ZSB7XG4gICAgXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5lbnRlcigpO1xuICAgICAgICB0aGlzLnZpZXcucGxheVR1cm5BbmltYXRpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZShkaXJlY3Rpb24/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52aWV3LnBsYXlUdXJuQW5pbWF0aW9uKGRpcmVjdGlvbik7XG4gICAgICAgIHRoaXMudmlldy5tb3ZlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUNvbGxpc2lvbldpdGhNYXBJdGVtKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhhbmRsZUNvbGxpc2lvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDb2xsaXNpb25XaXRoT3RoZXJVbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhhbmRsZUNvbGxpc2lvbigpO1xuICAgIH0gXG5cbiAgICAvLyBCb3VuY2UgYmFja1xuICAgIHByb3RlY3RlZCBoYW5kbGVDb2xsaXNpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlldy5wbGF5Qm91bmNlQmFjaygpO1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgVW5pdFN0YXRlIH0gZnJvbSBcIi4vdW5pdC1zdGF0ZVwiO1xuXG5leHBvcnQgY2xhc3MgVW5pdFNwYXduU3RhdGUgZXh0ZW5kcyBVbml0U3RhdGUge1xuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHsgXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XG4gICAgICAgIHRoaXMudW5pdC5jYW5Db2xsaWRlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy52aWV3LnBsYXlTcGF3bkFuaW1hdGlvbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSWdub3JpbmcgdGhlc2UgYWN0aW9uczpcbiAgICBwdWJsaWMgc2hvb3QoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZSgpOiB2b2lkIHtcbiAgICB9IFxuXG4gICAgcHVibGljIGhhbmRsZUNvbGxpc2lvbldpdGhCdWxsZXQoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmUoZGlyZWN0aW9uPzogbnVtYmVyKTogdm9pZCB7XG4gICAgfSAgICBcbn0iLCJpbXBvcnQgZ3NhcCBmcm9tIFwiZ3NhcFwiO1xuaW1wb3J0IHsgR3JhcGhpY3MsIElTaXplIH0gZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL3V0aWxzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vbWlzYy9jb25maWdcIjtcbmltcG9ydCB7IEdhbWVPYmplY3QsIE1vdmVEaXJlY3Rpb25zIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvZ2FtZS1vYmplY3RcIjtcbmltcG9ydCB7IEdhbWVPYmplY3RUeXBlcyB9IGZyb20gXCIuLi8uLi8uLi9taXNjL2dhbWUtb2JqZWN0LXR5cGVzXCI7XG5pbXBvcnQgeyBHYW1lT2JqZWN0VmlldyB9IGZyb20gXCIuLi8uLi8uLi9taXNjL2dhbWUtb2JqZWN0LXZpZXdcIjtcbmltcG9ydCB7IElCdWxsZXRQYXJhbXMgfSBmcm9tIFwiLi4vYnVsbGV0L2J1bGxldFwiO1xuaW1wb3J0IHsgVW5pdCB9IGZyb20gXCIuL3VuaXRcIjtcblxuZXhwb3J0IGNsYXNzIFVuaXRWaWV3IGV4dGVuZHMgR2FtZU9iamVjdFZpZXcge1xuICAgIHByb3RlY3RlZCB1bml0OiBVbml0O1xuICAgIFxuICAgIHB1YmxpYyBzaXplOiBJU2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IDIwLFxuICAgICAgICBoZWlnaHQ6IDIwXG4gICAgfTtcblxuICAgIHB1YmxpYyBzcGF3bjogUElYSS5BbmltYXRlZFNwcml0ZTtcbiAgICBwdWJsaWMgZXhwbG9zaW9uOiBQSVhJLkFuaW1hdGVkU3ByaXRlO1xuICAgIHB1YmxpYyBza2luOiBQSVhJLlNwcml0ZTtcbiAgICBcbiAgICBwdWJsaWMgaW5pdChvYmplY3Q6IEdhbWVPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdChvYmplY3QpO1xuICAgICAgICB0aGlzLnVuaXQgPSBvYmplY3QgYXMgVW5pdDtcdFxuICAgICAgICBcdFxuICAgICAgICB0aGlzLmluaXRTa2luKCk7XG4gICAgICAgIHRoaXMuaW5pdEV4cGxvc2lvbkFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLmluaXRTcGF3bkFuaW1hdGlvbigpOyAgICAgICAgXG5cbiAgICAgICAgdGhpcy5wbGF5VHVybkFuaW1hdGlvbihNb3ZlRGlyZWN0aW9ucy5VcCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRTa2luKCk6IHZvaWQge1xuICAgICAgICBsZXQgdGV4dHVyZU5hbWU6IHN0cmluZyA9ICd0YW5rJztcblxuICAgICAgICBpZiAodGhpcy51bml0LnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5FbmVteSkge1xuICAgICAgICAgICAgdGV4dHVyZU5hbWUgPSBgZW5lbXkke1V0aWxzLnJhbmRvbUludCgxLCAzKX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5za2luID0gbmV3IFBJWEkuU3ByaXRlKHRoaXMuZ2V0VGV4dHVyZShDb25maWcuYXNzZXRzW3RleHR1cmVOYW1lXSkpO1xuICAgICAgICB0aGlzLnNraW4uYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICB0aGlzLnNraW4ucG9zaXRpb24gPSB0aGlzLmNlbnRlcjtcbiAgICAgICAgdGhpcy5za2luLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKHRoaXMuc2tpbik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRFeHBsb3Npb25BbmltYXRpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uID0gbmV3IFBJWEkuQW5pbWF0ZWRTcHJpdGUodGhpcy5nZXRTcHJpdGVUZXh0dXJlcyhDb25maWcuYXNzZXRzWydleHBsb2RlJ10sIDE2LCA2OCwgNjgpKTtcbiAgICAgICAgdGhpcy5leHBsb3Npb24uYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICB0aGlzLmV4cGxvc2lvbi5wb3NpdGlvbiA9IHRoaXMuY2VudGVyO1xuICAgICAgICB0aGlzLmV4cGxvc2lvbi5sb29wID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKHRoaXMuZXhwbG9zaW9uKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdFNwYXduQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNwYXduID0gbmV3IFBJWEkuQW5pbWF0ZWRTcHJpdGUodGhpcy5nZXRTcHJpdGVUZXh0dXJlcyhDb25maWcuYXNzZXRzWydhcHBlYXInXSwgMTAsIDY4LCA2OCkpO1xuICAgICAgICB0aGlzLnNwYXduLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGhpcy5zcGF3bi5wb3NpdGlvbiA9IHRoaXMuY2VudGVyO1xuICAgICAgICB0aGlzLnNwYXduLmxvb3AgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGF3bi52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGlzcGxheS5hZGRDaGlsZCh0aGlzLnNwYXduKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QnVsbGV0UGFyYW1zKCk6IElCdWxsZXRQYXJhbXMge1xuICAgICAgICBjb25zdCBvZmZzZXQ6IG51bWJlciA9IDI1O1xuICAgICAgICBsZXQgeDogbnVtYmVyID0gdGhpcy54ICsgdGhpcy5jZW50ZXIueDtcbiAgICAgICAgbGV0IHk6IG51bWJlciA9IHRoaXMueSArIHRoaXMuY2VudGVyLnk7XG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJlY3Rpb24gPT09IE1vdmVEaXJlY3Rpb25zLlVwKSB5ID0gdGhpcy55OyAgICBcbiAgICAgICAgaWYgKHRoaXMubW92ZURpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuRG93bikgeSA9IHRoaXMueSArIG9mZnNldDtcbiAgICAgICAgaWYgKHRoaXMubW92ZURpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuTGVmdCkgeCA9IHRoaXMueDsgIFxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5SaWdodCkgeCA9IHRoaXMueCArIG9mZnNldDtcblxuICAgICAgICByZXR1cm4geyBvd25lcjogdGhpcy51bml0LCB4LCB5LCBtb3ZlRGlyZWN0aW9uOiB0aGlzLm1vdmVEaXJlY3Rpb24gfVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5VHVybkFuaW1hdGlvbihkaXJlY3Rpb24/OiBNb3ZlRGlyZWN0aW9ucyk6IHZvaWQge1xuICAgICAgICBpZiAoZGlyZWN0aW9uICYmIGRpcmVjdGlvbiAhPT0gdGhpcy5tb3ZlRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVEaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYW5nbGU6IG51bWJlcjtcblxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5VcCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2tpbi5hbmdsZSA9PT0gMjcwKSB0aGlzLnNraW4uYW5nbGUgPSAtOTA7XG4gICAgICAgICAgICBhbmdsZSA9IDA7ICAgIFxuICAgICAgICB9ICAgIFxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5Eb3duKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDE4MDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5MZWZ0KSB7IFxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpbi5hbmdsZSA9PT0gMCkgdGhpcy5za2luLmFuZ2xlID0gMzYwO1xuICAgICAgICAgICAgYW5nbGUgPSAyNzA7ICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW92ZURpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuUmlnaHQpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gOTA7ICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGdzYXAudG8odGhpcy5za2luLCB7IGFuZ2xlLCBkdXJhdGlvbjogMC4xIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5SWRsZUFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICAgICAgZ3NhcC50byh0aGlzLnNraW4uc2NhbGUsIHsgZHVyYXRpb246IDAuMSwgeDogMSwgeTogMSB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheU1vdmVBbmltYXRpb24oKTogdm9pZCB7XG4gICAgICAgIGdzYXAudG8odGhpcy5za2luLnNjYWxlLCB7IGR1cmF0aW9uOiAwLjEsIHg6IDAuOTUsIHk6IDAuOTUgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmUoZXh0cmE6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbGF5TW92ZUFuaW1hdGlvbigpO1xuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5VcCkgdGhpcy5kaXNwbGF5LnkgLT0gdGhpcy51bml0LnNwZWVkICsgZXh0cmE7XG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJlY3Rpb24gPT09IE1vdmVEaXJlY3Rpb25zLkRvd24pIHRoaXMuZGlzcGxheS55ICs9IHRoaXMudW5pdC5zcGVlZCArIGV4dHJhO1xuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5MZWZ0KSB0aGlzLmRpc3BsYXkueCAtPSB0aGlzLnVuaXQuc3BlZWQgKyBleHRyYTtcbiAgICAgICAgaWYgKHRoaXMubW92ZURpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuUmlnaHQpIHRoaXMuZGlzcGxheS54ICs9IHRoaXMudW5pdC5zcGVlZCArIGV4dHJhO1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGFuZ2VNb3ZlRGlyZWN0aW9uVG9PcHBvc2l0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb3ZlRGlyZWN0aW9uID0gdGhpcy5tb3ZlRGlyZWN0aW9uICogLTE7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlCb3VuY2VCYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoYW5nZU1vdmVEaXJlY3Rpb25Ub09wcG9zaXRlKCk7XG4gICAgICAgIHRoaXMubW92ZSgyKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZlRGlyZWN0aW9uVG9PcHBvc2l0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5RGVhdGhBbmltYXRpb24ob25Db21wbGV0ZTogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5leHBsb3Npb24udmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uLnBsYXkoKTtcbiAgICAgICAgdGhpcy5leHBsb3Npb24ub25Db21wbGV0ZSA9ICgpID0+IG9uQ29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheVNwYXduQW5pbWF0aW9uKG9uQ29tcGxldGU6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3Bhd24udmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc3Bhd24ucGxheSgpO1xuICAgICAgICB0aGlzLnNwYXduLm9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNwYXduLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2tpbi52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uQ29tcGxldGUoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnggPSB4O1xuICAgICAgICB0aGlzLmRpc3BsYXkueSA9IHk7XG4gICAgfSAgICBcbn0iLCJpbXBvcnQgeyBNVkNFbnRpdHkgfSBmcm9tIFwiLi9tdmMtZW50aXR5XCI7XG5cbmV4cG9ydCBjbGFzcyBNb2RlbCB7XG4gICAgXG59IiwiaW1wb3J0IHsgUHJlbG9hZGVyTW9kdWxlIH0gZnJvbSAnLi9nYW1lL21vZHVsZXMvcHJlbG9hZGVyLW1vZHVsZS9wcmVsb2FkZXItbW9kdWxlJztcbmltcG9ydCB7IEVudHJ5UG9pbnQgfSBmcm9tICcuL2ZyYW1ld29yay9jb3JlL2VudHJ5LXBvaW50JztcbmltcG9ydCB7IE1lbnVNb2R1bGUgfSBmcm9tICcuL2dhbWUvbW9kdWxlcy9tZW51LW1vZHVsZS9tZW51LW1vZHVsZSc7XG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi9nYW1lL21vZHVsZXMvZ2FtZS1tb2R1bGUvZ2FtZS1tb2R1bGUnO1xuZXhwb3J0IGNsYXNzIEdhbWVFbnRyeVBvaW50IGV4dGVuZHMgRW50cnlQb2ludCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIG5ldyBQcmVsb2FkZXJNb2R1bGUoKTtcbiAgICAgICAgbmV3IE1lbnVNb2R1bGUoKTtcbiAgICAgICAgbmV3IEdhbWVNb2R1bGUoKTtcbiAgICB9XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbmV3IEdhbWVFbnRyeVBvaW50KCk7XG59IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL21vZHVsZVwiO1xuaW1wb3J0IHsgUHJlbG9hZGVyTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuL21pc2MvcHJlbG9hZGVyLW5hbWVzXCI7XG5pbXBvcnQgeyBQcmVsb2FkZXJJbml0Q29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL3ByZWxvYWRlci1pbml0LWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IFByZWxvYWRlckluaXRWaWV3IH0gZnJvbSBcIi4vdmlld3MvcHJlbG9hZGVyLWluaXQtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgUHJlbG9hZGVyTW9kdWxlIGV4dGVuZHMgTW9kdWxlIHtcbiAgICBwdWJsaWMgcmVnaXN0ZXJDb250cm9sbGVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sbGVyKFByZWxvYWRlck5vdGlmaWNhdGlvbnMuSU5JVCwgUHJlbG9hZGVySW5pdENvbnRyb2xsZXIsIFByZWxvYWRlckluaXRWaWV3KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJTY2VuZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRkU2NlbmUoUHJlbG9hZGVyTm90aWZpY2F0aW9ucy5JTklULCBbIFByZWxvYWRlck5vdGlmaWNhdGlvbnMuSU5JVCBdKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFByZWxvYWRlck5vdGlmaWNhdGlvbnMge1xuICAgIHB1YmxpYyBzdGF0aWMgSU5JVDogc3RyaW5nID0gXCJQUkVMT0FERVJfSU5JVFwiO1xufSIsImltcG9ydCB7IGdzYXAgfSBmcm9tIFwiZ3NhcFwiO1xuaW1wb3J0IHsgQXBwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9hcHAtbWFuYWdlclwiO1xuaW1wb3J0IHsgR2xvYmFsTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9nbG9iYWwtbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tdmMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgSU5vdGlmaWNhdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL212Yy9ub3RpZmljYXRpb24nO1xuaW1wb3J0IHsgR3JhcGhpY3NFbmdpbmVOb3RpZmljYXRpb25zIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9tb2R1bGVzL2dyYXBoaWNzLWVuZ2luZS1tb2R1bGUvbWlzYy9ncmFwaGljcy1lbmdpbmUtbmFtZXNcIjtcbmltcG9ydCB7IE1lbnVOb3RpZmljYXRpb25zIH0gZnJvbSBcIi4uLy4uL21lbnUtbW9kdWxlL21pc2MvbWVudS1uYW1lc1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL21pc2MvY29uZmlnXCI7XG5pbXBvcnQgeyBQcmVsb2FkZXJOb3RpZmljYXRpb25zIH0gZnJvbSBcIi4uL21pc2MvcHJlbG9hZGVyLW5hbWVzXCI7XG5pbXBvcnQgeyBQcmVsb2FkZXJJbml0VmlldyB9IGZyb20gXCIuLi92aWV3cy9wcmVsb2FkZXItaW5pdC12aWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBQcmVsb2FkZXJJbml0Q29udHJvbGxlciBleHRlbmRzIENvbnRyb2xsZXIge1xuICAgIHByb3RlY3RlZCBsb2FkaW5nSW5pdGlhbEFzc2V0czogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBwdWJsaWMgYWRkTm90aWZpY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGROb3RpZmljYXRpb24oR3JhcGhpY3NFbmdpbmVOb3RpZmljYXRpb25zLkFTU0VUU19MT0FESU5HX0NPTVBMRVRFLCB0aGlzLm9uQXNzZXRzTG9hZGluZ0NvbXBsZXRlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmFkZE5vdGlmaWNhdGlvbihHcmFwaGljc0VuZ2luZU5vdGlmaWNhdGlvbnMuQVNTRVRTX0xPQURJTkdfT05fUFJPR1JFU1MsIHRoaXMub25Bc3NldHNMb2FkaW5nUHJvZ3Jlc3MuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBvc3RSZWdpc3RlcigpOiB2b2lkIHtcdFxuICAgICAgICB0aGlzLnN0YXJ0QXNzZXRzTG9hZGluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZXJlIGFyZSB0d28gbG9hZGluZyBwaGFzZXM6IFxuICAgICAqIDEpIExvYWQgdGhlIHByZWxvYWRlciBhc3NldHMgaW4gb3JkZXIgdG8gc2hvdyB0aGUgcHJvZ3Jlc3MgYmFyXG4gICAgICogMikgTG9hZCB0aGUgcmVzdCBvZiB0aGUgYXNzZXRzXG4gICAgICovICAgIFxuICAgIHByb3RlY3RlZCBzdGFydEFzc2V0c0xvYWRpbmcoKTogdm9pZCB7XG4gICAgICAgIGxldCBhc3NldHM6IGFueSA9IENvbmZpZy5hc3NldHM7XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdJbml0aWFsQXNzZXRzKSB7XG4gICAgICAgICAgICBhc3NldHMgPSBDb25maWcucHJlbG9hZGVyQWFzc2V0cztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oR3JhcGhpY3NFbmdpbmVOb3RpZmljYXRpb25zLlNUQVJUX0FTU0VUU19MT0FESU5HLCBhc3NldHMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkFzc2V0c0xvYWRpbmdDb21wbGV0ZShub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0luaXRpYWxBc3NldHMpIHtcbiAgICAgICAgICAgIC8vIEhhdmUgbG9hZGVkIHRoZSBpbml0aWFsIGFzc2V0cywgc28gY2FuIGRyYXcgdGhlIHNjZW5lXG4gICAgICAgICAgICAvLyBhbmQgY2FuIHN0YXJ0IHRvIGxvYWQgdGhlIHJlc3Qgb2YgdGhlIGdhbWUgYXNzZXRzXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdJbml0aWFsQXNzZXRzID0gZmFsc2U7XG4gICAgICAgICAgICAodGhpcy52aWV3IGFzIFByZWxvYWRlckluaXRWaWV3KS5kcmF3U2NlbmUoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBc3NldHNMb2FkaW5nKClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZ3NhcC5kZWxheWVkQ2FsbCgxLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBUcmFuc2l0aW9uIHRvIG1lbnUgc2NlbmVcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihHbG9iYWxOb3RpZmljYXRpb25zLlRSQU5TSVRJT05fVE9fU0NFTkUsIE1lbnVOb3RpZmljYXRpb25zLklOSVQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Bc3NldHNMb2FkaW5nUHJvZ3Jlc3Mobm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIC8vIENhbm5vdCBkaXNwbGF5IGEgcHJvZ3JlZXMgaWYgdGhlcmUgaXMgbm8gcHJvZ3Jlc3MgYmFyIHlldCA6KVxuICAgICAgICBpZiAodGhpcy5sb2FkaW5nSW5pdGlhbEFzc2V0cykgcmV0dXJuO1xuICAgICAgICAodGhpcy52aWV3IGFzIFByZWxvYWRlckluaXRWaWV3KS51cGRhdGVQcm9ncmVzc0Jhcihub3RpZmljYXRpb24uYm9keSk7XG4gICAgfVxufSIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL3ZpZXdcIjtcbmltcG9ydCB7IEFwcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvYXBwLW1hbmFnZXJcIjtcbmltcG9ydCB7IENvbnRhaW5lciwgR3JhcGhpY3MsIFNwcml0ZSwgVGV4dCB9IGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vbWlzYy9jb25maWdcIjtcbmltcG9ydCB7IGdzYXAgfSBmcm9tICdnc2FwJztcblxuZXhwb3J0IGNsYXNzIFByZWxvYWRlckluaXRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgcHJvdGVjdGVkIGJhcjogU3ByaXRlO1xuXG4gICAgcHVibGljIGRyYXdTY2VuZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYXdCZygpO1xuICAgICAgICB0aGlzLmRyYXdUaXRsZSgpO1xuICAgICAgICB0aGlzLmRyYXdQcm9ncmVzc0JhcigpO1xuICAgIH1cbiBcbiAgICBwcm90ZWN0ZWQgZHJhd1RpdGxlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0ZXh0OiBUZXh0ID0gbmV3IFRleHQoJ0xvYWRpbmcgZ2FtZS4uLicpO1xuICAgICAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGV4dC54ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lV2lkdGgoKSAvIDI7XG4gICAgICAgIHRleHQueSA9IEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2VuZUhlaWdodCgpIC8gMjtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKHRleHQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkcmF3QmcoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGJnOiBHcmFwaGljcyA9IG5ldyBHcmFwaGljcygpO1xuICAgICAgICBiZy5iZWdpbkZpbGwoMHhERTMyNDkpO1xuICAgICAgICBiZy5kcmF3UmVjdCgwLCAwLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVXaWR0aCgpLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVIZWlnaHQoKSk7XG4gICAgICAgIGJnLmVuZEZpbGwoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKGJnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJhd1Byb2dyZXNzQmFyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBob2xkZXI6IENvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG4gICAgICAgIGNvbnN0IGJnOiBTcHJpdGUgPSBuZXcgU3ByaXRlKHRoaXMuZ2V0VGV4dHVyZShDb25maWcucHJlbG9hZGVyQWFzc2V0c1snbG9hZGVyQmcnXSkpO1xuICAgICAgICB0aGlzLmJhciA9IG5ldyBTcHJpdGUodGhpcy5nZXRUZXh0dXJlKENvbmZpZy5wcmVsb2FkZXJBYXNzZXRzWydsb2FkZXJCYXInXSkpO1xuICAgICAgICB0aGlzLmJhci54ID0gdGhpcy5iYXIueSA9IDU7XG4gICAgICAgIHRoaXMuYmFyLndpZHRoXG4gICAgICAgIGhvbGRlci5hZGRDaGlsZChiZywgdGhpcy5iYXIpO1xuICAgICAgICBob2xkZXIucGl2b3QueCA9IGhvbGRlci53aWR0aCAvIDI7XG4gICAgICAgIGhvbGRlci54ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lV2lkdGgoKSAvIDI7XG4gICAgICAgIGhvbGRlci55ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lSGVpZ2h0KCkgLyAyICsgNTA7XG4gICAgICAgIHRoaXMuZGlzcGxheS5hZGRDaGlsZChob2xkZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVQcm9ncmVzc0Jhcihwcm9ncmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIEVtdWxhdGluZyBzb21lIHRocm90dGxpbmdcbiAgICAgICAgZ3NhcC50byh0aGlzLmJhci5zY2FsZSwgeyBkdXJhdGlvbjogMSwgeDogcHJvZ3Jlc3MgLyAxMDAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2dyZXNzKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgR3JhcGhpY3NFbmdpbmVNb2R1bGUgfSBmcm9tIFwiLi4vbW9kdWxlcy9ncmFwaGljcy1lbmdpbmUtbW9kdWxlL2dyYXBoaWNzLWVuZ2luZS1tb2R1bGVcIjtcblxuZXhwb3J0IGNsYXNzIEVudHJ5UG9pbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBuZXcgR3JhcGhpY3NFbmdpbmVNb2R1bGUoKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4uLy4uL2NvcmUvbW9kdWxlXCI7XG5pbXBvcnQgeyBHcmFwaGljc0VuZ2luZUxvYWRlckNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9ncmFwaGljcy1lbmdpbmUtbG9hZGVyLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IEdyYXBoaWNzRW5naW5lTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuL21pc2MvZ3JhcGhpY3MtZW5naW5lLW5hbWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBHcmFwaGljc0VuZ2luZU1vZHVsZSBleHRlbmRzIE1vZHVsZSB7ICBcbiAgICBwdWJsaWMgcmVnaXN0ZXJDb250cm9sbGVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sbGVyKEdyYXBoaWNzRW5naW5lTm90aWZpY2F0aW9ucy5TVEFSVF9BU1NFVFNfTE9BRElORywgR3JhcGhpY3NFbmdpbmVMb2FkZXJDb250cm9sbGVyKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQXBwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2FwcC1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvbXZjL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IElOb3RpZmljYXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9tdmMvbm90aWZpY2F0aW9uXCI7XG5pbXBvcnQgeyBHcmFwaGljc0VuZ2luZU5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiLi4vbWlzYy9ncmFwaGljcy1lbmdpbmUtbmFtZXNcIjtcblxuZXhwb3J0IGNsYXNzIEdyYXBoaWNzRW5naW5lTG9hZGVyQ29udHJvbGxlciBleHRlbmRzIENvbnRyb2xsZXIge1xuXG4gICAgcHVibGljIGV4ZWN1dGUobm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydEFzc2V0c0xvYWRpbmcobm90aWZpY2F0aW9uLmJvZHksIHRoaXMub25Bc3NldHNMb2FkaW5nQ29tcGxldGUuYmluZCh0aGlzKSwgdGhpcy5vbkFzc2V0c0xvYWRpbmdQcm9ncmVzcy5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Bc3NldHNMb2FkaW5nQ29tcGxldGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihHcmFwaGljc0VuZ2luZU5vdGlmaWNhdGlvbnMuQVNTRVRTX0xPQURJTkdfQ09NUExFVEUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkFzc2V0c0xvYWRpbmdQcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihHcmFwaGljc0VuZ2luZU5vdGlmaWNhdGlvbnMuQVNTRVRTX0xPQURJTkdfT05fUFJPR1JFU1MsIHByb2dyZXNzKTtcbiAgICB9ICAgIFxufSIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tb2R1bGVcIjtcbmltcG9ydCB7IE1lbnVCdXR0b25zQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL21lbnUtYnV0dG9ucy1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBNZW51SW5pdENvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9tZW51LWluaXQtY29udHJvbGxlclwiO1xuaW1wb3J0IHsgTWVudU5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiLi9taXNjL21lbnUtbmFtZXNcIjtcbmltcG9ydCB7IE1lbnVCdXR0b25zVmlldyB9IGZyb20gXCIuL3ZpZXdzL21lbnUtYnV0dG9ucy12aWV3XCI7XG5pbXBvcnQgeyBNZW51SW5pdFZpZXcgfSBmcm9tIFwiLi92aWV3cy9tZW51LWluaXQtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgTWVudU1vZHVsZSBleHRlbmRzIE1vZHVsZSB7XG4gICAgcHVibGljIHJlZ2lzdGVyQ29udHJvbGxlcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRkQ29udHJvbGxlcihNZW51Tm90aWZpY2F0aW9ucy5JTklULCBNZW51SW5pdENvbnRyb2xsZXIsIE1lbnVJbml0Vmlldyk7XG4gICAgICAgIHRoaXMuYWRkQ29udHJvbGxlcihNZW51Tm90aWZpY2F0aW9ucy5CVVRUT05TLCBNZW51QnV0dG9uc0NvbnRyb2xsZXIsIE1lbnVCdXR0b25zVmlldyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyU2NlbmVzKCk6IHZvaWQge1xuICAgICAgICAvL3RoaXMuYWRkU2NlbmUoTWVudU5vdGlmaWNhdGlvbnMuSU5JVCwgWyBNZW51Tm90aWZpY2F0aW9ucy5JTklUIF0pO1xuICAgICAgICB0aGlzLmFkZFNjZW5lKE1lbnVOb3RpZmljYXRpb25zLklOSVQsIFsgTWVudU5vdGlmaWNhdGlvbnMuSU5JVCwgTWVudU5vdGlmaWNhdGlvbnMuQlVUVE9OUyBdKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tdmMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgTWVudU5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiLi4vbWlzYy9tZW51LW5hbWVzXCI7XG5pbXBvcnQgeyBJTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL25vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBNZW51SW5pdFZpZXcgfSBmcm9tICcuLi92aWV3cy9tZW51LWluaXQtdmlldyc7XG5pbXBvcnQgeyBHYW1lTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi9nYW1lLW1vZHVsZS9taXNjL2dhbWUtbmFtZXNcIjtcbmltcG9ydCB7IGdzYXAgfSBmcm9tIFwiZ3NhcFwiO1xuaW1wb3J0IHsgR2xvYmFsTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9nbG9iYWwtbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgTWVudUJ1dHRvbnNWaWV3IH0gZnJvbSBcIi4uL3ZpZXdzL21lbnUtYnV0dG9ucy12aWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBNZW51QnV0dG9uc0NvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgICBcbiAgICBwdWJsaWMgYWRkTm90aWZpY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgLy90aGlzLmFkZE5vdGlmaWNhdGlvbihHbG9iYWxOb3RpZmljYXRpb25zLlRSQU5TSVRJT05fVE9fU0NFTkUsIHRoaXMuc2hvd01lbnUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUobm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd01lbnUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd01lbnUoKTogdm9pZCB7XG4gICAgICAgICh0aGlzLnZpZXcgYXMgTWVudUJ1dHRvbnNWaWV3KS5kcmF3U2NlbmUoKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tdmMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgTWVudU5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiLi4vbWlzYy9tZW51LW5hbWVzXCI7XG5pbXBvcnQgeyBJTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL25vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBNZW51SW5pdFZpZXcgfSBmcm9tICcuLi92aWV3cy9tZW51LWluaXQtdmlldyc7XG5pbXBvcnQgeyBHYW1lTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi9nYW1lLW1vZHVsZS9taXNjL2dhbWUtbmFtZXNcIjtcbmltcG9ydCB7IGdzYXAgfSBmcm9tIFwiZ3NhcFwiO1xuaW1wb3J0IHsgR2xvYmFsTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9nbG9iYWwtbm90aWZpY2F0aW9uc1wiO1xuXG5leHBvcnQgY2xhc3MgTWVudUluaXRDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgXG4gICAgcHVibGljIGV4ZWN1dGUobm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd01lbnUoKTtcblxuICAgICAgICBnc2FwLmRlbGF5ZWRDYWxsKDEsICgpID0+IHtcbiAgICAgICAgICAgIC8vIFRyYW5zaXRpb24gdG8gZ2FtZSBzY2VuZVxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKEdsb2JhbE5vdGlmaWNhdGlvbnMuVFJBTlNJVElPTl9UT19TQ0VORSwgR2FtZU5vdGlmaWNhdGlvbnMuU0NFTkUpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93TWVudSgpOiB2b2lkIHtcbiAgICAgICAgKHRoaXMudmlldyBhcyBNZW51SW5pdFZpZXcpLmRyYXdTY2VuZSgpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL212Yy92aWV3XCI7XG5pbXBvcnQgeyBBcHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL2FwcC1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb250YWluZXIsIEdyYXBoaWNzLCBTcHJpdGUsIFRleHQgfSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL21pc2MvY29uZmlnXCI7XG5pbXBvcnQgeyBnc2FwIH0gZnJvbSAnZ3NhcCc7XG5cbmV4cG9ydCBjbGFzcyBNZW51QnV0dG9uc1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBwcm90ZWN0ZWQgYmFyOiBTcHJpdGU7XG5cbiAgICBwdWJsaWMgZHJhd1NjZW5lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdUaXRsZSgpO1xuICAgIH1cbiBcbiAgICBwcm90ZWN0ZWQgZHJhd1RpdGxlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0ZXh0OiBUZXh0ID0gbmV3IFRleHQoJ0JVVFRPTlMnKTtcbiAgICAgICAgdGV4dC5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgIHRleHQueCA9IEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2VuZVdpZHRoKCkgLyAyO1xuICAgICAgICB0ZXh0LnkgPSBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVIZWlnaHQoKSAvIDIgKyA1MDtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKHRleHQpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL212Yy92aWV3XCI7XG5pbXBvcnQgeyBBcHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL2FwcC1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb250YWluZXIsIEdyYXBoaWNzLCBTcHJpdGUsIFRleHQgfSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL21pc2MvY29uZmlnXCI7XG5pbXBvcnQgeyBnc2FwIH0gZnJvbSAnZ3NhcCc7XG5cbmV4cG9ydCBjbGFzcyBNZW51SW5pdFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBwcm90ZWN0ZWQgYmFyOiBTcHJpdGU7XG5cbiAgICBwdWJsaWMgZHJhd1NjZW5lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BsYXkudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZHJhd0JnKCk7XG4gICAgICAgIHRoaXMuZHJhd1RpdGxlKCk7XG4gICAgfVxuIFxuICAgIHByb3RlY3RlZCBkcmF3VGl0bGUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRleHQ6IFRleHQgPSBuZXcgVGV4dCgnTUVOVSEnKTtcbiAgICAgICAgdGV4dC5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgIHRleHQueCA9IEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2VuZVdpZHRoKCkgLyAyO1xuICAgICAgICB0ZXh0LnkgPSBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVIZWlnaHQoKSAvIDI7XG4gICAgICAgIHRoaXMuZGlzcGxheS5hZGRDaGlsZCh0ZXh0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJhd0JnKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBiZzogR3JhcGhpY3MgPSBuZXcgR3JhcGhpY3MoKTtcbiAgICAgICAgYmcuYmVnaW5GaWxsKDB4REUzMjQ5KTtcbiAgICAgICAgYmcuZHJhd1JlY3QoMCwgMCwgQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lV2lkdGgoKSwgQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lSGVpZ2h0KCkpO1xuICAgICAgICBiZy5lbmRGaWxsKCk7XG4gICAgICAgIHRoaXMuZGlzcGxheS5hZGRDaGlsZChiZyk7XG4gICAgfVxufSIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tb2R1bGVcIjtcbmltcG9ydCB7IEdhbWVNYWluQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL2dhbWUtbWFpbi1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBHYW1lTW9kZWxzLCBHYW1lTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuL21pc2MvZ2FtZS1uYW1lc1wiO1xuaW1wb3J0IHsgR2FtZU1haW5WaWV3IH0gZnJvbSBcIi4vdmlld3MvZ2FtZS1tYWluLXZpZXdcIjtcbmltcG9ydCB7IEdhbWVVaUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9nYW1lLXVpLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IEdhbWVVaVZpZXcgfSBmcm9tIFwiLi92aWV3cy9nYW1lLXVpLXZpZXdcIjtcbmltcG9ydCB7IEdhbWVNb2RlbCB9IGZyb20gXCIuL21vZGVscy9nYW1lLW1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBHYW1lTW9kdWxlIGV4dGVuZHMgTW9kdWxlIHtcblxuICAgIHByb3RlY3RlZCByZWdpc3RlckNvbnRyb2xsZXJzKCk6IHZvaWQgeyAgICBcbiAgICAgICAgdGhpcy5hZGRDb250cm9sbGVyKEdhbWVOb3RpZmljYXRpb25zLk1BSU4sIEdhbWVNYWluQ29udHJvbGxlciwgR2FtZU1haW5WaWV3KTtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sbGVyKEdhbWVOb3RpZmljYXRpb25zLlVJLCBHYW1lVWlDb250cm9sbGVyLCBHYW1lVWlWaWV3KTtcblxuICAgICAgICAvL3RoaXMuYWRkQ29udHJvbGxlcihHYW1lTm90aWZpY2F0aW9ucy5VTklUUywgR2FtZVVuaXRzQ29udHJvbGxlciwgR2FtZVVuaXRzVmlldyk7XG4gICAgICAgIC8vdGhpcy5hZGRDb250cm9sbGVyKEdhbWVOb3RpZmljYXRpb25zLk1BUCwgR2FtZU1hcENvbnRyb2xsZXIsIEdhbWVNYXBWaWV3KTtcbiAgICAgICAgLy90aGlzLmFkZENvbnRyb2xsZXIoR2FtZU5vdGlmaWNhdGlvbnMuQlVMTEVUUywgR2FtZUJ1bGxldHNDb250cm9sbGVyLCBHYW1lQnVsbGV0c1ZpZXcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZWdpc3Rlck1vZGVscygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRNb2RlbChHYW1lTW9kZWxzLkdBTUUsIEdhbWVNb2RlbCk7XG4gICAgICAgIC8vdGhpcy5hZGRNb2RlbChHYW1lTW9kZWxzLk1BUCwgR2FtZU1hcE1vZGVsKTtcbiAgICAgICAgLy90aGlzLmFkZE1vZGVsKEdhbWVNb2RlbHMuVU5JVFMsIEdhbWVVbml0c01vZGVsKTtcbiAgICAgICAgLy90aGlzLmFkZE1vZGVsKEdhbWVNb2RlbHMuQlVMTEVUUywgR2FtZUJ1bGxldHNNb2RlbCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZ2lzdGVyU2NlbmVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZFNjZW5lKEdhbWVOb3RpZmljYXRpb25zLlNDRU5FLCBbIFxuICAgICAgICAgICAgR2FtZU5vdGlmaWNhdGlvbnMuTUFJTixcbiAgICAgICAgICAgIEdhbWVOb3RpZmljYXRpb25zLlVJLFxuICAgICAgICAgICAgLy9HYW1lTm90aWZpY2F0aW9ucy5NQVAsXG4vLyAgICAgICAgICAgIEdhbWVOb3RpZmljYXRpb25zLlVOSVRTLFxuICAgICAgICAgICAgLy9HYW1lTm90aWZpY2F0aW9ucy5CVUxMRVRTXG4gICAgICAgIF0pO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBVbml0IH0gZnJvbSBcIi4uLy4uL3ZpZXdzL2VsZW1lbnRzL3VuaXQvdW5pdFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4uLy4uL3ZpZXdzL2VsZW1lbnRzL3VuaXQvcGxheWVyXCI7XG5pbXBvcnQgeyBFbmVteSB9IGZyb20gXCIuLi8uLi92aWV3cy9lbGVtZW50cy91bml0L2VuZW15XCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBJQnVsbGV0UGFyYW1zIH0gZnJvbSBcIi4uLy4uL3ZpZXdzL2VsZW1lbnRzL2J1bGxldC9idWxsZXRcIjtcbmltcG9ydCB7IEdhbWVPYmplY3RUeXBlcyB9IGZyb20gXCIuLi8uLi9taXNjL2dhbWUtb2JqZWN0LXR5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBVbml0c0ZhY3Rvcnkge1xuICAgIFxuICAgIHB1YmxpYyBnZXRTcGF3blBvaW50OiBGdW5jdGlvbjtcbiAgICBwdWJsaWMgb25DcmVhdGVCdWxsZXQ6IEZ1bmN0aW9uO1xuICAgIHB1YmxpYyBvblVuaXREZXN0cm95OiBGdW5jdGlvbjtcbiAgICBwdWJsaWMgb25Vbml0Q3JlYXRlOiBGdW5jdGlvbjtcblxuICAgIHB1YmxpYyBjcmVhdGVQbGF5ZXIoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHVuaXQ6IFBsYXllciA9IG5ldyBQbGF5ZXIoKTtcbiAgICAgICAgdW5pdC5pbml0KCk7XG4gICAgICAgIGNvbnN0IHNwYXduUG9pbnQ6IFBvaW50ID0gdGhpcy5nZXRTcGF3blBvaW50KEdhbWVPYmplY3RUeXBlcy5QbGF5ZXJTcGF3blBvaW50KTtcbiAgICAgICAgdW5pdC5zZXRQb3NpdGlvbihzcGF3blBvaW50LngsIHNwYXduUG9pbnQueSk7ICAgICAgICBcbiAgICAgICAgdGhpcy5vblVuaXRDcmVhdGUodGhpcy5maW5pc2hVbml0Q3JlYXRpb24odW5pdCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVFbmVteSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdW5pdDogRW5lbXkgPSBuZXcgRW5lbXkoKTtcbiAgICAgICAgdW5pdC5pbml0KCk7XG4gICAgICAgIGNvbnN0IHNwYXduUG9pbnQ6IFBvaW50ID0gdGhpcy5nZXRTcGF3blBvaW50KEdhbWVPYmplY3RUeXBlcy5FbmVteVNwYXduUG9pbnQpO1xuICAgICAgICB1bml0LnNldFBvc2l0aW9uKHNwYXduUG9pbnQueCwgc3Bhd25Qb2ludC55KTsgICAgICAgIFxuICAgICAgICB0aGlzLm9uVW5pdENyZWF0ZSh0aGlzLmZpbmlzaFVuaXRDcmVhdGlvbih1bml0KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGZpbmlzaFVuaXRDcmVhdGlvbih1bml0OiBVbml0KTogVW5pdCB7XG4gICAgICAgIHVuaXQub25TaG9vdCA9IChwYXJhbXM6IElCdWxsZXRQYXJhbXMpID0+IHRoaXMub25DcmVhdGVCdWxsZXQocGFyYW1zKTtcbiAgICAgICAgdW5pdC5vbkRlc3Ryb3kgPSAoKSA9PiB0aGlzLm9uVW5pdERlc3Ryb3kodW5pdCk7XG4gICAgICAgIHJldHVybiB1bml0O1xuICAgIH0gICAgICAgXG59IiwiaW1wb3J0IHsgR2FtZU9iamVjdFR5cGVzIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvZ2FtZS1vYmplY3QtdHlwZXNcIjtcbmltcG9ydCB7IEdhbWVPYmplY3QsIE1vdmVEaXJlY3Rpb25zIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvZ2FtZS1vYmplY3RcIjtcbmltcG9ydCB7IEJ1bGxldFZpZXcgfSBmcm9tICcuL2J1bGxldC12aWV3JztcblxuZXhwb3J0IGNsYXNzIEJ1bGxldCBleHRlbmRzIEdhbWVPYmplY3Qge1xuXG4gICAgcHVibGljIGluaXQocGFyYW1zOiBJQnVsbGV0UGFyYW1zKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgICAgdGhpcy50eXBlID0gR2FtZU9iamVjdFR5cGVzLkJ1bGxldDtcbiAgICAgICAgdGhpcy5vd25lciA9IHBhcmFtcy5vd25lcjtcblxuICAgICAgICB0aGlzLmluaXRWaWV3KEJ1bGxldFZpZXcsIHRoaXMpO1xuXG4gICAgICAgICh0aGlzLnZpZXcgYXMgQnVsbGV0VmlldykuY3JlYXRlQnVsbGV0KHBhcmFtcyk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBkZXN0cm95QnVsbGV0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNhbkNvbGxpZGUgPSBmYWxzZTtcbiAgICAgICAgKHRoaXMudmlldyBhcyBCdWxsZXRWaWV3KS5wbGF5RXhwbG9zaW9uQW5pbWF0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDb2xsaXNpb25XaXRoKG9iamVjdDogR2FtZU9iamVjdCk6IHZvaWQge1xuICAgICAgICBpZiAob2JqZWN0LnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5Ccmlja1dhbGwgfHwgb2JqZWN0LnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5TdG9uZVdhbGwgfHwgb2JqZWN0LnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5FYWdsZSkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95QnVsbGV0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iamVjdC50eXBlID09PSBHYW1lT2JqZWN0VHlwZXMuQnVsbGV0KSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCdWxsZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0LnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5FbmVteSAmJiB0aGlzLm93bmVyLnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5QbGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUJ1bGxldCgpO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICAodGhpcy52aWV3IGFzIEJ1bGxldFZpZXcpLnVwZGF0ZSgpO1xuICAgIH0gIFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCdWxsZXRQYXJhbXMge1xuICAgIG93bmVyPzogR2FtZU9iamVjdCxcbiAgICB4PzogbnVtYmVyLFxuICAgIHk/OiBudW1iZXIsXG4gICAgbW92ZURpcmVjdGlvbj86IE1vdmVEaXJlY3Rpb25zO1xufSIsImltcG9ydCB7IElTaXplLCBTcHJpdGUgfSBmcm9tICdwaXhpLmpzJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9taXNjL2NvbmZpZ1wiO1xuaW1wb3J0IHsgQXBwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9hcHAtbWFuYWdlclwiO1xuaW1wb3J0IHsgR2FtZU9iamVjdCwgTW92ZURpcmVjdGlvbnMgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy9nYW1lLW9iamVjdFwiO1xuaW1wb3J0IHsgR2FtZU9iamVjdFZpZXcgfSBmcm9tICcuLi8uLi8uLi9taXNjL2dhbWUtb2JqZWN0LXZpZXcnO1xuaW1wb3J0IHsgSUJ1bGxldFBhcmFtcyB9IGZyb20gJy4vYnVsbGV0JztcblxuZXhwb3J0IGNsYXNzIEJ1bGxldFZpZXcgZXh0ZW5kcyBHYW1lT2JqZWN0VmlldyB7XG5cbiAgICBwdWJsaWMgc3BlZWQgPSA4O1xuICAgIHB1YmxpYyBzaXplOiBJU2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IDUsXG4gICAgICAgIGhlaWdodDogNVxuICAgIH07IFxuICAgIFxuICAgIHByb3RlY3RlZCBza2luOiBTcHJpdGU7XG4gICAgcHVibGljIGV4cGxvc2lvbjogUElYSS5BbmltYXRlZFNwcml0ZTtcbiAgICBcbiAgICBwdWJsaWMgaW5pdChvYmplY3Q6IEdhbWVPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdChvYmplY3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVCdWxsZXQocGFyYW1zOiBJQnVsbGV0UGFyYW1zKTogdm9pZCB7XG4gICAgICAgIC8vY29uc3QgYnVsbGV0TmFtZTogc3RyaW5nID0gdGhpcy51bml0LnR5cGUgPT09IFVuaXRUeXBlcy5QbGF5ZXIgPyBDb25maWcuYXNzZXRzWydidWxsZXQnXSA6IENvbmZpZy5hc3NldHNbJ2VuZW15QnVsbGV0J107XG4gICAgICAgIGNvbnN0IGJ1bGxldE5hbWU6IHN0cmluZyA9IENvbmZpZy5hc3NldHNbJ2J1bGxldCddO1xuICAgICAgICB0aGlzLnNraW4gPSBuZXcgU3ByaXRlKEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZXh0dXJlKGJ1bGxldE5hbWUpKTtcbiAgICAgICAgdGhpcy5za2luLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGhpcy5za2luLnNjYWxlLnNldCgwLjUpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuYWRkQ2hpbGQodGhpcy5za2luKTsgICAgICAgIFxuXG4gICAgICAgIHRoaXMuZGlzcGxheS54ID0gcGFyYW1zLng7XG4gICAgICAgIHRoaXMuZGlzcGxheS55ID0gcGFyYW1zLnk7XG4gICAgICAgIHRoaXMubW92ZURpcmVjdGlvbiA9IHBhcmFtcy5tb3ZlRGlyZWN0aW9uO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0RXhwbG9zaW9uQW5pbWF0aW9uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlFeHBsb3Npb25BbmltYXRpb24ob25Db21wbGV0ZTogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5za2luLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uLnggPSB0aGlzLnNraW4ueDtcbiAgICAgICAgdGhpcy5leHBsb3Npb24ueSA9IHRoaXMuc2tpbi55O1xuICAgICAgICB0aGlzLmV4cGxvc2lvbi52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5leHBsb3Npb24ucGxheSgpO1xuICAgICAgICB0aGlzLmV4cGxvc2lvbi5vbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRFeHBsb3Npb25BbmltYXRpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uID0gbmV3IFBJWEkuQW5pbWF0ZWRTcHJpdGUoQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZVRleHR1cmVzKENvbmZpZy5hc3NldHNbJ2V4cGxvZGUnXSwgMTYsIDY4LCA2OCkpO1xuICAgICAgICB0aGlzLmV4cGxvc2lvbi5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uLnNjYWxlLnNldCgwLjUpO1xuICAgICAgICB0aGlzLmV4cGxvc2lvbi5sb29wID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmFkZENoaWxkKHRoaXMuZXhwbG9zaW9uKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZURpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuVXApIHRoaXMueSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyZWN0aW9uID09PSBNb3ZlRGlyZWN0aW9ucy5Eb3duKSB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgaWYgKHRoaXMubW92ZURpcmVjdGlvbiA9PT0gTW92ZURpcmVjdGlvbnMuTGVmdCkgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJlY3Rpb24gPT09IE1vdmVEaXJlY3Rpb25zLlJpZ2h0KSB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vdmUoKTtcbiAgICB9ICBcbn0iLCJpbXBvcnQgeyBHYW1lT2JqZWN0VHlwZXMgfSBmcm9tIFwiLi4vLi4vbWlzYy9nYW1lLW9iamVjdC10eXBlc1wiO1xuaW1wb3J0IHsgTWFwSXRlbSB9IGZyb20gXCIuLi8uLi92aWV3cy9lbGVtZW50cy9tYXAvbWFwLWl0ZW1cIjtcblxuZXhwb3J0IGNsYXNzIE1hcEZhY3Rvcnkge1xuICAgIFxuICAgIHB1YmxpYyBvbk1hcEl0ZW1DcmVhdGU6IEZ1bmN0aW9uO1xuICAgIHB1YmxpYyBvbk1hcEl0ZW1EZXN0cm95OiBGdW5jdGlvbjtcblxuICAgIHByb3RlY3RlZCBtYXBXaWR0aDogbnVtYmVyID0gMjQ7XG4gICAgcHJvdGVjdGVkIG1hcEhlaWdodDogbnVtYmVyID0gMjI7XG5cbiAgICBwcm90ZWN0ZWQgbGV2ZWw6IG51bWJlcltdID0gW1xuICAgICAgICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuICAgICAgICAxLCA5LCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCA5LCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCA5LCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAyLCAyLCAxLCAxLCAxLCA0LCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAyLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAyLCAyLCAxLCAxLCAxLCAyLCAxLCAxLCAxLCAyLCAyLCAyLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAyLCAyLCAyLCAgLCAgLCAgLCAgLCAgLCAgLCAxLCAxLFxuICAgICAgICAxLCAyLCAyLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLCAxLFxuICAgICAgICAxLCAgLCAgLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLCAxLFxuICAgICAgICAxLCAgLCAgLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAzLCAzLCAzLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAzLCAzLCAzLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAyLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAxLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAyLCAgLCAgLCAgLCAgLCAgLCAgLCAyLCAyLCAyLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAgLCAgLCAyLCAgLCAgLCAgLCAgLCAgLCA4LCAyLCA3LCAyLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAgLCAxLFxuICAgICAgICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuICAgIF07XG5cbiAgICBwdWJsaWMgY3JlYXRlTWFwSXRlbXMoKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXBXaWR0aCAqIHRoaXMubWFwSGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsW2ldID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCBibG9ja1kgPSBNYXRoLmZsb29yKGkgLyB0aGlzLm1hcFdpZHRoKTsgXG4gICAgICAgICAgICBjb25zdCBibG9ja1ggPSBpIC0gdGhpcy5tYXBXaWR0aCAqIGJsb2NrWTtcblxuICAgICAgICAgICAgbGV0IHR5cGU6IEdhbWVPYmplY3RUeXBlcztcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsW2ldID09PSAxKSB0eXBlID0gR2FtZU9iamVjdFR5cGVzLlN0b25lV2FsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsW2ldID09PSAyKSB0eXBlID0gR2FtZU9iamVjdFR5cGVzLkJyaWNrV2FsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsW2ldID09PSAzKSB0eXBlID0gR2FtZU9iamVjdFR5cGVzLlRyZWU7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbFtpXSA9PT0gNCkgdHlwZSA9IEdhbWVPYmplY3RUeXBlcy5XYXRlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsW2ldID09PSA3KSB0eXBlID0gR2FtZU9iamVjdFR5cGVzLkVhZ2xlO1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxbaV0gPT09IDgpIHR5cGUgPSBHYW1lT2JqZWN0VHlwZXMuUGxheWVyU3Bhd25Qb2ludDtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsW2ldID09PSA5KSB0eXBlID0gR2FtZU9iamVjdFR5cGVzLkVuZW15U3Bhd25Qb2ludDtcblxuICAgICAgICAgICAgY29uc3QgaXRlbTogTWFwSXRlbSA9IG5ldyBNYXBJdGVtKHR5cGUsIGJsb2NrWCwgYmxvY2tZKTtcbiAgICAgICAgICAgIGl0ZW0ub25EZXN0cm95ID0gKCkgPT4gdGhpcy5vbk1hcEl0ZW1EZXN0cm95KGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5vbk1hcEl0ZW1DcmVhdGUoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9ICBcbn0iLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL212Yy9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBJTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL25vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBHYW1lTW9kZWxzLCBHYW1lTm90aWZpY2F0aW9ucyB9IGZyb20gXCIuLi9taXNjL2dhbWUtbmFtZXNcIjtcbmltcG9ydCB7IEdhbWVNYWluVmlldyB9IGZyb20gXCIuLi92aWV3cy9nYW1lLW1haW4tdmlld1wiO1xuaW1wb3J0IHsgQXBwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9hcHAtbWFuYWdlclwiO1xuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gXCIuLi9taXNjL2dhbWUtb2JqZWN0XCI7XG5pbXBvcnQgeyBHYW1lT2JqZWN0VHlwZXMgfSBmcm9tIFwiLi4vbWlzYy9nYW1lLW9iamVjdC10eXBlc1wiO1xuaW1wb3J0IHsgVW5pdHNGYWN0b3J5IH0gZnJvbSAnLi9mYWN0b3JpZXMvdW5pdHMtZmFjdG9yeSc7XG5pbXBvcnQgeyBVbml0IH0gZnJvbSBcIi4uL3ZpZXdzL2VsZW1lbnRzL3VuaXQvdW5pdFwiO1xuaW1wb3J0IHsgQnVsbGV0LCBJQnVsbGV0UGFyYW1zIH0gZnJvbSBcIi4uL3ZpZXdzL2VsZW1lbnRzL2J1bGxldC9idWxsZXRcIjtcbmltcG9ydCB7IEdhbWVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvZ2FtZS1tb2RlbFwiO1xuaW1wb3J0IHsgTWFwRmFjdG9yeSB9IGZyb20gXCIuL2ZhY3Rvcmllcy9tYXAtZmFjdG9yeVwiO1xuaW1wb3J0IHsgTWFwSXRlbSB9IGZyb20gXCIuLi92aWV3cy9lbGVtZW50cy9tYXAvbWFwLWl0ZW1cIjtcbmltcG9ydCB7IEJ1bGxldHNGYWN0b3J5IH0gZnJvbSBcIi4vZmFjdG9yaWVzL2J1bGxldHMtZmFjdG9yeVwiO1xuXG5leHBvcnQgY2xhc3MgR2FtZU1haW5Db250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG5cbiAgICBwcm90ZWN0ZWQgZ2FtZU1vZGVsOiBHYW1lTW9kZWw7XG5cbiAgICBwcm90ZWN0ZWQgYnVsbGV0c0ZhY3Rvcnk6IEJ1bGxldHNGYWN0b3J5O1xuICAgIHByb3RlY3RlZCB1bml0c0ZhY3Rvcnk6IFVuaXRzRmFjdG9yeTtcblxuICAgIHB1YmxpYyBwb3N0UmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGVsID0gdGhpcy5yZXRyaWV2ZU1vZGVsKEdhbWVNb2RlbHMuR0FNRSkgYXMgR2FtZU1vZGVsO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGROb3RpZmljYXRpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZE5vdGlmaWNhdGlvbihHYW1lTm90aWZpY2F0aW9ucy5DUkVBVEVfQlVMTEVULCB0aGlzLmNyZWF0ZUJ1bGxldC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZShub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pOiB2b2lkIHtcbiAgICAgICAgXG4gICAgICAgICh0aGlzLnZpZXcgYXMgR2FtZU1haW5WaWV3KS5pbml0U2NlbmUoKTtcblxuICAgICAgICB0aGlzLmluaXRNYXAoKTtcbiAgICAgICAgdGhpcy5pbml0VW5pdHMoKTtcbiAgICAgICAgdGhpcy5pbml0QnVsbGV0cygpO1xuXG4gICAgICAgIEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hcHAudGlja2VyLmFkZCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9KTsgXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRVbml0cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bml0c0ZhY3RvcnkgPSBuZXcgVW5pdHNGYWN0b3J5KCk7XG5cbiAgICAgICAgdGhpcy51bml0c0ZhY3Rvcnkub25DcmVhdGVCdWxsZXQgPSAocGFyYW1zOiBJQnVsbGV0UGFyYW1zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oR2FtZU5vdGlmaWNhdGlvbnMuQ1JFQVRFX0JVTExFVCwgcGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVuaXRzRmFjdG9yeS5vblVuaXRDcmVhdGUgPSAodW5pdDogVW5pdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRUb1ZpZXcodW5pdCk7XG4gICAgICAgICAgICB0aGlzLmdhbWVNb2RlbC5hZGRVbml0KHVuaXQpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVuaXRzRmFjdG9yeS5vblVuaXREZXN0cm95ID0gKHVuaXQ6IFVuaXQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1vZGVsLnJlbW92ZVVuaXQodW5pdCk7XG4gICAgICAgICAgICBpZiAodW5pdC50eXBlID09PSBHYW1lT2JqZWN0VHlwZXMuUGxheWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblBsYXllckRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51bml0c0ZhY3RvcnkuZ2V0U3Bhd25Qb2ludCA9ICh0eXBlOiBHYW1lT2JqZWN0VHlwZXMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVNb2RlbC5nZXRTcGF3blBvaW50KHR5cGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudW5pdHNGYWN0b3J5LmNyZWF0ZVBsYXllcigpO1xuXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVNb2RlbC5lbmVtaWVzTGVmdCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy51bml0c0ZhY3RvcnkuY3JlYXRlRW5lbXkoKTtcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihHYW1lTm90aWZpY2F0aW9ucy5VSV9VUERBVEUpO1xuICAgICAgICB9LCAyMDAwKTsgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblBsYXllckRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihHYW1lTm90aWZpY2F0aW9ucy5VSV9VUERBVEUpO1xuXG4gICAgICAgIGlmICh0aGlzLmdhbWVNb2RlbC5wbGF5ZXJMaXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51bml0c0ZhY3RvcnkuY3JlYXRlUGxheWVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdhbWVPdmVyKCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2FtZSBvdmVyJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRNYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1hcEZhY3Rvcnk6IE1hcEZhY3RvcnkgPSBuZXcgTWFwRmFjdG9yeSgpO1xuICAgICAgICBcbiAgICAgICAgbWFwRmFjdG9yeS5vbk1hcEl0ZW1DcmVhdGUgPSAobWFwSXRlbTogTWFwSXRlbSkgPT4ge1xuICAgICAgICAgICAgLy8gVHJlZXMgc2hvdWxkIGJlIGFib3ZlXG4gICAgICAgICAgICBpZiAobWFwSXRlbS50eXBlID09PSBHYW1lT2JqZWN0VHlwZXMuVHJlZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9WaWV3KG1hcEl0ZW0sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb1ZpZXcobWFwSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdhbWVNb2RlbC5hZGRNYXBJdGVtKG1hcEl0ZW0pO1xuICAgICAgICB9O1xuICAgICAgICBtYXBGYWN0b3J5Lm9uTWFwSXRlbURlc3Ryb3kgPSAobWFwSXRlbTogTWFwSXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKG1hcEl0ZW0udHlwZSA9PT0gR2FtZU9iamVjdFR5cGVzLkVhZ2xlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nYW1lTW9kZWwucmVtb3ZlTWFwSXRlbShtYXBJdGVtKTtcbiAgICAgICAgfTtcblxuICAgICAgICBtYXBGYWN0b3J5LmNyZWF0ZU1hcEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRCdWxsZXRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1bGxldHNGYWN0b3J5ID0gbmV3IEJ1bGxldHNGYWN0b3J5KCk7XG5cbiAgICAgICAgdGhpcy5idWxsZXRzRmFjdG9yeS5vbkJ1bGxldENyZWF0ZSA9IChidWxsZXQ6IEJ1bGxldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRUb1ZpZXcoYnVsbGV0KTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1vZGVsLmFkZEJ1bGxldChidWxsZXQpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmJ1bGxldHNGYWN0b3J5Lm9uQnVsbGV0RGVzdHJveSA9IChidWxsZXQ6IEJ1bGxldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nYW1lTW9kZWwucmVtb3ZlQnVsbGV0KGJ1bGxldCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUJ1bGxldChub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idWxsZXRzRmFjdG9yeS5jcmVhdGVCdWxsZXQobm90aWZpY2F0aW9uLmJvZHkpO1xuICAgIH1cbiAgICBcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IG9iamVjdHM6IEdhbWVPYmplY3RbXSA9IFtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2FtZU1vZGVsLm1hcEl0ZW1zLFxuICAgICAgICAgICAgLi4udGhpcy5nYW1lTW9kZWwudW5pdHMsXG4gICAgICAgICAgICAuLi50aGlzLmdhbWVNb2RlbC5idWxsZXRzXG4gICAgICAgIF07XG5cbiAgICAgICAgb2JqZWN0cy5mb3JFYWNoKChvYmplY3Q6IEdhbWVPYmplY3QpID0+IHtcbiAgICAgICAgICAgIG9iamVjdC51cGRhdGUoKTtcbiAgICAgICAgICAgIG9iamVjdHMuZm9yRWFjaCgob3RoZXJPYmplY3Q6IEdhbWVPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBvYmplY3QuY2hlY2tDb2xsaXNpb25XaXRoKG90aGVyT2JqZWN0KTtcbiAgICAgICAgICAgIH0pICAgIFxuICAgICAgICB9KTtcbiAgICB9IFxuXG4gICAgcHVibGljIGFkZFRvVmlldyhnYW1lT2JqZWN0OiBHYW1lT2JqZWN0LCBwbGFjZUluRnJvbnQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBnYW1lT2JqZWN0LmFkZFRvU3RhZ2UoKHRoaXMudmlldyBhcyBHYW1lTWFpblZpZXcpLmdldERpc3BsYXkocGxhY2VJbkZyb250KSk7XG4gICAgfSAgICBcbn0iLCJpbXBvcnQgeyBCdWxsZXQsIElCdWxsZXRQYXJhbXMgfSBmcm9tIFwiLi4vLi4vdmlld3MvZWxlbWVudHMvYnVsbGV0L2J1bGxldFwiO1xuXG5leHBvcnQgY2xhc3MgQnVsbGV0c0ZhY3Rvcnkge1xuICAgIHB1YmxpYyBvbkJ1bGxldENyZWF0ZTogRnVuY3Rpb247XG4gICAgcHVibGljIG9uQnVsbGV0RGVzdHJveTogRnVuY3Rpb247XG5cbiAgICBwdWJsaWMgY3JlYXRlQnVsbGV0KHBhcmFtczogSUJ1bGxldFBhcmFtcyk6IHZvaWQge1xuICAgICAgICBjb25zdCBidWxsZXQ6IEJ1bGxldCA9IG5ldyBCdWxsZXQoKTtcbiAgICAgICAgYnVsbGV0LmluaXQocGFyYW1zKTtcbiAgICAgICAgXG4gICAgICAgIGJ1bGxldC5vbkRlc3Ryb3kgPSAoKSA9PiB0aGlzLm9uQnVsbGV0RGVzdHJveShidWxsZXQpOyBcblxuICAgICAgICB0aGlzLm9uQnVsbGV0Q3JlYXRlKGJ1bGxldCk7XG4gICAgfVxuICAgICBcbn0iLCJpbXBvcnQgeyBVbml0SWRsZVN0YXRlIH0gZnJvbSBcIi4vdW5pdC1pZGxlLXN0YXRlXCI7XG5pbXBvcnQgeyBVbml0RGllU3RhdGUgfSBmcm9tIFwiLi91bml0LWRpZS1zdGF0ZVwiO1xuaW1wb3J0IHsgVW5pdE1vdmVTdGF0ZSB9IGZyb20gXCIuL3VuaXQtbW92ZS1zdGF0ZVwiO1xuaW1wb3J0IHsgVW5pdFNwYXduU3RhdGUgfSBmcm9tIFwiLi91bml0LXNwYXduLXN0YXRlXCI7XG5pbXBvcnQgeyBVbml0VmlldyB9IGZyb20gXCIuL3VuaXQtdmlld1wiO1xuaW1wb3J0IHsgR2FtZU9iamVjdFR5cGVzIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvZ2FtZS1vYmplY3QtdHlwZXNcIjtcbmltcG9ydCB7IFVuaXQsIFVuaXRTdGF0ZXMgfSBmcm9tIFwiLi91bml0XCI7XG5pbXBvcnQgeyBNb3ZlRGlyZWN0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9taXNjL2dhbWUtb2JqZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBVbml0IHtcblxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5pbml0KCk7XG5cbiAgICAgICAgdGhpcy50eXBlID0gR2FtZU9iamVjdFR5cGVzLlBsYXllcjtcbiAgICAgICAgdGhpcy5zaG9vdGluZ0RlbGF5ID0gMC41O1xuICAgICAgICB0aGlzLnNwZWVkID0gMjtcblxuICAgICAgICB0aGlzLmluaXRWaWV3KFVuaXRWaWV3LCB0aGlzKTtcblxuICAgICAgICB0aGlzLmZzbS5yZWdpc3RlclN0YXRlcyh7XG4gICAgICAgICAgICBbVW5pdFN0YXRlcy5TcGF3bl06IG5ldyBVbml0U3Bhd25TdGF0ZSh0aGlzKSxcbiAgICAgICAgICAgIFtVbml0U3RhdGVzLklkbGVdOiBuZXcgVW5pdElkbGVTdGF0ZSh0aGlzKSxcbiAgICAgICAgICAgIFtVbml0U3RhdGVzLk1vdmVdOiBuZXcgVW5pdE1vdmVTdGF0ZSh0aGlzKSxcbiAgICAgICAgICAgIFtVbml0U3RhdGVzLkRpZV06IG5ldyBVbml0RGllU3RhdGUodGhpcylcbiAgICAgICAgfSk7ICAgIFxuICAgIH1cblxuICAgIHByb3RlY3RlZCBoYW5kbGVJbnB1dCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IHRoaXMuZ2V0SW5wdXQoKTtcblxuICAgICAgICBpZiAoa2V5c1snU3BhY2UnXSkge1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW5TaG9vdCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShrZXlzWydBcnJvd1VwJ10gfHwga2V5c1snQXJyb3dEb3duJ10gfHwga2V5c1snQXJyb3dMZWZ0J10gfHwga2V5c1snQXJyb3dSaWdodCddKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5c1snQXJyb3dVcCddKSB7IFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5tb3ZlKE1vdmVEaXJlY3Rpb25zLlVwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlzWydBcnJvd0Rvd24nXSkgeyBcbiAgICAgICAgICAgIHRoaXMuc3RhdGUubW92ZShNb3ZlRGlyZWN0aW9ucy5Eb3duKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlzWydBcnJvd0xlZnQnXSkgeyBcbiAgICAgICAgICAgIHRoaXMuc3RhdGUubW92ZShNb3ZlRGlyZWN0aW9ucy5MZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlzWydBcnJvd1JpZ2h0J10pIHsgXG4gICAgICAgICAgICB0aGlzLnN0YXRlLm1vdmUoTW92ZURpcmVjdGlvbnMuUmlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXQoKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFN0YXRlIHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUoKTogdm9pZCB7XG4gICAgfVxufSIsImltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4vc3RhdGVcIjtcblxuZXhwb3J0IGNsYXNzIEZTTSB7XG4gICAgcHJvdGVjdGVkIHN0YXRlczogSVN0YXRlcztcbiAgICBwcm90ZWN0ZWQgY3VycmVudFN0YXRlSWQ6IG51bWJlciA9IG51bGw7XG4gICAgXG4gICAgcHVibGljIHJlZ2lzdGVyU3RhdGVzKHN0YXRlczogSVN0YXRlcykge1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHN0YXRlcztcblxuICAgICAgICAvLyBUcmFuc2l0aW9uIGludG8gdGhlIGZpcnN0IHN0YXRlXG4gICAgICAgIGNvbnN0IHN0YXRlSWQ6IG51bWJlciA9IE51bWJlcihPYmplY3Qua2V5cyh0aGlzLnN0YXRlcylbMF0pOyAvLyBUYWtlIHRoZSBmaXJzdCBzdGF0ZSBhcyBpbml0aWFsIFxuICAgICAgICB0aGlzLnRyYW5zaXRpb24oc3RhdGVJZCk7XG4gICAgfVxuXG4gICAgLy8gQ2FsbGVkIGluIG1haW4gdXBkYXRlIGxvb3BcbiAgICBwdWJsaWMgc3RlcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZXNbdGhpcy5jdXJyZW50U3RhdGVJZF0uZXhlY3V0ZSgpO1xuICAgIH1cblxuICAgIC8vIENoYW5nZXMgdGhlIHN0YXRlXG4gICAgcHVibGljIHRyYW5zaXRpb24obmV4dFN0YXRlSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUlkID0gbmV4dFN0YXRlSWQ7XG4gICAgICAgIHRoaXMuc3RhdGVzW3RoaXMuY3VycmVudFN0YXRlSWRdLmVudGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdGF0ZSgpOiBTdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlc1t0aGlzLmN1cnJlbnRTdGF0ZUlkXTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlcyB7XG4gICAgW3N0YXRlTmFtZTogbnVtYmVyXTogU3RhdGVcbn0iLCJpbXBvcnQgeyBVbml0LCBVbml0U3RhdGVzIH0gZnJvbSBcIi4vdW5pdFwiO1xuaW1wb3J0IHsgRW5lbXlNb3ZlU3RhdGUgfSBmcm9tIFwiLi9lbmVteS1tb3ZlLXN0YXRlXCI7XG5pbXBvcnQgeyBVbml0RGllU3RhdGUgfSBmcm9tIFwiLi91bml0LWRpZS1zdGF0ZVwiO1xuaW1wb3J0IHsgVW5pdElkbGVTdGF0ZSB9IGZyb20gXCIuL3VuaXQtaWRsZS1zdGF0ZVwiO1xuaW1wb3J0IHsgVW5pdFNwYXduU3RhdGUgfSBmcm9tIFwiLi91bml0LXNwYXduLXN0YXRlXCI7XG5pbXBvcnQgeyBVbml0VmlldyB9IGZyb20gXCIuL3VuaXQtdmlld1wiO1xuaW1wb3J0IHsgR2FtZU9iamVjdFR5cGVzIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvZ2FtZS1vYmplY3QtdHlwZXNcIjtcbmltcG9ydCB7IE1vdmVEaXJlY3Rpb25zIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvZ2FtZS1vYmplY3RcIjtcblxuZXhwb3J0IGNsYXNzIEVuZW15IGV4dGVuZHMgVW5pdCB7XG5cbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuXG4gICAgICAgIHRoaXMudHlwZSA9IEdhbWVPYmplY3RUeXBlcy5FbmVteTtcbiAgICAgICAgdGhpcy5zaG9vdGluZ0RlbGF5ID0gMjtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG5cbiAgICAgICAgdGhpcy5pbml0VmlldyhVbml0VmlldywgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5mc20ucmVnaXN0ZXJTdGF0ZXMoe1xuICAgICAgICAgICAgW1VuaXRTdGF0ZXMuU3Bhd25dOiBuZXcgVW5pdFNwYXduU3RhdGUodGhpcyksXG4gICAgICAgICAgICBbVW5pdFN0YXRlcy5JZGxlXTogbmV3IFVuaXRJZGxlU3RhdGUodGhpcyksXG4gICAgICAgICAgICBbVW5pdFN0YXRlcy5Nb3ZlXTogbmV3IEVuZW15TW92ZVN0YXRlKHRoaXMpLFxuICAgICAgICAgICAgW1VuaXRTdGF0ZXMuRGllXTogbmV3IFVuaXREaWVTdGF0ZSh0aGlzKVxuICAgICAgICB9KTsgICAgXG4gICAgfSAgICBcblxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLnNob290KCk7XG4gICAgICAgIHRoaXMubW92ZSgpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNb3ZlRGlyZWN0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9taXNjL2dhbWUtb2JqZWN0XCI7XG5pbXBvcnQgeyBVbml0TW92ZVN0YXRlIH0gZnJvbSBcIi4vdW5pdC1tb3ZlLXN0YXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBFbmVteU1vdmVTdGF0ZSBleHRlbmRzIFVuaXRNb3ZlU3RhdGUge1xuICAgIFxuICAgIC8vIENvbGxlY3RzIHRoZSBudW1iZXIgb2YgY29sbGlzaW9ucyB3aXRoIG90aGVyIG9iamVjdHMgZm9yIGVhY2ggZGlyZWN0aW9uXG4gICAgcHJvdGVjdGVkIGhpdHNCeURpcmVjdGlvbjogYW55W10gPSBbXG4gICAgICAgIHsgZGlyZWN0aW9uOiBNb3ZlRGlyZWN0aW9ucy5VcCwgaGl0czogMCB9LFxuICAgICAgICB7IGRpcmVjdGlvbjogTW92ZURpcmVjdGlvbnMuRG93biwgaGl0czogMCB9LFxuICAgICAgICB7IGRpcmVjdGlvbjogTW92ZURpcmVjdGlvbnMuTGVmdCwgaGl0czogMCB9LFxuICAgICAgICB7IGRpcmVjdGlvbjogTW92ZURpcmVjdGlvbnMuUmlnaHQsIGhpdHM6IDAgfSxcbiAgICBdO1xuXG4gICAgcHJvdGVjdGVkIGhhbmRsZUNvbGxpc2lvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVIaXRzQnlEaXJlY3Rpb24oKTtcbiAgICAgICAgc3VwZXIuaGFuZGxlQ29sbGlzaW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uVG9PcHBvc2l0ZSgpO1xuICAgIH1cbiAgICBcbiAgICBwcm90ZWN0ZWQgdXBkYXRlSGl0c0J5RGlyZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhpdHNCeURpcmVjdGlvbi5tYXAoaXRlbSA9PiB7IFxuICAgICAgICAgICAgaWYgKGl0ZW0uZGlyZWN0aW9uID09PSB0aGlzLnZpZXcubW92ZURpcmVjdGlvbikgaXRlbS5oaXRzKytcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2hhbmdlRGlyZWN0aW9uVG9PcHBvc2l0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oaXRzQnlEaXJlY3Rpb24uc29ydCgoYSwgYikgPT4gYS5oaXRzIC0gYi5oaXRzKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmhpdHNCeURpcmVjdGlvblt0aGlzLmhpdHNCeURpcmVjdGlvbi5sZW5ndGggLSAxXS5oaXRzID4gMikge1xuICAgICAgICAgICAgdGhpcy52aWV3Lm1vdmVEaXJlY3Rpb24gPSB0aGlzLmhpdHNCeURpcmVjdGlvblswXS5kaXJlY3Rpb247XG4gICAgICAgICAgICB0aGlzLmhpdHNCeURpcmVjdGlvbiA9IHRoaXMuaGl0c0J5RGlyZWN0aW9uLm1hcChpdGVtID0+ICh7IC4uLml0ZW0sIGhpdHM6IDAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52aWV3LmNoYW5nZU1vdmVEaXJlY3Rpb25Ub09wcG9zaXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXcucGxheVR1cm5BbmltYXRpb24oKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL21vZGVsXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlsc1wiO1xuaW1wb3J0IHsgR2FtZU9iamVjdFR5cGVzIH0gZnJvbSBcIi4uL21pc2MvZ2FtZS1vYmplY3QtdHlwZXNcIjtcbmltcG9ydCB7IEJ1bGxldCB9IGZyb20gXCIuLi92aWV3cy9lbGVtZW50cy9idWxsZXQvYnVsbGV0XCI7XG5pbXBvcnQgeyBNYXBJdGVtIH0gZnJvbSBcIi4uL3ZpZXdzL2VsZW1lbnRzL21hcC9tYXAtaXRlbVwiO1xuaW1wb3J0IHsgVW5pdCB9IGZyb20gXCIuLi92aWV3cy9lbGVtZW50cy91bml0L3VuaXRcIjtcblxuZXhwb3J0IGNsYXNzIEdhbWVNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBwdWJsaWMgdW5pdHM6IFVuaXRbXSA9IFtdO1xuICAgIHB1YmxpYyBtYXBJdGVtczogTWFwSXRlbVtdID0gW107XG4gICAgcHVibGljIGJ1bGxldHM6IEJ1bGxldFtdID0gW107XG5cbiAgICBwdWJsaWMgcGxheWVyTGl2ZXM6IG51bWJlciA9IDM7XG4gICAgcHVibGljIGVuZW1pZXNMZWZ0OiBudW1iZXIgPSAyMDtcblxuICAgIHB1YmxpYyBhZGRVbml0KHVuaXQ6IFVuaXQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHVuaXQudHlwZSA9PT0gR2FtZU9iamVjdFR5cGVzLkVuZW15KSB7XG4gICAgICAgICAgICB0aGlzLmVuZW1pZXNMZWZ0LS07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51bml0cy5wdXNoKHVuaXQpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVVbml0KHVuaXQ6IFVuaXQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHVuaXQudHlwZSA9PT0gR2FtZU9iamVjdFR5cGVzLlBsYXllcikge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJMaXZlcy0tO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudW5pdHMgPSB0aGlzLnVuaXRzLmZpbHRlcihiID0+IGIgIT09IHVuaXQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTcGF3blBvaW50KHR5cGU6IEdhbWVPYmplY3RUeXBlcyk6IFBvaW50IHtcbiAgICAgICAgY29uc3QgcG9pbnRzOiBQb2ludFtdID0gW107XG4gICAgICAgIHRoaXMubWFwSXRlbXMuZm9yRWFjaCgoaXRlbTogTWFwSXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludChpdGVtLngsIGl0ZW0ueSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBvaW50c1tVdGlscy5yYW5kb21JbnQoMCwgcG9pbnRzLmxlbmd0aCAtIDEpXTtcbiAgICB9IFxuICAgIFxuICAgIHB1YmxpYyBhZGRNYXBJdGVtKGl0ZW06IE1hcEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBJdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVNYXBJdGVtKGl0ZW06IE1hcEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBJdGVtcyA9IHRoaXMubWFwSXRlbXMuZmlsdGVyKChpOiBNYXBJdGVtKSA9PiBpICE9PSBpdGVtKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQnVsbGV0KGJ1bGxldDogQnVsbGV0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnVsbGV0cy5wdXNoKGJ1bGxldCk7IFxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVCdWxsZXQoYnVsbGV0OiBCdWxsZXQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idWxsZXRzID0gdGhpcy5idWxsZXRzLmZpbHRlcihiID0+IGIgIT09IGJ1bGxldCk7XG4gICAgfSAgXG59IiwiaW1wb3J0IHsgQ29udGFpbmVyLCBHcmFwaGljcywgSVBvaW50LCBJU2l6ZSwgUG9pbnQsIFNwcml0ZSwgVGV4dHVyZSB9IGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBBcHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL2FwcC1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vbWlzYy9jb25maWdcIjtcbmltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy9nYW1lLW9iamVjdFwiO1xuaW1wb3J0IHsgR2FtZU9iamVjdFR5cGVzIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvZ2FtZS1vYmplY3QtdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIE1hcEl0ZW0gZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgICBwdWJsaWMgZGlzcGxheTogQ29udGFpbmVyID0gbmV3IENvbnRhaW5lcigpO1xuICAgIHByb3RlY3RlZCBza2luOiBTcHJpdGU7XG4gICAgcHVibGljIGVhZ2xlRXhwbG9zaW9uOiBQSVhJLkFuaW1hdGVkU3ByaXRlO1xuICAgIHByb3RlY3RlZCBfc2l6ZTogSVNpemUgPSB7XG4gICAgICAgIHdpZHRoOiAzMixcbiAgICAgICAgaGVpZ2h0OiAzMlxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IEdhbWVPYmplY3RUeXBlcywgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgICBcblxuICAgICAgICB0aGlzLmRpc3BsYXkueCA9IHggKiB0aGlzLnNpemUud2lkdGg7XG4gICAgICAgIHRoaXMuZGlzcGxheS55ID0geSAqIHRoaXMuc2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5FbmVteVNwYXduUG9pbnQgfHwgdHlwZSA9PT0gR2FtZU9iamVjdFR5cGVzLlBsYXllclNwYXduUG9pbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgdGV4dHVyZTogc3RyaW5nO1xuICAgICAgICBpZiAodHlwZSA9PT0gR2FtZU9iamVjdFR5cGVzLkJyaWNrV2FsbCkge1xuICAgICAgICAgICAgdGV4dHVyZSA9ICdicmlja1dhbGwnO1xuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgaWYgKHR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5TdG9uZVdhbGwpIHtcbiAgICAgICAgICAgIHRleHR1cmUgPSAnc3RvbmVXYWxsJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gR2FtZU9iamVjdFR5cGVzLlRyZWUpIHtcbiAgICAgICAgICAgIHRleHR1cmUgPSAndHJlZSc7XG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICBpZiAodHlwZSA9PT0gR2FtZU9iamVjdFR5cGVzLldhdGVyKSB7XG4gICAgICAgICAgICB0ZXh0dXJlID0gJ3dhdGVyJztcbiAgICAgICAgfSAgXG4gICAgICAgIGlmICh0eXBlID09PSBHYW1lT2JqZWN0VHlwZXMuRWFnbGUpIHtcbiAgICAgICAgICAgIHRleHR1cmUgPSAnZWFnbGUnO1xuICAgICAgICAgICAgdGhpcy5pbml0RWFnbGVFeHBsb3Npb25BbmltYXRpb24oKTtcbiAgICAgICAgfSAgXG5cbiAgICAgICAgdGhpcy5za2luID0gbmV3IFNwcml0ZShBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGV4dHVyZShDb25maWcuYXNzZXRzW3RleHR1cmVdKSk7ICAgXG4gICAgICAgIHRoaXMuc2tpbi53aWR0aCA9IHRoaXMuc2l6ZS53aWR0aDsgICAgIFxuICAgICAgICB0aGlzLnNraW4uaGVpZ2h0ID0gdGhpcy5zaXplLmhlaWdodDsgICAgIFxuICAgICAgICB0aGlzLmRpc3BsYXkuYWRkQ2hpbGRBdCh0aGlzLnNraW4sIDApOyAgICAgICAgICAgIFxuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0RWFnbGVFeHBsb3Npb25BbmltYXRpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWFnbGVFeHBsb3Npb24gPSBuZXcgUElYSS5BbmltYXRlZFNwcml0ZShBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlVGV4dHVyZXMoQ29uZmlnLmFzc2V0c1snZXhwbG9kZSddLCAxNiwgNjgsIDY4KSk7XG4gICAgICAgIHRoaXMuZWFnbGVFeHBsb3Npb24uYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICB0aGlzLmVhZ2xlRXhwbG9zaW9uLnggPSB0aGlzLnNpemUud2lkdGggLyAyO1xuICAgICAgICB0aGlzLmVhZ2xlRXhwbG9zaW9uLnkgPSB0aGlzLnNpemUuaGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy5lYWdsZUV4cGxvc2lvbi5sb29wID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZWFnbGVFeHBsb3Npb24udmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc3BsYXkuYWRkQ2hpbGQodGhpcy5lYWdsZUV4cGxvc2lvbik7XG4gICAgfSAgICBcblxuICAgIHB1YmxpYyBwbGF5RWFnbGVFeHBvc2lvQW5pbWF0aW9uKG9uQ29tcGxldGU6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWFnbGVFeHBsb3Npb24udmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZWFnbGVFeHBsb3Npb24ucGxheSgpO1xuICAgICAgICB0aGlzLmVhZ2xlRXhwbG9zaW9uLm9uQ29tcGxldGUgPSAoKSA9PiBvbkNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgY29sbGlzaW9ucyBvbmx5IHdpdGggdGhlc2UgdHlwZXNcbiAgICBwdWJsaWMgY2hlY2tDb2xsaXNpb25XaXRoKG9iamVjdDogR2FtZU9iamVjdCk6IHZvaWQge1xuICAgICAgICBpZiAob2JqZWN0LnR5cGUgIT09IEdhbWVPYmplY3RUeXBlcy5CdWxsZXQgJiYgb2JqZWN0LnR5cGUgIT09IEdhbWVPYmplY3RUeXBlcy5QbGF5ZXIgJiYgb2JqZWN0LnR5cGUgIT09IEdhbWVPYmplY3RUeXBlcy5FbmVteSkgcmV0dXJuO1xuICAgICAgICBzdXBlci5jaGVja0NvbGxpc2lvbldpdGgob2JqZWN0KTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIGhhbmRsZUNvbGxpc2lvbldpdGgob2JqZWN0OiBHYW1lT2JqZWN0KTogdm9pZCB7XG4gICAgICAgIGlmIChvYmplY3QudHlwZSA9PT0gR2FtZU9iamVjdFR5cGVzLkJ1bGxldCAmJiAodGhpcy50eXBlID09PSBHYW1lT2JqZWN0VHlwZXMuQnJpY2tXYWxsIHx8IHRoaXMudHlwZSA9PT0gR2FtZU9iamVjdFR5cGVzLkVhZ2xlKSApIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEdhbWVPYmplY3RUeXBlcy5FYWdsZSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5RWFnbGVFeHBvc2lvQW5pbWF0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5LmRlc3Ryb3koeyBjaGlsZHJlbjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuZGVzdHJveSh7IGNoaWxkcmVuOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRUb1N0YWdlKGhvbGRlcjogQ29udGFpbmVyKTogdm9pZCB7XG4gICAgICAgIGhvbGRlci5hZGRDaGlsZCh0aGlzLmRpc3BsYXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2l6ZSgpOiBJU2l6ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5Lng7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkueTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFV0aWxzIHtcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbUludCAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gICAgfTtcblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tGb3JDb2xsaXNpb24oYTogYW55LCBiOiBhbnksIHNpemU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKE1hdGguYWJzKGEueCAtIGIueCkgPD0gc2l6ZSAmJiBNYXRoLmFicyhhLnkgLSBiLnkpIDw9IHNpemUpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL212Yy92aWV3XCI7XG5pbXBvcnQgeyBBcHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL2FwcC1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb250YWluZXIsIEdyYXBoaWNzLCBTcHJpdGUsIFRleHQgfSBmcm9tIFwicGl4aS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgR2FtZU1haW5WaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgXG4gICAgcHVibGljIGZyb250RGlzcGxheTogQ29udGFpbmVyID0gbmV3IENvbnRhaW5lcigpO1xuICAgIHB1YmxpYyBiYWNrRGlzcGxheTogQ29udGFpbmVyID0gbmV3IENvbnRhaW5lcigpO1xuICAgIFxuICAgIHB1YmxpYyBpbml0U2NlbmUoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5kcmF3QmcoKTtcbiAgICAgICAgdGhpcy5kcmF3VGl0bGUoKTtcblxuICAgICAgICB0aGlzLmRpc3BsYXkuYWRkQ2hpbGQodGhpcy5iYWNrRGlzcGxheSk7XG4gICAgICAgIHRoaXMuZGlzcGxheS5hZGRDaGlsZCh0aGlzLmZyb250RGlzcGxheSk7XG4gICAgfVxuIFxuICAgIHByb3RlY3RlZCBkcmF3VGl0bGUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRleHQ6IFRleHQgPSBuZXcgVGV4dCgnR2FtZSBTY2VuZScpO1xuICAgICAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGV4dC54ID0gQXBwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjZW5lV2lkdGgoKSAvIDI7XG4gICAgICAgIHRleHQueSA9IEFwcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2VuZUhlaWdodCgpIC8gMjtcbiAgICAgICAgdGhpcy5iYWNrRGlzcGxheS5hZGRDaGlsZCh0ZXh0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJhd0JnKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBiZzogR3JhcGhpY3MgPSBuZXcgR3JhcGhpY3MoKTtcbiAgICAgICAgYmcubmFtZSA9IFwiYmFja2dyb3VuZFwiO1xuICAgICAgICBiZy5iZWdpbkZpbGwoMHhERTMyNDkpO1xuICAgICAgICBiZy5kcmF3UmVjdCgwLCAwLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVXaWR0aCgpLCBBcHBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NlbmVIZWlnaHQoKSk7XG4gICAgICAgIGJnLmVuZEZpbGwoKTtcbiAgICAgICAgdGhpcy5iYWNrRGlzcGxheS5hZGRDaGlsZChiZyk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGlzcGxheShmcm9udDogYm9vbGVhbiA9IGZhbHNlKTogQ29udGFpbmVyIHtcbiAgICAgICAgaWYgKGZyb250KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcm9udERpc3BsYXk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja0Rpc3BsYXk7XG4gICAgfVxufSIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbXZjL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IElOb3RpZmljYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9tdmMvbm90aWZpY2F0aW9uJztcbmltcG9ydCB7IEdhbWVNb2RlbHMsIEdhbWVOb3RpZmljYXRpb25zIH0gZnJvbSBcIi4uL21pc2MvZ2FtZS1uYW1lc1wiO1xuaW1wb3J0IHsgR2FtZU1vZGVsIH0gZnJvbSBcIi4uL21vZGVscy9nYW1lLW1vZGVsXCI7XG5pbXBvcnQgeyBHYW1lTWFpblZpZXcgfSBmcm9tIFwiLi4vdmlld3MvZ2FtZS1tYWluLXZpZXdcIjtcbmltcG9ydCB7IEdhbWVVaVZpZXcgfSBmcm9tIFwiLi4vdmlld3MvZ2FtZS11aS12aWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBHYW1lVWlDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgXG4gICAgcHJvdGVjdGVkIGdhbWVNb2RlbDogR2FtZU1vZGVsO1xuXG4gICAgcHVibGljIGFkZE5vdGlmaWNhdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRkTm90aWZpY2F0aW9uKEdhbWVOb3RpZmljYXRpb25zLlVJX1VQREFURSwgdGhpcy51cGRhdGVVaS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zdFJlZ2lzdGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWVNb2RlbCA9IHRoaXMucmV0cmlldmVNb2RlbChHYW1lTW9kZWxzLkdBTUUpIGFzIEdhbWVNb2RlbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZShub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pOiB2b2lkIHtcbiAgICAgICAgKHRoaXMudmlldyBhcyBHYW1lVWlWaWV3KS5pbml0VWkoKTtcbiAgICAgICAgdGhpcy51cGRhdGVVaSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVVaShub3RpZmljYXRpb24/OiBJTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgICh0aGlzLnZpZXcgYXMgR2FtZVVpVmlldykudXBkYXRlTGl2ZXModGhpcy5nYW1lTW9kZWwucGxheWVyTGl2ZXMpO1xuICAgICAgICAodGhpcy52aWV3IGFzIEdhbWVVaVZpZXcpLnVwZGF0ZUVuZW1pZXModGhpcy5nYW1lTW9kZWwuZW5lbWllc0xlZnQpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL212Yy92aWV3XCI7XG5pbXBvcnQgeyBBcHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL2FwcC1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb250YWluZXIsIEdyYXBoaWNzLCBTcHJpdGUsIFRleHQgfSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHsgSU5vdGlmaWNhdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL212Yy9ub3RpZmljYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgR2FtZVVpVmlldyBleHRlbmRzIFZpZXcge1xuICAgIFxuICAgIHByb3RlY3RlZCBsaXZlc1RleHQ6IFRleHQ7XG4gICAgcHJvdGVjdGVkIGVuZW1pZXNUZXh0OiBUZXh0O1xuXG4gICAgcHVibGljIGluaXRVaSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0TGl2ZXMoKTtcbiAgICAgICAgdGhpcy5pbml0RW5lbWllcygpO1xuICAgIH1cbiBcbiAgICBwcm90ZWN0ZWQgaW5pdExpdmVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxpdmVzVGV4dCA9IG5ldyBUZXh0KCdMaXZlczogMCcpO1xuICAgICAgICB0aGlzLmxpdmVzVGV4dC54ID0gNzUwO1xuICAgICAgICB0aGlzLmxpdmVzVGV4dC55ID0gMjA7XG4gICAgICAgIHRoaXMuZGlzcGxheS5hZGRDaGlsZCh0aGlzLmxpdmVzVGV4dCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUxpdmVzKGNvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saXZlc1RleHQudGV4dCA9IGBMaXZlczogJHtjb3VudH1gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0RW5lbWllcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmVtaWVzVGV4dCA9IG5ldyBUZXh0KCdFbmVtaWVzOiAwJyk7XG4gICAgICAgIHRoaXMuZW5lbWllc1RleHQueCA9IDc1MDtcbiAgICAgICAgdGhpcy5lbmVtaWVzVGV4dC55ID0gNTA7XG4gICAgICAgIHRoaXMuZGlzcGxheS5hZGRDaGlsZCh0aGlzLmVuZW1pZXNUZXh0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlRW5lbWllcyhjb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW5lbWllc1RleHQudGV4dCA9IGBFbmVtaWVzOiAke2NvdW50fWA7XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=