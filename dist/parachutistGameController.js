"use strict";
//Manages user input and communicates between the Model and the View. 
//It handles keyboard events to move the boat and initializes the game.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParachutistGameController = void 0;
var parachutistGameModel_1 = require("./parachutistGameModel");
var parachutistGameView_1 = require("./parachutistGameView");
var ParachutistGameController = /** @class */ (function () {
    function ParachutistGameController(canvas) {
        this.model = new parachutistGameModel_1.ParachutistGameModel(canvas);
        var ctx = canvas.getContext('2d');
        this.view = new parachutistGameView_1.ParachutistGameView(ctx, this.model);
        this.addEventListeners();
    }
    ParachutistGameController.prototype.addEventListeners = function () {
        var _this = this;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft' && _this.model.boatX > 0) {
                _this.model.boatX -= 20;
            }
            else if (e.key === 'ArrowRight' && _this.model.boatX < _this.model.canvas.width - 100) {
                _this.model.boatX += 20;
            }
        });
    };
    return ParachutistGameController;
}());
exports.ParachutistGameController = ParachutistGameController;
// Initialize the game when the script is loaded
var canvas = document.getElementById('gameCanvas');
new ParachutistGameController(canvas);
