/* eslint-disable no-undef */
import 'phaser';
import Button from '../Objects/Button';
import { getLocalGolds } from '../localStorage';


export default class gameOverScene extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  create() {
    this.gameOverhistory = this.add.text(40, 50, 'You were hurt by the fireball and had to go back to your home.', { fontSize: '20px', fill: '#fff' });

    this.gameOverGold = this.add.text(200, 200, `You collected ${getLocalGolds()[0]} golds`, { fontSize: '32px', fill: '#fff' });

    this.gameOverButton = new Button(this, 650, 550, 'blueButton1', 'blueButton2', 'Play Again', 'Game');

    this.optionsOverButton = new Button(this, 150, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');


    this.userName = '';

    const div = document.createElement('div');
    div.innerHTML = `<div style="height:100px width: 200px background-color: white;" >
      <input type="text" id="name" placeholder="Your name" style="font-size: 15px width: 200px"><br>
      <input type="button" name="submitButton" value="Submit Score" style="font-size: 15px"></div>
    `;

    const element = this.add.dom(400, 480, div);
    element.addListener('click');

    element.on('click', (event) => {
      if (event.target.name === 'submitButton') {
        const inputText = document.getElementById('nameField');
        if (inputText.value !== '') {
          element.removeListener('click');
          element.setVisible(false);
          this.userName = inputText.value;
          this.submit = submitHighScore(this.userName, this.scores[0]);
          this.submit.then(() => {
            this.scene.start('SceneLeaderBoard');
          });
        }
      }
    });
  }

  ready() {
    this.load.on('complete', () => {
      gameOverhistory.destroy();
      gameOverGold.destroy();
      gameOverButton.destroy();
      optionsOverButton.destroy();
      this.ready();
    });
  }
}
