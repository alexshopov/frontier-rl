import Phaser from 'phaser';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './constants'

import DungeonScene from './scenes/DungeonScene'

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
