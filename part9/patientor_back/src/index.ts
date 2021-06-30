import express from 'express';
import cors from 'cors';

import pingRouter from './routes/pingRouter';
import diagnosesRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientsRouter';

const app = express();
const PORT = 3001;
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options));
app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});