var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var morgan  = require('morgan');
var port    = process.env.PORT || 3000;
var io      = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

io.on('connection', function(socket) {
	console.log('someone is connected');
})


server.listen(port, function() {
	console.log('server has been started on port %s', port);
})