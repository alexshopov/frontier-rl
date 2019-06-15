import Phaser from 'phaser';

export default class SpriteEntity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
	super(scene, x, y, texture);

	scene.sys.updateList.add(this);
	scene.sys.displayList.add(this);

	this.setOrigin(0, 0);

	this.size = 32;
    }

    create() {
    }

    update() {
    }

    move(dx, dy) {
	this.x += (dx * this.size);
	this.y += (dy * this.size);
    }
}
