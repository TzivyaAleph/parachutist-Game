//Handles the rendering of the game. It loads the images,
// starts the game loop, and updates the canvas based on the model's state.

import { ParachutistGameModel, Parachutist } from './parachutistGameModel';

/**
 * The view for the Parachutist Game, responsible for rendering the game state.
 */
export class ParachutistGameView {
    private ctx: CanvasRenderingContext2D;
    private model: ParachutistGameModel;
    private images: { [key: string]: HTMLImageElement } = {};

    /**
     * Initializes the game view.
     * @param ctx The rendering context for the canvas.
     * @param model The game model.
     */
    constructor(ctx: CanvasRenderingContext2D, model: ParachutistGameModel) {
        this.ctx = ctx;
        this.model = model;
        this.loadImages();
    }

    /**
     * Loads the images required for the game.
     */
    private loadImages() {
        const path = "";
        const imageSources: { [key: string]: string } = {
            background: path + 'background.jpg',
            sea: path + 'sea.jpg',
            boat: path + 'boat.jpg',
            airplane: path + 'plane.jpg',
            parachutist: path + 'parachutist.jpg'
        };

        let imagesLoaded = 0;
        const totalImages = Object.keys(imageSources).length;

        for (const key in imageSources) {
            if (imageSources.hasOwnProperty(key)) {
                const img = new Image();
                img.src = imageSources[key];
                img.onload = () => {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        this.startGame();
                    }
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${imageSources[key]}`);
                };
                this.images[key] = img;
            }
        }
    }

    /**
     * Starts the game loop once all images are loaded.
     */
    private startGame() {
        setInterval(() => this.model.addParachutist(this.images.parachutist), 2000);
        this.draw();
    }

    /**
     * Draws the game elements on the canvas.
     */
    private draw() {
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
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws the parachutists on the canvas.
     */
    private drawParachutists() {
        this.model.parachutists.forEach((parachutist: Parachutist) => {
            this.ctx.drawImage(parachutist.image, parachutist.x, parachutist.y, 40, 40);
        });
    }

    /**
     * Updates the score display.
     */
    private updateScoreDisplay() {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.innerText = `Score: ${this.model.score}`;
        }
    }

    /**
     * Updates the lives display.
     */
    private updateLivesDisplay() {
        const livesElement = document.getElementById('lives');
        if (livesElement) {
            livesElement.innerText = `Lives: ${this.model.lives}`;
        }
    }
}