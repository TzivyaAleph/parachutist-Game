"use strict";
//Manages the game state including the boat position,
// score, lives, and parachutists. It contains methods to add and update parachutists.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParachutistGameModel = void 0;
/**
 * The model for the Parachutist Game, responsible for maintaining the game state.
 */
var ParachutistGameModel = /** @class */ (function () {
    /**
     * Initializes the game model.
     * @param canvas The canvas element where the game is rendered.
     */
    function ParachutistGameModel(canvas) {
        this.parachutists = [];
        this.canvas = canvas;
        this.boatX = this.canvas.width / 2 - 50;
        this.seaHeight = 100;
        this.boatY = this.canvas.height - this.seaHeight; // Updated position to be above the sea image
        this.score = 0;
        this.lives = 3;
        this.airplaneX = this.canvas.width; // Start airplane off the right edge of the canvas
        this.airplaneY = 50;
        this.airplaneSpeed = 2; // Speed of the airplane
    }
    /**
     * Adds a new parachutist to the game.
     * @param image The image of the parachutist.
     */
    ParachutistGameModel.prototype.addParachutist = function (image) {
        var x = this.airplaneX; // Parachutist falls from the airplane's current x position
        var parachutist = { x: x, y: this.airplaneY + 100, image: image };
        this.parachutists.push(parachutist);
    };
    /**
     * Updates the positions of all parachutists and checks for collisions.
     */
    ParachutistGameModel.prototype.updateParachutists = function () {
        var _this = this;
        this.parachutists.forEach(function (parachutist, index) {
            parachutist.y += 2;
            // Check if the parachutist has fallen into the sea
            if (parachutist.y > _this.canvas.height - _this.seaHeight) {
                _this.parachutists.splice(index, 1);
                _this.lives--;
                //check if the parachutist has fallen into the boat
            }
            else if (parachutist.y + 40 > _this.boatY &&
                parachutist.x > _this.boatX && parachutist.x < _this.boatX + 100) {
                //remove a parachutist from the parachutists array
                _this.parachutists.splice(index, 1);
                _this.score += 10;
            }
        });
    };
    /**
   * Updates the position of the airplane.
   */
    ParachutistGameModel.prototype.updateAirplane = function () {
        this.airplaneX -= this.airplaneSpeed;
        if (this.airplaneX < -150) { // Reset the airplane position once it goes off the left edge
            this.airplaneX = this.canvas.width;
        }
    };
    return ParachutistGameModel;
}());
exports.ParachutistGameModel = ParachutistGameModel;
