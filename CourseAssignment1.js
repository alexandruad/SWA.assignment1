//Exercise 1.1 Course Assignment
//Implement the diagram using factory methods. Do not use constructors or the class keyword. Encapsulate
//everything. Use concatenative inheritance to model the inheritance in the diagram, and also to remove as
//many redundancies as you can from the diagram.
//we implement them how we want, attributes

//Object.assign will change the first parameter it has, so it should be an empty object {}

//Date interval 
function create_date_interval(dateFrom, dateTo) {
    function setDateFrom(newDateFrom) {
        dateFrom = newDateFrom
    }

    function setDateTo(newDateTo) {
        dateTo = newDateTo
    }

    function getDateFrom() {
        return dateFrom
    }

    function getDateTo() {
        return dateTo
    }

    function contains(date) {
        return (date > dateFrom && date < dateTo)
    }

    return {
        setDateFrom,
        setDateTo,
        getDateFrom,
        getDateTo,
        contains
    }
}


//Event function
function create_event(time, place) {
    function setPlace(newPlace) {
        place = newPlace
    }

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
        setPlace,
        setTime,
        getTime,
        getPlace
    }
}

//Data Type function
//type is degrees, water measurement
//unit is *F or *C, mm, cm etc...
function create_data_type(type, unit) {
    function setType(newType) {
        type = newType
    }

    function getType() {
        return type
    }

    function getUnit() {
        return unit
    }
    return {
        setType,
        getType,
        getUnit
    }
}

//Concatenation of event and type
function event_and_type_to_weather_data(event, type, value) {
    function getValue() {
        return value
    }
    return Object.assign({}, event, type, {
        getValue
    })
}

//Weather data using concatenation
function create_weather_data(time, place, type, unit, value) {
    const event = create_event(time, place);
    const data_type = create_data_type(type, unit);
    return event_and_type_to_weather_data(event, data_type, value)
}

//Temperature function
function create_temperature(weather_data) {
    function getWeatherData() {
        return weather_data
    }

    function convertToF() {
        if (weather_data.getUnit() === '*C') {
            return (weather_data.getValue() * 9 / 5) + 32
        } else {
            return "Invalid unit type for conversion " + weather_data.getUnit()
        }
    }

    function convertToC() {
        if (weather_data.getUnit() === '*F') {
            return (weather_data.getValue() - 32) * (5 / 9)
        } else {
            return "Invalid unit type for conversion " + weather_data.getUnit()
        }
    }
    return {
        getWeatherData,
        convertToF,
        convertToC
    }
}

//Precipitation function
function create_precipitation(weather_data, precipitation_type) {
    function getWeatherData() {
        return weather_data
    }

    function getPrecipitationType() {
        return precipitation_type
    }

    function convertToInches() {
        if (weather_data.getUnit() === 'MM') {
            return (weather_data.getValue() / 25.4)
        } else {
            return "Invalid unit type for conversion: " + weather_data.getUnit()
        }
    }

    function convertToMM() {
        if (weather_data.getUnit() === 'inches') {
            return (weather_data.getValue() * 25.4)
        } else {
            return "Invalid unit type for conversion: " + weather_data.getUnit()
        }
    }
    return {
        getWeatherData,
        getPrecipitationType,
        convertToInches,
        convertToMM
    }
}

//Wind function
function create_wind(weather_data, direction) {
    function getWeatherData() {
        return weather_data
    }

    function getDirection() {
        return direction
    }

    function convertToMPH() {
        if (weather_data.getUnit() === 'MS') {
            return (weather_data.getValue() * 2.237)
        } else {
            return "Invalid unit type for conversion: " + weather_data.getUnit()
        }
    }

    function convertToMS() {
        if (weather_data.getUnit() === 'MPH') {
            return (weather_data.getValue() / 2.237)
        } else {
            return "Invalid unit type for conversion: " + weather_data.getUnit()
        }
    }
    return {
        getWeatherData,
        getDirection,
        convertToMPH,
        convertToMS
    }
}

//Cloud coverage function
function create_cloud_coverage(weather_data) {
    function getWeatherData() {
        return weather_data
    }
    return {
        getWeatherData
    }
}

//Concatenation of event and data to weather prediction
function event_and_type_to_weather_prediction(event, type, to, from) {
    //TODO: maybe refactor this, not sure how it is supposed to work
    function matches(weather_data) {
        if (this === weather_data)
            return true
        else
            return false
    }

    function getTo() {
        return to
    }

    function getFrom() {
        return from
    }
    return Object.assign({}, event, type, {
        matches,
        getTo,
        getFrom
    })
}

//Weather prediction function
function create_weather_prediction(time, place, type, unit, to, from) {
    const event = create_event(time, place)
    const data_type = create_data_type(type, unit)
    return event_and_type_to_weather_prediction(event, data_type, to, from)
}

//Temperature prediction function
function create_temperature_prediction(weather_prediction) {
    function getWeatherPrediction() {
        return weather_prediction
    }

    function convertToF() {
        if (weather_prediction.getUnit() === '*C') {
            return (weather_prediction.getValue() * 9 / 5) + 32
        } else {
            return "Invalid unit type for conversion: " + weather_prediction.getUnit()
        }
    }

    function convertToC() {
        if (weather_prediction.getUnit() === '*F') {
            return (weather_prediction.getValue() - 32) * (5 / 9)
        } else {
            return "Invalid unit type for conversion: " + weather_prediction.getUnit()
        }
    }
    return {
        getWeatherPrediction,
        convertToF,
        convertToC
    }
}

//Precipitation prediction function
function create_precipitation_prediction(weather_prediction, types) {
    function getWeatherPrediction() {
        return weather_prediction
    }

    function getTypes() {
        return types
    }

    function matches(weather_data) {
        weather_prediction.matches(weather_data)
    }

    function convertToInches() {
        if (weather_prediction.getUnit() === 'MM') {
            return (weather_prediction.getValue() / 25.4)
        } else {
            return "Invalid unit type for conversion: " + weather_prediction.getUnit()
        }
    }

    function convertToMM() {
        if (weather_prediction.getUnit() === 'inches') {
            return (weather_prediction.getValue() * 25.4)
        } else {
            return "Invalid unit type for conversion: " + weather_prediction.getUnit()
        }
    }
    return {
        getWeatherPrediction,
        getTypes,
        matches,
        convertToInches,
        convertToMM
    }
}

//Wind prediction function
function create_wind_prediction(directions, weather_prediction) {
    function getWeatherPrediction() {
        return weather_prediction
    }

    function getDirections() {
        return directions
    }

    function matches(weather_data) {
        weather_prediction.matches(weather_data)
    }

    function convertToMPH() {
        if (weather_prediction.getUnit() === 'MS') {
            return (weather_prediction.getValue() * 2.237)
        } else {
            return "Invalid unit type for conversion: " + weather_prediction.getUnit()
        }
    }

    function convertToMS() {
        if (weather_prediction.getUnit() === 'MPH') {
            return (weather_prediction.getValue() / 2.237)
        } else {
            return "Invalid unit type for conversion: " + weather_prediction.getUnit()
        }
    }

    return {
        getWeatherPrediction,
        getDirections,
        matches,
        convertToMPH,
        convertToMS
    }
}

//Cloud coverage prediction function
function create_cloud_coverage_prediction(weather_prediction) {
    function getWeatherPrediction() {
        return weather_prediction
    }
    return {
        getWeatherPrediction
    }
}

//Weather history function
function create_weather_history(weather_data_array) {

    let weather_report = null;

    function getWeatherReport() {
        weather_report = weather_data_array.pop()
        return weather_report;
    }

    function getCurrentPlace() {
        return weather_report.getPlace()
    }

    function setCurrentPlace(newPlace) {
        weather_report.setPlace(newPlace)
    }

    function clearCurrentPlace() {
        weather_report.setPlace(undefined)
    }

    function getCurrentType() {
        return weather_report.getType()
    }

    function setCurrentType(newType) {
        weather_report.setType(newType);
    }

    function clearCurrentType() {
        weather_report.setType(undefined);
    }

    function getCurrentPeriod() {
        return weather_report.getTime()
    }

    function setCurrentPeriod(date_interval) {
        weather_report.setTime(date_interval)
    }

    function clearCurrentPeriod() {
        weather_report.setTime(undefined)
    }

    function convertToUSUnits() {
        if (weather_report.getUnit() === '*C') {
            return (weather_report.getValue() * 9 / 5) + 32
        } else if (weather_report.getUnit() === 'MM') {
            return (weather_report.getValue() / 25.4)
        } else if (weather_report.getUnit() === 'MS') {
            return (weather_report.getValue() * 2.237)
        } else {
            return "Invalid unit type for conversion: " + weather_report.getUnit()
        }
    }

    function convertToInternationalUnits() {
        if (weather_report.getUnit() === '*F') {
            return (weather_report.getValue() - 32) * (5 / 9)
        } else if (weather_report.getUnit() === 'inches') {
            return (weather_report.getValue() * 25.4)
        } else if (weather_report.getUnit() === 'MPH') {
            return (weather_report.getValue() / 2.237)
        } else {
            return "Invalid unit type for conversion: " + weather_report.getUnit()
        }
    }

    function addToWeatherData(weather_data_array) {
        weather_data_array.push(weather_report)
    }

    function getData() {
        return weather_data_array
    }
    return {
        getWeatherReport,
        getCurrentPlace,
        setCurrentPlace,
        clearCurrentPlace,
        getCurrentType,
        setCurrentType,
        clearCurrentType,
        getCurrentPeriod,
        setCurrentPeriod,
        clearCurrentPeriod,
        convertToUSUnits,
        convertToInternationalUnits,
        addToWeatherData,
        getData
    }
}

//Weather forecast function
function create_weather_forecast(weather_prediction_array) {
    const weather_report = null;

    function getWeatherReport() {
        weather_report = weather_prediction_array.pop()
        return weather_report
    }

    function getCurrentPlace() {
        return weather_report.getPlace()
    }

    function setCurrentPlace(newPlace) {
        weather_report.setPlace(newPlace)
    }

    function clearCurrentPlace() {
        weather_report.setPlace(undefined)
    }

    function getCurrentType() {
        return weather_report.getType()
    }

    function setCurrentType(newType) {
        weather_report.setType(newType);
    }

    function clearCurrentType() {
        weather_report.setType(undefined);
    }

    function getCurrentPeriod() {
        return weather_report.getTime()
    }

    function setCurrentPeriod(date_interval) {
        weather_report.setTime(date_interval)
    }

    function clearCurrentPeriod() {
        weather_report.setTime(undefined)
    }

    function convertToUSUnits() {
        if (weather_report.getUnit() === '*C') {
            return (weather_report.getValue() * 9 / 5) + 32
        } else if (weather_report.getUnit() === 'MM') {
            return (weather_report.getValue() / 25.4)
        } else if (weather_report.getUnit() === 'MS') {
            return (weather_report.getValue() * 2.237)
        } else {
            return "Invalid unit type for conversion: " + weather_report.getUnit()
        }
    }

    function convertToInternationalUnits() {
        if (weather_report.getUnit() === '*F') {
            return (weather_report.getValue() - 32) * (5 / 9)
        } else if (weather_report.getUnit() === 'inches') {
            return (weather_report.getValue() * 25.4)
        } else if (weather_report.getUnit() === 'MPH') {
            return (weather_report.getValue() / 2.237)
        } else {
            return "Invalid unit type for conversion: " + weather_report.getUnit()
        }
    }

    function addToWeatherData(weather_prediction_array) {
        weather_prediction_array.push(weather_report)
    }

    function getData() {
        return weather_data_array
    }
    return {
        getWeatherReport,
        getCurrentPlace,
        setCurrentPlace,
        clearCurrentPlace,
        getCurrentType,
        setCurrentType,
        clearCurrentType,
        getCurrentPeriod,
        setCurrentPeriod,
        clearCurrentPeriod,
        convertToUSUnits,
        convertToInternationalUnits,
        addToWeatherData,
        getData
    }
}

//this would be November 22 1997
const interval1 = create_date_interval(new Date(1997, 10, 22), new Date(2010, 5, 13))
const weatherData = create_weather_data(interval1, 'Horsens', 'Celsius', '*C', 14)
const temp = create_temperature(weatherData)
const tempInF = temp.convertToF();
console.log(interval1.getDateFrom())
console.log(weatherData.getUnit())
console.log(temp.getWeatherData().getValue())
console.log(tempInF)
const weatherData1 = create_weather_data(interval1, 'Vejle', 'Milimiters', 'MM', 2000)
const precip = create_precipitation(weatherData1)
const precipInInches = precip.convertToInches()
console.log(precip.getWeatherData().getValue())
console.log(precipInInches)
const reports = [weatherData, weatherData1]
const weatherReport = create_weather_history(reports)
const report = weatherReport.getWeatherReport()
const currPlace = weatherReport.getCurrentPlace()
const currPeriod = weatherReport.getCurrentPeriod()
const currType = weatherReport.getCurrentType()
console.log(currPlace)
console.log(currPeriod.getDateFrom())
console.log(currType) 
const usUnit = weatherReport.convertToUSUnits()
console.log(usUnit)