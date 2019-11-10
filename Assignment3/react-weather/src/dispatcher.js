/* import { Dispatcher } from "flux";
 */
export default store => async ({type, ...params}) =>  {
    switch(type.actionName) {
      case 'Horsens':
        const { wdata } = params
        //const datetime = window.prompt('All weatherdata?')
        if (wdata) {
          //console.log(wdata)
          const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
          const weather_data = await fetch('http://localhost:8080/data',
            { method: 'POST', 
                body: JSON.stringify({ wdata }), 
                headers}).then(res => res.json())
          store({type, ...params, weather_data/* , forecast_data */})
        }
        break;
/*         case 'Aarhus':
            ListStore.items.push(type.newItem) */
      default:
    }
}
