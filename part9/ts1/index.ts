import express from 'express';
import { checkAndReturnBmi } from './bmiCalculator';
import { checkAndReturnCalculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  //console.log(height, weight);

  const bmi: string = checkAndReturnBmi(<string>height, <string>weight);

  if (bmi === 'malformed parameters') {
    res.send({
      error: 'malformed parameters',
    });
    return;
  }

  res.send({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => { 
  //console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const dailyData: string[]= <string[]> req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: string = <string> req.body.target;

  if(!dailyData || !target){    
    res.json({ error : "parameter(s) missing"});
    return;
  }
  try{
    const response = checkAndReturnCalculateExercises(dailyData, target);
    res.json(response);
  } catch(e){    
    res.json({ error: "malformed parameters"});
  }   
});
  

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
