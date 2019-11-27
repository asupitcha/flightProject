app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : "home.html",controller:"flightCtrl"
    })
    .when('/invoice', {
        templateUrl : "invoice.html",controller:"insuranceCtrl"
    })
    .when('/insurance', {
        templateUrl : "insurance.html",controller:"insuranceCtrl"
    })
    .when('/passenger', {
        templateUrl : "passengerForm.html", controller:"passengerCtrl"
    });
});

var flight;

app.service('passengerService', function() {
    this.yourFlight = function() {
        return flight;
    };
});

app.controller('passengerCtrl', function ($scope, $location, flightService) {
    $scope.optionTitle = ['Mr.', 'Ms.', 'Mrs.'];
    flight = flightService.getFlight();
    console.log('service', flight);
    $scope.fname = "";
    $scope.lname = "";
    $scope.optionCountry = ['Bangkok'];
    $scope.optionBDDay = [1,2,3,4,5,6];
    $scope.optionPassportexDay = [1,2,3,4,5,6];
    $scope.optionBDdMonth = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.optionPassportexMonth = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.optionBDdYear = [2017,2018,2019,2020,2021,2022];
    $scope.optionPassportexYear = [2017,2018,2019,2020,2021,2022];
    $scope.flightD = flight.outbound.price;
    $scope.tax = 1000;
    $scope.discount = 165;
    $scope.service = 0;

    $scope.total = function() {
        return $scope.tax + $scope.service -$scope.discount;
    };

    $scope.goToInsurance = function() {
        $location.path('/insurance');
    };
});

