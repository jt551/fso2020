import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
//{Object.entries(part).forEach(([key, value]) => <p>${value}</p>)}
const Part = ({part}: {part: CoursePart}) => {
  switch (part.type) {
    case 'normal':
      const fa = Object.entries(part).map((key, value) => {
        return(
        <p key={value}><span>{key}</span> : <span>{value}</span></p>
        )
      });
      console.log(fa);
      
      return (
        <div>
         {fa}
        </div>
      );
    case 'groupProject':
      return null;
    case 'submission':
      return null;
    case 'descriptive':
      return null;
    default:
      return assertNever(part);
  }
};

export default Part;
