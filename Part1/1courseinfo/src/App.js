const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


const Header = (props) => {
  
  return (
    <h1>{props.course.name}</h1>
  );
};

const Part = (props) =>{
  return (
  <p>{props.nb} {props.ex}</p>)
}

const Content = (props) => {
  return (
    <div>
      <Part nb={props.course.parts[0].name} ex={props.course.parts[0].exercises} />
      <Part nb={props.course.parts[1].name} ex={props.course.parts[1].exercises} />
      <Part nb={props.course.parts[2].name} ex={props.course.parts[2].exercises} />
    </div>
  )

}

const Total = (props) => {
   return (
  <p>Number of 
    exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} 
  </p>)
}

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App