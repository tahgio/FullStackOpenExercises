import {useEffect, useState, useMemo} from 'react'
import axios from 'axios'
import pService from './services/person'
import './index.css'


const Message = (props) => {
  if (props.m !== null) {
    if (props.m[0] === 'N')
    {return <div className='success'>{props.m}</div>} 
    else if (props.m[0] === 'E') {
      return <div className='error'>{props.m}</div>
    }
  } else {return null}
}



const Inpt = (props) => {
  return (<div>
    {props.text} <input value={props.val} onChange={props.func} />
  </div>)
}


const Numbers = (props) => {
  return (
    <p><strong>{props.nm}</strong> {props.nb} <button onClick={props.onClick} >delete</button></p> 
  )
}


const Persons = (props) => {
  return (
    <div>
    {props.obj.filter(props.func).map(e=><Numbers key={e.name} nm={e.name} nb={e.number} onClick={()=> props.del(e.id)}/>)}
    </div>
  )
}

const FormCntct = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div>
      name: <Inpt val={props.nmv} func={props.nmfunc} />
      </div>
      <div>
      number: <Inpt val={props.nbv} func={props.nbfunc} />
      </div>
      <div>
        <button type="submit">
          add
        </button>
      </div>
    </form>
  )
}


const App = () => {

const [persons, setNewPersons] = useState([])
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('000-0000000')
const [newFilter, setNewFilter] = useState('')
const [message, setMessage] = useState(null)

useEffect(() => {
  pService.getData()
    .then(initialNotes => 
      setNewPersons(initialNotes.data))
}, []);

const filterfunc = (e) => {
  if (newFilter === '') {
    return e === e;
  }
  return e.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
}

const addPerson = (event) => {
  event.preventDefault()
  if (persons.filter(e=>JSON.stringify(e.name).toLocaleLowerCase()=== JSON.stringify(newName).toLocaleLowerCase()).length !== 0) {
    if (window.confirm(`Woul you like to update '${newName}'?`)) {
      let obj = persons.find(e => e.name.toLowerCase() === newName.toLowerCase());
      obj.number = newNumber
      return pService
      .updateData(obj)
      .then(res => setNewPersons(persons.map(e =>
         e.id !== obj.id ? e : res.data)))
      .catch(()=> {
         setMessage(`Error: ${newName} has been removed from server`)
         setTimeout(()=> document.location.reload(true), 3000)})
        
    }
  }
   {
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    pService
      .createData(personObject)
      .then(response => {
        setNewPersons(persons.concat((response.data)))
        setMessage(
          `New contact "${newName}" has been succesfully created`
        )
        setTimeout(()=> {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('000-0000000')
      })    
  }
  } 
  

const personChange = (event) => {
  setNewName(event.target.value)
}

const numberChange = (event) => {
  setNewNumber(event.target.value)
}

const filterChange = (event) =>{
  setNewFilter(event.target.value)
}

const deletefunc = (id) => {
  if (window.confirm("Are you sure?")) {
    pService.deleteData(id)
  }
 }



return (
  <div>
    <h1>Phonebook</h1>
    <Message m={message} />
      <Inpt text="filter shown with:" val={newFilter} func={filterChange} />
    <h2>Add a new contact</h2>
      <FormCntct submit={addPerson} nmv={newName} nmfunc={personChange} nbv={newNumber} nbfunc={numberChange} />
    <h2>Numbers</h2>
      <Persons obj={persons} func={filterfunc} del={deletefunc} />
       
     </div>
)


  
} 


export default App;
