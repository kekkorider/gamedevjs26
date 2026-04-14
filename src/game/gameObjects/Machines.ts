import { Machine, MachineType } from '../classes';
import * as Diseases from './Diseases';

const MachineMRI: MachineType = {
  diseases: [Diseases.Alzheimer.disease],
  purchaseCost: 1000,
  usageCost: 200,
}

export const machineMRI = new Machine(MachineMRI);
