//importing game assets
import Phaser from 'phaser';
import ORSprite from './assets/ORbot/ORanimationSprites.png';
import Wire1 from './assets/wire1.png';
import Wire2 from './assets/wire2.png';
import ORononon from './assets/ORbot/ORononon.png';
import gap from './assets/Gap.png';
import antena from './assets/AntenaLeftoff.png';
import antenaon from './assets/AntenaLefton.png';

//game variables needs to change while transfering to another file
let gameState = {
    ORBotShow : true
}

class Level1 extends Phaser.Scene
{
    constructor ()
    {
        //add a key while transfering
        super({key: 'Level1'});
    }

    preload ()
    {
        this.load.spritesheet('ORBot', ORSprite , {frameWidth: 32, frameHeight: 32});
        this.load.image('Wire1', Wire1);
        this.load.image('Wire2', Wire2);
        this.load.image('ORononon', ORononon);
        this.load.image('Gap', gap);
        this.load.image('Antena', antena);
        this.load.image('AntenaOn', antenaon);
    }
      
    create ()
    {
        const background = this.add.rectangle(400, 300, 750, 575, 0xffffff);

        gameState.ORBot = this.physics.add.sprite(400, 300, 'ORBot');
        gameState.Wire = this.physics.add.staticSprite(400, 50, 'Wire1');
        gameState.Gap = this.physics.add.staticSprite(393, 50, 'Gap');
        gameState.Antena = this.physics.add.staticSprite(616, 50, 'Antena');

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('ORBot', {
                frames: [0,1,1,0,2,2]
            }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'upward',
            frames: this.anims.generateFrameNames('ORBot', {
                frames: [3,4,3,4]
            }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'downward',
            frames: this.anims.generateFrameNames('ORBot', {
                frames: [9,10,9,10]
            }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'leftward',
            frames: this.anims.generateFrameNames('ORBot',{
                frames: [7,8,7,8]
            }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'rightward',
            frames: this.anims.generateFrameNames('ORBot',{
                frames: [5,6,5,6]
            }),
            frameRate: 12,
            repeat: -1
        });

        gameState.ORBot.setCollideWorldBounds();

        this.physics.add.collider(gameState.ORBot, gameState.Antena);
        this.physics.add.collider(gameState.ORBot, gameState.Gap, () => {
            gameState.ORBotShow = false;
            gameState.ORBot.destroy(true);
            gameState.Wire.setTexture('Wire2');
            gameState.Gap.setTexture('ORononon');
            gameState.Antena.setTexture('AntenaOn');
        });

        gameState.cursor = this.input.keyboard.createCursorKeys();
    }

    update() 
    {
        if(gameState.ORBotShow)
        {
            if(gameState.cursor.up.isDown) 
            {
                gameState.ORBot.setVelocityY(-150);
                gameState.ORBot.setVelocityX(0);
                gameState.ORBot.play('upward', true);
            } 
            
            else if (gameState.cursor.down.isDown) 
            {
                gameState.ORBot.setVelocityY(150);
                gameState.ORBot.setVelocityX(0);
                gameState.ORBot.play('downward', true);
            } 

            else if (gameState.cursor.left.isDown)
            {
                gameState.ORBot.setVelocityX(-150);
                gameState.ORBot.setVelocityY(0);
                gameState.ORBot.play('leftward', true);
            }

            else if (gameState.cursor.right.isDown)
            {
                gameState.ORBot.setVelocityX(150);
                gameState.ORBot.setVelocityY(0);
                gameState.ORBot.play('rightward', true);
            }

            else
            {
                gameState.ORBot.setVelocityX(0);
                gameState.ORBot.setVelocityY(0);
                gameState.ORBot.play('idle', true);
            }
        }
    }
}
 // Add export

 export { Level1 };