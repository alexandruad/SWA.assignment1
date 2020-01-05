import React from 'react';

const PlaceFilter = ({dispatcher}) => [
    <select multiple>
        <option value= "Horsens" onClick={() => dispatcher()({type:'getData', place: 'Horsens'})}>Horsens</option>
        <option value= "Aarhus" onClick={() => dispatcher()({type:'getData', place:'Aarhus'})}>Aarhus</option>
        <option value= "Copenhagen" onClick={() => dispatcher()({type:'getData', place:'Copenhagen'})}>Copenhagen</option>
    </select>
]

const DateFilter = ({dispatcher}) => [
    <div>
      <h3>Choose a time interval</h3>
      <input id="from" type="datetime-local"/>
      <input id="to" type="datetime-local"/>
      <button onClick={() => dispatcher()({type: "dateFilter"})}>Filter</button>
    </div>
]

const Refresh = ({dispatcher}) => 
[
    <button onClick={() => dispatcher()({type:'getData',place:""})}>Reload Data!</button>
]


const UserInputs = ({dispatcher})=>
[
  <div>
    <h3>Report historical data</h3>
        <form id="dataForm">
          Place: <input type="text" name="city" list="citynames" ng-model="place"/>
            <datalist id="citynames">
              <option value="Horsens"></option>
              <option value="Aarhus"></option>
              <option value="Copenhagen"></option>
            </datalist>
            Type: <input type="text" name="type" list="typenames" ng-model="type"/>
              <datalist id="typenames">
                <option value="temperature"></option>
                <option value="precipitation"></option>
                <option value="wind speed"></option>
                <option value="cloud coverage"></option>
              </datalist>
              Time: <input type="datetime-local" id="historyTime" ng-model="time"/>
                <br/>
                  <br/>
                    Value: <input type="number" min="-10" max="100" ng-model="value"/>
                      Unit: <input type="text" name="unit" list="unitnames" ng-model="unit"/>
                        <datalist id="unitnames">
                          <option value="C"></option>
                          <option value="mm"></option>
                          <option value="m/s"></option>
                          <option value="%"></option>
                        </datalist>
                        <br/>
                          <br/>
                            Precipitation type: <input type="text" name="precipitation" list="precipitationnames" ng-model="precipitation_type"/>
                              <datalist id="precipitationnames">
                                <option value="rain"></option>
                                <option value="sleet"></option>
                                <option value="hail"></option>
                                <option value="snow"></option>
                              </datalist>
                              Direction: <input type="text" name="direction" list="directionnames" ng-model="direction"/>
                                <datalist id="directionnames">
                                  <option value="North"></option>
                                  <option value="Northeast"></option>
                                  <option value="East"></option>
                                  <option value="Southeast"></option>
                                  <option value="South"></option>
                                  <option value="Southwest"></option>
                                  <option value="West"></option>
                                  <option value="Northwest"></option>
                                </datalist>
                </form><br></br>
                              <button type="submit" form="dataForm" value="Submit" onClick= {() => dispatcher()({type:'SubmitData', })}>Submit</button>
                                <br></br>
  </div>
]

const ForecastData = ({forecast_data}) => [
    <h3>From: <b id = "forecastDatafrom">{forecast_data.from}</b>,
    To: <b id = "forecastDatato">{forecast_data.to}</b>,
    Type: <b id = "forecastDatatype">{forecast_data.type}</b>,
    Unit: <b id = "forecastDataunit">{forecast_data.unit}</b>,
    Time: <b id = "forecastDatatime">{forecast_data.time}</b>,
    Place: <b id = "forecastDataplace">{forecast_data.place}</b>,
    Precipitation type: <b id = "forecastDataprec">{forecast_data.precipitation_types}</b>,
    Direction: <b id = "forecastDatadirection">{forecast_data.directions}</b></h3>
  ]
  
  const WeatherData = ({weather_data}) => [
    <h3>Value: <b id = "weather_datavalue">{weather_data.value}</b>,
    Type: <b id = "weather_datatype">{weather_data.type}</b>,
    Unit: <b id = "weather_dataunit">{weather_data.unit}</b>,
    Time: <b id = "weather_datatime">{weather_data.time}</b>,
    Place: <b id = "weather_dataplace">{weather_data.place}</b>,
    Precipitation type: <b id = "weather_dataprec">{weather_data.precipitation_type}</b>,
    Direction: <b id = "weather_datadirection">{weather_data.direction}</b></h3>
  ] 
  
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
        <PlaceFilter {...{dispatcher}}/>
        <DateFilter {...{dispatcher}}/>
        <Refresh {...{dispatcher}}/>
        <UserInputs {...{dispatcher}}/>
        <h1>WeatherData</h1>
        <WeatherDataBody {...{model, dispatcher}}/>
        <h1>ForecastData</h1>
        <ForecastDataBody {...{model, dispatcher}}/>
  
    </div>
  )