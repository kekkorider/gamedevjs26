export type DiseaseType = {
  id: string;
  label: string;
}

export type EquipType = {
  machines: Array<MachineType>;
}

export type PatientType = {
  disease: DiseaseType;
  costDiagnosisOk: number;
  costDiagnosisNotOk: number;
}

export type MachineType = {
  diseases: DiseaseType[];
  purchaseCost: number;
  usageCost: number;
}
