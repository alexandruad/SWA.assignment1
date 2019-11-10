import model from './model.js'

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
    $http.get('http://localhost:8080/data')
        .then(({
            data: data
        }) => {
            $http.get('http://localhost:8080/forecast')
                .then(({
                    data: forecast
                }) => {
                    aModel = model(data, forecast)
                    $scope.data = aModel.weatherData()
                    $scope.forecast = aModel.forecastData()
                    $scope.result = "success" + $scope.data.length
                })
        })
        .catch(console.err)


    $scope.showData = (place) => {
        $http.get('http://localhost:8080/data/' + place).then(({
            data: data
        }) => {
            $http.get('http://localhost:8080/forecast/' + place).then(({
                data: forecast
            }) => {
                aModel = model(data, forecast)
                $scope.data = aModel.weatherData()
                $scope.forecast = aModel.forecastData()
            })
        }).catch(console.err);
    }

    $scope.filterInterval = () => {
        const date_from = document.getElementById("from_date").value
        const date_to = document.getElementById("to_date").value
        $http.get('http://localhost:8080/data')
            .then(({
                data: data
            }) => {
                $http.get('http://localhost:8080/forecast')
                    .then(({
                        data: forecast
                    }) => {
                        const filteredData = data.filter(e => e.time > date_from && e.time < date_to)
                        const filteredForecast = forecast.filter(e => e.time > date_from && e.time < date_to)
                        aModel = model(filteredData, filteredForecast)
                        $scope.data = aModel.weatherData()
                        $scope.forecast = aModel.forecastData()
                    })
            })
            .catch(console.err)
    }

    $scope.addHistoricalData = () => {
        let weatherObject = {}
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
        {
            weatherObject = {
                type: $scope.type,
                time: $scope.time,
                place: $scope.place,
                value: $scope.value,
                unit: $scope.unit,
            }
        }
        const weatherObjectArray = [weatherObject]
        const jsonObject = JSON.stringify(weatherObjectArray)
        aModel.addWeatherData(weatherObject)


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
                                aModel = model(data, forecast)
                                $scope.data = []
                                $scope.data = aModel.weatherData()
                                $scope.forecast = aModel.forecastData()
                                $scope.result = "success" + $scope.data.length
                            })
                    })
                    .catch(console.err)
            })
    }
})