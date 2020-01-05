import model from './model.js'

//$scope is used as the source for two way data binding and it can be targeted from the index
const module = angular.module('WeatherApp', [])
module.controller('WeatherController', function ($scope, $http) {
    let aModel
    $scope.place = ""
    $scope.type = ""
    $scope.time = ""
    $scope.value = ""
    $scope.unit = ""
    $scope.precipitation_type = ""
    $scope.direction = ""
    //get request for weather data and forecast data which is executed at the start of the webpage
    $http.get('http://localhost:8080/data')
        .then(({
            data: data
        }) => {
            $http.get('http://localhost:8080/forecast')
                .then(({
                    data: forecast
                }) => {
                    //create model with data and forecast returned from requests
                    aModel = model(data, forecast)
                    //add these to the scope so the index.html can be updated
                    $scope.data = aModel.weatherData()
                    $scope.forecast = aModel.forecastData()
                    $scope.result = "success" + $scope.data.length
                })
        })
        .catch(console.err)

    //scope function to get the weather data and forecast data for a specific place
    $scope.showData = (place) => {
        //the get requests are performed by appending the place to the url
        $http.get('http://localhost:8080/data/' + place).then(({
            data: data
        }) => {
            $http.get('http://localhost:8080/forecast/' + place).then(({
                data: forecast
            }) => {
                //create model with data and forecast returned from requests
                aModel = model(data, forecast)
                //add these to the scope so the index.html can be updated
                $scope.data = aModel.weatherData()
                $scope.forecast = aModel.forecastData()
            })
        }).catch(console.err);
    }

    //scope function to filter based on an interval
    $scope.filterInterval = () => {
        //get the dates from index.html
        const date_from = document.getElementById("from_date").value
        const date_to = document.getElementById("to_date").value
        //get request for weather data and forecast data
        $http.get('http://localhost:8080/data')
            .then(({
                data: data
            }) => {
                $http.get('http://localhost:8080/forecast')
                    .then(({
                        data: forecast
                    }) => {
                        //filter the data based on the time interval
                        const filteredData = data.filter(e => e.time > date_from && e.time < date_to)
                        const filteredForecast = forecast.filter(e => e.time > date_from && e.time < date_to)
                        //create model with data and forecast returned from requests
                        aModel = model(filteredData, filteredForecast)
                        //add these to the scope so the index.html can be updated
                        $scope.data = aModel.weatherData()
                        $scope.forecast = aModel.forecastData()
                    })
            })
            .catch(console.err)
    }

    //scope function to add a new object to the historical array and post it to the server
    $scope.addHistoricalData = () => {
        let weatherObject = {}
        //weather object if it's precipitation
        if ($scope.type === "precipitation") {
            weatherObject = {
                type: $scope.type,
                time: $scope.time,
                place: $scope.place,
                value: $scope.value,
                unit: $scope.unit,
                precipitation_type: $scope.precipitation_type,
            }
        }
        //weather object if it's wind
        else if($scope.type === "wind speed")
        {
            weatherObject = {
                type: $scope.type,
                time: $scope.time,
                place: $scope.place,
                value: $scope.value,
                unit: $scope.unit,
                direction: $scope.direction
            }
        }
        else
        //for all other weather types
        {
            weatherObject = {
                type: $scope.type,
                time: $scope.time,
                place: $scope.place,
                value: $scope.value,
                unit: $scope.unit,
            }
        }
        //create a json object for the weather data
        const weatherObjectArray = [weatherObject]
        const jsonObject = JSON.stringify(weatherObjectArray)
        aModel.addWeatherData(weatherObject)

        //post request to send a weather data json object to the server
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
        $http.post('http://localhost:8080/data', jsonObject, {
                headers
            })
            .then(() => {
                $http.get('http://localhost:8080/data')
                    .then(({
                        data: data
                    }) => {
                        $http.get('http://localhost:8080/forecast')
                            .then(({
                                data: forecast
                            }) => {
                                //create model with data and forecast returned from requests
                                aModel = model(data, forecast)
                                //empty the current data from the scope in preparation for the new one with the added object
                                $scope.data = []
                                //add these to the scope so the index.html can be updated
                                $scope.data = aModel.weatherData()
                                $scope.forecast = aModel.forecastData()
                                $scope.result = "success" + $scope.data.length
                            })
                    })
                    .catch(console.err)
            })
    }
})