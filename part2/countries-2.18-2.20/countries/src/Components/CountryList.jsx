function CountryList(props) {
  if (props.countries === null || props.countries.length < 2) {
    return <></>;
  }

  if (props.countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  console.log(props.countries);
  return (
    <div>
      {props.countries.map(country => {
        return (
          <div key={country.name.common}>
            <label>{country.name.common}</label>
            <button onClick={() => props.onSelect(country)}>Show</button>
          </div>
        );
      })}
    </div>
  );
}

export default CountryList;