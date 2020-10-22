class titleScene extends Phaser.Scene {
    constructor() {
      super('Splash');
      console.log("titleScene");
    }
    preload() {
      /*this.load.image('sky', sky);
      this.load.image("ground", ground);
      this.load.image("diamond", diamond);
      this.load.image("woof", woof);*/
    }
    create() {
      this.add.text(20, 20, "Loading game...");
    }
    update() {}
  }