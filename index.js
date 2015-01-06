// NOTE: A server that integrates with (or mounts on) 
// the Node.JS HTTP Server: socket.io

var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);
// initialized "socket.io" by passing "http server" object

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
  socket.on('james',function(msg,second){
    io.emit('james', msg);
    console.log(second);
  });

  socket.on('disconnect',function(dd){
    console.log(dd)
    console.log("disconnected");
  });

  socket.broadcast.emit("hello");
  //io.emit("james","io.emit works")

});

// io.sockets.emit('hi','everyone');


http.listen(8000,function(){
  console.log("listening here! 8000");
})


















