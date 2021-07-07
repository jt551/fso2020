import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: {part: CoursePart}) => {
  const renderParts = (p: CoursePart) => {
    return Object.entries(p).map((key, value) => {
      console.log(key);
      if(key[0] === 'name'){
        return <h4 key={value}><span>{key[0]}</span> : <span>{key[1]}</span></h4>
      } else {
        return <p key={value}><span>{key[0]}</span> : <span>{key[1]}</span></p>
      }
  })
}

  switch (part.type) {
    case 'normal':
      const fa = Object.entries(part).map((key, value) => {
        console.log(key);
        if(key[0] === 'name'){
          return <h4 key={value}><span>{key[0]}</span> : <span>{key[1]}</span></h4>
        }
        return(
        <p key={value}><span>{key[0]}</span> : <span>{key[1]}</span></p>
        )
      });
      
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
