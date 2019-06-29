export default class Rectangle {
    constructor(x, y, width, height) {
	this.x1 = x;
	this.y1 = y;
	this.x2 = x + width;
	this.y2 = y + height;
    }

    center() {
	const centerX = Math.floor((this.x1 + this.x2) / 2);
	const centerY = Math.floor((this.y1 + this.y2) / 2);

	return [centerX, centerY];
    }

    intersect(other) {
	return (this.x1 <= other.x2 && 
	        this.x2 >= other.x1 &&
		this.y1 <= other.y2 &&
		this.y2 >= other.y1);
    }
}
