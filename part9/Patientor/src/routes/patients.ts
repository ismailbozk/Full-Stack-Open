import express from 'express';
import { Response, NextFunction, Request } from 'express';
import {
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from '../types/Patient';
import { getNonSensitivePatients, addPatient } from '../services/service';
import { z } from 'zod';
import { newPatientParser } from '../middlewares/patientParser';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(getNonSensitivePatients());
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

// router.post('/', (req, res: Response<Patient | { error: unknown }>) => {
//   try {
//     const newDiaryEntry = newPatientEntrySchema.parse(req.body);
//     const addedEntry = addPatient(newDiaryEntry);
//     res.json(addedEntry);
//   } catch (error: unknown) {
//     if (error instanceof z.ZodError) {
//       res.status(400).send({ error: error.issues });
//     } else {
//       res.status(400).send({ error: 'unknown error' });
//     }
//   }
// });

router.use(errorMiddleware);

export default router;
