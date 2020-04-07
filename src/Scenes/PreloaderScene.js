import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      // eslint-disable-next-line radix
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', 'assets/images/menu/blue_button02.png');
    this.load.image('blueButton2', 'assets/images/menu/blue_button03.png');
    this.load.image('box', 'assets/images/menu/grey_box.png');
    this.load.image('checkedBox', 'assets/images/menu/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['assets/music/TownTheme.mp3']);
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('ground1', 'assets/images/platform1.png');
    this.load.image('ground2', 'assets/images/platform2.png');
    this.load.image('ground3', 'assets/images/platform3.png');
    this.load.image('ground4', 'assets/images/platform4.png');
    this.load.image('ground5', 'assets/images/platform5.png');
    this.load.image('ground6', 'assets/images/platform6.png');
    this.load.image('ground7', 'assets/images/platform7.png');
    this.load.image('ground8', 'assets/images/platform8.png');
    this.load.image('coin', 'assets/images/coins.png');
    this.load.image('fire', 'assets/images/fire.png');
    this.load.spritesheet('boy', 'assets/images/redhairboy.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet('boyhit', 'assets/images/rsz_frame-got-hit.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    this.load.plugin('rexgridtableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js', true);
    this.load.plugin('rexscrollerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscrollerplugin.min.js', true);
  }

  ready() {
    this.scene.start('Board');
    // this.scene.start('Game');
    // this.scene.start('gameOver');
    // this.scene.start('Game');
    this.readyCount += 1;
    // console.log(this.readyCount);
    if (this.readyCount === 1) {
      // this.scene.start('Title');
    }
  }
}
