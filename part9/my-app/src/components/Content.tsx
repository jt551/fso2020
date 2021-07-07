import React from 'react';
import Part from './Part'
import {CoursePart} from '../types'

const Content = ({parts}: {parts: CoursePart[]}) => {
  const courseList = parts.map((part) => (
    <Part key={part.name} part={part}/>
  ));
  return <div>{courseList}</div>;
};

export default Content;
