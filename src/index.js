/* eslint-disable no-undef */
import 'phaser';
import config from './Config/config';
import PreGameScene from './Scenes/PreGameScene';
import GameScene from './Scenes/GameScene';
import gameOverScene from './Scenes/gameOverScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('PreGame', PreGameScene);
    this.scene.add('Game', GameScene);
    this.scene.add('gameOver', gameOverScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
