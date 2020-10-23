import Phaser from "phaser";
//import titleScene from "./titleScene";
//import gameScene from "./gameScene";

var game;
var player;
var startingPlatform;
var fallingPlatform;
var fallingPlatform1;
var fallingPlatform2;
var fallingPlatform3;
var fallingPlatform4;
var fallingPlatform5;
var fallingPlatform6;

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
        gravity: { y : 1600 },
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
    fallingPlatform = this.physics.add.image(Phaser.Math.Between(-50, game.config.width),0,'diamond').setScale(1);
    this.physics.add.existing(fallingPlatform, true);
    fallingPlatform.body.allowGravity = false;
    fallingPlatform.body.immovable = true;

    fallingPlatform1 = this.physics.add.image(Phaser.Math.Between(-50, game.config.width),-200,'diamond').setScale(2);
    this.physics.add.existing(fallingPlatform1, true);
    fallingPlatform1.body.allowGravity = false;
    fallingPlatform1.body.immovable = true;

    fallingPlatform2 = this.physics.add.image(Phaser.Math.Between(-50, game.config.width),0,'diamond').setScale(3);
    this.physics.add.existing(fallingPlatform2, true);
    fallingPlatform2.body.allowGravity = false;
    fallingPlatform2.body.immovable = true;

    fallingPlatform3 = this.physics.add.image(Phaser.Math.Between(-50, game.config.width),-100,'diamond').setScale(2);
    this.physics.add.existing(fallingPlatform3, true);
    fallingPlatform3.body.allowGravity = false;
    fallingPlatform3.body.immovable = true;

    fallingPlatform4 = this.physics.add.image(Phaser.Math.Between(-50, game.config.width),0,'diamond').setScale(1.5);
    this.physics.add.existing(fallingPlatform4, true);
    fallingPlatform4.body.allowGravity = false;
    fallingPlatform4.body.immovable = true;

    fallingPlatform5 = this.physics.add.image(Phaser.Math.Between(-50, game.config.width),-300,'diamond').setScale(1.5);
    this.physics.add.existing(fallingPlatform5, true);
    fallingPlatform5.body.allowGravity = false;
    fallingPlatform5.body.immovable = true;

    fallingPlatform6 = this.physics.add.image(Phaser.Math.Between(-50, game.config.width),-400,'diamond').setScale(4.5);
    this.physics.add.existing(fallingPlatform6, true);
    fallingPlatform6.body.allowGravity = false;
    fallingPlatform6.body.immovable = true;

    startingPlatform = this.physics.add.staticGroup();

    startingPlatform.create(400, 710, 'platform').setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 450, 'dude');
    
    player.setBounce(0);
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

    this.physics.add.collider(player, startingPlatform);
    this.physics.add.collider(player, fallingPlatform);
    this.physics.add.collider(player, fallingPlatform1);
    this.physics.add.collider(player, fallingPlatform2);
    this.physics.add.collider(player, fallingPlatform3);
    this.physics.add.collider(player, fallingPlatform4);
    this.physics.add.collider(player, fallingPlatform5);
    this.physics.add.collider(player, fallingPlatform6);
  }

  update() {
    this.movePlatform(fallingPlatform, .75);
    this.movePlatform(fallingPlatform1, 1.5);
    this.movePlatform(fallingPlatform2, .5);
    this.movePlatform(fallingPlatform3, 1);
    this.movePlatform(fallingPlatform4, 2);
    this.movePlatform(fallingPlatform5, 1.25);
    this.movePlatform(fallingPlatform6, .65);

    var cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown)
    {
        player.setVelocityX(-360);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(360);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-930);
    }
  }

  movePlatform(platform, speed) {
    platform.y += speed;
    if (platform.y > game.config.height) {
      this.resetPlatform(platform);
    }
  }

  resetPlatform(platform) {
    platform.y = -100;
    let randomX = Phaser.Math.Between(0, game.config.width);
    platform.x = randomX;
  }
}



