import axios from "axios";
import { Patient, PatientDetail, PatientFormValues, Diagnosis, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatientById = async (id: string) => {
  const { data } = await axios.get<PatientDetail>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const getAllDiagnosisCodes = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (patientId: string, entry: Entry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );

  return data;
};

export default {
  getAll, create, getPatientById, getAllDiagnosisCodes, addEntry
};

