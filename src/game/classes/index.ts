import { Machine } from "./Machine";
import { Patient } from "./Patient";
import { Equip } from "./Equip";

export type DiseaseType = {
  id: number;
  label: string;
}

export type EquipType = {
  machines: MachineType[];
}

export type PatientDetailsType = {
  gender: string;
  name: string;
}

export type PatientType = {
  disease: DiseaseType;
  name: PatientDetailsType["name"];
  gender: PatientDetailsType["gender"];
  costDiagnosisOk: number;
  costDiagnosisNotOk: number;
}

export type MachineType = {
  id: number;
  label: string;
  diseases: number[];
  purchaseCost: number;
  usageCost: number;
}

export {
  Machine,
  Patient,
  Equip,
}
