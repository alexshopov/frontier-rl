import { Scene } from 'phaser';
import handleKeys from '../inputHandlers' 
import Dungeon from '../Dungeon';
import SpriteEntity from '../SpriteEntity';


export default class DungeonScene extends Scene {
    constructor() {
	super('DUNGEON');
    }

    preload() {
	this.load.image('player', 'assets/player.png');
	this.load.image('dungeon-tiles', 'assets/dungeon-tiles.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
	this.dungeon = new Dungeon(this);
	this.player = new SpriteEntity(this, 128, 128, 'player');

	this.collider = this.physics.add.collider(this.player, this.dungeon.layer);

	this.createKeyboardHandler();
	this.createMouseHandler();
	this.createStatusText();

/*
	this.input.on('pointerup', (pointer) => {
	    this.physics.moveToObject(this.player, pointer, 240);
	});
*/
    }

    createKeyboardHandler() {
	this.input.keyboard.on('keydown', (e) => {
	    const action = handleKeys(e.key);

	    if (action.move) {
		this.player.move(action.move);
	    }
	});

	//this.keyboard = this.input.keyboard.addKeys('W, A, S, D');
    }

    createMouseHandler() {
	this.input.on('pointerup', (pointer) => {
	    this.status.text = `Mouse released at ${pointer.x}, ${pointer.y}`;
	});
    }

    createStatusText() {
	this.status = this.add.text(400, 550, 'Status:', { fontFamily: 'Arial', fill: 'white', fontSize: 16 }); 
	this.status.setOrigin(0.5);
    }

    update() {
	/*
	this.player.body.setVelocity(0);

	if (this.keyboard.W.isDown) {
	    this.player.setVelocityY(-150);
	} else if (this.keyboard.S.isDown) {
	    this.player.setVelocityY(150);
	} else if (this.keyboard.A.isDown) {
	    this.player.setVelocityX(-150);
	} else if (this.keyboard.D.isDown) {
	    this.player.setVelocityX(150);
	}

	this.status.text = `Player position: ${this.player.x}, ${this.player.y}`
	*/
    }
}
