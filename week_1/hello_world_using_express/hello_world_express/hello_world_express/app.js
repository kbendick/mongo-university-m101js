var express = require('express');
    
var app = express(); // Use this express app to register routes.

app.get('/', function(req, res){
    res.send('Hello World');
});

// Tell express to handle any routes not handled by our application
app.use(function(req, res){
    res.sendStatus(404); 
});

// Set up the server and a callback once the server is up and listening.
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});
