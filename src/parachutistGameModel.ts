//Manages the game state including the boat position,
// score, lives, and parachutists. It contains methods to add and update parachutists.

/**
 * Represents a parachutist in the game.
 */
export interface Parachutist {
    x: number;
    y: number;
    image: HTMLImageElement;
}

/**
 * The model for the Parachutist Game, responsible for maintaining the game state.
 */
export class ParachutistGameModel {
    public boatX: number;
    public boatY: number;
    public score: number;
    public lives: number;
    public parachutists: Parachutist[] = [];
    public canvas: HTMLCanvasElement;
    public seaHeight!: number;
    public airplaneX: number;
    public airplaneY!: number;
    public airplaneSpeed: number;
    /**
     * Initializes the game model.
     * @param canvas The canvas element where the game is rendered.
     */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.boatX = this.canvas.width / 2 - 50;
        this.seaHeight = 100; 
        this.boatY = this.canvas.height - this.seaHeight;// Updated position to be above the sea image
        this.score = 0;
        this.lives = 3;
        this.airplaneX = this.canvas.width;  // Start airplane off the right edge of the canvas
        this.airplaneY = 50;
        this.airplaneSpeed = 2;  // Speed of the airplane
    }

    /**
     * Adds a new parachutist to the game.
     * @param image The image of the parachutist.
     */
    public addParachutist(image: HTMLImageElement) {
        const x = this.airplaneX;  // Parachutist falls from the airplane's current x position
        const parachutist: Parachutist = { x, y: this.airplaneY + 100, image };
        this.parachutists.push(parachutist);
    }

    /**
     * Updates the positions of all parachutists and checks for collisions.
     */
    public updateParachutists() {
        this.parachutists.forEach((parachutist, index) => {
            parachutist.y += 2;

              // Check if the parachutist has fallen into the sea
              if (parachutist.y > this.canvas.height - this.seaHeight) {
                this.parachutists.splice(index, 1);
                this.lives--;
                //check if the parachutist has fallen into the boat
            } else if (parachutist.y + 40 > this.boatY &&
                       parachutist.x > this.boatX && parachutist.x < this.boatX + 100) {
                //remove a parachutist from the parachutists array
                this.parachutists.splice(index, 1);
                this.score += 10;
            }
        });
    }

      /**
     * Updates the position of the airplane.
     */
      public updateAirplane() {
        this.airplaneX -= this.airplaneSpeed;
        if (this.airplaneX < -150) {  // Reset the airplane position once it goes off the left edge
            this.airplaneX = this.canvas.width;
        }
    }
}
