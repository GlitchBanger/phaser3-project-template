import { Level1 } from "./Level1";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Level1,
    physics: {
        default: 'arcade',
        debug: true
    },
    pixelArt: true,
};

const game = new Phaser.Game(config);
