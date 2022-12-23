import { Button, Divider, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { ReactElement } from "react";
import {
  CheckOption,
  DiagnosisSelection,
  SelectField,
  TextField,
  TypeOption,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry, EntryTypes, HealthCheckRating, onSubmitType } from "../types";

interface Props {
  onSubmit: (values: onSubmitType) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryTypes.HealthCheck, label: "HealthCheck" },
  { value: EntryTypes.Hospital, label: "Hospital" },
  { value: EntryTypes.OccupationalHealthcare, label: "OccupationalHealthcare" },
];
const checkOptions: CheckOption[] = [
  { value: 0, label: HealthCheckRating.Healthy },
  { value: 1, label: HealthCheckRating.LowRisk },
  { value: 2, label: HealthCheckRating.HighRisk },
  { value: 3, label: HealthCheckRating.CriticalRisk },
];

const EntryCase = ({ type }: { type: Entry["type"] }): ReactElement => {
  switch (type) {
    case "Hospital":
      return (
        <>
          <Divider />
          <h4> Select Discharge</h4>
          <Field
            label="Date"
            placeholder="Date"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );

    case "HealthCheck":
      return (
        <>
          <Divider />
          <h4> Select Health Check Rating</h4>
          <SelectField
            label="HealthCheck"
            name="healthCheckRating"
            options={checkOptions}
          />
        </>
      );

    case "OccupationalHealthcare":
      return (
        <>
          <Divider />
          <h4> Select Employer name</h4>
          <Field
            label="Emplyer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <h4> Select Dates</h4>
          <Field
            label="Start Date"
            placeholder="Start Date"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="End Date"
            placeholder="End Date"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );

    default:
      return <></>;
  }
};

export default function AddNewEntry({ onSubmit, onCancel }: Props) {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <EntryCase type={values.type as Entry["type"]} />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}
