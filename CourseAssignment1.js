/* eslint-disable */

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

    function contains(dateInterval) {
        return (dateInterval.getDateFrom() >= dateFrom && dateInterval.getDateTo() <= dateTo)
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

    function setUnit(newUnit) {
        unit = newUnit
    }

    function getType() {
        return type
    }

    function getUnit() {
        return unit
    }
    return {
        setType,
        setUnit,
        getType,
        getUnit
    }
}

//Concatenation of event and type
function event_and_type_to_weather_data(event, type, value) {
    function setValue(newValue) {
        value = newValue
    }

    function getValue() {
        return value
    }
    return Object.assign({}, event, type, {
        setValue,
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
        weather_data.setValue((weather_data.getValue() * 9 / 5) + 32)
        weather_data.setUnit('*F')
        weather_data.setType('Fahrenheit')
    }

    function convertToC() {
        weather_data.setValue((weather_data.getValue() - 32) * (5 / 9))
        weather_data.setUnit('*C')
        weather_data.setType('Celsius')
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
        weather_data.setValue(weather_data.getValue() / 25.4)
        weather_data.setUnit('IN')
        weather_data.setType('Inches')
    }

    function convertToMM() {
        weather_data.setValue(weather_data.getValue() * 25.4)
        weather_data.setUnit('MM')
        weather_data.setType('Milimeter')
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
        weather_data.setValue(weather_data.getValue() * 2.237)
        weather_data.setUnit('MPH')
        weather_data.setType('Miles per hour')
    }

    function convertToMPS() {
        weather_data.setValue(weather_data.getValue() / 2.237)
        weather_data.setUnit('MPS')
        weather_data.setType('Meters per second')
    }
    return {
        getWeatherData,
        getDirection,
        convertToMPH,
        convertToMPS
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
    function matches(weather_data) {
        if (type === weather_data.getType())
            if (weather_data.getValue() > from && weather_data.getValue() < to) {
                return true
            }
        else
            return false
    }

    function setTo(newTo) {
        to = newTo
    }

    function setFrom(newFrom) {
        from = newFrom
    }

    function getTo() {
        return to
    }

    function getFrom() {
        return from
    }
    return Object.assign({}, event, type, {
        setTo,
        setFrom,
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
        weather_prediction.setFrom((weather_prediction.getFrom() * 9 / 5) + 32)
        weather_prediction.setTo((weather_prediction.getTo() * 9 / 5) + 32)
        weather_prediction.setUnit('*F')
        weather_prediction.setType('Fahrenheit')
    }

    function convertToC() {
        weather_prediction.setFrom((weather_prediction.getFrom() - 32) * (5 / 9))
        weather_prediction.setTo((weather_prediction.getTo() - 32) * (5 / 9))
        weather_prediction.setUnit('*C')
        weather_prediction.setType('Celsius')
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
        weather_data.setFrom(weather_prediction.getFrom() / 25.4)
        weather_data.setTo(weather_prediction.getTo() / 25.4)
        weather_prediction.setUnit('IN')
        weather_prediction.setType('Inches')
    }

    function convertToMM() {
        weather_data.setFrom(weather_prediction.getFrom() * 25.4)
        weather_data.setTo(weather_prediction.getTo() * 25.4)
        weather_prediction.setUnit('MM')
        weather_prediction.setType('Milimeters')
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
        weather_prediction.setFrom(weather_prediction.getFrom() * 2.237)
        weather_prediction.setTo(weather_prediction.getTo() * 2.237)
        weather_prediction.setUnit('MPH')
        weather_prediction.setType('Miles per hour')
    }

    function convertToMPS() {
        weather_prediction.setFrom(weather_prediction.getFrom() / 2.237)
        weather_prediction.setTo(weather_prediction.getTo() / 2.237)
        weather_prediction.setUnit('MPS')
        weather_prediction.setType('Meters per second')
    }

    return {
        getWeatherPrediction,
        getDirections,
        matches,
        convertToMPH,
        convertToMPS
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

    let currentDataFilter = {}
    let weatherDataList = weather_data_array

    function getDataFilter() {
        return currentDataFilter;
    }

    function getCurrentPlace() {
        return currentDataFilter.place
    }

    function setCurrentPlace(newPlace) {
        currentDataFilter.place = newPlace
    }

    function clearCurrentPlace() {
        currentDataFilter.place = undefined
    }

    function getCurrentType() {
        return currentDataFilter.type
    }

    function setCurrentType(newType) {
        currentDataFilter.type = newType
    }

    function clearCurrentType() {
        currentDataFilter.type = undefined
    }

    function getCurrentPeriod() {
        return currentDataFilter.period
    }

    function setCurrentPeriod(newFrom, newTo) {
        currentDataFilter.period = new DateInterval(newFrom, newTo)
    }

    function clearCurrentPeriod() {
        currentDataFilter.period = undefined
    }

    function convertToUSUnits() {
        for (let weather_data of weather_data_array) {
            if (weather_data.getUnit() === '*C') {
                weather_data.setValue(weather_data.getValue() * 9 / 5) + 32
                weather_data.setUnit('*F')
                weather_data.setType('Fahrenheit')
            } else if (weather_data.getUnit() === 'MM') {
                weather_data.setValue(weather_data.getValue() / 25.4)
                weather_data.setUnit('IN')
                weather_data.setType('Inches')
            } else if (weather_data.getUnit() === 'MPS') {
                weather_data.setValue(weather_data.getValue() * 2.237)
                weather_data.setUnit('MPH')
                weather_data.setType('Miles per hour')
            }
        }
    }

    function convertToInternationalUnits() {
        for (let weather_data of weather_data_array) {
            if (weather_data.getUnit() === '*F') {
                weather_data.setValue(weather_data.getValue() - 32) * (5 / 9)
                weather_data.setUnit('*C')
                weather_data.setType('Celsius')
            } else if (weather_data.getUnit() === 'Inches') {
                weather_data.setValue(weather_data.getValue() * 25.4)
                weather_data.setUnit('MM')
                weather_data.setType('Milimeters')
            } else if (weather_data.getUnit() === 'MPH') {
                weather_data.setValue(weather_data.getValue() / 2.237)
                weather_data.setUnit('MPS')
                weather_data.setType('Meters per second')
            }
        }
    }

    function addToWeatherData(weather_data_array) {
        weatherDataList.push(weather_data_array)
        currentDataFilter = weather_data_array
    }

    function getData() {
        var filteredWeatherDataList = weatherDataList
        if (currentDataFilter.place) {
            filteredWeatherDataList = filteredWeatherDataList.filter(el => {
                return (el.getPlace() === currentDataFilter.place)
            })
        }
        if (currentDataFilter.type) {
            filteredWeatherDataList = filteredWeatherDataList.filter(el => {
                return (el.getType() === currentDataFilter.type)
            })
        }
        if (currentDataFilter.period) {
            filteredWeatherDataList = filteredWeatherDataList.filter(el => {
                return (el.getDateInterval().contains(currentDataFilter.period))
            })
        }
        return filteredWeatherDataList
    }
    return {
        getDataFilter,
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

    let currentPredictionFilter = {}
    let weatherPredictionList = weather_data_array

    function getPredictionFilter() {
        return currentPredictionFilter
    }

    function getCurrentPlace() {
        return currentPredictionFilter.place
    }

    function setCurrentPlace(newPlace) {
        currentPredictionFilter.place = newPlace
    }

    function clearCurrentPlace() {
        currentPredictionFilter.place = undefined
    }

    function getCurrentType() {
        return currentPredictionFilter.type
    }

    function setCurrentType(newType) {
        currentPredictionFilter.type = newType
    }

    function clearCurrentType() {
        currentPredictionFilter.type = undefined
    }

    function getCurrentPeriod() {
        return currentPredictionFilter.period
    }

    function setCurrentPeriod(newFrom, newTo) {
        currentPredictionFilter.period = new DateInterval(newFrom, newTo)
    }

    function clearCurrentPeriod() {
        currentPredictionFilter.period = undefined
    }

    function convertToUSUnits() {
        for (let weather_prediction of weather_prediction_array) {
            if (weather_prediction.getUnit() === '*C') {
                weather_prediction.setFrom((weather_prediction.getFrom() * 9 / 5) + 32)
                weather_prediction.setTo((weather_prediction.getTo() * 9 / 5) + 32)
                weather_prediction.setUnit('*F')
                weather_prediction.setType('Fahrenheit')
            } else if (weather_prediction.getUnit() === 'MM') {
                weather_prediction.setFrom(weather_prediction.getFrom() / 25.4)
                weather_prediction.setTo(weather_prediction.getTo() / 25.4)
                weather_prediction.setUnit('IN')
                weather_prediction.setType('Inches')
            } else if (weather_prediction.getUnit() === 'MPS') {
                weather_prediction.setFrom(weather_prediction.getFrom() * 2.237)
                weather_prediction.setTo(weather_prediction.setTo() * 2.237)
                weather_prediction.setUnit('MPH')
                weather_prediction.setType('Miles per hour')
            }
        }
    }

    function convertToInternationalUnits() {
        for (let weather_prediction of weather_prediction_array) {
            if (weather_prediction.getUnit() === '*F') {
                weather_prediction.setFrom((weather_prediction.getFrom() - 32) * (5 / 9))
                weather_prediction.setTo((weather_prediction.getTo() - 32) * (5 / 9))
                weather_prediction.setUnit('*C')
                weather_prediction.setType('Celsius')
            } else if (weather_prediction.getUnit() === 'Inches') {
                weather_prediction.setFrom(weather_prediction.getFrom() * 25.4)
                weather_prediction.setTo(weather_prediction.getTo() * 25.4)
                weather_prediction.setUnit('IN')
                weather_prediction.setType('Inches')
            } else if (weather_prediction.getUnit() === 'MPH') {
                weather_prediction.setFrom(weather_prediction.getFrom() / 2.237)
                weather_prediction.setTo(weather_prediction.setTo() / 2.237)
                weather_prediction.setUnit('MPS')
                weather_prediction.setType('Meters per second')
            }
        }
    }

    function addToWeatherData(weather_prediction_array) {
        weatherPredictionList.push(weather_prediction_array)
        currentPredictionFilter = weather_prediction_array
    }

    function getData() {
        var filteredWeatherPredictionList = weatherPredictionList
        if (currentPredictionFilter.place) {
            filteredWeatherPredictionList = filteredWeatherPredictionList.filter(el => {
                return (el.getPlace() === currentPredictionFilter.place)
            })
        }
        if (currentPredictionFilter.type) {
            filteredWeatherPredictionList = filteredWeatherPredictionList.filter(el => {
                return (el.getType() === currentPredictionFilter.type)
            })
        }
        if (currentPredictionFilter.period) {
            filteredWeatherPredictionList = filteredWeatherPredictionList.filter(el => {
                return (el.getDateInterval().contains(currentPredictionFilter.period))
            })
        }
        return filteredWeatherPredictionList
    }
    return {
        getPredictionFilter,
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
console.log(interval1.getDateFrom())
console.log(weatherData.getUnit())
console.log(temp.getWeatherData().getValue())
const weatherData1 = create_weather_data(interval1, 'Vejle', 'Milimiters', 'MM', 2000)
console.log(weatherData.getValue())
console.log(weatherData.getUnit())
temp.convertToF()
console.log(weatherData.getValue())
console.log(weatherData.getUnit())