//import keyIndex from 'react-key-index'
import model from './model.js'

export default (init_model, view, renderer) => {
    let model = init_model
  
/*     var ListStore = {
      items:[]
    } */

    function reducer(action, model) {
      switch(action.type) {
        case 'Horsens':
          //const { weather_data } = action
          /* return model.addWeatherData(keyIndex(weather_data,1)).updateWeatherData(weather_data) */
          //return model.addWeatherData(weather_data).updateWeatherData(weather_data)
        // case 'forecastData':
        //     const { forecast_data} = action
        //     /* return model.addForecastData(keyIndex(forecast_data,1)).updateForecastData(forecast_data) */
        //     return model.addForecastData(forecast_data).updateForecastData(forecast_data)
        case 'getData':
            const {weatherData, forecastData} = action
            model = model.updateWeather(weatherData, forecastData)

            
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