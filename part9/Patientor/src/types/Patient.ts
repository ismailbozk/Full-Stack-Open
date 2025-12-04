import { z } from "zod";
import { Diagnosis } from "./Diagnosis";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export const newPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().refine(
    (val) => /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val)),
    { message: 'Invalid date format, expected YYYY-MM-DD' }
  ),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.custom<Entry[]>((val) => Array.isArray(val)).default([]),
});

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;