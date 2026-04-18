import { EventBus } from '../EventBus';
import { EVENTS } from '../Constants';
import * as Phaser from 'phaser';
import { Machine, Patient, DiseaseType, Equip, MachineType } from '../classes';
import { Button } from '../ui/Button';
import {
    DiseaseList,
    MachineList,
    PatientDetailsType,
    PatientDetailsList
} from '../Database';

import { ScrollablePanelUI, PanelConfigType, ButtonConfigType } from '../ui/ScrollablePanel';

export class Game extends Phaser.Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    scoreText: Phaser.GameObjects.Text;
    patientInfoText: Phaser.GameObjects.Text;
    isGameOver: boolean = false;
    timer: Phaser.Time.TimerEvent;
    money: number = 10000;
    patient: Patient | null = null;
    equipToBuy: Equip = new Equip();
    equipToBuyTextDebug: Array<Phaser.GameObjects.Text> = [];

    inventory: Equip = new Equip();
    inventoryTextDebug: Array<Phaser.GameObjects.Text> = [];
    inventoryPanel: ScrollablePanelUI;
    inventoryMax: number = 3;
    inventoryMaxText: Phaser.GameObjects.Text;

    selection: Equip = new Equip();
    selectionPanel: ScrollablePanelUI;

    constructor () {
        super('Game');
    }

    create () {
        this.camera = this.cameras.main as Phaser.Cameras.Scene2D.Camera;

        this.createUI();

        EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);

        this.equipToBuy.fill();
        this.inventory.addMachine(this.equipToBuy.pick(MachineList[0]));
        this.inventory.addMachine(this.equipToBuy.pick(MachineList[1]));
        this.inventory.addMachine(this.equipToBuy.pick(MachineList[2]));
        this.inventory.addMachine(this.equipToBuy.pick(MachineList[3]));

        // this.updateMachinesDebug();

        this.inventoryPanel = new ScrollablePanelUI(
            this,
            20,
            300,
            {
                itemsPerRow: 2,
                width: this.scale.width * 0.5,
                height: 150,
                padding: 12,
                spacing: 8
            } as PanelConfigType,
            {
                height: 100
            } as ButtonConfigType
        );

        for (const machine of this.inventory.machines) {
            this.addMachineToInventoryPanel(machine);
        }
        this.inventoryPanel.layout();
        this.inventoryPanel.hide();

        this.selectionPanel = new ScrollablePanelUI(
            this,
            this.scale.width - 20,
            300,
            {
                itemsPerRow: 1,
                width: this.scale.width * 0.3,
                height: 260,
                padding: 12,
                spacing: 8
            },
            {
                height: 100
            }
        )
        this.selectionPanel.panel.setOrigin(1, 0);
        this.selectionPanel.layout();
        this.selectionPanel.hide();
    }

    update() {}

    newRound() {
        // Pick a random disease
        const disease: DiseaseType = Phaser.Math.RND.pick(DiseaseList);

        // Pick a random patient details (name and gender)
        const details: PatientDetailsType = Phaser.Math.RND.pick(PatientDetailsList);
        this.patient = new Patient(disease, details.name, details.gender, 1000, 2000);

        console.log('👨‍⚕️ New patient:', this.patient);

        this.updatePatientInfoUI();
        this.patientInfoText.setVisible(true);

        this.inventoryPanel.show();
        this.selectionPanel.show();
    }

    createUI() {
        {
            const style: Phaser.Types.GameObjects.Text.TextStyle = {
                fontSize: '20px',
                color: '#fff',
                align: 'left',
                padding: { left: 8, right: 8, top: 4, bottom: 4 }
            };

            this.scoreText = this.add.text(20, 16, `Money: ${this.money}`, style);
        }

        {
            const style: Phaser.Types.GameObjects.Text.TextStyle = {
                fontSize: '20px',
                color: '#fff',
                align: 'right',
            };

            this.inventoryMaxText = this.add.text(this.scale.width - 20, 32, `Max equip: ${this.inventoryMax}`, style);
            this.inventoryMaxText.setOrigin(1, 0);
        }

        {
            const style: Phaser.Types.GameObjects.Text.TextStyle = {
                fontSize: '24px',
                color: '#fff',
                backgroundColor: '#121212',
                align: 'left',
                padding: { left: 16, right: 16, top: 8, bottom: 8 }
            }

            this.patientInfoText = this.add.text(20, 80, '', style);
            this.patientInfoText.setVisible(false);
        }

        const newRoundButton = new Button(
            this,
            20,
            this.scale.height - 20,
            'New round',
            this.newRound.bind(this)
        );
        newRoundButton.setOrigin(0, 1);
        newRoundButton.setFontSize(20);

        const increaseInventoryMaxButton = new Button(
            this,
            this.scale.width - 20,
            this.scale.height - 20,
            'Increase max equip',
            () => {
                this.inventoryMaxText.setText(`Max equip: ${++this.inventoryMax}`);
            }
        );
        increaseInventoryMaxButton.setOrigin(1, 1);
        increaseInventoryMaxButton.setFontSize(20);
    }

    addMachine(Machine: Machine) {
        this.money -= Machine.machine.purchaseCost;
        this.updateUI();
        this.checkMoney();
    }

    updateUI() {
        this.scoreText.setText(`Money: ${this.money}`);
    }

    updatePatientInfoUI() {
        const text: string = `Name: ${this.patient?.name}
Gender: ${this.patient?.gender === 'm' ? 'Male' : 'Female'}
Disease ID: ${this.patient?.disease.id}
Disease Name: ${this.patient?.disease.label}
Cost Diagnosis OK: ${this.patient?.costDiagnosisOk}
Cost Diagnosis Not OK: ${this.patient?.costDiagnosisNotOk}`;
        this.patientInfoText.setText(text);
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
                this.purchaseMachine(machine);
            });
            this.equipToBuyTextDebug.push(text);
        })

        // OWNED
        this.inventoryTextDebug.forEach((text: Phaser.GameObjects.Text) => {
            text.destroy();
        })

        this.inventoryTextDebug = []

        const ownedTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontSize: '16px',
            color: '#fff',
            align: 'right',
            backgroundColor: '#000000',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }

        this.inventory.machines.forEach((machine: MachineType, index: number) => {
            const text = this.add.text(this.scale.width - 20, 70 + 26*index, machine.label, ownedTextStyle);
            text.setOrigin(1, 0);

            if (this.selection.hasMachine(machine)) {
                text.setBackgroundColor('#dd0000');
            } else {
                text.setInteractive({ useHandCursor: true });
                text.on('pointerdown', () => {
                    this.selectMachine(machine);
                });
            }

            this.inventoryTextDebug.push(text);
        })
    }

    purchaseMachine(machine: MachineType) {
        if (this.money < machine.purchaseCost) {
            return console.log('❌ Not enough money to purchase machine');
        }

        const picked = this.equipToBuy.pick(machine);
        this.inventory.addMachine(picked);

        this.money -= picked.purchaseCost;

        this.updateUI();
        this.checkMoney();
        // this.updateMachinesDebug();
    }

    pickMachineFromOwned(machine: MachineType) {
        const picked = this.inventory.pick(machine);
        this.equipToBuy.addMachine(picked);

        // this.updateMachinesDebug();
    }

    selectMachine(machine: MachineType) {
        if (this.selection.hasMachine(machine)) {
            return console.log('❌ Machine already in selected equip');
        }

        if (this.selection.count() >= this.inventoryMax) {
            return console.log('❌ Max equip reached');
        } else {
            const picked = this.inventory.selectMachine(machine);

            this.selection.addMachine(picked);
            this.selectionPanel.addItem(picked);
            this.selectionPanel.layout();

            console.log('✅ Machine selected.', machine);
        }

        // this.updateMachinesDebug();

        console.log('⏸️ Total machines selected:', this.selection.count());
    }

    addMachineToInventoryPanel(machine: MachineType) {
        this.inventoryPanel.addItem(machine, () => {
            this.selectMachine(machine)
        })
    }

    removeMachineFrominventoryPanel(machine: MachineType) {
        this.inventoryPanel.removeItem(machine);
    }

    gameOver () {
        this.scene.start('GameOver');
    }
}
