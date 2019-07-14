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
        this.draw(level, canvas.getContext("2d"), player);
    }
    GameManager.prototype.draw = function (level, canvasContext, player) {
        var _this = this;
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
    var level = new Level_1.default([new ColorStick_1.default({ x: 10, y: 10 }, 20), new ColorStick_1.default({ x: 30, y: 10 }, 20), new ColorStick_1.default({ x: 10, y: 60 }, 30)]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbG9yU3RpY2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9MZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBLDRFQUFnRDtBQUVoRDtJQUlFLG9CQUFZLFFBQWtCLEVBQUUsV0FBbUI7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVELHlCQUFJLEdBQUos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QUFFLENBQUMsRUFBRSxJQUFJLG9CQUFVLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLG9CQUFVLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaEosSUFBTSxNQUFNLEdBQXVCLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQVMsQ0FBQyxDQUFDO0lBQ3RFOzs7O09BSUc7SUFDSCxJQUFJLHFCQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQztBQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUIsYUFBYSxFQUFFLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgR2FtZU9iamVjdCBmcm9tICcuL2ludGVyZmFjZXMvR2FtZU9iamVjdCc7XG5pbXBvcnQgUG9zaXRpb24gZnJvbSAnLi9pbnRlcmZhY2VzL1Bvc2l0aW9uJztcbmltcG9ydCB7IENPTE9SX1NUSUNLX0hFSUdIVCB9IGZyb20gJy4vY29uc3RhbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclN0aWNrIGltcGxlbWVudHMgR2FtZU9iamVjdCB7XG4gIHBvc2l0aW9uOiBQb3NpdGlvbjtcbiAgc3RpY2tMZW5ndGg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogUG9zaXRpb24sIHN0aWNrTGVuZ3RoOiBudW1iZXIpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5zdGlja0xlbmd0aCA9IHN0aWNrTGVuZ3RoO1xuICB9ICBcblxuICBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIGNvbnRleHQuc3Ryb2tlUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5zdGlja0xlbmd0aCwgQ09MT1JfU1RJQ0tfSEVJR0hUKTtcbiAgfVxufSBcblxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIjtcbmltcG9ydCBMZXZlbCBmcm9tIFwiLi9MZXZlbFwiO1xuXG5jbGFzcyBHYW1lTWFuYWdlciAge1xuICAvLyBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgY29uc3RydWN0b3IobGV2ZWw6IExldmVsLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgaWYgKCFjYW52YXMuZ2V0Q29udGV4dCkge1xuICAgICAgY29uc29sZS53YXJuKFwiQ2FudmFzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghbGV2ZWwubGlzdE9mQ29sb3JTdGljay5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VtcHR5IGxldmVsJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHBsYXllclBvc2l0aW9uID0gbGV2ZWwubGlzdE9mQ29sb3JTdGlja1swXS5wb3NpdGlvbjtcbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllclBvc2l0aW9uKTtcbiAgICB0aGlzLmRyYXcobGV2ZWwsIDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksIHBsYXllcik7XG4gIH1cblxuICBkcmF3KFxuICAgIGxldmVsOiBMZXZlbCxcbiAgICBjYW52YXNDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgcGxheWVyOiBQbGF5ZXJcbiAgKSB7XG4gICAgbGV2ZWwubGlzdE9mQ29sb3JTdGljay5mb3JFYWNoKGNvbG9yU3RpY2sgPT4ge1xuICAgICAgY29sb3JTdGljay5kcmF3KGNhbnZhc0NvbnRleHQpO1xuICAgIH0pOyAgICBcbiAgICBwbGF5ZXIuZHJhdyhjYW52YXNDb250ZXh0KTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5kcmF3KGxldmVsLCBjYW52YXNDb250ZXh0LCBwbGF5ZXIpKTtcbiAgfTtcblxuICAvKipcbiAgICogQHRvZG8gXG4gICAqL1xuICBoYW5kbGVVc2VySW5wdXQoKSB7XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lTWFuYWdlcjtcbiIsImltcG9ydCBDb2xvclN0aWNrIGZyb20gJy4vQ29sb3JTdGljayc7XG5cbmNsYXNzIExldmVsIHtcbiAgbGlzdE9mQ29sb3JTdGljazogQXJyYXk8Q29sb3JTdGljaz47XG5cbiAgY29uc3RydWN0b3IobGlzdE9mQ29sb3JTdGljazogQXJyYXk8Q29sb3JTdGljaz4pIHtcbiAgICB0aGlzLmxpc3RPZkNvbG9yU3RpY2sgPSBsaXN0T2ZDb2xvclN0aWNrO1xuICB9XG5cbiAgZ2V0IGxpc3RPZkNvbG9yU3RpY2tWKCkge1xuICAgIHJldHVybiB0aGlzLmxpc3RPZkNvbG9yU3RpY2s7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGV2ZWw7XG4iLCJpbXBvcnQgR2FtZU9iamVjdCBmcm9tICcuL2ludGVyZmFjZXMvR2FtZU9iamVjdCc7XG5pbXBvcnQgUG9zaXRpb24gZnJvbSAnLi9pbnRlcmZhY2VzL1Bvc2l0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGltcGxlbWVudHMgR2FtZU9iamVjdCB7XG4gIHBvc2l0aW9uOiBQb3NpdGlvbjtcbiAgXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBQb3NpdGlvbikge1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgfVxuICBcbiAgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMucG9zaXRpb247XG4gICAgY29udGV4dC5maWxsUmVjdCh4LCB5LCAzMCwgMzApO1xuICB9XG59IiwiZXhwb3J0IGNvbnN0IENBTlZBU19JRCA9ICdjYW52YXMnO1xuZXhwb3J0IGNvbnN0IENPTE9SX1NUSUNLX0hFSUdIVCA9IDQwOyIsImltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IENvbG9yU3RpY2sgZnJvbSBcIi4vQ29sb3JTdGlja1wiO1xuaW1wb3J0IExldmVsIGZyb20gJy4vTGV2ZWwnO1xuaW1wb3J0IHsgQ0FOVkFTX0lEIH0gZnJvbSBcIi4vY29uc3RhbnRcIjtcblxuY29uc3QgaW50aWFsaXplR2FtZSA9ICgpID0+IHtcbiAgLy8gR2FtZU1hbmFnZXIgd2lsbCBiZSByZXNwb25zaWJsZSBmb3IgY29udHJvbGxpbmcgdGhlXG4gIC8vIGdhbWVwbGF5XG4gIGNvbnN0IGxldmVsOiBMZXZlbCA9IG5ldyBMZXZlbChbbmV3IENvbG9yU3RpY2soe3g6IDEwLCB5OiAxMCB9LCAyMCksIG5ldyBDb2xvclN0aWNrKHt4OiAzMCwgeTogMTAgfSwgMjApLCBuZXcgQ29sb3JTdGljayh7eDogMTAsIHk6IDYwIH0sIDMwKV0pO1xuXG4gIGNvbnN0IGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoQ0FOVkFTX0lEKTtcbiAgLyoqXG4gICAqIGdhbWUgbWFuYWdlciBpcyByZXNwb25zaWJsZSBmb3JcbiAgICogZHJhd2luZyBnYW1lT2JqZWN0cyBhbmQgaGFuZGxpbmcgdXNlciBpbnB1dFxuICAgKiBhbmQgY2hlY2tpbmcgaWYgdGhlIGdhbWUgaGFzIGVuZGVkXG4gICAqL1xuICBuZXcgR2FtZU1hbmFnZXIobGV2ZWwsIGNhbnZhcyk7XG59O1xuY29uc29sZS5sb2coJ1NjcmlwdCBzdGFydCcpO1xuaW50aWFsaXplR2FtZSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==