import { DiseaseType } from "./index";

export class Patient {
  disease: DiseaseType;
  name: string;
  gender: string;
  costDiagnosisOk: number;
  costDiagnosisNotOk: number;

  constructor(
    disease: DiseaseType,
    name: string,
    gender: string,
    costDiagnosisOk: number,
    costDiagnosisNotOk: number
  ) {
    this.disease = disease;
    this.name = name;
    this.gender = gender;
    this.costDiagnosisOk = costDiagnosisOk;
    this.costDiagnosisNotOk = costDiagnosisNotOk;
  }
}
