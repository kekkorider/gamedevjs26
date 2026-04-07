import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  speed: number = 220;
  jumpStrength: number = 550;

  constructor (scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'dude');

    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.setScale(2);
    this.setDepth(1);
    this.body!.setBounce(0.2);
    this.body!.setGravityY(300);
    this.body!.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'idle',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 10,
      repeat: -1
    });

    this.cursors = scene.input.keyboard!.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(this.speed * -1);
      this.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(this.speed);
      this.anims.play('right', true);
    } else {
      this.setVelocityX(0);
      this.anims.play('idle', true);
    }

    if (this.cursors.up.isDown && this.body!.touching.down) {
      this.setVelocityY(this.jumpStrength * -1);
    }
  }
}
