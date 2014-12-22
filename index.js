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
  socket.on('james',function(msg){
    io.emit('james', msg);
  });

  socket.on('disconnect',function(){

  });
});


http.listen(3000,function(){
  console.log("listening here! 3000");
})