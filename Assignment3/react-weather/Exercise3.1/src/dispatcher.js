export default store => async ({type, ...params}) =>  {
    switch(type) {
      case 'getData':
        const {place, values} = params
        const weatherData = await fetch('http://localhost:8080/data/' + place).then(res => res.json())
        const forecastData = await fetch('http://localhost:8080/forecast/' + place).then(res => res.json())
        store({type, weatherData, forecastData})
        break;
      case 'dateFilter':
        const [from_date, to_date, events, index] = params;

        const date = new Date();

        index.search({
          query: "query",
          events: events.filter(e => e.from_date, to_date),
          filters: `date_timestamp > ${date.setDate(date.getDate())}`
        })

        store({from_date, to_date, index})
        break;
      case "submitWeatherData":
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json"
        };
        const newWeatherDataReport = await fetch("http://localhost:8080/data", {
          method: "POST",
          body: JSON.stringify({
            from: values.from,
            value: values.value,
            type: values.type,
            unit: values.unit,
            time: values.time,
            place: values.place
          }),
          headers
        }).then(res => res.json());
        console.log("ADDED")
        store({ newWeatherDataReport });
        break;

      default:
    }
}
