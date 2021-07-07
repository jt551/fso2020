import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  const renderParts = (p: CoursePart) => {
    return Object.entries(p).map((key, value) => {
      console.log('key: ', key);
      console.log('value: ', value);
      if (key[0] === 'name') {
        return (
          <h4 key={value}>
            <span>{key[0]}</span> : <span>{key[1]}</span>
          </h4>
        );
      } else {
        return (
          <p key={value}>
            <span>{key[0]}</span> : <span>{key[1]}</span>
          </p>
        );
      }
    });
  };

  switch (part.type) {
    case 'normal':
      const normalPart = renderParts(part);
      return <div>{normalPart}</div>;
    case 'groupProject':
      const groupPart = renderParts(part);
      return <div>{groupPart}</div>;
    case 'submission':
      const submissionPart = renderParts(part);
      return <div>{submissionPart}</div>;
    case 'descriptive':
      const descriptivePart = renderParts(part);
      return <div>{descriptivePart}</div>;
    default:
      return assertNever(part);
  }
};

export default Part;
