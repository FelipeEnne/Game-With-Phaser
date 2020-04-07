/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import { storeGolds } from '../localStorage';

let player;
let cursors;
let coins;

let platforms;
let platforms1;
let logicPlatforms1 = 0;
let platforms2;
let logicPlatforms2 = 1;
let platforms3;
let logicPlatforms3 = 0;
let platforms4;
let logicPlatforms4 = 1;
let platforms5;
let logicPlatforms5 = 0;

// eslint-disable-next-line import/no-mutable-exports
let gold;
let goldText;
let fires;

const arrPlatformI = [];
const arrPlatformX = [];


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

function generatePlataformI(min, max) {
  for (let i = 0; i < 5; i += 1) {
    arrPlatformI.push(getRandomInt(min, max));
  }
}

function generatePlataformX(min, max) {
  for (let i = 0; i < 5; i += 1) {
    arrPlatformX.push(getRandomInt(min, max));
  }
}


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    gold = 0;
    // main img
    this.add.image(400, 300, 'sky');

    // plataform
    platforms = this.physics.add.staticGroup();

    generatePlataformI(2, 8);

    generatePlataformX(200, 600);

    platforms.create(400, 580, 'ground1').setScale(2).refreshBody();

    platforms1 = this.physics.add.image(arrPlatformX[0], 470, `ground${arrPlatformI[0]}`);
    platforms1.body.setAllowGravity(false);
    platforms1.setImmovable(true);

    platforms2 = this.physics.add.image(arrPlatformX[1], 390, `ground${arrPlatformI[1]}`);
    platforms2.body.setAllowGravity(false);
    platforms2.setImmovable(true);

    platforms3 = this.physics.add.image(arrPlatformX[2], 310, `ground${arrPlatformI[2]}`);
    platforms3.body.setAllowGravity(false);
    platforms3.setImmovable(true);

    platforms4 = this.physics.add.image(arrPlatformX[3], 230, `ground${arrPlatformI[3]}`);
    platforms4.body.setAllowGravity(false);
    platforms4.setImmovable(true);

    platforms5 = this.physics.add.image(arrPlatformX[4], 150, `ground${arrPlatformI[4]}`);
    platforms5.body.setAllowGravity(false);
    platforms5.setImmovable(true);

    // player
    player = this.physics.add.sprite(25, 500, 'boy');


    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('boy', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'boy', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('boy', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(player, platforms);

    this.physics.add.collider(player, platforms1);
    this.physics.add.collider(player, platforms2);
    this.physics.add.collider(player, platforms3);
    this.physics.add.collider(player, platforms4);
    this.physics.add.collider(player, platforms5);

    cursors = this.input.keyboard.createCursorKeys();

    // coins
    coins = this.physics.add.group({
      key: 'coin',
      repeat: getRandomInt(4, 8),
      setXY: {
        x: getRandomInt(0, 200),
        y: 0,
        stepX: getRandomInt(50, 100),
      },
    });

    coins.children.iterate((child) => {
      child.setBounceY(0);
      child.setCollideWorldBounds(true);
    });

    function collideObjects() {
      coins.setVelocityX(0);
      // console.log('hit');
    }


    this.physics.add.collider(coins, platforms, collideObjects, null, this);
    this.physics.add.collider(coins, platforms1, collideObjects, null, this);
    this.physics.add.collider(coins, platforms2, collideObjects, null, this);
    this.physics.add.collider(coins, platforms3, collideObjects, null, this);
    this.physics.add.collider(coins, platforms4, collideObjects, null, this);
    this.physics.add.collider(coins, platforms5, collideObjects, null, this);

    // eslint-disable-next-line no-shadow
    function collectStar(player, coin) {
      coin.disableBody(true, true);

      gold += 10;
      goldText.setText(`Gold: ${gold}`);

      if (coins.countActive(true) === 0) {
        coins.children.iterate((child) => {
          child.enableBody(true, getRandomInt(0, 800), 0, true, true);
        });
        //for (let i = 0; i < Math.round(gold / 100); i += 1) {
        for (let i = 0; i < 10; i += 1) {
          const fire = fires.create(Phaser.Math.Between(0, 800), 16, 'fire');
          fire.setBounce(0);
        }
      }
    }

    this.physics.add.overlap(player, coins, collectStar, null, this);

    goldText = this.add.text(16, 16, 'Gold: 0', { fontSize: '32px', fill: '#FFF' });

    fires = this.physics.add.group();


    // eslint-disable-next-line no-shadow
    function hitfire(player) {
      storeGolds(gold);
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      this.scene.start('gameOver');
    }

    this.physics.add.collider(player, fires, hitfire, null, this);
  }


  ready() {
    this.load.on('complete', () => {
      player.destroy();
      platforms.destroy();
      platforms1.destroy();
      platforms2.destroy();
      platforms3.destroy();
      platforms4.destroy();
      platforms5.destroy();
      coins.destroy();
      fires.destroy();
      this.ready();
    });
  }


  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-300);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(300);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }


    if (platforms1.x < 800 && logicPlatforms1 === 0) {
      platforms1.setVelocityX(120);
      if (platforms1.x > 700) {
        logicPlatforms1 = 1;
      }
    } else {
      if (platforms1.x < 100) {
        logicPlatforms1 = 0;
      }
      platforms1.setVelocityX(-150);
    }


    if (platforms2.x < 800 && logicPlatforms2 === 0) {
      platforms2.setVelocityX(150);
      if (platforms2.x > 700) {
        logicPlatforms2 = 1;
      }
    } else {
      if (platforms2.x < 100) {
        logicPlatforms2 = 0;
      }
      platforms2.setVelocityX(-120);
    }


    if (platforms3.x < 800 && logicPlatforms3 === 0) {
      platforms3.setVelocityX(120);
      if (platforms3.x > 700) {
        logicPlatforms3 = 1;
      }
    } else {
      if (platforms3.x < 100) {
        logicPlatforms3 = 0;
      }
      platforms3.setVelocityX(-150);
    }

    if (platforms4.x < 800 && logicPlatforms4 === 0) {
      platforms4.setVelocityX(150);
      if (platforms4.x > 700) {
        logicPlatforms4 = 1;
      }
    } else {
      if (platforms4.x < 100) {
        logicPlatforms4 = 0;
      }
      platforms4.setVelocityX(-120);
    }

    if (platforms5.x < 800 && logicPlatforms5 === 0) {
      platforms5.setVelocityX(120);
      if (platforms5.x > 700) {
        logicPlatforms5 = 1;
      }
    } else {
      if (platforms5.x < 100) {
        logicPlatforms5 = 0;
      }
      platforms5.setVelocityX(-150);
    }
  }
}
