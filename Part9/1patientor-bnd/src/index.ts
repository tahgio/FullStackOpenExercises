import express from "express";
import cors from 'cors';
import diagnosisRouter from './routes/diagnosisRoute';
import patientsRouter from "./routes/patientRoute";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());


const PORT = 3001;

//API-PING
app.get("/api/ping",(_req, res) => {
  console.log("there was a ping");
  res.send("pong");
});

//API-PATIENTS
app.use("/api/patients", patientsRouter);

//API-DIAGNOSIS
app.use('/api/diagnoses', diagnosisRouter);


app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
