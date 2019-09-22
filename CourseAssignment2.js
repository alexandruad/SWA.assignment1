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
  constructor(time, place, value, type, unit) {
    super(time, place, value, type, unit)
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

class Precipitation extends WeatherData {
  constructor(time, place, value, type, unit, precipitationType) {
    super(time, place, value, type, unit)
    this.precipitationType = precipitationType
    }
  precipitationType() {
    return this.precipitationType
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


class Wind extends WeatherData {
  constructor(time, place, value, type, unit, direction) {
    super(time, place, value, type, unit)
    this.direction = direction
    }
  getDirection() {
    return this.direction
  }
  convertToMPH() {
    if (super.getDataType().getUnit() === 'MS') {
      return (super.getValue() * 2.237)
    }
  }
  convertToMPS() {
    if (super.getDataType().getUnit() === 'MPH') {
      return (super.getValue() / 2.237)
    }
  }
}

class CloudCoverage extends WeatherData {
  constructor(time, place, value, type, unit, cloudCoverage) {
    super(time, place, value, type, unit)
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

  getCurrentData() { return this.currentData }

  getCurrentPlace() { return this.currentDataFilter.place }
  setCurrentPlace(newPlace) { this.currentDataFilter.place = newPlace }
  clearCurrentPlace() { this.currentDataFilter.place = undefined }

  getCurrentType(){ return this.currentDataFilter.type }
  setCurrentType(newType){ this.currentDataFilter.type = newType }
  clearCurrentType(){ this.currentDataFilter.type = undefined }

  getCurrentPeriod(){ return this.currentDataFilter.period }
  setCurrentPeriod(newFrom, newTo){ this.currentDataFilter.period = new DateInterval(newFrom, newTo) }
  clearCurrentPeriod(){ this.currentDataFilter.period = undefined }

  convertToUSUnits(){}
  convertToInternationalUnits(){}


  addWeatherData(newData) {
    this.weatherDataList.push(newData)
    this.currentData = newData
  }
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

var x = new WeatherData( 1, 2, 8, "Alabama", 10, 'Degrees', 'Celsius')
var b = new CloudCoverage( 1, 2, 8, "Alabama", 10, 'Degrees', 'Celsius', 'Very cloudy!')
var z = new Precipitation( 5, 6, 8, "Horsens", 10, 'Degrees', 'Celsius', 'liquid')
var a = new Wind( 1, 2, 8, "Horsens", 10, 'Degrees', 'MS', 'N-W')
const y = new Temperature( 5, 10, 8, "Horsens", 10, 'Degrees', '*C')


var weatherDateList = new WeatherHistory([x, b, z, a, y])

console.log(weatherDateList.data())
weatherDateList.setCurrentPlace('Horsens')
console.log(weatherDateList.data())
weatherDateList.clearCurrentPlace()

weatherDateList.setCurrentPeriod( 1, 10)
weatherDateList.setCurrentPlace('Horsens')
console.log(weatherDateList.data())