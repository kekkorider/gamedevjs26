import { EventBus } from '../EventBus';
import { EVENTS } from '../Constants';
import * as Phaser from 'phaser';
import { Machine, Patient, DiseaseType, Equip, MachineType } from '../classes';
import { Button } from '../ui/Button';
import { DiseaseList, PatientDetailsList } from '../Database';

export class Game extends Phaser.Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    scoreText: Phaser.GameObjects.Text;
    patientInfoText: Phaser.GameObjects.Text;
    isGameOver: boolean = false;
    timer: Phaser.Time.TimerEvent;
    money: number = 10000;
    patient: Patient | null = null;
    equipOwned: Equip = new Equip();
    equipToBuy: Equip = new Equip();
    equipOwnedTextDebug: Array<Phaser.GameObjects.Text> = [];
    equipToBuyTextDebug: Array<Phaser.GameObjects.Text> = [];

    constructor () {
        super('Game');
    }

    create () {
        this.camera = this.cameras.main as Phaser.Cameras.Scene2D.Camera;

        this.createUI();

        EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);

        this.equipToBuy.fill();

        this.updateMachinesDebug();
    }

    update() {}

    newRound() {
        // Pick a random disease
        const disease: DiseaseType = Phaser.Math.RND.pick(DiseaseList);

        // Pick a random patient details (name and gender)
        const details: any = Phaser.Math.RND.pick(PatientDetailsList);
        this.patient = new Patient(disease, details.name, details.gender, 1000, 2000);

        this.updateUI();
    }

    createUI() {
        this.scoreText = this.add.text(20, 16, `Money: ${this.money}`, { fontSize: '32px', color: '#fff' });

        const newRoundButton = new Button(
            this,
            20,
            this.scale.height - 20,
            'New round',
            this.newRound.bind(this)
        );
        newRoundButton.setOrigin(0, 1);
        newRoundButton.setFontSize(20);
    }

    addMachine(Machine: Machine) {
        this.money -= Machine.machine.purchaseCost;
        this.updateUI();
        this.checkMoney();
    }

    updateUI() {
        this.scoreText.setText(`Money: ${this.money}`);

        const infoText = `
Name: ${this.patient?.name}
Gender: ${this.patient?.gender === 'm' ? 'Male' : 'Female'}
Disease: ${this.patient?.disease.id}
Cost Diagnosis OK: ${this.patient?.costDiagnosisOk}
Cost Diagnosis Not OK: ${this.patient?.costDiagnosisNotOk}
        `;
        this.patientInfoText.setText(infoText);
        this.patientInfoText.setPadding({ left: 32, right: 32, top: 8, bottom: 8 });
    }

    checkMoney() {
        if (this.money <= 0) {
            this.gameOver();
        }
    }

    updateMachinesDebug() {
        // TO BUY
        this.equipToBuyTextDebug.forEach((text: Phaser.GameObjects.Text) => {
            text.destroy();
        })

        this.equipToBuyTextDebug = []

        const toBuyTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontSize: '16px',
            color: '#fff',
            align: 'left',
            backgroundColor: '#000000',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        };

        this.equipToBuy.machines.forEach((machine: MachineType, index: number) => {
            const text = this.add.text(20, 70 + 26*index, machine.label, toBuyTextStyle);
            text.setInteractive({ useHandCursor: true });
            text.setOrigin(0);
            text.on('pointerdown', () => {
                this.pickMachineFromAvailable(machine);
            });
            this.equipToBuyTextDebug.push(text);
        })

        // OWNED
        this.equipOwnedTextDebug.forEach((text: Phaser.GameObjects.Text) => {
            text.destroy();
        })

        this.equipOwnedTextDebug = []

        const ownedTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontSize: '16px',
            color: '#fff',
            align: 'right',
            backgroundColor: '#000000',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }

        this.equipOwned.machines.forEach((machine: MachineType, index: number) => {
            const text = this.add.text(this.scale.width - 20, 70 + 26*index, machine.label, ownedTextStyle);
            text.setInteractive({ useHandCursor: true });
            text.setOrigin(1, 0);
            text.on('pointerdown', () => {
                this.pickMachineFromOwned(machine);
            });
            this.equipOwnedTextDebug.push(text);
        })
    }

    pickMachineFromAvailable(machine: MachineType) {
        const picked = this.equipToBuy.pick(machine);
        this.equipOwned.addMachine(picked);

        this.updateMachinesDebug();
    }

    pickMachineFromOwned(machine: MachineType) {
        const picked = this.equipOwned.pick(machine);
        this.equipToBuy.addMachine(picked);

        this.updateMachinesDebug();
    }

    gameOver () {
        this.scene.start('GameOver');
    }
}
