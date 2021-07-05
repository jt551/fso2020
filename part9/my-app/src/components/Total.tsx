import React from 'react';

interface TotalProps {
  sumOfAllExercises: number;
}

const Total = ({ sumOfAllExercises }: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises : <span>{sumOfAllExercises}</span>
      </p>
    </div>
  );
};

export default Total;
