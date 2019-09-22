//Exercise 1.2 Course Assignment
//Implement the diagram using constructors and prototypes. Use the class keyword if you like. You are not
//required to encapsulate the fields. You need to redesign in order to deal with the multiple inheritance. Remove
//as many redundancies as you can.

//helper function
const noop = () => {};
noop

//Class definition
class DateInterval {
  constructor(from, to) {
    this.dateFrom = from
    this.dateTo = to
  }
  getDateFrom() { return this.dateFrom }
  setDateFrom(newDateFrom) { this.dateFrom = newDateFrom }

  getDateTo() { return this.dateTo }
  setDateTo(newDateTo) { this.dateTo = newDateTo}

  contains(dateInterval) { 
    return (dateInterval.getDateFrom() >= this.dateFrom && dateInterval.getDateTo() <= this.dateTo) 
  }
}

class WeatherEvent {
  constructor(time, place) {
    this.time = time;
    this.place = place;
  }
  getTime() { return this.time }
  setTime(newtime) { this.time = newtime }

  getPlace() { return this.place }
  setPlace(newPlace) { this.place = newPlace }
}

class DataType {
  constructor(type, unit) {
    this.type = type;
    this.unit = unit;
  }

  getType() { return this.type }
  setType(newType) { this.type = newType }

  getUnit() { return this.unit }
  setUnit(newUnit) { this.unit = newUnit }
}

class WeatherData extends WeatherEvent {
  constructor(fromDate, toDate, time, place, value, type, unit) {
    super(time, place)
    this.value = value
    this.dataType = new DataType(type, unit)
    this.dateInterval = new DateInterval(fromDate, toDate)
  }
  getValue() { return this.value }
  setValue(newValue) { this.value = newValue }

  getDataType() { return this.dataType }
  setDataType(newDataType) { this.dataType = newDataType }

  getTime(){ return super.getTime() }
  setTime(newTime){ super.setTime(newTime) }

  getPlace(){ return super.getPlace() }
  setPlace(newPlace){ super.setPlace(newPlace) }

  getDateInterval() { return this.dateInterval } 
  setDateInterval( newFrom, newTo) { this.dateInterval = new DateInterval(newFrom, newTo) }
}

class Temperature extends WeatherData {
  constructor(fromDate, toDate, time, place, value, type, unit) {
    super(fromDate, toDate, time, place, value, type, unit)
    }

  convertToF() {
          super.setValue((super.getValue() * 9 / 5) + 32)
          super.setDataType(new DataType('Fahrenheit', '*F'))
  }

  convertToC() {
      super.setValue((super.getValue() - 32) * (5 / 9))
      super.setDataType(new DataType('Celsius', '*C'))
  }
}

class Precipitation extends WeatherData {
  constructor(fromDate, toDate, time, place, value, type, unit, precipitationType) {
    super(fromDate, toDate, time, place, value, type, unit)
    this.precipitationType = precipitationType
    }
  precipitationType() {
    return this.precipitationType
  }
  convertToInches() {
      super.setValue(super.getValue() / 25.4)
      super.setDataType(new DataType('Inches', 'IN'))
  }
  convertToMM() {
      super.setValue(super.getValue() * 25.4)
      super.setDataType(new DataType('Milimeter', 'MM'))
  }
}


class Wind extends WeatherData {
  constructor(fromDate, toDate, time, place, value, type, unit, direction) {
    super(fromDate, toDate, time, place, value, type, unit)
    this.direction = direction
    }
  getDirection() {
    return this.direction
  }
  convertToMPH() {
      super.setValue(super.getValue() * 2.237)
      super.setDataType(new DataType('Miles per hour', 'MPH'))
  }
  convertToMPS() {
      super.setValue(super.getValue() / 2.237)
      super.setDataType(new DataType('Meters per second', 'MPS'))
  }
}

class CloudCoverage extends WeatherData {
  constructor(fromDate, toDate, time, place, value, type, unit, cloudCoverage) {
    super(fromDate, toDate, time, place, value, type, unit)
    this.cloudCoverage = cloudCoverage
    }
    getCloudCoverage(){
      return this.cloudCoverage
    }
}

class WeatherHistory {
  constructor(data) {
    this.currentDataFilter = {}
    this.weatherDataList = data
  }

  getCurrentData() { return this.currentDataFilter }

  getCurrentPlace() { return this.currentDataFilter.place }
  setCurrentPlace(newPlace) { this.currentDataFilter.place = newPlace }
  clearCurrentPlace() { this.currentDataFilter.place = undefined }

  getCurrentType(){ return this.currentDataFilter.type }
  setCurrentType(newType){ this.currentDataFilter.type = newType }
  clearCurrentType(){ this.currentDataFilter.type = undefined }

  getCurrentPeriod(){ return this.currentDataFilter.period }
  setCurrentPeriod(newFrom, newTo){ this.currentDataFilter.period = new DateInterval(newFrom, newTo) }
  clearCurrentPeriod(){ this.currentDataFilter.period = undefined }

  convertToUSUnits() {
      for (let weather_data of this.weatherDataList) {

        if (weather_data.getDataType().getUnit() === '*C') {
          weather_data.setValue((weather_data.getValue() * 9 / 5) + 32)
          weather_data.setDataType(new DataType('Fahrenheit', '*F'))

        } else if (weather_data.getDataType().getUnit() === 'MM') {
          weather_data.setValue(weather_data.getValue() / 25.4)
          weather_data.setDataType(new DataType('Inches', 'IN'))

        } else if (weather_data.getDataType().getUnit() === 'MPS') {
          weather_data.setValue(weather_data.getValue() * 2.237)
          weather_data.setDataType(new DataType('Miles per hour', 'MPH'))
        }
      }
  }
  convertToInternationalUnits(){
    for (let weather_data of this.weatherDataList) {

      if (weather_data.getDataType().getUnit() === '*F') {
        weather_data.setValue((weather_data.getValue() - 32) * (5/9))
        weather_data.setDataType(new DataType('Celsius', '*C'))

      } else if (weather_data.getDataType().getUnit() === 'IN') {
        weather_data.setValue(weather_data.getValue() * 25.4)
        weather_data.setDataType(new DataType('Milimeters', 'MM'))

      } else if (weather_data.getDataType().getUnit() === 'MPH') {
        weather_data.setValue(weather_data.getValue() / 2.237)
        weather_data.setDataType(new DataType('Miles per second', 'MPS'))
      }
    }
  }


  addWeatherData(newData) {
    this.weatherDataList.push(newData)
    this.currentData = newData
  }
  get() { return this.weatherDataList }

  data() {
    var filteredWeatherDataList = this.weatherDataList
    if(this.currentDataFilter.place) { 
      filteredWeatherDataList = filteredWeatherDataList.filter( el => {
        return (el.getPlace() === this.currentDataFilter.place)
      })
     }
     if(this.currentDataFilter.type) { 
      filteredWeatherDataList = filteredWeatherDataList.filter( el => {
        return (el.getType() === this.currentDataFilter.type)
      })
     }
     if(this.currentDataFilter.period) { 
      filteredWeatherDataList = filteredWeatherDataList.filter( el => {
        return (el.getDateInterval().contains(this.currentDataFilter.period))
        
      })
     }
     return filteredWeatherDataList
   }
}

var wd1 = new WeatherData( 1, 2, 8, "Alabama", 4, 'Celsius', '*C')
var wd2 = new CloudCoverage( 1, 2, 8, "Alabama", 10, 'Celsius', '*C', 'Very cloudy!')
var wd3 = new Precipitation( 5, 6, 8, "Horsens", 10, 'MM', 'MM', 'liquid')
var wd4 = new Wind( 1, 2, 8, "Horsens", 10, 'Degrees', 'MPS', 'N-W')
var wd5 = new Temperature( 5, 10, 8, "Horsens", 10, 'Celsius', '*C')


var weatherDateList = new WeatherHistory([wd1, wd2, wd3, wd4, wd5])


weatherDateList.convertToUSUnits()
console.log(weatherDateList.get())

weatherDateList.setCurrentPlace('Horsens')
console.log(weatherDateList.data())

weatherDateList.convertToInternationalUnits()
console.log(weatherDateList.get())



//WeatherPrediction
class WeatherPrediction extends WeatherEvent {
  constructor(fromDate, toDate, time, place, value, type, unit, from, to) {
    super(time, place)
    this.dateInterval = new DateInterval(fromDate, toDate)
    this.value = value
    this.dataType = new DataType(type, unit)
    this.from = from
    this.to = to
  }
  getValue() { return this.value }
  setValue(newValue) { this.value = newValue }

  getDataType() { return this.dataType }
  setDataType(newDataType) { this.dataType = newDataType }

  getType() { return this.dataType.getType() }

  getPlace(){ return super.getPlace() }
  setPlace(newPlace){ super.setPlace(newPlace) }

  getDateInterval() { return this.dateInterval } 
  setDateInterval( newFrom, newTo) { this.dateInterval = new DateInterval(newFrom, newTo) }

  matches(data) {
    if (data.getDataType().getType() === this.dataType.getType()) {
      if (data.getValue() >= this.from && data.getValue() <= this.to) {
        return true
      } else
        return false
    } else { return false }
  }

  setTo(newTo) { this.to = newTo }
  getTo() { return this.to }

  setFrom(newFrom) { this.from = newFrom }
  getFrom() { return this.from }

  }

var wp1 = new WeatherPrediction(1,2,8, "Alabama", 10, 'Celsius', '*C', 1, 5) 
console.log(wp1.matches(wd1))
console.log(wp1.matches(wd2))
console.log(wp1.matches(wd3))
console.log(wp1.matches(wd4))
console.log(wp1.matches(wd5))

class TemperaturePrediction extends WeatherPrediction {
  constructor(fromDate, toDate, time, place, value, type, unit, from, to) {
    super(fromDate, toDate, time, place, value, type, unit, from, to)
    }

  convertToF() {
      if (super.getDataType().getUnit() === '*C') {
          return (super.getValue() * 9 / 5) + 32
      }
  }

  convertToC() {
    if (super.getDataType().getUnit() === '*F') {
      return (super.getValue() - 32) * (5 / 9)
    }
  }
}
var wp2 = new TemperaturePrediction(3, 7, 8, "Alabama", 10, 'Celsius', '*C', 1, 10) 
console.log(wp2.matches(wd1))
wp2.convertToF()
console.log(wp2)
console.log(wp2.matches(wd5))

class PrecipitationPrediction extends WeatherPrediction {
  constructor(fromDate, toDate, time, place, value, type, unit, from, to, precipitationTypes) {
    super(fromDate, toDate, time, place, value, type, unit, from, to)
    this.precipitationTypes = precipitationTypes
    }
  getPrecipitationTypes() {
    return this.precipitationTypes
  }
  setPrecipitationTypes(newPrecipitationTypes) {
    this.precipitationTypes = newPrecipitationTypes
  }
matches(data) {
  return super.matches(data)
}

  convertToInches() {
    if (super.getDataType().getUnit() === 'MM') {
      return (super.getValue() / 25.4)
    }
  }
  convertToMM() {
    if (super.getDataType().getUnit() === 'inches') {
      return (super.getValue() * 25.4)
    }
  }
}
var wp3 = new PrecipitationPrediction(5, 19, 8, 'Vejle', 10, 'IN', 'Inches', 1, 10, ['solid', 'liquid']) 
console.log(wp3)
console.log(wp3.matches(wd3))

class WindPrediction extends WeatherPrediction {
  constructor(fromDate, toDate, time, place, value, type, unit, from, to, directions) {
    super(fromDate, toDate, time, place, value, type, unit, from, to)
    this.direction = directions
    }
  getDirection() {
    return this.directions
  }

  matches(data) {
    return super.matches(data)
  }
  convertToMPH() {
    if (super.getDataType().getUnit() === 'MPS') {
      return (super.getValue() * 2.237)
    }
  }
  convertToMPS() {
    if (super.getDataType().getUnit() === 'MPH') {
      return (super.getValue() / 2.237)
    }
  }
}
var wp4 = new WindPrediction(1, 5, 8, 'Montana', 10, 'Miles per second', 'MPS', 1, 10, ['N','E','S','W']) 
console.log(wp4)
console.log(wp3.matches(wd4))

class CloudCoveragePrediction extends WeatherPrediction {
  constructor(fromDate, toDate, time, place, value, type, unit, from, to, cloudCoverage) {
    super(fromDate, toDate, time, place, value, type, unit, from, to)
    this.cloudCoverage = cloudCoverage
    }
    getCloudCoverage(){
      return this.cloudCoverage
    }
}
var wp5 = new CloudCoveragePrediction(10, 15, 8, 'Ohio', 10, 'Miles per second', 'MPS', 1, 10, ['Cloudy', 'Sunny']) 
console.log(wp5)
console.log(wp5.matches(wd5))



class WeatherForecast {
  constructor(data) {
    this.currentDataFilter = {}
    this.weatherPredictionList = data
  }

  getCurrentData() { return this.currentDataFilter }

  getCurrentPlace() { return this.currentDataFilter.place }
  setCurrentPlace(newPlace) { this.currentDataFilter.place = newPlace }
  clearCurrentPlace() { this.currentDataFilter.place = undefined }

  getCurrentType(){ return this.currentDataFilter.type }
  setCurrentType(newType){ this.currentDataFilter.type = newType }
  clearCurrentType(){ this.currentDataFilter.type = undefined }

  getCurrentPeriod(){ return this.currentDataFilter.period }
  setCurrentPeriod(newFrom, newTo){ this.currentDataFilter.period = new DateInterval(newFrom, newTo) }
  clearCurrentPeriod(){ this.currentDataFilter.period = undefined }

  convertToUSUnits() {
      for (let weather_data of this.weatherPredictionList) {

        if (weather_data.getDataType().getUnit() === '*C') {
          weather_data.setValue((weather_data.getValue() * 9 / 5) + 32)
          weather_data.setDataType(new DataType('Fahrenheit', '*F'))

        } else if (weather_data.getDataType().getUnit() === 'MM') {
          weather_data.setValue(weather_data.getValue() / 25.4)
          weather_data.setDataType(new DataType('Inches', 'IN'))

        } else if (weather_data.getDataType().getUnit() === 'MPS') {
          weather_data.setValue(weather_data.getValue() * 2.237)
          weather_data.setDataType(new DataType('Miles per hour', 'MPH'))
        }
      }
  }
  convertToInternationalUnits(){
    for (let weather_data of this.weatherPredictionList) {

      if (weather_data.getDataType().getUnit() === '*F') {
        weather_data.setValue((weather_data.getValue() - 32) * (5/9))
        weather_data.setDataType(new DataType('Celsius', '*C'))

      } else if (weather_data.getDataType().getUnit() === 'IN') {
        weather_data.setValue(weather_data.getValue() * 25.4)
        weather_data.setDataType(new DataType('Milimeters', 'MM'))

      } else if (weather_data.getDataType().getUnit() === 'MPH') {
        weather_data.setValue(weather_data.getValue() / 2.237)
        weather_data.setDataType(new DataType('Miles per second', 'MPS'))
      }
    }
  }


  addWeatherData(newData) {
    this.weatherPredictionList.push(newData)
    this.currentData = newData
  }
  get() { return this.weatherPredictionList }

  data() {
    var filteredWeatherPredictionList = this.weatherPredictionList
    if(this.currentDataFilter.place) { 
      filteredWeatherPredictionList = filteredWeatherPredictionList.filter( el => {
        return (el.getPlace() === this.currentDataFilter.place)
      })
     }
     if(this.currentDataFilter.type) { 
      filteredWeatherPredictionList = filteredWeatherPredictionList.filter( el => {
        return (el.getType() === this.currentDataFilter.type)
      })
     }
     if(this.currentDataFilter.period) { 
      filteredWeatherPredictionList = filteredWeatherPredictionList.filter( el => {
        return (el.getDateInterval().contains(this.currentDataFilter.period))
      })
     }
     return filteredWeatherPredictionList
   }
}

var weatherForecastList = new WeatherForecast([wp1, wp2, wp3, wp4, wp5])
console.log(weatherForecastList)

weatherForecastList.setCurrentPlace('Ohio')
console.log(weatherForecastList.data())
weatherForecastList.clearCurrentPlace()
console.log(weatherForecastList.data())

weatherForecastList.setCurrentPeriod(1, 10)
console.log(weatherForecastList.data())
weatherForecastList.clearCurrentPeriod()
console.log(weatherForecastList.data())

weatherForecastList.setCurrentType('Celsius')
console.log(weatherForecastList.data())

weatherForecastList.clearCurrentType()
console.log(weatherForecastList.data())