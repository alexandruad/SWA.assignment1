import React from "react";
import "./App.css";
import Action from "./Action";
import Store from "./Store";

export default class View extends React.Component {
  constructor() {
    super();
    this.getView = this.getView.bind(this);
    this.state = {
      view: Store.getAll()
    };
  }

  componentWillMount() {
    Store.on("change", this.getView);
  }
  componentWillUnmount() {
    Store.removeListener("change", this.getView);
  }
  getView() {
    this.setState({
      view: Store.getAll()
    });
  }
  reloadView() {
    Action.reloadView();
  }
  render() {
      return [
    <div className="View">
      <h1>WeatherData</h1>
      <select multiple>
        <option value="Horsens" onClick={this.reloadView.bind(this)}>
          Horsens
        </option>
        <option value="Aarhus" /* onClick={() => displayData("Aarhus")} */>
          Aarhus
        </option>
        <option value="Copenhagen" /* onClick={() => displayData("Copenhagen")} */>
          Copenhagen
        </option>
      </select>

      {/* <ForecastDataBody {...{model, dispatcher}}/>
      <WeatherDataBody {...{model, dispatcher}}/> */}

      <div id="WeatherData">
        <div id="HorsensWeatherData" value="Horsens">
          <h3>Horsens_WeatherData:</h3>
          <h4>
            <b id="weather_datavalue">{/* {listComponents} */}</b>|Value:
            <b id="weather_datatype"></b> |Type:
            <b id="weather_dataunit"></b> |Unit:
            <b id="weather_datatime"></b> |Time:
            <b id="weather_dataplace"></b> |Place:
            <b id="weather_dataprec"></b> |Precipitation Types:
            <b id="weather_datadirection"></b> |Direction:
          </h4>
        </div>
        <div id="Aarhus">
          <h3>Aarhus_WeatherData: </h3>
          <h4>
            <b id="weather_datavalue"></b>|Value:
            <b id="weather_datatype"></b> |Type:
            <b id="weather_dataunit"></b> |Unit:
            <b id="weather_datatime"></b> |Time:
            <b id="weather_dataplace"></b> |Place:
            <b id="weather_dataprec"></b> |Precipitation Types:
            <b id="weather_datadirection"></b> |Direction:
          </h4>
        </div>
        <div id="Copenhagen">
          <h3>Copenhagen_WeatherData: </h3>
          <h4>
            <b id="weather_datavalue"></b>|Value:
            <b id="weather_datatype"></b> |Type:
            <b id="weather_dataunit"></b> |Unit:
            <b id="weather_datatime"></b> |Time:
            <b id="weather_dataplace"></b> |Place:
            <b id="weather_dataprec"></b> |Precipitation Types:
            <b id="weather_datadirection"></b> |Direction:
          </h4>
        </div>
        <div id="ForecastData">
          <div value="Horsens">
            <h3>Horsens_ForecastData: </h3>
            <h4>
              <b id="forecastDatafrom"></b>|From:
              <b id="forecastDatato"></b> |To:
              <b id="forecastDatatype"></b> |Type:
              <b id="forecastDataunit"></b> |Unit:
              <b id="forecastDatatime"></b> |Time:
              <b id="forecastDataplace"></b> |Place:
              <b id="forecastDataprec"></b> |Precipitation Types:
              <b id="forecastDatadirection"></b> |Direction:
            </h4>
          </div>
          <div id="Aarhus">
            <h3>Aarhus_ForecastData: </h3>
            <h4>
              <b id="forecastDatafrom"></b>|From:
              <b id="forecastDatato"></b> |To:
              <b id="forecastDatatype"></b> |Type:
              <b id="forecastDataunit"></b> |Unit:
              <b id="forecastDatatime"></b> |Time:
              <b id="forecastDataplace"></b> |Place:
              <b id="forecastDataprec"></b> |Precipitation Types:
              <b id="forecastDatadirection"></b> |Direction:
            </h4>
          </div>
          <div id="Copenhagen">
            <h3>Copenhagen_ForecastData: </h3>
            <h4>
              <b id="forecastDatafrom"></b>|From:
              <b id="forecastDatato"></b> |To:
              <b id="forecastDatatype"></b> |Type:
              <b id="forecastDataunit"></b> |Unit:
              <b id="forecastDatatime"></b> |Time:
              <b id="forecastDataplace"></b> |Place:
              <b id="forecastDataprec"></b> |Precipitation Types:
              <b id="forecastDatadirection"></b> |Direction:
            </h4>
          </div>
        </div>
      </div>
    </div>
      ]
  }
}

// function View() {

//   const{ list } = this.state;

//   const listComponents = list.map((list) =>
//   {
//     return<List key={list.id} {...list}/>
//   })

//   return (
//     <div className="App">
//       <h1>WeatherData</h1>
//       <select multiple>
//         <option value="Horsens" onClick={() => displayData("Horsens")}>
//           Horsens
//         </option>
//         <option value="Aarhus" onClick={() => displayData("Aarhus")}>
//           Aarhus
//         </option>
//         <option value="Copenhagen" onClick={() => displayData("Copenhagen")}>
//           Copenhagen
//         </option>
//       </select>

//       <ForecastDataBody {...{model, dispatcher}}/>
//       <WeatherDataBody {...{model, dispatcher}}/>

//       <div id="WeatherData">
//         <div id="HorsensWeatherData" value="Horsens">
//           <h3>Horsens_WeatherData:</h3>
//           <h4>
//             <b id="weather_datavalue">{listComponents}</b>|Value:
//             <b id="weather_datatype"></b> |Type:
//             <b id="weather_dataunit"></b> |Unit:
//             <b id="weather_datatime"></b> |Time:
//             <b id="weather_dataplace"></b> |Place:
//             <b id="weather_dataprec"></b> |Precipitation Types:
//             <b id="weather_datadirection"></b> |Direction:
//           </h4>
//         </div>
//         <div id="Aarhus">
//           <h3>Aarhus_WeatherData: </h3>
//           <h4>
//             <b id="weather_datavalue"></b>|Value:
//             <b id="weather_datatype"></b> |Type:
//             <b id="weather_dataunit"></b> |Unit:
//             <b id="weather_datatime"></b> |Time:
//             <b id="weather_dataplace"></b> |Place:
//             <b id="weather_dataprec"></b> |Precipitation Types:
//             <b id="weather_datadirection"></b> |Direction:
//           </h4>
//         </div>
//         <div id="Copenhagen">
//           <h3>Copenhagen_WeatherData: </h3>
//           <h4>
//             <b id="weather_datavalue"></b>|Value:
//             <b id="weather_datatype"></b> |Type:
//             <b id="weather_dataunit"></b> |Unit:
//             <b id="weather_datatime"></b> |Time:
//             <b id="weather_dataplace"></b> |Place:
//             <b id="weather_dataprec"></b> |Precipitation Types:
//             <b id="weather_datadirection"></b> |Direction:
//           </h4>
//         </div>
//         <div id="ForecastData">
//           <div value="Horsens">
//             <h3>Horsens_ForecastData: </h3>
//             <h4>
//               <b id="forecastDatafrom"></b>|From:
//               <b id="forecastDatato"></b> |To:
//               <b id="forecastDatatype"></b> |Type:
//               <b id="forecastDataunit"></b> |Unit:
//               <b id="forecastDatatime"></b> |Time:
//               <b id="forecastDataplace"></b> |Place:
//               <b id="forecastDataprec"></b> |Precipitation Types:
//               <b id="forecastDatadirection"></b> |Direction:
//             </h4>
//           </div>
//           <div id="Aarhus">
//             <h3>Aarhus_ForecastData: </h3>
//             <h4>
//               <b id="forecastDatafrom"></b>|From:
//               <b id="forecastDatato"></b> |To:
//               <b id="forecastDatatype"></b> |Type:
//               <b id="forecastDataunit"></b> |Unit:
//               <b id="forecastDatatime"></b> |Time:
//               <b id="forecastDataplace"></b> |Place:
//               <b id="forecastDataprec"></b> |Precipitation Types:
//               <b id="forecastDatadirection"></b> |Direction:
//             </h4>
//           </div>
//           <div id="Copenhagen">
//             <h3>Copenhagen_ForecastData: </h3>
//             <h4>
//               <b id="forecastDatafrom"></b>|From:
//               <b id="forecastDatato"></b> |To:
//               <b id="forecastDatatype"></b> |Type:
//               <b id="forecastDataunit"></b> |Unit:
//               <b id="forecastDatatime"></b> |Time:
//               <b id="forecastDataplace"></b> |Place:
//               <b id="forecastDataprec"></b> |Precipitation Types:
//               <b id="forecastDatadirection"></b> |Direction:
//             </h4>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default View;
