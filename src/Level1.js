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
let ORBot;
let cursor;
let Wire;
let Gap;
let Antena;
let ORBotShow = true;

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

        ORBot = this.physics.add.sprite(400, 300, 'ORBot');
        Wire = this.physics.add.staticSprite(400, 50, 'Wire1');
        Gap = this.physics.add.staticSprite(393, 50, 'Gap');
        Antena = this.physics.add.staticSprite(616, 50, 'Antena');

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

        ORBot.setCollideWorldBounds();

        this.physics.add.collider(ORBot, Antena);
        this.physics.add.collider(ORBot, Gap, () => {
            ORBotShow = false;
            ORBot.destroy(true);
            Wire.setTexture('Wire2');
            Gap.setTexture('ORononon');
            Antena.setTexture('AntenaOn');
        });

        cursor = this.input.keyboard.createCursorKeys();
    }

    update() 
    {
        if(ORBotShow)
        {
            if(cursor.up.isDown) 
            {
                ORBot.setVelocityY(-150);
                ORBot.setVelocityX(0);
                ORBot.play('upward', true);
            } 
            
            else if (cursor.down.isDown) 
            {
                ORBot.setVelocityY(150);
                ORBot.setVelocityX(0);
                ORBot.play('downward', true);
            } 

            else if (cursor.left.isDown)
            {
                ORBot.setVelocityX(-150);
                ORBot.setVelocityY(0);
                ORBot.play('leftward', true);
            }

            else if (cursor.right.isDown)
            {
                ORBot.setVelocityX(150);
                ORBot.setVelocityY(0);
                ORBot.play('rightward', true);
            }

            else
            {
                ORBot.setVelocityX(0);
                ORBot.setVelocityY(0);
                ORBot.play('idle', true);
            }
        }
    }
}
 // Add export