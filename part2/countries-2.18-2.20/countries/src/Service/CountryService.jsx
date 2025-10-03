import axios from 'axios'
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const weather_api_key = import.meta.env.VITE_SOME_KEY


const getAll = () => {
  const request = axios.get(baseUrl + "all")
  return request.then(response => response.data)
}
    
const searchCountry = query => {
  const request = axios.get(`${baseUrl}name/${query}`)
  return request.then(response => response.data)
}

const GETWeather = (props) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${weather_api_key}&units=metric`;
    const request = axios.get(weatherUrl);
    return request.then(response => response.data);
}

export default { getAll, searchCountry, GETWeather };
