import { Machine, MachineType } from '../classes';
import * as Diseases from './Diseases';

const MachineMRI: MachineType = {
  id: 'mri',
  diseases: [Diseases.Alzheimer.disease],
  purchaseCost: 1000,
  usageCost: 200,
}

export const MRI = new Machine(MachineMRI);
