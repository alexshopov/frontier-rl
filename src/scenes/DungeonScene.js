import { Scene } from 'phaser';
import handleKeys from '../inputHandlers'; 
import { CELL_SIZE } from '../constants';
import Dungeon from '../Dungeon';
import SpriteEntity from '../SpriteEntity';


export default class DungeonScene extends Scene {
    constructor() {
	super('DUNGEON');
    }

    preload() {
	this.load.image('player', 'assets/player.png');
	this.load.image('dungeon-tiles', 'assets/dungeon-tiles.png', { frameWidth: CELL_SIZE, frameHeight: CELL_SIZE });
    }

    create() {
	this.dungeon = new Dungeon(this);
	this.player = new SpriteEntity(this, this.dungeon.dungeonStart.x, this.dungeon.dungeonStart.y, 'player');

	this.kobold = new SpriteEntity(this, 40, 20, 'player');
	this.kobold.tint = 0xbf6621;

	this.collider = this.physics.add.collider(this.player, this.dungeon.layer);

	this.createKeyboardHandler();
	this.createMouseHandler();
	this.createStatusText();
    }

    createKeyboardHandler() {
	this.input.keyboard.on('keydown', (e) => {
	    const action = handleKeys(e.key);

	    if (action.move) {
		const { x, y } = this.player.getCell();
		const { dx, dy } = action.move;

		if (!this.dungeon.dungeonMap.isBlocked(y + dy, x + dx)) {
		    this.player.move(dx, dy);
		}
	    }
	});
    }

    createMouseHandler() {
	this.input.on('pointerup', (pointer) => {
	    this.status.text = `Mouse released at ${pointer.x}, ${pointer.y}`;
	});

	/*
	this.input.on('pointerup', (pointer) => {
	    this.physics.moveToObject(this.player, pointer, 240);
	});
	*/
    }

    createStatusText() {
	this.status = this.add.text(600, 750, 'Status:', { fontFamily: 'Arial', fill: 'white', fontSize: 16 }); 
	this.status.setOrigin(0.5);
    }

    update() {
	const { x, y } = this.player.getCell();

	this.status.text = `Player position: ${x}, ${y}`
    }
}
