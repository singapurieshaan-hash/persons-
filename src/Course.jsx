const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part => 
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
    </div>
  )
}

const Total = (props) => {
  const totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Total exercises: {totalExercises}</p>
}

const Course = (props) => {
  return (
  <div>
  <Header course={props.course} />
  <Content course={props.course} />
  <Total course={props.course} />
  </div>
)
}

export default Course