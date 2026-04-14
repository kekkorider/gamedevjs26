import { EventBus } from '../EventBus';
import { EVENTS } from '../Constants';
import * as Phaser from 'phaser';
import { Machine } from '../classes';
import * as Machines from '../gameObjects/Machines';
import { Button } from '../ui/Button';

export class Game extends Phaser.Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    scoreText: Phaser.GameObjects.Text;
    isGameOver: boolean = false;
    timer: Phaser.Time.TimerEvent;
    money: number = 10000;

    constructor () {
        super('Game');
    }

    create () {
        this.camera = this.cameras.main as Phaser.Cameras.Scene2D.Camera;

        this.createUI();
        // this.createTimer();

        this.scoreText = this.add.text(16, 16, `Money: ${this.money}`, { fontSize: '32px', color: '#fff' });

        EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
    }

    update() {}

    newRound() {}

    createUI() {
        const machine = new Machine(Machines.MRI.machine);

        const addMachineButton = new Button(
            this,
            20,
            this.scale.height - 20,
            'Add Machine',
            this.addMachine.bind(this, machine)
        );
        addMachineButton.setOrigin(0, 1);
        addMachineButton.setFontSize(20);
    }

    addMachine(Machine: Machine) {
        this.money -= Machine.machine.purchaseCost;
        this.updateUI();
        this.checkMoney();
    }

    updateUI() {
        this.scoreText.setText(`Money: ${this.money}`);
    }

    checkMoney() {
        if (this.money <= 0) {
            this.gameOver();
        }
    }

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
