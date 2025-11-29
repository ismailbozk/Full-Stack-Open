import express from 'express';
import { Response } from 'express';
import { Diagnosis } from '../types/Diagnosis';
import { getDiagnoses } from '../services/service';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  const diagnoses: Diagnosis[] = getDiagnoses();
  res.json(diagnoses);
});

export default router;
