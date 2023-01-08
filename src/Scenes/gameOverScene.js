/* eslint-disable import/no-unresolved */
import Phaser from "phaser";
import Button from "../Objects/Button";
import { getLocalGolds } from "../localStorage";
import { submitGold } from "../boardGold";

export default class gameOverScene extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  create() {
    const gold = getLocalGolds();

    this.gameOverhistory = this.add.text(
      40,
      50,
      "You were hurt by the fireball and had to go back to your home.",
      { fontSize: "20px", fill: "#fff" }
    );

    this.gameOverGold = this.add.text(200, 200, `You collected ${gold} golds`, {
      fontSize: "32px",
      fill: "#fff",
    });

    this.gameOverButton = new Button(
      this,
      650,
      550,
      "blueButton1",
      "blueButton2",
      "Play Again",
      "Game"
    );

    this.optionsOverButton = new Button(
      this,
      150,
      550,
      "blueButton1",
      "blueButton2",
      "Menu",
      "Title"
    );

    this.userName = "";

    const div = document.createElement("div");
    div.innerHTML = `
      <input type="text" id="Name" placeholder="Your name" style="font-size: 20px" max="10" min="1"><br>
      <input type="button" name="submit" value="Submit your Score" style="font-size: 20px">
    `;

    const element = this.add.dom(600, 300, div);
    element.addListener("click");

    element.on("click", (event) => {
      if (event.target.name === "submit") {
        const inputText = document.getElementById("Name");
        if (inputText.value !== "") {
          element.removeListener("click");
          element.setVisible(false);
          this.Name = inputText.value;
          this.submit = submitGold(this.Name, gold);
          this.submit.then(() => {
            this.scene.start("Board");
          });
        }
      }
    });
  }

  ready() {
    this.load.on("complete", () => {
      this.gameOverhistory.destroy();
      this.gameOverGold.destroy();
      this.gameOverButton.destroy();
      this.optionsOverButton.destroy();
      this.element.destroy();
      this.ready();
    });
  }
}
