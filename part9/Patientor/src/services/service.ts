import patientData from '../data/patients';
import diagnisisData from '../data/diagnoses';
import { Diagnosis } from '../types/Diagnosis';
import { Patient, NonSensitivePatient } from '../types/Patient';

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