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

export default class GameMap {
    /*
     * map is buile up by row, so need to think in terms of [y, x] instead of [x, y]
     * [[1, 1, 1, 1],
     *  [1, 0, 0, 1],
     *  [1, 1, 1, 1]]
     */

    constructor(width, height) {
	this.width = width;
	this.height = height;

	this.tiles = this.initializeTiles();
    }

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

    makeMap() {
	let rooms = [];
	let numRooms = 0;

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

	    if (didIntersect) {
		continue;
	    }

	    this.createRoom(newRoom);

	    const [newX, newY] = newRoom.center();
	    
	    // player will start in first room
	    if (numRooms === 0) {
		this.levelStart = { x: newX, y: newY };
	     } else {
		// connect to previous room with a tunnel
		 //
		// center of prev room
		const [prevX, prevY] = rooms[numRooms - 1].center();

		if (this.randomInt(0, 1) === 1) {
		    // first horizontal, then vertical
		    this.createHorizontalTunnel(prevX, newX, prevY);
		    this.createVerticalTunnel(prevY, newY, newX);
		} else {
		    this.createVerticalTunnel(prevY, newY, prevX);
		    this.createHorizontalTunnel(prevX, newX, newY);
		}
	    }

	    rooms.push(newRoom);
	    numRooms += 1;
	}

	console.log(numRooms);
    }

    randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
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

    createVerticalTunnel(y1, y2, x) {
	for (let y = Math.min(y1, y2), l = Math.max(y1, y2) + 1; y < l; ++y) {
	    this.tiles[x][y].blocked = false;
	    this.tiles[x][y].blockSight = false;
	}
    }

    isBlocked(x, y) {
	if (this.tiles[y][x].blocked) {
	    return true;
	}

	return false;
    }

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
