//import keyIndex from 'react-key-index'

export default (init_model, view, renderer) => {
    let model = init_model
  
/*     var ListStore = {
      items:[]
    } */

    function reducer(action, model) {
      switch(action.type) {
        case 'WeatherData':
          const { weather_data} = action
          /* return model.addWeatherData(keyIndex(weather_data,1)).updateWeatherData(weather_data) */
          return model.addWeatherData(weather_data).updateWeatherData(weather_data)
        case 'ForecastData':
            const { forecast_data} = action
            /* return model.addForecastData(keyIndex(forecast_data,1)).updateForecastData(forecast_data) */
            return model.addForecastData(forecast_data).updateForecastData(forecast_data)
    
        default:
          return model
      }
    }
    
    return action => {
      model = reducer(action, model)
      renderer(view(model))
    }
  }