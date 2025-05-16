const Header = (props) => (
    <h1>{props.course}</h1>
)

const Part = (props) => (
    <p>{props.part} {props.exercise}</p>
)

const Total = (props) => (
    <p>Number of exercises {props.num1 + props.num2 + props.num3}</p>
)

const App = () => {

    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }
  
    return (
      <div>
        <Header course={course} />
        <Part part={part1.name} exercise={part1.exercises} />
        <Part part={part2.name} exercise={part2.exercises} />
        <Part part={part3.name} exercise={part3.exercises} />
        <Total num1={part1.exercises} num2={part2.exercises} num3={part3.exercises} />
      </div>
    )
  }

export default App
