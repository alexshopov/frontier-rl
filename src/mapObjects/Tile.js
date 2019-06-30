export default class Tile {
    /**
     * Generic map tile. May or may not block movement and/or line of sight
     * @param {Boolean} blocked - Does the tile block player movement
     * @param {Boolean} blockSight - Does the tile block player line of sight
     */

    constructor(blocked, blockSight = undefined) {
	this.blocked = blocked;

	if (!blockSight) {
	    this.blockSight = blocked;
	} else {
	    this.blockSight = blockSight;
	}
    }
}

