/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getFilteredPatientEntries, addNewPatient } from './../services/patientService';
import express from 'express';
import { FilteredPatientDetails } from '../types';

const router = express.Router();

const getPatients = (): FilteredPatientDetails [] => {
  const updatedPatients: FilteredPatientDetails [] = getFilteredPatientEntries();
  return updatedPatients;
};

router.get('/', (_req, res) => {
  console.log('/api/patients get request');
  const filteredPatientList: FilteredPatientDetails [] = getPatients();
  res.send(filteredPatientList);
});

router.post('/', (req, res) => {
    console.log('/api/patients post request');
    
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
   
    const newPatientEntry = addNewPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    });

    res.send(newPatientEntry);
  });

export default router;