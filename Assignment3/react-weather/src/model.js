//import keyIndex from 'react-key-index'

const model = (weatherdata, forecastdata, filter = () => true) => {
    const forecastMap = {}
    const weatherdataMap = {}
    forecastdata.forEach(e => forecastMap[e.place] = e)
    weatherdata.forEach(e => weatherdataMap[e.place] = e)

    const forecastData = () => forecastdata
        .map(p => ({ ...p, ...forecastMap[p.place]}))
       // keyIndex(forecastMap, 1))
        .filter(filter)

    const weatherData = () => weatherdata
        .map(p => ({ ...p, ...weatherdataMap[p.place]}))
       // keyIndex(weatherdataMap, 1))
        .filter(filter)    

    const updateWeatherData = p => model(weatherdata.map(pp => p.id === pp.id? p : pp), forecastdata, filter)
    const updateForecastData = p => model(weatherdata,  forecastdata.map(pp => p.id === pp.id? p : pp), filter)
    //const addForecast = e => model( forecastdata.concat(e), filter)
    const addWeatherData = e => model(weatherdata.concat(e), forecastdata, filter)
    const addForecastData = e => model( weatherdata, forecastdata.concat(e),filter)
    
    
    const filtered = filter => model(weatherdata, forecastdata, filter )
    const all = () => model(weatherdata, forecastdata)

    function displayData(city) {
        if (city === "Horsens") {
          fetch('http://localhost:8080/data/' + city)
            .then(data => data.json())
            .then(function (response) {
              //console.log(response)
              weatherdata = response
              updateWeatherData(weatherdata)
              //console.log(updateWeatherData(weatherdata))

            })

        }
        if (city === "Aarhus") {
          fetch('http://localhost:8080/data/' + city)
            .then(data => data.json())
            .then(function (response) {
              console.log(response)
            })
        }
        if (city === "Copenhagen") {
          fetch('http://localhost:8080/data/' + city)
            .then(data => data.json())
            .then(function (response) {
              console.log(response)
            })
        }
      }
    return {displayData, weatherData, updateForecastData, updateWeatherData, addForecastData,forecastData,addWeatherData, filtered, all }
}

export default model