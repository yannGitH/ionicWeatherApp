// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var weatherApp = angular.module('starter', ['ionic']);

weatherApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.city = {};

    $scope.days = {};

    $scope.days.day = [10];

    $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?q=Lyon,fr'
        })
        .success(function(data) {
            $scope.city.name = data.name;
            $scope.city.temperature = convertKelvinToCelsisus(data.main.temp);
        })
        .error(function(jqXHR, textStatus, errorThrown) {
            handleError(jqXHR, textStatus, errorThrown);
        });


    $http({
            method: 'GET',
            url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=Lyon,fr&cnt=10&mode=json",
        })
        .success(function(data) {
            for (i = 1; i < data.list.length && i < 10; i++) {
                $scope.days.day[i] = {};
                $scope.days.day[i].tempMax = convertKelvinToCelsisus(data.list[i].temp.max);
            }
        })
        .error(function(jqXHR, textStatus, errorThrown) {
            handleError(jqXHR, textStatus, errorThrown);
        });


}]);


weatherApp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

function handleError(jqXHR, textStatus, errorThrown) {
    console.log("error : " + jqXHR + " " + textStatus + " " + errorThrown);
}

function convertKelvinToCelsisus(tempFahrenheit) {
    return (tempFahrenheit - 273.15).toFixed(1);
}
