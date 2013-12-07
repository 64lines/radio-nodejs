
console.log("(+) Load requirments...");
var express = require('express'), app = express();

console.log("(+) Create server...");
//var server = require('http').createServer(app);

var http = require('http');

//var io = require('socket.io').listen(server);

console.log("(+) Loading jade...");
var jade = require('jade');

console.log("(-) Requirments are done.");

console.log("(+) Set paths")
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.static(__dirname + '/public'));
});


app.get('/', function(req, res){
  res.render('main.jade');
});

//port = 3000;
//app.listen(port);

//console.log("(+) Listening at port: " + port);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

console.log("(+) Listen socket...");
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	socket.on('soundTime', function(soundTime) {
		socket.broadcast.emit(soundTime);
		console.log("Sound Time: " + soundTime)
	});
});