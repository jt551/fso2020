import React from 'react';
import Header from './components/Header';
import Total from './components/Total'
import Content from './components/Content';
import { CoursePart } from './types';
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ]

  const getTotal = (): number => {
    return courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  }

  return (
    <div>
      <Header nameForHeader={courseName}/>
      <Content parts={courseParts}/>
      <Total sumOfAllExercises={getTotal()}/>
    </div>
  );
};

export default App;