import Dispatcher from "./Dispatcher";
import View from './View'
import axios from 'axios'

  export  function createWeatherData(text) {
        Dispatcher.dispatch({
          type: "CREATE_TODO",
          text,
        });
      }
      
  
      
  export  function deleteWeatherData(id) {
        Dispatcher.dispatch({
          type: "DELETE_TODO",
          id,
        });
      }
      
  export  function reloadView() {
        let historicalData = {}
        
        let plsHelp = axios.get("http://localhost:8080/data/")
        .then(function (result) {
          historicalData = result.data;
      });
        console.log(plsHelp)
        console.log(historicalData)
        Dispatcher.dispatch(historicalData)
        // Dispatcher.dispatch({type: "FETCH_TODOS"});
        // setTimeout(() => {
        //   Dispatcher.dispatch({type: "RECEIVE_TODOS", weatherdata: [
        //     {
        //       id: 8484848484,
        //       text: "Go Shopping Again",
        //       complete: false
        //     },
        //     {
        //       id: 6262627272,
        //       text: "Hug Wife",
        //       complete: true
        //     },
        //   ]});
        // }, 1000);
      }

export default reloadView();


