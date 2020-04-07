import Phaser from 'phaser';
import { getGoldBoard } from '../boardGold';

let getScores = getGoldBoard();

export default class BoardScene extends Phaser.Scene {
  constructor() {
    super('Board');
  }

  create() {
    console.log(getScores);
  }
}
