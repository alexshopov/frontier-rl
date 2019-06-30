export default class Tile {
    /*
     * generic map tile. May or may not block movement and/or line of sight
     */

    /*
     * @param {bool} blocked
     * @param {bool} blockSight
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

