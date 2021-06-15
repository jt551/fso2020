export const calculateBmi = (a: number, b: number): string => {
  if (!(a > 0) || !(b > 0)) {
    throw new Error('invalid input');
  }

  const height = a / 100;
  const weight = b;

  const bmi = weight / (height * height);

  if (bmi < 18.5) {
    return 'Low, (weight is below normal)';
  }
  if (18.5 <= bmi && bmi <= 25) {
    return 'Normal, (healthy weight)';
  }
  return 'High, (weight higher than normal)';
};

export const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    const parsedArray = [Number(args[0]), Number(args[1])];
    return parsedArray;
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const checkAndReturnBmi = (h: any, w: any): string => {

    const height : number = Number(h)
    const weight : number = Number(w)
    let bmiReturn: string = 'malformatted parameters'

    if(!isNaN(height) && !isNaN(weight)) {
        bmiReturn = calculateBmi(height, weight);
    } 

    return bmiReturn;
}
/*
const userArgs = process.argv.slice(2);

try {
  const [userHeight, userWeight] = parseArguments(userArgs);
  console.log(calculateBmi(userHeight, userWeight));
} catch (error) {
  console.log('Error : ', error.message);
}
*/