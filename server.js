var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');
var request = require('axios');
var request = require("request");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var flights;

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'searchFlight.html'));
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

request.get('https://api.myjson.com/bins/g7qzu', (error, response, body) => {
    flights = JSON.parse(body);
    console.log('Get data From Myjson Completed(Using request)');
});

app.get('/flight', function (req, res) {
    var listAirline = [];
    for (let i = 0; i < flights.length; i++) {
        listAirline.push(flights[i].outbound.airline);
    };
    var newList = new Set(listAirline);

    res.send(Array.from(newList));
});

app.get ('/search/depart=:depart&return=:return',function(req,res){
    resultFlights = [];
    var info = {}
    info.depart = req.params.depart; 
    info.return = req.params.return;
    
    for(let i = 0 ; i < flights.length;i++){
        if(info.depart.toUpperCase() == flights[i].outbound.takeOffFrom.toUpperCase() && info.return.toUpperCase() == flights[i].outbound.landingTo.toUpperCase()){
            resultFlights.push(flights[i]);
        }
    }
    
    res.send(resultFlights);
 });
