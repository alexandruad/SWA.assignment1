//Exercise 2.1 Course Assignment
//The diagram below represents a functional version of the weather classes. Implement it.
//You are expected to use a functional style everywhere. (use map, filter, reduce). 
//Note that only WeatherHistory, WeatherForecast and the conversion methods have changed.

//Date interval 
function create_date_interval(from, to) {
    function getTo() {
        return to
    }

    function getFrom() {
        return from
    }

    function contains(date) {
        if (from <= date && date <= to) {
            return true
        } else return false
    }
    return {
        getTo,
        getFrom,
        contains
    }
}


//Event 
function create_event({
    time,
    place
}) {
    function setTime(newTime) {
        time = newTime
    }

    function getTime() {
        return time
    }

    function getPlace() {
        return place
    }
    return {
        setTime,
        getTime,
        getPlace
    }
}

//Data Type function
//unit is *F or *C, mm, cm etc...
function create_data_type({
    type,
    unit
}) {

    function getType() {
        return type
    }

    function getUnit() {
        return unit
    }
    return {
        getType,
        getUnit
    }
}

function create_weather_data(state) {
    function getValue() {
        return state.value
    }

    function getState() {
        return state
    }
    let event = create_event(state)
    let dataType = create_data_type(state)
    return {
        getValue,
        getState,
        ...event,
        ...dataType
    }
}

//Temperature
function with_temperature(state) {
    function convertToF() {
        if (state.unit === '*C') {
            state.value = (state.value * (9 / 5) + 32)
            state.unit = '*F'
        }
        return state;
    }

    function convertToC() {
        if (state.unit === '*F') {
            state.value = (state.value - 32) * (5 / 9)
            state.unit = '*C'
        }
        return state;
    }
    return {
        convertToF,
        convertToC
    }
}

function create_temperature(time, place, unit, value) {
    let state = {
        time,
        place,
        type: 'Temperature',
        unit,
        value
    }
    return {
        ...with_temperature(state),
        ...create_weather_data(state)
    }
}

//Precipitation 
function with_precipitation(state, precipitationType) {
    function getPrecipitationType() {
        return precipitationType
    }

    function convertToInches() {
        if (state.unit === 'MM') {
            state.value = (state.value / 25.4)
            state.unit = 'Inches'
        }
        return state;
    }

    function convertToMM() {
        if (state.unit === 'Inches') {
            state.value = (state.value * 25.4)
            state.unit = 'MM'
        }
        return state;
    }
    return {
        getPrecipitationType,
        convertToInches,
        convertToMM
    }
}

function create_precipitation(time, place, precipitationType, unit, value) {
    let state = {
        time,
        place,
        type: 'Precipitation',
        unit,
        value
    }
    return {
        ...with_precipitation(state, precipitationType),
        ...create_weather_data(state)
    }
}

//Wind
function with_wind(state, direction) {
    function getDirection() {
        return direction
    }

    function convertToMPH() {
        if (state.unit === 'MPS') {
            state.value = (state.value * 2.237)
            state.unit = 'MPH'
        }
        return state;
    }

    function convertToMPS() {
        if (state.unit === 'MPH') {
            state.value = (state.value / 2.237)
            state.unit = 'MPS'
        }
        return state;
    }
    return {
        getDirection,
        convertToMPH,
        convertToMPS
    }
}

function create_wind(time, place, direction, unit, value) {
    let state = {
        time,
        place,
        type: 'Wind',
        unit,
        value
    }
    return {
        ...with_wind(state, direction),
        ...create_weather_data(state)
    }
}

//Cloud coverage
function create_cloud_coverage(value, place, time, unit) {
    let state = {
        time,
        place,
        type: 'Cloud coverage',
        unit,
        value
    }
    return {
        ...create_weather_data(state)
    }
}

//Concatenation of event and data to weather prediction
function create_weather_prediction(state) {
    function matches(weather_data) {
        if (state === weather_data.state)
            return true
        else
            return false
    }

    function setTo(_to) {
        state.to = _to
    }

    function setFrom(_from) {
        state.from = _from
    }

    function getTo() {
        return state.to
    }

    function getFrom() {
        return state.from
    }

    function getState() {
        return state
    }
    let event = create_event(state)
    let dataType = create_data_type(state)
    return {
        matches,
        setTo,
        setFrom,
        getTo,
        getFrom,
        getState,
        ...event,
        ...dataType
    }
}

function with_temperature_prediction(state) {
    function convertToF() {
        if (state.unit === '*C') {
            state.to = (state.to * (9 / 5) + 32)
            state.from = (state.from * (9 / 5) + 32)
            state.unit = '*F'
        }
        return state
    }

    function convertToC() {
        if (state.unit === '*F') {
            state.to = ((state.to - 32) * (5 / 9))
            state.from = ((state.from - 32) * (5 / 9))
            state.unit = '*C'
        }
        return state
    }
    return {
        convertToF,
        convertToC
    }
}

//Temperature prediction function
function create_temperature_prediction(time, place, unit, to, from) {
    let state = {
        time,
        place,
        type: 'Temperature',
        unit,
        to,
        from
    }
    return {
        ...with_temperature_prediction(state),
        ...create_weather_prediction(state)
    }
}

//Precipitation prediction function
function with_precipitation_prediction(state, types) {
    function getTypes() {
        return types
    }

    function matches(weather_data) {
        state.matches(weather_data)
    }

    function convertToInches() {
        if (state.unit === 'MM') {
            state.from = (state.from / 25.4)
            state.to = (state.to / 25.4)
            state.unit = 'Inches'
        }
        return state
    }

    function convertToMM() {
        if (state.unit === 'Inches') {
            state.from = (state.from * 25.4)
            state.to = (state.to * 25.4)
            state.unit = 'MM'
        }
        return state
    }

    return {
        getTypes,
        matches,
        convertToInches,
        convertToMM
    }
}

function create_precipitation_prediction(time, place, types, unit, to, from) {
    let state = {
        time,
        place,
        type: 'Precipitation',
        unit,
        to,
        from
    }
    return {
        ...with_precipitation_prediction(state, types),
        ...create_weather_prediction(state)
    }
}

function with_wind_prediction(state, directions) {
    function getDirections() {
        return directions
    }

    function matches(weather_data) {
        state.matches(weather_data)
    }

    function convertToMPH() {
        if (state.unit === 'MPS') {
            state.from = (state.from * 2.237)
            state.to = (state.to * 2.237)
            state.unit = 'MPH'
        }
        return state
    }

    function convertToMPS() {
        if (state.unit === 'MPH') {
            state.from = (state.from / 2.237)
            state.to = (state.to / 2.237)
            state.unit = 'MPS'
        }
        return state
    }

    return {
        getDirections,
        matches,
        convertToMPH,
        convertToMPS
    }
}

function create_wind_prediction(time, place, directions, unit, to, from) {
    let state = {
        time,
        place,
        type: 'Wind',
        unit,
        to,
        from
    }
    return {
        ...with_wind_prediction(state, directions),
        ...create_weather_prediction(state)
    }
}

function create_cloud_coverage_prediction(time, place, unit, to, from) {
    let state = {
        time,
        place,
        type: 'Cloud coverage',
        unit,
        to,
        from
    }
    return {
        ...create_weather_prediction(state)
    }
}

//Weather history function
function create_weather_history(state) {
    function forPlace(place) {
        let _place = state
            .filter((e) => e.getPlace() === place)
            .map((e) => e.getState())
        return _place
    }

    function forType(type) {
        let _type = state
            .filter((e) => e.getType() === type)
            .map((e) => e.getState())
        return _type
    }

    function forPeriod(period) {
        let _period = state
            .filter((e) => period.contains(e))
            .map((e) => e.getState())
        return _period
    }

    function including(data) {
        let array = []
        array = state.concat(data).map((e) => e.getState())

        return array
    }

    function convertToUsUnits() {
        let temp_array, precip_array, wind_array = []
        temp_array = state
            .filter((e) => e.getType() === 'Temperature')
            .map((e) => e.convertToF())
        precip_array = state
            .filter((e) => e.getType() === 'Precipitation')
            .map((e) => e.convertToInches())
        wind_array = state
            .filter((e) => e.getType() === 'Wind')
            .map((e) => e.convertToMPH())
        return [...temp_array, ...precip_array, ...wind_array]
    }

    function convertToInternationalUnits() {
        let temp_array, precip_array, wind_array = []
        temp_array = state
            .filter((e) => e.getType() === 'Temperature')
            .map((e) => e.convertToC())
        precip_array = state
            .filter((e) => e.getType() === 'Precipitation')
            .map((e) => e.convertToMM())
        wind_array = state
            .filter((e) => e.getType() === 'Wind')
            .map((e) => e.convertToMPS())
        return [...temp_array, ...precip_array, ...wind_array]
    }

    function lowestValue() {
        let array = new Array()

        data().map((e) => array.push(e.getValue()))
        var minimum_number = Math.min(...array)

        if (state.length === 0) {
            return undefined
        }
        return minimum_number
    }

    function data() {
        return state
    }

    return {
        forPlace,
        forType,
        forPeriod,
        including,
        convertToUsUnits,
        convertToInternationalUnits,
        lowestValue,
        data
    }
}

function create_weather_forecast(state) {
    function forPlace(place) {
        let _place = state
            .filter((e) => e.getPlace() === place)
            .map((e) => e.getState())
        return _place
    }

    function forType(type) {
        let _type = state
            .filter((e) => e.getType() === type)
            .map((e) => e.getState())
        return _type
    }

    function forPeriod(period) {
        let _period = state
            .filter((e) => period.contains(e))
            .map((e) => e.getState())
        return _period
    }

    function including(data) {
        let array = []
        array = state.concat(data).map((e) => e.getState())

        return array
    }

    function convertToUsUnits() {
        let temp_array, precip_array, wind_array = []
        temp_array = state
            .filter((e) => e.getType() === 'Temperature')
            .map((e) => e.convertToF())
        precip_array = state
            .filter((e) => e.getType() === 'Precipitation')
            .map((e) => e.convertToInches())
        wind_array = state
            .filter((e) => e.getType() === 'Wind')
            .map((e) => e.convertToMPH())
        return [...temp_array, ...precip_array, ...wind_array]
    }

    function convertToInternationalUnits() {
        let temp_array, precip_array, wind_array = []
        temp_array = state
            .filter((e) => e.getType() === 'Temperature')
            .map((e) => e.convertToC())
        precip_array = state
            .filter((e) => e.getType() === 'Precipitation')
            .map((e) => e.convertToMM())
        wind_array = state
            .filter((e) => e.getType() === 'Wind')
            .map((e) => e.convertToMPS())
        return [...temp_array, ...precip_array, ...wind_array]
    }

    function averageFromValue() {
        let values = []
        data().map(e => values.push(e.from))

        let sum = values.reduce((acc, e) => acc + e)

        return sum / values.length
    }

    function averageToValue() {
        let values = []
        data().map(e => values.push(e.to))

        let sum = values.reduce((acc, e) => acc + e)

        return sum / values.length
    }

    function data() {
        let array = []
        state.map((e) => array.push(e.getState()))
        return array
    }

    return {
        forPlace,
        forType,
        forPeriod,
        including,
        convertToUsUnits,
        convertToInternationalUnits,
        averageFromValue,
        averageToValue,
        data
    }
}

let temperature = create_temperature(new Date(1997, 09, 13), 'Horsens', '*C', 12)
console.log("Temperature in Celsius");
console.log(temperature.getValue())
console.log("Conversion to Fahrenheit")
console.log(temperature.convertToF().value)
console.log(temperature.convertToC().value)


let precipitation = create_precipitation(new Date(1997, 09, 13), 'Esbjerg', 'Rain', 'MM', 21);
console.log("Precipitation in MM")
console.log(precipitation.getValue())
console.log("Conversion to Inches")
console.log(precipitation.convertToInches().value)

let wind = create_wind(new Date(1997, 09, 13), 'Aarhus', 'NW', 'MPS', 8);

let temperature_prediction = create_temperature_prediction(new Date(1997, 09, 13), "Billund", '*C', -5, 6)
console.log("Temperature prediction in Celsius")
console.log(temperature_prediction.getFrom())
console.log(temperature_prediction.getTo())
console.log("Conversion to Farenheit")
let converted_temperature = temperature_prediction.convertToF()
console.log(converted_temperature.from)
console.log(converted_temperature.to)



let precipitation_prediction = create_precipitation_prediction(new Date(1997, 09, 13), 'Odense', ['Rain', 'Storm'], 'MM', 43, 53);
console.log("Precipitation prediction in MM")
console.log(precipitation_prediction.getFrom())
console.log(precipitation_prediction.getTo())
console.log("Conversion to Inches")
let converted_precipitation = precipitation_prediction.convertToInches()
console.log(converted_precipitation.from)
console.log(converted_precipitation.to)

let wind_prediction = create_wind_prediction(new Date(1997, 09, 13), 'Aalborg', ['N', 'NW'], 'MPS', 7.4, 7.5);

let historyArray = new Array(temperature, precipitation, wind)
let weatherHistory = create_weather_history(historyArray)
console.log('FILTER FOR PLACE')
console.log(weatherHistory.forPlace('Aarhus'))
console.log('FILTER FOR TYPE')
console.log(weatherHistory.forType('Temperature'))
console.log('CONVERT TO US UNITS')
console.log(weatherHistory.convertToUsUnits())
console.log('CONVERT TO INTERNATIONAL UNITS')
console.log(weatherHistory.convertToInternationalUnits())
console.log('LOWEST VALUE')
console.log(weatherHistory.lowestValue())


let forecastArray = new Array(temperature_prediction, precipitation_prediction, wind_prediction)
let weatherForecast = create_weather_forecast(forecastArray)
console.log('AVERAGE FROM')
console.log(weatherForecast.averageFromValue())
console.log('AVERAGE TO')
console.log(weatherForecast.averageToValue())