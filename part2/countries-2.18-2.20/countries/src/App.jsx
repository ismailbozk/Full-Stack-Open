import { useEffect, useState } from 'react'
import Service from './Service/CountryService';
import CountryList from './Components/CountryList';
import CountryDetail from './Components/CountryDetail';

function Filter(props) {
  return (
    <div>
      <label id="filter">Find Countries</label>
      <input id="input" onChange={props.onChange} value={props.filter}></input>
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
      <CountryList countries={countries} onSelect={onShowCountry}/>
      <CountryDetail country={selectedCountry}/>
    </>
  );
}

export default App
