import 'phaser';

export default class DungeonScene extends Phaser.Scene {
    constructor() {
	super({ key: 'DUNGEON' });
    }

    create () {
	this.player = this.add.text( 128, 128, '@', { fontFamily: 'Arial', fill: 'white', fontSize: 32 });

	this.keyboard = this.input.keyboard.addKeys('W, A, S, D');
    }

    update() {
	if (Phaser.Input.Keyboard.JustUp(this.keyboard.W)) {
	    this.move(0, -1);
	} else if (Phaser.Input.Keyboard.JustUp(this.keyboard.S)) {
	    this.move(0, 1);
	} else if (Phaser.Input.Keyboard.JustUp(this.keyboard.A)) {
	    this.move(-1, 0);
	} else if (Phaser.Input.Keyboard.JustUp(this.keyboard.D)) {
	    this.move(1, 0);
	}
    }

    move(dx, dy) {
	this.player.x += (dx * 32);
	this.player.y += (dy * 32);
    }
}
