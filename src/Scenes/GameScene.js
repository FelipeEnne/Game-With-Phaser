/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import 'phaser';

let player;
let cursors;
let stars;
let platforms;
let score = 0;
let scoreText;
let bombs;

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
    this.load.image('star', 'assets/images/star.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.spritesheet('boy', 'assets/images/redhairboy.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground1').setScale(2).refreshBody();

    platforms.create(750, 480, 'ground2');
    platforms.create(300, 450, 'ground3');
    platforms.create(750, 350, 'ground4');


    player = this.physics.add.sprite(100, 450, 'boy');

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

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);

    // eslint-disable-next-line no-shadow
    function collectStar(player, star) {
      star.disableBody(true, true);

      score += 10;
      scoreText.setText(`Score: ${score}`);

      if (stars.countActive(true) === 0) {
        stars.children.iterate((child) => {
          child.enableBody(true, child.x, 0, true, true);
        });

        const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        const bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }

    this.physics.add.overlap(player, stars, collectStar, null, this);

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
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
}
