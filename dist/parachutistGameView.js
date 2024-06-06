"use strict";
//Handles the rendering of the game. It loads the images,
// starts the game loop, and updates the canvas based on the model's state.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParachutistGameView = void 0;
/**
 * The view for the Parachutist Game, responsible for rendering the game state.
 */
var ParachutistGameView = /** @class */ (function () {
    /**
     * Initializes the game view.
     * @param ctx The rendering context for the canvas.
     * @param model The game model.
     */
    function ParachutistGameView(ctx, model) {
        this.images = {};
        this.ctx = ctx;
        this.model = model;
        this.loadImages();
    }
    /**
     * Loads the images required for the game.
     */
    ParachutistGameView.prototype.loadImages = function () {
        var _this = this;
        var path = "";
        var imageSources = {
            background: path + 'background.jpg',
            sea: path + 'sea.jpg',
            boat: path + 'boat.jpg',
            airplane: path + 'plane.jpg',
            parachutist: path + 'parachutist.jpg'
        };
        var imagesLoaded = 0;
        var totalImages = Object.keys(imageSources).length;
        var _loop_1 = function (key) {
            if (imageSources.hasOwnProperty(key)) {
                var img = new Image();
                img.src = imageSources[key];
                img.onload = function () {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        _this.startGame();
                    }
                };
                img.onerror = function () {
                    console.error("Failed to load image: ".concat(imageSources[key]));
                };
                this_1.images[key] = img;
            }
        };
        var this_1 = this;
        for (var key in imageSources) {
            _loop_1(key);
        }
    };
    /**
     * Starts the game loop once all images are loaded.
     */
    ParachutistGameView.prototype.startGame = function () {
        var _this = this;
        setInterval(function () { return _this.model.addParachutist(_this.images.parachutist); }, 2000);
        this.draw();
    };
    /**
     * Draws the game elements on the canvas.
     */
    ParachutistGameView.prototype.draw = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.model.canvas.width, this.model.canvas.height);
        this.ctx.drawImage(this.images.background, 0, 0, this.model.canvas.width, this.model.canvas.height);
        this.ctx.drawImage(this.images.sea, 0, this.model.canvas.height - this.model.seaHeight, this.model.canvas.width, this.model.seaHeight);
        this.ctx.drawImage(this.images.boat, this.model.boatX, this.model.boatY, 100, 50);
        this.ctx.drawImage(this.images.airplane, this.model.airplaneX, this.model.airplaneY, 150, 100);
        this.drawParachutists();
        this.model.updateParachutists();
        this.model.updateAirplane();
        this.updateScoreDisplay();
        this.updateLivesDisplay();
        requestAnimationFrame(function () { return _this.draw(); });
    };
    /**
     * Draws the parachutists on the canvas.
     */
    ParachutistGameView.prototype.drawParachutists = function () {
        var _this = this;
        this.model.parachutists.forEach(function (parachutist) {
            _this.ctx.drawImage(parachutist.image, parachutist.x, parachutist.y, 40, 40);
        });
    };
    /**
     * Updates the score display.
     */
    ParachutistGameView.prototype.updateScoreDisplay = function () {
        var scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.innerText = "Score: ".concat(this.model.score);
        }
    };
    /**
     * Updates the lives display.
     */
    ParachutistGameView.prototype.updateLivesDisplay = function () {
        var livesElement = document.getElementById('lives');
        if (livesElement) {
            livesElement.innerText = "Lives: ".concat(this.model.lives);
        }
    };
    return ParachutistGameView;
}());
exports.ParachutistGameView = ParachutistGameView;
