import Phaser from 'phaser';

export default class Dungeon {
    constructor(scene) {
	this.scene = scene;

	this.level = [
	    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 2],
	    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 2]
	];

	this.map = this.scene.make.tilemap({ data: this.level, tileWidth: 16, tileHeight: 16 });
	this.tiles = this.map.addTilesetImage('dungeon-tiles');
	this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0);
	this.layer.setCollisionByExclusion([1, 3]);

	/*
	const debugGraphics = this.add.graphics().setAlpha(0.75);
	dungeonLayer.renderDebug(debugGraphics, {
	    tileColor: null,
	    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
	    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
	});
	*/
    }
}


