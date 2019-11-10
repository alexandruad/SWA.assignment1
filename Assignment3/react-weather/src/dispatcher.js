/* import { Dispatcher } from "flux";
 */
export default store => async ({type, ...params}) =>  {
    switch(type) {
      case 'Horsens':
        const { id } = params

        console.log(params)
        //const datetime = window.prompt('All weatherdata?')
        if (id) {
          //console.log(wdata)
          const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
          console.log("WEASDEWQE")
          const weather_data = await fetch('http://localhost:8080/data',
            { method: 'GET', 
                body: JSON.stringify({ id }), 
                headers}).then(res => res.json())
          store({type, ...params, weather_data/* , forecast_data */})
        }
        break;
      case 'getData':
        const {place} = params
        const weatherData = await fetch('http://localhost:8080/data/' + place).then(res => res.json())
        store({type, ...params, weatherData/* , forecast_data */})
        break;

/*         case 'Aarhus':
            ListStore.items.push(type.newItem) */
      default:
    }
}
