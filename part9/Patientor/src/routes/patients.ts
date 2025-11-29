import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient, Patient } from '../types/Patient';
import { getNonSensitivePatients, addPatient } from '../services/service';
import { toNewPatientEntry } from '../utils/helpers';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(getNonSensitivePatients());
});

router.post('/', (req, res: Response<Patient | string>) => {
  try {
    const newDiaryEntry = toNewPatientEntry(req.body);

    const addedEntry = addPatient(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
