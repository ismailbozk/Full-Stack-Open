import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export const entrySchema = z.object({
  id: z.string().optional(),
  date: z.string().refine(
    (val) => /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val)),
    { message: 'Invalid date format, expected YYYY-MM-DD' }
  ),
  description: z.string(),
  specialist: z.string(),
});

export type Entry = z.infer<typeof entrySchema>;

export const newPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().refine(
    (val) => /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val)),
    { message: 'Invalid date format, expected YYYY-MM-DD' }
  ),
  ssn: z.string().optional(),   
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema).default([]),
});

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

