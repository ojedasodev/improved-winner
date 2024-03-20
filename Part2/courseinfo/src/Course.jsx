/* eslint-disable react/prop-types */
const Header = ({ text }) => <h1>{text}</h1>;

const Total = ({ exercises }) => {
  let sum = 0;
  exercises.forEach((element) => {
    sum += element;
  });
  return <p>Number of exercises {sum}</p>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((part) => part.exercises)} />
    </div>
  );
};

export default Course;
