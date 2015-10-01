var express  = require('express');
var app      = express();
var server   = require('http').createServer(app);
var morgan   = require('morgan');
var port     = process.env.PORT || 3000;
var io       = require('socket.io')(server);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb://localhost/node-chat');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

// io.on('connection', function(socket) {
// 	console.log('someone connected');
// 	socket.on('disconnect', function() {
// 		console.log('someone disconnected');
// 	});
// });

io.on('connection', function(socket) {
	socket.on('chat message', function(userMessageObject) {
		console.log('user: ' + userMessageObject.usr);
		console.log('message: ' + userMessageObject.msg);
		io.emit('chat message', userMessageObject);
	});
});

server.listen(port, function() {
	console.log('server has been started on port %s', port);
})