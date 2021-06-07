
const calculateBmi = (a: number, b: number): String => {
    if (!(a > 0) && !(b > 0)) {
        throw new Error('invalid input');
    }

    const height = a / 100;
    const weight = b;
    
    const bmi = weight / (height * height);
    
    if (bmi < 18.5) {
        return "Low, (weight is below normal)";
    }
    if (18.5 <= bmi && bmi <= 25) {
        return "Normal, (healthy weight)";
    }
    return "High, (weight higher than normal)";

}

console.log(calculateBmi(180, 74))