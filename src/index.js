import Phaser from "phaser";
//import titleScene from "./titleScene";
//import gameScene from "./gameScene";

var game;
var platforms;
var player;
var platformSmall;
var platformMedium;
var platformLarge;

window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0xa57334,
    pixelArt: true,

    scale:{
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'thegame',
      width: 414,
      height: 736
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y : 300 },
        debug: false
      }
    },
    scene: [bootGame, playGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}

class bootGame extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }
  preload() {
    this.load.image('sky', 'src/assets/sky.png');
    //this.load.image("ground", "./assets/platform.png");
    //this.load.image("diamond", "./assets/diamond.png");
    //this.load.image("woof", "./assets/woof.png");
  }
  create() {
    this.add.text(20, 20, "Loading game...").setDepth(1);
    this.add.image(0,0,"sky").setOrigin(0,0).setDepth(0);
    this.scene.start('playGame');
  }
  update() {}
}

class playGame extends Phaser.Scene {
  constructor() {
      super('playGame');
      console.log("playGame");
  }
  preload() {
    this.load.image('diamond', 'src/assets/diamond.png');
    this.load.image('platform', 'src/assets/platform.png');
    this.load.image('scarabs', 'src/assets/diamond.png');
    this.load.spritesheet('dude', 'src/assets/dude.png',{
      frameWidth: 32,
      frameHeight: 48
    });
  }
  create() {

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    player = this.physics.add.sprite(100, 450, 'dude');

    //player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, platforms, platformSmall, platformMedium, platformLarge);

    this.add.image(0,game.config.height-50,'scarabs').setOrigin(0,0);
    platformSmall = this.physics.add.staticImage(Phaser.Math.Between(-50, game.config.width), 0, 'platform').setOrigin(0,0).setDepth(0);
    platformMedium = this.physics.add.image(Phaser.Math.Between(-50, game.config.width), 0, 'platform').setOrigin(0,0).setDepth(0);
    platformLarge = this.physics.add.staticImage(Phaser.Math.Between(-50, game.config.width), 0, 'platform').setOrigin(0,0).setDepth(0);
    platformSmall.setScale(.35);
    platformMedium.setScale(.5);
    platformLarge.setScale(.75);
    platformSmall.body.allowGravity = false;
    platformSmall.body.immovable = true;
    platformMedium.body.allowGravity = false;
    platformMedium.body.immovable = true;
    platformLarge.body.allowGravity = false;
    platformLarge.body.immovable = true;
  }

  update() {
    this.movePlatform(platformSmall, 4);
    this.movePlatform(platformMedium, 2);
    this.movePlatform(platformLarge, 1);

    var cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
  }

  movePlatform(platform, speed) {
    platform.y += speed;
    if (platform.y > game.config.height) {
      this.resetPlatform(platform);
    }
  }

  resetPlatform(platform) {
    platform.y = 0;
    let randomX = Phaser.Math.Between(0, game.config.width);
    platform.x = randomX;
  }
}



