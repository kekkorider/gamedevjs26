import { MachineType } from "./index";
import { EVENTS } from "../Constants";
import { EventBus } from "../EventBus";

export class Equip {
  machines: Array<MachineType> = [];

  constructor() {}

  addMachine(machine: MachineType) {
    this.machines.push(machine);

    EventBus.emit(EVENTS.MACHINE_PURCHASED, machine);
  }
}
