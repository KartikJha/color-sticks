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
    function ColorStick(position, stickLength, velocity) {
        this.position = position;
        this.stickLength = stickLength;
        this.velocity = velocity;
    }
    ColorStick.prototype.getPosition = function () {
        return this.position;
    };
    ColorStick.prototype.getStickLength = function () {
        return this.stickLength;
    };
    ColorStick.prototype.draw = function (context) {
        context.strokeRect(this.position.x, this.position.y, this.stickLength, constant_1.COLOR_STICK_HEIGHT);
    };
    ColorStick.prototype.updatePosition = function () {
        var newX = this.position.x + this.velocity * this.stickLength;
        /**
         * if out of or on bounds then set on bounds
         * and reverse direction
         */
        if (newX > constant_1.CANVAS_DIMENSION.width || newX < 0) {
            if (this.velocity < 0) {
                this.position.x = 0;
                this.velocity *= -1;
            }
            else {
                this.position.x = 800 - this.stickLength;
                this.velocity *= -1;
            }
        }
        else {
            this.position.x = newX;
        }
    };
    ColorStick.prototype.clear = function (context) {
        var _a = this.getPosition(), x = _a.x, y = _a.y;
        context.clearRect(x, y, this.stickLength, constant_1.COLOR_STICK_HEIGHT);
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
var Player_1 = __webpack_require__(/*! ./Player/Player */ "./src/Player/Player.ts");
var Level_1 = __webpack_require__(/*! ./Level */ "./src/Level.ts");
var constant_1 = __webpack_require__(/*! ./constant */ "./src/constant.ts");
var PlayerInputHandler_1 = __webpack_require__(/*! ./Player/PlayerInputHandler */ "./src/Player/PlayerInputHandler.ts");
var GameManager = /** @class */ (function () {
    function GameManager(canvas) {
        if (!canvas.getContext) {
            console.warn("Canvas not supported");
            return;
        }
        // if (!level.getListOfColorStick().length) {
        //   console.error("Empty level");
        //   return;
        // }
        // const playerPosition = level.getListOfColorStick()[0].getPosition();
        var player = new Player_1.default();
        var level = new Level_1.default();
        // player
        this.draw(level, canvas.getContext("2d"), new PlayerInputHandler_1.default(player));
    }
    GameManager.prototype.draw = function (level, canvasContext, playerWithInputHandler) {
        var _this = this;
        /**
         * draw each colorstick and
         * update its position for next redraw
         */
        canvasContext.clearRect(0, 0, constant_1.CANVAS_DIMENSION.width, constant_1.CANVAS_DIMENSION.height);
        level.getListOfColorStick().forEach(function (colorStick) {
            // colorStick.clear(canvasContext);
            colorStick.draw(canvasContext);
            colorStick.updatePosition();
        });
        var player = playerWithInputHandler.targetObject;
        playerWithInputHandler.reactToBufferedInputs();
        player.draw(canvasContext);
        // player falling vertically
        if (player.getPosition().y + 2 < constant_1.CANVAS_DIMENSION.height)
            player.updatePosition(__assign({}, player.getPosition(), { y: player.getPosition().y + 2 }));
        else {
            level.moveToNextLevel();
            player.resetPlayerPosition();
        }
        // setTimeout(
        //   (): number =>
        //     requestAnimationFrame((): void =>
        //       this.draw(level, canvasContext, playerWithInputHandler)
        //     ),
        //     250
        // );
        setTimeout(function () { return _this.draw(level, canvasContext, playerWithInputHandler); }, 140);
        // requestAnimationFrame((): void => this.draw(level, canvasContext, player));
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
var ColorStick_1 = __webpack_require__(/*! ./ColorStick */ "./src/ColorStick.ts");
// export const LEVEL_CONFIG = [
//   // Level 1
//   [
//     [{ x: 10, y: 10 }, 40, 2],
//     [{ x: 60, y: 60 }, 50, 3],
//     [{ x: 10, y: 110 }, 70, -1]
//   ],
//   // Level 2 (adding more elements with random positions)
//   [
//     [{ x: 20, y: 40 }, 35, 2],
//     [{ x: 80, y: 90 }, 45, 1],
//     [{ x: 150, y: 120 }, 55, -2],
//     [{ x: 200, y: 50 }, 65, 3]
//   ],
//   // Level 3
//   [
//     [{ x: 30, y: 60 }, 40, 1],
//     [{ x: 100, y: 110 }, 50, -1],
//     [{ x: 190, y: 130 }, 60, 2],
//     [{ x: 240, y: 170 }, 70, 1],
//     [{ x: 270, y: 60 }, 75, -3]
//   ],
//   // Level 4
//   [
//     [{ x: 40, y: 30 }, 35, 1],
//     [{ x: 90, y: 80 }, 45, 2],
//     [{ x: 130, y: 160 }, 55, -2],
//     [{ x: 220, y: 190 }, 60, 1],
//     [{ x: 300, y: 140 }, 70, -1],
//     [{ x: 350, y: 60 }, 80, 2]
//   ],
//   // Level 5
//   [
//     [{ x: 50, y: 100 }, 40, -1],
//     [{ x: 120, y: 140 }, 45, 2],
//     [{ x: 180, y: 90 }, 55, -3],
//     [{ x: 250, y: 160 }, 60, 1],
//     [{ x: 310, y: 200 }, 65, 0],
//     [{ x: 360, y: 120 }, 70, -2],
//     [{ x: 400, y: 80 }, 75, 3]
//   ],
//   // Level 6 (progressively increasing number of elements)
//   [
//     [{ x: 20, y: 50 }, 30, 1],
//     [{ x: 70, y: 100 }, 35, 2],
//     [{ x: 130, y: 150 }, 40, -1],
//     [{ x: 180, y: 200 }, 50, 3],
//     [{ x: 230, y: 170 }, 60, 2],
//     [{ x: 280, y: 90 }, 65, -2],
//     [{ x: 340, y: 130 }, 75, 1],
//     [{ x: 400, y: 180 }, 80, -3]
//   ]
// ]
var Level = /** @class */ (function () {
    function Level(currentLevel) {
        if (currentLevel === void 0) { currentLevel = 0; }
        this.levelList = [
            // Level 1 (3 elements, evenly spaced in y-range 0 to 800)
            [
                [{ x: 10, y: 0 }, 40, 2],
                [{ x: 60, y: 400 }, 50, 3],
                [{ x: 10, y: 800 }, 70, -1]
            ],
            // Level 2 (4 elements, evenly spaced in y-range 0 to 800)
            [
                [{ x: 20, y: 0 }, 35, 2],
                [{ x: 80, y: 266 }, 45, 1],
                [{ x: 150, y: 533 }, 55, -2],
                [{ x: 200, y: 800 }, 65, 3]
            ],
            // Level 3 (5 elements, evenly spaced in y-range 0 to 800)
            [
                [{ x: 30, y: 0 }, 40, 1],
                [{ x: 100, y: 200 }, 50, -1],
                [{ x: 190, y: 400 }, 60, 2],
                [{ x: 240, y: 600 }, 70, 1],
                [{ x: 270, y: 800 }, 75, -3]
            ],
            // Level 4 (6 elements, evenly spaced in y-range 0 to 800)
            [
                [{ x: 40, y: 0 }, 35, 1],
                [{ x: 90, y: 160 }, 45, 2],
                [{ x: 130, y: 320 }, 55, -2],
                [{ x: 220, y: 480 }, 60, 1],
                [{ x: 300, y: 640 }, 70, -1],
                [{ x: 350, y: 800 }, 80, 2]
            ],
            // Level 5 (7 elements, evenly spaced in y-range 0 to 800)
            [
                [{ x: 50, y: 0 }, 40, -1],
                [{ x: 120, y: 133 }, 45, 2],
                [{ x: 180, y: 266 }, 55, -3],
                [{ x: 250, y: 400 }, 60, 1],
                [{ x: 310, y: 533 }, 65, 0],
                [{ x: 360, y: 666 }, 70, -2],
                [{ x: 400, y: 800 }, 75, 3]
            ],
            // Level 6 (8 elements, evenly spaced in y-range 0 to 800)
            [
                [{ x: 20, y: 0 }, 30, 1],
                [{ x: 70, y: 114 }, 35, 2],
                [{ x: 130, y: 228 }, 40, -1],
                [{ x: 180, y: 342 }, 50, 3],
                [{ x: 230, y: 456 }, 60, 2],
                [{ x: 280, y: 570 }, 65, -2],
                [{ x: 340, y: 684 }, 75, 1],
                [{ x: 400, y: 800 }, 80, -3]
            ]
        ];
        this.currentLevel = 0;
        this.setColorSticks(currentLevel);
    }
    Level.prototype.setColorSticks = function (currentLevel) {
        this.listOfColorStick = this.levelList[currentLevel].map(function (colorStickConfig) {
            return new ColorStick_1.default(colorStickConfig[0], colorStickConfig[1], colorStickConfig[2]);
        });
    };
    Level.prototype.getListOfColorStick = function () {
        return this.listOfColorStick;
    };
    Level.prototype.moveToNextLevel = function (nextLevel) {
        if (nextLevel === void 0) { nextLevel = -1; }
        if (nextLevel != -1) {
            this.setColorSticks(nextLevel);
            return this;
        }
        if (this.currentLevel + 1 < this.levelList.length) {
            this.setColorSticks(this.currentLevel + 1);
            this.currentLevel++;
            return this;
        }
    };
    return Level;
}());
exports.default = Level;


/***/ }),

/***/ "./src/Player/Player.ts":
/*!******************************!*\
  !*** ./src/Player/Player.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(position) {
        if (position === void 0) { position = { x: 0, y: 0 }; }
        this.position = position;
    }
    Player.prototype.getPosition = function () {
        return this.position;
    };
    Player.prototype.draw = function (context) {
        var _a = this.position, x = _a.x, y = _a.y;
        context.fillRect(x, y, 30, 30);
    };
    Player.prototype.updatePosition = function (position) {
        this.position = position;
    };
    Player.prototype.resetPlayerPosition = function () {
        this.position = { x: 0, y: 0 };
    };
    return Player;
}());
exports.default = Player;


/***/ }),

/***/ "./src/Player/PlayerInputHandler.ts":
/*!******************************************!*\
  !*** ./src/Player/PlayerInputHandler.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var PlayerInputHandler = /** @class */ (function () {
    //   reactToBufferedInputs: () => {}
    function PlayerInputHandler(targetObject) {
        var _this = this;
        this.targetObject = targetObject;
        this.inputBuffer = [];
        document.addEventListener('keydown', function (event) { return _this.inputBuffer.push(event); });
    }
    PlayerInputHandler.prototype.reactToBufferedInputs = function () {
        this.inputBuffer.forEach(this.inputHandler.bind(this));
        this.inputBuffer = [];
    };
    PlayerInputHandler.prototype.inputHandler = function (event) {
        var position = this.targetObject.getPosition();
        switch (event.key) {
            case 'ArrowUp':
                // this.targetObject.updatePosition() // Custom logic in the GameObject class will handle the position change
                console.log('Up arrow pressed');
                break;
            case 'ArrowDown':
                // this.targetObject.updatePosition()
                this.targetObject.updatePosition(__assign({}, position, { y: position.y + 5 }));
                console.log('Down arrow pressed');
                break;
            case 'ArrowLeft':
                this.targetObject.updatePosition(__assign({}, position, { x: position.x - 5 }));
                console.log('Left arrow pressed');
                break;
            case 'ArrowRight':
                this.targetObject.updatePosition(__assign({}, position, { x: position.x + 5 }));
                console.log('Right arrow pressed');
                break;
        }
    };
    return PlayerInputHandler;
}());
exports.default = PlayerInputHandler;


/***/ }),

/***/ "./src/constant.ts":
/*!*************************!*\
  !*** ./src/constant.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CANVAS_ID = "canvas";
exports.COLOR_STICK_HEIGHT = 40;
exports.CANVAS_DIMENSION = {
    width: 1080,
    height: 800
};


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
var constant_1 = __webpack_require__(/*! ./constant */ "./src/constant.ts");
var intializeGame = function () {
    // GameManager will be responsible for controlling the
    // gameplay
    var canvas = document.getElementById(constant_1.CANVAS_ID);
    /**
     * game manager is responsible for
     * drawing gameObjects and handling user input
     * and checking if the game has ended
     */
    new GameManager_1.default(canvas);
    // const level: Level = new Level([
    //   new ColorStick({ x: 10, y: 10 }, 40, 2),
    //   new ColorStick({ x: 60, y: 60 }, 50, 3),
    //   new ColorStick({ x: 10, y: 110 }, 70, -1)
    // ]);
    return true;
};
intializeGame();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbG9yU3RpY2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9MZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyL1BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyL1BsYXllcklucHV0SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQSw0RUFBa0U7QUFFbEU7SUFLRSxvQkFDRSxRQUFrQixFQUNsQixXQUFtQixFQUNuQixRQUFnQjtRQUVoQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEs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Q0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDMUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDNUI7WUFDRCwwREFBMEQ7WUFDMUQ7Z0JBQ0UsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3hCLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUNELDBEQUEwRDtZQUMxRDtnQkFDRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzFCLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM1QjtZQUNELDBEQUEwRDtZQUMxRDtnQkFDRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzNCLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxF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ZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4vaW50ZXJmYWNlcy9HYW1lT2JqZWN0XCI7XG5pbXBvcnQgUG9zaXRpb24gZnJvbSBcIi4vaW50ZXJmYWNlcy9Qb3NpdGlvblwiO1xuaW1wb3J0IHsgQ09MT1JfU1RJQ0tfSEVJR0hULCBDQU5WQVNfRElNRU5TSU9OIH0gZnJvbSBcIi4vY29uc3RhbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JTdGljayBpbXBsZW1lbnRzIEdhbWVPYmplY3Qge1xuICBwcml2YXRlIHBvc2l0aW9uOiBQb3NpdGlvbjtcbiAgcHJpdmF0ZSBzdGlja0xlbmd0aDogbnVtYmVyO1xuICBwcml2YXRlIHZlbG9jaXR5OiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHBvc2l0aW9uOiBQb3NpdGlvbixcbiAgICBzdGlja0xlbmd0aDogbnVtYmVyLFxuICAgIHZlbG9jaXR5OiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuc3RpY2tMZW5ndGggPSBzdGlja0xlbmd0aDtcbiAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UG9zaXRpb24oKTogUG9zaXRpb24ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICB9XG5cbiAgcHVibGljIGdldFN0aWNrTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc3RpY2tMZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjb250ZXh0LnN0cm9rZVJlY3QoXG4gICAgICB0aGlzLnBvc2l0aW9uLngsXG4gICAgICB0aGlzLnBvc2l0aW9uLnksXG4gICAgICB0aGlzLnN0aWNrTGVuZ3RoLFxuICAgICAgQ09MT1JfU1RJQ0tfSEVJR0hUXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBuZXdYID0gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy52ZWxvY2l0eSAqIHRoaXMuc3RpY2tMZW5ndGg7XG5cbiAgICAvKipcbiAgICAgKiBpZiBvdXQgb2Ygb3Igb24gYm91bmRzIHRoZW4gc2V0IG9uIGJvdW5kc1xuICAgICAqIGFuZCByZXZlcnNlIGRpcmVjdGlvblxuICAgICAqL1xuICAgIGlmIChuZXdYID4gQ0FOVkFTX0RJTUVOU0lPTi53aWR0aCB8fCBuZXdYIDwgMCkge1xuICAgICAgaWYgKHRoaXMudmVsb2NpdHkgPCAwKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDA7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgKj0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSA4MDAgLSB0aGlzLnN0aWNrTGVuZ3RoO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ICo9IC0xO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnggPSBuZXdYO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCh4LCB5LCB0aGlzLnN0aWNrTGVuZ3RoLCBDT0xPUl9TVElDS19IRUlHSFQpO1xuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllci9QbGF5ZXJcIjtcbmltcG9ydCBMZXZlbCBmcm9tIFwiLi9MZXZlbFwiO1xuaW1wb3J0IENvbG9yU3RpY2sgZnJvbSBcIi4vQ29sb3JTdGlja1wiO1xuaW1wb3J0IHsgQ0FOVkFTX0RJTUVOU0lPTiB9IGZyb20gXCIuL2NvbnN0YW50XCI7XG5pbXBvcnQgUGxheWVySW5wdXRIYW5kbGVyIGZyb20gXCIuL1BsYXllci9QbGF5ZXJJbnB1dEhhbmRsZXJcIjtcblxuY2xhc3MgR2FtZU1hbmFnZXIge1xuICBwdWJsaWMgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIGlmICghY2FudmFzLmdldENvbnRleHQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIkNhbnZhcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBpZiAoIWxldmVsLmdldExpc3RPZkNvbG9yU3RpY2soKS5sZW5ndGgpIHtcbiAgICAvLyAgIGNvbnNvbGUuZXJyb3IoXCJFbXB0eSBsZXZlbFwiKTtcbiAgICAvLyAgIHJldHVybjtcbiAgICAvLyB9XG4gICAgLy8gY29uc3QgcGxheWVyUG9zaXRpb24gPSBsZXZlbC5nZXRMaXN0T2ZDb2xvclN0aWNrKClbMF0uZ2V0UG9zaXRpb24oKTtcbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgY29uc3QgbGV2ZWwgPSBuZXcgTGV2ZWwoKTtcbiAgICAvLyBwbGF5ZXJcbiAgICB0aGlzLmRyYXcoXG4gICAgICBsZXZlbCxcbiAgICAgIGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgICAgbmV3IFBsYXllcklucHV0SGFuZGxlcihwbGF5ZXIpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmF3KFxuICAgIGxldmVsOiBMZXZlbCxcbiAgICBjYW52YXNDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgcGxheWVyV2l0aElucHV0SGFuZGxlcjogUGxheWVySW5wdXRIYW5kbGVyXG4gICk6IHZvaWQge1xuICAgIC8qKlxuICAgICAqIGRyYXcgZWFjaCBjb2xvcnN0aWNrIGFuZFxuICAgICAqIHVwZGF0ZSBpdHMgcG9zaXRpb24gZm9yIG5leHQgcmVkcmF3XG4gICAgICovXG4gICAgY2FudmFzQ29udGV4dC5jbGVhclJlY3QoXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIENBTlZBU19ESU1FTlNJT04ud2lkdGgsXG4gICAgICBDQU5WQVNfRElNRU5TSU9OLmhlaWdodFxuICAgICk7XG4gICAgbGV2ZWwuZ2V0TGlzdE9mQ29sb3JTdGljaygpLmZvckVhY2goKGNvbG9yU3RpY2s6IENvbG9yU3RpY2spOiB2b2lkID0+IHtcbiAgICAgIC8vIGNvbG9yU3RpY2suY2xlYXIoY2FudmFzQ29udGV4dCk7XG4gICAgICBjb2xvclN0aWNrLmRyYXcoY2FudmFzQ29udGV4dCk7XG4gICAgICBjb2xvclN0aWNrLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfSk7XG4gICAgY29uc3QgcGxheWVyID0gcGxheWVyV2l0aElucHV0SGFuZGxlci50YXJnZXRPYmplY3Q7XG4gICAgcGxheWVyV2l0aElucHV0SGFuZGxlci5yZWFjdFRvQnVmZmVyZWRJbnB1dHMoKTtcbiAgICBwbGF5ZXIuZHJhdyhjYW52YXNDb250ZXh0KTtcbiAgICAvLyBwbGF5ZXIgZmFsbGluZyB2ZXJ0aWNhbGx5XG4gICAgaWYgKHBsYXllci5nZXRQb3NpdGlvbigpLnkgKyAyIDwgQ0FOVkFTX0RJTUVOU0lPTi5oZWlnaHQpXG4gICAgICBwbGF5ZXIudXBkYXRlUG9zaXRpb24oey4uLnBsYXllci5nZXRQb3NpdGlvbigpLCB5OiBwbGF5ZXIuZ2V0UG9zaXRpb24oKS55ICsgMiB9KVxuICAgIGVsc2Uge1xuICAgICAgbGV2ZWwubW92ZVRvTmV4dExldmVsKCk7XG4gICAgICBwbGF5ZXIucmVzZXRQbGF5ZXJQb3NpdGlvbigpO1xuICAgIH1cbiAgICAvLyBzZXRUaW1lb3V0KFxuICAgIC8vICAgKCk6IG51bWJlciA9PlxuICAgIC8vICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk6IHZvaWQgPT5cbiAgICAvLyAgICAgICB0aGlzLmRyYXcobGV2ZWwsIGNhbnZhc0NvbnRleHQsIHBsYXllcldpdGhJbnB1dEhhbmRsZXIpXG4gICAgLy8gICAgICksXG4gICAgLy8gICAgIDI1MFxuICAgIC8vICk7XG4gICAgc2V0VGltZW91dCgoKTogdm9pZCA9PiB0aGlzLmRyYXcobGV2ZWwsIGNhbnZhc0NvbnRleHQsIHBsYXllcldpdGhJbnB1dEhhbmRsZXIpLCAxNDApXG4gICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpOiB2b2lkID0+IHRoaXMuZHJhdyhsZXZlbCwgY2FudmFzQ29udGV4dCwgcGxheWVyKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZU1hbmFnZXI7XG4iLCJpbXBvcnQgQ29sb3JTdGljayBmcm9tICcuL0NvbG9yU3RpY2snXG5pbXBvcnQgUG9zaXRpb24gZnJvbSAnLi9pbnRlcmZhY2VzL1Bvc2l0aW9uJ1xuXG4vLyBleHBvcnQgY29uc3QgTEVWRUxfQ09ORklHID0gW1xuLy8gICAvLyBMZXZlbCAxXG4vLyAgIFtcbi8vICAgICBbeyB4OiAxMCwgeTogMTAgfSwgNDAsIDJdLFxuLy8gICAgIFt7IHg6IDYwLCB5OiA2MCB9LCA1MCwgM10sXG4vLyAgICAgW3sgeDogMTAsIHk6IDExMCB9LCA3MCwgLTFdXG4vLyAgIF0sXG4vLyAgIC8vIExldmVsIDIgKGFkZGluZyBtb3JlIGVsZW1lbnRzIHdpdGggcmFuZG9tIHBvc2l0aW9ucylcbi8vICAgW1xuLy8gICAgIFt7IHg6IDIwLCB5OiA0MCB9LCAzNSwgMl0sXG4vLyAgICAgW3sgeDogODAsIHk6IDkwIH0sIDQ1LCAxXSxcbi8vICAgICBbeyB4OiAxNTAsIHk6IDEyMCB9LCA1NSwgLTJdLFxuLy8gICAgIFt7IHg6IDIwMCwgeTogNTAgfSwgNjUsIDNdXG4vLyAgIF0sXG4vLyAgIC8vIExldmVsIDNcbi8vICAgW1xuLy8gICAgIFt7IHg6IDMwLCB5OiA2MCB9LCA0MCwgMV0sXG4vLyAgICAgW3sgeDogMTAwLCB5OiAxMTAgfSwgNTAsIC0xXSxcbi8vICAgICBbeyB4OiAxOTAsIHk6IDEzMCB9LCA2MCwgMl0sXG4vLyAgICAgW3sgeDogMjQwLCB5OiAxNzAgfSwgNzAsIDFdLFxuLy8gICAgIFt7IHg6IDI3MCwgeTogNjAgfSwgNzUsIC0zXVxuLy8gICBdLFxuLy8gICAvLyBMZXZlbCA0XG4vLyAgIFtcbi8vICAgICBbeyB4OiA0MCwgeTogMzAgfSwgMzUsIDFdLFxuLy8gICAgIFt7IHg6IDkwLCB5OiA4MCB9LCA0NSwgMl0sXG4vLyAgICAgW3sgeDogMTMwLCB5OiAxNjAgfSwgNTUsIC0yXSxcbi8vICAgICBbeyB4OiAyMjAsIHk6IDE5MCB9LCA2MCwgMV0sXG4vLyAgICAgW3sgeDogMzAwLCB5OiAxNDAgfSwgNzAsIC0xXSxcbi8vICAgICBbeyB4OiAzNTAsIHk6IDYwIH0sIDgwLCAyXVxuLy8gICBdLFxuLy8gICAvLyBMZXZlbCA1XG4vLyAgIFtcbi8vICAgICBbeyB4OiA1MCwgeTogMTAwIH0sIDQwLCAtMV0sXG4vLyAgICAgW3sgeDogMTIwLCB5OiAxNDAgfSwgNDUsIDJdLFxuLy8gICAgIFt7IHg6IDE4MCwgeTogOTAgfSwgNTUsIC0zXSxcbi8vICAgICBbeyB4OiAyNTAsIHk6IDE2MCB9LCA2MCwgMV0sXG4vLyAgICAgW3sgeDogMzEwLCB5OiAyMDAgfSwgNjUsIDBdLFxuLy8gICAgIFt7IHg6IDM2MCwgeTogMTIwIH0sIDcwLCAtMl0sXG4vLyAgICAgW3sgeDogNDAwLCB5OiA4MCB9LCA3NSwgM11cbi8vICAgXSxcbi8vICAgLy8gTGV2ZWwgNiAocHJvZ3Jlc3NpdmVseSBpbmNyZWFzaW5nIG51bWJlciBvZiBlbGVtZW50cylcbi8vICAgW1xuLy8gICAgIFt7IHg6IDIwLCB5OiA1MCB9LCAzMCwgMV0sXG4vLyAgICAgW3sgeDogNzAsIHk6IDEwMCB9LCAzNSwgMl0sXG4vLyAgICAgW3sgeDogMTMwLCB5OiAxNTAgfSwgNDAsIC0xXSxcbi8vICAgICBbeyB4OiAxODAsIHk6IDIwMCB9LCA1MCwgM10sXG4vLyAgICAgW3sgeDogMjMwLCB5OiAxNzAgfSwgNjAsIDJdLFxuLy8gICAgIFt7IHg6IDI4MCwgeTogOTAgfSwgNjUsIC0yXSxcbi8vICAgICBbeyB4OiAzNDAsIHk6IDEzMCB9LCA3NSwgMV0sXG4vLyAgICAgW3sgeDogNDAwLCB5OiAxODAgfSwgODAsIC0zXVxuLy8gICBdXG4vLyBdXG5cbmNsYXNzIExldmVsIHtcbiAgcHJpdmF0ZSBsaXN0T2ZDb2xvclN0aWNrOiBDb2xvclN0aWNrW11cbiAgcHJpdmF0ZSBsZXZlbExpc3Q6IEFycmF5PEFycmF5PEFycmF5PE9iamVjdD4+PiA9IFtcbiAgICAvLyBMZXZlbCAxICgzIGVsZW1lbnRzLCBldmVubHkgc3BhY2VkIGluIHktcmFuZ2UgMCB0byA4MDApXG4gICAgW1xuICAgICAgW3sgeDogMTAsIHk6IDAgfSwgNDAsIDJdLFxuICAgICAgW3sgeDogNjAsIHk6IDQwMCB9LCA1MCwgM10sXG4gICAgICBbeyB4OiAxMCwgeTogODAwIH0sIDcwLCAtMV1cbiAgICBdLFxuICAgIC8vIExldmVsIDIgKDQgZWxlbWVudHMsIGV2ZW5seSBzcGFjZWQgaW4geS1yYW5nZSAwIHRvIDgwMClcbiAgICBbXG4gICAgICBbeyB4OiAyMCwgeTogMCB9LCAzNSwgMl0sXG4gICAgICBbeyB4OiA4MCwgeTogMjY2IH0sIDQ1LCAxXSxcbiAgICAgIFt7IHg6IDE1MCwgeTogNTMzIH0sIDU1LCAtMl0sXG4gICAgICBbeyB4OiAyMDAsIHk6IDgwMCB9LCA2NSwgM11cbiAgICBdLFxuICAgIC8vIExldmVsIDMgKDUgZWxlbWVudHMsIGV2ZW5seSBzcGFjZWQgaW4geS1yYW5nZSAwIHRvIDgwMClcbiAgICBbXG4gICAgICBbeyB4OiAzMCwgeTogMCB9LCA0MCwgMV0sXG4gICAgICBbeyB4OiAxMDAsIHk6IDIwMCB9LCA1MCwgLTFdLFxuICAgICAgW3sgeDogMTkwLCB5OiA0MDAgfSwgNjAsIDJdLFxuICAgICAgW3sgeDogMjQwLCB5OiA2MDAgfSwgNzAsIDFdLFxuICAgICAgW3sgeDogMjcwLCB5OiA4MDAgfSwgNzUsIC0zXVxuICAgIF0sXG4gICAgLy8gTGV2ZWwgNCAoNiBlbGVtZW50cywgZXZlbmx5IHNwYWNlZCBpbiB5LXJhbmdlIDAgdG8gODAwKVxuICAgIFtcbiAgICAgIFt7IHg6IDQwLCB5OiAwIH0sIDM1LCAxXSxcbiAgICAgIFt7IHg6IDkwLCB5OiAxNjAgfSwgNDUsIDJdLFxuICAgICAgW3sgeDogMTMwLCB5OiAzMjAgfSwgNTUsIC0yXSxcbiAgICAgIFt7IHg6IDIyMCwgeTogNDgwIH0sIDYwLCAxXSxcbiAgICAgIFt7IHg6IDMwMCwgeTogNjQwIH0sIDcwLCAtMV0sXG4gICAgICBbeyB4OiAzNTAsIHk6IDgwMCB9LCA4MCwgMl1cbiAgICBdLFxuICAgIC8vIExldmVsIDUgKDcgZWxlbWVudHMsIGV2ZW5seSBzcGFjZWQgaW4geS1yYW5nZSAwIHRvIDgwMClcbiAgICBbXG4gICAgICBbeyB4OiA1MCwgeTogMCB9LCA0MCwgLTFdLFxuICAgICAgW3sgeDogMTIwLCB5OiAxMzMgfSwgNDUsIDJdLFxuICAgICAgW3sgeDogMTgwLCB5OiAyNjYgfSwgNTUsIC0zXSxcbiAgICAgIFt7IHg6IDI1MCwgeTogNDAwIH0sIDYwLCAxXSxcbiAgICAgIFt7IHg6IDMxMCwgeTogNTMzIH0sIDY1LCAwXSxcbiAgICAgIFt7IHg6IDM2MCwgeTogNjY2IH0sIDcwLCAtMl0sXG4gICAgICBbeyB4OiA0MDAsIHk6IDgwMCB9LCA3NSwgM11cbiAgICBdLFxuICAgIC8vIExldmVsIDYgKDggZWxlbWVudHMsIGV2ZW5seSBzcGFjZWQgaW4geS1yYW5nZSAwIHRvIDgwMClcbiAgICBbXG4gICAgICBbeyB4OiAyMCwgeTogMCB9LCAzMCwgMV0sXG4gICAgICBbeyB4OiA3MCwgeTogMTE0IH0sIDM1LCAyXSxcbiAgICAgIFt7IHg6IDEzMCwgeTogMjI4IH0sIDQwLCAtMV0sXG4gICAgICBbeyB4OiAxODAsIHk6IDM0MiB9LCA1MCwgM10sXG4gICAgICBbeyB4OiAyMzAsIHk6IDQ1NiB9LCA2MCwgMl0sXG4gICAgICBbeyB4OiAyODAsIHk6IDU3MCB9LCA2NSwgLTJdLFxuICAgICAgW3sgeDogMzQwLCB5OiA2ODQgfSwgNzUsIDFdLFxuICAgICAgW3sgeDogNDAwLCB5OiA4MDAgfSwgODAsIC0zXVxuICAgIF1cbiAgXTtcbiAgXG4gIHByaXZhdGUgY3VycmVudExldmVsOiBudW1iZXIgPSAwXG4gIFxuICBwcml2YXRlIHNldENvbG9yU3RpY2tzKGN1cnJlbnRMZXZlbDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5saXN0T2ZDb2xvclN0aWNrID0gdGhpcy5sZXZlbExpc3RbY3VycmVudExldmVsXS5tYXAoXG4gICAgICBjb2xvclN0aWNrQ29uZmlnID0+XG4gICAgICAgIG5ldyBDb2xvclN0aWNrKFxuICAgICAgICAgIGNvbG9yU3RpY2tDb25maWdbMF0gYXMgUG9zaXRpb24sXG4gICAgICAgICAgY29sb3JTdGlja0NvbmZpZ1sxXSBhcyBudW1iZXIsXG4gICAgICAgICAgY29sb3JTdGlja0NvbmZpZ1syXSBhcyBudW1iZXJcbiAgICAgICAgKVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihjdXJyZW50TGV2ZWw6IG51bWJlciA9IDApIHtcbiAgICB0aGlzLnNldENvbG9yU3RpY2tzKGN1cnJlbnRMZXZlbCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlzdE9mQ29sb3JTdGljaygpOiBDb2xvclN0aWNrW10ge1xuICAgIHJldHVybiB0aGlzLmxpc3RPZkNvbG9yU3RpY2tcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlVG9OZXh0TGV2ZWwobmV4dExldmVsOiBudW1iZXIgPSAtMSk6IExldmVsIHtcbiAgICBpZiAobmV4dExldmVsICE9IC0xKSB7XG4gICAgICB0aGlzLnNldENvbG9yU3RpY2tzKG5leHRMZXZlbCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IFxuICAgIGlmICh0aGlzLmN1cnJlbnRMZXZlbCArIDEgPCB0aGlzLmxldmVsTGlzdC5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2V0Q29sb3JTdGlja3ModGhpcy5jdXJyZW50TGV2ZWwgKyAxKVxuICAgICAgdGhpcy5jdXJyZW50TGV2ZWwrKztcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExldmVsXG4iLCJpbXBvcnQgR2FtZU9iamVjdCBmcm9tIFwiLi4vaW50ZXJmYWNlcy9HYW1lT2JqZWN0XCI7XG5pbXBvcnQgUG9zaXRpb24gZnJvbSBcIi4uL2ludGVyZmFjZXMvUG9zaXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGltcGxlbWVudHMgR2FtZU9iamVjdCB7XG5cbiAgcHJpdmF0ZSBwb3NpdGlvbjogUG9zaXRpb247XG5cbiAgY2xlYXI6IEZ1bmN0aW9uO1xuXG4gIHNldHVwSW5wdXRMaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBvc2l0aW9uIDogUG9zaXRpb24gPSB7eDogMCwgeTogMH0pIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0UG9zaXRpb24oKTogUG9zaXRpb24ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICB9XG5cbiAgcHVibGljIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLnBvc2l0aW9uO1xuICAgIGNvbnRleHQuZmlsbFJlY3QoeCwgeSwgMzAsIDMwKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVQb3NpdGlvbihwb3NpdGlvbjogUG9zaXRpb24pIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBwdWJsaWMgcmVzZXRQbGF5ZXJQb3NpdGlvbigpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0ge3g6IDAsIHk6IDB9O1xuICB9XG59XG4iLCJpbXBvcnQgR2FtZU9iamVjdCBmcm9tIFwiLi4vaW50ZXJmYWNlcy9HYW1lT2JqZWN0XCJcbmltcG9ydCBJbnB1dEhhbmRsZXIgZnJvbSBcIi4uL2ludGVyZmFjZXMvSW5wdXRIYW5kbGVyXCJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcblxuY2xhc3MgUGxheWVySW5wdXRIYW5kbGVyIGltcGxlbWVudHMgSW5wdXRIYW5kbGVyIHtcbiAgdGFyZ2V0T2JqZWN0OiBQbGF5ZXJcbiAgaW5wdXRCdWZmZXI6IEFycmF5PEtleWJvYXJkRXZlbnQ+XG4vLyAgIHJlYWN0VG9CdWZmZXJlZElucHV0czogKCkgPT4ge31cbiAgY29uc3RydWN0b3IodGFyZ2V0T2JqZWN0OiBQbGF5ZXIpIHtcbiAgICB0aGlzLnRhcmdldE9iamVjdCA9IHRhcmdldE9iamVjdDtcbiAgICB0aGlzLmlucHV0QnVmZmVyID0gW107XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHRoaXMuaW5wdXRCdWZmZXIucHVzaChldmVudCkpXG4gIH1cblxuICByZWFjdFRvQnVmZmVyZWRJbnB1dHMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEJ1ZmZlci5mb3JFYWNoKHRoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuaW5wdXRCdWZmZXIgPSBbXTtcbiAgfVxuXG4gIGlucHV0SGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy50YXJnZXRPYmplY3QuZ2V0UG9zaXRpb24oKVxuXG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAvLyB0aGlzLnRhcmdldE9iamVjdC51cGRhdGVQb3NpdGlvbigpIC8vIEN1c3RvbSBsb2dpYyBpbiB0aGUgR2FtZU9iamVjdCBjbGFzcyB3aWxsIGhhbmRsZSB0aGUgcG9zaXRpb24gY2hhbmdlXG4gICAgICAgIGNvbnNvbGUubG9nKCdVcCBhcnJvdyBwcmVzc2VkJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIC8vIHRoaXMudGFyZ2V0T2JqZWN0LnVwZGF0ZVBvc2l0aW9uKClcbiAgICAgICAgdGhpcy50YXJnZXRPYmplY3QudXBkYXRlUG9zaXRpb24oey4uLnBvc2l0aW9uLCB5OiBwb3NpdGlvbi55ICsgNX0pXG4gICAgICAgIGNvbnNvbGUubG9nKCdEb3duIGFycm93IHByZXNzZWQnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgdGhpcy50YXJnZXRPYmplY3QudXBkYXRlUG9zaXRpb24oey4uLnBvc2l0aW9uLCB4OiBwb3NpdGlvbi54IC0gNX0pXG4gICAgICAgIGNvbnNvbGUubG9nKCdMZWZ0IGFycm93IHByZXNzZWQnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgIHRoaXMudGFyZ2V0T2JqZWN0LnVwZGF0ZVBvc2l0aW9uKHsuLi5wb3NpdGlvbiwgeDogcG9zaXRpb24ueCArIDV9KVxuICAgICAgICBjb25zb2xlLmxvZygnUmlnaHQgYXJyb3cgcHJlc3NlZCcpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcklucHV0SGFuZGxlcjtcbiIsImV4cG9ydCBjb25zdCBDQU5WQVNfSUQgPSBcImNhbnZhc1wiO1xuZXhwb3J0IGNvbnN0IENPTE9SX1NUSUNLX0hFSUdIVCA9IDQwO1xuZXhwb3J0IGNvbnN0IENBTlZBU19ESU1FTlNJT04gPSB7XG4gIHdpZHRoOiAxMDgwLFxuICBoZWlnaHQ6IDgwMFxufTsiLCJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcbmltcG9ydCBDb2xvclN0aWNrIGZyb20gXCIuL0NvbG9yU3RpY2tcIjtcbmltcG9ydCBMZXZlbCBmcm9tIFwiLi9MZXZlbFwiO1xuaW1wb3J0IHsgQ0FOVkFTX0lEIH0gZnJvbSBcIi4vY29uc3RhbnRcIjtcblxuY29uc3QgaW50aWFsaXplR2FtZSA9ICgpOiBib29sZWFuID0+IHtcbiAgLy8gR2FtZU1hbmFnZXIgd2lsbCBiZSByZXNwb25zaWJsZSBmb3IgY29udHJvbGxpbmcgdGhlXG4gIC8vIGdhbWVwbGF5XG5cblxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChDQU5WQVNfSUQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAvKipcbiAgICogZ2FtZSBtYW5hZ2VyIGlzIHJlc3BvbnNpYmxlIGZvclxuICAgKiBkcmF3aW5nIGdhbWVPYmplY3RzIGFuZCBoYW5kbGluZyB1c2VyIGlucHV0XG4gICAqIGFuZCBjaGVja2luZyBpZiB0aGUgZ2FtZSBoYXMgZW5kZWRcbiAgICovXG4gIG5ldyBHYW1lTWFuYWdlcihjYW52YXMpO1xuICAvLyBjb25zdCBsZXZlbDogTGV2ZWwgPSBuZXcgTGV2ZWwoW1xuICAvLyAgIG5ldyBDb2xvclN0aWNrKHsgeDogMTAsIHk6IDEwIH0sIDQwLCAyKSxcbiAgLy8gICBuZXcgQ29sb3JTdGljayh7IHg6IDYwLCB5OiA2MCB9LCA1MCwgMyksXG4gIC8vICAgbmV3IENvbG9yU3RpY2soeyB4OiAxMCwgeTogMTEwIH0sIDcwLCAtMSlcbiAgLy8gXSk7XG4gIHJldHVybiB0cnVlO1xufTtcbmludGlhbGl6ZUdhbWUoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=