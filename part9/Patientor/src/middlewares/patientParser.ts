import { NextFunction } from "express";
import { newPatientEntrySchema } from "../types/Patient";
import { Request, Response } from "express";
import { NewPatientEntry, Patient } from "../types/Patient";

export const newPatientParser = (req: Request<unknown, unknown, NewPatientEntry>, _res: Response<Patient>, next: NextFunction) => { 
  try {
    newPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};