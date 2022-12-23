export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

//--- Entries
//Types
export enum EntryTypes {
  Hospital = "Hospital",
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
}

export type EntryTypeOptions =
  | "Hospital"
  | "HealthCheck"
  | "OccupationalHealthcare";
//Base
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  type: string;
}

//Occupational
interface OccupationalSickLeave {
  startDate: string;
  endDate: string;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: OccupationalSickLeave;
}

//HealthCheck
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

//Hospital
interface HospitalDischarge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: HospitalDischarge;
}

//Entry
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;

export interface onSubmitType {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  discharge?: {
    date: string;
    criteria: string;
  };
  healthCheckRating?: number;
  employerName?: string;
  sickLeave?: OccupationalSickLeave;
}