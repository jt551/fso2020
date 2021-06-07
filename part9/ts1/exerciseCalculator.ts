interface exerciseResults {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}
const getRatingNumber = (average: number): number => {
    if (average < 1) {
        return 1;
    }
    if (average < 2) {
        return 2;
    }
    if (average < 3) {
        return 3;
    }
    if (average < 4) {
        return 4;
    }
    return 5;
}

const getRatingText = (average: number): string => {
    if (average < 1) {
        return 'get a move on';
    }
    if (average < 2) {
        return 'not too bad but could be better';
    }
    if (average < 3) {
        return 'good';
    }
    if (average < 4) {
        return 'great';
    }
    return 'awesome';
}

const calculateExercises = (weeklyData: number[], target: number): exerciseResults => {
    let trainingDays = 0
    let total = 0
    weeklyData.forEach(entry => {
        if (entry > 0) {
            trainingDays += 1
        }
        total += entry
    })
    const average = total / weeklyData.length
    const success = target <= average

    const resultObj = {
        periodLength: weeklyData.length,
        trainingDays: trainingDays,
        target: target,
        average: average,
        success: success,
        rating: getRatingNumber(average),
        ratingDescription: getRatingText(average)
    }
    return resultObj
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
