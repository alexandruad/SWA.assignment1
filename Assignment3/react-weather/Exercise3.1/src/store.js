
export default (init_model, view, renderer) => {
  let model = init_model

  function reducer(action, model) {
    switch (action.type) {
      case 'dateFilter':
        const {
          from, to, weather_data, forecast_data
        } = action
        const filteredData = weather_data.filter(e => e.time > from && e.time < to)
        const filteredForecast = forecast_data.filter(e => e.time > from && e.time < to)
        model = model.updateWeather(filteredData, filteredForecast)
        return model
      case 'getData':
        const {
          weatherData, forecastData
        } = action
        model = model.updateWeather(weatherData, forecastData)
        return model
      case 'SubmitData':
        model = model.addWeatherData(weatherData, forecastData)
        model = model.addForecastData(forecastData, weatherData)
        return model
      default:
        return model
    }
  }

  return action => {
    model = reducer(action, model)
    renderer(view(model))
  }
}