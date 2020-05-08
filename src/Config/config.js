/* eslint-disable no-undef */
import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'divId',
  dom: {
    createContainer: true,
  },
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 500,
      },
      debug: false,
    },
  },
};
