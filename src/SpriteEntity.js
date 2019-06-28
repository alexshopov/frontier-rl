import Phaser from 'phaser';
import { CELL_SIZE } from './constants'

export default class Entity extends Phaser.Physics.Arcade.Sprite {
    /*
     * player states = idle, move
     */

    constructor(scene, x, y, texture) {
	super(scene, x, y, texture);
	scene.physics.world.enable(this);
	scene.add.existing(this);

	scene.sys.updateList.add(this);
	scene.sys.displayList.add(this);

	this.setOrigin(0, 0);
	this.setScale(0.5); // @TODO create a new sprite

	//this.size = 16;
	//this.setCollideWorldBounds(true);

	this.playerState = 'idle';
    }

    move({dx, dy}) {
	this.x += dx * CELL_SIZE;
	this.y += dy * CELL_SIZE;
    }

    create() {
    }

    update() {
	if (this.playerState === 'move') {
	}
    }
}
