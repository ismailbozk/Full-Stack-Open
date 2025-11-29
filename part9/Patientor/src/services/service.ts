import patientData from '../data/patients';
import diagnisisData from '../data/diagnoses';
import { Diagnosis } from '../types/Diagnosis';
import { Patient, NonSensitivePatient, NewPatientEntry } from '../types/Patient';
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