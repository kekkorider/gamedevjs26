import { Disease, DiseaseType } from '../classes';

const DiseaseAlzheimer: DiseaseType = {
  id: 'alzheimer',
  label: 'Alzheimer',
}

export const Alzheimer = new Disease(DiseaseAlzheimer);
