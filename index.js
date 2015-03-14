var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.get('/',function(req,res){
  
  res.sendFile(__dirname+"/index.html");
})

var chat=io.of('/chat')
io.of("/chat").on("connection",function(socket){
  console.log('a user connected');
  socket.on("chat message",function(msg){
    console.log("message: "+msg)
    // socket.emit("chat message",msg); // √√X only working sending back to itself, the socket where it's from!!!
    // io.of("/chat").emit("chat message",msg);// √√ works same way as the line below
    //chat.emit("chat message",msg); // √√√ working, to all io.of("/chat")
    //io.emit("chat message",msg); // XXXX not working due to of('/chat') missing
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