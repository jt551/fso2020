import express from 'express';
import { getDiagnoses } from '../services/diagnoseService';

const router = express.Router();

const diagnoses = getDiagnoses();

router.get('/', (_req, res) => {
  console.log('/api/diagnoses request');

  res.send(diagnoses);
});

export default router;
