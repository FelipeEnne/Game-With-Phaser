import Phaser from 'phaser';
import Button from '../Objects/Button';
import { getGoldBoard } from '../boardGold';

const getScores = getGoldBoard();

export default class BoardScene extends Phaser.Scene {
  constructor() {
    super('Board');
  }

  create() {
    console.log(getScores);
    this.gameOverGold = this.add.text(280, 100, 'Overall Score', { fontSize: '32px', fill: '#fff' });

    this.gameOverButton = new Button(this, 650, 550, 'blueButton1', 'blueButton2', 'Play Again', 'Game');

    this.optionsOverButton = new Button(this, 150, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    let table = this.add.rexGridTable(x, y, width, height, config);

    this.getItems = (count, score) => {
      const data = ['Rank', 'User', 'Score'];

      for (let i = 0; i < count; i += 1) {
        if (score[i]) {
          data.push(i + 1);
          data.push(score[i][1]);
          data.push(score[i][0]);
        }
      }
      return data;
    };
  }
}
