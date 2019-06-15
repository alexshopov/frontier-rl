import 'phaser';
import DungeonScene from './scenes/dungeon'

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

const config = {
    type: Phaser.CANVAS,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    physics: {
	default: 'arcade'
    },
    scene: [
	DungeonScene
    ]
};

const game = new Phaser.Game(config);
