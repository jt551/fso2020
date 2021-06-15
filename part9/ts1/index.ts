import express from 'express';
import { checkAndReturnBmi } from './bmiCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight }: any = req.query;
  //console.log(height, weight);

  const bmi: string = checkAndReturnBmi(height, weight);

  if (bmi === 'malformatted parameters') {
    res.send({
      error: 'malformatted parameters',
    });
    return;
  }

  res.send({
    weight,
    height,
    bmi,
  });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
