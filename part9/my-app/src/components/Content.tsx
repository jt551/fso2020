import React from 'react';

interface ContentProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Content = ({ courseParts }: ContentProps) => {
  const courseList = courseParts.map((course) => (
    <p key={course.name}>
      {course.name} {course.exerciseCount}
    </p>
  ));
  return <div>{courseList}</div>;
};

export default Content;
