import express from "express";
import { EntryWithoutId, NewPatientEntry } from "../types";
import utils from "../utils";
import patientsService from "../services/patientsService";

const router = express.Router();

//GET
router.get("/", (_req, res) => {
  res.send(patientsService.getNoSensitive());
});

router.get("/:id", (req, res) => {
  res.send(patientsService.getSinglePatient(req.params.id));
});

//POST
router.post("/", (req, res) => {
  try {
    const newEntry = utils.toNewPatientEntry(req.body as NewPatientEntry);
    const addedEntry = patientsService.addPatient(newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = utils.toNewEntry(req.body as EntryWithoutId);
    const addedEntry = patientsService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
