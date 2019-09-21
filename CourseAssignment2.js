//Exercise 1.2 Course Assignment
//Implement the diagram using constructors and prototypes. Use the class keyword if you like. You are not
//required to encapsulate the fields. You need to redesign in order to deal with the multiple inheritance. Remove
//as many redundancies as you can.

//helper function
const noop = () => {};

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
const dateInt = new DateInterval(07, 09)
console.log(dateInt.contains(08))

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

const x = new WeatherData(08, "Horsens", 10, 'Degrees', 'Celsius')
console.log(x.getDataType().getUnit())

class Temperature extends WeatherData {
  constructor(time, place, value, type, unit) {
    super(time, place, value, type, unit)
    }
  convertToF() {
    noop
  }
  convertToC() {
    noop
  }
}
const y = new Temperature(08, "Horsens", 10, 'Degrees', 'Celsius')
console.log(y.getDataType().getUnit())

class Precipitation extends WeatherData {
  constructor(time, place, value, type, unit) {
    super(time, place, value, type, unit)
    }
  precipitationType() {
    noop
  }
  convertToInches() {
    noop
  }
  convertToMM() {
    noop
  }
}
const z = new Precipitation(08, "Horsens", 10, 'Degrees', 'Celsius')
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
    noop
  }
  convertToMPS() {
    noop
  }
}
const a = new Wind(08, "Horsens", 10, 'Degrees', 'Celsius', 'N-W')
console.log(a.getDataType().getUnit())
console.log(a.getDirection())

class CloudCoverage extends WeatherData {
  constructor(time, place, value, type, unit) {
    super(time, place, value, type, unit)
    }
}
const b = new CloudCoverage(08, "Horsens", 10, 'Degrees', 'Celsius')
console.log(b.getDataType().getUnit())