//Exercise 1.1 Course Assignment
//Implement the diagram using factory methods. Do not use constructors or the class keyword. Encapsulate
//everything. Use concatenative inheritance to model the inheritance in the diagram, and also to remove as
//many redundancies as you can from the diagram.
//we implement them how we want, attributes

//Object.assign will change the first parameter it has, so it should be an empty object {}

//Date interval 
function create_date_interval(dateFrom, dateTo) {
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
        getDateFrom,
        getDateTo,
        contains
    }
}


//Event function
function create_event(time, place) {
    function getTime() {
        return time
    }

    function getPlace() {
        return place
    }
    return {
        getTime,
        getPlace
    }
}

//Data Type function
//type is degrees, water measurement
//unit is *F or *C, mm, cm etc...
function create_data_type(type, unit) {
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

//Concatenation of event and type
function event_and_type_to_weather_data(event, type, value) {
    function getValue() {
        return value
    }
    return Object.assign({}, event, type, {
        value
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
    function convertToF() {
        if (weather_data.unit() === '*C') {
            return (weather_data.value() * 9 / 5) + 32
        } else {
            return "Invalid unit type for conversion"
        }
    }

    function convertToC() {
        if (weather_data.unit() === '*F') {
            return (weather_data.value() - 32) * (5 / 9)
        } else {
            return "Invalid unit type for conversion"
        }
    }
    return {convertToF, convertToC}
}
