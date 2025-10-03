import Weather from "./Weather";

function CountryDetail(props) {
    if (props.country === null) {
        return <></>;
    }

    const country = props.country;
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
            <h2>Weather in {country.capital}</h2>
            <Weather weather={props.weather} />
        </div>
    );
};

export default CountryDetail;