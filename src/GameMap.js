import Tile from './Tile';
import { DUNGEON_TILES } from './constants';

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
		tiles[i].push(new Tile(false));
	    }
	}

	tiles[30][22].blocked = true;
	tiles[30][22].blockSight = true;
	tiles[31][22].blocked = true;
	tiles[31][22].blockSight = true;
	tiles[32][22].blocked = true;
	tiles[32][22].blockSight = true;

	return tiles;
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
