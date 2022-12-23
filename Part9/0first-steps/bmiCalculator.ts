/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ParsedQs } from "qs";

//TYPE DEFINITION
export interface bcValues {
  height: number,
  weight: number,
}


//PARSING TERMINAL ARGUMENTS
export const parseArguments = (args: string[]): bcValues => {
  if(args.length < 4) throw new Error('Not enough arguments');
  if(args.length > 4) throw new Error('Too many arguments');
  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('You should provide two numbers as arguments!');
  }
};

//PARSING REQ ARGUMENTS
export const parseRequest = (obj: ParsedQs): bcValues => {
  if (
    !(obj.height) 
    || !(obj.weight)
    || isNaN(Number(obj.height))
    || isNaN(Number(obj.weight))
  ) throw new Error('malformatted parameters');
  else return {
    height: Number(obj.height),
    weight: Number(obj.weight),
  };
};


//FUNCTION
export const calculateBmi = (height: number, weight: number, ): string => {
  const height2: number = Math.pow((height / 100), 2);
  const bmi: number = weight / height2;

  if (bmi < 18.5) return "Under (underweight)";
  else if (bmi < 24.9 && bmi > 18.5) return "Normal (healthy weight)";
  else if (bmi < 29.9 && bmi > 24.9) return "Over (overweight)";
  else if (bmi > 29.9) return "Obese (overweight)";
  else return '';

};

//ERROR CACTHING
// try {
//   const {height, weight} = parseArguments(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (err: unknown) {
//   let msg = 'something bad happened';
//   if (err instanceof Error) {
//     msg += `Error: ${err.message}`;
//   }

//   console.log(msg);

// }