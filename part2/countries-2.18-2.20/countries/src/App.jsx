import { useEffect, useState } from 'react'
import Service from './Service/CountryService';
import CountryList from './Components/CountryList';
import CountryDetail from './Components/CountryDetail';
import Filter from './Components/Filter';

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setWeather(null);

    if (selectedCountry === null) {
      return;
    }

    Service.GETWeather({lat: selectedCountry.capitalInfo.latlng[0], lon: selectedCountry.capitalInfo.latlng[1]})
      .then(data => {
        setWeather(data);
        console.log("Weather data fetched:", data);
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }, [selectedCountry]);

  useEffect(() => {
    Service.getAll()
      .then(data => {
        setAllCountries(data);
      })
      .catch(error => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const onFilterChange = (event) => {
    const filter = event.target.value;
    setFilter(filter);

    if (filter === "") {
      setCountries([]);
      return;
    }

    const filteredCountries = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    
    setCountries(filteredCountries);
    setSelectedCountry(filteredCountries.length === 1 ? filteredCountries[0] : null);
    console.log("filter applied: ", filter);
    console.log("countries found: ", filteredCountries.length);
  }

  function onShowCountry(country) {
    setSelectedCountry(country);
  }

  return (
    <>
      <Filter filter={filter} onChange={onFilterChange} />
      <CountryList countries={countries} onSelect={onShowCountry} />
      <CountryDetail country={selectedCountry} weather={weather} />
    </>
  );
}

export default App
