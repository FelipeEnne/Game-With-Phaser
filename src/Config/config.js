/* eslint-disable no-undef */
import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 600,
      },
      debug: false,
    },
  },
};
