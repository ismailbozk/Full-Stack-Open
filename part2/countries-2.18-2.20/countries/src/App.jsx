import { useEffect, useState } from 'react'
import Service from './Service/CountryService';

function Filter(props) {
  return (
    <div>
      <label id="filter">Find Countries</label>
      <input id="input" onChange={props.onChange} value={props.filter}></input>
    </div>
  );
}

function CountryList(props) {
  if (props.countries === null || props.countries.length === 0) {
    return <></>;
  }

  if (props.countries.length === 1) {
    return <CountryDetail countries={props.countries} />;
  }

  if (props.countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  console.log(props.countries);
  return (
    <div>
      {props.countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
    </div>
  );
}

function CountryDetail(props) {
  if (props.countries === null || props.countries.length !== 1) {
    return <></>;
  }

  const country = props.countries[0];
  console.log(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  );
};


function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    Service.getAll()
      .then(data => {
        setAllCountries(data);
      })
      .catch(error => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const onChange = (event) => {
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
    console.log("filter applied: ", filter);
    console.log("countries found: ", filteredCountries.length);
  }

  return (
    <>
      <Filter filter={filter} onChange={onChange} />
      <CountryList countries={countries} />
    </>
  );
}

export default App
