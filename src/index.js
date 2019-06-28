import Phaser from 'phaser';
import DungeonScene from './scenes/DungeonScene'

const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 800;

const config = {
    type: Phaser.AUTO,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    physics: {
	default: 'arcade',
	arcade: {
	    gravity: { y: 0 }
	}
    },
    scene: DungeonScene
};

const game = new Phaser.Game(config);
