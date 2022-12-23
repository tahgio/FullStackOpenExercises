
//TYPES DECLARATION
interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

interface ExerciseReq {
  daily_exercises: number[],
  target: number
}



//PARSING TERMINAL ARGS
export const parsingArgs = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const argsCopy: number[] = [];
  for (let i = 2; i < args.length; i++) {
    const element = Number(args[i]);
    if (isNaN(element)) throw new Error("Argument should be a number");
    argsCopy[i - 2] = element;
  }

  const [ec1, ...ec2] = argsCopy;

  return {
    ec1,
    ec2,
  };

};


export const parsingExPost = (obj: ExerciseReq) => {
  if (!(obj.daily_exercises)
    || !(obj.target)
    || !(Array.isArray(obj.daily_exercises) && obj.daily_exercises.every((el) => typeof el === 'number'))
    || isNaN(Number(obj.target))) throw new Error("malformatted parameters");
  else {
      return {
        daily_exercises: obj.daily_exercises,
        target: Number(obj.target),
      };
    }
};




//FUNCTION
export const calculateExercises = (target: number, dailyEx: number[]): ExerciseResult => {
  const periodLength = dailyEx.length;
  const trainingDays = dailyEx.reduce((acc: number, e: number) => e > 0 ? acc + 1 : acc, 0); 
  const average = dailyEx.reduce((acc: number, e: number) => acc + e ,0) / periodLength;
  const rating = average >= target ? 3 : average > (target / 2) ? 2 : 1;
  const ratingDescription = rating === 1 ? "you have a lot to improve, keep trying" : rating === 2 ? "not too bad but could be better" : "good job, you' re on track!";
  const success = rating === 3;
   
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

//ERROR CATCHING
// try {
//   const {ec1, ec2} = parsingArgs(process.argv);
//   console.log(calculateExercises(ec1, ec2));
// } catch (err: unknown) {
//   let msg = 'something bad happened: ';
//   if (err instanceof Error) {
//     msg += `Error: ${err.message}`;
//   }

//   console.log(msg);

// }
