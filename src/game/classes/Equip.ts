import { MachineType } from "./index";

export class Equip {
  machines: Array<MachineType> = [];

  constuctor() {}

  addMachine(machine: MachineType) {
    this.machines.push(machine);
  }
}
