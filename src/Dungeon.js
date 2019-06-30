// uncomment this import if debugging collisions
// import Phaser from 'phaser';

import LevelMap from './mapObjects/LevelMap';
import {
    MAP_WIDTH,
    MAP_HEIGHT,
    CELL_SIZE
} from './constants';

export default class Dungeon {

    /**
     * Dungeon class
     * @param {Scene} scene - The scene this dungeon belongs to
     */

    constructor(scene) {
	this.scene = scene;

	this.dungeonMap = new LevelMap(MAP_WIDTH, MAP_HEIGHT);
	this.dungeonMap.makeMap();

	this.dungeonStart = this.dungeonMap.levelStart;

	this.map = this.scene.make.tilemap({ data: this.dungeonMap.mapTiles(), tileWidth: CELL_SIZE, tileHeight: CELL_SIZE });
	this.tiles = this.map.addTilesetImage('dungeon-tiles');
	this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0);
	this.layer.setCollisionByExclusion([1, 3]);

	/*
	 * debugging data for collision testing
	 */
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

