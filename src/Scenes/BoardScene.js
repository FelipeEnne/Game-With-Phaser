import Phaser from 'phaser';
import { getGoldBoard } from '../boardGold';


export default class BoardScene extends Phaser.Scene {
  constructor() {
    super('Board');
  }

  create() {
    console.log(getGoldBoard);
  }
}
