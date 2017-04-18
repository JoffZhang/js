var buffer = new Buffer(26);
console.log("buffer length: " + buffer.length);

var data = "baidu.com";
buffer.write(data);
console.log(data+":"+data.length+" characters,"+Buffer.byteLength(data,"utf-8")+"bytes");

var buffer1 = buffer.slice(0,14);
console.log("buffer1 length "+buffer1.length);
console.log("buffer1 content "+ buffer1.toString());

for(var i =0 ; i<26;i++){
	buffer[i] = i+97;
}
console.log("buffer content "+buffer.toString("ascii"));

var buffer2 = new Buffer(4);
buffer2[0] = 0x3;
buffer2[1] = 0x4;
buffer2[2] = 0x23;
buffer2[3] = 0x42;
console.log(buffer2.readUInt16BE(0));
console.log(buffer2.readUInt16LE(0));
console.log(buffer2.readUInt16BE(1));
console.log(buffer2.readUInt16LE(1));
console.log(buffer2.readUInt16BE(2));
console.log(buffer2.readUInt16LE(2));

var buffer3 = new Buffer(4);
buffer3.writeUInt16LE(0xdead,0);
buffer3.writeUInt16LE(0xbeef,2);
console.log(buffer3);

var json = buffer3.toJSON();
console.log("JSON Representation : ");
console.log(json);

var buffer6 = new Buffer(json);
console.log(buffer6);

var buffer4 = new Buffer(26);
buffer.copy(buffer4);
console.log("buffer4 content : " + buffer4.toString());

var buffer5 = Buffer.concat([buffer,buffer4]);
console.log("buffer5 content : "+buffer5.toString());
