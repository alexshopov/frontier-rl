export default class Rectangle {

    /**
     * Helper class for defining dungeon rooms using the game's grid-based coordinate system
     * @param {Number} x - Horizontal position of the rect 
     * @param {Number} y - Horizontal position of the rect 
     * @param {Number} width - Horizontal position of the rect 
     * @param {Number} height - Horizontal position of the rect 
     */

    constructor(x, y, width, height) {
	this.x1 = x;
	this.y1 = y;
	this.x2 = x + width;
	this.y2 = y + height;
    }

    /**
     * Return the center point of the rectangle
     * @return {Array} 
     */
    center() {
	const centerX = Math.floor((this.x1 + this.x2) / 2);
	const centerY = Math.floor((this.y1 + this.y2) / 2);

	return [centerX, centerY];
    }

    /**
     * Check for intersection between this and another rectangle
     * @param {Rectangle} other - Ot
     * @return {Boolean}
     */
    intersect(other) {
	return (this.x1 <= other.x2 && 
	        this.x2 >= other.x1 &&
		this.y1 <= other.y2 &&
		this.y2 >= other.y1);
    }
}
