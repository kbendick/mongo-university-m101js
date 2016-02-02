var express = require('express'),
    app = express(),
    engines = require('consolidate');

app.engine('html', engines.nunjucks); // registering nunjucks template enginer with html extension
app.set('view engine', 'html'); // set view engine app setting to reder html files

// NOTE: __dirname is a node construct for current directory
app.set('views', __dirname + '/views'); // specify location of templates


app.get('/', function(req, res) {
    res.render('hello', { 'name' : 'Templates' });
});

app.use(function(req, res){
    res.sendStatus(404); 
});

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});
