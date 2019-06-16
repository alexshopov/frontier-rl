import Phaser from 'phaser';

export default class SpriteEntity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
	super(scene, x, y, texture);
	scene.physics.world.enable(this);
	scene.add.existing(this);

	scene.sys.updateList.add(this);
	scene.sys.displayList.add(this);

	this.setOrigin(0, 0);

	this.size = 32;

	this.setCollideWorldBounds(true);
	//this.setDebug(true, true, 0xff0000);
    }

    create() {
    }

    update() {
	//console.log('overlap-x', this.scene.physics.overlap(this, this.scene.wall));
    }

    move(dx, dy) {
	this.x += (dx * this.size);
	this.y += (dy * this.size);
    }
}
