import React from 'react';

const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}


const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (<Part key={part.id} part={part} />))}
    </div>
  )
}

const Total = ({ parts }) => {
  return(
    <strong>total of {parts.reduce((sum, parts)=> sum + parts.exercises, 0)} exercises</strong>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;