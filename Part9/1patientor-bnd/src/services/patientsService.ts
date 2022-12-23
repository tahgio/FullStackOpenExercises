import patientsData from "../../data/patientsData";
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  Patient,
  PublicPatient,
} from "../types";
import { v1 as uuid } from "uuid";

//TYPE
const patientsDataAll: Patient[] = patientsData;

//GET ALL DATA
const getAll = (): Patient[] => {
  return patientsDataAll;
};

//NO SENSITIVE
const getNoSensitive = (): PublicPatient[] => {
  return patientsDataAll.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

//SINGLE PATIENT
const getSinglePatient = (id: string): Patient | undefined => {
  const singlePatient = patientsDataAll.find((e) => e.id === id);
  return singlePatient;
};

//ADD PATIENT
const addPatient = (patient: NewPatientEntry): Patient => {
  const id = uuid();
  const newEntry = {
    id,
    ...patient,
  };
  patientsDataAll.push(newEntry);
  return newEntry;
};

//ADD ENTRY
const addEntry = (
  selectedId: string,
  newEntryFromUser: EntryWithoutId
): Entry => {
  const entryId = uuid();
  const newEntry = {
    id: entryId,
    ...newEntryFromUser,
  };
  const index = patientsDataAll.findIndex(
    (patient) => patient.id === selectedId
  );
  patientsDataAll[index]?.entries.push(newEntry);
  return newEntry;
};

export default {
  getAll,
  getNoSensitive,
  getSinglePatient,
  addPatient,
  addEntry,
};
