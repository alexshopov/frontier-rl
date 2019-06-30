import Tile from './Tile';
import Rectangle from './Rectangle';
import { 
    MAP_WIDTH,
    MAP_HEIGHT,
    ROOM_MAX_SIZE,
    ROOM_MIN_SIZE,
    MAX_ROOMS,
    DUNGEON_TILES
} from '../constants';

export default class LevelMap {

    /**
     * Class to set up, generate, and interact with a map level 
     * @param {Number} width - Width of the level map in tiles
     * @param {Number} height - Height of the level map in tiles
     */
    constructor(width, height) {
	this.width = width;
	this.height = height;

	this.tiles = this.initializeTiles();
    }

    /*
     * Initialize map with all tiles blocked to start
     * @return {Tile[]}
     */
    initializeTiles() {
	let tiles = [];

	for (let x = 0; x < this.width; ++x) {
	    tiles[x] = [];

	    for (let y = 0; y < this.height; ++y) {
		tiles[x].push(new Tile(true));
	    }
	}

	return tiles;
    }

    /**
     * Make map by digging rooms out of the blocked tiles and connecting them with tunnels
     */
    makeMap() {
	let rooms = [];

	for (let r = 0; r < MAX_ROOMS; ++r) {
	    // random width and height
	    let w = this.randomInt(ROOM_MIN_SIZE, ROOM_MAX_SIZE);
	    let h = this.randomInt(ROOM_MIN_SIZE, ROOM_MAX_SIZE);

	    // random position without going outside the map boundaries
	    let x = this.randomInt(0, MAP_WIDTH - w - 1);
	    let y = this.randomInt(0, MAP_HEIGHT - h - 1);

	    // create a new rectangle
	    const newRoom = new Rectangle(x, y, w, h);

	    // check for intersection with other rooms
	    let didIntersect = false;
	    for (let i = 0, l = rooms.length; i < l; ++i) {
		if (newRoom.intersect(rooms[i])) {
		    didIntersect = true;
		    break
		}
	    }

	    if (!didIntersect) {
		this.createRoom(newRoom);
		const [newX, newY] = newRoom.center();
		
		if (rooms.length === 0) {
		    // player will start in first room
		    this.levelStart = { x: newX, y: newY };
		 } else {
		    // connect to previous room with a tunnel

		    // center of prev room
		    const [prevX, prevY] = rooms[rooms.length - 1].center();

		    if (this.randomInt(0, 1) === 1) {
			// first horizontal, then vertical
			this.createHorizontalTunnel(prevX, newX, prevY);
			this.createVerticalTunnel(prevY, newY, newX);
		    } else {
			// first vertical, then horizontal
			this.createVerticalTunnel(prevY, newY, prevX);
			this.createHorizontalTunnel(prevX, newX, newY);
		    }
		}

		rooms.push(newRoom);
	    }
	}
    }

    /**
     * Generate a random int between two values
     * from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
     * @param {Number} min - The minimum random integer value
     * @param {Number} max - The maximum random integer value
     * @return {Number}
     */
    randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Dig out room by unblocking tiles
     * @param {Room} room - The room to dig out
     */
    createRoom(room) {
	for (let x = room.x1 + 1; x < room.x2; ++x) {
	    for (let y = room.y1 + 1; y < room.y2; ++y) {
		this.tiles[x][y].blocked = false;
		this.tiles[x][y].blockSight = false;
	    }
	}
    }

    /**
     * Dig out horizontal tunnel
     * @param {Number} x1 - Starting x-coordinate
     * @param {Number} x2 - Ending x-coordinate
     * @param {Number} y - The y-coordinate
     */
    createHorizontalTunnel(x1, x2, y) {
	for (let x = Math.min(x1, x2), l = Math.max(x1, x2) + 1; x < l; ++x) {
	    this.tiles[x][y].blocked = false;
	    this.tiles[x][y].blockSight = false;
	}
    }

    /**
     * Dig out vertiacl tunnel
     * @param {Number} y1 - Starting y-coordinate
     * @param {Number} y2 - Ending y-coordinate
     * @param {Number} x - The x-coordinate 
     */
    createVerticalTunnel(y1, y2, x) {
	for (let y = Math.min(y1, y2), l = Math.max(y1, y2) + 1; y < l; ++y) {
	    this.tiles[x][y].blocked = false;
	    this.tiles[x][y].blockSight = false;
	}
    }

    /**
     * Determine if
     * @param {Number} x - The x-coordinate of the tile
     * @param {Number} y - The y-coordinate of the tile
     * @return {Boolean}
     */
    isBlocked(x, y) {
	if (this.tiles[y][x].blocked) {
	    return true;
	}

	return false;
    }

    /**
     * Convert the level data into a tile map
     * @TODO - allow for tile types to be passed in so this can be used for more than just one type of dungeon
     */
    mapTiles() {
	let tilemap = [];

	for (let y = 0; y < this.height;  ++y) {
	    tilemap[y] = [];

	    for (let x = 0; x < this.width; ++x) {
		let tile;

		if (this.tiles[x][y].blocked) {
		    tile = DUNGEON_TILES.light_wall;
		} else {
		    tile = DUNGEON_TILES.light_ground;
		}

		tilemap[y].push(tile);
	    }
	}

	return tilemap;
    }
}
