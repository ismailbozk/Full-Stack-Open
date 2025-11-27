import express from 'express';
import bmiCalculator from './bmiCalculator';
import { calculateExercises, ExerciseInput } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res): void => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const bmi = bmiCalculator(height, weight);
  res.send({ height, weight, bmi });
});

app.post('/exercises', express.json(), (req, res): void => {
  try {
    const { daily_exercises, target } = req.body as { daily_exercises: Array<number | string>; target: number | string };

    // Check for missing parameters
    if (!daily_exercises || target === undefined) {
      throw new Error('parameters missing');
    }

    // Type and value checks
    if (
      !Array.isArray(daily_exercises) ||
      daily_exercises.some((hour) => typeof hour !== 'number' || isNaN(Number(hour))) ||
      typeof target !== 'number' || isNaN(Number(target))
    ) {
      throw new Error('malformatted parameters');
    }

    // Create ExerciseInput object
    const exerciseInput: ExerciseInput = {
      dailyHours: daily_exercises.map((hour) => Number(hour)),
      target: Number(target)
    };

    const result = calculateExercises(exerciseInput);
    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
