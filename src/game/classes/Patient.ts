import { DiseaseType } from "./index";

export class Patient {
  disease: DiseaseType;
  costDiagnosisOk: number;
  costDiagnosisNotOk: number;

  constructor(disease: DiseaseType, costDiagnosisOk: number, costDiagnosisNotOk: number) {
    this.disease = disease;
    this.costDiagnosisOk = costDiagnosisOk;
    this.costDiagnosisNotOk = costDiagnosisNotOk;
  }
}
