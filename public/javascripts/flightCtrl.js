var flight;
var current = 0;
var flightDetail;
var chooseFlight;

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

axios.get('https://api.myjson.com/bins/g7qzu').then(function(x) {
     flight = x.data;
});


app.service('flightService', function() {
    this.getFlight = function() {
        return flight[chooseFlight];
    };
});

app.controller('flightCtrl', function ($scope, $location, $compile) {
    $scope.optionDepart = [];
    $scope.optionReturn = [];
    $scope.optionAdults = [1, 2, 3, 4];
    $scope.optionCabin = ['Economy Class', 'Normal Class', 'Business Class', 'Premium Class'];
    $scope.selectAdults = $scope.optionAdults[0];
    $scope.selectCabin = $scope.optionCabin[0];

    $scope.getDeparting = function () {
        $("#depart").children('option').remove();
        flight.forEach(function (element) {
            $scope.optionDepart[$scope.optionDepart.length] = element.outbound.takeOffFrom;
        });
        $scope.selectDepart = $scope.optionDepart[0];
    };
    $scope.getReturning = function () {
        $("#return").children('option').remove();
        flight.forEach(function (element) {
            $scope.optionReturn[$scope.optionReturn.length] = element.outbound.landingTo;
        });
        $scope.selectReturn = $scope.optionReturn[0];
    };
    $scope.submit = function () {
        $('#flightResult').empty();
        var result = flight.filter(function(element) { 
            return element.outbound.takeOffFrom == $scope.selectDepart && element.outbound.landingTo == $scope.selectReturn;
        });
        console.log(result);

        var $el = $(
            '<ul class="nav nav-tabs">'+
                '<li class="nav-item">'+
                    '<a href="listview" class="nav-link active" data-toggle="tab">List View</a>'+
                '</li>'+
                '<li class="nav-item">'+
                    '<a href="matrixview" class="nav-link" data-toggle="tab">Matrix View</a>'+
                '</li>'+
            '</ul>'+
            '</div>'+
            '<div class="tab-content">'+
                '<div id="listview" class="container tab-pane active"><br>'+
                    '<p id="total-result"></p>'+
                    '<table class="table table-hover">'+
                        '<thead>'+
                            '<tr>'+
                                '<th>Price</th>'+
                                '<th>Airline</th>'+
                                '<th>Take-off</th>'+
                                '<th>Landing</th>'+
                                '<th>Stop(Duration)</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody id="table-body"></tbody>'+
                    '</table>'+
                '</div>'+
                '<div id="matrixview" class="container tab-pane fade"><br>'+
                    'Matrix view'+
                '</div>'+
                '<div id="page-number" class="pagination justify-content-center" style="margin:20px 0;">'+
                    '</div>'+
            '</div>'+
            '<p>Results per page:'+
                '<select name="page" id="page">'+
                    '<option value="pagevalue">5</option>'+
                '</select>'+
            '</p>'
        ).appendTo('#flightResult');
        $compile($el)($scope);
        $scope.addFlight(result);
    };

    $scope.goToPassenger = function(value){
        chooseFlight = value;
        console.log('value ',flight[chooseFlight]);
        $location.path('/passenger');
    };
    $scope.goToInsurance = function() {
        $location.path('/insurance');
    };

    $scope.addFlight = function (result) {   
        result.forEach(function(element) {
            flightDetail = "flightDetail" + current; 
            var $resultTable = $('<tr style="background-color: white;">'+
            "<td>" + element.outbound.price + "</td>"+
            "<td>" + element.outbound.airline + "</td>"+
            "<td>" + element.outbound.takeOffFrom + "</td>"+
            "<td>" + element.outbound.landingTo + " " + element.outbound.landingTime.dayOfMonth + "/" + element.outbound.landingTime.month + "/" + element.outbound.landingTime.year + "</td>"+
            "<td>" + element.outbound.transists.length + $scope.addDetail() + "</td></tr>"+
            '<tr><td colspan="5"><div id="'+ flightDetail +'" class="collapse" style="padding: 50px; background-color: white;">'+
            '<h3>Flight Detail</h3>'+
            '<div class="container">'+
            '<div class="row">'+
            '<div class="col-sm-4">TAKE OFF: ' + element.outbound.takeOffTime.hourOfDay + " : " + element.outbound.takeOffTime.hourOfDay+
            '<br>From '+ element.outbound.takeOffFrom +'</div>'+
            '<div class="col-sm-4">LANDING TO: ' + element.outbound.landingTime.hourOfDay + " : " + element.outbound.landingTime.hourOfDay+
            '<br>To '+ element.outbound.landingTo +'</div>'+
            "<div class='col-sm-4'><button type='button' class='btn btn-primary' id='selectbutton"+current +"' ng-click='goToPassenger("+ current +")'>Select</button></div>"+
            '</div></div><hr>'+
            // element.outbound.transists.forEach(function(ele) {
                '<div class="container"><div id="showtransit">flight no. ' + element.outbound.transists[0].flightNO + " | arifraft " + element.outbound.transists[0].aircraftType + " | from " + element.outbound.transists[0].fromAirport + " | to " + element.outbound.transists[0].toAirport + '</div></div>'+
            // });
            '</div></td></tr>)').appendTo('#table-body');
            $compile($resultTable)($scope);
            current++;
        });
    };
    $scope.addDetail = function () {
        var ex = "<br><a href='' data-toggle='collapse' data-target='#"+flightDetail+"'>details </a>";
        ex += "<a href=''><i class='fa fa-print'></i> </a>";
        ex += "<a href=''><i class='fa fa-envelope'></i> </a>";
        ex += "<a href=''><i class='fa fa-heart'></i> </a>";
        ex += "<a href=''><i class='fa fa-trash'></i> </a>";
        return ex;
    };
});

