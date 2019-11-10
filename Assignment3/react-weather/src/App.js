//import React ,{Component} from 'react';
import React from 'react';
import './App.css';
import 'react-dropdown/style.css'
//import keyIndex from  'react-key-index'


const ForecastData = ({forecast_data, dispatcher}) => [
  <b id = "forecastDatafrom">{forecast_data.from}</b>,
  <b id = "forecastDatato">{forecast_data.to}</b>,
  <b id = "forecastDatatype">{forecast_data.type}</b>,
  <b id = "forecastDataunit">{forecast_data.unit}</b>,
  <b id = "forecastDatatime">{forecast_data.time}</b>,
  <b id = "forecastDataplace">{forecast_data.place}</b>,
  <b id = "forecastDataprec">{forecast_data.precipitation_types}</b>,
  <b id = "forecastDatadirection">{forecast_data.directions}</b>
]

const WeatherData = ({weather_data, dispatcher}) => [
  <b id = "weather_datavalue">{weather_data.value}</b>,
  <b id = "weather_datatype">{weather_data.type}</b>,
  <b id = "weather_dataunit">{weather_data.unit}</b>,
  <b id = "weather_datatime">{weather_data.time}</b>,
  <b id = "weather_dataplace">{weather_data.place}</b>,
  <b id = "weather_dataprec">{weather_data.precipitation_type}</b>,
  <b id = "weather_datadirection">{weather_data.direction}</b>
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


const WeatherDataRow = (props) => (

      <WeatherData 
      {...props}/>

)

const ForecastDataRow = (props) => (

      <ForecastData 
      
      {...props}/>

)

const WeatherDataBody = ({model, dispatcher}) => (

            model.weatherData().map(weather_data => <WeatherDataRow {...{weather_data, dispatcher}}/>)

)

const ForecastDataBody = ({model, dispatcher}) => (

          model.forecastData().map(forecast_data => <ForecastDataRow {...{forecast_data, dispatcher}}/>)

)


export default dispatcher => model => (
  <div id='base'>
      <h1>WeatherData</h1>

      <select multiple>
        <option value= "Horsens" onClick={() => model.displayData("Horsens")}>Horsens</option>
        <option value= "Aarhus" onClick={() => model.displayData("Aarhus")}>Aarhus</option>
        <option value= "Copenhagen" onClick={() => model.displayData("Copenhagen") }>Copenhagen</option>
      </select>


          {/* <ForecastDataBody {...{model, dispatcher}}/> */}
          {/* <WeatherDataBody {...{model, dispatcher}}/> */}

        <div id="WeatherData">
        <div id= "HorsensWeatherData" value="Horsens"> 
        <h3>Horsens_WeatherData:</h3><h4>
          <b id = "weather_datavalue"></b>|Value: 
          <b id = "weather_datatype"></b> |Type: 
          <b id = "weather_dataunit"></b> |Unit: 
          <b id = "weather_datatime"></b> |Time: 
          <b id = "weather_dataplace"></b> |Place: 
          <b id = "weather_dataprec"></b> |Precipitation Types: 
          <b id = "weather_datadirection"></b> |Direction: 
          </h4>
        </div>
        <div id= "Aarhus">
        <h3>Aarhus_WeatherData: </h3><h4>
        <b id = "weather_datavalue"></b>|Value: 
          <b id = "weather_datatype"></b> |Type: 
          <b id = "weather_dataunit"></b> |Unit: 
          <b id = "weather_datatime"></b> |Time: 
          <b id = "weather_dataplace"></b> |Place: 
          <b id = "weather_dataprec"></b> |Precipitation Types: 
          <b id = "weather_datadirection"></b> |Direction: 
        </h4>
        </div>
          <div id= "Copenhagen">
          <h3>Copenhagen_WeatherData: </h3><h4>
          <b id = "weather_datavalue"></b>|Value: 
          <b id = "weather_datatype"></b> |Type: 
          <b id = "weather_dataunit"></b> |Unit: 
          <b id = "weather_datatime"></b> |Time: 
          <b id = "weather_dataplace"></b> |Place: 
          <b id = "weather_dataprec"></b> |Precipitation Types: 
          <b id = "weather_datadirection"></b> |Direction: 
          </h4>
        </div>

        <div id="ForecastData">
        <div value="Horsens"> 
        <h3>Horsens_ForecastData: </h3><h4>
          <b id = "forecastDatafrom"></b>|From: 
          <b id = "forecastDatato"></b> |To: 
          <b id = "forecastDatatype"></b> |Type: 
          <b id = "forecastDataunit"></b> |Unit: 
          <b id = "forecastDatatime"></b> |Time: 
          <b id = "forecastDataplace"></b> |Place: 
          <b id = "forecastDataprec"></b> |Precipitation Types: 
          <b id = "forecastDatadirection"></b> |Direction: 
          </h4>
        </div>
        <div id= "Aarhus">
        <h3>Aarhus_ForecastData: </h3><h4>
          <b id = "forecastDatafrom"></b>|From: 
          <b id = "forecastDatato"></b> |To: 
          <b id = "forecastDatatype"></b> |Type: 
          <b id = "forecastDataunit"></b> |Unit: 
          <b id = "forecastDatatime"></b> |Time: 
          <b id = "forecastDataplace"></b> |Place: 
          <b id = "forecastDataprec"></b> |Precipitation Types: 
          <b id = "forecastDatadirection"></b> |Direction: 
          </h4>
        </div>
          <div id= "Copenhagen">
          <h3>Copenhagen_ForecastData: </h3><h4>
          <b id = "forecastDatafrom"></b>|From: 
          <b id = "forecastDatato"></b> |To: 
          <b id = "forecastDatatype"></b> |Type: 
          <b id = "forecastDataunit"></b> |Unit: 
          <b id = "forecastDatatime"></b> |Time: 
          <b id = "forecastDataplace"></b> |Place: 
          <b id = "forecastDataprec"></b> |Precipitation Types: 
          <b id = "forecastDatadirection"></b> |Direction: 
          </h4>
        </div>
          </div>
      </div>  

      {/* <table id="forecastData">
          <thead><tr><td>From</td><td>To</td><td>Type</td><td>Unit</td><td>Time</td><td>Place</td><td>Precipitation Type</td></tr></thead>
          <ForecastDataBody {...{model, dispatcher}}/>
      </table>
      <table id="weatherData">
          <thead><tr><td>From</td><td>To</td><td>Type</td><td>Unit</td><td>Time</td><td>Place</td><td>Precipitation Type</td></tr></thead>
          <WeatherDataBody {...{model, dispatcher}}/>
      </table> */}
  </div>
)



//export default App;


