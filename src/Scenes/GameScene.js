/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
import Phaser from "phaser";
import { storeGolds } from "../localStorage";

function getRandomInt(min, max) {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
    Math.ceil(min)
  );
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.gold = 0;
    this.logicPlatforms1 = 0;
    this.logicPlatforms2 = 1;
    this.logicPlatforms3 = 0;
    this.logicPlatforms4 = 1;
    this.logicPlatforms5 = 0;
    this.arrPlatformI = [];
    this.arrPlatformX = [];

    for (let i = 0; i < 5; i += 1) {
      this.arrPlatformI.push(getRandomInt(2, 8));
      this.arrPlatformX.push(getRandomInt(200, 600));
    }

    this.add.image(400, 300, "sky");

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 580, "ground1").setScale(2).refreshBody();

    this.platforms1 = this.physics.add.image(
      this.arrPlatformX[0],
      470,
      `ground${this.arrPlatformI[0]}`
    );
    this.platforms1.body.setAllowGravity(false);
    this.platforms1.setImmovable(true);

    this.platforms2 = this.physics.add.image(
      this.arrPlatformX[1],
      390,
      `ground${this.arrPlatformI[1]}`
    );
    this.platforms2.body.setAllowGravity(false);
    this.platforms2.setImmovable(true);

    this.platforms3 = this.physics.add.image(
      this.arrPlatformX[2],
      310,
      `ground${this.arrPlatformI[2]}`
    );
    this.platforms3.body.setAllowGravity(false);
    this.platforms3.setImmovable(true);

    this.platforms4 = this.physics.add.image(
      this.arrPlatformX[3],
      230,
      `ground${this.arrPlatformI[3]}`
    );
    this.platforms4.body.setAllowGravity(false);
    this.platforms4.setImmovable(true);

    this.platforms5 = this.physics.add.image(
      this.arrPlatformX[4],
      150,
      `ground${this.arrPlatformI[4]}`
    );
    this.platforms5.body.setAllowGravity(false);
    this.platforms5.setImmovable(true);

    this.player = this.physics.add.sprite(25, 500, "boy");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("boy", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "boy", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("boy", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.platforms1);
    this.physics.add.collider(this.player, this.platforms2);
    this.physics.add.collider(this.player, this.platforms3);
    this.physics.add.collider(this.player, this.platforms4);
    this.physics.add.collider(this.player, this.platforms5);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.coins = this.physics.add.group({
      key: "coin",
      repeat: getRandomInt(4, 8),
      setXY: {
        x: getRandomInt(0, 200),
        y: 0,
        stepX: getRandomInt(50, 100),
      },
    });

    this.coins.children.iterate((child) => {
      child.setBounceY(0);
      child.setCollideWorldBounds(true);
    });

    const collideObjects = () => {
      this.coins.setVelocityX(0);
    };

    this.physics.add.collider(
      this.coins,
      this.platforms,
      collideObjects,
      null,
      this
    );
    this.physics.add.collider(
      this.coins,
      this.platforms1,
      collideObjects,
      null,
      this
    );
    this.physics.add.collider(
      this.coins,
      this.platforms2,
      collideObjects,
      null,
      this
    );
    this.physics.add.collider(
      this.coins,
      this.platforms3,
      collideObjects,
      null,
      this
    );
    this.physics.add.collider(
      this.coins,
      this.platforms4,
      collideObjects,
      null,
      this
    );
    this.physics.add.collider(
      this.coins,
      this.platforms5,
      collideObjects,
      null,
      this
    );

    const collectStar = (player, coin) => {
      coin.disableBody(true, true);

      this.gold += 10;
      this.goldText.setText(`Gold: ${this.gold}`);

      if (this.coins.countActive(true) === 0) {
        this.coins.children.iterate((child) => {
          child.enableBody(true, getRandomInt(0, 800), 0, true, true);
        });
        for (let i = 0; i < Math.round(this.gold / 100); i += 1) {
          const fire = this.fires.create(
            Phaser.Math.Between(0, 800),
            16,
            "fire"
          );
          fire.setBounce(0);
        }
      }
    };

    this.physics.add.overlap(this.player, this.coins, collectStar, null, this);

    this.goldText = this.add.text(16, 16, "Gold: 0", {
      fontSize: "32px",
      fill: "#FFF",
    });

    this.fires = this.physics.add.group();

    const hitfire = (player) => {
      storeGolds(this.gold);
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play("turn");
      this.scene.start("gameOver");
    };

    this.physics.add.collider(this.player, this.fires, hitfire, null, this);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (this.platforms1.x < 800 && this.logicPlatforms1 === 0) {
      this.platforms1.setVelocityX(120);
      if (this.platforms1.x > 700) {
        this.logicPlatforms1 = 1;
      }
    } else {
      if (this.platforms1.x < 100) {
        this.logicPlatforms1 = 0;
      }
      this.platforms1.setVelocityX(-150);
    }

    if (this.platforms2.x < 800 && this.logicPlatforms2 === 0) {
      this.platforms2.setVelocityX(150);
      if (this.platforms2.x > 700) {
        this.logicPlatforms2 = 1;
      }
    } else {
      if (this.platforms2.x < 100) {
        this.logicPlatforms2 = 0;
      }
      this.platforms2.setVelocityX(-120);
    }

    if (this.platforms3.x < 800 && this.logicPlatforms3 === 0) {
      this.platforms3.setVelocityX(120);
      if (this.platforms3.x > 700) {
        this.logicPlatforms3 = 1;
      }
    } else {
      if (this.platforms3.x < 100) {
        this.logicPlatforms3 = 0;
      }
      this.platforms3.setVelocityX(-150);
    }

    if (this.platforms4.x < 800 && this.logicPlatforms4 === 0) {
      this.platforms4.setVelocityX(150);
      if (this.platforms4.x > 700) {
        this.logicPlatforms4 = 1;
      }
    } else {
      if (this.platforms4.x < 100) {
        this.logicPlatforms4 = 0;
      }
      this.platforms4.setVelocityX(-120);
    }

    if (this.platforms5.x < 800 && this.logicPlatforms5 === 0) {
      this.platforms5.setVelocityX(120);
      if (this.platforms5.x > 700) {
        this.logicPlatforms5 = 1;
      }
    } else {
      if (this.platforms5.x < 100) {
        this.logicPlatforms5 = 0;
      }
      this.platforms5.setVelocityX(-150);
    }
  }
}
