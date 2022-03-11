import { useState } from 'react'

const Header = (props) => {
  return ( <h1>{props.text}</h1> )}

const Button = (props) => {return (    
    <button onClick={props.onClick}>{props.text}</button>
  )}

  

const AnedoctePara = (props) => {
  if (Math.max(props.index) === 0) {
    return <p>No votes yet</p>}
  return <div>
    <p>{props.largest}</p>
    <p>has {props.index} votes</p>
    </div>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const randomSelect = () => { return setSelected(Math.floor(Math.random()*(anecdotes.length-1)))}
  const [points, setPoints] = useState(Array(anecdotes.length - 1).fill(0))
  const cPoints = [...points]
  const laindex = cPoints.indexOf(Math.max(...cPoints))
  const largestAnecdote = anecdotes[laindex]


  const vote = () => { cPoints[selected] += 1;
    return setPoints([...cPoints]) } 
    

  return (
    <div>
      <Header text="Anedocte of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {cPoints[selected]} votes</p>
      <Button onClick={vote} text="vote" />
      <Button onClick={randomSelect} text="next anedocte"/>
      <Header text="Anedocte with most votes" />
      <AnedoctePara largest={largestAnecdote} index={cPoints[laindex]}/>
    </div>
  )
}
export default App