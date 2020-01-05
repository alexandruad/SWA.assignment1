//Creating a model which can access and map data regarding weather and forecast
//weather_data and forecast_data are arrays
const model = (weather_data, forecast_data) => {

    //map the model weather data to a constant
    const weatherData = () => weather_data
        .map(d => ({ ...d}))

    //map the model forecast data to a constant
    const forecastData = () => forecast_data
        .map(f => ({ ...f}))

    //push new weather data to the weather_data array
    const addWeatherData = d => {
        weather_data.push(d)
    }
   
    return {
        weatherData,
        forecastData,
        addWeatherData,       
    }
}

//this is to make importing in the component easier
export default model