import Phaser from 'phaser';
import Button from '../Objects/Button';
import { getGoldBoard } from '../boardGold';


export default class BoardScene extends Phaser.Scene {
  constructor() {
    super('Board');
  }

  create() {
    this.getScores = getGoldBoard();

    this.gameOverGold = this.add.text(280, 100, 'Overall Score', { fontSize: '32px', fill: '#fff' });

    this.gameOverButton = new Button(this, 650, 550, 'blueButton1', 'blueButton2', 'Play Again', 'Game');

    this.optionsOverButton = new Button(this, 150, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.geralData = [];

    let table;

    this.getItems = (score) => {
      const data = [];
      let i = 0;

      while (score[i] !== undefined) {
        if (score[i]) {
          data.push(score[i][0]);
          data.push(score[i][1]);
        }
        i += 1;
      }
      return data;
    };

    this.getScores.then((scores) => {
      this.geralData.push(this.getItems(scores));


      let i = 1;
      const newCellObject = (scene, cell) => {
        const bg = scene.add.graphics()
          .fillStyle(0x555555)
          .fillRect(2, 2, 200 - 2, 50 - 2);
        const txt = scene.add.text(10, 20, cell.index + 1);

        const txt1 = scene.add.text(150, 20, this.geralData[0][i - 1]);
        const txt2 = scene.add.text(30, 20, this.geralData[0][i].substring(0, 10));
        const container = scene.add.container(0, 0, [bg, txt, txt1, txt2]);
        i += 2;
        return container;
      };

      const onCellVisible = function (cell) {
        cell.setContainer(newCellObject(this, cell));
      };

      table = this.add.rexGridTable(425, 300, 250, 300, {
        cellWidth: 200,
        cellHeight: 50,
        cellsCount: 20,
        columns: 1,
        cellVisibleCallback: onCellVisible.bind(this),
        clamplTableOXY: false,
      });

    });


    this.table = table;
    this.scrollerState = this.add.text(0, 0, '');
  }


}
