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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bullets = __webpack_require__(6);

var _bullets2 = _interopRequireDefault(_bullets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Weapon = function (_Phaser$Group) {
  _inherits(Weapon, _Phaser$Group);

  function Weapon(game) {
    var weaponName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Weapon';
    var bulletKey = arguments[2];

    var _ret;

    var shotSound = arguments[3];

    _classCallCheck(this, Weapon);

    var _this = _possibleConstructorReturn(this, (Weapon.__proto__ || Object.getPrototypeOf(Weapon)).call(this, game, game.world, weaponName, false, true, Phaser.Physics.ARCADE));

    _this.nextFire = 0;
    _this.bulletSpeed = 600;
    _this.fireRate = 100;
    _this.bulletsPool = 64;
    _this.dmg = 5;
    _this.shotSound = shotSound;

    for (var i = 0; i < _this.bulletsPool; i += 1) {
      _this.add(new _bullets2.default(game, bulletKey), true);
    }
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Weapon, [{
    key: 'fire',
    value: function fire(source) {
      if (this.game.time.time < this.nextFire) {
        return;
      }

      var x = source.x + 10;
      var y = source.y + 10;

      this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);
      this.shotSound.play();

      this.nextFire = this.game.time.time + this.fireRate;
    }
  }]);

  return Weapon;
}(Phaser.Group);

var Weapons = {

  SimpleShoot: function (_Weapon) {
    _inherits(SimpleShoot, _Weapon);

    function SimpleShoot(game, shotSound) {
      var _ret2;

      _classCallCheck(this, SimpleShoot);

      var _this2 = _possibleConstructorReturn(this, (SimpleShoot.__proto__ || Object.getPrototypeOf(SimpleShoot)).call(this, game, 'SimpleShoot', 'bullet5', shotSound));

      _this2.dmg = 6;
      _this2.fireRate = 300;
      _this2.bulletsPool = 128;
      return _ret2 = _this2, _possibleConstructorReturn(_this2, _ret2);
    }

    _createClass(SimpleShoot, [{
      key: 'fire',
      value: function fire(source) {
        if (this.game.time.time < this.nextFire) {
          return;
        }

        var x1 = source.x + 15;
        var y1 = source.y + 10;

        var x2 = source.x + 55;
        var y2 = source.y + 10;

        this.getFirstExists(false).fire(x1, y1, -90, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x2, y2, -90, this.bulletSpeed, 0, 0);

        this.shotSound.play();

        this.nextFire = this.game.time.time + this.fireRate;
      }
    }]);

    return SimpleShoot;
  }(Weapon),

  BasicEnemyShoot: function (_Weapon2) {
    _inherits(BasicEnemyShoot, _Weapon2);

    function BasicEnemyShoot(game, shotSound) {
      var _ret3;

      _classCallCheck(this, BasicEnemyShoot);

      var _this3 = _possibleConstructorReturn(this, (BasicEnemyShoot.__proto__ || Object.getPrototypeOf(BasicEnemyShoot)).call(this, game, 'BasicEnemyShoot', 'bullet7', shotSound));

      _this3.bulletSpeed = 300;
      _this3.fireRate = 1900;
      _this3.setAll('scaleSpeed', 0.01);
      return _ret3 = _this3, _possibleConstructorReturn(_this3, _ret3);
    }

    _createClass(BasicEnemyShoot, [{
      key: 'fire',
      value: function fire(source) {
        if (this.game.time.time < this.nextFire) {
          return;
        }

        var x = source.x + 35;
        var y = source.y + 75;

        this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);

        this.shotSound.play();
        this.nextFire = this.game.time.time + this.fireRate;
      }
    }]);

    return BasicEnemyShoot;
  }(Weapon)
};

exports.default = Weapons;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasicShip = function () {
  function BasicShip(sprite) {
    var maxHP = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var startWeapon = arguments[2];
    var deathSound = arguments[3];

    _classCallCheck(this, BasicShip);

    this.sprite = sprite;
    this.maxHP = maxHP;
    this.currentHP = maxHP;
    this.weapon = startWeapon;
    this.deathSound = deathSound;
  }

  _createClass(BasicShip, [{
    key: "hit",
    value: function hit(dmg) {
      this.currentHP -= dmg;
    }
  }, {
    key: "checkDeath",
    value: function checkDeath() {
      if (this.currentHP <= 0) {
        this.deathSound.play();
        this.sprite.kill();
        return true;
      }
      return false;
    }
  }]);

  return BasicShip;
}();

exports.default = BasicShip;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameState = __webpack_require__(5);

var _gameState2 = _interopRequireDefault(_gameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var newGame = function newGame() {
  this.game.state.add('Game', _gameState2.default, true);
};

var menu = function (_Phaser$State) {
  _inherits(menu, _Phaser$State);

  function menu() {
    _classCallCheck(this, menu);

    return _possibleConstructorReturn(this, (menu.__proto__ || Object.getPrototypeOf(menu)).apply(this, arguments));
  }

  _createClass(menu, [{
    key: 'preload',
    value: function preload() {
      this.load.image('menu-back', 'assets/menu-background.jpg');
      this.load.image('menu-new-game', 'assets/menu-new-game-button.png');
      this.load.audio('menu-theme', 'assets/music/menu.mp3');
    }
  }, {
    key: 'create',
    value: function create() {
      this.add.sprite(0, 0, 'menu-back');
      var logo = this.add.text(this.game.world.centerX, this.game.world.centerY - 200, 'COSMIC INVADERS', {
        font: '96px PixelarRegular',
        fontWeight: 'bold',
        fill: '#FFF',
        stroke: 'black',
        strokeThickness: 5
      });
      logo.anchor.setTo(0.5, 0.5);
      logo.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
      this.add.button(this.game.world.centerX, this.game.world.centerY + 162, 'menu-new-game', newGame).anchor.setTo(0.5, 0.5);
      this.game.menuTheme = this.game.add.sound('menu-theme', 0.2, true);
      this.game.menuTheme.play();
    }
  }]);

  return menu;
}(Phaser.State);
var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game-container', menu);

// function startGame(evt) {
//   const gameContainer = document.getElementById('game-container');
//   gameContainer.innerHTML = '';
//   game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game-container', menu);
// }

// const startGameButton = document.getElementById('button');
// startGameButton.addEventListener('click', startGame);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weapons = __webpack_require__(2);

var _weapons2 = _interopRequireDefault(_weapons);

var _player = __webpack_require__(7);

var _player2 = _interopRequireDefault(_player);

var _enemies = __webpack_require__(8);

var Enemies = _interopRequireWildcard(_enemies);

var _constants = __webpack_require__(11);

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    var _this = _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).call(this));

    _this.gameObjects = {};
    _this.gameControls = {};
    _this.score = 0;
    return _this;
  }

  _createClass(GameState, [{
    key: 'preload',
    value: function preload() {
      this.load.image('starfield', 'assets/starfield.jpg');
      this.load.image('falcon', 'assets/falcon.png');
      this.load.image('enemy1', 'assets/enemies/basic-enemy-ship1.png');
      this.load.spritesheet('explosion', 'assets/explosion.png', 20, 21);
      this.load.image('restart-button', 'assets/restart-button.png');
      this.load.audio('battle-theme', 'assets/music/battle.mp3');
      this.load.audio('gameover', 'assets/music/gameover.mp3');
      this.load.audio('shot', 'assets/sounds/blaster.mp3');
      this.load.audio('explosion', 'assets/sounds/explosion.mp3');

      for (var i = 2; i <= 11; i += 1) {
        this.load.image('bullet' + i, 'assets/bullets/bullet' + i + '.png');
      }
    }
  }, {
    key: 'create',
    value: function create() {

      this.game.battleTheme = this.game.add.sound('battle-theme', 0.2, true);
      this.game.gameoverTheme = this.game.add.sound('gameover', 0.2, false);
      this.game.shotSound = this.game.add.sound('shot', 0.2, false);
      this.game.explosionSound = this.game.add.sound('explosion', 0.2, false);
      this.game.menuTheme.stop();
      //  We're going to be using physics, so enable the Arcade Physics system
      this.physics.startSystem(Phaser.Physics.ARCADE);
      //  A simple background for our game
      this.gameObjects.tileSprite = this.add.tileSprite(0, 0, 1280, 720, 'starfield');

      this.gameObjects.hpText = this.add.text(16, 16, 'HP: 100', { fontSize: '32px', fill: '#FFF' });

      this.score = 0;
      this.gameObjects.ScoreText = this.add.text(1264, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
      this.gameObjects.ScoreText.anchor.setTo(1, 0);

      this.gameObjects.explosion = this.add.sprite(this.game.world.centerX - 37.5, this.game.world.height - 100, 'explosion');
      this.gameObjects.explosion.exists = false;
      this.physics.arcade.enable(this.gameObjects.explosion);
      this.gameObjects.explosion.animations.add('hit', [1, 2, 3, 4, 5, 6, 7, 8], 30, true);
      // The player and its settings
      this.gameObjects.player = new _player2.default(this.add.sprite(this.game.world.centerX - 37.5, this.game.world.height - 100, 'falcon'), this.gameObjects.hpText, 100, new _weapons2.default.SimpleShoot(this.game, this.game.shotSound), this.game.explosionSound);
      // //  We need to enable physics on the player
      this.physics.arcade.enable(this.gameObjects.player.sprite);
      this.gameObjects.player.sprite.body.collideWorldBounds = true;

      //  Player physics properties.
      this.gameObjects.player.sprite.body.bounce.y = 10;
      this.gameObjects.player.sprite.body.bounce.x = 10;
      // this.gameObjects.player.sprite.body.gravity.y = 0;

      this.gameControls.cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
      this.enemiesPool = [];
      while (this.enemiesPool.length < 5) {
        var enemy = new Enemies.BasicEnemy(this.game.add.sprite(0, 0, 'enemy1'), 100, this.game, this.game.shotSound, this.game.explosionSound);
        this.physics.arcade.enable(enemy.sprite);
        enemy.sprite.body.bounce.y = 10;
        enemy.sprite.body.bounce.x = 10;
        this.enemiesPool.push(enemy);
      }
      this.gameObjects.enemies = [];
      this.game.battleTheme.play();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      this.gameObjects.player.sprite.body.velocity.x = 0;
      this.gameObjects.player.sprite.body.velocity.y = 0;
      this.gameObjects.tileSprite.tilePosition.y += 4;
      this.gameObjects.player.updateHPPerformance();
      if (this.gameObjects.player.checkDeath()) {
        this.showGameOverMessage();
        this.game.battleTheme.stop();
        this.game.gameoverTheme.play();
      }

      if (this.gameObjects.enemies.length === 0) {
        this.gameObjects.enemies = this.spawnEnemiesWave(5);
      }

      if (this.gameObjects.enemies.every(function (enemy) {
        return enemy.attackStage === 1;
      })) {
        this.gameObjects.enemies[Math.floor(Math.random() * this.gameObjects.enemies.length)].initAttack();
      }

      this.gameObjects.enemies.forEach(function (enemy) {
        if (enemy.sprite.exists) {
          enemy.weapon.fire(enemy.sprite);
          if (enemy.sprite.y < 0) {
            enemy.sprite.body.velocity.y = 100;
          } else {
            enemy.sprite.body.velocity.y = 0;
          }
        }

        _this2.registerHits(_this2.gameObjects.player, enemy);
        _this2.registerHits(enemy, _this2.gameObjects.player);
        if (enemy.checkDeath()) {
          _this2.score += 10;
          _this2.gameObjects.ScoreText.text = 'Score: ' + _this2.score;
        }

        if (enemy.sprite.y > 720) {
          enemy.sprite.kill();
          enemy.attackStage = 0;
        }

        if (enemy.attackStage === 2) {
          enemy.attack();
        }
        if (_this2.checkCollusions(enemy.sprite, _this2.gameObjects.player.sprite)) {
          enemy.hit(10);
          _this2.playExplosionAnimation(enemy.sprite);
          _this2.playExplosionAnimation(enemy.sprite);
          _this2.playExplosionAnimation(enemy.sprite);
          _this2.playExplosionAnimation(enemy.sprite);
          _this2.gameObjects.player.hit(5);
          _this2.playExplosionAnimation(_this2.gameObjects.player.sprite);
          _this2.playExplosionAnimation(_this2.gameObjects.player.sprite);
          _this2.playExplosionAnimation(_this2.gameObjects.player.sprite);
          _this2.playExplosionAnimation(_this2.gameObjects.player.sprite);
          if (!_this2.game.explosionSound.isPlaying) {
            _this2.game.explosionSound.play();
          }
        }
      });

      this.gameObjects.enemies = this.gameObjects.enemies.filter(function (en) {
        return en.sprite.exists;
      });

      if (this.gameControls.cursors.left.isDown) {
        this.gameObjects.player.sprite.body.velocity.x = -constants.PLAYERS_VELOCITY;
      } else if (this.gameControls.cursors.right.isDown) {
        this.gameObjects.player.sprite.body.velocity.x = constants.PLAYERS_VELOCITY;
      }
      if (this.gameControls.cursors.up.isDown) {
        this.gameObjects.player.sprite.body.velocity.y = -constants.PLAYERS_VELOCITY;
      }
      if (this.gameControls.cursors.down.isDown) {
        this.gameObjects.player.sprite.body.velocity.y = constants.PLAYERS_VELOCITY;
      }

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.gameObjects.player.sprite.exists) {
        this.gameObjects.player.weapon.fire(this.gameObjects.player.sprite);
        if (!this.game.shotSound.isPlaying) {
          // this.game.shotSound.play();
        }
      }
    }
  }, {
    key: 'registerHits',
    value: function registerHits(shooter, target) {
      var _this3 = this;

      this.game.physics.arcade.overlap(shooter.weapon, target.sprite, function (targetSprite, bullet) {
        setTimeout(function () {
          if (!bullet.registrated && bullet.exists) {
            bullet.registrated = true;
            target.hit(shooter.weapon.dmg);
            _this3.playExplosionAnimation(target.sprite);
            _this3.game.explosionSound.play();
          }
          bullet.kill();
        }, 80);
      });
    }
  }, {
    key: 'spawnEnemiesWave',
    value: function spawnEnemiesWave(number) {
      var enemies = [];
      var enemy = void 0;
      for (var i = 0; i < number; i += 1) {
        enemy = this.enemiesPool[i];
        enemy.spawn(constants.ENEMIES_OFFSET * (enemies.length + 1), -enemy.sprite.height);
        enemies.push(enemy);
      }
      return enemies;
    }
  }, {
    key: 'playExplosionAnimation',
    value: function playExplosionAnimation(object) {
      var explosion = this.add.sprite(object.x + Math.random() * object.width - 20, object.y + Math.random() * object.height - 20, 'explosion');
      this.physics.arcade.enable(explosion);
      explosion.body.velocity.x = object.body.velocity.x;
      explosion.body.velocity.y = object.body.velocity.y;
      explosion.animations.add('hit', [1, 2, 3, 4, 5, 6, 7, 8], 30, true);
      explosion.animations.play('hit');
      setTimeout(function () {
        explosion.destroy();
      }, 100);
    }
  }, {
    key: 'showGameOverMessage',
    value: function showGameOverMessage() {
      var _this4 = this;

      var gameOverMessage = this.add.text(this.game.world.centerX, this.game.world.centerY - 200, 'GAME OVER', {
        font: '64px PixelarRegular',
        fontWeight: 'bold',
        fill: '#FFF',
        stroke: 'black',
        strokeThickness: 5
      });
      gameOverMessage.anchor.setTo(0.5, 0.5);
      var restartButton = this.add.button(this.game.world.centerX, this.game.world.centerY + 162, 'restart-button', function () {
        _this4.game.gameoverTheme.stop();
        _this4.game.state.add('Game', GameState, true);
      });
      restartButton.anchor.setTo(0.5, 0.5);
    }
  }, {
    key: 'checkCollusions',
    value: function checkCollusions(obj1, obj2) {
      if (this.game.physics.arcade.collide(obj1, obj2)) {
        var sumVX = obj1.body.velocity.x + obj2.body.velocity.x;
        var sumVY = obj1.body.velocity.y + obj2.body.velocity.y;
        obj1.body.velocity.x = sumVX / 2;
        obj2.body.velocity.x = sumVX / 2;
        obj1.body.velocity.y = sumVY / 2;
        obj2.body.velocity.y = sumVY / 2;
        return true;
      }
      return false;
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_Phaser$Sprite) {
  _inherits(Bullet, _Phaser$Sprite);

  function Bullet(game, key) {
    _classCallCheck(this, Bullet);

    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, game, 0, 0, key));

    _this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    _this.anchor.set(0.5);

    _this.checkWorldBounds = true;
    _this.outOfBoundsKill = true;
    _this.exists = false;

    _this.tracking = false;
    _this.scaleSpeed = 0;
    _this.registrated = false;
    return _this;
  }

  _createClass(Bullet, [{
    key: "fire",
    value: function fire(x, y, angle, speed) {
      var _this2 = this;

      var gx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var gy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

      this.reset(x, y);
      this.scale.set(1);

      this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

      this.angle = angle;

      this.body.gravity.set(gx, gy);
      setTimeout(function () {
        _this2.registrated = false;
      }, 50);
    }
  }, {
    key: "update",
    value: function update() {
      if (this.tracking) {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
      }

      if (this.scaleSpeed > 0) {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
      }
    }
  }]);

  return Bullet;
}(Phaser.Sprite);

exports.default = Bullet;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ships = __webpack_require__(3);

var _ships2 = _interopRequireDefault(_ships);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_BasicShip) {
  _inherits(Player, _BasicShip);

  function Player(sprite, HPStatusElement) {
    var maxHP = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var startWeapon = arguments[3];
    var deathSound = arguments[4];

    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, sprite, maxHP, startWeapon, deathSound));

    _this.HPView = HPStatusElement;
    return _this;
  }

  _createClass(Player, [{
    key: 'restoreHP',
    value: function restoreHP() {
      this.currentHP = this.maxHP;
    }
  }, {
    key: 'updateHPPerformance',
    value: function updateHPPerformance() {
      this.HPView.text = 'HP: ' + this.currentHP;
    }
  }, {
    key: 'checkDeath',
    value: function checkDeath() {
      if (this.currentHP <= 0 && this.sprite.exists) {
        this.deathSound.play();
        this.sprite.kill();
        return true;
      }
      return false;
    }
  }]);

  return Player;
}(_ships2.default);

exports.default = Player;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicEnemy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ships = __webpack_require__(3);

var _ships2 = _interopRequireDefault(_ships);

var _weapons = __webpack_require__(2);

var _weapons2 = _interopRequireDefault(_weapons);

var _timers = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicEnemy = function (_BasicShip) {
  _inherits(BasicEnemy, _BasicShip);

  function BasicEnemy(sprite) {
    var maxHP = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var game = arguments[2];
    var shotSound = arguments[3];
    var deathSound = arguments[4];

    _classCallCheck(this, BasicEnemy);

    var _this = _possibleConstructorReturn(this, (BasicEnemy.__proto__ || Object.getPrototypeOf(BasicEnemy)).call(this, sprite, maxHP, new _weapons2.default.BasicEnemyShoot(game, shotSound), deathSound));

    _this.sprite.exists = false;
    _this.attackStage = 1;
    return _this;
  }

  _createClass(BasicEnemy, [{
    key: 'spawn',
    value: function spawn(x, y) {
      this.currentHP = this.maxHP;
      this.sprite.reset(x, y);
      this.attackStage = 1;
    }
  }, {
    key: 'initAttack',
    value: function initAttack() {
      var _this2 = this;

      if (this.attackStage === 1 && this.sprite.exists) {
        this.attackStage = 2;
        (0, _timers.setTimeout)(function () {
          _this2.sprite.body.velocity.y = 50;
          _this2.sprite.body.velocity.x = 150;
          _this2.currentXVelocity = _this2.sprite.body.velocity.x;
        }, Math.random() * 3000);
      }
    }
  }, {
    key: 'attack',
    value: function attack() {
      this.sprite.body.velocity.y = 50;
      this.sprite.body.velocity.x = this.currentXVelocity;
      if (this.sprite.x > 1200) {
        this.currentXVelocity = -150;
      }
      if (this.sprite.x < 0) {
        this.currentXVelocity = 150;
      }
    }
  }, {
    key: 'checkDeath',
    value: function checkDeath() {
      if (this.currentHP <= 0) {
        this.deathSound.play();
        this.sprite.kill();
        this.attackStage = 0;
        return true;
      }
      return false;
    }
  }]);

  return BasicEnemy;
}(_ships2.default);

exports.BasicEnemy = BasicEnemy;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(10);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PLAYERS_VELOCITY = exports.PLAYERS_VELOCITY = 300;
var ENEMIES_VELOCITY = exports.ENEMIES_VELOCITY = 100;
var ENEMIES_OFFSET = exports.ENEMIES_OFFSET = 200;

/***/ })
/******/ ]);