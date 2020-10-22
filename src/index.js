import Phaser from "phaser";
import sky from "./assets/sky.png";
import ground from "./assets/platform.png";
import diamond from "./assets/diamond.png";
import woof from "./assets/woof.png";

//const gameHeight = window.innerHeight;
//const gameWidth = window.innerWidth;
const gameHeight = 600;
const gameWidth = 800;

const config = {
  type: Phaser.AUTO,
  parent: "",
  width: gameWidth,
  height: gameHeight,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

let platforms;

function preload() {
  this.load.image("sky", sky);
  this.load.image("ground", ground);
  this.load.image("diamond", diamond);
  this.load.image("woof", woof);
}

function create() {
  Phaser.Scene
  //this.physics.startSystem(Phaser.Physics.Arcade)
console.log(gameHeight)
  //game.add.image(0,0, 'sky');
  let sprite = this.add.sprite(0,0,'sky').setOrigin(0).setDepth(0);
  //sprite.displayWidth = innerWidth;
  //sprite.displayHeight = innerHeight;
  platforms = this.add.group();
  platforms.enableBody = true;
  let ground = platforms.create(0, Phaser.Scene.height - 64, 'ground');
  //ground.scale.setTo(2,2);
  ground.body.immovable = true;

  let ledge = plaforms.create(400, 450, 'ground');
  ledge.body.immovable = true;

  ledge = platforms.create(-75, 350, 'ground');
  ledge.body.immovable = true;
}
function update() {}
