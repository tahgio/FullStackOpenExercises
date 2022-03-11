import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>
const StatisticLine = (props) => <div>{props.text} {props.value}</div>
const Button = (props)=> <button onClick={props.onClick}>{props.text}</button>
const Statistics = (props) => {
 
if (isNaN(props.av)) {
  return <p>No feedback given</p>
}
  return (
  <table>
  <tbody>
  <tr>
    <td><StatisticLine text="good" value={props.g} /></td>
  </tr>
  <tr>
    <td><StatisticLine text="neutral" value={props.n} /></td>
  </tr>
  <tr>
    <td><StatisticLine text="bad" value={props.b} /></td>
  </tr>
  <tr>
    <td><StatisticLine text="all" value={props.a} /></td></tr>
  <tr>  
    <td><StatisticLine text="average" value={props.av}  /></td>
  </tr>
  <tr>
    <td><StatisticLine text="positive" value={props.pos} /></td>
  </tr>
  </tbody>
  </table>
  )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = (good + neutral + bad)
  const average = ((good + (bad * -1)) / total)
  const positive = ((good*100)/total + " %")

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={()=> setGood(good + 1)} text="good" />
      <Button onClick={()=> setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={()=> setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics g={good} n={neutral} b={bad} a={total} av={average} pos={positive} />
      
    </div>
  )
}
export default App