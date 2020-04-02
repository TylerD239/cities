import React, {useState} from 'react';
import {Info} from './components/info';
import {Weather} from './components/Weather';
import {Form} from './components/form';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Loader} from './components/Loader';



const App = () => {


  const [state, setState] = useState({  
    
    temp: undefined,
    speed: undefined,
    condition: undefined,
    pression: undefined,
    url: undefined,
    error: undefined})

  const [loading, setLoading] = useState(false)  


  const getWeather = async (city) => {
    setLoading(true)

    if (!city) return

    const weatherApi = await fetch('/api/getWeather', {
      method: "GET",
      headers: {
      "city": encodeURIComponent(city)}
    })

    const data = await weatherApi.json()

    if (data.error) {
       setState({
        error: 'Такой город не найден'
       })
       return setLoading(false)
    }

    const weather = data.weather
    const geo = data.geo

    setState({
      place: geo.result.address[0].features[0].properties.description,
      temp: weather.fact.temp,
      speed: weather.fact.wind_speed,
      pressure: weather.fact.pressure_mm,
      url: weather.info.url,
      error: ''
  })
    setLoading(false)
  }



return (
  <div>
      <Info />
      <Form getW={getWeather}/>
      {loading ? <Loader /> : <Weather {...state} />}

    </div>
  )
}


export default App;

 // <li className="list-group-item">Город: <strong>{weather.place}&deg;</strong></li>