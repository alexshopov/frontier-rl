import Tile from './Tile';
import Rectangle from './Rectangle';
import { DUNGEON_TILES } from '../constants';

export default class GameMap {
    constructor(width, height) {
	this.width = width;
	this.height = height;

	this.tiles = this.initializeTiles();
    }

    initializeTiles() {
	let tiles = [];
	for (let i = 0, w = this.height; i < w; ++i) {
	    tiles[i] = [];

	    for (let j = 0, h = this.width; j < h; ++j) {
		tiles[i].push(new Tile(true));
	    }
	}

	return tiles;
    }

    makeMap() {
	const room1 = new Rectangle(20, 15, 10, 15);
	const room2 = new Rectangle(35, 15, 10, 15);

	this.createRoom(room1);
	this.createRoom(room2);

	this.createHorizontalTunnel(25, 40, 23);
    }

    createRoom(room) {
	for (let x = room.x1 + 1; x < room.x2; ++x) {
	    for (let y = room.y1 + 1; y < room.y2; ++y) {
		this.tiles[x][y].blocked = false;
		this.tiles[x][y].blockSight = false;
	    }
	}
    }

    createHorizontalTunnel(x1, x2, y) {
	for (let x = Math.min(x1, x2), l = Math.max(x1, x2) + 1; x < l; ++x) {
	    this.tiles[x][y].blocked = false;
	    this.tiles[x][y].blockSight = false;
	}
    }

    createVerticallTunnel(y1, y2, x) {
	for (let y = Math.min(y1, y2), l = Math.max(y1, y2) + 1; y < l; ++y) {
	    this.tiles[x][y].blocked = false;
	    this.tiles[x][y].blockSight = false;
	}
    }

    isBlocked(x, y) {
	if (this.tiles[x][y].blocked) {
	    return true;
	}

	return false;
    }

    mapTiles() {
	let tilemap = [];

	for (let i = 0, w = this.height; i < w; ++i) {
	    tilemap[i] = [];

	    for (let j = 0, h = this.width; j < h; ++j) {
		let tile;

		if (this.tiles[i][j].blocked) {
		    tile = DUNGEON_TILES.light_wall;
		} else {
		    tile = DUNGEON_TILES.light_ground;
		}

		tilemap[i].push(tile);
	    }
	}

	return tilemap;
    }
}
