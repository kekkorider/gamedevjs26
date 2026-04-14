import { MachineType } from "./index";
import { EVENTS } from "../Constants";
import { EventBus } from "../EventBus";
import { MachineList } from "../Database";

export class Equip {
  machines: Array<MachineType> = [];

  constructor() {}

  addMachine(machine: MachineType | null) {
    if (machine === null) return;

    this.machines.push(machine);

    EventBus.emit(EVENTS.MACHINE_PURCHASED, machine);
  }

  pick(machine: MachineType) {
    const item = this.machines.splice(this.machines.indexOf(machine), 1);
    const picked = item[0] ?? null;

    return picked;
  }

  fill() {
    MachineList.forEach((machine: MachineType) => {
      this.addMachine(machine);
    });
  }
}
