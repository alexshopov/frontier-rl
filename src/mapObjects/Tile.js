export default class Tile {
    constructor(blocked, blockSight = undefined) {
	this.blocked = blocked;

	if (!blockSight) {
	    this.blockSight = blocked;
	} else {
	    this.blockSight = blockSight;
	}
    }
}

