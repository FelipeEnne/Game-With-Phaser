/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import config from '../src/Config/config';
import PreGameScene from '../src/Scenes/PreGameScene';
import GameScene from '../src/Scenes/GameScene';
import gameOverScene from '../src/Scenes/gameOverScene';
import BoardScene from '../src/Scenes/BoardScene';
import BootScene from '../src/Scenes/BootScene';
import PreloaderScene from '../src/Scenes/PreloaderScene';
import TitleScene from '../src/Scenes/TitleScene';
import OptionsScene from '../src/Scenes/OptionsScene';
import CreditsScene from '../src/Scenes/CreditsScene';
import Model from '../src/Model';

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
    this.scene.add('Board', BoardScene);
    this.scene.start('Boot');
  }
}

function game() {
  const gameStart = new Game();

  return gameStart;
}

export default game;
