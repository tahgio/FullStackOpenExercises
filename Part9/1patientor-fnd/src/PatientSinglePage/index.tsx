import { useParams } from "react-router-dom";
import {
  addDiagnosis,
  addNewEntry,
  updateUserList,
  useStateValue,
} from "../state";
import React, { useEffect, useState } from "react";
import { Diagnosis, Entry, onSubmitType, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { EntryDetails } from "./EntryDetails";
import { Button } from "@material-ui/core";
import AddNewEntryModal from "../AddNewEntryModal";

export default function PatientSinglePage() {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const [state, setState] = useState<Patient | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  //----- UseEffect -----//
  useEffect(() => {
    //fetch diagnosis code if needed
    if (diagnosis.length === 0) {
      axios
        .get(`${apiBaseUrl}/diagnoses`)
        .then((res) => {
          dispatch(addDiagnosis(res.data as Diagnosis[]));
        })
        .catch((error) => console.log(error));
    }

    //fetch patient data if needed
    const index = Object.values(patients).findIndex((e) => e.id === id);
    if (!Object.values(patients)[index]?.ssn) {
      axios
        .get(`${apiBaseUrl}/patients/${String(id)}`)
        .then((res) => {
          dispatch(updateUserList(res.data as Patient));
          setState(res.data as Patient);
        })
        .catch((error) => console.log(error));
    } else {
      const single = Object.values(patients)[index];
      setState(single);
    }
  }, []);

  const submitNewEntry = async (values: onSubmitType) => {
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        ` ${apiBaseUrl}/patients/${String(id)}/entries`,
        values
      );
      dispatch(addNewEntry({ id: String(id), newEntry: newEntry }));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      {state ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            <h2>{state.name}</h2>
            {state.gender === "male" ? (
              <span className="material-icons">male</span>
            ) : state.gender === "female" ? (
              <span className="material-icons">female</span>
            ) : (
              <span className="material-icons">transgender</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 15,
            }}
          >
            <div>ssn: {state.ssn}</div>
            <div>occupation: {state.occupation}</div>
            <Button variant="contained" onClick={() => openModal()}>
              Add New Entry
            </Button>
          </div>
          {state.entries.length > 0 ? (
            <div>
              <h4>entries</h4>
              {state.entries.map((e) => (
                <>
                  <EntryDetails entry={e} diagnosis={diagnosis} />
                </>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
      <AddNewEntryModal
        modalOpen={modalOpen}
        onSubmit={(values) => submitNewEntry(values)}
        onClose={closeModal}
        error={error}
      />
    </div>
  );
}
