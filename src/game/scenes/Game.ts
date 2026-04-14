import { EventBus } from '../EventBus';
import { EVENTS } from '../Constants';
import * as Phaser from 'phaser';
import { Machine, Patient, DiseaseType, Equip, MachineType } from '../classes';
import { Button } from '../ui/Button';
import { DiseaseList, PatientDetailsList, MachineList } from '../Database';

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

    constructor () {
        super('Game');
    }

    create () {
        this.camera = this.cameras.main as Phaser.Cameras.Scene2D.Camera;

        this.createUI();

        EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);

        this.equipToBuy.fill();
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

        const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontSize: '32px',
            color: '#fff',
            align: 'left',
            backgroundColor: '#000000'
        };
        this.patientInfoText = this.add.text(0, 100, "", textStyle);
        this.patientInfoText.setOrigin(0);

        const pickRandomButton = new Button(
            this,
            20,
            this.scale.height - 80,
            'Pick random',
            this.handlePickRandomButtonClick.bind(this)
        );
        pickRandomButton.setOrigin(0, 1);
        pickRandomButton.setFontSize(20);
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

    handlePickRandomButtonClick() {
        const machine: MachineType | null = this.equipToBuy.pick(MachineList[0] as MachineType);

        if (machine === null) {
            console.log('❌ No machine picked');
        } else {
            console.log('✅ Machine picked: ', machine.label);
            this.equipOwned.addMachine(machine);
            this.updateUI();
        }
    }

    gameOver () {
        this.scene.start('GameOver');
    }
}
