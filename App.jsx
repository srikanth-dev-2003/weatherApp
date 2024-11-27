import { useState } from 'react'
import './App.css'
import cloudIcon from './assets/Cloud.png';
import humidityIcon from './assets/Humidity.png';
import rainIcon from './assets/Rain.png';
import searchIcon from './assets/Search.png';
import snowIcon from './assets/Snow.png';
import stormIcon from './assets/Storm.png';
import sunIcon from './assets/Icon.png';
import windIcon from './assets/Wind.png';
import drizzleIcon from './assets/Drizzle.png'

const WhetherDetails = ({icon,temp,city,country,lat,long,wind,humidity}) =>{
  return(
    <>
    <div className="image">
      <img src={icon} alt="icon" height={150} width={150} />
    </div>
    <div className="temp">{temp}&deg;C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">latitude</span>
        <span>{lat}</span>
      </div>
      <div>
      <span className="long">longitude</span>
      <span>{long}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humidityIcon} alt="humidity icon" className='icon' />
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windIcon} alt="wind icon" className='icon' />
        <div className="data">
          <div className="wind-speed">{wind} km/hr</div>
          <div className="text">Humidity</div>
        </div>
      </div>
    </div>
    </>
  )
} ;



function App() {
  let api = "ed9203bacad5948e74e225c5c739bc69";

   const [icon,setIcon] = useState(snowIcon);
   const [temp,setTemp] = useState(0);
   const [city,setLocation] = useState("Coimbatore");
   const [country,setCountry] = useState("India");
   const [lat,setLat] = useState(0);
   const [long,setLong] = useState(0);
   const [humidity,setHumidity] = useState(0);
   const [wind,setWind] = useState(0);
   const [text,SetText] = useState("Chennai");
   const [cityNotFound , setCityNotFound] = useState(false);
   const [loading, setLoading] = useState(false);

   const weatherIconMap ={
    "01d" : sunIcon,
    "01n" : sunIcon,
    "02d" : cloudIcon,
    "02n" : cloudIcon,
    "03d" : sunIcon,
    "03n" : sunIcon,
    "04d" : sunIcon,
    "04n" : sunIcon,
    "09d" :rainIcon,
    "09n" :rainIcon,
    "10d" :rainIcon,
    "10n" :rainIcon,
    "13d" :snowIcon,
    "13n" :snowIcon,

   };

   const search = async() =>{
     setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api}&units=metric`;
    try{
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404"){
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
        
      }
      setCountry(data.sys.country);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(data.main.temp);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      setLocation(data.name);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode]||icon);
      setCityNotFound(false);
      
    }catch(error){
       console.log("An error occurred :",error.message);
       
    }finally{
      setLoading(false);
    }
  };
const handleCity = (e) => {
  SetText(e.target.value);
}
const handleKeyDown = (e) =>{
  if(e.key === "Enter"){
    search();
  }
}
  return (
    <>
    <div className='Container'>
      <div className="Search-Box">
        <input type="text" className='CityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
        <div className="Search-Icon">
        <img src={searchIcon} alt="Search Icon" height={25} width={25} onClick={()=>search()} />
        </div>
      </div>
      <WhetherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind}  /  >
      <p className='copywrites'>
      &copy; Designed by <span>Srikanth</span>
    </p>
    </div>

    </>
  );
};

export default App
