import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient } from '../types/Patient';
import { getNonSensitivePatients } from '../services/service';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(getNonSensitivePatients());
});

export default router;
