// Ionic Starter App

/*VARIABLES GLOBALES*/
var IMG_PATH = "img/IconList/"

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var weatherApp = angular.module('starter', ['ionic']);


/*angular.module('testApp', ['ionic'])
.controller('MyController', function($scope, $http) {
  $scope.items = [1,2,3];
  $scope.doRefresh = function() {
    $http.get('/new-items')
     .success(function(newItems) {
       $scope.items = newItems;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
});*/


weatherApp.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.city = {};

    $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?q=Lyon,fr'
        })
        .success(function(data) {
            $scope.city.name = data.name;
            $scope.city.temperature = convertKelvinToCelsisus(data.main.temp);
            $scope.city.weather = data.weather[0].description;
            $scope.city.weatherIcon = setWeatherIconSrc(data.weather[0].icon);
            $scope.city.temperatureMax = convertKelvinToCelsisus(data.main.temp_max);
            $scope.city.temperatureMin = convertKelvinToCelsisus(data.main.temp_min);
            $scope.city.humidity = "Humidity : " + data.main.humidity;
            $scope.city.windSpeed = "Wind speed : " + data.wind.speed;
            $scope.city.pressure = "Pressure : " + data.main.pressure;
        })
        .error(function(jqXHR, textStatus, errorThrown) {
            handleError(jqXHR, textStatus, errorThrown);
        });
}]);

weatherApp.controller('secondCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.hours = [];

    $scope.hours.hour = {};

    $http({
            method: 'GET',
            url: "http://api.openweathermap.org/data/2.5/forecast?q=Lyon,fr&mode=json"
        })
        .success(function(data) {
            for (i = 1; i < data.list.length && i < 14; i++) {
                $scope.hours[i - 1] = {};
                $scope.hours[i - 1].clock = formatTime(data.list[i].dt_txt);
                $scope.hours[i - 1].wheatherIcon = setWeatherIconSrc(data.list[i].weather[0].icon);
                $scope.hours[i - 1].temp = convertKelvinToCelsisus(data.list[i].main.temp);
            }
        })
        .error(function(jqXHR, textStatus, errorThrown) {
            handleError(jqXHR, textStatus, errorThrown);
        });
}]);


weatherApp.controller('thirdCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.days = [];

    $scope.days.day = {};

    $http({
            method: 'GET',
            url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=Lyon,fr&cnt=10&mode=json",
        })
        .success(function(data) {
            for (i = 1; i < data.list.length && i < 10; i++) {
                $scope.days[i - 1] = {};
                $scope.days[i - 1].date = convertNumberIntoDateDay(new Date().getDay() + i);
                $scope.days[i - 1].wheatherIcon = setWeatherIconSrc(data.list[i].weather[0].icon);
                $scope.days[i - 1].tempMax = convertKelvinToCelsisus(data.list[i].temp.max);
                $scope.days[i - 1].tempMin = convertKelvinToCelsisus(data.list[i].temp.min);
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
    return (tempFahrenheit - 273.15).toFixed(0);
}

function setWeatherIconSrc(weatherIcon) {
    switch (weatherIcon) {
        case "01d":
            return IMG_PATH + "clearskyd.png";
        case "01n":
            return IMG_PATH + "clearskyn.png";
        case "02d":
            return IMG_PATH + "fewcloudsd.png";
        case "02n":
            return IMG_PATH + "fewcloudsn.png";
        case "03d":
            return IMG_PATH + "scatteredcloudsd.png";
        case "03n":
            return IMG_PATH + "scatteredcloudsn.png";
        case "04d":
            return IMG_PATH + "brokencloudsd.png";
        case "04n":
            return IMG_PATH + "brokencloudsn.png";
        case "09d":
            return IMG_PATH + "showerraind.png";
        case "09n":
            return IMG_PATH + "showerrainn.png";
        case "10d":
            return IMG_PATH + "raind.png";
        case "10n":
            return IMG_PATH + "rainn.png";
        case "11d":
            return IMG_PATH + "thunderstormd.png";
        case "11n":
            return IMG_PATH + "thunderstormn.png";
        case "13d":
            return IMG_PATH + "snowd.png";
        case "13n":
            return IMG_PATH + "snown.png";
        case "50d":
            return IMG_PATH + "mistd.png";
        case "50n":
            return IMG_PATH + "mistn.png";
    }
}

function convertNumberIntoDateDay(number) {
    switch (number % 7) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 0:
            return "Sunday";
    }
}

function formatTime(clock) {
    return clock.substring(11, 16);
}
