import { Scene } from 'phaser';
import SpriteEntity from '../SpriteEntity';

export default class DungeonScene extends Scene {
    constructor() {
	super('DUNGEON');
    }

    preload() {
	this.load.image('player', 'assets/player.png');
	this.load.image('wall', 'assets/wall.png');
    }

    create() {
	this.player = new SpriteEntity(this, 128, 128, 'player');

	this.kobold = new SpriteEntity(this, 256, 128, 'player');
	this.kobold.setTint(0x888800);

	this.wall = new SpriteEntity(this, 128, 160, 'wall');

	this.createKeyboardHandler();
	this.createMouseHandler();
	this.createStatusText();
    }

    createKeyboardHandler() {
	this.keyboard = this.input.keyboard.addKeys('W, A, S, D');
    }

    createMouseHandler() {
	this.input.on('pointerup', (pointer) => {
	    this.status.text = `Mouse released at ${pointer.x}, ${pointer.y}`;
	});
    }

    createStatusText() {
	this.status = this.add.text(50, 550, 'Status:', { fontFamily: 'Arial', fill: 'white', fontSize: 16 }); 
    }

    update() {
	if (Phaser.Input.Keyboard.JustUp(this.keyboard.W)) {
	    this.player.move(0, -1);
	} else if (Phaser.Input.Keyboard.JustUp(this.keyboard.S)) {
	    this.player.move(0, 1);
	} else if (Phaser.Input.Keyboard.JustUp(this.keyboard.A)) {
	    this.player.move(-1, 0);
	} else if (Phaser.Input.Keyboard.JustUp(this.keyboard.D)) {
	    this.player.move(1, 0);
	}

	this.status.text = `Player position: ${this.player.x}, ${this.player.y}`
    }
}
