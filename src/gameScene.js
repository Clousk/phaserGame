class gameScene extends Phaser.Scene {
  
    constructor() {
        super('PlayGame');
        console.log("gameScene");
    }
    
    create() {
      this.add.text(20, 20, "Loading game...asdgasgasgasdgasdgasg");
      //this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "black"});
    }
    update() {}
  }