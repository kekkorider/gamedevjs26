import { EventBus } from '../EventBus';
import { EVENTS } from '../Constants';
import * as Phaser from 'phaser';

export class Game extends Phaser.Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    scoreText: Phaser.GameObjects.Text;
    isGameOver: boolean = false;
    timer: Phaser.Time.TimerEvent;
    money: number = 10;

    constructor () {
        super('Game');
    }

    create () {
        this.camera = this.cameras.main as Phaser.Cameras.Scene2D.Camera;

        this.createTimer();

        this.scoreText = this.add.text(16, 16, 'Money: 0', { fontSize: '32px', color: '#fff' });

        EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
    }

    update() {}

    newRound() {}

    createTimer() {
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.money--;

                this.scoreText.setText(`Money: ${this.money}`);

                if (this.money <= 0) {
                    this.timer.destroy();

                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            this.gameOver();
                        }
                    })
                }
            },
            repeat: -1
        })
    }

    gameOver () {
        this.scene.start('GameOver');
    }
}
