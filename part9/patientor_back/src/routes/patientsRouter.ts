/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getFilteredPatientEntries } from './../services/patientService';
import express from 'express';
import { FilteredPatientDetails, NewPatient } from '../types';
import createNewPatientEntry from '../utils/newPatientCreator';

const router = express.Router();

const getPatients = (): FilteredPatientDetails[] => {
  const updatedPatients: FilteredPatientDetails[] = getFilteredPatientEntries();
  return updatedPatients;
};

router.get('/', (_req, res) => {
  console.log('/api/patients get request');
  const filteredPatientList: FilteredPatientDetails[] = getPatients();
  res.send(filteredPatientList);
});

router.post('/', (req, res) => {
  console.log('/api/patients post request');
  try {
    const newPatientEntry: NewPatient = createNewPatientEntry(req.body);
    console.log(newPatientEntry);

    res.send(newPatientEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  // const newPatientEntry = addNewPatient({
  //   name,
  //   dateOfBirth,
  //   ssn,
  //   gender,
  //   occupation
  // });
});

export default router;
