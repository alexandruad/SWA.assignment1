/* eslint-disable */

//Exercise 2.1 Course Assignment
//The diagram below represents a functional version of the weather classes. Implement it.
//You are expected to use a functional style everywhere. (use map, filter, reduce). 
//Note that only WeatherHistory, WeatherForecast and the conversion methods have changed.

const compose = (...fs) => x => fs.reduceRight((f, y) => f(y), x)

//Date interval 
const create_date_interval = (dateFrom, dateTo) => {
    const setDateFrom = _dateFrom => create_date_interval(_dateFrom, dateTo)
    const setDateTo = _dateTo => create_date_interval(dateFrom, _dateTo)
    const getDateFrom = () => dateFrom
    const getDateTo = () => dateTo
    const contains = _dateInterval => _dateInterval.getDateFrom() >= dateFrom && _dateInterval.getDateTo() <= dateTo
    return {
        setDateFrom,
        setDateTo,
        getDateFrom,
        getDateTo,
        contains
    }
}


//Event 
const create_event = (time, place) => {
    const setPlace = _place => create_event(time, _place)
    const setTime = _time => create_event(_time, place)
    const getPlace = () => place
    const getTime = () => time
    return {
        setPlace,
        setTime,
        getTime,
        getPlace
    }
}

//Data Type function
//type is Temperature, Precipitation, Cloud coverage, Wind
//unit is *F or *C, mm, cm etc...
const create_data_type = (type, unit) => {
    const setType = _type => create_data_type(_type, unit)
    const setUnit = _unit => create_data_type(type, _unit)
    const getType = () => type
    const getUnit = () => unit
    return {
        setType,
        setUnit,
        getType,
        getUnit
    }
}

const object_with_event = (time, place) => obj => {
    const getTime = () => time
    const getPlace = () => place
    return {
        ...obj,
        getTime,
        getPlace
    }
}

const object_with_type = (type, unit) => obj => {
    const getType = () => type
    const getUnit = () => unit
    const setUnit = _unit => {
        unit = _unit
    }
    return {
        ...obj,
        getType,
        getUnit,
        setUnit
    }
}

const create_weather_data = value => obj => {
    const getValue = () => value
    const setValue = _value => {
        value = _value
    }
    return {
        ...obj,
        getValue,
        setValue
    }
}
//Temperature
const with_temperature = () => obj => {
    function convertToF() {
        if (obj.getUnit() === 'C') {
            obj.setValue(obj.value * (9 / 5) + 32)
            obj.setUnit('F')
        }
    }

    function convertToC() {
        if (obj.getUnit() === 'F') {
            obj.setValue((obj.value - 32) * (5 / 9))
            obj.setUnit('C')
        }
    }
    return {
        ...obj,
        convertToF,
        convertToC
    }
}


const create_temperature = (value, place, time, unit) => {
    const event = object_with_event(place, time)
    const type = object_with_type('Temperature', unit)
    const data = create_weather_data(value)
    const temperature = with_temperature()
    const f = compose(temperature, data, type, event)
    return f({})
}

//Precipitation 
const with_precipitation = (precipitationType) => obj => {
    const getPrecipitationType = () => precipitationType

    function convertToInches() {
        if (obj.getUnit() === 'MM') {
            obj.setValue(obj.getValue() / 25.4)
            obj.setUnit('IN')
        }
    }

    function convertToMM() {
        if (obj.getUnit() === 'Inches') {
            obj.setValue(obj.getValue() * 25.4)
            obj.setUnit('MM')
        }
    }
    return {
        ...obj,
        getPrecipitationType,
        convertToInches,
        convertToMM
    }
}

const create_precipitation = (value, place, time, unit, precipitationType) => {
    const event = object_with_event(place, time)
    const type = object_with_type('Precipitation', unit)
    const data = create_weather_data(value)
    const precipitation = with_precipitation(precipitationType)
    const f = compose(precipitation, data, type, event)
    return f({})
}

//Wind
const with_wind = (direction) => obj => {
    const getDirection = () => direction

    function convertToMPH() {
        if (obj.getUnit() === 'MPS') {
            obj.setValue(obj.getValue() * 2.237)
            obj.setUnit('MPH')
        }
    }

    function convertToMPS() {
        if (obj.getUnit() === 'MPH') {
            obj.setValue(obj.getValue() / 2.237)
            obj.setUnit('MPS')
        }
    }
    return {
        ...obj,
        getDirection,
        convertToMPH,
        convertToMPS
    }
}

const create_wind = (value, place, time, unit, direction) => {
    const event = object_with_event(place, time)
    const type = object_with_type('Precipitation', unit)
    const data = create_weather_data(value)
    const windy = with_wind(direction)
    const f = compose(windy, data, type, event)
    return f({})
}

//Cloud coverage
const with_cloud_coverage = () => obj => {
    return {
        ...obj
    }
}
const create_cloud_coverage = (value, place, time, unit) => {
    const event = object_with_event(place, time)
    const type = object_with_type('Cloud coverage', unit)
    const data = create_weather_data(value)
    const cloudy = with_cloud_coverage()
    const f = compose(cloudy, data, type, event)
    return f({})
}

//Concatenation of event and data to weather prediction
const create_weather_prediction = (to, from) => obj => {
    function matches(weather_data) {
        if (obj.getType() === weather_data.getType()) {
            if (weather_data.getValue() > from && weather_data.getValue() < to) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    const setTo = _to => {
        to = _to
    }
    const setFrom = _from => {
        from = _from
    }
    const getTo = () => to
    const getFrom = () => from
    return {
        ...obj,
        matches,
        setTo,
        setFrom,
        getTo,
        getFrom
    }
}

const with_temperature_prediction = () => obj => {
    function convertToF() {
        if (obj.getUnit() === 'C') {
            obj.setTo(obj.value * (9 / 5) + 32)
            obj.setFrom(obj.value * (9 / 5) + 32)
            obj.setUnit('F')
        }
    }

    function convertToC() {
        if (obj.getUnit() === 'F') {
            obj.setTo((obj.value - 32) * (5 / 9))
            obj.setFrom((obj.value - 32) * (5 / 9))
            obj.setUnit('C')
        }
    }
    return {
        ...obj,
        convertToF,
        convertToC
    }
}

//Temperature prediction function
const create_temperature_prediction = (to, from, place, time, unit) => {
    const event = object_with_event(place, time)
    const type = object_with_type('Temperature', unit)
    const data = create_weather_prediction(to, from)
    const temperature = with_temperature()
    const f = compose(temperature, data, type, event)
    return f({})
}

//Precipitation prediction function
const with_precipitation_prediction = (types) => obj => {
    const getTypes = () => types

    function matches(weather_data) {
        obj.matches(weather_data)
    }

    function convertToInches() {
        if (obj.getUnit() === 'MM') {
            obj.setFrom(obj.getFrom() / 25.4)
            obj.setTo(obj.getTo() / 25.4)
            obj.setUnit('IN')
        }
    }

    function convertToMM() {
        if (obj.getUnit() === 'IN') {
            obj.setFrom(obj.getFrom() * 25.4)
            obj.setTo(obj.getTo() * 25.4)
            obj.setUnit('MM')
        }
    }

    return {
        ...obj,
        getTypes,
        matches,
        convertToInches,
        convertToMM
    }
}

const create_precipitation_prediction = (to, from, place, time, unit, types) => {
    const event = object_with_event(place, time)
    const type = object_with_type('Precipitation', unit)
    const data = create_weather_prediction(to, from)
    const precipitation = with_precipitation_prediction(types)
    const f = compose(precipitation, data, type, event)
    return f({})
}

const with_wind_prediction = (directions) => obj => {
    const getDirections = () => directions

    function matches(weather_data) {
        obj.matches(weather_data)
    }

    function convertToMPH() {
        if (obj.getUnit() === 'MPS') {
            obj.setFrom(obj.getFrom() * 2.237)
            obj.setTo(obj.getTo() * 2.237)
            obj.setUnit('MPH')
        }
    }

    function convertToMPS() {
        if (obj.getUnit() === 'MPH') {
            obj.setFrom(obj.getFrom() / 2.237)
            obj.setTo(obj.getTo() / 2.237)
            obj.setUnit('MPS')
        }
    }

    return { ...obj, getDirections, matches, convertToMPH, convertToMPS}
}

const create_wind_prediction = (to, from, place, time, unit, directions) => {
    const event = object_with_event(place, time)
    const type = object_with_type('Precipitation', unit)
    const data = create_weather_prediction(to, from)
    const windy = with_wind_prediction(directions)
    const f = compose(windy, data, type, event)
    return f({})
}

const with_cloud_coverage = () => obj => {
    return { ...obj }
}

const create_cloud_coverage = (to, from, place, time, unit) => {
    const event = object_with_event(place, time)
    const type = object_with_type('Cloud coverage', unit)
    const data = create_weather_prediction(to, from)
    const cloudy = with_cloud_coverage()
    const f = compose(cloudy, data, type, event)
    return f({})
}
//TODO
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