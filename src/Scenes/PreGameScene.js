/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import 'phaser';
import config from '../Config/config';

export default class PreGameScene extends Phaser.Scene {
  constructor() {
    super('PreGame');
  }

  create() {
    this.title = this.add.text(0, 0, 'Climbing the Volcano', { fontSize: '32px', fill: '#fff' });
    this.gameContext1 = this.add.text(50, 150, 'There is a magic volcano that throws money into the air.', { fontSize: '17px', fill: '#fff' });
    this.gameContext2 = this.add.text(50, 200, 'You adventurer Red Hair is ready to climb the volcano and take the money', { fontSize: '17px', fill: '#fff' });
    this.gameContext3 = this.add.text(50, 250, 'But be careful with the flames that the volcano throws', { fontSize: '17px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.gameContext1,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.gameContext2,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.gameContext3,
      this.zone,
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
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.gameContext1,
      y: -150,
      ease: 'Power1',
      duration: 8000,
      delay: 5000,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.gameContext2,
      y: -100,
      ease: 'Power1',
      duration: 8000,
      delay: 5000,
      onComplete() {
        this.destroy;
      },
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
      }.bind(this),
    });
  }
}
