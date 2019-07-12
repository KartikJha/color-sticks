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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ColorStick.ts":
/*!***************************!*\
  !*** ./src/ColorStick.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = __webpack_require__(/*! ./constant */ "./src/constant.ts");
var ColorStick = /** @class */ (function () {
    function ColorStick(position, stickLength) {
        this.position = position;
        this.stickLength = stickLength;
    }
    ColorStick.prototype.draw = function (context) {
        context.strokeRect(this.position.x, this.position.y, this.stickLength, constant_1.COLOR_STICK_HEIGHT);
    };
    return ColorStick;
}());
exports.default = ColorStick;


/***/ }),

/***/ "./src/GameManager.ts":
/*!****************************!*\
  !*** ./src/GameManager.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = __webpack_require__(/*! ./Player */ "./src/Player.ts");
var GameManager = /** @class */ (function () {
    // ctx: CanvasRenderingContext2D;
    function GameManager(level, canvas) {
        if (!canvas.getContext) {
            console.warn("Canvas not supported");
            return;
        }
        if (!level.listOfColorStick.length) {
            console.error('Empty level');
            return;
        }
        var playerPosition = level.listOfColorStick[0].position;
        var player = new Player_1.default(playerPosition);
        this.draw(level, canvas.getContext("2D"), player);
    }
    GameManager.prototype.draw = function (level, canvasContext, player) {
        var _this = this;
        console.log('Draw function');
        level.listOfColorStick.forEach(function (colorStick) {
            colorStick.draw(canvasContext);
        });
        player.draw(canvasContext);
        requestAnimationFrame(function () { return _this.draw(level, canvasContext, player); });
    };
    ;
    /**
     * @todo
     */
    GameManager.prototype.handleUserInput = function () {
    };
    return GameManager;
}());
exports.default = GameManager;


/***/ }),

/***/ "./src/Level.ts":
/*!**********************!*\
  !*** ./src/Level.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Level = /** @class */ (function () {
    function Level(listOfColorStick) {
        this.listOfColorStick = listOfColorStick;
    }
    Object.defineProperty(Level.prototype, "listOfColorStickV", {
        get: function () {
            return this.listOfColorStick;
        },
        enumerable: true,
        configurable: true
    });
    return Level;
}());
exports.default = Level;


/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(position) {
        this.position = position;
    }
    Player.prototype.draw = function (context) {
        var _a = this.position, x = _a.x, y = _a.y;
        context.fillRect(x, y, 30, 30);
    };
    return Player;
}());
exports.default = Player;


/***/ }),

/***/ "./src/constant.ts":
/*!*************************!*\
  !*** ./src/constant.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CANVAS_ID = 'canvas';
exports.COLOR_STICK_HEIGHT = 40;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = __webpack_require__(/*! ./GameManager */ "./src/GameManager.ts");
var ColorStick_1 = __webpack_require__(/*! ./ColorStick */ "./src/ColorStick.ts");
var Level_1 = __webpack_require__(/*! ./Level */ "./src/Level.ts");
var constant_1 = __webpack_require__(/*! ./constant */ "./src/constant.ts");
var intializeGame = function () {
    // GameManager will be responsible for controlling the
    // gameplay
    var level = new Level_1.default([new ColorStick_1.default({ x: 10, y: 10 }, 20), new ColorStick_1.default({ x: 30, y: 10 }, 20), new ColorStick_1.default({ x: 10, y: 20 }, 30)]);
    var canvas = document.getElementById(constant_1.CANVAS_ID);
    /**
     * game manager is responsible for
     * drawing gameObjects and handling user input
     * and checking if the game has ended
     */
    new GameManager_1.default(level, canvas);
};
console.log('Script start');
intializeGame();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbG9yU3RpY2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9MZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBLDRFQUFnRDtBQUVoRDtJQUlFLG9CQUFZLFFBQWtCLEVBQUUsV0FBbUI7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVELHlCQUFJLEdBQUos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RUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksb0JBQVUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksb0JBQVUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVoSixJQUFNLE1BQU0sR0FBdUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQkFBUyxDQUFDLENBQUM7SUFDdEU7Ozs7T0FJRztJQUNILElBQUkscUJBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QixhQUFhLEVBQUUsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vaW50ZXJmYWNlcy9HYW1lT2JqZWN0JztcbmltcG9ydCBQb3NpdGlvbiBmcm9tICcuL2ludGVyZmFjZXMvUG9zaXRpb24nO1xuaW1wb3J0IHsgQ09MT1JfU1RJQ0tfSEVJR0hUIH0gZnJvbSAnLi9jb25zdGFudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU3RpY2sgaW1wbGVtZW50cyBHYW1lT2JqZWN0IHtcbiAgcG9zaXRpb246IFBvc2l0aW9uO1xuICBzdGlja0xlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBQb3NpdGlvbiwgc3RpY2tMZW5ndGg6IG51bWJlcikge1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnN0aWNrTGVuZ3RoID0gc3RpY2tMZW5ndGg7XG4gIH0gIFxuXG4gIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgY29udGV4dC5zdHJva2VSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnN0aWNrTGVuZ3RoLCBDT0xPUl9TVElDS19IRUlHSFQpO1xuICB9XG59IFxuXG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IExldmVsIGZyb20gXCIuL0xldmVsXCI7XG5cbmNsYXNzIEdhbWVNYW5hZ2VyICB7XG4gIC8vIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBjb25zdHJ1Y3RvcihsZXZlbDogTGV2ZWwsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICBpZiAoIWNhbnZhcy5nZXRDb250ZXh0KSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJDYW52YXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFsZXZlbC5saXN0T2ZDb2xvclN0aWNrLmxlbmd0aCkge1xuICAgICAgY29uc29sZS5lcnJvcignRW1wdHkgbGV2ZWwnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcGxheWVyUG9zaXRpb24gPSBsZXZlbC5saXN0T2ZDb2xvclN0aWNrWzBdLnBvc2l0aW9uO1xuICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIocGxheWVyUG9zaXRpb24pO1xuICAgIHRoaXMuZHJhdyhsZXZlbCwgPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD4gY2FudmFzLmdldENvbnRleHQoXCIyRFwiKSwgcGxheWVyKTtcbiAgfVxuXG4gIGRyYXcoXG4gICAgbGV2ZWw6IExldmVsLFxuICAgIGNhbnZhc0NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICBwbGF5ZXI6IFBsYXllclxuICApIHtcbiAgICBjb25zb2xlLmxvZygnRHJhdyBmdW5jdGlvbicpO1xuICAgIGxldmVsLmxpc3RPZkNvbG9yU3RpY2suZm9yRWFjaChjb2xvclN0aWNrID0+IHtcbiAgICAgIGNvbG9yU3RpY2suZHJhdyhjYW52YXNDb250ZXh0KTtcbiAgICB9KTsgICAgXG4gICAgcGxheWVyLmRyYXcoY2FudmFzQ29udGV4dCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuZHJhdyhsZXZlbCwgY2FudmFzQ29udGV4dCwgcGxheWVyKSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEB0b2RvIFxuICAgKi9cbiAgaGFuZGxlVXNlcklucHV0KCkge1xuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZU1hbmFnZXI7XG4iLCJpbXBvcnQgQ29sb3JTdGljayBmcm9tICcuL0NvbG9yU3RpY2snO1xuXG5jbGFzcyBMZXZlbCB7XG4gIGxpc3RPZkNvbG9yU3RpY2s6IEFycmF5PENvbG9yU3RpY2s+O1xuXG4gIGNvbnN0cnVjdG9yKGxpc3RPZkNvbG9yU3RpY2s6IEFycmF5PENvbG9yU3RpY2s+KSB7XG4gICAgdGhpcy5saXN0T2ZDb2xvclN0aWNrID0gbGlzdE9mQ29sb3JTdGljaztcbiAgfVxuXG4gIGdldCBsaXN0T2ZDb2xvclN0aWNrVigpIHtcbiAgICByZXR1cm4gdGhpcy5saXN0T2ZDb2xvclN0aWNrO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExldmVsO1xuIiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnLi9pbnRlcmZhY2VzL0dhbWVPYmplY3QnO1xuaW1wb3J0IFBvc2l0aW9uIGZyb20gJy4vaW50ZXJmYWNlcy9Qb3NpdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBpbXBsZW1lbnRzIEdhbWVPYmplY3Qge1xuICBwb3NpdGlvbjogUG9zaXRpb247XG4gIFxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogUG9zaXRpb24pIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cbiAgXG4gIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLnBvc2l0aW9uO1xuICAgIGNvbnRleHQuZmlsbFJlY3QoeCwgeSwgMzAsIDMwKTtcbiAgfVxufSIsImV4cG9ydCBjb25zdCBDQU5WQVNfSUQgPSAnY2FudmFzJztcbmV4cG9ydCBjb25zdCBDT0xPUl9TVElDS19IRUlHSFQgPSA0MDsiLCJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcbmltcG9ydCBDb2xvclN0aWNrIGZyb20gXCIuL0NvbG9yU3RpY2tcIjtcbmltcG9ydCBMZXZlbCBmcm9tICcuL0xldmVsJztcbmltcG9ydCB7IENBTlZBU19JRCB9IGZyb20gXCIuL2NvbnN0YW50XCI7XG5cbmNvbnN0IGludGlhbGl6ZUdhbWUgPSAoKSA9PiB7XG4gIC8vIEdhbWVNYW5hZ2VyIHdpbGwgYmUgcmVzcG9uc2libGUgZm9yIGNvbnRyb2xsaW5nIHRoZVxuICAvLyBnYW1lcGxheVxuICBjb25zdCBsZXZlbDogTGV2ZWwgPSBuZXcgTGV2ZWwoW25ldyBDb2xvclN0aWNrKHt4OiAxMCwgeTogMTAgfSwgMjApLCBuZXcgQ29sb3JTdGljayh7eDogMzAsIHk6IDEwIH0sIDIwKSwgbmV3IENvbG9yU3RpY2soe3g6IDEwLCB5OiAyMCB9LCAzMCldKTtcblxuICBjb25zdCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKENBTlZBU19JRCk7XG4gIC8qKlxuICAgKiBnYW1lIG1hbmFnZXIgaXMgcmVzcG9uc2libGUgZm9yXG4gICAqIGRyYXdpbmcgZ2FtZU9iamVjdHMgYW5kIGhhbmRsaW5nIHVzZXIgaW5wdXRcbiAgICogYW5kIGNoZWNraW5nIGlmIHRoZSBnYW1lIGhhcyBlbmRlZFxuICAgKi9cbiAgbmV3IEdhbWVNYW5hZ2VyKGxldmVsLCBjYW52YXMpO1xufTtcbmNvbnNvbGUubG9nKCdTY3JpcHQgc3RhcnQnKTtcbmludGlhbGl6ZUdhbWUoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=