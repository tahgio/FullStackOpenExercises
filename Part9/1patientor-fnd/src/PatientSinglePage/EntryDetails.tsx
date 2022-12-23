import { Diagnosis, Entry } from "../types";
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface EntryBasicProps {
  children: React.ReactNode;
  entry: Entry;
  diagnosis: Diagnosis[];
}

const EntryDetailsBasic = ({ children, entry, diagnosis }: EntryBasicProps) => {
  return (
    <div
      style={{
        border: "1px solid #000",
        borderRadius: "5px",
        padding: "5px 15px",
        margin: "15px",
      }}
    >
      <p>
        {entry.date}{" "}
        <span className="material-icons">
          {entry.type === "Hospital"
            ? "local_hospital"
            : entry.type === "HealthCheck"
            ? "monitor_heart"
            : entry.type === "OccupationalHealthcare"
            ? "medical_information"
            : null}
        </span>
      </p>
      <p>{entry.description}</p>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((element, index) => {
            let codeDes;
            if (diagnosis.length > 1) {
              codeDes = diagnosis.find((type) => element === type.code);
            }
            return (
              <li key={index}>
                {element} : {codeDes && codeDes.name}
              </li>
            );
          })}
        </ul>
      ) : null}
      {children}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};
const HospitalEntry = ({
  entry,
  diagnosis,
}: {
  entry: Extract<Entry, { type: "Hospital" }>;
  diagnosis: Diagnosis[];
}) => (
  <EntryDetailsBasic entry={entry} diagnosis={diagnosis}>
    <h4>Discharge: </h4>
    <p>
      criteria: {entry.discharge.criteria} date: {entry.discharge.date}
    </p>
  </EntryDetailsBasic>
);
const HealthCheckEntry = ({
  entry,
  diagnosis,
}: {
  entry: Extract<Entry, { type: "HealthCheck" }>;
  diagnosis: Diagnosis[];
}) => (
  <EntryDetailsBasic entry={entry} diagnosis={diagnosis}>
    <span
      style={{
        color:
          entry.healthCheckRating === 0
            ? "green"
            : entry.healthCheckRating === 1
            ? "yellow"
            : entry.healthCheckRating === 2
            ? "pink"
            : "red",
      }}
      className="material-icons"
    >
      favorite
    </span>
  </EntryDetailsBasic>
);
const OccupationalHealthcareEntry = ({
  entry,
  diagnosis,
}: {
  entry: Extract<Entry, { type: "OccupationalHealthcare" }>;
  diagnosis: Diagnosis[];
}) => (
  <EntryDetailsBasic entry={entry} diagnosis={diagnosis}>
    <p>employer: {entry.employerName}</p>
    {entry.sickLeave && (
      <>
        <h4>Sick leave</h4>
        <p>
          Start date: {entry.sickLeave.startDate} End date:{" "}
          {entry.sickLeave.endDate}
        </p>
      </>
    )}
  </EntryDetailsBasic>
);

export const EntryDetails: React.FC<{
  entry: Entry;
  diagnosis: Diagnosis[];
}> = ({ entry, diagnosis }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnosis={diagnosis} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnosis={diagnosis} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry entry={entry} diagnosis={diagnosis} />
      );

    default:
      return assertNever(entry);
  }
};
