const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
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

export default Course
