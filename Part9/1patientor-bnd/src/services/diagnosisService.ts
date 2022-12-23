import diagnosisData from "../../data/diagnosisData";
import { Diagnose } from "../types";

//TYPES
const diagnosis: Diagnose[] = diagnosisData;

//GET ALL
const getEntries = (): Diagnose[] => {
  return diagnosis;
};

export default {
  getEntries,
};