import { MachineType } from "./index";
import { EVENTS } from "../Constants";
import { EventBus } from "../EventBus";
import { MachineList } from "../Database";

export class Equip {
  machines: MachineType[] = [];

  constructor() {}

  count() {
    return this.machines.length;
  }

  addMachine(machine: MachineType | null | undefined) {
    if (!!!machine) return;

    this.machines.push(machine);

    EventBus.emit(EVENTS.MACHINE_PURCHASED, machine);
  }

  selectMachine(machine: MachineType) {
    const index = this.machines.findIndex(m => m.id === machine.id);
    const item = this.machines.slice(index, index + 1);
    const selected = item[0];

    return selected;
  }

  hasMachine(machine: MachineType) {
    return this.machines.includes(machine);
  }

  pick(machine: MachineType) {
    const item = this.machines.splice(this.machines.indexOf(machine), 1);
    const picked = item[0];

    return picked;
  }

  fill() {
    MachineList.forEach((machine: MachineType) => {
      this.addMachine(machine);
    });
  }

  empty() {
    this.machines = [];
  }
}
