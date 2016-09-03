var express = require('express'),
  path = require('path'),
  http = require('http');
io = require('socket.io');
logger = require('logger');
bodyParser = require('body-parser');
var emptygif = require('emptygif');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));


var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/imrelaypx.gif', function (req, res, next) {

  io.emit(req.query.a, {
    ip: req.ip,
    ua: req.headers['user-agent'],
    url: req.originalUrl
  });

  emptygif.sendEmptyGif(req, res, {
    'Content-Type': 'image/gif',
    'Content-Length': emptygif.emptyGifBufferLength,
    'Cache-Control': 'public, max-age=0' // or specify expiry to make sure it will call everytime
  });
});

app.use(express.static(__dirname + '/public'));

server.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});




