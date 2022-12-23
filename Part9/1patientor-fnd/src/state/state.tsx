import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Entry, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnosis: Array<Diagnosis>;
};

const initialState: State = {
  patients: {},
  diagnosis: [],
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

//----- ACTION CREATOR FUNCTIONS -----//
export const setPatientList = (list: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: list,
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload,
  };
};

export const updateUserList = (payload: Patient): Action => {
  return {
    type: "UPDATE_USER_LIST",
    payload,
  };
};

export const addDiagnosis = (payload: Diagnosis[]): Action => {
  return {
    type: "ADD_DIAGNOSIS",
    payload,
  };
};

export const addNewEntry = (payload: {
  id: string;
  newEntry: Entry;
}): Action => {
  return {
    type: "ADD_NEW_ENTRY",
    payload,
  };
};
