import {useState, useEffect, useRef} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const Search = (props) => {
  return (
    <div>
      <span>{props.text}</span> <input value={props.value} onChange={props.onChange}/>
    </div>
  )
}
const MapPara = (props) => {
  return (<div>
    <span>{props.value}</span>
    <button onClick={props.onClick}>show</button>
  </div>)
}

const Showdata = (props) => {
  
  let lat = props.elmnt.latlng[0]
  let lon = props.elmnt.latlng[1]
  const hook2 = () => axios
     .get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+api_key)
     .then(response => props.hfunc(response.data));
   useEffect(hook2,[])
 if (props.w.name != undefined) {
  return(
    <div>
      <h1>{props.elmnt.name.common}</h1>
      <p><strong>Capital: </strong>{props.elmnt.capital[0]}</p>
      <p><strong>Area: </strong>{props.elmnt.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(props.elmnt.languages).map(mfnc2)}
      </ul>
     <img src={props.elmnt.flags.png} />
      <h3>Weather in {props.elmnt.name.common}</h3>
      <p><strong>Temperature:</strong> {props.w.main.temp} ºC</p>
      <img src={"http://openweathermap.org/img/wn/"+props.w.weather[0].icon+"@2x.png"}/>
      <p><strong>wind:</strong> {props.w.wind.speed} m/s</p>   
    </div>
  )} else {return <p></p>}
}

const Langlist = (props) => {
  return <li>{props.value}</li>
}

const mfnc2 = (e) => {
  return <Langlist key={e} value={e} />
}

const DataCountries = (props) => {
  let filtArr = props.obj.filter(props.filfunc)

  if (filtArr.length > 10) {
    return (<p>Too many countries, specify another filter</p>)
  } else if (filtArr.length > 1) {
    return (<div>{filtArr.map((e) => {
      return (<MapPara key={e.cca3} value={e.name.common} onClick={()=> props.func(e)}/>)
    })}</div>)
  } else if (filtArr.length === 1) {
    let ctr = filtArr[0]
    return (
    <Showdata elmnt={ctr} hfunc={props.hfunc} w={props.w}/>)
  }
  return <p>Not Found!</p>
}

function App() {
const [countries, setNewCountries] = useState([])  
const [newFilter, setNewFilter] = useState('')
const [newWeather, setNewWeather] = useState({})

const hook = () => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => setNewCountries(response.data))
    
}

useEffect (hook,[])




const fltfnc = (e) => {
  return e.name.common.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
} 

const filterChange = (event) => {
  setNewFilter(event.target.value)
}

const showfunc = (e) => {
  setNewFilter(e.name.common)
}

const hookfunc = (e) => {
  setNewWeather(e)
}


  return (
    <div>
      <Search text="find countries " 
      value={newFilter} onChange={filterChange}/>
      <DataCountries filfunc={fltfnc} obj={countries} func={showfunc} hfunc={hookfunc} w={newWeather}/>
    </div>
  );
}

export default App;
