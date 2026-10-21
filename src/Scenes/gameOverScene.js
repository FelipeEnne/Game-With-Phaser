/* eslint-disable import/no-unresolved */
import Phaser from "phaser";
import Button from "../Objects/Button";
import { getLocalGolds } from "../localStorage";
import { sanitizePlayerName, submitGold } from "../boardGold";

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
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "Name";
    nameInput.placeholder = "Your name";
    nameInput.maxLength = 10;
    nameInput.autocomplete = "off";
    nameInput.style.fontSize = "20px";

    const submitButton = document.createElement("input");
    submitButton.type = "button";
    submitButton.name = "submit";
    submitButton.value = "Submit your Score";
    submitButton.style.fontSize = "20px";

    div.append(nameInput, document.createElement("br"), submitButton);

    const element = this.add.dom(600, 300, div);
    element.addListener("click");

    element.on("click", (event) => {
      if (event.target.name === "submit") {
        const name = sanitizePlayerName(nameInput.value);
        if (name !== "") {
          element.removeListener("click");
          element.setVisible(false);
          this.Name = name;
          this.submit = submitGold(this.Name, gold);
          this.submit.then(() => {
            this.scene.start("Board");
          });
        }
      }
    });
  }
}
