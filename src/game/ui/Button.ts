import * as Phaser from 'phaser';

export class Button extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, text: string, callback: () => void) {
    super(scene, x, y, text, { fontSize: '32px', color: '#fff', backgroundColor: '#000000' });
    this.setInteractive({ useHandCursor: true });
    this.setOrigin(0.5);
    this.setPadding(16);
    this.on('pointerdown', callback);

    scene.add.existing(this);
  }
}
