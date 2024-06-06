//Manages user input and communicates between the Model and the View. 
//It handles keyboard events to move the boat and initializes the game.

import { ParachutistGameModel } from './parachutistGameModel';
import { ParachutistGameView } from './parachutistGameView';

export class ParachutistGameController {
    private model: ParachutistGameModel;
    private view: ParachutistGameView;

    constructor(canvas: HTMLCanvasElement) {
        this.model = new ParachutistGameModel(canvas);
        const ctx = canvas.getContext('2d')!;
        this.view = new ParachutistGameView(ctx, this.model);
        this.addEventListeners();
    }

    private addEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.model.boatX > 0) {
                this.model.boatX -= 20;
            } else if (e.key === 'ArrowRight' && this.model.boatX < this.model.canvas.width - 100) {
                this.model.boatX += 20;
            }
        });
    }
}

// Initialize the game when the script is loaded
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
new ParachutistGameController(canvas);
