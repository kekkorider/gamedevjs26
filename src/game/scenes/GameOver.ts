import { EventBus } from '../EventBus';
import { EVENTS } from '../Constants';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    gameOverText : Phaser.GameObjects.Text;

    constructor () {
        super('GameOver');
    }

    create () {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0x990000);

        this.gameOverText = this.add.text(512, 384, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
    }

    changeScene () {
        this.scene.start('MainMenu');
    }
}
