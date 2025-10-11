const Weather = (props) => {
    if (props.weather === null) {
        return <div>Loading weather data...</div>;
    }

    console.log("getting ready for weather data", props.weather);

    const temparute = props.weather.main.temp;
    const imageUrl = `http://openweathermap.org/img/wn/${props.weather.weather[0].icon}.png`;
    const wind = props.weather.wind.speed;
    return (
        <div>
            <div>Temperature: {temparute}</div>
            <img src={imageUrl}/>
            <div>Wind: {wind}</div>
        </div>
    );
};

export default Weather;