import { DiseaseType } from "./index";

export class Disease {
  disease: DiseaseType;

  constuctor(disease: DiseaseType) {
    this.disease = disease;
  }
}
