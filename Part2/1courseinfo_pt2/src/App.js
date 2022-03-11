import Course from "./components/Course"

const App = () => {
  const course = [{
    id: 1,
    name: 'Half Stack application development',
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  },{
    name: "FullStack is Awesome !",
    id: 3,
    parts: [
      {
        name: "How to open cmd on Windows",
        exercises: 23,
        id:1
      },
      {
        name: `Loggin' "Hello word"`,
        exercises: 37,
        id:2
      },
      {
        name: "Node, MongoDB and GraphQL",
        exercises: 2,
        id:3
      },
      {
        name: "Creating an account on Github",
        exercises: 25,
        id: 4
      }
    ]
  }
]

  return <Course title="Web development curriculum" co={course} />
}

export default App