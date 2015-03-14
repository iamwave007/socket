function (ev){
  if(events.hasOwnProperty(ev)){
    emit.apply(this,arguments);
    return this
  }
  var args=toArray(arguments);
  var parserType=parser.EVENT;
  if(hasBin(args)){
    parserType=parser.BINARY_EVENT
  }
  var packet={
    type:parserType,data:args
  };
  if("function"==typeof args[args.length-1]){
    debug("emitting packet with ack id %d",this.ids);
    this.acks[this.ids]=args.pop();
    packet.id=this.ids++
  }
  if(this.connected){
    this.packet(packet)
  }else{
    this.sendBuffer.push(packet)
  }
  return this
}