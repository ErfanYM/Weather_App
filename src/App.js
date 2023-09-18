import React,{useState} from "react"
import axios from 'axios'


function App() {

const [data, setData] = useState({})
const [location, setLocation]=useState('')
const [isImperial, setIsImperial] = useState(false)


const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=cc851c449acb37f228d910a3ef65dbdf`

const searchLocation = (event) => {
  if(event.key === 'Enter' ){
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    }) 
    setLocation('')
  }
}



  return (
    <div className="App">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter Location'
        type="text"/>
        <button className="btnMetric" onClick={event => setIsImperial(!isImperial)}>{isImperial ? '°C': '°F'}</button>
      </div>

      {data.name != undefined &&
      <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}, {data.sys.country}</p>
            </div>
            <div className="temp">
            {data.main ? <h1>{isImperial ? ((data.main.temp * 9 / 5)+32).toFixed() : data.main.temp.toFixed()}{isImperial ? '°F':'°C'}</h1> : null}              
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{isImperial ? ((data.main.feels_like * 9 /5)+32).toFixed() : data.main.feels_like.toFixed()}{isImperial ? ' °F':' °C'}</p> : null}
              <p>Feels Like</p> 
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p> 
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{isImperial ? ((data.wind.speed)/1.609344).toFixed() :data.wind.speed.toFixed()}{isImperial ? 'MPH': 'KPH'}</p> : null}
              <p>Wind Speed</p> 
            </div>
          </div>
          
      </div>
      } 
    </div>
      
  );
}

export default App;
