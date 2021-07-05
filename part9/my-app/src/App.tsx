import React from 'react';
import Header from './components/Header';
import Total from './components/Total'
import Content from './components/Content';
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const getTotal = (): number => {
    return courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  }

  return (
    <div>
      <Header nameForHeader={courseName}/>
      <Content courseParts={courseParts}/>
      <Total sumOfAllExercises={getTotal()}/>
    </div>
  );
};

export default App;