import {
  Entry,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  HospitalDischarge,
  NewPatientEntry,
  OccupationalSickLeave,
} from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

//------ Check type
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isEntryArray = (param: unknown): param is Array<Entry> => {
  return Array.isArray(param);
};

const isStringArray = (param: unknown): param is string[] => {
  return Array.isArray(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is HospitalDischarge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Boolean(isDate(param.date) && isString(param.criteria));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHCRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is OccupationalSickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Boolean(isDate(param.startDate) && isDate(param.endDate));
};

//----- Parse Entry
const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing content");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing content ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing content ${gender}`);
  }

  return gender;
};

const parseEntry = (entries: unknown): Array<Entry> => {
  if (!entries || !isEntryArray(entries)) {
    throw new Error("Incorrect or missing content");
  }
  return entries;
};

const parseArray = (arr: unknown): string[] => {
  if (!arr || !isStringArray(arr)) {
    throw new Error("Incorrect or missing content");
  }
  return arr;
};

const parseDischarge = (obj: unknown): HospitalDischarge => {
  if (!obj || !isDischarge(obj)) {
    throw new Error("incorrect discharge type");
  }
  return obj;
};

const parseHealthCheckRating = (obj: unknown): HealthCheckRating => {
  if (!obj || !isHCRating(obj)) {
    throw new Error("incorrect discharge type");
  }
  return obj;
};

const parseSickLeave = (obj: unknown): OccupationalSickLeave => {
  if (!obj || !isSickLeave(obj)) {
    throw new Error("incorrect sick leave type");
  }
  return obj;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntry(entries),
  };

  return newEntry;
};

const toNewEntry = (entry: EntryWithoutId): EntryWithoutId => {
  const entryBasis = {
    description: parseString(entry.description),
    date: parseDate(entry.date),
    specialist: parseString(entry.specialist),
    diagnosisCodes: parseArray(entry.diagnosisCodes || []),
  };
  switch (entry.type) {
    case "Hospital":
      return {
        ...entryBasis,
        type: "Hospital",
        discharge: parseDischarge(entry.discharge),
      };
    case "HealthCheck":
      return {
        ...entryBasis,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };

    case "OccupationalHealthcare":
      const occEntry: Extract<
        EntryWithoutId,
        { type: "OccupationalHealthcare" }
      > = {
        ...entryBasis,
        type: "OccupationalHealthcare",
        employerName: parseString(entry.employerName),
      };
      if (entry.sickLeave) {
        occEntry.sickLeave = parseSickLeave(entry.sickLeave);
      }
      return occEntry;
    default:
      return assertNever(entry);
  }
};

export default { toNewPatientEntry, toNewEntry };
