import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_USER_LIST";
      payload: Patient;
    }
  | {
      type: "ADD_DIAGNOSIS";
      payload: Array<Diagnosis>;
    }
  | {
      type: "ADD_NEW_ENTRY";
      payload: {
        id: string;
        newEntry: Entry;
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_USER_LIST":
      if (
        Object.values(state.patients).findIndex(
          (e) => e.id === action.payload.id
        ) !== -1
      ) {
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload,
          },
        };
      } else {
        throw new Error("Cannot update: user not found!");
      }
    case "ADD_DIAGNOSIS":
      return {
        ...state,
        diagnosis: action.payload,
      };
    case "ADD_NEW_ENTRY":
      const patient = Object.values(state.patients).find(
        (e) => e.id === action.payload.id
      );
      patient?.entries.push(action.payload.newEntry);
      console.log(patient);
      return {
        ...state,
        [action.payload.id]: patient,
      };
    default:
      return state;
  }
};
