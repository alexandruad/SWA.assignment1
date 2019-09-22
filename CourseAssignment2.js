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

  contains(date) { return (date >= this.dateFrom && date <= this.dateTo) }
}
const dateInt = new DateInterval(7, 9)
console.log(dateInt.contains(8))

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
  constructor(time, place, value, type, unit) {
    super(time, place)
    this.value = value
    this.dataType = new DataType(type, unit)
  }
  getValue() { return this.value }
  setValue(newValue) { this.value = newValue }

  getDataType() { return this.dataType }
  setDataType(newDataType) { this.dataType = newDataType }
}

class Temperature extends WeatherData {
  constructor(time, place, value, type, unit) {
    super(time, place, value, type, unit)
    }

  convertToF() {
      if (super.getDataType().getUnit() === '*C') {
          return (super.getValue() * 9 / 5) + 32
      } else {
          return "Invalid unit type for conversion " + super.getDataType().getUnit()
      }
  }

  convertToC() {
    if (super.getDataType().getUnit() === '*F') {
      return (super.getValue() - 32) * (5 / 9)
    } else {
      return "Invalid unit type for conversion " + super.getDataType().getUnit()
    }
  }
}
const y = new Temperature(8, "Horsens", 10, 'Degrees', '*C')
console.log(y.getDataType().getUnit())
console.log(y.convertToF())
console.log(y.convertToC())

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
    } else {
      return "Invalid unit type for conversion: " + super.getDataType().getUnit()
    }
  }
  convertToMM() {
    if (super.getDataType().getUnit() === 'inches') {
      return (super.getValue() * 25.4)
    } else {
      return "Invalid unit type for conversion: " + super.getDataType().getUnit()
    }
  }
}
const z = new Precipitation(8, "Horsens", 10, 'Degrees', 'Celsius', 'liquid')
console.log(z.getDataType().getUnit())

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
    } else {
      return "Invalid unit type for conversion: " + super.getDataType().getUnit()
    }
  }
  convertToMPS() {
    if (super.getDataType().getUnit() === 'MPH') {
      return (super.getValue() / 2.237)
    } else {
      return "Invalid unit type for conversion: " + super.getDataType().getUnit()
    }
  }
}
const a = new Wind(8, "Horsens", 10, 'Degrees', 'MS', 'N-W')
console.log(a.getDataType().getUnit())
console.log(a.getDirection())
console.log(a.convertToMPH())
console.log(a.convertToMPS())

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
    this.currentData = data
    this.weatherDataList = [data]
  }

  getCurrentData() {
    return this.currentData
  }
  addWeatherData (newData) {
    this.weatherDataList.push(newData)
    this.currentData = newData
  }
}

const x = new WeatherData(8, "Horsens", 10, 'Degrees', 'Celsius')
console.log(x.getDataType().getUnit())

const b = new CloudCoverage(8, "Horsens", 10, 'Degrees', 'Celsius', 'Very cloudy!')
console.log(b.getDataType().getUnit())
console.log(b.getCloudCoverage())

var weatherDateList = new WeatherHistory(x)
console.log(weatherDateList.getCurrentData())

weatherDateList.addWeatherData(b)
console.log(weatherDateList.getCurrentData())