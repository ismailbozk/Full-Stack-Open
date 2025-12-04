import express from 'express';
import { Response, NextFunction, Request } from 'express';
import {
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from '../types/Patient';
import { getNonSensitivePatients, addPatient, getPatients, addEntryToPatient } from '../services/service';
import { z } from 'zod';
import { newPatientParser } from '../middlewares/patientParser';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient | { error: string }>) => {
  const patient = getPatients().find(
    (p) => p.id === req.params.id
  );
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = addPatient(req.body);
    res.json(addedEntry);
  }
);

router.post('/:id/entries', (req: Request, res: Response<EntryWithoutId | { error: string }>) => { 
  const patient = getPatients().find((p) => p.id === req.params.id);
  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }
  const entry = req.body as EntryWithoutId;
  addEntryToPatient(req.params.id, entry);
  return res.json(entry);
});

router.use(errorMiddleware);

export default router;
