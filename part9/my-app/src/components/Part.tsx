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
      return (
        <div>
          <p>1a1</p>
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
