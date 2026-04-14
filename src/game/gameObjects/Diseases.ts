import { DiseaseType } from '../classes';
import { DiseaseList } from '../Database';

export const Tumor: DiseaseType = { ...DiseaseList[0] }
export const BrainLesions: DiseaseType = { ...DiseaseList[1] }
export const ArticularDisturbances: DiseaseType = { ...DiseaseList[2] }
export const InternalBleeding: DiseaseType = { ...DiseaseList[3] }
export const Fractures: DiseaseType = { ...DiseaseList[4] }
export const Pneumonia: DiseaseType = { ...DiseaseList[5] }
export const Pregnancy: DiseaseType = { ...DiseaseList[6] }
export const KidneyCalculi: DiseaseType = { ...DiseaseList[7] }
export const AbdominalDiseases: DiseaseType = { ...DiseaseList[8] }
export const IrregularHeartbeat: DiseaseType = { ...DiseaseList[9] }
export const HeartAttack: DiseaseType = { ...DiseaseList[10] }
export const Epilepsy: DiseaseType = { ...DiseaseList[11] }
export const NeurologicalDisorders: DiseaseType = { ...DiseaseList[12] }
export const Asthma: DiseaseType = { ...DiseaseList[13] }
export const RespiratoryDiseases: DiseaseType = { ...DiseaseList[14] }
export const GastrointestinalProblems: DiseaseType = { ...DiseaseList[15] }
export const HearingLoss: DiseaseType = { ...DiseaseList[16] }
export const Glaucoma: DiseaseType = { ...DiseaseList[17] }
export const SkinLesions: DiseaseType = { ...DiseaseList[18] }
export const Osteoporosis: DiseaseType = { ...DiseaseList[19] }
export const RheumaticDiseases: DiseaseType = { ...DiseaseList[20] }
export const SystemicInfections: DiseaseType = { ...DiseaseList[21] }
export const Anemia: DiseaseType = { ...DiseaseList[22] }
export const MetabolicImbalances: DiseaseType = { ...DiseaseList[23] }

export enum Diseases {
  Tumor,
  BrainLesions,
  ArticularDisturbances,
  InternalBleeding,
  Fractures,
  Pneumonia,
  Pregnancy,
  KidneyCalculi,
  AbdominalDiseases,
  IrregularHeartbeat,
  HeartAttack,
  Epilepsy,
  NeurologicalDisorders,
  Asthma,
  RespiratoryDiseases,
  GastrointestinalProblems,
  HearingLoss,
  Glaucoma,
  SkinLesions,
  Osteoporosis,
  RheumaticDiseases,
  SystemicInfections,
  Anemia,
  MetabolicImbalances,
}
