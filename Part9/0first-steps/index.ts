/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi, parseRequest } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  
  try {

    const {height, weight} = parseRequest(req.query);

    const bmi = calculateBmi(height, weight);

    res.send({
      weight,
      height,
      bmi,
    });

  } catch (error) {

    res.send({
      bmiError: error.message,
    });

  }

});

app.post('/exercises', (req, res) => {
  try{

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { daily_exercises, target } = req.body;
    let d : number[] = [];
    if (Array.isArray(daily_exercises)) {
      if (daily_exercises.every((el) => typeof el === 'number')) {
        d = daily_exercises;
      } else if (daily_exercises.every((el) => !isNaN(Number(el)))) {
        d = daily_exercises.map((el: number) => Number(el));
      }
    }

    if ( !daily_exercises ||  !target ){
      return res.status(400).send({ error: "parameters missing"});
    } else if (isNaN(Number(target)) || d.length === 0 ){
      return res.status(400).send({ error: "malformatted parameters" });
    }else {
    
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = calculateExercises(Number(target), d);

      return res.send(result);
    }

  } catch(error) {
    return res.send({
      err: error.message,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});