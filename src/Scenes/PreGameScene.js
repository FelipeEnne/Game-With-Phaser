import 'phaser';
import config from '../Config/config';

export default class PreGameScene extends Phaser.Scene {
  constructor () {
    super('PreGame');
  }

  create () {
    this.title = this.add.text(0, 0, 'Scape Game', { fontSize: '32px', fill: '#fff' });
    this.gameContext1 = this.add.text(50, 150, 'You were playing in the forest you were kidnapped by bandits.', { fontSize: '17px', fill: '#fff' });
    this.gameContext2 = this.add.text(50, 200, 'Luckily the bandit who was on guard slept and you managed to escape.', { fontSize: '17px', fill: '#fff' });
    this.gameContext3 = this.add.text(50, 250, 'Now you must run away and find your way home.', { fontSize: '17px', fill: '#fff' });
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.gameContext1,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.gameContext2,
      this.zone
    );

    Phaser.Display.Align.In.Center(
        this.gameContext3,
        this.zone
    );

    this.gameContext1.setY(400);
    this.gameContext2.setY(450);
    this.gameContext3.setY(500);

    this.creditsTween = this.tweens.add({
      targets: this.title,
      y: -250,
      ease: 'Power1',
      duration: 8000,
      delay: 5000,
      onComplete: function () {
        this.destroy;
      }
    });

    this.madeByTween = this.tweens.add({
      targets: this.gameContext1,
      y: -150,
      ease: 'Power1',
      duration: 8000,
      delay: 5000,
      onComplete: function () {
        this.destroy;
      }
    });

    this.madeByTween = this.tweens.add({
        targets: this.gameContext2,
        y: -100,
        ease: 'Power1',
        duration: 8000,
        delay: 5000,
        onComplete: function () {
          this.destroy;
        }
      });

    this.madeByTween = this.tweens.add({
      targets: this.gameContext3,
      y: -50,
      ease: 'Power1',
      duration: 8000,
      delay: 5000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Game');
      }.bind(this)
    });
  }
};