var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.get('/',function(req,res){
  
  res.sendFile(__dirname+"/index.html");
})

// var chat=io.of('/chat')
// io.of("/chat").
io.on("connection",function(socket){
  console.log('a user connected');
  // socket.on("chat message",function(msg,fn){
  //   console.log("message: "+msg)
  //   chat.emit("chat message",msg);
  //   socket.broadcast.emit("chat message","insidecall")
  // })

  socket.on("message",function(roomName){
    console.log(roomName);
    socket.join(roomName);
    io.to(roomName).emit("roomName","what");
    // io.emit("roomName","bypass?")
  })

  socket.on("disconnect",function(){
    io.to("fff").emit("roomName","someone left")
    console.log("disconnected")
  });

  // socket.broadcast.emit("chat message","insidecall") // just not to itself!!!

  // var tweets = setInterval(function () {
  //   socket.volatile.emit('chat message', "tweeting");
  // }, 1000);
  // setTimeout(function(){clearInterval(tweets);},1000*10)

  // socket.on("message",function(data){ // "message" is a default event
  //   console.log(data)
  // })
})



// io.sockets.on("connection",function(socket){
//   console.log('a user connected');
//   socket.on("chat message",function(msg){
//     console.log("message: "+msg)
//     io.emit("chat message",msg);
//   })
//   socket.on("disconnect",function(){
//     console.log("disconnected")
//   })
// })

http.listen(4000,function(){
  console.log("listening on *:4000");
})