import React from 'react';

const PlaceFilter = ({dispatcher}) => [
    <select multiple>
        <option value= "Horsens" onClick={() => dispatcher()({type:'getData', place: 'Horsens'})}>Horsens</option>
        <option value= "Aarhus" onClick={() => dispatcher()({type:'getData', place:'Aarhus'})}>Aarhus</option>
        <option value= "Copenhagen" onClick={() => dispatcher()({type:'getData', place:'Copenhagen'})}>Copenhagen</option>
    </select>
]

const ForecastData = ({forecast_data, dispatcher}) => [
    <h3>From: <b id = "forecastDatafrom">{forecast_data.from}</b>,
    To: <b id = "forecastDatato">{forecast_data.to}</b>,
    Type: <b id = "forecastDatatype">{forecast_data.type}</b>,
    Unit: <b id = "forecastDataunit">{forecast_data.unit}</b>,
    Time: <b id = "forecastDatatime">{forecast_data.time}</b>,
    Place: <b id = "forecastDataplace">{forecast_data.place}</b>,
    Precipitation type: <b id = "forecastDataprec">{forecast_data.precipitation_types}</b>,
    Direction: <b id = "forecastDatadirection">{forecast_data.directions}</b></h3>
  ]
  
  const WeatherData = ({weather_data, dispatcher}) => [
    <h3>Value: <b id = "weather_datavalue">{weather_data.value}</b>,
    Type: <b id = "weather_datatype">{weather_data.type}</b>,
    Unit: <b id = "weather_dataunit">{weather_data.unit}</b>,
    Time: <b id = "weather_datatime">{weather_data.time}</b>,
    Place: <b id = "weather_dataplace">{weather_data.place}</b>,
    Precipitation type: <b id = "weather_dataprec">{weather_data.precipitation_type}</b>,
    Direction: <b id = "weather_datadirection">{weather_data.direction}</b></h3>
  ] 
  
  /* function WeatherDataRow(props) {
    const numbers = props.numbers;
    const WeatherDataRow1 = (props) => (
      <tr>
                {numbers.map((number) =>
          <WeatherData key={number.toString()}
                    value={number} 
                    {...props}/>
        )}
      </tr>
  );
    return (
      WeatherDataRow1
    );
  } */
  
  /* function ForecastDataRow(props) {
    const numbers1 = props.numbers;
    const ForecastDataRow1 = (props) => (
      <tr>
                {numbers1.map((number) =>
          <ForecastData key={number.toString()}
                    value={number} 
                    {...props}/>
        )}
      </tr>
  );
    return (
      ForecastDataRow1
    );
  } */
  
  
  const WeatherDataProp = (props) => (
    <WeatherData {...props}/>
  )
  
  const ForecastDataProp = (props) => (
    <ForecastData {...props}/>
  )
  
  const WeatherDataBody = ({model, dispatcher}) => (
    model.weatherData().map(weather_data => <WeatherDataProp {...{weather_data, dispatcher}}/>)
  )
  
  const ForecastDataBody = ({model, dispatcher}) => (
    model.forecastData().map(forecast_data => <ForecastDataProp {...{forecast_data, dispatcher}}/>)
  )
  
  
  export default dispatcher => model => (
    <div id='base'>
        <h1>WeatherData</h1>
        <PlaceFilter {...{dispatcher}}/>
        <WeatherDataBody {...{model, dispatcher}}/>
        <ForecastDataBody {...{model, dispatcher}}/>
  
    </div>
  )