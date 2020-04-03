/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import 'phaser';


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

let score = 0;
let scoreText;
let bombs;

const arrPlatformI = [];
const arrPlatformX = [];
const arrCoinsXY = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

function generatePlataformI(min, max) {
  for (let i = 0; i < 5; i += 1) {
    arrPlatformI.push(getRandomInt(min, max));
  }
}

function generatePlataformX(min, max) {
  for (let i = 0; i < 4; i += 1) {
    arrPlatformX.push(getRandomInt(min, max));
  }
}

function generateCoinsXY(min, max) {
  for (let i = 0; i < 5; i += 1) {
    arrCoinsXY.push(getRandomInt(min, max));
    arrCoinsXY.push(getRandomInt(min, max));
  }
}


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }


  preload() {
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('ground1', 'assets/images/platform1.png');
    this.load.image('ground2', 'assets/images/platform2.png');
    this.load.image('ground3', 'assets/images/platform3.png');
    this.load.image('ground4', 'assets/images/platform4.png');
    this.load.image('ground5', 'assets/images/platform5.png');
    this.load.image('ground6', 'assets/images/platform6.png');
    this.load.image('ground7', 'assets/images/platform7.png');
    this.load.image('ground8', 'assets/images/platform8.png');
    this.load.image('coin', 'assets/images/coins.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.spritesheet('boy', 'assets/images/redhairboy.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    // main img
    this.add.image(400, 300, 'sky');

    // plataform
    platforms = this.physics.add.staticGroup();

    generatePlataformI(2, 8);
    // console.log(arrPlatformI);

    generatePlataformX(200, 600);
    // console.log(arrPlatformX);

    platforms.create(400, 580, 'ground1').setScale(2).refreshBody();
    platforms.create(700, 150, `ground${arrPlatformI[0]}`);


    platforms1 = this.physics.add.image(arrPlatformX[1], 470, `ground${arrPlatformI[0]}`);
    platforms1.body.setAllowGravity(false);
    platforms1.setImmovable(true);

    platforms2 = this.physics.add.image(arrPlatformX[2], 390, `ground${arrPlatformI[1]}`);
    platforms2.body.setAllowGravity(false);
    platforms2.setImmovable(true);

    platforms3 = this.physics.add.image(arrPlatformX[4], 310, `ground${arrPlatformI[2]}`);
    platforms3.body.setAllowGravity(false);
    platforms3.setImmovable(true);

    platforms4 = this.physics.add.image(arrPlatformX[3], 230, `ground${arrPlatformI[3]}`);
    platforms4.body.setAllowGravity(false);
    platforms4.setImmovable(true);

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

    cursors = this.input.keyboard.createCursorKeys();

    generateCoinsXY(200, 600);
    console.log(arrCoinsXY);
    coins = this.physics.add.group({
      key: 'coin',
      repeat: getRandomInt(2, 7),
      setXY: {
        x: getRandomInt(0, 200),
        y: getRandomInt(0, 200),
        stepY: getRandomInt(20, 40),
        stepX: getRandomInt(50, 100),
      },
    });

    coins.children.iterate((child) => {
      child.setBounceY(0);
    });

    this.physics.add.collider(coins, platforms);
    this.physics.add.collider(coins, platforms1);
    this.physics.add.collider(coins, platforms2);
    this.physics.add.collider(coins, platforms3);
    this.physics.add.collider(coins, platforms4);

    // eslint-disable-next-line no-shadow
    function collectStar(player, star) {
      star.disableBody(true, true);

      score += 10;
      scoreText.setText(`Score: ${score}`);

      if (coins.countActive(true) === 0) {
        coins.children.iterate((child) => {
          child.enableBody(true, child.x, 0, true, true);
        });

        const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        const bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }

    this.physics.add.overlap(player, coins, collectStar, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    // eslint-disable-next-line no-shadow
    function hitBomb(player) {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      gameOver = true;
    }

    this.physics.add.collider(player, bombs, hitBomb, null, this);
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
      platforms1.setVelocityX(-120);
    }


    if (platforms2.x < 800 && logicPlatforms2 === 0) {
      platforms2.setVelocityX(120);
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
      platforms3.setVelocityX(-120);
    }

    if (platforms4.x < 800 && logicPlatforms4 === 0) {
      platforms4.setVelocityX(120);
      if (platforms4.x > 700) {
        logicPlatforms4 = 1;
      }
    } else {
      if (platforms4.x < 100) {
        logicPlatforms4 = 0;
      }
      platforms4.setVelocityX(-120);
    }
  }
}
