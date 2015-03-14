var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.get('/',function(req,res){
  
  res.sendFile(__dirname+"/index.html");
})

io.of("/chat").on("connection",function(socket){
  console.log('a user connected');
  socket.on("chat message",function(msg){
    console.log("message: "+msg)
    io.of("/chat").emit("chat message",msg);
    //io.emit("chat message",msg);
  })
  socket.on("disconnect",function(){
    console.log("disconnected")
  })
})

// io.on("connection",function(socket){
  // console.log('a user connected');
  // socket.on("chat message",function(msg){
  //   console.log("message: "+msg)
  //   io.emit("chat message",msg);
  // })
  // socket.on("disconnect",function(){
  //   console.log("disconnected")
  // })
// })

http.listen(4000,function(){
  console.log("listening on *:4000");
})