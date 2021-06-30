import { getFilteredPatientEntries } from './../services/patientService';
import express from 'express';

const router = express.Router();

const filteredPatients = getFilteredPatientEntries();

router.get('/', (_req, res) => {
  console.log('/api/patients get request');
  res.send(filteredPatients);
});

router.post('/', (_req, res) => {
    console.log('/api/patients post request');  
    res.send('not implemented');
  });

export default router;