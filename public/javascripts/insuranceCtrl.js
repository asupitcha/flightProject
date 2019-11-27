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

app.controller('insuranceCtrl', function ($scope, $location, passengerService) {
    flight = passengerService.yourFlight();
    $scope.flightD = flight.outbound.price;
    $scope.baggINsu = 350;
    $scope.healthhINsu = 1300;
    $scope.moveNotii = 150;
    $scope.smsNotii = 300;
    $scope.checkbox = {
        bag: false,
        health: false,
        move: false,
        sms: false
    };
    $scope.price = function () {
        var checkbox = $scope.checkbox;
        var total = (checkbox.bag ? 350 : 0) + (checkbox.health ? 1300 : 0) + (checkbox.move ? 150 : 0) + (checkbox.sms ? 300 : 0);
        return total;
    };
    var total;
    $scope.show = function () {
        var checkbox = $scope.checkbox;
        total = (checkbox.bag ? "- ประกันกระเป๋าเดินทางหาย 350 บาท \n": "") + 
            (checkbox.health ? "\n- ประกันอุบัติเหตุและสุขภาพ 1300 บาท \n" : "") +
            (checkbox.move ? "\n- แจ้งเตือนเที่ยวบินเลื่อน 150 บาท\n" : "") +
            (checkbox.sms ? "\n- แจ้งเตือน SMS ก่อนเดินทาง 300 บาท\n" : "");
        return total;
    };
    
    $scope.tax = 1000;
    $scope.discount = 165;
    $scope.totalPrice = function(){
        var price = $scope.flightD + $scope.tax - $scope.discount + $scope.price();
        return price;
    };
    $scope.getData = function(){
        return flight.outbound.price;
    };
    $scope.changeRoute = function(newRoute){
        $location.path(newRoute);
     };
    $scope.changeRoute = function(){
        $location.path('/invoice');
    };
    $scope.gtt = function(){
        $location.path('/insurance');
    };

    $scope.from = flight.outbound.takeOffFrom;
    $scope.to = flight.outbound.landingTo;
});

// app.controller('inC', function ($scope) {
//     $scope.showList = function(){
//     };
// });
// app.controller('inS', function ($scope) {
//     $scope.showList = function(){
//     };
// });

