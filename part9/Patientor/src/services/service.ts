import patientData from '../data/patients';
import diagnisisData from '../data/diagnoses';
import { Diagnosis } from '../types/Diagnosis';
import { Patient, NonSensitivePatient, NewPatientEntry, EntryWithoutId } from '../types/Patient';
import { v1 as uuid } from 'uuid';

export const getPatients = (): Patient[] => {
  return patientData;
};

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }): NonSensitivePatient => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export const getDiagnoses = (): Diagnosis[] => {
  return diagnisisData;
};

export const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid().toString(),
    ...patient
  };

  patientData.push(newPatientEntry);
  return newPatientEntry; 
};

export const addEntryToPatient = (patientId: string, entry: EntryWithoutId): Patient => {
  const patient = patientData.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }

  const newEntry = {
    id: uuid().toString(),
    ...entry
  };

  patient.entries.push(newEntry);
  return patient;
};